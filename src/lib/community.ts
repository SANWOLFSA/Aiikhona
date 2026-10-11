/**
 * Community posts for the Home feed.
 *
 * Two backends behind one hook (`useCommunity`):
 *  - Firestore (when Firebase is configured AND a Firebase user is signed in for writes):
 *      posts/{postId}                       – the post (likes live in `likedBy` via arrayUnion/arrayRemove)
 *      posts/{postId}/comments/{commentId}  – comments + replies (`parentId` points at the parent comment)
 *    Reads are real-time via onSnapshot.
 *  - localStorage (Firebase not configured, Firestore unreachable, or no Firebase user):
 *      everything is kept under one key and synced across tabs via the `storage` event.
 *
 * The seeded `initialPosts` are always shown as starter content (local-only; likes/comments
 * on seeds are stored locally).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
  type Timestamp
} from 'firebase/firestore';
import { auth, db } from './firebase';
import type { ForumPost, UserProfile } from '../types';

// Mirrors `isFirebaseConfigured` from firebase.ts. Computed locally because Vite resolves
// './firebase' to the legacy src/lib/firebase.js (which does not export it).
const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID && import.meta.env.VITE_FIREBASE_APP_ID
);

export interface CommunityComment {
  id: string;
  postId: string;
  parentId: string | null;
  authorUid: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  content: string;
  isHelpful: boolean;
  createdAt: number; // epoch ms
}

export interface CommunityPost {
  id: string;
  authorUid: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  isVerifiedCompany: boolean;
  title: string;
  content: string;
  imageUrl: string | null;
  deviceCategory: string;
  brand: string;
  deviceModel: string;
  tags: string[];
  likedBy: string[];
  /** Likes carried over from seeded data (not tied to a uid). */
  baseLikes: number;
  commentCount: number;
  isSolved: boolean;
  solvedCommentId: string | null;
  createdAt: number; // epoch ms
  /** Where this post lives. */
  source: 'firestore' | 'local' | 'seed';
}

export interface NewPostInput {
  title: string;
  content: string;
  imageUrl: string | null;
  deviceCategory: string;
  brand: string;
  deviceModel: string;
}

const LOCAL_KEY = 'diyelectronics_community_v1';
const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

interface LocalState {
  posts: CommunityPost[]; // user-created local posts
  seedOverrides: Record<string, Pick<CommunityPost, 'likedBy' | 'isSolved' | 'solvedCommentId'>>;
  comments: Record<string, CommunityComment[]>; // by postId (local + seed posts)
  deletedSeedIds: string[];
}

const emptyLocal = (): LocalState => ({ posts: [], seedOverrides: {}, comments: {}, deletedSeedIds: [] });

function readLocal(): LocalState {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return emptyLocal();
    return { ...emptyLocal(), ...JSON.parse(raw) };
  } catch {
    return emptyLocal();
  }
}

function writeLocal(state: LocalState) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('[community] could not persist to localStorage', err);
  }
}

function tsToMs(v: unknown): number {
  if (!v) return Date.now();
  if (typeof v === 'number') return v;
  const t = v as Timestamp;
  return typeof t.toMillis === 'function' ? t.toMillis() : Date.now();
}

const SEED_BASE_TIME = Date.now();

