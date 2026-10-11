// AUTO-GENERATED study content for the Electrical Theory library. Edit the source content, not this file by hand.
import type { TheoryTopic } from '../types';

const topics: TheoryTopic[] = [
 {
  "id": "alternating-current",
  "title": "Alternating current (sinusoids, RMS, peak)",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "Describing sinusoidal AC: amplitude, frequency, period, phase, RMS and average values.",
  "explanation": [
   "An AC voltage v = V_m sin(ωt + φ) has peak V_m, angular frequency ω = 2πf, period T = 1/f and phase φ. South Africa's mains is 230 V RMS at 50 Hz, so the peak is about 325 V. RMS (root-mean-square) is the DC value that produces the same heating — meters and ratings use RMS.",
   "For a pure sine: V_rms = V_m/√2 ≈ 0.707V_m, half-cycle average = 0.637V_m, form factor = 1.11, crest (peak) factor = 1.414. Non-sinusoidal waveforms (from SMPS, VSDs) have different factors, so \"average-responding\" meters read them wrongly — use true-RMS meters."
  ],
  "formulas": [
   {
    "expr": "v = V_m·sin(2πft + φ)",
    "desc": "instantaneous value"
   },
   {
    "expr": "V_rms = V_m / √2",
    "desc": "sine RMS"
   },
   {
    "expr": "V_avg = 2V_m/π",
    "desc": "half-cycle average"
   },
   {
    "expr": "T = 1/f",
    "desc": "period"
   }
  ],
  "example": {
   "problem": "Find the peak and peak-to-peak voltage of 230 V RMS mains, and its period.",
   "steps": [
    "V_m = 230 × √2 ≈ 325.3 V; V_pp ≈ 650.5 V.",
    "T = 1/50 = 20 ms."
   ],
   "answer": "≈ 325 V peak; ≈ 650 V p-p; 20 ms"
  },
  "mistakes": [
   "Using peak instead of RMS in power calculations.",
   "Assuming a cheap meter reads RMS correctly on distorted waveforms."
  ],
  "related": [
   "phasors",
   "ac-power",
   "ac-generators",
   "three-phase"
  ],
  "keywords": "ac rms peak frequency period sine wave mains 50 hz"
 },
 {
  "id": "phasors",
  "title": "Phasors & phasor diagrams",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "Representing sinusoids of the same frequency as rotating vectors.",
  "explanation": [
   "A phasor is a vector whose length is the RMS (or peak) value and whose angle is the phase. Sinusoids at the same frequency can be added as phasors instead of as time functions. Leading means the phasor is ahead (anticlockwise); in an inductor current lags voltage by 90°, in a capacitor current leads by 90° (memory aid: \"CIVIL\").",
   "Phasor addition uses components: resolve into horizontal and vertical parts, add, then convert back with Pythagoras and arctan."
  ],
  "formulas": [
   {
    "expr": "V∠θ = V cos θ + jV sin θ",
    "desc": "polar to rectangular"
   },
   {
    "expr": "|V| = √(x² + y²), θ = tan⁻¹(y/x)",
    "desc": "rectangular to polar"
   }
  ],
  "example": {
   "problem": "Add v₁ = 10∠0° and v₂ = 10∠90° (RMS).",
   "steps": [
    "Sum = 10 + j10.",
    "|V| = √200 ≈ 14.14 V at 45°."
   ],
   "answer": "14.14∠45° V"
  },
  "mistakes": [
   "Adding magnitudes of out-of-phase quantities arithmetically.",
   "Mixing RMS and peak phasors in one diagram."
  ],
  "related": [
   "complex-numbers-ac",
   "reactance",
   "impedance-admittance"
  ],
  "keywords": "phasor diagram lead lag civil"
 },
 {
  "id": "complex-numbers-ac",
  "title": "Complex numbers (j-notation) in AC",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "Rectangular and polar forms make AC circuit maths algebraic.",
  "explanation": [
   "Engineers use j = √−1 (i is reserved for current). Impedances are complex: Z = R + jX. Add/subtract in rectangular form; multiply/divide in polar form (multiply magnitudes, add angles; divide magnitudes, subtract angles). Ohm's law and all DC methods then work with phasors: V = IZ.",
   "The complex conjugate Z* = R − jX is used in complex power S = VI* and in maximum power transfer."
  ],
  "formulas": [
   {
    "expr": "Z = R + jX = |Z|∠θ",
    "desc": "impedance forms"
   },
   {
    "expr": "(A∠α)(B∠β) = AB∠(α + β)",
    "desc": "multiplication"
   },
   {
    "expr": "(A∠α)/(B∠β) = (A/B)∠(α − β)",
    "desc": "division"
   }
  ],
  "example": {
   "problem": "Find I when V = 230∠0° V across Z = 30 + j40 Ω.",
   "steps": [
    "Z = 50∠53.13° Ω.",
    "I = 230/50 ∠(0 − 53.13°) = 4.6∠−53.13° A."
   ],
   "answer": "4.6 A lagging by 53.1°"
  },
  "mistakes": [
   "Forgetting the quadrant when computing angles with arctan."
  ],
  "related": [
   "phasors",
   "impedance-admittance",
   "ac-power"
  ],
  "keywords": "j operator rectangular polar complex conjugate"
 },
 {
  "id": "reactance",
  "title": "Reactance (X_L and X_C)",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "Frequency-dependent opposition of inductors and capacitors.",
  "explanation": [
   "Inductive reactance X_L = 2πfL rises with frequency; capacitive reactance X_C = 1/(2πfC) falls with frequency. Both are measured in ohms but store rather than dissipate energy. At DC an inductor is a short circuit (X_L = 0) and a capacitor an open circuit (X_C = ∞).",
   "This frequency dependence is the basis of filters, tuning circuits and power-factor correction."
  ],
  "formulas": [
   {
    "expr": "X_L = 2πfL",
    "desc": "inductive reactance"
   },
   {
    "expr": "X_C = 1 / (2πfC)",
    "desc": "capacitive reactance"
   }
  ],
  "example": {
   "problem": "Find X_L of 100 mH and X_C of 10 µF at 50 Hz.",
   "steps": [
    "X_L = 2π × 50 × 0.1 ≈ 31.4 Ω.",
    "X_C = 1/(2π × 50 × 10×10⁻⁶) ≈ 318.3 Ω."
   ],
   "answer": "31.4 Ω; 318 Ω"
  },
  "mistakes": [
   "Forgetting the 2π (using f instead of ω).",
   "Thinking reactance dissipates power."
  ],
  "related": [
   "inductors",
   "capacitors",
   "impedance-admittance",
   "resonance",
   "filters"
  ],
  "keywords": "xl xc inductive capacitive reactance"
 },
 {
  "id": "rl-series-ac",
  "title": "R–L series AC circuits",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "Voltage and current relationships when resistance and inductance are in series.",
  "explanation": [
   "The resistor voltage is in phase with current; the inductor voltage leads current by 90°. The supply voltage is their phasor sum, so current lags supply voltage by φ = tan⁻¹(X_L/R). The impedance triangle has R horizontal, X_L vertical and Z as the hypotenuse. Motors and coils are typical R–L loads."
  ],
  "formulas": [
   {
    "expr": "Z = √(R² + X_L²)",
    "desc": "impedance"
   },
   {
    "expr": "φ = tan⁻¹(X_L / R)",
    "desc": "phase angle (lagging)"
   },
   {
    "expr": "V = √(V_R² + V_L²)",
    "desc": "voltage triangle"
   }
  ],
  "example": {
   "problem": "A coil with R = 30 Ω and L = 127.3 mH is on 230 V, 50 Hz. Find Z, I and φ.",
   "steps": [
    "X_L = 2π × 50 × 0.1273 ≈ 40 Ω.",
    "Z = √(30² + 40²) = 50 Ω; I = 230/50 = 4.6 A.",
    "φ = tan⁻¹(40/30) = 53.1° lagging."
   ],
   "answer": "50 Ω; 4.6 A; 53.1° lagging"
  },
  "mistakes": [
   "Adding V_R and V_L arithmetically."
  ],
  "related": [
   "reactance",
   "rc-series-ac",
   "rlc-series",
   "power-factor"
  ],
  "keywords": "rl circuit impedance triangle lagging"
 },
 {
  "id": "rc-series-ac",
  "title": "R–C series AC circuits",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "Current leads voltage when resistance and capacitance are in series.",
  "explanation": [
   "Capacitor voltage lags current by 90°, so in an R–C series circuit the current leads the supply voltage by φ = tan⁻¹(X_C/R). R–C networks are used as phase shifters, coupling networks and simple low/high-pass filters."
  ],
  "formulas": [
   {
    "expr": "Z = √(R² + X_C²)",
    "desc": "impedance"
   },
   {
    "expr": "φ = tan⁻¹(X_C / R)",
    "desc": "phase angle (leading)"
   }
  ],
  "example": {
   "problem": "R = 100 Ω in series with C = 31.83 µF at 50 Hz on 10 V. Find I and φ.",
   "steps": [
    "X_C = 1/(2π × 50 × 31.83×10⁻⁶) ≈ 100 Ω.",
    "Z = √(100² + 100²) ≈ 141.4 Ω; I = 10/141.4 ≈ 70.7 mA.",
    "φ = 45° leading."
   ],
   "answer": "≈ 70.7 mA, 45° leading"
  },
  "mistakes": [
   "Saying current lags in a capacitive circuit."
  ],
  "related": [
   "reactance",
   "rl-series-ac",
   "filters"
  ],
  "keywords": "rc circuit leading phase shift"
 },
 {
  "id": "rlc-series",
  "title": "R–L–C series circuits",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "Combining all three: net reactance X_L − X_C decides whether the circuit is inductive or capacitive.",
  "explanation": [
   "In a series RLC circuit the inductor and capacitor voltages are 180° apart and partly cancel. Net reactance X = X_L − X_C. If X > 0 the circuit is inductive (current lags); if X < 0 it is capacitive (current leads); if X = 0 it is at resonance and Z = R. Individual V_L and V_C can exceed the supply voltage."
  ],
  "formulas": [
   {
    "expr": "Z = √(R² + (X_L − X_C)²)",
    "desc": "impedance"
   },
   {
    "expr": "φ = tan⁻¹((X_L − X_C)/R)",
    "desc": "phase"
   }
  ],
  "example": {
   "problem": "R = 40 Ω, X_L = 80 Ω, X_C = 50 Ω on 100 V. Find I and V_L.",
   "steps": [
    "Z = √(40² + 30²) = 50 Ω; I = 100/50 = 2 A.",
    "V_L = 2 × 80 = 160 V (greater than supply!)."
   ],
   "answer": "2 A; 160 V"
  },
  "mistakes": [
   "Being alarmed that V_L > V_S — normal in RLC circuits."
  ],
  "related": [
   "rl-series-ac",
   "rc-series-ac",
   "resonance",
   "impedance-admittance"
  ],
  "keywords": "rlc series net reactance"
 },
 {
  "id": "parallel-ac-circuits",
  "title": "Parallel AC circuits",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "Branch currents add as phasors; use admittance for easy maths.",
  "explanation": [
   "In parallel AC circuits voltage is common; each branch current is found from V/Z_branch and the supply current is the phasor sum. With a resistor and pure inductor/capacitor in parallel: I = √(I_R² + (I_C − I_L)²). Admittance Y = 1/Z = G + jB simplifies parallel work because admittances add."
  ],
  "formulas": [
   {
    "expr": "I_T = Σ I_branch (phasor)",
    "desc": "KCL"
   },
   {
    "expr": "Y = G + jB, Y_T = ΣY",
    "desc": "admittance"
   },
   {
    "expr": "I = √(I_R² + (I_C − I_L)²)",
    "desc": "R, L, C in parallel"
   }
  ],
  "example": {
   "problem": "230 V across R = 46 Ω, X_L = 23 Ω and X_C = 46 Ω in parallel. Find the supply current.",
   "steps": [
    "I_R = 5 A, I_L = 10 A, I_C = 5 A.",
    "I = √(5² + (5 − 10)²) = √50 ≈ 7.07 A (lagging 45°)."
   ],
   "answer": "≈ 7.07 A lagging"
  },
  "mistakes": [
   "Adding branch currents arithmetically."
  ],
  "related": [
   "impedance-admittance",
   "rlc-series",
   "power-factor-correction"
  ],
  "keywords": "parallel ac admittance susceptance"
 },
 {
  "id": "impedance-admittance",
  "title": "Impedance & admittance",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "Generalised AC opposition Z = R + jX and its reciprocal Y = G + jB.",
  "explanation": [
   "Impedance combines resistance and reactance. Series impedances add; parallel admittances add. Conductance G and susceptance B are measured in siemens. Note that G = R/(R² + X²), not 1/R, unless X = 0."
  ],
  "formulas": [
   {
    "expr": "Z = R + jX",
    "desc": "impedance"
   },
   {
    "expr": "Y = 1/Z = G + jB",
    "desc": "admittance"
   },
   {
    "expr": "G = R/(R² + X²), B = −X/(R² + X²)",
    "desc": "conversions"
   }
  ],
  "example": {
   "problem": "Convert Z = 3 + j4 Ω to admittance.",
   "steps": [
    "|Z|² = 25.",
    "Y = (3 − j4)/25 = 0.12 − j0.16 S."
   ],
   "answer": "0.12 − j0.16 S"
  },
  "mistakes": [
   "Taking G = 1/R for a complex impedance."
  ],
  "related": [
   "complex-numbers-ac",
   "parallel-ac-circuits",
   "rlc-series"
  ],
  "keywords": "impedance admittance conductance susceptance"
 },
 {
  "id": "resonance",
  "title": "Resonance (series & parallel)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "X_L = X_C at f₀ = 1/(2π√(LC)).",
  "explanation": [
   "At resonance inductive and capacitive reactances are equal and cancel. Series resonance: impedance is minimum (= R), current maximum, unity power factor; V_L and V_C can be Q times the supply (voltage magnification). Parallel (tank) resonance: impedance is maximum (dynamic impedance L/(CR)) and supply current minimum, while large current circulates between L and C (current magnification).",
   "Resonance tunes radios, forms oscillators and filters, and causes dangerous over-voltages if a power system accidentally resonates."
  ],
  "formulas": [
   {
    "expr": "f₀ = 1 / (2π√(LC))",
    "desc": "resonant frequency"
   },
   {
    "expr": "Z_D = L / (CR)",
    "desc": "parallel dynamic impedance"
   }
  ],
  "example": {
   "problem": "Find f₀ for L = 10 mH and C = 1 µF.",
   "steps": [
    "√(LC) = √(10⁻² × 10⁻⁶) = 10⁻⁴.",
    "f₀ = 1/(2π × 10⁻⁴) ≈ 1 592 Hz."
   ],
   "answer": "≈ 1.59 kHz"
  },
  "mistakes": [
   "Expecting minimum current at series resonance (it is maximum)."
  ],
  "related": [
   "q-factor-bandwidth",
   "rlc-series",
   "filters",
   "oscillators"
  ],
  "keywords": "resonant frequency tank circuit"
 },
 {
  "id": "q-factor-bandwidth",
  "title": "Q-factor & bandwidth",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "How sharp a resonance is.",
  "explanation": [
   "Quality factor Q measures selectivity: for series RLC Q = X_L/R = (1/R)√(L/C) at resonance. Bandwidth BW = f₀/Q is the range between the half-power (−3 dB) frequencies f₁ and f₂, where current falls to 0.707 of maximum. High Q = narrow, selective response; also higher voltage magnification."
  ],
  "formulas": [
   {
    "expr": "Q = ω₀L / R = (1/R)√(L/C)",
    "desc": "series Q"
   },
   {
    "expr": "BW = f₂ − f₁ = f₀ / Q",
    "desc": "bandwidth"
   }
  ],
  "example": {
   "problem": "Series circuit with R = 10 Ω, L = 10 mH, C = 1 µF. Find Q and bandwidth.",
   "steps": [
    "Q = (1/10)√(0.01/10⁻⁶) = (1/10) × 100 = 10.",
    "f₀ ≈ 1 592 Hz; BW = 1 592/10 ≈ 159 Hz."
   ],
   "answer": "Q = 10; BW ≈ 159 Hz"
  },
  "mistakes": [
   "Confusing half-power points with half-current points."
  ],
  "related": [
   "resonance",
   "filters"
  ],
  "keywords": "quality factor selectivity half power 3db"
 },
 {
  "id": "ac-power",
  "title": "AC power: real, reactive & apparent",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "P (W), Q (var) and S (VA) and the power triangle.",
  "explanation": [
   "In AC circuits voltage and current may be out of phase. Real (active) power P = VI cos φ does useful work; reactive power Q = VI sin φ shuttles energy back and forth in L and C; apparent power S = VI is what the cables and transformers must carry. They form the power triangle: S² = P² + Q². Complex power S = VI* = P + jQ.",
   "Inductive loads absorb reactive power (positive Q); capacitors supply it. Utilities size equipment in kVA because current depends on S, not P."
  ],
  "formulas": [
   {
    "expr": "P = V·I·cos φ",
    "desc": "real power (W)"
   },
   {
    "expr": "Q = V·I·sin φ",
    "desc": "reactive power (var)"
   },
   {
    "expr": "S = V·I = √(P² + Q²)",
    "desc": "apparent power (VA)"
   }
  ],
  "example": {
   "problem": "A motor draws 10 A at 230 V with power factor 0.8 lagging. Find S, P and Q.",
   "steps": [
    "S = 230 × 10 = 2 300 VA.",
    "P = 2 300 × 0.8 = 1 840 W.",
    "Q = 2 300 × 0.6 = 1 380 var."
   ],
   "answer": "2.3 kVA; 1.84 kW; 1.38 kvar"
  },
  "mistakes": [
   "Calculating P = VI for a reactive load."
  ],
  "related": [
   "power-factor",
   "power-factor-correction",
   "three-phase-power"
  ],
  "keywords": "real reactive apparent power triangle kva kvar"
 },
 {
  "id": "power-factor",
  "title": "Power factor",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "The ratio P/S — how effectively current is turned into real power.",
  "explanation": [
   "Power factor = P/S = cos φ for sinusoidal waveforms. Inductive loads (motors, transformers, fluorescent ballasts) have lagging PF; capacitive loads leading. Low PF means more current for the same real power, causing bigger cables, more I²R loss, voltage drop and — for industrial customers — reactive-energy or kVA demand charges.",
   "Non-linear loads (rectifiers, SMPS) also reduce PF through harmonic distortion: true PF = displacement PF × distortion factor."
  ],
  "formulas": [
   {
    "expr": "PF = P / S = cos φ",
    "desc": "power factor"
   },
   {
    "expr": "I = P / (V·PF)",
    "desc": "current for a given power"
   }
  ],
  "example": {
   "problem": "A 23 kW single-phase load at 230 V. Compare current at PF 1.0 and 0.5.",
   "steps": [
    "PF 1.0: I = 23 000/230 = 100 A.",
    "PF 0.5: I = 23 000/(230 × 0.5) = 200 A — double the current for the same power."
   ],
   "answer": "100 A vs 200 A"
  },
  "mistakes": [
   "Saying PF is \"lagging\" for a capacitive load."
  ],
  "related": [
   "ac-power",
   "power-factor-correction",
   "induction-motors"
  ],
  "keywords": "pf cos phi lagging leading displacement"
 },
 {
  "id": "power-factor-correction",
  "title": "Power factor correction",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "Adding capacitors to supply reactive power locally.",
  "explanation": [
   "Connecting capacitors in parallel with inductive loads supplies the reactive power the load needs, so less flows from the supply; current falls while real power is unchanged. Required capacitor kvar: Q_c = P(tan φ₁ − tan φ₂). Over-correction makes the PF leading and can cause over-voltage; harmonic-rich sites need detuned (reactor-protected) capacitor banks."
  ],
  "formulas": [
   {
    "expr": "Q_c = P(tan φ₁ − tan φ₂)",
    "desc": "capacitor kvar"
   },
   {
    "expr": "C = Q_c / (2πf·V²)",
    "desc": "capacitance for single phase"
   }
  ],
  "example": {
   "problem": "A 10 kW, 230 V, 50 Hz load has PF 0.7 lagging. Find the capacitance to correct it to 0.95.",
   "steps": [
    "tan φ₁ = tan(cos⁻¹0.7) = 1.0202; tan φ₂ = tan(cos⁻¹0.95) = 0.3287.",
    "Q_c = 10 000 × (1.0202 − 0.3287) ≈ 6 915 var.",
    "C = 6 915/(2π × 50 × 230²) ≈ 416 µF."
   ],
   "answer": "≈ 6.9 kvar, ≈ 416 µF"
  },
  "mistakes": [
   "Placing correction capacitors in series with the load.",
   "Correcting to unity or leading, risking resonance and over-voltage."
  ],
  "related": [
   "power-factor",
   "ac-power",
   "parallel-ac-circuits"
  ],
  "keywords": "pfc capacitor bank kvar"
 },
 {
  "id": "three-phase",
  "title": "Three-phase systems",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "Three voltages 120° apart: efficient generation, transmission and motors.",
  "explanation": [
   "A three-phase generator has three windings spaced 120°, producing voltages of equal magnitude 120° apart in sequence (e.g. L1–L2–L3, colour-coded red, white/yellow, blue in SA tradition — check the current SANS colour code for new work). Advantages over single phase: constant total power, ~25 % less conductor material for the same power, and a rotating magnetic field for simple, self-starting induction motors.",
   "In South Africa LV distribution is 400 V line-to-line / 230 V line-to-neutral, 50 Hz."
  ],
  "formulas": [
   {
    "expr": "v₁ = V_m sin ωt, v₂ = V_m sin(ωt − 120°), v₃ = V_m sin(ωt − 240°)",
    "desc": "phase voltages"
   },
   {
    "expr": "V_L = √3·V_ph (star)",
    "desc": "line vs phase voltage"
   }
  ],
  "example": {
   "problem": "What is the line voltage when the phase voltage of a star system is 230 V?",
   "steps": [
    "V_L = √3 × 230 ≈ 398 V ≈ 400 V nominal."
   ],
   "answer": "≈ 400 V"
  },
  "mistakes": [
   "Thinking √3 appears because phases are 90° apart — it is because they are 120° apart (2 × cos 30° = √3)."
  ],
  "related": [
   "star-delta-connections",
   "three-phase-power",
   "induction-motors",
   "ac-generators"
  ],
  "keywords": "three phase 3 phase 400v rotating field phase sequence"
 },
 {
  "id": "star-delta-connections",
  "title": "Star (Y) and delta (Δ) connections",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "Line/phase relationships in star and delta connected sources and loads.",
  "explanation": [
   "Star (wye): one end of each phase joined at a neutral point; I_L = I_ph and V_L = √3 V_ph. A neutral conductor allows single-phase loads. Delta (mesh): phases in a closed loop; V_L = V_ph and I_L = √3 I_ph. Total power is the same formula in both.",
   "Motors are often started in star and run in delta, cutting starting current and torque to one third."
  ],
  "formulas": [
   {
    "expr": "Star: V_L = √3·V_ph, I_L = I_ph",
    "desc": "star"
   },
   {
    "expr": "Delta: V_L = V_ph, I_L = √3·I_ph",
    "desc": "delta"
   }
  ],
  "example": {
   "problem": "Three 20 Ω resistors on a 400 V supply. Find line current in star and in delta.",
   "steps": [
    "Star: V_ph = 400/√3 ≈ 230.9 V; I_L = I_ph = 230.9/20 ≈ 11.5 A.",
    "Delta: I_ph = 400/20 = 20 A; I_L = √3 × 20 ≈ 34.6 A (three times star)."
   ],
   "answer": "11.5 A star; 34.6 A delta"
  },
  "mistakes": [
   "Applying √3 to current in a star connection."
  ],
  "related": [
   "three-phase",
   "three-phase-power",
   "motor-starters",
   "star-delta-transformation"
  ],
  "keywords": "star delta wye mesh line phase"
 },
 {
  "id": "three-phase-power",
  "title": "Three-phase power",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "P = √3·V_L·I_L·cos φ for balanced loads.",
  "explanation": [
   "For a balanced three-phase load, total power is three times the per-phase power, which in line quantities gives P = √3 V_L I_L cos φ for both star and delta. Similarly Q = √3 V_L I_L sin φ and S = √3 V_L I_L.",
   "Power can be measured with three wattmeters (any load) or the two-wattmeter method in three-wire systems."
  ],
  "formulas": [
   {
    "expr": "P = √3·V_L·I_L·cos φ",
    "desc": "real power"
   },
   {
    "expr": "S = √3·V_L·I_L",
    "desc": "apparent power"
   }
  ],
  "example": {
   "problem": "A 400 V three-phase motor draws 20 A at PF 0.85. Find P.",
   "steps": [
    "P = √3 × 400 × 20 × 0.85 ≈ 11 778 W."
   ],
   "answer": "≈ 11.8 kW"
  },
  "mistakes": [
   "Using √3 with phase quantities."
  ],
  "related": [
   "three-phase",
   "star-delta-connections",
   "unbalanced-loads",
   "ac-power"
  ],
  "keywords": "three phase power root 3"
 },
 {
  "id": "unbalanced-loads",
  "title": "Unbalanced loads & the two-wattmeter method",
  "levels": [
   "college",
   "university"
  ],
  "subject": "ac",
  "summary": "Neutral current and measuring three-phase power with two wattmeters.",
  "explanation": [
   "When phase loads differ, line currents are unequal and the neutral carries their phasor sum. Losing the neutral in an unbalanced star system shifts the star point: some phases see over-voltage (up to ~400 V) and appliances can be destroyed — a known hazard with neutral failures.",
   "In a three-wire system two wattmeters measure total power: P = W₁ + W₂. For a balanced load tan φ = √3(W₁ − W₂)/(W₁ + W₂). If one reading is negative the PF is below 0.5."
  ],
  "formulas": [
   {
    "expr": "I_N = I₁ + I₂ + I₃ (phasor sum)",
    "desc": "neutral current"
   },
   {
    "expr": "P = W₁ + W₂",
    "desc": "two-wattmeter"
   },
   {
    "expr": "tan φ = √3(W₁ − W₂)/(W₁ + W₂)",
    "desc": "balanced load angle"
   }
  ],
  "example": {
   "problem": "Two wattmeters read 5 kW and 3 kW on a balanced load. Find P and PF.",
   "steps": [
    "P = 8 kW.",
    "tan φ = √3 × 2/8 = 0.433 → φ = 23.4° → PF ≈ 0.918."
   ],
   "answer": "8 kW; PF ≈ 0.92"
  },
  "mistakes": [
   "Assuming neutral current is zero for unbalanced loads."
  ],
  "related": [
   "three-phase-power",
   "power-measurement",
   "star-delta-connections"
  ],
  "keywords": "two wattmeter neutral current unbalanced"
 },
 {
  "id": "ac-network-theorems",
  "title": "AC network theorems with phasors",
  "levels": [
   "university"
  ],
  "subject": "ac",
  "summary": "Thevenin, Norton, superposition and mesh/nodal with complex impedances.",
  "explanation": [
   "Every DC technique applies to sinusoidal steady-state circuits when sources are phasors and resistances become impedances. Superposition must be used when sources have different frequencies — solve each frequency separately and add in the time domain, not as phasors.",
   "Maximum power to a load occurs when Z_L = Z_th* (conjugate match)."
  ],
  "formulas": [
   {
    "expr": "V_th = V_oc (phasor), Z_th = V_oc / I_sc",
    "desc": "Thevenin in AC"
   },
   {
    "expr": "Z_L = Z_th*",
    "desc": "conjugate match"
   }
  ],
  "example": {
   "problem": "Z_th = 6 + j8 Ω, V_th = 20∠0° V. Find the load for maximum power and that power.",
   "steps": [
    "Z_L = 6 − j8 Ω.",
    "I = 20/(12) = 1.667 A; P = I²R_L = 1.667² × 6 ≈ 16.7 W (= V²/4R_th)."
   ],
   "answer": "6 − j8 Ω; ≈ 16.7 W"
  },
  "mistakes": [
   "Adding phasors of different frequencies."
  ],
  "related": [
   "network-theorems",
   "complex-numbers-ac",
   "max-power-transfer"
  ],
  "keywords": "ac thevenin conjugate matching phasor analysis"
 }
];

export default topics;
