// AUTO-GENERATED study content for the Electrical Theory library. Edit the source content, not this file by hand.
import type { TheoryTopic } from '../types';

const topics: TheoryTopic[] = [
 {
  "id": "number-systems",
  "title": "Number systems (binary, hex, BCD, two's complement)",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "digital",
  "summary": "How digital systems represent numbers.",
  "explanation": [
   "Binary (base 2) uses bits 0/1 with place values 1, 2, 4, 8…; hexadecimal (base 16, digits 0–9, A–F) groups 4 bits per digit; octal groups 3 bits. BCD encodes each decimal digit in 4 bits (for displays). Signed integers use two's complement: invert all bits and add 1 to negate; an n-bit range is −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1.",
   "Gray code changes only one bit between successive values — used in encoders and K-map ordering."
  ],
  "formulas": [
   {
    "expr": "N = Σ dᵢ·bⁱ",
    "desc": "positional value"
   },
   {
    "expr": "−x = (NOT x) + 1",
    "desc": "two's complement"
   }
  ],
  "example": {
   "problem": "Convert 202₁₀ to binary and hex; find the 8-bit two's complement of −20.",
   "steps": [
    "202 = 128 + 64 + 8 + 2 = 1100 1010₂ = CA₁₆.",
    "20 = 0001 0100 → invert 1110 1011 → +1 = 1110 1100."
   ],
   "answer": "11001010₂ = 0xCA; −20 = 11101100₂"
  },
  "mistakes": [
   "Forgetting to add 1 after inverting."
  ],
  "related": [
   "logic-gates",
   "boolean-algebra",
   "microcontrollers"
  ],
  "keywords": "binary hex hexadecimal octal bcd twos complement gray code"
 },
 {
  "id": "logic-gates",
  "title": "Logic gates",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "digital",
  "summary": "AND, OR, NOT, NAND, NOR, XOR, XNOR and their truth tables.",
  "explanation": [
   "AND outputs 1 only if all inputs are 1; OR if any input is 1; NOT inverts; NAND and NOR are inverted AND/OR and are universal (any logic can be built from either alone). XOR outputs 1 when inputs differ (used in adders and parity); XNOR when they are equal. Logic families: TTL (5 V) and CMOS (wide supply, very low static power).",
   "Unused CMOS inputs must never float — tie them high or low."
  ],
  "formulas": [
   {
    "expr": "AND: Y = A·B; OR: Y = A + B; NOT: Y = A̅",
    "desc": "basic gates"
   },
   {
    "expr": "XOR: Y = A⊕B = A̅B + AB̅",
    "desc": "exclusive-OR"
   }
  ],
  "example": {
   "problem": "Build NOT, AND and OR from NAND gates only.",
   "steps": [
    "NOT: tie both NAND inputs together → (A·A)̅ = A̅.",
    "AND: NAND followed by NAND-inverter. OR: invert each input with a NAND, then NAND them (De Morgan)."
   ],
   "answer": "NAND is universal"
  },
  "mistakes": [
   "Leaving CMOS inputs floating."
  ],
  "related": [
   "boolean-algebra",
   "karnaugh-maps",
   "digital-logic",
   "number-systems"
  ],
  "keywords": "and or not nand nor xor gate truth table ttl cmos"
 },
 {
  "id": "boolean-algebra",
  "title": "Boolean algebra & De Morgan's theorems",
  "levels": [
   "college",
   "university"
  ],
  "subject": "digital",
  "summary": "Laws for simplifying logic expressions.",
  "explanation": [
   "Key laws: identity (A + 0 = A, A·1 = A), null (A + 1 = 1, A·0 = 0), idempotent (A + A = A), complement (A + A̅ = 1, A·A̅ = 0), absorption (A + AB = A), and A + A̅B = A + B. De Morgan: (A·B)̅ = A̅ + B̅ and (A + B)̅ = A̅·B̅ — \"break the bar, change the sign\".",
   "Expressions are written as sum-of-products (SOP, minterms) or product-of-sums (POS, maxterms)."
  ],
  "formulas": [
   {
    "expr": "(A·B)̅ = A̅ + B̅",
    "desc": "De Morgan 1"
   },
   {
    "expr": "(A + B)̅ = A̅·B̅",
    "desc": "De Morgan 2"
   },
   {
    "expr": "A + A̅B = A + B",
    "desc": "redundancy"
   }
  ],
  "example": {
   "problem": "Simplify Y = AB + AB̅ + A̅B.",
   "steps": [
    "AB + AB̅ = A(B + B̅) = A.",
    "Y = A + A̅B = A + B."
   ],
   "answer": "Y = A + B"
  },
  "mistakes": [
   "Breaking a bar without changing AND↔OR."
  ],
  "related": [
   "logic-gates",
   "karnaugh-maps",
   "digital-logic"
  ],
  "keywords": "boolean de morgan sop pos minterm"
 },
 {
  "id": "karnaugh-maps",
  "title": "Karnaugh maps",
  "levels": [
   "college",
   "university"
  ],
  "subject": "digital",
  "summary": "Graphical minimisation of logic functions.",
  "explanation": [
   "A K-map arranges minterms in Gray-code order so adjacent cells differ by one variable. Group 1s in rectangles of 1, 2, 4, 8… cells (powers of two), as large as possible, wrapping around edges; each group gives a product term that omits the variables that change. Don't-care conditions (X) can be included if they make bigger groups."
  ],
  "formulas": [
   {
    "expr": "Group of 2ᵏ cells eliminates k variables",
    "desc": "rule"
   }
  ],
  "example": {
   "problem": "Minimise F(A,B,C) = Σm(0, 2, 4, 6).",
   "steps": [
    "These are all cells with C = 0 (A and B vary).",
    "One group of four → F = C̅."
   ],
   "answer": "F = C̅"
  },
  "mistakes": [
   "Grouping 3 or 6 cells (groups must be powers of two).",
   "Forgetting wrap-around adjacency."
  ],
  "related": [
   "boolean-algebra",
   "logic-gates",
   "digital-logic"
  ],
  "keywords": "kmap karnaugh minimisation don't care"
 },
 {
  "id": "digital-logic",
  "title": "Combinational logic (adders, multiplexers, decoders)",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "digital",
  "summary": "Building useful functions from gates.",
  "explanation": [
   "Combinational circuits' outputs depend only on present inputs. A half adder gives S = A⊕B, C = AB; a full adder adds a carry-in: S = A⊕B⊕C_in, C_out = AB + C_in(A⊕B). Chained full adders form ripple-carry adders. Multiplexers select one of 2ⁿ inputs using n select lines; demultiplexers and decoders do the reverse (e.g. 3-to-8 decoder, BCD-to-7-segment). Encoders, comparators and parity generators are other building blocks."
  ],
  "formulas": [
   {
    "expr": "S = A⊕B⊕C_in, C_out = AB + C_in(A⊕B)",
    "desc": "full adder"
   },
   {
    "expr": "Inputs = 2ⁿ for n select lines",
    "desc": "multiplexer"
   }
  ],
  "example": {
   "problem": "How many select lines does a 16-to-1 multiplexer need? Add 1011 + 0110 in binary.",
   "steps": [
    "2ⁿ = 16 → n = 4.",
    "1011 (11) + 0110 (6) = 1 0001 (17)."
   ],
   "answer": "4 select lines; 10001₂"
  },
  "mistakes": [
   "Confusing combinational (no memory) with sequential (has memory) logic."
  ],
  "related": [
   "logic-gates",
   "flip-flops",
   "number-systems",
   "karnaugh-maps"
  ],
  "keywords": "half adder full adder multiplexer mux decoder encoder 7 segment"
 },
 {
  "id": "flip-flops",
  "title": "Latches & flip-flops",
  "levels": [
   "college",
   "university"
  ],
  "subject": "digital",
  "summary": "Basic memory elements: SR, D, JK and T.",
  "explanation": [
   "Sequential circuits have memory. An SR latch (cross-coupled NOR/NAND) stores a bit; S = R = 1 is invalid for a NOR latch. A D flip-flop copies D to Q on the clock edge. A JK flip-flop: J = K = 1 toggles. A T flip-flop toggles when T = 1 — the basis of counters. Edge-triggered devices respond only on the rising (or falling) clock edge; setup and hold times must be respected."
  ],
  "formulas": [
   {
    "expr": "Q⁺ = D",
    "desc": "D flip-flop"
   },
   {
    "expr": "Q⁺ = JQ̅ + K̅Q",
    "desc": "JK characteristic"
   },
   {
    "expr": "Q⁺ = T ⊕ Q",
    "desc": "T flip-flop"
   }
  ],
  "example": {
   "problem": "A JK flip-flop has Q = 0. Inputs J = 1, K = 1 for three clock edges. Find Q after each.",
   "steps": [
    "Toggle each edge: 1, 0, 1."
   ],
   "answer": "1, 0, 1"
  },
  "mistakes": [
   "Ignoring setup/hold times, causing metastability."
  ],
  "related": [
   "counters-registers",
   "digital-logic",
   "555-timer"
  ],
  "keywords": "flip flop latch sr d jk t clock edge"
 },
 {
  "id": "counters-registers",
  "title": "Counters & shift registers",
  "levels": [
   "college",
   "university"
  ],
  "subject": "digital",
  "summary": "Counting and moving data with chains of flip-flops.",
  "explanation": [
   "An n-bit binary counter counts 0 to 2ⁿ − 1 (modulus 2ⁿ). Asynchronous (ripple) counters clock each stage from the previous one — simple but slow and glitchy. Synchronous counters clock all stages together. A mod-N counter resets at N (e.g. mod-10 decade counter). Each stage divides frequency by 2. Shift registers (SISO, SIPO, PISO, PIPO) move data serially/parallel — e.g. the 74HC595 expands microcontroller outputs."
  ],
  "formulas": [
   {
    "expr": "Modulus = 2ⁿ",
    "desc": "n-bit binary counter"
   },
   {
    "expr": "f_out = f_in / 2ⁿ",
    "desc": "frequency division"
   }
  ],
  "example": {
   "problem": "How many flip-flops are needed for a mod-12 counter, and what is f_out of a 4-stage ripple counter at 32 kHz?",
   "steps": [
    "2³ = 8 < 12 ≤ 16 = 2⁴ → 4 flip-flops.",
    "f_out = 32 kHz/16 = 2 kHz."
   ],
   "answer": "4; 2 kHz"
  },
  "mistakes": [
   "Using ripple counters where outputs are decoded at high speed (glitches)."
  ],
  "related": [
   "flip-flops",
   "digital-logic",
   "microcontrollers"
  ],
  "keywords": "counter ripple synchronous mod shift register 74hc595"
 },
 {
  "id": "adc-dac",
  "title": "ADC & DAC conversion",
  "levels": [
   "college",
   "university"
  ],
  "subject": "digital",
  "summary": "Moving between the analogue and digital worlds.",
  "explanation": [
   "An ADC samples and quantises an analogue voltage into an n-bit code. Resolution (LSB size) = V_ref/2ⁿ. Types: successive approximation (SAR, common in MCUs), flash (fastest), sigma-delta (high resolution, audio/measurement), dual-slope (meters). DACs (R-2R ladder, weighted resistor, PWM + filter) convert codes back to voltage. Sampling must obey Nyquist: f_s > 2f_max, with an anti-aliasing filter."
  ],
  "formulas": [
   {
    "expr": "LSB = V_ref / 2ⁿ",
    "desc": "resolution"
   },
   {
    "expr": "Code = V_in / V_ref × 2ⁿ (rounded down)",
    "desc": "ADC output"
   },
   {
    "expr": "SNR ≈ 6.02n + 1.76 dB",
    "desc": "ideal quantisation SNR"
   }
  ],
  "example": {
   "problem": "A 10-bit ADC with 3.3 V reference reads 1.2 V. Find the LSB and the code.",
   "steps": [
    "LSB = 3.3/1 024 ≈ 3.22 mV.",
    "Code = 1.2/3.3 × 1 024 ≈ 372.4 → 372."
   ],
   "answer": "≈ 3.22 mV; 372"
  },
  "mistakes": [
   "Sampling below twice the highest frequency, causing aliasing."
  ],
  "related": [
   "sampling-nyquist",
   "microcontrollers",
   "sensors-transducers",
   "number-systems"
  ],
  "keywords": "adc dac analog to digital resolution lsb sar sigma delta r-2r"
 },
 {
  "id": "microcontrollers",
  "title": "Microcontrollers & embedded systems",
  "levels": [
   "school",
   "college",
   "university"
  ],
  "subject": "digital",
  "summary": "Small computers on a chip: CPU, memory and peripherals for control.",
  "explanation": [
   "A microcontroller (Arduino's ATmega328P, ESP32, STM32, PIC) integrates a CPU, flash program memory, RAM, GPIO pins, timers/PWM, ADCs and serial interfaces (UART, SPI, I²C). Programs typically run setup then a super-loop, or use interrupts and an RTOS. GPIO pins have current limits (often ~20 mA or less) — use transistors for loads.",
   "Interfacing rules: match logic levels (3.3 V vs 5 V), use pull-up/pull-down resistors on inputs, debounce switches, add flyback diodes on inductive loads and decouple supplies with 100 nF capacitors close to each IC."
  ],
  "formulas": [
   {
    "expr": "PWM average V = D × V_cc",
    "desc": "PWM output"
   },
   {
    "expr": "Timer f = f_clk / (prescaler × (TOP + 1))",
    "desc": "timer frequency"
   }
  ],
  "example": {
   "problem": "A 16 MHz MCU timer with prescaler 64 counts to 249. Find the interrupt frequency.",
   "steps": [
    "f = 16×10⁶ / (64 × 250).",
    "= 1 000 Hz."
   ],
   "answer": "1 kHz (1 ms tick)"
  },
  "mistakes": [
   "Driving a motor or relay directly from a GPIO pin.",
   "Connecting 5 V signals to a 3.3 V-only MCU."
  ],
  "related": [
   "communication-protocols",
   "adc-dac",
   "transistor-switching",
   "plc",
   "counters-registers"
  ],
  "keywords": "microcontroller arduino esp32 stm32 gpio pwm interrupt embedded"
 },
 {
  "id": "communication-protocols",
  "title": "Serial communication (UART, I²C, SPI, RS-485, CAN)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "digital",
  "summary": "How chips and devices exchange data.",
  "explanation": [
   "UART: asynchronous, TX/RX, agreed baud rate (e.g. 9 600 or 115 200), frame of start bit + 8 data + optional parity + stop bit. I²C: two wires (SDA, SCL) with pull-ups, addressed devices, 100/400 kHz. SPI: four wires (MOSI, MISO, SCK, CS), full duplex, fast. RS-485: differential multidrop for industrial distances up to ~1 200 m (Modbus RTU). CAN: robust multi-master bus in vehicles and machinery."
  ],
  "formulas": [
   {
    "expr": "Byte time = bits per frame / baud",
    "desc": "UART timing"
   }
  ],
  "example": {
   "problem": "How long does it take to send 100 bytes at 9 600 baud with 8N1 framing?",
   "steps": [
    "8N1 = 10 bits per byte → 1 000 bits.",
    "t = 1 000/9 600 ≈ 0.104 s."
   ],
   "answer": "≈ 104 ms"
  },
  "mistakes": [
   "Forgetting the I²C pull-up resistors.",
   "Crossing TX-TX instead of TX-RX on UART."
  ],
  "related": [
   "microcontrollers",
   "plc",
   "digital-logic"
  ],
  "keywords": "uart i2c spi rs485 modbus can bus baud rate serial"
 },
 {
  "id": "plc",
  "title": "Programmable logic controllers (PLC)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "digital",
  "summary": "Industrial controllers programmed in ladder logic.",
  "explanation": [
   "A PLC reads inputs (push buttons, sensors), executes a program cyclically (scan cycle: read inputs → execute → update outputs), and drives outputs (contactors, valves, lamps). IEC 61131-3 languages: Ladder Diagram, Function Block Diagram, Structured Text, Sequential Function Chart and Instruction List. Ladder rungs mimic relay logic: NO/NC contacts, coils, timers (TON, TOF), counters and latches.",
   "Hard-wired safety circuits (emergency stops) should not rely solely on standard PLC logic."
  ],
  "formulas": [
   {
    "expr": "Scan time = input read + program + output update",
    "desc": "cycle"
   }
  ],
  "example": {
   "problem": "Write ladder logic for a motor start/stop with seal-in.",
   "steps": [
    "Rung: [Stop NC] —[Start NO]— (Motor coil), with a Motor NO contact in parallel with Start.",
    "Pressing Start energises the coil; the parallel contact holds it until Stop opens."
   ],
   "answer": "Stop NC in series, Start NO with seal-in contact in parallel"
  },
  "mistakes": [
   "Programming an emergency-stop as an NO contact (a broken wire would then prevent stopping)."
  ],
  "related": [
   "motor-starters",
   "microcontrollers",
   "control-systems",
   "communication-protocols"
  ],
  "keywords": "plc ladder logic scan cycle iec 61131 timer counter seal in"
 },
 {
  "id": "signals-and-systems",
  "title": "Signals & systems",
  "levels": [
   "university"
  ],
  "subject": "signals",
  "summary": "Classifying signals and systems; LTI systems, impulse response and convolution.",
  "explanation": [
   "Signals are continuous or discrete, periodic or aperiodic, energy or power signals. A system is linear if superposition holds and time-invariant if a delayed input gives an equally delayed output. Linear time-invariant (LTI) systems are completely described by their impulse response h(t); the output is the convolution y(t) = x(t) * h(t). Causal systems have h(t) = 0 for t < 0; BIBO-stable systems have absolutely integrable h(t)."
  ],
  "formulas": [
   {
    "expr": "y(t) = ∫x(τ)h(t − τ)dτ",
    "desc": "convolution"
   },
   {
    "expr": "Y(s) = H(s)X(s)",
    "desc": "convolution becomes multiplication"
   }
  ],
  "example": {
   "problem": "Is y(t) = 3x(t) + 2 linear?",
   "steps": [
    "Test x = 0: y = 2 ≠ 0, so superposition fails.",
    "It is affine, not linear (though time-invariant)."
   ],
   "answer": "Not linear"
  },
  "mistakes": [
   "Calling any straight-line relationship \"linear\" — a constant offset breaks linearity."
  ],
  "related": [
   "fourier",
   "laplace",
   "sampling-nyquist",
   "z-transform"
  ],
  "keywords": "lti linear time invariant convolution impulse response causal bibo"
 },
 {
  "id": "fourier",
  "title": "Fourier series & transform",
  "levels": [
   "university"
  ],
  "subject": "signals",
  "summary": "Representing signals as sums of sinusoids and analysing frequency content.",
  "explanation": [
   "A periodic signal can be written as a Fourier series: DC + Σ harmonics at multiples of the fundamental f₀. A square wave contains only odd harmonics with amplitudes 4A/(nπ). The Fourier transform extends this to aperiodic signals, giving a continuous spectrum. Key properties: linearity, time shift (phase), modulation (frequency shift), and convolution ↔ multiplication. The FFT computes the discrete transform efficiently.",
   "Power engineers use Fourier analysis for harmonics and THD; communications engineers for bandwidth and modulation."
  ],
  "formulas": [
   {
    "expr": "x(t) = a₀ + Σ[aₙcos(nω₀t) + bₙsin(nω₀t)]",
    "desc": "Fourier series"
   },
   {
    "expr": "X(f) = ∫x(t)e^(−j2πft)dt",
    "desc": "Fourier transform"
   },
   {
    "expr": "bₙ = 4A/(nπ), n odd",
    "desc": "square wave harmonics"
   },
   {
    "expr": "THD = √(ΣV_n²)/V₁",
    "desc": "total harmonic distortion"
   }
  ],
  "example": {
   "problem": "Find the amplitudes of the 1st, 3rd and 5th harmonics of a ±10 V square wave.",
   "steps": [
    "b₁ = 40/π ≈ 12.73 V.",
    "b₃ ≈ 4.24 V; b₅ ≈ 2.55 V."
   ],
   "answer": "12.73, 4.24, 2.55 V"
  },
  "mistakes": [
   "Expecting even harmonics in a symmetrical square wave."
  ],
  "related": [
   "signals-and-systems",
   "laplace",
   "filters",
   "sampling-nyquist"
  ],
  "keywords": "fourier series transform fft spectrum harmonics thd"
 },
 {
  "id": "laplace",
  "title": "Laplace transform",
  "levels": [
   "university"
  ],
  "subject": "signals",
  "summary": "Turning differential equations into algebra; transfer functions and circuit analysis in s-domain.",
  "explanation": [
   "The Laplace transform F(s) = ∫₀^∞ f(t)e^(−st)dt converts derivatives into multiplication by s (with initial conditions), so circuit ODEs become algebraic. In the s-domain: R → R, L → sL, C → 1/(sC). Transfer function H(s) = Y(s)/X(s); poles (roots of the denominator) determine stability and natural response. Use partial fractions and tables to invert. Final value theorem: f(∞) = lim s→0 sF(s)."
  ],
  "formulas": [
   {
    "expr": "L{1} = 1/s, L{e^(−at)} = 1/(s + a), L{sin ωt} = ω/(s² + ω²)",
    "desc": "common pairs"
   },
   {
    "expr": "L{f′(t)} = sF(s) − f(0)",
    "desc": "derivative"
   },
   {
    "expr": "f(∞) = lim_(s→0) sF(s)",
    "desc": "final value theorem"
   }
  ],
  "example": {
   "problem": "Find the step response of H(s) = 1/(s + 2).",
   "steps": [
    "Y(s) = 1/(s(s + 2)) = ½(1/s − 1/(s + 2)).",
    "y(t) = ½(1 − e^(−2t))."
   ],
   "answer": "y(t) = 0.5(1 − e^(−2t))"
  },
  "mistakes": [
   "Applying the final value theorem when poles lie in the right-half plane."
  ],
  "related": [
   "signals-and-systems",
   "control-systems",
   "rc-transients",
   "rl-transients",
   "fourier"
  ],
  "keywords": "laplace transform s domain transfer function poles zeros partial fractions"
 },
 {
  "id": "sampling-nyquist",
  "title": "Sampling & the Nyquist theorem",
  "levels": [
   "college",
   "university"
  ],
  "subject": "signals",
  "summary": "Converting continuous signals to discrete samples without losing information.",
  "explanation": [
   "The Nyquist–Shannon theorem: a band-limited signal with highest frequency f_max can be perfectly reconstructed if sampled at f_s > 2f_max. Below this, aliasing folds high frequencies into false low ones: an input at f appears at |f − k·f_s|. Anti-aliasing low-pass filters precede ADCs. CD audio samples at 44.1 kHz to cover the 20 kHz audible range."
  ],
  "formulas": [
   {
    "expr": "f_s > 2·f_max",
    "desc": "Nyquist criterion"
   },
   {
    "expr": "f_alias = |f − k·f_s|",
    "desc": "alias frequency (nearest k)"
   }
  ],
  "example": {
   "problem": "A 7 kHz tone is sampled at 10 kHz. What frequency appears?",
   "steps": [
    "f_s/2 = 5 kHz < 7 kHz → aliasing.",
    "f_alias = |7 − 10| = 3 kHz."
   ],
   "answer": "3 kHz"
  },
  "mistakes": [
   "Sampling at exactly 2f_max — theoretical limit, not practical."
  ],
  "related": [
   "adc-dac",
   "fourier",
   "z-transform",
   "signals-and-systems"
  ],
  "keywords": "nyquist sampling aliasing anti aliasing"
 },
 {
  "id": "z-transform",
  "title": "Z-transform & digital signal processing",
  "levels": [
   "university"
  ],
  "subject": "signals",
  "summary": "The discrete-time counterpart of the Laplace transform; FIR and IIR filters.",
  "explanation": [
   "The Z-transform X(z) = Σx[n]z⁻ⁿ analyses discrete systems; z⁻¹ is a one-sample delay. Difference equations become algebraic transfer functions H(z). Stability requires all poles inside the unit circle. FIR filters (finite impulse response) are always stable and can have linear phase; IIR filters use feedback, achieving sharp responses with fewer coefficients."
  ],
  "formulas": [
   {
    "expr": "X(z) = Σ x[n]·z⁻ⁿ",
    "desc": "Z-transform"
   },
   {
    "expr": "y[n] = Σ b_k·x[n − k]",
    "desc": "FIR filter"
   },
   {
    "expr": "|poles| < 1",
    "desc": "stability"
   }
  ],
  "example": {
   "problem": "A moving-average filter y[n] = (x[n] + x[n−1])/2. Find H(z) and its gain at DC.",
   "steps": [
    "H(z) = ½(1 + z⁻¹).",
    "At DC z = 1: H = 1."
   ],
   "answer": "H(z) = 0.5(1 + z⁻¹); DC gain 1"
  },
  "mistakes": [
   "Using the s-plane stability rule (left half) for z-domain poles."
  ],
  "related": [
   "sampling-nyquist",
   "laplace",
   "signals-and-systems",
   "filters"
  ],
  "keywords": "z transform dsp fir iir digital filter unit circle"
 },
 {
  "id": "control-systems",
  "title": "Control systems (open/closed loop)",
  "levels": [
   "college",
   "university"
  ],
  "subject": "signals",
  "summary": "Feedback control, block diagrams, steady-state error and system response.",
  "explanation": [
   "Open-loop systems act without measuring the output (toaster timer); closed-loop systems feed back the measured output and act on the error (thermostat, cruise control). For forward gain G(s) and feedback H(s), the closed-loop transfer function is G/(1 + GH). Second-order systems are characterised by natural frequency ω_n and damping ratio ζ: ζ < 1 underdamped (overshoot), ζ = 1 critically damped, ζ > 1 overdamped.",
   "Steady-state error to a step for a type-0 system with unity feedback is 1/(1 + K_p)."
  ],
  "formulas": [
   {
    "expr": "T(s) = G(s)/(1 + G(s)H(s))",
    "desc": "closed loop"
   },
   {
    "expr": "s² + 2ζω_n·s + ω_n²",
    "desc": "second-order characteristic equation"
   },
   {
    "expr": "%OS = e^(−ζπ/√(1 − ζ²)) × 100",
    "desc": "percentage overshoot"
   }
  ],
  "example": {
   "problem": "G(s) = 10/(s + 1) with unity feedback. Find T(s) and steady-state step error.",
   "steps": [
    "T = 10/(s + 11); final value = 10/11 ≈ 0.909.",
    "e_ss = 1 − 0.909 = 0.091 (= 1/(1 + 10))."
   ],
   "answer": "T = 10/(s + 11); e_ss ≈ 9.1 %"
  },
  "mistakes": [
   "Adding feedback blocks instead of using the 1 + GH denominator."
  ],
  "related": [
   "pid-control",
   "bode-plots",
   "laplace",
   "feedback-amplifiers"
  ],
  "keywords": "control system closed loop open loop damping ratio overshoot block diagram"
 },
 {
  "id": "pid-control",
  "title": "PID control",
  "levels": [
   "college",
   "university"
  ],
  "subject": "signals",
  "summary": "Proportional, integral and derivative actions in industrial controllers.",
  "explanation": [
   "A PID controller output u = K_p·e + K_i∫e dt + K_d·de/dt. Proportional action reacts to present error but leaves steady-state offset; integral action removes offset but can cause overshoot and windup; derivative action anticipates changes and adds damping but amplifies noise. Tuning methods: Ziegler–Nichols, Cohen–Coon, or software autotune."
  ],
  "formulas": [
   {
    "expr": "u(t) = K_p·e + K_i∫e dt + K_d·de/dt",
    "desc": "PID law"
   },
   {
    "expr": "C(s) = K_p + K_i/s + K_d·s",
    "desc": "transfer function"
   }
  ],
  "example": {
   "problem": "Ziegler–Nichols ultimate gain K_u = 10 with oscillation period T_u = 2 s. Find classic PID K_p, T_i, T_d.",
   "steps": [
    "K_p = 0.6K_u = 6.",
    "T_i = T_u/2 = 1 s; T_d = T_u/8 = 0.25 s."
   ],
   "answer": "K_p = 6, T_i = 1 s, T_d = 0.25 s"
  },
  "mistakes": [
   "Ignoring integral windup when the actuator saturates."
  ],
  "related": [
   "control-systems",
   "bode-plots",
   "plc"
  ],
  "keywords": "pid proportional integral derivative ziegler nichols tuning"
 },
 {
  "id": "bode-plots",
  "title": "Bode plots & stability margins",
  "levels": [
   "university"
  ],
  "subject": "signals",
  "summary": "Frequency response plots and gain/phase margins.",
  "explanation": [
   "A Bode plot shows magnitude (dB) and phase versus log frequency. Each real pole contributes −20 dB/decade beyond its corner and up to −90° phase; each zero +20 dB/decade and +90°. Gain margin is how much gain can rise before the loop becomes unstable (measured at the −180° phase crossover); phase margin is extra lag tolerable at the 0 dB gain crossover. Typical design targets: phase margin 45–60°, gain margin > 6 dB."
  ],
  "formulas": [
   {
    "expr": "|H|dB = 20·log₁₀|H(jω)|",
    "desc": "magnitude"
   },
   {
    "expr": "PM = 180° + ∠GH(jω_gc)",
    "desc": "phase margin"
   }
  ],
  "example": {
   "problem": "At gain crossover the loop phase is −135°. Find the phase margin.",
   "steps": [
    "PM = 180° + (−135°) = 45°."
   ],
   "answer": "45°"
  },
  "mistakes": [
   "Measuring phase margin at the phase crossover instead of gain crossover."
  ],
  "related": [
   "control-systems",
   "filters",
   "feedback-amplifiers"
  ],
  "keywords": "bode plot gain margin phase margin decade corner frequency"
 },
 {
  "id": "communication-systems",
  "title": "Communication systems (AM, FM, digital modulation)",
  "levels": [
   "university"
  ],
  "subject": "signals",
  "summary": "Modulating signals onto carriers for transmission.",
  "explanation": [
   "Amplitude modulation (AM) varies carrier amplitude; bandwidth = 2f_m; modulation index m ≤ 1 to avoid distortion. Frequency modulation (FM) varies frequency; Carson's rule bandwidth ≈ 2(Δf + f_m) — FM radio uses Δf = 75 kHz. Digital schemes: ASK, FSK, PSK, QAM. Shannon's capacity C = B log₂(1 + SNR) sets the upper limit on data rate."
  ],
  "formulas": [
   {
    "expr": "BW_AM = 2f_m",
    "desc": "AM bandwidth"
   },
   {
    "expr": "BW_FM ≈ 2(Δf + f_m)",
    "desc": "Carson's rule"
   },
   {
    "expr": "C = B·log₂(1 + SNR)",
    "desc": "Shannon capacity"
   }
  ],
  "example": {
   "problem": "A 3 kHz channel has SNR = 1 000 (30 dB). Find the Shannon capacity.",
   "steps": [
    "log₂(1 001) ≈ 9.97.",
    "C ≈ 3 000 × 9.97 ≈ 29.9 kbit/s."
   ],
   "answer": "≈ 30 kbit/s"
  },
  "mistakes": [
   "Using SNR in dB directly in Shannon's formula."
  ],
  "related": [
   "fourier",
   "filters",
   "transmission-lines",
   "maxwells-equations"
  ],
  "keywords": "am fm modulation carrier carson shannon qam bandwidth"
 }
];

export default topics;
