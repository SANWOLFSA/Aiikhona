// AUTO-GENERATED study content for the Electrical Theory library. Edit the source content, not this file by hand.
import type { TheoryTopic } from '../types';

const topics: TheoryTopic[] = [
 {
  "id": "electric-fields",
  "title": "Electric fields & Coulomb's law",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "fields",
  "summary": "Forces between charges, field strength and potential.",
  "explanation": [
   "Coulomb's law gives the force between point charges: proportional to the product of charges and inversely proportional to distance squared. Electric field strength E is force per unit positive charge (N/C, equivalently V/m). Field lines point away from + and towards −.",
   "Between parallel plates the field is uniform: E = V/d. Potential V at a point is work per unit charge to bring a charge from infinity; for a point charge V = kQ/r."
  ],
  "formulas": [
   {
    "expr": "F = kQ₁Q₂/r², k = 1/(4πε₀) ≈ 8.99 × 10⁹",
    "desc": "Coulomb's law"
   },
   {
    "expr": "E = F/q = kQ/r²",
    "desc": "field of a point charge"
   },
   {
    "expr": "E = V/d",
    "desc": "uniform field between plates"
   }
  ],
  "example": {
   "problem": "Two charges of +2 µC and −3 µC are 0.3 m apart. Find the force.",
   "steps": [
    "F = 8.99×10⁹ × 2×10⁻⁶ × 3×10⁻⁶ / 0.3².",
    "= 0.0539/0.09 ≈ 0.599 N, attractive."
   ],
   "answer": "≈ 0.60 N attraction"
  },
  "mistakes": [
   "Forgetting to square the distance.",
   "Not converting µC to C."
  ],
  "related": [
   "capacitors",
   "gauss-law",
   "static-electricity",
   "dielectrics"
  ],
  "keywords": "coulomb field strength permittivity"
 },
 {
  "id": "capacitors",
  "title": "Capacitors & capacitance",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "fields",
  "summary": "Storing charge and energy in an electric field.",
  "explanation": [
   "A capacitor is two conductors separated by a dielectric. Capacitance C = Q/V (farads). For parallel plates C = ε₀ε_r·A/d — bigger plates, thinner dielectric or higher permittivity give more capacitance. Capacitors block DC once charged and pass AC; their current is proportional to the rate of change of voltage.",
   "Types: ceramic (small, stable C0G/NP0, or high-value X7R), film, aluminium electrolytic (polarised, large values), tantalum, supercapacitors. Ratings: capacitance, voltage, tolerance, ESR and temperature. Electrolytics fail by drying out — bulging tops are a classic repair find."
  ],
  "formulas": [
   {
    "expr": "C = Q / V",
    "desc": "definition"
   },
   {
    "expr": "C = ε₀ε_r·A/d, ε₀ = 8.854 × 10⁻¹² F/m",
    "desc": "parallel plate"
   },
   {
    "expr": "W = ½CV²",
    "desc": "stored energy"
   },
   {
    "expr": "i = C·dv/dt",
    "desc": "current-voltage relation"
   }
  ],
  "example": {
   "problem": "A 470 µF capacitor is charged to 25 V. Find the charge and energy stored.",
   "steps": [
    "Q = CV = 470×10⁻⁶ × 25 = 11.75 mC.",
    "W = ½CV² = 0.5 × 470×10⁻⁶ × 625 ≈ 0.147 J."
   ],
   "answer": "11.75 mC; 0.147 J"
  },
  "mistakes": [
   "Reversing an electrolytic capacitor — it can vent or explode.",
   "Touching large capacitors in switched-mode supplies without discharging them."
  ],
  "related": [
   "capacitors-series-parallel",
   "rc-transients",
   "reactance",
   "dielectrics"
  ],
  "keywords": "farad capacitance electrolytic ceramic esr"
 },
 {
  "id": "capacitors-series-parallel",
  "title": "Capacitors in series & parallel",
  "levels": [
   "school",
   "college"
  ],
  "subject": "fields",
  "summary": "Combining capacitors — the opposite rules to resistors.",
  "explanation": [
   "Capacitors in parallel add (effective plate area increases). Capacitors in series combine like resistors in parallel: the total is less than the smallest. In series each capacitor carries the same charge, and voltage divides inversely with capacitance — the smallest capacitor gets the largest voltage."
  ],
  "formulas": [
   {
    "expr": "C_T = C₁ + C₂ + …",
    "desc": "parallel"
   },
   {
    "expr": "1/C_T = 1/C₁ + 1/C₂ + …",
    "desc": "series"
   },
   {
    "expr": "V₁ = V_T × C₂/(C₁ + C₂)",
    "desc": "series voltage split"
   }
  ],
  "example": {
   "problem": "4 µF and 12 µF in series across 100 V. Find C_T and the voltage on each.",
   "steps": [
    "C_T = 4×12/16 = 3 µF; Q = 3 µF × 100 = 300 µC.",
    "V₄ = 300/4 = 75 V; V₁₂ = 300/12 = 25 V."
   ],
   "answer": "3 µF; 75 V and 25 V"
  },
  "mistakes": [
   "Using the resistor rules for capacitors."
  ],
  "related": [
   "capacitors",
   "series-circuits",
   "parallel-circuits"
  ],
  "keywords": "capacitor combination"
 },
 {
  "id": "rc-transients",
  "title": "RC transients (charging & discharging)",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "fields",
  "summary": "Exponential charging of a capacitor through a resistor; the time constant τ = RC.",
  "explanation": [
   "When a DC voltage is applied through R, capacitor voltage rises exponentially and the current decays. After one time constant τ = RC the voltage reaches 63.2 % of its final value; after 5τ it is effectively complete (99.3 %). Discharging follows the mirror-image decay to 36.8 % after τ.",
   "RC circuits set timing (555 timers, reset delays), filter noise and limit inrush. The general first-order response is x(t) = x(∞) + [x(0) − x(∞)]e^(−t/τ)."
  ],
  "formulas": [
   {
    "expr": "τ = R·C",
    "desc": "time constant"
   },
   {
    "expr": "v_C = V(1 − e^(−t/τ))",
    "desc": "charging"
   },
   {
    "expr": "v_C = V₀·e^(−t/τ)",
    "desc": "discharging"
   },
   {
    "expr": "i = (V/R)·e^(−t/τ)",
    "desc": "charging current"
   }
  ],
  "example": {
   "problem": "10 kΩ and 100 µF charge from 12 V. Find τ and v_C at t = 2 s.",
   "steps": [
    "τ = 10×10³ × 100×10⁻⁶ = 1 s.",
    "v_C = 12(1 − e⁻²) = 12 × 0.8647 ≈ 10.4 V."
   ],
   "answer": "τ = 1 s; ≈ 10.4 V"
  },
  "mistakes": [
   "Thinking the capacitor charges linearly.",
   "Assuming capacitor voltage can change instantly — it cannot (current can)."
  ],
  "related": [
   "capacitors",
   "rl-transients",
   "laplace",
   "555-timer"
  ],
  "keywords": "time constant exponential charging"
 },
 {
  "id": "dielectrics",
  "title": "Dielectrics & permittivity",
  "levels": [
   "college",
   "university"
  ],
  "subject": "fields",
  "summary": "Insulating materials in electric fields: permittivity, polarisation and breakdown.",
  "explanation": [
   "A dielectric polarises in an electric field, reducing the field inside it and allowing more charge to be stored for the same voltage. Relative permittivity ε_r: air ≈ 1, paper ≈ 2–4, mica ≈ 5–7, ceramics up to thousands. Dielectric strength (kV/mm) sets the maximum field before breakdown.",
   "Electric flux density D = εE. In cables and capacitors, stress is highest where the field is most concentrated, e.g. at the inner conductor of a coaxial cable."
  ],
  "formulas": [
   {
    "expr": "D = ε₀ε_r·E",
    "desc": "flux density"
   },
   {
    "expr": "E_max = V/d (plates)",
    "desc": "field strength for breakdown check"
   }
  ],
  "example": {
   "problem": "A capacitor dielectric is 0.1 mm thick with strength 20 kV/mm. What is its theoretical maximum voltage?",
   "steps": [
    "V = E × d = 20 kV/mm × 0.1 mm = 2 kV."
   ],
   "answer": "2 kV (rated lower with a safety factor)"
  },
  "mistakes": [
   "Confusing permittivity (stores charge) with dielectric strength (resists breakdown)."
  ],
  "related": [
   "capacitors",
   "electric-fields",
   "conductors-insulators"
  ],
  "keywords": "permittivity polarisation breakdown"
 },
 {
  "id": "gauss-law",
  "title": "Gauss's law & electrostatics",
  "levels": [
   "university"
  ],
  "subject": "fields",
  "summary": "Electric flux through a closed surface equals enclosed charge over ε₀.",
  "explanation": [
   "Gauss's law, ∮E·dA = Q_enc/ε₀, is the integral form of Maxwell's first equation. With symmetry (sphere, line, plane) it gives fields quickly: an infinite line charge gives E = λ/(2πε₀r); an infinite sheet E = σ/(2ε₀).",
   "Coaxial cable capacitance per metre follows from Gauss's law: C' = 2πε/ln(b/a)."
  ],
  "formulas": [
   {
    "expr": "∮ E·dA = Q_enc/ε₀",
    "desc": "Gauss's law"
   },
   {
    "expr": "C' = 2πε₀ε_r / ln(b/a)",
    "desc": "coax capacitance per metre"
   }
  ],
  "example": {
   "problem": "Find the capacitance per metre of a coax with a = 0.5 mm, b = 2 mm, ε_r = 2.3.",
   "steps": [
    "ln(b/a) = ln 4 = 1.386.",
    "C' = 2π × 8.854×10⁻¹² × 2.3 / 1.386 ≈ 92.3 pF/m."
   ],
   "answer": "≈ 92 pF/m"
  },
  "mistakes": [
   "Choosing a Gaussian surface without symmetry, so E is not constant on it."
  ],
  "related": [
   "electric-fields",
   "maxwells-equations",
   "transmission-lines"
  ],
  "keywords": "flux gaussian surface coax"
 },
 {
  "id": "magnetism",
  "title": "Magnetism & magnetic fields",
  "levels": [
   "school",
   "college"
  ],
  "subject": "fields",
  "summary": "Magnets, field lines, flux and flux density.",
  "explanation": [
   "Magnets have north and south poles; like poles repel. Field lines run N to S outside the magnet and never cross. Magnetic flux Φ is measured in webers (Wb); flux density B = Φ/A is measured in teslas (T). Ferromagnetic materials (iron, nickel, cobalt) concentrate flux.",
   "The Earth's field is about 25–65 µT; a fridge magnet ~5 mT; a motor air-gap ~1 T."
  ],
  "formulas": [
   {
    "expr": "B = Φ / A",
    "desc": "flux density"
   },
   {
    "expr": "1 T = 1 Wb/m²",
    "desc": "tesla"
   }
  ],
  "example": {
   "problem": "A pole face of 20 cm² carries 2 mWb. Find B.",
   "steps": [
    "A = 20 × 10⁻⁴ m² = 2 × 10⁻³ m².",
    "B = 2×10⁻³/2×10⁻³ = 1 T."
   ],
   "answer": "1 T"
  },
  "mistakes": [
   "Converting cm² to m² by dividing by 100 (it is 10⁴)."
  ],
  "related": [
   "electromagnetism",
   "magnetic-circuits",
   "electromagnetic-induction"
  ],
  "keywords": "tesla weber flux pole"
 },
 {
  "id": "electromagnetism",
  "title": "Electromagnetism",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "fields",
  "summary": "Currents create magnetic fields: straight wires, coils and solenoids.",
  "explanation": [
   "A current-carrying conductor is surrounded by circular field lines; direction by the right-hand grip rule (thumb = conventional current, fingers = field). A coil concentrates the field; a long solenoid has a nearly uniform internal field B = µ₀NI/l, multiplied by µ_r with an iron core. Electromagnets drive relays, contactors, solenoid valves and lifting magnets.",
   "Magnetising force (field strength) H = NI/l in A/m, and B = µH with µ = µ₀µ_r, µ₀ = 4π × 10⁻⁷ H/m."
  ],
  "formulas": [
   {
    "expr": "B = µ₀I / (2πr)",
    "desc": "long straight wire"
   },
   {
    "expr": "H = N·I / l",
    "desc": "magnetising force"
   },
   {
    "expr": "B = µ₀µ_r·H",
    "desc": "flux density"
   }
  ],
  "example": {
   "problem": "A 500-turn air-cored solenoid 0.25 m long carries 2 A. Find B inside.",
   "steps": [
    "H = NI/l = 500 × 2/0.25 = 4 000 A/m.",
    "B = µ₀H = 4π×10⁻⁷ × 4 000 ≈ 5.03 mT."
   ],
   "answer": "≈ 5.0 mT"
  },
  "mistakes": [
   "Using the left-hand rule for field direction (that is for force on a conductor)."
  ],
  "related": [
   "magnetism",
   "magnetic-circuits",
   "force-on-conductor",
   "inductors"
  ],
  "keywords": "solenoid right hand grip electromagnet"
 },
 {
  "id": "magnetic-circuits",
  "title": "Magnetic circuits (MMF & reluctance)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "fields",
  "summary": "Treating magnetic paths like electric circuits: Φ = F/S.",
  "explanation": [
   "Magnetomotive force F_m = NI (ampere-turns) drives flux Φ through reluctance S = l/(µ₀µ_r·A), the magnetic equivalent of resistance. Reluctances in series add. Air gaps dominate total reluctance because µ_r(air) = 1 while iron is in the thousands — even a 1 mm gap can need more ampere-turns than the whole core.",
   "This analogy is used to design transformers, relays and motors; fringing and saturation make real results differ."
  ],
  "formulas": [
   {
    "expr": "F_m = N·I = Φ·S",
    "desc": "magnetic \"Ohm's law\""
   },
   {
    "expr": "S = l / (µ₀µ_r·A)",
    "desc": "reluctance (A/Wb)"
   }
  ],
  "example": {
   "problem": "An iron core (µ_r = 1 000) has path length 0.4 m and area 4 cm². Find its reluctance.",
   "steps": [
    "S = 0.4 / (4π×10⁻⁷ × 1 000 × 4×10⁻⁴).",
    "= 0.4 / 5.027×10⁻⁷ ≈ 7.96 × 10⁵ A/Wb."
   ],
   "answer": "≈ 7.96 × 10⁵ A/Wb"
  },
  "mistakes": [
   "Ignoring the air gap in reluctance calculations."
  ],
  "related": [
   "electromagnetism",
   "bh-curve-hysteresis",
   "transformers",
   "inductors"
  ],
  "keywords": "reluctance mmf ampere turns air gap"
 },
 {
  "id": "bh-curve-hysteresis",
  "title": "B–H curve, saturation & hysteresis",
  "levels": [
   "college",
   "university"
  ],
  "subject": "fields",
  "summary": "How ferromagnetic materials magnetise, saturate and waste energy each cycle.",
  "explanation": [
   "The B–H (magnetisation) curve rises steeply then flattens at saturation, where extra H adds little B. Cycling H with AC traces a hysteresis loop; its area is the energy lost per cycle per unit volume. Remanence is B left at H = 0; coercivity is the H needed to bring B back to zero.",
   "Soft magnetic materials (silicon steel, ferrite) have narrow loops — used in transformers and motors. Hard materials (NdFeB, ferrite magnets) have wide loops — permanent magnets. Laminations reduce eddy-current loss; hysteresis loss is reduced by choosing a narrow-loop material."
  ],
  "formulas": [
   {
    "expr": "P_h = k_h·f·B_max^n",
    "desc": "Steinmetz hysteresis loss (n ≈ 1.6–2)"
   },
   {
    "expr": "P_e = k_e·f²·B_max²·t²",
    "desc": "eddy-current loss"
   }
  ],
  "example": {
   "problem": "If frequency doubles at the same B_max, how do hysteresis and eddy-current losses change?",
   "steps": [
    "Hysteresis ∝ f → doubles.",
    "Eddy current ∝ f² → quadruples."
   ],
   "answer": "×2 and ×4"
  },
  "mistakes": [
   "Thinking laminations reduce hysteresis loss (they reduce eddy loss)."
  ],
  "related": [
   "magnetic-circuits",
   "transformers",
   "machine-losses-efficiency"
  ],
  "keywords": "hysteresis saturation remanence coercivity eddy current laminations"
 },
 {
  "id": "electromagnetic-induction",
  "title": "Electromagnetic induction (Faraday & Lenz)",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "fields",
  "summary": "A changing flux linkage induces an EMF.",
  "explanation": [
   "Faraday's law: the EMF induced in a coil equals the rate of change of flux linkage, e = −N dΦ/dt. Lenz's law (the minus sign): the induced current opposes the change that caused it. A conductor moving across a field induces e = Blv, direction by Fleming's right-hand (generator) rule.",
   "Induction underlies generators, transformers, induction motors, induction cooktops and wireless chargers."
  ],
  "formulas": [
   {
    "expr": "e = −N·dΦ/dt",
    "desc": "Faraday's law"
   },
   {
    "expr": "e = B·l·v",
    "desc": "moving conductor"
   }
  ],
  "example": {
   "problem": "A 200-turn coil's flux changes from 5 mWb to 1 mWb in 0.02 s. Find the average EMF.",
   "steps": [
    "ΔΦ = −4 mWb.",
    "e = N|ΔΦ|/Δt = 200 × 0.004/0.02 = 40 V."
   ],
   "answer": "40 V"
  },
  "mistakes": [
   "Forgetting the number of turns.",
   "Expecting an EMF from a steady (unchanging) flux."
  ],
  "related": [
   "inductors",
   "mutual-inductance",
   "transformers",
   "ac-generators",
   "dc-generators"
  ],
  "keywords": "faraday lenz induced emf flemings right hand"
 },
 {
  "id": "inductors",
  "title": "Inductors & self-inductance",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "fields",
  "summary": "Coils that store energy in a magnetic field and oppose changes in current.",
  "explanation": [
   "Self-inductance L (henry) relates flux linkage to current: L = NΦ/I. A changing current induces a back-EMF v = L di/dt that opposes the change. Inductors pass DC (limited only by winding resistance) and oppose AC. Interrupting inductive current suddenly produces large voltage spikes — hence flyback diodes across relay coils.",
   "For a coil on a core L = N²/S = N²µA/l, so inductance scales with turns squared."
  ],
  "formulas": [
   {
    "expr": "v = L·di/dt",
    "desc": "voltage-current"
   },
   {
    "expr": "L = N²µ₀µ_rA / l",
    "desc": "coil inductance"
   },
   {
    "expr": "W = ½LI²",
    "desc": "stored energy"
   }
  ],
  "example": {
   "problem": "A 0.5 H coil's current falls from 2 A to 0 in 10 ms. Find the induced EMF and the energy released.",
   "steps": [
    "v = L Δi/Δt = 0.5 × 2/0.01 = 100 V.",
    "W = ½ × 0.5 × 2² = 1 J."
   ],
   "answer": "100 V; 1 J"
  },
  "mistakes": [
   "Omitting a flyback diode on relay/solenoid coils driven by transistors."
  ],
  "related": [
   "electromagnetic-induction",
   "rl-transients",
   "reactance",
   "mutual-inductance"
  ],
  "keywords": "henry inductance back emf flyback"
 },
 {
  "id": "rl-transients",
  "title": "RL transients",
  "levels": [
   "college",
   "university"
  ],
  "subject": "fields",
  "summary": "Exponential current growth and decay in inductive circuits; τ = L/R.",
  "explanation": [
   "Switching DC onto an R–L series circuit makes current rise exponentially to V/R with time constant τ = L/R; the inductor voltage starts at V and decays. Inductor current cannot change instantly. When the supply is removed, the current decays through any available path — if none exists, the voltage spikes."
  ],
  "formulas": [
   {
    "expr": "τ = L / R",
    "desc": "time constant"
   },
   {
    "expr": "i = (V/R)(1 − e^(−t/τ))",
    "desc": "current rise"
   },
   {
    "expr": "v_L = V·e^(−t/τ)",
    "desc": "inductor voltage"
   }
  ],
  "example": {
   "problem": "L = 2 H, R = 10 Ω, V = 20 V. Find τ and the current after 0.2 s.",
   "steps": [
    "τ = 2/10 = 0.2 s; final current 2 A.",
    "i = 2(1 − e⁻¹) = 2 × 0.632 ≈ 1.26 A."
   ],
   "answer": "0.2 s; ≈ 1.26 A"
  },
  "mistakes": [
   "Using τ = R/L."
  ],
  "related": [
   "inductors",
   "rc-transients",
   "laplace"
  ],
  "keywords": "time constant inductor transient"
 },
 {
  "id": "mutual-inductance",
  "title": "Mutual inductance & coupling",
  "levels": [
   "college",
   "university"
  ],
  "subject": "fields",
  "summary": "Flux from one coil linking another — the basis of transformers.",
  "explanation": [
   "Mutual inductance M gives the EMF induced in coil 2 by changing current in coil 1: e₂ = M di₁/dt. The coupling coefficient k = M/√(L₁L₂) ranges from 0 (no coupling) to 1 (perfect). Power transformers have k ≈ 0.99+; loosely coupled coils are used in wireless charging.",
   "Dot convention shows which ends of coupled coils have the same polarity. Series-aiding coils give L = L₁ + L₂ + 2M; series-opposing L₁ + L₂ − 2M."
  ],
  "formulas": [
   {
    "expr": "e₂ = M·di₁/dt",
    "desc": "mutual EMF"
   },
   {
    "expr": "M = k√(L₁L₂)",
    "desc": "coupling"
   },
   {
    "expr": "L = L₁ + L₂ ± 2M",
    "desc": "series aiding/opposing"
   }
  ],
  "example": {
   "problem": "L₁ = 4 mH, L₂ = 9 mH, k = 0.5. Find M and the series-aiding inductance.",
   "steps": [
    "M = 0.5√(36×10⁻⁶) = 0.5 × 6 mH = 3 mH.",
    "L = 4 + 9 + 6 = 19 mH."
   ],
   "answer": "3 mH; 19 mH"
  },
  "mistakes": [
   "Ignoring the dot convention and getting the sign of M wrong."
  ],
  "related": [
   "inductors",
   "transformers",
   "electromagnetic-induction"
  ],
  "keywords": "coupling coefficient dot convention"
 },
 {
  "id": "force-on-conductor",
  "title": "Force on a current-carrying conductor (motor effect)",
  "levels": [
   "school",
   "college"
  ],
  "subject": "fields",
  "summary": "A current in a magnetic field experiences a force F = BIl.",
  "explanation": [
   "A conductor carrying current I at right angles to field B experiences force F = BIl sin θ. Direction by Fleming's left-hand rule: First finger = Field, seCond finger = Current, thuMb = Motion. This is the motor principle; a coil in a field experiences torque T = BANI cos α (with α the angle of the coil plane).",
   "Two parallel conductors attract if currents are in the same direction and repel if opposite — busbars must be braced for fault forces."
  ],
  "formulas": [
   {
    "expr": "F = B·I·l·sin θ",
    "desc": "force on conductor"
   },
   {
    "expr": "F/l = µ₀I₁I₂ / (2πd)",
    "desc": "force between parallel conductors"
   }
  ],
  "example": {
   "problem": "A 0.3 m conductor carries 10 A at right angles to a 0.8 T field. Find the force.",
   "steps": [
    "F = BIl = 0.8 × 10 × 0.3 = 2.4 N."
   ],
   "answer": "2.4 N"
  },
  "mistakes": [
   "Mixing up Fleming's left (motor) and right (generator) hand rules."
  ],
  "related": [
   "electromagnetism",
   "dc-motors",
   "induction-motors"
  ],
  "keywords": "fleming left hand motor effect bil"
 },
 {
  "id": "maxwells-equations",
  "title": "Maxwell's equations & EM waves",
  "levels": [
   "university"
  ],
  "subject": "fields",
  "summary": "The four equations unifying electricity, magnetism and light.",
  "explanation": [
   "Gauss (∇·D = ρ), Gauss for magnetism (∇·B = 0 — no monopoles), Faraday (∇×E = −∂B/∂t) and Ampère–Maxwell (∇×H = J + ∂D/∂t). The displacement-current term predicts electromagnetic waves travelling at c = 1/√(µ₀ε₀) ≈ 3 × 10⁸ m/s.",
   "In free space E and H are perpendicular, in phase, with intrinsic impedance η₀ = √(µ₀/ε₀) ≈ 377 Ω. Wavelength λ = c/f; in a medium v = c/√(ε_rµ_r)."
  ],
  "formulas": [
   {
    "expr": "c = 1/√(µ₀ε₀)",
    "desc": "speed of light"
   },
   {
    "expr": "η₀ = √(µ₀/ε₀) ≈ 377 Ω",
    "desc": "free-space impedance"
   },
   {
    "expr": "λ = v / f",
    "desc": "wavelength"
   }
  ],
  "example": {
   "problem": "Find the wavelength of a 2.4 GHz Wi-Fi signal in free space.",
   "steps": [
    "λ = 3×10⁸ / 2.4×10⁹ = 0.125 m."
   ],
   "answer": "12.5 cm"
  },
  "mistakes": [
   "Forgetting the displacement-current term, which is essential for waves."
  ],
  "related": [
   "gauss-law",
   "electromagnetic-induction",
   "transmission-lines"
  ],
  "keywords": "maxwell electromagnetic wave displacement current"
 }
];

export default topics;
