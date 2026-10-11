// Shared types for the Multimeter & Component Testing section.

/** Rotary dial positions on the simulated meter. */
export type ModeId =
  | 'vdc' | 'vac' | 'mv' | 'ohm' | 'cont' | 'diode'
  | 'a' | 'ma' | 'ua' | 'cap' | 'hz' | 'hfe' | 'temp' | 'off';

/** Input jacks on the meter. */
export type JackId = 'com' | 'vohm' | 'ma' | 'a10';

export type FaultKind = 'good' | 'open' | 'shorted' | 'leaky';

export type ComponentCategory =
  | 'Passive' | 'Semiconductors' | 'Power & protection' | 'Electromechanical'
  | 'Sensors' | 'Appliance parts' | 'Sources & ICs';

/** One measurement in the practice simulator. Numbers inside {a-b} are randomised within the range
 * (keeping the decimals of `a`), e.g. "{0.55-0.70} V". */
export interface PracticeTest {
  id: string;
  /** Where the probes go, as shown to the learner. */
  probes: string;
  /** Meter mode this step needs. */
  mode: ModeId;
  /** Whether this step is done with the circuit powered (only for sources, regulators, sensors, ICs). */
  powered?: boolean;
  good: string;
  open?: string;
  shorted?: string;
  leaky?: string;
}

export interface PracticeSpec {
  /** Faults the simulator can pick from (always includes 'good'). */
  faults: FaultKind[];
  /** Label for the "leaky" fault when it means something specific (e.g. "high ESR", "drifted"). */
  leakyLabel?: string;
  /** Label for "open" / "shorted" when the generic word fits badly (e.g. "flat" for a battery). */
  openLabel?: string;
  shortedLabel?: string;
  tests: PracticeTest[];
  /** One-line explanation shown after the quiz answer, per fault. */
  explain: Partial<Record<FaultKind, string>>;
}

export interface MeterComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  aliases: string[];
  /** Key for <ComponentSymbol>. */
  symbol: string;
  summary: string;
  pinout: string[];
  modes: ModeId[];
  probes: string;
  steps: string[];
  expected: string[];
  failureSigns: string[];
  inCircuit: string;
  safety: string[];
  danger?: boolean;
  practice: PracticeSpec;
}
