import { useEffect, useMemo, useState } from 'react';
import { Dices, CheckCircle2, XCircle, OctagonAlert, Info, Trophy, BookOpen, Shuffle } from 'lucide-react';
import { navigate, RouteLink } from '../../hooks/usePathname';
import { COMPONENT_BY_ID, METER_COMPONENTS, MODE_BY_ID, faultLabel, simulatePractice, type FaultKind, type JackId, type ModeId } from '../../data/meter';
import MeterFace from './MeterFace';
import ComponentSymbol from './ComponentSymbol';

function prng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s % 100000) / 100000; };
}
const hash = (str: string) => [...str].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);

interface LogRow { testId: string; probes: string; mode: ModeId; display: string; level: 'ok' | 'hint' | 'danger' }

export default function PracticeLab({ componentId }: { componentId?: string }) {
  const comp = (componentId && COMPONENT_BY_ID[componentId]) || METER_COMPONENTS[0];
  const spec = comp.practice;
  const [round, setRound] = useState(() => Math.floor(Math.random() * 1e9));
  const fault: FaultKind = useMemo(() => spec.faults[Math.floor(prng(round)() * spec.faults.length)], [round, spec]);
  const [mode, setMode] = useState<ModeId>('vdc');
  const [red, setRed] = useState<JackId>('vohm');
  const [black, setBlack] = useState<JackId>('com');
  const [placing, setPlacing] = useState<'red' | 'black'>('red');
  const [testId, setTestId] = useState(spec.tests[0].id);
  const [log, setLog] = useState<LogRow[]>([]);
  const [answer, setAnswer] = useState<FaultKind | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });

  // New component -> fresh round.
  useEffect(() => { setRound(Math.floor(Math.random() * 1e9)); setTestId(comp.practice.tests[0].id); setLog([]); setAnswer(null); }, [comp.id]);

  const test = spec.tests.find((t) => t.id === testId) || spec.tests[0];
  const outcome = useMemo(() => simulatePractice(test, fault, mode, red, black, prng(round ^ hash(test.id))), [test, fault, mode, red, black, round]);

  const record = () => setLog((l) => [{ testId: test.id, probes: test.probes, mode, display: outcome.display || '(off)', level: outcome.level }, ...l].slice(0, 12));
  const choose = (f: FaultKind) => { if (answer) return; setAnswer(f); setScore((s) => ({ right: s.right + (f === fault ? 1 : 0), total: s.total + 1 })); };
  const nextRound = (randomPart = false) => {
    setAnswer(null); setLog([]);
    if (randomPart) {
      const other = METER_COMPONENTS[Math.floor(Math.random() * METER_COMPONENTS.length)];
      navigate(`/multimeter/practice/${other.id}`, { keepScroll: true });
    } else setRound(Math.floor(Math.random() * 1e9));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-4 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-20 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 flex items-center justify-center shrink-0"><ComponentSymbol symbol={comp.symbol} className="w-16 h-8" /></div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Mystery part on the bench</p>
            <select value={comp.id} onChange={(e) => navigate(`/multimeter/practice/${e.target.value}`, { keepScroll: true })}
              className="mt-0.5 w-full max-w-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold text-slate-900 dark:text-white px-2 py-1">
              {METER_COMPONENTS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-200"><Trophy className="w-4 h-4 text-amber-500" />{score.right}/{score.total}</span>
          <button onClick={() => nextRound(false)} className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1"><Dices className="w-3.5 h-3.5" />New part</button>
          <button onClick={() => nextRound(true)} className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1"><Shuffle className="w-3.5 h-3.5" />Random component</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,320px)_1fr] gap-5 items-start">
        <div className="flex flex-col items-center gap-2">
          <MeterFace mode={mode} red={red} black={black} digits={outcome.display} unit="" danger={outcome.level === 'danger'} beep={/BEEP/.test(outcome.display)}
            onMode={setMode} onJack={(j) => (placing === 'red' ? setRed(j) : setBlack(j))} placing={placing} />
          {outcome.display && <p className="font-mono text-sm font-black text-slate-900 dark:text-white text-center">Display: {outcome.display}</p>}
          <div className="flex gap-2 text-xs">
            {(['red', 'black'] as const).map((p) => (
              <button key={p} onClick={() => setPlacing(p)} className={`px-3 py-1.5 rounded-lg font-bold border ${placing === p ? (p === 'red' ? 'bg-red-600 text-white border-red-600' : 'bg-slate-900 text-white border-slate-900 dark:bg-slate-200 dark:text-slate-900') : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>place {p}</button>
            ))}
          </div>
        </div>

        <div className="space-y-4 min-w-0">
          <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-4 space-y-2">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">1 · Set the dial and jacks, then pick where the probes touch</h3>
            <div className="space-y-1.5">
              {spec.tests.map((t) => (
                <label key={t.id} className={`flex items-start gap-2 rounded-xl border p-2.5 cursor-pointer text-xs ${t.id === testId ? 'border-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30' : 'border-slate-200 dark:border-slate-700'}`}>
                  <input type="radio" name="probe-step" checked={t.id === testId} onChange={() => setTestId(t.id)} className="mt-0.5 accent-emerald-600" />
                  <span className="text-slate-700 dark:text-slate-200">{t.probes}{t.powered && <span className="ml-1.5 px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 text-[10px] font-bold">POWERED</span>}</span>
                </label>
              ))}
            </div>
            {outcome.message && (
              <div className={`flex gap-2 rounded-xl p-2.5 text-xs border ${outcome.level === 'danger' ? 'bg-red-50 border-red-300 text-red-800 dark:bg-red-950/50 dark:border-red-800 dark:text-red-200' : 'bg-sky-50 border-sky-200 text-sky-900 dark:bg-sky-950/40 dark:border-sky-900 dark:text-sky-200'}`}>
                {outcome.level === 'danger' ? <OctagonAlert className="w-4 h-4 shrink-0" /> : <Info className="w-4 h-4 shrink-0" />}<span>{outcome.message}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <button onClick={record} className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 text-white text-xs font-bold">Write reading in the log</button>
              <span className="text-[11px] text-slate-400">Dial now: {MODE_BY_ID[mode].label}</span>
            </div>
            {log.length > 0 && (
              <table className="w-full text-[11px] mt-2">
                <tbody>{log.map((r, i) => <tr key={i} className="border-t border-slate-100 dark:border-slate-800"><td className="py-1 pr-2 text-slate-600 dark:text-slate-300">{r.probes}</td><td className="py-1 pr-2 text-slate-400 whitespace-nowrap">{MODE_BY_ID[r.mode].dial.trim()}</td><td className={`py-1 font-mono font-bold whitespace-nowrap ${r.level === 'danger' ? 'text-red-600' : r.level === 'hint' ? 'text-slate-400' : 'text-slate-900 dark:text-white'}`}>{r.display}</td></tr>)}</tbody>
              </table>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-4 space-y-3">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">2 · Is it good?</h3>
            <div className="flex flex-wrap gap-2">
              {spec.faults.map((f) => {
                const isRight = answer && f === fault, isPicked = answer === f;
                return (
                  <button key={f} onClick={() => choose(f)} disabled={!!answer}
                    className={`px-4 py-2 rounded-xl text-xs font-black border capitalize transition ${isRight ? 'bg-emerald-500 text-white border-emerald-500' : isPicked ? 'bg-red-500 text-white border-red-500' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                    {faultLabel(spec, f)}
                  </button>
                );
              })}
            </div>
            {answer && (
              <div className={`rounded-xl p-3 text-xs border flex gap-2 ${answer === fault ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200' : 'bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200'}`}>
                {answer === fault ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                <div className="space-y-1">
                  <p className="font-bold">{answer === fault ? 'Correct' : 'Not quite'} — this part was <span className="uppercase">{faultLabel(spec, fault)}</span>.</p>
                  <p>{spec.explain[fault]}</p>
                  <p className="text-[11px] opacity-80">Readings for this part: {spec.tests.map((t) => `${t.probes.split(' (')[0]}: ${(fault === 'good' ? t.good : t[fault]) ?? t.good}`.replace(/\{([\d.-]+)-([\d.-]+)\}/g, '$1–$2')).join(' · ')}</p>
                  <button onClick={() => nextRound(false)} className="mt-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold">Next mystery part</button>
                </div>
              </div>
            )}
            <RouteLink to={`/multimeter/test/${comp.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"><BookOpen className="w-3.5 h-3.5" />Read the full test guide for {comp.name}</RouteLink>
          </section>
        </div>
      </div>
    </div>
  );
}
