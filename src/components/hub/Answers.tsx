// Answers (Q&A per device): /answers, /answers/ask, /answers/q/:id
import { useEffect, useMemo, useState } from 'react';
import { MessageSquare, ThumbsUp, CheckCircle2, Plus, Search, Pencil, Trash2, ShieldOff, ArrowLeft } from 'lucide-react';
import { usePathname, navigate, RouteLink } from '../../hooks/usePathname';
import { useAdminStatus } from '../../lib/admin';
import {
  subscribeQuestions, subscribeQuestion, subscribeAnswers, askQuestion, updateQuestion, deleteQuestion, postAnswer, updateAnswer,
  deleteAnswer, acceptAnswer, subscribeVote, setVote, adminSetStatus, deviceRefFromSearch, matchesQuery, friendlyHubError, timeAgo, millis, LIMITS,
  type HubQuestion, type HubAnswer, type DeviceRef,
} from '../../lib/repairHub';
import { PageShell, Hero, card, input, btnPrimary, btnMint, btnGhost, btnDanger, ErrorNote, Loading, SignInPrompt, TabLink, useHubUser } from './ui';
import DevicePicker from './DevicePicker';

export default function Answers({ onOpenAuth }: { onOpenAuth?: () => void }) {
  const { pathname } = usePathname();
  const seg = pathname.split('/');
  if (seg[2] === 'ask') return <AskQuestion onOpenAuth={onOpenAuth} />;
  if (seg[2] === 'q' && seg[3]) return <QuestionPage id={decodeURIComponent(seg[3])} onOpenAuth={onOpenAuth} />;
  return <QuestionList />;
}

function QuestionList() {
  const { search } = usePathname();
  const filter = search.get('filter') || 'all';
  const [questions, setQuestions] = useState<HubQuestion[] | null>(null);
  const [err, setErr] = useState('');
  const [q, setQ] = useState('');
  useEffect(() => subscribeQuestions(setQuestions, (e) => { setQuestions([]); setErr(friendlyHubError(e, 'load questions')); }), []);
  useEffect(() => { document.title = 'Answers · DIY Electronics'; }, []);
  const list = useMemo(() => {
    let l = questions || [];
    if (filter === 'unanswered') l = l.filter((x) => x.answerCount === 0);
    if (filter === 'solved') l = l.filter((x) => !!x.acceptedAnswerId);
    if (filter === 'popular') l = [...l].sort((a, b) => b.voteCount - a.voteCount || b.answerCount - a.answerCount);
    if (q.trim().length >= 2) l = l.filter((x) => matchesQuery(`${x.title} ${x.body} ${x.deviceLabel}`, q));
    return l;
  }, [questions, filter, q]);
  const unanswered = (questions || []).filter((x) => x.answerCount === 0).length;

  return (
    <PageShell>
      <Hero eyebrow="Answers forum" title="Ask the community, help a fixer" subtitle="Questions are tied to a device so answers show up on that device's page. The asker can accept the answer that solved it.">
        <div className="flex flex-wrap gap-2 items-center">
          <RouteLink to="/answers/ask" className={btnMint}><Plus className="w-3.5 h-3.5" /> Ask a question</RouteLink>
          {questions && <span className="text-xs text-indigo-100/80">{unanswered} of {questions.length} questions have no answer yet. <RouteLink to="/answers?filter=unanswered" className="underline font-bold">Help answer them</RouteLink></span>}
        </div>
      </Hero>
      <div className={`${card} p-4 flex flex-col md:flex-row gap-2 md:items-center`}>
        <div className="flex gap-1 flex-wrap">
          <TabLink to="/answers" active={filter === 'all'}>Newest</TabLink>
          <TabLink to="/answers?filter=popular" active={filter === 'popular'}>Most helpful</TabLink>
          <TabLink to="/answers?filter=unanswered" active={filter === 'unanswered'}>Unanswered</TabLink>
          <TabLink to="/answers?filter=solved" active={filter === 'solved'}>Solved</TabLink>
        </div>
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions" className={`${input} pl-9`} />
        </div>
      </div>
      {err && <ErrorNote message={err} />}
      {questions === null ? <Loading label="Loading questions…" /> : list.length === 0 ? (
        <div className={`${card} p-6 text-sm text-slate-500`}>{questions.length === 0 ? 'No questions yet. Ask the first one!' : 'No questions match.'}</div>
      ) : (
        <div className={`${card} divide-y divide-slate-100 dark:divide-slate-800`}>
          {list.map((x) => <QuestionRow key={x.id} q={x} />)}
        </div>
      )}
    </PageShell>
  );
}

