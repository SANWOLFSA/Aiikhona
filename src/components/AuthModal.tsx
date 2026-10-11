import { useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import type { UserProfile } from '../types';
import { auth, isFirebaseConfigured } from '../lib/firebase';
import AuthPanel from './AuthPanel';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

/**
 * In-app account modal (opened from the header avatar).
 * Guests can sign in or create a real account here; signed-in users see who they are.
 * Uses the same real Firebase flow as the welcome page; no fake badge/PIN sign-in.
 */
export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const fbUser = isFirebaseConfigured ? auth.currentUser : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Account"
    >
      <div
        className="relative w-full sm:max-w-md max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-white"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {fbUser ? (
          <div className="text-center space-y-3 py-4">
            <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500" />
            <h2 className="text-xl font-extrabold">You're signed in</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 break-all">{fbUser.email || fbUser.displayName}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 text-white font-semibold text-sm"
            >
              Back to the bench
            </button>
          </div>
        ) : (
          <AuthPanel
            showGuest={false}
            notice="You're browsing as a guest. Sign in or create an account to save your progress."
            onLoginSuccess={user => {
              onLoginSuccess(user);
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
}
