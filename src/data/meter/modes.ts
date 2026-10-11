import type { JackId, ModeId } from './types';

export interface ModeInfo {
  id: ModeId;
  label: string;
  /** Text printed around the dial. */
  dial: string;
  unit: string;
  /** Jack the RED probe belongs in (black is always COM). */
  redJack: JackId;
  /** How the meter is connected to the circuit. */
  connection: 'parallel' | 'series' | 'unpowered' | 'socket' | 'off';
  measures: string;
  inside: string;
  tips: string[];
}

export const MODES: ModeInfo[] = [
  {
    id: 'off', label: 'OFF', dial: 'OFF', unit: '', redJack: 'vohm', connection: 'off',
    measures: 'Meter off. Leave it here (or on V) when you put it away so a battery is not drained and the next user does not start on a current range.',
    inside: 'Battery disconnected from the measuring circuit.',
    tips: ['Most meters auto power-off after ~15 minutes; the dial still needs to go back to OFF.'],
  },
  {
    id: 'vdc', label: 'DC voltage', dial: 'DCV', unit: 'V', redJack: 'vohm', connection: 'parallel',
    measures: 'The steady potential difference between the red and black probe: batteries, power supply rails, regulator outputs, logic levels. A minus sign means the red probe is at the lower potential — nothing is damaged, the leads are just reversed.',
    inside: 'The input sees a ~10 MΩ resistor divider that scales the voltage down to the ADC\'s small full-scale range (typically 200–600 mV). The ADC (often dual-slope or sigma-delta) converts that to digits 2–3 times a second. Because 10 MΩ draws only microamps, the meter barely disturbs most circuits.',
    tips: ['Connect ACROSS (in parallel with) the thing you are measuring.', 'Black on ground / negative, red on the point of interest.', 'Very high-impedance points (e.g. 10 MΩ bias networks) will read low because the meter\'s own 10 MΩ loads them.'],
  },
  {
    id: 'vac', label: 'AC voltage', dial: 'ACV', unit: 'V', redJack: 'vohm', connection: 'parallel',
    measures: 'The RMS value of an alternating voltage: mains (230 V 50 Hz in South Africa, UK, EU; 120 V 60 Hz in North America), transformer secondaries, AC motor and heater supplies.',
    inside: 'Same divider as DC, then an AC converter. Cheap meters rectify and average the signal, then multiply by 1.11 (the form factor of a pure sine). True-RMS meters compute the real RMS, so they stay correct on distorted waveforms.',
    tips: ['Check the meter\'s CAT rating before touching mains — CAT III 600 V or better for distribution boards.', 'Test your meter on a known live source before and after a "dead" test (live–dead–live).'],
  },
  {
    id: 'mv', label: 'Millivolts', dial: 'mV', unit: 'mV', redJack: 'vohm', connection: 'parallel',
    measures: 'Small voltages: shunt-resistor drops, thermocouple outputs, voltage drop across a closed contact or a cable under load.',
    inside: 'The divider is bypassed so the ADC sees the input almost directly, giving 0.1 mV (or better) resolution.',
    tips: ['Great for "volt-drop" testing a relay contact or connector while current flows — a good contact drops only a few mV.'],
  },
  {
    id: 'ohm', label: 'Resistance', dial: 'Ω', unit: 'Ω', redJack: 'vohm', connection: 'unpowered',
    measures: 'Resistance of a part or path with the circuit switched OFF and capacitors discharged.',
    inside: 'The meter pushes a small known constant current through the part and measures the voltage across it: R = V ÷ I. The lower the range, the bigger the test current. "OL" means the voltage hit full scale — the resistance is higher than the range (or the path is open).',
    tips: ['Never measure resistance on a live circuit — wrong readings at best, a damaged meter at worst.', 'Touch the probes together first: most leads read 0.1–0.5 Ω, subtract that on low-ohm parts.', 'Don\'t hold both probe tips with your fingers on high values; your body (~100 kΩ–1 MΩ) is in parallel.'],
  },
  {
    id: 'cont', label: 'Continuity', dial: '•))) ', unit: 'Ω', redJack: 'vohm', connection: 'unpowered',
    measures: 'A fast yes/no for a closed path: the buzzer sounds when resistance is below a threshold (commonly somewhere around 10–50 Ω — it varies by meter, check the manual).',
    inside: 'The low resistance range plus a comparator that drives the beeper. Response is faster than a full resistance reading.',
    tips: ['Use for fuses, cables, switches, PCB tracks.', 'A beep only means "low", not "zero" — a 30 Ω fault can still beep.'],
  },
  {
    id: 'diode', label: 'Diode test', dial: '→|', unit: 'V', redJack: 'vohm', connection: 'unpowered',
    measures: 'The forward voltage of a PN junction at a small test current. The display shows volts, not ohms: ~0.5–0.7 V for a silicon diode, ~0.15–0.4 V for Schottky/germanium, OL in reverse.',
    inside: 'A constant current of roughly 0.5–1.5 mA with an open-circuit voltage of about 2–3.3 V (meter dependent). That is enough to forward-bias silicon junctions, and sometimes to glow a red or green LED faintly — but usually not enough for blue/white LEDs or Zeners above ~3 V.',
    tips: ['Red probe = anode (+), black = cathode (−) for a forward reading.', 'This is the mode for transistors: each junction is a diode.'],
  },
  {
    id: 'a', label: 'Current 10 A', dial: 'A', unit: 'A', redJack: 'a10', connection: 'series',
    measures: 'Large currents (up to 10 A, often limited to 10–30 seconds) flowing THROUGH the meter: motor and heater current, charger output.',
    inside: 'A tiny shunt resistor (~0.01 Ω) sits between the 10 A jack and COM. The current makes a small voltage across it (burden voltage) which the ADC reads. A high-breaking-capacity fuse (commonly 10 A or 11 A, ceramic HRC) protects this jack on good meters; some cheap meters leave it unfused.',
    tips: ['Break the circuit and put the meter IN SERIES. Never across a supply.', 'Red probe MOVES to the 10 A jack — move it back afterwards.', 'Start on 10 A if you don\'t know the current, then step down.'],
  },
  {
    id: 'ma', label: 'Current mA', dial: 'mA', unit: 'mA', redJack: 'ma', connection: 'series',
    measures: 'Currents up to a few hundred milliamps: LED current, a board\'s supply current, standby current.',
    inside: 'A larger shunt (roughly 1–10 Ω depending on the range) gives more resolution. Protected by a fast fuse on the mA jack (commonly 200–500 mA, check the label printed next to the jack).',
    tips: ['In series only.', 'Burden voltage (the drop across the shunt) can be a few hundred mV and can starve a low-voltage circuit.'],
  },
  {
    id: 'ua', label: 'Current µA', dial: 'µA', unit: 'µA', redJack: 'ma', connection: 'series',
    measures: 'Tiny currents: sleep/standby current of battery devices, leakage, flame-sensor rectification current in gas boilers (a few µA).',
    inside: 'Same jack as mA on most meters with an even bigger shunt (hundreds of ohms to kΩ).',
    tips: ['In series only, with the red probe in the mA/µA jack.'],
  },
  {
    id: 'cap', label: 'Capacitance', dial: '⊣⊢', unit: 'µF', redJack: 'vohm', connection: 'unpowered',
    measures: 'Capacitance of a discharged capacitor, typically from a few nF up to hundreds or thousands of µF depending on the meter.',
    inside: 'The meter charges the capacitor with a known current and times how long the voltage takes to rise (C = I·t / V). Big capacitors take several seconds.',
    tips: ['ALWAYS discharge first — a charged cap can blow the meter\'s input protection.', 'Does not measure ESR; a cap can read full µF and still be bad.', 'Below ~100 pF the lead capacitance dominates; use the REL/zero button.'],
  },
  {
    id: 'hz', label: 'Frequency', dial: 'Hz', unit: 'Hz', redJack: 'vohm', connection: 'parallel',
    measures: 'How many cycles per second a signal repeats: mains 50/60 Hz, PWM signals, oscillator outputs. Many meters also show duty cycle (%).',
    inside: 'A comparator turns the signal into clean pulses, a counter counts them over a known time window from the meter\'s crystal clock.',
    tips: ['Needs a minimum signal amplitude (sensitivity) to trigger — see the manual.'],
  },
  {
    id: 'hfe', label: 'Transistor hFE', dial: 'hFE', unit: '', redJack: 'vohm', connection: 'socket',
    measures: 'The DC current gain (β = Ic ÷ Ib) of a small bipolar transistor plugged into the meter\'s NPN/PNP socket — not the probes.',
    inside: 'The socket supplies a small fixed base current (about 10 µA on many meters) and a few volts across collector–emitter; the collector current is read and shown as a ratio.',
    tips: ['Only a rough figure: real hFE changes a lot with current and temperature.', 'Pick the right socket half (NPN vs PNP) and E-B-C order.'],
  },
  {
    id: 'temp', label: 'Temperature', dial: '°C', unit: '°C', redJack: 'vohm', connection: 'socket',
    measures: 'Temperature with a K-type thermocouple bead plugged into the COM and VΩ jacks (or a dedicated socket).',
    inside: 'A K-type junction produces about 41 µV per °C. The meter measures that tiny voltage and adds the temperature of its own terminals (cold-junction compensation).',
    tips: ['Bare bead probes are often rated only to ~250 °C; check before measuring a soldering iron.'],
  },
];

