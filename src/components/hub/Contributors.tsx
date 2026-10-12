// Contributors leaderboard: /contributors — reputation and badges computed from real activity
// (published guides & teardowns, "I fixed it" marks received, answers, accepted answers, upvotes, videos).
import { useEffect, useMemo, useState } from 'react';
import { Award, Trophy } from 'lucide-react';
import {
  subscribePublishedGuides, subscribeQuestions, subscribePublishedAnswers, fetchPublishedVideos, computeContributors, POINTS,
  type HubGuide, type HubQuestion, type HubAnswer,
} from '../../lib/repairHub';
import { PageShell, Hero, card, Chip, Loading, useHubUser } from './ui';

export default function Contributors() {
  const { uid } = useHubUser();
  const [guides, setGuides] = useState<HubGuide[] | null>(null);
  const [questions, setQuestions] = useState<HubQuestion[] | null>(null);
  const [answers, setAnswers] = useState<HubAnswer[] | null>(null);
  const [videos, setVideos] = useState<{ ownerUid: string; ownerName: string }[] | null>(null);
  useEffect(() => subscribePublishedGuides(setGuides, () => setGuides([])), []);
  useEffect(() => subscribeQuestions(setQuestions, () => setQuestions([])), []);
  useEffect(() => subscribePublishedAnswers(setAnswers, () => setAnswers([])), []);
  useEffect(() => { fetchPublishedVideos().then(setVideos).catch(() => setVideos([])); }, []);
  useEffect(() => { document.title = 'Contributors · DIY Electronics'; }, []);

  const loading = !guides || !questions || !answers || !videos;
  const people = useMemo(() => (loading ? [] : computeContributors(guides!, questions!, answers!, videos!)), [loading, guides, questions, answers, videos]);

  return (
    <PageShell>
      <Hero eyebrow="Community" title="Top fixers" subtitle="Reputation is calculated live from what people actually contributed. Nobody can set their own score.">
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          {[
            [`Guide or teardown`, POINTS.guide], ['Someone fixed it with your guide', POINTS.completion], ['Answer', POINTS.answer],
            ['Accepted answer', POINTS.accepted], ['Upvote received', POINTS.vote], ['Repair video', POINTS.video], ['Question', POINTS.question],
          ].map(([l, p]) => <span key={l as string} className="px-2 py-1 rounded-lg bg-white/10 border border-white/10">+{p} {l}</span>)}
        </div>
      </Hero>
      {loading ? <Loading label="Counting contributions…" /> : people.length === 0 ? (
        <div className={`${card} p-6 text-sm text-slate-500`}>No contributions yet. Publish a guide, answer a question or share a repair video to appear here.</div>
      ) : (
        <div className={`${card} divide-y divide-slate-100 dark:divide-slate-800`}>
          {people.slice(0, 100).map((c, i) => (
            <div key={c.uid} className={`px-5 py-3 flex items-center gap-4 ${c.uid === uid ? 'bg-emerald-50/60 dark:bg-emerald-950/30' : ''}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${i === 0 ? 'bg-amber-400 text-white' : i === 1 ? 'bg-slate-300 text-slate-800' : i === 2 ? 'bg-orange-300 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                {i < 3 ? <Trophy className="w-4 h-4" /> : i + 1}
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{c.name || 'Community member'}{c.uid === uid ? ' (you)' : ''}</div>
                <div className="text-[11px] text-slate-500">
                  {c.guides} guides · {c.teardowns} teardowns · {c.completionsReceived} fixes · {c.answers} answers ({c.accepted} accepted) · {c.videos} videos
                </div>
                {c.badges.length > 0 && <div className="flex flex-wrap gap-1">{c.badges.map((b) => <Chip key={b.id} className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"><Award className="w-3 h-3" /><span title={b.description}>{b.label}</span></Chip>)}</div>}
              </div>
              <div className="text-right shrink-0"><div className="text-lg font-bold text-emerald-600">{c.points.toLocaleString()}</div><div className="text-[10px] uppercase font-bold text-slate-500">reputation</div></div>
            </div>
          ))}
        </div>
      )}
      <p className="text-[11px] text-slate-500">Counts use the most recent 300 guides, 300 questions, 500 answers and 300 videos.</p>
    </PageShell>
  );
}
