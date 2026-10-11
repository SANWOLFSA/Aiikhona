import { Guide, SparePart, Course, ForumPost, VerificationRequest } from './types';

/**
 * Seed guides are written and maintained by the DIY Electronics team. We don't attribute them
 * to individual people, and we don't show view/like counts or videos we don't have.
 */
const GUIDE_AUTHOR = {
  name: "DIY Electronics",
  avatar: "",
  badge: "Editorial team",
  reputation: 0,
};

export const initialGuides: Guide[] = [
  {
    id: "guide_hard_reset",
    title: "Factory Reset via Recovery Mode (Bypass Frozen Screen)",
    deviceCategory: "Smartphones",
    deviceModel: "Android Devices (Universal)",
    issueType: "Frozen Screen / Bootloop / Forgotten Passcode",
    difficulty: "Beginner",
    estimatedTimeMinutes: 5,
    author: GUIDE_AUTHOR,
    thumbnailUrl: "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?w=800&auto=format&fit=crop&q=80",
    eWasteSavedKg: 0.15,
    toolsRequired: [
      "No specialized tools required (Hardware buttons only)"
    ],
    partsRequired: [],
    steps: [
      {
        stepNumber: 1,
        title: "Power Off Completely",
        description: "Ensure the device is powered down. If the screen is frozen, press and hold the Power button for 10-15 seconds until the screen goes black.",
        safetyWarning: "FRP & Activation Lock Warning: A hard reset wipes all data. If this device is linked to a Google account, you will still need the original password to bypass Activation Lock upon rebooting.",
      },
      {
        stepNumber: 2,
        title: "Hold Button Combo",
        description: "Press and hold the Volume Up + Power buttons simultaneously (Some models require Volume Down instead).",
      },
      {
        stepNumber: 3,
        title: "Release on Boot Logo",
        description: "As soon as the manufacturer logo appears on the screen, release both buttons. You should now see the Android Recovery menu.",
        proTip: "If the device shows 'No Command' with an Android mascot, hold Power and press Volume Up once to access the hidden menu."
      },
      {
        stepNumber: 4,
        title: "Navigate to Factory Reset",
        description: "The touch screen will not work here. Use the Volume buttons to scroll down and highlight 'Wipe data/factory reset'.",
      },
      {
        stepNumber: 5,
        title: "Confirm and Wipe",
        description: "Press the Power button to select. Scroll to confirm by selecting 'Factory data reset' or 'Yes'.",
      },
      {
        stepNumber: 6,
        title: "Reboot System",
        description: "Once the wipe process says 'Data wipe complete' at the bottom, select 'Reboot system now'. The first boot may take 5-10 minutes.",
      }
    ],
    publishedAt: "2026-09-17"
  },
  {
    id: "guide_1",
    title: "Nintendo Switch M92T36 Power IC Replacement & Short-Circuit Diagnosis",
    deviceCategory: "Gaming Consoles",
    deviceModel: "Nintendo Switch (HAC-001)",
    issueType: "No Power / Won't Charge / Draws 0.00A at 15V",
    difficulty: "Advanced",
    estimatedTimeMinutes: 45,
    author: GUIDE_AUTHOR,
    thumbnailUrl: "https://images.unsplash.com/photo-1612287233267-336c58ffeb8e?w=800&auto=format&fit=crop&q=80",
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
    author: GUIDE_AUTHOR,
    thumbnailUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
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
    author: GUIDE_AUTHOR,
    thumbnailUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
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
    author: GUIDE_AUTHOR,
    thumbnailUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80",
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
  },
  {
    id: "guide_drone_avionics",
    title: "Drone Flight Controller & 4-in-1 ESC Stack Internal Electronics Blueprint",
    deviceCategory: "Drones & Robotics",
    deviceModel: "FPV Freestyle Quadcopters & UAVs",
    issueType: "Motor Twitch / Desync / No Gyro Telemetry / ELRS Receiver Unbound",
    difficulty: "Intermediate",
    estimatedTimeMinutes: 35,
    author: GUIDE_AUTHOR,
    thumbnailUrl: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80",
    eWasteSavedKg: 0.65,
    toolsRequired: [
      "Smoke Stopper Current-Limiting Fuse (XT60)",
      "Soldering Iron (380°C chisel tip for ground plane)",
      "Digital Multimeter",
      "Betaflight Configurator USB Interface"
    ],
    partsRequired: [
      { name: "Low-ESR 35V 1000uF Electrolytic Capacitor", partNumber: "RUBY-35V1000", priceApprox: "$1.80", partId: "part_cap_drone" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Motor & 4-in-1 ESC Phase Continuity",
        description: "Check resistance across all 3 motor phases (U, V, W) on each of the 4 brushless motors. Resistance should be identical (typically 0.1Ω to 0.3Ω). Any infinite reading indicates a broken motor winding.",
        multimeterCheck: {
          probeRed: "Motor Phase U",
          probeBlack: "Motor Phase V / W",
          expectedValue: "0.15Ω - 0.25Ω (Symmetrical)",
          mode: "Resistance"
        }
      },
      {
        stepNumber: 2,
        title: "5V & 9V Regulator Rail Diagnostic",
        description: "Power up with a Smoke Stopper. Probe the 5V BEC (Receiver/Camera) and 9V BEC (VTX). If 5V drops below 4.7V, unhook the ELRS receiver or camera to isolate the short.",
        multimeterCheck: {
          probeRed: "5V BEC Pad",
          probeBlack: "GND Solder Pad",
          expectedValue: "4.95V - 5.15V DC",
          mode: "Voltage"
        }
      },
      {
        stepNumber: 3,
        title: "ELRS 2.4GHz Receiver Telemetry & Binding",
        description: "Verify TX/RX UART cross-wiring (ELRS TX to FC RX1, ELRS RX to FC TX1). Power cycle 3 times rapidly to enter WiFi binding mode and flash official ExpressLRS firmware."
      }
    ],
    publishedAt: "2026-09-17"
  },
  {
    id: "guide_sony_2blink",
    title: "Sony Bravia 2-Blink Protection Error: DC_det Voltage Divider Repair",
    deviceCategory: "TVs & Monitors",
    deviceModel: "Sony Bravia EX650 / HX750 / R412 / W652 Series",
    issueType: "Red Standby LED Blinks 2 Times in Loop / Shuts Down in 2 Seconds",
    difficulty: "Advanced",
    estimatedTimeMinutes: 40,
    author: GUIDE_AUTHOR,
    thumbnailUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80",
    eWasteSavedKg: 12.0,
    toolsRequired: [
      "Stereo Inspection Microscope",
      "Digital Multimeter with Needle Probes",
      "Micro Soldering Iron with Fine Conical Tip",
      "SMD 0402 Precision Resistor Kit (1% tolerance)"
    ],
    partsRequired: [
      { name: "Precision 100kΩ / 10kΩ 0402 SMD Resistors", partNumber: "RC0402FR-07100KL", priceApprox: "$0.10", partId: "part_res_0402" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Identify Chassis Reference in DC_det Matrix",
        description: "Check model number: EX650/HX750 expects 1.5V DC_det on 12V rail; R412/R402/W652 expects 2.1V DC_det on 19.5V adapter rail.",
        safetyWarning: "Never jumper DC_det directly to 3.3V or 5V; excessive voltage will permanently destroy the Sony video processing MCU."
      },
      {
        stepNumber: 2,
        title: "Dynamic DC_det Voltage Probing at Power-On",
        description: "Connect black probe to chassis metal. Touch red probe to the DC_det test point. Press TV power button: watch the multimeter display. If it stays at 0.4V - 0.9V before tripping 2 blinks, the upper divider resistor is open.",
        multimeterCheck: {
          probeRed: "DC_det Test Pad (e.g. R412 divider junction)",
          probeBlack: "Chassis Ground",
          expectedValue: "1.50V or 2.10V (Stable)",
          mode: "Voltage"
        }
      },
      {
        stepNumber: 3,
        title: "Replace Drifted High-Megohm SMD Resistors",
        detail: "Desolder the drifted upper resistor (often 100kΩ-200kΩ) and replace with a 1% metal film SMD resistor to restore the precise nominal bias voltage. Power on and verify TV boots into Bravia home menu."
      }
    ],
    publishedAt: "2026-09-16"
  },
  {
    id: "guide_microsd_spi",
    title: "Micro SD Card Forensic Data Recovery via Direct SPI Wire Harness",
    deviceCategory: "Storage & Flash",
    deviceModel: "SanDisk / Samsung / Kingston Micro SD Cards",
    issueType: "Card Not Recognized / Corrupt Partition / 0 Bytes Capacity",
    difficulty: "Expert",
    estimatedTimeMinutes: 60,
    author: GUIDE_AUTHOR,
    thumbnailUrl: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80",
    eWasteSavedKg: 0.05,
    toolsRequired: [
      "38 AWG Enamelled Copper Magnet Wire",
      "Stereo Trinocular Microscope (20x-40x)",
      "Soldering Iron (280°C with 0.2mm needle tip)",
      "Arduino / FTDI FT232H USB-to-SPI Bridge",
      "GNU ddrescue Forensic Sector Imager"
    ],
    partsRequired: [
      { name: "3.3V Logic Level Shifter (74LVC245)", partNumber: "74LVC245AN", priceApprox: "$1.20", partId: "part_shifter" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Microscope Pad Preparation & Wire Jumpering",
        description: "Under the microscope, apply a tiny speck of tacky flux to pins 2 (CS), 3 (CMD/MOSI), 4 (VDD 3.3V), 5 (CLK), 6 (GND), and 7 (DAT0/MISO). Solder fine 38 AWG enamel jumpers.",
        safetyWarning: "STRICT: Do NOT feed 5V to the MicroSD card VDD or logic lines. 5V will instantly fry the internal NAND flash controller."
      },
      {
        stepNumber: 2,
        title: "SPI Bus Pin Mapping",
        description: "Wire DAT3/CS to Arduino Pin 10, CMD to D11 (MOSI), CLK to D13 (SCK), DAT0 to D12 (MISO), VDD to 3.3V regulator, and VSS to GND.",
        multimeterCheck: {
          probeRed: "MicroSD Pin 4 (VDD)",
          probeBlack: "MicroSD Pin 6 (GND)",
          expectedValue: "3.30V ± 0.05V",
          mode: "Voltage"
        }
      },
      {
        stepNumber: 3,
        title: "Raw Sector Extraction with ddrescue",
        description: "Initialize SPI at 250kHz. Stream raw 512-byte blocks into a raw disk image (.IMG) using ddrescue with multi-pass bad sector recovery."
      }
    ],
    publishedAt: "2026-09-15"
  },
  {
    id: "guide_bios_pw_bypass",
    title: "PC & Laptop Motherboard BIOS Forgotten Password Removal (3 Methods)",
    deviceCategory: "Laptops & PCs",
    deviceModel: "Dell, HP, Lenovo, ASUS & MSI Motherboards",
    issueType: "Locked by BIOS / UEFI Supervisor Password at Power-On",
    difficulty: "Beginner",
    estimatedTimeMinutes: 20,
    author: GUIDE_AUTHOR,
    thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    eWasteSavedKg: 2.1,
    toolsRequired: [
      "Phillips #1 Screwdriver",
      "Flat Plastic Spudger",
      "Multimeter (for CR2032 voltage verification)"
    ],
    partsRequired: [
      { name: "CR2032 3V Lithium Coin Cell", partNumber: "CR2032", priceApprox: "$1.50", partId: "part_cr2032" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Method 1: CLR_CMOS / PWCLR Motherboard Jumper",
        description: "Unplug PC AC power cord. Locate the 3-pin jumper labeled CLR_CMOS or PWCLR near the battery. Move the jumper cap from Pins 1-2 to Pins 2-3 for 10 seconds, then return to Pins 1-2."
      },
      {
        stepNumber: 2,
        title: "Method 2: CR2032 Battery Removal & Capacitor Drainage",
        description: "Remove the CR2032 coin cell battery. Hold the PC power button down continuously for 45-60 seconds to completely discharge motherboard filter capacitors. Replace battery and boot."
      },
      {
        stepNumber: 3,
        title: "Method 3: Master Password Generator (Laptops)",
        description: "Enter an incorrect password 3 times on the laptop screen. Note the System Disabled hash (e.g., [5-8 hex characters] or Service Tag). Enter this hash into bios-pw.org to retrieve the official factory master backdoor unlock password."
      }
    ],
    publishedAt: "2026-09-14"
  },
  {
    id: "guide_lg_tv_uart",
    title: "LG Smart TV Firmware Read & Write via VGA-to-3.5mm Serial UART Port",
    deviceCategory: "TVs & Monitors",
    deviceModel: "LG 32LN540B / 42LN5700 / OLED Series",
    issueType: "Stuck on LG Logo Bootloop / Bricked eMMC Firmware",
    difficulty: "Intermediate",
    estimatedTimeMinutes: 30,
    author: GUIDE_AUTHOR,
    thumbnailUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80",
    eWasteSavedKg: 8.5,
    toolsRequired: [
      "VGA DB15 Male Connector",
      "3.5mm Stereo TRS Mini-Jack Cable",
      "USB-to-TTL UART Converter (3.3V FTDI / CP2102)",
      "PuTTY or TeraTerm Serial Terminal"
    ],
    partsRequired: [],
    steps: [
      {
        stepNumber: 1,
        title: "VGA to 3.5mm Cable Pinout Solder",
        description: "Solder VGA Pin 4 to 3.5mm Tip (UART TX), VGA Pin 11 to 3.5mm Ring 1 (UART RX), and VGA Pins 5 & 15 to 3.5mm Sleeve (GND)."
      },
      {
        stepNumber: 2,
        title: "Terminal Speed & Serial Protocol Setup",
        description: "Configure PuTTY COM port with Speed: 115200, Data bits: 8, Stop bits: 1, Parity: None, Flow control: None."
      },
      {
        stepNumber: 3,
        title: "U-Boot Recovery Shell Interruption",
        description: "Plug 3.5mm jack into TV service port and power on. Tap ESC or Space repeatedly to halt the boot sequence into U-Boot recovery shell to flash kernel partition images."
      }
    ],
    publishedAt: "2026-09-13"
  },
  {
    id: "guide_10pin_jtag",
    title: "10-Pin Universal JTAG / ISP / ICSP Programming Header Reference",
    deviceCategory: "System & Power",
    deviceModel: "AVR, PIC, Atmel XMEGA, ARM Cortex Systems",
    issueType: "Bricked MCU / Corrupt Fuse Bits / In-Circuit Firmware Flashing",
    difficulty: "Intermediate",
    estimatedTimeMinutes: 25,
    author: GUIDE_AUTHOR,
    thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    eWasteSavedKg: 0.1,
    toolsRequired: [
      "10-Pin 2x5 2.54mm IDC Ribbon Cable",
      "USBasp / Atmel-ICE / PICkit Programmer",
      "avrdude or MPLAB IPE Programming Utility"
    ],
    partsRequired: [],
    steps: [
      {
        stepNumber: 1,
        title: "Standard Pinout Identification",
        description: "Pin 1 = SDO/MISO, Pin 2 = VCC (5V), Pin 3 = RESET, Pin 4 = Clock Out, Pin 5 = SCK, Pin 6 = XMEGA PDI, Pin 7 = SDI/MOSI, Pin 8 & 10 = GND, Pin 9 = MCLR (13V)."
      },
      {
        stepNumber: 2,
        title: "Pin 9 High Voltage Warning",
        description: "Ensure target board does not bridge Pin 9 (MCLR) to low-voltage 3.3V lines, as PIC programmers pulse 13V during flash erase."
      },
      {
        stepNumber: 3,
        title: "Verifying Device Signature",
        description: "Run 'avrdude -c usbasp -p m328p' to read the chip signature (e.g. 0x1E 0x95 0x0F) and restore factory clock fuses."
      }
    ],
    publishedAt: "2026-09-12"
  },
  {
    id: "guide_win_cmd_admin",
    title: "Reset Windows Admin Password via CMD & Advanced Startup (Utilman Bypass)",
    deviceCategory: "Laptops & PCs",
    deviceModel: "Windows 11 / 10 / Server",
    issueType: "Forgotten Windows Local Administrator Account Password",
    difficulty: "Beginner",
    estimatedTimeMinutes: 15,
    author: GUIDE_AUTHOR,
    thumbnailUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    eWasteSavedKg: 1.5,
    toolsRequired: [
      "Standard PC Keyboard (Shift key held during restart)"
    ],
    partsRequired: [],
    steps: [
      {
        stepNumber: 1,
        title: "Boot into WinRE Command Prompt",
        description: "Hold Shift while clicking Restart on the login screen. Choose Troubleshoot -> Advanced options -> Command Prompt."
      },
      {
        stepNumber: 2,
        title: "Swap utilman.exe with cmd.exe",
        description: "Identify Windows drive (e.g., D:). Run 'copy D:\\Windows\\System32\\utilman.exe D:\\Windows\\System32\\utilman.exe.bak' and then 'copy D:\\Windows\\System32\\cmd.exe D:\\Windows\\System32\\utilman.exe'."
      },
      {
        stepNumber: 3,
        title: "Open Accessibility CMD & Reset Password",
        description: "Reboot to login screen. Click the Accessibility icon in the bottom right corner. In the elevated prompt, type 'net user Administrator NewPassword123!' and press Enter to log in."
      }
    ],
    publishedAt: "2026-09-11"
  },
  {
    id: "guide_laptop_battery_opt",
    title: "Laptop Battery Lifespan Optimization & Fuel Gauge Calibration",
    deviceCategory: "Laptops & PCs",
    deviceModel: "Dell, Lenovo, HP, ASUS Laptops",
    issueType: "Rapid Battery Drain / Capacity Drops Unexpectedly from 40% to 5%",
    difficulty: "Beginner",
    estimatedTimeMinutes: 15,
    author: GUIDE_AUTHOR,
    thumbnailUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    eWasteSavedKg: 0.8,
    toolsRequired: [
      "Windows 11 Settings & Task Manager"
    ],
    partsRequired: [],
    steps: [
      {
        stepNumber: 1,
        title: "Set Power Mode to Balanced",
        description: "Press Win + I -> System -> Power & battery. Set Power mode to Balanced to enable dynamic CPU C-state clock throttling."
      },
      {
        stepNumber: 2,
        title: "Display Brightness Calibration",
        description: "Reduce display brightness to 50%. The LED backlight represents up to 40% of instantaneous power draw."
      },
      {
        stepNumber: 3,
        title: "Audit Background Power Draw",
        description: "Open Task Manager (Ctrl+Shift+Esc), inspect the 'Power usage' column, and kill runaway background tasks."
      },
      {
        stepNumber: 4,
        title: "Full BMS Gas Gauge Recalibration Cycle",
        description: "Charge to 100%, leave plugged in for 2 hours, run down to 5%, leave unpowered for 3 hours, then charge back to 100% uninterrupted to recalibrate the fuel gauge IC."
      }
    ],
    publishedAt: "2026-09-10"
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
    id: "course_professional_electrical",
    title: "Professional Electrical Engineering & Systems",
    category: "Professional",
    level: "Intermediate",
    durationHours: 20.0,
    lessonsCount: 6,
    description: "A comprehensive professional curriculum covering essential electrical principles, digital electronics, workshop practices, construction, and sustainable energy systems.",
    instructor: "SANWOLF Technical Institute",
    progressPercent: 0,
    isCompleted: false,
    skillsAcquired: ["Electrical Theory", "Digital Control", "Workshop Safety", "System Construction", "Renewable Energy"],
    modules: [
      {
        id: "m_prof_1",
        title: "Electrical Principles and Practice",
        duration: "120 min",
        summary: "Advanced circuit theory, power distribution, and fundamental electrical calculations.",
        hasHandsOnCircuit: true,
        quizQuestion: {
          question: "Which law governs the relationship between voltage, current, and resistance in a circuit?",
          options: ["Kirchhoff's Law", "Ohm's Law", "Faraday's Law", "Newton's Law"],
          correctIndex: 1,
          explanation: "Ohm's Law defines the fundamental relationship between voltage, current, and resistance."
        }
      },
      {
        id: "m_prof_2",
        title: "Electronic Control and Digital Electronics",
        duration: "120 min",
        summary: "Logic gates, microcontrollers, and digital signal processing for modern control systems.",
        hasHandsOnCircuit: true,
        quizQuestion: {
          question: "Which component is commonly used as a basic building block for digital logic?",
          options: ["Resistor", "Capacitor", "Transistor", "Inductor"],
          correctIndex: 2,
          explanation: "Transistors are the fundamental components used to create digital logic gates."
        }
      },
      {
        id: "m_prof_3",
        title: "Workshop Practice",
        duration: "180 min",
        summary: "Safe tool usage, precision soldering, component identification, and diagnostic procedures.",
        hasHandsOnCircuit: true,
        quizQuestion: {
          question: "What is the primary purpose of a 'Smoke Stopper' in workshop practice?",
          options: ["To prevent fire", "To limit current and protect circuits from shorts", "To improve signal quality", "To test voltage"],
          correctIndex: 1,
          explanation: "A Smoke Stopper limits current flow to prevent damage if a short circuit exists on the board."
        }
      },
      {
        id: "m_prof_4",
        title: "Electrical Workmanship",
        duration: "120 min",
        summary: "Best practices for professional-grade wiring, cable management, and terminal connections.",
        hasHandsOnCircuit: false,
        quizQuestion: {
          question: "Why is proper cable termination important in electrical work?",
          options: ["Aesthetics only", "To ensure mechanical strength and electrical continuity", "It is not important", "To reduce signal speed"],
          correctIndex: 1,
          explanation: "Proper termination ensures reliable contact, prevents overheating, and provides mechanical integrity."
        }
      },
      {
        id: "m_prof_5",
        title: "Electrical Systems and Construction",
        duration: "150 min",
        summary: "Designing and implementing power distribution systems, conduits, and installation standards.",
        hasHandsOnCircuit: false,
        quizQuestion: {
          question: "What is the purpose of a circuit breaker in a system?",
          options: ["To increase voltage", "To protect against overcurrent and short circuits", "To switch AC to DC", "To regulate frequency"],
          correctIndex: 1,
          explanation: "Circuit breakers automatically interrupt electrical flow to prevent damage from overcurrent."
        }
      },
      {
        id: "m_prof_6",
        title: "Renewable Energy Technology",
        duration: "120 min",
        summary: "Principles of solar PV systems, battery storage, and inverter integration.",
        hasHandsOnCircuit: false,
        quizQuestion: {
          question: "What device converts DC power from solar panels to AC power for home use?",
          options: ["Inverter", "Rectifier", "Transformer", "Capacitor"],
          correctIndex: 0,
          explanation: "An inverter converts Direct Current (DC) into Alternating Current (AC)."
        }
      }
    ]
  },
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
