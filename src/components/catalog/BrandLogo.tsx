import React, { useState } from 'react';

const PALETTE = ['from-blue-600 to-indigo-700', 'from-emerald-600 to-teal-700', 'from-rose-600 to-pink-700', 'from-amber-500 to-orange-600', 'from-violet-600 to-purple-700', 'from-cyan-600 to-sky-700', 'from-slate-600 to-slate-800'];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Official brand logo: Simple Icons brand mark -> site favicon (Google s2) -> coloured lettermark.
 */
export default function BrandLogo({ name, domain, simpleIconSlug, className = 'w-10 h-10' }: { name: string; domain?: string; simpleIconSlug?: string; className?: string }) {
  const sources = [
    simpleIconSlug ? `https://cdn.simpleicons.org/${simpleIconSlug}` : null,
    domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128` : null,
  ].filter(Boolean) as string[];
  const [idx, setIdx] = useState(0);

  if (idx < sources.length) {
    return (
      <div className={`${className} rounded-xl bg-white p-1.5 border border-stone-200 dark:border-stone-700 flex items-center justify-center shrink-0 overflow-hidden`}>
        <img
          src={sources[idx]}
          alt={`${name} logo`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="max-w-full max-h-full object-contain"
          onError={() => setIdx((i) => i + 1)}
          onLoad={(e) => {
            // Google returns a 16px globe for unknown domains; treat tiny images as a miss.
            const img = e.currentTarget;
            if (sources[idx].includes('s2/favicons') && img.naturalWidth > 0 && img.naturalWidth < 32) setIdx((i) => i + 1);
          }}
        />
      </div>
    );
  }
  const letters = name.replace(/\(.*?\)/g, '').trim().split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase() || '?';
  return (
    <div className={`${className} rounded-xl bg-gradient-to-br ${PALETTE[hash(name) % PALETTE.length]} text-white font-bold text-xs flex items-center justify-center shrink-0 tracking-wider`} aria-label={`${name} logo`}>
      {letters}
    </div>
  );
}
