import type { JackId, ModeId } from '../../data/meter/types';
import { MODE_BY_ID } from '../../data/meter/modes';

// Simulated bench for the "How a multimeter works" meter. Values are idealised but physically consistent
// (6000-count meter, 10 MΩ input, ~1 mA diode test, mA fuse 400 mA, 10 A fuse 10 A).

export type CircuitId = 'battery' | 'mains' | 'resistor' | 'led' | 'fuse' | 'capacitor' | 'series' | 'transistor' | 'thermocouple';
export type Connection = 'across' | 'series';

export interface CircuitInfo {
  id: CircuitId;
  label: string;
  short: string;
  description: string;
  live: boolean;
  /** Whether the "break the circuit and insert the meter in series" option makes sense. */
  allowsSeries?: boolean;
  /** Probes can be reversed meaningfully. */
  polar?: boolean;
  bestMode: ModeId;
}

export const CIRCUITS: CircuitInfo[] = [
  { id: 'battery', label: '9 V battery', short: '9V', description: 'A fresh 9 V alkaline battery (about 9.4 V open-circuit).', live: true, polar: true, bestMode: 'vdc' },
  { id: 'mains', label: 'Mains socket 230 V', short: '230V~', description: 'A 230 V, 50 Hz wall socket (South Africa / UK / EU). Use V~ with a CAT II-rated meter or better; CAT III for the distribution board.', live: true, bestMode: 'vac' },
  { id: 'resistor', label: '4.7 kΩ resistor', short: '4k7', description: 'A 4.7 kΩ ±5 % resistor out of circuit.', live: false, bestMode: 'ohm' },
  { id: 'led', label: 'Red LED', short: 'LED', description: 'A red 5 mm LED. Red probe on the anode (long leg) for forward bias.', live: false, polar: true, bestMode: 'diode' },
  { id: 'fuse', label: 'Glass fuse 2 A', short: 'FUSE', description: 'A good T2A glass fuse, removed from its holder.', live: false, bestMode: 'cont' },
  { id: 'capacitor', label: '100 µF capacitor', short: '100µ', description: 'A discharged 100 µF electrolytic.', live: false, polar: true, bestMode: 'cap' },
  { id: 'series', label: '9 V + 470 Ω load', short: 'LOAD', description: 'A 9 V battery driving a 470 Ω resistor (≈20 mA). Measure voltage ACROSS the resistor, or break the loop and put the meter IN SERIES for current.', live: true, allowsSeries: true, bestMode: 'ma' },
  { id: 'transistor', label: 'BC547 in hFE socket', short: 'NPN', description: 'A small NPN transistor plugged into the meter\'s hFE socket (E-B-C in the NPN row).', live: false, bestMode: 'hfe' },
  { id: 'thermocouple', label: 'K-type probe in hot water', short: '°C', description: 'A K-type thermocouple bead in a cup of ~62 °C water; meter terminals at ~24 °C.', live: false, bestMode: 'temp' },
];
export const CIRCUIT_BY_ID = Object.fromEntries(CIRCUITS.map((c) => [c.id, c])) as Record<CircuitId, CircuitInfo>;

export interface MeterState {
  mode: ModeId;
  red: JackId;
  black: JackId;
  circuit: CircuitId;
  connection: Connection;
  reversed: boolean;
  autoRange: boolean;
  rangeIdx: number;
}

