import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';

export interface LightboxItem {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  sourceUrl?: string;
}

/** Full-screen photo viewer: wheel / buttons / double-tap to zoom, drag to pan, two-finger pinch on mobile. */
export default function PhotoLightbox({ items, index, onClose, onIndex }: {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const item = items[index];
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ dist: number; scale: number; x: number; y: number; px: number; py: number } | null>(null);
  const lastTap = useRef(0);

  const reset = useCallback(() => { setScale(1); setPos({ x: 0, y: 0 }); }, []);
  useEffect(reset, [index, reset]);

  const go = useCallback((d: number) => {
    if (items.length < 2) return;
    onIndex((index + d + items.length) % items.length);
  }, [index, items.length, onIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === '+' || e.key === '=') setScale((s) => Math.min(8, s * 1.25));
      else if (e.key === '-') setScale((s) => Math.max(1, s / 1.25));
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [go, onClose]);

  useEffect(() => { if (scale <= 1) setPos({ x: 0, y: 0 }); }, [scale]);

  const startGesture = () => {
    const pts = [...pointers.current.values()];
    if (pts.length === 2) {
      gesture.current = { dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y), scale, x: pos.x, y: pos.y, px: 0, py: 0 };
    } else if (pts.length === 1) {
      gesture.current = { dist: 0, scale, x: pos.x, y: pos.y, px: pts[0].x, py: pts[0].y };
    } else gesture.current = null;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    startGesture();
    if (e.pointerType !== 'mouse' && pointers.current.size === 1) {
      const now = Date.now();
      if (now - lastTap.current < 300) setScale((s) => (s > 1 ? 1 : 2.5));
      lastTap.current = now;
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (!g) return;
    const pts = [...pointers.current.values()];
    if (pts.length === 2 && g.dist > 0) {
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      setScale(Math.min(8, Math.max(1, g.scale * (d / g.dist))));
    } else if (pts.length === 1 && scale > 1) {
      setPos({ x: g.x + (pts[0].x - g.px), y: g.y + (pts[0].y - g.py) });
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    startGesture();
  };
  const onWheel = (e: React.WheelEvent) => {
    setScale((s) => Math.min(8, Math.max(1, s * (e.deltaY < 0 ? 1.15 : 1 / 1.15))));
  };

  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[80] bg-black/95 flex flex-col" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <div className="flex items-center justify-between gap-2 p-3 text-white">
        <span className="text-xs font-semibold opacity-80 truncate">{index + 1} / {items.length} · {item.alt}</span>
        <div className="flex items-center gap-1">
          <button aria-label="Zoom out" onClick={() => setScale((s) => Math.max(1, s / 1.4))} className="p-2 rounded-xl hover:bg-white/10"><ZoomOut className="w-5 h-5" /></button>
          <span className="text-xs w-12 text-center tabular-nums">{Math.round(scale * 100)}%</span>
          <button aria-label="Zoom in" onClick={() => setScale((s) => Math.min(8, s * 1.4))} className="p-2 rounded-xl hover:bg-white/10"><ZoomIn className="w-5 h-5" /></button>
          <button aria-label="Reset zoom" onClick={reset} className="p-2 rounded-xl hover:bg-white/10"><RotateCcw className="w-5 h-5" /></button>
          {item.sourceUrl && (
            <a aria-label="Open original" href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl hover:bg-white/10"><ExternalLink className="w-5 h-5" /></a>
          )}
          <button aria-label="Close" onClick={onClose} className="p-2 rounded-xl hover:bg-white/10"><X className="w-6 h-6" /></button>
        </div>
      </div>
      <div
        className="relative flex-1 overflow-hidden touch-none select-none flex items-center justify-center"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onDoubleClick={() => setScale((s) => (s > 1 ? 1 : 2.5))}
        style={{ cursor: scale > 1 ? 'grab' : 'zoom-in' }}
      >
        <img
          src={item.src}
          alt={item.alt}
          draggable={false}
          className="max-w-full max-h-full object-contain will-change-transform"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`, transition: pointers.current.size ? 'none' : 'transform 120ms ease-out' }}
        />
        {items.length > 1 && (
          <>
            <button aria-label="Previous photo" onPointerDown={(e) => e.stopPropagation()} onClick={() => go(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"><ChevronLeft className="w-6 h-6" /></button>
            <button aria-label="Next photo" onPointerDown={(e) => e.stopPropagation()} onClick={() => go(1)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"><ChevronRight className="w-6 h-6" /></button>
          </>
        )}
      </div>
      {item.caption && <div className="p-3 text-[11px] leading-relaxed text-white/80 max-h-28 overflow-y-auto">{item.caption}</div>}
    </div>
  );
}
