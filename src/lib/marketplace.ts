/**
 * Marketplace data layer (Firestore + Storage).
 *
 * Collections (see firestore.rules section 5 for who may write what):
 *   sellers/{uid}                public seller profile
 *   sellerVerifications/{uid}    private company verification application
 *   verifiedSellers/{uid}        public badge, admin-written only when approved
 *   listings/{id}                items for sale
 *   purchaseRequests/{id}        "Request to buy" (no payments)
 *   reviews/{requestId}          real reviews → seller ratings
 *   adminAuditLog/{id}           append-only admin actions
 * Storage:
 *   sellerDocs/{uid}/{docType}/{ts_name}   verification documents (private)
 *   listingImages/{uid}/{ts_name}          listing photos (public)
 */
import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  type Timestamp,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, isFirebaseConfigured, storage } from './firebase';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export type SellerType = 'individual' | 'company';

export type VerificationStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'revoked';

export const STANDARD_CATEGORIES = [
  'Test Equipment',
  'Soldering Stations',
  'Tools',
  'Consumables',
  'Donor Boards & Parts',
  'Spare Parts',
  'Used Devices',
];

/** Only APPROVED companies may list here. Must match isBusinessCategory() in firestore.rules. */
export const BUSINESS_CATEGORIES = ['Bulk & Wholesale', 'New Stock (Business)'];

export const ALL_CATEGORIES = [...STANDARD_CATEGORIES, ...BUSINESS_CATEGORIES];

export const CONDITIONS = ['New', 'Like New', 'Refurbished', 'Tested Working', 'For Parts Only (Untested)'];

export interface DocTypeDef {
  key: string;
  label: string;
  hint: string;
  required: boolean;
}

export const VERIFICATION_DOC_TYPES: DocTypeDef[] = [
  { key: 'registrationCertificate', label: 'Company registration certificate', hint: 'CIPC CoR14.3 / CoR15.1 or equivalent', required: true },
  { key: 'taxClearance', label: 'Tax clearance / VAT certificate', hint: 'SARS tax compliance status (PIN) or VAT registration', required: true },
  { key: 'proofOfAddress', label: 'Proof of business address', hint: 'Utility bill, lease or bank letter, not older than 3 months', required: true },
  { key: 'directorId', label: 'Director ID', hint: 'ID or passport of a listed director', required: true },
  { key: 'tradeLicence', label: 'Trade licence', hint: 'Optional', required: false },
  { key: 'icasaLicence', label: 'ICASA type approval / licence', hint: 'Optional: radios, telecoms, RF gear', required: false },
  { key: 'importLicence', label: 'Import / export licence', hint: 'Optional: ITAC permit or SARS customs code', required: false },
];

export const REQUIRED_DOC_KEYS = VERIFICATION_DOC_TYPES.filter(d => d.required).map(d => d.key);

export const MAX_DOC_BYTES = 10 * 1024 * 1024;
export const ALLOWED_DOC_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const STATUS_LABELS: Record<VerificationStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted, awaiting review',
  under_review: 'Under review',
  approved: 'Approved, verified',
  rejected: 'Rejected',
  revoked: 'Badge revoked',
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StoredDoc {
  path: string;
  name: string;
  contentType: string;
  size: number;
  uploadedAt: number;
}

export interface ChecklistEntry {
  legible: boolean;
  valid: boolean;
  matchesCompany: boolean;
}

export interface SellerProfile {
  uid: string;
  displayName: string;
  sellerType: SellerType;
  location?: string;
  bio?: string;
}

export interface SellerVerification {
  uid: string;
  companyName: string;
  registrationNumber: string;
  vatNumber: string;
  country: string;
  address: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  documents: Record<string, StoredDoc>;
  status: VerificationStatus;
  submissionCount?: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  submittedAt?: Timestamp;
  // admin-only fields
  checklist?: Record<string, ChecklistEntry>;
  reviewedAt?: Timestamp;
  reviewedBy?: string;
  reviewerEmail?: string;
  rejectionReason?: string;
  approvedAt?: Timestamp;
  revokedAt?: Timestamp;
}