export interface Range { max: number; scale: number; unit: string; dec: number }
// 6000-count ranges per mode (max in base units).
export const RANGES: Partial<Record<ModeId, Range[]>> = {
  vdc: [{ max: 0.6, scale: 1e3, unit: 'mV', dec: 1 }, { max: 6, scale: 1, unit: 'V', dec: 3 }, { max: 60, scale: 1, unit: 'V', dec: 2 }, { max: 600, scale: 1, unit: 'V', dec: 1 }, { max: 1000, scale: 1, unit: 'V', dec: 0 }],
  vac: [{ max: 6, scale: 1, unit: 'V', dec: 3 }, { max: 60, scale: 1, unit: 'V', dec: 2 }, { max: 600, scale: 1, unit: 'V', dec: 1 }, { max: 750, scale: 1, unit: 'V', dec: 0 }],
  ohm: [{ max: 600, scale: 1, unit: 'Ω', dec: 1 }, { max: 6e3, scale: 1e-3, unit: 'kΩ', dec: 3 }, { max: 6e4, scale: 1e-3, unit: 'kΩ', dec: 2 }, { max: 6e5, scale: 1e-3, unit: 'kΩ', dec: 1 }, { max: 6e6, scale: 1e-6, unit: 'MΩ', dec: 3 }, { max: 6e7, scale: 1e-6, unit: 'MΩ', dec: 2 }],
  mv: [{ max: 0.6, scale: 1e3, unit: 'mV', dec: 1 }],
  ma: [{ max: 0.06, scale: 1e3, unit: 'mA', dec: 2 }, { max: 0.6, scale: 1e3, unit: 'mA', dec: 1 }],
  ua: [{ max: 6e-4, scale: 1e6, unit: 'µA', dec: 1 }, { max: 6e-3, scale: 1e6, unit: 'µA', dec: 0 }],
  a: [{ max: 6, scale: 1, unit: 'A', dec: 3 }, { max: 10, scale: 1, unit: 'A', dec: 2 }],
  cap: [{ max: 6e-6, scale: 1e9, unit: 'nF', dec: 1 }, { max: 6e-4, scale: 1e6, unit: 'µF', dec: 1 }, { max: 6e-3, scale: 1e6, unit: 'µF', dec: 0 }],
};

export interface Reading {
  digits: string;
  unit: string;
  beep?: boolean;
  /** Most severe first. */
  warnings: { level: 'danger' | 'caution' | 'info'; text: string }[];
  note?: string;
  rangeLabel?: string;
  glowLed?: boolean;
}

function fmt(mode: ModeId, value: number, st: MeterState): { digits: string; unit: string; rangeLabel?: string } {
  const ranges = RANGES[mode];
  if (!ranges) return { digits: value.toFixed(2), unit: MODE_BY_ID[mode].unit };
  let r: Range;
  if (st.autoRange) r = ranges.find((x) => Math.abs(value) <= x.max) || ranges[ranges.length - 1];
  else r = ranges[Math.min(st.rangeIdx, ranges.length - 1)];
  const label = `${(r.max * r.scale).toLocaleString('en', { maximumFractionDigits: 3 })} ${r.unit}`;
  if (Math.abs(value) > r.max) return { digits: 'OL', unit: r.unit, rangeLabel: label };
  return { digits: (value * r.scale).toFixed(r.dec), unit: r.unit, rangeLabel: label };
}

const isCurrent = (m: ModeId) => m === 'a' || m === 'ma' || m === 'ua';

