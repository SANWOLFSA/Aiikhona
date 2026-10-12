import { useMemo, useState, type ReactNode } from 'react';
import { Cpu, ShieldAlert, Ruler, Waves, Gauge, ListChecks } from 'lucide-react';

function Card({ icon, title, children, id }: { icon: ReactNode; title: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3 scroll-mt-40">
      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">{icon}{title}</h3>
      {children}
    </section>
  );
}
const P = ({ children }: { children: ReactNode }) => <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{children}</p>;

function BlockDiagram() {
  const box = (x: number, y: number, w: number, label: string, sub: string, fill = '#eef2ff') => (
    <g><rect x={x} y={y} width={w} height="46" rx="8" fill={fill} stroke="#6366f1" strokeWidth="1.5" />
      <text x={x + w / 2} y={y + 20} textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e1b4b">{label}</text>
      <text x={x + w / 2} y={y + 35} textAnchor="middle" fontSize="8.5" fill="#475569">{sub}</text></g>
  );
  const arrow = (x1: number, y1: number, x2: number, y2: number) => <g><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arr)" /></g>;
  return (
    <svg viewBox="0 0 640 220" className="w-full h-auto" role="img" aria-label="Block diagram of a digital multimeter">
      <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#64748b" /></marker></defs>
      {box(6, 10, 110, 'VΩ jack', '10 MΩ input', '#fee2e2')}
      {box(6, 87, 110, 'mA / 10A jack', 'fuse → shunt', '#fef3c7')}
      {box(6, 164, 110, 'COM', 'reference', '#e2e8f0')}
      {box(150, 10, 130, 'Voltage divider', 'scales V to ~mV')}
      {box(150, 87, 130, 'Shunt resistor', 'I → small V (V=I·R)')}
      {box(150, 164, 130, 'Test current source', 'Ω, diode, cap, beep')}
      {box(314, 87, 110, 'Range & function', 'switching + AC→RMS')}
      {box(456, 87, 80, 'ADC', 'V → number', '#dcfce7')}
      {box(560, 87, 74, 'MCU + LCD', 'counts, units')}
      {arrow(116, 33, 150, 33)}{arrow(116, 110, 150, 110)}{arrow(116, 33, 150, 180)}
      {arrow(280, 33, 314, 100)}{arrow(280, 110, 314, 110)}{arrow(280, 187, 314, 120)}
      {arrow(424, 110, 456, 110)}{arrow(536, 110, 560, 110)}
    </svg>
  );
}

type Wave = 'sine' | 'square' | 'triangle' | 'dimmer';
const WAVES: { id: Wave; label: string; f: (t: number) => number }[] = [
  { id: 'sine', label: 'Pure sine (mains)', f: (t) => Math.sin(2 * Math.PI * t) },
  { id: 'square', label: 'Square wave', f: (t) => (t % 1 < 0.5 ? 1 : -1) },
  { id: 'triangle', label: 'Triangle', f: (t) => { const x = t % 1; return x < 0.25 ? 4 * x : x < 0.75 ? 2 - 4 * x : 4 * x - 4; } },
  { id: 'dimmer', label: 'Dimmer (90° phase-cut)', f: (t) => { const x = t % 0.5; return x < 0.25 ? 0 : Math.sin(2 * Math.PI * t); } },
];