/** Convert the existing seeded ForumPosts into starter community posts. */
function seedToCommunity(posts: ForumPost[]): { posts: CommunityPost[]; comments: Record<string, CommunityComment[]> } {
  const comments: Record<string, CommunityComment[]> = {};
  const out = posts.map((p, i) => {
    const createdAt = SEED_BASE_TIME - (i + 1) * 3_600_000 * 5;
    comments[p.id] = (p.replies || []).map((r: any, j: number) => ({
      id: r.id || `${p.id}_r${j}`,
      postId: p.id,
      parentId: null,
      authorUid: `seed_${(r.author || 'tech').toString().toLowerCase().replace(/\s+/g, '_')}`,
      authorName: r.author || 'Technician',
      authorAvatar: r.avatar || DEFAULT_AVATAR,
      authorRole: r.role || 'Technician',
      content: r.content || '',
      isHelpful: Boolean(r.isAcceptedAnswer || r.isHelpful),
      createdAt: createdAt + (j + 1) * 600_000
    }));
    return {
      id: p.id,
      authorUid: `seed_${(p.author?.name || 'tech').toString().toLowerCase().replace(/\s+/g, '_')}`,
      authorName: p.author?.name || 'Technician',
      authorAvatar: p.author?.avatar || DEFAULT_AVATAR,
      authorRole: p.author?.role || 'Technician',
      isVerifiedCompany: Boolean(p.author?.isVerifiedCompany),
      title: p.title,
      content: p.content,
      imageUrl: null,
      deviceCategory: p.deviceCategory,
      brand: '',
      deviceModel: p.deviceModel || 'Universal',
      tags: p.tags || [],
      likedBy: [],
      baseLikes: p.upvotes || 0,
      commentCount: Math.max(p.repliesCount || 0, (p.replies || []).length),
      isSolved: p.isSolved,
      solvedCommentId: null,
      createdAt,
      source: 'seed' as const
    };
  });
  return { posts: out, comments };
}

export function likeCount(p: CommunityPost) {
  return p.baseLikes + p.likedBy.length;
}

export function timeAgo(ms: number): string {
  const s = Math.max(0, Math.floor((Date.now() - ms) / 1000));
  if (s < 45) return 'Just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d`;
  return new Date(ms).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

/** A user is "signed in" for community purposes when they are not the guest profile. */
export function isSignedInProfile(u: UserProfile | null | undefined): boolean {
  if (!u) return false;
  if (u.id === 'usr_guest') return false;
  if (/guest/i.test(u.role || '')) return false;
  return true;
}

/** Resize + compress an image file to a JPEG data URL (keeps Firestore docs well under 1 MB). */
export async function compressImage(file: File, maxDim = 1080, quality = 0.72): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = dataUrl;
  });
  const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) return dataUrl;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  let out = canvas.toDataURL('image/jpeg', quality);
  // Second pass if still large
  if (out.length > 700_000) out = canvas.toDataURL('image/jpeg', 0.5);
  return out;
}

export type CommunityBackend = 'firestore' | 'local';