export type VerificationFields = Pick<
  SellerVerification,
  'companyName' | 'registrationNumber' | 'vatNumber' | 'country' | 'address' | 'contactName' | 'contactEmail' | 'contactPhone' | 'documents'
>;

export type ListingStatus = 'pending' | 'active' | 'removed';

export interface ListingDoc {
  id: string;
  sellerUid: string;
  sellerName: string;
  sellerType: SellerType;
  title: string;
  category: string;
  price: number;
  currency: 'ZAR';
  condition: string;
  description: string;
  imageUrl: string;
  imagePath: string;
  inStock: boolean;
  status: ListingStatus;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  moderatedBy?: string;
  moderatedAt?: Timestamp;
  moderationReason?: string;
}

export type ListingInput = Pick<ListingDoc, 'title' | 'category' | 'price' | 'condition' | 'description' | 'imageUrl' | 'imagePath' | 'inStock'>;

export type PurchaseStatus = 'pending' | 'accepted' | 'declined' | 'cancelled' | 'completed';

export interface PurchaseRequest {
  id: string;
  listingId: string;
  listingTitle: string;
  price: number;
  currency: 'ZAR';
  sellerUid: string;
  buyerUid: string;
  buyerName: string;
  buyerContact: string;
  message: string;
  status: PurchaseStatus;
  sellerReply: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Review {
  id: string;
  requestId: string;
  listingId: string;
  sellerUid: string;
  reviewerUid: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt?: Timestamp;
}

export interface VerifiedSeller {
  uid: string;
  companyName: string;
  approvedAt?: Timestamp;
}

export interface AuditEntry {
  id: string;
  action: string;
  targetType: string;
  targetId: string;
  targetLabel?: string;
  details?: string;
  actorUid: string;
  actorEmail: string;
  at?: Timestamp;
}

export interface Actor {
  uid: string;
  email: string | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function formatZar(amount: number): string {
  try {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);
  } catch {
    return `R ${amount.toFixed(2)}`;
  }
}

export function formatTs(ts?: Timestamp | null): string {
  if (!ts || typeof (ts as any).toDate !== 'function') return '—';
  return ts.toDate().toLocaleString('en-ZA', { dateStyle: 'medium', timeStyle: 'short' });
}

function tsMillis(ts?: Timestamp | null): number {
  return ts && typeof (ts as any).toMillis === 'function' ? ts.toMillis() : 0;
}

function safeFileName(name: string): string {
  return name.replace(/[^A-Za-z0-9._-]+/g, '_').slice(-80) || 'file';
}

/** Returns an error message, or null when the file is acceptable. */
export function validateDocFile(file: File): string | null {
  const ext = file.name.toLowerCase().split('.').pop() || '';
  const typeOk = ALLOWED_DOC_TYPES.includes(file.type) && ['pdf', 'jpg', 'jpeg', 'png'].includes(ext);
  if (!typeOk) return 'Only PDF, JPG or PNG files are accepted.';
  if (file.size > MAX_DOC_BYTES) return 'File is larger than 10 MB.';
  if (file.size === 0) return 'File is empty.';
  return null;
}

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return 'Photo must be JPG, PNG or WebP.';
  if (file.size > MAX_IMAGE_BYTES) return 'Photo is larger than 5 MB.';
  return null;
}

function friendlyError(err: unknown): string {
  const code = (err as any)?.code as string | undefined;
  if (code === 'permission-denied' || code === 'storage/unauthorized') {
    return 'Permission denied. Make sure you are signed in (the security rules may also need deploying).';
  }
  if (code === 'unavailable') return 'You appear to be offline. Try again when connected.';
  return (err as any)?.message || 'Something went wrong.';
}
export { friendlyError };

