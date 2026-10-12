import React, { Suspense, lazy } from 'react';

// The device catalog (types, ~2.8k models, legacy field notes) is large; keep it out of the main bundle.
const DeviceDirectoryView = lazy(() => import('../DeviceDirectoryView'));

type Props = React.ComponentProps<typeof DeviceDirectoryView>;

export default function LazyDeviceDirectory(props: Props) {
  return (
    <Suspense fallback={<div className="ds-page"><div className="rounded-2xl p-8 text-center text-sm text-stone-500 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 animate-pulse">Loading device directory…</div></div>}>
      <DeviceDirectoryView {...props} />
    </Suspense>
  );
}
