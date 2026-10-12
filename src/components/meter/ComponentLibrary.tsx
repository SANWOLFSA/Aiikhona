import { useMemo, useState } from 'react';
import { Search, ShieldAlert, ChevronRight } from 'lucide-react';
import { RouteLink } from '../../hooks/usePathname';
import { CATEGORY_ORDER, MODE_BY_ID, METER_COMPONENTS, searchComponents, type ComponentCategory } from '../../data/meter';
import ComponentSymbol from './ComponentSymbol';

export default function ComponentLibrary() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<ComponentCategory | 'All'>('All');
  const list = useMemo(() => searchComponents(q).filter((c) => cat === 'All' || c.category === cat), [q, cat]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <label className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${METER_COMPONENTS.length} components — e.g. "mosfet", "7805", "geyser element", "bulged cap"`}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
        </label>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {(['All', ...CATEGORY_ORDER] as const).map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${cat === c ? 'bg-gradient-to-r from-indigo-600 to-violet-500 text-white border-transparent' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{c}</button>
        ))}
      </div>
      {list.length === 0 && <p className="text-sm text-slate-500 p-6 text-center">No component matches “{q}”. Try a simpler word like “diode” or “relay”.</p>}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {list.map((c) => (
          <RouteLink key={c.id} to={`/multimeter/test/${c.id}`} className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-4 flex gap-3 hover:border-emerald-400 hover:shadow-md transition">
            <div className="shrink-0 w-24 h-16 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 flex items-center justify-center"><ComponentSymbol symbol={c.symbol} className="w-20 h-10" /></div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-1.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight flex-1">{c.name}</h3>
                {c.danger && <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" aria-label="High-voltage safety notes" />}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">{c.category}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">{c.summary}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {c.modes.map((m) => <span key={m} className="px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">{MODE_BY_ID[m].dial.trim()} {MODE_BY_ID[m].label}</span>)}
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 ml-auto" />
              </div>
            </div>
          </RouteLink>
        ))}
      </div>
    </div>
  );
}
