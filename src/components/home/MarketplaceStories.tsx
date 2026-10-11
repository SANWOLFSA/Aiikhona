import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play, Plus, ShieldCheck, ShoppingBag, Star, X } from 'lucide-react';
import type { ListingItem } from '../../lib/marketplaceListings';

const STORY_MS = 5000;
const SEEN_KEY = 'diyelectronics_seen_market_stories';

function readSeen(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(SEEN_KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('');
}

export const formatPrice = (n: number) =>
  `R${n.toLocaleString('en-ZA', { minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ */
/* Stories bar                                                          */
/* ------------------------------------------------------------------ */

export default function MarketplaceStories({
  listings,
  onViewItem,
  onOpenMarketplace
}: {
  listings: ListingItem[];
  onViewItem: (item: ListingItem) => void;
  onOpenMarketplace?: () => void;
}) {
  const items = listings.filter(l => l.inStock);
  const [seen, setSeen] = useState<string[]>(() => readSeen());
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedUntil = useRef(0);
  const hovering = useRef(false);

  const markSeen = useCallback((id: string) => {
    setSeen(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem(SEEN_KEY, JSON.stringify(next.slice(-200)));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  // Gentle auto-slide of the row; yields to any manual interaction for a few seconds.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (openIndex === null && !hovering.current && now > pausedUntil.current && el.scrollWidth > el.clientWidth + 4) {
        acc += dt * 0.025; // ~25px per second
        if (acc >= 1) {
          const step = Math.floor(acc);
          acc -= step;
          if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
            pausedUntil.current = now + 1800;
            el.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            el.scrollLeft += step;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [openIndex]);

  const pauseAuto = (ms = 4000) => {
    pausedUntil.current = performance.now() + ms;
  };

  const nudge = (dir: 1 | -1) => {
    pauseAuto(6000);
    scrollerRef.current?.scrollBy({ left: dir * 240, behavior: 'smooth' });
  };

  if (items.length === 0) return null;

  return (
    <section aria-label="Marketplace stories" className="relative">
      <div className="flex items-center justify-between mb-2 px-0.5">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <ShoppingBag className="w-3.5 h-3.5 text-emerald-500" />
          Fresh in the Marketplace
        </h2>
        <div className="hidden sm:flex items-center gap-1">
          <button onClick={() => nudge(-1)} aria-label="Scroll stories left" className="p-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-indigo-600 shadow-xs">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => nudge(1)} aria-label="Scroll stories right" className="p-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-indigo-600 shadow-xs">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onPointerDown={() => pauseAuto(5000)}
        onTouchStart={() => pauseAuto(5000)}
        onWheel={() => pauseAuto(5000)}
        onMouseEnter={() => (hovering.current = true)}
        onMouseLeave={() => (hovering.current = false)}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-proximity [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {onOpenMarketplace && (
          <button
            onClick={onOpenMarketplace}
            className="snap-start shrink-0 w-24 h-40 sm:w-28 sm:h-44 rounded-2xl border-2 border-dashed border-indigo-300/70 dark:border-indigo-500/40 bg-gradient-to-br from-indigo-50 to-emerald-50 dark:from-indigo-950/40 dark:to-emerald-950/30 flex flex-col items-center justify-center gap-2 text-indigo-700 dark:text-indigo-300 hover:scale-[1.02] active:scale-95 transition-transform"
          >
            <span className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/30">
              <Plus className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-bold leading-tight text-center px-2">Sell your gear</span>
          </button>
        )}

        {items.map((item, i) => {
          const isSeen = seen.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => setOpenIndex(i)}
              aria-label={`${item.title} by ${item.seller.name}, ${formatPrice(item.price)}`}
              className={`snap-start shrink-0 rounded-[18px] p-[2.5px] transition-transform hover:scale-[1.02] active:scale-95 ${
                isSeen
                  ? 'bg-slate-300 dark:bg-slate-700'
                  : 'bg-gradient-to-br from-indigo-500 via-violet-500 to-emerald-400 shadow-md shadow-indigo-500/20'
              }`}
            >
              <div className="relative w-[91px] h-[155px] sm:w-[107px] sm:h-[171px] rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 ring-2 ring-white dark:ring-slate-950">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-all duration-300 ${isSeen ? 'opacity-80 saturate-50' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25" />
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-emerald-400 text-slate-950 text-[10px] font-black shadow-sm">
                  {formatPrice(item.price)}
                </span>
                <span
                  className={`absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white ring-2 ${
                    isSeen ? 'bg-slate-600 ring-slate-400' : 'bg-gradient-to-br from-indigo-600 to-violet-500 ring-white'
                  }`}
                >
                  {initials(item.seller.name)}
                </span>
                <div className="absolute bottom-0 inset-x-0 p-2 text-left">
                  <p className="text-white text-[11px] font-bold leading-tight line-clamp-2">{item.title}</p>
                  <p className="text-white/70 text-[10px] mt-0.5 truncate flex items-center gap-0.5">
                    {item.seller.isVerifiedCompany && <ShieldCheck className="w-3 h-3 text-emerald-300 shrink-0" />}
                    {item.seller.name}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <StoryViewer
            items={items}
            startIndex={openIndex}
            onSeen={markSeen}
            onClose={() => {
              setOpenIndex(null);
              pauseAuto(3000);
            }}
            onViewItem={item => {
              setOpenIndex(null);
              onViewItem(item);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Full-screen story viewer                                             */
/* ------------------------------------------------------------------ */

function StoryViewer({
  items,
  startIndex,
  onClose,
  onSeen,
  onViewItem
}: {
  items: ListingItem[];
  startIndex: number;
  onClose: () => void;
  onSeen: (id: string) => void;
  onViewItem: (item: ListingItem) => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [dir, setDir] = useState<1 | -1>(1);
  const [held, setHeld] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const pointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const holdTimer = useRef<number | null>(null);

  const item = items[index];
  const paused = held || userPaused || !loaded[item?.id];

  const go = useCallback(
    (delta: 1 | -1) => {
      const n = index + delta;
      if (n >= items.length) {
        onClose();
        return;
      }
      if (n < 0) return;
      setDir(delta);
      setIndex(n);
    },
    [index, items.length, onClose]
  );

  useEffect(() => {
    if (item) onSeen(item.id);
    // Preload the next image
    const next = items[index + 1];
    if (next) {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.src = next.image;
    }
  }, [index, item, items, onSeen]);

  // Keyboard + body scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === ' ') {
        e.preventDefault();
        setUserPaused(p => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [go, onClose]);

  const onPointerDown = (e: React.PointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    holdTimer.current = window.setTimeout(() => setHeld(true), 180);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (holdTimer.current) window.clearTimeout(holdTimer.current);
    const start = pointer.current;
    pointer.current = null;
    const wasHeld = held;
    setHeld(false);
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    const dt = performance.now() - start.t;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
      return;
    }
    if (dy > 90 && Math.abs(dy) > Math.abs(dx)) {
      onClose();
      return;
    }
    if (wasHeld || dt > 300) return; // it was a hold → just resume
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    go(x < rect.width * 0.33 ? -1 : 1);
  };

  const onPointerCancel = () => {
    if (holdTimer.current) window.clearTimeout(holdTimer.current);
    pointer.current = null;
    setHeld(false);
  };

  if (!item) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[70] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label="Marketplace story viewer"
    >
      <style>{`@keyframes storyFill { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>

      {/* Desktop side arrows */}
      <button
        onClick={() => go(-1)}
        disabled={index === 0}
        aria-label="Previous story"
        className="hidden md:flex absolute left-[calc(50%-17rem)] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white items-center justify-center"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next story"
        className="hidden md:flex absolute right-[calc(50%-17rem)] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <motion.div
        className="relative w-full h-full md:h-[min(92vh,820px)] md:max-w-[420px] md:rounded-3xl overflow-hidden bg-black shadow-2xl select-none"
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      >
        {/* Slides */}
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={item.id}
            custom={dir}
            className="absolute inset-0"
            initial={{ x: dir * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -dir * 60, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <img
              src={item.image}
              alt=""
              referrerPolicy="no-referrer"
              draggable={false}
              onLoad={() => setLoaded(l => ({ ...l, [item.id]: true }))}
              onError={() => setLoaded(l => ({ ...l, [item.id]: true }))}
              className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-linear ${paused ? '' : 'scale-105'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
          </motion.div>
        </AnimatePresence>

        {!loaded[item.id] && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-white/30 border-t-emerald-400 animate-spin" />
          </div>
        )}

        {/* Tap / swipe / hold surface */}
        <div
          className="absolute inset-0 z-10 touch-none"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onPointerLeave={e => pointer.current && onPointerUp(e)}
          onContextMenu={e => e.preventDefault()}
        />

        {/* Progress bars */}
        <div className="absolute top-0 inset-x-0 z-20 px-3 pt-3 flex gap-1 pointer-events-none">
          {items.map((it, i) => (
            <div key={it.id} className="flex-1 h-[3px] rounded-full bg-white/30 overflow-hidden">
              {i < index && <div className="h-full w-full bg-white" />}
              {i === index && (
                <div
                  key={`${it.id}-${index}`}
                  className="h-full w-full bg-white origin-left"
                  style={{
                    animation: `storyFill ${STORY_MS}ms linear forwards`,
                    animationPlayState: paused ? 'paused' : 'running'
                  }}
                  onAnimationEnd={() => go(1)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-6 inset-x-0 z-20 px-3 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0 pointer-events-none">
            <span className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-indigo-600 to-violet-500 ring-2 ring-emerald-300 text-white text-xs font-black flex items-center justify-center">
              {initials(item.seller.name)}
            </span>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold truncate flex items-center gap-1">
                {item.seller.name}
                {item.seller.isVerifiedCompany && <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />}
              </p>
              <p className="text-white/70 text-[11px] flex items-center gap-1">
                {item.seller.reviewCount > 0 && (
                  <>
                    <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                    {item.seller.rating.toFixed(1)} ({item.seller.reviewCount}) ·{' '}
                  </>
                )}
                {item.category}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setUserPaused(p => !p)}
              aria-label={userPaused ? 'Play' : 'Pause'}
              className="w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center"
            >
              {userPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            <button onClick={onClose} aria-label="Close stories" className="w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer: item details + CTA */}
        <div className="absolute bottom-0 inset-x-0 z-20 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-3">
          <div className="pointer-events-none space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-emerald-400 text-slate-950 text-sm font-black">{formatPrice(item.price)}</span>
              <span className="px-2 py-0.5 rounded-md bg-white/15 text-white text-[11px] font-bold uppercase tracking-wide">{item.condition}</span>
            </div>
            <h3 className="text-white text-lg font-black leading-snug line-clamp-2">{item.title}</h3>
            <p className="text-white/75 text-xs leading-relaxed line-clamp-2">{item.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onViewItem(item)}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 text-white text-sm font-black shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            >
              <ShoppingBag className="w-4 h-4" />
              View item &amp; buy
            </button>
          </div>
          {held && <p className="text-center text-white/60 text-[11px] font-semibold">Paused</p>}
        </div>
      </motion.div>
    </motion.div>
  );
}