export function computeReading(st: MeterState): Reading {
  const c = CIRCUIT_BY_ID[st.circuit];
  const m = st.mode;
  const w: Reading['warnings'] = [];
  const out = (digits: string, unit = '', extra: Partial<Reading> = {}): Reading => ({ digits, unit, warnings: w, ...extra });
  if (m === 'off') return out('', '');

  // ---- Jack sanity ----
  if (st.red === st.black) { w.push({ level: 'caution', text: 'Both probes are in the same jack — there is no measurement path.' }); return out('----'); }
  if (st.black !== 'com') { w.push({ level: 'caution', text: 'The black probe belongs in COM — every measurement is referenced to COM. With black in another jack the meter cannot measure (and a current jack would bypass its protection).' }); return out('----'); }
  const redInCurrentJack = st.red === 'a10' || st.red === 'ma';
  const sourceAcross = c.live && st.connection === 'across';

  if (redInCurrentJack && sourceAcross) {
    // The dangerous classic: shunt across a live source.
    if (c.id === 'mains') {
      w.push({ level: 'danger', text: 'SHORT CIRCUIT ACROSS MAINS. The red probe is in a current jack, so the meter is a near-0 Ω shunt across 230 V. Result: the fuse blows instantly — or, on a meter without a proper HRC fuse, an arc flash that can burn your hands and eyes. Move the red probe to VΩ.' });
      return out('FUSE', '', { note: 'Never do this. This is exactly the accident CAT ratings and HRC fuses exist for.' });
    }
    const amps = st.red === 'a10' ? 9.4 / (1.7 + 0.01 + 0.15) : 9.4 / (1.7 + 1 + 0.15);
    w.push({ level: 'danger', text: `SHORT: red probe in the ${st.red === 'a10' ? '10A' : 'mA'} jack across a live ${c.label}. The shunt is almost 0 Ω, so roughly ${amps.toFixed(1)} A flows${st.red === 'ma' ? ' — far above the mA fuse rating, so the fuse blows' : ' — the battery heats and the probes can spark'}. Voltage is measured with the red probe in VΩ.` });
    return out(st.red === 'ma' ? 'FUSE' : isCurrent(m) ? amps.toFixed(2) : '0.00', st.red === 'ma' ? '' : isCurrent(m) ? 'A' : 'V', { note: 'Wrong-setup simulation: in real life the meter fuse (or the battery) takes the hit.' });
  }

  if (isCurrent(m)) {
    const need: JackId = m === 'a' ? 'a10' : 'ma';
    if (st.red !== need) {
      w.push({ level: 'caution', text: `For ${MODE_BY_ID[m].label} the red probe must be in the ${need === 'a10' ? '10A' : 'mA µA'} jack.` });
      return out(fmt(m, 0, st).digits, fmt(m, 0, st).unit);
    }
    if (c.id !== 'series' || st.connection !== 'series') {
      if (c.live) {
        w.push({ level: 'danger', text: 'A current range connected ACROSS a source is a short circuit. Current is measured IN SERIES: break the circuit and let the current flow through the meter.' });
        return out('FUSE');
      }
      w.push({ level: 'info', text: 'Nothing is driving current through this part, so current ranges read zero. Current is measured in series with a powered circuit (try “9 V + 470 Ω load”, In series).' });
      const f = fmt(m, 0, st); return out(f.digits, f.unit);
    }
    // series loop, correct jack
    const shunt = m === 'a' ? 0.01 : m === 'ma' ? 1 : 100;
    const I = 9.4 / (470 + shunt + 1.7);
    if (m === 'ua') {
      w.push({ level: 'caution', text: `≈${(I * 1000).toFixed(1)} mA is above the µA range. Over-range on µA/mA is protected by the mA fuse (400 mA), but start on a higher range when the current is unknown.` });
    }
    const burden = I * shunt;
    const f = fmt(m, I, st);
    return out(f.digits, f.unit, { rangeLabel: f.rangeLabel, note: `Current through the loop. The shunt drops ${burden < 0.001 ? (burden * 1e6).toFixed(0) + ' µV' : (burden * 1000).toFixed(1) + ' mV'} (burden voltage).${m === 'a' ? ' On the 10 A range the resolution is only 10 mA-ish: switch to mA for small currents.' : ''}` });
  }

  if (redInCurrentJack) {
    w.push({ level: 'caution', text: `Red probe is in the ${st.red === 'a10' ? '10A' : 'mA'} jack, but the dial is on ${MODE_BY_ID[m].label}. Move the red probe back to VΩ.` });
    return out('0.00', MODE_BY_ID[m].unit);
  }

  const sign = st.reversed ? -1 : 1;
  const passiveMode = m === 'ohm' || m === 'cont' || m === 'diode' || m === 'cap';
  if (c.live && passiveMode) {
    w.push({ level: c.id === 'mains' ? 'danger' : 'caution', text: `${MODE_BY_ID[m].label} on a live ${c.id === 'mains' ? 'mains circuit' : 'source'}: the meter is injecting its own test current into something already powered. Readings are meaningless and on mains the input protection may fail. Switch off and discharge first.` });
    return out(c.id === 'mains' ? '----' : 'OL', '');
  }
  if (c.id === 'mains' && (m === 'vdc' || m === 'vac' || m === 'hz' || m === 'mv')) {
    w.push({ level: 'info', text: 'Mains: use a CAT II-rated meter (or better) at a socket and CAT III 600 V+ at a distribution board. Keep fingers behind the probe guards, one hand where you can.' });
  }

  switch (c.id) {
    case 'battery': case 'series': {
      const V = c.id === 'battery' ? 9.42 : 9.40;
      if (c.id === 'series' && st.connection === 'series' && (m === 'vdc' || m === 'vac' || m === 'mv')) {
        w.push({ level: 'info', text: 'A voltmeter IN SERIES: its 10 MΩ input stops almost all current, so it reads nearly the full battery voltage and the load turns off. Voltage is measured across, current in series.' });
      }
      if (m === 'vdc') { const f = fmt(m, sign * V, st); if (st.reversed) w.push({ level: 'info', text: 'Minus sign: red is on the negative side. Nothing is wrong — just swap the probes.' }); return out(f.digits, f.unit, { rangeLabel: f.rangeLabel }); }
      if (m === 'vac') { w.push({ level: 'info', text: 'Pure DC on the AC range reads (near) zero on most meters.' }); const f = fmt(m, 0.003, st); return out(f.digits, f.unit, { rangeLabel: f.rangeLabel }); }
      if (m === 'mv') return out('OL', 'mV', { note: '9.4 V is far above the 600 mV range.' });
      if (m === 'hz') return out('0.00', 'Hz', { note: 'Steady DC has no frequency.' });
      break;
    }
    case 'mains': {
      if (m === 'vac') { const f = fmt(m, 231.6, st); return out(f.digits, f.unit, { rangeLabel: f.rangeLabel, note: 'RMS value of the sine wave (peak ≈ 327 V).' }); }
      if (m === 'vdc') { w.push({ level: 'caution', text: 'Mains on V DC averages to roughly zero — a dangerous "it\'s dead" reading. Use V~.' }); const f = fmt(m, 0.4, st); return out(f.digits, f.unit, { rangeLabel: f.rangeLabel }); }
      if (m === 'hz') return out('50.00', 'Hz');
      if (m === 'mv') return out('OL', 'mV');
      break;
    }
    case 'resistor': {
      if (m === 'ohm') { const f = fmt(m, 4692 + 0.2, st); return out(f.digits, f.unit, { rangeLabel: f.rangeLabel, note: 'R = V ÷ I: the meter pushes a known current and reads the voltage.' }); }
      if (m === 'cont') return out('OL', 'Ω', { note: 'No beep: 4.7 kΩ is far above the continuity threshold.' });
      if (m === 'diode') return out('OL', 'V', { note: '~1 mA through 4.7 kΩ would need 4.7 V, more than the meter\'s ~3 V test voltage.' });
      if (m === 'cap') return out('0.0', 'nF');
      break;
    }
    case 'led': {
      if (m === 'diode') return st.reversed ? out('OL', 'V', { note: 'Reverse biased: no conduction.' }) : out('1.782', 'V', { glowLed: true, note: 'Forward voltage of a red LED at ~1 mA — it glows faintly.' });
      if (m === 'ohm') return out('OL', 'Ω', { note: 'The Ω test voltage is usually too low to turn the LED on. Use diode mode.' });
      if (m === 'cont') return out('OL', 'Ω');
      if (m === 'cap') return out('0.0', 'nF');
      break;
    }
    case 'fuse': {
      if (m === 'cont') return out('0.3', 'Ω', { beep: true, note: 'Beep: continuity (includes ~0.2 Ω of test-lead resistance).' });
      if (m === 'ohm') { const f = fmt(m, 0.3, st); return out(f.digits, f.unit, { rangeLabel: f.rangeLabel }); }
      if (m === 'diode') return out('0.002', 'V', { beep: true });
      if (m === 'cap') return out('----', '');
      break;
    }
    case 'capacitor': {
      if (m === 'cap') { const f = fmt(m, 98.4e-6, st); return out(f.digits, f.unit, { rangeLabel: f.rangeLabel, note: 'C = I·t ÷ V: the meter times how long a known current takes to charge it.' }); }
      if (m === 'ohm') return out('OL', 'Ω', { note: 'Rises from low to OL as the meter charges it — that rise is a sign of a working capacitor.' });
      if (m === 'diode') return out('OL', 'V');
      if (m === 'cont') return out('OL', 'Ω', { beep: false, note: 'May chirp briefly at first contact while it charges.' });
      break;
    }
    case 'transistor': {
      if (m === 'hfe') return out('287', '', { note: 'hFE = Ic ÷ Ib with the meter\'s small fixed base current. A rough figure only.' });
      w.push({ level: 'info', text: 'This part is in the hFE socket, not on the probes. Turn the dial to hFE.' });
      return out(m === 'temp' ? '----' : 'OL', '');
    }
    case 'thermocouple': {
      if (m === 'temp') return out('62', '°C', { note: 'Thermocouple ≈41 µV/°C × (62 − 24) °C ≈ 1.56 mV, plus cold-junction compensation for the 24 °C terminals.' });
      if (m === 'mv') return out('1.6', 'mV', { note: 'The raw thermocouple voltage — the °C range converts this for you.' });
      if (m === 'vdc') { const f = fmt(m, 0.00156, st); return out(f.digits, f.unit, { rangeLabel: f.rangeLabel }); }
      break;
    }
  }
  if (m === 'hfe') { w.push({ level: 'info', text: 'hFE only works with a transistor in the socket.' }); return out('0', ''); }
  if (m === 'temp') { w.push({ level: 'info', text: 'Temperature needs the K-type thermocouple plugged in.' }); return out('----', '°C'); }
  if (m === 'hz') return out('0.00', 'Hz');
  if (m === 'vdc' || m === 'vac') { const f = fmt(m, 0, st); return out(f.digits, f.unit, { rangeLabel: f.rangeLabel, note: 'Unpowered part: no voltage to measure.' }); }
  if (m === 'mv') return out('0.0', 'mV');
  return out('----', '');
}