export function QuestionRow({ q }: { q: HubQuestion }) {
  return (
    <RouteLink to={`/answers/q/${q.id}`} className="flex items-center gap-3 px-4 py-3 group hover:bg-slate-50 dark:hover:bg-slate-800/50">
      <div className={`w-14 text-center rounded-lg py-1.5 text-sm font-black shrink-0 ${q.acceptedAnswerId ? 'bg-emerald-500 text-white' : q.answerCount ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
        {q.answerCount}<div className="text-[9px] font-bold uppercase">{q.acceptedAnswerId ? 'accepted' : q.answerCount === 1 ? 'answer' : 'answers'}</div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 truncate">{q.title}</div>
        <div className="text-[11px] text-slate-500 truncate">{q.deviceLabel} · asked {timeAgo(millis(q.createdAt))} by {q.ownerName}</div>
      </div>
      <div className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0"><ThumbsUp className="w-3.5 h-3.5" />{q.voteCount}</div>
    </RouteLink>
  );
}

function AskQuestion({ onOpenAuth }: { onOpenAuth?: () => void }) {
  const { search } = usePathname();
  const { owner } = useHubUser();
  const [device, setDevice] = useState<DeviceRef | null>(() => deviceRefFromSearch(search));
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  if (!owner) return <PageShell><SignInPrompt action="ask a question" onOpenAuth={onOpenAuth} /></PageShell>;
  const submit = async () => {
    if (!device) { setErr('Choose the device first.'); return; }
    setBusy(true); setErr('');
    try { const id = await askQuestion(title, body, device, owner); navigate(`/answers/q/${id}`); } catch (e) { setErr(friendlyHubError(e, 'post your question')); } finally { setBusy(false); }
  };
  return (
    <PageShell>
      <RouteLink to="/answers" className="text-xs font-bold text-slate-500 hover:text-indigo-600 inline-flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Answers</RouteLink>
      <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50">Ask a question</h1>
      <div className={`${card} p-5 space-y-3`}>
        <DevicePicker value={device} onChange={setDevice} />
        <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={LIMITS.questionTitle} placeholder="Your question in one line (e.g. TV has sound but no picture after a storm)" className={input} />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={LIMITS.question} placeholder="Details: model number, what you already tested (voltages, error codes, smells, LEDs), and what changed before it failed." className={`${input} min-h-[160px]`} />
        {err && <ErrorNote message={err} />}
        <div className="flex justify-end"><button onClick={submit} disabled={busy || !title.trim() || !device} className={btnPrimary}>{busy ? 'Posting…' : 'Post question'}</button></div>
      </div>
    </PageShell>
  );
}

function VoteButton({ kind, id, count, ownerUid, onOpenAuth }: { kind: 'question' | 'answer'; id: string; count: number; ownerUid: string; onOpenAuth?: () => void }) {
  const { uid } = useHubUser();
  const [voted, setVoted] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => subscribeVote(kind, id, uid, setVoted), [kind, id, uid]);
  const own = uid === ownerUid;
  return (
    <button
      onClick={async () => { if (!uid) { onOpenAuth?.(); return; } if (own) return; setBusy(true); try { await setVote(kind, id, uid, !voted); } catch { /* shown by counter not changing */ } finally { setBusy(false); } }}
      disabled={busy || own}
      title={own ? 'You cannot vote on your own post' : voted ? 'Remove your upvote' : 'This is helpful'}
      className={`flex flex-col items-center px-2 py-1.5 rounded-lg text-xs font-black ${voted ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'} disabled:opacity-60`}>
      <ThumbsUp className="w-4 h-4" />{count}
    </button>
  );
}

function QuestionPage({ id, onOpenAuth }: { id: string; onOpenAuth?: () => void }) {
  const { uid, owner } = useHubUser();
  const admin = useAdminStatus();
  const [q, setQ] = useState<HubQuestion | null | undefined>(undefined);
  const [answers, setAnswers] = useState<HubAnswer[]>([]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => subscribeQuestion(id, setQ, (e) => { setQ(null); setErr(friendlyHubError(e, 'open this question')); }), [id]);
  useEffect(() => subscribeAnswers(id, setAnswers, () => setAnswers([])), [id]);
  useEffect(() => { if (q) document.title = `${q.title} · Answers · DIY Electronics`; }, [q]);

  const sorted = useMemo(() => [...answers].sort((a, b) => (a.id === q?.acceptedAnswerId ? -1 : b.id === q?.acceptedAnswerId ? 1 : b.voteCount - a.voteCount || millis(a.createdAt) - millis(b.createdAt))), [answers, q?.acceptedAnswerId]);

  if (q === undefined) return <PageShell><Loading label="Opening question…" /></PageShell>;
  if (!q) return <PageShell><ErrorNote message={err || 'This question does not exist or was removed.'} /></PageShell>;
  const asker = q.ownerUid === uid;
  const actor = admin.uid ? { uid: admin.uid, email: admin.email } : null;

  const run = async (fn: () => Promise<void>, action: string) => {
    setBusy(true); setErr('');
    try { await fn(); } catch (e) { setErr(friendlyHubError(e, action)); } finally { setBusy(false); }
  };

  return (
    <PageShell>
      <RouteLink to="/answers" className="text-xs font-bold text-slate-500 hover:text-indigo-600 inline-flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Answers</RouteLink>
      {err && <ErrorNote message={err} />}
      <div className={`${card} p-5 flex gap-4`}>
        <VoteButton kind="question" id={q.id} count={q.voteCount} ownerUid={q.ownerUid} onOpenAuth={onOpenAuth} />
        <div className="space-y-2 min-w-0 flex-1">
          {editing === 'q' ? (
            <div className="space-y-2">
              <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} maxLength={LIMITS.questionTitle} className={input} />
              <textarea value={editText} onChange={(e) => setEditText(e.target.value)} maxLength={LIMITS.question} className={`${input} min-h-[120px]`} />
              <div className="flex gap-2"><button onClick={() => run(async () => { await updateQuestion(q.id, editTitle, editText); setEditing(null); }, 'save the question')} disabled={busy} className={btnPrimary}>Save</button><button onClick={() => setEditing(null)} className={btnGhost}>Cancel</button></div>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-black text-slate-900 dark:text-slate-50">{q.title}</h1>
              <div className="text-xs text-slate-500">For <RouteLink to={q.devicePath} className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">{q.deviceLabel}</RouteLink> · asked {timeAgo(millis(q.createdAt))} by {q.ownerName}</div>
              {q.body && <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{q.body}</p>}
            </>
          )}
          <div className="flex flex-wrap gap-2">
            {asker && editing !== 'q' && <button onClick={() => { setEditing('q'); setEditTitle(q.title); setEditText(q.body); }} className={btnGhost}><Pencil className="w-3.5 h-3.5" /> Edit</button>}
            {asker && <button onClick={() => { if (window.confirm('Delete this question?')) run(async () => { await deleteQuestion(q.id); navigate('/answers'); }, 'delete the question'); }} className={btnDanger}><Trash2 className="w-3.5 h-3.5" /> Delete</button>}
            {admin.isAdmin && actor && !asker && <button onClick={() => run(() => adminSetStatus('questions', q.id, 'removed', actor, q.title, window.prompt('Reason?') || ''), 'remove the question')} className={btnDanger}><ShieldOff className="w-3.5 h-3.5" /> Remove (admin)</button>}
          </div>
        </div>
      </div>

      <h2 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2"><MessageSquare className="w-4 h-4" /> {answers.length} answer{answers.length === 1 ? '' : 's'}</h2>
      <div className="space-y-3">
        {sorted.map((a) => {
          const accepted = a.id === q.acceptedAnswerId;
          const mine = a.ownerUid === uid;
          return (
            <div key={a.id} className={`${card} p-5 flex gap-4 ${accepted ? 'border-emerald-400 dark:border-emerald-600' : ''}`}>
              <VoteButton kind="answer" id={a.id} count={a.voteCount} ownerUid={a.ownerUid} onOpenAuth={onOpenAuth} />
              <div className="space-y-2 min-w-0 flex-1">
                {accepted && <div className="text-[11px] font-black uppercase tracking-wider text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Accepted answer</div>}
                {editing === a.id ? (
                  <div className="space-y-2">
                    <textarea value={editText} onChange={(e) => setEditText(e.target.value)} maxLength={LIMITS.answer} className={`${input} min-h-[120px]`} />
                    <div className="flex gap-2"><button onClick={() => run(async () => { await updateAnswer(a.id, editText); setEditing(null); }, 'save the answer')} disabled={busy} className={btnPrimary}>Save</button><button onClick={() => setEditing(null)} className={btnGhost}>Cancel</button></div>
                  </div>
                ) : <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{a.body}</p>}
                <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2">
                  {a.ownerName} · {timeAgo(millis(a.createdAt))}
                  {asker && !accepted && <button onClick={() => run(() => acceptAnswer(q.id, a.id), 'accept the answer')} className="font-bold text-emerald-600 hover:underline">Accept this answer</button>}
                  {asker && accepted && <button onClick={() => run(() => acceptAnswer(q.id, ''), 'unaccept the answer')} className="font-bold hover:underline">Unaccept</button>}
                  {mine && editing !== a.id && <button onClick={() => { setEditing(a.id); setEditText(a.body); }} className="font-bold hover:underline">Edit</button>}
                  {(mine || admin.isAdmin) && <button onClick={() => { if (window.confirm('Delete this answer?')) run(() => deleteAnswer(a, q), 'delete the answer'); }} className="font-bold text-rose-600 hover:underline">Delete</button>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`${card} p-5 space-y-3`}>
        <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">Your answer</h3>
        {owner ? (
          <>
            <textarea value={text} onChange={(e) => setText(e.target.value)} maxLength={LIMITS.answer} placeholder="Explain what to check and how (expected voltages, test points, parts). Be specific and safe." className={`${input} min-h-[120px]`} />
            <div className="flex justify-end"><button onClick={() => run(async () => { await postAnswer(q.id, text, owner); setText(''); }, 'post your answer')} disabled={busy || !text.trim()} className={btnPrimary}>Post answer</button></div>
          </>
        ) : <SignInPrompt action="answer" onOpenAuth={onOpenAuth} />}
      </div>
    </PageShell>
  );
}
