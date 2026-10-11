// Best exam scores for the Electrical Theory Exam Room.
// Always stored in localStorage; mirrored to the signed-in user's Firestore doc
// (users/{uid}.theoryBestScores) when Firebase is configured. Firestore failures are ignored.
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './firebase';

export interface TheoryBestScore {
  key: string;
  label: string;
  percent: number;
  correct: number;
  total: number;
  timed: boolean;
  date: string; // ISO
}

const LS_KEY = 'diy.theory.bestScores.v1';

export function readBestScores(): Record<string, TheoryBestScore> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeLocal(scores: Record<string, TheoryBestScore>) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(scores));
  } catch {
    /* storage full or unavailable */
  }
}

function isBetter(a: TheoryBestScore, b?: TheoryBestScore) {
  if (!b) return true;
  if (a.percent !== b.percent) return a.percent > b.percent;
  return a.total > b.total;
}

/** Records a result; returns true if it is a new best for that key. */
export function recordScore(score: TheoryBestScore): boolean {
  const all = readBestScores();
  const improved = isBetter(score, all[score.key]);
  if (improved) {
    all[score.key] = score;
    writeLocal(all);
    void pushToCloud({ [score.key]: score });
  }
  return improved;
}

async function pushToCloud(partial: Record<string, TheoryBestScore>) {
  const uid = auth.currentUser?.uid;
  if (!isFirebaseConfigured || !uid) return;
  try {
    await setDoc(doc(db, 'users', uid), { theoryBestScores: partial }, { merge: true });
  } catch (err) {
    console.warn('[theory] could not sync best score to Firestore', err);
  }
}

/** Merges any cloud-saved best scores into localStorage (keeps the better of each). */
export async function syncBestScoresFromCloud(): Promise<Record<string, TheoryBestScore>> {
  const local = readBestScores();
  const uid = auth.currentUser?.uid;
  if (!isFirebaseConfigured || !uid) return local;
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    const cloud = (snap.exists() ? (snap.data()?.theoryBestScores as Record<string, TheoryBestScore> | undefined) : undefined) || {};
    let changed = false;
    const toPush: Record<string, TheoryBestScore> = {};
    for (const [k, v] of Object.entries(cloud)) {
      if (v && typeof v.percent === 'number' && isBetter(v, local[k])) {
        local[k] = v;
        changed = true;
      }
    }
    for (const [k, v] of Object.entries(local)) {
      if (isBetter(v, cloud[k])) toPush[k] = v;
    }
    if (changed) writeLocal(local);
    if (Object.keys(toPush).length) void pushToCloud(toPush);
  } catch (err) {
    console.warn('[theory] could not read best scores from Firestore', err);
  }
  return local;
}
