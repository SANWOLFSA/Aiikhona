/**
 * Community repair videos (Firestore + Storage).
 *
 *   communityVideos/{videoId}                 one video, keyed to catalog slugs
 *   communityVideos/{videoId}/helpful/{uid}   one "Helpful" mark per user
 *   videoReports/{videoId}_{uid}              one report per user (admin read)
 * Storage:
 *   communityVideos/{uid}/{videoId}/{fileName}   uploaded video file (public read)
 *
 * See firestore.rules section 6 and storage.rules for who may write what.
 */
import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
  increment,
  type Timestamp,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable, type UploadTask } from 'firebase/storage';
import { db, isFirebaseConfigured, storage } from './firebase';
import { auditData, auditRef, friendlyError, type Actor } from './marketplace';

export type VideoKind = 'upload' | 'youtube' | 'vimeo';
export type VideoStatus = 'published' | 'removed';

export const MAX_VIDEO_BYTES = 200 * 1024 * 1024;
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
export const TITLE_MAX = 140;
export const DESCRIPTION_MAX = 2000;

export interface CommunityVideo {
  id: string;
  deviceType: string;
  brand: string;
  model: string;
  size?: string;
  solutionId?: string;
  solutionTitle?: string;
  deviceLabel: string;
  pagePath: string;
  title: string;
  description: string;
  kind: VideoKind;
  storagePath?: string;
  url: string;
  thumbnailUrl?: string;
  ownerUid: string;
  ownerName: string;
  ownerPhoto?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  helpfulCount: number;
  reportCount: number;
  status: VideoStatus;
  moderationReason?: string;
}

/** Where a video belongs in the catalog (all values are catalog slugs). */
export interface VideoTarget {
  deviceType: string;
  brand: string;
  model: string;
  size?: string;
  deviceLabel: string;
  pagePath: string;
}

export interface VideoReport {
  id: string;
  videoId: string;
  reporterUid: string;
  reason: string;
  createdAt?: Timestamp;
}

export { friendlyError };

export function videoMillis(v: CommunityVideo): number {
  const t = v.createdAt as any;
  return t && typeof t.toMillis === 'function' ? t.toMillis() : Date.now();
}

function safeFileName(name: string): string {
  return name.replace(/[^A-Za-z0-9._-]+/g, '_').slice(-80) || 'video';
}

function requireFirebase() {
  if (!isFirebaseConfigured) throw new Error('Video sharing needs the cloud database, which is not configured for this build.');
}

// ---------------------------------------------------------------------------
// Validation & link parsing
// ---------------------------------------------------------------------------

export function validateVideoFile(file: File): string | null {
  if (!ALLOWED_VIDEO_TYPES.includes(file.type)) return 'Video must be MP4, WebM or MOV (QuickTime).';
  if (file.size === 0) return 'That file is empty.';
  if (file.size >= MAX_VIDEO_BYTES) return 'Video must be smaller than 200 MB. Trim it, or upload it to YouTube and paste the link.';
  return null;
}

export interface ParsedLink {
  kind: 'youtube' | 'vimeo';
  id: string;
  embedUrl: string;
  thumbnailUrl?: string;
}

/** Parse a YouTube / Vimeo URL into a privacy-friendly embed URL, or null. */
export function parseVideoLink(raw: string): ParsedLink | null {
  let u: URL;
  try {
    u = new URL(raw.trim());
  } catch {
    return null;
  }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
  const host = u.hostname.replace(/^www\.|^m\./, '');
  const ytId = /^[A-Za-z0-9_-]{11}$/;
  let yt: string | null = null;
  if (host === 'youtu.be') yt = u.pathname.split('/')[1] || null;
  else if (host === 'youtube.com' || host === 'youtube-nocookie.com' || host === 'music.youtube.com') {
    if (u.pathname === '/watch') yt = u.searchParams.get('v');
    else {
      const m = u.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/);
      if (m) yt = m[1];
    }
  }
  if (yt && ytId.test(yt)) {
    return {
      kind: 'youtube',
      id: yt,
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt}?rel=0`,
      thumbnailUrl: `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`,
    };
  }
  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const parts = u.pathname.split('/').filter(Boolean);
    const idx = host === 'player.vimeo.com' ? parts.indexOf('video') + 1 : parts.findIndex(p => /^\d+$/.test(p));
    const id = idx >= 0 ? parts[idx] : undefined;
    if (id && /^\d{4,12}$/.test(id)) {
      // Unlisted Vimeo links carry a privacy hash: vimeo.com/123/abc or ?h=abc
      const isHash = (h?: string | null) => !!h && /^[a-f0-9]{6,20}$/i.test(h);
      const qh = u.searchParams.get('h');
      const hash = isHash(qh) ? qh : host === 'vimeo.com' && isHash(parts[idx + 1]) ? parts[idx + 1] : null;
      return {
        kind: 'vimeo',
        id,
        embedUrl: `https://player.vimeo.com/video/${id}?dnt=1${hash ? `&h=${hash}` : ''}`,
      };
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Reads
// ---------------------------------------------------------------------------

