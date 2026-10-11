// AUTO-GENERATED study content for the Electrical Theory library. Edit the source content, not this file by hand.
import type { TheoryTopic } from '../types';

const topics: TheoryTopic[] = [
 {
  "id": "transformers",
  "title": "Transformers (principles)",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "machines",
  "summary": "Changing AC voltage levels by mutual induction.",
  "explanation": [
   "A transformer has primary and secondary windings on a laminated iron core. Alternating primary current sets up alternating flux, which induces EMF in both windings in proportion to turns. Ideal transformer: V₁/V₂ = N₁/N₂ = I₂/I₁, and power in = power out. Transformers do not work on steady DC.",
   "Step-up transformers raise voltage for transmission (reducing current and I²R loss); step-down transformers supply consumers. The EMF equation links voltage to frequency, turns and peak flux."
  ],
  "formulas": [
   {
    "expr": "V₁/V₂ = N₁/N₂ = I₂/I₁",
    "desc": "ideal ratios"
   },
   {
    "expr": "E = 4.44·f·N·Φ_m",
    "desc": "EMF equation"
   },
   {
    "expr": "Z₁ = (N₁/N₂)²·Z₂",
    "desc": "referred impedance"
   }
  ],
  "example": {
   "problem": "An 11 kV/400 V transformer supplies 500 A on the secondary. Find the turns ratio and primary current (ideal).",
   "steps": [
    "Ratio = 11 000/400 = 27.5 : 1.",
    "I₁ = 500 × 400/11 000 ≈ 18.2 A."
   ],
   "answer": "27.5:1; ≈ 18.2 A"
  },
  "mistakes": [
   "Thinking transformers step up power — they trade voltage against current.",
   "Connecting a transformer to DC: no back-EMF, so it draws huge current and burns."
  ],
  "related": [
   "transformer-efficiency-regulation",
   "three-phase-transformers",
   "mutual-inductance",
   "autotransformer"
  ],
  "keywords": "transformer turns ratio step up step down emf equation"
 },
 {
  "id": "transformer-efficiency-regulation",
  "title": "Transformer losses, efficiency & regulation",
  "levels": [
   "college",
   "university"
  ],
  "subject": "machines",
  "summary": "Copper and iron losses, the equivalent circuit, OC/SC tests and voltage regulation.",
  "explanation": [
   "Iron (core) losses — hysteresis and eddy current — are roughly constant whenever the transformer is energised and are measured by the open-circuit test. Copper losses I²R vary with the square of load and are measured by the short-circuit test at rated current. Maximum efficiency occurs when copper loss equals iron loss.",
   "Voltage regulation is the change in secondary voltage from no load to full load as a percentage of full-load voltage; it depends on winding resistance, leakage reactance and load PF. Distribution transformers typically achieve 97–99 % efficiency."
  ],
  "formulas": [
   {
    "expr": "η = (x·S·PF) / (x·S·PF + P_i + x²·P_cu)",
    "desc": "efficiency at load fraction x"
   },
   {
    "expr": "x_ηmax = √(P_i / P_cu,FL)",
    "desc": "load for maximum efficiency"
   },
   {
    "expr": "Reg = (V_NL − V_FL)/V_FL × 100 %",
    "desc": "regulation"
   }
  ],
  "example": {
   "problem": "A 100 kVA transformer has iron loss 1 kW and full-load copper loss 1.5 kW. Find η at full load, PF 0.8.",
   "steps": [
    "Output = 100 × 0.8 = 80 kW; losses = 1 + 1.5 = 2.5 kW.",
    "η = 80/82.5 ≈ 96.97 %."
   ],
   "answer": "≈ 97.0 %"
  },
  "mistakes": [
   "Scaling iron losses with load (they are nearly constant)."
  ],
  "related": [
   "transformers",
   "machine-losses-efficiency",
   "bh-curve-hysteresis"
  ],
  "keywords": "open circuit test short circuit test copper loss iron loss regulation"
 },
 {
  "id": "three-phase-transformers",
  "title": "Three-phase transformers & vector groups",
  "levels": [
   "college",
   "university"
  ],
  "subject": "machines",
  "summary": "Star/delta windings, vector groups such as Dyn11, and paralleling rules.",
  "explanation": [
   "Three-phase transformers use three limbs (core type) with windings connected star or delta on each side. A distribution transformer is commonly Dyn11: HV delta, LV star with neutral brought out, LV leading HV by 30°. Delta windings trap triplen harmonics and the star LV provides a neutral for 230 V loads.",
   "To parallel transformers: same voltage ratio, same vector group (phase shift), same polarity and phase sequence, and similar per-unit impedance so they share load in proportion to rating."
  ],
  "formulas": [
   {
    "expr": "V_L1/V_L2 = (N₁/N₂)/√3",
    "desc": "Δ–Y line-voltage ratio"
   }
  ],
  "example": {
   "problem": "A Dyn11 transformer has 11 kV line HV and 400 V line LV. What is the per-phase turns ratio?",
   "steps": [
    "HV phase voltage (delta) = 11 000 V.",
    "LV phase voltage (star) = 400/√3 ≈ 230.9 V.",
    "N₁/N₂ = 11 000/230.9 ≈ 47.6."
   ],
   "answer": "≈ 47.6 : 1"
  },
  "mistakes": [
   "Paralleling transformers of different vector groups — causes heavy circulating current."
  ],
  "related": [
   "transformers",
   "star-delta-connections",
   "power-systems"
  ],
  "keywords": "dyn11 vector group paralleling"
 },
 {
  "id": "autotransformer",
  "title": "Autotransformers & variacs",
  "levels": [
   "college",
   "university"
  ],
  "subject": "machines",
  "summary": "A single tapped winding shared by primary and secondary.",
  "explanation": [
   "An autotransformer has one winding with a tapping; part of the power is transferred conductively and part inductively, so it is smaller, cheaper and more efficient than a two-winding transformer for ratios near 1. The disadvantage is no electrical isolation — a broken common winding can put full primary voltage on the output. Uses: motor starting, variacs (variable AC), grid interconnecting transformers."
  ],
  "formulas": [
   {
    "expr": "Copper saved = k × (copper of two-winding unit), k = V₂/V₁",
    "desc": "copper saving"
   },
   {
    "expr": "I_common = I₂ − I₁",
    "desc": "current in shared winding (step-down)"
   }
  ],
  "example": {
   "problem": "A 230 V/200 V autotransformer delivers 10 A to the load. Find the current in the common section.",
   "steps": [
    "I₁ = 10 × 200/230 ≈ 8.7 A.",
    "Common winding current = I₂ − I₁ ≈ 1.3 A."
   ],
   "answer": "≈ 1.3 A"
  },
  "mistakes": [
   "Using an autotransformer where isolation is required for safety."
  ],
  "related": [
   "transformers",
   "motor-starters"
  ],
  "keywords": "variac auto transformer tapped winding"
 },
 {
  "id": "instrument-transformers",
  "title": "Instrument transformers (CT & VT)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "measurement",
  "summary": "Scaling high currents and voltages safely for meters and relays.",
  "explanation": [
   "A current transformer (CT) produces a secondary current (typically 5 A or 1 A) proportional to primary current. Its secondary must never be open-circuited while primary current flows — dangerous voltages appear and the core saturates. Voltage transformers (VTs/PTs) step high voltage down to 110 V for metering and protection.",
   "CTs have accuracy classes for metering (e.g. 0.5) and protection (e.g. 5P10 — 5 % composite error up to 10× rated current)."
  ],
  "formulas": [
   {
    "expr": "I_s = I_p × (N_p/N_s)",
    "desc": "CT ratio"
   }
  ],
  "example": {
   "problem": "A 400/5 A CT gives a secondary of 3.5 A. Find the primary current.",
   "steps": [
    "I_p = 3.5 × 400/5 = 280 A."
   ],
   "answer": "280 A"
  },
  "mistakes": [
   "Opening a live CT secondary — short it first."
  ],
  "related": [
   "protection",
   "instrumentation",
   "transformers"
  ],
  "keywords": "ct vt pt current transformer burden"
 },
 {
  "id": "dc-machines",
  "title": "DC machines (construction & principles)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "machines",
  "summary": "Construction of DC motors/generators and the EMF and torque equations.",
  "explanation": [
   "A DC machine has a stator with field poles (wound or permanent magnet), a rotating armature with windings, and a commutator with brushes that mechanically rectifies the AC induced in the armature. Lap windings (A = P parallel paths) suit high current/low voltage; wave windings (A = 2) suit high voltage.",
   "Generated EMF is proportional to flux and speed; torque is proportional to flux and armature current. Armature reaction distorts the main flux; interpoles and compensating windings reduce sparking."
  ],
  "formulas": [
   {
    "expr": "E = (PΦZN)/(60A)",
    "desc": "generated EMF (N in r/min)"
   },
   {
    "expr": "T = (PΦZ·I_a)/(2πA)",
    "desc": "torque"
   }
  ],
  "example": {
   "problem": "A 4-pole lap-wound machine (A = 4) has 600 conductors, flux 20 mWb/pole and runs at 1 000 r/min. Find E.",
   "steps": [
    "E = 4 × 0.02 × 600 × 1 000/(60 × 4).",
    "= 48 000/240 = 200 V."
   ],
   "answer": "200 V"
  },
  "mistakes": [
   "Using A = 2 for a lap winding."
  ],
  "related": [
   "dc-generators",
   "dc-motors",
   "electromagnetic-induction"
  ],
  "keywords": "commutator armature brushes lap wave winding"
 },
 {
  "id": "dc-generators",
  "title": "DC generators",
  "levels": [
   "college",
   "university"
  ],
  "subject": "machines",
  "summary": "Separately-excited, shunt, series and compound generators.",
  "explanation": [
   "Terminal voltage V = E − I_aR_a − brush drop. Shunt generators build up from residual magnetism and need resistance below critical field resistance; voltage falls with load. Series generators' voltage rises with load. Compound generators combine both to give flat (level) or rising characteristics."
  ],
  "formulas": [
   {
    "expr": "V = E − I_a·R_a",
    "desc": "terminal voltage"
   },
   {
    "expr": "I_a = I_L + I_sh (shunt)",
    "desc": "armature current"
   }
  ],
  "example": {
   "problem": "A shunt generator delivers 50 A at 220 V. R_a = 0.2 Ω, R_sh = 110 Ω. Find the generated EMF.",
   "steps": [
    "I_sh = 220/110 = 2 A; I_a = 52 A.",
    "E = 220 + 52 × 0.2 = 230.4 V."
   ],
   "answer": "230.4 V"
  },
  "mistakes": [
   "Forgetting the field current in a shunt machine's armature current."
  ],
  "related": [
   "dc-machines",
   "dc-motors",
   "ac-generators"
  ],
  "keywords": "shunt generator series compound residual magnetism"
 },
 {
  "id": "dc-motors",
  "title": "DC motors",
  "levels": [
   "college",
   "university"
  ],
  "subject": "machines",
  "summary": "Back-EMF, speed and torque of shunt, series and compound motors.",
  "explanation": [
   "In a motor the armature generates a back-EMF E_b = V − I_aR_a opposing the supply. Speed N ∝ E_b/Φ. Shunt motors run at nearly constant speed. Series motors have very high starting torque (T ∝ I² below saturation) but race dangerously at no load — never run unloaded or belt-driven. Speed is controlled by armature voltage (below base speed) or field weakening (above).",
   "At start E_b = 0, so a starter resistance limits inrush."
  ],
  "formulas": [
   {
    "expr": "E_b = V − I_a·R_a",
    "desc": "back-EMF"
   },
   {
    "expr": "N₂/N₁ = (E_b2/E_b1)(Φ₁/Φ₂)",
    "desc": "speed ratio"
   },
   {
    "expr": "P_mech = E_b·I_a",
    "desc": "gross mechanical power"
   }
  ],
  "example": {
   "problem": "A 230 V shunt motor has R_a = 0.5 Ω and draws I_a = 20 A at 1 000 r/min. Find the speed at I_a = 40 A (same flux).",
   "steps": [
    "E_b1 = 230 − 10 = 220 V; E_b2 = 230 − 20 = 210 V.",
    "N₂ = 1 000 × 210/220 ≈ 955 r/min."
   ],
   "answer": "≈ 955 r/min"
  },
  "mistakes": [
   "Running a series motor without load.",
   "Forgetting that starting current is V/R_a (very large)."
  ],
  "related": [
   "dc-machines",
   "dc-generators",
   "motor-starters",
   "force-on-conductor"
  ],
  "keywords": "back emf shunt motor series motor speed control"
 },
 {
  "id": "induction-motors",
  "title": "Three-phase induction motors",
  "levels": [
   "college",
   "university"
  ],
  "subject": "machines",
  "summary": "The industrial workhorse: rotating field, slip and torque.",
  "explanation": [
   "Three-phase stator currents create a magnetic field rotating at synchronous speed n_s = 120f/p. The rotor (squirrel-cage or wound) is dragged along slightly slower; the difference (slip) induces rotor currents that produce torque. Typical full-load slip is 2–6 %. Starting current is 6–8× full-load current.",
   "Reversing any two supply lines reverses rotation. Efficiency classes IE1–IE4 (IEC 60034-30-1). Variable-speed drives change frequency to control speed."
  ],
  "formulas": [
   {
    "expr": "n_s = 120f / p",
    "desc": "synchronous speed (r/min), p = poles"
   },
   {
    "expr": "s = (n_s − n_r)/n_s",
    "desc": "slip"
   },
   {
    "expr": "f_r = s·f",
    "desc": "rotor frequency"
   }
  ],
  "example": {
   "problem": "A 4-pole, 50 Hz motor runs at 1 440 r/min. Find slip and rotor frequency.",
   "steps": [
    "n_s = 120 × 50/4 = 1 500 r/min.",
    "s = 60/1 500 = 0.04 = 4 %.",
    "f_r = 0.04 × 50 = 2 Hz."
   ],
   "answer": "4 %; 2 Hz"
  },
  "mistakes": [
   "Using pole pairs in 120f/p (that formula uses total poles).",
   "Expecting the rotor to reach synchronous speed — then no torque would be produced."
  ],
  "related": [
   "three-phase",
   "motor-starters",
   "single-phase-motors",
   "synchronous-machines"
  ],
  "keywords": "induction motor slip squirrel cage synchronous speed"
 },
 {
  "id": "synchronous-machines",
  "title": "Alternators & synchronous machines",
  "levels": [
   "college",
   "university"
  ],
  "subject": "machines",
  "summary": "AC generators and synchronous motors running at exactly n_s.",
  "explanation": [
   "A synchronous machine has a DC-excited rotor (salient-pole for slow hydro, cylindrical for high-speed steam turbines) and a three-phase stator. As a generator (alternator) it produces f = pn/120. Its EMF equation is E = 4.44 f N Φ k_w. Excitation controls reactive power and terminal voltage; prime-mover torque controls real power.",
   "Synchronous motors run at exactly synchronous speed and, over-excited, act like capacitors to correct power factor (synchronous condensers). To parallel an alternator with the grid: equal voltage, frequency, phase sequence and phase angle (synchronising)."
  ],
  "formulas": [
   {
    "expr": "f = p·n / 120",
    "desc": "frequency from poles and speed"
   },
   {
    "expr": "E = 4.44·f·N·Φ·k_w",
    "desc": "alternator EMF per phase"
   },
   {
    "expr": "E = V + jX_s·I",
    "desc": "per-phase phasor model"
   }
  ],
  "example": {
   "problem": "A 2-pole turbo-alternator supplies 50 Hz. At what speed must it turn?",
   "steps": [
    "n = 120f/p = 120 × 50/2 = 3 000 r/min."
   ],
   "answer": "3 000 r/min"
  },
  "mistakes": [
   "Closing the synchroniser breaker when out of phase — massive torque transients."
  ],
  "related": [
   "ac-generators",
   "induction-motors",
   "power-generation",
   "three-phase"
  ],
  "keywords": "alternator synchronous generator excitation synchronising salient pole"
 },
 {
  "id": "ac-generators",
  "title": "Generators (AC) & generating principles",
  "levels": [
   "school",
   "college"
  ],
  "subject": "machines",
  "summary": "How rotating a coil in a magnetic field produces AC, and practical generators.",
  "explanation": [
   "A coil rotating in a magnetic field cuts flux and generates an EMF that varies sinusoidally; slip rings take AC out, a commutator would give DC. EMF increases with flux, turns and speed. Practical alternators rotate the field and keep the heavy armature windings stationary.",
   "Standby generators for load-shedding must be connected through a changeover switch so they can never back-feed the utility network — a lethal hazard to line workers."
  ],
  "formulas": [
   {
    "expr": "e = N·B·A·ω·sin ωt",
    "desc": "rotating coil EMF"
   },
   {
    "expr": "E_max = N·B·A·ω",
    "desc": "peak EMF"
   }
  ],
  "example": {
   "problem": "A 100-turn coil of area 0.02 m² rotates at 50 rev/s in 0.1 T. Find the peak EMF.",
   "steps": [
    "ω = 2π × 50 ≈ 314.2 rad/s.",
    "E_max = 100 × 0.1 × 0.02 × 314.2 ≈ 62.8 V."
   ],
   "answer": "≈ 62.8 V"
  },
  "mistakes": [
   "Connecting a standby generator to a house without a proper changeover switch."
  ],
  "related": [
   "synchronous-machines",
   "electromagnetic-induction",
   "alternating-current",
   "dc-generators"
  ],
  "keywords": "generator slip rings changeover backfeed"
 },
 {
  "id": "single-phase-motors",
  "title": "Single-phase motors",
  "levels": [
   "college",
   "university"
  ],
  "subject": "machines",
  "summary": "Split-phase, capacitor-start, capacitor-run, shaded-pole and universal motors.",
  "explanation": [
   "A single-phase winding produces a pulsating, not rotating, field — no starting torque. Starting methods create a second phase-shifted field: split-phase (auxiliary winding with higher R), capacitor-start (high torque, centrifugal switch), permanent split capacitor (fans, pumps), capacitor-start-capacitor-run, and shaded-pole (small fans, low efficiency).",
   "Universal (series) motors run on AC or DC at high speed — drills, vacuum cleaners, blenders — and use brushes that wear."
  ],
  "formulas": [
   {
    "expr": "n_s = 120f/p",
    "desc": "synchronous speed (same as three-phase)"
   }
  ],
  "example": {
   "problem": "A capacitor-start motor hums but won't start; spinning it by hand makes it run. Likely fault?",
   "steps": [
    "No starting torque means the auxiliary circuit is not working.",
    "Suspect a failed start capacitor or centrifugal switch stuck open."
   ],
   "answer": "Faulty start capacitor or centrifugal switch"
  },
  "mistakes": [
   "Replacing a run capacitor with a start (electrolytic) type — it will fail quickly."
  ],
  "related": [
   "induction-motors",
   "capacitors",
   "motor-starters"
  ],
  "keywords": "capacitor start split phase shaded pole universal motor"
 },
 {
  "id": "motor-starters",
  "title": "Motor starting & control (DOL, star-delta, soft starter, VSD)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "machines",
  "summary": "Limiting starting current and controlling motors safely.",
  "explanation": [
   "Direct-on-line (DOL) starters apply full voltage — simple, but 6–8× FLC inrush. Star-delta reduces starting current and torque to one third. Autotransformer and soft starters (thyristors) reduce voltage gradually. Variable speed drives (VSDs/VFDs) vary frequency and voltage (constant V/f) for smooth start and speed control, with big savings on pumps and fans (power ∝ speed³).",
   "A basic control circuit has a stop (NC) button in series, a start (NO) button with a holding (latching) contact in parallel, contactor coil and overload relay contacts. Overloads protect against sustained overcurrent; no-volt release prevents automatic restart after a power failure."
  ],
  "formulas": [
   {
    "expr": "I_start(Y) = I_start(Δ)/3",
    "desc": "star-delta starting"
   },
   {
    "expr": "P ∝ n³",
    "desc": "fan/pump affinity law"
   }
  ],
  "example": {
   "problem": "A fan's speed is reduced to 80 % by a VSD. Estimate the new power as a fraction of full-speed power.",
   "steps": [
    "P₂/P₁ = (0.8)³ = 0.512."
   ],
   "answer": "≈ 51 % — nearly half the power"
  },
  "mistakes": [
   "Wiring the stop button NO, or omitting the holding contact."
  ],
  "related": [
   "induction-motors",
   "star-delta-connections",
   "power-electronics",
   "plc"
  ],
  "keywords": "dol star delta soft starter vsd vfd contactor overload latching"
 },
 {
  "id": "stepper-servo-motors",
  "title": "Stepper, servo & BLDC motors",
  "levels": [
   "college",
   "university"
  ],
  "subject": "machines",
  "summary": "Precise-position and electronically-commutated motors.",
  "explanation": [
   "Stepper motors move in fixed angular steps (commonly 1.8° = 200 steps/rev) when windings are energised in sequence; microstepping divides steps further. They give open-loop positioning but can lose steps if overloaded. Servo motors use feedback (encoder/resolver) and a controller for closed-loop position or speed control.",
   "Brushless DC (BLDC) motors have permanent-magnet rotors and electronically commutated stator windings using Hall sensors or back-EMF sensing; they are efficient and used in drones, fans, EVs and hard drives."
  ],
  "formulas": [
   {
    "expr": "Steps/rev = 360° / step angle",
    "desc": "stepper resolution"
   }
  ],
  "example": {
   "problem": "A 1.8° stepper drives a lead screw with 2 mm pitch. How far does the nut move per full step?",
   "steps": [
    "Steps/rev = 360/1.8 = 200.",
    "Distance = 2 mm/200 = 0.01 mm."
   ],
   "answer": "10 µm per step"
  },
  "mistakes": [
   "Running steppers too fast without acceleration ramps, causing missed steps."
  ],
  "related": [
   "control-systems",
   "microcontrollers",
   "power-electronics",
   "dc-motors"
  ],
  "keywords": "stepper servo bldc brushless encoder microstepping"
 },
 {
  "id": "machine-losses-efficiency",
  "title": "Losses & efficiency of electrical machines",
  "levels": [
   "college",
   "university"
  ],
  "subject": "machines",
  "summary": "Where energy goes in motors, generators and transformers.",
  "explanation": [
   "Losses: copper (I²R in windings, load-dependent), iron/core (hysteresis + eddy, roughly constant), mechanical (friction and windage) and stray load losses. Efficiency = output/(output + losses). Heat from losses sets the machine rating via insulation class (e.g. Class F, 155 °C)."
  ],
  "formulas": [
   {
    "expr": "η = P_out/(P_out + losses)",
    "desc": "efficiency"
   },
   {
    "expr": "Losses = P_cu + P_fe + P_mech + P_stray",
    "desc": "loss breakdown"
   }
  ],
  "example": {
   "problem": "A motor outputs 7.5 kW with total losses 0.8 kW. Find efficiency and input.",
   "steps": [
    "Input = 8.3 kW.",
    "η = 7.5/8.3 ≈ 90.4 %."
   ],
   "answer": "8.3 kW; ≈ 90.4 %"
  },
  "mistakes": [
   "Rating motors by input power — nameplate kW is shaft output."
  ],
  "related": [
   "transformer-efficiency-regulation",
   "bh-curve-hysteresis",
   "induction-motors"
  ],
  "keywords": "efficiency copper loss iron loss windage insulation class"
 }
];

export default topics;
