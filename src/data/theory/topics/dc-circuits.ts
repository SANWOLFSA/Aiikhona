// AUTO-GENERATED study content for the Electrical Theory library. Edit the source content, not this file by hand.
import type { TheoryTopic } from '../types';

const topics: TheoryTopic[] = [
 {
  "id": "series-circuits",
  "title": "Series circuits",
  "levels": [
   "school",
   "college"
  ],
  "subject": "dc",
  "summary": "One path for current: resistances add and voltages divide.",
  "explanation": [
   "In a series circuit the same current flows through every component. The total resistance is the sum of the individual resistances and the supply voltage divides among them in proportion to their resistance (KVL).",
   "If any component opens, the whole circuit stops — like old-style series Christmas lights. The largest resistor drops the largest voltage and dissipates the most power."
  ],
  "formulas": [
   {
    "expr": "R_T = R₁ + R₂ + … + Rₙ",
    "desc": "total series resistance"
   },
   {
    "expr": "V_S = V₁ + V₂ + …",
    "desc": "voltages add"
   },
   {
    "expr": "I = V_S / R_T",
    "desc": "common current"
   }
  ],
  "example": {
   "problem": "10 Ω, 20 Ω and 30 Ω are in series across 12 V. Find the current and the voltage across the 30 Ω.",
   "steps": [
    "R_T = 60 Ω; I = 12/60 = 0.2 A.",
    "V₃₀ = 0.2 × 30 = 6 V."
   ],
   "answer": "0.2 A; 6 V"
  },
  "mistakes": [
   "Thinking current is \"used up\" along a series circuit — it is the same everywhere."
  ],
  "related": [
   "parallel-circuits",
   "voltage-divider",
   "kirchhoff-laws"
  ],
  "keywords": "series resistors"
 },
 {
  "id": "parallel-circuits",
  "title": "Parallel circuits",
  "levels": [
   "school",
   "college"
  ],
  "subject": "dc",
  "summary": "Multiple paths: voltage is common and currents add.",
  "explanation": [
   "Components in parallel share the same voltage. Total current is the sum of branch currents, and the equivalent resistance is always smaller than the smallest branch. Household circuits are wired in parallel so each appliance gets full supply voltage and can be switched independently.",
   "For two resistors use product-over-sum. Adding more branches always lowers total resistance and increases supply current."
  ],
  "formulas": [
   {
    "expr": "1/R_T = 1/R₁ + 1/R₂ + …",
    "desc": "parallel resistance"
   },
   {
    "expr": "R_T = R₁R₂/(R₁ + R₂)",
    "desc": "two resistors"
   },
   {
    "expr": "I_T = I₁ + I₂ + …",
    "desc": "currents add"
   }
  ],
  "example": {
   "problem": "6 Ω and 3 Ω are in parallel across 12 V. Find R_T and the supply current.",
   "steps": [
    "R_T = 6×3/(6+3) = 2 Ω.",
    "I = 12/2 = 6 A (4 A through 3 Ω, 2 A through 6 Ω)."
   ],
   "answer": "2 Ω; 6 A"
  },
  "mistakes": [
   "Using product-over-sum for three resistors at once.",
   "Expecting R_T to be larger than a branch resistance."
  ],
  "related": [
   "series-circuits",
   "current-divider",
   "series-parallel"
  ],
  "keywords": "parallel resistors product over sum"
 },
 {
  "id": "series-parallel",
  "title": "Series-parallel networks",
  "levels": [
   "school",
   "college"
  ],
  "subject": "dc",
  "summary": "Reducing combination circuits step by step.",
  "explanation": [
   "Identify groups that are clearly in series (same current, nothing branching between them) or in parallel (connected across the same two nodes), replace them with an equivalent, and redraw until a single resistance remains. Then work backwards to find individual currents and voltages.",
   "Labelling nodes with letters helps avoid mistakes; two resistors are in parallel only if both ends connect to the same pair of nodes."
  ],
  "formulas": [
   {
    "expr": "Combine series: add; parallel: reciprocal sum",
    "desc": "reduction rules"
   }
  ],
  "example": {
   "problem": "R₁ = 4 Ω in series with (R₂ = 12 Ω ∥ R₃ = 6 Ω) across 24 V. Find the supply current and current in R₃.",
   "steps": [
    "R₂∥R₃ = 12×6/18 = 4 Ω; R_T = 8 Ω.",
    "I = 24/8 = 3 A; V across parallel pair = 3×4 = 12 V.",
    "I₃ = 12/6 = 2 A."
   ],
   "answer": "3 A; 2 A"
  },
  "mistakes": [
   "Combining resistors that only look adjacent on the drawing but are not in true series/parallel."
  ],
  "related": [
   "series-circuits",
   "parallel-circuits",
   "star-delta-transformation"
  ],
  "keywords": "combination circuit equivalent resistance"
 },
 {
  "id": "voltage-divider",
  "title": "Voltage divider",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "dc",
  "summary": "Two series resistors produce a fraction of the supply voltage.",
  "explanation": [
   "The voltage across one resistor in a series pair equals the supply multiplied by that resistor over the total. Dividers set bias points, scale sensor signals for ADCs and create reference voltages.",
   "A divider is only accurate when the load resistance is much larger (ideally ≥ 10×) than the bottom resistor; otherwise the load acts in parallel and pulls the output down. Never use a divider to power a load."
  ],
  "formulas": [
   {
    "expr": "V_out = V_in × R₂/(R₁ + R₂)",
    "desc": "unloaded divider"
   }
  ],
  "example": {
   "problem": "Scale 12 V to 3.3 V for a microcontroller using R₂ = 10 kΩ. Find R₁.",
   "steps": [
    "3.3 = 12 × 10k/(R₁ + 10k) → R₁ + 10k = 36.36 kΩ.",
    "R₁ ≈ 26.4 kΩ (use 27 kΩ standard giving ≈ 3.24 V)."
   ],
   "answer": "R₁ ≈ 26.4 kΩ"
  },
  "mistakes": [
   "Ignoring load current, which changes the output.",
   "Putting the \"output\" resistor in the numerator incorrectly."
  ],
  "related": [
   "series-circuits",
   "current-divider",
   "bjt-amplifiers"
  ],
  "keywords": "potential divider voltage divider"
 },
 {
  "id": "current-divider",
  "title": "Current divider",
  "levels": [
   "college",
   "university"
  ],
  "subject": "dc",
  "summary": "How current splits between parallel branches.",
  "explanation": [
   "In parallel branches current divides in inverse proportion to resistance — the smaller resistance takes the larger share. For two branches the current in one branch equals the total times the OTHER resistance over the sum.",
   "Current dividers are used in ammeter shunts, where a low-resistance shunt carries most of the current around a sensitive meter movement."
  ],
  "formulas": [
   {
    "expr": "I₁ = I_T × R₂/(R₁ + R₂)",
    "desc": "two-branch divider"
   },
   {
    "expr": "I_k = I_T × G_k / ΣG",
    "desc": "general, using conductances"
   }
  ],
  "example": {
   "problem": "9 A enters a parallel pair of 3 Ω and 6 Ω. Find the current in the 3 Ω.",
   "steps": [
    "I₃Ω = 9 × 6/(3 + 6) = 6 A."
   ],
   "answer": "6 A"
  },
  "mistakes": [
   "Using the same-branch resistance in the numerator (that is the voltage-divider rule)."
  ],
  "related": [
   "parallel-circuits",
   "voltage-divider",
   "meter-shunts-multipliers"
  ],
  "keywords": "current division shunt"
 },
 {
  "id": "kirchhoff-laws",
  "title": "Kirchhoff's laws (KCL & KVL)",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "dc",
  "summary": "Conservation of charge at nodes and of energy around loops.",
  "explanation": [
   "Kirchhoff's current law (KCL): the algebraic sum of currents at any node is zero — current in equals current out. Kirchhoff's voltage law (KVL): the algebraic sum of voltages around any closed loop is zero — EMFs equal the sum of the IR drops.",
   "Choose current directions (any guess); if a result is negative the true current flows the other way. Traverse loops consistently, taking a voltage rise as positive and a drop as negative (or vice versa)."
  ],
  "formulas": [
   {
    "expr": "Σ I_in = Σ I_out",
    "desc": "KCL"
   },
   {
    "expr": "Σ V around loop = 0",
    "desc": "KVL"
   }
  ],
  "example": {
   "problem": "Two sources: E₁ = 10 V with R₁ = 2 Ω, E₂ = 4 V with R₂ = 2 Ω, both feeding R₃ = 4 Ω (common node). Find I₃.",
   "steps": [
    "Let node voltage V across R₃. KCL: (10 − V)/2 + (4 − V)/2 = V/4.",
    "Multiply by 4: 20 − 2V + 8 − 2V = V → 28 = 5V → V = 5.6 V.",
    "I₃ = 5.6/4 = 1.4 A."
   ],
   "answer": "1.4 A"
  },
  "mistakes": [
   "Sign errors from inconsistent loop direction.",
   "Writing more KVL equations than independent loops."
  ],
  "related": [
   "nodal-analysis",
   "mesh-analysis",
   "circuit-analysis",
   "superposition"
  ],
  "keywords": "kcl kvl kirchhoff node loop"
 },
 {
  "id": "circuit-analysis",
  "title": "Circuit analysis overview",
  "levels": [
   "college",
   "university"
  ],
  "subject": "dc",
  "summary": "Choosing the right method: reduction, KVL/KCL, nodal, mesh, theorems.",
  "explanation": [
   "Simple networks yield to series/parallel reduction. Multi-source networks need systematic methods: nodal analysis (KCL at N−1 nodes, unknown node voltages) or mesh analysis (KVL around independent meshes, unknown mesh currents). Network theorems — superposition, Thevenin, Norton, maximum power transfer, Millman — simplify specific questions.",
   "Rule of thumb: pick the method with fewer unknowns. Many current sources → nodal; many voltage sources in series loops → mesh; \"what happens as the load changes\" → Thevenin."
  ],
  "formulas": [
   {
    "expr": "Unknowns (nodal) = nodes − 1",
    "desc": "nodal count"
   },
   {
    "expr": "Unknowns (mesh) = branches − nodes + 1",
    "desc": "mesh count"
   }
  ],
  "example": {
   "problem": "A circuit has 4 nodes and 6 branches. How many equations do nodal and mesh analysis need?",
   "steps": [
    "Nodal: 4 − 1 = 3 equations.",
    "Mesh: 6 − 4 + 1 = 3 equations."
   ],
   "answer": "3 and 3"
  },
  "mistakes": [
   "Forgetting to choose a reference (ground) node."
  ],
  "related": [
   "kirchhoff-laws",
   "nodal-analysis",
   "mesh-analysis",
   "network-theorems"
  ],
  "keywords": "analysis methods kvl kcl thevenin norton superposition"
 },
 {
  "id": "nodal-analysis",
  "title": "Nodal analysis",
  "levels": [
   "college",
   "university"
  ],
  "subject": "dc",
  "summary": "Solve for node voltages using KCL.",
  "explanation": [
   "Pick a reference node (0 V). At every other node, write KCL with each branch current expressed as (V_node − V_other)/R. Solve the simultaneous equations (substitution, Cramer's rule or matrices G·V = I). Voltage sources between two non-reference nodes form a supernode.",
   "In matrix form the conductance matrix G is symmetric for circuits without dependent sources: diagonal terms are the sum of conductances at a node, off-diagonal terms the negative of shared conductances."
  ],
  "formulas": [
   {
    "expr": "Σ (V_n − V_k)/R_nk = I_injected",
    "desc": "KCL at node n"
   },
   {
    "expr": "[G][V] = [I]",
    "desc": "matrix form"
   }
  ],
  "example": {
   "problem": "Node A connects to 12 V via 4 Ω, to ground via 6 Ω, and to ground via 12 Ω. Find V_A.",
   "steps": [
    "(12 − V)/4 = V/6 + V/12.",
    "Multiply by 12: 36 − 3V = 2V + V → V = 6 V."
   ],
   "answer": "6 V"
  },
  "mistakes": [
   "Mixing current directions within one equation."
  ],
  "related": [
   "kirchhoff-laws",
   "mesh-analysis",
   "circuit-analysis",
   "dependent-sources"
  ],
  "keywords": "node voltage supernode conductance matrix"
 },
 {
  "id": "mesh-analysis",
  "title": "Mesh analysis",
  "levels": [
   "college",
   "university"
  ],
  "subject": "dc",
  "summary": "Solve for loop currents using KVL.",
  "explanation": [
   "Assign a clockwise mesh current to each window of a planar circuit. Write KVL for each mesh: the shared resistor carries the difference of the two mesh currents. Current sources on an outer edge fix that mesh current; a current source shared by two meshes creates a supermesh.",
   "Branch currents are found afterwards: a resistor shared between meshes 1 and 2 carries I₁ − I₂."
  ],
  "formulas": [
   {
    "expr": "Σ R·(I_mesh − I_adj) = Σ E",
    "desc": "KVL for a mesh"
   },
   {
    "expr": "[R][I] = [E]",
    "desc": "matrix form"
   }
  ],
  "example": {
   "problem": "Mesh 1: 10 V source, 2 Ω, shared 4 Ω. Mesh 2: shared 4 Ω, 2 Ω, no source. Find I₁ and I₂.",
   "steps": [
    "Mesh 1: 6I₁ − 4I₂ = 10. Mesh 2: −4I₁ + 6I₂ = 0 → I₂ = (2/3)I₁.",
    "6I₁ − (8/3)I₁ = 10 → (10/3)I₁ = 10 → I₁ = 3 A, I₂ = 2 A."
   ],
   "answer": "I₁ = 3 A, I₂ = 2 A; shared 4 Ω carries 1 A"
  },
  "mistakes": [
   "Adding mesh currents in a shared branch instead of subtracting (with both clockwise)."
  ],
  "related": [
   "kirchhoff-laws",
   "nodal-analysis",
   "circuit-analysis"
  ],
  "keywords": "loop current supermesh"
 },
 {
  "id": "superposition",
  "title": "Superposition theorem",
  "levels": [
   "college",
   "university"
  ],
  "subject": "dc",
  "summary": "In a linear circuit, the response to several sources is the sum of the responses to each alone.",
  "explanation": [
   "Consider one independent source at a time, replacing the others by their internal resistance: voltage sources become short circuits, current sources become open circuits. Find the current/voltage of interest in each case and add them algebraically, respecting direction.",
   "Superposition works for currents and voltages but NOT for power, because power is non-linear (I²R). Dependent sources are never removed."
  ],
  "formulas": [
   {
    "expr": "I = I' + I'' + …",
    "desc": "sum of individual contributions"
   }
  ],
  "example": {
   "problem": "A 2 Ω resistor is fed by a 10 V source through 2 Ω and, in parallel, by a 3 A current source. Find the current in the load 2 Ω.",
   "steps": [
    "Voltage source alone (current source open): I' = 10/(2 + 2) = 2.5 A.",
    "Current source alone (voltage source shorted): splits equally between two 2 Ω → I'' = 1.5 A, same direction.",
    "I = 2.5 + 1.5 = 4 A."
   ],
   "answer": "4 A"
  },
  "mistakes": [
   "Applying superposition to power.",
   "Shorting a current source or opening a voltage source."
  ],
  "related": [
   "thevenin",
   "norton",
   "network-theorems",
   "kirchhoff-laws"
  ],
  "keywords": "superposition linear"
 },
 {
  "id": "thevenin",
  "title": "Thevenin's theorem",
  "levels": [
   "college",
   "university"
  ],
  "subject": "dc",
  "summary": "Any linear two-terminal network equals a voltage source V_th in series with R_th.",
  "explanation": [
   "V_th is the open-circuit voltage at the terminals. R_th is the resistance seen looking back into the terminals with all independent sources killed (voltage sources shorted, current sources opened). With dependent sources use R_th = V_oc / I_sc or apply a test source.",
   "Thevenin equivalents make it easy to find load current for many different loads: I_L = V_th/(R_th + R_L)."
  ],
  "formulas": [
   {
    "expr": "V_th = V_oc",
    "desc": "open-circuit voltage"
   },
   {
    "expr": "R_th = V_oc / I_sc",
    "desc": "general method"
   },
   {
    "expr": "I_L = V_th / (R_th + R_L)",
    "desc": "load current"
   }
  ],
  "example": {
   "problem": "A 12 V source with a 6 Ω / 3 Ω divider; load connects across the 3 Ω. Find the Thevenin equivalent and the current in a 2 Ω load.",
   "steps": [
    "V_th = 12 × 3/9 = 4 V.",
    "R_th = 6 ∥ 3 = 2 Ω.",
    "I_L = 4/(2 + 2) = 1 A."
   ],
   "answer": "4 V, 2 Ω; 1 A"
  },
  "mistakes": [
   "Leaving the load connected when finding V_oc.",
   "Forgetting internal resistance of practical sources."
  ],
  "related": [
   "norton",
   "max-power-transfer",
   "superposition",
   "network-theorems"
  ],
  "keywords": "thevenin equivalent open circuit"
 },
 {
  "id": "norton",
  "title": "Norton's theorem",
  "levels": [
   "college",
   "university"
  ],
  "subject": "dc",
  "summary": "Any linear two-terminal network equals a current source I_N in parallel with R_N.",
  "explanation": [
   "I_N is the short-circuit current at the terminals; R_N equals R_th, found the same way. Norton and Thevenin forms convert into each other: V_th = I_N·R_N.",
   "Norton form is convenient when the load is in parallel with other branches, or for transistor output models."
  ],
  "formulas": [
   {
    "expr": "I_N = I_sc",
    "desc": "short-circuit current"
   },
   {
    "expr": "R_N = R_th, V_th = I_N·R_N",
    "desc": "source transformation"
   }
  ],
  "example": {
   "problem": "Convert a Thevenin source of 4 V and 2 Ω into Norton form.",
   "steps": [
    "I_N = V_th/R_th = 4/2 = 2 A.",
    "R_N = 2 Ω in parallel."
   ],
   "answer": "2 A in parallel with 2 Ω"
  },
  "mistakes": [
   "Placing R_N in series with the current source."
  ],
  "related": [
   "thevenin",
   "superposition",
   "network-theorems"
  ],
  "keywords": "norton equivalent short circuit current source transformation"
 },
 {
  "id": "max-power-transfer",
  "title": "Maximum power transfer",
  "levels": [
   "college",
   "university"
  ],
  "subject": "dc",
  "summary": "A load receives maximum power when R_L = R_th.",
  "explanation": [
   "For a source with Thevenin resistance R_th, power in the load is maximum when R_L = R_th. Efficiency at that point is only 50 % — half the power is lost in the source — so power systems never operate there. It matters in signal circuits (audio amplifiers, RF antennas, matching networks).",
   "For AC sources with complex impedance, maximum power is delivered when Z_L = Z_th* (complex conjugate)."
  ],
  "formulas": [
   {
    "expr": "R_L = R_th",
    "desc": "condition"
   },
   {
    "expr": "P_max = V_th² / (4·R_th)",
    "desc": "maximum power"
   }
  ],
  "example": {
   "problem": "A source has V_th = 20 V, R_th = 5 Ω. Find R_L and P_max.",
   "steps": [
    "R_L = 5 Ω.",
    "P_max = 20²/(4×5) = 20 W."
   ],
   "answer": "5 Ω; 20 W"
  },
  "mistakes": [
   "Thinking maximum power transfer means maximum efficiency."
  ],
  "related": [
   "thevenin",
   "network-theorems",
   "ac-power"
  ],
  "keywords": "impedance matching"
 },
 {
  "id": "network-theorems",
  "title": "Network theorems (overview)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "dc",
  "summary": "Summary of superposition, Thevenin, Norton, Millman, max power and reciprocity.",
  "explanation": [
   "Network theorems apply to linear bilateral networks. Superposition separates sources. Thevenin/Norton reduce a network to a simple source. Maximum power transfer gives the best load. Millman's theorem gives the common voltage of parallel branches with sources. Reciprocity: in a passive network the transfer ratio from port A to B equals that from B to A.",
   "In AC, all theorems apply with impedances and phasors in place of resistances and DC values."
  ],
  "formulas": [
   {
    "expr": "V = Σ(E_k/R_k) / Σ(1/R_k)",
    "desc": "Millman's theorem"
   }
  ],
  "example": {
   "problem": "Use Millman: branches 12 V/2 Ω, 6 V/3 Ω and a plain 6 Ω (0 V) in parallel. Find the common voltage.",
   "steps": [
    "Numerator: 12/2 + 6/3 + 0 = 8.",
    "Denominator: 1/2 + 1/3 + 1/6 = 1.",
    "V = 8 V."
   ],
   "answer": "8 V"
  },
  "mistakes": [
   "Applying the theorems to non-linear components (diodes) without linearising."
  ],
  "related": [
   "superposition",
   "thevenin",
   "norton",
   "max-power-transfer",
   "ac-network-theorems"
  ],
  "keywords": "millman reciprocity theorems"
 },
 {
  "id": "star-delta-transformation",
  "title": "Star–delta (Y–Δ) transformation",
  "levels": [
   "college",
   "university"
  ],
  "subject": "dc",
  "summary": "Converting between star and delta resistor networks to simplify bridges.",
  "explanation": [
   "Some networks (e.g. an unbalanced bridge) have no series or parallel groups. Converting a delta of three resistors to an equivalent star (or vice versa) unlocks reduction. The equivalents are identical at the three terminals.",
   "Balanced case: R_Y = R_Δ/3."
  ],
  "formulas": [
   {
    "expr": "R_a = R_ab·R_ca / (R_ab + R_bc + R_ca)",
    "desc": "delta → star"
   },
   {
    "expr": "R_ab = (R_aR_b + R_bR_c + R_cR_a)/R_c",
    "desc": "star → delta"
   }
  ],
  "example": {
   "problem": "Convert a balanced delta of 30 Ω per side to star.",
   "steps": [
    "R_Y = 30×30/(30+30+30) = 10 Ω each."
   ],
   "answer": "10 Ω per arm"
  },
  "mistakes": [
   "Using the wrong adjacent resistors in the delta-to-star numerator."
  ],
  "related": [
   "series-parallel",
   "wheatstone-bridge",
   "star-delta-connections"
  ],
  "keywords": "wye delta pi tee transform"
 },
 {
  "id": "wheatstone-bridge",
  "title": "Wheatstone bridge",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "dc",
  "summary": "A bridge circuit for accurate resistance measurement and sensor signal conditioning.",
  "explanation": [
   "Four resistors form two dividers fed from one source, with a detector between their midpoints. At balance no current flows in the detector and R₁/R₂ = R₃/R₄. Strain gauges and RTDs are used in bridges so that small resistance changes give a measurable differential voltage.",
   "Balance is independent of supply voltage, which makes the bridge accurate."
  ],
  "formulas": [
   {
    "expr": "R₁/R₂ = R₃/R₄",
    "desc": "balance (R₁, R₂ one arm; R₃, R₄ the other)"
   },
   {
    "expr": "R_x = R₃ × R₂/R₁",
    "desc": "unknown from known arms"
   }
  ],
  "example": {
   "problem": "At balance R₁ = 100 Ω, R₂ = 150 Ω, R₃ = 220 Ω. Find R₄.",
   "steps": [
    "R₄ = R₃ × R₂/R₁ = 220 × 150/100 = 330 Ω."
   ],
   "answer": "330 Ω"
  },
  "mistakes": [
   "Matching the wrong pairs of arms in the ratio."
  ],
  "related": [
   "voltage-divider",
   "instrumentation",
   "sensors-transducers"
  ],
  "keywords": "bridge balance strain gauge"
 },
 {
  "id": "internal-resistance",
  "title": "Internal resistance of sources",
  "levels": [
   "school",
   "college"
  ],
  "subject": "dc",
  "summary": "Real sources lose voltage inside themselves under load.",
  "explanation": [
   "A real cell behaves like an ideal EMF ε in series with an internal resistance r. With current I, the \"lost volts\" Ir are dropped inside, so terminal voltage V = ε − Ir. Short-circuit current is ε/r. Internal resistance rises as batteries age or get cold, which is why a weak car battery fails under cranking load.",
   "To find ε and r experimentally, plot V against I: the y-intercept is ε and the gradient is −r."
  ],
  "formulas": [
   {
    "expr": "V = ε − I·r",
    "desc": "terminal voltage"
   },
   {
    "expr": "I = ε / (R + r)",
    "desc": "circuit current"
   }
  ],
  "example": {
   "problem": "A cell of EMF 1.5 V delivers 0.5 A into a 2.8 Ω load. Find r.",
   "steps": [
    "ε = I(R + r) → 1.5 = 0.5(2.8 + r).",
    "3 = 2.8 + r → r = 0.2 Ω."
   ],
   "answer": "0.2 Ω"
  },
  "mistakes": [
   "Measuring EMF with a load connected."
  ],
  "related": [
   "voltage-emf",
   "batteries",
   "thevenin"
  ],
  "keywords": "lost volts emf terminal voltage"
 },
 {
  "id": "dependent-sources",
  "title": "Dependent (controlled) sources",
  "levels": [
   "university"
  ],
  "subject": "dc",
  "summary": "VCVS, VCCS, CCVS and CCCS — the models behind transistors and op-amps.",
  "explanation": [
   "A dependent source's value is controlled by a voltage or current elsewhere in the circuit: VCVS (V = μ·v_x), VCCS (I = g_m·v_x), CCVS (V = r_m·i_x), CCCS (I = β·i_x). They model transistors (hybrid-π uses a VCCS g_m·v_be) and op-amps (VCVS A·v_d).",
   "In circuit analysis never kill a dependent source. Thevenin resistance must be found with a test source or V_oc/I_sc."
  ],
  "formulas": [
   {
    "expr": "R_th = V_test / I_test",
    "desc": "test-source method"
   }
  ],
  "example": {
   "problem": "A CCCS of 50·i_b feeds a 1 kΩ collector load; i_b = 20 µA. Find the output voltage magnitude.",
   "steps": [
    "I = 50 × 20 µA = 1 mA.",
    "V = 1 mA × 1 kΩ = 1 V."
   ],
   "answer": "1 V"
  },
  "mistakes": [
   "Shorting or opening dependent sources when finding R_th."
  ],
  "related": [
   "nodal-analysis",
   "thevenin",
   "bjt-amplifiers",
   "op-amps"
  ],
  "keywords": "controlled source vcvs vccs ccvs cccs"
 }
];

export default topics;