function TrueRmsDemo() {
  const [wave, setWave] = useState<Wave>('sine');
  const peak = 325; // V, ≈ 230 V RMS sine peak
  const w = WAVES.find((x) => x.id === wave)!;
  const { rms, avgResp, path } = useMemo(() => {
    const N = 2000; let sq = 0, ab = 0; const pts: string[] = [];
    for (let i = 0; i < N; i++) { const v = peak * w.f(i / N); sq += v * v; ab += Math.abs(v); }
    for (let i = 0; i <= 200; i++) { const t = (i / 200) * 2; pts.push(`${(i / 200) * 300},${60 - 50 * w.f(t)}`); }
    return { rms: Math.sqrt(sq / N), avgResp: (ab / N) * 1.1107, path: 'M' + pts.join(' L') };
  }, [w]);
  const err = ((avgResp - rms) / rms) * 100;
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {WAVES.map((x) => <button key={x.id} onClick={() => setWave(x.id)} className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${wave === x.id ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>{x.label}</button>)}
      </div>
      <svg viewBox="0 0 300 120" className="w-full max-w-md h-auto rounded-xl bg-slate-950">
        <line x1="0" y1="60" x2="300" y2="60" stroke="#334155" />
        <path d={path} fill="none" stroke="#34d399" strokeWidth="2" />
        <text x="6" y="14" fill="#94a3b8" fontSize="9">peak {peak} V</text>
      </svg>
      <div className="grid grid-cols-2 gap-2 max-w-md">
        <div className="rounded-xl p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900"><div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">True-RMS meter</div><div className="font-mono text-xl font-bold text-slate-900 dark:text-white">{rms.toFixed(1)} V</div></div>
        <div className="rounded-xl p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900"><div className="text-[11px] font-bold text-amber-700 dark:text-amber-300">Average-responding meter</div><div className="font-mono text-xl font-bold text-slate-900 dark:text-white">{avgResp.toFixed(1)} V</div><div className="text-[11px] text-slate-500">{Math.abs(err) < 0.5 ? 'correct for a sine' : `${err > 0 ? '+' : ''}${err.toFixed(1)} % error`}</div></div>
      </div>
      <P>An average-responding meter rectifies the signal, takes the average and multiplies by 1.111 — the ratio that is only true for a perfect sine wave. On square waves, triangle waves, dimmers, VSD/inverter outputs and switch-mode loads it reads wrong. A true-RMS meter calculates the real heating value (√ of the mean of v²), so it stays correct. Check the meter's crest-factor and bandwidth specs for very spiky or high-frequency signals.</P>
    </div>
  );
}

const CAT_ROWS = [
  ['CAT IV', 'Origin of the installation: utility supply, service entrance, electricity meter, overhead lines to the building.', 'Highest transient energy'],
  ['CAT III', 'Fixed installation: distribution boards (DB boards), breakers, fixed wiring, geysers/stoves hard-wired, 3-phase motors.', 'Use CAT III 600 V (or better) for DB-board work'],
  ['CAT II', 'Plug-in equipment and wall sockets: appliances, power tools, the socket itself.', 'Minimum for measuring at a socket'],
  ['CAT I / no mains', 'Electronics not connected to mains, battery and low-voltage circuits (newer standard editions call this "O" / not rated for mains).', 'Not for mains'],
];

