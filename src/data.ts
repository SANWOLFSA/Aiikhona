import { Guide, SparePart, Course, ForumPost, VerificationRequest } from './types';

export const initialGuides: Guide[] = [
  {
    id: "guide_1",
    title: "Nintendo Switch M92T36 Power IC Replacement & Short-Circuit Diagnosis",
    deviceCategory: "Gaming Consoles",
    deviceModel: "Nintendo Switch (HAC-001)",
    issueType: "No Power / Won't Charge / Draws 0.00A at 15V",
    difficulty: "Advanced",
    estimatedTimeMinutes: 45,
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      badge: "Master Micro-Soldering Tech",
      reputation: 3420
    },
    thumbnailUrl: "https://images.unsplash.com/photo-1612287233267-336c58ffeb8e?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    views: 18450,
    likes: 1240,
    eWasteSavedKg: 0.39,
    toolsRequired: [
      "Digital Multimeter with Fine Probe Needles",
      "Hot Air Rework Station (340°C)",
      "Soldering Iron with Chisel or Knife Tip",
      "No-Clean Tacky Flux (Amtech NC-559-V2)",
      "Solder Wick (2.0mm)",
      "Tri-Wing Y00 Screwdriver",
      "Kapton Polyimide Tape"
    ],
    partsRequired: [
      { name: "M92T36 Power Management IC", partNumber: "M92T36-QFN", priceApprox: "$4.50", partId: "part_m92t36" },
      { name: "0402 10uF 16V Ceramic Capacitors", partNumber: "C0402X5R106M160", priceApprox: "$0.25", partId: "part_cap_0402" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Safely Open Case & Isolate Battery",
        description: "Remove 4 rear Tri-wing Y00 screws, top/bottom Phillips screws, and gently lift the rear plate. CRITICAL: Unplug the battery connector using a plastic pry tool before doing ANY multimeter measurements.",
        safetyWarning: "Never disconnect or reconnect the battery with metallic tweezers; shorting battery pins will destroy the BQ24193 charging chip.",
        proTip: "Keep screws in a magnetic tray; switch uses 4 different screw lengths."
      },
      {
        stepNumber: 2,
        title: "Multimeter Diode Mode Check Around M92T36",
        description: "Set your multimeter to Diode Mode. Place the RED probe on ground (shielding frame or gold screw hole), and use the BLACK probe to measure the bypass capacitors surrounding the M92T36 chip.",
        multimeterCheck: {
          probeRed: "Main Ground Plane (Chassis frame)",
          probeBlack: "Capacitor Pin 5 / Pin 6 bypass",
          expectedValue: "0.450V - 0.520V (Anything < 0.05V is a dead short)",
          mode: "Diode / Continuity"
        },
        proTip: "If pin 5 or 6 capacitor beeps continuously to ground, M92T36 is internally punctured."
      },
      {
        stepNumber: 3,
        title: "Shielding Adjacent Plastic & Hot Air Desoldering",
        description: "Tape aluminum foil or 2 layers of Kapton tape over the plastic battery receptacle and USB-C port. Apply tacky flux generously over the M92T36 chip. Set hot air to 350°C and 45% airflow.",
        safetyWarning: "Do not blow hot air directly at the plastic audio jack or GameCard slot; they warp at 220°C."
      },
      {
        stepNumber: 4,
        title: "Pad Cleanup and Installing New M92T36",
        description: "Use copper solder wick and flux at 340°C to flatten the solder pads until uniform. Apply fresh flux, orient the new chip with Pin 1 dot aligned to PCB silkscreen, and reflow gently with circular air motion until surface tension centers the chip.",
        multimeterCheck: {
          probeRed: "Chassis Ground",
          probeBlack: "Capacitor Pin 5 bypass",
          expectedValue: "0.485V (Short removed!)",
          mode: "Diode / Continuity"
        }
      },
      {
        stepNumber: 5,
        title: "Bench Power Test with USB-C Ammeter",
        description: "Reconnect the display and battery. Plug into official 15V Nintendo charger with in-line USB power meter. Verify reading switches from 5V/0.4A to 15V/1.2A rapid charging."
      }
    ],
    publishedAt: "2026-08-14"
  },
  {
    id: "guide_2",
    title: "MacBook Pro A1706 USB-C CD3215 Retimer IC Troubleshooting & 5V Stuck Fix",
    deviceCategory: "Laptops & PCs",
    deviceModel: "Apple MacBook Pro 13\" A1706 / A1708 (Logic Board 820-00840)",
    issueType: "Stuck at 5V 0.03A / Not Negotiating 20V USB-PD",
    difficulty: "Expert",
    estimatedTimeMinutes: 75,
    author: {
      name: "Marcus Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      badge: "Circuit Board Engineer",
      reputation: 4890
    },
    thumbnailUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    views: 29800,
    likes: 2150,
    eWasteSavedKg: 1.4,
    toolsRequired: [
      "Digital USB-C Power Delivery Analyzer Meter",
      "Microscope (7x-45x trinocular)",
      "Hot Air Station with 4mm Nozzle",
      "Fine Curve Tweezers",
      "Lead-free Solder Paste (Sn96.5Ag3.0Cu0.5)",
      "Board Preheater Plate (120°C)"
    ],
    partsRequired: [
      { name: "CD3215C00 USB-C Controller BGA", partNumber: "CD3215C00ZQZR", priceApprox: "$8.20", partId: "part_cd3215" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "USB-C Amp Meter Port Cross-Comparison",
        description: "Test all 4 USB-C ports with an in-line USB-C meter. If 3 ports read 5V 0.02A and 1 port reads 5V 0.00A (or fails to communicate), identify which CD3215 corresponds to that specific port pair.",
        multimeterCheck: {
          probeRed: "Ground Shield",
          probeBlack: "PP3V3_G3H Rail",
          expectedValue: "3.3V (Active in standby)",
          mode: "Voltage"
        }
      },
      {
        stepNumber: 2,
        title: "Verifying PP1V1_UPC and PP3V3_UPC LDO Outputs",
        description: "Each CD3215 creates two local LDO rails (1.1V and 3.3V). Measure the ceramic capacitors directly behind each chip. A missing 1.1V rail indicates a defective chip.",
        multimeterCheck: {
          probeRed: "GND",
          probeBlack: "PP1V1_UPC_XB_LDO",
          expectedValue: "1.10V ± 0.05V",
          mode: "Voltage"
        }
      },
      {
        stepNumber: 3,
        title: "BGA Chip Replacement with Pre-heating",
        description: "Warm the board with an under-board heater at 120°C to protect delicate multilayer ground copper planes. Apply tacky flux and lift the BGA with hot air at 360°C. Clean solder pads with wick."
      },
      {
        stepNumber: 4,
        title: "Alignment & Solder Confirmation",
        description: "Place new pre-balled CD3215C00, gently tap corner with tweezers during reflow to confirm surface tension self-alignment. Let cool, clean flux residue with 99% IPA, and plug in 60W USB-PD adapter to confirm negotiation to 20V 1.8A."
      }
    ],
    publishedAt: "2026-07-29"
  },
  {
    id: "guide_3",
    title: "Sony WH-1000XM4 ANC Headphone Lithium Battery Swap & Ear-Cup Sensor Repair",
    deviceCategory: "Audio & Headphones",
    deviceModel: "Sony WH-1000XM4",
    issueType: "Battery Dies in 15 Minutes / Uneven Left Ear ANC Hiss",
    difficulty: "Beginner",
    estimatedTimeMinutes: 25,
    author: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      badge: "Certified Audio Tech",
      reputation: 2110
    },
    thumbnailUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    views: 14230,
    likes: 1040,
    eWasteSavedKg: 0.25,
    toolsRequired: [
      "Phillips #00 Screwdriver",
      "Plastic Spudger / Guitar Pick",
      "Soldering Iron (300°C) with Solder",
      "Double-sided Foam Adhesive Tape"
    ],
    partsRequired: [
      { name: "Li-Ion 3.7V 1000mAh Battery with NTC Thermistor", partNumber: "SP 624038", priceApprox: "$14.90", partId: "part_sony_bat" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Disengaging Right Ear-cup Cushion",
        description: "Grip the outer synthetic leather rim and twist counter-clockwise by 10 degrees to pop the 6 plastic retention clips."
      },
      {
        stepNumber: 2,
        title: "Desoldering Battery 3-Wire Leads",
        description: "Desolder RED (Positive), BLACK (Negative), and WHITE (NTC Thermal sensor) one by one. Insulate the exposed battery leads with tape immediately to prevent sparks.",
        safetyWarning: "Never puncture the soft pouch of the depleted lithium battery!"
      },
      {
        stepNumber: 3,
        title: "Soldering Replacement Battery & Testing ANC Mic",
        description: "Solder new leads paying strict attention to polarity printed on silkscreen. Inspect the tiny noise-cancelling feedforward microphone diaphragm for hair/lint blockages causing acoustic hiss."
      }
    ],
    publishedAt: "2026-09-01"
  },
  {
    id: "guide_4",
    title: "Samsung 55\" 4K Smart TV No Picture Black Screen (Sound Works) - LED Backlight Strip Repair",
    deviceCategory: "TVs & Monitors",
    deviceModel: "Samsung UN55NU7100 / RU7100",
    issueType: "Half Screen Dark / Flashlight Test Shows Image / Sound OK",
    difficulty: "Intermediate",
    estimatedTimeMinutes: 60,
    author: {
      name: "Dave Kinkade",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      badge: "Display Panel Specialist",
      reputation: 4120
    },
    thumbnailUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    views: 42100,
    likes: 3100,
    eWasteSavedKg: 18.5,
    toolsRequired: [
      "Dual Suction Cups for LCD Panel Lifting",
      "LED Backlight Tester (0-300V auto-sensing)",
      "Phillips #1 & #2 Screwdriver",
      "Thermal Heat Conductive Tape"
    ],
    partsRequired: [
      { name: "Complete Aluminum LED Backlight Array (2x 40-LED strips)", partNumber: "BN96-45952A", priceApprox: "$28.00", partId: "part_led_strip" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Discharging Power Supply & Bezel Removal",
        description: "Unplug AC power cord. Wait 5 minutes for primary 450V electrolytic filter capacitors to bleed down. Unsnap bezel edges using plastic pry cards.",
        safetyWarning: "Primary side heatsinks carry 390V DC while plugged in and for minutes after unplugging. Measure across main capacitor to verify < 5V before touching."
      },
      {
        stepNumber: 2,
        title: "Safe LCD Glass Removal with Suction Cups",
        description: "Attach heavy-duty suction cups at corners. Carefully lift the fragile 0.7mm liquid crystal cell onto a clean foam table."
      },
      {
        stepNumber: 3,
        title: "LED Strip Continuity Check with Tester",
        description: "Probe each strip at the test points with LED tester. Look for open-circuit diodes or shorted diodes that pull the constant-current driver into shutdown protection.",
        multimeterCheck: {
          probeRed: "LED Strip Positive (+) Terminal",
          probeBlack: "LED Strip Negative (-) Terminal",
          expectedValue: "124V DC glowing brightly (6V per diode x 20 diodes)",
          mode: "Voltage"
        }
      }
    ],
    publishedAt: "2026-08-04"
  }
];