function snapToVideos(snap: any): CommunityVideo[] {
  const out: CommunityVideo[] = [];
  snap.forEach((d: any) => out.push({ ...(d.data() as CommunityVideo), id: d.id }));
  return out.sort((a, b) => videoMillis(b) - videoMillis(a));
}

/**
 * Published videos for one model (equality filters only, so no composite
 * index is needed; sorted newest first on the client).
 */
export function subscribeModelVideos(
  t: { deviceType: string; brand: string; model: string },
  cb: (v: CommunityVideo[]) => void,
  onError?: (e: unknown) => void
) {
  if (!isFirebaseConfigured) {
    cb([]);
    return () => {};
  }
  return onSnapshot(
    query(
      collection(db, 'communityVideos'),
      where('deviceType', '==', t.deviceType),
      where('brand', '==', t.brand),
      where('model', '==', t.model),
      where('status', '==', 'published'),
      limit(200)
    ),
    snap => cb(snapToVideos(snap)),
    e => onError?.(e)
  );
}

export function subscribeMyVideos(uid: string, cb: (v: CommunityVideo[]) => void, onError?: (e: unknown) => void) {
  if (!isFirebaseConfigured) {
    cb([]);
    return () => {};
  }
  return onSnapshot(
    query(collection(db, 'communityVideos'), where('ownerUid', '==', uid), limit(200)),
    snap => cb(snapToVideos(snap)),
    e => onError?.(e)
  );
}

/** Admin: newest videos of every status. */
export function subscribeAllVideos(cb: (v: CommunityVideo[]) => void, onError?: (e: unknown) => void) {
  return onSnapshot(
    query(collection(db, 'communityVideos'), orderBy('createdAt', 'desc'), limit(300)),
    snap => cb(snapToVideos(snap)),
    e => onError?.(e)
  );
}

export function subscribeVideoReports(cb: (r: VideoReport[]) => void, onError?: (e: unknown) => void) {
  return onSnapshot(
    query(collection(db, 'videoReports'), orderBy('createdAt', 'desc'), limit(300)),
    snap => {
      const out: VideoReport[] = [];
      snap.forEach(d => out.push({ ...(d.data() as VideoReport), id: d.id }));
      cb(out);
    },
    e => onError?.(e)
  );
}

/** Has this user marked the video helpful? */
export function useHelpfulMark(videoId: string, uid: string | null): boolean | null {
  const [marked, setMarked] = useState<boolean | null>(null);
  useEffect(() => {
    if (!uid || !isFirebaseConfigured) {
      setMarked(false);
      return;
    }
    return onSnapshot(
      doc(db, 'communityVideos', videoId, 'helpful', uid),
      s => setMarked(s.exists()),
      () => setMarked(false)
    );
  }, [videoId, uid]);
  return marked;
}

// ---------------------------------------------------------------------------
// Writes
// ---------------------------------------------------------------------------

export interface OwnerInfo {
  uid: string;
  name: string;
  photo?: string;
}

export interface VideoFields {
  title: string;
  description: string;
  solutionId?: string;
  solutionTitle?: string;
}

function baseDoc(target: VideoTarget, fields: VideoFields, owner: OwnerInfo) {
  const d: Record<string, unknown> = {
    deviceType: target.deviceType,
    brand: target.brand,
    model: target.model,
    deviceLabel: target.deviceLabel.slice(0, 200),
    pagePath: target.pagePath.slice(0, 400),
    title: fields.title.trim().slice(0, TITLE_MAX),
    description: fields.description.trim().slice(0, DESCRIPTION_MAX),
    ownerUid: owner.uid,
    ownerName: (owner.name || 'Community member').slice(0, 80),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    helpfulCount: 0,
    reportCount: 0,
    status: 'published',
  };
  if (target.size) d.size = target.size;
  if (fields.solutionId) {
    d.solutionId = fields.solutionId.slice(0, 120);
    d.solutionTitle = (fields.solutionTitle || '').slice(0, 200);
  }
  if (owner.photo && owner.photo.startsWith('https://') && owner.photo.length <= 1000) d.ownerPhoto = owner.photo;
  return d;
}

function checkFields(fields: VideoFields) {
  if (!fields.title.trim()) throw new Error('Give your video a title.');
}

export async function createLinkVideo(target: VideoTarget, fields: VideoFields, owner: OwnerInfo, rawUrl: string) {
  requireFirebase();
  checkFields(fields);
  const link = parseVideoLink(rawUrl);
  if (!link) throw new Error('Paste a valid YouTube or Vimeo link.');
  const refDoc = doc(collection(db, 'communityVideos'));
  const d = baseDoc(target, fields, owner);
  d.kind = link.kind;
  d.url = link.embedUrl;
  if (link.thumbnailUrl) d.thumbnailUrl = link.thumbnailUrl;
  const batch = writeBatch(db);
  batch.set(refDoc, d);
  await batch.commit();
  return refDoc.id;
}

