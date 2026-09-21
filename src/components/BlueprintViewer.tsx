import React, { useState, useRef } from 'react';
import { 
  Search, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Cpu, 
  Activity, 
  Sparkles, 
  Flame, 
  Eye, 
  ShieldAlert, 
  FileText, 
  BookOpen, 
  Crosshair,
  RefreshCw,
  MessageSquarePlus,
  Tag
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Markdown from 'react-markdown';
import SocialAnnotator from './SocialAnnotator';
import { RealisticPcbBoard } from './RealisticPcbBoard';
import { initialSocialAnnotations } from '../data/socialAnnotationsData';
import { storage, defaultUser } from '../lib/storage';
import type { ThemeConfig } from '../lib/theme';
import type { SocialAnnotation, AnnotationReply, UserProfile } from '../types';

export interface BoardComponent {
  id: string;
  name: string;
  ref: string;
  type: 'SOC' | 'PMIC' | 'NAND' | 'CHARGER' | 'AUDIO' | 'WIFI' | 'CONNECTOR' | 'PASSIVE' | 'CRYSTAL';
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  width: number;
  height: number;
  package: string;
  voltage: string;
  diodeDrop: string;
  nominalResistance: string;
  description: string;
  commonFaults: string;
  testPads: Array<{ name: string; x: number; y: number; reading: string; rail: string }>;
}

export interface BoardPreset {
  id: string;
  name: string;
  boardNumber: string;
  category: 'Microcontroller' | 'Automotive' | 'Smartphone' | 'Laptop' | 'Console' | 'Drone' | 'Display';
  color: string; // PCB Mask color
  dimensions: { width: number; height: number };
  description: string;
  components: BoardComponent[];
  topImageText: string;
  bottomImageText: string;
}

const PRESET_BOARDS: BoardPreset[] = [
  {
    id: 'auto-mcu-v12',
    name: 'AUTO-MCU v1.2 Automotive Microcontroller Board',
    boardNumber: 'AUTO-MCU-v1.2 / REV-B',
    category: 'Microcontroller',
    color: '#14532d', // Rich Green Solder Mask
    dimensions: { width: 560, height: 680 },
    description: 'Real-world automotive electronic control unit (ECU) PCB featuring central QFP AUTO-MCU v1.2 microcontroller, electrolytic filter cans, ceramic decoupling banks, SMD resistor arrays, flyback diodes, discrete transistors, and 16-pin automotive harness connector.',
    topImageText: 'Top Component Boardview & Trace Matrix',
    bottomImageText: 'Bottom Solder Ground Plane & Interlayer Vias',
    components: [
      {
        id: 'u1_mcu',
        name: 'AUTO-MCU v1.2 32-Bit Microcontroller (IC)',
        ref: 'AUTO-MCU v1.2 (U1)',
        type: 'SOC',
        x: 50,
        y: 46,
        width: 24,
        height: 24,
        package: 'TQFP-32 (32-Lead Gull-Wing Package 7x7mm)',
        voltage: '5.0V VDD_MCU / 3.3V Logic Bus',
        diodeDrop: '0.520V',
        nominalResistance: '12.5kΩ to GND',
        description: 'Core 32-bit automotive ECU engine management processor. Manages ignition timing, CAN-bus networking, and multi-channel ADC sensor readings.',
        commonFaults: 'No CAN communication (U0100 DTC), brownout resets from noisy 12V automotive rail, cracked QFP corner solder joints from engine vibration.',
        testPads: [
          { name: 'MCU_VDD_5V', x: 44, y: 40, reading: '0.520V', rail: 'VDD_5V' },
          { name: 'MCU_RESET_N', x: 56, y: 40, reading: '0.510V', rail: 'RESET' },
          { name: 'CAN_TX', x: 44, y: 52, reading: '0.490V', rail: 'CAN_BUS' },
          { name: 'CAN_RX', x: 56, y: 52, reading: '0.495V', rail: 'CAN_BUS' },
          { name: 'OSC_16M', x: 50, y: 39, reading: '0.460V', rail: 'CRYSTAL_CLK' }
        ]
      },
      {
        id: 'ec1_cap',
        name: 'Electrolytic Capacitor 100µF / 25V (Left Rail)',
        ref: 'EC1 (Electrolytic)',
        type: 'PASSIVE',
        x: 24,
        y: 40,
        width: 12,
        height: 12,
        package: 'Radial Aluminum Can Ø6.3mm with Safety Vent',
        voltage: '12V Automotive Input Filter',
        diodeDrop: '0.485V',
        nominalResistance: '> 500kΩ',
        description: 'Primary input electrolytic capacitor buffering alternator ripple voltage before regulation.',
        commonFaults: 'High Equivalent Series Resistance (ESR) after heat exposure, electrolyte leakage causing track corrosion.',
        testPads: [
          { name: 'EC1_POS', x: 22, y: 38, reading: '0.485V', rail: 'VBAT_12V' },
          { name: 'EC1_GND', x: 26, y: 42, reading: '0.000V', rail: 'GND' }
        ]
      },
      {
        id: 'ec2_cap',
        name: 'Electrolytic Capacitor 220µF / 16V (Main VCC)',
        ref: 'EC2 (Electrolytic)',
        type: 'PASSIVE',
        x: 67,
        y: 28,
        width: 12,
        height: 12,
        package: 'Radial Aluminum Can Ø6.3mm',
        voltage: '5.0V VCC Filter',
        diodeDrop: '0.520V',
        nominalResistance: '> 250kΩ',
        description: 'Secondary output filter capacitor for regulated 5V MCU logic bus.',
        commonFaults: 'Loss of capacitance causing MCU reset glitches under heavy load.',
        testPads: [
          { name: 'EC2_VCC', x: 65, y: 26, reading: '0.520V', rail: 'VCC_5V' }
        ]
      },
      {
        id: 'ec3_cap',
        name: 'Electrolytic Capacitor 47µF / 35V (Aux Filtering)',
        ref: 'EC3 (Electrolytic)',
        type: 'PASSIVE',
        x: 75,
        y: 32,
        width: 12,
        height: 12,
        package: 'Radial Aluminum Can Ø6.3mm',
        voltage: '12V Switched Rail',
        diodeDrop: '0.490V',
        nominalResistance: '> 300kΩ',
        description: 'High-voltage tolerance buffer capacitor on solenoid actuator power stage.',
        commonFaults: 'Bulging or blown safety vent from alternator load dumps.',
        testPads: [
          { name: 'EC3_POS', x: 77, y: 30, reading: '0.490V', rail: 'VBAT_AUX' }
        ]
      },
      {
        id: 'c_array_top',
        name: 'Ceramic Capacitors Array (C1, C2, C3, C4)',
        ref: 'C1-C4 (Ceramic Caps)',
        type: 'PASSIVE',
        x: 38,
        y: 27,
        width: 20,
        height: 6,
        package: 'SMD 0805 MLCC Ceramic Packages (100nF 50V X7R)',
        voltage: '5.0V / 3.3V Logic Rails',
        diodeDrop: '0.520V',
        nominalResistance: '> 1MΩ',
        description: 'Four parallel high-frequency ceramic decoupling capacitors adjacent to MCU power rails.',
        commonFaults: 'Micro-fractures from board flexing causing short circuit to ground (< 0.05Ω).',
        testPads: [
          { name: 'C1_PAD', x: 31, y: 27, reading: '0.520V', rail: 'VDD_5V' },
          { name: 'C2_PAD', x: 36, y: 27, reading: '0.520V', rail: 'VDD_5V' },
          { name: 'C3_PAD', x: 41, y: 27, reading: '0.520V', rail: 'VDD_5V' },
          { name: 'C4_PAD', x: 46, y: 27, reading: '0.520V', rail: 'VDD_5V' }
        ]
      },
      {
        id: 'c_array_left',
        name: 'Ceramic Bypass Capacitors (C5, C6, C7)',
        ref: 'C5-C7 (Ceramic Caps)',
        type: 'PASSIVE',
        x: 26,
        y: 33,
        width: 10,
        height: 8,
        package: 'SMD 0805 Beige Ceramic Chips',
        voltage: '12V / 5.0V Bypass',
        diodeDrop: '0.495V',
        nominalResistance: '> 800kΩ',
        description: 'Transient suppressors filtering RF harmonics before the linear regulators.',
        commonFaults: 'Solder cracking, intermittent reboot on temperature swings.',
        testPads: [
          { name: 'C5_TEST', x: 25, y: 31, reading: '0.495V', rail: 'FILT_IN' },
          { name: 'C6_TEST', x: 25, y: 35, reading: '0.495V', rail: 'FILT_IN' }
        ]
      },
      {
        id: 'r_array_left',
        name: 'Left SMD Resistors Bank (R1: 1001, R2: 1001, R3: 0002, R4: 000)',
        ref: 'R1-R4 (SMD Resistors)',
        type: 'PASSIVE',
        x: 26,
        y: 52,
        width: 10,
        height: 18,
        package: 'SMD 0805 Thick Film Resistors with Silkscreen Codes',
        voltage: '3.3V / 5.0V Pull-Up & Current Limit',
        diodeDrop: '0.460V - 0.510V',
        nominalResistance: '1.0kΩ (R1/R2) / 0Ω Jumper (R4)',
        description: 'Bank of precision surface mount pull-up and series termination resistors for MCU GPIO lines.',
        commonFaults: 'Open circuit from overcurrent surge, burnt top resistor glaze.',
        testPads: [
          { name: 'R1_1001', x: 26, y: 46, reading: '0.510V', rail: 'GPIO_PULLUP' },
          { name: 'R2_1001', x: 26, y: 50, reading: '0.510V', rail: 'GPIO_PULLUP' },
          { name: 'R3_0002', x: 26, y: 54, reading: '0.480V', rail: 'CURR_SENSE' },
          { name: 'R4_000', x: 26, y: 58, reading: '0.000V', rail: 'GND_JUMP' }
        ]
      },
      {
        id: 'r_array_right',
        name: 'Right SMD Resistors Bank (R5: 000, R6: 000, R7: 0002)',
        ref: 'R5-R7 (SMD Resistors)',
        type: 'PASSIVE',
        x: 74,
        y: 43,
        width: 10,
        height: 14,
        package: 'SMD 0805 Thick Film with Silkscreen Markings',
        voltage: '5.0V I/O Lines',
        diodeDrop: '0.490V',
        nominalResistance: '0Ω / 0.02Ω Current Shunt',
        description: '0-ohm configuration jumpers and current sense shunt resistors for feedback control.',
        commonFaults: 'Blown open shunt during alternator load dump surge.',
        testPads: [
          { name: 'R5_000', x: 74, y: 39, reading: '0.490V', rail: 'IO_PASS' },
          { name: 'R6_000', x: 74, y: 43, reading: '0.490V', rail: 'IO_PASS' },
          { name: 'R7_0002', x: 74, y: 47, reading: '0.485V', rail: 'IO_PASS' }
        ]
      },
      {
        id: 'diodes_right',
        name: 'SMD Flyback & Protection Diodes (D1, D2)',
        ref: 'D1-D2 (Diodes)',
        type: 'PASSIVE',
        x: 74,
        y: 52,
        width: 10,
        height: 9,
        package: 'SOD-123 / SMA Black Epoxy with Silver Cathode Band',
        voltage: '40V Clamp / 5V Bus',
        diodeDrop: '0.320V (Schottky Forward Drop)',
        nominalResistance: '> 2MΩ Reverse Bias',
        description: 'High-speed Schottky diodes clamping reverse voltage inductive spikes when relays or actuators switch.',
        commonFaults: 'Shorted diode clamping the supply line to ground, causing power supply overload.',
        testPads: [
          { name: 'D1_CATHODE', x: 74, y: 50, reading: '0.320V', rail: 'CLAMP_1' },
          { name: 'D2_CATHODE', x: 74, y: 54, reading: '0.320V', rail: 'CLAMP_2' }
        ]
      },
      {
        id: 'q1_transistor',
        name: 'TO-92 NPN Driver Transistor (Q1)',
        ref: 'Q1 (TO-92 Transistor)',
        type: 'PASSIVE',
        x: 75,
        y: 60,
        width: 10,
        height: 10,
        package: 'TO-92 Semi-Circular Through-Hole 3-Lead Package',
        voltage: '12V / 40V VCEO',
        diodeDrop: '0.650V Base-Emitter Drop',
        nominalResistance: '> 500kΩ Collector-Emitter',
        description: 'Discrete TO-92 NPN bipolar junction transistor for high-voltage output switching and relay coil drive.',
        commonFaults: 'Thermal breakdown (collector shorted to emitter), burned package plastic.',
        testPads: [
          { name: 'Q1_BASE', x: 73, y: 60, reading: '0.650V', rail: 'BASE_DRIVE' },
          { name: 'Q1_COLLECTOR', x: 75, y: 60, reading: '0.510V', rail: 'OUT_LOAD' },
          { name: 'Q1_EMITTER', x: 77, y: 60, reading: '0.000V', rail: 'GND' }
        ]
      },
      {
        id: 'q_smd_transistors',
        name: 'SMD Driver Transistors & MOSFETs (Q2, Q3, U3)',
        ref: 'Q2/Q3/U3 (SMD Transistors)',
        type: 'PASSIVE',
        x: 70,
        y: 69,
        width: 18,
        height: 12,
        package: 'SOT-23 / SOT-23-6 Gull-Wing Packages',
        voltage: '12V / 5.0V Switching',
        diodeDrop: '0.450V Body Diode',
        nominalResistance: '> 100kΩ',
        description: 'Surface mount high-speed MOSFET switches controlling peripheral warning lamps and sensor excitation.',
        commonFaults: 'Gate oxide puncture from ESD static discharge.',
        testPads: [
          { name: 'Q2_DRAIN', x: 27, y: 63, reading: '0.450V', rail: 'DRV_OUT1' },
          { name: 'Q3_DRAIN', x: 75, y: 69, reading: '0.450V', rail: 'DRV_OUT2' }
        ]
      },
      {
        id: 'vias_testpoints',
        name: 'Solder Points & Test Vias (Lower Left & Right Vias)',
        ref: 'TP1-TP8 (Test Vias)',
        type: 'PASSIVE',
        x: 24,
        y: 71,
        width: 12,
        height: 14,
        package: 'Through-Hole Copper Annular Rings with Solder Mask Openings',
        voltage: 'GND / CAN_H / CAN_L / 5V',
        diodeDrop: '0.000V (GND) / 0.520V (Rails)',
        nominalResistance: '0.0Ω',
        description: 'Factory in-circuit test (ICT) probe pads and interlayer via stitching for signal integrity.',
        commonFaults: 'Corrosion in via barrel causing open circuit on internal signal layers.',
        testPads: [
          { name: 'VIA_TP1', x: 24, y: 67, reading: '0.520V', rail: 'TEST_5V' },
          { name: 'VIA_TP2', x: 24, y: 70, reading: '0.490V', rail: 'CAN_H' },
          { name: 'VIA_TP3', x: 24, y: 73, reading: '0.490V', rail: 'CAN_L' },
          { name: 'VIA_TP4', x: 24, y: 76, reading: '0.000V', rail: 'GND' }
        ]
      },
      {
        id: 'j1_connector',
        name: '16-Pin Shrouded Automotive Header Connector',
        ref: 'J1 (Auto Connector)',
        type: 'CONNECTOR',
        x: 50,
        y: 86,
        width: 40,
        height: 12,
        package: 'Dual-Row 2x8 2.54mm Shrouded Header with Solder Terminals',
        voltage: '12V VBAT / 5V / GND / CAN / I/O',
        diodeDrop: '0.450V - 0.550V',
        nominalResistance: '> 1MΩ Inter-Pin',
        description: 'Robust shrouded automotive wiring harness socket interfacing directly with vehicle CAN bus, power rails, ignition inputs, and actuator drive outputs.',
        commonFaults: 'Bent header pins, fretting corrosion on contact surfaces causing intermittent engine stalls, moisture ingress.',
        testPads: [
          { name: 'PIN1_VBAT12V', x: 38, y: 84, reading: '0.485V', rail: 'VBAT_12V' },
          { name: 'PIN2_GND', x: 42, y: 84, reading: '0.000V', rail: 'GND' },
          { name: 'PIN3_CAN_H', x: 46, y: 84, reading: '0.490V', rail: 'CAN_HIGH' },
          { name: 'PIN4_CAN_L', x: 50, y: 84, reading: '0.490V', rail: 'CAN_LOW' },
          { name: 'PIN5_IGN_SW', x: 54, y: 84, reading: '0.510V', rail: 'IGNITION_IN' },
          { name: 'PIN6_DRV_A', x: 58, y: 84, reading: '0.450V', rail: 'OUT_ACTUATOR' },
          { name: 'PIN7_DRV_B', x: 62, y: 84, reading: '0.450V', rail: 'OUT_SOLENOID' }
        ]
      }
    ]
  },
  {
    id: 'iphone-14-pro-max',
    name: 'Apple iPhone 14 Pro Max',
    boardNumber: '820-02536 / A2894',
    category: 'Smartphone',
    color: '#0e2338', // Apple Stealth Indigo
    dimensions: { width: 520, height: 720 },
    description: 'Interposer dual-layer sandwich logic board with A16 Bionic PoP, Snapdragon X65 5G baseband, and multi-rail Dialog PMIC.',
    topImageText: 'A-Side (RF & Primary Logic)',
    bottomImageText: 'B-Side (Power & Memory Substrate)',
    components: [
      {
        id: 'u_soc',
        name: 'A16 Bionic Application Processor',
        ref: 'U_SOC',
        type: 'SOC',
        x: 48,
        y: 35,
        width: 24,
        height: 24,
        package: 'PoP BGA-496 (Stacked LPDDR5)',
        voltage: '0.85V VDD_CORE / 1.1V LPDDR5',
        diodeDrop: '0.145V (Low-Z rail)',
        nominalResistance: '1.2Ω - 3.8Ω to GND',
        description: 'Core computation engine with 6-core CPU, 5-core GPU, and 16-core Neural Engine.',
        commonFaults: 'Missing CPU boot handshake, panic logs (SEP/Kernel panic), 0.04A low current sleep state.',
        testPads: [
          { name: 'PP_CPU_CORE', x: 42, y: 32, reading: '0.145V', rail: 'VDD_CORE' },
          { name: 'PP1V8_S2', x: 56, y: 30, reading: '0.420V', rail: '1.8V_ALWAYS' },
          { name: 'CLK_24M', x: 40, y: 44, reading: '0.510V', rail: 'CLOCK_OSC' }
        ]
      },
      {
        id: 'u_pmic',
        name: 'Primary Power Management IC (PMIC)',
        ref: 'U_PMIC',
        type: 'PMIC',
        x: 22,
        y: 42,
        width: 18,
        height: 18,
        package: 'WLCSP-130 0.35mm pitch',
        voltage: '3.85V VDD_MAIN / Multiple Buck Steps',
        diodeDrop: '0.450V - 0.485V',
        nominalResistance: '> 100kΩ on I/O rails',
        description: 'Generates all step-down system rails and coordinates hardware power-on sequencing.',
        commonFaults: 'Dead phone (0.00A current draw), shorted VDD_MAIN clamp, thermal runaway hot-spot under microscope.',
        testPads: [
          { name: 'PP_VDD_MAIN', x: 18, y: 38, reading: '0.465V', rail: 'VDD_MAIN' },
          { name: 'PP_VDD_BOOST', x: 26, y: 40, reading: '0.480V', rail: 'VDD_BOOST' },
          { name: 'POK_PMIC', x: 19, y: 49, reading: '0.520V', rail: 'POWER_OK' }
        ]
      },
      {
        id: 'u_nand',
        name: 'NVMe Flash Storage (256GB / 512GB)',
        ref: 'U_NAND',
        type: 'NAND',
        x: 52,
        y: 68,
        width: 22,
        height: 18,
        package: 'BGA-153 High-Speed PCIe NVMe',
        voltage: '1.8V / 2.5V / 3.3V',
        diodeDrop: '0.440V - 0.490V',
        nominalResistance: '> 45kΩ to GND',
        description: 'High-speed storage memory containing boot partitions, filesystem, and encrypted user data.',
        commonFaults: 'iTunes Error 4013, Apple logo boot loop (9-13 blinks), corrupted NAND controller partition.',
        testPads: [
          { name: 'PP3V0_NAND', x: 48, y: 65, reading: '0.450V', rail: '3.0V_NAND' },
          { name: 'PP1V8_IO', x: 62, y: 72, reading: '0.435V', rail: '1.8V_IO' }
        ]
      },
      {
        id: 'u_chg',
        name: 'Hydra USB-C Power Delivery & Charger IC',
        ref: 'U_CHG',
        type: 'CHARGER',
        x: 20,
        y: 65,
        width: 14,
        height: 14,
        package: 'WLCSP-42',
        voltage: '5V - 20V VBUS / 4.2V Battery',
        diodeDrop: '0.540V - 0.590V',
        nominalResistance: '> 500kΩ on CC lines',
        description: 'Coordinates Fast-Charge handshakes, accessory detection, and battery charging curves.',
        commonFaults: 'Fake charging (shows battery bolt but 0.00A), charging on one side only, rapid battery drain.',
        testPads: [
          { name: 'VBUS_DET', x: 17, y: 63, reading: '0.560V', rail: 'VBUS_5V' },
          { name: 'CC1_LINE', x: 23, y: 72, reading: '0.585V', rail: 'CC_HANDSHAKE' }
        ]
      },
      {
        id: 'j_disp',
        name: 'OLED Display & Touch Digitizer FPC',
        ref: 'J_DISP',
        type: 'CONNECTOR',
        x: 75,
        y: 25,
        width: 12,
        height: 28,
        package: '0.35mm Pitch 40-Pin Header',
        voltage: '18V - 24V VBOOST / 3.3V Logic',
        diodeDrop: '0.380V - 0.520V',
        nominalResistance: '> 50kΩ',
        description: 'Direct high-speed MIPI differential data and touch I2C connector for Super Retina XDR panel.',
        commonFaults: 'Black screen with incoming notifications, ghost touch, missing touch on vertical column.',
        testPads: [
          { name: 'MIPI_D0_P', x: 74, y: 22, reading: '0.395V', rail: 'MIPI_DATA' },
          { name: 'VBOOST_ANODE', x: 79, y: 35, reading: '0.590V', rail: 'OLED_BOOST' }
        ]
      },
      {
        id: 'u_audio',
        name: 'Cirrus Logic HD Audio Codec',
        ref: 'U_AUDIO',
        type: 'AUDIO',
        x: 72,
        y: 55,
        width: 14,
        height: 14,
        package: 'WLCSP-49',
        voltage: '1.8V / 5.0V Boost',
        diodeDrop: '0.480V - 0.530V',
        nominalResistance: '> 80kΩ',
        description: 'Decodes voice microphone inputs, speaker amplification, and acoustic cancellation.',
        commonFaults: 'Voice memo greyed out, earpiece speaker crackling, microphone failure during calls.',
        testPads: [
          { name: 'I2S_CLK', x: 69, y: 53, reading: '0.490V', rail: 'AUDIO_CLK' },
          { name: 'SPK_VDD', x: 77, y: 60, reading: '0.510V', rail: 'AUDIO_PWR' }
        ]
      }
    ]
  },
  {
    id: 'samsung-s23-ultra',
    name: 'Samsung Galaxy S23 Ultra',
    boardNumber: 'SM-S918B Main Logic Board',
    category: 'Smartphone',
    color: '#0a3d24', // Samsung Deep Emerald Green
    dimensions: { width: 540, height: 720 },
    description: 'High-density multi-substrate PCB featuring Qualcomm Snapdragon 8 Gen 2 for Galaxy, UFS 4.0, and Maxim PMIC power rails.',
    topImageText: 'A-Side (Processor & Camera Matrix)',
    bottomImageText: 'B-Side (S-Pen & Battery Power Subsystem)',
    components: [
      {
        id: 'u_soc_sam',
        name: 'Snapdragon 8 Gen 2 (For Galaxy)',
        ref: 'U_SOC',
        type: 'SOC',
        x: 45,
        y: 38,
        width: 26,
        height: 26,
        package: 'FC-BGA 0.4mm pitch (TSMC 4nm)',
        voltage: '0.82V VDD_SOC / 1.1V LPDDR5X',
        diodeDrop: '0.138V',
        nominalResistance: '0.9Ω - 2.5Ω',
        description: 'Octa-core flagship processor with Cortex-X3 prime core clocked at 3.36GHz.',
        commonFaults: 'Qualcomm CrashDump mode, stuck on Samsung Knox splash screen, memory line cold joint.',
        testPads: [
          { name: 'VDD_CORE', x: 41, y: 33, reading: '0.138V', rail: 'CORE_PWR' },
          { name: 'CLK_XO_38M', x: 55, y: 34, reading: '0.490V', rail: 'CRYSTAL_XO' }
        ]
      },
      {
        id: 'u_pmic_sam',
        name: 'Maxim Integrated Main PMIC (PM8550)',
        ref: 'U_PMIC',
        type: 'PMIC',
        x: 20,
        y: 45,
        width: 18,
        height: 18,
        package: 'WLCSP-140',
        voltage: '3.85V VPH_PWR / Buck Steps',
        diodeDrop: '0.435V - 0.480V',
        nominalResistance: '> 100kΩ',
        description: 'Multi-rail primary power management controller with integrated telemetry and buck regulators.',
        commonFaults: 'VPH_PWR shorted to ground, device pulls 0.00A on USB meter, PMIC thermal runaway.',
        testPads: [
          { name: 'VPH_PWR', x: 16, y: 42, reading: '0.440V', rail: 'VPH_PWR' },
          { name: 'BUCK3_1V8', x: 25, y: 43, reading: '0.465V', rail: 'BUCK_1V8' }
        ]
      },
      {
        id: 'u_ufs_sam',
        name: 'Samsung UFS 4.0 Storage (512GB)',
        ref: 'U_UFS',
        type: 'NAND',
        x: 50,
        y: 70,
        width: 20,
        height: 18,
        package: 'BGA-153 UFS 4.0 Substrate',
        voltage: '1.2V / 1.8V / 2.5V',
        diodeDrop: '0.460V',
        nominalResistance: '> 50kΩ',
        description: 'Ultra-fast flash memory reading up to 4,200 MB/s sequential transfer rate.',
        commonFaults: 'Fastboot / Odin flashing error at PIT partition, storage read-only lock.',
        testPads: [
          { name: 'VCC_UFS', x: 47, y: 67, reading: '0.460V', rail: 'VCC_STORAGE' },
          { name: 'RST_N', x: 59, y: 73, reading: '0.510V', rail: 'RESET_LINE' }
        ]
      }
    ]
  },
  {
    id: 'macbook-pro-m2',
    name: 'Apple MacBook Pro M2 (14" / 16")',
    boardNumber: '820-02536-A',
    category: 'Laptop',
    color: '#081426', // Apple MacBook Dark Navy
    dimensions: { width: 680, height: 480 },
    description: 'Unified M2 SoC logic board with CD3217 USB-PD Type-C controllers, ISL9240 charging phase, and dual NAND storage banks.',
    topImageText: 'Top Component Boardview (SoC & Type-C Ports)',
    bottomImageText: 'Bottom Boardview (Audio Amplifiers & Display T-Con)',
    components: [
      {
        id: 'u_soc_m2',
        name: 'Apple M2 Silicon SoC',
        ref: 'U_SOC',
        type: 'SOC',
        x: 46,
        y: 42,
        width: 30,
        height: 30,
        package: 'Unified Memory Multi-Die Package',
        voltage: '0.8V VDD_CPU / 1.2V LPDDR5',
        diodeDrop: '0.080V - 0.115V',
        nominalResistance: '0.6Ω - 1.8Ω to GND',
        description: 'Custom ARM architecture integrating CPU, GPU, 16GB Unified RAM, and Secure Enclave.',
        commonFaults: 'Missing PPBUS_G3H or 5V Type-C boot loop, no chime, CPU core coil short.',
        testPads: [
          { name: 'PPBUS_G3H', x: 38, y: 35, reading: '0.510V', rail: 'PPBUS_12V' },
          { name: 'PP1V8_S2', x: 56, y: 34, reading: '0.430V', rail: '1.8V_S2' }
        ]
      },
      {
        id: 'u_cd3217',
        name: 'TI CD3217 USB-C PD Controller',
        ref: 'U_CD3217',
        type: 'CHARGER',
        x: 18,
        y: 35,
        width: 14,
        height: 14,
        package: 'QFN-48 0.4mm pitch',
        voltage: '5V / 20V USB-PD Handshake',
        diodeDrop: '0.485V',
        nominalResistance: '> 200kΩ',
        description: 'Negotiates 20V MagSafe / Type-C Power Delivery from charger brick.',
        commonFaults: 'Stuck at 5V 0.00A on USB-C ammeter; refuses to negotiate 20V; blown CC TVS diode.',
        testPads: [
          { name: 'PP20V_USBC', x: 15, y: 32, reading: '0.540V', rail: '20V_VBUS' },
          { name: 'SMC_I2C', x: 22, y: 39, reading: '0.470V', rail: 'I2C_BUS' }
        ]
      },
      {
        id: 'u_isl9240',
        name: 'Intersil ISL9240 Buck-Boost Battery Charger',
        ref: 'U_CHG',
        type: 'PMIC',
        x: 25,
        y: 60,
        width: 16,
        height: 16,
        package: 'QFN-32',
        voltage: 'PPBUS_G3H 12.6V Battery Rails',
        diodeDrop: '0.460V',
        nominalResistance: '> 50kΩ',
        description: 'Drives primary high-side buck-boost MOSFETs to generate PPBUS_G3H.',
        commonFaults: 'PPBUS_G3H reads 0.00V or 1.2V; burning smell; shorted upper gate MOSFET.',
        testPads: [
          { name: 'PPBUS_HS', x: 23, y: 56, reading: '0.475V', rail: 'PPBUS_12V' },
          { name: 'ISL_PHASE', x: 29, y: 64, reading: '0.440V', rail: 'SWITCH_NODE' }
        ]
      }
    ]
  },
  {
    id: 'sony-ps5-edm010',
    name: 'Sony PlayStation 5 Motherboard',
    boardNumber: 'EDM-010 / EDM-020',
    category: 'Console',
    color: '#071f16', // Sony Dark Emerald PCB
    dimensions: { width: 640, height: 500 },
    description: 'Custom Sony gaming console board with AMD Oberon APU, 16GB GDDR6 VRAM bus, and Panasonic HDMI 2.1 retimer.',
    topImageText: 'APU Core & Liquid Metal Heatspreader Area',
    bottomImageText: 'Southbridge, 12V Standby Rail & HDMI Controller',
    components: [
      {
        id: 'u_apu_ps5',
        name: 'AMD Oberon Custom APU (Zen 2 + RDNA 2)',
        ref: 'U_APU',
        type: 'SOC',
        x: 48,
        y: 44,
        width: 32,
        height: 32,
        package: 'BGA-1248 (Liquid Metal Interface)',
        voltage: '0.85V VDD_GFX / 1.35V VDD_MEM',
        diodeDrop: '0.045V (Ultra Low-Z core rail)',
        nominalResistance: '0.4Ω to GND (Normal for 350W APU)',
        description: 'Combines 8-core AMD Zen 2 CPU and 36 CU RDNA 2 GPU capable of 10.28 TFLOPs.',
        commonFaults: 'Blue Light of Death (BLOD) 1-second shutdown, liquid metal dry-spot, cracked BGA corner balls.',
        testPads: [
          { name: 'VDD_GFX', x: 42, y: 38, reading: '0.045V', rail: 'CORE_GFX' },
          { name: '3V3_STBY', x: 58, y: 36, reading: '0.480V', rail: 'STANDBY_3V3' }
        ]
      },
      {
        id: 'u_hdmi_ps5',
        name: 'Panasonic MN864739 HDMI 2.1 Video Encoder',
        ref: 'U_HDMI',
        type: 'AUDIO',
        x: 78,
        y: 35,
        width: 16,
        height: 16,
        package: 'QFP-80 Fine Pitch',
        voltage: '3.3V / 1.8V / 5.0V HDMI',
        diodeDrop: '0.510V - 0.580V',
        nominalResistance: '> 100kΩ',
        description: 'Handles 4K 120Hz / 8K FRL HDMI signal encoding and ESD protection diodes.',
        commonFaults: 'White Light of Death (WLOD) with no TV picture, bent HDMI port pins bridging 5V to TMDS lines.',
        testPads: [
          { name: 'HDMI_CLK', x: 75, y: 32, reading: '0.520V', rail: 'TMDS_CLOCK' },
          { name: '5V_HOTPLUG', x: 83, y: 38, reading: '0.580V', rail: '5V_HPD' }
        ]
      }
    ]
  },
  {
    id: 'dji-mavic-esc',
    name: 'DJI Drone Core Flight Controller & ESC',
    boardNumber: 'DJI-FC-ESC-REV4',
    category: 'Drone',
    color: '#1a1f2c', // Drone Tech Black
    dimensions: { width: 560, height: 560 },
    description: 'High-power dual-layer quadcopter board featuring STM32 Cortex-M4 flight controller, FOC 3-phase brushless motor drivers, and IMU.',
    topImageText: 'Flight Controller & IMU Vibration Damper',
    bottomImageText: '3-Phase Motor Inverter MOSFET Arrays',
    components: [
      {
        id: 'u_fc_dji',
        name: 'STM32F405 ARM Cortex-M4 Flight Controller',
        ref: 'U_FC',
        type: 'SOC',
        x: 48,
        y: 45,
        width: 22,
        height: 22,
        package: 'LQFP-100',
        voltage: '3.3V Clean Regulated Logic',
        diodeDrop: '0.480V',
        nominalResistance: '> 40kΩ',
        description: 'Runs real-time flight telemetry, PID loops, GPS heading, and obstacle avoidance sensors.',
        commonFaults: 'Drone won\'t arm, blinking red LED status code, missing 3.3V sensor rail after crash.',
        testPads: [
          { name: 'FC_3V3', x: 44, y: 40, reading: '0.485V', rail: '3V3_CLEAN' },
          { name: 'SWD_DIO', x: 54, y: 42, reading: '0.510V', rail: 'DEBUG_LINE' }
        ]
      },
      {
        id: 'u_mosfet_esc',
        name: 'Dual N-Channel Power MOSFET Array (40A)',
        ref: 'Q_MOSFET',
        type: 'PASSIVE',
        x: 25,
        y: 28,
        width: 18,
        height: 16,
        package: 'PowerPAK SO-8',
        voltage: '14.8V - 22.2V LiPo Battery Bus',
        diodeDrop: '0.420V Body Diode',
        nominalResistance: '> 200kΩ (Gate to Source)',
        description: 'High-current switches driving brushless motors using PWM field-oriented control.',
        commonFaults: 'Propeller motor stuttering/twitching, smoke on plug-in, blown gate driver IC.',
        testPads: [
          { name: 'MOTOR_PHASE_A', x: 22, y: 24, reading: '0.420V', rail: 'PHASE_A' },
          { name: 'VBAT_RAW', x: 29, y: 32, reading: '0.550V', rail: 'VBAT_LIPO' }
        ]
      }
    ]
  },
  {
    id: 'samsung-32-led-tv-main',
    name: 'Samsung 32" LED Flat Screen TV (Main Logic Board)',
    boardNumber: 'BN41-02098B / BN94-06973',
    category: 'Display',
    color: '#0f3a5d', // Samsung Deep Display Blue
    dimensions: { width: 620, height: 480 },
    description: 'Samsung 32-inch LED Smart TV Main Logic Motherboard (UN32EH5300 / UE32F5000 series). Features MStar/Novatek central video engine, Winbond SPI Flash, TAS5707 digital audio amplifier, and 30-pin LVDS panel connector.',
    topImageText: 'Top Component Boardview & Test Point Matrix',
    bottomImageText: 'Bottom Solder Surface & Ground Plane',
    components: [
      {
        id: 'u1_soc_mst',
        name: 'MStar / Novatek Video Engine Processor (BGA)',
        ref: 'U1 (Video SoC)',
        type: 'SOC',
        x: 48,
        y: 42,
        width: 26,
        height: 26,
        package: 'BGA-388 Heatspreader Package',
        voltage: '1.2V Core / 3.3V I/O / 1.5V DDR3',
        diodeDrop: '0.340V Core / 0.510V I/O',
        nominalResistance: '18Ω Core / > 50kΩ I/O',
        description: 'Primary TV system processor. Decodes HDMI 1080p video, tuner RF signals, and drives LVDS panel matrix.',
        commonFaults: 'TV stuck on red standby LED (won\'t turn on), rebooting loop on Samsung logo, overheating BGA ball cracking.',
        testPads: [
          { name: 'SOC_1V2_CORE', x: 42, y: 38, reading: '0.340V', rail: '1V2_CORE' },
          { name: 'SOC_3V3_IO', x: 56, y: 38, reading: '0.510V', rail: '3V3_IO' },
          { name: 'CLK_24M_OSC', x: 40, y: 48, reading: '0.485V', rail: 'OSC_24M' }
        ]
      },
      {
        id: 'u2_flash',
        name: 'Winbond 25Q64 64Mb SPI Firmware Flash ROM',
        ref: 'U2 (SPI Flash)',
        type: 'NAND',
        x: 68,
        y: 35,
        width: 14,
        height: 14,
        package: 'SOIC-8 (208 mil)',
        voltage: '3.3V VCC (Pin 8)',
        diodeDrop: '0.520V',
        nominalResistance: '> 80kΩ',
        description: 'Stores Samsung bootloader, HDMI EDID handshakes, and panel gamma calibration data.',
        commonFaults: 'Corrupted firmware causing 5 or 6 red LED blink error codes, black screen with backlight on.',
        testPads: [
          { name: 'SPI_VCC_3V3', x: 65, y: 32, reading: '0.520V', rail: 'SPI_3V3' },
          { name: 'SPI_CLK', x: 71, y: 32, reading: '0.490V', rail: 'SPI_BUS' },
          { name: 'SPI_CS_N', x: 65, y: 38, reading: '0.510V', rail: 'SPI_CS' }
        ]
      },
      {
        id: 'u3_audio',
        name: 'TI TAS5707 20W Digital Audio Power Amplifier',
        ref: 'U3 (Audio Amp)',
        type: 'AUDIO',
        x: 75,
        y: 65,
        width: 16,
        height: 16,
        package: 'HTSSOP-48 PowerPad',
        voltage: '13.0V PVDD / 3.3V DVDD',
        diodeDrop: '0.480V',
        nominalResistance: '> 100kΩ to GND',
        description: 'Class-D digital amplifier driving stereo speakers directly from I2S digital audio bus.',
        commonFaults: 'Picture normal but no sound, popping noise on speaker channels, shorted PVDD pulling 13V rail down.',
        testPads: [
          { name: 'AMP_PVDD_13V', x: 72, y: 62, reading: '0.480V', rail: '13V_AUDIO' },
          { name: 'SPK_LEFT_OUT', x: 78, y: 68, reading: '0.510V', rail: 'SPK_L' }
        ]
      },
      {
        id: 'u4_ldo33',
        name: '1117-3.3 Linear Voltage Regulator (Standby 3.3V)',
        ref: 'U4 (1117-3.3)',
        type: 'PMIC',
        x: 25,
        y: 35,
        width: 14,
        height: 14,
        package: 'SOT-223 3-Pin Tab',
        voltage: '5.3V IN / 3.3V OUT',
        diodeDrop: '0.515V',
        nominalResistance: '> 40kΩ',
        description: 'Steps down 5.3V standby rail from PSU to 3.3V for standby microcontroller and remote IR sensor.',
        commonFaults: 'No 3.3V output (dead standby light), burned linear tab from thermal overstress.',
        testPads: [
          { name: 'LDO_3V3_OUT', x: 23, y: 32, reading: '0.515V', rail: 'STBY_3V3' },
          { name: 'LDO_5V3_IN', x: 27, y: 38, reading: '0.490V', rail: 'STBY_5V3' }
        ]
      },
      {
        id: 'cn_lvds',
        name: '30-Pin High-Speed LVDS Display Ribbon Connector',
        ref: 'CN_LVDS (To Panel)',
        type: 'CONNECTOR',
        x: 48,
        y: 18,
        width: 34,
        height: 10,
        package: '30-Pin 1.0mm Pitch FFC Header',
        voltage: '12V VLCD Panel Power / 1.2V LVDS Pairs',
        diodeDrop: '0.420V - 0.540V',
        nominalResistance: '> 100kΩ',
        description: 'Transmits 8-bit differential RGB LVDS pixel pairs and 12V T-CON panel power directly to the LCD matrix.',
        commonFaults: 'Corroded LVDS pins causing solarized / inverted colors, vertical colored lines, white display.',
        testPads: [
          { name: 'VLCD_12V_PANEL', x: 38, y: 16, reading: '0.460V', rail: '12V_PANEL' },
          { name: 'LVDS_CLK_P', x: 48, y: 16, reading: '0.510V', rail: 'LVDS_CLOCK' },
          { name: 'LVDS_DATA0_P', x: 58, y: 16, reading: '0.510V', rail: 'LVDS_D0' }
        ]
      },
      {
        id: 'cn_power',
        name: '14-Pin Main PSU Inverter Harness Socket',
        ref: 'CN_PWR (From PSU)',
        type: 'CONNECTOR',
        x: 18,
        y: 65,
        width: 14,
        height: 28,
        package: '14-Pin 2.0mm Dual Row Header',
        voltage: '13V, 5.3V, PS_ON (3.3V), BL_ON (3.3V)',
        diodeDrop: '0.480V - 0.520V',
        nominalResistance: '> 50kΩ',
        description: 'Connects mainboard to Power Supply (BN44-00605A). Receives 13V and 5.3V; sends PS_ON and BL_ON back to PSU.',
        commonFaults: 'Cold solder joints on 13V pins, no PS_ON trigger signal from Main to PSU.',
        testPads: [
          { name: 'PIN1_13V_PWR', x: 16, y: 58, reading: '0.480V', rail: '13V_MAIN' },
          { name: 'PIN3_5V3_STBY', x: 16, y: 64, reading: '0.510V', rail: '5V3_STBY' },
          { name: 'PIN6_PS_ON', x: 16, y: 70, reading: '0.530V', rail: 'PS_ON_SIGNAL' },
          { name: 'PIN8_BL_ON', x: 16, y: 76, reading: '0.530V', rail: 'BL_ON_SIGNAL' }
        ]
      }
    ]
  },
  {
    id: 'samsung-32-led-tv-psu',
    name: 'Samsung 32" LED TV Power Supply Unit (PSU & Backlight Inverter)',
    boardNumber: 'BN44-00605A / L32S1_FHS',
    category: 'Display',
    color: '#92400e', // Warm Amber Phenolic Substrate
    dimensions: { width: 580, height: 640 },
    description: 'Samsung 32-inch LED TV SMPS Power Supply and Constant-Current LED Backlight Inverter Board (BN44-00605A / PSLF770S05A). Generates Standby 5.3V, Main 13V rails, and 70V-120V LED string drive.',
    topImageText: 'High-Voltage Primary SMPS & Backlight Boost Circuit',
    bottomImageText: 'Solder Ground Planes & High-Voltage Isolation Slot',
    components: [
      {
        id: 'bd1_bridge',
        name: 'AC Mains Rectifier Bridge (600V 4A)',
        ref: 'BD1 (Bridge Rectifier)',
        type: 'PASSIVE',
        x: 25,
        y: 22,
        width: 16,
        height: 14,
        package: 'SIP-4 Package with Center AC Pins',
        voltage: '110V-240V AC Mains / 320V-380V DC Bus',
        diodeDrop: '0.540V Forward Diode Drop',
        nominalResistance: '> 2MΩ Reverse',
        description: 'Converts alternating 120V/240V AC household electricity into rectified DC high-voltage bus.',
        commonFaults: 'Shorted bridge diode instantly blows main 3.15A glass fuse on plug-in.',
        testPads: [
          { name: 'DC_POS_320V', x: 22, y: 18, reading: '0.540V', rail: 'HV_BUS_320V' },
          { name: 'AC_LINE_1', x: 28, y: 26, reading: '0.000V', rail: 'AC_MAINS' }
        ]
      },
      {
        id: 'c1_bulk_cap',
        name: '450V 100µF High-Voltage Electrolytic Filter Can',
        ref: 'EC1 (450V 100µF)',
        type: 'PASSIVE',
        x: 48,
        y: 24,
        width: 20,
        height: 20,
        package: 'Radial Aluminum Electrolytic Ø18mm',
        voltage: '320V-390V DC High Voltage',
        diodeDrop: '0.510V',
        nominalResistance: '> 500kΩ',
        description: 'Primary energy reservoir smoothing rectified DC bus voltage before the switching transformer.',
        commonFaults: 'High ESR or dried electrolyte causing TV to turn off randomly or buzz loudly.',
        testPads: [
          { name: 'CAP_HV_POS', x: 45, y: 20, reading: '0.510V', rail: 'HV_FILTER' },
          { name: 'CAP_HV_NEG', x: 51, y: 28, reading: '0.000V', rail: 'PRIMARY_GND' }
        ]
      },
      {
        id: 'u1_pwm_ic',
        name: 'SEM5027A Primary Flyback PWM Switch Controller',
        ref: 'U1 (SEM5027A)',
        type: 'PMIC',
        x: 28,
        y: 48,
        width: 14,
        height: 14,
        package: 'DIP-8 / SOP-8 Power IC',
        voltage: '16V VCC Start / High-Voltage Drain',
        diodeDrop: '0.510V',
        nominalResistance: '> 100kΩ',
        description: 'Controls high-speed oscillation of the main power transformer to regulate 13V and 5.3V outputs.',
        commonFaults: 'Blown PWM IC with burn crater in plastic, zero output voltage on secondary rails.',
        testPads: [
          { name: 'PWM_VCC_16V', x: 25, y: 44, reading: '0.510V', rail: 'PWM_VCC' },
          { name: 'PWM_GATE_DRV', x: 31, y: 52, reading: '0.485V', rail: 'GATE_DRV' }
        ]
      },
      {
        id: 'u_led_boost',
        name: 'SLC1012C / MAP3202 LED Backlight Driver IC',
        ref: 'U_LED (Backlight Boost)',
        type: 'PMIC',
        x: 75,
        y: 35,
        width: 16,
        height: 16,
        package: 'SOIC-16 Narrow',
        voltage: '70V - 120V VLED+ Backlight String',
        diodeDrop: '0.460V',
        nominalResistance: '> 200kΩ',
        description: 'Step-up boost converter regulating constant current to the interior LED backlight strips.',
        commonFaults: 'Flash of backlight for 1 second then black screen (audio works), blown LED string protection shutdown.',
        testPads: [
          { name: 'VLED_PLUS_100V', x: 72, y: 30, reading: '0.460V', rail: 'LED_ANODE' },
          { name: 'LED_RETURN_CATH', x: 78, y: 40, reading: '0.520V', rail: 'LED_CATHODE' }
        ]
      },
      {
        id: 'd_sec_13v',
        name: 'Secondary 13V Dual Schottky Rectifier Pair',
        ref: 'DM801 (13V Diode)',
        type: 'PASSIVE',
        x: 48,
        y: 58,
        width: 14,
        height: 14,
        package: 'TO-220 Dual Diode on Aluminum Heatsink',
        voltage: '13.0V DC Main Rail',
        diodeDrop: '0.360V (Schottky Forward Drop)',
        nominalResistance: '> 50kΩ',
        description: 'Rectifies secondary transformer output into 13V clean rail for audio amp and mainboard.',
        commonFaults: 'Shorted secondary diode pulling PSU into continuous clicking / ticking shutdown loop.',
        testPads: [
          { name: 'SEC_13V_OUT', x: 45, y: 55, reading: '0.360V', rail: '13V_SEC' }
        ]
      },
      {
        id: 'cn_bl_out',
        name: '4-Pin LED Backlight Array Connector',
        ref: 'CN_BL (To LED Strips)',
        type: 'CONNECTOR',
        x: 82,
        y: 18,
        width: 12,
        height: 16,
        package: '4-Pin Locking Header',
        voltage: '70V - 120V High Voltage DC',
        diodeDrop: '0.460V',
        nominalResistance: '> 1MΩ',
        description: 'Direct wiring socket connecting to the internal LED backlight edge/direct strips behind LCD diffuser.',
        commonFaults: 'Burnt connector pin, open circuit in LED string inside the LCD panel.',
        testPads: [
          { name: 'BL_POS_100V', x: 80, y: 15, reading: '0.460V', rail: 'VLED_BOOST' },
          { name: 'BL_NEG_RETURN', x: 84, y: 21, reading: '0.520V', rail: 'VLED_GND' }
        ]
      }
    ]
  },
  {
    id: 'nintendo-switch-hac',
    name: 'Nintendo Switch Motherboard',
    boardNumber: 'HAC-CPU-01 / HAC-CPU-21',
    category: 'Console',
    color: '#064e3b', // Nintendo Dark Forest Emerald
    dimensions: { width: 560, height: 520 },
    description: 'Nintendo Switch hybrid console motherboard. Features Nvidia Tegra X1 APU, Rohm M92T36 USB-PD chip, TI BQ24193 battery charger, and MAX77620 PMIC power tree.',
    topImageText: 'Top Component Boardview (Tegra X1, M92T36, USB-C)',
    bottomImageText: 'Bottom Boardview (MAX77620 PMIC & eMMC)',
    components: [
      {
        id: 'u_tegra_x1',
        name: 'Nvidia Tegra X1 T210 APU Processor',
        ref: 'U_TEGRA (SoC)',
        type: 'SOC',
        x: 48,
        y: 45,
        width: 28,
        height: 28,
        package: 'BGA-496 (0.65mm pitch)',
        voltage: '0.85V VDD_CORE / 1.1V LPDDR4',
        diodeDrop: '0.120V Core',
        nominalResistance: '1.4Ω to GND',
        description: 'Central Quad-Core ARM Cortex-A57 + Maxwell GPU running Horizon OS.',
        commonFaults: 'Blue screen of death (BSOD) from dropped console warping APU solder balls.',
        testPads: [
          { name: 'TEGRA_CORE_0V85', x: 44, y: 40, reading: '0.120V', rail: 'VDD_CORE' },
          { name: 'LPDDR4_1V1', x: 54, y: 40, reading: '0.410V', rail: '1V1_RAM' }
        ]
      },
      {
        id: 'u_m92t36',
        name: 'Rohm M92T36 USB-C Power Delivery & Management IC',
        ref: 'U_M92T36 (Power IC)',
        type: 'CHARGER',
        x: 25,
        y: 35,
        width: 16,
        height: 16,
        package: 'QFN-40 (0.4mm pitch)',
        voltage: '5V - 15V VBUS / 3.3V VCC',
        diodeDrop: '0.485V - 0.530V',
        nominalResistance: '> 100kΩ on Pin 5/6',
        description: 'Primary USB-C power handshake IC. Coordinates 15V dock charging and USB-C negotiation.',
        commonFaults: '#1 failure on Nintendo Switch. Short on Pin 5 or Pin 6 capacitor causes 0.00A / 0.41A stuck charging.',
        testPads: [
          { name: 'M92_PIN5_CAP', x: 22, y: 32, reading: '0.490V', rail: 'M92_PIN5' },
          { name: 'M92_PIN6_CAP', x: 28, y: 32, reading: '0.490V', rail: 'M92_PIN6' },
          { name: 'M92_VCC_3V3', x: 25, y: 40, reading: '0.510V', rail: '3V3_M92' }
        ]
      },
      {
        id: 'u_bq24193',
        name: 'TI BQ24193 4.5A Battery Charge Controller',
        ref: 'U_BQ24193 (Charger)',
        type: 'CHARGER',
        x: 25,
        y: 65,
        width: 16,
        height: 16,
        package: 'QFN-24 PowerPAD',
        voltage: '3.7V - 4.2V Battery / VSYS Rail',
        diodeDrop: '0.470V',
        nominalResistance: '> 60kΩ',
        description: 'Buck battery charger and system power path controller creating VSYS bus.',
        commonFaults: 'Fast battery drain, console won\'t turn on without battery, shorted input diode.',
        testPads: [
          { name: 'VSYS_PWR', x: 22, y: 62, reading: '0.470V', rail: 'VSYS_RAIL' },
          { name: 'VBAT_SENSE', x: 28, y: 68, reading: '0.480V', rail: 'VBAT_4V2' }
        ]
      },
      {
        id: 'cn_usbc_switch',
        name: '24-Pin Mid-Mount USB-C Charging Port',
        ref: 'CN_USBC (Port)',
        type: 'CONNECTOR',
        x: 48,
        y: 86,
        width: 24,
        height: 12,
        package: 'Hybrid Through-Hole / SMD 24-Pin',
        voltage: '5V - 15V VBUS / CC1, CC2',
        diodeDrop: '0.540V',
        nominalResistance: '> 200kΩ',
        description: 'Primary charging and HDMI dock video output socket.',
        commonFaults: 'Bent internal copper pins bridging 15V VBUS to 3.3V CC lines, destroying M92T36.',
        testPads: [
          { name: 'USBC_VBUS', x: 44, y: 84, reading: '0.540V', rail: 'VBUS_IN' },
          { name: 'USBC_CC1', x: 48, y: 84, reading: '0.580V', rail: 'CC1_LINE' },
          { name: 'USBC_CC2', x: 52, y: 84, reading: '0.580V', rail: 'CC2_LINE' }
        ]
      }
    ]
  },
  {
    id: 'telefunken-32-40-led-tv-main',
    name: 'Telefunken 32" / 40" / 55" LED TV (Vestel Main Logic Board)',
    boardNumber: '17MB140 / 17MB130 / TP.MS3663S.PB818',
    category: 'Display',
    color: '#064e3b', // Deep Vestel Emerald Green
    dimensions: { width: 620, height: 490 },
    description: 'Telefunken Smart & Slim LED TV Main Motherboard (TLEDD-32FHDF / TLEDD-40FHD / 55UHD series). Features MStar MSD3663 video processor, Winbond 25Q64 SPI flash, Texas Instruments TAS5711 audio amp, and 30-pin FHD LVDS panel connector.',
    topImageText: 'Top Component Boardview & Test Point Matrix (Vestel Architecture)',
    bottomImageText: 'Bottom Solder Mask Ground Planes and SPI Debug Bus',
    components: [
      {
        id: 'u1_vestel_soc',
        name: 'MStar MSD3663 / Novatek Video Engine SoC',
        ref: 'U1 (Vestel Main SoC)',
        type: 'SOC',
        x: 48,
        y: 44,
        width: 26,
        height: 26,
        package: 'LQFP-128 / BGA-256 Package',
        voltage: '1.2V VDD_CORE / 3.3V VDD_IO / 1.8V VDD_DRAM',
        diodeDrop: '0.360V Core / 0.520V IO',
        nominalResistance: '22Ω Core / > 60kΩ IO',
        description: 'Primary TV system controller handling HDMI switching, digital audio demodulation, and LVDS timing output.',
        commonFaults: 'TV stuck on red standby light; will not respond to remote or power button; missing 1.2V core rail.',
        testPads: [
          { name: 'VDD_1V2_CORE', x: 42, y: 39, reading: '0.360V', rail: '1V2_CORE' },
          { name: 'VDD_3V3_IO', x: 55, y: 39, reading: '0.520V', rail: '3V3_IO' },
          { name: 'CRYSTAL_24MHZ', x: 41, y: 50, reading: '0.490V', rail: 'OSC_24M' }
        ]
      },
      {
        id: 'u2_telefunken_spi',
        name: 'Winbond 25Q64FVSIG 64Mb SPI Firmware Flash IC',
        ref: 'U2 (SPI Flash ROM)',
        type: 'NAND',
        x: 69,
        y: 36,
        width: 14,
        height: 14,
        package: 'SOIC-8 (208 mil)',
        voltage: '3.3V VCC (Pin 8)',
        diodeDrop: '0.515V',
        nominalResistance: '> 75kΩ',
        description: 'Stores Telefunken bootloader, panel gamma curves, and channel memory. #1 failure point on Telefunken/Vestel TVs.',
        commonFaults: 'Corrupted firmware bin causes blinking red-to-blue LED cycle or Telefunken logo freeze (reflash with CH341A programmer).',
        testPads: [
          { name: 'SPI_VCC_3V3', x: 66, y: 33, reading: '0.515V', rail: 'SPI_3V3' },
          { name: 'SPI_CLK_P8', x: 72, y: 33, reading: '0.485V', rail: 'SPI_CLK' },
          { name: 'SPI_CS_N', x: 66, y: 39, reading: '0.510V', rail: 'SPI_CS' }
        ]
      },
      {
        id: 'u3_telefunken_amp',
        name: 'TAS5711 / TAS5707 2x10W Stereo Class-D Audio Amplifier',
        ref: 'U3 (Audio Amp)',
        type: 'AUDIO',
        x: 76,
        y: 66,
        width: 16,
        height: 16,
        package: 'HTSSOP-48 PowerPAD',
        voltage: '12.0V - 18.0V PVDD / 3.3V DVDD',
        diodeDrop: '0.470V',
        nominalResistance: '> 90kΩ to GND',
        description: 'High-efficiency digital amplifier directly driving internal 8Ω speakers from I2S digital audio feed.',
        commonFaults: 'Distorted audio or total silence while picture is intact; shorted PVDD filter capacitor pulling 12V rail down.',
        testPads: [
          { name: 'PVDD_12V_AMP', x: 73, y: 63, reading: '0.470V', rail: '12V_AUDIO' },
          { name: 'SPK_OUT_R+', x: 79, y: 69, reading: '0.510V', rail: 'SPK_RIGHT' }
        ]
      },
      {
        id: 'u4_ams1117_33',
        name: 'AMS1117-3.3 Standby Low-Dropout Linear Regulator',
        ref: 'U4 (1117-3.3)',
        type: 'PMIC',
        x: 26,
        y: 36,
        width: 14,
        height: 14,
        package: 'SOT-223 3-Pin Tab',
        voltage: '5.0V IN / 3.3V OUT (Standby)',
        diodeDrop: '0.510V',
        nominalResistance: '> 45kΩ',
        description: 'Converts +5V standby from power board to clean 3.3V for standby MCU, IR remote receiver, and power key.',
        commonFaults: 'Blown LDO produces 0.0V or overheats to 100°C; TV completely dead with no standby light.',
        testPads: [
          { name: 'STBY_3V3_OUT', x: 23, y: 33, reading: '0.510V', rail: '3V3_STBY' },
          { name: 'STBY_5V_IN', x: 28, y: 39, reading: '0.495V', rail: '5V_STBY' }
        ]
      },
      {
        id: 'cn_telefunken_lvds',
        name: '30-Pin Full HD LVDS Panel Ribbon Interface',
        ref: 'CN_LVDS (Panel Connector)',
        type: 'CONNECTOR',
        x: 48,
        y: 17,
        width: 34,
        height: 10,
        package: '30-Pin 1.0mm Pitch Header',
        voltage: '12.0V VLCD / 1.2V Differential LVDS Pairs',
        diodeDrop: '0.430V - 0.530V',
        nominalResistance: '> 100kΩ',
        description: 'Transmits video data pairs (RX0-, RX0+, RX1-, RX1+, RXCLK) and panel power to LCD glass matrix.',
        commonFaults: 'Corrosion or loose connection causing solarized/negative colors, white display, or double images.',
        testPads: [
          { name: 'VLCD_12V', x: 37, y: 15, reading: '0.460V', rail: '12V_PANEL' },
          { name: 'LVDS_CLK+', x: 48, y: 15, reading: '0.510V', rail: 'LVDS_CLK' },
          { name: 'LVDS_RX2+', x: 58, y: 15, reading: '0.510V', rail: 'LVDS_RX2' }
        ]
      },
      {
        id: 'cn_telefunken_pwr',
        name: '10-Pin Power & Inverter Ingress Header',
        ref: 'CN_PWR (From 17IPS62 PSU)',
        type: 'CONNECTOR',
        x: 18,
        y: 66,
        width: 14,
        height: 24,
        package: '10-Pin 2.54mm Locking Header',
        voltage: '12V, 5V_STBY, STBY_ON (3.3V), BL_ON (3.3V)',
        diodeDrop: '0.480V - 0.520V',
        nominalResistance: '> 50kΩ',
        description: 'Main interconnect carrying +12V operating rail, +5V standby, and power/backlight enable signals to PSU.',
        commonFaults: 'Dry solder joints on 12V pins causing random shutdowns; missing STBY_ON trigger.',
        testPads: [
          { name: '12V_MAIN_IN', x: 16, y: 60, reading: '0.480V', rail: '12V_MAIN' },
          { name: '5V_STBY_IN', x: 16, y: 66, reading: '0.510V', rail: '5V_STBY' },
          { name: 'STBY_ON_SIG', x: 16, y: 72, reading: '0.530V', rail: 'STBY_ON' },
          { name: 'BL_ON_SIG', x: 16, y: 78, reading: '0.530V', rail: 'BL_ON' }
        ]
      }
    ]
  },
  {
    id: 'telefunken-led-tv-psu',
    name: 'Telefunken LED TV Power Supply Unit (Vestel 17IPS62 SMPS & Backlight)',
    boardNumber: '17IPS62 / 17IPS11 / 17IPS20',
    category: 'Display',
    color: '#78350f', // Phenolic Dark Amber Substrate
    dimensions: { width: 590, height: 630 },
    description: 'Telefunken & Vestel Switch-Mode Power Supply and Constant-Current LED Driver Board (17IPS62 series). Generates +12V, +5V standby rails, and 35V-75V constant current for LED backlight strips.',
    topImageText: 'High-Voltage Primary Hot Side & Secondary Low-Voltage Cold Side',
    bottomImageText: 'SMD PWM Driver, Shunt Resistor Bank, and Optocoupler Barrier',
    components: [
      {
        id: 'bd1_vestel_bridge',
        name: 'GBU606 AC Mains Bridge Rectifier (600V 6A)',
        ref: 'BD1 (Bridge Rectifier)',
        type: 'PASSIVE',
        x: 26,
        y: 24,
        width: 16,
        height: 14,
        package: 'SIP-4 Heatsink Mount',
        voltage: '110V-240V AC Mains / 320V DC Primary Bus',
        diodeDrop: '0.540V Forward Drop',
        nominalResistance: '> 2MΩ Reverse',
        description: 'Converts incoming AC line voltage into high-voltage DC for the flyback switching circuit.',
        commonFaults: 'Shorted bridge diode instantly blows main 3.15A glass fuse F101 upon plug-in.',
        testPads: [
          { name: 'DC_POS_320V', x: 23, y: 20, reading: '0.540V', rail: 'HV_BUS_320V' },
          { name: 'AC_LINE_IN', x: 29, y: 28, reading: '0.000V', rail: 'AC_MAINS' }
        ]
      },
      {
        id: 'c1_vestel_bulk',
        name: '450V 82µF High-Voltage Primary Electrolytic Can',
        ref: 'C106 (450V 82µF)',
        type: 'PASSIVE',
        x: 48,
        y: 25,
        width: 20,
        height: 20,
        package: 'Radial Aluminum Can Ø18mm',
        voltage: '320V-385V DC High Voltage',
        diodeDrop: '0.520V',
        nominalResistance: '> 600kΩ',
        description: 'Smooths rectified DC voltage and stores energy for the high-frequency switching transformer.',
        commonFaults: 'High ESR from thermal drying causes buzzing transformer, low secondary voltages, or relay clicking.',
        testPads: [
          { name: 'CAP_HV_PLUS', x: 45, y: 21, reading: '0.520V', rail: 'HV_PRIMARY' },
          { name: 'CAP_HV_GND', x: 51, y: 29, reading: '0.000V', rail: 'HOT_GND' }
        ]
      },
      {
        id: 'u1_ncp1251',
        name: 'NCP1251 / FAN6755 Primary Flyback Current-Mode PWM IC',
        ref: 'IC101 (Flyback PWM)',
        type: 'PMIC',
        x: 29,
        y: 49,
        width: 14,
        height: 14,
        package: 'TSOP-6 / SOIC-8 SMD',
        voltage: '14V-28V VCC / High Voltage Sense',
        diodeDrop: '0.495V',
        nominalResistance: '> 80kΩ',
        description: 'Drives primary switching MOSFET Q101 to transfer power across high-frequency transformer TR101.',
        commonFaults: 'Blown PWM IC with burn hole on top; dead power supply with 0V on all secondary outputs.',
        testPads: [
          { name: 'PWM_VCC_18V', x: 26, y: 45, reading: '0.495V', rail: 'PWM_VCC' },
          { name: 'PWM_GATE_OUT', x: 32, y: 53, reading: '0.510V', rail: 'GATE_DRV' }
        ]
      },
      {
        id: 'u_led_mp3394',
        name: 'MP3394S / MP3398A Constant-Current LED Backlight Boost IC',
        ref: 'IC201 (LED Driver)',
        type: 'PMIC',
        x: 75,
        y: 36,
        width: 16,
        height: 16,
        package: 'SOIC-16 Narrow',
        voltage: '35V - 75V VLED+ Output',
        diodeDrop: '0.470V',
        nominalResistance: '> 150kΩ',
        description: 'Boosts +24V rail up to required string voltage and regulates constant current through LED backlight channels.',
        commonFaults: 'Backlight flashes once on boot then turns off (audio remains); blown LED bead in panel strip triggering OVP.',
        testPads: [
          { name: 'VLED_PLUS_OUT', x: 72, y: 31, reading: '0.470V', rail: 'LED_ANODE' },
          { name: 'ISENSE_RETURN', x: 78, y: 41, reading: '0.525V', rail: 'LED_CATHODE' }
        ]
      },
      {
        id: 'd_sec_vestel_12v',
        name: 'Secondary 12V Dual Schottky Barrier Rectifier',
        ref: 'D108 (MBR20100CT)',
        type: 'PASSIVE',
        x: 48,
        y: 60,
        width: 14,
        height: 14,
        package: 'TO-220 Dual Diode on Heatsink',
        voltage: '12.0V DC Secondary Rail',
        diodeDrop: '0.350V (Schottky Forward Drop)',
        nominalResistance: '> 40kΩ',
        description: 'Rectifies secondary AC pulses from transformer into smooth +12V DC logic rail.',
        commonFaults: 'Shorted Schottky diode causes power supply to tick/click continuously in short-circuit protection mode.',
        testPads: [
          { name: '12V_SEC_OUT', x: 45, y: 56, reading: '0.350V', rail: '12V_SEC' }
        ]
      },
      {
        id: 'cn_vestel_bl',
        name: '2-Pin / 4-Pin LED Backlight Array Header',
        ref: 'CN_BL (To LED Strips)',
        type: 'CONNECTOR',
        x: 82,
        y: 19,
        width: 12,
        height: 16,
        package: 'Locking JST Connector',
        voltage: '35V - 75V DC Backlight',
        diodeDrop: '0.470V',
        nominalResistance: '> 1MΩ',
        description: 'Direct output connecting to interior LED backlight strip matrix behind LCD panel.',
        commonFaults: 'Burned/melted connector pin, open circuit inside LED string requiring strip replacement.',
        testPads: [
          { name: 'BL_VLED+', x: 80, y: 16, reading: '0.470V', rail: 'VLED_PLUS' },
          { name: 'BL_VLED-', x: 84, y: 22, reading: '0.520V', rail: 'VLED_MINUS' }
        ]
      }
    ]
  },
  {
    id: 'sony-bravia-4k-oled-main',
    name: 'Sony Bravia 4K LED/OLED TV (Main Motherboard BA Board)',
    boardNumber: '1-893-880-11 / 1-980-333-11 / BA Board',
    category: 'Display',
    color: '#022c22', // Sony Obsidian Dark Emerald
    dimensions: { width: 640, height: 510 },
    description: 'Sony Bravia 4K HDR Smart TV Main Motherboard (XBR-55X900 / KD-55X8000 / XR-55A80 series). Features Sony Cognitive XR / X1 Ultimate picture processor, MediaTek MT5895 Android core, Sony S-Master DSP, and Sony 6-blink diagnostic LED controller.',
    topImageText: 'Sony Cognitive XR Processor, HDMI 2.1 eARC Ports, and Android TV Engine',
    bottomImageText: 'Ground Planes, V-by-One UHD Display Flex Interface, and Power Stages',
    components: [
      {
        id: 'u_sony_xr',
        name: 'Sony Cognitive XR / 4K X-Reality PRO Picture Engine',
        ref: 'U_XR (Video Processor)',
        type: 'SOC',
        x: 48,
        y: 43,
        width: 28,
        height: 28,
        package: 'BGA-520 Custom Sony Heatspreader',
        voltage: '0.90V Core / 1.1V LPDDR4 / 3.3V I/O',
        diodeDrop: '0.180V Core / 0.490V I/O',
        nominalResistance: '3.8Ω Core / > 50kΩ I/O',
        description: 'Dedicated real-time AI picture enhancement processor handling local dimming, motion clarity, and HDR tone mapping.',
        commonFaults: 'Sony Red LED blinks 6 times (Backlight/Panel communication failure) or 8 blinks (Audio/SoC error); cracked BGA balls.',
        testPads: [
          { name: 'XR_0V9_CORE', x: 43, y: 38, reading: '0.180V', rail: '0V9_CORE' },
          { name: 'XR_3V3_IO', x: 55, y: 38, reading: '0.490V', rail: '3V3_IO' },
          { name: 'XR_RST_L', x: 41, y: 49, reading: '0.520V', rail: 'XR_RESET' }
        ]
      },
      {
        id: 'u_sony_mtk',
        name: 'MediaTek MT5895 / MT5893 Quad-Core Android TV SoC',
        ref: 'U_MTK (App SoC)',
        type: 'SOC',
        x: 25,
        y: 42,
        width: 20,
        height: 20,
        package: 'BGA-424 Package',
        voltage: '1.05V Core / 1.8V VDD_IO',
        diodeDrop: '0.240V Core',
        nominalResistance: '6.5Ω Core',
        description: 'Runs Google TV / Android TV operating system, Wi-Fi 6 networking, and app execution.',
        commonFaults: 'Boot loop on Android / Sony logo; stuck in recovery mode; thermal throttling.',
        testPads: [
          { name: 'MTK_1V05_CORE', x: 22, y: 38, reading: '0.240V', rail: '1V05_CORE' },
          { name: 'MTK_1V8_DRAM', x: 28, y: 38, reading: '0.460V', rail: '1V8_DRAM' }
        ]
      },
      {
        id: 'u_sony_emmc',
        name: 'Kingston / SanDisk 16GB High-Speed eMMC 5.1 Flash',
        ref: 'U_EMMC (Storage)',
        type: 'NAND',
        x: 24,
        y: 68,
        width: 15,
        height: 15,
        package: 'BGA-153',
        voltage: '3.3V VCC / 1.8V VCCQ',
        diodeDrop: '0.485V',
        nominalResistance: '> 80kΩ',
        description: 'Stores Sony Android system partitions, Bravia calibration parameters, and DRM security keys.',
        commonFaults: 'Read-only storage corruption causing Sony TV to freeze or fail OTA system updates.',
        testPads: [
          { name: 'EMMC_VCC_3V3', x: 21, y: 65, reading: '0.485V', rail: 'EMMC_3V3' },
          { name: 'EMMC_CLK', x: 27, y: 65, reading: '0.510V', rail: 'EMMC_CLK' }
        ]
      },
      {
        id: 'u_sony_stby_mcu',
        name: 'Renesas / NXP Standby Microcontroller & Diagnostic Blink Generator',
        ref: 'U_STBY (Syscon MCU)',
        type: 'PMIC',
        x: 72,
        y: 35,
        width: 15,
        height: 15,
        package: 'QFP-64',
        voltage: '3.3V Standby Always-On Rail',
        diodeDrop: '0.520V',
        nominalResistance: '> 90kΩ',
        description: 'Monitors power supply rails, temperature sensors, and drives front LED error blink sequences (2, 4, 6, 8 blinks).',
        commonFaults: 'Missing 3.3V standby rail causes total lack of power; tripped safety latch lockup.',
        testPads: [
          { name: 'STBY_3V3_SYS', x: 69, y: 32, reading: '0.520V', rail: '3V3_STBY' },
          { name: 'PWR_ON_CMD', x: 75, y: 32, reading: '0.540V', rail: 'POWER_ON' },
          { name: 'ERROR_SENSE', x: 72, y: 40, reading: '0.490V', rail: 'ERR_DET' }
        ]
      },
      {
        id: 'cn_sony_vbyone',
        name: '51-Pin High-Speed V-by-One UHD 4K/120Hz Display Header',
        ref: 'CN_VBYONE (To T-CON)',
        type: 'CONNECTOR',
        x: 48,
        y: 18,
        width: 36,
        height: 10,
        package: '51-Pin 0.5mm Pitch Fine Header',
        voltage: '12V T-CON Power / 800mV High-Speed Video Lanes',
        diodeDrop: '0.460V - 0.510V',
        nominalResistance: '> 100kΩ',
        description: 'Transmits 8-lane or 16-lane V-by-One differential 4K 120Hz video stream to timing controller board.',
        commonFaults: 'Corroded pins or unseated ribbon causing vertical RGB lines, green screen, or 6-blink error code.',
        testPads: [
          { name: 'TCON_12V_PWR', x: 38, y: 16, reading: '0.460V', rail: '12V_TCON' },
          { name: 'VBY_LANE0+', x: 48, y: 16, reading: '0.510V', rail: 'VBY_D0' },
          { name: 'VBY_LOCK_N', x: 58, y: 16, reading: '0.530V', rail: 'VBY_LOCK' }
        ]
      },
      {
        id: 'cn_sony_pwr',
        name: '28-Pin Multi-Rail Main Power Ingress Socket',
        ref: 'CN_PWR (From G-Board PSU)',
        type: 'CONNECTOR',
        x: 78,
        y: 68,
        width: 14,
        height: 26,
        package: '28-Pin 2.0mm Dual Row Header',
        voltage: '12V, 3.3V_STBY, T-CON_VCC, AC_OFF_DET, POWER_ON',
        diodeDrop: '0.480V - 0.530V',
        nominalResistance: '> 60kΩ',
        description: 'Multi-rail power supply connection receiving main 12V, standby 3.3V, and AC detection safety signals.',
        commonFaults: 'Missing AC_OFF_DET line (must be > 2.8V) causes Sony TV to shut down immediately with 2-blink error.',
        testPads: [
          { name: '12V_MAIN_PIN', x: 75, y: 64, reading: '0.480V', rail: '12V_MAIN' },
          { name: '3V3_STBY_PIN', x: 75, y: 70, reading: '0.520V', rail: '3V3_STBY' },
          { name: 'AC_OFF_DET', x: 81, y: 64, reading: '0.540V', rail: 'AC_OFF_DET' },
          { name: 'BL_ERR_SIG', x: 81, y: 70, reading: '0.530V', rail: 'BL_ERR' }
        ]
      }
    ]
  },
  {
    id: 'sony-bravia-tv-psu',
    name: 'Sony Bravia TV Power Supply Unit (G-Board / APS-395 SMPS)',
    boardNumber: '1-474-601-11 / APS-395 / 1-474-602-11',
    category: 'Display',
    color: '#9a3412', // Sony Phenolic High-Temp Amber Substrate
    dimensions: { width: 590, height: 640 },
    description: 'Sony Bravia SMPS Power Supply & Active Power Factor Correction (PFC) Board. Features Sony CXA3809M LLC resonant controller, MIP2F2 standby flyback IC, dual active PFC inductors, and 160V backlight boost drive.',
    topImageText: 'Active PFC Stage, Resonant LLC Transformers, and Optoisolator Barrier',
    bottomImageText: 'Surface-Mount Feedback Control ICs, Shunt Monitors, and Ground Plane',
    components: [
      {
        id: 'bd101_sony_bridge',
        name: 'Dual AC Mains Rectifier Bridge (800V 8A)',
        ref: 'BD101 (Bridge Rectifier)',
        type: 'PASSIVE',
        x: 25,
        y: 22,
        width: 16,
        height: 14,
        package: 'Dual Inline Heatsink Package',
        voltage: '110V-240V AC Mains / 390V PFC Boosted Bus',
        diodeDrop: '0.540V Forward Diode Drop',
        nominalResistance: '> 2MΩ Reverse',
        description: 'Rectifies alternating AC current into unfiltered DC bus for the active PFC stage.',
        commonFaults: 'Shorted bridge diode instantly blows main 4A ceramic fuse F101.',
        testPads: [
          { name: 'DC_POS_390V', x: 22, y: 18, reading: '0.540V', rail: 'PFC_390V' },
          { name: 'AC_LIVE_IN', x: 28, y: 26, reading: '0.000V', rail: 'AC_MAINS' }
        ]
      },
      {
        id: 'c101_sony_bulk',
        name: '450V 150µF Rubycon High-Reliability Bulk Capacitor Can',
        ref: 'C101 (450V 150µF)',
        type: 'PASSIVE',
        x: 48,
        y: 24,
        width: 22,
        height: 22,
        package: 'Radial Aluminum Electrolytic Ø22mm',
        voltage: '390V DC Active PFC Regulated Rail',
        diodeDrop: '0.530V',
        nominalResistance: '> 750kΩ',
        description: 'Main high-voltage energy reservoir maintaining stable 390V DC rail during high-brightness scenes.',
        commonFaults: 'Degraded capacitance or high ESR causes TV to trip 2-blink or 3-blink Sony protection code.',
        testPads: [
          { name: 'PFC_BULK_PLUS', x: 45, y: 20, reading: '0.530V', rail: 'PFC_RAIL' },
          { name: 'PFC_BULK_MINUS', x: 51, y: 28, reading: '0.000V', rail: 'HOT_GND' }
        ]
      },
      {
        id: 'ic601_cxa3809',
        name: 'Sony CXA3809M PFC & Resonant LLC Power Controller',
        ref: 'IC601 (CXA3809M)',
        type: 'PMIC',
        x: 28,
        y: 48,
        width: 16,
        height: 16,
        package: 'SOP-24 Power IC',
        voltage: '18V VCC / Dual MOSFET Gate Drives',
        diodeDrop: '0.490V',
        nominalResistance: '> 85kΩ',
        description: 'Advanced dual-controller handling Power Factor Correction boost and resonant LLC 12V main converter.',
        commonFaults: 'Blown CXA3809M causes complete absence of main 12V rail; standby works but main power fails to start.',
        testPads: [
          { name: 'PFC_GATE_OUT', x: 25, y: 44, reading: '0.490V', rail: 'GATE_PFC' },
          { name: 'LLC_GATE_HIGH', x: 31, y: 52, reading: '0.520V', rail: 'GATE_LLC' }
        ]
      },
      {
        id: 'ic501_mip2f2',
        name: 'Panasonic MIP2F2 Standby Flyback Switcher IC',
        ref: 'IC501 (MIP2F2 Standby)',
        type: 'PMIC',
        x: 72,
        y: 36,
        width: 14,
        height: 14,
        package: 'DIP-7 / SOP-8 with Built-In MOSFET',
        voltage: '3.3V Standby Always-On Output',
        diodeDrop: '0.510V',
        nominalResistance: '> 100kΩ',
        description: 'Dedicated low-power standby switcher supplying continuous 3.3V to the Sony Syscon microcontroller.',
        commonFaults: 'Burnt internal MOSFET destroys IC501, resulting in completely dead TV with no standby light.',
        testPads: [
          { name: 'STBY_3V3_OUT', x: 69, y: 32, reading: '0.510V', rail: '3V3_STBY' },
          { name: 'DRAIN_700V', x: 75, y: 40, reading: '0.610V', rail: 'HV_DRAIN' }
        ]
      },
      {
        id: 'u_sony_bl_boost',
        name: 'Constant-Current Multi-Zone LED Backlight Inverter Module',
        ref: 'U_BL (Backlight Driver)',
        type: 'PMIC',
        x: 75,
        y: 64,
        width: 16,
        height: 16,
        package: 'HTSSOP-28 Package',
        voltage: '120V - 160V Backlight String Drive',
        diodeDrop: '0.460V',
        nominalResistance: '> 180kΩ',
        description: 'Drives high-voltage LED arrays and sends BL_ERR status signal back to mainboard if any string fails.',
        commonFaults: 'Sony 4-Blink Error Code: Backlight driver detects open circuit or shorted LED and shuts down power.',
        testPads: [
          { name: 'VLED_BOOST_PLUS', x: 72, y: 60, reading: '0.460V', rail: 'LED_HV_PLUS' },
          { name: 'BL_ERR_STATUS', x: 78, y: 68, reading: '0.530V', rail: 'BL_ERROR' }
        ]
      },
      {
        id: 'rl101_ac_relay',
        name: 'Main AC Line Soft-Start Inrush Relay (10A 250VAC)',
        ref: 'RL101 (Power Relay)',
        type: 'PASSIVE',
        x: 18,
        y: 65,
        width: 14,
        height: 18,
        package: 'Sealed SPST Power Relay',
        voltage: '12V DC Coil / 240V AC Contacts',
        diodeDrop: '0.620V Coil Diode',
        nominalResistance: '420Ω Coil',
        description: 'Bypasses thermistor NTC after initial inrush charge to maximize energy efficiency.',
        commonFaults: 'Continuous clicking on/off without powering on; pitted contacts preventing AC flow.',
        testPads: [
          { name: 'RELAY_COIL_12V', x: 16, y: 60, reading: '0.620V', rail: 'RELAY_DRV' }
        ]
      }
    ]
  },
  {
    id: 'lg-4k-smart-tv-main',
    name: 'LG 43" / 55" / 65" 4K Smart TV (WebOS Main Motherboard)',
    boardNumber: 'EAX68253604 / EBR28435101 / EBT66034002',
    category: 'Display',
    color: '#1e1b4b', // LG Deep Midnight Indigo
    dimensions: { width: 620, height: 490 },
    description: 'LG 4K UHD WebOS Smart TV Main Motherboard (43UM7300 / 55UN7300 / NanoCell series). Features LG Quad-Core Alpha 7 processor, DDR4 RAM, Kioxia eMMC WebOS flash, Realtek audio processor, and EPI display output.',
    topImageText: 'LG Alpha Picture Processor, DDR4 RAM Bus, and WebOS Flash Stage',
    bottomImageText: 'Ground Planes, EPI / V-by-One 4K Display Socket, and Filter Rails',
    components: [
      {
        id: 'u1_lg_soc',
        name: 'LG Quad-Core Alpha 7 / Triple XD 4K Video Processor',
        ref: 'U1 (LG Central SoC)',
        type: 'SOC',
        x: 48,
        y: 43,
        width: 28,
        height: 28,
        package: 'BGA-488 Heatspreader Package',
        voltage: '0.95V Core / 1.2V DDR4 / 3.3V I/O',
        diodeDrop: '0.220V Core / 0.510V I/O',
        nominalResistance: '8.4Ω Core / > 50kΩ I/O',
        description: 'Central processor running LG webOS, 4K active HDR processing, and Magic Remote Bluetooth interface.',
        commonFaults: 'LG TV stuck on webOS logo splash; rebooting every 10 seconds; cold solder BGA fatigue.',
        testPads: [
          { name: 'LG_0V95_CORE', x: 43, y: 38, reading: '0.220V', rail: '0V95_CORE' },
          { name: 'LG_3V3_IO', x: 55, y: 38, reading: '0.510V', rail: '3V3_IO' }
        ]
      },
      {
        id: 'u2_lg_emmc',
        name: 'Kioxia 8GB eMMC 5.1 webOS System Flash',
        ref: 'U2 (eMMC ROM)',
        type: 'NAND',
        x: 25,
        y: 42,
        width: 15,
        height: 15,
        package: 'BGA-153',
        voltage: '3.3V VCC / 1.8V VCCQ',
        diodeDrop: '0.490V',
        nominalResistance: '> 80kΩ',
        description: 'Stores LG webOS operating system, Netflix/YouTube app binaries, and EDID keys.',
        commonFaults: 'Firmware partition bad blocks causing TV to power on with backlight but black screen.',
        testPads: [
          { name: 'EMMC_VCC_3V3', x: 22, y: 38, reading: '0.490V', rail: 'EMMC_3V3' }
        ]
      },
      {
        id: 'u3_lg_amp',
        name: 'TAS5733L 20W Digital Audio Power Amplifier',
        ref: 'U3 (Audio Amp)',
        type: 'AUDIO',
        x: 75,
        y: 65,
        width: 16,
        height: 16,
        package: 'HTSSOP-48 PowerPAD',
        voltage: '13.2V PVDD / 3.3V DVDD',
        diodeDrop: '0.480V',
        nominalResistance: '> 90kΩ',
        description: 'Stereo audio amplifier powering internal downward-firing speakers.',
        commonFaults: 'Sound popping, no audio on HDMI inputs, shorted PVDD power rail.',
        testPads: [
          { name: '13V_PVDD_AMP', x: 72, y: 62, reading: '0.480V', rail: '13V_AUDIO' }
        ]
      },
      {
        id: 'cn_lg_epi',
        name: '51-Pin High-Speed EPI / V-by-One UHD Display Header',
        ref: 'CN_EPI (To LCD Panel)',
        type: 'CONNECTOR',
        x: 48,
        y: 18,
        width: 36,
        height: 10,
        package: '51-Pin FFC Header',
        voltage: '13.2V VLCD / 1.2V EPI Pairs',
        diodeDrop: '0.450V - 0.520V',
        nominalResistance: '> 100kΩ',
        description: 'High-speed differential bus connecting mainboard to panel glass T-CON.',
        commonFaults: 'Vertical colored lines, solarized display, missing 13.2V panel fuse voltage.',
        testPads: [
          { name: '13V_PANEL_VCC', x: 38, y: 16, reading: '0.450V', rail: '13V_PANEL' }
        ]
      }
    ]
  },
  {
    id: 'hisense-50-55-4k-combo',
    name: 'Hisense 50" / 55" 4K Smart TV (3-in-1 Combo Motherboard)',
    boardNumber: 'RSAG7.820.8712 / RSAG7.820.9664',
    category: 'Display',
    color: '#1c1917', // Hisense Carbon Black
    dimensions: { width: 630, height: 500 },
    description: 'Hisense 4K Smart TV 3-in-1 Combo Board (50A6G / 55U6G / VIDAA series). Integrates Main Logic Processor, AC-to-DC SMPS Power Supply, and LED Backlight Boost Inverter on a single consolidated PCB.',
    topImageText: 'Consolidated SMPS Power Stage, MStar/Novatek SoC, and LED Boost Section',
    bottomImageText: 'Primary/Secondary Isolation Slot, Optocouplers, and High-Speed Video Bus',
    components: [
      {
        id: 'u1_hisense_soc',
        name: 'MStar MSD6886 / HiView 4K Smart Video SoC',
        ref: 'U1 (Hisense SoC)',
        type: 'SOC',
        x: 58,
        y: 45,
        width: 26,
        height: 26,
        package: 'BGA-396 Heatspreader',
        voltage: '1.15V Core / 3.3V IO / 1.5V DDR3',
        diodeDrop: '0.310V Core / 0.510V IO',
        nominalResistance: '14Ω Core',
        description: 'Combines VIDAA OS execution, HDMI 2.0 switching, and 4K display timing.',
        commonFaults: 'Stuck on Hisense logo screen; reboot loop; missing 1.15V core voltage from buck converter.',
        testPads: [
          { name: '1V15_CORE_VDD', x: 54, y: 40, reading: '0.310V', rail: '1V15_CORE' },
          { name: '3V3_IO_VDD', x: 64, y: 40, reading: '0.510V', rail: '3V3_IO' }
        ]
      },
      {
        id: 'u2_hisense_pwm',
        name: 'Integrated Primary Flyback SMPS PWM Controller',
        ref: 'U2 (Power PWM)',
        type: 'PMIC',
        x: 22,
        y: 35,
        width: 14,
        height: 14,
        package: 'SOP-8 SMD',
        voltage: '18V VCC / 320V DC Primary',
        diodeDrop: '0.510V',
        nominalResistance: '> 70kΩ',
        description: 'Switches primary transformer to generate secondary 12V and 5V standby rails.',
        commonFaults: 'Power surge blows PWM IC and main MOSFET; TV completely unpowered with zero standby light.',
        testPads: [
          { name: 'PWM_VCC_18V', x: 19, y: 31, reading: '0.510V', rail: 'PWM_VCC' }
        ]
      },
      {
        id: 'u3_hisense_bl',
        name: 'Multi-Channel LED Backlight Boost Controller',
        ref: 'U3 (LED Driver)',
        type: 'PMIC',
        x: 24,
        y: 68,
        width: 16,
        height: 16,
        package: 'SOP-16',
        voltage: '80V - 140V VLED+ Output',
        diodeDrop: '0.470V',
        nominalResistance: '> 150kΩ',
        description: 'Boosts +12V up to 120V to power direct-lit LED backlight arrays.',
        commonFaults: 'Flash of backlight on startup then black screen (flashlight test reveals image); blown LED strip.',
        testPads: [
          { name: 'VLED_PLUS_120V', x: 21, y: 64, reading: '0.470V', rail: 'VLED_PLUS' }
        ]
      },
      {
        id: 'cn_hisense_panel',
        name: '4K V-by-One Ribbon Socket to Panel / T-CON',
        ref: 'CN_TCON',
        type: 'CONNECTOR',
        x: 82,
        y: 25,
        width: 12,
        height: 32,
        package: '41-Pin 0.5mm Locking FFC',
        voltage: '12V Panel Power / High-Speed Differential Pairs',
        diodeDrop: '0.460V',
        nominalResistance: '> 100kΩ',
        description: 'Connects composite combo board to LCD glass panel source drivers.',
        commonFaults: 'Corrosion on 12V pin causing black screen or white display.',
        testPads: [
          { name: '12V_PANEL_OUT', x: 80, y: 22, reading: '0.460V', rail: '12V_PANEL' }
        ]
      }
    ]
  }
];

export default function BlueprintViewer({ 
  themeConfig: _themeConfig,
  currentUser = defaultUser,
  initialView = 'boardview'
}: { 
  themeConfig?: ThemeConfig;
  currentUser?: UserProfile;
  initialView?: 'boardview' | 'annotator';
}) {
  const [boardsList, setBoardsList] = useState<BoardPreset[]>(PRESET_BOARDS);
  const [selectedBoard, setSelectedBoard] = useState<BoardPreset>(PRESET_BOARDS[0]);
  const [viewMode, setViewMode] = useState<'boardview' | 'blueprint' | 'microscope' | 'thermal' | 'xray'>('boardview');
  const [boardSide, setBoardSide] = useState<'top' | 'bottom'>('top');
  const [activeWorkstationTab, setActiveWorkstationTab] = useState<'boardview' | 'annotator'>(initialView);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedComponent, setSelectedComponent] = useState<BoardComponent | null>(PRESET_BOARDS[0].components[0]);
  const [hoveredComponent, setHoveredComponent] = useState<BoardComponent | null>(null);

  // Social Annotations State
  const [annotations, setAnnotations] = useState<SocialAnnotation[]>(() => {
    const saved = storage.getSocialAnnotations();
    if (saved && saved.length > 0) {
      // Merge saved with initial without duplicates
      const ids = new Set(saved.map((s: SocialAnnotation) => s.id));
      const missing = initialSocialAnnotations.filter(i => !ids.has(i.id));
      return [...saved, ...missing];
    }
    return initialSocialAnnotations;
  });
  const [isPinningActive, setIsPinningActive] = useState(false);
  const [selectedAnnotationPin, setSelectedAnnotationPin] = useState<SocialAnnotation | null>(null);

  // Multimeter Tool State
  const [multimeterActive, setMultimeterActive] = useState(false);
  const [multimeterMode, setMultimeterMode] = useState<'diode' | 'resistance' | 'voltage'>('diode');
  const [activeProbeReading, setActiveProbeReading] = useState<{ label: string; value: string; isShort: boolean } | null>(null);
  const [beepTrigger, setBeepTrigger] = useState(false);
  const [showCalloutLabels, setShowCalloutLabels] = useState(true);

  // Online Database & Google Search Grounding State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchingOnline, setIsSearchingOnline] = useState(false);
  const [onlineBlueprintData, setOnlineBlueprintData] = useState<string | null>(null);
  const [isOnlineDrawerOpen, setIsOnlineDrawerOpen] = useState(false);
  const [showPcbHelpModal, setShowPcbHelpModal] = useState(false);
  const [disambiguationQuery, setDisambiguationQuery] = useState<string | null>(null);
  const [generationFeedback, setGenerationFeedback] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const boardPcbRef = useRef<HTMLDivElement>(null);

  // Social Annotations Action Handlers
  const handleAddAnnotation = (newAnnData: Omit<SocialAnnotation, 'id' | 'createdAt' | 'upvotes' | 'verifiedFixCount' | 'replies'>) => {
    const newAnnotation: SocialAnnotation = {
      ...newAnnData,
      id: `ann_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
      upvotes: 1,
      verifiedFixCount: 0,
      hasUserUpvoted: true,
      hasUserVerified: false,
      replies: []
    };

    const updated = [newAnnotation, ...annotations];
    setAnnotations(updated);
    storage.saveSocialAnnotations(updated);
    setSelectedAnnotationPin(newAnnotation);
    setIsPinningActive(false);
  };

  const handleAddReply = (annotationId: string, replyData: Omit<AnnotationReply, 'id' | 'createdAt'>) => {
    const newReply: AnnotationReply = {
      ...replyData,
      id: `rep_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString()
    };

    const updated = annotations.map(ann => {
      if (ann.id === annotationId) {
        return {
          ...ann,
          replies: [...ann.replies, newReply]
        };
      }
      return ann;
    });

    setAnnotations(updated);
    storage.saveSocialAnnotations(updated);
  };

  const handleToggleUpvote = (annotationId: string) => {
    const updated = annotations.map(ann => {
      if (ann.id === annotationId) {
        const isUpvoted = !!ann.hasUserUpvoted;
        return {
          ...ann,
          upvotes: isUpvoted ? Math.max(0, ann.upvotes - 1) : ann.upvotes + 1,
          hasUserUpvoted: !isUpvoted
        };
      }
      return ann;
    });
    setAnnotations(updated);
    storage.saveSocialAnnotations(updated);
  };

  const handleToggleVerifyFix = (annotationId: string) => {
    const updated = annotations.map(ann => {
      if (ann.id === annotationId) {
        const isVerified = !!ann.hasUserVerified;
        return {
          ...ann,
          verifiedFixCount: isVerified ? Math.max(0, ann.verifiedFixCount - 1) : ann.verifiedFixCount + 1,
          hasUserVerified: !isVerified
        };
      }
      return ann;
    });
    setAnnotations(updated);
    storage.saveSocialAnnotations(updated);
  };

  // Switch board preset
  const handleSelectBoard = (preset: BoardPreset) => {
    setSelectedBoard(preset);
    setSelectedComponent(preset.components[0] || null);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setActiveProbeReading(null);
  };

  // Zoom handlers
  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(Math.max(prev + delta, 0.6), 3.5));
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setActiveProbeReading(null);
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.component-hotspot') && !multimeterActive) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - panPosition.x, y: e.touches[0].clientY - panPosition.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPanPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  // Virtual Multimeter probe touch
  const handleProbeTestPad = (pad: { name: string; reading: string; rail: string }) => {
    const isShort = pad.reading.includes('0.00') || pad.reading.includes('0.04');
    let readingStr = pad.reading;
    if (multimeterMode === 'resistance') {
      readingStr = isShort ? '0.02 Ω' : '14.8 kΩ';
    } else if (multimeterMode === 'voltage') {
      readingStr = pad.rail.includes('MAIN') ? '3.92 V' : pad.rail.includes('CORE') ? '0.85 V' : '1.80 V';
    }

    setActiveProbeReading({
      label: `${pad.name} (${pad.rail})`,
      value: readingStr,
      isShort
    });

    if (isShort) {
      setBeepTrigger(true);
      setTimeout(() => setBeepTrigger(false), 500);
    }
  };

  // Compute matching boards from search query
  const matchingBoards = searchQuery.trim()
    ? boardsList.filter(p => {
        const q = searchQuery.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(q) ||
          p.boardNumber.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (q.includes('samsung') && p.id.includes('samsung')) ||
          (q.includes('32') && p.id.includes('32')) ||
          (q.includes('tv') && p.category === 'Display') ||
          (q.includes('switch') && p.id.includes('switch')) ||
          (q.includes('macbook') && p.id.includes('macbook')) ||
          (q.includes('iphone') && p.id.includes('iphone')) ||
          (q.includes('ps5') && p.id.includes('ps5'))
        );
      })
    : [];

  // Dynamic Unlimited Boardview Generator
  const handleGenerateAndLoadBoard = async (queryToGenerate: string, specificModule?: string) => {
    setIsSearchingOnline(true);
    setGenerationFeedback(`Synthesizing circuit blueprint for "${queryToGenerate}"...`);

    try {
      const res = await fetch('/api/generate-boardview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryToGenerate,
          specificModule
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.board && data.board.components && data.board.components.length > 0) {
          const newBoard: BoardPreset = data.board;
          // Add to boards list if not already present
          setBoardsList(prev => {
            const exists = prev.some(b => b.id === newBoard.id || b.boardNumber === newBoard.boardNumber);
            return exists ? prev : [newBoard, ...prev];
          });
          handleSelectBoard(newBoard);
          setGenerationFeedback(`Loaded real boardview: ${newBoard.name} (${newBoard.boardNumber})`);
          setTimeout(() => setGenerationFeedback(null), 5000);
          return newBoard;
        }
      }
    } catch (err) {
      console.warn("Could not generate dynamic boardview from server:", err);
    } finally {
      setIsSearchingOnline(false);
    }
    return null;
  };

  const handleOnlineSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const queryToSearch = searchQuery.trim() || selectedBoard.name;
    if (!queryToSearch) return;

    // Check if query directly matches any of our board presets
    const matches = boardsList.filter(p => {
      const q = queryToSearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.boardNumber.toLowerCase().includes(q) ||
        (q.includes('samsung') && p.id.includes('samsung')) ||
        (q.includes('32') && p.id.includes('32')) ||
        (q.includes('switch') && p.id.includes('switch')) ||
        (q.includes('tv') && p.category === 'Display')
      );
    });

    if (matches.length === 1) {
      handleSelectBoard(matches[0]);
      setDisambiguationQuery(null);
    } else if (matches.length > 1) {
      setDisambiguationQuery(queryToSearch);
      // Default to first match if current board is not among them
      if (!matches.some(m => m.id === selectedBoard.id)) {
        handleSelectBoard(matches[0]);
      }
    } else {
      // Dynamic synthesis for any unlimited model / PCB number
      await handleGenerateAndLoadBoard(queryToSearch);
    }

    setIsSearchingOnline(true);
    setIsOnlineDrawerOpen(true);
    setOnlineBlueprintData(null);

    try {
      const res = await fetch('/api/blueprint-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryToSearch,
          deviceModel: selectedBoard.name,
          boardNumber: selectedBoard.boardNumber
        })
      });

      if (!res.ok) throw new Error("Search service unavailable.");
      const data = await res.json();
      setOnlineBlueprintData(data.blueprintData);
      
      // Update app with new knowledge
      try {
        await addDoc(collection(db, 'savedBlueprints'), {
            name: queryToSearch,
            blueprintData: data.blueprintData,
            timestamp: serverTimestamp(),
            source: 'google-ai-synthesis'
        });
      } catch (e) {
        console.error("Failed to save blueprint:", e);
      }
    } catch {
      setOnlineBlueprintData(`## Native Schematic & Blueprint Telemetry: ${queryToSearch}

- **Target Hardware Architecture:** \`${queryToSearch}\`
- **Substrate Specification:** Multi-layer high-Tg FR4 with gold immersion (ENIG) surface pads and stitched ground vias.
- **Power Tree Distribution:** Primary buck regulation with low-noise LDOs and multi-phase switching inductors.

### 1. Primary Diagnostic Test Points
- **Primary Bus (\`VDD_MAIN\` / \`VBAT\` / \`13V_SEC\`):** Standard operating nominal diode mode: **0.450V**; Short threshold: **< 0.050V**
- **Always-On Logic Rail (\`STBY_3V3\` / \`1.8V_ALWAYS\`):** Standby RTC / Remote IR / Power Switch sense lines
- **Core Buck Rails:** Low-impedance processor rail: nominal **0.015V – 0.350V**

### 2. Power Sequencing Verification Order
1. **Mains / DC IN Power Entry**
2. **Standby Auxiliary LDO (3.3V / 5V)**
3. **Power-On Handshake (PS_ON / PWR_SW)**
4. **Primary Buck Regulators (Core & Audio Rails)**
5. **Panel / Output Enable (BL_ON / LVDS)**

### 3. Bench Micro-Soldering Rework Profile
- **Thermal Pre-Heat:** 130°C – 150°C
- **Hot Air Profile:** 345°C – 360°C at 45% airflow (Lead-Free SAC305)
- **Flux:** Halide-free no-clean RMA / synthetic micro-soldering paste`);
    } finally {
      setIsSearchingOnline(false);
    }
  };

  // Color & Theme helpers
  const maskColor = selectedBoard.color;

  return (
    <div className="flex flex-col gap-6 min-h-[calc(100vh-8rem)]">
      {/* Top Header & Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                Natural Boardview & Blueprint Workstation
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {selectedBoard.category}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>{selectedBoard.name}</span>
              <span className="text-xs font-normal text-slate-500 font-mono">({selectedBoard.boardNumber})</span>
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 max-w-3xl">
              {selectedBoard.description}
            </p>
          </div>

          {/* Online Database Search Bar & Silkscreen Guide Trigger */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
            <form onSubmit={handleOnlineSearch} className="flex items-center gap-2 flex-1">
              <div className="relative flex-1 lg:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchQuery(val);
                    if (val.trim()) {
                      // Live check for immediate matches
                      const q = val.toLowerCase().trim();
                      const liveMatch = boardsList.find(p => 
                        p.name.toLowerCase().includes(q) || 
                        p.boardNumber.toLowerCase().includes(q) ||
                        (q.includes('samsung') && q.includes('32') && p.id.includes('samsung-32'))
                      );
                      if (liveMatch && liveMatch.id !== selectedBoard.id) {
                        handleSelectBoard(liveMatch);
                      }
                    }
                  }}
                  placeholder="Search ANY device or PCB code (e.g. Samsung 32 LED, BN41, Switch, 820-02536, RTX 4090)..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSearchingOnline}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-xs disabled:opacity-50"
              >
                {isSearchingOnline ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Searching & Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Search Boardview</span>
                  </>
                )}
              </button>
            </form>

            <button
              onClick={() => setShowPcbHelpModal(true)}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap border border-slate-200 dark:border-slate-700"
              title="How to find your PCB board number"
            >
              <Tag className="w-3.5 h-3.5 text-amber-500" />
              <span>PCB Number Guide</span>
            </button>
          </div>
        </div>

        {/* Dynamic Generation Feedback Notification */}
        {generationFeedback && (
          <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-800 dark:text-emerald-200 animate-fadeIn">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-semibold">{generationFeedback}</span>
            </div>
            <button
              onClick={() => setGenerationFeedback(null)}
              className="text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Live Search Match / PCB Disambiguation Alert */}
        {(disambiguationQuery || (searchQuery.trim().length > 1 && matchingBoards.length > 0)) && (
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold text-blue-900 dark:text-blue-200">
                  Multiple PCB Modules Detected for &quot;{searchQuery || disambiguationQuery}&quot;
                </span>
                <span className="text-[11px] text-blue-700 dark:text-blue-300">
                  — Select the exact board stamped inside your unit:
                </span>
              </div>
              <button
                onClick={() => {
                  setDisambiguationQuery(null);
                  setSearchQuery('');
                }}
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline self-end sm:self-auto font-medium"
              >
                Clear Search
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {matchingBoards.map((preset) => {
                const isCurrent = selectedBoard.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      handleSelectBoard(preset);
                      setDisambiguationQuery(null);
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                        : 'bg-white/60 dark:bg-slate-900/60 border-blue-200 dark:border-blue-900/40 hover:bg-white dark:hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {preset.name}
                      </span>
                      {isCurrent && (
                        <span className="px-1.5 py-0.2 bg-blue-500 text-white text-[9px] font-bold rounded-xs uppercase">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                      <Tag className="w-3 h-3" />
                      <span>{preset.boardNumber}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Board Preset Selector Chips & Main Workstation Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider whitespace-nowrap">
              Hardware Library:
            </span>
            {boardsList.map((preset) => {
              const isSelected = selectedBoard.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    handleSelectBoard(preset);
                    setDisambiguationQuery(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Cpu className="w-3 h-3" />
                  <span>{preset.name.split(' ')[0]} {preset.name.split(' ')[1] || ''}</span>
                </button>
              );
            })}
          </div>

          {/* Workstation Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setActiveWorkstationTab('boardview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeWorkstationTab === 'boardview'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Boardview & Schematics</span>
            </button>
            <button
              onClick={() => setActiveWorkstationTab('annotator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeWorkstationTab === 'annotator'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-rose-500" />
              <span>Social Annotator</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                {annotations.filter(a => a.boardId === selectedBoard.id).length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workstation: Visualizer + Telemetry Inspector */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left / Main: High-Res Natural Image & Blueprint Canvas (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col gap-3">
          {/* Canvas Toolbar */}
          <div className="bg-slate-900 text-white rounded-t-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
            {/* View Modes */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('boardview')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  viewMode === 'boardview' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
                title="Realistic High-Resolution PCB Boardview"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Realistic PCB</span>
              </button>
              <button
                onClick={() => setViewMode('blueprint')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  viewMode === 'blueprint' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
                title="Engineering Schematic CAD Blueprint"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Schematic Blueprint</span>
              </button>
              <button
                onClick={() => setViewMode('microscope')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  viewMode === 'microscope' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
                title="40x Stereo Microscope Inspection"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Microscope</span>
              </button>
              <button
                onClick={() => setViewMode('thermal')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  viewMode === 'thermal' ? 'bg-orange-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
                title="FLIR Thermal IR Camera Heatmap"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Thermal IR</span>
              </button>
              <button
                onClick={() => setViewMode('xray')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  viewMode === 'xray' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
                title="Radiographic BGA X-Ray Layer"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>X-Ray BGA</span>
              </button>
            </div>

            {/* Board Side Toggle & Zoom Tools */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-800 rounded-lg p-0.5 text-xs font-semibold">
                <button
                  onClick={() => setBoardSide('top')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    boardSide === 'top' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Top (A)
                </button>
                <button
                  onClick={() => setBoardSide('bottom')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    boardSide === 'bottom' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Bottom (B)
                </button>
              </div>

              {/* Pin Note Drop Tool Toggle */}
              <button
                onClick={() => setIsPinningActive(!isPinningActive)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  isPinningActive
                    ? 'bg-rose-500 text-white border-rose-400 shadow-xs ring-2 ring-rose-400/50 animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
                title="Drop a community fault or note pin on the PCB"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>{isPinningActive ? 'Click PCB...' : 'Pin Note'}</span>
              </button>

              {/* Diagram Labels Toggle */}
              <button
                onClick={() => setShowCalloutLabels(!showCalloutLabels)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  showCalloutLabels
                    ? 'bg-blue-600 text-white border-blue-400 shadow-xs ring-1 ring-blue-400/50'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
                title="Toggle schematic callout annotations & arrows"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Diagram Labels</span>
              </button>

              {/* Multimeter Tool Toggle */}
              <button
                onClick={() => setMultimeterActive(!multimeterActive)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  multimeterActive
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
              >
                <Crosshair className="w-3.5 h-3.5" />
                <span>Probe Tool</span>
              </button>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5">
                <button
                  onClick={() => handleZoom(-0.25)}
                  className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono font-bold w-12 text-center text-slate-300">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => handleZoom(0.25)}
                  className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetView}
                  className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
                  title="Reset View"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Visual Canvas Container */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDragging(false)}
            className={`relative w-full h-[580px] bg-slate-950 rounded-b-2xl overflow-hidden border border-slate-800 select-none ${
              multimeterActive ? 'cursor-crosshair' : isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {/* Background Grid: Blueprint or Workbench */}
            <div 
              className={`absolute inset-0 pointer-events-none ${
                viewMode === 'blueprint' 
                  ? 'opacity-40 bg-[linear-gradient(to_right,#1d4ed815_1px,transparent_1px),linear-gradient(to_bottom,#1d4ed815_1px,transparent_1px)] bg-[size:24px_24px]'
                  : 'opacity-20 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] bg-[size:16px_16px]'
              }`}
            />

            {/* Transform Canvas Surface */}
            <div
              style={{
                transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.15s ease-out'
              }}
              className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none"
            >
              {/* Realistic Boardview Board SVG Layer */}
              <div
                ref={boardPcbRef}
                onClick={(e) => {
                  if (!isPinningActive) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                  const clickY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

                  const clickedComp = selectedBoard.components.find(c => {
                    return Math.abs(c.x - clickX) < (c.width / 2 + 2) && Math.abs(c.y - clickY) < (c.height / 2 + 2);
                  });

                  handleAddAnnotation({
                    boardId: selectedBoard.id,
                    boardSide: boardSide,
                    x: Math.round(clickX * 10) / 10,
                    y: Math.round(clickY * 10) / 10,
                    componentRef: clickedComp?.ref || undefined,
                    title: clickedComp ? `Fault Analysis on ${clickedComp.ref}` : `Diagnostic Point (${Math.round(clickX)}%, ${Math.round(clickY)}%)`,
                    content: clickedComp ? `Observation on ${clickedComp.name}. Nominal rail: ${clickedComp.voltage}.` : `Custom diagnostic observation at board coordinates.`,
                    category: 'fault_warning',
                    voltageRail: clickedComp?.voltage,
                    diodeReading: clickedComp?.diodeDrop,
                    authorId: currentUser?.id || 'guest',
                    authorName: currentUser?.name || 'Technician',
                    authorRole: currentUser?.role || 'Bench Technician',
                    authorAvatar: currentUser?.avatar,
                    tags: [selectedBoard.category, clickedComp?.type || 'Test Point']
                  });
                }}
                style={{
                  width: `${selectedBoard.dimensions.width}px`,
                  height: `${selectedBoard.dimensions.height}px`,
                  backgroundColor: viewMode === 'blueprint' ? '#0a192f' : viewMode === 'thermal' ? '#18042b' : maskColor,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)'
                }}
                className={`relative rounded-3xl border transition-all duration-300 pointer-events-auto overflow-hidden ${
                  isPinningActive ? 'cursor-cell ring-4 ring-rose-500/50' : ''
                } ${
                  viewMode === 'blueprint'
                    ? 'border-blue-500/40 shadow-blue-900/20'
                    : 'border-slate-700/50'
                }`}
              >
                {/* Realistic Custom Board Rendering Engine */}
                <RealisticPcbBoard
                  board={selectedBoard}
                  viewMode={viewMode}
                  boardSide={boardSide}
                  selectedComponent={selectedComponent}
                  hoveredComponent={hoveredComponent}
                  showCalloutLabels={showCalloutLabels}
                  onSelectComponent={(comp) => setSelectedComponent(comp)}
                  onHoverComponent={(comp) => setHoveredComponent(comp)}
                />

                {/* Multimeter Test Point Pads (Interactive Probing Points) */}
                {selectedComponent && selectedComponent.testPads.map((pad, idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProbeTestPad(pad);
                      }}
                      style={{
                        left: `${pad.x}%`,
                        top: `${pad.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      title={`Probe Test Point: ${pad.name} (${pad.rail})`}
                      className={`absolute z-20 w-4 h-4 rounded-full flex items-center justify-center transition-transform hover:scale-125 cursor-crosshair ${
                        multimeterActive
                          ? 'animate-pulse ring-2 ring-amber-400 bg-amber-400 text-slate-950'
                          : 'bg-yellow-400 border border-amber-600 shadow-xs'
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    </button>
                  );
                })}

                {/* Overlay Community Social Annotation Pins */}
                {annotations
                  .filter(ann => ann.boardId === selectedBoard.id && (ann.boardSide === boardSide || !ann.boardSide))
                  .map((ann) => {
                    const isSelected = selectedAnnotationPin?.id === ann.id;
                    let pinBg = 'bg-rose-500 text-white ring-rose-400';
                    if (ann.category === 'test_point') pinBg = 'bg-emerald-500 text-white ring-emerald-400';
                    else if (ann.category === 'repair_tip') pinBg = 'bg-amber-500 text-slate-950 ring-amber-400';
                    else if (ann.category === 'replacement') pinBg = 'bg-purple-500 text-white ring-purple-400';
                    else if (ann.category === 'question') pinBg = 'bg-blue-500 text-white ring-blue-400';

                    return (
                      <div
                        key={ann.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAnnotationPin(ann);
                          setActiveWorkstationTab('annotator');
                        }}
                        style={{
                          left: `${ann.x}%`,
                          top: `${ann.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        className="absolute z-25 group cursor-pointer"
                      >
                        <div className={`relative flex items-center justify-center w-7 h-7 rounded-full shadow-lg transition-transform hover:scale-125 ${pinBg} ${
                          isSelected ? 'ring-4 scale-110' : ''
                        }`}>
                          <span className="text-xs">📍</span>
                          {ann.verifiedFixCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border border-slate-900 flex items-center justify-center text-[8px] font-black text-slate-900">
                              ✓
                            </span>
                          )}
                        </div>

                        {/* Floating Tooltip */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-30 whitespace-nowrap">
                          <div className="bg-slate-900/95 text-white text-[11px] rounded-lg px-2.5 py-1.5 border border-slate-700 shadow-xl max-w-xs text-center backdrop-blur-xs">
                            <span className="font-bold text-amber-300 block">{ann.componentRef ? `[${ann.componentRef}] ` : ''}{ann.title}</span>
                            <span className="text-[9px] text-slate-300">{ann.authorName} • {ann.verifiedFixCount} fixes • Click to inspect</span>
                          </div>
                          <div className="w-1.5 h-1.5 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Live Multimeter HUD Display Overlay */}
            {multimeterActive && (
              <div className="absolute top-4 left-4 z-30 bg-slate-950/95 border border-amber-500/80 rounded-xl p-3 shadow-xl backdrop-blur-md w-72">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className={`w-4 h-4 ${beepTrigger ? 'text-red-500 animate-bounce' : 'text-amber-400'}`} />
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Benchtop DMM
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setMultimeterMode('diode')}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        multimeterMode === 'diode' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Diode
                    </button>
                    <button
                      onClick={() => setMultimeterMode('resistance')}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        multimeterMode === 'resistance' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Ω
                    </button>
                    <button
                      onClick={() => setMultimeterMode('voltage')}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        multimeterMode === 'voltage' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      DC V
                    </button>
                  </div>
                </div>

                {/* Digital Reading Display */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-center mb-2">
                  <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                    {activeProbeReading ? activeProbeReading.label : 'Touch any Gold Test Point'}
                  </span>
                  <div className={`text-2xl font-mono font-bold tracking-tight ${
                    activeProbeReading?.isShort 
                      ? 'text-red-400 animate-pulse' 
                      : activeProbeReading 
                        ? 'text-emerald-400' 
                        : 'text-amber-400/60'
                  }`}>
                    {activeProbeReading ? activeProbeReading.value : '0.000 V'}
                  </div>
                  {activeProbeReading?.isShort && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800 text-[10px] font-bold uppercase">
                      ⚠️ SHORT CIRCUIT DETECTED (&lt; 0.05V)
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  {multimeterMode === 'diode' 
                    ? 'Red probe grounded. Black probe on component pad.' 
                    : multimeterMode === 'resistance'
                      ? 'Impedance to logic ground bus.'
                      : 'Active DC voltage rail telemetry.'}
                </p>
              </div>
            )}

            {/* Bottom Status Bar & Mode Info */}
            <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800/80 backdrop-blur-xs">
              <div className="flex items-center gap-3">
                <span>LAYER: <strong>{viewMode.toUpperCase()}</strong></span>
                <span>SUBSTRATE: <strong>{selectedBoard.dimensions.width}x{selectedBoard.dimensions.height}mm</strong></span>
                <span>CHIPS: <strong>{selectedBoard.components.length} ICs</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline">Drag to pan | Scroll to zoom</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Component Telemetry & Pinout Telemetry (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          {selectedComponent ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-4">
              {/* Header */}
              <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                    {selectedComponent.ref}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {selectedComponent.type}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  {selectedComponent.name}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Package: {selectedComponent.package}
                </p>
              </div>

              {/* Multimeter Reference Values */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Diode Mode Drop
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedComponent.diodeDrop}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Target Rail
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    {selectedComponent.voltage}
                  </span>
                </div>
                <div className="col-span-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Nominal Impedance
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                    {selectedComponent.nominalResistance}
                  </span>
                </div>
              </div>

              {/* Role & Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Architecture Role
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedComponent.description}
                </p>
              </div>

              {/* Common Failure Modes */}
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-red-700 dark:text-red-400 text-xs font-bold mb-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Known Failure Symptoms</span>
                </div>
                <p className="text-xs text-red-900 dark:text-red-300/90 leading-relaxed">
                  {selectedComponent.commonFaults}
                </p>
              </div>

              {/* Test Point Probing List */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Component Test Points</span>
                  <span className="text-[10px] font-normal text-slate-400">Click to probe</span>
                </h4>
                <div className="flex flex-col gap-1.5">
                  {selectedComponent.testPads.map((pad, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleProbeTestPad(pad)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800/70 border border-slate-200 dark:border-slate-800 text-left flex items-center justify-between transition-colors"
                    >
                      <div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono block">
                          {pad.name}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {pad.rail}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {pad.reading}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button: Query Online OEM Schematics */}
              <button
                onClick={() => {
                  setSearchQuery(`${selectedBoard.name} ${selectedComponent.name} schematics pinout`);
                  handleOnlineSearch();
                }}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <BookOpen className="w-4 h-4" />
                <span>Lookup OEM Blueprint in Database</span>
              </button>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 text-center text-slate-500">
              <Cpu className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs">Click on any chip on the boardview to inspect its pinout, voltage rails, and diode readings.</p>
            </div>
          )}

          {/* Native Hardware Diagnostic Matrix & Power Sequence Specifications */}
          <div className="bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-500" />
                <span>Bench Hardware Diagnostic Standards</span>
              </h4>
              <span className="text-[10px] font-mono text-slate-400">IEEE 1149.1 / IPC-A-610</span>
            </div>

            {/* Power Rail Sequence Timing */}
            <div className="space-y-1.5 bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Standard Power Sequencing Order
              </span>
              <div className="flex items-center gap-1 text-[10px] font-mono font-medium text-slate-700 dark:text-slate-300 overflow-x-auto pb-1">
                <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">1. VBAT/VBUS</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">2. 1.8V Always</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">3. PMIC BUCK</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">4. Core 0.85V</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">5. Reset Release</span>
              </div>
            </div>

            {/* Diode Mode Benchmark Matrix */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block">Short-to-GND Threshold</span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">&lt; 0.050V (&lt; 30Ω)</span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block">Standard Logic Bus</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">0.400V – 0.650V</span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block">CPU Core Coils (Low-Z)</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">0.015V – 0.150V</span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block">High-Z / Pull-Up</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">&gt; 0.750V / OL</span>
              </div>
            </div>

            {/* Micro-soldering Calibration */}
            <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500">
              <span>Rework Profile: <strong>345°C - 360°C</strong> (Lead-Free)</span>
              <span>Pre-Heat: <strong>130°C - 150°C</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Annotations Section */}
      <div className="mt-2">
        <SocialAnnotator 
          boardId={selectedBoard.id}
          boardName={selectedBoard.name}
          boardSide={boardSide}
          annotations={annotations}
          currentUser={currentUser}
          isPinningActive={isPinningActive}
          onTogglePinningMode={() => setIsPinningActive(!isPinningActive)}
          onAddAnnotation={handleAddAnnotation}
          onAddReply={handleAddReply}
          onToggleUpvote={handleToggleUpvote}
          onToggleVerifyFix={handleToggleVerifyFix}
        />
      </div>

      {/* Online Grounding Schematics Drawer / Modal */}
      {isOnlineDrawerOpen && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Native Hardware Blueprint & Schematics Telemetry: {searchQuery || selectedBoard.name}
              </h3>
            </div>
            <button
              onClick={() => setIsOnlineDrawerOpen(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 px-2 py-1 rounded"
            >
              Close
            </button>
          </div>

          {isSearchingOnline ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-600 mb-3" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Compiling Native Motherboard Schematics Telemetry...
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Synthesizing power delivery networks, diode drop ranges, and pinout tables.
              </p>
            </div>
          ) : onlineBlueprintData ? (
            <div className="prose prose-slate dark:prose-invert max-w-none text-xs leading-relaxed prose-headings:font-bold prose-headings:tracking-tight prose-table:text-xs">
              <Markdown>{onlineBlueprintData}</Markdown>
            </div>
          ) : (
            <p className="text-xs text-slate-500 text-center py-6">
              No additional telemetry loaded.
            </p>
          )}
        </div>
      )}
      {/* PCB Board Number Guide Modal */}
      {showPcbHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    How to Find Your Stamped PCB Board Number
                  </h3>
                  <p className="text-xs text-slate-500">
                    Locating the exact silkscreen code stamped on your motherboard
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPcbHelpModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Samsung TVs & Displays
                </span>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Samsung TVs use separate <strong>Main Boards</strong> and <strong>Power Supply Units (PSU)</strong>:
                </p>
                <div className="space-y-1 font-mono text-[10px] bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <div>• Main Logic Board: <span className="font-bold text-amber-600 dark:text-amber-400">BN41-xxxxx</span> or sticker <span className="font-bold text-amber-600 dark:text-amber-400">BN94-xxxxx</span></div>
                  <div>• Power Board / Inverter: <span className="font-bold text-amber-600 dark:text-amber-400">BN44-xxxxx</span> (e.g. BN44-00605A / L32S1_FHS)</div>
                  <div>• T-CON Panel Board: <span className="font-bold text-amber-600 dark:text-amber-400">BN96-xxxxx</span></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  Apple MacBooks & iPhones
                </span>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Apple prints 8-digit part numbers in white ink directly on the logic board surface:
                </p>
                <div className="space-y-1 font-mono text-[10px] bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <div>• MacBook Pro: <span className="font-bold text-indigo-600 dark:text-indigo-400">820-00840</span>, <span className="font-bold text-indigo-600 dark:text-indigo-400">820-02536-A</span></div>
                  <div>• iPhone: <span className="font-bold text-indigo-600 dark:text-indigo-400">820-02536</span> / Model <span className="font-bold text-indigo-600 dark:text-indigo-400">A2894</span></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Nintendo Switch & Consoles
                </span>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Nintendo and Sony print revisions along the top edge near the APU or cartridge slot:
                </p>
                <div className="space-y-1 font-mono text-[10px] bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <div>• Nintendo Switch: <span className="font-bold text-emerald-600 dark:text-emerald-400">HAC-CPU-01</span>, <span className="font-bold text-emerald-600 dark:text-emerald-400">HAC-CPU-21</span></div>
                  <div>• PlayStation 5: <span className="font-bold text-emerald-600 dark:text-emerald-400">EDM-010</span>, <span className="font-bold text-emerald-600 dark:text-emerald-400">EDM-020</span></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  Universal LED TV Boards
                </span>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Third-party and OEM LED TVs typically use all-in-one three-in-one driver boards:
                </p>
                <div className="space-y-1 font-mono text-[10px] bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <div>• MStar / Realtek: <span className="font-bold text-purple-600 dark:text-purple-400">TP.MS3663S.PB801</span></div>
                  <div>• Universal Smart: <span className="font-bold text-purple-600 dark:text-purple-400">TP.MT5510S.PB802</span></div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowPcbHelpModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
              >
                Got It, Return to Boardview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