export default function MeterTheory() {
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Card id="inside" icon={<Cpu className="w-5 h-5 text-indigo-500" />} title="What's inside a digital multimeter">
        <BlockDiagram />
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li><b>ADC (analogue-to-digital converter):</b> the heart of the meter. It only measures a small voltage (typically a few hundred mV full scale) and turns it into a count. Everything else exists to turn your quantity into that small voltage.</li>
          <li><b>Voltage divider:</b> a ~10 MΩ precision resistor chain. The range switch picks a tap so 600 V, 60 V or 6 V all arrive at the ADC as a fraction of a volt. The high total resistance is why a voltmeter barely loads the circuit.</li>
          <li><b>Shunt resistor:</b> for current, the current flows through a known small resistor (≈0.01 Ω for 10 A, a few ohms for mA) and the ADC reads the voltage across it (V = I × R). The protecting fuse sits in series with it.</li>
          <li><b>Test current source:</b> for Ω, diode, continuity and capacitance the meter supplies its own small current from the battery and measures the voltage that results — which is why the circuit must be OFF.</li>
        </ul>
      </Card>

      <Card id="ranging" icon={<Ruler className="w-5 h-5 text-emerald-500" />} title="Auto-ranging vs manual ranging">
        <P>A meter's "counts" set its resolution: a 6000-count meter shows up to 5999 on any range. On the 6 V range it reads 0.001 V steps; on the 60 V range 0.01 V; on 600 V, 0.1 V.</P>
        <P><b>Manual ranging</b> means you pick the range. Pick one too low and the display shows <span className="font-mono">OL</span> (over-limit) — a 9.4 V battery on the 6 V range. Pick one too high and you lose resolution. Rule: start on the highest range and step down.</P>
        <P><b>Auto-ranging</b> picks the range for you (shown as AUTO on the display). It is easier but a little slower to settle; press RANGE to lock a range when a reading keeps hopping. Try both in the simulator above.</P>
        <P><b>Accuracy</b> is quoted as ±(% of reading + digits), e.g. ±(0.5 % + 2): on a 5.000 V reading that is ±(0.025 + 0.002) V.</P>
      </Card>

      <Card id="safety" icon={<ShieldAlert className="w-5 h-5 text-red-500" />} title="CAT ratings & safety">
        <P>IEC 61010 measurement categories describe how big a voltage spike (transient) the meter can survive where you use it. A higher category at the same voltage means more protection. The meter AND the test leads must both be rated for the job.</P>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead><tr className="text-slate-400 uppercase"><th className="py-1.5 pr-2">Category</th><th className="py-1.5 pr-2">Where</th><th className="py-1.5">Note</th></tr></thead>
            <tbody>{CAT_ROWS.map((r) => <tr key={r[0]} className="border-t border-slate-200 dark:border-slate-800 align-top"><td className="py-2 pr-2 font-bold text-slate-900 dark:text-white whitespace-nowrap">{r[0]}</td><td className="py-2 pr-2 text-slate-700 dark:text-slate-300">{r[1]}</td><td className="py-2 text-slate-500">{r[2]}</td></tr>)}</tbody>
          </table>
        </div>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
          <li><b>Never measure current in parallel.</b> On A/mA the meter is a near-short. Across a battery or mains it blows the fuse — or, on a poorly fused meter, causes an arc flash.</li>
          <li><b>Fuses matter.</b> Replace a blown meter fuse only with the exact type printed on the meter (e.g. high-breaking-capacity ceramic). A glass fuse or a wire in a meter fuse holder is dangerous.</li>
          <li><b>Mains:</b> CAT II minimum at sockets, <b>CAT III 600 V or better at the DB board</b>. Use leads with shrouded plugs and finger guards; keep fingers behind the guards.</li>
          <li><b>Live–dead–live:</b> prove your meter on a known live source, test the circuit, prove the meter again. Only then treat it as dead.</li>
          <li><b>Ω, continuity, diode and capacitance only on unpowered, discharged circuits.</b></li>
          <li>Inspect leads for cracks; replace damaged leads. Don't work alone on high-energy circuits. Microwave HV and SMPS primaries can be lethal even unplugged.</li>
          <li>Move the red probe back to VΩ after current measurements — the #1 cause of blown meter fuses.</li>
        </ul>
      </Card>

      <Card id="analog" icon={<Gauge className="w-5 h-5 text-amber-500" />} title="Analogue vs digital meters">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead><tr className="text-slate-400 uppercase"><th className="py-1.5 pr-2"></th><th className="py-1.5 pr-2">Analogue (needle)</th><th className="py-1.5">Digital (DMM)</th></tr></thead>
            <tbody className="text-slate-700 dark:text-slate-300">
              {[
                ['Reading', 'Needle on a scale, read by eye (parallax errors; use the mirror strip).', 'Numbers, no interpretation; often a bar graph too.'],
                ['Accuracy', 'Typically a few % of full scale.', 'Typically 0.5 % or better on DC volts.'],
                ['Input load', 'Rated in Ω/V (e.g. 20 kΩ/V): loads high-impedance circuits more.', '~10 MΩ fixed on volts: very light load.'],
                ['Trends', 'Great for watching changes: a capacitor charging, a fluctuating signal.', 'Fast changes can blur the digits; the bar graph helps.'],
                ['Ω mode', 'Scale reversed and non-linear; zero-adjust needed every range. Internal battery polarity: on many analogue meters the BLACK lead is positive on Ω.', 'Linear, auto-zero, red is positive.'],
                ['Power', 'Needs no battery for V and A.', 'Needs a battery for everything.'],
              ].map((r) => <tr key={r[0]} className="border-t border-slate-200 dark:border-slate-800 align-top"><td className="py-2 pr-2 font-bold whitespace-nowrap">{r[0]}</td><td className="py-2 pr-2">{r[1]}</td><td className="py-2">{r[2]}</td></tr>)}
            </tbody>
          </table>
        </div>
      </Card>

      <Card id="trms" icon={<Waves className="w-5 h-5 text-violet-500" />} title="True RMS — why your meter may read AC wrong">
        <TrueRmsDemo />
      </Card>

      <Card id="habits" icon={<ListChecks className="w-5 h-5 text-teal-500" />} title="Good measurement habits">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
          <li>Black probe in COM, always. Red probe moves; black doesn't.</li>
          <li>Voltage: across (parallel), powered. Current: in series, powered. Resistance/diode/continuity/capacitance: across, unpowered.</li>
          <li>Short the probes on Ω to see lead resistance; use REL (relative) to null it on low values.</li>
          <li>Replace the meter battery when the low-battery symbol shows — weak batteries give wrong readings.</li>
          <li>Compare with a known-good part or board whenever you can; a reading means most when you know what "normal" is.</li>
          <li>Turn the dial to OFF (or V) when done.</li>
        </ul>
      </Card>
    </div>
  );
}