/** Ready-made wrong setups for the "wrong setup simulator". */
export const MISTAKES: { id: string; label: string; state: Partial<MeterState> }[] = [
  { id: 'v-10a', label: 'Probe left in 10A, measuring a battery', state: { circuit: 'battery', mode: 'vdc', red: 'a10', black: 'com', connection: 'across', reversed: false } },
  { id: 'ma-across', label: 'mA range across a battery (in parallel)', state: { circuit: 'battery', mode: 'ma', red: 'ma', black: 'com', connection: 'across', reversed: false } },
  { id: 'a-mains', label: '10A jack across a mains socket', state: { circuit: 'mains', mode: 'a', red: 'a10', black: 'com', connection: 'across' } },
  { id: 'ohm-mains', label: 'Ω on a live mains socket', state: { circuit: 'mains', mode: 'ohm', red: 'vohm', black: 'com', connection: 'across' } },
  { id: 'vdc-mains', label: 'V DC on mains (reads ~0 — "it\'s dead"?)', state: { circuit: 'mains', mode: 'vdc', red: 'vohm', black: 'com', connection: 'across' } },
  { id: 'v-series', label: 'Voltmeter in series with a load', state: { circuit: 'series', mode: 'vdc', red: 'vohm', black: 'com', connection: 'series' } },
  { id: 'ua-over', label: 'µA range on a 20 mA circuit', state: { circuit: 'series', mode: 'ua', red: 'ma', black: 'com', connection: 'series' } },
  { id: 'reversed', label: 'Probes reversed on a battery', state: { circuit: 'battery', mode: 'vdc', red: 'vohm', black: 'com', connection: 'across', reversed: true } },
];