function requireFirebase() {
  if (!isFirebaseConfigured) throw new Error('Firebase is not configured for this build.');
}

// ---------------------------------------------------------------------------
// Uploads
// ---------------------------------------------------------------------------

export function uploadSellerDoc(uid: string, docType: string, file: File, onProgress?: (pct: number) => void): Promise<StoredDoc> {
  requireFirebase();
  const err = validateDocFile(file);
  if (err) return Promise.reject(new Error(err));
  const path = `sellerDocs/${uid}/${docType}/${Date.now()}_${safeFileName(file.name)}`;
  const task = uploadBytesResumable(ref(storage, path), file, { contentType: file.type });
  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      snap => onProgress?.(snap.totalBytes ? Math.round((snap.bytesTransferred / snap.totalBytes) * 100) : 0),
      e => reject(new Error(friendlyError(e))),
      () => resolve({ path, name: file.name, contentType: file.type, size: file.size, uploadedAt: Date.now() })
    );
  });
}

export function uploadListingImage(uid: string, file: File, onProgress?: (pct: number) => void): Promise<{ url: string; path: string }> {
  requireFirebase();
  const err = validateImageFile(file);
  if (err) return Promise.reject(new Error(err));
  const path = `listingImages/${uid}/${Date.now()}_${safeFileName(file.name)}`;
  const task = uploadBytesResumable(ref(storage, path), file, { contentType: file.type });
  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      snap => onProgress?.(snap.totalBytes ? Math.round((snap.bytesTransferred / snap.totalBytes) * 100) : 0),
      e => reject(new Error(friendlyError(e))),
      async () => {
        try {
          resolve({ url: await getDownloadURL(task.snapshot.ref), path });
        } catch (e) {
          reject(new Error(friendlyError(e)));
        }
      }
    );
  });
}

/** Signed download URL for a private seller document (owner / admin only). */
export function getSellerDocUrl(path: string): Promise<string> {
  requireFirebase();
  return getDownloadURL(ref(storage, path));
}

// ---------------------------------------------------------------------------
// Seller profile & verification (seller side)
// ---------------------------------------------------------------------------

export function subscribeSellerProfile(uid: string, cb: (p: SellerProfile | null) => void, onError?: (e: unknown) => void) {
  if (!isFirebaseConfigured) {
    cb(null);
    return () => {};
  }
  return onSnapshot(
    doc(db, 'sellers', uid),
    snap => cb(snap.exists() ? (snap.data() as SellerProfile) : null),
    e => {
      cb(null);
      onError?.(e);
    }
  );
}

export async function saveSellerProfile(uid: string, profile: Omit<SellerProfile, 'uid'>, exists: boolean) {
  requireFirebase();
  const data = {
    uid,
    displayName: profile.displayName.trim().slice(0, 80),
    sellerType: profile.sellerType,
    location: (profile.location || '').trim().slice(0, 80),
    bio: (profile.bio || '').trim().slice(0, 600),
    updatedAt: serverTimestamp(),
    ...(exists ? {} : { createdAt: serverTimestamp() }),
  };
  if (exists) await updateDoc(doc(db, 'sellers', uid), data);
  else await setDoc(doc(db, 'sellers', uid), data);
}

export function subscribeMyVerification(uid: string, cb: (v: SellerVerification | null) => void, onError?: (e: unknown) => void) {
  if (!isFirebaseConfigured) {
    cb(null);
    return () => {};
  }
  return onSnapshot(
    doc(db, 'sellerVerifications', uid),
    snap => cb(snap.exists() ? (snap.data() as SellerVerification) : null),
    e => {
      cb(null);
      onError?.(e);
    }
  );
}

export function missingRequiredDocs(docs: Record<string, StoredDoc>): DocTypeDef[] {
  return VERIFICATION_DOC_TYPES.filter(d => d.required && !docs[d.key]);
}

