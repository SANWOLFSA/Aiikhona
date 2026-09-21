import React, { useState, useEffect } from 'react';
import { Home, ChevronRight, ArrowLeft, Wrench, ShieldAlert, Database, BookmarkCheck, Layers, Search, Tag, GitFork, List, LayoutGrid, CheckCircle } from 'lucide-react';
import { db, auth, collection, query, onSnapshot, orderBy, addDoc, serverTimestamp } from '../lib/firebase';
import { MASTER_CATALOG, ModelSizeItem, BrandItem, DeviceTypeCategory } from '../data/masterCatalogData';

export type { ModelSizeItem, BrandItem, DeviceTypeCategory };
export { MASTER_CATALOG };

export interface FlatDeviceItem {
  categoryKey: string;
  categoryName: string;
  brandKey: string;
  brandName: string;
  modelSizeKey: string;
  item: ModelSizeItem;
}

export const EXACT_USER_DEVICES: { name: string; key: string; image: string }[] = [
  { name: 'Air Conditioner', key: 'air_conditioner', image: 'https://images.unsplash.com/photo-1631545821213-9a3b680518dd?w=200&auto=format&fit=crop&q=80' },
  { name: 'Air Fryer', key: 'air_fryer', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&auto=format&fit=crop&q=80' },
  { name: 'Air Purifier', key: 'air_purifier', image: 'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?w=200&auto=format&fit=crop&q=80' },
  { name: 'Amplifier', key: 'amplifier', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&auto=format&fit=crop&q=80' },
  { name: 'Angle Grinder', key: 'angle_grinder', image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=200&auto=format&fit=crop&q=80' },
  { name: 'Baby Monitor', key: 'baby_monitor', image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=200&auto=format&fit=crop&q=80' },
  { name: 'Battery Charger', key: 'battery_charger', image: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=200&auto=format&fit=crop&q=80' },
  { name: 'Blender', key: 'blender', image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=160&auto=format&fit=crop&q=80' },
  { name: 'Blu-ray Player', key: 'bluray_player', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=160&auto=format&fit=crop&q=80' },
  { name: 'Ceiling Light Fixture', key: 'ceiling_light', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=160&auto=format&fit=crop&q=80' },
  { name: 'Circular Saw', key: 'circular_saw', image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=160&auto=format&fit=crop&q=80' },
  { name: 'Clothes Dryer', key: 'clothes_dryer', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=160&auto=format&fit=crop&q=80' },
  { name: 'Clothes Iron', key: 'clothes_iron', image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=160&auto=format&fit=crop&q=80' },
  { name: 'Coffee Maker / Espresso Machine', key: 'coffee_maker', image: 'https://images.unsplash.com/photo-1517668808822-9ebe02f2a6ea?w=160&auto=format&fit=crop&q=80' },
  { name: 'Computer Monitor', key: 'computer_monitor', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=160&auto=format&fit=crop&q=80' },
  { name: 'Dehumidifier', key: 'dehumidifier', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=160&auto=format&fit=crop&q=80' },
  { name: 'Desk Lamp', key: 'desk_lamp', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=160&auto=format&fit=crop&q=80' },
  { name: 'Desktop PC', key: 'desktop_pc', image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=160&auto=format&fit=crop&q=80' },
  { name: 'Digital Camera / Camcorder', key: 'digital_camera', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=160&auto=format&fit=crop&q=80' },
  { name: 'Digital Thermostat', key: 'digital_thermostat', image: 'https://images.unsplash.com/photo-1567954970774-58d6933c50d6?w=160&auto=format&fit=crop&q=80' },
  { name: 'Dishwasher', key: 'dishwasher', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=160&auto=format&fit=crop&q=80' },
  { name: 'Electric Drill', key: 'electric_drill', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=160&auto=format&fit=crop&q=80' },
  { name: 'Electric Kettle', key: 'electric_kettle', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?w=160&auto=format&fit=crop&q=80' },
  { name: 'Electric Shaver / Trimmer', key: 'electric_shaver', image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=160&auto=format&fit=crop&q=80' },
  { name: 'Electric Toothbrush', key: 'electric_toothbrush', image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=160&auto=format&fit=crop&q=80' },
  { name: 'Epilator', key: 'epilator', image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=160&auto=format&fit=crop&q=80' },
  { name: 'External Hard Drive', key: 'external_hard_drive', image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=160&auto=format&fit=crop&q=80' },
  { name: 'Fan', key: 'fan', image: 'https://images.unsplash.com/photo-1618941716939-553df3c6c278?w=160&auto=format&fit=crop&q=80' },
  { name: 'Flashlight / Torch', key: 'flashlight', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=160&auto=format&fit=crop&q=80' },
  { name: 'Food Processor', key: 'food_processor', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=160&auto=format&fit=crop&q=80' },
  { name: 'Fridge / Refrigerator', key: 'fridge_refrigerator', image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=160&auto=format&fit=crop&q=80' },
  { name: 'Gaming Console', key: 'gaming_console', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=160&auto=format&fit=crop&q=80' },
  { name: 'Garbage Disposal Unit', key: 'garbage_disposal', image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=160&auto=format&fit=crop&q=80' },
  { name: 'Hair Dryer', key: 'hair_dryer', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=160&auto=format&fit=crop&q=80' },
  { name: 'Hair Straightener / Curling Iron', key: 'hair_straightener', image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=160&auto=format&fit=crop&q=80' },
  { name: 'Headphones / Earphones', key: 'headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&auto=format&fit=crop&q=80' },
  { name: 'Heat Gun', key: 'heat_gun', image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=160&auto=format&fit=crop&q=80' },
  { name: 'Home Appliances', key: 'home_appliances', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=160&auto=format&fit=crop&q=80' },
  { name: 'Humidifier', key: 'humidifier', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=160&auto=format&fit=crop&q=80' },
  { name: 'Induction Cooktop / Electric Stove', key: 'induction_cooktop', image: 'https://images.unsplash.com/photo-1626143509950-29c32f6b4329?w=160&auto=format&fit=crop&q=80' },
  { name: 'Juicer', key: 'juicer', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=160&auto=format&fit=crop&q=80' },
  { name: 'Laptop Computer', key: 'laptop_computer', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=160&auto=format&fit=crop&q=80' },
  { name: 'LED Strip Lights', key: 'led_strip', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=160&auto=format&fit=crop&q=80' },
  { name: 'Microphone', key: 'microphone', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=160&auto=format&fit=crop&q=80' },
  { name: 'Microwave', key: 'microwave', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=160&auto=format&fit=crop&q=80' },
  { name: 'Mobile Phone / Smartphone', key: 'mobile_phone', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=160&auto=format&fit=crop&q=80' },
  { name: 'Multimeter', key: 'multimeter', image: 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=160&auto=format&fit=crop&q=80' },
  { name: 'Printer', key: 'printer', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=160&auto=format&fit=crop&q=80' },
  { name: 'Projector', key: 'projector', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=160&auto=format&fit=crop&q=80' },
  { name: 'Radio', key: 'radio', image: 'https://images.unsplash.com/photo-1593078165899-7f4669fdd393?w=160&auto=format&fit=crop&q=80' },
  { name: 'Rice Cooker', key: 'rice_cooker', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=160&auto=format&fit=crop&q=80' },
  { name: 'Robot Vacuum', key: 'robot_vacuum', image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=160&auto=format&fit=crop&q=80' },
  { name: 'Scanner', key: 'scanner', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=160&auto=format&fit=crop&q=80' },
  { name: 'Security Camera', key: 'security_camera', image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=160&auto=format&fit=crop&q=80' },
  { name: 'Slow Cooker / Multi-Cooker', key: 'slow_cooker', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=160&auto=format&fit=crop&q=80' },
  { name: 'Smart Doorbell', key: 'smart_doorbell', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=160&auto=format&fit=crop&q=80' },
  { name: 'Smart Plug', key: 'smart_plug', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=160&auto=format&fit=crop&q=80' },
  { name: 'Smart Watch / Fitness Tracker', key: 'smart_watch', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=160&auto=format&fit=crop&q=80' },
  { name: 'Smoke Detector / Carbon Monoxide Alarm', key: 'smoke_detector', image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=160&auto=format&fit=crop&q=80' },
  { name: 'Soldering Station / Iron', key: 'soldering_station', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=160&auto=format&fit=crop&q=80' },
  { name: 'Soundbar', key: 'soundbar', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=160&auto=format&fit=crop&q=80' },
  { name: 'Speaker (Bluetooth / Portable)', key: 'speaker', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=160&auto=format&fit=crop&q=80' },
  { name: 'Subwoofer', key: 'subwoofer', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=160&auto=format&fit=crop&q=80' },
  { name: 'Toaster / Toaster Oven', key: 'toaster', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=160&auto=format&fit=crop&q=80' },
  { name: 'TV (Television)', key: 'tv_television', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=160&auto=format&fit=crop&q=80' },
  { name: 'Vacuum Cleaner', key: 'vacuum_cleaner', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=160&auto=format&fit=crop&q=80' },
  { name: 'Washing Machine', key: 'washing_machine', image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=160&auto=format&fit=crop&q=80' },
  { name: 'Water Dispenser / Cooler', key: 'water_dispenser', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?w=160&auto=format&fit=crop&q=80' },
  { name: 'Water Heater / Geyser', key: 'water_heater', image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=160&auto=format&fit=crop&q=80' },
  { name: 'Wi-Fi Router / Modem', key: 'wifi_router', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=160&auto=format&fit=crop&q=80' },
  { name: 'Wood Router / Palm Router', key: 'wood_router', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=160&auto=format&fit=crop&q=80' }
];

export interface FlatBrandItem {
  brandKey: string;
  brandName: string;
  categoryKey: string;
  categoryName: string;
  hasModels: boolean;
  itemCount: number;
}

export const BRAND_LOGO_URLS: Record<string, string> = {
  samsung: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
  lg: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg',
  apple: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  sony: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg',
  hisense: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Hisense_Logo.svg',
  philips: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Philips_logo.svg',
  panasonic: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Panasonic_logo.svg',
  defy: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Defy_Appliances_logo.png/320px-Defy_Appliances_logo.png',
  bosch: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Bosch-logo.svg',
  whirlpool: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Whirlpool_Corporation_logo.svg',
  carrier: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Carrier_logo.svg',
  daikin: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Daikin_logo.svg',
  midea: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Midea_logo.svg',
  gree: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Gree_Electric_logo.svg',
  toshiba: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Toshiba_logo.svg',
  sharp: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Sharp_logo.svg',
  tcl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/TCL_Logo.svg',
  dell: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg',
  hp: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg',
  lenovo: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Lenovo_logo_2015.svg',
  asus: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg',
  acer: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Acer_2011.svg',
  canon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canon_logo.svg',
  nikon: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Nikon_logo.svg',
  jbl: 'https://upload.wikimedia.org/wikipedia/commons/0/00/JBL_logo.svg',
  bose: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Bose_logo.svg',
  yamaha: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Yamaha_logo.svg',
  pioneer: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Pioneer_logo.svg',
  makita: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Makita_logo.svg',
  dewalt: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/DeWalt_Logo.svg',
  milwaukee: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Milwaukee_Tool_logo.svg',
  ryobi: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Ryobi_logo.svg',
  nintendo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Nintendo_logo.svg',
  playstation: 'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg',
  xbox: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg',
  microsoft: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg',
  xiaomi: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg',
  dyson: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Dyson_logo.svg',
  irobot: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/IRobot_logo.svg',
  electrolux: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Electrolux_logo.svg',
  haier: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Haier_logo.svg',
  kenwood: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Kenwood_Corporation_logo.svg',
  ninja: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/SharkNinja_logo.svg',
  shark: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/SharkNinja_logo.svg',
  honeywell: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Honeywell_logo.svg',
  google: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  nest: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  amazon: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  ring: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  fluke: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Fluke_Corporation_logo.svg',
  tplink: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/TP-Link_logo_2016.svg',
  netgear: 'https://upload.wikimedia.org/wikipedia/commons/0/04/NETGEAR_Logo.svg',
  linksys: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Linksys_logo.svg',
  anker: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Anker_logo.svg',
  duracell: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Duracell_Logo.svg',
  energizer: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Energizer_logo.svg',
  braun: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Braun_logo.svg',
  remington: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Remington_Products_logo.svg',
  oralb: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Oral-B_logo.svg',
  sandisk: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/SanDisk_logo.svg',
  seagate: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Seagate_logo.svg',
  western_digital: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Western_Digital_logo.svg',
  wd: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Western_Digital_logo.svg',
  shure: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Shure_logo.svg',
  sennheiser: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Sennheiser_logo.svg',
  delonghi: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/De%27Longhi_logo.svg',
  breville: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Breville_logo.svg',
  nespresso: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Nespresso_logo.svg',
  kitchenaid: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/KitchenAid_logo.svg',
  tefal: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Tefal_logo.svg',
  russell_hobbs: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Russell_Hobbs_logo.svg',
  smeg: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Smeg_logo.svg',
  karcher: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/K%C3%A4rcher_logo.svg',
  black_decker: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Black_%26_Decker_logo.svg',
  hitachi: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Hitachi_logo.svg',
  mitsubishi: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Mitsubishi-logo.svg',
  fujitsu: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Fujitsu-logo.svg',
  vizio: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Vizio_logo.svg',
  jvc: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/JVC_logo.svg',
  rca: 'https://upload.wikimedia.org/wikipedia/commons/3/34/RCA_logo.svg',
  sanyo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Sanyo_logo.svg',
  cosori: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Cosori_logo.svg/320px-Cosori_logo.svg.png',
  instant_pot: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Instant_Brands_Logo.svg/320px-Instant_Brands_Logo.svg.png',
  instant_brands: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Instant_Brands_Logo.svg/320px-Instant_Brands_Logo.svg.png',
  cuisinart: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Cuisinart_logo.svg/320px-Cuisinart_logo.svg.png',
  hamilton_beach: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Hamilton_Beach_Brands_logo.svg/320px-Hamilton_Beach_Brands_logo.svg.png',
  salter: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Salter_logo.png/320px-Salter_logo.png',
  oster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Oster_logo.svg/320px-Oster_logo.svg.png',
  sunbeam: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Sunbeam_Products_logo.svg/320px-Sunbeam_Products_logo.svg.png',
  krups: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Krups_logo.svg/320px-Krups_logo.svg.png',
  morphy_richards: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Morphy_Richards_logo.svg/320px-Morphy_Richards_logo.svg.png',
  westinghouse: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Westinghouse_Electric_Corporation_logo.svg/320px-Westinghouse_Electric_Corporation_logo.svg.png',
  gourmia: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=100&auto=format&fit=crop&q=80',
  dash: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Dash_Inroads_logo.svg/320px-Dash_Inroads_logo.svg.png',
  chefman: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Chefman_logo.png/320px-Chefman_logo.png',
  nuwave: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/NuWave_logo.png/320px-NuWave_logo.png',
  powerxl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/PowerXL_logo.png/320px-PowerXL_logo.png',
  farberware: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Farberware_logo.svg/320px-Farberware_logo.svg.png',
  kalorik: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Kalorik_logo.png/320px-Kalorik_logo.png',
  severin: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Severin_Elektroger%C3%A4te_logo.svg/320px-Severin_Elektroger%C3%A4te_logo.svg.png',
  galanz: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Galanz_logo.svg/320px-Galanz_logo.svg.png',
  joyoung: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Joyoung_logo.svg/320px-Joyoung_logo.svg.png',
  sencor: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Sencor_logo.svg/320px-Sencor_logo.svg.png',
  telefunken: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Telefunken-Logo.svg/320px-Telefunken-Logo.svg.png',
  changhong: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Changhong_logo.svg/320px-Changhong_logo.svg.png',
  konka: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Konka_logo.svg/320px-Konka_logo.svg.png',
  skyworth: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Skyworth_logo.svg/320px-Skyworth_logo.svg.png',
  sceptre: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sceptre_logo.svg/320px-Sceptre_logo.svg.png',
  sansui: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sansui_Electric_logo.svg/320px-Sansui_Electric_logo.svg.png',
  aiwa: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Aiwa_logo.svg/320px-Aiwa_logo.svg.png',
  akai: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Akai_logo.svg/320px-Akai_logo.svg.png',
  polaroid: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Polaroid_Corporation_logo.svg/320px-Polaroid_Corporation_logo.svg.png',
  blaupunkt: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Blaupunkt_logo.svg/320px-Blaupunkt_logo.svg.png'
};

export const BrandLogoBadge = ({ brandName, className = "w-10 h-10" }: { brandName: string; className?: string }) => {
  const [imgError, setImgError] = React.useState(false);
  const normalizedKey = brandName.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '');
  
  let logoUrl = BRAND_LOGO_URLS[normalizedKey];
  
  if (!logoUrl) {
    const match = Object.keys(BRAND_LOGO_URLS).find(k => normalizedKey.includes(k) || k.includes(normalizedKey));
    if (match) {
      logoUrl = BRAND_LOGO_URLS[match];
    }
  }

  if (logoUrl && !imgError) {
    return (
      <div className={`${className} rounded-xl bg-white dark:bg-stone-800 p-1.5 border border-stone-200 dark:border-stone-700 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden group-hover:border-blue-500 transition-colors`}>
        <img
          src={logoUrl}
          alt={`${brandName} logo`}
          className="max-w-full max-h-full object-contain"
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`${className} rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs border border-blue-500/30 tracking-wider`}>
      {brandName.substring(0, 2).toUpperCase()}
    </div>
  );
};

export const ALL_FLAT_DEVICES: FlatDeviceItem[] = [];
export const ALL_UNIQUE_BRANDS: FlatBrandItem[] = [];

Object.entries(MASTER_CATALOG).forEach(([catKey, cat]) => {
  Object.entries(cat.brands).forEach(([brandKey, brand]) => {
    const itemCount = brand.hasModels
      ? (brand.models ? Object.keys(brand.models).length : 0)
      : (brand.sizes ? Object.keys(brand.sizes).length : 0);

    ALL_UNIQUE_BRANDS.push({
      brandKey,
      brandName: brand.name,
      categoryKey: catKey,
      categoryName: cat.name,
      hasModels: brand.hasModels,
      itemCount
    });

    const dict = brand.hasModels ? brand.models : brand.sizes;
    if (dict) {
      Object.entries(dict).forEach(([itemKey, item]) => {
        ALL_FLAT_DEVICES.push({
          categoryKey: catKey,
          categoryName: cat.name,
          brandKey,
          brandName: brand.name,
          modelSizeKey: itemKey,
          item
        });
      });
    }
  });
});

ALL_FLAT_DEVICES.sort((a, b) => {
  const nameA = a.item.name || a.modelSizeKey;
  const nameB = b.item.name || b.modelSizeKey;
  return nameA.localeCompare(nameB);
});

ALL_UNIQUE_BRANDS.sort((a, b) => a.brandName.localeCompare(b.brandName));

export default function DeviceDirectoryView({
  savedGuideIds,
  onToggleSaveGuide,
  onSourcePart
}: {
  savedGuideIds?: string[];
  onToggleSaveGuide?: (guide: any) => void;
  onSourcePart?: (partNumber: string) => void;
}) {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);
  const [selectedBrandKey, setSelectedBrandKey] = useState<string | null>(null);
  const [selectedModelSizeKey, setSelectedModelSizeKey] = useState<string | null>(null);
  const [discoveredDevices, setDiscoveredDevices] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const lastSearchedTerm = React.useRef('');

  useEffect(() => {
      const q = query(collection(db, 'discoveredDevices'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setDiscoveredDevices(data);
      });
      return () => unsubscribe();
  }, []);

  useEffect(() => {
      if (allDevicesSearch.length > 3 && lastSearchedTerm.current !== allDevicesSearch) {
          const search = allDevicesSearch.toLowerCase();
          const foundLocally = ALL_FLAT_DEVICES.some(d => 
              (d.item.name || d.modelSizeKey).toLowerCase().includes(search) ||
              d.brandName.toLowerCase().includes(search) ||
              d.categoryName.toLowerCase().includes(search)
          );
          const foundDiscovered = discoveredDevices.some(d => 
              d.model.toLowerCase().includes(search) ||
              d.brand.toLowerCase().includes(search) ||
              d.category.toLowerCase().includes(search)
          );
          
          if (!foundLocally && !foundDiscovered) {
              lastSearchedTerm.current = allDevicesSearch;
              handleAutoDiscovery(allDevicesSearch);
          }
      }
  }, [allDevicesSearch, discoveredDevices]);

  const handleAutoDiscovery = async (query: string) => {
      setIsSyncing(true);
      try {
          const response = await fetch('/api/device-search', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ query })
          });
          if (response.ok) {
              const data = await response.json();
              console.log("Device discovered:", data);
          }
      } catch (e) {
          console.error("Auto-discovery failed:", e);
      } finally {
          setIsSyncing(false);
      }
  };
  const [activeTab, setActiveTab] = useState<'device_types' | 'all_devices' | 'all_brands' | 'models_sizes' | 'bulk_import_hub'>('device_types');
  const [allDevicesSearch, setAllDevicesSearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [modelRouteFilter, setModelRouteFilter] = useState<'all' | 'route_a' | 'route_b'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [addedToDatabase, setAddedToDatabase] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Get list of sorted category keys for alphabetical order
  const sortedCategoryKeys = Object.keys(MASTER_CATALOG).sort((a, b) =>
    MASTER_CATALOG[a].name.localeCompare(MASTER_CATALOG[b].name)
  );

  const selectedCategory = selectedCategoryKey ? MASTER_CATALOG[selectedCategoryKey] : null;
  
  const sortedBrandKeys = selectedCategory
    ? Object.keys(selectedCategory.brands).sort((a, b) =>
        selectedCategory.brands[a].name.localeCompare(selectedCategory.brands[b].name)
      )
    : [];

  const selectedBrand = (selectedCategory && selectedBrandKey)
    ? selectedCategory.brands[selectedBrandKey]
    : null;

  const modelOrSizeDict = selectedBrand
    ? (selectedBrand.hasModels ? selectedBrand.models : selectedBrand.sizes)
    : null;

  const sortedModelSizeKeys = modelOrSizeDict
    ? Object.keys(modelOrSizeDict).sort((a, b) =>
        (modelOrSizeDict[a].name || a).localeCompare(modelOrSizeDict[b].name || b)
      )
    : [];

  const selectedModelSize = (modelOrSizeDict && selectedModelSizeKey)
    ? modelOrSizeDict[selectedModelSizeKey]
    : null;

  const handleHomeClick = () => {
    setSelectedCategoryKey(null);
    setSelectedBrandKey(null);
    setSelectedModelSizeKey(null);
    setAddedToDatabase(false);
  };

  const handleSelectCategory = (key: string) => {
    setSelectedCategoryKey(key);
    setSelectedBrandKey(null);
    setSelectedModelSizeKey(null);
    setAddedToDatabase(false);
  };

  const handleSelectBrand = (key: string) => {
    setSelectedBrandKey(key);
    setSelectedModelSizeKey(null);
    setAddedToDatabase(false);
  };

  const handleSelectModelSize = (key: string) => {
    setSelectedModelSizeKey(key);
    setAddedToDatabase(false);
  };

  const handleSaveToWorkbench = async () => {
    if (!selectedCategory || !selectedBrand || !selectedModelSize) return;

    const uid = auth.currentUser?.uid || 'guest_user';
    const deviceId = `${uid}_${Date.now()}`;

    setIsSaving(true);

    try {
      await setDoc(doc(db, 'user_saved_devices', deviceId), {
        userId: uid,
        categoryName: selectedCategory.name,
        brandName: selectedBrand.name,
        modelOrSizeName: selectedModelSize.name || selectedModelSizeKey,
        addedAt: serverTimestamp(),
        repairSteps: selectedModelSize.steps
      });

      setAddedToDatabase(true);
      setTimeout(() => setAddedToDatabase(false), 3000);
    } catch (error) {
      console.error('Error saving device to database:', error);
      alert('Failed to save to database.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* HEADER & TOP BREADCRUMB WITH HOME ICON + NAV TABS AT TOP LEFT */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Side: Navigation Tabs + App Title + Breadcrumb Path */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          
          {/* Main Top Navigation Row */}
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                setActiveTab('device_types');
                handleHomeClick();
              }}
              className={`p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 ${
                activeTab === 'device_types' && !selectedCategoryKey
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
              title="Return to Device Types"
            >
              <Home className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setActiveTab('all_devices');
                setSelectedCategoryKey(null);
                setSelectedBrandKey(null);
                setSelectedModelSizeKey(null);
                setAddedToDatabase(false);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === 'all_devices' && !selectedCategoryKey
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>All Devices</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('all_brands');
                setSelectedCategoryKey(null);
                setSelectedBrandKey(null);
                setSelectedModelSizeKey(null);
                setAddedToDatabase(false);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === 'all_brands' && !selectedCategoryKey
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Brands</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('models_sizes');
                setSelectedCategoryKey(null);
                setSelectedBrandKey(null);
                setSelectedModelSizeKey(null);
                setAddedToDatabase(false);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === 'models_sizes' && !selectedCategoryKey
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <GitFork className="w-4 h-4" />
              <span>Models / Sizes</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('bulk_import_hub');
                setSelectedCategoryKey(null);
                setSelectedBrandKey(null);
                setSelectedModelSizeKey(null);
                setAddedToDatabase(false);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === 'bulk_import_hub' && !selectedCategoryKey
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Bulk Import & OEM Hub</span>
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-stone-900 dark:text-stone-100">
                Device Directory Engine
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider">
                Multi-Tier
              </span>
            </div>

            {/* Breadcrumb path */}
            <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mt-0.5 overflow-x-auto no-scrollbar">
              <span
                onClick={() => {
                  setActiveTab('device_types');
                  handleHomeClick();
                }}
                className={`cursor-pointer hover:underline ${!selectedCategory && activeTab === 'device_types' ? 'font-bold text-blue-600 dark:text-blue-400' : ''}`}
              >
                Device Types
              </span>

              {activeTab === 'all_devices' && !selectedCategory && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    All Devices ({ALL_FLAT_DEVICES.length})
                  </span>
                </>
              )}

              {activeTab === 'all_brands' && !selectedCategory && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    Brands ({ALL_UNIQUE_BRANDS.length})
                  </span>
                </>
              )}

              {activeTab === 'models_sizes' && !selectedCategory && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    Conditional Routing (Models OR Sizes)
                  </span>
                </>
              )}

              {activeTab === 'bulk_import_hub' && !selectedCategory && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    Bulk Import & Universal OEM Chassis Hub
                  </span>
                </>
              )}

              {selectedCategory && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  <span
                    onClick={() => { setSelectedBrandKey(null); setSelectedModelSizeKey(null); }}
                    className={`cursor-pointer hover:underline ${selectedCategory && !selectedBrand ? 'font-bold text-blue-600 dark:text-blue-400' : ''}`}
                  >
                    {selectedCategory.name}
                  </span>
                </>
              )}

              {selectedBrand && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  <span
                    onClick={() => setSelectedModelSizeKey(null)}
                    className={`cursor-pointer hover:underline ${selectedBrand && !selectedModelSize ? 'font-bold text-blue-600 dark:text-blue-400' : ''}`}
                  >
                    {selectedBrand.name}
                  </span>
                </>
              )}

              {selectedModelSize && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-bold text-blue-600 dark:text-blue-400 truncate max-w-[180px]">
                    {selectedModelSize.name || selectedModelSizeKey}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Controls: List vs Grid Toggle + Back Button */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
          {/* View Mode Toggle Switch */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-stone-900 text-blue-600 dark:text-blue-400 shadow-xs font-black'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
              title="Switch to List View"
            >
              <List className="w-4 h-4" />
              <span>List View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-stone-900 text-blue-600 dark:text-blue-400 shadow-xs font-black'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
              title="Switch to Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Grid View</span>
            </button>
          </div>

          {selectedCategory && (
            <button
              onClick={() => {
                if (selectedModelSizeKey) setSelectedModelSizeKey(null);
                else if (selectedBrandKey) setSelectedBrandKey(null);
                else setSelectedCategoryKey(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* ALL DEVICES MASTER LIST VIEW (EXACT USER SPECIFIED CATALOG) */}
      {/* ======================================================== */}
      {activeTab === 'all_devices' && !selectedCategoryKey && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-black text-stone-900 dark:text-stone-100">
                  All Devices Master Directory
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Master index of all 71 device categories in exact list order.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                {EXACT_USER_DEVICES.filter(d => 
                  d.name.toLowerCase().includes(allDevicesSearch.toLowerCase())
                ).length} / {EXACT_USER_DEVICES.length} Devices
              </span>
            </div>

            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={allDevicesSearch}
                onChange={(e) => setAllDevicesSearch(e.target.value)}
                placeholder="Search all 71 devices (e.g. Air Conditioner, Mobile Phone, Microwave)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {isSyncing && <span className="absolute right-3 top-3 text-xs text-blue-500 animate-pulse font-bold">Syncing...</span>}
              {!isSyncing && allDevicesSearch && (
                <button
                  onClick={() => setAllDevicesSearch('')}
                  className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="divide-y divide-stone-200 dark:divide-stone-800 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
              {EXACT_USER_DEVICES.filter(d =>
                d.name.toLowerCase().includes(allDevicesSearch.toLowerCase())
              ).map((deviceItem, idx) => {
                const catalogEntry = MASTER_CATALOG[deviceItem.key];
                const brandKeys = catalogEntry ? Object.keys(catalogEntry.brands) : [];
                const brandCount = brandKeys.length;

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectCategory(deviceItem.key)}
                    className="p-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer transition-colors flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Representative Device Picture */}
                      <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 overflow-hidden shrink-0 border border-stone-200 dark:border-stone-700 shadow-2xs group-hover:scale-105 transition-transform">
                        <img
                          src={deviceItem.image}
                          alt={deviceItem.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-stone-400">
                            #{idx + 1}
                          </span>
                          <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors truncate">
                            {deviceItem.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                            {brandCount} {brandCount === 1 ? 'Manufacturer' : 'Manufacturers'}
                          </p>
                          {brandKeys.length > 0 && (
                            <div className="flex items-center gap-1">
                              {brandKeys.slice(0, 5).map(bKey => (
                                <BrandLogoBadge key={bKey} brandName={catalogEntry.brands[bKey].name} className="w-5 h-5 !p-0.5 !rounded-md" />
                              ))}
                              {brandKeys.length > 5 && (
                                <span className="text-[10px] font-mono font-bold text-stone-400">
                                  +{brandKeys.length - 5}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline hidden sm:inline">
                        View Brands & Models
                      </span>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {EXACT_USER_DEVICES.filter(d =>
                d.name.toLowerCase().includes(allDevicesSearch.toLowerCase())
              ).map((deviceItem, idx) => {
                const catalogEntry = MASTER_CATALOG[deviceItem.key];
                const brandKeys = catalogEntry ? Object.keys(catalogEntry.brands) : [];
                const brandCount = brandKeys.length;

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectCategory(deviceItem.key)}
                    className="group bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-xl hover:border-blue-500 cursor-pointer transition-all duration-200 flex flex-col justify-between gap-3"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 rounded-xl bg-stone-100 dark:bg-stone-800 overflow-hidden shrink-0 border border-stone-200 dark:border-stone-700 shadow-2xs group-hover:scale-105 transition-transform">
                        <img
                          src={deviceItem.image}
                          alt={deviceItem.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-mono font-bold text-stone-400">
                          #{idx + 1}
                        </span>
                        <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors truncate">
                          {deviceItem.name}
                        </h3>
                        <p className="text-xs text-stone-400 font-medium">
                          {brandCount} Manufacturers
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                        <ChevronRight className="w-4 h-4 group-hover:translate-0.5 transition-transform" />
                      </div>
                    </div>

                    {brandKeys.length > 0 && (
                      <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Brands</span>
                        <div className="flex items-center gap-1">
                          {brandKeys.slice(0, 6).map(bKey => (
                            <BrandLogoBadge key={bKey} brandName={catalogEntry.brands[bKey].name} className="w-6 h-6 !p-0.5 !rounded-lg" />
                          ))}
                          {brandKeys.length > 6 && (
                            <span className="text-[10px] font-mono font-bold text-stone-400 pl-1">
                              +{brandKeys.length - 6}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* BRANDS DIRECTORY VIEW                                    */}
      {/* ======================================================== */}
      {activeTab === 'all_brands' && !selectedCategoryKey && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-black text-stone-900 dark:text-stone-100">
                  Manufacturer Brands Directory
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  All active manufacturers. Select a brand to view its distinct models or capacities.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                {ALL_UNIQUE_BRANDS.filter(b =>
                  b.brandName.toLowerCase().includes(brandSearch.toLowerCase()) ||
                  b.categoryName.toLowerCase().includes(brandSearch.toLowerCase())
                ).length} / {ALL_UNIQUE_BRANDS.length} Brands
              </span>
            </div>

            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder="Search brands (e.g. Defy, Samsung, Hisense, Apple, Philips)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {brandSearch && (
                <button
                  onClick={() => setBrandSearch('')}
                  className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="divide-y divide-stone-200 dark:divide-stone-800 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
              {ALL_UNIQUE_BRANDS.filter(b =>
                b.brandName.toLowerCase().includes(brandSearch.toLowerCase()) ||
                b.categoryName.toLowerCase().includes(brandSearch.toLowerCase())
              ).map((brandItem, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedCategoryKey(brandItem.categoryKey);
                    setSelectedBrandKey(brandItem.brandKey);
                  }}
                  className="p-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer transition-colors flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <BrandLogoBadge brandName={brandItem.brandName} />
                    <div className="min-w-0">
                      <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors truncate">
                        {brandItem.brandName}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-medium truncate">
                        Category: {brandItem.categoryName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {brandItem.hasModels ? (
                      <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider">
                        Route A: {brandItem.itemCount} Models
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider">
                        Route B: {brandItem.itemCount} Sizes
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ALL_UNIQUE_BRANDS.filter(b =>
                b.brandName.toLowerCase().includes(brandSearch.toLowerCase()) ||
                b.categoryName.toLowerCase().includes(brandSearch.toLowerCase())
              ).map((brandItem, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedCategoryKey(brandItem.categoryKey);
                    setSelectedBrandKey(brandItem.brandKey);
                  }}
                  className="group bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-xl hover:border-blue-500 cursor-pointer transition-all duration-200 flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <BrandLogoBadge brandName={brandItem.brandName} />
                    <div className="min-w-0">
                      <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors truncate">
                        {brandItem.brandName}
                      </h3>
                      <p className="text-[11px] text-stone-400 font-medium truncate">
                        {brandItem.categoryName}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    {brandItem.hasModels ? (
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider">
                        Route A: {brandItem.itemCount} Models
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider">
                        Route B: {brandItem.itemCount} Sizes
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-stone-300 group-hover:translate-x-1 group-hover:text-blue-600 transition-all shrink-0" />
                  </div>
                </div>
              ))}
        </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODELS / SIZES (CONDITIONAL ROUTING) DIRECTORY VIEW      */}
      {/* ======================================================== */}
      {activeTab === 'models_sizes' && !selectedCategoryKey && (
        <div className="space-y-6">
          
          {/* Conditional Routing Architecture Banner */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <GitFork className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-base font-black text-stone-900 dark:text-stone-100">
                    Conditional Routing Pipeline (Models OR Sizes)
                  </h2>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Devices dynamically route to solutions screens via model lineage or capacity dimensions.
                </p>
              </div>

              {/* Filter Tabs for Route A vs Route B */}
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl self-start md:self-auto shrink-0 text-xs font-bold">
                <button
                  onClick={() => setModelRouteFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${modelRouteFilter === 'all' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-black' : 'text-stone-500 hover:text-stone-800'}`}
                >
                  All ({ALL_FLAT_DEVICES.length})
                </button>
                <button
                  onClick={() => setModelRouteFilter('route_a')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${modelRouteFilter === 'route_a' ? 'bg-blue-600 text-white shadow-xs font-black' : 'text-stone-500 hover:text-stone-800'}`}
                >
                  Route A: Models
                </button>
                <button
                  onClick={() => setModelRouteFilter('route_b')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${modelRouteFilter === 'route_b' ? 'bg-amber-500 text-stone-950 shadow-xs font-black' : 'text-stone-500 hover:text-stone-800'}`}
                >
                  Route B: Sizes
                </button>
              </div>
            </div>

            {/* Route Explanation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-100 dark:border-stone-800">
              
              {/* Route A Info Box */}
              <div className="bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                    Route A: Brand → Models → Solutions
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                    Phones, TVs, Microwaves, Audio
                  </span>
                </div>
                <p className="text-[11px] text-blue-950 dark:text-blue-200 leading-relaxed font-medium">
                  For devices with distinct engineering model numbers (e.g. Samsung Galaxy S23, Hisense 55A6H, Defy DMO 300).
                </p>
              </div>

              {/* Route B Info Box */}
              <div className="bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                    Route B: Brand → Sizes → Solutions
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold">
                    Air Fryers, Refrigerators
                  </span>
                </div>
                <p className="text-[11px] text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
                  For devices using physical capacity/dimensions (e.g. 3.5L, 5L, Single Door 150L, Side-by-Side) or where model numbers are omitted.
                </p>
              </div>

            </div>
          </div>

          {/* Items Display */}
          {viewMode === 'list' ? (
            <div className="divide-y divide-stone-200 dark:divide-stone-800 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
              { [...ALL_FLAT_DEVICES, ...discoveredDevices.map(d => ({
                 categoryKey: d.category.toLowerCase().replace(/\s+/g, '_'),
                 categoryName: d.category,
                 brandKey: d.brand.toLowerCase().replace(/\s+/g, '_'),
                 brandName: d.brand,
                 modelSizeKey: d.model,
                 item: { name: d.model, description: d.description }
              }))].filter(d => {
                const category = MASTER_CATALOG[d.categoryKey];
                const brand = category ? category.brands[d.brandKey] : null;
                const isRouteA = brand ? brand.hasModels : true;

                if (modelRouteFilter === 'route_a' && !isRouteA) return false;
                if (modelRouteFilter === 'route_b' && isRouteA) return false;

                const search = allDevicesSearch.toLowerCase();
                return (
                  (d.item.name || d.modelSizeKey).toLowerCase().includes(search) ||
                  d.brandName.toLowerCase().includes(search) ||
                  d.categoryName.toLowerCase().includes(search)
                );
              }).map((flatDev, idx) => {
                const category = MASTER_CATALOG[flatDev.categoryKey];
                const brand = category ? category.brands[flatDev.brandKey] : null;
                const isRouteA = brand ? brand.hasModels : true;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedCategoryKey(flatDev.categoryKey);
                      setSelectedBrandKey(flatDev.brandKey);
                      setSelectedModelSizeKey(flatDev.modelSizeKey);
                    }}
                    className="p-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px] font-bold">
                          {flatDev.categoryName}
                        </span>
                        <span className="text-xs font-bold text-stone-400">
                          {flatDev.brandName}
                        </span>
                        {isRouteA ? (
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase">
                            Route A: Model
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase">
                            Route B: Size
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors">
                        {flatDev.item.name || flatDev.modelSizeKey}
                      </h3>

                      {flatDev.item.commonIssues && flatDev.item.commonIssues.length > 0 && (
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate max-w-2xl">
                          ⚠️ {flatDev.item.commonIssues[0]}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 text-xs font-bold text-blue-600 dark:text-blue-400">
                      <span>Open Solutions</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              { [...ALL_FLAT_DEVICES, ...discoveredDevices.map(d => ({
                 categoryKey: d.category.toLowerCase().replace(/\s+/g, '_'),
                 categoryName: d.category,
                 brandKey: d.brand.toLowerCase().replace(/\s+/g, '_'),
                 brandName: d.brand,
                 modelSizeKey: d.model,
                 item: { name: d.model, description: d.description }
              }))].filter(d => {
                const category = MASTER_CATALOG[d.categoryKey];
                const brand = category ? category.brands[d.brandKey] : null;
                const isRouteA = brand ? brand.hasModels : true;

                if (modelRouteFilter === 'route_a' && !isRouteA) return false;
                if (modelRouteFilter === 'route_b' && isRouteA) return false;

                const search = allDevicesSearch.toLowerCase();
                return (
                  (d.item.name || d.modelSizeKey).toLowerCase().includes(search) ||
                  d.brandName.toLowerCase().includes(search) ||
                  d.categoryName.toLowerCase().includes(search)
                );
              }).map((flatDev, idx) => {
                const category = MASTER_CATALOG[flatDev.categoryKey];
                const brand = category ? category.brands[flatDev.brandKey] : null;
                const isRouteA = brand ? brand.hasModels : true;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedCategoryKey(flatDev.categoryKey);
                      setSelectedBrandKey(flatDev.brandKey);
                      setSelectedModelSizeKey(flatDev.modelSizeKey);
                    }}
                    className="group bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-xl hover:border-blue-500 cursor-pointer transition-all duration-200 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px] font-bold">
                          {flatDev.categoryName}
                        </span>

                        {isRouteA ? (
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase">
                            Route A: Model
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase">
                            Route B: Size
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                          {flatDev.brandName}
                        </div>
                        <h3 className="text-base font-black text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors">
                          {flatDev.item.name || flatDev.modelSizeKey}
                        </h3>
                      </div>

                      {flatDev.item.commonIssues && flatDev.item.commonIssues.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase text-stone-400">
                            Symptom Preview:
                          </span>
                          <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                            ⚠️ {flatDev.item.commonIssues[0]}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                      <span>Open Solutions Screen</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TIER 1: CLEAN DEVICE TYPES LIST (ALPHABETICAL ORDER)    */}
      {/* ======================================================== */}
      {!selectedCategoryKey && activeTab === 'device_types' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-stone-900 dark:text-stone-100">
                Select Device Type
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Alphabetical category directory. Select a device type to view manufacturers.
              </p>
            </div>
            <span className="text-xs font-mono text-stone-400 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-xl">
              {sortedCategoryKeys.length} Device Types
            </span>
          </div>

          {viewMode === 'list' ? (
            <div className="divide-y divide-stone-200 dark:divide-stone-800 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
              {sortedCategoryKeys.map((key) => {
                const cat = MASTER_CATALOG[key];
                const brandCount = Object.keys(cat.brands).length;

                return (
                  <div
                    key={key}
                    onClick={() => handleSelectCategory(key)}
                    className="p-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer transition-colors flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                        {cat.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors truncate">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                          {brandCount} {brandCount === 1 ? 'Manufacturer' : 'Manufacturers'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline hidden sm:inline">
                        View Manufacturers
                      </span>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedCategoryKeys.map((key) => {
                const cat = MASTER_CATALOG[key];
                const brandCount = Object.keys(cat.brands).length;

                return (
                  <div
                    key={key}
                    onClick={() => handleSelectCategory(key)}
                    className="group bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-xl hover:border-blue-500 cursor-pointer transition-all duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                        {cat.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-black text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-stone-400 font-medium">
                          {brandCount} {brandCount === 1 ? 'Manufacturer' : 'Manufacturers'}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                      <ChevronRight className="w-4 h-4 group-hover:translate-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TIER 2: BRAND SELECTION PAGE                            */}
      {/* ======================================================== */}
      {selectedCategory && !selectedBrandKey && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => setSelectedCategoryKey(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-blue-600 mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Device Types
              </button>
              <h2 className="text-base font-black text-stone-900 dark:text-stone-100">
                Select {selectedCategory.name} Brand
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-400 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-xl">
              {sortedBrandKeys.length} Brands
            </span>
          </div>

          {viewMode === 'list' ? (
            <div className="divide-y divide-stone-200 dark:divide-stone-800 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
              {sortedBrandKeys.map((brandKey) => {
                const brand = selectedCategory.brands[brandKey];
                const itemCount = brand.hasModels
                  ? (brand.models ? Object.keys(brand.models).length : 0)
                  : (brand.sizes ? Object.keys(brand.sizes).length : 0);

                return (
                  <div
                    key={brandKey}
                    onClick={() => handleSelectBrand(brandKey)}
                    className="p-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer transition-colors flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <BrandLogoBadge brandName={brand.name} />
                      <div className="min-w-0">
                        <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors truncate">
                          {brand.name}
                        </h3>
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                          {itemCount} {brand.hasModels ? 'Models' : 'Capacities / Sizes'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline hidden sm:inline">
                        Select Brand
                      </span>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedBrandKeys.map((brandKey) => {
                const brand = selectedCategory.brands[brandKey];
                const itemCount = brand.hasModels
                  ? (brand.models ? Object.keys(brand.models).length : 0)
                  : (brand.sizes ? Object.keys(brand.sizes).length : 0);

                return (
                  <div
                    key={brandKey}
                    onClick={() => handleSelectBrand(brandKey)}
                    className="group bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-lg hover:border-blue-500 cursor-pointer transition-all duration-200 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <BrandLogoBadge brandName={brand.name} />
                      <div className="truncate">
                        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors truncate">
                          {brand.name}
                        </h3>
                        <p className="text-[11px] text-stone-400 font-medium truncate">
                          {itemCount} {brand.hasModels ? 'Models' : 'Capacities / Sizes'}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-300 group-hover:translate-x-1 group-hover:text-blue-600 transition-all shrink-0" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TIER 3: MODELS OR SIZES SELECTION                        */}
      {/* ======================================================== */}
      {selectedCategory && selectedBrand && !selectedModelSizeKey && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => setSelectedBrandKey(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-blue-600 mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to {selectedCategory.name} Brands
              </button>
              <h2 className="text-base font-black text-stone-900 dark:text-stone-100">
                {selectedBrand.name} — Select {selectedBrand.hasModels ? 'Model' : 'Capacity / Size'}
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-400 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-xl">
              {sortedModelSizeKeys.length} {selectedBrand.hasModels ? 'Models' : 'Sizes'}
            </span>
          </div>

          {viewMode === 'list' ? (
            <div className="divide-y divide-stone-200 dark:divide-stone-800 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
              {sortedModelSizeKeys.map((itemKey) => {
                const item = modelOrSizeDict ? modelOrSizeDict[itemKey] : null;
                if (!item) return null;

                return (
                  <div
                    key={itemKey}
                    onClick={() => handleSelectModelSize(itemKey)}
                    className="p-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase">
                          {selectedBrand.name}
                        </span>
                        <span className="text-xs font-bold text-stone-400">
                          {item.steps.length} Diagnostic Steps
                        </span>
                      </div>

                      <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors">
                        {item.name || itemKey}
                      </h3>

                      {item.commonIssues && item.commonIssues.length > 0 && (
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate max-w-2xl">
                          ⚠️ {item.commonIssues.join(', ')}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 text-xs font-bold text-blue-600 dark:text-blue-400">
                      <span>Open Repair Sheet</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedModelSizeKeys.map((itemKey) => {
                const item = modelOrSizeDict ? modelOrSizeDict[itemKey] : null;
                if (!item) return null;

                return (
                  <div
                    key={itemKey}
                    onClick={() => handleSelectModelSize(itemKey)}
                    className="group bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-xl hover:border-blue-500 cursor-pointer transition-all duration-200 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase">
                          {selectedBrand.name}
                        </span>
                        <span className="text-[11px] font-bold text-stone-400">
                          {item.steps.length} Diagnostic Steps
                        </span>
                      </div>

                      <h3 className="text-base font-black text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors">
                        {item.name || itemKey}
                      </h3>

                      {item.commonIssues && item.commonIssues.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-bold uppercase text-stone-400">
                            Common Failure Points:
                          </span>
                          <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-0.5">
                            {item.commonIssues.slice(0, 2).map((issue, idx) => (
                              <li key={idx} className="flex items-center gap-1.5 truncate">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                                <span className="truncate">{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-all">
                      <span>Open Repair Sheet</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TIER 4: STEP-BY-STEP REPAIR MANUAL & DIAGNOSTIC SHEET     */}
      {/* ======================================================== */}
      {selectedCategory && selectedBrand && selectedModelSize && (
        <div className="space-y-6">
          
          {/* Header Bar for Manual */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <button
                onClick={() => setSelectedModelSizeKey(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-blue-600 mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to {selectedBrand.name} List
              </button>
              <h1 className="text-xl md:text-2xl font-black text-stone-900 dark:text-stone-100">
                {selectedBrand.name} — {selectedModelSize.name || selectedModelSizeKey}
              </h1>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Category: {selectedCategory.name}
              </p>
            </div>

            <button
              onClick={handleSaveToWorkbench}
              disabled={isSaving}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-xs ${
                addedToDatabase
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {addedToDatabase ? (
                <>
                  <BookmarkCheck className="w-4 h-4" />
                  <span>Saved to Workbench DB</span>
                </>
              ) : (
                <>
                  <Database className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save to My Workbench DB'}</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Column: Diagnostic Protocol Steps */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Common Issues / Failure Symptoms */}
              {selectedModelSize.commonIssues && (
                <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
                  <h2 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 flex items-center gap-2 tracking-wider">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Common Failure Symptoms</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedModelSize.commonIssues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-950 dark:text-amber-200 font-medium"
                      >
                        <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0"></span>
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
            </div>
              )}

              {/* Step-By-Step Diagnostic Protocol */}
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
                <h2 className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 flex items-center gap-2 tracking-wider">
                  <CheckCircle className="w-4 h-4" />
                  <span>Step-By-Step Troubleshooting Protocol</span>
                </h2>

                <div className="space-y-3">
                  {selectedModelSize.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 p-4 rounded-xl flex items-start gap-3.5"
                    >
                      <div className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Column: Required Tools */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
                <h2 className="text-xs font-black uppercase text-stone-900 dark:text-stone-100 flex items-center gap-2 tracking-wider">
                  <Wrench className="w-4 h-4 text-blue-600" />
                  <span>Required Precision Tools</span>
                </h2>

                <div className="flex flex-wrap gap-2">
                  {selectedModelSize.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* BULK MODERN IMPORT & UNIVERSAL OEM CHASSIS HUB          */}
      {/* ======================================================== */}
      {activeTab === 'bulk_import_hub' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-stone-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 space-y-3 max-w-3xl">
              <span className="px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs font-black uppercase tracking-wider">
                Containerized Procurement & White-Label ODM Intelligence
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Bulk Modern Import & Universal OEM Chassis Hub
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Modern budget and regional electronics (such as Utsave, Condere, Harwa, SuperSonic, Sceptre, Onn, Element, Westinghouse, etc.) are procured in bulk via international containerized shipping. Underneath diverse retail brand names, these devices share standardized modular OEM motherboards and power architectures. This hub maps cross-brand interoperability, shared chassis standards, and interchangeable spare parts for efficient repair.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-black">
                01
              </div>
              <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">
                Universal Combo Mainboards
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Most 24-inch to 55-inch imported TVs use identical Shenzhen combo boards (e.g., TP.V56, TP.MS338, CV338H). Firmware flashing and voltage test points remain consistent across brands.
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-black">
                02
              </div>
              <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">
                Interchangeable Backlight Strips
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                LED backlight strips in bulk import TVs are standardized around 3V/6V aluminum substrate lengths (e.g., 582mm, 830mm). Universal replacement strips fit across multiple budget labels.
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center font-black">
                03
              </div>
              <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">
                Bulk Procurement Sourcing
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Technicians source wholesale components by part-code rather than brand name. Procuring in bulk batches reduces downtime and shipping overhead for high-turnover repairs.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <h3 className="text-xs font-black uppercase text-stone-900 dark:text-stone-100 tracking-wider">
              Universal OEM Chassis & Brand Cross-Reference Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 uppercase font-bold">
                    <th className="py-3 px-4">Brand Category</th>
                    <th className="py-3 px-4">Primary OEM Chassis / Board</th>
                    <th className="py-3 px-4">Shared Components / Interchangeable Parts</th>
                    <th className="py-3 px-4">Common Bulk Import Symptom</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60 text-stone-700 dark:text-stone-300">
                  <tr>
                    <td className="py-3 px-4 font-black">Utsave / Utsav</td>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">TP.V56.PB801 / T.V53</td>
                    <td className="py-3 px-4">12V 3A Barrel Adapters, Universal 3-Button Keypads</td>
                    <td className="py-3 px-4 text-stone-500">Standby lockup / DC barrel contact wear</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-black">Condere</td>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">CV338H-U42 / TP.MS338</td>
                    <td className="py-3 px-4">Winbond 25Q64 Flash, 6V LED Backlight Strips</td>
                    <td className="py-3 px-4 text-stone-500">Stuck on boot splash logo</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-black">Harwa / Sonic</td>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">T.V53.03 / SPHE8202</td>
                    <td className="py-3 px-4">PAM8406 Audio Amplifiers, SF-HD850 Optical Pickups</td>
                    <td className="py-3 px-4 text-stone-500">12V vehicle voltage drop restart / DVD jam</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-black">Sceptre / Onn.</td>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">RTD28xx / MT5659</td>
                    <td className="py-3 px-4">Roku/Android Wi-Fi Modules, T-Con Level Shifters</td>
                    <td className="py-3 px-4 text-stone-500">Backlight OVP trip / Wi-Fi dropouts</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-black">Akai / Blaupunkt</td>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">TP.SK506S / CV9632</td>
                    <td className="py-3 px-4">OB3350CP LED Drivers, 1.1V Core Buck Converters</td>
                    <td className="py-3 px-4 text-stone-500">Red standby LED blink / dark segment</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
