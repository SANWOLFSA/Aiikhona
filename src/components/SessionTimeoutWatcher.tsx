import { useState } from 'react';
import { Clock, X, Loader2 } from 'lucide-react';
import {
  EmailAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useSessionTimeout } from '../lib/useSessionTimeout';
import { friendlyAuthError } from '../lib/authFlow';

/**
 * Mount once inside the signed-in app. Enforces the session time limit and shows a
 * gentle warning a few minutes before automatic sign-out.
 */
export default function SessionTimeoutWatcher({
  isAuthenticated,
  onExpired
}: {
  isAuthenticated: boolean;
  onExpired: () => void | Promise<void>;
}) {
  const { msRemaining, showWarning, dismissWarning, renewSession } = useSessionTimeout(isAuthenticated, onExpired);
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (!showWarning || msRemaining === null) return null;

  const minutes = Math.max(1, Math.ceil(msRemaining / 60000));
  const fbUser = auth.currentUser;
  const providerId = fbUser?.providerData[0]?.providerId;
  const canPopup = providerId === 'google.com' || providerId === 'facebook.com';
  const canPassword = providerId === 'password' && !!fbUser?.email;

  const stay = async () => {
    if (!fbUser) return;
    setBusy(true);
    setError('');
    try {
      if (canPopup) {
        const provider = providerId === 'google.com' ? new GoogleAuthProvider() : new FacebookAuthProvider();
        await reauthenticateWithPopup(fbUser, provider);
      } else if (canPassword) {
        await reauthenticateWithCredential(fbUser, EmailAuthProvider.credential(fbUser.email!, password));
      }
      setPassword('');
      renewSession();
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed z-[60] bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-96 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl shadow-indigo-500/10 p-4 text-slate-800 dark:text-slate-100"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center text-white">
          <Clock className="w-4.5 h-4.5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold">Signing you out in about {minutes} min</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            For your security, sessions end after a few hours. Save anything you're working on.
          </p>
        </div>
        <button
          type="button"
          onClick={dismissWarning}
          aria-label="Dismiss"
          className="shrink-0 p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {(canPopup || canPassword) && (
        <form
          className="mt-3 flex flex-col gap-2"
          onSubmit={e => {
            e.preventDefault();
            void stay();
          }}
        >
          {canPassword && (
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
          <button
            type="submit"
            disabled={busy || (canPassword && !password)}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {busy && <Loader2 className="w-4 h-4 animate-spin" />}
            Stay signed in
          </button>
          {error && <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>}
        </form>
      )}
    </div>
  );
}
