// Community guides, Answers and parts/tools links for one device. Used on catalog model pages and on
// universal /device/:slug pages, so every device page gets the iFixit-style "Guides · Answers · Parts" block.
import { useEffect, useState } from 'react';
import { BookOpen, MessageSquare, Plus, CheckCircle2, Clock, Package, ShoppingBag, ThumbsUp } from 'lucide-react';
import { RouteLink } from '../../hooks/usePathname';
import {
  subscribeDeviceGuides, subscribeDeviceQuestions, deviceQueryString, partSearchLinks, timeAgo, millis, KIND_LABELS,
  type DeviceRef, type HubGuide, type HubQuestion,
} from '../../lib/repairHub';
import { card, btnPrimary, btnGhost, Chip, DIFF_STYLE, ExtLink } from './ui';

export default function DeviceCommunityPanel({ device, keyParts = [] }: { device: DeviceRef; keyParts?: string[] }) {
  const [guides, setGuides] = useState<HubGuide[] | null>(null);
  const [questions, setQuestions] = useState<HubQuestion[] | null>(null);
  const [err, setErr] = useState('');
  useEffect(() => subscribeDeviceGuides(device.key, setGuides, () => { setGuides([]); setErr('Community content could not be loaded right now.'); }), [device.key]);
  useEffect(() => subscribeDeviceQuestions(device.key, setQuestions, () => setQuestions([])), [device.key]);
  const qs = deviceQueryString(device);
  const partTerms = keyParts.length ? keyParts.slice(0, 6) : ['battery', 'screen', 'charging port', 'power board'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <section className={`${card} p-5 space-y-3 lg:col-span-2`}>
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2"><BookOpen className="w-4 h-4 text-indigo-500" /> Community guides & teardowns</h2>
          <RouteLink to={`/guides/new?${qs}`} className={btnPrimary}><Plus className="w-3.5 h-3.5" /> Create a guide</RouteLink>
        </div>
        {err && <p className="text-xs text-rose-600">{err}</p>}
        {guides === null ? <p className="text-xs text-slate-500">Loading guides…</p> : guides.length === 0 ? (
          <p className="text-xs text-slate-500">No community guides for {device.label} yet. Fixed one? Write the first step-by-step guide and help the next person.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-2">
            {guides.slice(0, 8).map((g) => (
              <RouteLink key={g.id} to={`/guides/view/${g.id}`} className="flex gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-colors">
                {g.coverUrl ? <img src={g.coverUrl} alt="" loading="lazy" className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0" /> : <div className="w-14 h-14 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center shrink-0"><BookOpen className="w-5 h-5 text-indigo-400" /></div>}
                <div className="min-w-0 space-y-1">
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2">{g.title}</div>
                  <div className="flex flex-wrap gap-1">
                    <Chip className={DIFF_STYLE[g.difficulty]}>{g.difficulty}</Chip>
                    <Chip><Clock className="w-3 h-3" />{g.minutes} min</Chip>
                    <Chip>{KIND_LABELS[g.kind]}</Chip>
                    {g.completedCount > 0 && <Chip className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><CheckCircle2 className="w-3 h-3" />{g.completedCount} fixed</Chip>}
                  </div>
                </div>
              </RouteLink>
            ))}
          </div>
        )}
      </section>

      <section className={`${card} p-5 space-y-3`}>
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2"><Package className="w-4 h-4 text-emerald-500" /> Parts & tools for this device</h2>
        <div className="flex flex-wrap gap-1.5">
          <RouteLink to={`/marketplace?q=${encodeURIComponent(device.label)}`} className={btnGhost}><ShoppingBag className="w-3.5 h-3.5" /> Verified sellers</RouteLink>
          <RouteLink to={`/marketplace?q=${encodeURIComponent(device.label)}`} className={btnGhost}>Spare parts</RouteLink>
        </div>
        <div className="space-y-2">
          {partTerms.map((p) => (
            <div key={p} className="space-y-1">
              <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{p}</div>
              <div className="flex flex-wrap gap-1">
                {partSearchLinks(`${device.label} ${p}`).slice(0, 3).map((l) => <ExtLink key={l.label} href={l.url}>{l.label}</ExtLink>)}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-500">Links open searches on each store; we never claim stock or prices.</p>
      </section>

      <section className={`${card} p-5 space-y-3 lg:col-span-3`}>
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-indigo-500" /> Answers for {device.label}</h2>
          <RouteLink to={`/answers/ask?${qs}`} className={btnPrimary}><Plus className="w-3.5 h-3.5" /> Ask a question</RouteLink>
        </div>
        {questions === null ? <p className="text-xs text-slate-500">Loading questions…</p> : questions.length === 0 ? (
          <p className="text-xs text-slate-500">No questions yet. Stuck on a fault? Ask the community.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {questions.slice(0, 8).map((q) => (
              <RouteLink key={q.id} to={`/answers/q/${q.id}`} className="flex items-center gap-3 py-2.5 group">
                <div className={`w-12 text-center rounded-lg py-1 text-xs font-bold ${q.acceptedAnswerId ? 'bg-emerald-500 text-white' : q.answerCount ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  {q.answerCount}<div className="text-[9px] font-bold uppercase">{q.acceptedAnswerId ? 'solved' : 'answers'}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 truncate">{q.title}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">{q.ownerName} · {timeAgo(millis(q.createdAt))} <span className="inline-flex items-center gap-0.5"><ThumbsUp className="w-3 h-3" />{q.voteCount}</span></div>
                </div>
              </RouteLink>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
