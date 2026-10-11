import { useCallback, useEffect, useState } from 'react';
import { BookOpenCheck, GraduationCap, Timer, Sparkles, Gauge } from 'lucide-react';
import { RouteLink } from '../../hooks/usePathname';
import type { ThemeConfig } from '../../lib/theme';
import TheoryLibrary from './TheoryLibrary';
import ExamRoom from './ExamRoom';

/**
 * Electrical Theory hub: owns its two sub-pages (Theory library | Exam Room)
 * and keeps them in sync with the URL hash so views are shareable:
 *   #/theory                -> library
 *   #/theory/topic/<id>     -> a topic in the library
 *   #/theory/exam           -> Exam Room
 * The hash is self-contained so it coexists with any path-based router.
 */
export type TheoryRoute = { tab: 'library' | 'exam'; topicId?: string };

export const THEORY_HASH_PREFIX = '#/theory';

export function parseTheoryHash(hash: string): TheoryRoute | null {
  if (!hash.startsWith(THEORY_HASH_PREFIX)) return null;
  const parts = hash.slice(THEORY_HASH_PREFIX.length).split('/').filter(Boolean);
  if (parts[0] === 'exam') return { tab: 'exam' };
  if (parts[0] === 'topic' && parts[1]) return { tab: 'library', topicId: decodeURIComponent(parts[1]) };
  return { tab: 'library' };
}

export function buildTheoryHash(route: TheoryRoute): string {
  if (route.tab === 'exam') return `${THEORY_HASH_PREFIX}/exam`;
  if (route.topicId) return `${THEORY_HASH_PREFIX}/topic/${encodeURIComponent(route.topicId)}`;
  return THEORY_HASH_PREFIX;
}

export default function TheoryHub({ themeConfig }: { themeConfig?: ThemeConfig }) {
  const [route, setRoute] = useState<TheoryRoute>(() => parseTheoryHash(window.location.hash) ?? { tab: 'library' });

  // Make sure the URL reflects the hub on mount, and follow back/forward navigation.
  useEffect(() => {
    if (!parseTheoryHash(window.location.hash)) {
      window.history.replaceState(null, '', buildTheoryHash(route));
    }
    const onHash = () => {
      const next = parseTheoryHash(window.location.hash);
      if (next) setRoute(next);
    };
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('hashchange', onHash);
      // Leaving the hub: drop our hash so other pages don't inherit it.
      if (window.location.hash.startsWith(THEORY_HASH_PREFIX)) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useCallback((next: TheoryRoute) => {
    setRoute(next);
    const hash = buildTheoryHash(next);
    if (window.location.hash !== hash) window.history.pushState(null, '', hash);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const primary = themeConfig?.primaryBg || 'bg-gradient-to-r from-indigo-600 to-violet-500';
  const tabs = [
    { id: 'library' as const, label: 'Theory', icon: BookOpenCheck, hint: 'A–Z study library' },
    { id: 'exam' as const, label: 'Exam Room', icon: Timer, hint: 'Practice exams' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950/80 text-white p-5 sm:p-8 shadow-lg shadow-indigo-500/10">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-violet-500/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-20 left-10 w-56 h-56 rounded-full bg-emerald-400/10 blur-3xl" aria-hidden />
        <div className="relative space-y-3 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/15 border border-emerald-300/30 text-emerald-200 text-[11px] font-bold tracking-wide">
            <GraduationCap className="w-3.5 h-3.5" /> ELECTRICAL THEORY
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Learn it A to Z. <span className="text-emerald-300">Then prove it.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            One library for school, TVET/N1–N6 trade theory and university electrical &amp; electronic engineering — with worked
            examples, common mistakes, an AI tutor and timed practice exams.
          </p>
        </div>
      </section>

      {/* Sub-page tabs */}
      <div role="tablist" aria-label="Electrical Theory sections" className="sticky top-[7.25rem] z-20 flex gap-1.5 p-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur border border-slate-200 dark:border-slate-800 shadow-sm w-full sm:w-fit">
        {tabs.map(t => {
          const Icon = t.icon;
          const active = route.tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => navigate({ tab: t.id })}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                active ? `${primary} text-white shadow-md shadow-indigo-500/25` : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
              <span className={`hidden md:inline text-[11px] font-medium ${active ? 'text-white/80' : 'text-slate-400'}`}>· {t.hint}</span>
            </button>
          );
        })}
        <RouteLink to="/multimeter" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-bold transition-all text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
          <Gauge className="w-4 h-4" /><span>Multimeter Lab</span><span className="hidden md:inline text-[11px] font-medium text-slate-400">· Test components</span>
        </RouteLink>
        <span className="hidden lg:flex items-center gap-1 px-3 text-[11px] text-slate-400"><Sparkles className="w-3 h-3 text-emerald-500" /> Shareable links</span>
      </div>

      {route.tab === 'library' ? (
        <TheoryLibrary
          topicId={route.topicId}
          onOpenTopic={id => navigate({ tab: 'library', topicId: id })}
          onCloseTopic={() => navigate({ tab: 'library' })}
          onStartExam={() => navigate({ tab: 'exam' })}
          primaryClass={primary}
        />
      ) : (
        <ExamRoom onStudyTopic={id => navigate({ tab: 'library', topicId: id })} primaryClass={primary} />
      )}
    </div>
  );
}