export function useCommunity(seedPosts: ForumPost[], currentUser: UserProfile) {
  const seeds = useMemo(() => seedToCommunity(seedPosts), [seedPosts]);
  const [local, setLocal] = useState<LocalState>(() => readLocal());
  const [remotePosts, setRemotePosts] = useState<CommunityPost[]>([]);
  const [remoteOk, setRemoteOk] = useState<boolean>(isFirebaseConfigured);
  const [fbUser, setFbUser] = useState<FirebaseUser | null>(() => (isFirebaseConfigured ? auth.currentUser : null));

  // Track Firebase auth state (writes to Firestore need a Firebase user).
  useEffect(() => {
    if (!isFirebaseConfigured) return;
    return onAuthStateChanged(auth, u => setFbUser(u));
  }, []);

  // Real-time posts from Firestore.
  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(100));
    const unsub = onSnapshot(
      q,
      snap => {
        setRemoteOk(true);
        setRemotePosts(
          snap.docs.map(d => {
            const x = d.data() as any;
            return {
              id: d.id,
              authorUid: x.authorUid,
              authorName: x.authorName || 'Technician',
              authorAvatar: x.authorAvatar || DEFAULT_AVATAR,
              authorRole: x.authorRole || 'Technician',
              isVerifiedCompany: Boolean(x.isVerifiedCompany),
              title: x.title || '',
              content: x.content || '',
              imageUrl: x.imageUrl || null,
              deviceCategory: x.deviceCategory || 'General',
              brand: x.brand || '',
              deviceModel: x.deviceModel || '',
              tags: Array.isArray(x.tags) ? x.tags : [],
              likedBy: Array.isArray(x.likedBy) ? x.likedBy : [],
              baseLikes: 0,
              commentCount: typeof x.commentCount === 'number' ? x.commentCount : 0,
              isSolved: Boolean(x.isSolved),
              solvedCommentId: x.solvedCommentId || null,
              createdAt: tsToMs(x.createdAt),
              source: 'firestore' as const
            };
          })
        );
      },
      err => {
        console.warn('[community] Firestore posts unavailable, using local storage', err);
        setRemoteOk(false);
      }
    );
    return unsub;
  }, []);

  // Cross-tab sync for local mode.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_KEY) setLocal(readLocal());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const backend: CommunityBackend = isFirebaseConfigured && remoteOk && fbUser ? 'firestore' : 'local';
  const myUid = backend === 'firestore' && fbUser ? fbUser.uid : currentUser.uid || currentUser.id;
  const signedIn = isSignedInProfile(currentUser);

  const updateLocal = useCallback((fn: (s: LocalState) => LocalState) => {
    setLocal(prev => {
      const next = fn(prev);
      writeLocal(next);
      return next;
    });
  }, []);

  const posts: CommunityPost[] = useMemo(() => {
    const seedPosts = seeds.posts
      .filter(p => !local.deletedSeedIds.includes(p.id))
      .map(p => {
        const o = local.seedOverrides[p.id];
        const localComments = local.comments[p.id];
        return {
          ...p,
          ...(o || {}),
          commentCount: localComments ? localComments.length : p.commentCount
        };
      });
    const localPosts = local.posts.map(p => ({ ...p, commentCount: (local.comments[p.id] || []).length }));
    const user = [...remotePosts, ...localPosts].sort((a, b) => b.createdAt - a.createdAt);
    return [...user, ...seedPosts];
  }, [seeds, local, remotePosts]);

  const authorFields = () => ({
    authorUid: myUid,
    authorName: currentUser.name,
    authorAvatar: currentUser.avatar || DEFAULT_AVATAR,
    authorRole: currentUser.role || 'Technician'
  });

  const createPost = async (input: NewPostInput) => {
    const tags = [input.deviceCategory, input.brand, input.deviceModel].map(t => t.trim()).filter(Boolean);
    if (backend === 'firestore') {
      try {
        await addDoc(collection(db, 'posts'), {
          ...authorFields(),
          isVerifiedCompany: Boolean(currentUser.isVerifiedCompany),
          title: input.title,
          content: input.content,
          imageUrl: input.imageUrl,
          deviceCategory: input.deviceCategory,
          brand: input.brand,
          deviceModel: input.deviceModel,
          tags,
          likedBy: [],
          commentCount: 0,
          isSolved: false,
          solvedCommentId: null,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        return;
      } catch (err) {
        console.warn('[community] Firestore write failed, saving locally', err);
      }
    }
    const post: CommunityPost = {
      id: `local_post_${Date.now()}`,
      ...authorFields(),
      isVerifiedCompany: Boolean(currentUser.isVerifiedCompany),
      title: input.title,
      content: input.content,
      imageUrl: input.imageUrl,
      deviceCategory: input.deviceCategory,
      brand: input.brand,
      deviceModel: input.deviceModel,
      tags,
      likedBy: [],
      baseLikes: 0,
      commentCount: 0,
      isSolved: false,
      solvedCommentId: null,
      createdAt: Date.now(),
      source: 'local'
    };
    updateLocal(s => ({ ...s, posts: [post, ...s.posts] }));
  };

  const updateSeedOrLocal = (post: CommunityPost, patch: Partial<CommunityPost>) => {
    if (post.source === 'seed') {
      updateLocal(s => {
        const cur = s.seedOverrides[post.id] || { likedBy: post.likedBy, isSolved: post.isSolved, solvedCommentId: post.solvedCommentId };
        return {
          ...s,
          seedOverrides: {
            ...s.seedOverrides,
            [post.id]: {
              likedBy: patch.likedBy ?? cur.likedBy,
              isSolved: patch.isSolved ?? cur.isSolved,
              solvedCommentId: patch.solvedCommentId !== undefined ? patch.solvedCommentId : cur.solvedCommentId
            }
          }
        };
      });
    } else {
      updateLocal(s => ({ ...s, posts: s.posts.map(p => (p.id === post.id ? { ...p, ...patch } : p)) }));
    }
  };

  const toggleLike = async (post: CommunityPost) => {
    const liked = post.likedBy.includes(myUid);
    if (post.source === 'firestore') {
      if (backend !== 'firestore') return; // needs Firebase sign-in
      try {
        await updateDoc(doc(db, 'posts', post.id), {
          likedBy: liked ? arrayRemove(myUid) : arrayUnion(myUid)
        });
      } catch (err) {
        console.warn('[community] like failed', err);
      }
      return;
    }
    updateSeedOrLocal(post, { likedBy: liked ? post.likedBy.filter(u => u !== myUid) : [...post.likedBy, myUid] });
  };

  const editPost = async (post: CommunityPost, patch: { title: string; content: string }) => {
    if (post.authorUid !== myUid) return;
    if (post.source === 'firestore') {
      await updateDoc(doc(db, 'posts', post.id), { ...patch, updatedAt: serverTimestamp() }).catch(err =>
        console.warn('[community] edit failed', err)
      );
      return;
    }
    if (post.source === 'local') updateSeedOrLocal(post, patch);
  };

  const deletePost = async (post: CommunityPost) => {
    if (post.authorUid !== myUid) return;
    if (post.source === 'firestore') {
      // Comments subcollection docs are orphaned by a client delete; the post disappears from the feed.
      await deleteDoc(doc(db, 'posts', post.id)).catch(err => console.warn('[community] delete failed', err));
      return;
    }
    updateLocal(s => {
      const comments = { ...s.comments };
      delete comments[post.id];
      return { ...s, posts: s.posts.filter(p => p.id !== post.id), comments };
    });
  };

  const isMine = (uid: string) => uid === myUid;

  return {
    posts,
    backend,
    myUid,
    signedIn,
    /** True when the user can write to Firestore-backed posts (Firebase user present). */
    canWriteRemote: backend === 'firestore',
    isMine,
    createPost,
    toggleLike,
    editPost,
    deletePost,
    // used by useComments
    _local: local,
    _seedComments: seeds.comments,
    _seedSolved: Object.fromEntries(seeds.posts.map(p => [p.id, p.isSolved])) as Record<string, boolean>,
    _updateLocal: updateLocal,
    _updateSeedOrLocal: updateSeedOrLocal,
    _authorFields: authorFields
  };
}

export type CommunityApi = ReturnType<typeof useCommunity>;

/** Comments for one post; subscribes to Firestore only while mounted (i.e. when the thread is open). */
export function useComments(api: CommunityApi, post: CommunityPost) {
  const [remote, setRemote] = useState<CommunityComment[] | null>(null);
  const apiRef = useRef(api);
  apiRef.current = api;

  useEffect(() => {
    if (post.source !== 'firestore') return;
    const q = query(collection(db, 'posts', post.id, 'comments'), orderBy('createdAt', 'asc'));
    return onSnapshot(
      q,
      snap =>
        setRemote(
          snap.docs.map(d => {
            const x = d.data() as any;
            return {
              id: d.id,
              postId: post.id,
              parentId: x.parentId || null,
              authorUid: x.authorUid,
              authorName: x.authorName || 'Technician',
              authorAvatar: x.authorAvatar || DEFAULT_AVATAR,
              authorRole: x.authorRole || 'Technician',
              content: x.content || '',
              isHelpful: Boolean(x.isHelpful),
              createdAt: tsToMs(x.createdAt)
            };
          })
        ),
      err => {
        console.warn('[community] comments unavailable', err);
        setRemote([]);
      }
    );
  }, [post.id, post.source]);

  const comments: CommunityComment[] =
    post.source === 'firestore'
      ? remote || []
      : api._local.comments[post.id] || api._seedComments[post.id] || [];

  const loading = post.source === 'firestore' && remote === null;

  const localList = () => apiRef.current._local.comments[post.id] || apiRef.current._seedComments[post.id] || [];

  const addComment = async (content: string, parentId: string | null = null) => {
    const text = content.trim();
    if (!text) return;
    const a = apiRef.current;
    if (post.source === 'firestore') {
      if (a.backend !== 'firestore') return;
      try {
        const batch = writeBatch(db);
        const ref = doc(collection(db, 'posts', post.id, 'comments'));
        batch.set(ref, { ...a._authorFields(), content: text, parentId, isHelpful: false, createdAt: serverTimestamp() });
        batch.update(doc(db, 'posts', post.id), { commentCount: increment(1) });
        await batch.commit();
      } catch (err) {
        console.warn('[community] comment failed', err);
      }
      return;
    }
    const c: CommunityComment = {
      id: `local_c_${Date.now()}`,
      postId: post.id,
      parentId,
      ...a._authorFields(),
      content: text,
      isHelpful: false,
      createdAt: Date.now()
    };
    const list = localList();
    a._updateLocal(s => ({ ...s, comments: { ...s.comments, [post.id]: [...list, c] } }));
  };

  const deleteComment = async (c: CommunityComment) => {
    const a = apiRef.current;
    if (!a.isMine(c.authorUid)) return;
    const childIds = comments.filter(x => x.parentId === c.id).map(x => x.id);
    if (post.source === 'firestore') {
      try {
        const batch = writeBatch(db);
        batch.delete(doc(db, 'posts', post.id, 'comments', c.id));
        batch.update(doc(db, 'posts', post.id), { commentCount: increment(-1) });
        await batch.commit();
      } catch (err) {
        console.warn('[community] delete comment failed', err);
      }
      return;
    }
    const list = localList().filter(x => x.id !== c.id && !childIds.includes(x.id));
    a._updateLocal(s => ({ ...s, comments: { ...s.comments, [post.id]: list } }));
    if (post.solvedCommentId === c.id) a._updateSeedOrLocal(post, { isSolved: false, solvedCommentId: null });
  };

  /** Only the post author can mark a comment as Helpful / Solved. */
  const toggleHelpful = async (c: CommunityComment) => {
    const a = apiRef.current;
    if (!a.isMine(post.authorUid)) return;
    const next = !c.isHelpful;
    if (post.source === 'firestore') {
      try {
        const batch = writeBatch(db);
        batch.update(doc(db, 'posts', post.id, 'comments', c.id), { isHelpful: next });
        const stillHelpful = comments.some(x => x.id !== c.id && x.isHelpful);
        batch.update(doc(db, 'posts', post.id), {
          isSolved: next || stillHelpful,
          solvedCommentId: next ? c.id : stillHelpful ? post.solvedCommentId : null,
          updatedAt: serverTimestamp()
        });
        await batch.commit();
      } catch (err) {
        console.warn('[community] mark helpful failed', err);
      }
      return;
    }
    const list = localList().map(x => (x.id === c.id ? { ...x, isHelpful: next } : x));
    a._updateLocal(s => ({ ...s, comments: { ...s.comments, [post.id]: list } }));
    const anyHelpful = list.some(x => x.isHelpful);
    const seedSolved = post.source === 'seed' && Boolean(a._seedSolved[post.id]);
    a._updateSeedOrLocal(post, {
      isSolved: anyHelpful || seedSolved,
      solvedCommentId: next ? c.id : list.find(x => x.isHelpful)?.id ?? null
    });
  };

  return { comments, loading, addComment, deleteComment, toggleHelpful };
}
