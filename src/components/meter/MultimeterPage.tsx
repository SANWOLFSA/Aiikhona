import { Gauge, Microscope, FlaskConical, GraduationCap, Sparkles } from 'lucide-react';
import { RouteLink, usePathname } from '../../hooks/usePathname';
import { METER_COMPONENTS } from '../../data/meter';
import type { ThemeConfig } from '../../lib/theme';
import MultimeterSim from './MultimeterSim';
import MeterTheory from './MeterTheory';
import ComponentLibrary from './ComponentLibrary';
import ComponentDetail from './ComponentDetail';
import PracticeLab from './PracticeLab';

/**
 * Multimeter & Component Testing.
 *   /multimeter                     how a multimeter works (simulator + theory)
 *   /multimeter/test                component test library
 *   /multimeter/test/<component>    one component's test guide
 *   /multimeter/practice[/<id>]     practice bench + quiz
 */
type Route = { tab: 'how' | 'test' | 'practice'; id?: string };
function parse(pathname: string): Route {
  const [, , section, id] = pathname.split('/');
  if (section === 'test') return { tab: 'test', id: id ? decodeURIComponent(id) : undefined };
  if (section === 'practice') return { tab: 'practice', id: id ? decodeURIComponent(id) : undefined };
  return { tab: 'how' };
}

export default function MultimeterPage({ themeConfig }: { themeConfig?: ThemeConfig }) {
  const { pathname } = usePathname();
  const route = parse(pathname);
  const primary = themeConfig?.primaryBg || 'bg-gradient-to-r from-indigo-600 to-violet-500';

  const tabs = [
    { id: 'how' as const, to: '/multimeter', label: 'How a multimeter works', icon: Gauge },
    { id: 'test' as const, to: '/multimeter/test', label: `Test components (${METER_COMPONENTS.length})`, icon: Microscope },
    { id: 'practice' as const, to: '/multimeter/practice', label: 'Practice bench', icon: FlaskConical },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950/80 text-white p-5 sm:p-8 shadow-lg shadow-indigo-500/10">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-violet-500/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-20 left-10 w-56 h-56 rounded-full bg-emerald-400/10 blur-3xl" aria-hidden />
        <div className="relative space-y-3 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/15 border border-emerald-300/30 text-emerald-200 text-[11px] font-bold tracking-wide">
            <Gauge className="w-3.5 h-3.5" /> MULTIMETER LAB
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Know your meter. <span className="text-emerald-300">Test any part.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Turn the dial, move the probes and watch the reading — then use step-by-step tests with expected values for {METER_COMPONENTS.length} components, from resistors to magnetrons, and practise on mystery parts.
          </p>
          <RouteLink to="/theory" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-200 hover:text-white"><GraduationCap className="w-4 h-4" />Part of Electrical Theory</RouteLink>
        </div>
      </section>

      <div role="tablist" aria-label="Multimeter sections" className="sticky top-[7.25rem] z-20 flex gap-1.5 p-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur border border-slate-200 dark:border-slate-800 shadow-sm w-full sm:w-fit overflow-x-auto no-scrollbar">
        {tabs.map((t) => {
          const Icon = t.icon; const active = route.tab === t.id;
          return (
            <RouteLink key={t.id} to={t.to} role="tab" aria-selected={active}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${active ? `${primary} text-white shadow-md shadow-indigo-500/25` : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
              <Icon className="w-4 h-4" /><span>{t.label}</span>
            </RouteLink>
          );
        })}
        <span className="hidden lg:flex items-center gap-1 px-3 text-[11px] text-slate-400"><Sparkles className="w-3 h-3 text-emerald-500" /> Shareable links</span>
      </div>

      {route.tab === 'how' && (
        <div className="space-y-5">
          <MultimeterSim />
          <MeterTheory />
        </div>
      )}
      {route.tab === 'test' && (route.id ? <ComponentDetail id={route.id} /> : <ComponentLibrary />)}
      {route.tab === 'practice' && <PracticeLab componentId={route.id} />}
    </div>
  );
}
