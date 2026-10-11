// Coverage expansion: categories iFixit covers that the catalog was missing (home medical devices,
// music & pro audio, PC components & peripherals, networking gear, car electronics, office & retail,
// fitness, RC & hobby, EV / solar controllers, industrial drives). Anything not listed here still
// resolves through universal device pages (/device/:slug).
import type { TypeSpec } from './specTypes';

export const EXTRA_SPECS: TypeSpec[] = [
  // ---- Health & Medical (home use) ----
  {
    key: 'blood_pressure_monitor', name: 'Blood Pressure Monitor', family: 'medical_home', group: 'Health & Medical',
    brands: {
      Omron: ['M2 Basic', 'M3 Comfort', 'M6 Comfort', 'M7 Intelli IT', 'RS2 (wrist)', 'Evolv'],
      Beurer: ['BM 27', 'BM 54', 'BC 28 (wrist)'],
      Microlife: ['BP A2 Basic', 'BP B3 AFIB', 'BP W3 Comfort (wrist)'],
      Withings: ['BPM Connect', 'BPM Core'],
      Braun: ['ExactFit 3', 'iCheck 7'],
    },
  },
  {
    key: 'pulse_oximeter', name: 'Pulse Oximeter', family: 'medical_home', group: 'Health & Medical',
    brands: {
      Masimo: ['MightySat Rx', 'MightySat Fingertip'],
      Beurer: ['PO 30', 'PO 60'],
      Contec: ['CMS50D', 'CMS50E'],
      Nonin: ['Onyx Vantage 9590'],
    },
  },
  {
    key: 'cpap_machine', name: 'CPAP / BiPAP Machine', family: 'medical_home', group: 'Health & Medical',
    brands: {
      ResMed: ['AirSense 10', 'AirSense 11', 'AirMini', 'AirCurve 10'],
      Philips_Respironics: ['DreamStation', 'DreamStation 2', 'REMstar'],
      'Fisher_&_Paykel': ['SleepStyle', 'Icon+'],
      BMC: ['G3 A20', 'Luna G3'],
    },
  },
  {
    key: 'nebulizer', name: 'Nebulizer', family: 'medical_home', group: 'Health & Medical',
    brands: {
      Omron: ['NE-C28 CompAir', 'NE-C803', 'NE-U100 MicroAir'],
      Philips_Respironics: ['InnoSpire Essence', 'InnoSpire Go'],
      Beurer: ['IH 18', 'IH 21', 'IH 55'],
      PARI: ['BOY SX', 'Velox'],
    },
  },
  {
    key: 'hearing_aid', name: 'Hearing Aid', family: 'medical_home', group: 'Health & Medical',
    brands: {
      Phonak: ['Audéo Lumity', 'Audéo Paradise', 'Naída Lumity'],
      Oticon: ['Real', 'More', 'Intent'],
      Signia: ['Pure Charge&Go IX', 'Styletto'],
      ReSound: ['OMNIA', 'NEXIA'],
      Widex: ['Moment Sheer', 'SmartRIC'],
      Starkey: ['Genesis AI', 'Evolv AI'],
    },
  },
  {
    key: 'glucose_meter', name: 'Blood Glucose Meter', family: 'medical_home', group: 'Health & Medical',
    brands: {
      Accu_Chek: ['Instant', 'Guide', 'Active', 'Performa'],
      OneTouch: ['Select Plus', 'Verio Reflect', 'Ultra 2'],
      Contour: ['Plus One', 'Next One'],
      FreeStyle: ['Libre 2 reader', 'Optium Neo'],
    },
  },
  {
    key: 'electric_wheelchair', name: 'Electric Wheelchair / Mobility Scooter', family: 'micromobility', group: 'Health & Medical',
    brands: {
      Pride_Mobility: ['Jazzy Select', 'Go-Go Elite Traveller', 'Victory 10'],
      Invacare: ['TDX SP2', 'Pronto M41'],
      Drive_Medical: ['Cirrus Plus', 'Scout Compact'],
      Sunrise_Medical: ['Quickie Q500 M', 'Sterling S425'],
    },
  },

  // ---- Music & Pro Audio ----
  {
    key: 'turntable', name: 'Turntable / Record Player', family: 'audio', group: 'Music & Pro Audio',
    brands: {
      Audio_Technica: ['AT-LP60X', 'AT-LP120XUSB', 'AT-LP5X'],
      Technics: ['SL-1200MK2', 'SL-1200 MK7', 'SL-1500C'],
      Pro_Ject: ['Debut Carbon EVO', 'T1'],
      Crosley: ['Cruiser', 'C6'],
      Rega: ['Planar 1', 'Planar 3'],
    },
  },
  {
    key: 'audio_mixer', name: 'Audio Mixer / Audio Interface', family: 'audio', group: 'Music & Pro Audio',
    brands: {
      Behringer: ['Xenyx Q802USB', 'Xenyx X1204USB', 'X32', 'UMC204HD'],
      Yamaha: ['MG10XU', 'MG12XU', 'TF1'],
      Focusrite: ['Scarlett Solo', 'Scarlett 2i2', 'Scarlett 18i20'],
      Allen_and_Heath: ['ZED-10FX', 'SQ-5', 'Qu-16'],
      Soundcraft: ['Signature 12', 'Ui24R'],
      RODE: ['RODECaster Pro II'],
    },
  },
  {
    key: 'guitar_amplifier', name: 'Guitar / Bass Amplifier', family: 'audio', group: 'Music & Pro Audio',
    brands: {
      Fender: ['Champion 20', 'Mustang LT25', 'Blues Junior IV', 'Hot Rod Deluxe IV', 'Rumble 40 (bass)'],
      Marshall: ['MG15GFX', 'DSL40CR', 'JCM800 2203'],
      Boss: ['Katana-50 MkII', 'Katana-100 MkII'],
      Vox: ['AC15C1', 'AC30C2', 'Pathfinder 10'],
      Orange: ['Crush 20', 'Rocker 15'],
      Peavey: ['6505+', 'Vypyr X2'],
    },
  },
  {
    key: 'digital_piano', name: 'Digital Piano / Keyboard / Synthesizer', family: 'audio', group: 'Music & Pro Audio',
    brands: {
      Yamaha: ['P-45', 'P-125', 'PSR-E373', 'Clavinova CLP-735', 'MODX6'],
      Casio: ['CT-S300', 'Privia PX-S1100', 'CDP-S110'],
      Roland: ['FP-30X', 'RD-88', 'JUNO-DS61', 'FANTOM-06'],
      Korg: ['B2', 'Kronos', 'minilogue'],
      Nord: ['Stage 3', 'Electro 6D'],
    },
  },
  {
    key: 'dj_controller', name: 'DJ Controller / CDJ', family: 'audio', group: 'Music & Pro Audio',
    brands: {
      Pioneer_DJ: ['DDJ-400', 'DDJ-FLX4', 'DDJ-1000', 'CDJ-2000NXS2', 'CDJ-3000', 'DJM-900NXS2'],
      Numark: ['Mixtrack Pro FX', 'Party Mix II'],
      Denon_DJ: ['Prime 4', 'SC6000'],
      Native_Instruments: ['Traktor Kontrol S2 MK3', 'Traktor Kontrol S4 MK3'],
    },
  },
  {
    key: 'pa_speaker', name: 'PA Speaker / Powered Loudspeaker', family: 'audio', group: 'Music & Pro Audio',
    brands: {
      JBL: ['EON712', 'EON715', 'PRX815', 'PartyBox 310'],
      Yamaha: ['DBR10', 'DXR12'],
      'QSC': ['K12.2', 'CP8'],
      Electro_Voice: ['ZLX-12P', 'EKX-15P'],
      Mackie: ['Thump12A', 'SRM450'],
    },
  },

  // ---- Computers: components & peripherals ----
  {
    key: 'pc_power_supply', name: 'PC Power Supply (PSU)', family: 'computer', group: 'Computers & Phones',
    brands: {
      Corsair: ['CX650M', 'RM750x', 'RM850e', 'HX1000i'],
      EVGA: ['600 W1', '650 BQ', 'SuperNOVA 850 G6'],
      Seasonic: ['Focus GX-750', 'PRIME TX-1000'],
      Cooler_Master: ['MWE 650 Bronze V2', 'V850 Gold V2'],
      be_quiet: ['Pure Power 12 M 750W', 'Straight Power 12'],
      Thermaltake: ['Smart 500W', 'Toughpower GF1 750W'],
    },
  },
  {
    key: 'motherboard', name: 'PC Motherboard', family: 'computer', group: 'Computers & Phones',
    brands: {
      ASUS: ['PRIME B550M-A', 'TUF GAMING B650-PLUS', 'ROG STRIX Z790-E', 'PRIME H610M-E'],
      MSI: ['B450 TOMAHAWK MAX', 'MAG B550 TOMAHAWK', 'PRO B760M-A', 'MPG Z790 EDGE'],
      Gigabyte: ['B450M DS3H', 'B550 AORUS ELITE', 'B650 AORUS ELITE AX', 'H610M S2H'],
      ASRock: ['B450M Steel Legend', 'B550M Pro4', 'B650M Pro RS'],
    },
  },
  {
    key: 'keyboard_mouse', name: 'Keyboard & Mouse', family: 'computer', group: 'Computers & Phones',
    brands: {
      Logitech: ['MX Master 3S', 'MX Keys', 'G502 HERO', 'G Pro X Superlight', 'K380', 'G915'],
      Razer: ['DeathAdder V3', 'BlackWidow V4', 'Huntsman Mini', 'Viper V2 Pro'],
      Corsair: ['K70 RGB', 'K95 Platinum', 'Harpoon RGB'],
      Microsoft: ['Surface Keyboard', 'Sculpt Ergonomic'],
      Apple: ['Magic Keyboard', 'Magic Mouse', 'Magic Trackpad'],
      Keychron: ['K2', 'Q1', 'K8 Pro'],
    },
  },
  {
    key: 'webcam', name: 'Webcam', family: 'imaging', group: 'Computers & Phones',
    brands: {
      Logitech: ['C270', 'C920', 'C922', 'Brio 4K', 'StreamCam'],
      Razer: ['Kiyo', 'Kiyo Pro'],
      Microsoft: ['LifeCam HD-3000', 'Modern Webcam'],
      Elgato: ['Facecam', 'Facecam Pro'],
    },
  },
  {
    key: 'internal_storage', name: 'Internal SSD / Hard Drive', family: 'computer', group: 'Computers & Phones',
    brands: {
      Samsung: ['870 EVO', '980', '990 PRO', '860 EVO'],
      Western_Digital: ['Blue SN580', 'Black SN850X', 'Blue 1TB HDD (WD10EZEX)', 'Red Plus'],
      Seagate: ['Barracuda 2TB (ST2000DM008)', 'IronWolf', 'FireCuda 530'],
      Crucial: ['MX500', 'P3 Plus', 'T700'],
      Kingston: ['A400', 'NV2', 'KC3000'],
    },
  },
  {
    key: 'graphing_calculator', name: 'Calculator (Scientific / Graphing)', family: 'mobile', group: 'Office & Retail',
    brands: {
      Casio: ['fx-82ZA PLUS II', 'fx-991EX ClassWiz', 'fx-CG50'],
      Texas_Instruments: ['TI-84 Plus CE', 'TI-Nspire CX II', 'TI-30XS'],
      HP: ['Prime G2', '10bII+', '12C'],
      Sharp: ['EL-W506X', 'EL-531'],
    },
  },

  // ---- Networking ----
  {
    key: 'network_switch', name: 'Network Switch / PoE Switch', family: 'networking', group: 'Networking & Smart Home',
    brands: {
      TP_Link: ['TL-SG108', 'TL-SG1016D', 'TL-SG1005P (PoE)', 'Omada SG2210P'],
      Netgear: ['GS305', 'GS308', 'GS108PEv3 (PoE)', 'GS724T'],
      Ubiquiti: ['UniFi Switch Lite 8 PoE', 'UniFi Switch 24 PoE', 'EdgeSwitch 10X'],
      Cisco: ['CBS110-8T', 'CBS250-24P', 'Catalyst 2960'],
      MikroTik: ['CSS610-8G-2S+', 'CRS326-24G-2S+'],
      D_Link: ['DGS-108', 'DGS-1100-08P'],
    },
  },
  {
    key: 'nas_storage', name: 'NAS (Network Storage)', family: 'networking', group: 'Networking & Smart Home',
    brands: {
      Synology: ['DS223j', 'DS224+', 'DS923+', 'DS1522+'],
      QNAP: ['TS-233', 'TS-464', 'TS-873A'],
      Western_Digital: ['My Cloud EX2 Ultra', 'My Cloud Home'],
      Asustor: ['Drivestor 2 AS1102T', 'Lockerstor 4 AS6604T'],
    },
  },
  {
    key: 'fibre_ont', name: 'Fibre ONT / LTE & 5G Router', family: 'networking', group: 'Networking & Smart Home',
    brands: {
      Huawei: ['EchoLife HG8245H', 'EchoLife HG8145V5', 'B535 (LTE)', 'H122 5G CPE Pro'],
      ZTE: ['F670L', 'F660', 'MF286R (LTE)', 'MC888 (5G)'],
      Nokia: ['G-140W-C', 'G-240W-B'],
      Tenda: ['4G180', 'HG9'],
    },
  },

  // ---- Mobility & Automotive ----
  {
    key: 'car_amplifier', name: 'Car Audio Amplifier / Subwoofer', family: 'audio', group: 'Mobility & Automotive',
    brands: {
      JL_Audio: ['JX500/1D', 'RD400/4', '10W3v3 (sub)'],
      Rockford_Fosgate: ['Prime R500X1D', 'Punch P400X4'],
      Pioneer: ['GM-D8701', 'GM-A6704', 'TS-WX130DA (sub)'],
      Kenwood: ['KAC-M3004', 'KAC-PS702EX'],
      Kicker: ['CXA400.1', 'KEY200.1'],
      Sony: ['XM-N1004', 'XS-AW8 (sub)'],
    },
  },
  {
    key: 'reversing_camera', name: 'Reversing Camera / Parking Sensors', family: 'automotive', group: 'Mobility & Automotive',
    brands: {
      Garmin: ['BC 50', 'BC 40'],
      Pioneer: ['ND-BC8'],
      Kenwood: ['CMOS-130'],
      Auto_Vox: ['AD2', 'CS-2'],
      Universal: ['Ultrasonic parking sensor kit (4-sensor)'],
    },
  },
  {
    key: 'car_alarm', name: 'Car Alarm / Immobiliser / Tracker', family: 'automotive', group: 'Mobility & Automotive',
    brands: {
      Viper: ['3105V', '5706V'],
      Compustar: ['CS7900-AS', 'PRO T13'],
      Gemini: ['Gemini 7000 series', 'Gemini 7900 series'],
      Cartrack: ['Cartrack tracker (unit)'],
      Netstar: ['Netstar tracking unit'],
    },
  },
  {
    key: 'obd_scanner', name: 'OBD2 Scanner / Diagnostic Tool', family: 'automotive', group: 'Mobility & Automotive',
    brands: {
      Autel: ['AutoLink AL319', 'MaxiCOM MK808', 'MaxiSys MS906 Pro'],
      LAUNCH: ['CRP129E', 'X431 PRO'],
      Foxwell: ['NT301', 'NT530'],
      Vgate: ['iCar Pro BLE', 'vLinker MC+'],
      ELM327: ['ELM327 Bluetooth / Wi-Fi adapter'],
    },
  },
  {
    key: 'ev_charger', name: 'EV Charger / Wallbox', family: 'power_backup', group: 'Mobility & Automotive',
    brands: {
      Tesla: ['Wall Connector Gen 3', 'Mobile Connector'],
      Wallbox: ['Pulsar Plus', 'Commander 2'],
      ABB: ['Terra AC wallbox'],
      Zappi: ['myenergi zappi v2'],
      Schneider_Electric: ['EVlink Home', 'EVlink Pro AC'],
    },
  },

  // ---- Power & industrial ----
  {
    key: 'solar_charge_controller', name: 'Solar Charge Controller (MPPT / PWM)', family: 'power_backup', group: 'Power & Backup',
    brands: {
      Victron_Energy: ['SmartSolar MPPT 75/15', 'SmartSolar MPPT 100/30', 'SmartSolar MPPT 150/35', 'BlueSolar MPPT 100/20'],
      EPEVER: ['Tracer 4210AN', 'XTRA 3210N', 'Tracer 6415AN'],
      Renogy: ['Rover 40A', 'Wanderer 30A (PWM)'],
      Morningstar: ['ProStar MPPT', 'TriStar MPPT 60'],
    },
  },
  {
    key: 'vfd_drive', name: 'Variable Frequency Drive (VFD) / Motor Controller', family: 'workshop_power', group: 'Tools & Workshop',
    brands: {
      ABB: ['ACS150', 'ACS355', 'ACS580'],
      Schneider_Electric: ['Altivar ATV12', 'Altivar ATV320'],
      Siemens: ['SINAMICS V20', 'SINAMICS G120'],
      Delta: ['VFD-M', 'VFD-E', 'MS300'],
      Mitsubishi_Electric: ['FR-D700', 'FR-E800'],
      Huanyang: ['HY01D523B (spindle)'],
    },
  },
  {
    key: 'bench_power_supply', name: 'Bench Power Supply', family: 'test_equipment', group: 'Tools & Workshop',
    brands: {
      Korad: ['KA3005D', 'KA3005P'],
      Rigol: ['DP832', 'DP711'],
      Siglent: ['SPD3303X-E'],
      RIDEN: ['RD6006', 'RD6018'],
      Wanptek: ['NPS3010W'],
    },
  },

  // ---- Office & Retail ----
  {
    key: 'paper_shredder', name: 'Paper Shredder', family: 'motor_kitchen', group: 'Office & Retail',
    brands: {
      Fellowes: ['Powershred 8Cd', 'Powershred 79Ci', 'AutoMax 150C'],
      Rexel: ['Momentum X410', 'Optimum AutoFeed+ 150X'],
      AmazonBasics: ['8-Sheet Cross-Cut', '12-Sheet Micro-Cut'],
      HSM: ['Securio B22', 'Shredstar X10'],
    },
  },
  {
    key: 'label_receipt_printer', name: 'Label / Receipt (POS) Printer', family: 'printing', group: 'Office & Retail',
    brands: {
      Zebra: ['ZD220', 'ZD421', 'GK420d', 'ZT411'],
      Brother: ['QL-800', 'QL-820NWB', 'PT-P710BT'],
      Epson: ['TM-T20III', 'TM-T88VI', 'TM-m30III'],
      DYMO: ['LabelWriter 450', 'LabelWriter 550'],
      Xprinter: ['XP-58IIH', 'XP-365B'],
    },
  },
  {
    key: 'card_terminal', name: 'Card Machine / POS Terminal', family: 'mobile', group: 'Office & Retail',
    brands: {
      Ingenico: ['Move/5000', 'Desk/3500', 'iWL250'],
      Verifone: ['V200c', 'V400m', 'VX520'],
      PAX: ['A920', 'S920', 'D210'],
      Yoco: ['Khumo', 'Neo Touch'],
      SumUp: ['Air', 'Solo'],
    },
  },

  // ---- Fitness ----
  {
    key: 'treadmill', name: 'Treadmill / Exercise Bike', family: 'power_tools', group: 'Fitness',
    brands: {
      NordicTrack: ['Commercial 1750', 'T 6.5 S', 'S22i (bike)'],
      ProForm: ['Pro 2000', 'Carbon TLX'],
      Peloton: ['Bike', 'Bike+', 'Tread'],
      Trojan: ['Thunder 300', 'Cardio 450'],
      Life_Fitness: ['T3', 'Integrity Series'],
    },
  },
  {
    key: 'massage_gun', name: 'Massage Gun / Massager', family: 'personal_care', group: 'Fitness',
    brands: {
      Theragun: ['Prime', 'Mini', 'Pro (5th gen)'],
      Hyperice: ['Hypervolt 2', 'Hypervolt Go 2'],
      Renpho: ['R3 Mini', 'Active'],
      Beurer: ['MG 99', 'MG 180'],
    },
  },

  // ---- RC & hobby ----
  {
    key: 'rc_vehicle', name: 'RC Car / Plane / Boat', family: 'drone', group: 'Home & Hobby',
    brands: {
      Traxxas: ['Slash 2WD', 'Maxx 4S', 'X-Maxx', 'TRX-4'],
      Arrma: ['Granite 4x4 3S', 'Kraton 6S', 'Typhon 3S'],
      Losi: ['Mini-T 2.0', 'LMT'],
      HPI: ['Savage XL', 'Venture'],
      E_flite: ['UMX Timber', 'Apprentice STS'],
      WLtoys: ['144001', '124019'],
    },
  },
  {
    key: 'metal_detector', name: 'Metal Detector', family: 'test_equipment', group: 'Home & Hobby',
    brands: {
      Minelab: ['Vanquish 340', 'Equinox 800', 'GPZ 7000'],
      Garrett: ['ACE 300', 'AT Pro', 'Pro-Pointer AT'],
      Nokta_Makro: ['Simplex+', 'Legend'],
      Fisher: ['F22', 'F44'],
    },
  },
  {
    key: 'tv_remote', name: 'Remote Control (TV / Aircon / Gate)', family: 'media', group: 'TV & Audio',
    brands: {
      Samsung: ['BN59 series TV remote', 'SolarCell remote'],
      LG: ['Magic Remote AN-MR', 'AKB series remote'],
      Sony: ['RMF-TX series voice remote'],
      Hisense: ['EN2 series remote'],
      Universal: ['Universal TV remote', 'Air-conditioner universal remote', 'Gate remote (433 MHz)'],
    },
  },
];
