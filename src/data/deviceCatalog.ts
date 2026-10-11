export interface DeviceSize {
  id: string;
  name: string;
  commonIssues: string[];
  diagnosticSteps: string[];
  requiredTools: string[];
  commonParts: string[];
  repairSummary: string | string[];
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
    "id": "mobile_phones_tablets",
    "name": "Mobile Phones & Tablets",
    "description": "Smartphones, iPhones, Android Devices, Feature Phones, Rugged Phones, Regional Brands, Tablets, iPads & Smartwatches covering Apple, Samsung, Google Pixel, Microsoft, Mobicel, Tecno, Infinix, itel, Xiaomi, Redmi, POCO, Motorola, OnePlus, Oppo, Vivo, Realme, Huawei, Honor, Sony, Asus, Nothing, Nokia, Lenovo, HTC, LG, TCL, Alcatel, ZTE, Nubia, Red Magic, Meizu, iQOO, BlackBerry, HMD, Sharp, Fujitsu, Kyocera, Panasonic, Acer, Hisense, Condor, Gtel, Stylo, Mint, Vodacom, MTN, Cat, Blackview, Doogee, Oukitel, Cubot, Ulefone, Fairphone, Umidigi, BLU Products, Energizer, Micromax, Lava, Intex, Karbonn, Jio, iBall, Wiko, Gigaset, Fly, Walton, Symphony, Bphone, Advan, Polytron, Mito, Nexian, Cherry Mobile, MyPhone, Doro, Allview, General Mobile, Casio, Pantech, Coolpad, Gionee, LeEco, Smartisan, YotaPhone and more",
    "icon": "Smartphone",
    "brands": [
      {
        "id": "apple",
        "name": "Apple",
        "sizes": [
          {
            "id": "apple_device",
            "name": "iPhone & iPad (iPhone 6 to 16 Pro Max, iPad Air/Pro/Mini)",
            "commonIssues": [
              "Cracked OLED / Glass Shattered",
              "Battery drain / degraded battery health",
              "Charging port clogged / Tristar IC issue",
              "Face ID / Touch ID malfunction"
            ],
            "diagnosticSteps": [
              "Test screen touch digitizer responsiveness",
              "Check battery health cycle count in settings",
              "Inspect Lightning/USB-C charging port under microscope",
              "Check logic board current draw with multimeter"
            ],
            "requiredTools": [
              "Pentalobe Screwdriver",
              "Suction Cup",
              "Multimeter",
              "Heat Gun"
            ],
            "commonParts": [
              "OLED Display Assembly",
              "Replacement Battery Pack",
              "Charging Port Flex Cable",
              "Taptic Engine"
            ],
            "repairSummary": [
              "Replace damaged OLED display, swap degraded battery, and service USB-C/Lightning connector flex."
            ]
          }
        ]
      },
      {
        "id": "samsung",
        "name": "Samsung",
        "sizes": [
          {
            "id": "samsung_device",
            "name": "Galaxy S, A, Z Fold, Z Flip & Note Series",
            "commonIssues": [
              "AMOLED screen green line / blackout",
              "USB-C charging daughterboard short",
              "Swollen battery / rapid drain",
              "Microphone or speaker muffled"
            ],
            "diagnosticSteps": [
              "Check AMOLED ribbon flex seating",
              "Measure charging daughterboard test points for short",
              "Test battery voltage under load"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Opening Picks"
            ],
            "commonParts": [
              "AMOLED Display Module",
              "USB-C Daughterboard",
              "Battery Pack",
              "Rear Camera Glass"
            ],
            "repairSummary": [
              "Replace damaged AMOLED screen assembly and swap shorted USB-C daughterboard."
            ]
          }
        ]
      },
      {
        "id": "google_pixel",
        "name": "Google Pixel",
        "sizes": [
          {
            "id": "google_pixel_device",
            "name": "Smartphone & Pixel Tablet",
            "commonIssues": [
              "Bootloop on Google logo",
              "Battery swelling / rapid discharge",
              "Optical fingerprint scanner uncalibrated",
              "Camera glass cracked"
            ],
            "diagnosticSteps": [
              "Check battery internal resistance",
              "Test eMMC/UFS storage health",
              "Run official fingerprint sensor calibration tool"
            ],
            "requiredTools": [
              "Multimeter",
              "Torx T3/T4 Screwdriver",
              "Heat Pad"
            ],
            "commonParts": [
              "OLED Display Panel",
              "Battery Pack",
              "USB-C Charging Flex"
            ],
            "repairSummary": [
              "Replace swollen battery pack, reflash system partition, and calibrate optical fingerprint reader."
            ]
          }
        ]
      },
      {
        "id": "microsoft",
        "name": "Microsoft",
        "sizes": [
          {
            "id": "microsoft_device",
            "name": "Surface Duo, Windows Phone & Lumia Series",
            "commonIssues": [
              "Dual screen hinge flex ribbon cut",
              "Battery swelling in twin housing",
              "Windows Phone boot loop / BSOD",
              "USB-C port worn out"
            ],
            "diagnosticSteps": [
              "Inspect dual display ribbon hinge mechanism",
              "Test primary and secondary battery cells",
              "Check bootloader recovery mode"
            ],
            "requiredTools": [
              "Precision Torx Kit",
              "Spudger",
              "Multimeter"
            ],
            "commonParts": [
              "OLED Screen Unit",
              "Internal Battery Pair",
              "USB-C Flex Assembly"
            ],
            "repairSummary": [
              "Replace damaged hinge ribbon cable, swap twin battery cells, and reflash recovery image."
            ]
          }
        ]
      },
      {
        "id": "xiaomi",
        "name": "Xiaomi",
        "sizes": [
          {
            "id": "xiaomi_device",
            "name": "Flagship & Mi Series Smartphones",
            "commonIssues": [
              "Fast charging handshake failure (Mi Turbo)",
              "Power button tactile switch stuck",
              "Camera module lens shattered",
              "Overheating under load"
            ],
            "diagnosticSteps": [
              "Test CC lines on USB-C port",
              "Check power button flex continuity",
              "Inspect camera lens glass"
            ],
            "requiredTools": [
              "Multimeter",
              "Spudger",
              "Heat Gun"
            ],
            "commonParts": [
              "Display Assembly",
              "USB-C Daughterboard",
              "Power Button Flex Cable"
            ],
            "repairSummary": [
              "Swap charging flex daughterboard and replace broken power button flex switch."
            ]
          }
        ]
      },
      {
        "id": "redmi",
        "name": "Redmi",
        "sizes": [
          {
            "id": "redmi_device",
            "name": "Note & Redmi Number Series Smartphones",
            "commonIssues": [
              "Screen glass cracked",
              "Battery degraded",
              "Speaker volume faint",
              "Headphone jack not detecting"
            ],
            "diagnosticSteps": [
              "Test LCD digitizer touch grid",
              "Measure battery capacity",
              "Clean speaker mesh with alcohol"
            ],
            "requiredTools": [
              "Precision Screwdriver",
              "Plastic Picks",
              "Multimeter"
            ],
            "commonParts": [
              "LCD Screen Panel",
              "Replacement Battery",
              "Earpiece Speaker"
            ],
            "repairSummary": [
              "Replace cracked LCD touch panel and swap degraded battery cell."
            ]
          }
        ]
      },
      {
        "id": "poco",
        "name": "POCO",
        "sizes": [
          {
            "id": "poco_device",
            "name": "X, F & M Series Gaming Smartphones",
            "commonIssues": [
              "PMIC reboot issue / Black screen",
              "Overheating during gaming",
              "Volume button flex switch broken",
              "Charging port loose"
            ],
            "diagnosticSteps": [
              "Check power management IC (PMIC) outputs",
              "Test thermal pad contact",
              "Test volume rocker continuity"
            ],
            "requiredTools": [
              "Multimeter",
              "Hot Air Rework Station",
              "Screwdriver"
            ],
            "commonParts": [
              "Main Logic Board",
              "USB-C Charging Flex",
              "Battery Pack"
            ],
            "repairSummary": [
              "Reflow or replace power management IC and service USB-C charging port flex."
            ]
          }
        ]
      },
      {
        "id": "motorola",
        "name": "Motorola",
        "sizes": [
          {
            "id": "motorola_device",
            "name": "Moto G, Edge & Razr Foldable Series",
            "commonIssues": [
              "Ghost touches on display",
              "Charging port loose / slow charging",
              "Earpiece speaker crackling",
              "Foldable display crease crack"
            ],
            "diagnosticSteps": [
              "Test touch digitizer grounding",
              "Inspect USB-C solder joints",
              "Test earpiece acoustic coil"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Opening Picks"
            ],
            "commonParts": [
              "LCD/OLED Screen",
              "Charging Port Daughterboard",
              "Speaker Unit"
            ],
            "repairSummary": [
              "Reflow USB-C solder pads and replace cracked display assembly."
            ]
          }
        ]
      },
      {
        "id": "oneplus",
        "name": "OnePlus",
        "sizes": [
          {
            "id": "oneplus_device",
            "name": "Flagship & Nord Series",
            "commonIssues": [
              "Alert slider mechanism stuck",
              "Warp / SuperVOOC fast charging fail",
              "AMOLED screen burn-in",
              "Battery health low"
            ],
            "diagnosticSteps": [
              "Inspect alert slider mechanical switch",
              "Check fast charge protocol handshake",
              "Inspect AMOLED panel"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Plastic Spudger"
            ],
            "commonParts": [
              "Alert Slider Flex",
              "USB-C Port Board",
              "AMOLED Panel"
            ],
            "repairSummary": [
              "Clean alert slider track, replace charging port flex, and calibrate battery."
            ]
          }
        ]
      },
      {
        "id": "oppo",
        "name": "Oppo",
        "sizes": [
          {
            "id": "oppo_device",
            "name": "Find, Reno & A Series Smartphones",
            "commonIssues": [
              "ColorOS boot loop",
              "VOOC Flash charge IC shorted",
              "In-display fingerprint sensor error",
              "Volume key unpowered"
            ],
            "diagnosticSteps": [
              "Test battery thermal thermistor",
              "Check VOOC IC output voltage",
              "Clean optical fingerprint lens"
            ],
            "requiredTools": [
              "Multimeter",
              "Hot Air Rework Station",
              "Opening Tool"
            ],
            "commonParts": [
              "Charging Flex Board",
              "Replacement Battery",
              "Fingerprint Scanner"
            ],
            "repairSummary": [
              "Replace damaged charging flex daughterboard and reinstall stock firmware."
            ]
          }
        ]
      },
      {
        "id": "vivo",
        "name": "Vivo",
        "sizes": [
          {
            "id": "vivo_device",
            "name": "X, V & Y Series Smartphones",
            "commonIssues": [
              "Funtouch OS boot fault",
              "Fast charge board failure",
              "Micro-gimbal camera stabilization error",
              "Earpiece dead"
            ],
            "diagnosticSteps": [
              "Test camera gimbal motor coil",
              "Check battery connector pins",
              "Test earpiece continuity"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Tweezers"
            ],
            "commonParts": [
              "Camera Module",
              "Charging Flex",
              "Battery Pack"
            ],
            "repairSummary": [
              "Service camera optical stabilization module and replace faulty charging daughterboard."
            ]
          }
        ]
      },
      {
        "id": "realme",
        "name": "Realme",
        "sizes": [
          {
            "id": "realme_device",
            "name": "GT, Number & C Series Smartphones",
            "commonIssues": [
              "Dart charge non-functional",
              "Power button unresponsive",
              "Rear camera glass cracked",
              "Display flickering"
            ],
            "diagnosticSteps": [
              "Check USB-C port data pins",
              "Test power switch continuity",
              "Inspect camera glass frame"
            ],
            "requiredTools": [
              "Multimeter",
              "Opening Picks",
              "Heat Gun"
            ],
            "commonParts": [
              "USB-C Flex Board",
              "Camera Glass Cover",
              "Display Unit"
            ],
            "repairSummary": [
              "Replace USB-C charging flex board and fit new camera glass lens cover."
            ]
          }
        ]
      },
      {
        "id": "huawei",
        "name": "Huawei",
        "sizes": [
          {
            "id": "huawei_device",
            "name": "Mate, P & Nova Series Smartphones",
            "commonIssues": [
              "HarmonyOS boot loop",
              "SuperCharge IC failure",
              "Battery drain",
              "Volume button flex torn"
            ],
            "diagnosticSteps": [
              "Check mainboard power rails",
              "Test battery current draw",
              "Inspect button flex cable"
            ],
            "requiredTools": [
              "Multimeter",
              "Torx Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "Battery Pack",
              "Volume Flex Cable",
              "OLED Display"
            ],
            "repairSummary": [
              "Replace worn battery pack and repair volume control flex ribbon."
            ]
          }
        ]
      },
      {
        "id": "honor",
        "name": "Honor",
        "sizes": [
          {
            "id": "honor_device",
            "name": "Magic, Number & X Series Smartphones",
            "commonIssues": [
              "Magic UI boot fault",
              "Fast charge handshake failure",
              "Screen glass shattered",
              "Earpiece speaker silent"
            ],
            "diagnosticSteps": [
              "Test battery voltage",
              "Check charging port board",
              "Inspect earpiece acoustic mesh"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Picks"
            ],
            "commonParts": [
              "OLED Screen Assembly",
              "USB-C Flex",
              "Earpiece Unit"
            ],
            "repairSummary": [
              "Replace broken display assembly and install new charging flex board."
            ]
          }
        ]
      },
      {
        "id": "sony",
        "name": "Sony",
        "sizes": [
          {
            "id": "sony_device",
            "name": "Xperia 1, 5, 10 & Pro Series",
            "commonIssues": [
              "Headphone jack port clogged or loose",
              "Camera shutter button tactile switch worn",
              "MicroSD card tray reader bent",
              "Overheating 4K display"
            ],
            "diagnosticSteps": [
              "Inspect 3.5mm jack pins under magnification",
              "Test shutter button switch continuity",
              "Check SD slot pin alignment"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Tweezers"
            ],
            "commonParts": [
              "3.5mm Headphone Jack Flex",
              "SIM/SD Reader Board",
              "OLED Screen"
            ],
            "repairSummary": [
              "Replace headphone jack flex cable and repair microSD slot card reader."
            ]
          }
        ]
      },
      {
        "id": "asus",
        "name": "Asus",
        "sizes": [
          {
            "id": "asus_device",
            "name": "ROG Phone & Zenfone Series",
            "commonIssues": [
              "AirTrigger ultrasonic touch sensors non-responsive",
              "Side USB-C gaming port shorted",
              "Mainboard sudden dead (CPU cold joint)",
              "Cooling fan clip broken"
            ],
            "diagnosticSteps": [
              "Test AirTrigger flex ribbon connector",
              "Measure side USB-C port impedance",
              "Inspect motherboard for cold solder joints under BGA"
            ],
            "requiredTools": [
              "Hot Air Rework Station",
              "Multimeter",
              "Precision Screwdriver"
            ],
            "commonParts": [
              "Side USB-C Daughterboard",
              "AirTrigger Sensor Flex",
              "Battery Pack"
            ],
            "repairSummary": [
              "Reflow mainboard BGA ICs and replace damaged side USB-C daughterboard."
            ]
          }
        ]
      },
      {
        "id": "nothing",
        "name": "Nothing",
        "sizes": [
          {
            "id": "nothing_device",
            "name": "Phone (1), (2), (2a) & CMF Phone",
            "commonIssues": [
              "Glyph interface LED ribbon open",
              "Transparent glass back panel cracked",
              "Wireless charging coil shorted",
              "Display touch delay"
            ],
            "diagnosticSteps": [
              "Test Glyph LED driver power lines",
              "Check wireless charging receiver coil continuity",
              "Inspect rear glass adhesive"
            ],
            "requiredTools": [
              "Precision Torx T2/T3",
              "Heat Pad",
              "Multimeter"
            ],
            "commonParts": [
              "Glyph LED Array Flex",
              "Rear Glass Panel",
              "OLED Display"
            ],
            "repairSummary": [
              "Replace cracked transparent rear glass and service Glyph LED ribbon connector."
            ]
          }
        ]
      },
      {
        "id": "nokia",
        "name": "Nokia",
        "sizes": [
          {
            "id": "nokia_device",
            "name": "Smartphones & Feature Phones (HMD Global)",
            "commonIssues": [
              "Charging port loose (common Nokia G/X series)",
              "KaiOS feature phone keypad non-responsive",
              "Bootloop on Android One screen",
              "Battery drain"
            ],
            "diagnosticSteps": [
              "Inspect USB-C solder joints for micro-cracks",
              "Test physical keypad matrix dome switches",
              "Check battery capacity"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Precision Screwdriver"
            ],
            "commonParts": [
              "USB-C Port Board",
              "Keypad Flex Module",
              "Battery Pack"
            ],
            "repairSummary": [
              "Resolder or replace USB-C daughterboard and clean physical keypad contacts."
            ]
          }
        ]
      },
      {
        "id": "lenovo",
        "name": "Lenovo",
        "sizes": [
          {
            "id": "lenovo_device",
            "name": "Legion Phone & Tab Series",
            "commonIssues": [
              "Dual pop-up camera motor stuck",
              "Twin battery imbalance",
              "Display backlight blank",
              "Speaker crackling"
            ],
            "diagnosticSteps": [
              "Test pop-up camera gear motor",
              "Check dual battery cell voltages",
              "Inspect display connector"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Plastic Spudger"
            ],
            "commonParts": [
              "Camera Motor Assembly",
              "Dual Battery Pack",
              "Display Panel"
            ],
            "repairSummary": [
              "Service pop-up camera mechanical slider and equalize dual battery controller."
            ]
          }
        ]
      },
      {
        "id": "tecno",
        "name": "Tecno",
        "sizes": [
          {
            "id": "tecno_device",
            "name": "Camon, Phantom, Spark & Pova Series",
            "commonIssues": [
              "Screen shattered / digitizer non-responsive",
              "HiOS boot loop",
              "Charging port broken / loose",
              "Battery health degraded"
            ],
            "diagnosticSteps": [
              "Test touch digitizer grid",
              "Check charging port 5V input rail",
              "Test battery capacity"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Opening Picks"
            ],
            "commonParts": [
              "LCD/OLED Screen",
              "USB-C Daughterboard",
              "Replacement Battery"
            ],
            "repairSummary": [
              "Replace cracked display assembly and swap damaged USB-C charging daughterboard."
            ]
          }
        ]
      },
      {
        "id": "infinix",
        "name": "Infinix",
        "sizes": [
          {
            "id": "infinix_device",
            "name": "Zero, Note, Hot & Smart Series",
            "commonIssues": [
              "XOS firmware reboot loop",
              "Fast charge bypass IC shorted",
              "Speaker / microphone silent",
              "Power button non-functional"
            ],
            "diagnosticSteps": [
              "Check mainboard power rails",
              "Test charging port test points",
              "Inspect speaker mesh"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "USB-C Flex Board",
              "Earpiece/Loudspeaker",
              "Battery Pack"
            ],
            "repairSummary": [
              "Replace USB-C charging flex board and clean audio transducer paths."
            ]
          }
        ]
      },
      {
        "id": "itel",
        "name": "itel",
        "sizes": [
          {
            "id": "itel_device",
            "name": "S, P, A Series Smartphones & Feature Phones",
            "commonIssues": [
              "Micro-USB / USB-C port broken",
              "Keypad / screen unlit",
              "Battery expanded",
              "Earpiece static noise"
            ],
            "diagnosticSteps": [
              "Test charging port solder connections",
              "Check battery terminal contacts",
              "Measure speaker resistance"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Screwdriver"
            ],
            "commonParts": [
              "Micro-USB / USB-C Board",
              "Replacement Battery",
              "Keypad Rubber"
            ],
            "repairSummary": [
              "Resolder charging port pin connections and install fresh battery cell."
            ]
          }
        ]
      },
      {
        "id": "mobicel",
        "name": "Mobicel",
        "sizes": [
          {
            "id": "mobicel_device",
            "name": "Smartphones, Feature Phones & Tablets",
            "commonIssues": [
              "Display screen broken / blank",
              "Micro-USB port snapped off board",
              "Bootloop on logo screen",
              "Battery drained / dead cell"
            ],
            "diagnosticSteps": [
              "Inspect charging port solder pads",
              "Test battery voltage output",
              "Check tactile power switch"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Precision Screwdriver Set"
            ],
            "commonParts": [
              "LCD Screen Panel",
              "Micro-USB Port Connector",
              "Replacement Battery"
            ],
            "repairSummary": [
              "Resolder new Micro-USB port onto mainboard and replace cracked LCD display screen."
            ]
          }
        ]
      },
      {
        "id": "htc",
        "name": "HTC",
        "sizes": [
          {
            "id": "htc_device",
            "name": "Desire, U Series & Legacy One / Wildfire Phones",
            "commonIssues": [
              "Battery failing / sudden shutdown at 30%",
              "HTC Sense UI boot loop",
              "Unresponsive capacitive buttons",
              "Earpiece speaker low"
            ],
            "diagnosticSteps": [
              "Test battery voltage curve",
              "Check battery connector solder joints",
              "Inspect capacitive flex ribbon"
            ],
            "requiredTools": [
              "Multimeter",
              "Torx Screwdriver",
              "Plastic Spudger"
            ],
            "commonParts": [
              "Replacement Battery",
              "Display Assembly",
              "Charging Port Flex"
            ],
            "repairSummary": [
              "Replace degraded internal battery pack and reflash HTC factory firmware."
            ]
          }
        ]
      },
      {
        "id": "lg",
        "name": "LG",
        "sizes": [
          {
            "id": "lg_device",
            "name": "Velvet, V Series, G Series, Stylo & LG Gram Tablets",
            "commonIssues": [
              "Bootloop issue (Snapdragon solder fatigue)",
              "Dual Screen attachment flex unreadable",
              "Stylus pen sensor dead",
              "Battery drain"
            ],
            "diagnosticSteps": [
              "Check PMIC power rails",
              "Clean dual screen pogo pin connectors",
              "Test stylus digitizer coil"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Heat Gun"
            ],
            "commonParts": [
              "Display Panel",
              "Battery Pack",
              "Pogo Pin Board"
            ],
            "repairSummary": [
              "Clean pogo pin connectors, replace swollen battery, and service display panel."
            ]
          }
        ]
      },
      {
        "id": "tcl",
        "name": "TCL",
        "sizes": [
          {
            "id": "tcl_device",
            "name": "10, 20, 30, 40, 50 Series & NXTPAPER Tablets",
            "commonIssues": [
              "NXTPAPER matte screen coating scratched",
              "USB-C charging board failure",
              "Volume rocker stuck",
              "Battery drain"
            ],
            "diagnosticSteps": [
              "Test NXTPAPER digitizer grid",
              "Check USB-C port test points",
              "Inspect volume switch flex"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Opening Picks"
            ],
            "commonParts": [
              "NXTPAPER Screen Unit",
              "USB-C Daughterboard",
              "Battery Cell"
            ],
            "repairSummary": [
              "Replace USB-C daughterboard and install fresh battery cell."
            ]
          }
        ]
      },
      {
        "id": "alcatel",
        "name": "Alcatel",
        "sizes": [
          {
            "id": "alcatel_device",
            "name": "1, 3, 5 Series & 1T Tablets",
            "commonIssues": [
              "Micro-USB charging port damaged",
              "Screen digitizer cracked",
              "Power button switch missing click",
              "Battery shorted"
            ],
            "diagnosticSteps": [
              "Test charging port 5V rail",
              "Check digitizer flex ribbon",
              "Inspect power switch tactile pad"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Plastic Pry Tools"
            ],
            "commonParts": [
              "Micro-USB Port",
              "Touch Digitizer Glass",
              "Battery Pack"
            ],
            "repairSummary": [
              "Solder replacement Micro-USB jack and install new touch digitizer glass."
            ]
          }
        ]
      },
      {
        "id": "zte",
        "name": "ZTE",
        "sizes": [
          {
            "id": "zte_device",
            "name": "Blade, Axon & Voyage Smartphones",
            "commonIssues": [
              "Under-display camera photo haze",
              "Charging daughterboard short",
              "Firmware boot error",
              "Battery health low"
            ],
            "diagnosticSteps": [
              "Clean under-display camera screen area",
              "Test charging board voltage",
              "Check mainboard boot pins"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "OLED Display",
              "USB-C Flex Board",
              "Battery Unit"
            ],
            "repairSummary": [
              "Replace USB-C flex board and clean optics for under-display camera."
            ]
          }
        ]
      },
      {
        "id": "nubia",
        "name": "Nubia",
        "sizes": [
          {
            "id": "nubia_device",
            "name": "Z Series & Foldable Smartphones",
            "commonIssues": [
              "Flex screen hinge stiff",
              "Fast charge controller hot",
              "Touch key shoulder triggers dead",
              "Display flicker"
            ],
            "diagnosticSteps": [
              "Inspect foldable hinge gears",
              "Check fast charge IC temperature",
              "Test shoulder key flex continuity"
            ],
            "requiredTools": [
              "Multimeter",
              "Torx Screwdriver",
              "Tweezers"
            ],
            "commonParts": [
              "Hinge Mechanism",
              "Shoulder Key Flex",
              "USB-C Port"
            ],
            "repairSummary": [
              "Lubricate hinge mechanism and replace shoulder trigger flex assembly."
            ]
          }
        ]
      },
      {
        "id": "red_magic",
        "name": "Red Magic",
        "sizes": [
          {
            "id": "red_magic_device",
            "name": "Gaming Smartphones (6, 7, 8, 9, 10 Pro)",
            "commonIssues": [
              "Internal turbofan motor stuck with dust",
              "Shoulder touch triggers unresponsive",
              "Bypassed charge IC short",
              "AMOLED green line"
            ],
            "diagnosticSteps": [
              "Clean micro cooling fan blades with air blower",
              "Check shoulder sensor flex ground",
              "Test power bypass circuit"
            ],
            "requiredTools": [
              "Precision Screwdriver",
              "Compressed Air",
              "Multimeter"
            ],
            "commonParts": [
              "Internal Cooling Fan Unit",
              "Shoulder Trigger Flex",
              "AMOLED Panel"
            ],
            "repairSummary": [
              "Replace dust-seized internal cooling fan and service gaming shoulder trigger flex."
            ]
          }
        ]
      },
      {
        "id": "meizu",
        "name": "Meizu",
        "sizes": [
          {
            "id": "meizu_device",
            "name": "18, 20, 21 Series & mBack Phones",
            "commonIssues": [
              "Flyme OS boot crash",
              "mBack capacitive button fault",
              "Battery drain",
              "Screen shatter"
            ],
            "diagnosticSteps": [
              "Test mBack button flex circuit",
              "Check battery capacity",
              "Inspect OLED display ribbon"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Plastic Picks"
            ],
            "commonParts": [
              "mBack Sensor Switch",
              "OLED Screen",
              "Battery Pack"
            ],
            "repairSummary": [
              "Replace mBack switch module and install new OLED display panel."
            ]
          }
        ]
      },
      {
        "id": "iqoo",
        "name": "iQOO",
        "sizes": [
          {
            "id": "iqoo_device",
            "name": "9, 11, 12, 13 & Neo Series Gaming Phones",
            "commonIssues": [
              "FlashCharge 120W/200W handshake drop",
              "In-display dual monster touch dead",
              "Speaker rattle",
              "Battery drain"
            ],
            "diagnosticSteps": [
              "Test dual pressure-sensitive touch ribbon",
              "Inspect USB-C fast charge CC pin",
              "Check speaker cone"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "USB-C Daughterboard",
              "Pressure Sensor Flex",
              "Battery Unit"
            ],
            "repairSummary": [
              "Replace USB-C fast charge daughterboard and recalibrate touch pressure sensors."
            ]
          }
        ]
      },
      {
        "id": "blackberry",
        "name": "BlackBerry",
        "sizes": [
          {
            "id": "blackberry_device",
            "name": "KEYone, KEY2, Motion, Passport & Bold",
            "commonIssues": [
              "Physical QWERTY keyboard spacebar / trackpad broken",
              "BlackBerry OS 10 / Android boot error",
              "Battery swelling",
              "Charging port worn"
            ],
            "diagnosticSteps": [
              "Test QWERTY keyboard dome switch matrix",
              "Check spacebar fingerprint sensor flex",
              "Test battery voltage"
            ],
            "requiredTools": [
              "Precision Torx Kit",
              "Multimeter",
              "Spudger"
            ],
            "commonParts": [
              "QWERTY Keyboard Assembly",
              "Replacement Battery",
              "USB-C Charging Board"
            ],
            "repairSummary": [
              "Replace physical QWERTY keyboard flex assembly and swap swollen battery pack."
            ]
          }
        ]
      },
      {
        "id": "hmd_global",
        "name": "HMD Global",
        "sizes": [
          {
            "id": "hmd_global_device",
            "name": "HMD Skyline, Pulse & Crest Repairable Phones",
            "commonIssues": [
              "Quick-fix display assembly broken",
              "Gen2 repairability back panel clip snapped",
              "Battery health low",
              "USB-C port loose"
            ],
            "diagnosticSteps": [
              "Unscrew iFixit-compatible single-screw back cover",
              "Check battery pull-tab harness",
              "Test USB-C port connector"
            ],
            "requiredTools": [
              "Torx T3 Screwdriver",
              "Guitar Pick",
              "Multimeter"
            ],
            "commonParts": [
              "HMD Gen2 Display Module",
              "Official Battery Pack",
              "USB-C Flex Unit"
            ],
            "repairSummary": [
              "Effortlessly replace modular display, camera, or USB-C sub-module."
            ]
          }
        ]
      },
      {
        "id": "sharp",
        "name": "Sharp",
        "sizes": [
          {
            "id": "sharp_device",
            "name": "Aquos Smartphones & AQUOS Sense/R Series",
            "commonIssues": [
              "IGZO LCD / OLED screen burn or flicker",
              "Waterproof rubber seal degraded",
              "Battery drain",
              "Volume switch stuck"
            ],
            "diagnosticSteps": [
              "Check IGZO screen refresh rate controller",
              "Inspect IP68 chassis rubber gasket",
              "Test battery current draw"
            ],
            "requiredTools": [
              "Precision Screwdriver",
              "Tweezers",
              "Multimeter"
            ],
            "commonParts": [
              "IGZO Display Panel",
              "Chassis Rubber Gasket",
              "Battery Pack"
            ],
            "repairSummary": [
              "Replace degraded IP68 rubber gasket seal and swap IGZO display assembly."
            ]
          }
        ]
      },
      {
        "id": "fujitsu",
        "name": "Fujitsu",
        "sizes": [
          {
            "id": "fujitsu_device",
            "name": "Arrows & Stylistic Rugged Phones & Tablets",
            "commonIssues": [
              "Iris scanner unlock failure",
              "Rugged housing corner clip broken",
              "Charging dock pogo pin corroded",
              "Battery health degraded"
            ],
            "diagnosticSteps": [
              "Clean iris camera optical filter",
              "Check pogo pin dock contacts for corrosion",
              "Test battery internal resistance"
            ],
            "requiredTools": [
              "Multimeter",
              "Wire Brush",
              "Precision Screwdriver"
            ],
            "commonParts": [
              "Pogo Pin Connector",
              "Battery Cell",
              "Rugged Outer Shell"
            ],
            "repairSummary": [
              "Clean corroded pogo pin dock contacts and replace battery cell pack."
            ]
          }
        ]
      },
      {
        "id": "kyocera",
        "name": "Kyocera",
        "sizes": [
          {
            "id": "kyocera_device",
            "name": "DuraForce Rugged Smartphones & Feature Phones",
            "commonIssues": [
              "Rugged sapphire glass cracked",
              "Loud dual front speakers clogged with mud",
              "Programmable PTT (Push-To-Talk) button broken",
              "Charging port cover torn"
            ],
            "diagnosticSteps": [
              "Inspect PTT side tactile switch",
              "Clean dual front speaker acoustic mesh",
              "Check battery door latch"
            ],
            "requiredTools": [
              "Multimeter",
              "Torx T5 Screwdriver",
              "Acoustic Brush"
            ],
            "commonParts": [
              "PTT Tactile Switch Flex",
              "Dual Loudspeaker Module",
              "Sapphire Glass Screen"
            ],
            "repairSummary": [
              "Replace PTT tactile button flex and clean heavy-duty dual front speaker grilles."
            ]
          }
        ]
      },
      {
        "id": "panasonic",
        "name": "Panasonic",
        "sizes": [
          {
            "id": "panasonic_device",
            "name": "Toughbook Handhelds & Eluga Phones",
            "commonIssues": [
              "Rugged drop-rated bumper cracked",
              "Hot-swappable battery latch jammed",
              "Barcode laser scanner window scratched",
              "Display digitizer non-responsive"
            ],
            "diagnosticSteps": [
              "Test hot-swap battery detection switch",
              "Inspect barcode scanner optical window",
              "Check digitizer connector"
            ],
            "requiredTools": [
              "Torx T6 Screwdriver",
              "Multimeter",
              "Plastic Spudger"
            ],
            "commonParts": [
              "Hot-Swap Battery Latch",
              "Barcode Scanner Module",
              "Rugged Screen Unit"
            ],
            "repairSummary": [
              "Replace hot-swap battery latch mechanism and polish barcode scanner window."
            ]
          }
        ]
      },
      {
        "id": "acer",
        "name": "Acer",
        "sizes": [
          {
            "id": "acer_device",
            "name": "Iconia Tablets & Liquid Smartphones",
            "commonIssues": [
              "Tablet charging port micro-USB broken off",
              "Touch digitizer glass cracked",
              "Android OS boot loop",
              "Battery pack unchargeable"
            ],
            "diagnosticSteps": [
              "Check micro-USB solder pads under microscope",
              "Test touchscreen ribbon continuity",
              "Test battery cell voltage"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Plastic Pry Tool"
            ],
            "commonParts": [
              "Micro-USB Port",
              "Glass Digitizer Panel",
              "Tablet Battery Pack"
            ],
            "repairSummary": [
              "Solder new micro-USB power connector and replace cracked glass digitizer panel."
            ]
          }
        ]
      },
      {
        "id": "hisense",
        "name": "Hisense",
        "sizes": [
          {
            "id": "hisense_device",
            "name": "E-Ink Smartphones, Infinity & King Kong Series",
            "commonIssues": [
              "E-Ink dual screen refresh ghosting / freeze",
              "Charging port daughterboard short",
              "Speaker muffled",
              "Battery health low"
            ],
            "diagnosticSteps": [
              "Test E-Ink display controller voltage",
              "Check charging port 5V rail",
              "Inspect speaker mesh"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "E-Ink Display Controller",
              "USB-C Flex Board",
              "Battery Pack"
            ],
            "repairSummary": [
              "Replace USB-C flex board and reset E-Ink display refresh controller."
            ]
          }
        ]
      },
      {
        "id": "condor",
        "name": "Condor",
        "sizes": [
          {
            "id": "condor_device",
            "name": "Plume, Allure & Griffe Smartphones",
            "commonIssues": [
              "Screen shattered",
              "Charging port damaged",
              "Battery depleted",
              "Earpiece silent"
            ],
            "diagnosticSteps": [
              "Test touchscreen grid",
              "Check charging board 5V rail",
              "Test speaker continuity"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "LCD Assembly",
              "Charging Board",
              "Battery Pack"
            ],
            "repairSummary": [
              "Replace LCD screen assembly and swap damaged charging daughterboard."
            ]
          }
        ]
      },
      {
        "id": "gtel",
        "name": "Gtel",
        "sizes": [
          {
            "id": "gtel_device",
            "name": "Vivid, Infinity & A-Series Smartphones",
            "commonIssues": [
              "Touchscreen digitizer cracked",
              "Micro-USB / USB-C port loose",
              "Battery swollen",
              "Power button stuck"
            ],
            "diagnosticSteps": [
              "Test touch digitizer grid",
              "Check charging port pin continuity",
              "Inspect power button flex"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Opening Picks"
            ],
            "commonParts": [
              "Digitizer Glass",
              "Charging Port Board",
              "Battery Pack"
            ],
            "repairSummary": [
              "Replace cracked digitizer glass panel and install new charging port board."
            ]
          }
        ]
      },
      {
        "id": "stylo",
        "name": "Stylo",
        "sizes": [
          {
            "id": "stylo_device",
            "name": "Mobile Smartphones & Feature Phones",
            "commonIssues": [
              "Screen cracked",
              "Charging port loose",
              "Keypad unresponsive",
              "Battery non-charging"
            ],
            "diagnosticSteps": [
              "Check charging port solder pads",
              "Test battery voltage",
              "Inspect keypad flex"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Screwdriver"
            ],
            "commonParts": [
              "Charging Port",
              "Battery Pack",
              "Display Panel"
            ],
            "repairSummary": [
              "Resolder charging port connectors and replace faulty battery pack."
            ]
          }
        ]
      },
      {
        "id": "mint",
        "name": "Mint",
        "sizes": [
          {
            "id": "mint_device",
            "name": "Fox, Mint Mobile Phones & Tablets",
            "commonIssues": [
              "Display screen broken",
              "USB-C charging port failure",
              "System bootloop",
              "Battery health low"
            ],
            "diagnosticSteps": [
              "Test display flex ribbon",
              "Check USB-C port test points",
              "Test battery voltage"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "Display Panel",
              "USB-C Board",
              "Battery Cell"
            ],
            "repairSummary": [
              "Replace broken display panel and install new USB-C charging daughterboard."
            ]
          }
        ]
      },
      {
        "id": "vodacom",
        "name": "Vodacom",
        "sizes": [
          {
            "id": "vodacom_device",
            "name": "Kicka & Smart Tab Series",
            "commonIssues": [
              "Micro-USB port snapped off board",
              "Screen shattered",
              "Android Go bootloop",
              "Battery dead"
            ],
            "diagnosticSteps": [
              "Inspect charging port solder pads under magnifying lens",
              "Test battery voltage",
              "Check power button switch"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Screwdriver"
            ],
            "commonParts": [
              "Micro-USB Port",
              "LCD Screen",
              "Replacement Battery"
            ],
            "repairSummary": [
              "Resolder new Micro-USB port onto mainboard and replace cracked LCD screen."
            ]
          }
        ]
      },
      {
        "id": "mtn",
        "name": "MTN",
        "sizes": [
          {
            "id": "mtn_device",
            "name": "Smart S, Steppa & Tab Series",
            "commonIssues": [
              "KaiOS feature phone keypad dead",
              "Micro-USB charging port broken",
              "Screen digitizer cracked",
              "Battery expanded"
            ],
            "diagnosticSteps": [
              "Test keypad dome switch matrix",
              "Check charging port pins",
              "Inspect battery swelling"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Precision Screwdriver"
            ],
            "commonParts": [
              "Keypad Dome Flex",
              "Micro-USB Port",
              "Battery Cell"
            ],
            "repairSummary": [
              "Replace keypad dome switch flex and solder new Micro-USB charging port."
            ]
          }
        ]
      },
      {
        "id": "cat",
        "name": "Cat (Caterpillar)",
        "sizes": [
          {
            "id": "cat_device",
            "name": "Cat S42, S52, S62 Pro & S75 Rugged Phones",
            "commonIssues": [
              "FLIR thermal imaging camera fail",
              "Rugged rubberized chassis torn",
              "IP68 waterproof seal compromised",
              "Drop-resistant screen cracked"
            ],
            "diagnosticSteps": [
              "Test FLIR Lepton sensor communication bus",
              "Inspect IP68 rubber gasket",
              "Test touch digitizer grid"
            ],
            "requiredTools": [
              "Torx T4/T5 Screwdriver",
              "Multimeter",
              "Plastic Spudger"
            ],
            "commonParts": [
              "FLIR Camera Module",
              "Rugged Chassis Frame",
              "Reinforced Screen Unit"
            ],
            "repairSummary": [
              "Replace FLIR thermal camera sensor and renew IP68 waterproof chassis seal."
            ]
          }
        ]
      },
      {
        "id": "blackview",
        "name": "Blackview",
        "sizes": [
          {
            "id": "blackview_device",
            "name": "BV & BL Series Rugged Smartphones & Tabs",
            "commonIssues": [
              "Waterproof USB-C rubber plug torn",
              "Screen shattered",
              "Laser rangefinder error",
              "Battery expanded"
            ],
            "diagnosticSteps": [
              "Inspect USB-C waterproof plug frame",
              "Test laser distance sensor",
              "Test battery voltage"
            ],
            "requiredTools": [
              "Precision Torx Kit",
              "Multimeter",
              "Spudger"
            ],
            "commonParts": [
              "USB-C Plug Seal",
              "Rugged Display Unit",
              "Heavy-Duty Battery"
            ],
            "repairSummary": [
              "Replace waterproof USB-C plug seal and swap damaged rugged display module."
            ]
          }
        ]
      },
      {
        "id": "doogee",
        "name": "Doogee",
        "sizes": [
          {
            "id": "doogee_device",
            "name": "V, S & Blade Series Rugged Phones",
            "commonIssues": [
              "Night vision infrared camera LED fail",
              "Rugged side buttons stuck",
              "Charging port unseated",
              "Speaker crackling"
            ],
            "diagnosticSteps": [
              "Test IR LED board current",
              "Inspect side metal key tracks",
              "Check USB-C port daughterboard"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Tweezers"
            ],
            "commonParts": [
              "IR Camera Module",
              "USB-C Flex Board",
              "Rugged Side Keys"
            ],
            "repairSummary": [
              "Service infrared night vision module and replace loose USB-C daughterboard."
            ]
          }
        ]
      },
      {
        "id": "oukitel",
        "name": "Oukitel",
        "sizes": [
          {
            "id": "oukitel_device",
            "name": "WP Series Massive Battery Rugged Phones",
            "commonIssues": [
              "10,000mAh+ battery controller balance error",
              "Rugged screen glass cracked",
              "Loud speaker silent",
              "Charging port melted"
            ],
            "diagnosticSteps": [
              "Test giant dual-cell battery BMS circuit",
              "Check charging port test points",
              "Test speaker transducer resistance"
            ],
            "requiredTools": [
              "Multimeter",
              "Heavy-Duty Screwdriver",
              "Opening Picks"
            ],
            "commonParts": [
              "Giant Battery Pack (10Ah)",
              "Rugged Screen",
              "USB-C Daughterboard"
            ],
            "repairSummary": [
              "Replace 10,000mAh battery BMS pack and install new USB-C daughterboard."
            ]
          }
        ]
      },
      {
        "id": "cubot",
        "name": "Cubot",
        "sizes": [
          {
            "id": "cubot_device",
            "name": "KingKong Rugged & Pocket Mini Phones",
            "commonIssues": [
              "Mini screen digitizer unresponsive",
              "Rugged bumper cracked",
              "Charging port loose",
              "Battery depleted"
            ],
            "diagnosticSteps": [
              "Test mini digitizer ribbon",
              "Inspect charging port pins",
              "Check battery capacity"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "Mini Screen Assembly",
              "USB-C Board",
              "Battery Cell"
            ],
            "repairSummary": [
              "Replace mini LCD screen assembly and service USB-C charging port board."
            ]
          }
        ]
      },
      {
        "id": "ulefone",
        "name": "Ulefone",
        "sizes": [
          {
            "id": "ulefone_device",
            "name": "Armor & Power Armor Series",
            "commonIssues": [
              "Endoscope connector port clogged/damaged",
              "13,000mAh battery drain",
              "Walkie-talkie antenna socket loose",
              "Screen cracked"
            ],
            "diagnosticSteps": [
              "Test uSmart expansion connector pins",
              "Check walkie-talkie RF antenna trace",
              "Test battery BMS voltage"
            ],
            "requiredTools": [
              "Torx Screwdriver",
              "Multimeter",
              "Plastic Spudger"
            ],
            "commonParts": [
              "uSmart Port Module",
              "Massive Battery Pack",
              "Armor Glass Display"
            ],
            "repairSummary": [
              "Replace uSmart expansion port flex and swap high-capacity battery unit."
            ]
          }
        ]
      },
      {
        "id": "fairphone",
        "name": "Fairphone",
        "sizes": [
          {
            "id": "fairphone_device",
            "name": "3, 4, 5 Modular Repairable Phones",
            "commonIssues": [
              "Modular camera module failing",
              "Fairphone modular battery degraded",
              "USB-C module loose",
              "Modular screen cracked"
            ],
            "diagnosticSteps": [
              "Unscrew Phillips #0 modular housing screws",
              "Check modular pin header connections",
              "Test module resistance"
            ],
            "requiredTools": [
              "Phillips #0 Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "Modular Display Unit",
              "Modular Camera Unit",
              "Modular USB-C Port",
              "Modular Battery"
            ],
            "repairSummary": [
              "Effortlessly replace modular display, camera, or USB-C sub-module."
            ]
          }
        ]
      },
      {
        "id": "umidigi",
        "name": "Umidigi",
        "sizes": [
          {
            "id": "umidigi_device",
            "name": "Bison Rugged & A-Series Smartphones",
            "commonIssues": [
              "Thermometer infrared sensor error",
              "Screen glass cracked",
              "Charging port loose",
              "Battery swelling"
            ],
            "diagnosticSteps": [
              "Test IR temperature sensor communication bus",
              "Check charging daughterboard pins",
              "Inspect battery pack"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "IR Thermometer Sensor",
              "USB-C Flex Board",
              "Battery Unit"
            ],
            "repairSummary": [
              "Replace infrared temperature sensor and swap damaged USB-C flex board."
            ]
          }
        ]
      },
      {
        "id": "blu_products",
        "name": "BLU Products",
        "sizes": [
          {
            "id": "blu_products_device",
            "name": "Bold, G, VIVO & Studio Series",
            "commonIssues": [
              "Micro-USB / USB-C port snapped",
              "Screen digitizer cracked",
              "Android firmware bootloop",
              "Battery dead"
            ],
            "diagnosticSteps": [
              "Inspect charging port solder joints",
              "Test touch digitizer flex",
              "Check battery voltage"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Precision Screwdriver"
            ],
            "commonParts": [
              "USB Daughterboard",
              "LCD Screen Assembly",
              "Battery Pack"
            ],
            "repairSummary": [
              "Solder replacement USB charging port board and fit new display panel."
            ]
          }
        ]
      },
      {
        "id": "energizer",
        "name": "Energizer",
        "sizes": [
          {
            "id": "energizer_device",
            "name": "Power Max & Hardcase Phones",
            "commonIssues": [
              "Massive battery weight stress cracked chassis",
              "Keypad/Touch screen unresponsive",
              "Charging port broken",
              "Battery BMS lock"
            ],
            "diagnosticSteps": [
              "Test heavy battery mounting posts",
              "Check charging port terminal pins",
              "Test battery BMS circuit"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "Battery Unit",
              "USB-C Board",
              "Chassis Frame"
            ],
            "repairSummary": [
              "Repair chassis mounting posts and replace high-capacity battery cell unit."
            ]
          }
        ]
      },
      {
        "id": "micromax",
        "name": "Micromax",
        "sizes": [
          {
            "id": "micromax_device",
            "name": "IN & Canvas Series Smartphones",
            "commonIssues": [
              "Screen shattered",
              "Charging port broken",
              "Bootloop issue",
              "Battery quick drain"
            ],
            "diagnosticSteps": [
              "Test touch digitizer ribbon",
              "Check charging port pin continuity",
              "Test battery capacity"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Opening Picks"
            ],
            "commonParts": [
              "LCD Assembly",
              "Micro-USB / USB-C Board",
              "Battery Pack"
            ],
            "repairSummary": [
              "Replace broken display assembly and solder new charging daughterboard."
            ]
          }
        ]
      },
      {
        "id": "lava",
        "name": "Lava",
        "sizes": [
          {
            "id": "lava_device",
            "name": "Agni, Blaze & Yuva Series Smartphones",
            "commonIssues": [
              "Display screen broken",
              "Charging port failure",
              "Side fingerprint sensor dead",
              "Battery health degraded"
            ],
            "diagnosticSteps": [
              "Test screen touch digitizer",
              "Check USB-C port voltage",
              "Inspect fingerprint flex"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "OLED / LCD Screen",
              "USB-C Flex Board",
              "Battery Unit"
            ],
            "repairSummary": [
              "Replace LCD/OLED screen assembly and install new charging port board."
            ]
          }
        ]
      },
      {
        "id": "intex",
        "name": "Intex",
        "sizes": [
          {
            "id": "intex_device",
            "name": "Aqua Series Smartphones & Feature Phones",
            "commonIssues": [
              "Micro-USB port snapped off",
              "Keypad matrix dead",
              "Battery expanded",
              "Display shattered"
            ],
            "diagnosticSteps": [
              "Inspect micro-USB solder pads",
              "Test keypad dome switches",
              "Check battery cell voltage"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Screwdriver"
            ],
            "commonParts": [
              "Micro-USB Connector",
              "Keypad Flex",
              "Battery Pack"
            ],
            "repairSummary": [
              "Resolder new micro-USB port and replace damaged keypad flex."
            ]
          }
        ]
      },
      {
        "id": "karbonn",
        "name": "Karbonn",
        "sizes": [
          {
            "id": "karbonn_device",
            "name": "Titanium & Feature Phone Series",
            "commonIssues": [
              "Display glass cracked",
              "Charging port loose",
              "Battery failure",
              "Speaker silent"
            ],
            "diagnosticSteps": [
              "Test touch digitizer grid",
              "Check charging port pin connections",
              "Test speaker coil"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Screwdriver"
            ],
            "commonParts": [
              "Touch Glass",
              "Charging Port",
              "Battery Cell"
            ],
            "repairSummary": [
              "Replace touch digitizer glass and solder new charging port jack."
            ]
          }
        ]
      },
      {
        "id": "jio",
        "name": "Jio",
        "sizes": [
          {
            "id": "jio_device",
            "name": "JioPhone, JioPhone Next & JioBharat Feature Phones",
            "commonIssues": [
              "KaiOS / Pragati OS bootloop",
              "Keypad keys non-responsive",
              "Micro-USB port snapped",
              "Battery non-charging"
            ],
            "diagnosticSteps": [
              "Test keypad matrix dome switch grid",
              "Check charging port solder pads",
              "Test battery terminal pins"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Precision Screwdriver"
            ],
            "commonParts": [
              "Keypad Dome Flex",
              "Micro-USB Port",
              "Battery Pack"
            ],
            "repairSummary": [
              "Solder new Micro-USB port connector and clean keypad contact matrix."
            ]
          }
        ]
      },
      {
        "id": "iball",
        "name": "iBall",
        "sizes": [
          {
            "id": "iball_device",
            "name": "Slide Tablets & Andi Smartphones",
            "commonIssues": [
              "Tablet touch glass shattered",
              "Micro-USB charging port broken",
              "Battery swollen",
              "Earpiece dead"
            ],
            "diagnosticSteps": [
              "Test tablet digitizer ribbon",
              "Inspect micro-USB solder joints under microscope",
              "Test battery voltage"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Plastic Pry Tools"
            ],
            "commonParts": [
              "Tablet Glass Digitizer",
              "Micro-USB Port",
              "Tablet Battery"
            ],
            "repairSummary": [
              "Replace tablet glass digitizer and solder new micro-USB charging port."
            ]
          }
        ]
      },
      {
        "id": "wiko",
        "name": "Wiko",
        "sizes": [
          {
            "id": "wiko_device",
            "name": "View, Power & T-Series Smartphones",
            "commonIssues": [
              "Screen digitizer cracked",
              "Charging port loose",
              "Battery health degraded",
              "Earpiece crackling"
            ],
            "diagnosticSteps": [
              "Test digitizer grid responsiveness",
              "Check USB port voltage",
              "Inspect earpiece acoustic mesh"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Opening Tools"
            ],
            "commonParts": [
              "Display Assembly",
              "USB Charging Board",
              "Battery Unit"
            ],
            "repairSummary": [
              "Replace display assembly and swap damaged USB charging daughterboard."
            ]
          }
        ]
      },
      {
        "id": "gigaset",
        "name": "Gigaset",
        "sizes": [
          {
            "id": "gigaset_device",
            "name": "GS Series Made-in-Germany Smartphones",
            "commonIssues": [
              "Replaceable battery door clip broken",
              "Charging port loose",
              "Screen glass cracked",
              "Speaker faint"
            ],
            "diagnosticSteps": [
              "Inspect removable battery spring terminals",
              "Check USB-C port test points",
              "Test screen touch grid"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "Removable Battery Pack",
              "USB-C Board",
              "Display Unit"
            ],
            "repairSummary": [
              "Replace removable battery pack and install new USB-C daughterboard."
            ]
          }
        ]
      },
      {
        "id": "fly",
        "name": "Fly",
        "sizes": [
          {
            "id": "fly_device",
            "name": "Champ, IQ & ERA Series Phones",
            "commonIssues": [
              "Micro-USB port snapped off",
              "Display cracked",
              "Keypad non-responsive",
              "Battery dead"
            ],
            "diagnosticSteps": [
              "Inspect micro-USB solder pads",
              "Test battery voltage",
              "Check screen ribbon cable"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Screwdriver"
            ],
            "commonParts": [
              "Micro-USB Port",
              "LCD Screen",
              "Battery Cell"
            ],
            "repairSummary": [
              "Resolder micro-USB port connector and replace broken LCD screen panel."
            ]
          }
        ]
      },
      {
        "id": "walton",
        "name": "Walton",
        "sizes": [
          {
            "id": "walton_device",
            "name": "Primo Smartphones & Tablets",
            "commonIssues": [
              "Touchscreen cracked",
              "USB-C port damaged",
              "Battery depleted",
              "Boot loop"
            ],
            "diagnosticSteps": [
              "Test touch digitizer grid",
              "Check charging port 5V rail",
              "Test battery capacity"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Opening Picks"
            ],
            "commonParts": [
              "Display Panel",
              "Charging Board",
              "Battery Unit"
            ],
            "repairSummary": [
              "Replace damaged display panel and install new charging board."
            ]
          }
        ]
      },
      {
        "id": "symphony",
        "name": "Symphony",
        "sizes": [
          {
            "id": "symphony_device",
            "name": "Z, i, & Helio Series Smartphones",
            "commonIssues": [
              "Screen digitizer broken",
              "Charging port loose",
              "Battery swollen",
              "Earpiece silent"
            ],
            "diagnosticSteps": [
              "Test digitizer flex ribbon",
              "Check charging port pins",
              "Inspect earpiece speaker"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "Touch Digitizer",
              "Charging Daughterboard",
              "Battery Pack"
            ],
            "repairSummary": [
              "Replace touch digitizer panel and swap damaged charging daughterboard."
            ]
          }
        ]
      },
      {
        "id": "bphone",
        "name": "Bphone",
        "sizes": [
          {
            "id": "bphone_device",
            "name": "B86 & A-Series Smartphones",
            "commonIssues": [
              "Waterproof chassis seal broken",
              "Gesture camera error",
              "Charging port failure",
              "Battery drain"
            ],
            "diagnosticSteps": [
              "Check chassis IP68 rubber gasket",
              "Test camera flex connector",
              "Test USB-C port board"
            ],
            "requiredTools": [
              "Multimeter",
              "Torx Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "Display Unit",
              "USB-C Flex Board",
              "Battery Unit"
            ],
            "repairSummary": [
              "Renew waterproof chassis seal and replace USB-C flex board."
            ]
          }
        ]
      },
      {
        "id": "advan",
        "name": "Advan",
        "sizes": [
          {
            "id": "advan_device",
            "name": "NASA, Vandroid & Tab Series",
            "commonIssues": [
              "Tablet touch panel cracked",
              "Micro-USB port broken",
              "Battery drained",
              "Bootloop"
            ],
            "diagnosticSteps": [
              "Test digitizer flex ribbon",
              "Inspect micro-USB solder joints",
              "Check battery capacity"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Plastic Pry Tool"
            ],
            "commonParts": [
              "Touch Digitizer Glass",
              "Micro-USB Port",
              "Battery Pack"
            ],
            "repairSummary": [
              "Replace touch digitizer glass and solder replacement micro-USB connector."
            ]
          }
        ]
      },
      {
        "id": "polytron",
        "name": "Polytron",
        "sizes": [
          {
            "id": "polytron_device",
            "name": "Zap & Rocket Series Smartphones",
            "commonIssues": [
              "Screen cracked",
              "Charging port broken",
              "Faint audio",
              "Battery dead"
            ],
            "diagnosticSteps": [
              "Test touch digitizer grid",
              "Check charging port pin continuity",
              "Inspect loudspeaker"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Screwdriver"
            ],
            "commonParts": [
              "LCD Assembly",
              "Charging Port Board",
              "Battery Pack"
            ],
            "repairSummary": [
              "Replace LCD assembly and solder new charging port board."
            ]
          }
        ]
      },
      {
        "id": "mito",
        "name": "Mito",
        "sizes": [
          {
            "id": "mito_device",
            "name": "FullView & Fantasy Series Phones",
            "commonIssues": [
              "Screen digitizer cracked",
              "Charging port loose",
              "Keypad dead",
              "Battery expanded"
            ],
            "diagnosticSteps": [
              "Test touch digitizer flex",
              "Check charging port solder joints",
              "Test battery voltage"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Opening Tools"
            ],
            "commonParts": [
              "Digitizer Glass",
              "Charging Port",
              "Battery Cell"
            ],
            "repairSummary": [
              "Solder replacement charging port and fit new digitizer glass."
            ]
          }
        ]
      },
      {
        "id": "nexian",
        "name": "Nexian",
        "sizes": [
          {
            "id": "nexian_device",
            "name": "Journey Android One & Feature Phones",
            "commonIssues": [
              "Physical QWERTY / numeric keypad dead",
              "Micro-USB snapped",
              "Screen shattered",
              "Battery dead"
            ],
            "diagnosticSteps": [
              "Test keypad matrix contacts",
              "Inspect micro-USB solder pads under microscope",
              "Check battery cell"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Screwdriver"
            ],
            "commonParts": [
              "Keypad Flex",
              "Micro-USB Connector",
              "Battery Pack"
            ],
            "repairSummary": [
              "Resolder new micro-USB connector and clean keypad contact grid."
            ]
          }
        ]
      },
      {
        "id": "cherry_mobile",
        "name": "Cherry Mobile",
        "sizes": [
          {
            "id": "cherry_mobile_device",
            "name": "Flare, Aqua & Omega Series",
            "commonIssues": [
              "Screen glass cracked",
              "USB-C port loose",
              "Battery swelling",
              "Bootloop on logo"
            ],
            "diagnosticSteps": [
              "Test screen touch digitizer",
              "Check USB-C port pin continuity",
              "Inspect battery cell"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Opening Picks"
            ],
            "commonParts": [
              "LCD Panel",
              "USB-C Daughterboard",
              "Battery Pack"
            ],
            "repairSummary": [
              "Replace broken LCD panel and install new USB-C daughterboard."
            ]
          }
        ]
      },
      {
        "id": "myphone",
        "name": "MyPhone",
        "sizes": [
          {
            "id": "myphone_device",
            "name": "MySeries Smartphones & Tablets",
            "commonIssues": [
              "Touch screen digitizer shattered",
              "Charging port loose",
              "Battery depleted",
              "Speaker noise"
            ],
            "diagnosticSteps": [
              "Test digitizer flex ribbon",
              "Check charging port 5V rail",
              "Inspect speaker coil"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "Digitizer Glass",
              "Charging Port Board",
              "Battery Unit"
            ],
            "repairSummary": [
              "Replace digitizer glass and service charging port board."
            ]
          }
        ]
      },
      {
        "id": "doro",
        "name": "Doro",
        "sizes": [
          {
            "id": "doro_device",
            "name": "PhoneEasy & Secure Senior Phones",
            "commonIssues": [
              "Assistance emergency button switch stuck",
              "High-volume acoustic speaker blown",
              "Charging cradle pogo pins corroded",
              "Battery drain"
            ],
            "diagnosticSteps": [
              "Test emergency rear button tactile switch",
              "Measure high-dB speaker voice coil resistance",
              "Clean charging dock pogo pins"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Contact Cleaner"
            ],
            "commonParts": [
              "Emergency Tactile Switch",
              "High-dB Loudspeaker",
              "Pogo Pin Dock Board",
              "Battery"
            ],
            "repairSummary": [
              "Replace emergency assistance tactile switch and install high-dB loudspeaker."
            ]
          }
        ]
      },
      {
        "id": "allview",
        "name": "Allview",
        "sizes": [
          {
            "id": "allview_device",
            "name": "Soul, Xtreme & Viva Tablet Series",
            "commonIssues": [
              "Screen digitizer cracked",
              "Charging port failure",
              "System boot loop",
              "Battery drain"
            ],
            "diagnosticSteps": [
              "Test touch digitizer grid",
              "Check charging port voltage",
              "Test battery voltage"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "Display Panel",
              "Charging Daughterboard",
              "Battery Pack"
            ],
            "repairSummary": [
              "Replace display panel and swap damaged charging daughterboard."
            ]
          }
        ]
      },
      {
        "id": "general_mobile",
        "name": "General Mobile",
        "sizes": [
          {
            "id": "general_mobile_device",
            "name": "GM Series Android One Phones",
            "commonIssues": [
              "Screen shattered",
              "USB-C port unseated",
              "Battery health low",
              "Earpiece silent"
            ],
            "diagnosticSteps": [
              "Test touch digitizer responsiveness",
              "Check USB-C port pins",
              "Inspect earpiece mesh"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Opening Picks"
            ],
            "commonParts": [
              "LCD/OLED Panel",
              "USB-C Board",
              "Battery Pack"
            ],
            "repairSummary": [
              "Replace LCD/OLED panel and install replacement USB-C board."
            ]
          }
        ]
      },
      {
        "id": "casio",
        "name": "Casio",
        "sizes": [
          {
            "id": "casio_device",
            "name": "GzOne Rugged Phones",
            "commonIssues": [
              "Gasket seal leak / water ingress",
              "Heavy rubber bumper torn",
              "Display screen cracked",
              "Battery non-charging"
            ],
            "diagnosticSteps": [
              "Inspect IP67 rubber sealing gasket",
              "Check battery door locking screw",
              "Test screen digitizer"
            ],
            "requiredTools": [
              "Torx T5 Screwdriver",
              "Multimeter",
              "Tweezers"
            ],
            "commonParts": [
              "Rubber Sealing Gasket",
              "Battery Pack",
              "Rugged Screen Unit"
            ],
            "repairSummary": [
              "Replace internal IP67 rubber sealing gasket and fit new battery pack."
            ]
          }
        ]
      },
      {
        "id": "pantech",
        "name": "Pantech",
        "sizes": [
          {
            "id": "pantech_device",
            "name": "Vega Series Smartphones",
            "commonIssues": [
              "Display glass shattered",
              "Charging port damaged",
              "Battery depleted",
              "Boot loop"
            ],
            "diagnosticSteps": [
              "Test touch digitizer ribbon",
              "Check charging port pin continuity",
              "Test battery capacity"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Opening Tools"
            ],
            "commonParts": [
              "Display Panel",
              "Charging Port Board",
              "Battery Cell"
            ],
            "repairSummary": [
              "Replace display panel and solder replacement charging port connector."
            ]
          }
        ]
      },
      {
        "id": "coolpad",
        "name": "Coolpad",
        "sizes": [
          {
            "id": "coolpad_device",
            "name": "Cool, Note & Surf Series",
            "commonIssues": [
              "Screen cracked",
              "Micro-USB / USB-C port broken",
              "Battery drain",
              "Speaker faint"
            ],
            "diagnosticSteps": [
              "Test touch digitizer flex",
              "Check charging port voltage",
              "Inspect loudspeaker mesh"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Spudger"
            ],
            "commonParts": [
              "LCD Screen",
              "Charging Daughterboard",
              "Battery Pack"
            ],
            "repairSummary": [
              "Replace broken LCD screen and install new charging daughterboard."
            ]
          }
        ]
      },
      {
        "id": "gionee",
        "name": "Gionee",
        "sizes": [
          {
            "id": "gionee_device",
            "name": "Marathon, Elife & M-Series",
            "commonIssues": [
              "Massive battery (Marathon 6000mAh) controller lock",
              "Charging port melted",
              "Screen glass cracked",
              "Speaker static"
            ],
            "diagnosticSteps": [
              "Test battery BMS protection circuit",
              "Check charging port solder pads",
              "Test screen touch grid"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Precision Screwdriver"
            ],
            "commonParts": [
              "6000mAh Battery Pack",
              "Charging Port Board",
              "Display Unit"
            ],
            "repairSummary": [
              "Replace 6000mAh battery pack and solder new charging port board."
            ]
          }
        ]
      },
      {
        "id": "leeco",
        "name": "LeEco",
        "sizes": [
          {
            "id": "leeco_device",
            "name": "Le 2, Le Max & Le Pro Series",
            "commonIssues": [
              "CDLA Type-C audio jack fail",
              "USB-C fast charge port shorted",
              "EUI boot loop",
              "Battery degraded"
            ],
            "diagnosticSteps": [
              "Test Type-C audio handshake lines",
              "Check USB-C port test points",
              "Reflash EUI stock ROM"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Plastic Spudger"
            ],
            "commonParts": [
              "USB-C Flex Board",
              "Battery Unit",
              "Display Panel"
            ],
            "repairSummary": [
              "Replace USB-C audio/charge flex board and reflash stock system software."
            ]
          }
        ]
      },
      {
        "id": "smartisan",
        "name": "Smartisan",
        "sizes": [
          {
            "id": "smartisan_device",
            "name": "Nut (Jianguo) & R Series Phones",
            "commonIssues": [
              "Side dual-button flex worn",
              "Smartisan OS boot crash",
              "Type-C charging port loose",
              "Screen glass cracked"
            ],
            "diagnosticSteps": [
              "Test dual side key flex circuit",
              "Check Type-C port pin continuity",
              "Inspect display ribbon"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Opening Picks"
            ],
            "commonParts": [
              "Side Button Flex",
              "Type-C Daughterboard",
              "Display Panel"
            ],
            "repairSummary": [
              "Replace side dual-button flex cable and swap Type-C daughterboard."
            ]
          }
        ]
      },
      {
        "id": "yotaphone",
        "name": "YotaPhone",
        "sizes": [
          {
            "id": "yotaphone_device",
            "name": "1, 2, 3 Dual-Screen E-Ink Phones",
            "commonIssues": [
              "Rear E-Ink screen shattered / frozen",
              "Front AMOLED display cracked",
              "Battery swollen between twin screens",
              "Charging port loose"
            ],
            "diagnosticSteps": [
              "Inspect rear E-Ink flex connector",
              "Test front AMOLED digitizer",
              "Check battery clearance"
            ],
            "requiredTools": [
              "Precision Torx Kit",
              "Multimeter",
              "Spudger"
            ],
            "commonParts": [
              "E-Ink Display Module",
              "Front AMOLED Screen",
              "Battery Unit"
            ],
            "repairSummary": [
              "Replace rear E-Ink display module and swap swollen internal battery pack."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "heavy_duty_equipment",
    "name": "Generators & Heavy Duty",
    "description": "Generators, Compressors, Heavy Welders, Industrial Power Equipment & Engines covering Caterpillar, Honda Power, Generac, Yamaha, Champion, Westinghouse, Predator, DeWalt, Makita, Milwaukee, Bosch, Hilti, Porter-Cable, Miller, Lincoln Electric, Hobart, Husqvarna, Briggs & Stratton, John Deere, Stihl, Echo, Cub Cadet, Toro, Troy-Bilt and more",
    "icon": "Zap",
    "brands": [
      {
        "id": "caterpillar",
        "name": "Caterpillar (CAT)",
        "sizes": [
          {
            "id": "caterpillar_device",
            "name": "Industrial Engines, Heavy Machinery & Generators",
            "commonIssues": [
              "Fuel injection pump pressure low",
              "Hydraulic fluid line leakage",
              "DPF filter clogging",
              "Starter solenoid chatter"
            ],
            "diagnosticSteps": [
              "Check fuel rail pressure sensor voltage",
              "Inspect hydraulic high-pressure hoses",
              "Run DPF manual regeneration cycle"
            ],
            "requiredTools": [
              "Heavy-Duty Wrench Set",
              "Pressure Gauge",
              "Multimeter"
            ],
            "commonParts": [
              "Fuel Injector Assembly",
              "Hydraulic Hose Coupling",
              "Starter Solenoid"
            ],
            "repairSummary": [
              "Service high-pressure fuel pump, replace damaged hydraulic lines, and regenerate DPF system."
            ]
          }
        ]
      },
      {
        "id": "honda_power",
        "name": "Honda Power",
        "sizes": [
          {
            "id": "honda_power_device",
            "name": "Honda EU/EG Series Generators & Engines",
            "commonIssues": [
              "Inverter module output zero volts",
              "Carburetor jet clogged with stale fuel",
              "Low oil shutdown sensor tripping",
              "Recoil starter rope snapped"
            ],
            "diagnosticSteps": [
              "Test generator output voltage with multimeter",
              "Disassemble and clean carburetor jets with solvent",
              "Check crankcase oil level switch continuity"
            ],
            "requiredTools": [
              "Spark Plug Socket",
              "Carburetor Cleaning Tool",
              "Multimeter"
            ],
            "commonParts": [
              "Inverter Board",
              "Carburetor Assembly",
              "Recoil Starter Assembly"
            ],
            "repairSummary": [
              "Clean carburetor float bowl, replace inverter control board, and re-string recoil starter assembly."
            ]
          }
        ]
      },
      {
        "id": "generac",
        "name": "Generac",
        "sizes": [
          {
            "id": "generac_device",
            "name": "Guardian & Portable Standby Generators",
            "commonIssues": [
              "Automatic transfer switch (ATS) fail to engage",
              "Stator winding short to ground",
              "Stepper motor governor hunting",
              "Battery charger fault"
            ],
            "diagnosticSteps": [
              "Inspect ATS contactor coils",
              "Measure stator winding resistance with megohmmeter",
              "Check stepper motor linkage"
            ],
            "requiredTools": [
              "Megohmmeter",
              "Multimeter",
              "Insulated Screwdrivers"
            ],
            "commonParts": [
              "ATS Contactor",
              "Control Board",
              "Voltage Regulator (AVR)"
            ],
            "repairSummary": [
              "Replace faulty Automatic Transfer Switch contactors and install new Automatic Voltage Regulator (AVR)."
            ]
          }
        ]
      },
      {
        "id": "yamaha_power",
        "name": "Yamaha Power",
        "sizes": [
          {
            "id": "yamaha_power_device",
            "name": "Yamaha Inverter Generators & Pumps",
            "commonIssues": [
              "Carburetor clogged",
              "Eco-throttle sensor fail",
              "No spark at plug",
              "AVR voltage drift"
            ],
            "diagnosticSteps": [
              "Clean carburetor jets",
              "Test eco-throttle switch continuity",
              "Check ignition coil secondary resistance"
            ],
            "requiredTools": [
              "Multimeter",
              "Carburetor Cleaner",
              "Spark Plug Tool"
            ],
            "commonParts": [
              "Carburetor Kit",
              "Ignition Coil",
              "AVR Module"
            ],
            "repairSummary": [
              "Service carburetor and install new ignition coil assembly."
            ]
          }
        ]
      },
      {
        "id": "champion",
        "name": "Champion",
        "sizes": [
          {
            "id": "champion_device",
            "name": "Dual Fuel & Inverter Generators",
            "commonIssues": [
              "Propane/Gasoline dual-fuel regulator lock",
              "Low oil shutoff switch false trigger",
              "Inverter board over-current trip"
            ],
            "diagnosticSteps": [
              "Test propane stepper regulator solenoid",
              "Check engine oil level",
              "Measure AC output frequency"
            ],
            "requiredTools": [
              "Multimeter",
              "Wrench Set",
              "Fuel Pressure Gauge"
            ],
            "commonParts": [
              "Dual-Fuel Regulator",
              "Oil Sensor Switch",
              "Inverter Module"
            ],
            "repairSummary": [
              "Replace dual-fuel regulator valve and reset low-oil cutoff sensor."
            ]
          }
        ]
      },
      {
        "id": "westinghouse",
        "name": "Westinghouse",
        "sizes": [
          {
            "id": "westinghouse_device",
            "name": "Digital Inverter & Heavy Generators",
            "commonIssues": [
              "Digital display code ER-01",
              "Carburetor fuel solenoid stuck",
              "Spark plug fouled"
            ],
            "diagnosticSteps": [
              "Check error code diagnostic table",
              "Test fuel cutoff solenoid continuity",
              "Inspect spark gap"
            ],
            "requiredTools": [
              "Multimeter",
              "Spark Plug Gauge"
            ],
            "commonParts": [
              "Carburetor Solenoid",
              "Control Module",
              "Spark Plug"
            ],
            "repairSummary": [
              "Replace fuel cutoff solenoid and reset generator control module."
            ]
          }
        ]
      },
      {
        "id": "predator",
        "name": "Predator",
        "sizes": [
          {
            "id": "predator_device",
            "name": "Engines & Generators (Harbor Freight)",
            "commonIssues": [
              "Low oil sensor preventing ignition",
              "Carburetor varnish build-up",
              "Recoil starter gear broken"
            ],
            "diagnosticSteps": [
              "Bypass low oil sensor temporarily for test",
              "Clean carburetor jets",
              "Inspect recoil drive pawls"
            ],
            "requiredTools": [
              "Screwdriver Set",
              "Multimeter",
              "Carb Cleaner"
            ],
            "commonParts": [
              "Carburetor",
              "Recoil Pawl Kit",
              "Spark Plug"
            ],
            "repairSummary": [
              "Replace low oil switch and install fresh pre-jetted carburetor."
            ]
          }
        ]
      },
      {
        "id": "dewalt_heavy",
        "name": "DeWalt",
        "sizes": [
          {
            "id": "dewalt_heavy_device",
            "name": "Industrial Compressors, Generators & Pressure Washers",
            "commonIssues": [
              "Compressor pressure switch unloader valve stuck",
              "Thermal overload switch tripped",
              "Pump oil leak"
            ],
            "diagnosticSteps": [
              "Measure pressure switch cut-in/cut-out points",
              "Test motor thermal protector continuity",
              "Check pump seal gaskets"
            ],
            "requiredTools": [
              "Pressure Gauge",
              "Multimeter",
              "Socket Set"
            ],
            "commonParts": [
              "Pressure Switch Assembly",
              "Thermal Overload Relay",
              "Pump Gasket Kit"
            ],
            "repairSummary": [
              "Replace compressor pressure switch and service pump oil seal gaskets."
            ]
          }
        ]
      },
      {
        "id": "makita_heavy",
        "name": "Makita",
        "sizes": [
          {
            "id": "makita_heavy_device",
            "name": "Industrial Power Tools, Generators & Concrete Cutters",
            "commonIssues": [
              "Armature commutator sparking",
              "Drive belt slipping",
              "Carburetor diaphragm torn"
            ],
            "diagnosticSteps": [
              "Inspect carbon brush length",
              "Check drive belt tension",
              "Test carburetor fuel pulse line"
            ],
            "requiredTools": [
              "Brush Removal Tool",
              "Multimeter",
              "Tension Gauge"
            ],
            "commonParts": [
              "Carbon Brush Set",
              "Drive Belt",
              "Diaphragm Kit"
            ],
            "repairSummary": [
              "Install fresh carbon brushes and adjust drive belt tension."
            ]
          }
        ]
      },
      {
        "id": "milwaukee_heavy",
        "name": "Milwaukee",
        "sizes": [
          {
            "id": "milwaukee_heavy_device",
            "name": "MX FUEL Industrial Heavy Equipment",
            "commonIssues": [
              "MX FUEL battery BMS error code",
              "Inverter power module thermal shutdown",
              "Motor armature sensor misalignment"
            ],
            "diagnosticSteps": [
              "Read MX FUEL battery diagnostics via Bluetooth",
              "Check inverter heatsink thermal paste",
              "Test hall sensor continuity"
            ],
            "requiredTools": [
              "Multimeter",
              "Torx Bit Set",
              "Thermal Paste"
            ],
            "commonParts": [
              "BMS Control Board",
              "Inverter Power Board",
              "Hall Effect Sensor"
            ],
            "repairSummary": [
              "Service MX FUEL inverter power board and re-calibrate motor hall effect sensors."
            ]
          }
        ]
      },
      {
        "id": "bosch_heavy",
        "name": "Bosch Professional",
        "sizes": [
          {
            "id": "bosch_heavy_device",
            "name": "Bosch Heavy Rotary Hammers & Industrial Equipment",
            "commonIssues": [
              "Pneumatic hammer mechanism weak strike",
              "Stator coil open circuit",
              "Safety clutch slipping"
            ],
            "diagnosticSteps": [
              "Inspect striker O-rings for wear",
              "Measure stator winding resistance",
              "Test clutch torque rating"
            ],
            "requiredTools": [
              "Retaining Ring Pliers",
              "Multimeter",
              "Grease Gun"
            ],
            "commonParts": [
              "Pneumatic Striker O-Rings",
              "Stator Coil",
              "Safety Clutch Pack"
            ],
            "repairSummary": [
              "Replace pneumatic striker O-rings and re-grease impact hammer gearbox."
            ]
          }
        ]
      },
      {
        "id": "hilti",
        "name": "Hilti",
        "sizes": [
          {
            "id": "hilti_device",
            "name": "Heavy Diamond Coring, Breakers & Compressors",
            "commonIssues": [
              "Service indicator light illuminated",
              "Piston seal pressure leakage",
              "Electronic clutch failure"
            ],
            "diagnosticSteps": [
              "Read Hilti diagnostic service codes",
              "Check compression cylinder pressure",
              "Test electronic slip clutch sensor"
            ],
            "requiredTools": [
              "Hilti Diagnostic Cable",
              "Pressure Tester"
            ],
            "commonParts": [
              "Piston Seal Set",
              "Service Module",
              "Electronic Clutch"
            ],
            "repairSummary": [
              "Perform routine service reset, replace piston seal rings, and recalibrate clutch module."
            ]
          }
        ]
      },
      {
        "id": "porter_cable_heavy",
        "name": "Porter-Cable",
        "sizes": [
          {
            "id": "porter_cable_heavy_device",
            "name": "Compressors & Industrial Tools",
            "commonIssues": [
              "Air tank check valve leaking",
              "Motor capacitor shorted",
              "Pressure regulator valve leaking"
            ],
            "diagnosticSteps": [
              "Inspect tank check valve seat for debris",
              "Test motor start capacitor capacitance",
              "Check regulator O-rings"
            ],
            "requiredTools": [
              "Multimeter",
              "Pipe Wrench",
              "Teflon Tape"
            ],
            "commonParts": [
              "Tank Check Valve",
              "Motor Start Capacitor",
              "Pressure Regulator"
            ],
            "repairSummary": [
              "Replace faulty brass check valve and swap motor start capacitor."
            ]
          }
        ]
      },
      {
        "id": "miller_electric",
        "name": "Miller Electric",
        "sizes": [
          {
            "id": "miller_electric_device",
            "name": "Miller Bobcat, Spectrum & Millermatic Welders",
            "commonIssues": [
              "Arc strike unstable / erratic voltage",
              "Wire feeder motor drive roll slipping",
              "Plasma cutter pilot arc failing"
            ],
            "diagnosticSteps": [
              "Check welding lead terminal connections for oxidation",
              "Inspect wire feed roll pressure arm",
              "Test pilot arc relay switch"
            ],
            "requiredTools": [
              "Multimeter",
              "Wire Brush",
              "Feeler Gauge"
            ],
            "commonParts": [
              "Drive Roll Assembly",
              "Contact Tips",
              "Pilot Arc Relay",
              "Rectifier Diode Bridge"
            ],
            "repairSummary": [
              "Clean welding lead terminals, replace worn wire drive rolls, and swap pilot arc relay."
            ]
          }
        ]
      },
      {
        "id": "lincoln_electric",
        "name": "Lincoln Electric",
        "sizes": [
          {
            "id": "lincoln_electric_device",
            "name": "Lincoln Ranger, Power MIG & Invertec Welders",
            "commonIssues": [
              "Engine-driven generator brush wear",
              "MIG gun trigger switch open circuit",
              "Duty cycle thermal cutout"
            ],
            "diagnosticSteps": [
              "Inspect alternator slip ring carbon brushes",
              "Test gun trigger cable continuity",
              "Check cooling fan airflow"
            ],
            "requiredTools": [
              "Multimeter",
              "Screwdriver Set",
              "Wire Strippers"
            ],
            "commonParts": [
              "Slip Ring Carbon Brushes",
              "MIG Gun Liner",
              "Thermal Switch"
            ],
            "repairSummary": [
              "Replace slip ring carbon brushes and install new MIG gun wire conduit liner."
            ]
          }
        ]
      },
      {
        "id": "hobart",
        "name": "Hobart",
        "sizes": [
          {
            "id": "hobart_device",
            "name": "Handler & Champion Welders",
            "commonIssues": [
              "Wire feeder speed control potentiometer jitter",
              "Gas solenoid valve stuck open",
              "Rectifier board short"
            ],
            "diagnosticSteps": [
              "Measure potentiometer resistance sweep",
              "Check shielding gas solenoid coil resistance",
              "Test main rectifier diodes"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron"
            ],
            "commonParts": [
              "Speed Control Potentiometer",
              "Gas Solenoid Valve",
              "Rectifier Board"
            ],
            "repairSummary": [
              "Replace wire speed potentiometer and install fresh gas solenoid valve."
            ]
          }
        ]
      },
      {
        "id": "husqvarna_heavy",
        "name": "Husqvarna",
        "sizes": [
          {
            "id": "husqvarna_heavy_device",
            "name": "Lawn Tractors, Chainsaws & Power Cutters",
            "commonIssues": [
              "Chainsaw engine stalling at full throttle",
              "Drive belt snapping on riding mower",
              "AutoTune carburetor error"
            ],
            "diagnosticSteps": [
              "Check fuel line for cracks",
              "Inspect pulley alignment",
              "Connect Husqvarna AutoTune diagnostic tool"
            ],
            "requiredTools": [
              "Husqvarna Diagnostic Tool",
              "T-Wrench",
              "Tachometer"
            ],
            "commonParts": [
              "Carburetor Diaphragm",
              "Drive Belt",
              "Fuel Line"
            ],
            "repairSummary": [
              "Replace fuel line, adjust drive belt pulleys, and calibrate AutoTune fuel module."
            ]
          }
        ]
      },
      {
        "id": "briggs_stratton",
        "name": "Briggs & Stratton",
        "sizes": [
          {
            "id": "briggs_stratton_device",
            "name": "Engines & Lawn Equipment",
            "commonIssues": [
              "Engine surging at idle (hunting governor)",
              "Starter solenoid clicking",
              "Flywheel key sheared off"
            ],
            "diagnosticSteps": [
              "Clean idle jet in carburetor",
              "Test starter solenoid coil",
              "Inspect flywheel key alignment"
            ],
            "requiredTools": [
              "Flywheel Puller",
              "Multimeter",
              "Socket Set"
            ],
            "commonParts": [
              "Carburetor Overhaul Kit",
              "Starter Solenoid",
              "Flywheel Key"
            ],
            "repairSummary": [
              "Clean carburetor idle passages, replace sheared aluminum flywheel key, and swap starter solenoid."
            ]
          }
        ]
      },
      {
        "id": "john_deere_heavy",
        "name": "John Deere",
        "sizes": [
          {
            "id": "john_deere_heavy_device",
            "name": "Riding Mowers & Compact Tractors",
            "commonIssues": [
              "PTO clutch fails to engage mower deck",
              "Hydrostatic transmission slipping",
              "Ignition switch non-responsive"
            ],
            "diagnosticSteps": [
              "Measure PTO clutch coil resistance (approx 3 ohms)",
              "Check hydrostatic drive belt and fluid level",
              "Test ignition switch contacts"
            ],
            "requiredTools": [
              "Multimeter",
              "Feeler Gauge",
              "Socket Set"
            ],
            "commonParts": [
              "Electric PTO Clutch",
              "Hydrostatic Drive Belt",
              "Safety Interlock Switch"
            ],
            "repairSummary": [
              "Adjust PTO clutch air gap and replace worn hydrostatic drive belt."
            ]
          }
        ]
      },
      {
        "id": "stihl",
        "name": "Stihl",
        "sizes": [
          {
            "id": "stihl_device",
            "name": "Chainsaws, Cutters & Trimmers",
            "commonIssues": [
              "M-Tronic electronic fuel management error",
              "Spark arrestor screen clogged with carbon",
              "Clutch drum bearing worn"
            ],
            "diagnosticSteps": [
              "Run M-Tronic reset procedure (idle 90s)",
              "Remove and torch clean spark arrestor screen",
              "Inspect clutch needle bearing"
            ],
            "requiredTools": [
              "T27 Torx Driver",
              "Spark Plug Wrench",
              "Torch"
            ],
            "commonParts": [
              "Spark Arrestor Screen",
              "Carburetor Kit",
              "Clutch Assembly"
            ],
            "repairSummary": [
              "Torch-clean clogged spark arrestor screen and complete M-Tronic electronic re-calibration."
            ]
          }
        ]
      },
      {
        "id": "echo",
        "name": "Echo",
        "sizes": [
          {
            "id": "echo_device",
            "name": "Chainsaws, Blowers & Power Equipment",
            "commonIssues": [
              "Engine hard starting when hot",
              "Purge bulb cracked and leaking fuel",
              "Recoil rope spring uncoiled"
            ],
            "diagnosticSteps": [
              "Check vapor lock in fuel tank vent",
              "Replace cracked rubber purge bulb",
              "Rewind starter recoil spring"
            ],
            "requiredTools": [
              "Screwdriver Set",
              "Pliers",
              "Tachometer"
            ],
            "commonParts": [
              "Purge Bulb",
              "Fuel Tank Vent",
              "Recoil Spring Kit"
            ],
            "repairSummary": [
              "Replace rubber purge bulb, swap fuel tank vent valve, and re-tension recoil spring."
            ]
          }
        ]
      },
      {
        "id": "cub_cadet",
        "name": "Cub Cadet",
        "sizes": [
          {
            "id": "cub_cadet_device",
            "name": "Riding Mowers & Snow Blowers",
            "commonIssues": [
              "Steering gear quadrant teeth stripped",
              "Auger belt slipping on snow blower",
              "Safety seat switch bypassed/broken"
            ],
            "diagnosticSteps": [
              "Inspect steering rack and sector gear",
              "Check auger drive belt tension",
              "Test seat safety interlock switch"
            ],
            "requiredTools": [
              "Socket Wrench Set",
              "Multimeter"
            ],
            "commonParts": [
              "Steering Sector Gear",
              "Auger Drive Belt",
              "Safety Switch"
            ],
            "repairSummary": [
              "Replace worn steering sector gear and install new heavy-duty auger drive belt."
            ]
          }
        ]
      },
      {
        "id": "toro_heavy",
        "name": "Toro",
        "sizes": [
          {
            "id": "toro_heavy_device",
            "name": "Commercial Mowers & Power Clear Snowblowers",
            "commonIssues": [
              "Personal Pace drive cable stretched",
              "Impeller paddle rubber worn out",
              "Carburetor needle valve leaking"
            ],
            "diagnosticSteps": [
              "Adjust drive control cable tension",
              "Inspect snowblower impeller rubber scraper",
              "Test float needle seating"
            ],
            "requiredTools": [
              "Adjustable Wrench",
              "Pliers",
              "Socket Set"
            ],
            "commonParts": [
              "Drive Cable",
              "Impeller Rubber Kit",
              "Carburetor Float Kit"
            ],
            "repairSummary": [
              "Replace drive control cable and install fresh rubber impeller scraper kit."
            ]
          }
        ]
      },
      {
        "id": "troy_bilt",
        "name": "Troy-Bilt",
        "sizes": [
          {
            "id": "troy_bilt_device",
            "name": "Tillers & Lawn Tractors",
            "commonIssues": [
              "Tiller tine shaft oil seal leaking",
              "Engine stalling under load",
              "Drive belt slipping"
            ],
            "diagnosticSteps": [
              "Inspect tine shaft seals for wrapped roots/debris",
              "Clean carburetor main jet",
              "Check drive belt alignment"
            ],
            "requiredTools": [
              "Seal Puller",
              "Socket Set",
              "Carb Cleaner"
            ],
            "commonParts": [
              "Tine Shaft Seal Kit",
              "Carburetor",
              "Drive Belt"
            ],
            "repairSummary": [
              "Remove debris from tine shaft, install new oil seals, and clean main jet."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "entertainment",
    "name": "Entertainment & Living Room",
    "description": "Smart TVs, Gaming Consoles, Soundbars, AV Receivers & Speakers covering Samsung, LG, Sony, Panasonic, Philips, Sharp, Toshiba, Bang & Olufsen, TCL, Hisense, Xiaomi, Vizio, PlayStation, Xbox, Nintendo, JBL, Bose, Sonos, Yamaha, Denon, Harman Kardon, Marshall, Anker Soundcore and more",
    "icon": "Tv",
    "brands": [
      {
        "id": "samsung_tv",
        "name": "Samsung",
        "sizes": [
          {
            "id": "samsung_tv_device",
            "name": "Neo QLED, OLED & Crystal UHD TVs",
            "commonIssues": [
              "One Connect cable damaged",
              "Power supply board standby LED blinking",
              "Backlight LED strip burn"
            ],
            "diagnosticSteps": [
              "Test standby voltage on power supply",
              "Inspect One Connect optic cable",
              "Check LED backlight array"
            ],
            "requiredTools": [
              "Multimeter",
              "Suction Cups",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Power Supply Board",
              "Main Logic Board",
              "LED Backlight Strip Kit"
            ],
            "repairSummary": [
              "Replace power supply board and swap damaged One Connect optical cable."
            ]
          }
        ]
      },
      {
        "id": "lg_tv",
        "name": "LG Electronics",
        "sizes": [
          {
            "id": "lg_tv_device",
            "name": "OLED Evo, QNED & NanoCell TVs",
            "commonIssues": [
              "OLED panel auto-dimming issue",
              "Power board relay clicking repeatedly",
              "Magic Remote Bluetooth unpairing"
            ],
            "diagnosticSteps": [
              "Measure power board 12V and 24V rails",
              "Check OLED panel power harness",
              "Re-pair Magic Remote"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Suction Cups"
            ],
            "commonParts": [
              "Main Board",
              "Power Supply Board",
              "Magic Remote Control"
            ],
            "repairSummary": [
              "Replace clicking power supply board and reflash LG webOS system software."
            ]
          }
        ]
      },
      {
        "id": "sony_tv",
        "name": "Sony",
        "sizes": [
          {
            "id": "sony_tv_device",
            "name": "BRAVIA XR OLED & Full Array LED TVs",
            "commonIssues": [
              "Red LED blinking error code (e.g., 6 blinks)",
              "Google TV system loop",
              "HDMI eARC sound drop"
            ],
            "diagnosticSteps": [
              "Count red LED flash sequence code",
              "Check backlight inverter voltage",
              "Test HDMI eARC port handshake"
            ],
            "requiredTools": [
              "Multimeter",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Main Board",
              "Power Supply Board",
              "T-Con Board"
            ],
            "repairSummary": [
              "Replace T-Con board or mainboard based on LED diagnostic code."
            ]
          }
        ]
      },
      {
        "id": "panasonic_tv",
        "name": "Panasonic",
        "sizes": [
          {
            "id": "panasonic_tv_device",
            "name": "OLED & VIERA Smart TVs",
            "commonIssues": [
              "Power red light 7 blinks (SD/SU/P board)",
              "HDMI port input dead",
              "Panel vertical line"
            ],
            "diagnosticSteps": [
              "Check 7-blink code diagnostic tree",
              "Inspect HDMI IC chip",
              "Test ribbon flex connectors"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron"
            ],
            "commonParts": [
              "P-Board Power Supply",
              "Main A-Board",
              "T-Con Board"
            ],
            "repairSummary": [
              "Replace P-Board power supply and service main input board."
            ]
          }
        ]
      },
      {
        "id": "philips_tv",
        "name": "Philips",
        "sizes": [
          {
            "id": "philips_tv_device",
            "name": "Ambilight OLED & LED Smart TVs",
            "commonIssues": [
              "Ambilight LED controller failure",
              "Power board fuse blown",
              "Android TV boot loop"
            ],
            "diagnosticSteps": [
              "Test Ambilight LED channel power rail",
              "Check power board input fuse",
              "Test mainboard voltage regulators"
            ],
            "requiredTools": [
              "Multimeter",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Power Board",
              "Ambilight Driver Board",
              "Mainboard"
            ],
            "repairSummary": [
              "Replace power board input fuse and service Ambilight driver controller."
            ]
          }
        ]
      },
      {
        "id": "sharp_tv",
        "name": "Sharp",
        "sizes": [
          {
            "id": "sharp_tv_device",
            "name": "AQUOS 4K Smart TVs",
            "commonIssues": [
              "Backlight flash then dark",
              "Power supply capacitor bulging",
              "Remote sensor dead"
            ],
            "diagnosticSteps": [
              "Inspect electrolytic capacitors on power board",
              "Test backlight inverter output",
              "Check IR receiver board"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron"
            ],
            "commonParts": [
              "Power Board Capacitors",
              "Backlight Inverter",
              "Mainboard"
            ],
            "repairSummary": [
              "Replace swollen power supply capacitors and restore backlight circuit."
            ]
          }
        ]
      },
      {
        "id": "toshiba_tv",
        "name": "Toshiba",
        "sizes": [
          {
            "id": "toshiba_tv_device",
            "name": "Fire TV & REGZA Smart TVs",
            "commonIssues": [
              "Fire OS stuck on logo",
              "No display picture but sound plays",
              "WiFi module disconnected"
            ],
            "diagnosticSteps": [
              "Test backlight LED voltage",
              "Check WiFi USB module harness",
              "Perform Fire TV forced hardware reset"
            ],
            "requiredTools": [
              "Multimeter",
              "Screwdriver Set"
            ],
            "commonParts": [
              "LED Backlight Array",
              "WiFi Module",
              "Mainboard"
            ],
            "repairSummary": [
              "Replace failed LED backlight strips and swap internal WiFi module."
            ]
          }
        ]
      },
      {
        "id": "bang_olufsen",
        "name": "Bang & Olufsen",
        "sizes": [
          {
            "id": "bang_olufsen_device",
            "name": "B&O Beovision TVs & Beosound Speakers",
            "commonIssues": [
              "Motorized floor stand gear jammed",
              "Acoustic lens driver non-responsive",
              "Power supply standby error"
            ],
            "diagnosticSteps": [
              "Check motorized stand mechanical gear drive",
              "Test acoustic lens driver coil resistance",
              "Measure standby rails"
            ],
            "requiredTools": [
              "Precision Screwdriver Set",
              "Multimeter",
              "Torx Drivers"
            ],
            "commonParts": [
              "Motorized Stand Gearbox",
              "Amplifier Module",
              "Power Supply Board"
            ],
            "repairSummary": [
              "Service motorized stand gearbox and replace faulty amplifier driver module."
            ]
          }
        ]
      },
      {
        "id": "tcl_tv",
        "name": "TCL",
        "sizes": [
          {
            "id": "tcl_tv_device",
            "name": "Google TV & Roku TV Series",
            "commonIssues": [
              "Roku TV recovery mode loop",
              "Backlight LED total failure",
              "Power supply board short"
            ],
            "diagnosticSteps": [
              "Test LED backlight array voltage",
              "Perform hard reset button sequence",
              "Measure power board output"
            ],
            "requiredTools": [
              "Multimeter",
              "Suction Cups",
              "Screwdriver Set"
            ],
            "commonParts": [
              "LED Backlight Strips",
              "Power Supply Board",
              "Mainboard"
            ],
            "repairSummary": [
              "Replace failed backlight LED strips and re-initialize Roku TV firmware."
            ]
          }
        ]
      },
      {
        "id": "hisense_tv",
        "name": "Hisense",
        "sizes": [
          {
            "id": "hisense_tv_device",
            "name": "ULED 4K & VIDAA Smart TVs",
            "commonIssues": [
              "VIDAA OS bootloop",
              "Backlight screen blank",
              "Audio distortion"
            ],
            "diagnosticSteps": [
              "Check backlight inverter rails",
              "Test mainboard power regulators",
              "Inspect speaker cone"
            ],
            "requiredTools": [
              "Multimeter",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Mainboard",
              "Power Board",
              "Backlight Array"
            ],
            "repairSummary": [
              "Replace mainboard and install new LED backlight array."
            ]
          }
        ]
      },
      {
        "id": "xiaomi_tv",
        "name": "Xiaomi",
        "sizes": [
          {
            "id": "xiaomi_tv_device",
            "name": "Mi TV & TV Box Series",
            "commonIssues": [
              "PatchWall OS stuck",
              "Bluetooth remote disconnect",
              "Power supply board dead"
            ],
            "diagnosticSteps": [
              "Test power supply output rails",
              "Re-pair Bluetooth remote",
              "Check mainboard boot pins"
            ],
            "requiredTools": [
              "Multimeter",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Power Supply Board",
              "Mainboard",
              "Bluetooth Module"
            ],
            "repairSummary": [
              "Replace power supply board and reset PatchWall OS."
            ]
          }
        ]
      },
      {
        "id": "vizio",
        "name": "Vizio",
        "sizes": [
          {
            "id": "vizio_device",
            "name": "SmartCast Quantum 4K TVs",
            "commonIssues": [
              "SmartCast splash screen freeze",
              "Power supply clicking",
              "Backlight vertical banding"
            ],
            "diagnosticSteps": [
              "Test power board capacitors",
              "Perform EEPROM mainboard reset",
              "Check LED driver board"
            ],
            "requiredTools": [
              "Multimeter",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Main Logic Board",
              "Power Supply Board",
              "LED Driver Board"
            ],
            "repairSummary": [
              "Replace mainboard and service power supply board."
            ]
          }
        ]
      },
      {
        "id": "sony_playstation",
        "name": "Sony PlayStation",
        "sizes": [
          {
            "id": "sony_playstation_device",
            "name": "PlayStation 5, PS4 Pro & PS VR2",
            "commonIssues": [
              "HDMI port pins bent / broken (PS5 / PS4)",
              "Overheating shutoff (Liquid metal / thermal pad issue)",
              "Optical disc drive read error",
              "DualSense drift"
            ],
            "diagnosticSteps": [
              "Inspect HDMI port connector pins under microscope",
              "Check APU liquid metal coverage",
              "Test laser diode lens"
            ],
            "requiredTools": [
              "Micro-soldering Station",
              "Torx T8 Security Screwdriver",
              "Multimeter"
            ],
            "commonParts": [
              "HDMI Port Socket",
              "Liquid Metal Compound",
              "Disc Laser Lens",
              "Joystick Potentiometer"
            ],
            "repairSummary": [
              "Solder new HDMI port socket onto motherboard and re-apply APU thermal liquid metal."
            ]
          }
        ]
      },
      {
        "id": "microsoft_xbox",
        "name": "Microsoft Xbox",
        "sizes": [
          {
            "id": "microsoft_xbox_device",
            "name": "Xbox Series X, Series S & Xbox One",
            "commonIssues": [
              "No video output / HDMI port damage",
              "Power supply unit sudden click-off",
              "SSD controller error",
              "Controller drift"
            ],
            "diagnosticSteps": [
              "Test HDMI retimer chip (Texas Instruments)",
              "Measure 12V PSU output rail",
              "Inspect M.2 NVMe SSD partition"
            ],
            "requiredTools": [
              "Torx T8/T10 Security",
              "Multimeter",
              "Micro-soldering Station"
            ],
            "commonParts": [
              "HDMI Retimer IC",
              "Internal Power Supply Unit",
              "Cooling Fan Assembly"
            ],
            "repairSummary": [
              "Replace damaged HDMI retimer IC and swap internal 12V power supply brick."
            ]
          }
        ]
      },
      {
        "id": "nintendo",
        "name": "Nintendo",
        "sizes": [
          {
            "id": "nintendo_device",
            "name": "Switch, Switch OLED, Lite & Wii U",
            "commonIssues": [
              "Joy-Con analog stick drift",
              "USB-C charging port bent pins / M92T36 IC short",
              "OLED screen ribbon loose",
              "Game card slot unreadable"
            ],
            "diagnosticSteps": [
              "Inspect USB-C port pins under microscope",
              "Test M92T36 power management IC capacitors for shorts",
              "Test Joy-Con potentiometer"
            ],
            "requiredTools": [
              "Tri-Wing Y00 Screwdriver",
              "Multimeter",
              "Micro-soldering Iron"
            ],
            "commonParts": [
              "Joy-Con Stick Module",
              "USB-C Port Socket",
              "M92T36 PMIC",
              "Game Card Reader Board"
            ],
            "repairSummary": [
              "Replace Joy-Con analog joystick module and solder new M92T36 power management chip."
            ]
          }
        ]
      },
      {
        "id": "jbl",
        "name": "JBL",
        "sizes": [
          {
            "id": "jbl_device",
            "name": "Boombox, Charge, Flip & Bar Soundbars",
            "commonIssues": [
              "Battery swollen / short battery life",
              "USB-C charging port ripped off board",
              "Passive radiator tear / speaker distortion"
            ],
            "diagnosticSteps": [
              "Test battery voltage under load",
              "Inspect USB-C solder pads",
              "Check speaker cone rubber surround"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Prying Tools"
            ],
            "commonParts": [
              "High-Capacity Battery Pack",
              "USB-C Charging Board",
              "Speaker Driver Unit"
            ],
            "repairSummary": [
              "Replace swollen internal battery pack and solder new USB-C charging board."
            ]
          }
        ]
      },
      {
        "id": "bose",
        "name": "Bose",
        "sizes": [
          {
            "id": "bose_device",
            "name": "Wave, SoundLink, QuietComfort & Smart Soundbars",
            "commonIssues": [
              "Red battery error light (SoundLink)",
              "Soundbar eARC HDMI handshake fail",
              "Active Noise Cancelling mic feedback"
            ],
            "diagnosticSteps": [
              "Test battery BMS cell balance",
              "Check eARC HDMI board firmware",
              "Clean ANC microphone grilles"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Torx Kit"
            ],
            "commonParts": [
              "Battery Board Unit",
              "HDMI Interface Board",
              "ANC Microphone Assembly"
            ],
            "repairSummary": [
              "Replace SoundLink battery controller board and service soundbar HDMI board."
            ]
          }
        ]
      },
      {
        "id": "sonos",
        "name": "Sonos",
        "sizes": [
          {
            "id": "sonos_device",
            "name": "Arc, Beam, Move, Era & Sub",
            "commonIssues": [
              "WiFi mesh setup fail / chime code failure",
              "Power supply board short",
              "Touch control panel non-responsive"
            ],
            "diagnosticSteps": [
              "Test internal WiFi module antenna continuity",
              "Measure power board DC rails",
              "Inspect capacitive touch flex"
            ],
            "requiredTools": [
              "Torx T6/T8 Screwdriver",
              "Multimeter"
            ],
            "commonParts": [
              "Power Supply Module",
              "WiFi Card Module",
              "Main Control Board"
            ],
            "repairSummary": [
              "Replace internal power supply module and re-initialize Sonos mesh network card."
            ]
          }
        ]
      },
      {
        "id": "yamaha_audio",
        "name": "Yamaha Audio",
        "sizes": [
          {
            "id": "yamaha_audio_device",
            "name": "AV Receivers, Soundbars & HiFi Speakers",
            "commonIssues": [
              "AV Receiver protection mode trigger (PS1/PS2 PRT)",
              "HDMI board pass-through dead",
              "Subwoofer output dead"
            ],
            "diagnosticSteps": [
              "Check speaker terminal DC offset voltage",
              "Inspect HDMI switching IC",
              "Test power amplifier transistors"
            ],
            "requiredTools": [
              "Multimeter",
              "Oscilloscope",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Power Transistors",
              "HDMI Board",
              "Capacitor Bank"
            ],
            "repairSummary": [
              "Clear receiver protection code history and replace shorted output power transistors."
            ]
          }
        ]
      },
      {
        "id": "denon",
        "name": "Denon",
        "sizes": [
          {
            "id": "denon_device",
            "name": "AVR Receivers & Home Theater Systems",
            "commonIssues": [
              "Protection mode flashing red light",
              "HDMI 2.1 8K board no signal",
              "Volume knob encoder jumping"
            ],
            "diagnosticSteps": [
              "Measure amplifier output transistor DC bias",
              "Test HDMI 2.1 board power supply",
              "Clean rotary encoder switch"
            ],
            "requiredTools": [
              "Multimeter",
              "Contact Cleaner",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Amplifier Transistors",
              "HDMI 2.1 Board",
              "Rotary Encoder"
            ],
            "repairSummary": [
              "Replace shorted channel power transistors and clean master volume rotary encoder."
            ]
          }
        ]
      },
      {
        "id": "harman_kardon",
        "name": "Harman Kardon",
        "sizes": [
          {
            "id": "harman_kardon_device",
            "name": "Aura, Onyx Studio & Receivers",
            "commonIssues": [
              "Bluetooth pairing loop",
              "Internal battery dead (Onyx Studio)",
              "Subwoofer crackle"
            ],
            "diagnosticSteps": [
              "Test battery voltage output",
              "Check Bluetooth antenna trace",
              "Inspect subwoofer voice coil"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Prying Tools"
            ],
            "commonParts": [
              "Replacement Battery",
              "Bluetooth Module",
              "Subwoofer Driver"
            ],
            "repairSummary": [
              "Replace internal rechargeable battery pack and service bluetooth receiver board."
            ]
          }
        ]
      },
      {
        "id": "marshall",
        "name": "Marshall",
        "sizes": [
          {
            "id": "marshall_device",
            "name": "Stanmore, Woburn, Emberton & Major",
            "commonIssues": [
              "Power toggle switch mechanical break",
              "Aux 3.5mm jack loose",
              "Bluetooth audio dropouts"
            ],
            "diagnosticSteps": [
              "Test toggle switch contact continuity",
              "Inspect 3.5mm jack solder joints",
              "Test Bluetooth antenna"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Power Toggle Switch",
              "3.5mm Jack Board",
              "Bluetooth Board"
            ],
            "repairSummary": [
              "Replace brass power toggle switch and solder new 3.5mm auxiliary input board."
            ]
          }
        ]
      },
      {
        "id": "anker_soundcore",
        "name": "Anker Soundcore",
        "sizes": [
          {
            "id": "anker_soundcore_device",
            "name": "Soundcore Motion, Boom & Liberty Earbuds",
            "commonIssues": [
              "Charging case battery non-responsive",
              "Speaker passive radiator rattle",
              "Earbud pogo pin charging fail"
            ],
            "diagnosticSteps": [
              "Clean earbud pogo pin contacts with isopropyl alcohol",
              "Test case battery cell voltage",
              "Inspect speaker surround"
            ],
            "requiredTools": [
              "Multimeter",
              "Tweezers",
              "Alcohol Wipe"
            ],
            "commonParts": [
              "Charging Case Battery",
              "Earbud Battery Cell",
              "Speaker Driver"
            ],
            "repairSummary": [
              "Clean corroded charging pogo pins and replace charging case lithium cell."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "climate_control",
    "name": "Climate Control & Air Quality",
    "description": "Inverter Air Conditioners, Split Units, Heat Pumps, Space Heaters, Dehumidifiers, Purifiers & Fans covering Daikin, Mitsubishi, Carrier, Trane, Lennox, LG, Samsung, Panasonic, Gree, Midea, Dyson, Honeywell, DeLonghi, Vornado, Lasko and more",
    "icon": "Wrench",
    "brands": [
      {
        "id": "daikin",
        "name": "Daikin",
        "sizes": [
          {
            "id": "daikin_device",
            "name": "Inverter Split AC & Heat Pumps",
            "commonIssues": [
              "E4/U4 communication error code between indoor and outdoor unit",
              "Refrigerant R32/R410A micro-leakage",
              "Blower wheel motor failure",
              "Drain pan overflow"
            ],
            "diagnosticSteps": [
              "Measure communication wire voltage (0-50V DC pulse)",
              "Check refrigerant pressure with manifold gauge",
              "Test indoor fan motor winding resistance"
            ],
            "requiredTools": [
              "Manifold Gauge Set",
              "Multimeter",
              "Leak Detector Probe"
            ],
            "commonParts": [
              "Inverter PCB Board",
              "Expansion Valve",
              "Blower Fan Motor"
            ],
            "repairSummary": [
              "Locate and seal micro-refrigerant leak, evacuate system, and replace inverter PCB controller board."
            ]
          }
        ]
      },
      {
        "id": "mitsubishi_electric",
        "name": "Mitsubishi Electric",
        "sizes": [
          {
            "id": "mitsubishi_electric_device",
            "name": "Mitsubishi Mr Slim & Multi-Split ACs",
            "commonIssues": [
              "P8 pipe temperature thermistor fault",
              "Compressor frequency drive overload",
              "Louver step motor clicking"
            ],
            "diagnosticSteps": [
              "Measure thermistor resistance (10k ohm at 25C)",
              "Check outdoor inverter IPM power module",
              "Inspect louver gear teeth"
            ],
            "requiredTools": [
              "Multimeter",
              "Thermistor Tester",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Pipe Thermistor Sensor",
              "Outdoor IPM Board",
              "Louver Step Motor"
            ],
            "repairSummary": [
              "Replace pipe temperature thermistor and install new outdoor inverter IPM module."
            ]
          }
        ]
      },
      {
        "id": "carrier",
        "name": "Carrier",
        "sizes": [
          {
            "id": "carrier_device",
            "name": "Comfort & Infinity Series HVAC Systems",
            "commonIssues": [
              "Inducer draft motor fail / pressure switch open",
              "Ignitor coil open circuit",
              "Blower capacitor blown"
            ],
            "diagnosticSteps": [
              "Check draft inducer motor current",
              "Test silicon nitride ignitor resistance",
              "Measure dual run capacitor microfarads"
            ],
            "requiredTools": [
              "Capacitance Meter",
              "Multimeter",
              "Nut Driver Set"
            ],
            "commonParts": [
              "Pressure Switch",
              "Silicon Ignitor",
              "Dual Run Capacitor"
            ],
            "repairSummary": [
              "Replace pressure switch and swap dual run motor capacitor."
            ]
          }
        ]
      },
      {
        "id": "trane",
        "name": "Trane",
        "sizes": [
          {
            "id": "trane_device",
            "name": "XR & XV Series Heat Pumps & Furnaces",
            "commonIssues": [
              "Thermal expansion valve (TXV) stuck closed",
              "Contactor coil burnt out",
              "Flame sensor oxidized"
            ],
            "diagnosticSteps": [
              "Check superheat and subcooling readings",
              "Measure 24V contactor coil continuity",
              "Clean flame sensor rod with steel wool"
            ],
            "requiredTools": [
              "Manifold Gauges",
              "Multimeter",
              "Steel Wool"
            ],
            "commonParts": [
              "TXV Valve",
              "24V Contactor",
              "Flame Sensor Rod"
            ],
            "repairSummary": [
              "Clean flame sensor rod, replace 24V contactor, and adjust TXV metering valve."
            ]
          }
        ]
      },
      {
        "id": "lennox",
        "name": "Lennox",
        "sizes": [
          {
            "id": "lennox_device",
            "name": "Elite & Dave Lennox Signature HVAC",
            "commonIssues": [
              "Diagnostic LED code 13 (limit switch open)",
              "Variable speed ECM blower motor failure",
              "Defrost board relay stuck"
            ],
            "diagnosticSteps": [
              "Inspect high-limit switch continuity",
              "Test ECM motor signal harness",
              "Test defrost sensor resistance"
            ],
            "requiredTools": [
              "Multimeter",
              "ECM Motor Tester",
              "Screw Drivers"
            ],
            "commonParts": [
              "High Limit Switch",
              "ECM Motor Controller",
              "Defrost Control Board"
            ],
            "repairSummary": [
              "Replace high-limit switch and swap ECM blower motor control module."
            ]
          }
        ]
      },
      {
        "id": "lg_climate",
        "name": "LG Climate",
        "sizes": [
          {
            "id": "lg_climate_device",
            "name": "LG Artcool & DUAL Inverter AC Units",
            "commonIssues": [
              "CH05 communication error",
              "Condensate pump failure",
              "Display panel unresponsive"
            ],
            "diagnosticSteps": [
              "Test indoor-outdoor signal line voltage",
              "Check condensate float switch continuity",
              "Inspect display ribbon"
            ],
            "requiredTools": [
              "Multimeter",
              "Pliers",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Communication PCB",
              "Condensate Pump",
              "Display Board"
            ],
            "repairSummary": [
              "Replace outdoor communication PCB and service internal condensate pump switch."
            ]
          }
        ]
      },
      {
        "id": "samsung_climate",
        "name": "Samsung Climate",
        "sizes": [
          {
            "id": "samsung_climate_device",
            "name": "Samsung WindFree & Inverter AC Systems",
            "commonIssues": [
              "E101 / E201 communication fault",
              "WindFree micro-holes clogged",
              "Compressor thermal cutout"
            ],
            "diagnosticSteps": [
              "Check signal wiring between units",
              "Clean micro-hole panel with compressed air",
              "Measure compressor winding resistance"
            ],
            "requiredTools": [
              "Multimeter",
              "Compressed Air",
              "Pressure Gauge"
            ],
            "commonParts": [
              "Main Inverter Board",
              "Compressor Capacitor",
              "Temperature Sensor"
            ],
            "repairSummary": [
              "Replace inverter control board and clean WindFree panel micro-louvers."
            ]
          }
        ]
      },
      {
        "id": "panasonic_climate",
        "name": "Panasonic Climate",
        "sizes": [
          {
            "id": "panasonic_climate_device",
            "name": "Panasonic Etherea & Inverter Split Systems",
            "commonIssues": [
              "H11 communication error",
              "Econavi sensor lens dirty",
              "Outdoor fan motor seized"
            ],
            "diagnosticSteps": [
              "Measure DC voltage pulse on terminal 3",
              "Clean Econavi sensor optics",
              "Test outdoor motor bearings"
            ],
            "requiredTools": [
              "Multimeter",
              "Cleaning Brush"
            ],
            "commonParts": [
              "Indoor Main Board",
              "Outdoor Fan Motor",
              "Econavi Sensor"
            ],
            "repairSummary": [
              "Replace indoor main control board and install new outdoor fan motor assembly."
            ]
          }
        ]
      },
      {
        "id": "gree",
        "name": "Gree",
        "sizes": [
          {
            "id": "gree_device",
            "name": "Crown, Sapphire & Livo Inverter ACs",
            "commonIssues": [
              "E6 communication code",
              "H6 indoor fan motor feedback error",
              "F1 evaporator sensor fault"
            ],
            "diagnosticSteps": [
              "Test communication cable isolation",
              "Check Hall sensor feedback signal",
              "Measure evaporator sensor resistance"
            ],
            "requiredTools": [
              "Multimeter",
              "Oscilloscope"
            ],
            "commonParts": [
              "Main PCB Assembly",
              "Evaporator Sensor",
              "Fan Motor"
            ],
            "repairSummary": [
              "Replace main control PCB board and swap evaporator thermistor sensor."
            ]
          }
        ]
      },
      {
        "id": "midea_climate",
        "name": "Midea Climate",
        "sizes": [
          {
            "id": "midea_climate_device",
            "name": "Midea Mission, Breezeless & Window ACs",
            "commonIssues": [
              "E1 EEPROM error",
              "EC refrigerant leakage detection code",
              "Drain pan overflow switch trip"
            ],
            "diagnosticSteps": [
              "Reflash or replace EEPROM mainboard",
              "Inspect coil for oil stains / leaks",
              "Clean drain hose blockage"
            ],
            "requiredTools": [
              "Multimeter",
              "Refrigerant Leak Probe"
            ],
            "commonParts": [
              "EEPROM Mainboard",
              "Drain Hose",
              "Evaporator Coil"
            ],
            "repairSummary": [
              "Replace mainboard EEPROM unit and clear drain hose condensate obstruction."
            ]
          }
        ]
      },
      {
        "id": "dyson_climate",
        "name": "Dyson Climate",
        "sizes": [
          {
            "id": "dyson_climate_device",
            "name": "Dyson Pure Cool, Hot+Cool & Humidify Fans",
            "commonIssues": [
              "H2 / E error code (HEPA filter seal / motor fault)",
              "PTC heating element thermal fuse blown",
              "Oscillation stepper motor grinding"
            ],
            "diagnosticSteps": [
              "Inspect HEPA filter micro-switch sensor",
              "Test thermal fuse on PTC ceramic heater",
              "Check oscillation gear alignment"
            ],
            "requiredTools": [
              "Torx T8/T10 Screwdriver",
              "Multimeter"
            ],
            "commonParts": [
              "PTC Heating Element",
              "Oscillation Motor",
              "HEPA Sensor Board"
            ],
            "repairSummary": [
              "Replace PTC heating element thermal fuse and repair oscillation gear mechanism."
            ]
          }
        ]
      },
      {
        "id": "honeywell_climate",
        "name": "Honeywell",
        "sizes": [
          {
            "id": "honeywell_climate_device",
            "name": "Smart Thermostats, Heaters & Dehumidifiers",
            "commonIssues": [
              "Thermostat C-wire power loss / Wi-Fi dropouts",
              "Dehumidifier humidistat calibration drift",
              "Ceramic heater tip-over switch stuck"
            ],
            "diagnosticSteps": [
              "Measure 24VAC across R and C terminals",
              "Test humidistat sensor accuracy",
              "Inspect mechanical tip-over switch"
            ],
            "requiredTools": [
              "Multimeter",
              "Wire Strippers"
            ],
            "commonParts": [
              "Power Extender Kit (PEK)",
              "Humidistat Sensor Module",
              "Tip-Over Switch"
            ],
            "repairSummary": [
              "Install C-wire Power Extender Kit (PEK) and replace faulty tip-over safety switch."
            ]
          }
        ]
      },
      {
        "id": "delonghi_climate",
        "name": "DeLonghi",
        "sizes": [
          {
            "id": "delonghi_climate_device",
            "name": "Pinguino Portable ACs & Radiators",
            "commonIssues": [
              "Pinguino FT full tank error / float switch stuck",
              "Oil-filled radiator thermal fuse blown",
              "Exhaust hose coupler cracked"
            ],
            "diagnosticSteps": [
              "Inspect condensate float switch and drain valve",
              "Test radiator thermal fuse continuity",
              "Check plastic coupler tabs"
            ],
            "requiredTools": [
              "Multimeter",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Condensate Float Switch",
              "Thermal Cutoff Fuse",
              "Exhaust Hose Kit"
            ],
            "repairSummary": [
              "Replace condensate float switch and install new thermal cutoff fuse."
            ]
          }
        ]
      },
      {
        "id": "vornado",
        "name": "Vornado",
        "sizes": [
          {
            "id": "vornado_device",
            "name": "Air Circulators, Tower Fans & Heaters",
            "commonIssues": [
              "Vortex blade motor shaft gummed / stiff",
              "Thermal fuse open in motor winding",
              "Speed selector switch contacts oxidized"
            ],
            "diagnosticSteps": [
              "Spin motor shaft by hand for bearing drag",
              "Test motor thermal fuse",
              "Check speed switch continuity"
            ],
            "requiredTools": [
              "Multimeter",
              "3-in-1 Oil",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Thermal Fuse",
              "Motor Bearings",
              "Speed Selector Switch"
            ],
            "repairSummary": [
              "Lubricate motor sleeve bearings, replace blown inline thermal fuse, and clean switch contacts."
            ]
          }
        ]
      },
      {
        "id": "lasko",
        "name": "Lasko",
        "sizes": [
          {
            "id": "lasko_device",
            "name": "Tower Fans, Ceramic Heaters & Box Fans",
            "commonIssues": [
              "Blown thermal fuse in plug / motor",
              "Oscillating motor gears stripped",
              "Touch panel buttons unresponsive"
            ],
            "diagnosticSteps": [
              "Test safety fuse inside AC line plug",
              "Inspect oscillation motor gearbox",
              "Check touch panel PCB trace"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Fused AC Plug",
              "Oscillating Motor",
              "Touch Control PCB"
            ],
            "repairSummary": [
              "Replace fused AC power plug and swap stripped oscillation motor unit."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "laundry_cleaning",
    "name": "Laundry & Cleaning",
    "description": "Washing Machines, Tumble Dryers, Robot Vacuums, Cordless Stick Vacuums, Carpet Cleaners & Pressure Washers covering Whirlpool, Maytag, LG, Samsung, Bosch, Miele, Speed Queen, GE, Electrolux, Dyson, Shark, Roomba, Bissell, Hoover, Roborock, Ecovacs, Karcher and more",
    "icon": "Wrench",
    "brands": [
      {
        "id": "whirlpool_laundry",
        "name": "Whirlpool",
        "sizes": [
          {
            "id": "whirlpool_laundry_device",
            "name": "Cabrio, Duet & LoadGo Washers & Dryers",
            "commonIssues": [
              "Washer F0E2 over-suds code / drain pump obstruction",
              "Dryer thermal fuse blown / no heat",
              "Drive belt snapped / idler pulley seized",
              "Door lock switch error"
            ],
            "diagnosticSteps": [
              "Inspect drain pump filter for foreign objects",
              "Test dryer thermal fuse continuity with multimeter",
              "Inspect drive belt and motor coupling"
            ],
            "requiredTools": [
              "Multimeter",
              "Nut Driver Set",
              "Putty Knife"
            ],
            "commonParts": [
              "Thermal Fuse",
              "Drain Pump Assembly",
              "Drive Belt",
              "Door Lock Switch"
            ],
            "repairSummary": [
              "Replace blown thermal fuse, clear coin trap in drain pump, and install fresh drive belt."
            ]
          }
        ]
      },
      {
        "id": "maytag",
        "name": "Maytag",
        "sizes": [
          {
            "id": "maytag_device",
            "name": "Commercial Grade & Commercial Technology Washers",
            "commonIssues": [
              "Braking system drag / spin basket slow",
              "Transmission oil leak / agitator strip",
              "Water inlet valve solenoid short"
            ],
            "diagnosticSteps": [
              "Test drive motor capacitor",
              "Inspect tub drive hub gear teeth",
              "Measure water valve solenoid coils"
            ],
            "requiredTools": [
              "Multimeter",
              "Spanner Wrench",
              "Socket Set"
            ],
            "commonParts": [
              "Drive Hub Kit",
              "Water Inlet Valve",
              "Shift Actuator"
            ],
            "repairSummary": [
              "Replace stripped tub drive hub kit and install new water inlet valve assembly."
            ]
          }
        ]
      },
      {
        "id": "lg_laundry",
        "name": "LG Laundry",
        "sizes": [
          {
            "id": "lg_laundry_device",
            "name": "LG ThinQ Front Load Washers, Dryers & WashTower",
            "commonIssues": [
              "OE error code (drain pump blocked / failed)",
              "UE unbalanced load code (hall sensor / shock absorber wear)",
              "LE error code (Direct Drive motor stator hall sensor failed)",
              "tE thermistor fault"
            ],
            "diagnosticSteps": [
              "Measure Direct Drive motor hall sensor pin resistance",
              "Check drain pump impeller for coins",
              "Test tub suspension rods"
            ],
            "requiredTools": [
              "Multimeter",
              "Socket Set",
              "Pliers"
            ],
            "commonParts": [
              "Direct Drive Hall Sensor",
              "Drain Pump Motor",
              "Tub Shock Absorbers"
            ],
            "repairSummary": [
              "Replace Direct Drive motor hall sensor module and install new tub shock absorbers."
            ]
          }
        ]
      },
      {
        "id": "samsung_laundry",
        "name": "Samsung Laundry",
        "sizes": [
          {
            "id": "samsung_laundry_device",
            "name": "Samsung ActiveWave & Bespoke Washers & Dryers",
            "commonIssues": [
              "3E motor error / hall sensor fault",
              "4E water supply error / valve screen clogged",
              "dc door open error / magnet missing",
              "Heater element shorted to casing"
            ],
            "diagnosticSteps": [
              "Test heater element resistance (approx 10-20 ohms)",
              "Inspect water inlet filter screen",
              "Test door latch reed switch"
            ],
            "requiredTools": [
              "Multimeter",
              "Phillips Screwdriver",
              "Pliers"
            ],
            "commonParts": [
              "Heating Element Assembly",
              "Door Latch Switch",
              "Drain Pump"
            ],
            "repairSummary": [
              "Replace shorted heating element assembly and clean water inlet valve screens."
            ]
          }
        ]
      },
      {
        "id": "bosch_laundry",
        "name": "Bosch Laundry",
        "sizes": [
          {
            "id": "bosch_laundry_device",
            "name": "Bosch Serie 4, 6, 8 & HomeProfessional Washers",
            "commonIssues": [
              "E18 drain time exceeded / pump blocked",
              "E23 aquaStop leak pan sensor triggered",
              "Carbon brushes worn on drive motor"
            ],
            "diagnosticSteps": [
              "Inspect aquaStop bottom tray for water leak",
              "Check drive motor carbon brush length (min 10mm)",
              "Clean pump filter"
            ],
            "requiredTools": [
              "Multimeter",
              "Torx T20 Screwdriver",
              "Pliers"
            ],
            "commonParts": [
              "Motor Carbon Brushes",
              "AquaStop Hose Valve",
              "Drain Pump"
            ],
            "repairSummary": [
              "Replace worn motor carbon brushes and clear aquaStop floor pan sensor."
            ]
          }
        ]
      },
      {
        "id": "miele_laundry",
        "name": "Miele",
        "sizes": [
          {
            "id": "miele_laundry_device",
            "name": "Honeycomb Care Washers & Heat Pump Dryers",
            "commonIssues": [
              "Waterproof system fault (F20)",
              "Heat pump lint exchanger clogged",
              "Drum shock absorber worn"
            ],
            "diagnosticSteps": [
              "Inspect bottom tray float sensor",
              "Clean heat pump condenser fins with fin comb",
              "Check damper resistance"
            ],
            "requiredTools": [
              "Torx Screwdriver Set",
              "Fin Comb",
              "Multimeter"
            ],
            "commonParts": [
              "Waterproof Float Sensor",
              "Condensate Pump",
              "Drum Dampers"
            ],
            "repairSummary": [
              "Service heat pump condenser coils, replace drum dampers, and reset Waterproof system."
            ]
          }
        ]
      },
      {
        "id": "speed_queen",
        "name": "Speed Queen",
        "sizes": [
          {
            "id": "speed_queen_device",
            "name": "TC5, TR7 & Commercial Washers",
            "commonIssues": [
              "Drive belt slipping",
              "Timer control gear stripped",
              "Water level pressure switch out of calibration"
            ],
            "diagnosticSteps": [
              "Inspect heavy-duty drive belt tension",
              "Test mechanical timer contacts",
              "Check pressure switch hose"
            ],
            "requiredTools": [
              "Multimeter",
              "Wrench Set"
            ],
            "commonParts": [
              "Drive Belt",
              "Timer Assembly",
              "Pressure Switch"
            ],
            "repairSummary": [
              "Replace drive belt and service mechanical timer control module."
            ]
          }
        ]
      },
      {
        "id": "ge_laundry",
        "name": "GE Appliances",
        "sizes": [
          {
            "id": "ge_laundry_device",
            "name": "GE Ultrafresh Vent System Washers & Dryers",
            "commonIssues": [
              "E22 drain timeout code",
              "Ultrafresh door gasket mold / fan fail",
              "Dryer ignitor open circuit"
            ],
            "diagnosticSteps": [
              "Inspect door vent fan motor",
              "Test gas dryer glow bar ignitor resistance",
              "Check pump impeller"
            ],
            "requiredTools": [
              "Multimeter",
              "Putty Knife",
              "Socket Set"
            ],
            "commonParts": [
              "Gas Dryer Ignitor",
              "Door Vent Fan",
              "Drain Pump"
            ],
            "repairSummary": [
              "Replace gas dryer ignitor bar and service Ultrafresh door vent fan."
            ]
          }
        ]
      },
      {
        "id": "electrolux_laundry",
        "name": "Electrolux",
        "sizes": [
          {
            "id": "electrolux_laundry_device",
            "name": "LuxCare & Titanium Washers",
            "commonIssues": [
              "E11 water fill timeout",
              "Door lock solenoid buzzing",
              "Blower motor bearing noise"
            ],
            "diagnosticSteps": [
              "Measure water inlet valve coil resistance",
              "Inspect door lock solenoid strike",
              "Test blower motor bearings"
            ],
            "requiredTools": [
              "Multimeter",
              "Torx Drivers"
            ],
            "commonParts": [
              "Water Inlet Valve",
              "Door Lock Solenoid",
              "Blower Motor"
            ],
            "repairSummary": [
              "Replace door lock solenoid assembly and install new water inlet valve."
            ]
          }
        ]
      },
      {
        "id": "dyson_vacuum",
        "name": "Dyson Clean",
        "sizes": [
          {
            "id": "dyson_vacuum_device",
            "name": "Dyson V8, V10, V11, V15 Detect & Gen5detect",
            "commonIssues": [
              "Pulsing motor noise (airflow obstruction / filter dirty)",
              "Trigger switch broken (V10/V11 internal plastic tab snapped)",
              "Cleaner head roller bar stall",
              "Battery LED red flashing 12 times"
            ],
            "diagnosticSteps": [
              "Check HEPA filter micro-switch seating",
              "Inspect internal trigger plastic lever",
              "Measure battery cell voltage balance"
            ],
            "requiredTools": [
              "Torx T8 Screwdriver",
              "Multimeter",
              "Spudger"
            ],
            "commonParts": [
              "Reinforced Trigger Switch",
              "Battery Pack Assembly",
              "Cleaner Head Motor"
            ],
            "repairSummary": [
              "Replace broken plastic trigger switch with reinforced assembly and swap battery pack module."
            ]
          }
        ]
      },
      {
        "id": "shark_clean",
        "name": "Shark",
        "sizes": [
          {
            "id": "shark_clean_device",
            "name": "Vertex, Stratos, Navigator & IQ Robot",
            "commonIssues": [
              "DuoClean brush roller hair wrap / belt snapped",
              "Suction motor thermal cutoff trip",
              "Robot bumper sensor stuck"
            ],
            "diagnosticSteps": [
              "Check roller bar belt drive",
              "Clean suction motor inlet filter",
              "Inspect robot IR bumper switch"
            ],
            "requiredTools": [
              "Phillips Screwdriver",
              "Scissors",
              "Multimeter"
            ],
            "commonParts": [
              "Drive Belt",
              "HEPA Filter Kit",
              "Roller Bar Assembly"
            ],
            "repairSummary": [
              "Replace snapped drive belt and clean suction motor thermal protector filter."
            ]
          }
        ]
      },
      {
        "id": "irobot_roomba",
        "name": "iRobot",
        "sizes": [
          {
            "id": "irobot_roomba_device",
            "name": "Roomba j7+, s9+, i3 & Combo",
            "commonIssues": [
              "Error 14 (bin not detected / contacts dirty)",
              "Error 1 (left wheel stuck / gear broken)",
              "Clean Base suction clog / bag full sensor error"
            ],
            "diagnosticSteps": [
              "Clean dustbin gold spring contacts with alcohol",
              "Inspect wheel module drive gears",
              "Check Clean Base evacuation tube"
            ],
            "requiredTools": [
              "Phillips Screwdriver",
              "Alcohol Wipes",
              "Multimeter"
            ],
            "commonParts": [
              "Wheel Module",
              "Dustbin Contact Board",
              "Clean Base Evacuation Tube"
            ],
            "repairSummary": [
              "Clean gold dustbin contacts, replace worn wheel module, and clear evacuation tube."
            ]
          }
        ]
      },
      {
        "id": "bissell",
        "name": "Bissell",
        "sizes": [
          {
            "id": "bissell_device",
            "name": "CrossWave, Little Green & Revolution Carpet Cleaners",
            "commonIssues": [
              "Fluid pump motor dead / no spray",
              "Brush roll belt snapped",
              "Dirty water tank float switch stuck"
            ],
            "diagnosticSteps": [
              "Test 12V DC fluid pump motor voltage",
              "Inspect brush roll belt drive",
              "Clean float shutoff valve"
            ],
            "requiredTools": [
              "Screwdriver Set",
              "Multimeter"
            ],
            "commonParts": [
              "Fluid Pump Motor",
              "Brush Belt",
              "Water Tank Gasket"
            ],
            "repairSummary": [
              "Replace 12V fluid pump motor and install fresh brush drive belt."
            ]
          }
        ]
      },
      {
        "id": "hoover",
        "name": "Hoover",
        "sizes": [
          {
            "id": "hoover_device",
            "name": "SmartWash, WindTunnel & ONEPWR",
            "commonIssues": [
              "Auto-mix detergent valve clogged",
              "Suction fan impeller shattered",
              "ONEPWR battery BMS lock"
            ],
            "diagnosticSteps": [
              "Clean detergent valve orifice",
              "Inspect impeller fan blades",
              "Test ONEPWR battery voltage"
            ],
            "requiredTools": [
              "Phillips Screwdriver",
              "Multimeter"
            ],
            "commonParts": [
              "Impeller Fan",
              "ONEPWR Battery",
              "Detergent Valve"
            ],
            "repairSummary": [
              "Replace shattered suction fan impeller and clean detergent mix valve."
            ]
          }
        ]
      },
      {
        "id": "roborock",
        "name": "Roborock",
        "sizes": [
          {
            "id": "roborock_device",
            "name": "S7, S8 Ultra, Q Revo & Dyad",
            "commonIssues": [
              "Error 13 (charging error / dock contacts corroded)",
              "VibraRise mop lift mechanism jammed",
              "LDS LiDAR turret motor stall"
            ],
            "diagnosticSteps": [
              "Clean charging dock pogo pins",
              "Inspect VibraRise gear drive",
              "Measure LiDAR motor drive voltage (approx 3V)"
            ],
            "requiredTools": [
              "Precision Screwdriver",
              "Multimeter",
              "Alcohol Wipes"
            ],
            "commonParts": [
              "LiDAR Motor",
              "VibraRise Gearbox",
              "Dock Charging Contact"
            ],
            "repairSummary": [
              "Replace LDS LiDAR turret drive motor and clean dock charging contacts."
            ]
          }
        ]
      },
      {
        "id": "ecovacs",
        "name": "Ecovacs",
        "sizes": [
          {
            "id": "ecovacs_device",
            "name": "Deebot X1, T20 & N8 Pro",
            "commonIssues": [
              "LDS sensor error / spinning turret stuck",
              "Auto-empty station clog",
              "Drive wheel gear slip"
            ],
            "diagnosticSteps": [
              "Check LiDAR belt drive",
              "Clear auto-empty suction port",
              "Inspect wheel gearbox"
            ],
            "requiredTools": [
              "Phillips Screwdriver",
              "Multimeter"
            ],
            "commonParts": [
              "LiDAR Sensor Module",
              "Wheel Gearbox",
              "Auto-Empty Duct"
            ],
            "repairSummary": [
              "Replace LiDAR sensor module and service auto-empty suction duct."
            ]
          }
        ]
      },
      {
        "id": "karcher",
        "name": "Karcher",
        "sizes": [
          {
            "id": "karcher_device",
            "name": "K3, K4, K5 Pressure Washers & Steam Cleaners",
            "commonIssues": [
              "Unloader valve stuck / motor surging continuously",
              "High-pressure pump head cracked / leaking water",
              "Bypass switch short"
            ],
            "diagnosticSteps": [
              "Inspect unloader valve piston and O-rings",
              "Check plastic pump head for freeze cracks",
              "Test pressure switch"
            ],
            "requiredTools": [
              "Torx T25 Driver",
              "Silicon Grease",
              "Multimeter"
            ],
            "commonParts": [
              "Unloader Valve Kit",
              "Control Head Assembly",
              "High Pressure Seal Set"
            ],
            "repairSummary": [
              "Replace cracked control head assembly and lubricate unloader valve piston."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "personal_care",
    "name": "Personal Care & Grooming",
    "description": "Electric Shavers, Beard Trimmers, Hair Clippers, Hair Dryers, Stylers, Sonic Toothbrushes & Water Flossers covering Philips Norelco, Braun, Panasonic, Dyson Beauty, BaBylissPRO, Wahl, Andis, Waterpik, Oral-B, Sonicare and more",
    "icon": "Smartphone",
    "brands": [
      {
        "id": "philips_norelco",
        "name": "Philips Norelco",
        "sizes": [
          {
            "id": "philips_norelco_device",
            "name": "Norelco OneBlade, Series 9000 & Multigroom",
            "commonIssues": [
              "OneBlade drive shaft eccentric pin broken",
              "Shaver motor running slow / battery degraded",
              "Charging pogo pin corroded"
            ],
            "diagnosticSteps": [
              "Inspect eccentric drive motor pin under magnification",
              "Test internal NiMH/Li-ion cell voltage",
              "Clean charging socket"
            ],
            "requiredTools": [
              "Torx T6 Screwdriver",
              "Soldering Iron",
              "Multimeter"
            ],
            "commonParts": [
              "Drive Shaft Motor Assembly",
              "3.7V Li-ion Cell",
              "Shaver Head Ring"
            ],
            "repairSummary": [
              "Replace broken eccentric drive shaft motor assembly and solder fresh 3.7V cell."
            ]
          }
        ]
      },
      {
        "id": "braun_grooming",
        "name": "Braun",
        "sizes": [
          {
            "id": "braun_grooming_device",
            "name": "Series 9, Series 7, Silk-expert IPL & Trimmers",
            "commonIssues": [
              "Clean&Charge dock pump clogged",
              "Linear drive motor spring snapped",
              "Li-ion battery drain"
            ],
            "diagnosticSteps": [
              "Inspect Clean&Charge dock fluid tube",
              "Test linear motor coil resistance",
              "Measure battery cell voltage"
            ],
            "requiredTools": [
              "Torx T8 Screwdriver",
              "Multimeter",
              "Soldering Iron"
            ],
            "commonParts": [
              "Linear Motor Assembly",
              "Li-ion Battery Cell",
              "Clean&Charge Pump"
            ],
            "repairSummary": [
              "Replace linear motor drive assembly and clean dock fluid pump tube."
            ]
          }
        ]
      },
      {
        "id": "panasonic_grooming",
        "name": "Panasonic",
        "sizes": [
          {
            "id": "panasonic_grooming_device",
            "name": "Arc5, Arc6 & ER-GP80 Clippers",
            "commonIssues": [
              "Linear motor 14,000 CPM drive coil open",
              "Blade drive guide snap tab broken",
              "Battery dead"
            ],
            "diagnosticSteps": [
              "Measure linear drive coil resistance",
              "Inspect drive guide plastic arms",
              "Test lithium battery cell"
            ],
            "requiredTools": [
              "Precision Screwdriver",
              "Multimeter",
              "Soldering Station"
            ],
            "commonParts": [
              "Linear Drive Coil",
              "Blade Guide Arm",
              "Lithium Battery"
            ],
            "repairSummary": [
              "Replace linear motor drive coil assembly and swap blade guide arms."
            ]
          }
        ]
      },
      {
        "id": "dyson_beauty",
        "name": "Dyson Beauty",
        "sizes": [
          {
            "id": "dyson_beauty_device",
            "name": "Dyson Airwrap, Supersonic Dryer & Corrale",
            "commonIssues": [
              "Filter LED flashing red (airflow sensor / dirty filter)",
              "Thermal fuse open on heating element",
              "Flexible copper heater plate cracked (Corrale)"
            ],
            "diagnosticSteps": [
              "Clean magnetic filter mesh with brush",
              "Test thermal fuse on heating element ribbon",
              "Test Corrale OLED battery harness"
            ],
            "requiredTools": [
              "Torx T6/T8 Screwdriver",
              "Multimeter",
              "Cleaning Brush"
            ],
            "commonParts": [
              "Thermal Fuse Assembly",
              "Heating Element Board",
              "Filter Mesh Cover"
            ],
            "repairSummary": [
              "Clean micro-filter mesh and replace blown thermal fuse on heating element."
            ]
          }
        ]
      },
      {
        "id": "babylisspro",
        "name": "BaBylissPRO",
        "sizes": [
          {
            "id": "babylisspro_device",
            "name": "GoldFX, FX3 Clippers & Trimmers",
            "commonIssues": [
              "Ferrari-designed motor carbon brush wear",
              "T-blade drive cam rounded off",
              "Toggle switch loose"
            ],
            "diagnosticSteps": [
              "Inspect motor carbon brushes",
              "Check metal drive cam square notch",
              "Test toggle switch continuity"
            ],
            "requiredTools": [
              "Precision Screwdriver",
              "Multimeter"
            ],
            "commonParts": [
              "Drive Cam Module",
              "Motor Brush Set",
              "Toggle Switch"
            ],
            "repairSummary": [
              "Replace rounded blade drive cam module and install fresh motor carbon brushes."
            ]
          }
        ]
      },
      {
        "id": "wahl",
        "name": "Wahl",
        "sizes": [
          {
            "id": "wahl_device",
            "name": "Magic Clip, Senior, Detailer & Beret",
            "commonIssues": [
              "V5000 / V9000 electromagnetic motor hum / no blade swing",
              "Power tuning screw out of adjustment",
              "Rechargeable battery degraded"
            ],
            "diagnosticSteps": [
              "Adjust right-side power tuning screw for optimum stroke",
              "Check blade drive toggle arm",
              "Test battery cell"
            ],
            "requiredTools": [
              "Flathead Screwdriver",
              "Multimeter",
              "Soldering Iron"
            ],
            "commonParts": [
              "Power Tuning Screw Assembly",
              "Drive Toggle Arm",
              "Li-ion Battery"
            ],
            "repairSummary": [
              "Calibrate power tuning screw and replace worn blade drive toggle arm."
            ]
          }
        ]
      },
      {
        "id": "andis",
        "name": "Andis",
        "sizes": [
          {
            "id": "andis_device",
            "name": "Master, Slimline Pro & T-Outliner",
            "commonIssues": [
              "Rotary motor gear drive teeth stripped",
              "Blade drive tension spring missing",
              "Cord strain relief frayed"
            ],
            "diagnosticSteps": [
              "Inspect rotary motor nylon drive gear",
              "Check tension spring seating",
              "Test cord wire continuity"
            ],
            "requiredTools": [
              "Phillips Screwdriver",
              "Multimeter",
              "Wire Strippers"
            ],
            "commonParts": [
              "Nylon Drive Gear",
              "Blade Tension Spring",
              "AC Power Cord"
            ],
            "repairSummary": [
              "Replace nylon drive gear and install new AC power cord strain relief."
            ]
          }
        ]
      },
      {
        "id": "waterpik",
        "name": "Waterpik",
        "sizes": [
          {
            "id": "waterpik_device",
            "name": "Aquarius, Sonic-Fusion & Cordless Advanced",
            "commonIssues": [
              "Water pump motor humming but no pressure (valve diaphragm split)",
              "Hose / handle assembly cracked / leaking water",
              "Pressure dial potentiometer wiper corroded"
            ],
            "diagnosticSteps": [
              "Disassemble pump housing and check silicone check valve",
              "Inspect handle hose connection",
              "Measure pressure pot resistance"
            ],
            "requiredTools": [
              "Phillips Screwdriver",
              "Silicon Sealant",
              "Multimeter"
            ],
            "commonParts": [
              "Pump Diaphragm Valve Set",
              "Handle Hose Assembly",
              "Pressure Switch Board"
            ],
            "repairSummary": [
              "Replace split silicone pump diaphragm valve and install new handle hose assembly."
            ]
          }
        ]
      },
      {
        "id": "oral_b",
        "name": "Oral-B",
        "sizes": [
          {
            "id": "oral_b_device",
            "name": "IO Series & Genius Electric Toothbrushes",
            "commonIssues": [
              "Inductive charging coil disconnected",
              "Internal motor drive pin seal leaking water / corroded shaft",
              "Li-ion battery short"
            ],
            "diagnosticSteps": [
              "Test inductive charging coil AC voltage drop",
              "Inspect motor shaft rubber seal ring",
              "Test battery cell"
            ],
            "requiredTools": [
              "Spudger",
              "Soldering Station",
              "Multimeter"
            ],
            "commonParts": [
              "Motor Shaft Rubber Seal",
              "Li-ion Battery Cell",
              "Inductive Coil"
            ],
            "repairSummary": [
              "Replace motor shaft rubber seal ring and solder new Li-ion internal cell."
            ]
          }
        ]
      },
      {
        "id": "sonicare",
        "name": "Philips Sonicare",
        "sizes": [
          {
            "id": "sonicare_device",
            "name": "Sonicare DiamondClean, ProtectiveClean & ExpertClean",
            "commonIssues": [
              "Sonic drive magnet screw loose (loud buzzing / weak vibration)",
              "Top shaft rubber gasket torn / water damage",
              "PCB micro-switch shorted by moisture"
            ],
            "diagnosticSteps": [
              "Tighten sonic drive magnet metal screw",
              "Replace top rubber shaft gasket",
              "Clean PCB with contact cleaner"
            ],
            "requiredTools": [
              "Spudger",
              "Torx T8 Driver",
              "Contact Cleaner"
            ],
            "commonParts": [
              "Sonic Drive Screw & Bushing",
              "Top Shaft Gasket",
              "PCB Assembly"
            ],
            "repairSummary": [
              "Tighten loose sonic drive magnet screw and install new watertight top shaft gasket."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "home_office",
    "name": "Home Office & Computers",
    "description": "Laptops, Desktop PCs, MacBooks, Laser/Inkjet Printers, Uninterruptible Power Supplies (UPS) & Wi-Fi Routers covering HP, Dell, Lenovo, Apple Mac, ASUS, Acer, MSI, Epson, Canon, Brother, APC, CyberPower, Netgear, TP-Link and more",
    "icon": "Smartphone",
    "brands": [
      {
        "id": "hp_computers",
        "name": "HP",
        "sizes": [
          {
            "id": "hp_computers_device",
            "name": "Spectre, ENVY, Pavilion & LaserJet Printers",
            "commonIssues": [
              "LaserJet error 50.x fuser error (fuser heater open circuit)",
              "Paper pickup roller glazed / smooth",
              "Laptop battery swollen / CMOS reset loop"
            ],
            "diagnosticSteps": [
              "Measure fuser heating element resistance",
              "Clean pickup roller rubber with rubber rejuvenator",
              "Check laptop battery capacity"
            ],
            "requiredTools": [
              "Multimeter",
              "Torx Screwdriver",
              "Rubber Cleaner"
            ],
            "commonParts": [
              "Fuser Assembly",
              "Paper Pickup Roller Kit",
              "Laptop Battery"
            ],
            "repairSummary": [
              "Replace fuser assembly heater and install new rubber paper pickup roller kit."
            ]
          }
        ]
      },
      {
        "id": "dell",
        "name": "Dell",
        "sizes": [
          {
            "id": "dell_device",
            "name": "XPS, Latitude, Inspiron & Alienware",
            "commonIssues": [
              "AC adapter not recognized (center ID pin wire broken)",
              "BIOS battery coin cell dead",
              "Display hinge mount cracked from palmrest"
            ],
            "diagnosticSteps": [
              "Measure center ID pin voltage on DC jack (approx 3.3V)",
              "Check CR2032 coin cell voltage",
              "Inspect brass threaded insert bosses"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Epoxy Compound"
            ],
            "commonParts": [
              "DC Power Jack Cable",
              "CR2032 CMOS Battery",
              "LCD Screen Hinge Set"
            ],
            "repairSummary": [
              "Replace DC power jack cable and re-anchor display hinge threaded brass bosses."
            ]
          }
        ]
      },
      {
        "id": "lenovo_pc",
        "name": "Lenovo",
        "sizes": [
          {
            "id": "lenovo_pc_device",
            "name": "ThinkPad, Yoga, IdeaPad & Legion",
            "commonIssues": [
              "ThinkPad power button non-responsive / flex broken",
              "USB-C Thunderbolt controller firmware lock",
              "Keyboard TrackPoint cap drift"
            ],
            "diagnosticSteps": [
              "Test power button flex cable continuity",
              "Reflash Thunderbolt EEPROM IC",
              "Recalibrate TrackPoint sensor"
            ],
            "requiredTools": [
              "Precision Screwdriver",
              "Multimeter",
              "EEPROM Programmer"
            ],
            "commonParts": [
              "Power Button Flex Cable",
              "USB-C Charging Board",
              "Keyboard Unit"
            ],
            "repairSummary": [
              "Replace broken power button flex cable and flash updated USB-C Thunderbolt firmware."
            ]
          }
        ]
      },
      {
        "id": "apple_mac",
        "name": "Apple",
        "sizes": [
          {
            "id": "apple_mac_device",
            "name": "MacBook Pro, MacBook Air, iMac & Mac Studio",
            "commonIssues": [
              "Kernel panic / NAND power rail short",
              "Trackpad flex cable corroded",
              "MagSafe 3 port board burned",
              "Display backlight flex (Flexgate)"
            ],
            "diagnosticSteps": [
              "Measure PPBUS_G3H power rail voltage with multimeter",
              "Inspect trackpad ribbon flex connector for liquid corrosion",
              "Check MagSafe 3 pins"
            ],
            "requiredTools": [
              "Pentalobe Screwdriver",
              "Micro-soldering Station",
              "Multimeter"
            ],
            "commonParts": [
              "Trackpad Flex Cable",
              "MagSafe 3 Port Board",
              "Display Backlight Flex"
            ],
            "repairSummary": [
              "Clean liquid corrosion on trackpad flex connector and replace burned MagSafe 3 DC board."
            ]
          }
        ]
      },
      {
        "id": "asus_pc",
        "name": "ASUS",
        "sizes": [
          {
            "id": "asus_pc_device",
            "name": "ROG Strix, ZenBook & Vivobook",
            "commonIssues": [
              "GPU cooling fan bearing rattling",
              "DC jack center pin melted",
              "Screen backlight flicker"
            ],
            "diagnosticSteps": [
              "Check cooling fan RPM and bearing play",
              "Measure DC jack resistance",
              "Inspect eDP display cable"
            ],
            "requiredTools": [
              "Precision Screwdriver",
              "Multimeter",
              "Thermal Paste"
            ],
            "commonParts": [
              "CPU/GPU Cooling Fan",
              "DC Power Jack",
              "eDP Cable"
            ],
            "repairSummary": [
              "Replace noisy GPU cooling fan and re-solder DC power jack socket."
            ]
          }
        ]
      },
      {
        "id": "acer_pc",
        "name": "Acer",
        "sizes": [
          {
            "id": "acer_pc_device",
            "name": "Predator, Swift & Aspire Laptops",
            "commonIssues": [
              "Battery charging amber light flashing",
              "RAM slot cold joint",
              "Keyboard keys dead"
            ],
            "diagnosticSteps": [
              "Measure battery BMS output",
              "Test RAM slot pin continuity",
              "Check keyboard ribbon connector"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver"
            ],
            "commonParts": [
              "Battery Unit",
              "Keyboard Panel",
              "DC Jack"
            ],
            "repairSummary": [
              "Replace battery pack and clean keyboard ribbon connector."
            ]
          }
        ]
      },
      {
        "id": "msi",
        "name": "MSI",
        "sizes": [
          {
            "id": "msi_device",
            "name": "Gaming, Creator & Modern Laptops",
            "commonIssues": [
              "Hinge plastic housing snapped",
              "GPU thermal throttling",
              "Power button light flickering"
            ],
            "diagnosticSteps": [
              "Inspect display hinge mounts",
              "Reapply high-performance thermal paste",
              "Check power rail voltage"
            ],
            "requiredTools": [
              "Precision Screwdriver",
              "Thermal Paste",
              "Epoxy"
            ],
            "commonParts": [
              "Hinge Bracket",
              "Cooling Fan",
              "Power Button Board"
            ],
            "repairSummary": [
              "Re-anchor broken screen hinge chassis mounts and re-apply GPU thermal paste."
            ]
          }
        ]
      },
      {
        "id": "epson",
        "name": "Epson",
        "sizes": [
          {
            "id": "epson_device",
            "name": "EcoTank, WorkForce & Expression Printers",
            "commonIssues": [
              "Maintenance box full / waste ink pad error",
              "Piezoelectric printhead nozzle clogged",
              "Paper feed roller slip"
            ],
            "diagnosticSteps": [
              "Reset waste ink counter software and replace waste pads",
              "Perform ultrasonic printhead purge",
              "Clean rubber feed rollers"
            ],
            "requiredTools": [
              "Ultrasonic Cleaner",
              "Screwdriver Set",
              "Syringe Flush Kit"
            ],
            "commonParts": [
              "Waste Ink Maintenance Box",
              "Printhead Assembly",
              "Feed Roller Kit"
            ],
            "repairSummary": [
              "Replace waste ink maintenance box and flush clogged printhead nozzles with cleaning solution."
            ]
          }
        ]
      },
      {
        "id": "canon_printer",
        "name": "Canon",
        "sizes": [
          {
            "id": "canon_printer_device",
            "name": "PIXMA, MAXIFY & imageCLASS Printers",
            "commonIssues": [
              "Error B200 / B203 (printhead over-voltage / thermal run-away)",
              "Paper jam sensor lever stuck",
              "Scanner motor gear slip"
            ],
            "diagnosticSteps": [
              "Measure printhead temperature sensor resistance",
              "Inspect optical paper sensor lever",
              "Check scanner belt drive"
            ],
            "requiredTools": [
              "Multimeter",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Printhead Unit",
              "Paper Sensor Unit",
              "Ink Absorber Set"
            ],
            "repairSummary": [
              "Replace damaged printhead unit and reset ink absorber counter."
            ]
          }
        ]
      },
      {
        "id": "brother",
        "name": "Brother",
        "sizes": [
          {
            "id": "brother_device",
            "name": "HL, MFC & DCP Laser & Inkjet Printers",
            "commonIssues": [
              "Drum end-of-life error / black streak on prints",
              "Paper feed sensor lever unclipped",
              "Fuser gear click"
            ],
            "diagnosticSteps": [
              "Clean corona wire inside drum unit",
              "Inspect paper sensor mechanical flag",
              "Check fuser drive gear"
            ],
            "requiredTools": [
              "Screwdriver Set",
              "Lint-free Wipes"
            ],
            "commonParts": [
              "Drum Unit Assembly",
              "Fuser Gear",
              "Paper Feed Roller"
            ],
            "repairSummary": [
              "Clean drum unit corona wire and replace worn paper feed roller set."
            ]
          }
        ]
      },
      {
        "id": "apc",
        "name": "APC",
        "sizes": [
          {
            "id": "apc_device",
            "name": "Back-UPS & Smart-UPS Battery Backups",
            "commonIssues": [
              "Replace Battery LED on / constant beeping",
              "UPS inverter MOSFET shorted",
              "Overload breaker tripping"
            ],
            "diagnosticSteps": [
              "Measure lead-acid battery terminal voltage under load (min 12.6V per cell)",
              "Check inverter MOSFET bridge",
              "Test circuit breaker"
            ],
            "requiredTools": [
              "Multimeter",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Sealed Lead-Acid Battery (12V)",
              "Inverter MOSFET Board",
              "Circuit Breaker"
            ],
            "repairSummary": [
              "Replace swollen sealed lead-acid battery cells and recalibrate UPS runtime sensor."
            ]
          }
        ]
      },
      {
        "id": "cyberpower",
        "name": "CyberPower",
        "sizes": [
          {
            "id": "cyberpower_device",
            "name": "CP & PFC Sinewave UPS Systems",
            "commonIssues": [
              "F02 error code (charger fault)",
              "Battery disconnected error",
              "LCD display dim"
            ],
            "diagnosticSteps": [
              "Test internal battery voltage",
              "Check battery fuse continuity",
              "Measure charging voltage"
            ],
            "requiredTools": [
              "Multimeter",
              "Screwdriver Set"
            ],
            "commonParts": [
              "12V SLA Battery",
              "Charger Board",
              "LCD Module"
            ],
            "repairSummary": [
              "Replace SLA battery pair and service internal charger board."
            ]
          }
        ]
      },
      {
        "id": "netgear",
        "name": "Netgear",
        "sizes": [
          {
            "id": "netgear_device",
            "name": "Nighthawk, Orbi Mesh & Switches",
            "commonIssues": [
              "Power LED solid amber (corrupt bootloader / firmware bricked)",
              "Power adapter 12V rail sagging under load",
              "Ethernet port RJ45 LED dead"
            ],
            "diagnosticSteps": [
              "Measure power adapter voltage under load",
              "Perform TFTP firmware recovery upload",
              "Inspect RJ45 connector pins"
            ],
            "requiredTools": [
              "Multimeter",
              "Ethernet Cable",
              "TFTP Utility"
            ],
            "commonParts": [
              "12V DC Power Supply",
              "Mainboard",
              "Antenna Cable"
            ],
            "repairSummary": [
              "Replace sagging 12V power supply adapter and reflash corrupt firmware via TFTP."
            ]
          }
        ]
      },
      {
        "id": "tp_link",
        "name": "TP-Link",
        "sizes": [
          {
            "id": "tp_link_device",
            "name": "Archer, Deco Mesh & Kasa",
            "commonIssues": [
              "Deco mesh satellite offline / red light",
              "Power supply capacitor blown",
              "2.4GHz WiFi radio dead"
            ],
            "diagnosticSteps": [
              "Test power supply output voltage",
              "Check 2.4GHz power amplifier IC",
              "Perform hard reset pinhole hold"
            ],
            "requiredTools": [
              "Multimeter",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Power Supply Unit",
              "Mainboard",
              "Antenna Assembly"
            ],
            "repairSummary": [
              "Replace failed power supply unit and re-synchronize Deco mesh nodes."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "smart_home",
    "name": "Smart Home & Security",
    "description": "Smart Thermostats, Video Doorbells, Security Cams, Smart Locks & Smart Lighting Bridges covering Google Nest, Ring, Arlo, Eufy, August, Ecobee, Philips Hue and more",
    "icon": "Wrench",
    "brands": [
      {
        "id": "nest",
        "name": "Google Nest",
        "sizes": [
          {
            "id": "nest_device",
            "name": "Nest Learning Thermostat, Cam, Doorbell & Protect",
            "commonIssues": [
              "Thermostat e73 / N260 no power to C-wire error",
              "Doorbell internal battery degraded / resets when pressed",
              "Camera WiFi disconnection"
            ],
            "diagnosticSteps": [
              "Measure 24VAC across R and C wires",
              "Test doorbell internal Li-po battery voltage (3.7V)",
              "Inspect WiFi antenna"
            ],
            "requiredTools": [
              "Multimeter",
              "Precision Screwdriver",
              "Micro-soldering Iron"
            ],
            "commonParts": [
              "Doorbell Internal LiPo Battery",
              "Base Plate Connector",
              "Power Connector"
            ],
            "repairSummary": [
              "Replace degraded internal doorbell battery cell and service thermostat base plate terminals."
            ]
          }
        ]
      },
      {
        "id": "ring",
        "name": "Ring",
        "sizes": [
          {
            "id": "ring_device",
            "name": "Video Doorbell, Spotlight Cam & Alarm",
            "commonIssues": [
              "Doorbell button plastic lens cracked",
              "Battery non-charging in cold weather",
              "Infrared night vision filter stuck"
            ],
            "diagnosticSteps": [
              "Test quick-release battery pack output",
              "Inspect IR cut filter solenoid mechanism",
              "Check button micro-switch"
            ],
            "requiredTools": [
              "Torx T6 Security Driver",
              "Multimeter"
            ],
            "commonParts": [
              "Quick Release Battery",
              "IR Cut Filter Solenoid",
              "Doorbell Button Assembly"
            ],
            "repairSummary": [
              "Replace quick-release battery pack and free stuck infrared night vision cut filter solenoid."
            ]
          }
        ]
      },
      {
        "id": "arlo",
        "name": "Arlo",
        "sizes": [
          {
            "id": "arlo_device",
            "name": "Pro, Ultra, Essential & Chime",
            "commonIssues": [
              "Camera battery swollen / latch jammed",
              "Charging port rubber cover torn / water ingress",
              "Base station sync error"
            ],
            "diagnosticSteps": [
              "Test battery voltage contacts",
              "Inspect camera housing gasket",
              "Re-pair camera to base station"
            ],
            "requiredTools": [
              "Multimeter",
              "Plastic Spudger"
            ],
            "commonParts": [
              "Rechargeable Battery Pack",
              "Waterproof Rubber Seal",
              "Solar Panel Cable"
            ],
            "repairSummary": [
              "Replace swollen rechargeable battery pack and renew housing waterproof rubber seal."
            ]
          }
        ]
      },
      {
        "id": "eufy",
        "name": "Eufy",
        "sizes": [
          {
            "id": "eufy_device",
            "name": "Video Doorbell, Cam & Smart Lock",
            "commonIssues": [
              "Smart lock motor gear jam",
              "Base station HomeBase storage crash",
              "Camera night vision LED dim"
            ],
            "diagnosticSteps": [
              "Inspect smart lock deadbolt gear drive",
              "Test camera battery current",
              "Check IR LED array"
            ],
            "requiredTools": [
              "Phillips Screwdriver",
              "Multimeter"
            ],
            "commonParts": [
              "Deadbolt Gear Assembly",
              "Rechargeable Battery",
              "IR Board"
            ],
            "repairSummary": [
              "Service smart lock deadbolt gear drive mechanism and install fresh battery module."
            ]
          }
        ]
      },
      {
        "id": "august",
        "name": "August",
        "sizes": [
          {
            "id": "august_device",
            "name": "Smart Lock & Wi-Fi Smart Lock",
            "commonIssues": [
              "Deadbolt motor binding / high battery drain",
              "DoorSense sensor alignment error",
              "Bluetooth module disconnect"
            ],
            "diagnosticSteps": [
              "Test motor current draw during lock strike",
              "Recalibrate DoorSense magnetic sensor",
              "Check battery contacts"
            ],
            "requiredTools": [
              "Phillips Screwdriver",
              "Multimeter"
            ],
            "commonParts": [
              "Motor Gearbox Assembly",
              "DoorSense Magnet",
              "CR123A Battery Set"
            ],
            "repairSummary": [
              "Lubricate deadbolt motor gearbox and realign DoorSense magnetic position sensor."
            ]
          }
        ]
      },
      {
        "id": "ecobee",
        "name": "Ecobee",
        "sizes": [
          {
            "id": "ecobee_device",
            "name": "Smart Thermostat Premium & Sensors",
            "commonIssues": [
              "Power Extender Kit (PEK) diode failure",
              "Occupancy motion sensor battery dead",
              "Display touch offset"
            ],
            "diagnosticSteps": [
              "Measure 24VAC voltage on PEK terminal block",
              "Check CR2477 coin cell voltage",
              "Recalibrate touchscreen"
            ],
            "requiredTools": [
              "Multimeter",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Power Extender Kit (PEK)",
              "CR2477 Coin Cell",
              "Base Plate"
            ],
            "repairSummary": [
              "Replace Power Extender Kit (PEK) and install fresh CR2477 occupancy sensor battery."
            ]
          }
        ]
      },
      {
        "id": "philips_hue",
        "name": "Philips Hue",
        "sizes": [
          {
            "id": "philips_hue_device",
            "name": "Bridge, Smart Bulbs & Lightstrips",
            "commonIssues": [
              "Hue Bridge 3rd LED (Internet) unlit",
              "Lightstrip controller Zigbee IC short",
              "Smart bulb flickering"
            ],
            "diagnosticSteps": [
              "Test Bridge DC power supply adapter",
              "Inspect Lightstrip ribbon pin connections",
              "Check Zigbee network channel"
            ],
            "requiredTools": [
              "Multimeter",
              "Soldering Iron"
            ],
            "commonParts": [
              "12V DC Power Supply",
              "Lightstrip Controller Module",
              "Zigbee Chip"
            ],
            "repairSummary": [
              "Replace Hue Bridge DC power supply adapter and resolder lightstrip controller ribbon pins."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "tools_lighting",
    "name": "Lighting, Power & Working Tools",
    "description": "Cordless Power Drills, Impact Drivers, Angle Grinders, Rotary Hammers, Pipe Threaders & Work Lights covering DeWalt, Milwaukee, Makita, Bosch, Ryobi, Craftsman, Ridgid and more",
    "icon": "Wrench",
    "brands": [
      {
        "id": "dewalt_tools",
        "name": "DeWalt",
        "sizes": [
          {
            "id": "dewalt_tools_device",
            "name": "20V MAX / FLEXVOLT Drills, Impact Drivers & Saws",
            "commonIssues": [
              "Impact driver anvil / selector switch gear stripped",
              "Brushless motor hall sensor PCB burned",
              "Battery pack 20V BMS error / one cell low"
            ],
            "diagnosticSteps": [
              "Inspect impact driver metal anvil ball detent",
              "Test brushless motor hall sensor signals",
              "Measure individual 18650/21700 cell voltages"
            ],
            "requiredTools": [
              "Torx T8/T10 Screwdriver",
              "Multimeter",
              "Spot Welder"
            ],
            "commonParts": [
              "Impact Driver Anvil Kit",
              "Brushless Motor PCB",
              "20V BMS Board",
              "18650 Battery Cells"
            ],
            "repairSummary": [
              "Replace worn impact driver anvil assembly and balance individual lithium cell voltages in battery pack."
            ]
          }
        ]
      },
      {
        "id": "milwaukee_tools",
        "name": "Milwaukee",
        "sizes": [
          {
            "id": "milwaukee_tools_device",
            "name": "M12, M18 FUEL Drills, Ratchets & Grinders",
            "commonIssues": [
              "M18 FUEL trigger switch speed control dead",
              "M12 ratchet planetary gearbox teeth stripped",
              "M18 battery pack flashing red/green error"
            ],
            "diagnosticSteps": [
              "Test trigger potentiometer resistance sweep",
              "Inspect planetary ring gear teeth",
              "Measure M18 battery cell balance"
            ],
            "requiredTools": [
              "Torx T10 Screwdriver",
              "Multimeter",
              "Grease"
            ],
            "commonParts": [
              "Trigger Switch Assembly",
              "Planetary Gearbox Kit",
              "M18 BMS Control Board"
            ],
            "repairSummary": [
              "Replace M18 trigger switch electronic control module and install new planetary gearbox kit."
            ]
          }
        ]
      },
      {
        "id": "makita_tools",
        "name": "Makita",
        "sizes": [
          {
            "id": "makita_tools_device",
            "name": "18V LXT / 40V XGT Drills, Circular Saws & Blowers",
            "commonIssues": [
              "Battery pack red light star lock out",
              "Armature carbon brushes worn (LXT brushed models)",
              "Saw spindle lock pin broken"
            ],
            "diagnosticSteps": [
              "Inspect battery BMS lock status",
              "Measure carbon brush length (min 6mm)",
              "Test spindle lock spring"
            ],
            "requiredTools": [
              "Flathead Screwdriver",
              "Multimeter",
              "Screwdriver Set"
            ],
            "commonParts": [
              "Carbon Brush Set (CB-440)",
              "Trigger Switch",
              "Spindle Lock Pin"
            ],
            "repairSummary": [
              "Replace carbon brush set CB-440 and install new trigger switch assembly."
            ]
          }
        ]
      },
      {
        "id": "bosch_tools",
        "name": "Bosch Tools",
        "sizes": [
          {
            "id": "bosch_tools_device",
            "name": "Bosch 18V, Bulldog Rotary Hammers & Measuring Tools",
            "commonIssues": [
              "SDS-plus chuck locking ball worn",
              "Laser level diode dim / uncalibrated",
              "Motor switch thermal cutout"
            ],
            "diagnosticSteps": [
              "Inspect SDS chuck steel ball and rubber cap",
              "Check laser diode driver voltage",
              "Test switch continuity"
            ],
            "requiredTools": [
              "Retaining Ring Pliers",
              "Multimeter"
            ],
            "commonParts": [
              "SDS Chuck Repair Kit",
              "Laser Diode Module",
              "18V Switch"
            ],
            "repairSummary": [
              "Install SDS chuck repair kit with new locking ball and rubber dust cap."
            ]
          }
        ]
      },
      {
        "id": "ryobi",
        "name": "Ryobi",
        "sizes": [
          {
            "id": "ryobi_device",
            "name": "ONE+ 18V & 40V Outdoor Tools",
            "commonIssues": [
              "ONE+ battery indicator empty when charged (BMS sleep)",
              "Trimmer head auto-feed mechanism stuck",
              "Inverter generator board short"
            ],
            "diagnosticSteps": [
              "Wake up sleep mode BMS with momentary voltage boost",
              "Clean trimmer spool ratchet",
              "Test inverter board MOSFETs"
            ],
            "requiredTools": [
              "Torx Screwdriver",
              "Multimeter"
            ],
            "commonParts": [
              "18V BMS Board",
              "Trimmer Head Spool",
              "Switch Module"
            ],
            "repairSummary": [
              "Reset ONE+ battery BMS control circuit and service string trimmer spool head mechanism."
            ]
          }
        ]
      },
      {
        "id": "craftsman",
        "name": "Craftsman",
        "sizes": [
          {
            "id": "craftsman_device",
            "name": "V20 Drills, Compressors & Lawn Mowers",
            "commonIssues": [
              "V20 battery latch spring broken",
              "Compressor pressure check valve leaking",
              "Driver chuck slipping"
            ],
            "diagnosticSteps": [
              "Inspect battery lock latch spring",
              "Check compressor brass check valve seat",
              "Test keyless chuck jaws"
            ],
            "requiredTools": [
              "Phillips Screwdriver",
              "Pipe Wrench",
              "Multimeter"
            ],
            "commonParts": [
              "V20 Battery Latch",
              "Compressor Check Valve",
              "Keyless Chuck"
            ],
            "repairSummary": [
              "Replace brass compressor check valve and install new keyless drill chuck."
            ]
          }
        ]
      },
      {
        "id": "ridgid",
        "name": "Ridgid",
        "sizes": [
          {
            "id": "ridgid_device",
            "name": "18V Brushless Tools & Pipe Threaders",
            "commonIssues": [
              "18V battery BMS code",
              "Pipe threader die jaw binding",
              "Impact wrench anvil pin snapped"
            ],
            "diagnosticSteps": [
              "Measure battery cell voltage balance",
              "Inspect pipe die teeth",
              "Check anvil retainer ring"
            ],
            "requiredTools": [
              "Torx Screwdriver",
              "Multimeter"
            ],
            "commonParts": [
              "Anvil Assembly",
              "18V BMS Board",
              "Threader Jaw Set"
            ],
            "repairSummary": [
              "Replace impact wrench anvil assembly and recalibrate battery BMS module."
            ]
          }
        ]
      }
    ]
  }
];
