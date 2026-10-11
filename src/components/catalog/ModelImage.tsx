import React, { useEffect, useRef, useState } from 'react';
import DeviceTypeIcon from './DeviceTypeIcon';
import type { CatalogDeviceType } from '../../data/catalog/types';

const memory = new Map<string, Promise<string | null>>();
const STORE_KEY = 'diy.modelImage.v1';

function readStore(): Record<string, string | null> {
  try { return JSON.parse(sessionStorage.getItem(STORE_KEY) || '{}'); } catch { return {}; }
}

function lookup(q: string): Promise<string | null> {
  const key = q.toLowerCase();
  const stored = readStore();
  if (key in stored) return Promise.resolve(stored[key]);
  if (!memory.has(key)) {
    memory.set(key, fetch(`/api/model-image?q=${encodeURIComponent(q)}`)
      .then((r) => (r.ok ? r.json() : { url: null }))
      .then((j) => {
        const url = typeof j?.url === 'string' ? j.url : null;
        try { const s = readStore(); s[key] = url; sessionStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch { /* quota */ }
        return url;
      })
      .catch(() => null));
  }
  return memory.get(key)!;
}

/**
 * Model picture: curated imageUrl -> /api/model-image (Wikipedia thumbnail) -> device-type illustration.
 * Requests are only made once the tile scrolls into view.
 */
export default function ModelImage({ query, imageUrl, type, className = 'w-14 h-14', iconClassName = 'w-6 h-6' }: {
  query: string; imageUrl?: string; type: Pick<CatalogDeviceType, 'key' | 'family' | 'group'>; className?: string; iconClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(imageUrl || null);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setSrc(imageUrl || null);
    setFailed(false);
  }, [imageUrl, query]);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setVisible(true); io.disconnect(); }
    }, { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible || imageUrl) return;
    let alive = true;
    lookup(query).then((url) => { if (alive) setSrc(url); });
    return () => { alive = false; };
  }, [visible, query, imageUrl]);

  return (
    <div ref={ref} className={`${className} shrink-0`}>
      {src && !failed ? (
        <div className="w-full h-full rounded-xl bg-white border border-stone-200 dark:border-stone-700 overflow-hidden flex items-center justify-center">
          <img src={src} alt={query} loading="lazy" decoding="async" referrerPolicy="no-referrer" className="max-w-full max-h-full object-contain" onError={() => setFailed(true)} />
        </div>
      ) : (
        <DeviceTypeIcon type={type} className="w-full h-full" iconClassName={iconClassName} />
      )}
    </div>
  );
}