/** Save a draft or submit the application. `existing` is the current doc (or null). */
export async function saveVerification(uid: string, fields: VerificationFields, submit: boolean, existing: SellerVerification | null) {
  requireFirebase();
  if (existing && (existing.status === 'approved' || existing.status === 'under_review')) {
    throw new Error('This application is locked while it is under review or approved.');
  }
  const clean: VerificationFields = {
    companyName: fields.companyName.trim().slice(0, 160),
    registrationNumber: fields.registrationNumber.trim().slice(0, 60),
    vatNumber: fields.vatNumber.trim().slice(0, 40),
    country: fields.country.trim().slice(0, 60),
    address: fields.address.trim().slice(0, 400),
    contactName: fields.contactName.trim().slice(0, 120),
    contactEmail: fields.contactEmail.trim().slice(0, 160),
    contactPhone: fields.contactPhone.trim().slice(0, 40),
    documents: fields.documents,
  };
  if (submit) {
    const missing = missingRequiredDocs(clean.documents);
    if (missing.length) throw new Error(`Upload the required documents first: ${missing.map(m => m.label).join(', ')}.`);
    if (clean.companyName.length < 2 || clean.registrationNumber.length < 4 || clean.address.length < 6 || clean.contactEmail.length < 4) {
      throw new Error('Company name, registration number, address and contact email are required.');
    }
  }
  const ref_ = doc(db, 'sellerVerifications', uid);
  const base = {
    ...clean,
    uid,
    status: (submit ? 'submitted' : 'draft') as VerificationStatus,
    updatedAt: serverTimestamp(),
    ...(submit ? { submittedAt: serverTimestamp(), submissionCount: (existing?.submissionCount || 0) + 1 } : {}),
  };
  if (existing) await updateDoc(ref_, base);
  else await setDoc(ref_, { ...base, createdAt: serverTimestamp(), ...(submit ? {} : { submissionCount: 0 }) });
}

// ---------------------------------------------------------------------------
// Verified sellers (public badge)
// ---------------------------------------------------------------------------

export function subscribeVerifiedSellers(cb: (m: Map<string, VerifiedSeller>) => void) {
  if (!isFirebaseConfigured) {
    cb(new Map());
    return () => {};
  }
  return onSnapshot(
    collection(db, 'verifiedSellers'),
    snap => {
      const m = new Map<string, VerifiedSeller>();
      snap.forEach(d => m.set(d.id, { ...(d.data() as VerifiedSeller), uid: d.id }));
      cb(m);
    },
    () => cb(new Map())
  );
}

export function useVerifiedSellers(): Map<string, VerifiedSeller> {
  const [m, setM] = useState<Map<string, VerifiedSeller>>(new Map());
  useEffect(() => subscribeVerifiedSellers(setM), []);
  return m;
}

// ---------------------------------------------------------------------------
// Listings
// ---------------------------------------------------------------------------

function mapListings(snap: { forEach: (fn: (d: any) => void) => void }): ListingDoc[] {
  const out: ListingDoc[] = [];
  snap.forEach(d => out.push({ ...(d.data() as ListingDoc), id: d.id }));
  return out.sort((a, b) => tsMillis(b.createdAt) - tsMillis(a.createdAt));
}

export function subscribeActiveListings(cb: (l: ListingDoc[]) => void, onError?: (e: unknown) => void) {
  if (!isFirebaseConfigured) {
    cb([]);
    return () => {};
  }
  return onSnapshot(
    query(collection(db, 'listings'), where('status', '==', 'active')),
    snap => cb(mapListings(snap)),
    e => {
      cb([]);
      onError?.(e);
    }
  );
}

export function subscribeMyListings(uid: string, cb: (l: ListingDoc[]) => void) {
  if (!isFirebaseConfigured) {
    cb([]);
    return () => {};
  }
  return onSnapshot(
    query(collection(db, 'listings'), where('sellerUid', '==', uid)),
    snap => cb(mapListings(snap)),
    () => cb([])
  );
}

