// AUTO-GENERATED study content for the Electrical Theory library. Edit the source content, not this file by hand.
import type { TheoryTopic } from '../types';

const topics: TheoryTopic[] = [
 {
  "id": "power-generation",
  "title": "Power generation (conventional & renewable)",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "power",
  "summary": "How electricity is produced: thermal, hydro, nuclear, wind and solar.",
  "explanation": [
   "Most large stations spin synchronous generators with turbines: coal and nuclear stations boil water to drive steam turbines (thermal efficiency ~33–40 %), gas turbines and combined-cycle plants burn gas, and hydro and pumped-storage schemes use falling water. South Africa's grid has historically been dominated by coal, with Koeberg nuclear, pumped storage (e.g. Drakensberg, Ingula) and fast-growing wind and solar from the renewable procurement programme.",
   "Wind and solar PV are variable; they connect through power electronics (inverters) and need storage, flexible generation or demand response to balance the grid."
  ],
  "formulas": [
   {
    "expr": "P = η·ρ·g·Q·H",
    "desc": "hydro power"
   },
   {
    "expr": "P = ½ρ·A·v³·C_p",
    "desc": "wind power (C_p ≤ 0.593 Betz limit)"
   }
  ],
  "example": {
   "problem": "A hydro scheme has head 100 m, flow 10 m³/s, efficiency 90 %. Find the power.",
   "steps": [
    "P = 0.9 × 1 000 × 9.81 × 10 × 100.",
    "≈ 8.83 MW."
   ],
   "answer": "≈ 8.8 MW"
  },
  "mistakes": [
   "Forgetting wind power rises with the CUBE of wind speed."
  ],
  "related": [
   "power-systems",
   "synchronous-machines",
   "renewable-energy-solar-pv"
  ],
  "keywords": "power station coal hydro nuclear wind solar eskom"
 },
 {
  "id": "power-systems",
  "title": "Power systems (generation, transmission, distribution)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "power",
  "summary": "The structure of the grid from power station to plug.",
  "explanation": [
   "Generators produce at ~11–25 kV; step-up transformers raise this to transmission voltages (in SA 275 kV, 400 kV and 765 kV AC, plus the Cahora Bassa HVDC link). Substations step down to sub-transmission (66–132 kV) and distribution (11 kV, 22 kV), and pole or kiosk transformers supply LV 400/230 V customers.",
   "The system operator keeps generation equal to demand every instant; frequency (50 Hz) is the indicator of balance — falling frequency means demand exceeds supply, triggering reserves or load shedding."
  ],
  "formulas": [
   {
    "expr": "P_loss = I²R = (P/(V·PF))²·R",
    "desc": "line loss falls with V²"
   }
  ],
  "example": {
   "problem": "How does line loss change if transmission voltage is doubled for the same power?",
   "steps": [
    "I halves for the same P.",
    "Loss ∝ I² → one quarter."
   ],
   "answer": "Loss falls to 25 %"
  },
  "mistakes": [
   "Thinking higher voltage increases losses."
  ],
  "related": [
   "transmission-lines",
   "power-generation",
   "distribution-systems",
   "per-unit-system"
  ],
  "keywords": "grid transmission distribution substation load shedding frequency"
 },
 {
  "id": "transmission-lines",
  "title": "Transmission lines",
  "levels": [
   "college",
   "university"
  ],
  "subject": "power",
  "summary": "Line parameters R, L, C, G; short, medium and long line models; and high-frequency lines.",
  "explanation": [
   "Power lines are modelled by series resistance and inductance and shunt capacitance per km. Short lines (< 80 km) ignore capacitance; medium lines (80–250 km) use nominal-π; long lines use distributed parameters with characteristic impedance Z₀ and propagation constant γ. Lightly-loaded long lines show the Ferranti effect (receiving-end voltage above sending end) because of line charging current.",
   "At radio frequencies, coax and PCB traces are transmission lines: if the load ≠ Z₀, reflections occur, quantified by the reflection coefficient and VSWR."
  ],
  "formulas": [
   {
    "expr": "Z₀ = √((R + jωL)/(G + jωC)) ≈ √(L/C)",
    "desc": "characteristic impedance (lossless)"
   },
   {
    "expr": "Γ = (Z_L − Z₀)/(Z_L + Z₀)",
    "desc": "reflection coefficient"
   },
   {
    "expr": "VSWR = (1 + |Γ|)/(1 − |Γ|)",
    "desc": "standing wave ratio"
   }
  ],
  "example": {
   "problem": "A 50 Ω line feeds a 75 Ω antenna. Find Γ and VSWR.",
   "steps": [
    "Γ = (75 − 50)/(75 + 50) = 0.2.",
    "VSWR = 1.2/0.8 = 1.5."
   ],
   "answer": "Γ = 0.2; VSWR = 1.5"
  },
  "mistakes": [
   "Ignoring line capacitance on long lines or cables."
  ],
  "related": [
   "power-systems",
   "maxwells-equations",
   "gauss-law",
   "hvdc"
  ],
  "keywords": "line parameters ferranti characteristic impedance vswr reflection"
 },
 {
  "id": "per-unit-system",
  "title": "Per-unit system",
  "levels": [
   "university"
  ],
  "subject": "power",
  "summary": "Normalising quantities to a common base to simplify power-system calculations.",
  "explanation": [
   "Choose base MVA (common to the whole system) and base kV (per voltage zone, linked by transformer ratios). Then base impedance Z_b = kV²/MVA. Per-unit values remove transformer turns ratios from calculations, and equipment impedances lie in narrow ranges (transformers 4–10 % on own rating), making errors easy to spot."
  ],
  "formulas": [
   {
    "expr": "Z_pu = Z_actual / Z_base, Z_base = V_b²/S_b",
    "desc": "per-unit impedance"
   },
   {
    "expr": "Z_pu,new = Z_pu,old × (S_new/S_old) × (V_old/V_new)²",
    "desc": "change of base"
   }
  ],
  "example": {
   "problem": "A 20 MVA transformer has 8 % reactance. Express it on a 100 MVA base (same kV).",
   "steps": [
    "Z_new = 0.08 × 100/20 = 0.4 pu."
   ],
   "answer": "0.4 pu"
  },
  "mistakes": [
   "Forgetting to convert all impedances to the same MVA base."
  ],
  "related": [
   "fault-analysis",
   "power-systems",
   "load-flow"
  ],
  "keywords": "per unit base mva pu"
 },
 {
  "id": "fault-analysis",
  "title": "Fault analysis (symmetrical faults)",
  "levels": [
   "university"
  ],
  "subject": "power",
  "summary": "Calculating short-circuit currents for equipment and protection ratings.",
  "explanation": [
   "A three-phase symmetrical fault is the simplest (balanced) case: fault current = pre-fault voltage divided by the Thevenin impedance at the fault (generators use sub-transient reactance X″d for the first cycles). Fault level (MVA) = √3 V_L I_f. Equipment (breakers, busbars, cables) must withstand the prospective fault current; protection must detect and clear it quickly.",
   "Unsymmetrical faults (single line-to-ground — the most common — line-to-line, double line-to-ground) need symmetrical components."
  ],
  "formulas": [
   {
    "expr": "I_f(pu) = 1 / Z_th(pu)",
    "desc": "three-phase fault"
   },
   {
    "expr": "S_fault = S_base / Z_pu",
    "desc": "fault level"
   }
  ],
  "example": {
   "problem": "A 100 MVA, 11 kV system has total fault-path impedance 0.25 pu. Find the fault MVA and current.",
   "steps": [
    "S_f = 100/0.25 = 400 MVA.",
    "I_f = 400×10⁶/(√3 × 11 000) ≈ 21.0 kA."
   ],
   "answer": "400 MVA; ≈ 21 kA"
  },
  "mistakes": [
   "Using steady-state rather than sub-transient reactance for breaker making duty."
  ],
  "related": [
   "symmetrical-components",
   "protection",
   "per-unit-system"
  ],
  "keywords": "short circuit fault level kva fault current"
 },
 {
  "id": "symmetrical-components",
  "title": "Symmetrical components",
  "levels": [
   "university"
  ],
  "subject": "power",
  "summary": "Resolving unbalanced three-phase sets into positive, negative and zero sequences.",
  "explanation": [
   "Fortescue's theorem: any unbalanced three-phase set equals the sum of a positive-sequence set (normal rotation), a negative-sequence set (reverse rotation) and a zero-sequence set (three in-phase phasors). The operator a = 1∠120°. Zero-sequence current flows only if there is a path to earth/neutral, so transformer winding connections matter.",
   "For a single line-to-ground fault the three sequence networks are connected in series: I_a1 = I_a2 = I_a0 = E/(Z₁ + Z₂ + Z₀ + 3Z_f), and I_f = 3I_a0."
  ],
  "formulas": [
   {
    "expr": "I_a0 = (I_a + I_b + I_c)/3",
    "desc": "zero sequence"
   },
   {
    "expr": "I_a1 = (I_a + aI_b + a²I_c)/3",
    "desc": "positive sequence"
   },
   {
    "expr": "I_f = 3E/(Z₁ + Z₂ + Z₀)",
    "desc": "bolted SLG fault"
   }
  ],
  "example": {
   "problem": "E = 1 pu, Z₁ = Z₂ = j0.2, Z₀ = j0.1 pu. Find the SLG fault current.",
   "steps": [
    "Z₁ + Z₂ + Z₀ = j0.5.",
    "I_f = 3/0.5 = 6 pu."
   ],
   "answer": "6 pu"
  },
  "mistakes": [
   "Forgetting the factor of 3 linking sequence current to fault current."
  ],
  "related": [
   "fault-analysis",
   "protection",
   "three-phase-transformers"
  ],
  "keywords": "fortescue positive negative zero sequence unbalanced fault"
 },
 {
  "id": "protection",
  "title": "Power system protection",
  "levels": [
   "college",
   "university"
  ],
  "subject": "power",
  "summary": "Detecting and isolating faults quickly and selectively.",
  "explanation": [
   "Protection systems use transducers (CTs, VTs), relays and circuit breakers. Requirements: reliability, selectivity (discrimination — only the faulty section trips), speed, sensitivity and stability. Common schemes: overcurrent (IDMT) and earth-fault relays, differential protection for transformers and generators, distance (impedance) protection for lines, and Buchholz relays for oil-filled transformers.",
   "IDMT relays use inverse curves: the higher the fault current, the faster the trip. Grading margins (~0.3–0.4 s) ensure the relay nearest the fault trips first."
  ],
  "formulas": [
   {
    "expr": "t = TMS × 0.14/(PSM^0.02 − 1)",
    "desc": "IEC standard inverse curve"
   },
   {
    "expr": "PSM = I_fault / (CT ratio × plug setting)",
    "desc": "plug-setting multiplier"
   }
  ],
  "example": {
   "problem": "Standard-inverse relay, TMS 0.2, PSM 10. Find the trip time.",
   "steps": [
    "10^0.02 = 1.0471.",
    "t = 0.2 × 0.14/0.0471 ≈ 0.594 s."
   ],
   "answer": "≈ 0.59 s"
  },
  "mistakes": [
   "Grading relays without a time margin, so upstream breakers trip first."
  ],
  "related": [
   "fuses-circuit-breakers",
   "earth-leakage",
   "instrument-transformers",
   "fault-analysis"
  ],
  "keywords": "relay idmt differential distance buchholz discrimination selectivity"
 },
 {
  "id": "fuses-circuit-breakers",
  "title": "Fuses & circuit breakers",
  "levels": [
   "school",
   "college"
  ],
  "subject": "power",
  "summary": "Overcurrent protection for cables and equipment.",
  "explanation": [
   "Fuses melt when current exceeds their rating for long enough; they are cheap with high breaking capacity but must be replaced. Miniature circuit breakers (MCBs) combine a thermal (bimetal) trip for overloads and a magnetic trip for short circuits; trip curves B (3–5 × I_n), C (5–10 ×) and D (10–20 ×) suit resistive, general/motor and high-inrush loads. Moulded-case (MCCB) and air circuit breakers serve larger currents.",
   "The protective device protects the CABLE: its rating must not exceed the cable's current-carrying capacity, and its breaking capacity must exceed the prospective fault current at that point."
  ],
  "formulas": [
   {
    "expr": "I_b ≤ I_n ≤ I_z",
    "desc": "design current ≤ device rating ≤ cable capacity"
   }
  ],
  "example": {
   "problem": "A circuit design current is 16 A and the cable is rated 24 A. Choose a standard MCB.",
   "steps": [
    "Need 16 ≤ I_n ≤ 24.",
    "A 20 A MCB satisfies both."
   ],
   "answer": "20 A"
  },
  "mistakes": [
   "Upsizing a breaker because it \"keeps tripping\" — the cable is then unprotected."
  ],
  "related": [
   "protection",
   "earth-leakage",
   "cable-sizing",
   "heating-effect"
  ],
  "keywords": "fuse mcb mccb trip curve breaking capacity overload"
 },
 {
  "id": "earth-leakage",
  "title": "Earth leakage (RCD/ELCB) protection",
  "levels": [
   "school",
   "college"
  ],
  "subject": "installation",
  "summary": "Residual-current devices that save lives by detecting current leaking to earth.",
  "explanation": [
   "An earth-leakage unit (residual current device) compares current in the live and neutral conductors with a toroidal current transformer. If the difference (leakage to earth, e.g. through a person) exceeds its rating — 30 mA for personal protection — it trips quickly. It does not protect against overload or against a person touching live and neutral together.",
   "Test with the test button regularly (it simulates a leakage). Nuisance tripping is often caused by moisture, damaged elements (geysers, stoves) or neutral–earth faults."
  ],
  "formulas": [
   {
    "expr": "I_Δ = |I_L − I_N|",
    "desc": "residual current"
   }
  ],
  "example": {
   "problem": "A geyser circuit has 10.00 A in the live and 9.96 A in the neutral. Will a 30 mA RCD trip?",
   "steps": [
    "I_Δ = 10.00 − 9.96 = 0.04 A = 40 mA.",
    "40 mA > 30 mA → it trips (it is designed to trip between 50 % and 100 % of rating)."
   ],
   "answer": "Yes — 40 mA leakage"
  },
  "mistakes": [
   "Thinking an earth-leakage protects against live-to-neutral shock."
  ],
  "related": [
   "grounding-earthing",
   "electrical-safety-basics",
   "wiring-regulations-sans-10142",
   "fuses-circuit-breakers"
  ],
  "keywords": "rcd elcb earth leakage residual current 30ma"
 },
 {
  "id": "distribution-systems",
  "title": "Distribution systems & earthing arrangements",
  "levels": [
   "college",
   "university"
  ],
  "subject": "power",
  "summary": "Radial, ring and interconnected networks and TN/TT/IT earthing systems.",
  "explanation": [
   "Radial feeders are simple and cheap but a fault interrupts all downstream customers; ring (open-point) networks allow re-supply from the other side; interconnected meshes are most reliable. LV earthing systems: TN-C-S (combined PEN conductor, common in SA urban supplies), TN-S (separate neutral and earth from source), TT (consumer earth electrode), IT (isolated or impedance-earthed — hospitals, mines).",
   "Voltage regulation along feeders is maintained by tap-changers and capacitor banks."
  ],
  "formulas": [
   {
    "expr": "ΔV ≈ I(R cos φ + X sin φ)",
    "desc": "approximate feeder voltage drop"
   }
  ],
  "example": {
   "problem": "A feeder with R = 0.5 Ω, X = 0.4 Ω carries 100 A at PF 0.8 lag. Estimate the drop.",
   "steps": [
    "ΔV ≈ 100 × (0.5 × 0.8 + 0.4 × 0.6).",
    "= 100 × 0.64 = 64 V."
   ],
   "answer": "≈ 64 V"
  },
  "mistakes": [
   "Ignoring reactance in voltage-drop calculations of overhead lines."
  ],
  "related": [
   "power-systems",
   "grounding-earthing",
   "cable-sizing"
  ],
  "keywords": "radial ring tn-c-s tt it earthing system"
 },
 {
  "id": "load-flow",
  "title": "Load flow (power flow) studies",
  "levels": [
   "university"
  ],
  "subject": "power",
  "summary": "Solving for bus voltages and line flows in a network.",
  "explanation": [
   "Load-flow studies find the voltage magnitude and angle at every bus for given generation and load. Buses are classified as slack (V, δ fixed), PV (generator: P, |V| fixed) and PQ (load: P, Q fixed). The non-linear power equations are solved iteratively with Gauss-Seidel or Newton-Raphson using the bus admittance matrix Y_bus.",
   "Real power flow is mainly driven by angle difference, reactive power by voltage magnitude difference."
  ],
  "formulas": [
   {
    "expr": "P₁₂ ≈ (V₁V₂/X) sin δ₁₂",
    "desc": "real power over a lossless line"
   },
   {
    "expr": "S_i* = V_i* Σ Y_ik V_k",
    "desc": "bus power equation"
   }
  ],
  "example": {
   "problem": "V₁ = V₂ = 1 pu, X = 0.2 pu, δ = 10°. Find P transferred.",
   "steps": [
    "P = (1 × 1/0.2) × sin 10° = 5 × 0.1736.",
    "≈ 0.868 pu."
   ],
   "answer": "≈ 0.87 pu"
  },
  "mistakes": [
   "Assuming reactive power flows from higher angle — it follows voltage magnitude."
  ],
  "related": [
   "per-unit-system",
   "power-system-stability",
   "power-systems"
  ],
  "keywords": "power flow newton raphson gauss seidel ybus slack bus"
 },
 {
  "id": "power-system-stability",
  "title": "Power system stability",
  "levels": [
   "university"
  ],
  "subject": "power",
  "summary": "Keeping generators in synchronism after disturbances.",
  "explanation": [
   "Steady-state stability limit of a lossless link is P_max = V₁V₂/X at δ = 90°. Transient stability asks whether machines stay in step after a large disturbance (fault, line trip); the equal-area criterion answers this for one machine against an infinite bus. The swing equation relates rotor acceleration to the mismatch between mechanical and electrical power.",
   "Frequency stability depends on system inertia — falling as synchronous generators are replaced by inverter-based resources — and on governor response."
  ],
  "formulas": [
   {
    "expr": "(2H/ω_s)·d²δ/dt² = P_m − P_e",
    "desc": "swing equation"
   },
   {
    "expr": "P_max = V₁V₂ / X",
    "desc": "steady-state limit"
   }
  ],
  "example": {
   "problem": "V₁ = 1.0, V₂ = 1.0 pu, X = 0.5 pu. Find the steady-state power limit.",
   "steps": [
    "P_max = 1/0.5 = 2 pu."
   ],
   "answer": "2 pu"
  },
  "mistakes": [
   "Operating close to δ = 90°, leaving no margin for disturbances."
  ],
  "related": [
   "load-flow",
   "synchronous-machines",
   "power-systems"
  ],
  "keywords": "swing equation equal area criterion inertia transient stability"
 },
 {
  "id": "hvdc",
  "title": "HVDC transmission",
  "levels": [
   "university"
  ],
  "subject": "power",
  "summary": "Direct-current transmission for long distances and asynchronous links.",
  "explanation": [
   "HVDC converts AC to DC with line-commutated (thyristor) or voltage-source (IGBT) converters, transmits over two conductors (or one plus earth return), and inverts back. Advantages: no reactive charging current, lower line cost beyond the break-even distance (~600–800 km overhead, ~50 km submarine cable), controllable power flow and the ability to link grids of different frequency. The Cahora Bassa scheme (±533 kV, Mozambique–South Africa) is a classic example."
  ],
  "formulas": [
   {
    "expr": "P = V_dc × I_dc",
    "desc": "DC power"
   }
  ],
  "example": {
   "problem": "A ±500 kV bipole carries 2 kA. Find the transmitted power.",
   "steps": [
    "Total DC voltage between poles = 1 000 kV.",
    "P = 1 000 kV × 2 kA = 2 000 MW."
   ],
   "answer": "2 000 MW"
  },
  "mistakes": [
   "Assuming HVDC is always cheaper — converter stations are expensive."
  ],
  "related": [
   "power-electronics",
   "transmission-lines",
   "power-systems"
  ],
  "keywords": "hvdc converter bipole cahora bassa"
 },
 {
  "id": "renewable-energy-solar-pv",
  "title": "Solar PV & renewable energy systems",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "power",
  "summary": "PV cells, panels, MPPT, inverters and sizing home backup systems.",
  "explanation": [
   "A PV cell is a large-area p-n junction; light generates current. Panel datasheets give V_oc, I_sc, V_mp, I_mp and P_max at STC (1 000 W/m², 25 °C). Output falls with temperature (≈ −0.35 %/°C for P_max). An MPPT charge controller or inverter keeps the array at its maximum power point.",
   "Systems are grid-tied, off-grid or hybrid (battery backup). Sizing: daily energy ÷ peak sun hours ÷ system losses → array size. SA has excellent solar resource (~5–6 peak sun hours inland). Installations must comply with SANS 10142-1 and, for grid connection, NRS 097 and the municipality's requirements."
  ],
  "formulas": [
   {
    "expr": "P_array = E_day / (PSH × η_sys)",
    "desc": "array sizing"
   },
   {
    "expr": "Panels in series: V adds; parallel: I adds",
    "desc": "string design"
   }
  ],
  "example": {
   "problem": "A home needs 6 kWh/day, peak sun hours 5, system efficiency 0.8. Size the array.",
   "steps": [
    "P = 6 000/(5 × 0.8) = 1 500 W.",
    "e.g. four 400 W panels (1.6 kW)."
   ],
   "answer": "≈ 1.5 kWp"
  },
  "mistakes": [
   "Exceeding inverter maximum DC input voltage on cold mornings (V_oc rises when cold)."
  ],
  "related": [
   "batteries",
   "inverters",
   "dc-dc-converters",
   "power-generation",
   "semiconductors"
  ],
  "keywords": "solar pv panel mppt inverter peak sun hours off grid hybrid"
 },
 {
  "id": "wiring-regulations-sans-10142",
  "title": "Wiring regulations (SANS 10142-1 overview)",
  "levels": [
   "college"
  ],
  "subject": "installation",
  "summary": "South Africa's code for low-voltage installations and the CoC system.",
  "explanation": [
   "SANS 10142-1 \"The wiring of premises — Part 1: Low-voltage installations\" is the compulsory code (referenced by the Electrical Installation Regulations under the OHS Act 85 of 1993) for installations up to 1 000 V AC. It covers protection against shock and overcurrent, earthing and bonding, conductor sizing and voltage drop, isolation and switching, specific locations (bathrooms, swimming pools) and inspection and testing.",
   "Every installation (and any alteration) requires a Certificate of Compliance (CoC) issued by a registered person — electrical tester for single phase, installation electrician, or master installation electrician depending on scope. Typical requirements include earth-leakage protection (≤ 30 mA) on socket-outlet circuits and limits on voltage drop. Always check the current edition and amendments — this summary is for study, not design sign-off."
  ],
  "formulas": [
   {
    "expr": "Voltage drop: commonly limited to 5 % of nominal from supply point to any point",
    "desc": "design check"
   }
  ],
  "example": {
   "problem": "What is the maximum voltage drop for a 230 V circuit if the 5 % limit applies?",
   "steps": [
    "5 % × 230 = 11.5 V."
   ],
   "answer": "11.5 V"
  },
  "mistakes": [
   "Assuming a CoC is permanent — alterations and additions need a new CoC/supplementary certificate.",
   "Treating a summary as the code — always work from the current published edition."
  ],
  "related": [
   "coc-inspection-testing",
   "earth-leakage",
   "grounding-earthing",
   "cable-sizing",
   "ohs-safety"
  ],
  "keywords": "sans 10142 coc certificate of compliance wiring code registered person"
 },
 {
  "id": "grounding-earthing",
  "title": "Grounding / earthing & bonding",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "installation",
  "summary": "Connecting exposed metal to earth so faults trip protection and touch voltages stay safe.",
  "explanation": [
   "Protective earthing connects exposed conductive parts (appliance cases, metal DBs) to the earth terminal, giving fault current a low-impedance path so the breaker or earth-leakage unit trips quickly. Equipotential bonding links metal pipes, structural steel and other extraneous conductive parts so no dangerous voltage can exist between them.",
   "Earth electrode resistance depends on soil resistivity and electrode depth; earthing systems are TN-C-S, TN-S, TT and IT. Never use a gas pipe as an earth, and never connect neutral to earth anywhere except at the designated point."
  ],
  "formulas": [
   {
    "expr": "I_fault = U₀ / Z_s",
    "desc": "fault current from earth loop impedance"
   },
   {
    "expr": "t_disconnect requires Z_s ≤ U₀ / I_a",
    "desc": "maximum loop impedance"
   }
  ],
  "example": {
   "problem": "U₀ = 230 V and a breaker needs I_a = 100 A to trip instantly. Find the maximum Z_s.",
   "steps": [
    "Z_s ≤ 230/100 = 2.3 Ω."
   ],
   "answer": "2.3 Ω"
  },
  "mistakes": [
   "Bonding neutral and earth at sub-distribution boards (causes RCD trips and parallel neutral currents)."
  ],
  "related": [
   "earth-leakage",
   "distribution-systems",
   "coc-inspection-testing",
   "lightning-surge-protection"
  ],
  "keywords": "earthing grounding bonding earth electrode earth loop impedance"
 },
 {
  "id": "cable-sizing",
  "title": "Cable sizing & voltage drop",
  "levels": [
   "college",
   "university"
  ],
  "subject": "installation",
  "summary": "Selecting conductor size for current-carrying capacity, voltage drop and fault withstand.",
  "explanation": [
   "A cable must (1) carry the design current after derating for installation method, ambient temperature and grouping; (2) keep voltage drop within limits; (3) withstand fault current until protection operates (adiabatic equation). Manufacturers and SANS 10142-1 tables give current ratings and mV/A/m voltage-drop figures.",
   "Single-phase voltage drop uses the go-and-return length; three-phase drop uses √3 × phase drop."
  ],
  "formulas": [
   {
    "expr": "V_drop = (mV/A/m × I × L)/1 000",
    "desc": "table method"
   },
   {
    "expr": "V_drop = 2·I·R′·L (single-phase, R′ in Ω/m)",
    "desc": "resistance method"
   },
   {
    "expr": "S = √(I²t)/k",
    "desc": "adiabatic minimum CSA"
   }
  ],
  "example": {
   "problem": "A 2.5 mm² cable (18 mV/A/m) carries 16 A over 25 m. Find the voltage drop and % of 230 V.",
   "steps": [
    "V = 18 × 16 × 25/1 000 = 7.2 V.",
    "% = 7.2/230 ≈ 3.1 %."
   ],
   "answer": "7.2 V (3.1 %)"
  },
  "mistakes": [
   "Ignoring grouping and ambient derating factors.",
   "Using one-way length in the resistance method for single-phase."
  ],
  "related": [
   "resistance-resistivity",
   "fuses-circuit-breakers",
   "wiring-regulations-sans-10142"
  ],
  "keywords": "cable size voltage drop derating mv/a/m csa"
 },
 {
  "id": "lighting-circuits",
  "title": "Lighting circuits (one-way, two-way, intermediate)",
  "levels": [
   "school",
   "college"
  ],
  "subject": "installation",
  "summary": "Switching arrangements for lights in domestic installations.",
  "explanation": [
   "One-way: one switch controls a light, switching the live (never the neutral). Two-way: two switches with strappers (travellers) control a light from two places, e.g. top and bottom of stairs. Intermediate switches inserted between the two-way switches add more control points. Lighting circuits are typically protected at 10 A (check the code and design).",
   "LED lamps with electronic drivers may glow faintly when off if switch wiring or capacitance allows small leakage currents."
  ],
  "formulas": [
   {
    "expr": "Control points n: 2 two-way + (n − 2) intermediate switches",
    "desc": "switch count"
   }
  ],
  "example": {
   "problem": "How many and which switches are needed to control a passage light from 4 positions?",
   "steps": [
    "Two two-way switches at the ends.",
    "4 − 2 = 2 intermediate switches in between."
   ],
   "answer": "2 two-way + 2 intermediate"
  },
  "mistakes": [
   "Switching the neutral — the lamp holder stays live when \"off\"."
  ],
  "related": [
   "socket-outlet-circuits",
   "distribution-boards",
   "wiring-regulations-sans-10142"
  ],
  "keywords": "two way switching intermediate switch strapper lighting"
 },
 {
  "id": "socket-outlet-circuits",
  "title": "Socket-outlet (plug) circuits",
  "levels": [
   "school",
   "college"
  ],
  "subject": "installation",
  "summary": "Radial plug circuits, polarity and the SA plug standards.",
  "explanation": [
   "Socket-outlets are wired with live, neutral and earth; polarity must be correct (live to the correct pin). South Africa uses the SANS 164 family: the large 3-pin (type M, 15 A) and the newer SANS 164-2 (type N, 16 A) with the 2-pin Europlug compatible. Socket circuits are usually radial and protected by an MCB plus a 30 mA earth-leakage unit.",
   "The number of outlets per circuit is limited by the code and design current; heavy fixed appliances (stoves, geysers) get dedicated circuits."
  ],
  "formulas": [
   {
    "expr": "I_design = ΣP / V",
    "desc": "circuit design current"
   }
  ],
  "example": {
   "problem": "A plug circuit supplies a 2 kW heater and a 1.2 kW kettle at 230 V. Find the current.",
   "steps": [
    "P = 3 200 W.",
    "I = 3 200/230 ≈ 13.9 A."
   ],
   "answer": "≈ 13.9 A"
  },
  "mistakes": [
   "Reversed polarity — appliance switches then break the neutral, leaving internals live."
  ],
  "related": [
   "lighting-circuits",
   "earth-leakage",
   "distribution-boards",
   "fuses-circuit-breakers"
  ],
  "keywords": "plug socket outlet sans 164 polarity radial"
 },
 {
  "id": "distribution-boards",
  "title": "Distribution boards (DB) layout",
  "levels": [
   "school",
   "college"
  ],
  "subject": "installation",
  "summary": "The DB: main switch, earth leakage, circuit breakers, busbars and labelling.",
  "explanation": [
   "A typical domestic DB contains a main switch (isolator), surge protection, an earth-leakage unit protecting socket circuits, individual MCBs for each circuit, neutral and earth bars, and labels identifying each circuit. The supply authority's meter and main breaker sit upstream. Prepaid meters and smart meters are now common.",
   "Neutrals for circuits protected by an RCD must go to the RCD's neutral bar, not the main neutral bar, or the RCD will trip."
  ],
  "formulas": [
   {
    "expr": "Diversity: max demand < sum of connected loads",
    "desc": "design concept"
   }
  ],
  "example": {
   "problem": "Why might a new circuit trip the earth-leakage unit immediately even though it has no fault?",
   "steps": [
    "Its neutral may be connected to the main (non-RCD) neutral bar while the live goes through the RCD.",
    "The RCD sees an imbalance equal to the load current."
   ],
   "answer": "Neutral on the wrong neutral bar"
  },
  "mistakes": [
   "Mixing neutrals between RCD-protected and unprotected circuits."
  ],
  "related": [
   "earth-leakage",
   "fuses-circuit-breakers",
   "socket-outlet-circuits",
   "wiring-regulations-sans-10142"
  ],
  "keywords": "db board distribution board main switch neutral bar"
 },
 {
  "id": "coc-inspection-testing",
  "title": "Inspection & testing (CoC tests)",
  "levels": [
   "college"
  ],
  "subject": "installation",
  "summary": "The tests a registered person performs before issuing a Certificate of Compliance.",
  "explanation": [
   "Inspection: visual check of workmanship, correct cable sizes, protection ratings, labelling, IP ratings and special locations. Tests typically include continuity of protective (earth) conductors, insulation resistance (insulation tester at 500 V DC for LV circuits), polarity, earth-loop impedance or earth resistance, and earth-leakage trip operation (trip current and time).",
   "Results are recorded on the test report. Insulation resistance must exceed the minimum in the current SANS 10142-1 edition; low readings point to moisture, damaged cable or connected loads."
  ],
  "formulas": [
   {
    "expr": "R_ins = V_test / I_leak",
    "desc": "insulation resistance"
   }
  ],
  "example": {
   "problem": "An insulation tester applies 500 V DC and measures 0.25 µA leakage. Find the insulation resistance.",
   "steps": [
    "R = 500/0.25×10⁻⁶ = 2 × 10⁹ Ω."
   ],
   "answer": "2 GΩ"
  },
  "mistakes": [
   "Insulation-testing with electronic equipment connected — it can damage them and gives false low readings."
  ],
  "related": [
   "wiring-regulations-sans-10142",
   "instrumentation",
   "grounding-earthing",
   "earth-leakage"
  ],
  "keywords": "insulation resistance megger continuity polarity test coc"
 },
 {
  "id": "lightning-surge-protection",
  "title": "Lightning & surge protection",
  "levels": [
   "college",
   "university"
  ],
  "subject": "installation",
  "summary": "Protecting buildings and equipment from lightning and switching surges.",
  "explanation": [
   "Lightning protection systems (air terminals, down conductors, earth termination) intercept direct strikes. Surge protective devices (SPDs: Type 1 at the origin for lightning current, Type 2 at DBs, Type 3 near sensitive equipment) divert transient over-voltages to earth, usually using metal-oxide varistors (MOVs) or spark gaps. Highveld areas of South Africa have very high lightning ground-flash density.",
   "SPD effectiveness depends on short, straight connection leads — every metre of lead adds about 1 kV of inductive voltage during a surge."
  ],
  "formulas": [
   {
    "expr": "V = L·di/dt",
    "desc": "lead voltage during surge"
   }
  ],
  "example": {
   "problem": "A surge rising at 10 kA/µs flows through a 1 m SPD lead with 1 µH/m. Find the added voltage.",
   "steps": [
    "V = L di/dt = 1×10⁻⁶ × 10×10³/10⁻⁶.",
    "= 10 000 V = 10 kV."
   ],
   "answer": "10 kV"
  },
  "mistakes": [
   "Installing SPDs with long, looped leads."
  ],
  "related": [
   "grounding-earthing",
   "inductors",
   "protection"
  ],
  "keywords": "surge spd mov lightning arrestor"
 },
 {
  "id": "ohs-safety",
  "title": "Occupational health & safety (OHS Act, lockout)",
  "levels": [
   "school",
   "college"
  ],
  "subject": "installation",
  "summary": "Legal and practical safety for electrical work in South Africa.",
  "explanation": [
   "The Occupational Health and Safety Act 85 of 1993 places duties on employers and employees; the Electrical Installation Regulations require registered persons and CoCs, and the Electrical Machinery Regulations govern machinery. Safe isolation procedure: identify, switch off, isolate, lock out and tag, test for dead with a proven tester, apply earths where required, then work.",
   "PPE (arc-rated clothing, insulated gloves, safety glasses) is the last line of defence. Arc-flash can cause serious burns even without shock."
  ],
  "formulas": [
   {
    "expr": "Prove – test – prove",
    "desc": "tester verification sequence"
   }
  ],
  "example": {
   "problem": "Put the safe isolation steps in order.",
   "steps": [
    "Identify the circuit → switch off → isolate and lock out → tag.",
    "Prove tester on known live → test for dead → re-prove tester → begin work."
   ],
   "answer": "Identify, switch off, isolate, lock & tag, prove-test-prove, work"
  },
  "mistakes": [
   "Relying on someone else's word that a circuit is off."
  ],
  "related": [
   "electrical-safety-basics",
   "wiring-regulations-sans-10142",
   "earth-leakage"
  ],
  "keywords": "ohs act lockout tagout loto ppe arc flash isolation"
 }
];

export default topics;