export const initialParts: SparePart[] = [
  {
    id: "part_m92t36",
    partNumber: "M92T36-QFN",
    name: "Power Management IC for Gaming Console (USB-PD Controller)",
    category: "IC Chip",
    packageFootprint: "QFN-32 (4x4mm)",
    description: "Direct replacement for Nintendo Switch and USB Type-C Power Delivery control chips.",
    typicalDevices: ["Nintendo Switch V1", "Nintendo Switch V2", "Switch OLED", "Switch Lite"],
    substitutes: ["M92T55", "ROHM Semiconductor equivalent"],
    specifications: {
      "Input Voltage": "4.5V - 20V",
      "Max Power Delivery": "39W (15V 2.6A)",
      "Interface": "I2C Control",
      "Operating Temp": "-40°C to +85°C"
    },
    datasheetSummary: "Integrated USB Type-C Power Delivery negotiation controller with built-in VBUS protection MOSFET driver and CC line protection.",
    inStock: true,
    priceUSD: 4.5,
    supplier: {
      name: "Shenzhen Silicon Micro Corp",
      isVerifiedCompany: true,
      rating: 4.9,
      shippingDays: 3
    }
  },
  {
    id: "part_cd3215",
    partNumber: "CD3215C00ZQZR",
    name: "TI USB Type-C and USB-PD Controller BGA",
    category: "IC Chip",
    packageFootprint: "BGA-96 (0.4mm pitch)",
    description: "Crucial Texas Instruments USB-PD mux and charger controller used in MacBook Pro and Air logic boards.",
    typicalDevices: ["MacBook Pro A1706", "A1707", "A1708", "A1989", "A1990", "A2159"],
    substitutes: ["CD3215B03", "CD3217 (different generation)"],
    specifications: {
      "Max Voltage": "24V VBUS",
      "Internal LDOs": "1.1V and 3.3V",
      "Package": "96-ball MicroStar BGA"
    },
    datasheetSummary: "High-speed dual-role port controller with integrated power switches and high-voltage ESD protection.",
    inStock: true,
    priceUSD: 8.2,
    supplier: {
      name: "Global Chip Authentics LLC",
      isVerifiedCompany: true,
      rating: 4.8,
      shippingDays: 2
    }
  },
  {
    id: "part_cap_0402",
    partNumber: "C0402X5R106M160",
    name: "10µF 16V 0402 SMD Ceramic MLCC Capacitor (Pack of 50)",
    category: "Capacitor",
    packageFootprint: "0402 (1005 Metric)",
    description: "High-capacitance multilayer ceramic capacitor for power rail bypass and decoupling in smartphones and consoles.",
    typicalDevices: ["iPhone", "Galaxy S series", "Nintendo Switch", "Steam Deck", "Laptops"],
    substitutes: ["Murata GRM155R61C106ME11", "Samsung CL05A106MO5NUNC"],
    specifications: {
      Capacitance: "10 µF ±20%",
      "Voltage Rating": "16V DC",
      Dielectric: "X5R",
      Dimensions: "1.0 x 0.5 x 0.5 mm"
    },
    datasheetSummary: "Low-ESR MLCC suited for switching regulator filtering up to 2MHz ripple frequency.",
    inStock: true,
    priceUSD: 3.2,
    supplier: {
      name: "ComponentHarbor Verified Logistics",
      isVerifiedCompany: true,
      rating: 4.9,
      shippingDays: 1
    }
  }
];

