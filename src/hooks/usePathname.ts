// Tiny History-API router (no dependency). Shared by App tab sync and the Devices drill-down.
import React, { useSyncExternalStore } from 'react';

const NAV_EVENT = 'app:navigate';

function subscribe(cb: () => void) {
  window.addEventListener('popstate', cb);
  window.addEventListener(NAV_EVENT, cb);
  return () => {
    window.removeEventListener('popstate', cb);
    window.removeEventListener(NAV_EVENT, cb);
  };
}

const snapshot = () => window.location.pathname + window.location.search;

export function navigate(to: string, opts: { replace?: boolean; keepScroll?: boolean } = {}) {
  if (to === snapshot()) return;
  window.history[opts.replace ? 'replaceState' : 'pushState']({}, '', to);
  window.dispatchEvent(new Event(NAV_EVENT));
  if (!opts.keepScroll) window.scrollTo({ top: 0 });
}

export function usePathname(): { pathname: string; search: URLSearchParams } {
  const loc = useSyncExternalStore(subscribe, snapshot, () => (typeof window !== 'undefined' ? snapshot() : '/'));
  const q = loc.indexOf('?');
  const pathname = (q === -1 ? loc : loc.slice(0, q)).replace(/\/+$/, '') || '/';
  return { pathname, search: new URLSearchParams(q === -1 ? '' : loc.slice(q)) };
}

/** Anchor that navigates client-side but keeps real hrefs (open in new tab, copy link, SEO). */
export function RouteLink({ to, onClick, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  return React.createElement('a', {
    ...rest,
    href: to,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target === '_blank') return;
      e.preventDefault();
      navigate(to);
    },
  });
}
