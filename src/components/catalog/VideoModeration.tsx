import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, ExternalLink, Film, Flag, Loader2, RotateCcw, ShieldOff, Trash2 } from 'lucide-react';
import { RouteLink } from '../../hooks/usePathname';
import type { Actor } from '../../lib/marketplace';
import { formatTs } from '../../lib/marketplace';
import {
  adminSetVideoStatus, deleteVideo, friendlyError, subscribeAllVideos, subscribeVideoReports,
  type CommunityVideo, type VideoReport,
} from '../../lib/communityVideos';

const cardCls = 'bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm';
const ghostBtn = 'px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors disabled:opacity-50 inline-flex items-center gap-1.5';

type Filter = 'reported' | 'published' | 'removed' | 'all';

export default function VideoModeration({ actor }: { actor: Actor | null }) {
  const [videos, setVideos] = useState<CommunityVideo[] | null>(null);
  const [reports, setReports] = useState<VideoReport[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('reported');

  useEffect(() => subscribeAllVideos(v => { setVideos(v); setErr(null); }, e => { setVideos([]); setErr(friendlyError(e)); }), []);
  useEffect(() => subscribeVideoReports(setReports, () => setReports([])), []);

  const byVideo = useMemo(() => {
    const m = new Map<string, VideoReport[]>();
    reports.forEach(r => m.set(r.videoId, [...(m.get(r.videoId) || []), r]));
    return m;
  }, [reports]);

  if (videos === null) return <div className="py-12 text-center text-slate-400 text-sm"><Loader2 className="w-4 h-4 animate-spin inline" /> Loading videos…</div>;

  const reportedCount = (v: CommunityVideo) => Math.max(v.reportCount || 0, byVideo.get(v.id)?.length || 0);
  const lists: Record<Filter, CommunityVideo[]> = {
    reported: videos.filter(v => reportedCount(v) > 0 && v.status === 'published').sort((a, b) => reportedCount(b) - reportedCount(a)),
    published: videos.filter(v => v.status === 'published'),
    removed: videos.filter(v => v.status === 'removed'),
    all: videos,
  };
  const visible = lists[filter];

  return (
    <div className="space-y-4">
      {err && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /><span>{err}</span>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {([['reported', 'Reported'], ['published', 'Recent live'], ['removed', 'Removed'], ['all', 'All']] as [Filter, string][]).map(([id, label]) => (
          <button key={id} onClick={() => setFilter(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${filter === id ? 'bg-gradient-to-r from-indigo-600 to-violet-500 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>
            {label} ({lists[id].length})
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <div className={`${cardCls} py-12 px-6 text-center space-y-2`}>
          <Film className="w-9 h-9 mx-auto text-emerald-500" />
          <p className="text-sm font-black text-slate-900 dark:text-slate-100">{filter === 'reported' ? 'No reported videos' : 'Nothing here'}</p>
          <p className="text-xs text-slate-500">Community repair videos shared on solutions pages show up here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {visible.map(v => <Row key={v.id} video={v} reports={byVideo.get(v.id) || []} reportCount={reportedCount(v)} actor={actor} />)}
        </div>
      )}
    </div>
  );
}

function Row({ video: v, reports, reportCount, actor }: { video: CommunityVideo; reports: VideoReport[]; reportCount: number; actor: Actor | null }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [confirmDel, setConfirmDel] = useState(false);

  const run = async (fn: (a: Actor) => Promise<void>) => {
    if (!actor) return setErr('Sign in again to moderate.');
    setBusy(true); setErr(null);
    try { await fn(actor); } catch (e) { setErr(friendlyError(e)); } finally { setBusy(false); }
  };

  return (
    <div className={`${cardCls} p-3 flex gap-3`}>
      <div className="w-28 shrink-0 aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-indigo-950 to-emerald-950 flex items-center justify-center">
        {v.thumbnailUrl ? <img src={v.thumbnailUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : <Film className="w-6 h-6 text-white/70" />}
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-black text-slate-900 dark:text-slate-100 break-words">{v.title}</p>
          <span className={`shrink-0 px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${v.status === 'published' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'}`}>{v.status}</span>
        </div>
        <p className="text-[11px] text-slate-500">
          <RouteLink to={v.pagePath} className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">{v.deviceLabel}</RouteLink>
          {' · '}{v.ownerName} · {formatTs(v.createdAt)} · {v.kind}
        </p>
        <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-slate-500 hover:underline inline-flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Open video</a>
        {reportCount > 0 && (
          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-[11px] text-amber-900 dark:text-amber-200 space-y-0.5">
            <p className="font-black flex items-center gap-1"><Flag className="w-3 h-3" /> {reportCount} report{reportCount === 1 ? '' : 's'}</p>
            {reports.slice(0, 4).map(r => <p key={r.id} className="break-words">• {r.reason}</p>)}
          </div>
        )}
        {v.moderationReason && v.status === 'removed' && <p className="text-[11px] text-slate-500">Reason: {v.moderationReason}</p>}
        {err && <p className="text-[11px] text-red-600">{err}</p>}
        <div className="flex flex-wrap gap-1.5 items-center pt-1">
          {v.status === 'published' ? (
            <>
              <input value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason (optional)" maxLength={300}
                className="flex-1 min-w-[8rem] px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs" />
              <button disabled={busy} onClick={() => run(a => adminSetVideoStatus(v, 'removed', a, reason))} className={ghostBtn}><ShieldOff className="w-3.5 h-3.5" /> Remove</button>
            </>
          ) : (
            <button disabled={busy} onClick={() => run(a => adminSetVideoStatus(v, 'published', a, 'Restored'))} className={ghostBtn}><RotateCcw className="w-3.5 h-3.5" /> Restore</button>
          )}
          {confirmDel ? (
            <>
              <button disabled={busy} onClick={() => run(a => deleteVideo(v, a))} className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50">
                {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />} Confirm delete
              </button>
              <button disabled={busy} onClick={() => setConfirmDel(false)} className={ghostBtn}>Cancel</button>
            </>
          ) : (
            <button disabled={busy} onClick={() => setConfirmDel(true)} className={`${ghostBtn} !text-rose-600`}><Trash2 className="w-3.5 h-3.5" /> Delete</button>
          )}
        </div>
      </div>
    </div>
  );
}
