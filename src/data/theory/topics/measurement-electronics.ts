// AUTO-GENERATED study content for the Electrical Theory library. Edit the source content, not this file by hand.
import type { TheoryTopic } from '../types';

const topics: TheoryTopic[] = [
 {
  "id": "instrumentation",
  "title": "Instrumentation & measurement fundamentals",
  "levels": [
   "college",
   "university"
  ],
  "subject": "measurement",
  "summary": "Accuracy, precision, resolution, errors and loading effects.",
  "explanation": [
   "Accuracy is closeness to the true value; precision is repeatability; resolution is the smallest change displayed. Errors are gross (human), systematic (calibration, loading, environment) or random. Analogue instrument accuracy is usually quoted as % of full-scale deflection, so readings near the bottom of the scale have large relative error; digital meters quote ±(% of reading + counts).",
   "Loading: a voltmeter with finite resistance in parallel with a high-resistance circuit lowers the voltage it measures. Use meters whose input resistance is ≥ 100× the circuit resistance."
  ],
  "formulas": [
   {
    "expr": "% error = (measured − true)/true × 100",
    "desc": "relative error"
   },
   {
    "expr": "Error_FSD = class% × full scale",
    "desc": "analogue limiting error"
   }
  ],
  "example": {
   "problem": "A 0–100 V meter of accuracy class 1 % FSD reads 20 V. What is the possible percentage error of the reading?",
   "steps": [
    "Limiting error = 1 % × 100 V = ±1 V.",
    "At 20 V: 1/20 = ±5 %."
   ],
   "answer": "±5 %"
  },
  "mistakes": [
   "Using the lowest part of an analogue scale."
  ],
  "related": [
   "multimeters",
   "oscilloscopes",
   "meter-shunts-multipliers",
   "sensors-transducers"
  ],
  "keywords": "accuracy precision resolution loading effect calibration"
 },
 {
  "id": "multimeters",
  "title": "Multimeters",
  "levels": [
   "school",
   "college"
  ],
  "subject": "measurement",
  "summary": "Measuring V, I, R and continuity safely with a DMM.",
  "explanation": [
   "Voltage is measured in parallel, current in series (breaking the circuit), resistance and continuity only with the circuit de-energised. Diode-test mode shows a junction's forward voltage (≈ 0.5–0.7 V for silicon). Choose a meter with the right CAT rating (CAT II for sockets, CAT III for DBs, CAT IV at the supply origin) and fused current inputs.",
   "Leaving leads in the current (A) socket and then measuring voltage is the classic way to blow the meter fuse or cause an arc flash."
  ],
  "formulas": [
   {
    "expr": "R_meter ≫ R_circuit",
    "desc": "minimal voltmeter loading"
   }
  ],
  "example": {
   "problem": "A DMM in diode mode reads 0.62 V one way and OL the other on a component. What is it?",
   "steps": [
    "Forward drop of ≈ 0.6 V and open in reverse.",
    "Behaviour of a healthy silicon diode/junction."
   ],
   "answer": "A good silicon diode (or transistor junction)"
  },
  "mistakes": [
   "Measuring resistance on a live circuit.",
   "Using a CAT II meter on a three-phase DB."
  ],
  "related": [
   "instrumentation",
   "oscilloscopes",
   "diodes"
  ],
  "keywords": "multimeter dmm cat rating continuity diode test"
 },
 {
  "id": "oscilloscopes",
  "title": "Oscilloscopes",
  "levels": [
   "college",
   "university"
  ],
  "subject": "measurement",
  "summary": "Seeing waveforms: volts/div, time/div, triggering and probes.",
  "explanation": [
   "An oscilloscope plots voltage against time. Vertical scale (V/div) and horizontal scale (s/div) set the display; triggering stabilises repetitive waveforms by starting each sweep at the same level and slope. Use 10× probes (compensated with the square-wave calibrator) for higher input impedance and bandwidth.",
   "Scope ground clips are connected to mains earth: clipping ground to a live point on mains-referenced circuits causes a short. Use differential probes or isolation for mains measurements."
  ],
  "formulas": [
   {
    "expr": "V_pp = divisions × V/div",
    "desc": "amplitude"
   },
   {
    "expr": "f = 1/(divisions × time/div)",
    "desc": "frequency from period"
   }
  ],
  "example": {
   "problem": "A sine spans 6 div peak-to-peak at 2 V/div; one cycle is 4 div at 0.5 ms/div. Find V_pp, V_rms and f.",
   "steps": [
    "V_pp = 12 V; V_m = 6 V; V_rms = 6/√2 ≈ 4.24 V.",
    "T = 4 × 0.5 = 2 ms; f = 500 Hz."
   ],
   "answer": "12 V p-p; 4.24 V rms; 500 Hz"
  },
  "mistakes": [
   "Connecting the ground clip to a non-earth point on a mains-powered circuit."
  ],
  "related": [
   "instrumentation",
   "alternating-current",
   "multimeters"
  ],
  "keywords": "oscilloscope scope trigger probe volts per division timebase"
 },
 {
  "id": "meter-shunts-multipliers",
  "title": "Meter shunts & multipliers",
  "levels": [
   "college"
  ],
  "subject": "measurement",
  "summary": "Extending the range of a moving-coil meter.",
  "explanation": [
   "A moving-coil meter has full-scale current I_m and resistance R_m. To measure a larger current, connect a low-value shunt in parallel so most current bypasses the meter. To measure voltage, connect a high-value multiplier resistor in series. Voltmeter sensitivity is expressed in Ω/V = 1/I_m."
  ],
  "formulas": [
   {
    "expr": "R_sh = I_m·R_m / (I − I_m)",
    "desc": "shunt"
   },
   {
    "expr": "R_mult = V/I_m − R_m",
    "desc": "multiplier"
   }
  ],
  "example": {
   "problem": "A 1 mA, 50 Ω meter must read 0–1 A. Find the shunt.",
   "steps": [
    "R_sh = 0.001 × 50/(1 − 0.001) = 0.05/0.999.",
    "≈ 0.05005 Ω."
   ],
   "answer": "≈ 0.050 Ω"
  },
  "mistakes": [
   "Putting the shunt in series or the multiplier in parallel."
  ],
  "related": [
   "current-divider",
   "instrumentation",
   "multimeters"
  ],
  "keywords": "shunt multiplier moving coil ohms per volt"
 },
 {
  "id": "power-measurement",
  "title": "Power & energy measurement",
  "levels": [
   "college",
   "university"
  ],
  "subject": "measurement",
  "summary": "Wattmeters, energy meters and power analysers.",
  "explanation": [
   "A wattmeter has a current coil in series and a voltage coil in parallel and reads V·I·cos φ. Single-phase energy meters integrate power over time (kWh); electronic and smart meters sample V and I digitally and also record kvarh, maximum demand and power quality. For three-phase three-wire loads, two wattmeters suffice; four-wire unbalanced loads need three."
  ],
  "formulas": [
   {
    "expr": "P = V·I·cos φ",
    "desc": "wattmeter reading"
   },
   {
    "expr": "E = ∫p dt",
    "desc": "energy"
   }
  ],
  "example": {
   "problem": "An energy meter's LED blinks 1 000 imp/kWh. It blinks 50 times in 60 s. Find the load power.",
   "steps": [
    "Energy in 60 s = 50/1 000 kWh = 0.05 kWh.",
    "P = 0.05 kWh/(1/60 h) = 3 kW."
   ],
   "answer": "3 kW"
  },
  "mistakes": [
   "Reading a wattmeter on a high-PF scale with a low-PF load (low-PF wattmeters exist for this)."
  ],
  "related": [
   "unbalanced-loads",
   "ac-power",
   "instrumentation"
  ],
  "keywords": "wattmeter energy meter smart meter imp/kwh"
 },
 {
  "id": "sensors-transducers",
  "title": "Sensors & transducers",
  "levels": [
   "college",
   "university"
  ],
  "subject": "measurement",
  "summary": "Converting physical quantities to electrical signals.",
  "explanation": [
   "Temperature: thermocouples (Seebeck EMF, e.g. Type K ~41 µV/°C), RTDs (Pt100), thermistors (NTC/PTC), IC sensors (LM35 = 10 mV/°C). Strain/force: strain gauges in bridges, load cells. Position: potentiometers, LVDTs, encoders, Hall sensors. Light: LDRs, photodiodes. Signal conditioning amplifies, filters, linearises and isolates before the ADC.",
   "Active transducers generate their own signal (thermocouple, piezo); passive ones need excitation (RTD, strain gauge)."
  ],
  "formulas": [
   {
    "expr": "V = 10 mV/°C × T",
    "desc": "LM35 output"
   },
   {
    "expr": "GF = (ΔR/R)/ε",
    "desc": "strain gauge factor"
   }
  ],
  "example": {
   "problem": "An LM35 outputs 0.285 V. What is the temperature?",
   "steps": [
    "T = 0.285/0.010 = 28.5 °C."
   ],
   "answer": "28.5 °C"
  },
  "mistakes": [
   "Forgetting cold-junction compensation with thermocouples."
  ],
  "related": [
   "wheatstone-bridge",
   "temperature-coefficient",
   "adc-dac",
   "op-amp-circuits"
  ],
  "keywords": "sensor transducer thermocouple rtd strain gauge hall lvdt"
 },
 {
  "id": "semiconductors",
  "title": "Semiconductors (intrinsic, doping, p-n)",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Silicon, holes and electrons, n-type and p-type doping.",
  "explanation": [
   "Pure (intrinsic) silicon has four valence electrons and few free carriers at room temperature. Doping with a pentavalent impurity (phosphorus, arsenic) adds free electrons — n-type (electrons majority carriers). Doping with a trivalent impurity (boron) creates holes — p-type (holes majority). Conductivity rises with temperature as more electron-hole pairs are generated.",
   "Joining p and n regions forms a junction: carriers diffuse, leaving a depletion region with a built-in potential (~0.7 V for Si, ~0.3 V for Ge) that blocks further diffusion."
  ],
  "formulas": [
   {
    "expr": "n·p = n_i²",
    "desc": "mass-action law"
   },
   {
    "expr": "E_g(Si) ≈ 1.12 eV, E_g(Ge) ≈ 0.67 eV",
    "desc": "band gaps"
   }
  ],
  "example": {
   "problem": "Silicon is doped with 10¹⁶ donors/cm³; n_i = 10¹⁰ cm⁻³. Find the hole concentration.",
   "steps": [
    "n ≈ N_D = 10¹⁶ cm⁻³.",
    "p = n_i²/n = 10²⁰/10¹⁶ = 10⁴ cm⁻³."
   ],
   "answer": "10⁴ holes/cm³"
  },
  "mistakes": [
   "Calling an n-type crystal negatively charged — it is electrically neutral."
  ],
  "related": [
   "diodes",
   "conductors-insulators",
   "bjt",
   "mosfet"
  ],
  "keywords": "doping n-type p-type hole electron depletion region band gap"
 },
 {
  "id": "diodes",
  "title": "Diodes (p-n junction)",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "One-way valves for current: forward/reverse bias and the diode equation.",
  "explanation": [
   "Forward bias (anode positive) collapses the depletion region; silicon diodes conduct significantly above ~0.6–0.7 V. Reverse bias widens it, allowing only tiny leakage until breakdown. The Shockley equation models the exponential I–V curve. Key ratings: maximum forward current, peak inverse voltage (PIV), reverse recovery time.",
   "Simple models: ideal switch; constant 0.7 V drop; 0.7 V plus bulk resistance."
  ],
  "formulas": [
   {
    "expr": "I = I_S(e^(V/(nV_T)) − 1), V_T ≈ 26 mV at 300 K",
    "desc": "Shockley equation"
   },
   {
    "expr": "I = (V_S − 0.7)/R",
    "desc": "series resistor with Si diode"
   }
  ],
  "example": {
   "problem": "A 5 V supply feeds a Si diode through 430 Ω. Find the current.",
   "steps": [
    "I = (5 − 0.7)/430.",
    "= 10 mA."
   ],
   "answer": "10 mA"
  },
  "mistakes": [
   "Forgetting the 0.7 V drop or inserting the diode backwards (cathode band marks the cathode)."
  ],
  "related": [
   "semiconductors",
   "rectifiers",
   "zener-diodes",
   "special-diodes"
  ],
  "keywords": "diode forward bias reverse bias piv shockley"
 },
 {
  "id": "rectifiers",
  "title": "Rectifiers & smoothing",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Converting AC to DC with half-wave, full-wave and bridge rectifiers.",
  "explanation": [
   "Half-wave: one diode passes one half-cycle; output frequency = f. Full-wave centre-tap: two diodes and a centre-tapped transformer. Bridge: four diodes, two conduct each half-cycle (two diode drops); ripple frequency = 2f (100 Hz on 50 Hz mains). A reservoir capacitor smooths the output; ripple decreases with larger C and lighter load.",
   "Average DC of unsmoothed full-wave = 2V_m/π; half-wave = V_m/π. With a capacitor, output approaches V_m − diode drops."
  ],
  "formulas": [
   {
    "expr": "V_dc = 2V_m/π (full-wave), V_m/π (half-wave)",
    "desc": "unsmoothed average"
   },
   {
    "expr": "V_r(pp) ≈ I/(f_r·C)",
    "desc": "ripple with capacitor (f_r = ripple frequency)"
   }
  ],
  "example": {
   "problem": "A bridge rectifier on 12 V RMS feeds 0.5 A with a 2 200 µF capacitor at 50 Hz. Estimate peak DC and ripple.",
   "steps": [
    "V_m = 12√2 ≈ 16.97 V; minus 2 × 0.7 → ≈ 15.6 V.",
    "V_r ≈ 0.5/(100 × 2 200×10⁻⁶) ≈ 2.27 V p-p."
   ],
   "answer": "≈ 15.6 V peak, ≈ 2.3 V ripple"
  },
  "mistakes": [
   "Using 50 Hz instead of 100 Hz ripple frequency for full-wave.",
   "Choosing diodes with PIV below 2V_m in a centre-tap circuit."
  ],
  "related": [
   "diodes",
   "power-supplies",
   "capacitors",
   "thyristors"
  ],
  "keywords": "rectifier bridge half wave full wave ripple smoothing capacitor"
 },
 {
  "id": "zener-diodes",
  "title": "Zener diodes & voltage regulation",
  "levels": [
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Using reverse breakdown as a voltage reference.",
  "explanation": [
   "A Zener diode is designed to operate in reverse breakdown, holding a nearly constant voltage V_Z over a range of currents. A simple shunt regulator uses a series resistor to drop the excess voltage; the resistor must keep the Zener above its minimum current at maximum load and below its power rating at no load."
  ],
  "formulas": [
   {
    "expr": "R_s = (V_in − V_Z)/(I_Z + I_L)",
    "desc": "series resistor"
   },
   {
    "expr": "P_Z = V_Z·I_Z",
    "desc": "Zener dissipation"
   }
  ],
  "example": {
   "problem": "Regulate 12 V down to 5.1 V for a 20 mA load with I_Z = 5 mA. Find R_s and Zener power at no load.",
   "steps": [
    "R_s = (12 − 5.1)/0.025 = 276 Ω (use 270 Ω).",
    "No load: I_Z ≈ 6.9/270 ≈ 25.6 mA; P_Z ≈ 5.1 × 0.0256 ≈ 0.13 W."
   ],
   "answer": "≈ 270 Ω; ≈ 0.13 W"
  },
  "mistakes": [
   "Forgetting the no-load case, where the Zener absorbs all the current."
  ],
  "related": [
   "diodes",
   "power-supplies",
   "voltage-divider"
  ],
  "keywords": "zener breakdown shunt regulator reference"
 },
 {
  "id": "special-diodes",
  "title": "LEDs, photodiodes, Schottky & varactors",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Diodes designed for light, speed and tuning.",
  "explanation": [
   "LEDs emit light when forward biased (V_F ≈ 1.8–2.2 V red, ≈ 3 V blue/white) and always need current limiting. Photodiodes generate current proportional to light in reverse bias (or photovoltaic mode). Schottky diodes (metal–semiconductor) have low V_F (~0.2–0.4 V) and fast switching — ideal for SMPS. Varactors use junction capacitance that varies with reverse voltage for tuning. TVS diodes clamp transients."
  ],
  "formulas": [
   {
    "expr": "R = (V_S − V_F)/I_F",
    "desc": "LED series resistor"
   }
  ],
  "example": {
   "problem": "A white LED (3.0 V, 20 mA) runs from 5 V. Find R and its power.",
   "steps": [
    "R = (5 − 3)/0.02 = 100 Ω.",
    "P = 0.02² × 100 = 0.04 W."
   ],
   "answer": "100 Ω; 40 mW"
  },
  "mistakes": [
   "Connecting LEDs in parallel to one resistor — current hogging."
  ],
  "related": [
   "diodes",
   "rectifiers",
   "dc-dc-converters"
  ],
  "keywords": "led schottky photodiode varactor tvs"
 },
 {
  "id": "bjt",
  "title": "Bipolar junction transistors (BJT)",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "NPN/PNP transistors: regions of operation and current gain.",
  "explanation": [
   "A BJT has emitter, base and collector. A small base current controls a larger collector current: I_C = β·I_B, I_E = I_B + I_C. Regions: cut-off (switch off), active (amplifier), saturation (switch fully on, V_CE(sat) ≈ 0.2 V). The base-emitter junction behaves like a diode (V_BE ≈ 0.7 V).",
   "As a switch, drive enough base current for saturation: I_B > I_C/β (use ×2–×5 overdrive)."
  ],
  "formulas": [
   {
    "expr": "I_C = β·I_B",
    "desc": "current gain"
   },
   {
    "expr": "I_E = I_B + I_C, α = I_C/I_E = β/(β + 1)",
    "desc": "currents"
   }
  ],
  "example": {
   "problem": "A transistor switches a 100 mA relay from 5 V logic; β_min = 100. Choose R_B for 2× overdrive.",
   "steps": [
    "I_B(min) = 100 mA/100 = 1 mA; with overdrive 2 mA.",
    "R_B = (5 − 0.7)/0.002 = 2.15 kΩ → use 2.2 kΩ."
   ],
   "answer": "≈ 2.2 kΩ"
  },
  "mistakes": [
   "Assuming β is a precise constant — it varies widely between devices and with temperature."
  ],
  "related": [
   "bjt-amplifiers",
   "mosfet",
   "transistor-switching",
   "semiconductors"
  ],
  "keywords": "bjt npn pnp transistor beta hfe saturation cut off"
 },
 {
  "id": "bjt-amplifiers",
  "title": "BJT biasing & amplifiers",
  "levels": [
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Setting the Q-point and small-signal gain of common-emitter stages.",
  "explanation": [
   "Voltage-divider bias with an emitter resistor makes the operating point stable against β variation. Approximate analysis: V_B from the divider, V_E = V_B − 0.7, I_C ≈ I_E = V_E/R_E, V_C = V_CC − I_C·R_C. The common-emitter amplifier inverts with voltage gain ≈ −R_C/(r_e + R_E,unbypassed), where r_e = 26 mV/I_E. Common-collector (emitter follower) gives gain ≈ 1 with high input and low output impedance."
  ],
  "formulas": [
   {
    "expr": "r_e = 26 mV / I_E",
    "desc": "dynamic emitter resistance"
   },
   {
    "expr": "A_v ≈ −R_C/r_e (R_E bypassed)",
    "desc": "CE gain"
   },
   {
    "expr": "g_m = I_C / V_T",
    "desc": "transconductance"
   }
  ],
  "example": {
   "problem": "V_CC = 12 V, R1 = 47 kΩ, R2 = 10 kΩ, R_E = 1 kΩ, R_C = 4.7 kΩ. Find I_C and V_C.",
   "steps": [
    "V_B = 12 × 10/57 ≈ 2.11 V; V_E ≈ 1.41 V.",
    "I_C ≈ 1.41 mA; V_C = 12 − 1.41 × 4.7 ≈ 5.37 V."
   ],
   "answer": "≈ 1.41 mA; ≈ 5.4 V"
  },
  "mistakes": [
   "Biasing too close to saturation or cut-off, causing clipping."
  ],
  "related": [
   "bjt",
   "voltage-divider",
   "dependent-sources",
   "feedback-amplifiers"
  ],
  "keywords": "q point biasing common emitter emitter follower small signal"
 },
 {
  "id": "mosfet",
  "title": "MOSFETs & FETs",
  "levels": [
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Voltage-controlled transistors: enhancement MOSFETs, JFETs and their regions.",
  "explanation": [
   "A MOSFET's gate is insulated by oxide, so it draws essentially no DC gate current; drain current is controlled by gate-source voltage. Enhancement N-channel devices turn on above threshold V_GS(th). Regions: cut-off, ohmic/triode (switch on, R_DS(on)) and saturation (amplifier). Logic-level MOSFETs are fully on at 4.5 V or lower.",
   "Power MOSFETs dominate switching supplies and motor drives. Gate charge must be driven quickly to minimise switching loss. JFETs are depletion-mode devices (on at V_GS = 0)."
  ],
  "formulas": [
   {
    "expr": "I_D = k(V_GS − V_th)²",
    "desc": "saturation (square law)"
   },
   {
    "expr": "P = I_D²·R_DS(on)",
    "desc": "conduction loss"
   }
  ],
  "example": {
   "problem": "A MOSFET with R_DS(on) = 20 mΩ carries 10 A. Find conduction loss.",
   "steps": [
    "P = 10² × 0.02 = 2 W."
   ],
   "answer": "2 W"
  },
  "mistakes": [
   "Driving a standard (10 V) MOSFET from 3.3 V logic — it is only partially on and overheats.",
   "Leaving a gate floating."
  ],
  "related": [
   "bjt",
   "transistor-switching",
   "power-electronics",
   "dc-dc-converters"
  ],
  "keywords": "mosfet fet jfet gate threshold rds on"
 },
 {
  "id": "transistor-switching",
  "title": "Transistors as switches & drivers",
  "levels": [
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Driving relays, LEDs and motors from logic outputs.",
  "explanation": [
   "Low-side switching (NPN/N-MOSFET between load and ground) is simplest. High-side switching uses PNP/P-MOSFET or gate drivers. Inductive loads need a flyback diode. Compare BJT (needs base current, V_CE(sat) ~0.2 V) with MOSFET (voltage-driven, I²R_DS(on) loss). Darlington arrays (ULN2003) drive several relays/steppers from a microcontroller."
  ],
  "formulas": [
   {
    "expr": "P_BJT ≈ V_CE(sat)·I_C",
    "desc": "BJT on-state loss"
   },
   {
    "expr": "P_MOSFET = I²·R_DS(on)",
    "desc": "MOSFET on-state loss"
   }
  ],
  "example": {
   "problem": "Compare losses at 2 A: BJT with V_CE(sat) = 0.3 V vs MOSFET with R_DS(on) = 50 mΩ.",
   "steps": [
    "BJT: 0.3 × 2 = 0.6 W.",
    "MOSFET: 2² × 0.05 = 0.2 W."
   ],
   "answer": "0.6 W vs 0.2 W — MOSFET runs cooler"
  },
  "mistakes": [
   "Omitting the flyback diode on relays."
  ],
  "related": [
   "bjt",
   "mosfet",
   "inductors",
   "microcontrollers"
  ],
  "keywords": "low side high side driver relay flyback darlington"
 },
 {
  "id": "op-amps",
  "title": "Operational amplifiers (ideal model)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Very-high-gain differential amplifiers and the two golden rules.",
  "explanation": [
   "An op-amp amplifies the difference between its inputs: v_o = A(v⁺ − v⁻), with open-loop gain A ~10⁵–10⁶. With negative feedback the ideal analysis uses two rules: (1) no current flows into the inputs; (2) the output adjusts so v⁺ = v⁻ (virtual short). Real limits: output swing (rail-to-rail or not), slew rate, gain-bandwidth product, input offset and bias currents.",
   "Without feedback the op-amp acts as a comparator — output slams to a rail."
  ],
  "formulas": [
   {
    "expr": "v_o = A(v⁺ − v⁻)",
    "desc": "open loop"
   },
   {
    "expr": "GBW = A_CL × BW",
    "desc": "gain-bandwidth product"
   },
   {
    "expr": "f_max = SR/(2πV_p)",
    "desc": "full-power bandwidth"
   }
  ],
  "example": {
   "problem": "An op-amp with GBW 1 MHz is used at closed-loop gain 20. Find the bandwidth.",
   "steps": [
    "BW = 1 MHz/20 = 50 kHz."
   ],
   "answer": "50 kHz"
  },
  "mistakes": [
   "Applying the virtual-short rule without negative feedback."
  ],
  "related": [
   "op-amp-circuits",
   "feedback-amplifiers",
   "filters",
   "dependent-sources"
  ],
  "keywords": "op amp operational amplifier virtual short golden rules slew rate gbw"
 },
 {
  "id": "op-amp-circuits",
  "title": "Op-amp circuits (inverting, non-inverting, summing, integrator)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Standard op-amp configurations and their gains.",
  "explanation": [
   "Inverting amplifier: gain −R_f/R_in, input impedance R_in. Non-inverting: gain 1 + R_f/R_g, very high input impedance. Voltage follower: gain 1 (buffer). Summing amplifier adds weighted inputs (audio mixers, DACs). Difference amplifier subtracts. Integrator (capacitor feedback) and differentiator (capacitor input) perform calculus; comparators with hysteresis (Schmitt trigger) clean up noisy signals."
  ],
  "formulas": [
   {
    "expr": "A_v = −R_f/R_in",
    "desc": "inverting"
   },
   {
    "expr": "A_v = 1 + R_f/R_g",
    "desc": "non-inverting"
   },
   {
    "expr": "v_o = −R_f(v₁/R₁ + v₂/R₂ + …)",
    "desc": "summing"
   },
   {
    "expr": "v_o = −(1/RC)∫v_in dt",
    "desc": "integrator"
   }
  ],
  "example": {
   "problem": "Inverting amp with R_in = 10 kΩ, R_f = 47 kΩ and 0.2 V input. Find v_o.",
   "steps": [
    "A_v = −47/10 = −4.7.",
    "v_o = −4.7 × 0.2 = −0.94 V."
   ],
   "answer": "−0.94 V"
  },
  "mistakes": [
   "Forgetting the \"1 +\" in non-inverting gain."
  ],
  "related": [
   "op-amps",
   "filters",
   "sensors-transducers",
   "oscillators"
  ],
  "keywords": "inverting non inverting summing integrator differentiator buffer schmitt"
 },
 {
  "id": "filters",
  "title": "Filters (passive & active)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Low-pass, high-pass, band-pass and band-stop responses.",
  "explanation": [
   "Filters pass some frequencies and attenuate others. A first-order RC low-pass has cut-off f_c = 1/(2πRC), where output is −3 dB (0.707) and phase −45°; beyond f_c it rolls off at −20 dB/decade. Swapping R and C gives a high-pass. Higher orders roll off faster (−20n dB/decade). Active filters (Sallen-Key, multiple-feedback) use op-amps to avoid inductors and provide gain; Butterworth (flat passband), Chebyshev (steeper, ripple) and Bessel (linear phase) are classic approximations."
  ],
  "formulas": [
   {
    "expr": "f_c = 1/(2πRC)",
    "desc": "RC cut-off"
   },
   {
    "expr": "H(jω) = 1/(1 + jω/ω_c)",
    "desc": "first-order low-pass"
   },
   {
    "expr": "dB = 20·log₁₀(V_out/V_in)",
    "desc": "gain in decibels"
   }
  ],
  "example": {
   "problem": "Design an RC low-pass with f_c ≈ 1 kHz using C = 100 nF.",
   "steps": [
    "R = 1/(2π × 1 000 × 100×10⁻⁹).",
    "≈ 1 592 Ω → use 1.6 kΩ."
   ],
   "answer": "R ≈ 1.6 kΩ"
  },
  "mistakes": [
   "Using 10·log for voltage ratios (that is for power)."
  ],
  "related": [
   "reactance",
   "resonance",
   "op-amp-circuits",
   "signals-and-systems",
   "fourier"
  ],
  "keywords": "low pass high pass band pass cut off frequency butterworth decibel bode"
 },
 {
  "id": "oscillators",
  "title": "Oscillators",
  "levels": [
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Circuits that generate waveforms using positive feedback.",
  "explanation": [
   "An oscillator sustains oscillation when loop gain = 1 and loop phase shift = 0° (360°) — the Barkhausen criterion. RC types: Wien bridge (f = 1/(2πRC), amplifier gain 3), phase-shift. LC types: Colpitts, Hartley (f = 1/(2π√(LC))). Crystal oscillators use quartz resonance for high stability (e.g. 32.768 kHz watch crystals, MHz clocks). Relaxation oscillators (555, Schmitt-trigger RC) produce square waves."
  ],
  "formulas": [
   {
    "expr": "Aβ = 1∠0°",
    "desc": "Barkhausen criterion"
   },
   {
    "expr": "f = 1/(2πRC)",
    "desc": "Wien bridge"
   }
  ],
  "example": {
   "problem": "A Wien bridge uses R = 10 kΩ and C = 10 nF. Find f and the required gain.",
   "steps": [
    "f = 1/(2π × 10⁴ × 10⁻⁸) ≈ 1 592 Hz.",
    "Gain = 3."
   ],
   "answer": "≈ 1.59 kHz; gain 3"
  },
  "mistakes": [
   "Setting gain exactly 3 with no amplitude stabilisation — oscillation dies or clips."
  ],
  "related": [
   "resonance",
   "op-amp-circuits",
   "555-timer",
   "feedback-amplifiers"
  ],
  "keywords": "oscillator barkhausen wien bridge colpitts hartley crystal"
 },
 {
  "id": "feedback-amplifiers",
  "title": "Feedback in amplifiers",
  "levels": [
   "university"
  ],
  "subject": "electronics",
  "summary": "Negative feedback trades gain for stability, bandwidth and linearity.",
  "explanation": [
   "With forward gain A and feedback fraction β, closed-loop gain is A/(1 + Aβ). When Aβ ≫ 1 the gain ≈ 1/β, set by passive components. Negative feedback reduces distortion and sensitivity to device variation by the factor (1 + Aβ) and extends bandwidth by the same factor. Four topologies (series-shunt, etc.) modify input and output impedances.",
   "Too much phase shift around the loop can turn negative feedback positive and cause oscillation — see phase and gain margins."
  ],
  "formulas": [
   {
    "expr": "A_f = A / (1 + Aβ)",
    "desc": "closed-loop gain"
   },
   {
    "expr": "BW_f = BW(1 + Aβ)",
    "desc": "bandwidth extension"
   }
  ],
  "example": {
   "problem": "A = 10 000, β = 0.01. Find closed-loop gain.",
   "steps": [
    "Aβ = 100.",
    "A_f = 10 000/101 ≈ 99.0."
   ],
   "answer": "≈ 99"
  },
  "mistakes": [
   "Ignoring stability margins when adding feedback."
  ],
  "related": [
   "op-amps",
   "control-systems",
   "bode-plots",
   "oscillators"
  ],
  "keywords": "negative feedback closed loop gain desensitivity"
 },
 {
  "id": "power-supplies",
  "title": "Linear power supplies & regulators",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Transformer, rectifier, filter and regulator blocks; 78xx regulators and dropout.",
  "explanation": [
   "A linear supply: transformer (step down and isolate) → rectifier → reservoir capacitor → regulator. Three-terminal regulators (7805, LM317) need input above output by the dropout voltage (~2 V for 78xx; LDOs much less). Linear regulators waste (V_in − V_out) × I as heat; switch-mode supplies are far more efficient for large differences."
  ],
  "formulas": [
   {
    "expr": "P_reg = (V_in − V_out)·I",
    "desc": "regulator dissipation"
   },
   {
    "expr": "V_out = 1.25(1 + R2/R1)",
    "desc": "LM317 output"
   }
  ],
  "example": {
   "problem": "An LM317 with R1 = 240 Ω and R2 = 720 Ω. Find V_out.",
   "steps": [
    "V_out = 1.25 × (1 + 720/240) = 1.25 × 4.",
    "= 5 V."
   ],
   "answer": "5 V"
  },
  "mistakes": [
   "Not heat-sinking a linear regulator dropping several volts at high current."
  ],
  "related": [
   "rectifiers",
   "zener-diodes",
   "dc-dc-converters"
  ],
  "keywords": "power supply 7805 lm317 ldo dropout regulator"
 },
 {
  "id": "power-electronics",
  "title": "Power electronics (overview)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Efficient conversion of electrical power with semiconductor switches.",
  "explanation": [
   "Power electronics converts between AC and DC and changes voltage and frequency using switches (diodes, thyristors, MOSFETs, IGBTs, SiC and GaN devices) operated fully on or off, minimising loss. Converter families: rectifiers (AC→DC), DC-DC converters (buck, boost, buck-boost, flyback), inverters (DC→AC) and AC-AC converters (cycloconverters, AC voltage controllers).",
   "Applications: phone chargers, solar inverters, VSDs, EV drives, HVDC, UPS. PWM (pulse-width modulation) controls average output by duty cycle D = t_on/T."
  ],
  "formulas": [
   {
    "expr": "D = t_on / T",
    "desc": "duty cycle"
   },
   {
    "expr": "P_sw ≈ ½·V·I·(t_r + t_f)·f_s",
    "desc": "switching loss"
   }
  ],
  "example": {
   "problem": "A switch turns on for 30 µs in each 100 µs period. Find D and switching frequency.",
   "steps": [
    "D = 30/100 = 0.3.",
    "f = 1/100 µs = 10 kHz."
   ],
   "answer": "D = 0.3; 10 kHz"
  },
  "mistakes": [
   "Ignoring switching losses at high frequency."
  ],
  "related": [
   "thyristors",
   "dc-dc-converters",
   "inverters",
   "mosfet",
   "motor-starters"
  ],
  "keywords": "power electronics pwm igbt sic gan converter"
 },
 {
  "id": "thyristors",
  "title": "Thyristors (SCR, TRIAC, DIAC)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Latching switches for controlled rectification and AC power control.",
  "explanation": [
   "An SCR (silicon-controlled rectifier) blocks until a gate pulse turns it on; it then latches until current falls below the holding current (naturally at the AC zero crossing). Phase control varies the firing angle α to control average output. A TRIAC conducts in both directions — used in light dimmers and fan speed controls, often triggered by a DIAC.",
   "Controlled half-wave average voltage with resistive load: V_dc = (V_m/2π)(1 + cos α)."
  ],
  "formulas": [
   {
    "expr": "V_dc = (V_m/2π)(1 + cos α)",
    "desc": "half-wave controlled (R load)"
   },
   {
    "expr": "V_dc = (V_m/π)(1 + cos α)",
    "desc": "full-wave semi/fully controlled (R load)"
   }
  ],
  "example": {
   "problem": "A half-wave SCR on 230 V RMS fires at α = 60°. Find V_dc (resistive load).",
   "steps": [
    "V_m = 325.3 V.",
    "V_dc = 325.3/(2π) × (1 + 0.5) ≈ 77.7 V."
   ],
   "answer": "≈ 77.7 V"
  },
  "mistakes": [
   "Expecting an SCR to turn off when the gate signal is removed."
  ],
  "related": [
   "power-electronics",
   "rectifiers",
   "motor-starters"
  ],
  "keywords": "scr thyristor triac diac firing angle phase control dimmer"
 },
 {
  "id": "dc-dc-converters",
  "title": "DC-DC converters (buck, boost)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Switch-mode converters that step DC voltage down or up efficiently.",
  "explanation": [
   "Buck (step-down): switch, diode (or synchronous FET), inductor and capacitor; V_out = D·V_in. Boost (step-up): V_out = V_in/(1 − D). Buck-boost/inverting and flyback (isolated) topologies also exist. Efficiencies of 85–95 %+ are typical. Inductor ripple current and output ripple depend on L, C and switching frequency."
  ],
  "formulas": [
   {
    "expr": "V_out = D·V_in",
    "desc": "buck (CCM, ideal)"
   },
   {
    "expr": "V_out = V_in/(1 − D)",
    "desc": "boost (CCM, ideal)"
   },
   {
    "expr": "ΔI_L = (V_in − V_out)·D/(L·f_s)",
    "desc": "buck ripple current"
   }
  ],
  "example": {
   "problem": "A buck converter takes 12 V to 3.3 V. Find D. A boost converter takes 5 V to 12 V; find D.",
   "steps": [
    "Buck: D = 3.3/12 = 0.275.",
    "Boost: 12 = 5/(1 − D) → D = 1 − 5/12 ≈ 0.583."
   ],
   "answer": "0.275; ≈ 0.583"
  },
  "mistakes": [
   "Using an inductor with saturation current below peak current."
  ],
  "related": [
   "power-electronics",
   "inductors",
   "power-supplies",
   "mosfet",
   "renewable-energy-solar-pv"
  ],
  "keywords": "buck boost smps switch mode converter duty cycle"
 },
 {
  "id": "inverters",
  "title": "Inverters & UPS",
  "levels": [
   "college",
   "university"
  ],
  "subject": "electronics",
  "summary": "Converting DC to AC: square, modified-sine and pure-sine inverters.",
  "explanation": [
   "An inverter uses switches (H-bridge single phase, three-leg bridge three phase) to synthesise AC from DC. Square-wave and modified-sine inverters are cheap but harmful to motors and some electronics; pure-sine inverters use high-frequency sinusoidal PWM and filtering. Solar/hybrid inverters add MPPT, battery charging and grid-tie synchronisation; VSDs use inverters to drive motors at variable frequency.",
   "Single-phase full-bridge SPWM: fundamental peak = m_a × V_dc (for modulation index m_a ≤ 1)."
  ],
  "formulas": [
   {
    "expr": "V₁(peak) = m_a·V_dc",
    "desc": "SPWM full bridge"
   },
   {
    "expr": "I_dc ≈ P_out / (η·V_dc)",
    "desc": "battery current"
   }
  ],
  "example": {
   "problem": "A 48 V battery feeds a 2.4 kW load via a 92 % efficient inverter. Find battery current.",
   "steps": [
    "I = 2 400/(0.92 × 48).",
    "≈ 54.3 A."
   ],
   "answer": "≈ 54 A"
  },
  "mistakes": [
   "Sizing battery cables for the AC output current instead of the much larger DC current."
  ],
  "related": [
   "power-electronics",
   "batteries",
   "renewable-energy-solar-pv",
   "motor-starters"
  ],
  "keywords": "inverter ups pure sine modified sine h bridge spwm"
 },
 {
  "id": "555-timer",
  "title": "555 timer",
  "levels": [
   "school",
   "college"
  ],
  "subject": "electronics",
  "summary": "The classic timer IC in monostable and astable modes.",
  "explanation": [
   "The 555 contains two comparators (thresholds at ⅓ and ⅔ V_CC), a flip-flop, a discharge transistor and an output stage. Monostable: one pulse of width 1.1RC per trigger (delays, debouncing). Astable: continuous square wave; with R_A, R_B and C: f = 1.44/((R_A + 2R_B)C), duty cycle (R_A + R_B)/(R_A + 2R_B)."
  ],
  "formulas": [
   {
    "expr": "t = 1.1·R·C",
    "desc": "monostable pulse"
   },
   {
    "expr": "f = 1.44 / ((R_A + 2R_B)·C)",
    "desc": "astable frequency"
   }
  ],
  "example": {
   "problem": "Astable with R_A = 1 kΩ, R_B = 10 kΩ, C = 100 nF. Find f and duty cycle.",
   "steps": [
    "f = 1.44/(21 kΩ × 100 nF) = 1.44/0.0021 ≈ 686 Hz.",
    "Duty = 11/21 ≈ 52.4 %."
   ],
   "answer": "≈ 686 Hz; ≈ 52 %"
  },
  "mistakes": [
   "Expecting exactly 50 % duty without a diode across R_B."
  ],
  "related": [
   "rc-transients",
   "oscillators",
   "flip-flops"
  ],
  "keywords": "555 timer astable monostable"
 }
];

export default topics;
