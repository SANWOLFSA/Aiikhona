import { useMemo, useState } from 'react';
import { AlertTriangle, Info, OctagonAlert, RotateCcw, Zap, Cable, Gauge } from 'lucide-react';
import type { JackId, ModeId } from '../../data/meter/types';
import { JACK_BY_ID, MODE_BY_ID } from '../../data/meter/modes';
import MeterFace from './MeterFace';
import { CIRCUITS, CIRCUIT_BY_ID, MISTAKES, RANGES, computeReading, type MeterState } from './meterEngine';

const INITIAL: MeterState = { mode: 'vdc', red: 'vohm', black: 'com', circuit: 'battery', connection: 'across', reversed: false, autoRange: true, rangeIdx: 1 };

export default function MultimeterSim() {
  const [st, setSt] = useState<MeterState>(INITIAL);
  const [placing, setPlacing] = useState<'red' | 'black'>('red');
  const reading = useMemo(() => computeReading(st), [st]);
  const mode = MODE_BY_ID[st.mode];
  const circuit = CIRCUIT_BY_ID[st.circuit];
  const ranges = RANGES[st.mode];
  const danger = reading.warnings.some((w) => w.level === 'danger');

  const set = (p: Partial<MeterState>) => setSt((s) => ({ ...s, ...p }));
  const onMode = (m: ModeId) => set({ mode: m, rangeIdx: Math.min(st.rangeIdx, (RANGES[m]?.length || 1) - 1) });
  const onJack = (j: JackId) => {
    if (placing === 'red') set({ red: j }); else set({ black: j });
  };
  const fixProbes = () => set({ red: mode.redJack, black: 'com' });

  return (
    <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-5 items-start">
      <div className="flex flex-col items-center gap-3">
        <MeterFace mode={st.mode} red={st.red} black={st.black} digits={reading.digits} unit={reading.unit} beep={reading.beep}
          flags={[st.autoRange && ranges ? 'AUTO' : ranges ? 'MANU' : '', 'TRMS']} danger={danger} onMode={onMode} onJack={onJack} placing={placing} />
        <div className="flex gap-2 text-xs">
          <span className="text-slate-500 self-center">Click a jack to move the</span>
          {(['red', 'black'] as const).map((p) => (
            <button key={p} onClick={() => setPlacing(p)} className={`px-3 py-1.5 rounded-lg font-bold border ${placing === p ? (p === 'red' ? 'bg-red-600 text-white border-red-600' : 'bg-slate-900 text-white border-slate-900 dark:bg-slate-200 dark:text-slate-900') : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>{p} probe</button>
          ))}
        </div>
        {reading.glowLed && <div className="text-xs font-bold text-red-500 flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_4px_rgba(239,68,68,0.6)]" />LED glowing faintly</div>}
      </div>

      <div className="space-y-4 min-w-0">
        {/* Circuit picker */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-4 space-y-3">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2"><Cable className="w-4 h-4 text-emerald-500" />What are the probes touching?</h3>
          <div className="flex flex-wrap gap-1.5">
            {CIRCUITS.map((c) => (
              <button key={c.id} onClick={() => set({ circuit: c.id, connection: 'across', reversed: false })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${st.circuit === c.id ? 'bg-gradient-to-r from-indigo-600 to-violet-500 text-white border-transparent' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                {c.id === 'mains' && <Zap className="inline w-3 h-3 mr-1 -mt-0.5 text-amber-400" />}{c.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{circuit.description} <span className="text-slate-400">Best mode: {MODE_BY_ID[circuit.bestMode].label}.</span></p>
          <div className="flex flex-wrap gap-2 text-xs">
            {circuit.allowsSeries && (
              <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                {(['across', 'series'] as const).map((c) => (
                  <button key={c} onClick={() => set({ connection: c })} className={`px-3 py-1.5 font-bold ${st.connection === c ? 'bg-emerald-500 text-white' : 'text-slate-600 dark:text-slate-300'}`}>{c === 'across' ? 'Across the resistor (parallel)' : 'Break loop: in series'}</button>
                ))}
              </div>
            )}
            {circuit.polar && (
              <button onClick={() => set({ reversed: !st.reversed })} className={`px-3 py-1.5 rounded-xl font-bold border ${st.reversed ? 'bg-amber-500 text-white border-amber-500' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
                {st.reversed ? 'Probes reversed' : 'Red on + / anode'}
              </button>
            )}
            {ranges && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <button onClick={() => set({ autoRange: !st.autoRange })} className={`px-3 py-1.5 rounded-xl font-bold border ${st.autoRange ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>{st.autoRange ? 'Auto-range' : 'Manual range'}</button>
                {!st.autoRange && ranges.map((r, i) => (
                  <button key={i} onClick={() => set({ rangeIdx: i })} className={`px-2 py-1 rounded-lg font-mono text-[11px] border ${st.rangeIdx === i ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}>{(r.max * r.scale).toLocaleString('en', { maximumFractionDigits: 3 })} {r.unit}</button>
                ))}
              </div>
            )}
          </div>
          {reading.rangeLabel && <p className="text-[11px] text-slate-400">Range in use: {reading.rangeLabel} full scale.</p>}
        </section>

        {/* Warnings */}
        {reading.warnings.length > 0 && (
          <div className="space-y-2">
            {reading.warnings.map((w, i) => (
              <div key={i} className={`flex gap-2.5 rounded-xl p-3 text-xs leading-relaxed border ${w.level === 'danger' ? 'bg-red-50 border-red-300 text-red-800 dark:bg-red-950/50 dark:border-red-800 dark:text-red-200' : w.level === 'caution' ? 'bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200' : 'bg-sky-50 border-sky-200 text-sky-900 dark:bg-sky-950/40 dark:border-sky-900 dark:text-sky-200'}`}>
                {w.level === 'danger' ? <OctagonAlert className="w-4 h-4 shrink-0 mt-0.5" /> : w.level === 'caution' ? <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> : <Info className="w-4 h-4 shrink-0 mt-0.5" />}
                <span>{w.text}</span>
              </div>
            ))}
            {(st.red !== mode.redJack || st.black !== 'com') && mode.connection !== 'socket' && st.mode !== 'off' && (
              <button onClick={fixProbes} className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5" />Put probes in the right jacks for {mode.label}</button>
            )}
          </div>
        )}
        {reading.note && <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200 dark:border-slate-700">{reading.note}</p>}

        {/* Mode explainer */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-4 space-y-2">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2"><Gauge className="w-4 h-4 text-indigo-500" />{mode.label} <span className="font-mono text-xs text-slate-400">{mode.dial}</span></h3>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{mode.measures}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed"><span className="font-bold text-slate-800 dark:text-slate-200">Inside the meter: </span>{mode.inside}</p>
          {st.mode !== 'off' && (
            <p className="text-xs"><span className="font-bold text-slate-800 dark:text-slate-200">Probes: </span>
              {mode.connection === 'socket' ? <span className="text-slate-600 dark:text-slate-300">uses the {st.mode === 'hfe' ? 'hFE socket' : 'thermocouple plugged into COM and VΩ (or its own socket)'}.</span>
                : <span className="text-slate-600 dark:text-slate-300">black → COM, red → <b className="text-red-600">{JACK_BY_ID[mode.redJack].label}</b>; connect {mode.connection === 'series' ? <b>in series (break the circuit)</b> : mode.connection === 'parallel' ? <b>across the part (parallel), circuit powered</b> : <b>across the part, circuit OFF</b>}.</span>}
            </p>
          )}
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">{mode.tips.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>

        {/* Wrong setup simulator */}
        <section className="rounded-2xl border border-red-200 dark:border-red-900/60 bg-red-50/60 dark:bg-red-950/20 p-4 space-y-2">
          <h3 className="text-sm font-black text-red-800 dark:text-red-200 flex items-center gap-2"><OctagonAlert className="w-4 h-4" />Wrong-setup simulator</h3>
          <p className="text-xs text-red-900/80 dark:text-red-200/80">Load a classic mistake and see what the meter (and the circuit) would do — safely.</p>
          <div className="flex flex-wrap gap-1.5">
            {MISTAKES.map((m) => (
              <button key={m.id} onClick={() => set({ ...m.state })} className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-950">{m.label}</button>
            ))}
            <button onClick={() => setSt(INITIAL)} className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:underline">Reset</button>
          </div>
        </section>
      </div>
    </div>
  );
}
