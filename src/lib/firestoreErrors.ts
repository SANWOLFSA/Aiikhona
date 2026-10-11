import { auth } from './firebase';

/**
 * Log a Firestore/Storage failure with context and return a short message a user can act on.
 * Unlike handleFirestoreError() in firebase.ts this never throws, so callers can show the message.
 */
export function describeCloudError(error: unknown, action: string, path?: string): string {
  const code = String((error as { code?: string } | null)?.code || '');
  console.error('[cloud]', action, path || '', {
    code,
    message: error instanceof Error ? error.message : String(error),
    uid: auth.currentUser?.uid || null,
  });
  switch (code) {
    case 'permission-denied':
    case 'storage/unauthorized':
      return `You don't have permission to ${action}. Make sure you're signed in to your own account.`;
    case 'unauthenticated':
    case 'storage/unauthenticated':
      return `Please sign in to ${action}.`;
    case 'unavailable':
    case 'deadline-exceeded':
    case 'storage/retry-limit-exceeded':
      return `Couldn't reach the server to ${action}. Check your connection and try again.`;
    case 'resource-exhausted':
    case 'storage/quota-exceeded':
      return `Storage limit reached, so we couldn't ${action}.`;
    case 'storage/canceled':
      return 'Upload cancelled.';
    case 'storage/object-not-found':
    case 'not-found':
      return 'That item no longer exists.';
    case 'storage/invalid-argument':
    case 'invalid-argument':
      return `That file or value isn't valid, so we couldn't ${action}.`;
    default:
      if (/missing-firebase|api-key|not configured/i.test(String((error as Error)?.message || ''))) {
        return 'Cloud storage is not set up on this site yet.';
      }
      return `Something went wrong while trying to ${action}. Please try again.`;
  }
}

/** The signed-in Firebase user's uid, or null. Never a profile id or a made-up guest id. */
export function currentUid(): string | null {
  return auth.currentUser?.uid ?? null;
}
