import { useCallback, useEffect, useRef, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';
import {
  SESSION_CHECK_INTERVAL_MS,
  SESSION_MAX_MS,
  SESSION_WARNING_MS,
  clearSessionStart,
  flagSessionExpired,
  getSessionStart,
  startSession
} from './session';

export interface SessionTimeoutState {
  /** Milliseconds left in this session, or null until the start time is known. */
  msRemaining: number | null;
  /** True during the last few minutes before expiry (unless dismissed). */
  showWarning: boolean;
  dismissWarning: () => void;
  /** Call after a successful re-authentication to begin a fresh session window. */
  renewSession: () => void;
}

/** Firebase's auth_time (last real sign-in, not token refresh) in ms, if signed in. */
async function getFirebaseAuthTime(): Promise<number | null> {
  if (!isFirebaseConfigured) return null;
  try {
    await auth.authStateReady();
    const user = auth.currentUser;
    if (!user) return null;
    const result = await user.getIdTokenResult();
    const t = Date.parse(result.authTime);
    return Number.isFinite(t) ? t : null;
  } catch {
    return null;
  }
}

/**
 * Signs the user out SESSION_MAX_HOURS (default 5h, VITE_SESSION_HOURS) after sign-in.
 * Checks on mount, when the tab becomes visible/focused, every minute, and at the exact
 * expiry moment. Applies to Firebase users and local guest sessions alike.
 */
export function useSessionTimeout(
  isAuthenticated: boolean,
  onExpired: () => void | Promise<void>
): SessionTimeoutState {
  const [startAt, setStartAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [warningDismissed, setWarningDismissed] = useState(false);
  const expiringRef = useRef(false);
  const onExpiredRef = useRef(onExpired);
  onExpiredRef.current = onExpired;

  // Work out when this session started: the later of our own record and Firebase auth_time.
  useEffect(() => {
    if (!isAuthenticated) {
      setStartAt(null);
      expiringRef.current = false;
      return;
    }
    let cancelled = false;
    (async () => {
      const stored = getSessionStart();
      const authTime = await getFirebaseAuthTime();
      if (cancelled) return;
      let start: number;
      if (stored && authTime) start = Math.max(stored, authTime);
      else if (stored) start = stored;
      else if (authTime) start = authTime;
      else start = Date.now(); // legacy session with no record: start the clock now
      if (start !== stored) startSession(start);
      setStartAt(start);
      setNow(Date.now());
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const expire = useCallback(async () => {
    if (expiringRef.current) return;
    expiringRef.current = true;
    flagSessionExpired();
    clearSessionStart();
    try {
      if (isFirebaseConfigured && auth.currentUser) await signOut(auth);
    } catch (err) {
      console.warn('[session] Firebase sign-out failed during expiry.', err);
    }
    await onExpiredRef.current();
  }, []);

  const check = useCallback(() => {
    if (!isAuthenticated) return;
    // Another tab may have renewed or ended the session.
    const stored = getSessionStart();
    const effectiveStart = stored ?? startAt;
    if (stored && stored !== startAt) setStartAt(stored);
    const t = Date.now();
    setNow(t);
    if (effectiveStart && t - effectiveStart >= SESSION_MAX_MS) void expire();
  }, [isAuthenticated, startAt, expire]);

  // Periodic + visibility/focus/cross-tab checks.
  useEffect(() => {
    if (!isAuthenticated || startAt === null) return;
    check();
    const interval = window.setInterval(check, SESSION_CHECK_INTERVAL_MS);
    const onVisible = () => {
      if (document.visibilityState === 'visible') check();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', check);
    window.addEventListener('storage', check);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', check);
      window.removeEventListener('storage', check);
    };
  }, [isAuthenticated, startAt, check]);

  // Exact-moment timers for the warning and the expiry (setTimeout caps at ~24.8 days).
  useEffect(() => {
    if (!isAuthenticated || startAt === null) return;
    const MAX_TIMEOUT = 2_147_000_000;
    const timers: number[] = [];
    const untilExpiry = startAt + SESSION_MAX_MS - Date.now();
    const untilWarning = untilExpiry - SESSION_WARNING_MS;
    if (untilWarning > 0 && untilWarning < MAX_TIMEOUT) timers.push(window.setTimeout(check, untilWarning));
    if (untilExpiry > 0 && untilExpiry < MAX_TIMEOUT) timers.push(window.setTimeout(check, untilExpiry + 250));
    return () => timers.forEach(id => window.clearTimeout(id));
  }, [isAuthenticated, startAt, check]);

  // While the warning is showing, tick every 15s so the countdown stays accurate.
  const msRemaining = startAt === null ? null : Math.max(0, startAt + SESSION_MAX_MS - now);
  const inWarningWindow = msRemaining !== null && msRemaining > 0 && msRemaining <= SESSION_WARNING_MS;
  useEffect(() => {
    if (!inWarningWindow) return;
    const id = window.setInterval(check, 15_000);
    return () => window.clearInterval(id);
  }, [inWarningWindow, check]);

  useEffect(() => {
    if (!inWarningWindow) setWarningDismissed(false);
  }, [inWarningWindow]);

  const renewSession = useCallback(() => {
    const t = Date.now();
    startSession(t);
    setStartAt(t);
    setNow(t);
    setWarningDismissed(false);
  }, []);

  return {
    msRemaining,
    showWarning: inWarningWindow && !warningDismissed,
    dismissWarning: () => setWarningDismissed(true),
    renewSession
  };
}