export function subscribeAllListings(cb: (l: ListingDoc[]) => void, onError?: (e: unknown) => void) {
  return onSnapshot(
    query(collection(db, 'listings'), limit(500)),
    snap => cb(mapListings(snap)),
    e => onError?.(e)
  );
}

export async function createListing(
  seller: { uid: string; displayName: string; sellerType: SellerType },
  input: ListingInput,
  isVerified: boolean
) {
  requireFirebase();
  if (BUSINESS_CATEGORIES.includes(input.category) && !isVerified) {
    throw new Error(`"${input.category}" is only open to verified companies.`);
  }
  await addDoc(collection(db, 'listings'), {
    sellerUid: seller.uid,
    sellerName: seller.displayName.slice(0, 80),
    sellerType: seller.sellerType,
    title: input.title.trim().slice(0, 140),
    category: input.category,
    price: Math.round(input.price * 100) / 100,
    currency: 'ZAR',
    condition: input.condition,
    description: input.description.trim().slice(0, 4000),
    imageUrl: input.imageUrl,
    imagePath: input.imagePath,
    inStock: input.inStock,
    status: isVerified ? 'active' : 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateListingContent(
  listing: ListingDoc,
  seller: { displayName: string; sellerType: SellerType },
  input: ListingInput,
  isVerified: boolean
) {
  requireFirebase();
  if (BUSINESS_CATEGORIES.includes(input.category) && !isVerified) {
    throw new Error(`"${input.category}" is only open to verified companies.`);
  }
  await updateDoc(doc(db, 'listings', listing.id), {
    sellerName: seller.displayName.slice(0, 80),
    sellerType: seller.sellerType,
    title: input.title.trim().slice(0, 140),
    category: input.category,
    price: Math.round(input.price * 100) / 100,
    condition: input.condition,
    description: input.description.trim().slice(0, 4000),
    imageUrl: input.imageUrl,
    imagePath: input.imagePath,
    inStock: input.inStock,
    status: isVerified ? 'active' : 'pending',
    updatedAt: serverTimestamp(),
  });
}

export async function setListingStock(id: string, inStock: boolean) {
  await updateDoc(doc(db, 'listings', id), { inStock, updatedAt: serverTimestamp() });
}

export async function deleteListing(id: string) {
  await deleteDoc(doc(db, 'listings', id));
}

// ---------------------------------------------------------------------------
// Purchase requests ("Request to buy", no payments)
// ---------------------------------------------------------------------------

export async function createPurchaseRequest(
  listing: { id: string; title: string; price: number; sellerUid: string },
  buyer: { uid: string; name: string },
  contact: string,
  message: string
) {
  requireFirebase();
  if (buyer.uid === listing.sellerUid) throw new Error("You can't request your own listing.");
  await addDoc(collection(db, 'purchaseRequests'), {
    listingId: listing.id,
    listingTitle: listing.title.slice(0, 140),
    price: listing.price,
    currency: 'ZAR',
    sellerUid: listing.sellerUid,
    buyerUid: buyer.uid,
    buyerName: buyer.name.slice(0, 80) || 'Buyer',
    buyerContact: contact.trim().slice(0, 200),
    message: message.trim().slice(0, 2000),
    status: 'pending',
    sellerReply: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

function mapRequests(snap: { forEach: (fn: (d: any) => void) => void }): PurchaseRequest[] {
  const out: PurchaseRequest[] = [];
  snap.forEach(d => out.push({ ...(d.data() as PurchaseRequest), id: d.id }));
  return out.sort((a, b) => tsMillis(b.createdAt) - tsMillis(a.createdAt));
}

export function subscribeRequests(uid: string, as: 'buyer' | 'seller', cb: (r: PurchaseRequest[]) => void) {
  if (!isFirebaseConfigured) {
    cb([]);
    return () => {};
  }
  return onSnapshot(
    query(collection(db, 'purchaseRequests'), where(as === 'buyer' ? 'buyerUid' : 'sellerUid', '==', uid)),
    snap => cb(mapRequests(snap)),
    () => cb([])
  );
}

export async function respondToRequest(id: string, status: PurchaseStatus, sellerReply: string) {
  await updateDoc(doc(db, 'purchaseRequests', id), {
    status,
    sellerReply: sellerReply.trim().slice(0, 2000),
    updatedAt: serverTimestamp(),
  });
}

export async function cancelRequest(id: string) {
  await updateDoc(doc(db, 'purchaseRequests', id), { status: 'cancelled', updatedAt: serverTimestamp() });
}

// ---------------------------------------------------------------------------
// Reviews → ratings
// ---------------------------------------------------------------------------

export function subscribeReviews(cb: (r: Review[]) => void) {
  if (!isFirebaseConfigured) {
    cb([]);
    return () => {};
  }
  return onSnapshot(
    query(collection(db, 'reviews'), limit(1000)),
    snap => {
      const out: Review[] = [];
      snap.forEach(d => out.push({ ...(d.data() as Review), id: d.id }));
      cb(out.sort((a, b) => tsMillis(b.createdAt) - tsMillis(a.createdAt)));
    },
    () => cb([])
  );
}

export function computeSellerRatings(reviews: Review[]): Map<string, { avg: number; count: number }> {
  const acc = new Map<string, { sum: number; count: number }>();
  for (const r of reviews) {
    const cur = acc.get(r.sellerUid) || { sum: 0, count: 0 };
    cur.sum += r.rating;
    cur.count += 1;
    acc.set(r.sellerUid, cur);
  }
  const out = new Map<string, { avg: number; count: number }>();
  acc.forEach((v, k) => out.set(k, { avg: v.sum / v.count, count: v.count }));
  return out;
}

export async function createReview(req: PurchaseRequest, reviewerName: string, rating: number, comment: string) {
  requireFirebase();
  const existing = await getDoc(doc(db, 'reviews', req.id)).catch(() => null);
  if (existing?.exists()) throw new Error('You already reviewed this purchase.');
  await setDoc(doc(db, 'reviews', req.id), {
    requestId: req.id,
    listingId: req.listingId,
    sellerUid: req.sellerUid,
    reviewerUid: req.buyerUid,
    reviewerName: reviewerName.slice(0, 80) || 'Buyer',
    rating: Math.max(1, Math.min(5, Math.round(rating))),
    comment: comment.trim().slice(0, 1000),
    createdAt: serverTimestamp(),
  });
}

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------

export function subscribeVerificationQueue(cb: (v: SellerVerification[]) => void, onError?: (e: unknown) => void) {
  return onSnapshot(
    query(collection(db, 'sellerVerifications'), limit(500)),
    snap => {
      const out: SellerVerification[] = [];
      snap.forEach(d => out.push({ ...(d.data() as SellerVerification), uid: d.id }));
      cb(out.sort((a, b) => tsMillis(b.submittedAt || b.updatedAt) - tsMillis(a.submittedAt || a.updatedAt)));
    },
    e => onError?.(e)
  );
}

/** Count of applications waiting for an admin (submitted or under review). */
export function usePendingVerificationsCount(enabled: boolean): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled || !isFirebaseConfigured) {
      setCount(0);
      return;
    }
    return onSnapshot(
      query(collection(db, 'sellerVerifications'), where('status', 'in', ['submitted', 'under_review'])),
      snap => setCount(snap.size),
      () => setCount(0)
    );
  }, [enabled]);
  return count;
}

export function subscribeAuditLog(cb: (a: AuditEntry[]) => void, onError?: (e: unknown) => void) {
  return onSnapshot(
    query(collection(db, 'adminAuditLog'), orderBy('at', 'desc'), limit(200)),
    snap => {
      const out: AuditEntry[] = [];
      snap.forEach(d => out.push({ ...(d.data() as AuditEntry), id: d.id }));
      cb(out);
    },
    e => onError?.(e)
  );
}

export function auditRef() {
  return doc(collection(db, 'adminAuditLog'));
}

export function auditData(actor: Actor, action: string, targetType: string, targetId: string, targetLabel: string, details: string) {
  return {
    action,
    targetType,
    targetId,
    targetLabel: targetLabel.slice(0, 200),
    details: details.slice(0, 2000),
    actorUid: actor.uid,
    actorEmail: actor.email || '',
    at: serverTimestamp(),
  };
}

/**
 * Move an application to a new status. Writes, in ONE batch:
 *  - sellerVerifications/{uid} status + reviewer fields
 *  - verifiedSellers/{uid}: created on approve, deleted on reject/revoke
 *  - adminAuditLog entry (who / when / what)
 */
export async function adminSetVerificationStatus(
  app: SellerVerification,
  status: 'under_review' | 'approved' | 'rejected' | 'revoked',
  actor: Actor,
  opts: { reason?: string; checklist?: Record<string, ChecklistEntry> } = {}
) {
  const reason = (opts.reason || '').trim();
  if ((status === 'rejected' || status === 'revoked') && !reason) throw new Error('A reason is required.');
  const batch = writeBatch(db);
  const vRef = doc(db, 'sellerVerifications', app.uid);
  const update: Record<string, unknown> = {
    status,
    reviewedAt: serverTimestamp(),
    reviewedBy: actor.uid,
    reviewerEmail: actor.email || '',
    updatedAt: serverTimestamp(),
  };
  if (opts.checklist) update.checklist = opts.checklist;
  if (status === 'rejected' || status === 'revoked') update.rejectionReason = reason.slice(0, 1000);
  if (status === 'approved') update.approvedAt = serverTimestamp();
  if (status === 'revoked') update.revokedAt = serverTimestamp();
  batch.update(vRef, update);

  const badgeRef = doc(db, 'verifiedSellers', app.uid);
  if (status === 'approved') {
    batch.set(badgeRef, { uid: app.uid, companyName: app.companyName.slice(0, 160) || 'Verified company', approvedAt: serverTimestamp() });
  } else if (status === 'rejected' || status === 'revoked') {
    batch.delete(badgeRef);
  }

  const action = { under_review: 'verification.start_review', approved: 'verification.approve', rejected: 'verification.reject', revoked: 'verification.revoke' }[status];
  batch.set(auditRef(), auditData(actor, action, 'sellerVerification', app.uid, app.companyName || app.uid, reason));
  await batch.commit();
}

export async function adminModerateListing(listing: ListingDoc, status: ListingStatus, actor: Actor, reason = '') {
  const batch = writeBatch(db);
  batch.update(doc(db, 'listings', listing.id), {
    status,
    moderatedBy: actor.uid,
    moderatedAt: serverTimestamp(),
    moderationReason: reason.trim().slice(0, 1000),
    updatedAt: serverTimestamp(),
  });
  const action = status === 'active' ? 'listing.approve' : status === 'removed' ? 'listing.remove' : 'listing.set_pending';
  batch.set(auditRef(), auditData(actor, action, 'listing', listing.id, listing.title, reason));
  await batch.commit();
}

export async function adminDeleteListing(listing: ListingDoc, actor: Actor, reason = '') {
  const batch = writeBatch(db);
  batch.delete(doc(db, 'listings', listing.id));
  batch.set(auditRef(), auditData(actor, 'listing.delete', 'listing', listing.id, listing.title, reason));
  await batch.commit();
}

export async function adminLogDocumentOpened(app: SellerVerification, docKey: string, actor: Actor) {
  const batch = writeBatch(db);
  batch.set(auditRef(), auditData(actor, 'verification.open_document', 'sellerVerification', app.uid, app.companyName || app.uid, docKey));
  await batch.commit().catch(() => {});
}