export const initialCourses: Course[] = [
  {
    id: "course_tv_learning",
    title: "Universal Device Database: Learning from TVs",
    category: "Diagnostics",
    level: "Intermediate",
    durationHours: 8.5,
    lessonsCount: 15,
    description: "Learn how the complex architecture of modern televisions applies to all electronics. By mastering TV power supplies, T-CON boards, and LED drivers, you build a mental database to diagnose ANY device.",
    instructor: "Dave Kinkade",
    progressPercent: 0,
    isCompleted: false,
    skillsAcquired: ["SMPS Power Supplies", "T-CON Logic", "LED Backlight Drivers", "LVDS Ribbon Cable Taping"],
    modules: [
      {
        id: "m_tv_1",
        title: "The Universal Power Supply (SMPS)",
        duration: "45 min",
        summary: "TVs use Switch Mode Power Supplies just like laptops, consoles, and appliances. Learn primary vs secondary sides, standby voltages, and rectifier testing.",
        hasHandsOnCircuit: true,
        quizQuestion: {
          question: "When testing a completely dead TV power supply with a blown fuse, what component should you check before replacing the fuse?",
          options: ["The Bridge Rectifier or HOT for a short", "The LED strips", "The T-CON board", "The audio IC"],
          correctIndex: 0,
          explanation: "A blown fuse usually indicates a massive short circuit on the primary side, such as a shorted bridge rectifier or MOSFET/HOT."
        }
      },
      {
        id: "m_tv_2",
        title: "T-CON Boards & The Tape Method",
        duration: "55 min",
        summary: "Understand how T-CON boards drive LCD matrices. Learn the famous 'Tape Method' to block shorted clock lines on LVDS ribbon cables, saving otherwise ruined panels.",
        hasHandsOnCircuit: false,
        quizQuestion: {
          question: "What does the tape method actually do when applied to an LVDS ribbon cable?",
          options: ["It blocks data/clock lines to a shorted section of the glass panel.", "It acts as an insulator for heat.", "It replaces missing copper pads.", "It repairs cracked glass."],
          correctIndex: 0,
          explanation: "The tape blocks the clock/data lines going to the shorted shift registers inside the glass, allowing the rest of the panel to function."
        }
      }
    ]
  },
  {
    id: "course_1",
    title: "Multimeter & Oscilloscope Diagnostics Masterclass",
    category: "Diagnostics",
    level: "Beginner",
    durationHours: 6.5,
    lessonsCount: 12,
    description: "Master the fundamental instruments of modern electronics troubleshooting: Voltage drop testing, Diode mode continuity, ESR testing, and oscilloscope waveform analysis.",
    instructor: "Prof. David Vance, PE",
    progressPercent: 100,
    isCompleted: true,
    skillsAcquired: ["Diode Mode Testing", "Voltage Sag Tracing", "Signal Integrity with Scope", "Capacitor ESR Interpretation"],
    modules: [
      {
        id: "m1_1",
        title: "Ohm’s Law on Real World PCBs: V = I × R in Action",
        duration: "25 min",
        summary: "Understand why a short circuit causes voltage rails to drop to zero while current skyrockets.",
        hasHandsOnCircuit: true,
        quizQuestion: {
          question: "If a 5V standby power rail drops to 0.15V and draws the power supply’s maximum 3A limit, what is the resistance of the short?",
          options: ["0.05 Ω (dead short to ground)", "16.6 Ω", "1.5 Ω", "Infinite Ω"],
          correctIndex: 0,
          explanation: "By Ohm’s Law: R = V / I = 0.15V / 3A = 0.05 Ω, confirming a low-impedance short circuit to ground."
        }
      },
      {
        id: "m1_2",
        title: "Multimeter Diode Mode: Why Red Probe Goes to Ground",
        duration: "35 min",
        summary: "Discover how diode mode injects ~2V at 1mA to test semiconductor P-N junctions, and why reverse-probing ground is the gold standard.",
        hasHandsOnCircuit: true,
        quizQuestion: {
          question: "What is a typical healthy diode mode voltage drop across a silicon diode or IC ESD protection pin?",
          options: ["0.4V to 0.7V", "0.00V (Beep)", "Above 3.5V", "Negative 1.2V"],
          correctIndex: 0,
          explanation: "Standard silicon P-N junctions have a forward bias barrier voltage drop between 0.4V and 0.7V."
        }
      }
    ]
  }
];

