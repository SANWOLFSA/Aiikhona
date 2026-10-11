/**
 * Session lifetime helpers.
 *
 * Every signed-in session (Firebase users AND local guest sessions) lasts at most
 * SESSION_MAX_HOURS. After that the user is signed out and sent back to the welcome page.
 * Override with VITE_SESSION_HOURS (e.g. "8" or "0.5") at build time.
 */

const DEFAULT_SESSION_HOURS = 5;

function readSessionHours(): number {
  const raw = import.meta.env.VITE_SESSION_HOURS;
  const parsed = raw ? Number(raw) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_SESSION_HOURS;
}

export const SESSION_MAX_HOURS = readSessionHours();
export const SESSION_MAX_MS = SESSION_MAX_HOURS * 60 * 60 * 1000;
/** Show the "about to expire" warning this long before the session ends. */
export const SESSION_WARNING_MS = Math.min(5 * 60 * 1000, SESSION_MAX_MS / 2);
/** How often the timer re-checks while the tab is open. */
export const SESSION_CHECK_INTERVAL_MS = 60 * 1000;

const SESSION_START_KEY = 'diyelectronics_session_started_at';
const EXPIRED_NOTICE_KEY = 'diyelectronics_session_expired_notice';

export const SESSION_EXPIRED_MESSAGE = 'Your session expired for security. Please sign in again.';

/** Record "now" as the start of a fresh session. Call on every successful sign-in. */
export function startSession(at: number = Date.now()): void {
  try {
    localStorage.setItem(SESSION_START_KEY, String(at));
  } catch {
    /* storage unavailable (private mode) – timer falls back to Firebase auth_time */
  }
}

export function getSessionStart(): number | null {
  try {
    const raw = localStorage.getItem(SESSION_START_KEY);
    const n = raw ? Number(raw) : NaN;
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

export function clearSessionStart(): void {
  try {
    localStorage.removeItem(SESSION_START_KEY);
  } catch {
    /* ignore */
  }
}

/** Leave a one-time notice for the welcome page to show after an automatic sign-out. */
export function flagSessionExpired(): void {
  try {
    sessionStorage.setItem(EXPIRED_NOTICE_KEY, '1');
  } catch {
    /* ignore */
  }
}

/** True if the last sign-out was a session expiry (read-only; see clearSessionExpiredNotice). */
export function peekSessionExpiredNotice(): boolean {
  try {
    return sessionStorage.getItem(EXPIRED_NOTICE_KEY) === '1';
  } catch {
    return false;
  }
}

export function clearSessionExpiredNotice(): void {
  try {
    sessionStorage.removeItem(EXPIRED_NOTICE_KEY);
  } catch {
    /* ignore */
  }
}
