// AUTO-GENERATED study content for the Electrical Theory library. Edit the source content, not this file by hand.
import type { TheoryTopic } from '../types';

const topics: TheoryTopic[] = [
 {
  "id": "si-units",
  "title": "Units & SI prefixes",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "fundamentals",
  "summary": "The SI base and derived units used in electrical work, and the prefixes that scale them.",
  "explanation": [
   "Every electrical quantity is measured in an SI unit built from seven base units (metre, kilogram, second, ampere, kelvin, mole, candela). The ampere is the electrical base unit; volts, ohms, watts, coulombs, farads, henrys, teslas and webers are all derived from it together with the metre, kilogram and second.",
   "Engineering prefixes move the decimal point in steps of 10³: p (10⁻¹²), n (10⁻⁹), µ (10⁻⁶), m (10⁻³), k (10³), M (10⁶), G (10⁹). Always convert to base units before substituting into a formula, then convert the answer back to a convenient prefix."
  ],
  "formulas": [
   {
    "expr": "1 V = 1 W/A = 1 J/C",
    "desc": "volt defined from power or energy per charge"
   },
   {
    "expr": "1 Ω = 1 V/A",
    "desc": "ohm"
   },
   {
    "expr": "1 C = 1 A·s",
    "desc": "coulomb"
   },
   {
    "expr": "1 kWh = 3.6 × 10⁶ J",
    "desc": "billing unit of energy"
   }
  ],
  "example": {
   "problem": "Express 4.7 kΩ, 220 nF and 0.0033 A in base units and in the most convenient prefix.",
   "steps": [
    "4.7 kΩ = 4.7 × 10³ Ω = 4 700 Ω.",
    "220 nF = 220 × 10⁻⁹ F = 2.2 × 10⁻⁷ F (or 0.22 µF).",
    "0.0033 A = 3.3 × 10⁻³ A = 3.3 mA."
   ],
   "answer": "4 700 Ω; 2.2 × 10⁻⁷ F; 3.3 mA"
  },
  "mistakes": [
   "Confusing m (milli, 10⁻³) with M (mega, 10⁶).",
   "Writing units in plural or with a full stop (\"kms.\") — SI symbols never change.",
   "Squaring a prefix incorrectly: 1 mm² = 10⁻⁶ m², not 10⁻³ m²."
  ],
  "related": [
   "ohms-law",
   "power-energy",
   "cost-of-electricity"
  ],
  "keywords": "units prefixes metric engineering notation"
 },
 {
  "id": "electric-charge",
  "title": "Electric charge & atomic structure",
  "levels": [
   "school",
   "college"
  ],
  "subject": "fundamentals",
  "summary": "Where charge comes from, the coulomb, and why metals conduct.",
  "explanation": [
   "Matter is made of atoms: a nucleus of protons (+) and neutrons surrounded by electrons (−). The elementary charge is e = 1.602 × 10⁻¹⁹ C. An object is charged when it has gained or lost electrons; charge is conserved and quantised.",
   "In metals the outer (valence) electrons are loosely bound and form a \"sea\" of free electrons. An applied electric field makes them drift, producing current. Insulators have tightly bound electrons; semiconductors sit in between and their conductivity can be controlled by doping and temperature."
  ],
  "formulas": [
   {
    "expr": "Q = n·e",
    "desc": "charge from number of electrons"
   },
   {
    "expr": "Q = I·t",
    "desc": "charge moved by a steady current"
   }
  ],
  "example": {
   "problem": "How many electrons pass a point when 2 A flows for 5 s?",
   "steps": [
    "Q = I·t = 2 × 5 = 10 C.",
    "n = Q/e = 10 / 1.602 × 10⁻¹⁹ ≈ 6.24 × 10¹⁹ electrons."
   ],
   "answer": "≈ 6.24 × 10¹⁹ electrons"
  },
  "mistakes": [
   "Thinking protons move in a metal conductor — only electrons drift.",
   "Forgetting conventional current flows opposite to electron flow."
  ],
  "related": [
   "current",
   "static-electricity",
   "conductors-insulators"
  ],
  "keywords": "coulomb electron proton atom"
 },
 {
  "id": "current",
  "title": "Electric current",
  "levels": [
   "school",
   "college"
  ],
  "subject": "fundamentals",
  "summary": "Current is the rate of flow of charge, measured in amperes.",
  "explanation": [
   "Current I is the charge passing a cross-section per second. By convention it flows from + to − outside a source (conventional current), although electrons actually drift from − to +. Electron drift velocity is tiny (fractions of a mm/s) but the field that pushes them travels at nearly the speed of light, which is why a lamp lights instantly.",
   "Direct current (DC) flows in one direction; alternating current (AC) reverses periodically. Current is measured with an ammeter connected in series, which must have a very low resistance so it does not disturb the circuit."
  ],
  "formulas": [
   {
    "expr": "I = Q / t",
    "desc": "current from charge and time"
   },
   {
    "expr": "I = n·A·v·e",
    "desc": "current from carrier density n, area A, drift velocity v"
   }
  ],
  "example": {
   "problem": "A phone charger delivers 3 600 C of charge in 30 minutes. Find the average current.",
   "steps": [
    "t = 30 × 60 = 1 800 s.",
    "I = Q/t = 3 600 / 1 800 = 2 A."
   ],
   "answer": "2 A"
  },
  "mistakes": [
   "Connecting an ammeter in parallel — it will short the supply and blow its fuse.",
   "Forgetting to convert minutes or hours to seconds."
  ],
  "related": [
   "electric-charge",
   "ohms-law",
   "kirchhoff-laws",
   "alternating-current"
  ],
  "keywords": "ampere ammeter conventional current drift"
 },
 {
  "id": "voltage-emf",
  "title": "Voltage, potential difference & EMF",
  "levels": [
   "school",
   "college"
  ],
  "subject": "fundamentals",
  "summary": "Potential difference is energy per unit charge; EMF is the energy a source gives each coulomb.",
  "explanation": [
   "The potential difference (p.d.) between two points is the work done per coulomb moving charge between them: 1 V = 1 J/C. A source's electromotive force (EMF, ε) is the energy it converts to electrical form per coulomb. Under load, terminal voltage is less than EMF because of internal resistance.",
   "Voltage is measured with a voltmeter connected in parallel across the component; an ideal voltmeter has infinite resistance so it draws no current. Voltage is always measured between two points — \"the voltage at a node\" means relative to a reference (ground/0 V)."
  ],
  "formulas": [
   {
    "expr": "V = W / Q",
    "desc": "potential difference from work and charge"
   },
   {
    "expr": "V = ε − I·r",
    "desc": "terminal voltage of a real source"
   }
  ],
  "example": {
   "problem": "54 J of energy is used to move 4.5 C through a lamp. What is the p.d. across it?",
   "steps": [
    "V = W/Q = 54 / 4.5 = 12 V."
   ],
   "answer": "12 V"
  },
  "mistakes": [
   "Connecting a voltmeter in series — it will read nearly the full supply and the circuit stops working.",
   "Treating EMF and terminal voltage as always equal."
  ],
  "related": [
   "internal-resistance",
   "ohms-law",
   "kirchhoff-laws"
  ],
  "keywords": "volt pd potential difference emf electromotive force voltmeter"
 },
 {
  "id": "resistance-resistivity",
  "title": "Resistance & resistivity",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "fundamentals",
  "summary": "Resistance opposes current and depends on material, length, area and temperature.",
  "explanation": [
   "Resistance R = V/I is measured in ohms. For a uniform conductor it is proportional to length and inversely proportional to cross-sectional area. Resistivity ρ (Ω·m) is the material property: copper ≈ 1.72 × 10⁻⁸ Ω·m, aluminium ≈ 2.82 × 10⁻⁸ Ω·m.",
   "Conductance G = 1/R is measured in siemens (S). Doubling a wire's length doubles R; doubling its diameter quarters R because area goes up four times. This is why long cable runs need larger conductors."
  ],
  "formulas": [
   {
    "expr": "R = ρ·L / A",
    "desc": "resistance of a conductor"
   },
   {
    "expr": "G = 1 / R",
    "desc": "conductance in siemens"
   },
   {
    "expr": "A = π·d² / 4",
    "desc": "area of a round conductor"
   }
  ],
  "example": {
   "problem": "Find the resistance of 100 m of copper wire with cross-section 2.5 mm² (ρ = 1.72 × 10⁻⁸ Ω·m).",
   "steps": [
    "A = 2.5 mm² = 2.5 × 10⁻⁶ m².",
    "R = ρL/A = 1.72 × 10⁻⁸ × 100 / 2.5 × 10⁻⁶ = 0.688 Ω."
   ],
   "answer": "≈ 0.69 Ω"
  },
  "mistakes": [
   "Using mm² directly without converting to m².",
   "Using diameter instead of area, or radius instead of diameter in πd²/4."
  ],
  "related": [
   "temperature-coefficient",
   "ohms-law",
   "cable-sizing"
  ],
  "keywords": "resistivity conductance siemens wire gauge"
 },
 {
  "id": "ohms-law",
  "title": "Ohm's law",
  "levels": [
   "school",
   "college"
  ],
  "subject": "fundamentals",
  "summary": "For an ohmic conductor at constant temperature, current is proportional to voltage.",
  "explanation": [
   "Ohm's law states V = I·R. It holds for \"ohmic\" components (metal resistors at constant temperature) whose V–I graph is a straight line through the origin; the gradient of V against I is R. Lamps (filament heats up), diodes and thermistors are non-ohmic.",
   "Ohm's law is the workhorse of circuit analysis: apply it to individual components or to whole equivalent resistances, always using values that belong to the same component."
  ],
  "formulas": [
   {
    "expr": "V = I·R",
    "desc": "Ohm's law"
   },
   {
    "expr": "I = V / R",
    "desc": "current form"
   },
   {
    "expr": "R = V / I",
    "desc": "resistance form"
   }
  ],
  "example": {
   "problem": "A 230 V kettle element draws 8.7 A. What is its hot resistance?",
   "steps": [
    "R = V/I = 230 / 8.7 ≈ 26.4 Ω."
   ],
   "answer": "≈ 26.4 Ω"
  },
  "mistakes": [
   "Mixing the voltage of one component with the current of another.",
   "Applying Ohm's law to a diode or lamp as if R were constant.",
   "Forgetting prefix conversions (kΩ, mA)."
  ],
  "related": [
   "power-energy",
   "series-circuits",
   "parallel-circuits",
   "resistance-resistivity"
  ],
  "keywords": "ohm law V=IR"
 },
 {
  "id": "power-energy",
  "title": "Electrical power & energy",
  "levels": [
   "school",
   "college"
  ],
  "subject": "fundamentals",
  "summary": "Power is the rate of energy transfer; P = VI and its Ohm's-law variants.",
  "explanation": [
   "Electrical power P (watts) is the rate at which energy is converted: P = W/t. Combining with Ohm's law gives P = VI = I²R = V²/R. Energy is W = P·t, measured in joules or, for billing, kilowatt-hours.",
   "The I²R form shows why transmission uses high voltage: for the same power, a higher voltage means less current and the line losses fall with the square of current. Efficiency η = P_out / P_in."
  ],
  "formulas": [
   {
    "expr": "P = V·I = I²·R = V²/R",
    "desc": "power"
   },
   {
    "expr": "W = P·t",
    "desc": "energy"
   },
   {
    "expr": "η = P_out / P_in × 100 %",
    "desc": "efficiency"
   }
  ],
  "example": {
   "problem": "A 12 V car headlamp is rated 60 W. Find its current and the energy used in 2 hours.",
   "steps": [
    "I = P/V = 60/12 = 5 A.",
    "W = P·t = 60 × 7 200 s = 432 000 J = 0.12 kWh."
   ],
   "answer": "5 A; 432 kJ (0.12 kWh)"
  },
  "mistakes": [
   "Using P = V²/R with the supply voltage when the component only sees part of it.",
   "Mixing kW with hours and seconds incorrectly."
  ],
  "related": [
   "cost-of-electricity",
   "ohms-law",
   "ac-power"
  ],
  "keywords": "watt joule energy efficiency I2R"
 },
 {
  "id": "cost-of-electricity",
  "title": "Cost of electricity (kWh billing)",
  "levels": [
   "school",
   "college"
  ],
  "subject": "fundamentals",
  "summary": "Calculating energy use and cost from appliance ratings and tariffs.",
  "explanation": [
   "Utilities bill energy in kilowatt-hours: 1 kWh = 1 kW used for 1 hour. Energy (kWh) = power (kW) × time (h). Multiply by the tariff (R/kWh) for the cost. Prepaid meters in South Africa simply deduct kWh units.",
   "Reducing cost means reducing either power or running time — e.g. replacing a 60 W incandescent lamp with a 9 W LED saves 51 W for every hour it is on."
  ],
  "formulas": [
   {
    "expr": "E(kWh) = P(kW) × t(h)",
    "desc": "energy in kWh"
   },
   {
    "expr": "Cost = E × tariff",
    "desc": "cost"
   }
  ],
  "example": {
   "problem": "A 2 kW geyser element runs 3 h a day for 30 days at R2.80/kWh. Find the monthly cost.",
   "steps": [
    "E = 2 × 3 × 30 = 180 kWh.",
    "Cost = 180 × 2.80 = R504."
   ],
   "answer": "R504"
  },
  "mistakes": [
   "Using watts instead of kilowatts (giving a cost 1 000× too high).",
   "Using minutes instead of hours."
  ],
  "related": [
   "power-energy",
   "si-units"
  ],
  "keywords": "kwh tariff bill prepaid units"
 },
 {
  "id": "conductors-insulators",
  "title": "Conductors, insulators & semiconductors",
  "levels": [
   "school",
   "college"
  ],
  "subject": "fundamentals",
  "summary": "Materials classified by how easily charge moves through them.",
  "explanation": [
   "Conductors (copper, aluminium, silver) have many free electrons and very low resistivity. Insulators (PVC, rubber, glass, mica, porcelain) have almost no free carriers and very high resistivity; they are rated by dielectric strength (kV/mm) before breakdown.",
   "Semiconductors (silicon, germanium) have resistivity between the two and a negative temperature coefficient: they conduct better when hot. Energy-band theory explains this: conductors have overlapping bands, insulators a wide band gap (> ~5 eV) and semiconductors a small gap (Si ≈ 1.12 eV)."
  ],
  "formulas": [
   {
    "expr": "ρ_conductor ~ 10⁻⁸ Ω·m, ρ_insulator > 10¹⁰ Ω·m",
    "desc": "typical ranges"
   }
  ],
  "example": {
   "problem": "Why are overhead lines made of aluminium (ACSR) rather than copper?",
   "steps": [
    "Aluminium has about 61 % of copper's conductivity but only about 30 % of its density.",
    "For the same resistance an aluminium conductor is roughly half the mass and much cheaper; the steel core provides tensile strength."
   ],
   "answer": "Better conductivity-to-weight ratio and lower cost"
  },
  "mistakes": [
   "Assuming insulators never conduct — every insulator breaks down at a high enough field.",
   "Thinking semiconductors behave like metals with temperature."
  ],
  "related": [
   "semiconductors",
   "resistance-resistivity",
   "dielectrics"
  ],
  "keywords": "insulator conductor band gap dielectric strength"
 },
 {
  "id": "temperature-coefficient",
  "title": "Temperature coefficient of resistance",
  "levels": [
   "college",
   "university"
  ],
  "subject": "fundamentals",
  "summary": "How resistance changes with temperature.",
  "explanation": [
   "For most metals resistance rises roughly linearly with temperature. The temperature coefficient α (per °C) quantifies this; copper α₀ ≈ 0.00427 /°C referred to 0 °C (≈ 0.00393 /°C at 20 °C). Carbon, semiconductors and NTC thermistors have negative coefficients.",
   "This effect is used in RTDs (Pt100: 100 Ω at 0 °C) and to estimate the temperature rise of motor windings from cold and hot resistance measurements."
  ],
  "formulas": [
   {
    "expr": "R_t = R₀(1 + α₀·t)",
    "desc": "resistance at t °C referred to 0 °C"
   },
   {
    "expr": "R₂/R₁ = (1 + α₀t₂)/(1 + α₀t₁)",
    "desc": "ratio between two temperatures"
   }
  ],
  "example": {
   "problem": "A copper coil is 40 Ω at 20 °C. Find its resistance at 80 °C (α₀ = 0.00427 /°C).",
   "steps": [
    "R₈₀ = R₂₀ × (1 + 0.00427×80)/(1 + 0.00427×20).",
    "= 40 × 1.3416/1.0854 ≈ 49.4 Ω."
   ],
   "answer": "≈ 49.4 Ω"
  },
  "mistakes": [
   "Using R₂₀ in R₀(1 + α₀t) as if it were R₀.",
   "Ignoring the sign of α for carbon or semiconductors."
  ],
  "related": [
   "resistance-resistivity",
   "sensors-transducers"
  ],
  "keywords": "alpha rtd pt100 thermistor ntc ptc"
 },
 {
  "id": "electrical-safety-basics",
  "title": "Electrical safety & effects of current on the body",
  "levels": [
   "school",
   "college"
  ],
  "subject": "fundamentals",
  "summary": "Why current, not voltage, kills and the basic rules of safe work.",
  "explanation": [
   "Danger depends on the current through the body, its path and duration. Roughly: 1 mA is perceptible, ~10 mA causes \"can't let go\" muscle contraction, 30 mA+ can cause breathing difficulty, and 50–100 mA across the chest can cause ventricular fibrillation. Body resistance falls sharply when skin is wet, so 230 V mains is lethal.",
   "Protection relies on insulation, enclosures, earthing, earth-leakage units (30 mA) and safe work practice: isolate, lock out, tag, test for dead with a proven tester, and only then work. Never work live unless qualified, authorised and equipped."
  ],
  "formulas": [
   {
    "expr": "I_body = V / R_body",
    "desc": "current through the body"
   }
  ],
  "example": {
   "problem": "If wet skin body resistance is 1 000 Ω, what current flows when touching 230 V to earth?",
   "steps": [
    "I = V/R = 230/1 000 = 0.23 A = 230 mA.",
    "This is well above the fibrillation threshold — potentially fatal."
   ],
   "answer": "230 mA (lethal)"
  },
  "mistakes": [
   "Believing low current ratings make a circuit safe; a 20 A circuit can drive lethal mA through a body.",
   "Testing for dead with an unproven tester — prove it on a known live source before and after."
  ],
  "related": [
   "earth-leakage",
   "grounding-earthing",
   "ohs-safety"
  ],
  "keywords": "shock electrocution lockout safety fibrillation"
 },
 {
  "id": "static-electricity",
  "title": "Static electricity & ESD",
  "levels": [
   "school",
   "college"
  ],
  "subject": "fundamentals",
  "summary": "Charging by friction, induction and the danger of electrostatic discharge to electronics.",
  "explanation": [
   "Rubbing two different materials transfers electrons: one becomes negative, the other positive (triboelectric effect). Like charges repel, unlike attract. Charge can also be induced in a nearby conductor without contact.",
   "Electrostatic discharge (ESD) of a few hundred volts — below what you can feel (~3 kV) — can destroy MOSFET gates and ICs. Repair benches use wrist straps through a 1 MΩ resistor to earth, ESD mats and anti-static bags."
  ],
  "formulas": [
   {
    "expr": "F = k·Q₁Q₂ / r²",
    "desc": "Coulomb's law (k = 8.99 × 10⁹ N·m²/C²)"
   }
  ],
  "example": {
   "problem": "Why does an ESD wrist strap include a 1 MΩ resistor rather than a direct wire to earth?",
   "steps": [
    "It bleeds static charge away safely and slowly.",
    "It limits current to well under 1 mA if the wearer touches 230 V, protecting the person."
   ],
   "answer": "Safe bleed of charge and personal protection"
  },
  "mistakes": [
   "Assuming no spark felt means no damage — ICs fail well below the threshold of feeling."
  ],
  "related": [
   "electric-fields",
   "electric-charge",
   "mosfet"
  ],
  "keywords": "esd triboelectric wrist strap"
 },
 {
  "id": "heating-effect",
  "title": "Heating, chemical & magnetic effects of current",
  "levels": [
   "school",
   "college"
  ],
  "subject": "fundamentals",
  "summary": "The three main effects of current and where each is used.",
  "explanation": [
   "Heating effect: current through resistance produces heat (Joule heating, P = I²R) — used in kettles, stoves, fuses and incandescent lamps. Chemical effect: current through an electrolyte causes chemical change — electrolysis, electroplating and battery charging. Magnetic effect: a current produces a magnetic field — relays, motors, solenoids, transformers.",
   "A fuse uses the heating effect deliberately: its element melts when current exceeds its rating for long enough."
  ],
  "formulas": [
   {
    "expr": "H = I²·R·t",
    "desc": "heat produced (joules)"
   }
  ],
  "example": {
   "problem": "How much heat does a 10 Ω resistor produce carrying 2 A for 1 minute?",
   "steps": [
    "H = I²Rt = 2² × 10 × 60 = 2 400 J."
   ],
   "answer": "2.4 kJ"
  },
  "mistakes": [
   "Thinking a fuse protects people from shock — it protects cables from overcurrent."
  ],
  "related": [
   "power-energy",
   "fuses-circuit-breakers",
   "electromagnetism",
   "batteries"
  ],
  "keywords": "joule heating electrolysis electroplating"
 },
 {
  "id": "batteries",
  "title": "Batteries & cells",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "fundamentals",
  "summary": "Primary and secondary cells, capacity, C-rate and series/parallel connection.",
  "explanation": [
   "A cell converts chemical energy to electrical energy. Primary cells (alkaline, zinc-carbon, lithium coin) are not rechargeable; secondary cells (lead-acid 2.0 V, NiMH 1.2 V, Li-ion 3.6–3.7 V nominal, LiFePO₄ 3.2 V) are. Capacity is in ampere-hours (Ah); energy in Wh = Ah × V.",
   "Cells in series add voltages (same Ah); cells in parallel add capacities (same voltage). C-rate expresses current relative to capacity: 1C on a 100 Ah battery is 100 A. Depth of discharge (DoD) limits lifespan — lead-acid prefers ≤ 50 % DoD, LiFePO₄ tolerates ~80–90 %."
  ],
  "formulas": [
   {
    "expr": "E(Wh) = V × Ah",
    "desc": "stored energy"
   },
   {
    "expr": "t ≈ Ah / I",
    "desc": "ideal runtime"
   },
   {
    "expr": "n_series × V_cell",
    "desc": "pack voltage"
   }
  ],
  "example": {
   "problem": "A 12 V 100 Ah lead-acid battery powers a 120 W load through a 90 %-efficient inverter at 50 % DoD. Estimate runtime.",
   "steps": [
    "Usable energy = 12 × 100 × 0.5 = 600 Wh.",
    "Battery-side power = 120/0.9 ≈ 133 W.",
    "t = 600/133 ≈ 4.5 h."
   ],
   "answer": "≈ 4.5 h"
  },
  "mistakes": [
   "Adding Ah of series cells (wrong — only voltage adds).",
   "Ignoring inverter efficiency and DoD when sizing backup systems (load-shedding)."
  ],
  "related": [
   "internal-resistance",
   "inverters",
   "renewable-energy-solar-pv",
   "voltage-emf"
  ],
  "keywords": "battery cell lithium lead acid ah c-rate dod"
 }
];

export default topics;