export interface UploadHandle {
  task: UploadTask;
  done: Promise<string>;
}

/**
 * Upload a video file to communityVideos/{uid}/{videoId}/{file}, then create
 * the Firestore doc. Call handle.task.cancel() to abort.
 */
export function createUploadVideo(
  target: VideoTarget,
  fields: VideoFields,
  owner: OwnerInfo,
  file: File,
  onProgress: (pct: number) => void
): UploadHandle {
  requireFirebase();
  checkFields(fields);
  const err = validateVideoFile(file);
  if (err) throw new Error(err);
  const refDoc = doc(collection(db, 'communityVideos'));
  const path = `communityVideos/${owner.uid}/${refDoc.id}/${safeFileName(file.name)}`;
  const fileRef = ref(storage, path);
  const task = uploadBytesResumable(fileRef, file, { contentType: file.type, cacheControl: 'public, max-age=86400' });
  const done = new Promise<string>((resolve, reject) => {
    task.on(
      'state_changed',
      snap => onProgress(snap.totalBytes ? Math.round((snap.bytesTransferred / snap.totalBytes) * 100) : 0),
      e => {
        if ((e as any)?.code === 'storage/canceled') reject(new Error('Upload cancelled.'));
        else reject(new Error(friendlyError(e)));
      },
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          const d = baseDoc(target, fields, owner);
          d.kind = 'upload';
          d.url = url;
          d.storagePath = path;
          const batch = writeBatch(db);
          batch.set(refDoc, d);
          await batch.commit();
          resolve(refDoc.id);
        } catch (e) {
          // Don't leave an orphaned file behind.
          deleteObject(fileRef).catch(() => {});
          reject(new Error(friendlyError(e)));
        }
      }
    );
  });
  return { task, done };
}

export async function updateVideoDetails(id: string, fields: VideoFields) {
  checkFields(fields);
  await updateDoc(doc(db, 'communityVideos', id), {
    title: fields.title.trim().slice(0, TITLE_MAX),
    description: fields.description.trim().slice(0, DESCRIPTION_MAX),
    updatedAt: serverTimestamp(),
  });
}

async function deleteStorageFile(path?: string) {
  if (!path) return;
  try {
    await deleteObject(ref(storage, path));
  } catch (e) {
    if ((e as any)?.code !== 'storage/object-not-found') throw e;
  }
}

/** Owner (or admin) delete: removes the Storage file, then the Firestore doc. */
export async function deleteVideo(v: CommunityVideo, actor?: Actor | null) {
  await deleteStorageFile(v.storagePath);
  const batch = writeBatch(db);
  batch.delete(doc(db, 'communityVideos', v.id));
  if (actor && actor.uid !== v.ownerUid) {
    batch.set(auditRef(), auditData(actor, 'video.delete', 'communityVideo', v.id, v.title, v.deviceLabel));
  }
  await batch.commit();
}

/** Admin moderation: hide (removed) or restore (published), with audit entry. */
export async function adminSetVideoStatus(v: CommunityVideo, status: VideoStatus, actor: Actor, reason = '') {
  const batch = writeBatch(db);
  batch.update(doc(db, 'communityVideos', v.id), {
    status,
    moderatedBy: actor.uid,
    moderatedAt: serverTimestamp(),
    moderationReason: reason.trim().slice(0, 1000),
    updatedAt: serverTimestamp(),
  });
  batch.set(auditRef(), auditData(actor, status === 'removed' ? 'video.remove' : 'video.restore', 'communityVideo', v.id, v.title, reason));
  await batch.commit();
}

export async function toggleHelpful(v: CommunityVideo, uid: string, currentlyMarked: boolean) {
  const markRef = doc(db, 'communityVideos', v.id, 'helpful', uid);
  const batch = writeBatch(db);
  if (currentlyMarked) {
    batch.delete(markRef);
    batch.update(doc(db, 'communityVideos', v.id), { helpfulCount: increment(-1) });
  } else {
    batch.set(markRef, { uid, createdAt: serverTimestamp() });
    batch.update(doc(db, 'communityVideos', v.id), { helpfulCount: increment(1) });
  }
  await batch.commit();
}

export async function hasReported(videoId: string, uid: string): Promise<boolean> {
  try {
    return (await getDoc(doc(db, 'videoReports', `${videoId}_${uid}`))).exists();
  } catch {
    return false;
  }
}

export async function reportVideo(v: CommunityVideo, uid: string, reason: string) {
  const batch = writeBatch(db);
  batch.set(doc(db, 'videoReports', `${v.id}_${uid}`), {
    videoId: v.id,
    reporterUid: uid,
    reason: reason.trim().slice(0, 500) || 'No reason given',
    createdAt: serverTimestamp(),
  });
  batch.update(doc(db, 'communityVideos', v.id), { reportCount: increment(1) });
  await batch.commit();
}
