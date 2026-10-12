// Pick the device a guide / question belongs to: any catalog model, any universal device page, or "general".
import { useEffect, useMemo, useState } from 'react';
import { Search, X, Globe2, Smartphone, Wrench } from 'lucide-react';
import { searchCatalog } from '../../data/catalog';
import {
  catalogDeviceKey, universalDeviceKey, subscribeDiscoveredDevices, matchesQuery, GENERAL_DEVICE,
  type DeviceRef, type DiscoveredDevice,
} from '../../lib/repairHub';
import { card, input } from './ui';

export default function DevicePicker({ value, onChange }: { value: DeviceRef | null; onChange: (d: DeviceRef | null) => void }) {
  const [q, setQ] = useState('');
  const [discovered, setDiscovered] = useState<DiscoveredDevice[]>([]);
  useEffect(() => subscribeDiscoveredDevices(setDiscovered), []);

  const catalogHits = useMemo(() => searchCatalog(q, 40).filter((h) => h.kind === 'model').slice(0, 12), [q]);
  const discHits = useMemo(() => (q.trim().length < 2 ? [] : discovered.filter((d) => matchesQuery(`${d.name} ${d.brand} ${d.model} ${d.deviceType}`, q)).slice(0, 8)), [q, discovered]);

  if (value) {
    return (
      <div className={`${card} px-4 py-3 flex items-center justify-between gap-3`}>
        <div className="min-w-0">
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Device</div>
          <div className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{value.label}</div>
        </div>
        <button type="button" onClick={() => onChange(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700" aria-label="Change device"><X className="w-4 h-4" /></button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the device (e.g. Galaxy A15, Defy fridge, Sunsynk 5 kW)" className={`${input} pl-9`} />
      </div>
      <div className={`${card} divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto`}>
        <button type="button" onClick={() => onChange(GENERAL_DEVICE)} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-sm">
          <Wrench className="w-4 h-4 text-slate-400" /> <span className="font-bold">General / any device</span> <span className="text-[11px] text-slate-500">(skills, techniques, tools)</span>
        </button>
        {catalogHits.map((h) => (
          <button key={h.path} type="button"
            onClick={() => onChange({ key: catalogDeviceKey(h.type.slug, h.brand!.slug, h.model!.slug), label: `${h.brand!.name} ${h.model!.name}`, path: `/devices${h.path}` })}
            className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-sm">
            <Smartphone className="w-4 h-4 text-indigo-500" /> <span className="font-bold truncate">{h.label}</span> <span className="text-[11px] text-slate-500 shrink-0">{h.sub}</span>
          </button>
        ))}
        {discHits.map((d) => (
          <button key={d.id} type="button" onClick={() => onChange({ key: universalDeviceKey(d.slug), label: d.name, path: `/device/${d.slug}` })}
            className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-sm">
            <Globe2 className="w-4 h-4 text-emerald-500" /> <span className="font-bold truncate">{d.name}</span> <span className="text-[11px] text-slate-500 shrink-0">{d.deviceType || 'Device page'}</span>
          </button>
        ))}
        {q.trim().length >= 2 && catalogHits.length === 0 && discHits.length === 0 && (
          <div className="px-4 py-3 text-xs text-slate-500">
            No device page yet. Open <a className="text-indigo-600 font-bold hover:underline" href={`/search?q=${encodeURIComponent(q)}`}>universal search</a> to research and create one, then come back.
          </div>
        )}
      </div>
    </div>
  );
}