export const MODE_BY_ID = Object.fromEntries(MODES.map((m) => [m.id, m])) as Record<ModeId, ModeInfo>;

/** Dial order clockwise starting at OFF (top). */
export const DIAL_ORDER: ModeId[] = ['off', 'vdc', 'vac', 'mv', 'ohm', 'cont', 'diode', 'cap', 'hz', 'temp', 'hfe', 'ua', 'ma', 'a'];

export interface JackInfo { id: JackId; label: string; sub: string; colour: string; role: string }
export const JACKS: JackInfo[] = [
  { id: 'a10', label: '10A', sub: 'FUSED 10A MAX', colour: '#f59e0b', role: 'High-current input through a low-value shunt. Red probe here ONLY for the A range, meter in series.' },
  { id: 'ma', label: 'mA µA', sub: 'FUSED 400mA', colour: '#f97316', role: 'Small-current input (mA / µA ranges) through a larger shunt and a fast fuse. Red probe here only for mA/µA, in series.' },
  { id: 'com', label: 'COM', sub: 'common', colour: '#0f172a', role: 'Common / negative reference. The BLACK probe lives here for every measurement.' },
  { id: 'vohm', label: 'VΩ', sub: '→| Hz °C ⊣⊢', colour: '#dc2626', role: 'Voltage, resistance, continuity, diode, capacitance, frequency and temperature input (≈10 MΩ). The RED probe lives here except when measuring current.' },
];
export const JACK_BY_ID = Object.fromEntries(JACKS.map((j) => [j.id, j])) as Record<JackId, JackInfo>;
