import type { TheoryLevel, TheorySubjectId } from './types';

export interface TheoryLevelMeta {
  id: TheoryLevel;
  label: string;
  short: string;
  description: string;
  curricula: string;
}

export const THEORY_LEVELS: TheoryLevelMeta[] = [
  {
    id: 'school',
    label: 'School',
    short: 'School',
    description: 'High-school foundations: circuits, Ohm’s law, magnetism, basic electronics and safety.',
    curricula: 'Gr 10–12 Physical Sciences & Electrical Technology (CAPS) and equivalent school syllabi',
  },
  {
    id: 'college',
    label: 'College / Trade (TVET)',
    short: 'College',
    description: 'Trade theory and electrotechnics: AC, three-phase, machines, installation rules and protection.',
    curricula: 'TVET NATED N1–N6 (Electrical Trade Theory, Electrotechnics, Industrial Electronics, Power Machines), NCV and trade-test preparation',
  },
  {
    id: 'university',
    label: 'University',
    short: 'University',
    description: 'Engineering depth: network analysis, fields, power systems, electronics, signals and control.',
    curricula: 'BSc / BEng Electrical & Electronic Engineering, Diploma & BEngTech',
  },
];

export interface TheorySubjectMeta {
  id: TheorySubjectId;
  label: string;
  emoji: string;
  blurb: string;
}

export const THEORY_SUBJECTS: TheorySubjectMeta[] = [
  { id: 'fundamentals', label: 'Fundamentals & Units', emoji: '⚡', blurb: 'Charge, current, voltage, resistance, power, energy and safety.' },
  { id: 'dc', label: 'DC Circuits & Network Theorems', emoji: '🔋', blurb: 'Series/parallel, Kirchhoff, nodal & mesh, Thevenin, Norton, superposition.' },
  { id: 'fields', label: 'Electric & Magnetic Fields', emoji: '🧲', blurb: 'Electrostatics, capacitors, magnetism, induction, inductors and Maxwell.' },
  { id: 'ac', label: 'AC Circuits & Three-Phase', emoji: '〰️', blurb: 'Sinusoids, phasors, impedance, resonance, power factor and three-phase.' },
  { id: 'machines', label: 'Machines & Transformers', emoji: '⚙️', blurb: 'Transformers, DC machines, induction & synchronous machines, motor control.' },
  { id: 'power', label: 'Power Systems & Protection', emoji: '🏭', blurb: 'Generation, transmission, faults, protection, stability and renewables.' },
  { id: 'installation', label: 'Installation & Wiring Rules', emoji: '🏠', blurb: 'SANS 10142-1 overview, earthing, earth leakage, cable sizing and CoC testing.' },
  { id: 'measurement', label: 'Measurement & Instrumentation', emoji: '📏', blurb: 'Meters, oscilloscopes, CTs/VTs, sensors and measurement errors.' },
  { id: 'electronics', label: 'Electronics & Power Electronics', emoji: '🔌', blurb: 'Semiconductors, diodes, transistors, op-amps, filters, converters and inverters.' },
  { id: 'digital', label: 'Digital & Embedded Systems', emoji: '💾', blurb: 'Number systems, logic, flip-flops, ADC/DAC, microcontrollers and PLCs.' },
  { id: 'signals', label: 'Signals, Systems & Control', emoji: '📈', blurb: 'Fourier, Laplace, sampling, Z-transform, control, PID and communications.' },
];

export const subjectLabel = (id: TheorySubjectId): string =>
  THEORY_SUBJECTS.find(s => s.id === id)?.label ?? id;

export const levelLabel = (id: TheoryLevel): string =>
  THEORY_LEVELS.find(l => l.id === id)?.short ?? id;
