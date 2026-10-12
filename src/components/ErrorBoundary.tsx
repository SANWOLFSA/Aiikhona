import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

/** Catches render errors so a crash shows a recovery screen instead of a blank page. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[app] Unhandled render error', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div role="alert" className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 px-4">
        <div className="max-w-md w-full text-center space-y-4 p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Something went wrong</h1>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            This page hit an unexpected error. Reloading usually fixes it. Your saved guides and settings are kept.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-cobalt-600 hover:bg-cobalt-500 text-white text-sm font-bold"
            >
              Reload
            </button>
            <button
              type="button"
              onClick={() => window.location.assign('/')}
              className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm font-bold"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }
}
