// Community guide listings: the top of /guides (all kinds) and /teardowns (teardowns only).
import { useEffect, useMemo, useState } from 'react';
import { BookOpen, Clock, CheckCircle2, Plus, Search, FileEdit } from 'lucide-react';
import { RouteLink } from '../../hooks/usePathname';
import {
  subscribePublishedGuides, subscribeMyGuides, matchesQuery, timeAgo, millis, DIFFICULTIES, GUIDE_KINDS, KIND_LABELS,
  type HubGuide, type GuideKind,
} from '../../lib/repairHub';
import { card, input, btnPrimary, Chip, DIFF_STYLE, Hero, PageShell, useHubUser } from './ui';

export function GuideCard({ g }: { g: HubGuide }) {
  return (
    <RouteLink to={`/guides/view/${g.id}`} className={`${card} overflow-hidden hover:border-indigo-500 hover:shadow-md transition-all group flex flex-col`}>
      {g.coverUrl
        ? <img src={g.coverUrl} alt="" loading="lazy" className="w-full aspect-[16/9] object-cover bg-slate-100" />
        : <div className="w-full aspect-[16/9] bg-gradient-to-br from-indigo-100 to-emerald-100 dark:from-indigo-950 dark:to-emerald-950 flex items-center justify-center"><BookOpen className="w-8 h-8 text-indigo-400" /></div>}
      <div className="p-4 space-y-2 flex-1">
        <div className="text-[11px] font-bold text-slate-500 truncate">{g.deviceLabel}</div>
        <div className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 line-clamp-2">{g.title}</div>
        <div className="flex flex-wrap gap-1">
          <Chip className={DIFF_STYLE[g.difficulty]}>{g.difficulty}</Chip>
          <Chip><Clock className="w-3 h-3" />{g.minutes} min</Chip>
          {g.completedCount > 0 && <Chip className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><CheckCircle2 className="w-3 h-3" />{g.completedCount}</Chip>}
        </div>
        <div className="text-[11px] text-slate-500">{g.ownerName} · {timeAgo(millis(g.createdAt))}</div>
      </div>
    </RouteLink>
  );
}

export default function CommunityGuides({ teardownsOnly = false, embedded = false }: { teardownsOnly?: boolean; embedded?: boolean }) {
  const { uid } = useHubUser();
  const [guides, setGuides] = useState<HubGuide[] | null>(null);
  const [mine, setMine] = useState<HubGuide[]>([]);
  const [err, setErr] = useState('');
  const [q, setQ] = useState('');
  const [kind, setKind] = useState<GuideKind | 'all'>(teardownsOnly ? 'teardown' : 'all');
  const [difficulty, setDifficulty] = useState<string>('all');
  const [sort, setSort] = useState<'new' | 'fixed'>('new');

  useEffect(() => subscribePublishedGuides(setGuides, () => { setGuides([]); setErr('Community guides could not be loaded right now.'); }), []);
  useEffect(() => {
    if (!uid) { setMine([]); return undefined; }
    return subscribeMyGuides(uid, setMine, () => setMine([]));
  }, [uid]);
  useEffect(() => { if (!embedded) document.title = `${teardownsOnly ? 'Teardowns' : 'Repair guides'} · DIY Electronics`; }, [embedded, teardownsOnly]);

  const list = useMemo(() => {
    let l = (guides || []).filter((g) => (kind === 'all' || g.kind === kind) && (difficulty === 'all' || g.difficulty === difficulty));
    if (q.trim().length >= 2) l = l.filter((g) => matchesQuery(`${g.title} ${g.deviceLabel} ${g.summary} ${g.parts.join(' ')}`, q));
    if (sort === 'fixed') l = [...l].sort((a, b) => b.completedCount - a.completedCount);
    return l;
  }, [guides, kind, difficulty, q, sort]);
  const drafts = mine.filter((g) => g.status === 'draft' && (!teardownsOnly || g.kind === 'teardown'));

  const body = (
    <div className="space-y-4">
      <div className={`${card} p-4 flex flex-col lg:flex-row gap-2 lg:items-center`}>
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={teardownsOnly ? 'Search teardowns' : 'Search community guides (device, part, fault)'} className={`${input} pl-9`} />
        </div>
        {!teardownsOnly && (
          <select value={kind} onChange={(e) => setKind(e.target.value as GuideKind | 'all')} className={`${input} lg:w-48`}>
            <option value="all">All guide types</option>
            {GUIDE_KINDS.map((k) => <option key={k} value={k}>{KIND_LABELS[k]}</option>)}
          </select>
        )}
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={`${input} lg:w-40`}>
          <option value="all">Any difficulty</option>
          {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value as 'new' | 'fixed')} className={`${input} lg:w-40`}>
          <option value="new">Newest</option>
          <option value="fixed">Most fixed</option>
        </select>
        <RouteLink to={`/guides/new${teardownsOnly ? '?kind=teardown' : ''}`} className={btnPrimary}><Plus className="w-3.5 h-3.5" /> {teardownsOnly ? 'Create a teardown' : 'Create a guide'}</RouteLink>
      </div>

      {drafts.length > 0 && (
        <div className={`${card} p-4 space-y-2`}>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1"><FileEdit className="w-3.5 h-3.5" /> Your drafts</div>
          <div className="flex flex-wrap gap-2">
            {drafts.map((g) => <RouteLink key={g.id} to={`/guides/edit/${g.id}`} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white">{g.title || 'Untitled'}</RouteLink>)}
          </div>
        </div>
      )}

      {err && <p className="text-xs text-rose-600">{err}</p>}
      {guides === null ? <p className="text-sm text-slate-500">Loading community guides…</p> : list.length === 0 ? (
        <div className={`${card} p-6 text-sm text-slate-500`}>
          {guides.length === 0 ? `No community ${teardownsOnly ? 'teardowns' : 'guides'} published yet. Be the first: every guide you write helps someone keep a device out of landfill.` : 'No guides match those filters.'}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">{list.map((g) => <GuideCard key={g.id} g={g} />)}</div>
      )}
    </div>
  );

  if (embedded) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-10 pt-8 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Community step-by-step guides{guides?.length ? ` · ${guides.length}` : ''}</h2>
        {body}
      </div>
    );
  }
  return (
    <PageShell>
      <Hero eyebrow={teardownsOnly ? 'Look inside' : 'Fix it yourself'} title={teardownsOnly ? 'Teardowns' : 'Community repair guides'}
        subtitle={teardownsOnly ? 'Step-by-step disassemblies with photos: what is inside, how it opens, and how repairable it is. Anyone can publish one.' : 'Step-by-step guides written by fixers, with tools, parts and photos for every step.'} />
      {body}
    </PageShell>
  );
}
