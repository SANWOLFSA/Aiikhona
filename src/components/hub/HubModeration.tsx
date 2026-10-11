// Admin Desk > Repair hub: moderate device pages, component pages, guides, questions/answers and device requests.
import { useCallback, useEffect, useState } from 'react';
import { RefreshCw, CheckCircle2, ShieldOff, Trash2, ExternalLink, RotateCcw } from 'lucide-react';
import { adminList, adminSetStatus, adminDelete, adminResolveRequest, friendlyHubError, timeAgo, millis, type ModeratedCollection } from '../../lib/repairHub';
import type { Actor } from '../../lib/marketplace';
import { card, btnGhost, btnMint, btnDanger, ErrorNote, Chip } from './ui';
import { RouteLink } from '../../hooks/usePathname';

type View = 'pending-devices' | 'devices' | 'components' | 'guides' | 'questions' | 'answers' | 'requests';

const VIEWS: { id: View; label: string }[] = [
  { id: 'pending-devices', label: 'Devices awaiting review' },
  { id: 'devices', label: 'Device pages' },
  { id: 'components', label: 'Component pages' },
  { id: 'guides', label: 'Guides' },
  { id: 'questions', label: 'Questions' },
  { id: 'answers', label: 'Answers' },
  { id: 'requests', label: 'Device requests' },
];

function linkFor(view: View, d: any): string {
  switch (view) {
    case 'pending-devices':
    case 'devices': return `/device/${d.slug || d.id}`;
    case 'components': return `/components/${encodeURIComponent(d.id)}`;
    case 'guides': return `/guides/view/${d.id}`;
    case 'questions': return `/answers/q/${d.id}`;
    case 'answers': return `/answers/q/${d.questionId}`;
    default: return `/search?q=${encodeURIComponent(d.name || '')}`;
  }
}

function labelFor(d: any): string {
  return String(d.name || d.title || d.partNumber || (d.body ? String(d.body).slice(0, 90) : '') || d.id);
}

export default function HubModeration({ actor }: { actor: Actor | null }) {
  const [view, setView] = useState<View>('pending-devices');
  const [rows, setRows] = useState<any[] | null>(null);
  const [err, setErr] = useState('');
  const [busyId, setBusyId] = useState('');

  const load = useCallback(async () => {
    setRows(null); setErr('');
    try {
      const col: ModeratedCollection | 'deviceRequests' = view === 'pending-devices' || view === 'devices' ? 'discoveredDevices'
        : view === 'components' ? 'discoveredComponents' : view === 'requests' ? 'deviceRequests' : view;
      const status = view === 'pending-devices' ? 'pending' : view === 'requests' ? 'open' : undefined;
      setRows(await adminList(col, status));
    } catch (e) {
      setRows([]); setErr(friendlyHubError(e, 'load this list'));
    }
  }, [view]);
  useEffect(() => { load(); }, [load]);

  const col = (): ModeratedCollection => (view === 'pending-devices' || view === 'devices' ? 'discoveredDevices' : view === 'components' ? 'discoveredComponents' : view as ModeratedCollection);

  const act = async (id: string, fn: () => Promise<void>) => {
    setBusyId(id); setErr('');
    try { await fn(); await load(); } catch (e) { setErr(friendlyHubError(e, 'apply that action')); } finally { setBusyId(''); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5 items-center">
        {VIEWS.map((v) => <button key={v.id} onClick={() => setView(v.id)} className={view === v.id ? 'px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white' : 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}>{v.label}</button>)}
        <button onClick={load} className={btnGhost}><RefreshCw className="w-3.5 h-3.5" /> Refresh</button>
      </div>
      {!actor && <ErrorNote message="Sign in with an admin account to moderate." />}
      {err && <ErrorNote message={err} />}
      {rows === null ? <p className="text-sm text-slate-500">Loading…</p> : rows.length === 0 ? (
        <div className={`${card} p-6 text-sm text-slate-500`}>Nothing here right now.</div>
      ) : (
        <div className={`${card} divide-y divide-slate-100 dark:divide-slate-800`}>
          {rows.map((d) => {
            const status = String(d.status || 'published');
            const label = labelFor(d);
            return (
              <div key={d.id} className="px-4 py-3 flex flex-col md:flex-row md:items-center gap-3">
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{label}</div>
                  <div className="text-[11px] text-slate-500 flex flex-wrap gap-2 items-center">
                    <Chip className={status === 'removed' || status === 'rejected' ? 'bg-rose-50 text-rose-700' : status === 'pending' || status === 'open' || status === 'draft' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}>{status}</Chip>
                    {d.origin && <span>origin: {d.origin}</span>}
                    {Array.isArray(d.sources) && <span>{d.sources.length} sources</span>}
                    <span>{d.ownerName || d.createdByName || ''}</span>
                    <span>{timeAgo(millis(d.createdAt))}</span>
                    {d.notes && <span className="truncate max-w-xs">“{String(d.notes).slice(0, 120)}”</span>}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 shrink-0">
                  {view !== 'requests' && <RouteLink to={linkFor(view, d)} className={btnGhost}><ExternalLink className="w-3.5 h-3.5" /> Open</RouteLink>}
                  {actor && view === 'requests' && (
                    <>
                      <RouteLink to={`/device/${encodeURIComponent(String(d.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'))}?q=${encodeURIComponent(d.name || '')}`} className={btnGhost}><ExternalLink className="w-3.5 h-3.5" /> Research page</RouteLink>
                      <button disabled={busyId === d.id} onClick={() => act(d.id, () => adminResolveRequest(d.id, 'done', actor, label, window.prompt('Page path for this device (optional), e.g. /device/omron-m3') || ''))} className={btnMint}><CheckCircle2 className="w-3.5 h-3.5" /> Done</button>
                      <button disabled={busyId === d.id} onClick={() => act(d.id, () => adminResolveRequest(d.id, 'rejected', actor, label))} className={btnDanger}>Reject</button>
                    </>
                  )}
                  {actor && view !== 'requests' && status !== 'published' && (
                    <button disabled={busyId === d.id} onClick={() => act(d.id, () => adminSetStatus(col(), d.id, 'published', actor, label))} className={btnMint}>
                      {status === 'removed' ? <RotateCcw className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />} {status === 'removed' ? 'Restore' : 'Approve'}
                    </button>
                  )}
                  {actor && view !== 'requests' && status !== 'removed' && (
                    <button disabled={busyId === d.id} onClick={() => act(d.id, () => adminSetStatus(col(), d.id, 'removed', actor, label, window.prompt('Reason (shown to the author where applicable)') || ''))} className={btnDanger}><ShieldOff className="w-3.5 h-3.5" /> Remove</button>
                  )}
                  {actor && (
                    <button disabled={busyId === d.id} onClick={() => { if (window.confirm('Delete permanently?')) act(d.id, () => adminDelete(view === 'requests' ? 'deviceRequests' : col(), d.id)); }} className={btnDanger} aria-label="Delete permanently"><Trash2 className="w-3.5 h-3.5" /></button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <p className="text-[11px] text-slate-500">Removing a question does not delete its answers; remove those separately if needed. Device and component pages researched by AI must cite at least one source to be saved.</p>
    </div>
  );
}
