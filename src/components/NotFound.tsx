import { Compass } from 'lucide-react';

export default function NotFound({ onGoHome }: { onGoHome: () => void }) {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
        <Compass className="w-7 h-7" aria-hidden="true" />
      </div>
      <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100">Page not found</h1>
      <p className="text-sm text-stone-600 dark:text-stone-400">
        We couldn't find that page. The link may be old or mistyped.
      </p>
      <button
        type="button"
        onClick={onGoHome}
        className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-sm font-bold transition-colors"
      >
        Go to Home
      </button>
    </div>
  );
}
