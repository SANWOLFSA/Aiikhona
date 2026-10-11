// AUTO-GENERATED study content for the Electrical Theory library. Edit the source content, not this file by hand.
import type { TheoryQuestion } from '../types';

const questions: TheoryQuestion[] = [
 {
  "id": "sch-001",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "si-units",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "What is the SI unit of electrical resistance?",
  "options": [
   "Ampere",
   "Ohm",
   "Volt",
   "Siemens"
  ],
  "answerIndex": 1,
  "solution": "Resistance is measured in ohms (Ω); 1 Ω = 1 V/A. Siemens is the unit of conductance, the reciprocal."
 },
 {
  "id": "sch-002",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "si-units",
  "difficulty": 1,
  "type": "numeric",
  "prompt": "How many milliamperes are there in 0.25 A?",
  "answer": 250.0,
  "unit": "mA",
  "tolerance": 0.001,
  "solution": "1 A = 1 000 mA, so 0.25 A × 1 000 = 250 mA."
 },
 {
  "id": "sch-003",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "si-units",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "The prefix \"µ\" (micro) represents which multiplier?",
  "options": [
   "10⁻⁶",
   "10⁻⁹",
   "10⁻³",
   "10⁶"
  ],
  "answerIndex": 0,
  "solution": "micro = 10⁻⁶; milli = 10⁻³, nano = 10⁻⁹, mega = 10⁶."
 },
 {
  "id": "sch-004",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "si-units",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "Express 4.7 kΩ in ohms.",
  "answer": 4700.0,
  "unit": "Ω",
  "tolerance": 0.001,
  "solution": "k = 10³, so 4.7 × 1 000 = 4700 Ω."
 },
 {
  "id": "sch-005",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "electric-charge",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "Which particle is free to move and carries current in a metal wire?",
  "options": [
   "Positive ion",
   "Neutron",
   "Electron",
   "Proton"
  ],
  "answerIndex": 2,
  "solution": "In metals the loosely bound valence electrons drift through the lattice; the positive ions stay fixed."
 },
 {
  "id": "sch-006",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "electric-charge",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A current of 3 A flows for 20 s. How much charge passes a point (in coulombs)?",
  "answer": 60.0,
  "unit": "C",
  "tolerance": 0.02,
  "solution": "Q = I·t = 3 × 20 = 60 C."
 },
 {
  "id": "sch-007",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "electric-charge",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "What is the charge on one electron?",
  "options": [
   "−1.6 × 10⁻¹⁹ C",
   "−1 C",
   "−1.6 × 10¹⁹ C",
   "−9.1 × 10⁻³¹ C"
  ],
  "answerIndex": 0,
  "solution": "The elementary charge is e ≈ 1.602 × 10⁻¹⁹ C; an electron carries −e. 9.1 × 10⁻³¹ kg is its mass."
 },
 {
  "id": "sch-008",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "current",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "Current is defined as…",
  "options": [
   "the rate of flow of charge",
   "the energy per unit charge",
   "the opposition to the flow of charge",
   "the work done per second"
  ],
  "answerIndex": 0,
  "solution": "I = Q/t: charge per unit time. Energy per charge is voltage; opposition is resistance; work per second is power."
 },
 {
  "id": "sch-009",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "current",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "How must an ammeter be connected to measure current through a resistor?",
  "options": [
   "Across the supply",
   "In parallel with the resistor",
   "Either way, it does not matter",
   "In series with the resistor"
  ],
  "answerIndex": 3,
  "solution": "All the current must pass through the ammeter, so it goes in series. It has very low resistance; in parallel it would act as a short circuit."
 },
 {
  "id": "sch-010",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "current",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A charge of 360 C flows through a lamp in 2 minutes. Find the current.",
  "answer": 3.0,
  "unit": "A",
  "tolerance": 0.02,
  "solution": "t = 2 × 60 = 120 s; I = Q/t = 360/120 = 3 A."
 },
 {
  "id": "sch-011",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "voltage-emf",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "A voltmeter should have…",
  "options": [
   "a very high resistance and be connected in parallel",
   "a very high resistance and be connected in series",
   "a very low resistance and be connected in series",
   "a very low resistance and be connected in parallel"
  ],
  "answerIndex": 0,
  "solution": "A voltmeter measures the p.d. between two points so it goes in parallel, and its high resistance means it draws negligible current."
 },
 {
  "id": "sch-012",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "voltage-emf",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "90 J of work is done moving 6 C of charge through a resistor. What is the potential difference across it?",
  "answer": 15.0,
  "unit": "V",
  "tolerance": 0.02,
  "solution": "V = W/Q = 90/6 = 15 V."
 },
 {
  "id": "sch-013",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "voltage-emf",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "A battery has EMF 9 V. When a load is connected the terminal voltage drops to 8.4 V. Why?",
  "options": [
   "The load produces a back-EMF",
   "The voltmeter is faulty",
   "The EMF has decreased",
   "Some voltage is \"lost\" across the battery's internal resistance"
  ],
  "answerIndex": 3,
  "solution": "V = ε − Ir. The \"lost volts\" Ir are dropped across the internal resistance when current flows."
 },
 {
  "id": "sch-014",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "ohms-law",
  "difficulty": 1,
  "type": "numeric",
  "prompt": "A 12 V supply is connected across a 4 Ω resistor. What current flows?",
  "answer": 3.0,
  "unit": "A",
  "tolerance": 0.02,
  "solution": "I = V/R = 12/4 = 3 A."
 },
 {
  "id": "sch-015",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "ohms-law",
  "difficulty": 1,
  "type": "numeric",
  "prompt": "A resistor carries 0.5 A when 10 V is across it. Find its resistance.",
  "answer": 20.0,
  "unit": "Ω",
  "tolerance": 0.02,
  "solution": "R = V/I = 10/0.5 = 20 Ω."
 },
 {
  "id": "sch-016",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "ohms-law",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "What voltage is needed to drive 25 mA through a 2.2 kΩ resistor?",
  "answer": 55.0,
  "unit": "V",
  "tolerance": 0.02,
  "solution": "V = IR = 0.025 × 2 200 = 55 V. Convert mA and kΩ to base units first."
 },
 {
  "id": "sch-017",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "ohms-law",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "The V–I graph for an ohmic conductor is…",
  "options": [
   "a horizontal line",
   "a straight line through the origin",
   "a curve that flattens off",
   "a curve that gets steeper"
  ],
  "answerIndex": 1,
  "solution": "For an ohmic conductor V ∝ I at constant temperature, giving a straight line through the origin whose gradient (V/I) is R."
 },
 {
  "id": "sch-018",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "ohms-law",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Why is a filament lamp non-ohmic?",
  "options": [
   "It only conducts in one direction",
   "Its voltage stays constant",
   "Its resistance increases as the filament heats up",
   "It has no resistance"
  ],
  "answerIndex": 2,
  "solution": "As current increases the filament gets hotter and its resistance rises, so the V–I graph curves. A component that conducts in one direction is a diode."
 },
 {
  "id": "sch-019",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "power-energy",
  "difficulty": 1,
  "type": "numeric",
  "prompt": "A 230 V heater draws 8 A. Calculate its power.",
  "answer": 1840.0,
  "unit": "W",
  "tolerance": 0.02,
  "solution": "P = VI = 230 × 8 = 1840 W."
 },
 {
  "id": "sch-020",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "power-energy",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "What power is dissipated in a 47 Ω resistor carrying 0.2 A?",
  "answer": 1.88,
  "unit": "W",
  "tolerance": 0.02,
  "solution": "P = I²R = 0.04 × 47 = 1.88 W."
 },
 {
  "id": "sch-021",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "power-energy",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A 100 Ω resistor is connected across 20 V. Find the power.",
  "answer": 4.0,
  "unit": "W",
  "tolerance": 0.02,
  "solution": "P = V²/R = 400/100 = 4 W."
 },
 {
  "id": "sch-022",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "power-energy",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A motor takes 500 W of electrical power and delivers 400 W of mechanical power. What is its efficiency (%)?",
  "answer": 80.0,
  "unit": "%",
  "tolerance": 0.02,
  "solution": "η = P_out/P_in × 100 = 400/500 × 100 = 80 %."
 },
 {
  "id": "sch-023",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "power-energy",
  "difficulty": 3,
  "type": "numeric",
  "prompt": "How much energy (in kJ) does a 1.5 kW kettle use in 3 minutes?",
  "answer": 270.0,
  "unit": "kJ",
  "tolerance": 0.02,
  "solution": "W = Pt = 1 500 × 180 s = 270 000 J = 270 kJ."
 },
 {
  "id": "sch-024",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "cost-of-electricity",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A 9 W LED lamp is on 6 hours a day for 30 days. How many kWh does it use?",
  "answer": 1.62,
  "unit": "kWh",
  "tolerance": 0.02,
  "solution": "E = 0.009 kW × 180 h = 1.62 kWh."
 },
 {
  "id": "sch-025",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "cost-of-electricity",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A 2.5 kW stove plate runs for 2 hours. Electricity costs R3.00 per kWh. What is the cost in rand?",
  "answer": 15.0,
  "unit": "R",
  "tolerance": 0.02,
  "solution": "E = 2.5 × 2 = 5 kWh; cost = 5 × 3.00 = R15."
 },
 {
  "id": "sch-026",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "cost-of-electricity",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "One kilowatt-hour (kWh) is equal to…",
  "options": [
   "3.6 × 10⁶ J",
   "1 kW",
   "3 600 J",
   "1 000 J"
  ],
  "answerIndex": 0,
  "solution": "1 kWh = 1 000 W × 3 600 s = 3.6 × 10⁶ J. It is a unit of energy, not power."
 },
 {
  "id": "sch-027",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "conductors-insulators",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "Which of these is the best electrical insulator?",
  "options": [
   "Graphite",
   "PVC",
   "Salt water",
   "Copper"
  ],
  "answerIndex": 1,
  "solution": "PVC is a common cable insulation. Copper and graphite conduct; salt water is an electrolyte and conducts."
 },
 {
  "id": "sch-028",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "conductors-insulators",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Silicon is classified as a…",
  "options": [
   "insulator",
   "semiconductor",
   "superconductor",
   "conductor"
  ],
  "answerIndex": 1,
  "solution": "Silicon's resistivity lies between conductors and insulators and can be controlled by doping."
 },
 {
  "id": "sch-029",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "resistance-resistivity",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "If the length of a wire is doubled (same material and thickness), its resistance…",
  "options": [
   "halves",
   "doubles",
   "stays the same",
   "quadruples"
  ],
  "answerIndex": 1,
  "solution": "R = ρL/A, so R is proportional to length."
 },
 {
  "id": "sch-030",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "resistance-resistivity",
  "difficulty": 3,
  "type": "mcq",
  "prompt": "If the diameter of a wire is doubled (same length and material), its resistance becomes…",
  "options": [
   "one quarter",
   "double",
   "four times",
   "half"
  ],
  "answerIndex": 0,
  "solution": "Area ∝ d², so doubling d makes A four times bigger and R = ρL/A one quarter."
 },
 {
  "id": "sch-031",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "electrical-safety-basics",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "What actually causes harm in an electric shock?",
  "options": [
   "The power rating of the appliance",
   "The current flowing through the body",
   "The frequency of the supply only",
   "The voltage alone, regardless of current"
  ],
  "answerIndex": 1,
  "solution": "Harm depends on current through the body, its path and duration. Voltage matters because it drives that current through the body's resistance."
 },
 {
  "id": "sch-032",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "electrical-safety-basics",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Why does wet skin increase the danger of electric shock?",
  "options": [
   "It increases body resistance",
   "It increases the supply voltage",
   "It lowers body resistance, so more current flows",
   "Water is an insulator"
  ],
  "answerIndex": 2,
  "solution": "Moisture lowers skin resistance dramatically, so I = V/R increases for the same voltage."
 },
 {
  "id": "sch-033",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "static-electricity",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "A plastic rod rubbed with a cloth becomes negatively charged. This is because…",
  "options": [
   "protons moved from the cloth to the rod",
   "the rod created new charge",
   "electrons moved from the cloth to the rod",
   "electrons moved from the rod to the cloth"
  ],
  "answerIndex": 2,
  "solution": "Only electrons transfer when materials are rubbed. Gaining electrons gives a negative charge; charge is conserved, not created."
 },
 {
  "id": "sch-034",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "static-electricity",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Two point charges repel with force F. If the distance between them is doubled, the force becomes…",
  "options": [
   "F/4",
   "4F",
   "2F",
   "F/2"
  ],
  "answerIndex": 0,
  "solution": "Coulomb's law: F ∝ 1/r², so doubling r gives F/4."
 },
 {
  "id": "sch-035",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "heating-effect",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "Which device relies mainly on the heating effect of current?",
  "options": [
   "Transformer",
   "Relay",
   "Electric bell",
   "Fuse"
  ],
  "answerIndex": 3,
  "solution": "A fuse element melts when overheated by excess current. Bells and relays use the magnetic effect; transformers use induction."
 },
 {
  "id": "sch-036",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "heating-effect",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Electroplating is an example of which effect of electric current?",
  "options": [
   "Magnetic",
   "Photoelectric",
   "Heating",
   "Chemical"
  ],
  "answerIndex": 3,
  "solution": "Current through an electrolyte causes chemical change, depositing metal on the cathode."
 },
 {
  "id": "sch-037",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "batteries",
  "difficulty": 1,
  "type": "numeric",
  "prompt": "Three 1.5 V cells are connected in series. What is the total EMF?",
  "answer": 4.5,
  "unit": "V",
  "tolerance": 0.02,
  "solution": "EMFs in series add: 3 × 1.5 = 4.5 V."
 },
 {
  "id": "sch-038",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "batteries",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A 12 V, 7 Ah battery supplies a 1.4 A load. Ideally, how long will it last (hours)?",
  "answer": 5.0,
  "unit": "h",
  "tolerance": 0.02,
  "solution": "t = Ah/I = 7/1.4 = 5 h (ideal, ignoring depth-of-discharge limits)."
 },
 {
  "id": "sch-039",
  "level": "school",
  "subject": "fundamentals",
  "topicId": "batteries",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Which battery type is rechargeable?",
  "options": [
   "Zinc-carbon",
   "Alkaline AA",
   "Lithium-ion",
   "Lithium coin cell (CR2032)"
  ],
  "answerIndex": 2,
  "solution": "Li-ion is a secondary (rechargeable) cell. Alkaline, zinc-carbon and CR2032 lithium coin cells are primary cells."
 },
 {
  "id": "sch-040",
  "level": "school",
  "subject": "dc",
  "topicId": "series-circuits",
  "difficulty": 1,
  "type": "numeric",
  "prompt": "Resistors of 5 Ω, 10 Ω and 15 Ω are connected in series. What is the total resistance?",
  "answer": 30.0,
  "unit": "Ω",
  "tolerance": 0.02,
  "solution": "Series resistances add: 5 + 10 + 15 = 30 Ω."
 },
 {
  "id": "sch-041",
  "level": "school",
  "subject": "dc",
  "topicId": "series-circuits",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A 6 Ω and a 12 Ω resistor are in series across 9 V. Find the current.",
  "answer": 0.5,
  "unit": "A",
  "tolerance": 0.02,
  "solution": "R_T = 18 Ω; I = 9/18 = 0.5 A."
 },
 {
  "id": "sch-042",
  "level": "school",
  "subject": "dc",
  "topicId": "series-circuits",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A 6 Ω and a 12 Ω resistor are in series across 9 V. What is the voltage across the 12 Ω resistor?",
  "answer": 6.0,
  "unit": "V",
  "tolerance": 0.02,
  "solution": "I = 0.5 A, so V = 0.5 × 12 = 6 V (or 9 × 12/18)."
 },
 {
  "id": "sch-043",
  "level": "school",
  "subject": "dc",
  "topicId": "series-circuits",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "In a series circuit the current is…",
  "options": [
   "largest through the largest resistor",
   "zero after the first resistor",
   "shared equally between components",
   "the same through every component"
  ],
  "answerIndex": 3,
  "solution": "There is only one path, so the same current flows everywhere."
 },
 {
  "id": "sch-044",
  "level": "school",
  "subject": "dc",
  "topicId": "parallel-circuits",
  "difficulty": 1,
  "type": "numeric",
  "prompt": "Two 10 Ω resistors are connected in parallel. What is the equivalent resistance?",
  "answer": 5.0,
  "unit": "Ω",
  "tolerance": 0.02,
  "solution": "Equal resistors in parallel: R/n = 10/2 = 5 Ω."
 },
 {
  "id": "sch-045",
  "level": "school",
  "subject": "dc",
  "topicId": "parallel-circuits",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "Resistors of 20 Ω and 30 Ω are in parallel. Find the equivalent resistance.",
  "answer": 12.0,
  "unit": "Ω",
  "tolerance": 0.02,
  "solution": "Product over sum: 600/50 = 12 Ω."
 },
 {
  "id": "sch-046",
  "level": "school",
  "subject": "dc",
  "topicId": "parallel-circuits",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "Three resistors 6 Ω, 12 Ω and 12 Ω are in parallel. Find R_T.",
  "answer": 3.0,
  "unit": "Ω",
  "tolerance": 0.02,
  "solution": "1/R = 1/6 + 1/12 + 1/12 = 4/12 → R_T = 3 Ω."
 },
 {
  "id": "sch-047",
  "level": "school",
  "subject": "dc",
  "topicId": "parallel-circuits",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Household appliances are connected in parallel mainly because…",
  "options": [
   "the current is the same in each appliance",
   "the total resistance increases",
   "it uses less cable",
   "each appliance gets the full supply voltage and can be switched independently"
  ],
  "answerIndex": 3,
  "solution": "Parallel connection gives every branch the full voltage and independent control."
 },
 {
  "id": "sch-048",
  "level": "school",
  "subject": "dc",
  "topicId": "parallel-circuits",
  "difficulty": 3,
  "type": "numeric",
  "prompt": "A 4 Ω and 12 Ω resistor are in parallel across 24 V. What is the total current drawn from the supply?",
  "answer": 8.0,
  "unit": "A",
  "tolerance": 0.02,
  "solution": "I₄ = 6 A, I₁₂ = 2 A; total = 8 A (R_T = 3 Ω, 24/3 = 8 A)."
 },
 {
  "id": "sch-049",
  "level": "school",
  "subject": "dc",
  "topicId": "parallel-circuits",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Adding another resistor in parallel to an existing parallel circuit will…",
  "options": [
   "not change total resistance",
   "increase total resistance",
   "decrease the supply current",
   "decrease total resistance"
  ],
  "answerIndex": 3,
  "solution": "Each extra path adds conductance, so total resistance falls and supply current rises."
 },
 {
  "id": "sch-050",
  "level": "school",
  "subject": "dc",
  "topicId": "series-parallel",
  "difficulty": 3,
  "type": "numeric",
  "prompt": "A 2 Ω resistor is in series with a parallel pair of 6 Ω and 3 Ω. Find the total resistance.",
  "answer": 4.0,
  "unit": "Ω",
  "tolerance": 0.02,
  "solution": "6 ∥ 3 = 2 Ω; total = 2 + 2 = 4 Ω."
 },
 {
  "id": "sch-051",
  "level": "school",
  "subject": "dc",
  "topicId": "series-parallel",
  "difficulty": 3,
  "type": "numeric",
  "prompt": "A 2 Ω resistor in series with a parallel pair (6 Ω ∥ 3 Ω) is connected to 12 V. What current flows through the 6 Ω resistor?",
  "answer": 1.0,
  "unit": "A",
  "tolerance": 0.02,
  "solution": "I = 12/4 = 3 A; parallel voltage = 3 × 2 = 6 V; I₆ = 6/6 = 1 A."
 },
 {
  "id": "sch-052",
  "level": "school",
  "subject": "dc",
  "topicId": "kirchhoff-laws",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "At a junction, 5 A and 3 A flow in, and one wire carries 6 A out. What current flows in the remaining outgoing wire?",
  "answer": 2.0,
  "unit": "A",
  "tolerance": 0.02,
  "solution": "KCL: total in = total out → 8 = 6 + I → I = 2 A."
 },
 {
  "id": "sch-053",
  "level": "school",
  "subject": "dc",
  "topicId": "kirchhoff-laws",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Kirchhoff's voltage law is based on conservation of…",
  "options": [
   "mass",
   "charge",
   "momentum",
   "energy"
  ],
  "answerIndex": 3,
  "solution": "KVL: the sum of EMFs equals the sum of p.d.s around a loop — energy given to charges equals energy they transfer. KCL is based on conservation of charge."
 },
 {
  "id": "sch-054",
  "level": "school",
  "subject": "dc",
  "topicId": "voltage-divider",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A voltage divider has R₁ = 3 kΩ (top) and R₂ = 1 kΩ (bottom) across 12 V. What is V_out across R₂?",
  "answer": 3.0,
  "unit": "V",
  "tolerance": 0.02,
  "solution": "V_out = 12 × 1/(3 + 1) = 3 V."
 },
 {
  "id": "sch-055",
  "level": "school",
  "subject": "dc",
  "topicId": "internal-resistance",
  "difficulty": 3,
  "type": "numeric",
  "prompt": "A cell with EMF 6 V and internal resistance 0.5 Ω is connected to a 5.5 Ω resistor. Find the current.",
  "answer": 1.0,
  "unit": "A",
  "tolerance": 0.02,
  "solution": "I = ε/(R + r) = 6/6 = 1 A."
 },
 {
  "id": "sch-056",
  "level": "school",
  "subject": "dc",
  "topicId": "internal-resistance",
  "difficulty": 3,
  "type": "numeric",
  "prompt": "A cell with EMF 6 V and internal resistance 0.5 Ω delivers 1 A. What is the terminal voltage?",
  "answer": 5.5,
  "unit": "V",
  "tolerance": 0.02,
  "solution": "V = ε − Ir = 6 − 0.5 = 5.5 V."
 },
 {
  "id": "sch-057",
  "level": "school",
  "subject": "dc",
  "topicId": "wheatstone-bridge",
  "difficulty": 3,
  "type": "numeric",
  "prompt": "A balanced Wheatstone bridge has arms P = 10 Ω, Q = 20 Ω and R = 15 Ω, with P/Q = R/S. Find S.",
  "answer": 30.0,
  "unit": "Ω",
  "tolerance": 0.02,
  "solution": "S = R × Q/P = 15 × 20/10 = 30 Ω."
 },
 {
  "id": "sch-058",
  "level": "school",
  "subject": "fields",
  "topicId": "capacitors",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A 100 µF capacitor is charged to 10 V. How much charge does it store (in mC)?",
  "answer": 1.0,
  "unit": "mC",
  "tolerance": 0.02,
  "solution": "Q = CV = 100×10⁻⁶ × 10 = 10⁻³ C = 1 mC."
 },
 {
  "id": "sch-059",
  "level": "school",
  "subject": "fields",
  "topicId": "capacitors",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "How much energy is stored in a 1 000 µF capacitor charged to 20 V?",
  "answer": 0.2,
  "unit": "J",
  "tolerance": 0.02,
  "solution": "W = ½CV² = 0.5 × 0.001 × 400 = 0.2 J."
 },
 {
  "id": "sch-060",
  "level": "school",
  "subject": "fields",
  "topicId": "capacitors",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "The unit of capacitance is the…",
  "options": [
   "weber",
   "tesla",
   "farad",
   "henry"
  ],
  "answerIndex": 2,
  "solution": "Capacitance is measured in farads (F). Henry = inductance, tesla = flux density, weber = flux."
 },
 {
  "id": "sch-061",
  "level": "school",
  "subject": "fields",
  "topicId": "capacitors-series-parallel",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "Two 10 µF capacitors are connected in parallel. What is the total capacitance?",
  "answer": 20.0,
  "unit": "µF",
  "tolerance": 0.02,
  "solution": "Capacitors in parallel add: 10 + 10 = 20 µF."
 },
 {
  "id": "sch-062",
  "level": "school",
  "subject": "fields",
  "topicId": "capacitors-series-parallel",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "Two 10 µF capacitors in series give a total capacitance of…",
  "answer": 5.0,
  "unit": "µF",
  "tolerance": 0.02,
  "solution": "Series capacitors combine like parallel resistors: 10 × 10/20 = 5 µF."
 },
 {
  "id": "sch-063",
  "level": "school",
  "subject": "fields",
  "topicId": "rc-transients",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "What is the time constant of a 47 kΩ resistor with a 10 µF capacitor (in seconds)?",
  "answer": 0.47,
  "unit": "s",
  "tolerance": 0.02,
  "solution": "τ = RC = 47 000 × 10×10⁻⁶ = 0.47 s."
 },
 {
  "id": "sch-064",
  "level": "school",
  "subject": "fields",
  "topicId": "rc-transients",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "After one time constant, a charging capacitor reaches approximately what percentage of the supply voltage?",
  "options": [
   "100 %",
   "50 %",
   "37 %",
   "63 %"
  ],
  "answerIndex": 3,
  "solution": "v = V(1 − e⁻¹) ≈ 0.632V. 37 % is what remains after one τ when discharging."
 },
 {
  "id": "sch-065",
  "level": "school",
  "subject": "fields",
  "topicId": "magnetism",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "Magnetic field lines outside a bar magnet run from…",
  "options": [
   "north pole to south pole",
   "the centre outward",
   "they do not have a direction",
   "south pole to north pole"
  ],
  "answerIndex": 0,
  "solution": "By convention field lines leave the N pole and enter the S pole outside the magnet."
 },
 {
  "id": "sch-066",
  "level": "school",
  "subject": "fields",
  "topicId": "electromagnetism",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Which change would NOT make an electromagnet stronger?",
  "options": [
   "More turns of wire",
   "Replacing the iron core with a wooden core",
   "Adding a soft-iron core",
   "Larger current"
  ],
  "answerIndex": 1,
  "solution": "Wood has µ_r ≈ 1, so removing the iron core greatly weakens the field. Turns, current and a ferromagnetic core all increase it."
 },
 {
  "id": "sch-067",
  "level": "school",
  "subject": "fields",
  "topicId": "electromagnetism",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "The rule used to find the direction of the magnetic field around a current-carrying straight wire is the…",
  "options": [
   "Fleming's right-hand rule",
   "right-hand grip rule",
   "Fleming's left-hand rule",
   "Lenz's rule"
  ],
  "answerIndex": 1,
  "solution": "Grip the wire with the right hand, thumb along conventional current; fingers curl in the field direction."
 },
 {
  "id": "sch-068",
  "level": "school",
  "subject": "fields",
  "topicId": "electromagnetic-induction",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "According to Faraday's law, the induced EMF in a coil is proportional to…",
  "options": [
   "the strength of a steady magnetic field",
   "the current already in the coil",
   "the rate of change of magnetic flux linkage",
   "the resistance of the coil"
  ],
  "answerIndex": 2,
  "solution": "e = −N dΦ/dt. A steady field produces no EMF; only a changing flux linkage does."
 },
 {
  "id": "sch-069",
  "level": "school",
  "subject": "fields",
  "topicId": "electromagnetic-induction",
  "difficulty": 3,
  "type": "numeric",
  "prompt": "A 50-turn coil experiences a flux change of 0.02 Wb in 0.1 s. Find the induced EMF magnitude.",
  "answer": 10.0,
  "unit": "V",
  "tolerance": 0.02,
  "solution": "e = NΔΦ/Δt = 50 × 0.02/0.1 = 10 V."
 },
 {
  "id": "sch-070",
  "level": "school",
  "subject": "fields",
  "topicId": "electromagnetic-induction",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Lenz's law states that the induced current…",
  "options": [
   "opposes the change that produced it",
   "is always zero in a closed loop",
   "aids the change that produced it",
   "always flows clockwise"
  ],
  "answerIndex": 0,
  "solution": "The induced current's field opposes the change in flux — a consequence of energy conservation."
 },
 {
  "id": "sch-071",
  "level": "school",
  "subject": "fields",
  "topicId": "force-on-conductor",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A wire 0.5 m long carrying 4 A lies at right angles to a 0.2 T field. Find the force on it.",
  "answer": 0.4,
  "unit": "N",
  "tolerance": 0.02,
  "solution": "F = BIl = 0.2 × 4 × 0.5 = 0.4 N."
 },
 {
  "id": "sch-072",
  "level": "school",
  "subject": "fields",
  "topicId": "force-on-conductor",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Fleming's left-hand rule is used for…",
  "options": [
   "transformers",
   "generators (induced current)",
   "motors (force on a current-carrying conductor)",
   "finding field direction around a wire"
  ],
  "answerIndex": 2,
  "solution": "Left hand = motor: First finger Field, seCond finger Current, thuMb Motion. Right hand is used for generators."
 },
 {
  "id": "sch-073",
  "level": "school",
  "subject": "ac",
  "topicId": "alternating-current",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "What is the frequency of mains electricity in South Africa?",
  "options": [
   "230 Hz",
   "50 Hz",
   "400 Hz",
   "60 Hz"
  ],
  "answerIndex": 1,
  "solution": "The South African grid runs at 50 Hz with 230 V single-phase (400 V three-phase)."
 },
 {
  "id": "sch-074",
  "level": "school",
  "subject": "ac",
  "topicId": "alternating-current",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "What is the peak value of a 230 V RMS sine wave?",
  "answer": 325.269119,
  "unit": "V",
  "tolerance": 0.02,
  "solution": "V_m = V_rms × √2 = 230 × 1.414 = 325 V."
 },
 {
  "id": "sch-075",
  "level": "school",
  "subject": "ac",
  "topicId": "alternating-current",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "What is the period of a 50 Hz waveform (in ms)?",
  "answer": 20.0,
  "unit": "ms",
  "tolerance": 0.02,
  "solution": "T = 1/f = 1/50 = 0.02 s = 20 ms."
 },
 {
  "id": "sch-076",
  "level": "school",
  "subject": "ac",
  "topicId": "alternating-current",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A sine wave has a peak of 20 V. What is its RMS value?",
  "answer": 14.142136,
  "unit": "V",
  "tolerance": 0.02,
  "solution": "V_rms = V_m/√2 = 20 × 0.707 = 14.1 V."
 },
 {
  "id": "sch-077",
  "level": "school",
  "subject": "ac",
  "topicId": "alternating-current",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Why are RMS values used for AC?",
  "options": [
   "AC has no average value",
   "They give the same heating effect as an equal DC value",
   "They are always larger than peak values",
   "They are easier to measure with an oscilloscope"
  ],
  "answerIndex": 1,
  "solution": "RMS is defined as the equivalent DC that produces the same power in a resistor."
 },
 {
  "id": "sch-078",
  "level": "school",
  "subject": "machines",
  "topicId": "transformers",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A transformer has 1 000 primary turns and 50 secondary turns. With 230 V on the primary, what is the secondary voltage?",
  "answer": 11.5,
  "unit": "V",
  "tolerance": 0.02,
  "solution": "V₂ = V₁ × N₂/N₁ = 230 × 50/1 000 = 11.5 V."
 },
 {
  "id": "sch-079",
  "level": "school",
  "subject": "machines",
  "topicId": "transformers",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "A step-up transformer…",
  "options": [
   "increases voltage and decreases current",
   "increases both voltage and current",
   "works on DC",
   "increases power"
  ],
  "answerIndex": 0,
  "solution": "An ideal transformer conserves power: if voltage goes up, current goes down by the same ratio. Transformers need changing flux, so they do not work on DC."
 },
 {
  "id": "sch-080",
  "level": "school",
  "subject": "machines",
  "topicId": "transformers",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Why is electricity transmitted at very high voltage?",
  "options": [
   "To reduce current and therefore I²R losses in the lines",
   "High voltage is safer",
   "To increase the frequency",
   "Transformers only work at high voltage"
  ],
  "answerIndex": 0,
  "solution": "For the same power, higher voltage means lower current, and line loss ∝ I²."
 },
 {
  "id": "sch-081",
  "level": "school",
  "subject": "machines",
  "topicId": "transformers",
  "difficulty": 3,
  "type": "numeric",
  "prompt": "An ideal transformer steps 230 V down to 12 V and supplies 5 A to a load. Find the primary current.",
  "answer": 0.26087,
  "unit": "A",
  "tolerance": 0.02,
  "solution": "Power in = power out: I₁ = I₂V₂/V₁ = 5 × 12/230 = 0.261 A."
 },
 {
  "id": "sch-082",
  "level": "school",
  "subject": "machines",
  "topicId": "ac-generators",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "In an AC generator the coil connects to the external circuit through…",
  "options": [
   "a rectifier bridge",
   "slip rings and brushes",
   "a transformer",
   "a split-ring commutator"
  ],
  "answerIndex": 1,
  "solution": "Slip rings keep each coil end connected to the same terminal, so the output alternates. A split-ring commutator gives DC."
 },
 {
  "id": "sch-083",
  "level": "school",
  "subject": "machines",
  "topicId": "ac-generators",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Which change would increase the EMF of a simple generator?",
  "options": [
   "Using fewer turns",
   "Using thinner wire",
   "Using a stronger magnet",
   "Rotating the coil more slowly"
  ],
  "answerIndex": 2,
  "solution": "e_max = NBAω: more turns, stronger field, larger area or faster rotation increase EMF."
 },
 {
  "id": "sch-084",
  "level": "school",
  "subject": "machines",
  "topicId": "dc-motors",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "The purpose of the split-ring commutator in a DC motor is to…",
  "options": [
   "reduce sparking",
   "convert DC to AC for the supply",
   "reverse the current in the coil every half turn so rotation continues",
   "increase the speed"
  ],
  "answerIndex": 2,
  "solution": "Reversing coil current each half turn keeps the torque in the same direction."
 },
 {
  "id": "sch-085",
  "level": "school",
  "subject": "electronics",
  "topicId": "diodes",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "A diode allows current to flow…",
  "options": [
   "only with AC",
   "mainly in one direction (forward bias)",
   "equally in both directions",
   "only when it is hot"
  ],
  "answerIndex": 1,
  "solution": "A forward-biased p-n junction conducts; reverse bias blocks current (except tiny leakage)."
 },
 {
  "id": "sch-086",
  "level": "school",
  "subject": "electronics",
  "topicId": "diodes",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Approximately what forward voltage drop does a silicon diode have when conducting?",
  "options": [
   "0.7 V",
   "0.1 V",
   "0.3 V",
   "1.5 V"
  ],
  "answerIndex": 0,
  "solution": "Silicon ≈ 0.6–0.7 V; germanium ≈ 0.3 V; Schottky ≈ 0.2–0.4 V."
 },
 {
  "id": "sch-087",
  "level": "school",
  "subject": "electronics",
  "topicId": "special-diodes",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A red LED (2 V, 20 mA) is powered from 9 V. What series resistor is required?",
  "answer": 350.0,
  "unit": "Ω",
  "tolerance": 0.02,
  "solution": "R = (V_S − V_F)/I = 7/0.02 = 350 Ω (use 360 Ω or 390 Ω)."
 },
 {
  "id": "sch-088",
  "level": "school",
  "subject": "electronics",
  "topicId": "special-diodes",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "What does LED stand for?",
  "options": [
   "Linear electronic diode",
   "Low-energy device",
   "Light-enhancing detector",
   "Light-emitting diode"
  ],
  "answerIndex": 3,
  "solution": "An LED is a diode that emits light when forward biased."
 },
 {
  "id": "sch-089",
  "level": "school",
  "subject": "electronics",
  "topicId": "rectifiers",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "A circuit that converts AC to DC is called a…",
  "options": [
   "inverter",
   "oscillator",
   "transformer",
   "rectifier"
  ],
  "answerIndex": 3,
  "solution": "Rectifiers use diodes to convert AC to (pulsating) DC; inverters do the opposite."
 },
 {
  "id": "sch-090",
  "level": "school",
  "subject": "electronics",
  "topicId": "bjt",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A transistor has β = 100 and base current 50 µA. What is the collector current in mA?",
  "answer": 5.0,
  "unit": "mA",
  "tolerance": 0.02,
  "solution": "I_C = βI_B = 100 × 50 µA = 5 mA."
 },
 {
  "id": "sch-091",
  "level": "school",
  "subject": "electronics",
  "topicId": "bjt",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "The three terminals of a bipolar junction transistor are…",
  "options": [
   "input, output, ground",
   "base, collector, emitter",
   "gate, drain, source",
   "anode, cathode, gate"
  ],
  "answerIndex": 1,
  "solution": "BJT: base, collector, emitter. Gate/drain/source belong to FETs; anode/cathode/gate to SCRs."
 },
 {
  "id": "sch-092",
  "level": "school",
  "subject": "electronics",
  "topicId": "semiconductors",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Adding boron (a trivalent element) to pure silicon produces…",
  "options": [
   "n-type silicon",
   "a superconductor",
   "an insulator",
   "p-type silicon"
  ],
  "answerIndex": 3,
  "solution": "Trivalent atoms create holes (acceptors), giving p-type material."
 },
 {
  "id": "sch-093",
  "level": "school",
  "subject": "electronics",
  "topicId": "555-timer",
  "difficulty": 3,
  "type": "numeric",
  "prompt": "A 555 monostable uses R = 100 kΩ and C = 10 µF. What is the pulse length?",
  "answer": 1.1,
  "unit": "s",
  "tolerance": 0.02,
  "solution": "t = 1.1RC = 1.1 × 100 000 × 10×10⁻⁶ = 1.1 s."
 },
 {
  "id": "sch-094",
  "level": "school",
  "subject": "digital",
  "topicId": "number-systems",
  "difficulty": 1,
  "type": "numeric",
  "prompt": "Convert the binary number 1011 to decimal.",
  "answer": 11.0,
  "unit": "",
  "tolerance": 0.0,
  "solution": "1011 = 8 + 0 + 2 + 1 = 11."
 },
 {
  "id": "sch-095",
  "level": "school",
  "subject": "digital",
  "topicId": "number-systems",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Convert decimal 25 to binary.",
  "options": [
   "11001",
   "10011",
   "11010",
   "10101"
  ],
  "answerIndex": 0,
  "solution": "25 = 16 + 8 + 1 = 11001₂."
 },
 {
  "id": "sch-096",
  "level": "school",
  "subject": "digital",
  "topicId": "number-systems",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "What is the largest decimal value an 8-bit unsigned binary number can hold?",
  "answer": 255.0,
  "unit": "",
  "tolerance": 0.0,
  "solution": "2⁸ − 1 = 255."
 },
 {
  "id": "sch-097",
  "level": "school",
  "subject": "digital",
  "topicId": "logic-gates",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "An AND gate has inputs A = 1 and B = 0. What is the output?",
  "options": [
   "1",
   "Undefined",
   "It depends on the clock",
   "0"
  ],
  "answerIndex": 3,
  "solution": "AND outputs 1 only when all inputs are 1."
 },
 {
  "id": "sch-098",
  "level": "school",
  "subject": "digital",
  "topicId": "logic-gates",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "Which gate gives an output of 1 when its inputs are different?",
  "options": [
   "XOR",
   "XNOR",
   "NOR",
   "AND"
  ],
  "answerIndex": 0,
  "solution": "XOR = exclusive OR: 1 when the inputs differ. XNOR is 1 when they are equal."
 },
 {
  "id": "sch-099",
  "level": "school",
  "subject": "digital",
  "topicId": "logic-gates",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "A NOR gate has inputs A = 0 and B = 0. What is the output?",
  "options": [
   "1",
   "Floating",
   "0",
   "Same as A"
  ],
  "answerIndex": 0,
  "solution": "NOR = NOT(A OR B). 0 OR 0 = 0, inverted gives 1."
 },
 {
  "id": "sch-100",
  "level": "school",
  "subject": "digital",
  "topicId": "logic-gates",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Which gates are called \"universal\" because any logic function can be built from them alone?",
  "options": [
   "NOT and buffer",
   "AND and OR",
   "NAND and NOR",
   "XOR and XNOR"
  ],
  "answerIndex": 2,
  "solution": "NAND alone (or NOR alone) can implement NOT, AND and OR, hence every function."
 },
 {
  "id": "sch-101",
  "level": "school",
  "subject": "digital",
  "topicId": "microcontrollers",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "Why should you not drive a motor directly from a microcontroller pin?",
  "options": [
   "Motors need AC only",
   "It would make the motor spin backwards",
   "The pin can only supply a small current and the motor's inductive kick can damage it",
   "Microcontroller pins only output analogue voltages"
  ],
  "answerIndex": 2,
  "solution": "GPIO pins source only a few mA; use a transistor/MOSFET driver and a flyback diode."
 },
 {
  "id": "sch-102",
  "level": "school",
  "subject": "measurement",
  "topicId": "multimeters",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "Resistance should be measured with a multimeter only when…",
  "options": [
   "the leads are in series with the supply",
   "the meter is on the A range",
   "the circuit is switched off and isolated",
   "the circuit is powered"
  ],
  "answerIndex": 2,
  "solution": "Measuring ohms on a live circuit gives false readings and can damage the meter."
 },
 {
  "id": "sch-103",
  "level": "school",
  "subject": "measurement",
  "topicId": "multimeters",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "A multimeter in diode mode reads about 0.6 V in one direction and \"OL\" in the other across a component. The component is most likely…",
  "options": [
   "a charged capacitor",
   "an open-circuit resistor",
   "a good silicon diode",
   "a shorted diode"
  ],
  "answerIndex": 2,
  "solution": "≈ 0.6 V forward drop and blocking in reverse is exactly how a healthy silicon junction behaves."
 },
 {
  "id": "sch-104",
  "level": "school",
  "subject": "installation",
  "topicId": "earth-leakage",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "What is the typical rated trip current of an earth-leakage unit for personal protection?",
  "options": [
   "30 mA",
   "300 mA",
   "3 A",
   "100 mA"
  ],
  "answerIndex": 0,
  "solution": "30 mA RCDs protect people; 100–300 mA units are used for fire protection of installations."
 },
 {
  "id": "sch-105",
  "level": "school",
  "subject": "installation",
  "topicId": "grounding-earthing",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "The purpose of connecting the metal case of an appliance to earth is to…",
  "options": [
   "make it work more efficiently",
   "increase the voltage",
   "reduce the electricity bill",
   "provide a low-resistance path so a fault trips the protection and the case does not stay live"
  ],
  "answerIndex": 3,
  "solution": "If a live wire touches the case, current flows to earth and the breaker or earth-leakage trips."
 },
 {
  "id": "sch-106",
  "level": "school",
  "subject": "installation",
  "topicId": "lighting-circuits",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Two-way switching is used to…",
  "options": [
   "control two lights from one switch",
   "control one light from two different places",
   "dim a light",
   "switch the neutral and live together"
  ],
  "answerIndex": 1,
  "solution": "Two two-way switches linked by strappers let you switch a light at the top and bottom of stairs."
 },
 {
  "id": "sch-107",
  "level": "school",
  "subject": "installation",
  "topicId": "ohs-safety",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Before working on a circuit you have switched off, you should…",
  "options": [
   "lock it out, tag it and test for dead with a proven tester",
   "only switch off the light switch",
   "trust the label on the breaker",
   "touch the wire quickly to check"
  ],
  "answerIndex": 0,
  "solution": "Safe isolation: isolate, lock and tag, then prove–test–prove with a voltage tester."
 },
 {
  "id": "sch-108",
  "level": "school",
  "subject": "power",
  "topicId": "power-generation",
  "difficulty": 1,
  "type": "mcq",
  "prompt": "In a coal-fired power station, what directly turns the generator?",
  "options": [
   "A steam turbine",
   "Water falling through a pipe",
   "Burning coal",
   "Solar panels"
  ],
  "answerIndex": 0,
  "solution": "Coal heats water to make high-pressure steam, which drives a turbine coupled to the generator."
 },
 {
  "id": "sch-109",
  "level": "school",
  "subject": "power",
  "topicId": "power-generation",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Which of these is a renewable energy source?",
  "options": [
   "Wind",
   "Diesel",
   "Coal",
   "Natural gas"
  ],
  "answerIndex": 0,
  "solution": "Wind is naturally replenished. Coal, gas and diesel are fossil fuels."
 },
 {
  "id": "sch-110",
  "level": "school",
  "subject": "power",
  "topicId": "renewable-energy-solar-pv",
  "difficulty": 2,
  "type": "mcq",
  "prompt": "Solar panels produce which type of electricity directly?",
  "options": [
   "High-frequency AC",
   "DC",
   "50 Hz AC",
   "Three-phase AC"
  ],
  "answerIndex": 1,
  "solution": "PV cells generate DC; an inverter is needed to produce 230 V AC."
 },
 {
  "id": "sch-111",
  "level": "school",
  "subject": "power",
  "topicId": "fuses-circuit-breakers",
  "difficulty": 2,
  "type": "numeric",
  "prompt": "A 2 kW appliance runs on 230 V. Which fuse is most suitable: 3 A, 5 A, 10 A or 13 A? (Enter the rating in amperes.)",
  "answer": 10.0,
  "unit": "A",
  "tolerance": 0.0,
  "solution": "I = 2 000/230 ≈ 8.7 A. Choose the next standard rating above: 10 A."
 }
];

export default questions;
