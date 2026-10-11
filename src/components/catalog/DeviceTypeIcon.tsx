import React from 'react';
import {
  Tv, Monitor, Projector, Speaker, Headphones, Refrigerator, WashingMachine, Microwave, CookingPot, AirVent, Fan, Heater, ShowerHead, Coffee,
  Smartphone, Tablet, Laptop, Computer, Cpu, HardDrive, Printer, Gamepad2, Glasses, Watch, Camera, Router, Plug, Thermometer, Battery,
  BatteryCharging, Sun, Zap, Cctv, Bell, DoorClosed, Lock, Siren, Lightbulb, Flashlight, Scissors, Wrench, Drill, Car, Bike, Gauge, Droplets,
  Waves, Radio, Mic, Disc, Wind, Flame, Shirt, Sparkles, Satellite, Blend, Soup, Sandwich, Microchip, Joystick, Wifi, LampDesk, Baby, Fence,
  Snowflake, Construction, Server, Video, Power, BellRing, CircuitBoard, Axe, Antenna, RadioTower, Shovel, Cable, Fuel, Box, Activity, Cast, BookOpen, Leaf, Plane,
  HeartPulse, Ear, Stethoscope, Accessibility, Music, Guitar, Piano, Keyboard, Webcam, Network, Calculator, ScanLine, Dumbbell, CreditCard, Car as CarIcon,
} from 'lucide-react';
import type { CatalogDeviceType, FamilyId } from '../../data/catalog/types';

type Icon = React.ComponentType<{ className?: string; strokeWidth?: number }>;

const BY_TYPE: Record<string, Icon> = {
  tv_television: Tv, computer_monitor: Monitor, projector: Projector, soundbar: Speaker, speaker: Speaker, subwoofer: Speaker, headphones: Headphones,
  wireless_earbuds: Headphones, smart_speaker: Speaker, amplifier: Radio, radio: Radio, microphone: Mic, bluray_player: Disc, set_top_box: Satellite, streaming_device: Cast,
  fridge_refrigerator: Refrigerator, chest_freezer: Snowflake, water_dispenser: Droplets, washing_machine: WashingMachine, clothes_dryer: WashingMachine, dishwasher: Waves,
  microwave: Microwave, oven_stove: Flame, induction_cooktop: CookingPot, toaster_oven: Microwave, air_fryer: CookingPot, electric_kettle: Coffee, toaster: Sandwich,
  slow_cooker: Soup, rice_cooker: Soup, waffle_iron: Sandwich, coffee_maker: Coffee, blender: Blend, food_processor: Blend, stand_mixer: Blend, juicer: Blend, garbage_disposal: Cable,
  clothes_iron: Shirt, steam_mop: Sparkles, vacuum_cleaner: Wind, robot_vacuum: Activity, electric_blanket: Thermometer, space_heater: Heater,
  air_conditioner: AirVent, fan: Fan, air_purifier: Wind, dehumidifier: Droplets, humidifier: Droplets, water_heater: ShowerHead, heat_pump: ShowerHead, geyser_controller: Thermometer,
  mobile_phone: Smartphone, tablet: Tablet, ebook_reader: BookOpen, laptop_computer: Laptop, desktop_pc: Computer, graphics_card: Cpu, external_hard_drive: HardDrive,
  printer: Printer, scanner: Printer, printer_3d: Box, smart_watch: Watch, gaming_console: Gamepad2, game_controller: Joystick, vr_headset: Glasses,
  digital_camera: Camera, drone: Plane, wifi_router: Router, smart_plug: Plug, digital_thermostat: Thermometer,
  solar_inverter: Sun, lithium_battery: Battery, ups: BatteryCharging, portable_power_station: BatteryCharging, power_bank: Battery, battery_charger: BatteryCharging, generator: Fuel,
  security_camera: Cctv, cctv_dvr: Server, smart_doorbell: Bell, intercom: BellRing, alarm_panel: Siren, electric_fence: Fence, smart_lock: Lock, smoke_detector: Siren,
  baby_monitor: Baby, gate_motor: DoorClosed, led_strip_lights: Lightbulb, ceiling_light: Lightbulb, desk_lamp: LampDesk, flashlight: Flashlight,
  hair_dryer: Wind, hair_straightener: Flame, electric_shaver: Scissors, electric_toothbrush: Sparkles, epilator: Scissors, sewing_machine: Scissors,
  water_pump: Droplets, pool_pump: Waves, lawn_mower: Leaf, pressure_washer: Droplets,
  electric_drill: Drill, impact_driver: Drill, angle_grinder: Construction, circular_saw: Axe, jigsaw: Axe, wood_router: Wrench, heat_gun: Flame, welding_machine: Zap,
  multimeter: Gauge, soldering_iron: CircuitBoard, oscilloscope: Activity, two_way_radio: Antenna,
  electric_scooter: Zap, electric_bike: Bike, hoverboard: Zap, car_ecu: Microchip, car_infotainment: Car, dash_cam: Video,
  blood_pressure_monitor: HeartPulse, pulse_oximeter: Activity, cpap_machine: Wind, nebulizer: Stethoscope, hearing_aid: Ear, glucose_meter: Stethoscope,
  electric_wheelchair: Accessibility, turntable: Disc, audio_mixer: Music, guitar_amplifier: Guitar, digital_piano: Piano, dj_controller: Disc, pa_speaker: Speaker,
  pc_power_supply: Power, motherboard: CircuitBoard, keyboard_mouse: Keyboard, webcam: Webcam, internal_storage: HardDrive, graphing_calculator: Calculator,
  network_switch: Network, nas_storage: Server, fibre_ont: Router, car_amplifier: Speaker, reversing_camera: Camera, car_alarm: Siren, obd_scanner: CarIcon,
  ev_charger: BatteryCharging, solar_charge_controller: Sun, vfd_drive: Gauge, bench_power_supply: Zap, paper_shredder: ScanLine, label_receipt_printer: Printer,
  card_terminal: CreditCard, treadmill: Dumbbell, massage_gun: Activity, rc_vehicle: Joystick, metal_detector: Antenna, tv_remote: Radio,
};

