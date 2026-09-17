export interface DeviceSize {
  id: string;
  name: string;
  commonIssues: string[];
  diagnosticSteps: string[];
  requiredTools: string[];
  commonParts: string[];
  repairSummary: string;
}

export interface DeviceBrand {
  id: string;
  name: string;
  sizes: DeviceSize[];
}

export interface DeviceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  brands: DeviceBrand[];
}

export const DEVICE_CATALOG: DeviceCategory[] = [
  {
    id: 'kitchen_appliances',
    name: 'Kitchen Appliances (Food Prep & Cooking)',
    description: 'Refrigerators, Freezers, Microwaves, Air Fryers, Coffee Makers, Blenders & Dishwashers',
    icon: 'Tv',
    brands: [
      {
        id: 'samsung',
        name: 'Samsung',
        sizes: [
          {
            id: 'fridge',
            name: 'Refrigerator / Frost Free French Door & Wine Cooler',
            commonIssues: ['Ice buildup on evaporator coils', 'Warm fridge compartment', 'Defrost thermostat failure'],
            diagnosticSteps: ['Check defrost bimetal continuity in ice mode', 'Test defrost heater resistance (approx 30-50 ohms)', 'Inspect control board relay output'],
            requiredTools: ['Multimeter', 'Hair Dryer', 'Nut Driver'],
            commonParts: ['Defrost Bimetal Thermostat', 'Defrost Heater Tube', 'Evaporator Fan Motor'],
            repairSummary: 'Clear evaporator ice blockage, replace faulty defrost bimetal sensor and blown thermal fuse.'
          },
          {
            id: 'microwave',
            name: 'Countertop Microwave Oven & Toaster Oven',
            commonIssues: ['Fuses blowing when door opens', 'No heat / Magnetron failure', 'Turntable motor dead'],
            diagnosticSteps: ['Test primary, secondary, and monitor door interlock switches', 'Measure high voltage diode and capacitor', 'Check magnetron filament continuity'],
            requiredTools: ['Multimeter (HV Safe)', 'Insulated Screwdriver'],
            commonParts: ['Ceramic Fuse 20A', 'High Voltage Diode', 'Turntable Motor 21V'],
            repairSummary: 'Replace misaligned door switches and blown input fuse. Verify high-voltage capacitor safety.'
          },
          {
            id: 'air_fryer',
            name: 'Air Fryer / Deep Fryer & Electric Grill',
            commonIssues: ['Thermal fuse open / No power', 'Fan motor seized', 'Heating element failure'],
            diagnosticSteps: ['Test thermal cutoff fuse continuity', 'Check heating element coil resistance', 'Inspect control PCB relay'],
            requiredTools: ['Multimeter', 'Soldering Iron'],
            commonParts: ['Thermal Fuse 192C', 'Heating Coil 1500W', 'PCB Control Board'],
            repairSummary: 'Replace blown thermal safety cutoff fuse and clean grease buildup from fan motor bearings.'
          }
        ]
      },
      {
        id: 'ninja',
        name: 'Ninja / Shark',
        sizes: [
          {
            id: 'blender',
            name: 'High-Power Blender & Food Processor / Juicer',
            commonIssues: ['Blade assembly bearing seized', 'Error code E01 / Interlock switch failure', 'Motor burning smell'],
            diagnosticSteps: ['Check jar base clutch gear wear', 'Test lid safety microswitch continuity', 'Inspect motor armature and carbon brushes'],
            requiredTools: ['Multimeter', 'Hex Wrench'],
            commonParts: ['Blade Assembly Bearing', 'Drive Socket Clutch', 'Motor Carbon Brushes'],
            repairSummary: 'Replace worn drive socket clutch and seized blade bearing assembly.'
          },
          {
            id: 'coffee_maker',
            name: 'Coffee Maker & Espresso Machine',
            commonIssues: ['Scale blockage / Low water flow', 'Thermoblock heating failure', 'Pump not priming'],
            diagnosticSteps: ['Descale boiler and water lines with citric acid solution', 'Test thermoblock resistance', 'Check water pump solenoid'],
            requiredTools: ['Multimeter', 'Descaling Solution'],
            commonParts: ['Ulka Water Pump EAX5', 'Thermoblock Heating Element', 'Flow Meter'],
            repairSummary: 'Descale internal water circuits and replace clogged Ulka electromagnetic water pump.'
          }
        ]
      },
      {
        id: 'delonghi',
        name: 'DeLonghi',
        sizes: [
          {
            id: 'espresso',
            name: 'Automatic Espresso Machine',
            commonIssues: ['Infuser mechanism jammed', 'Bean grinder blocked with oily beans', 'No steam pressure'],
            diagnosticSteps: ['Clean and lubricate brewing infuser tracks with food-grade silicone grease', 'Test steam valve microswitch', 'Check boiler NTC sensor'],
            requiredTools: ['Multimeter', 'Silicone Grease', 'Torx T10'],
            commonParts: ['Brewing Unit Infuser', 'NTC Temperature Sensor', 'Steam Solenoid Valve'],
            repairSummary: 'Clean jammed brewing unit mechanism, lubricate drive screw, and replace scale-clogged flow meter.'
          }
        ]
      },
      {
        id: 'instant_pot',
        name: 'Instant Brand',
        sizes: [
          {
            id: 'pressure_cooker',
            name: 'Electric Pressure Cooker / Slow Cooker / Rice Cooker',
            commonIssues: ['C6L / Lid sensor error', 'Does not pressurize / Steam leaking', 'No power display'],
            diagnosticSteps: ['Check silicone sealing ring for tears or warping', 'Test bottom heating plate thermal fuse and sensor', 'Inspect main power board varistor'],
            requiredTools: ['Multimeter', 'Screwdriver'],
            commonParts: ['Silicone Sealing Ring', 'Thermal Fuse 184C', 'Pressure Sensor Switch'],
            repairSummary: 'Replace warped silicone sealing ring and clean float valve gasket. Replace blown thermal fuse if dead.'
          }
        ]
      },
      {
        id: 'kitchenaid',
        name: 'KitchenAid',
        sizes: [
          {
            id: 'stand_mixer',
            name: 'Stand Mixer, Hand Mixer & Waffle Maker',
            commonIssues: ['Speed control board failure', 'Planetary gear grease dried out / leaking', 'Motor not turning on'],
            diagnosticSteps: ['Inspect phase control board and speed potentiometer', 'Check carbon brushes and armature commutator', 'Regrease internal planetary gearbox with food-safe grease'],
            requiredTools: ['Multimeter', 'Food-Grade Grease', 'Punch Tool'],
            commonParts: ['Speed Control Board', 'Planetary Gear', 'Carbon Brush Set'],
            repairSummary: 'Regrease internal gearbox and replace worn phase speed control board.'
          }
        ]
      },
      {
        id: 'breville',
        name: 'Breville',
        sizes: [
          {
            id: 'toaster_oven',
            name: 'Smart Oven, Toaster Oven & Electric Kettle',
            commonIssues: ['Display screen flickering', 'Thermal cutoff tripping', 'Heating element open circuit'],
            diagnosticSteps: ['Check quartz heating tube continuity', 'Test internal power supply capacitors', 'Inspect door limit switch'],
            requiredTools: ['Multimeter', 'Soldering Iron'],
            commonParts: ['Quartz Heating Element', 'Thermal Cutoff Fuse', 'Rotary Encoder Switch'],
            repairSummary: 'Replace blown quartz heating element and reset microcontroller board.'
          }
        ]
      },
      {
        id: 'universal_kitchen',
        name: 'Universal Kitchen Appliances (Dishwasher, Ice Maker, Garbage Disposal, Water Dispenser)',
        sizes: [
          {
            id: 'dishwasher',
            name: 'Built-in Dishwasher & Garbage Disposal',
            commonIssues: ['HE / Water heating failure', 'OE / Drainage blockage', 'LE / Circulation pump stuck', 'Disposal jammed with bone/metal'],
            diagnosticSteps: ['Test circulation pump motor winding resistance', 'Check water inlet valve screen for debris', 'Test disposal reset button and unjam flywheel with wrench'],
            requiredTools: ['Multimeter', 'Pliers', 'Hex Wrench'],
            commonParts: ['Circulation Pump Motor', 'Water Inlet Valve', 'Disposal Reset Switch'],
            repairSummary: 'Clear pump impeller debris, reset garbage disposal overload button, and replace faulty heating assembly.'
          }
        ]
      }
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment & Living Room',
    description: 'Televisions, Radios, Soundbars, Home Theater, Game Consoles, Projectors, Turntables',
    icon: 'Tv',
    brands: [
      {
        id: 'tv_premium_global',
        name: 'Samsung / LG / Sony / Panasonic / Philips / Sharp / Toshiba / Bang & Olufsen / Loewe / Metz',
        sizes: [
          {
            id: 'flat_tv_led_oled',
            name: 'Premium Flat TV (OLED / QLED / LED)',
            commonIssues: ['OLED burn-in / image retention', 'No backlight (LED) / Screen blank', 'Main board boot loop / Red light blinking'],
            diagnosticSteps: ['Check power supply standby voltages (3.3V/5V)', 'Test LED backlight voltages and individual strips', 'Perform factory reset sequence via remote'],
            requiredTools: ['Multimeter', 'LED Tester', 'Suction Cups'],
            commonParts: ['Power Supply Board', 'Main Board', 'LED Backlight Strips', 'T-Con Board'],
            repairSummary: 'Diagnose blink codes. Replace burnt LED strips or swap failing power/main boards.'
          },
          {
            id: 'crt_legacy',
            name: 'Legacy CRT (Box) TV',
            commonIssues: ['No power / High-pitched whine', 'Horizontal or vertical line', 'Color purity issues'],
            diagnosticSteps: ['Test B+ voltage', 'Check HOT (Horizontal Output Transistor)', 'Inspect flyback transformer for cracks'],
            requiredTools: ['Multimeter', 'High Voltage Probe', 'Soldering Iron'],
            commonParts: ['HOT (Horizontal Output Transistor)', 'Flyback Transformer', 'Electrolytic Capacitors'],
            repairSummary: 'Replace shorted HOT and swollen capacitors. Adjust focus/screen pots on flyback.'
          }
        ]
      },
      {
        id: 'tv_mainstream_smart',
        name: 'TCL / Hisense / Xiaomi / Vizio / Skyworth / Haier / Realme / OnePlus / Huawei / Honor / Changhong / Konka',
        sizes: [
          {
            id: 'flat_tv_smart',
            name: 'Smart TV (LED / LCD)',
            commonIssues: ['Stuck on logo screen', 'Sound but no picture (Black screen)', 'Wi-Fi/Bluetooth module failure'],
            diagnosticSteps: ['Flash firmware via USB', 'Test LED driver output voltage', 'Check Wi-Fi module voltage and continuity'],
            requiredTools: ['Multimeter', 'USB Flash Drive', 'LED Tester'],
            commonParts: ['Main Board (Combo Board)', 'LED Backlight Strips', 'Wi-Fi Module'],
            repairSummary: 'Reflash firmware for boot loops. Replace failed LED strips for "no picture, has sound" symptom.'
          }
        ]
      },
      {
        id: 'tv_budget_oem',
        name: 'Harwa / Ecco / Sinotec / Insignia / RCA / Westinghouse / Sceptre / Element / Kogan / Bush / Alba / Logik / Cello / Sanyo / Funai / Sansui / Nokia / Motorola / Blaupunkt / Grundig / Vestel / Beko / Videocon / Onida / Micromax / Vu / Lloyd / Walton / Generic TV',
        sizes: [
          {
            id: 'flat_tv_budget',
            name: 'Budget / OEM Flat TV',
            commonIssues: ['Standby light on but won\'t turn on', 'Dim or dark spots on screen', 'Inputs (HDMI) not working'],
            diagnosticSteps: ['Inspect main board for visibly swollen capacitors', 'Test backlight LEDs for open circuit', 'Check HDMI port pins for damage'],
            requiredTools: ['Multimeter', 'Soldering Iron', 'LED Tester'],
            commonParts: ['Combo Main/Power Board', 'LED Strips', 'EEPROM Chip'],
            repairSummary: 'Replace combo power/main board or reprogram EEPROM. Replace burnt LED diodes or strips.'
          },
          {
            id: 'crt_box_tv',
            name: 'CRT (Box) TV',
            commonIssues: ['No power / Tick-tick sound', 'Horizontal line on screen', 'Color distortion / purity issues'],
            diagnosticSteps: ['Check HOT (Horizontal Output Transistor) for short', 'Test B+ voltage from power supply', 'Inspect vertical deflection IC and replace nearby capacitors'],
            requiredTools: ['Multimeter', 'Soldering Iron', 'ESR Meter', 'High Voltage Probe'],
            commonParts: ['HOT (Horizontal Output Transistor)', 'Vertical Deflection IC', 'Flyback Transformer (FBT)', 'Electrolytic Capacitors'],
            repairSummary: 'Replace shorted HOT and check flyback transformer. If horizontal line appears, replace vertical IC and swollen capacitors.'
          }
        ]
      },
      {
        id: 'tv_historic_legacy',
        name: 'Zenith / Magnavox / Philco / Emerson / Pioneer / Hitachi / Mitsubishi / Aiwa / Akai / Admiral / Telefunken',
        sizes: [
          {
            id: 'plasma_projection',
            name: 'Plasma / Rear Projection TV',
            commonIssues: ['Plasma: Clicking noise, won\'t turn on', 'Projection: Dim or no picture', 'Plasma: Sparkles/Maldischarge on screen'],
            diagnosticSteps: ['Plasma: Check Vs/Va voltages and test Y-Sustain/Z-Sustain boards for shorts', 'Projection: Check lamp condition and ballast', 'Projection: Inspect DLP color wheel'],
            requiredTools: ['Multimeter', 'Oscilloscope (Plasma)', 'Screwdriver Set'],
            commonParts: ['Plasma Y-Sustain/X-Main Boards', 'Projection Lamp/Bulb', 'DMD Chip (DLP)'],
            repairSummary: 'Replace blown Y-Sustain board or shorted buffer boards (Plasma). Replace burnt lamp or ballast (Projection).'
          },
          {
            id: 'legacy_crt_historic',
            name: 'Classic CRT (Box) TV',
            commonIssues: ['Dead / Blown fuse', 'Collapsing picture', 'No audio'],
            diagnosticSteps: ['Check primary power supply fuse and bridge rectifier', 'Inspect vertical deflection circuit', 'Test audio IC voltages'],
            requiredTools: ['Multimeter', 'Soldering Iron'],
            commonParts: ['Fuses', 'Voltage Regulators', 'Capacitors'],
            repairSummary: 'Replace blown fuses and rebuild power supply. Reflow cracked solder joints.'
          }
        ]
      },
      {
        id: 'sony',
        name: 'Sony',
        sizes: [
          {
            id: 'playstation',
            name: 'PlayStation Console (PS4 / PS5) & Blu-ray / CD Player',
            commonIssues: ['HDMI port bent pins / No signal', 'APU overheating / Loud fan noise', 'Power supply sudden shutdown'],
            diagnosticSteps: ['Inspect HDMI encoder IC for short circuits', 'Clean liquid metal / thermal paste application on APU', 'Test PSU 12V output rails under load'],
            requiredTools: ['Hot Air Rework Station', 'Stereo Microscope', 'Multimeter'],
            commonParts: ['HDMI Retimer IC', 'HDMI Port Connector', 'Thermal Pad'],
            repairSummary: 'Replace damaged HDMI port and blown HDMI encoder/retimer IC. Reapply thermal paste.'
          },
          {
            id: 'soundbar',
            name: 'Soundbar, Home Theater & Radio Receiver',
            commonIssues: ['Subwoofer pairing loss', 'Optical input no sound', 'Bluetooth disconnects'],
            diagnosticSteps: ['Check wireless module pairing button and antenna', 'Test digital audio receiver optical transceiver', 'Inspect power amplifier IC rails'],
            requiredTools: ['Multimeter', 'Soldering Iron'],
            commonParts: ['Bluetooth RF Module', 'Optical Receiver TOSLINK', 'Class-D Audio Amp IC'],
            repairSummary: 'Re-pair subwoofer module or replace faulty optical receiver audio port.'
          }
        ]
      },
      {
        id: 'microsoft',
        name: 'Microsoft',
        sizes: [
          {
            id: 'xbox',
            name: 'Xbox Console (One / Series X / S)',
            commonIssues: ['E100 / E200 update error', 'No power / MOSFET short on 12V rail', 'Disc drive laser failure'],
            diagnosticSteps: ['Check 12V MOSFET transistors around southbridge', 'Test internal SSD / NVMe health', 'Inspect power supply unit fuse'],
            requiredTools: ['Multimeter', 'NVMe Reader', 'Soldering Iron'],
            commonParts: ['MOSFET AO4407', 'Internal NVMe SSD', 'Power Supply Board'],
            repairSummary: 'Replace shorted power MOSFET transistors and reflash system storage drive.'
          }
        ]
      },
      {
        id: 'nintendo',
        name: 'Nintendo',
        sizes: [
          {
            id: 'switch',
            name: 'Nintendo Switch Console / OLED / Lite',
            commonIssues: ['Charging chip M92T36 / P13USB shorted', 'Joy-Con stick drift', 'No display / Backlight fuse blown'],
            diagnosticSteps: ['Check diode mode on M92T36 USB-C power delivery IC', 'Test backlight boost coil and fuse', 'Replace analog joystick potentiometer modules'],
            requiredTools: ['Microscope', 'Micro-Soldering Iron', 'Hot Air Station'],
            commonParts: ['M92T36 Power IC', 'P13USB Video IC', 'Joy-Con Analog Joystick Module'],
            repairSummary: 'Replace shorted M92T36 / P13USB charging controller ICs under microscope.'
          }
        ]
      },
      {
        id: 'jbl',
        name: 'JBL / Harman',
        sizes: [
          {
            id: 'smart_speaker',
            name: 'Smart Speaker, Streaming Device & Karaoke Machine',
            commonIssues: ['Battery won’t hold charge', 'Charging port USB-C loose or melted', 'Distorted bass / Blown speaker driver'],
            diagnosticSteps: ['Test battery pack voltage and cell internal resistance', 'Inspect USB-C port solder pads for lifting', 'Check passive radiator and speaker driver cone surround'],
            requiredTools: ['Multimeter', 'Soldering Iron', 'Hot Air Gun'],
            commonParts: ['Li-Ion Battery Pack 7.4V', 'USB-C Port Connector', 'Class-D Audio Amplifier'],
            repairSummary: 'Replace degraded Li-Ion battery pack and reinforce USB-C charging port housing.'
          }
        ]
      },
      {
        id: 'universal_entertainment',
        name: 'Universal Entertainment (Projector, Turntable, CD Player)',
        sizes: [
          {
            id: 'projector',
            name: 'Digital LED / Laser Projector & DVD Player',
            commonIssues: ['DMD chip white dots / Dead mirrors', 'Lamp / LED overheating error', 'Color wheel spinning noise'],
            diagnosticSteps: ['Inspect DMD micro-mirror chip for stuck pixels', 'Check blower fan RPM sensor wire', 'Clean optical lens and polarized glass filters'],
            requiredTools: ['Precision Screwdriver', 'Compressed Air'],
            commonParts: ['DMD Chip 1080p', 'Blower Fan 12V', 'Color Wheel RGBRGB'],
            repairSummary: 'Replace faulty DMD mirror chip and clean cooling airflow ducts.'
          }
        ]
      }
    ]
  },
  {
    id: 'climate_control',
    name: 'Climate Control & Air Quality',
    description: 'Ceiling Fans, Desk Fans, Tower Fans, Air Conditioners, Space Heaters, Humidifiers & Purifiers',
    icon: 'Wrench',
    brands: [
      {
        id: 'lg_carrier',
        name: 'LG / Carrier / Daikin',
        sizes: [
          {
            id: 'ac_unit',
            name: 'Split Air Conditioner Inverter System & Ceiling Fan',
            commonIssues: ['CH05 / Communication error', 'Compressor not starting / Capacitor blown', 'Water leaking indoor unit drain', 'Ceiling fan humming / Capacitor dead'],
            diagnosticSteps: ['Test outdoor dual run capacitor microfarads (uF)', 'Check inverter compressor winding resistance and insulation', 'Clear blocked indoor condensation drain tube'],
            requiredTools: ['Multimeter with Capacitance mode', 'Manifold Pressure Gauges'],
            commonParts: ['Dual Run Capacitor 35/5 uF', 'Inverter IPM Power Board', 'Ceiling Fan Capacitor CBB61'],
            repairSummary: 'Replace failed outdoor/ceiling fan capacitor, clean condenser coils, and clear condensation drain clog.'
          }
        ]
      },
      {
        id: 'dyson',
        name: 'Dyson',
        sizes: [
          {
            id: 'purifier_fan',
            name: 'Air Purifier, Tower Fan & Desk Fan',
            commonIssues: ['F2 / F1 Filter error', 'Motor bearing squeak', 'Oscillation motor gear broken'],
            diagnosticSteps: ['Reset HEPA filter RFID chip / counter', 'Inspect brushless DC motor driver PCB', 'Clean dust buildup from annular air amplifier loop'],
            requiredTools: ['Torx T8 Screwdriver', 'Multimeter'],
            commonParts: ['Genuine HEPA Carbon Filter', 'Oscillation Gearbox Motor', 'BLDC Motor Controller'],
            repairSummary: 'Replace clogged HEPA filter and reset lifespan counter. Replace broken oscillation motor.'
          }
        ]
      },
      {
        id: 'honeywell',
        name: 'Honeywell / DeLonghi',
        sizes: [
          {
            id: 'dehumidifier',
            name: 'Dehumidifier, Humidifier, Electric Blanket & Thermostat',
            commonIssues: ['Bucket full sensor stuck', 'Compressor running but no water extraction', 'Electric blanket controller error E3'],
            diagnosticSteps: ['Test float switch continuity', 'Check refrigerant pressures for leak', 'Test electric blanket connector continuity'],
            requiredTools: ['Multimeter', 'Pressure Gauge'],
            commonParts: ['Float Switch Sensor', 'Humidity Sensor RH', 'Blanket Controller Unit'],
            repairSummary: 'Clean calcium buildup from float switch bucket sensor and replace faulty blanket control unit.'
          }
        ]
      }
    ]
  },
  {
    id: 'laundry_cleaning',
    name: 'Laundry & Cleaning',
    description: 'Washing Machines, Clothes Dryers, Vacuum Cleaners, Robot Vacuums, Steam Mops & Irons',
    icon: 'Wrench',
    brands: [
      {
        id: 'samsung_lg_laundry',
        name: 'Samsung / LG / Whirlpool',
        sizes: [
          {
            id: 'washing_machine',
            name: 'Front / Top Load Washing Machine & Clothes Dryer',
            commonIssues: ['OE / Drainage error', 'LE / Motor locked', 'HE / Water heating failure', 'Dryer runs but no heat'],
            diagnosticSteps: ['Check drain pump filter for coins and lint', 'Test heating element resistance (~25 ohms)', 'Test dryer thermal cutoff fuses'],
            requiredTools: ['Multimeter', 'Pliers', 'Torx T20'],
            commonParts: ['Drain Pump Motor', 'Heating Element 2000W', 'Dryer Thermal Fuse Kit'],
            repairSummary: 'Clean coin trap filter, replace calcified heating element and blown dryer thermal fuses.'
          }
        ]
      },
      {
        id: 'dyson_vacuum',
        name: 'Dyson / Shark / iRobot / Bissell',
        sizes: [
          {
            id: 'cordless_vacuum',
            name: 'Vacuum Cleaner, Robot Vacuum, Steam Mop & Carpet Cleaner',
            commonIssues: ['Battery dies in 30 seconds', 'Brush bar roller jammed with hair', 'Steam mop pump clogged with scale'],
            diagnosticSteps: ['Test battery pack cell voltage under load', 'Inspect motor head brush bar drive belt and gears', 'Descale steam mop heating chamber with vinegar'],
            requiredTools: ['Multimeter', 'Phillips Screwdriver', 'Citric Acid'],
            commonParts: ['Replacement Battery 21.6V', 'Motorhead Brush Roll', 'Steam Pump Solenoid'],
            repairSummary: 'Rebuild or replace degraded battery pack, clean brush bar, and descale steam mop pump.'
          }
        ]
      },
      {
        id: 'iron_steamer',
        name: 'Philips / Rowenta',
        sizes: [
          {
            id: 'clothes_iron',
            name: 'Clothes Iron, Garment Steamer, Lint Remover & Electric Broom',
            commonIssues: ['Soleplate not heating', 'Calcium scale clogging steam vents', 'Lint remover motor blades dull'],
            diagnosticSteps: ['Test thermostat dial switch and thermal fuse', 'Descale soleplate steam chambers with vinegar', 'Check lint shaver battery & motor'],
            requiredTools: ['Multimeter', 'Citric Acid Solution'],
            commonParts: ['Thermal Fuse 240C', 'Thermostat Switch', 'Lint Shaver Blade Head'],
            repairSummary: 'Descale mineral deposits from steam chambers and replace blown thermal safety fuse.'
          }
        ]
      }
    ]
  },
  {
    id: 'personal_care',
    name: 'Personal Care & Grooming',
    description: 'Hair Dryers, Straighteners, Curling Irons, Shavers, Trimmers, Toothbrushes & Foot Spas',
    icon: 'Smartphone',
    brands: [
      {
        id: 'dyson_hair',
        name: 'Dyson / BaByliss / Philips',
        sizes: [
          {
            id: 'hair_dryer',
            name: 'Hair Dryer, Hair Straightener, Curling Iron & Heating Pad',
            commonIssues: ['Filter cage flashing white/red light', 'Heating element burning smell / No heat', 'Straightener plates not heating'],
            diagnosticSteps: ['Clean magnetic filter cage and inlet mesh', 'Test heater thermostat switch', 'Check straightener ceramic plate heating resistor continuity'],
            requiredTools: ['Multimeter', 'Precision Torx Set'],
            commonParts: ['Heating Element Assembly', 'Thermal Cutoff Fuse', 'Thermostat Switch'],
            repairSummary: 'Clean inlet filter mesh, replace blown thermal fuse, and resolder heating plate wire connections.'
          }
        ]
      },
      {
        id: 'philips_grooming',
        name: 'Philips / Braun / Oral-B',
        sizes: [
          {
            id: 'shaver_trimmer',
            name: 'Electric Shaver, Beard Trimmer, Electric Toothbrush, Water Flosser & Epilator',
            commonIssues: ['Battery not holding charge', 'Dull cutting blades pulling hair', 'Water flosser pump pressure weak'],
            diagnosticSteps: ['Test NiMH or Li-Ion internal rechargeable battery voltage', 'Clean cutting head with oil and brush', 'Inspect water flosser pump valves for calcification'],
            requiredTools: ['Multimeter', 'Soldering Iron', 'Lubricating Oil'],
            commonParts: ['Rechargeable Battery Cell', 'Foil and Cutter Block', 'Water Flosser Pump Valve'],
            repairSummary: 'Replace worn rechargeable battery cell and clean/descale water flosser pump valves.'
          }
        ]
      }
    ]
  },
  {
    id: 'home_office',
    name: 'Home Office & Computers',
    description: 'Desktop Computers, Laptops, Monitors, Printers, Scanners, Routers, Modems, UPS, Shredders, Tablets',
    icon: 'Smartphone',
    brands: [
      {
        id: 'hp_epson',
        name: 'HP / Epson / Canon / Brother',
        sizes: [
          {
            id: 'printer',
            name: 'Inkjet & Laser Printer, Scanner & Paper Shredder',
            commonIssues: ['Paper jam error / Pickup roller worn', 'Printhead nozzles clogged / Missing colors', 'Shredder jammed with paper'],
            diagnosticSteps: ['Clean pickup rollers with rubber rejuvenator', 'Run printhead cleaning utility', 'Check shredder optical bin sensor'],
            requiredTools: ['Lint-Free Swabs', 'Cleaning Fluid', 'Multimeter'],
            commonParts: ['Paper Pickup Roller', 'Printhead Assembly', 'Shredder Gear Set'],
            repairSummary: 'Clean pickup rollers, unclog printhead nozzles with cleaning solution, and clear shredder gear jams.'
          },
          {
            id: 'ups_backup',
            name: 'Uninterruptible Power Supply (UPS), Wi-Fi Router, Modem & Tablet',
            commonIssues: ['Battery replacement alarm (Constant beep)', 'Wi-Fi dropping frequently', 'Tablet charging port loose'],
            diagnosticSteps: ['Test 12V SLA battery open-circuit voltage', 'Check power adapter DC voltage output', 'Test tablet USB-C port diode mode'],
            requiredTools: ['Multimeter', 'Soldering Iron', 'Hot Air Station'],
            commonParts: ['SLA Battery 12V 7Ah', 'Power Adapter 12V 2A', 'USB-C Port Connector'],
            repairSummary: 'Replace degraded 12V backup batteries, replace failing power adapters, and resolder USB-C tablet ports.'
          }
        ]
      }
    ]
  },
  {
    id: 'smart_home',
    name: 'Smart Home & Security',
    description: 'Smart Doorbells, Security Cameras, Baby Monitors, Digital Door Locks, Smart Plugs',
    icon: 'Wrench',
    brands: [
      {
        id: 'ring_nest',
        name: 'Ring / Google Nest / Arlo / Eufy',
        sizes: [
          {
            id: 'smart_doorbell',
            name: 'Video Doorbell, Security Camera, Baby Monitor & Smart Plug',
            commonIssues: ['Battery drains rapidly in cold weather', 'Wi-Fi connection drops', 'Baby monitor camera night vision failure'],
            diagnosticSteps: ['Measure transformer AC voltage at doorbell chime wires (16V-24V AC)', 'Check baby monitor antenna & IR LEDs', 'Test smart plug relay'],
            requiredTools: ['Multimeter', 'Security Torx Screwdriver'],
            commonParts: ['Rechargeable Battery Pack', 'Wi-Fi Antenna Module', 'Smart Relay Switch'],
            repairSummary: 'Upgrade hardwired transformer voltage to 24V AC or replace internal battery pack and wireless antennas.'
          }
        ]
      }
    ]
  },
  {
    id: 'tools_lighting',
    name: 'Lighting, Power & Working Tools',
    description: 'Desk Lamps, Floor Lamps, Electric Drills, Power Sanders, Flashlights, Battery Chargers, Surge Protectors',
    icon: 'Wrench',
    brands: [
      {
        id: 'milwaukee_bosch',
        name: 'Milwaukee / Bosch / Makita / DeWalt',
        sizes: [
          {
            id: 'power_tool',
            name: 'Cordless Drill, Power Sander, Flashlight, Battery Charger & Surge Protector',
            commonIssues: ['Trigger switch variable speed dead', 'Motor brushes worn / sparking', 'Surge protector MOV varistor blown from lightning'],
            diagnosticSteps: ['Test trigger switch PWM continuity', 'Measure individual 18V Li-Ion battery cell voltages', 'Test surge protector thermal fuse and MOV varistor continuity'],
            requiredTools: ['Multimeter', 'Torx Security Bits', 'Soldering Iron'],
            commonParts: ['Trigger Switch Assembly', 'Carbon Brush Set', 'MOV Varistor 14D471K'],
            repairSummary: 'Replace electronic trigger switch, rebuild battery pack, and replace blown surge protector MOV varistors.'
          }
        ]
      }
    ]
  }
];
