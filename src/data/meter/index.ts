import { COMPONENTS_A } from './componentsA';
import { COMPONENTS_B } from './componentsB';
import type { ComponentCategory, FaultKind, JackId, MeterComponent, ModeId, PracticeSpec, PracticeTest } from './types';
import { MODE_BY_ID } from './modes';

export * from './types';
export { MODES, MODE_BY_ID, DIAL_ORDER, JACKS, JACK_BY_ID } from './modes';

export const METER_COMPONENTS: MeterComponent[] = [...COMPONENTS_A, ...COMPONENTS_B];
const BASE_BY_ID: Record<string, MeterComponent> = Object.fromEntries(METER_COMPONENTS.map((c) => [c.id, c]));
/** Aliases used by the Repair hub component pages (/components/:part -> /multimeter/test/:key). */
const ALIASES: Record<string, string> = {
  capacitor: 'capacitor-ceramic', 'electrolytic-capacitor': 'capacitor-electrolytic', 'zener-diode': 'zener',
  'bjt-transistor': 'bjt-npn', transistor: 'bjt-npn', mosfet: 'mosfet-n', 'voltage-regulator': 'regulator-78xx',
  ic: 'ic-power-rails', varistor: 'mov', thermistor: 'thermistor-ntc', sensor: 'hall-sensor',
};
export const COMPONENT_BY_ID: Record<string, MeterComponent> = {
  ...BASE_BY_ID,
  ...Object.fromEntries(Object.entries(ALIASES).filter(([, t]) => BASE_BY_ID[t]).map(([a, t]) => [a, BASE_BY_ID[t]])),
};
export const CATEGORY_ORDER: ComponentCategory[] = ['Passive', 'Semiconductors', 'Power & protection', 'Electromechanical', 'Sensors', 'Appliance parts', 'Sources & ICs'];

export function searchComponents(q: string): MeterComponent[] {
  const s = q.trim().toLowerCase();
  if (!s) return METER_COMPONENTS;
  const words = s.split(/\s+/);
  return METER_COMPONENTS.filter((c) => {
    const hay = [c.name, c.category, c.summary, ...c.aliases].join(' ').toLowerCase();
    return words.every((w) => hay.includes(w));
  });
}

/** Expand "{a-b}" ranges to a random value with the same number of decimals as a. */
export function realise(template: string, rnd: () => number = Math.random): string {
  return template.replace(/\{(-?[\d.]+)-(-?[\d.]+)\}/g, (_m, a: string, b: string) => {
    const lo = parseFloat(a), hi = parseFloat(b);
    const dec = (a.split('.')[1] || '').length;
    return (lo + (hi - lo) * rnd()).toFixed(dec);
  });
}

export function faultLabel(spec: PracticeSpec, f: FaultKind): string {
  if (f === 'leaky') return spec.leakyLabel || 'leaky';
  if (f === 'open') return spec.openLabel || 'open';
  if (f === 'shorted') return spec.shortedLabel || 'shorted';
  return 'good';
}

export function readingFor(test: PracticeTest, fault: FaultKind): string {
  return (fault === 'good' ? test.good : test[fault]) ?? test.good;
}

export interface PracticeOutcome {
  display: string;
  /** 'ok' = valid measurement; 'hint' = wrong mode but harmless; 'danger' = a setup that would damage meter/part/you. */
  level: 'ok' | 'hint' | 'danger';
  message?: string;
}

/** What the practice meter shows for a given setup. */
export function simulatePractice(test: PracticeTest, fault: FaultKind, mode: ModeId, red: JackId, black: JackId, rnd: () => number): PracticeOutcome {
  const want = MODE_BY_ID[test.mode];
  const m = MODE_BY_ID[mode];
  const currentMode = mode === 'a' || mode === 'ma' || mode === 'ua';
  if (mode === 'off') return { display: '', level: 'hint', message: 'The meter is off — turn the dial.' };
  if (black !== 'com') return { display: '----', level: 'hint', message: 'The black probe always goes in COM.' };
  if ((red === 'a10' || red === 'ma') && !currentMode) {
    return { display: test.powered ? '!! SHORT' : '0.00', level: test.powered ? 'danger' : 'hint', message: test.powered
      ? 'Red probe is in a current jack: you have put the shunt (≈0 Ω) straight across a live source. That is a short circuit — the meter fuse blows (or worse).'
      : 'Red probe is in a current jack. Current jacks are only for A/mA/µA in series; move it back to VΩ.' };
  }
  if (currentMode && red === 'vohm') return { display: '0.000', level: 'hint', message: 'Current ranges need the red probe in the mA or 10A jack — and the meter IN SERIES.' };
  if (currentMode) {
    return test.powered
      ? { display: '!! FUSE', level: 'danger', message: 'Current mode across a live source = short circuit through the meter. This is how meter fuses (and probe tips) get blown. Measure voltage in parallel; current only in series.' }
      : { display: '0.000', level: 'hint', message: 'Nothing is driving current through an unpowered part, so a current range shows nothing useful here.' };
  }
  if (!test.powered && (mode === 'vdc' || mode === 'vac' || mode === 'mv')) {
    return { display: mode === 'mv' ? '0.0' : '0.00', level: 'hint', message: `The part is unpowered, so there is no voltage to measure. This step needs ${want.label}.` };
  }
  if (test.powered && (mode === 'ohm' || mode === 'cont' || mode === 'diode' || mode === 'cap')) {
    return { display: '----', level: 'danger', message: `${m.label} on a powered circuit gives meaningless readings and can damage the meter's input protection. Power off for ${m.label}, or use ${want.label} here.` };
  }
  if (mode !== test.mode) {
    // Close-enough equivalences that a technician would accept.
    const equiv = (test.mode === 'cont' && mode === 'ohm') || (test.mode === 'ohm' && mode === 'cont');
    if (equiv) {
      const raw = realise(readingFor(test, fault), rnd);
      const display = mode === 'ohm' ? raw.replace(/\s*·\s*BEEP/, '') : raw;
      return { display, level: 'ok', message: mode === 'cont' && /k|OL/.test(raw) ? 'No beep — too high for continuity.' : undefined };
    }
    return { display: mode === 'hfe' || mode === 'temp' ? '----' : 'OL?', level: 'hint', message: `${m.label} isn't the test for this step — try ${want.label}.` };
  }
  return { display: realise(readingFor(test, fault), rnd), level: 'ok' };
}

/** Lightweight keyword map used by catalog solution pages to link to tests (longest alias match wins). */
export function componentsMentionedIn(text: string, limit = 8): MeterComponent[] {
  const t = ` ${text.toLowerCase()} `;
  const esc = (k: string) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const scored: { c: MeterComponent; score: number }[] = [];
  for (const c of METER_COMPONENTS) {
    let best = 0;
    for (const k of c.aliases) {
      if (k.length > 2 && k.length > best && new RegExp(`[^a-z0-9]${esc(k)}s?[^a-z0-9]`).test(t)) best = k.length;
    }
    if (best) scored.push({ c, score: best });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((x) => x.c);
}
