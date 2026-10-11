import { useEffect, useState } from 'react';
import { Gauge } from 'lucide-react';
import { RouteLink } from '../../hooks/usePathname';

/** "Test with a multimeter" chips for a block of repair text. The component data is loaded on demand
 * so pages that embed this don't pull the whole test library into their chunk. */
export default function MeterTestLinks({ text, className = '' }: { text: string; className?: string }) {
  const [hits, setHits] = useState<{ id: string; name: string }[]>([]);
  useEffect(() => {
    let alive = true;
    import('../../data/meter').then((m) => {
      if (alive) setHits(m.componentsMentionedIn(text).map((c) => ({ id: c.id, name: c.name })));
    });
    return () => { alive = false; };
  }, [text]);
  return (
    <div className={`rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/60 dark:bg-emerald-950/20 p-4 space-y-2 ${className}`}>
      <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5"><Gauge className="w-4 h-4 text-emerald-600" />Test the parts with a multimeter</h4>
      <div className="flex flex-wrap gap-1.5">
        {hits.map((h) => <RouteLink key={h.id} to={`/multimeter/test/${h.id}`} className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40">{h.name}</RouteLink>)}
        <RouteLink to="/multimeter" className="px-2 py-1 text-[11px] font-bold text-slate-500 hover:text-emerald-600">How a multimeter works →</RouteLink>
      </div>
    </div>
  );
}
