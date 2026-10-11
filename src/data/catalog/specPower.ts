// Power & backup, security & access, lighting, personal care, hobby, pool/water, tools, mobility & automotive.
import type { TypeSpec } from './specTypes';

export const POWER_SPECS: TypeSpec[] = [
  {
    key: 'solar_inverter', name: 'Solar / Hybrid Inverter', family: 'power_backup', group: 'Power & Backup', sizeLabel: 'Rated power',
    brands: {
      Sunsynk: ['Sunsynk Hybrid 5 kW|5 kW', 'Sunsynk Hybrid 8 kW|8 kW', 'Sunsynk 3-Phase 12 kW|12 kW', 'Sunsynk ECCO 3.6 kW|3.6 kW'],
      Deye: ['SUN-5K-SG03LP1|5 kW', 'SUN-8K-SG01LP1|8 kW', 'SUN-12K-SG04LP3|12 kW', 'SUN-3.6K-SG03LP1|3.6 kW'],
      Victron: ['MultiPlus-II 48/3000|3 kVA', 'MultiPlus-II 48/5000|5 kVA', 'Quattro 48/10000|10 kVA', 'Phoenix Inverter 12/800|800 VA'],
      Growatt: ['SPF 3000TL LVM|3 kW', 'SPF 5000 ES|5 kW', 'SPH 6000|6 kW'],
      GoodWe: ['ES Series GW5048D-ES|5 kW', 'ET Series GW10K-ET|10 kW'],
      Huawei: ['SUN2000-5KTL-L1|5 kW', 'SUN2000-10KTL-M1|10 kW'],
      SMA: ['Sunny Boy 5.0|5 kW', 'Sunny Island 6.0H|6 kW'],
      Kodak: ['OG-5.48 Off-grid|5 kW', 'King 3.5 kVA|3.5 kVA'],
      Mecer: ['Axpert-style 3 kVA|3 kVA', 'Axpert-style 5 kVA|5 kVA'],
      Voltronic_Axpert: ['Axpert King 5 kVA|5 kVA', 'Axpert MKS IV 5.6 kW|5.6 kW', 'Axpert VM III 3 kVA|3 kVA'],
      Must: ['PV18-5248 PRO|5 kW', 'EP3000 Plus|3 kW'],
      Fronius: ['Primo GEN24 5.0|5 kW', 'Symo GEN24 10.0|10 kW'],
      Solis: ['S6-EH1P5K-L|5 kW', 'S5-EH1P6K-L|6 kW'],
      Luxpower: ['SNA5000 WPV|5 kW', 'LXP-LB-EU 12K|12 kW'],
    },
  },
  {
    key: 'lithium_battery', name: 'Lithium Backup Battery (LiFePO4)', family: 'power_backup', group: 'Power & Backup', sizeLabel: 'Capacity',
    brands: {
      Pylontech: ['US2000C|2.4 kWh', 'US3000C|3.5 kWh', 'US5000|4.8 kWh', 'Force H2 (HV)|7.1 kWh,10.65 kWh'],
      Hubble_Lithium: ['AM-2|5.5 kWh', 'AM-5|5.5 kWh', 'X-101|10 kWh'],
      Dyness: ['B4850|2.4 kWh', 'PowerBox Pro|10 kWh'],
      Freedom_Won: ['Lite Home 10/8|10 kWh', 'Lite Home 15/12|15 kWh'],
      Sunsynk: ['Sunsynk 5.12 kWh Battery|5.12 kWh', 'Sunsynk 10.65 kWh Battery|10.65 kWh'],
      BYD: ['Battery-Box Premium HVS|5.1 kWh,7.7 kWh,10.2 kWh', 'Battery-Box Premium LVS|4 kWh,8 kWh'],
      Revov: ['R100 2nd Life|5.1 kWh', 'R100 2nd Life 14.3|14.3 kWh'],
      Deye: ['SE-G5.1 Pro|5.12 kWh', 'BOS-G|5.12 kWh'],
      Shoto: ['SDA10-4850|2.4 kWh', 'SDA10-48100|4.8 kWh'],
    },
  },
  {
    key: 'ups', family: 'power_backup', group: 'Power & Backup', sizeLabel: 'Rating',
    brands: {
      Mecer: ['ME-650-VU Line Interactive|650 VA', 'ME-1000-WTU|1 kVA', 'ME-2000-WTU|2 kVA', 'Inverter Trolley 1 kVA|1 kVA'],
      RCT: ['RCT-650-AP|650 VA', 'RCT-1000-LCD|1 kVA', 'RCT-3000-LI Online|3 kVA'],
      APC: ['Back-UPS BX650|650 VA', 'Back-UPS BX1600|1.6 kVA', 'Smart-UPS SMT1500|1.5 kVA', 'Smart-UPS SRT3000|3 kVA'],
      Eaton: ['5E 850i|850 VA', '5SC 1500i|1.5 kVA', '9SX 3000|3 kVA'],
      Gizzu: ['Mini DC UPS 8800 mAh|', 'Max 2000 mAh Router UPS|', 'Gizzu Hero Pro 1 kWh|'],
      Ellies: ['Ellies Inverter Trolley 1 kVA|1 kVA', 'Ellies Mini DC UPS|'],
      Vertiv: ['Liebert itON 1000|1 kVA', 'Liebert GXT5 3000|3 kVA'],
    },
  },
  {
    key: 'portable_power_station', name: 'Portable Power Station', family: 'power_backup', group: 'Power & Backup',
    brands: {
      EcoFlow: ['River 2', 'River 2 Pro', 'Delta 2', 'Delta 2 Max', 'Delta Pro'],
      Bluetti: ['EB3A', 'AC180', 'AC200 Max', 'AC300 + B300'],
      Jackery: ['Explorer 300 Plus', 'Explorer 1000 Plus', 'Explorer 2000 Pro'],
      Anker: ['SOLIX C800', 'SOLIX F1500'],
      Gizzu: ['Hero 1 kWh', 'Hero Pro 2 kWh'],
      Kodak: ['Power Station 600 Wh'],
    },
  },
  {
    key: 'power_bank', name: 'Power Bank', family: 'power_backup', group: 'Power & Backup', sizeLabel: 'Capacity',
    brands: {
      Anker: ['PowerCore 10000|10 000 mAh', 'PowerCore 20000 PD|20 000 mAh', 'Anker 737 PowerBank|24 000 mAh', 'MagGo 622|5 000 mAh'],
      Xiaomi: ['Mi Power Bank 3|10 000 mAh,20 000 mAh', 'Redmi Power Bank|10 000 mAh,20 000 mAh'],
      Samsung: ['EB-P3300 25W|10 000 mAh', 'EB-P5300 25W|20 000 mAh'],
      Volkano: ['Volkano Fuel Series|10 000 mAh', 'Volkano Mega Series|20 000 mAh'],
      Romoss: ['Sense 4|10 400 mAh', 'Sense 8+|30 000 mAh'],
      Baseus: ['Adaman 65W|20 000 mAh', 'Blade 100W|20 000 mAh'],
      Gizzu: ['Gizzu 30 000 mAh|30 000 mAh'],
    },
  },
  {
    key: 'battery_charger', family: 'power_backup', group: 'Power & Backup',
    brands: { NOCO: ['Genius 5', 'Genius 10', 'Boost GB40 Jump Starter'], CTEK: ['MXS 5.0', 'MXS 10'], Ryobi: ['Battery Charger RBC-12V'], Bosch: ['C3 Car Charger', 'C7 Car Charger'], Energizer: ['Recharge Pro AA/AAA'], Gizzu: ['Jump Starter 12 000 mAh'] },
  },
  {
    key: 'generator', name: 'Generator (Petrol / Inverter)', family: 'workshop_power', group: 'Power & Backup', sizeLabel: 'Rated output',
    brands: {
      Honda: ['EU22i Inverter|2.2 kVA', 'EU32i Inverter|3.2 kVA', 'EG5500CXS|5.5 kVA'],
      Ryobi: ['RG-2700 Inverter|2.7 kVA', 'RG-6500KE|6.5 kVA'],
      Yamaha: ['EF2000iS Inverter|2 kVA', 'EF6300iSE|6.3 kVA'],
      Kipor: ['IG2000 Inverter|2 kVA', 'KDE6700T Diesel|5.5 kVA'],
      Bennett: ['Bennett 3 kVA Petrol|3 kVA'],
      Ingco: ['GE30005 Petrol|3 kVA', 'GSE55001 Petrol|5.5 kVA'],
      Champion: ['3500 W Dual Fuel|3.5 kVA'],
    },
  },
  {
    key: 'welding_machine', name: 'Inverter Welding Machine', family: 'workshop_power', group: 'Tools & Workshop',
    brands: { Lincoln_Electric: ['Invertec 160S', 'Powertec 205C MIG'], ESAB: ['Rogue ES 150i', 'Renegade ES 200i'], Ingco: ['MMA2005 Inverter', 'MIG2008 MIG/MMA'], Ryobi: ['Ryobi IW-160 Inverter'], Telwin: ['Technology 175', 'Force 165'], Fronius: ['TransPocket 180'] },
  },
  // ---------------- Security & access ----------------
  {
    key: 'security_camera', family: 'security', group: 'Security & Access',
    brands: {
      Hikvision: ['DS-2CD1043G0-I Bullet', 'DS-2CD2143G2-I Dome', 'ColorVu DS-2CD2047G2', 'Turbo HD DS-2CE16D0T Analogue', 'AcuSense DS-2CD2386G2'],
      Dahua: ['IPC-HFW1230S Bullet', 'IPC-HDW2431T Dome', 'Full-Color HFW2249S', 'HAC-HFW1200 Analogue'],
      EZVIZ: ['C6N Indoor', 'C3TN Outdoor', 'H8c Pan/Tilt', 'C8C Outdoor PT'],
      TP_Link: ['Tapo C200', 'Tapo C310', 'Tapo C500', 'VIGI C340'],
      Reolink: ['RLC-510A', 'Argus 3 Pro', 'E1 Outdoor'],
      Imou: ['Ranger 2', 'Bullet 2E', 'Cruiser'],
      Ring: ['Stick Up Cam', 'Spotlight Cam Plus'],
      Xiaomi: ['Smart Camera C200', 'Outdoor Camera AW200'],
    },
  },
  {
    key: 'cctv_dvr', name: 'CCTV DVR / NVR Recorder', family: 'security', group: 'Security & Access', sizeLabel: 'Channels',
    brands: {
      Hikvision: ['DS-7104HGHI Turbo DVR|4 ch', 'DS-7208HQHI-K1 DVR|8 ch', 'DS-7608NI-K2 NVR|8 ch', 'DS-7616NI-Q2 NVR|16 ch'],
      Dahua: ['XVR5104HS DVR|4 ch', 'XVR5108HS DVR|8 ch', 'NVR4108HS NVR|8 ch', 'NVR4216-16P NVR|16 ch'],
      Uniview: ['NVR301-08S3|8 ch', 'NVR302-16S|16 ch'],
      Provision_ISR: ['SH-8100A5 DVR|8 ch', 'NVR8-16400F|16 ch'],
      Reolink: ['RLN8-410 NVR|8 ch', 'RLN16-410|16 ch'],
      TP_Link: ['VIGI NVR1008H|8 ch'],
    },
  },
  {
    key: 'smart_doorbell', family: 'security', group: 'Security & Access',
    brands: { Ring: ['Video Doorbell (2nd Gen)', 'Video Doorbell Pro 2', 'Battery Doorbell Plus'], Google_Nest: ['Nest Doorbell (battery)', 'Nest Doorbell (wired)'], EZVIZ: ['DB1C Wired Doorbell', 'DB2 Battery Doorbell'], Eufy: ['Video Doorbell Dual', 'Video Doorbell C210'], Hikvision: ['DS-HD1 Doorbell'], Imou: ['DB11 Doorbell'] },
  },
  {
    key: 'intercom', name: 'Intercom / Video Door Phone', family: 'security', group: 'Security & Access',
    brands: { Hikvision: ['DS-KIS202 Video Kit', 'DS-KIS604 IP Kit'], Dahua: ['VTO2202F-P', 'VTH2421FW Monitor'], Commax: ['CDV-70N', 'DRC-4CPN'], Zartek: ['ZA-410 Intercom Kit', 'ZA-462 Gate Station'], Centurion: ['G-Ultra GSM Intercom', 'G-Speak Ultra'], Akuvox: ['E12W', 'R20A'] },
  },
  {
    key: 'alarm_panel', name: 'Alarm System Panel', family: 'security', group: 'Security & Access',
    brands: {
      Paradox: ['MG5050 Magellan', 'SP4000 Spectra', 'EVO192', 'SP6000+'],
      IDS: ['X64 Panel', 'X-Wireless', 'IDS 805'],
      DSC: ['PowerSeries Neo HS2016', 'PC1616', 'Alexor PC9155'],
      Texecom: ['Premier Elite 24', 'Premier Elite 48'],
      Ajax: ['Hub 2', 'Hub 2 Plus'],
      Olarm: ['Olarm Pro Communicator', 'Olarm Max'],
      Risco: ['LightSYS Plus', 'Agility 4'],
    },
  },
  {
    key: 'electric_fence', name: 'Electric Fence Energiser', family: 'security', group: 'Security & Access',
    brands: { Nemtek: ['Druid 15 LCD', 'Druid 25 LCD', 'Merlin M23 LCD', 'Druid 35 Plus'], JVA: ['Z11 Energiser', 'Z13 Energiser', 'Z28 Dual Zone'], Stafix: ['Stafix X6', 'Stafix M16'], Centurion: ['Centurion Energiser (Nemtek-built)'] },
  },
  {
    key: 'smart_lock', family: 'security', group: 'Security & Access',
    brands: { Yale: ['Conexis L1', 'Linus Smart Lock', 'Assure Lock 2'], Samsung: ['SHP-DP609 Push-Pull', 'SHS-P718'], Nuki: ['Smart Lock 3.0 Pro', 'Smart Lock 4.0'], August: ['Wi-Fi Smart Lock (4th gen)'], Xiaomi: ['Smart Door Lock M20'], Ezviz: ['DL01S Smart Lock'] },
  },
  {
    key: 'smoke_detector', family: 'security', group: 'Security & Access',
    brands: { Kidde: ['i9060 10-year', 'KN-COSM-B CO + Smoke'], Google_Nest: ['Nest Protect (2nd gen)'], FireAngel: ['ST-622', 'FA6813 CO'], X_Sense: ['XS01-WT Wi-Fi', 'SC07-W'], Eurolux: ['Battery Smoke Detector'] },
  },
  {
    key: 'baby_monitor', family: 'security', group: 'Security & Access',
    brands: { Motorola: ['VM483 Video', 'PIP1610 HD Connect'], Philips_Avent: ['SCD833 DECT', 'SCD923 Connected Video'], VTech: ['VM3255', 'RM5764HD'], Nanit: ['Pro Camera'], Owlet: ['Dream Duo'] },
  },
  {
    key: 'gate_motor', name: 'Gate / Garage Motor', family: 'gate_motor', group: 'Security & Access',
    brands: {
      Centurion: ['D5 Evo Sliding', 'D10 Turbo Sliding', 'D3 Smart', 'Vector 2 Swing', 'SDO4 T10 Garage', 'D6 Smart'],
      ET_Nice: ['ET Drive 500', 'ET Drive 1000', 'ET Blue 500', 'ET Slider Max', 'ET Garage Motor'],
      Gemini: ['DC Slider', 'Swing Gate Motor', 'Gemini Garage Motor'],
      Digidoor: ['Digidoor DCSL Slider', 'Digidoor Garage Motor 2'],
      Hansa: ['Slider Gate Motor 500 kg'],
      Nice: ['Robus 600', 'Spin 23 Garage'],
      Came: ['BX-243', 'BKS 12 AGS'],
    },
  },
  // ---------------- Lighting ----------------
  {
    key: 'led_strip_lights', family: 'lighting', group: 'Lighting',
    brands: { Philips_Hue: ['Lightstrip Plus', 'Gradient Lightstrip'], Govee: ['RGBIC Strip', 'Envisual TV Backlight T2'], Eurolux: ['LED Strip 12 V 5 m', 'LED Strip Driver Kit'], Sonoff: ['L2 Lite RGB Strip', 'L3 Pro'], LIFX: ['Z Strip'] },
  },
  {
    key: 'ceiling_light', family: 'lighting', group: 'Lighting',
    brands: { Eurolux: ['LED Ceiling Panel 18 W', 'Flush Mount Oyster'], Philips: ['Hue Enrave', 'Philips Downlight Essential'], Bright_Star: ['CF Ceiling Fitting', 'Downlight DL'], Radiant: ['Radiant LED Downlight'], Ikea: ['TRÅDFRI Panel'] },
  },
  {
    key: 'desk_lamp', family: 'lighting', group: 'Lighting',
    brands: { BenQ: ['e-Reading Lamp', 'ScreenBar Plus'], Xiaomi: ['Mi LED Desk Lamp 1S'], Philips: ['Hue Go', 'Bright LED Desk Lamp'], Eurolux: ['LED Desk Lamp'], Ikea: ['FORSÅ', 'TERTIAL'] },
  },
  {
    key: 'flashlight', family: 'lighting', group: 'Lighting',
    brands: { Maglite: ['ML300L', 'Mini Maglite Pro'], Fenix: ['PD36R', 'E20 V2'], Olight: ['Warrior 3S', 'Baton 3'], Nitecore: ['MH12 Pro', 'P20iX'], Energizer: ['Hard Case Pro', 'Vision HD Headlamp'], Eveready: ['Eveready LED Torch'] },
  },
  // ---------------- Personal care ----------------
  {
    key: 'hair_dryer', family: 'small_heating', group: 'Personal Care',
    brands: { Dyson: ['Supersonic HD07', 'Supersonic HD15'], Philips: ['3000 Series BHD308', '5000 Series BHD512'], Remington: ['Pro-Air Turbo D5220', 'Hydraluxe AC8901'], Braun: ['Satin Hair 7 HD785'], Babyliss: ['Pro Rapido', '2000 W Power Dry'], Russell_Hobbs: ['Hair Dryer RHHD22'], Revlon: ['One-Step Volumiser'] },
  },
  {
    key: 'hair_straightener', family: 'small_heating', group: 'Personal Care',
    brands: { ghd: ['Gold Styler', 'Platinum+', 'Max'], Remington: ['Keratin Protect S8598', 'Sleek & Curl S6505'], Babyliss: ['Diamond Glide', 'Curl Secret'], Philips: ['StraightCare BHS378'], Dyson: ['Airwrap Complete', 'Corrale'] },
  },
  {
    key: 'electric_shaver', family: 'personal_care', group: 'Personal Care',
    brands: { Philips: ['OneBlade QP2520', 'Series 3000 S3233', 'Series 7000 S7886', 'Series 9000 S9985'], Braun: ['Series 3 300s', 'Series 5 51-B1000s', 'Series 7 71-S4200cs', 'Series 9 Pro 9415s'], Remington: ['F5 Style Series', 'R5 Rotary'], Wahl: ['Magic Clip', 'Super Taper', 'Lithium Ion+ Beard Trimmer'], Panasonic: ['Arc5 ES-LV67', 'ER-GP80 Clipper'] },
  },
  {
    key: 'electric_toothbrush', family: 'personal_care', group: 'Personal Care',
    brands: { Oral_B: ['Vitality Pro', 'Pro 3 3500', 'iO Series 6', 'iO Series 9'], Philips_Sonicare: ['ProtectiveClean 4100', 'DiamondClean 9000', 'Sonicare 3100'], Xiaomi: ['Electric Toothbrush T500'], Colgate: ['Hum Smart'] },
  },
  {
    key: 'epilator', family: 'personal_care', group: 'Personal Care',
    brands: { Braun: ['Silk-épil 5', 'Silk-épil 9 Flex'], Philips: ['Satinelle Essential BRE225', 'Lumea IPL BRI923'], Remington: ['Smooth & Silky EP7020'], Panasonic: ['ES-EY80'] },
  },
  {
    key: 'sewing_machine', name: 'Sewing Machine', family: 'sewing', group: 'Home & Hobby',
    brands: { Singer: ['Heavy Duty 4423', 'Start 1306', 'Tradition 2259', 'Quantum Stylist 9960'], Brother: ['JS2125', 'LS14S', 'CS6000i', 'Innov-is F420'], Janome: ['2212', 'HD3000', 'Memory Craft 6700P'], Bernette: ['b35', 'b79'], Juki: ['HZL-353ZR', 'TL-2010Q'] },
  },
  // ---------------- Pool, water & garden ----------------
  {
    key: 'water_pump', name: 'Water / Borehole Booster Pump', family: 'pumps', group: 'Pool, Water & Garden',
    brands: { DAB: ['E.sybox Mini 3', 'Aquajet 82M', 'JetCom 102M'], Grundfos: ['SCALA2', 'CMB-SET 3-47', 'SQ 2-55 Borehole'], Pedrollo: ['PKm 60', 'JSWm 2', '4SR Borehole'], Leo: ['XKJ-1104SA', 'APm37'], Franklin_Electric: ['4" Borehole Pump'], Ingco: ['Peripheral Pump VPM3708'] },
  },
  {
    key: 'pool_pump', name: 'Pool Pump', family: 'pumps', group: 'Pool, Water & Garden',
    brands: { Speck: ['BADU Prime 0.75 kW', 'BADU 90/11', 'Speck E71'], Pentair: ['SuperFlo VS', 'Ultraflow'], Hayward: ['Super Pump', 'Power-Flo LX'], Kreepy_Krauly: ['Kreepy Krauly 0.75 kW Pump', 'Kreepy Krauly Platinum'], Waterite: ['Waterite 0.75 kW'], Zodiac: ['FloPro VS'] },
  },
  {
    key: 'lawn_mower', name: 'Electric Lawn Mower', family: 'power_tools', group: 'Pool, Water & Garden',
    brands: { Wolf: ['Wolf Electric Mower 2200 W', 'Wolf Edger'], McCulloch: ['ME 2000 Electric'], Bosch: ['Rotak 32', 'Rotak 37', 'AdvancedRotak 36-660'], Ryobi: ['RLM-1800 Electric', 'ONE+ 18V Cordless'], Makita: ['ELM3720', 'DLM382 Cordless'], Gardena: ['PowerMax 1400/34'], Husqvarna: ['Automower 305'] },
  },
  {
    key: 'pressure_washer', name: 'Pressure Washer', family: 'power_tools', group: 'Pool, Water & Garden',
    brands: { Karcher: ['K 2 Compact', 'K 3', 'K 4 Power Control', 'K 5 Premium', 'K 7 Smart Control'], Bosch: ['EasyAquatak 110', 'UniversalAquatak 130', 'AdvancedAquatak 140'], Ryobi: ['RPW-150', 'RPW-170'], Nilfisk: ['C 110.7', 'Core 140'], Ingco: ['HPWR15008'], Makita: ['HW1200'] },
  },
  // ---------------- Tools & workshop ----------------
  {
    key: 'electric_drill', family: 'power_tools', group: 'Tools & Workshop',
    brands: { Makita: ['DHP482 18V Combi', 'HP1630 Impact Drill', 'DDF485 18V Brushless', 'HR2470 SDS Rotary Hammer'], DeWalt: ['DCD776 20V', 'DCD796 Brushless', 'DWD024 Corded', 'D25133 SDS'], Bosch: ['GSB 120-LI', 'GSB 18V-55', 'PSB 500 RE', 'GBH 2-26 SDS'], Ryobi: ['R18PD3 ONE+', 'ID-550 Impact Drill'], Milwaukee: ['M18 FPD2', 'M12 FPD'], Black_Decker: ['BDCDD12', 'KR504RE'], Ingco: ['ID6538', 'CIDLI20011'], Stanley: ['SCD711C2K', 'SDH600'] },
  },
  {
    key: 'impact_driver', name: 'Impact Driver', family: 'power_tools', group: 'Tools & Workshop',
    brands: { Makita: ['DTD153 18V', 'DTD172 Brushless', 'TD110D 12V CXT'], DeWalt: ['DCF887 20V XR', 'DCF850 Atomic'], Milwaukee: ['M18 FID3', 'M12 FID2'], Bosch: ['GDR 18V-160', 'GDX 18V-200'], Ryobi: ['R18ID3 ONE+'] },
  },
  {
    key: 'angle_grinder', family: 'power_tools', group: 'Tools & Workshop',
    brands: { Makita: ['GA4530 115 mm', 'GA9020 230 mm', 'DGA504 18V'], Bosch: ['GWS 750-115', 'GWS 2200-230', 'GWS 18V-10'], DeWalt: ['DWE4157', 'DCG405 20V'], Ryobi: ['AG-750 115 mm'], Ingco: ['AG8508', 'AG24008'], Metabo: ['W 750-115', 'WEV 15-125'] },
  },
  {
    key: 'circular_saw', family: 'power_tools', group: 'Tools & Workshop',
    brands: { Makita: ['HS7601 190 mm', 'DHS680 18V', 'SP6000 Track Saw'], DeWalt: ['DWE575', 'DCS570'], Bosch: ['GKS 190', 'PKS 55'], Festool: ['TS 55 F'], Ryobi: ['CSB-1400'] },
  },
  {
    key: 'jigsaw', name: 'Jigsaw', family: 'power_tools', group: 'Tools & Workshop',
    brands: { Bosch: ['PST 700 E', 'GST 90 BE', 'GST 18V-125 B'], Makita: ['4350FCT', 'DJV182 18V'], DeWalt: ['DW331K', 'DCS334'], Festool: ['Carvex PSB 420'], Ryobi: ['JS-750'] },
  },
  {
    key: 'wood_router', family: 'power_tools', group: 'Tools & Workshop',
    brands: { Makita: ['RT0700C Trim Router', 'RP0900 Plunge'], Bosch: ['GOF 1250 CE', 'PMF 220 Multi'], DeWalt: ['DW625 Plunge', 'DCW600 Compact'], Festool: ['OF 1010'], Triton: ['TRA001 Plunge'] },
  },
  {
    key: 'heat_gun', family: 'power_tools', group: 'Tools & Workshop',
    brands: { Bosch: ['GHG 20-63', 'PHG 500-2'], Makita: ['HG6031VK', 'DHG181 18V'], Steinel: ['HL 2020 E'], DeWalt: ['D26411'], Ryobi: ['HG-2000'] },
  },
  {
    key: 'multimeter', family: 'test_equipment', group: 'Tools & Workshop',
    brands: { Fluke: ['Fluke 15B+', 'Fluke 17B+', 'Fluke 87V', 'Fluke 117'], UNI_T: ['UT33D+', 'UT61E+', 'UT210E Clamp'], Brymen: ['BM235', 'BM869s'], Klein_Tools: ['MM400', 'CL800'], Kaiweets: ['HT118A'], Major_Tech: ['MT1720', 'MT87'] },
  },
  {
    key: 'soldering_iron', family: 'test_equipment', group: 'Tools & Workshop',
    brands: { Hakko: ['FX-888D', 'FX-951', 'FR-301 Desoldering'], Weller: ['WE1010', 'WLC100', 'WT1012'], Pinecil: ['Pinecil V2'], Miniware: ['TS101', 'TS80P'], Quick: ['TS1200A', '861DW Hot Air'], Yihua: ['8786D Rework Station', '937D'] },
  },
  {
    key: 'oscilloscope', name: 'Oscilloscope', family: 'test_equipment', group: 'Tools & Workshop',
    brands: { Rigol: ['DS1054Z', 'DHO804', 'MSO5074'], Siglent: ['SDS1104X-E', 'SDS2104X Plus'], Owon: ['HDS272S Handheld', 'VDS1022I USB'], Hantek: ['DSO5102P', '2D72 Handheld'], Keysight: ['DSOX1204G'], Tektronix: ['TBS1052C'] },
  },
  {
    key: 'two_way_radio', name: 'Two-Way Radio / Walkie-Talkie', family: 'test_equipment', group: 'Tools & Workshop',
    brands: { Motorola: ['DP1400', 'DP4400e', 'T82 Talkabout', 'XT420'], Baofeng: ['UV-5R', 'BF-888S', 'UV-82'], Kenwood: ['TK-3402', 'NX-1300'], Hytera: ['BD505', 'PD405'], Icom: ['IC-F1000'] },
  },
  // ---------------- Mobility & automotive ----------------
  {
    key: 'electric_scooter', name: 'Electric Scooter', family: 'micromobility', group: 'Mobility & Automotive',
    brands: { Xiaomi: ['Mi Electric Scooter Essential', 'Mi Electric Scooter Pro 2', 'Electric Scooter 4 Pro', 'Electric Scooter 4 Lite'], Segway_Ninebot: ['Ninebot E2', 'Ninebot Max G30', 'Ninebot Max G2', 'Ninebot F40'], Apollo: ['City', 'Ghost'], Kaabo: ['Mantis 10', 'Wolf Warrior 11'], Inokim: ['Light 2', 'OX'], Dualtron: ['Mini', 'Thunder 2'] },
  },
  {
    key: 'electric_bike', name: 'E-Bike', family: 'micromobility', group: 'Mobility & Automotive',
    brands: { Specialized: ['Turbo Vado 4.0', 'Turbo Levo', 'Turbo Como'], Giant: ['Explore E+', 'Trance X E+'], Trek: ['Allant+ 7', 'Rail 9.7'], Merida: ['eONE-SIXTY 700', 'eSPEEDER 200'], Bosch_eBike: ['Performance Line CX Drive', 'PowerTube 625 Battery'], Shimano: ['STEPS E8000 Drive', 'EP8 Drive'], Bafang: ['BBS02 Mid-drive Kit', 'M500 Drive'], Fiido: ['D11', 'X'] },
  },
  {
    key: 'hoverboard', name: 'Hoverboard / Self-Balancing Board', family: 'micromobility', group: 'Mobility & Automotive',
    brands: { Segway_Ninebot: ['Ninebot S', 'Ninebot S Max'], Gyroor: ['C1', 'G2'], Hover_1: ['Superfly H1', 'Drive'], Swagtron: ['T580', 'T1'], Jetson: ['Rogue', 'Nova'] },
  },
  {
    key: 'car_ecu', name: 'Car ECU (Engine Control Unit)', family: 'automotive', group: 'Mobility & Automotive',
    brands: {
      Bosch: ['ME7.5 (VW/Audi 1.8T)', 'MED17 (VW/BMW/Ford)', 'EDC16 (diesel)', 'EDC17 (diesel)', 'ME17 (Hyundai/Kia)'],
      Denso: ['Toyota Hilux / Fortuner ECU', 'Toyota Corolla ECU', 'Mazda Skyactiv ECU'],
      Continental_Siemens: ['SIMOS 18 (VW TSI)', 'SID807 (Ford/Peugeot diesel)', 'EMS3120 (Renault)'],
      Delphi: ['DCM3.5 (Hyundai diesel)', 'MT80 (Chevrolet)'],
      Magneti_Marelli: ['IAW 4SF (Fiat)', 'MJD 8F2 (diesel)'],
      Hitachi: ['Nissan NP200 / Navara ECU', 'Suzuki Swift ECU'],
    },
  },
  {
    key: 'car_infotainment', name: 'Car Infotainment / Head Unit', family: 'automotive', group: 'Mobility & Automotive',
    brands: {
      Pioneer: ['SPH-DA160DAB', 'DMH-Z5350BT', 'AVH-Z9200DAB'],
      Sony: ['XAV-AX3200', 'XAV-AX8100', 'DSX-A410BT'],
      Kenwood: ['DMX7522S', 'DMX8021DABS'],
      JVC: ['KW-M560BT', 'KW-V660BT'],
      Volkswagen: ['Composition Media (MIB2)', 'Discover Media (MIB2.5)', 'Discover Pro (MIB3)'],
      Toyota: ['Toyota Touch 2', 'Hilux Display Audio'],
      Ford: ['SYNC 3', 'SYNC 4'],
      Android_Head_Unit: ['9" Android Double DIN (Universal)', '10" Android Head Unit (Universal)'],
    },
  },
  {
    key: 'dash_cam', name: 'Dash Cam', family: 'automotive', group: 'Mobility & Automotive',
    brands: { Garmin: ['Dash Cam Mini 2', 'Dash Cam 57', 'Dash Cam 67W'], Xiaomi_70mai: ['70mai A500S', '70mai M300', '70mai A810 4K'], Nextbase: ['322GW', '522GW', '622GW'], Viofo: ['A119 Mini 2', 'A129 Plus Duo'], Thinkware: ['F200 Pro', 'U1000'], DDPai: ['Mola N3', 'Z40'] },
  },
];