const BY_FAMILY: Partial<Record<FamilyId, Icon>> = { medical_home: HeartPulse, networking: Wifi, power_backup: Power, security: Cctv, automotive: Car, pumps: Droplets, test_equipment: Gauge };

const TINT: Record<string, string> = {
  'Kitchen': 'from-orange-500 to-rose-500', 'Laundry & Cleaning': 'from-sky-500 to-blue-600', 'Cooling & Climate': 'from-cyan-500 to-sky-600',
  'Water Heating': 'from-red-500 to-orange-500', 'TV & Audio': 'from-violet-500 to-indigo-600', 'Computers & Phones': 'from-blue-600 to-indigo-700',
  'Gaming': 'from-fuchsia-500 to-purple-600', 'Cameras & Drones': 'from-slate-600 to-slate-800', 'Networking & Smart Home': 'from-teal-500 to-emerald-600',
  'Power & Backup': 'from-amber-500 to-yellow-600', 'Security & Access': 'from-stone-600 to-stone-800', 'Lighting': 'from-yellow-400 to-amber-500',
  'Personal Care': 'from-pink-500 to-rose-500', 'Home & Hobby': 'from-lime-500 to-green-600', 'Pool, Water & Garden': 'from-emerald-500 to-teal-600',
  'Tools & Workshop': 'from-yellow-500 to-orange-600', 'Mobility & Automotive': 'from-zinc-600 to-neutral-800',
  'Health & Medical': 'from-rose-500 to-red-600', 'Music & Pro Audio': 'from-purple-500 to-fuchsia-600', 'Office & Retail': 'from-slate-500 to-slate-700', 'Fitness': 'from-emerald-500 to-lime-600',
};

export function iconForType(t: Pick<CatalogDeviceType, 'key' | 'family'>): Icon {
  return BY_TYPE[t.key] || BY_FAMILY[t.family] || Wrench;
}

/** Clean SVG illustration tile for a device type (used for type cards and as the model-image fallback). */
export default function DeviceTypeIcon({ type, className = 'w-12 h-12', iconClassName = 'w-6 h-6' }: { type: Pick<CatalogDeviceType, 'key' | 'family' | 'group'>; className?: string; iconClassName?: string }) {
  const I = iconForType(type);
  return (
    <div className={`${className} rounded-xl bg-gradient-to-br ${TINT[type.group] || 'from-blue-600 to-indigo-700'} text-white flex items-center justify-center shrink-0 shadow-inner`}>
      <I className={iconClassName} strokeWidth={1.6} />
    </div>
  );
}