export const initialPosts: ForumPost[] = [
  {
    id: "post_1",
    title: "SOLVED: Samsung QLED TV power light blinks 2 times every 5 seconds (T-CON Shorted)",
    content: "Had a UN65Q60A that clicked on and immediately clicked off with 2 red blinks. Disconnected the left ribbon cable from T-CON to display: TV booted with half picture! Traced C124 ceramic capacitor on the left gate panel ribbon: measured 0.2 ohms. Desoldered the capacitor and picture is 100% flawless! Saved $800 replacement panel!",
    author: {
      name: "Vikram Patel",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      role: "Master Engineer"
    },
    deviceCategory: "TVs & Monitors",
    deviceModel: "Samsung QLED UN65Q60A",
    issueType: "2 Red Blinks / Power Cycle Click",
    tags: ["Samsung", "OLED/QLED", "T-CON", "Capacitor Short", "Fixed"],
    upvotes: 48,
    repliesCount: 1,
    isSolved: true,
    createdAt: "2026-09-11",
    replies: [
      {
        id: "rep_1",
        author: "Dave Kinkade",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        role: "Display Specialist",
        content: "Spot on Vikram! Those 0402 ceramic caps on the gate-in-panel (GIP) flex PCB suffer thermal stress from the edge-lit LED bar. Excellent catch without having to cut clock lines!",
        createdAt: "2026-09-12",
        upvotes: 14,
        isAcceptedAnswer: true
      }
    ]
  }
];

export const initialVerifications: VerificationRequest[] = [
  {
    id: "verif_1",
    companyName: "Apex Precision Test & Measurement Ltd",
    registrationNumber: "UK-COMP-09482103",
    countryOfRegistration: "United Kingdom",
    tradingLicenseDocument: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80",
    vatTaxNumber: "GB 928 4103 22",
    contactEmail: "compliance@apexinstruments.co.uk",
    contactPhone: "+44 20 7946 0912",
    officialAddress: "Unit 4, Silicon Way, Cambridge CB4 0GF, UK",
    status: "Approved (Verified)",
    submittedDate: "2026-08-10",
    reviewerNotes: "Verified against UK Companies House registrar database. Authenticated business license."
  }
];
