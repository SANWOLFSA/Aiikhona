// Issue libraries: backup power, micromobility, automotive, generators/welders, power tools, pumps, test equipment.
import type { FamilyLibrary } from '../catalog/types';

const MAINS = 'Isolate mains AND battery/PV inputs before opening. Inverters hold lethal DC bus voltage (350–450 V) for minutes after shutdown; wait 5–10 minutes and verify 0 V.';
const LIION = 'Lithium packs store a lot of energy: a short can melt tools and start a fire. Wear eye protection, insulate tools, never puncture cells.';
const PV = 'PV strings produce dangerous DC voltage whenever there is daylight. In South Africa, embedded generation must be installed by a registered electrician with a CoC and registered with the municipality.';

export const power_backup: FamilyLibrary = {
  issues: [
    {
      id: 'inverter-no-output', title: 'Inverter on but no AC output',
      symptom: 'The {brand} {model} display is on, but plugs on the backup circuit are dead.',
      causes: ['Output breaker tripped', 'Overload fault latched', 'Inverter in a fault mode (battery low, over-temperature)', 'Output relay or bridge MOSFETs failed'],
      tests: ['Read the fault code on the LCD / app.', 'Check the AC output breaker and the backup DB circuits.', 'Measure AC output at the inverter terminals (should be 230 V ±10 %).', 'Measure battery voltage at the inverter terminals: 48 V system ≈ 48–56 V, 24 V ≈ 24–28 V.'],
      fix: ['Clear the overload (reduce load, no kettles/heaters on a small inverter), reset breaker.', 'Clear fault via settings; update firmware.', 'Board-level: replace output MOSFETs / IGBTs and drivers, or replace the power board.'],
      parts: ['Output breaker', 'Power board', 'MOSFET / IGBT set'], tools: ['Digital multimeter', 'Clamp meter', 'Insulated tools'],
      difficulty: 'Advanced', minutes: 90, safety: MAINS, only: ['solar_inverter', 'ups', 'portable_power_station'],
    },
    {
      id: 'battery-not-charging', title: 'Batteries not charging / short backup time',
      symptom: 'Backup runs out much sooner than before load-shedding stage changes.',
      causes: ['Aged lead-acid batteries (2–4 years) or sulphation', 'BMS communication failure with lithium battery', 'Incorrect charge voltage settings', 'Loose / corroded battery terminals'],
      tests: ['Measure each 12 V lead-acid battery: rested full = 12.7 V; under 12.2 V = discharged; large differences between batteries = failing.', 'Load test each battery.', 'Lithium: check the BMS status (CAN / RS485 to inverter), SOC and cell delta (< 30 mV good).', 'Check terminal torque and look for heat discolouration.'],
      fix: ['Replace lead-acid batteries as a matched set; never mix old and new.', 'Set the inverter battery type to match (e.g. Pylontech / Hubble protocol) and fix comms cable pin-out.', 'Clean and torque terminals (check the battery manual, e.g. 5–10 N·m).'],
      parts: ['Batteries', 'BMS comms cable', 'Battery lugs / fuse'], tools: ['Digital multimeter', 'Battery load tester', 'Torque wrench'],
      difficulty: 'Moderate', minutes: 60, safety: 'Battery banks can deliver thousands of amps: remove watches/rings, use insulated tools, fit a DC fuse/breaker close to the battery.',
      only: ['solar_inverter', 'ups', 'lithium_battery', 'portable_power_station', 'battery_charger'],
    },
    {
      id: 'ups-beeping', title: 'UPS beeping constantly / battery fault light',
      symptom: 'The UPS beeps and switches to battery even when mains is present, or shows a replace-battery light.',
      causes: ['Worn 12 V 7 Ah / 9 Ah SLA batteries', 'Mains voltage out of range (sensitivity set high)', 'Overload'],
      tests: ['Measure battery voltage on charge (13.5–13.8 V float) and under load.', 'Check input voltage and sensitivity setting.', 'Check load percentage.'],
      fix: ['Replace SLA batteries (same Ah / terminal type F1/F2); set sensitivity to Low for generators.', 'Reduce load (no laser printers or heaters).'], parts: ['12 V SLA battery'],
      tools: ['Digital multimeter'], difficulty: 'Easy', minutes: 30, safety: 'UPS outputs can be live from battery even when unplugged.', only: ['ups'],
    },
    {
      id: 'pv-not-producing', title: 'Solar panels producing little or no power',
      symptom: 'PV input reads 0 W or far below expected at midday.',
      causes: ['PV isolator off / DC breaker tripped', 'MC4 connector burnt or disconnected', 'String voltage outside MPPT window', 'Shading / dirty panels'],
      tests: ['Check PV voltage on the inverter display vs expected (panels Voc × number in series).', 'Measure each string open-circuit voltage at the isolator (careful: high DC).', 'Inspect MC4 connectors for melting.'],
      fix: ['Re-crimp MC4 connectors with the proper tool; clean panels; redesign string length to fit the MPPT window.'], parts: ['MC4 connectors', 'PV isolator', 'DC surge arrestor'],
      tools: ['DC-rated multimeter (1000 V CAT III)', 'MC4 crimp tool', 'Clamp meter (DC)'], difficulty: 'Advanced', minutes: 90, safety: PV, only: ['solar_inverter'],
    },
    {
      id: 'inverter-fan-noise', title: 'Inverter overheating / fan noise / derating',
      symptom: 'Fan is loud, power output limited in the afternoon.',
      causes: ['Installed in a hot, unventilated spot', 'Dust-clogged heatsink', 'Failing fan'],
      tests: ['Check heatsink temperature in the app.', 'Check fan spins (12 V DC).'],
      fix: ['Relocate to a ventilated area; clean; replace fan.'], parts: ['Cooling fan'], tools: ['Compressed air', 'Screwdrivers'],
      difficulty: 'Moderate', minutes: 45, safety: MAINS, only: ['solar_inverter', 'ups'],
    },
    {
      id: 'power-bank-dead', title: 'Power bank not charging or not outputting',
      symptom: 'Indicator LEDs do not light; phone does not charge.',
      causes: ['Deep-discharged cells (protection locked)', 'Broken USB port', 'Failed boost / PD controller'],
      tests: ['Charge with a 2 A+ charger for an hour; measure input current with a USB meter.', 'Open and measure cell voltage (below 2.5 V = locked, may be unsafe).'],
      fix: ['Replace port; replace power bank if cells are deep-discharged or swollen.'], parts: ['USB-C port'], tools: ['USB power meter'],
      difficulty: 'Moderate', minutes: 30, safety: LIION, only: ['power_bank', 'portable_power_station'],
    },
    {
      id: 'bms-protection', title: 'Lithium battery shuts off / BMS protection',
      symptom: 'Battery switches off under load or will not wake up.',
      causes: ['Over-current (surge from motor loads)', 'Low temperature charge protection', 'Cell under-voltage after long storage'],
      tests: ['Read BMS alarms via the battery software (e.g. BatteryView for Pylontech).', 'Measure pack voltage: 48 V LiFePO4 (16S) ≈ 51.2 V nominal, cut-off ~44.8 V.'],
      fix: ['Reduce surge loads; wake the battery with the inverter or a charger at the correct voltage; contact the supplier for cell balancing.'], parts: ['Comms cable'],
      tools: ['Laptop + RS232/RS485 adapter', 'Digital multimeter'], difficulty: 'Advanced', minutes: 60, safety: 'Never open a lithium battery bank; it can deliver extremely high fault currents.', only: ['lithium_battery', 'solar_inverter'],
    },
    {
      id: 'charger-no-output', title: 'Battery charger shows fault / no charge current',
      symptom: 'Charger LED error; battery stays flat.',
      causes: ['Battery too flat for smart charger to detect (below 3–8 V)', 'Reverse polarity fuse blown', 'Sulphated battery'],
      tests: ['Measure battery voltage; check the charger fuse.'],
      fix: ['Use "force"/repair mode or a manual charger briefly; replace fuse; replace battery.'], parts: ['Blade fuse', 'Clamps'],
      tools: ['Digital multimeter'], difficulty: 'Easy', minutes: 20, safety: 'Charging lead-acid batteries releases hydrogen: ventilate, no sparks.', only: ['battery_charger'],
    },
  ],
  brandNotes: {
    deye: { '*': 'Deye / Sunsynk hybrid inverters: F-codes e.g. F13 grid mode changed, F56 DC bus low, F58 BMS communication. Check the "Battery Mode: Lithium / protocol" setting.' },
    sunsynk: { '*': 'Sunsynk: F-codes shared with Deye (F58 BMS comms, F35 no AC grid, F64 heatsink high temperature). Sunsynk Connect app shows history.' },
    victron: { '*': 'Victron MultiPlus: LED patterns (overload / low battery / temperature) and VictronConnect via MK3-USB.' },
    growatt: { '*': 'Growatt SPF: Error 02 over-temperature, 03 battery voltage high, 04 / 05 low battery / short circuit.' },
    goodwe: { '*': 'GoodWe: SEMS portal codes; check isolation fault (PV leakage) on wet mornings.' },
    mecer: { '*': 'Mecer (SA): inverter-trolleys and UPSs use standard 12 V 7–100 Ah SLA / AGM batteries.' },
    rct: { '*': 'RCT: popular SA UPS brand; batteries are standard 12 V SLA.' },
    pylontech: { '*': 'Pylontech US2000/US3000/US5000: SOC LEDs flashing = alarm; use BatteryView to read cells.' },
    hubble: { '*': 'Hubble Lithium (SA): AM-2 / AM-5; check DIP switch addressing and CAN cable to the inverter.' },
    ecoflow: { '*': 'EcoFlow: app shows error codes; firmware updates fix many BMS issues.' },
  },
  sizeNote: (size, typeKey, issueId) => {
    const m = size.match(/([\d.]+)\s*(kva|kw|va|w)/i);
    if (!m || issueId !== 'inverter-no-output') return undefined;
    let watts = parseFloat(m[1]);
    const unit = m[2].toLowerCase();
    if (unit === 'kva') watts *= 800; else if (unit === 'va') watts *= 0.6; else if (unit === 'kw') watts *= 1000;
    return `${size}: plan for about ${Math.round(watts)} W continuous. Kettles (2 kW), heaters and geysers will overload most units under 5 kW${typeKey === 'ups' ? '; UPSs are for electronics only' : ''}.`;
  },
};

export const micromobility: FamilyLibrary = {
  issues: [
    {
      id: 'no-power', title: 'Will not turn on',
      symptom: 'The {brand} {model} display stays dark.',
      causes: ['Battery BMS in sleep / protection', 'Loose main connector (XT60 / Anderson)', 'Blown fuse', 'Display / controller fault'],
      tests: ['Charge fully; measure charger output (e.g. 42 V for 36 V packs, 54.6 V for 48 V).', 'Measure battery output at the controller connector.', 'Check inline fuse.'],
      fix: ['Reseat connectors; replace fuse; replace controller or display.'], parts: ['Fuse', 'Controller', 'Display'],
      tools: ['Digital multimeter', 'Hex keys'], difficulty: 'Moderate', minutes: 45, safety: LIION,
    },
    {
      id: 'motor-cuts-out', title: 'Motor cuts out or stutters',
      symptom: 'Power cuts on hills or the motor jerks.',
      causes: ['Hall sensor failure', 'Loose phase connector', 'Battery voltage sag (weak cells)', 'Water ingress in controller'],
      tests: ['Check hall sensor outputs (0 / 5 V toggling as wheel turns).', 'Measure battery voltage under load (sag > 10 % = weak).', 'Check phase wires for melted insulation.'],
      fix: ['Replace hall sensors or controller; re-terminate phase connectors; replace battery.'], parts: ['Hall sensors', 'Controller', 'Phase connectors'],
      tools: ['Digital multimeter', 'Soldering iron'], difficulty: 'Advanced', minutes: 90, safety: LIION,
    },
    {
      id: 'brakes', title: 'Brakes weak or squealing',
      symptom: 'Long stopping distance or loud squeal.',
      causes: ['Worn pads', 'Contaminated disc', 'Cable stretched'],
      tests: ['Inspect pad thickness (< 1.5 mm = replace).'],
      fix: ['Replace pads, clean disc with isopropyl, adjust cable / bleed hydraulic brakes.'], parts: ['Brake pads', 'Brake cable'],
      tools: ['Hex keys', 'Isopropyl alcohol'], difficulty: 'Easy', minutes: 30, safety: 'Test brakes before riding.',
    },
    {
      id: 'flat-tyre', title: 'Flat or punctured tyre',
      symptom: 'Tyre goes flat.',
      causes: ['Puncture', 'Valve failure', 'Low pressure pinch flat'],
      tests: ['Inflate and check with soapy water.'],
      fix: ['Fit new tube / tyre sealant; keep pressure at the sidewall rating (e.g. 50 psi on 8.5" scooter tyres).'], parts: ['Inner tube', 'Tyre', 'Sealant'],
      tools: ['Tyre levers', 'Pump'], difficulty: 'Moderate', minutes: 45, safety: 'Remove battery power before removing the motor wheel.',
    },
    {
      id: 'charger-not-charging', title: 'Battery not charging',
      symptom: 'Charger light stays green or battery does not fill.',
      causes: ['Failed charger', 'Charge port damage', 'BMS charge MOSFET off due to cell imbalance'],
      tests: ['Measure charger output open-circuit.', 'Measure at the charge port inside.'],
      fix: ['Replace charger or port; have pack cells balanced/repaired by a pack builder.'], parts: ['Charger', 'Charge port'],
      tools: ['Digital multimeter'], difficulty: 'Moderate', minutes: 30, safety: LIION + ' Charge on a hard surface away from exits.',
    },
  ],
  brandNotes: {
    xiaomi: { '*': 'Xiaomi Mi scooters: error 10 = display–controller comms, 14 = throttle, 18 = motor hall, 21 = BMS comms, 24 = voltage.' },
    segway: { '*': 'Segway-Ninebot: error codes shown in app; 10 = comms, 15 = brake, 18 = hall sensor.' },
  },
};

export const automotive: FamilyLibrary = {
  issues: [
    {
      id: 'ecu-no-start', title: 'ECU fault: crank but no start / no communication',
      symptom: 'Engine cranks but will not start; scan tool cannot talk to the ECU.',
      causes: ['Blown ECU fuse / main relay', 'Ground (earth) strap corrosion', 'Water ingress / corrosion on ECU connector', 'Failed ECU power supply or driver ICs'],
      tests: ['Check fuses and main relay; measure 12 V at ECU power pins with ignition on.', 'Voltage drop test on grounds while cranking (< 0.2 V).', 'Check CAN-H / CAN-L resistance at the OBD port: ~60 Ω with ignition off.'],
      fix: ['Clean / replace earth straps and connectors; replace relay; ECU repair/cloning by a specialist (immobiliser data must be transferred).'],
      parts: ['Main relay', 'Fuse', 'Earth strap', 'ECU'], tools: ['OBD-II scanner', 'Digital multimeter', 'Wiring diagram'],
      difficulty: 'Expert', minutes: 120, safety: 'Disconnect the battery negative before unplugging an ECU. Airbag systems can deploy: wait 5 min after disconnection.', only: ['car_ecu'],
    },
    {
      id: 'infotainment-freeze', title: 'Infotainment freezing, rebooting or black screen',
      symptom: 'Head unit restarts, touchscreen frozen, Bluetooth/CarPlay drops.',
      causes: ['Software bug', 'Weak battery voltage during crank', 'Failed eMMC / flash', 'Loose LVDS display cable'],
      tests: ['Soft reset (hold power 10–20 s).', 'Measure battery voltage at rest (12.4–12.7 V).', 'Check for software updates from the dealer / OEM.'],
      fix: ['Update firmware; re-seat cables; replace head unit or display.'], parts: ['Display', 'Head unit'], tools: ['Trim removal tools', 'Digital multimeter'],
      difficulty: 'Moderate', minutes: 60, safety: 'Disconnect the battery before removing dash panels.', only: ['car_infotainment'],
    },
    {
      id: 'dashcam-sd', title: 'Dash cam stops recording / SD errors',
      symptom: 'Camera beeps "SD card error" or misses footage.',
      causes: ['Worn or slow microSD', 'Heat damage', 'Supercapacitor / battery failure'],
      tests: ['Format the card in the camera; use a high-endurance card.'],
      fix: ['Replace card; replace hardwire kit / supercap.'], parts: ['High-endurance microSD', 'Hardwire kit'], tools: [],
      difficulty: 'Easy', minutes: 15, safety: 'Tap fuse-box power with an add-a-fuse correctly.', only: ['dash_cam'],
    },
    {
      id: 'parasitic-drain', title: 'Battery drains overnight',
      symptom: 'Car battery flat after a day or two.',
      causes: ['Aftermarket device drawing current', 'Module not sleeping', 'Weak battery'],
      tests: ['Measure parasitic current with an ammeter in series on the negative (after 30 min sleep): < 50 mA normal.', 'Pull fuses one at a time to find the circuit.'],
      fix: ['Rewire device to switched power; replace faulty module or battery.'], parts: ['Battery', 'Add-a-fuse'], tools: ['Digital multimeter (10 A range)', 'Clamp meter'],
      difficulty: 'Moderate', minutes: 60, safety: 'Do not crank with an ammeter in series.',
    },
  ],
  brandNotes: {
    toyota: { '*': 'Toyota: ECU and immobiliser are paired; use Techstream for diagnostics.' },
    volkswagen: { '*': 'VW: VCDS/ODIS for coding; infotainment (MIB) software updates via dealer.' },
    bosch: { '*': 'Bosch ME/EDC ECUs: common in VW, BMW, Ford; flash/EEPROM cloning by specialist.' },
  },
};

export const workshop_power: FamilyLibrary = {
  issues: [
    {
      id: 'gen-no-start', title: 'Generator will not start',
      symptom: 'The {model} cranks but does not fire.',
      causes: ['Stale petrol / blocked carburettor jet', 'Low oil shutdown', 'Fouled spark plug', 'Choke / fuel valve'],
      tests: ['Check oil level (low-oil sensor stops ignition).', 'Pull the spark plug and check for spark against the block.', 'Drain the float bowl and check fuel flow.'],
      fix: ['Clean the carburettor main jet; replace plug; use fresh fuel with stabiliser; run monthly.'], parts: ['Spark plug', 'Carburettor kit', 'Fuel filter'],
      tools: ['Plug spanner', 'Carb cleaner'], difficulty: 'Moderate', minutes: 60, safety: 'Run generators outdoors only (carbon monoxide). Use a changeover switch: never back-feed a wall plug.', only: ['generator'],
    },
    {
      id: 'gen-no-output', title: 'Generator runs but no electricity',
      symptom: 'Engine runs, sockets dead.',
      causes: ['Output breaker tripped', 'AVR failure', 'Lost residual magnetism', 'Brushes worn'],
      tests: ['Measure output at the socket; measure AVR excitation voltage; check brushes.'],
      fix: ['Reset breaker; replace AVR; flash the field with a 12 V battery (per service manual).'], parts: ['AVR', 'Brushes'],
      tools: ['Digital multimeter'], difficulty: 'Advanced', minutes: 60, safety: 'Output is lethal 230 V.', only: ['generator'],
    },
    {
      id: 'welder-no-arc', title: 'Inverter welder: no arc or weak arc',
      symptom: 'Fan runs, but the welder will not strike or trips.',
      causes: ['Over-temperature (duty cycle exceeded)', 'Failed IGBT / MOSFET bridge', 'Poor earth clamp connection', 'Low supply voltage (long extension)'],
      tests: ['Check overheat LED; let cool.', 'Measure open-circuit voltage at the output (typically 60–80 V DC).', 'Check IGBTs for short in diode mode.'],
      fix: ['Use heavy extension (2.5 mm²) or none; clean clamp; replace IGBTs and drivers.'], parts: ['IGBT', 'Earth clamp', 'Electrode holder'],
      tools: ['Digital multimeter', 'Soldering station'], difficulty: 'Advanced', minutes: 90, safety: 'Internal capacitors hold 320 V DC. Wear welding PPE.', only: ['welding_machine'],
    },
    {
      id: 'welder-trips', title: 'Welder trips the breaker',
      symptom: 'Breaker trips when striking.',
      causes: ['Breaker too small (needs 20–32 A for 200 A machines)', 'Shorted input rectifier', 'Soft-start relay failed'],
      tests: ['Check the welder input rating vs breaker; test rectifier diodes.'],
      fix: ['Use a dedicated circuit; replace rectifier or relay.'], parts: ['Bridge rectifier', 'Relay'],
      tools: ['Digital multimeter'], difficulty: 'Advanced', minutes: 60, safety: 'Isolate and discharge capacitors.', only: ['welding_machine'],
    },
  ],
  brandNotes: {
    honda: { '*': 'Honda EU / EG generators: inverter models need 0.5 L oil changes at 20 h then 100 h.' },
    ryobi: { '*': 'Ryobi: SA-stocked generators and welders; spares via Ryobi SA service agents.' },
  },
};

export const power_tools: FamilyLibrary = {
  issues: [
    {
      id: 'sparking-brushes', title: 'Heavy sparking / power loss',
      symptom: 'Sparks ring around the motor vents and the {model} loses power.',
      causes: ['Worn carbon brushes', 'Burnt commutator', 'Shorted armature'],
      tests: ['Remove brushes: replace if under 6 mm or chipped.', 'Inspect commutator for burnt bars; growler test armature.', 'Measure armature bar-to-bar resistance (should be equal).'],
      fix: ['Replace brushes (both); clean commutator with fine abrasive; replace armature.'], parts: ['Carbon brushes', 'Armature'],
      tools: ['Screwdrivers', 'Digital multimeter', 'Fine sandpaper'], difficulty: 'Moderate', minutes: 45, safety: 'Unplug corded tools; remove batteries from cordless tools.',
      not: ['pressure_washer', 'lawn_mower', 'heat_gun'],
    },
    {
      id: 'no-power-tool', title: 'Tool dead',
      symptom: 'Pressing the trigger does nothing.',
      causes: ['Battery pack dead / protection', 'Broken trigger switch', 'Damaged cord at the strain relief', 'Brushless controller failure'],
      tests: ['Measure the battery: 18 V packs ≈ 18–20.5 V full; check the charger LED.', 'Continuity through the trigger switch.', 'Corded: continuity of each cord conductor while flexing near the handle.'],
      fix: ['Replace trigger switch or cord; replace pack or cells; replace controller board.'], parts: ['Trigger switch', 'Cord', 'Battery pack', 'Controller'],
      tools: ['Digital multimeter', 'Screwdrivers'], difficulty: 'Moderate', minutes: 30, safety: LIION,
    },
    {
      id: 'gearbox-noise', title: 'Grinding gearbox / chuck wobble',
      symptom: 'Grinding noise or the bit wobbles.',
      causes: ['Worn gears / lack of grease', 'Bent spindle', 'Worn bearings'],
      tests: ['Spin by hand with power off; check spindle run-out.'],
      fix: ['Re-grease gearbox; replace gears, bearings or chuck.'], parts: ['Gear set', 'Bearings', 'Chuck'],
      tools: ['Screwdrivers', 'Grease', 'Circlip pliers'], difficulty: 'Advanced', minutes: 75, safety: 'Remove battery / unplug.',
      not: ['pressure_washer', 'lawn_mower', 'heat_gun'],
    },
    {
      id: 'battery-wont-charge', title: 'Battery pack will not charge (charger flashes)',
      symptom: 'Charger shows red/green flashing fault.',
      causes: ['Pack too hot / cold', 'Over-discharged cells', 'Dirty terminals'],
      tests: ['Let the pack reach room temperature; clean terminals; measure individual cell groups (3.0–4.2 V).'],
      fix: ['Replace pack; cell replacement only with matched cells and spot welding.'], parts: ['Battery pack'],
      tools: ['Digital multimeter'], difficulty: 'Moderate', minutes: 20, safety: LIION,
    },
    {
      id: 'pressure-washer-pulsing', title: 'Pressure washer pulses or low pressure',
      symptom: 'Pressure surges or the motor stops and starts.',
      causes: ['Air in the inlet / low water supply', 'Blocked nozzle', 'Worn unloader valve or pump seals'],
      tests: ['Check the inlet filter and hose supply rate.', 'Clean the nozzle with the pin tool.'],
      fix: ['Bleed air; clean filter and nozzle; replace seals / unloader.'], parts: ['Nozzle', 'Seal kit', 'Unloader valve'],
      tools: ['Nozzle pin', 'Spanners'], difficulty: 'Moderate', minutes: 45, safety: 'High-pressure jets cause injury; RCD protection is essential.', only: ['pressure_washer'],
    },
    {
      id: 'mower-not-cutting', title: 'Electric mower stalls or cuts badly',
      symptom: 'Mower bogs down or leaves uneven grass.',
      causes: ['Blunt / bent blade', 'Grass clogged deck', 'Damaged cable', 'Motor brushes worn'],
      tests: ['Inspect blade; clean deck; check cable continuity.'],
      fix: ['Sharpen / replace blade; replace cable; replace brushes.'], parts: ['Blade', 'Cable', 'Brushes'],
      tools: ['Spanner', 'File'], difficulty: 'Easy', minutes: 30, safety: 'Unplug before touching the blade. Use an RCD.', only: ['lawn_mower'],
    },
    {
      id: 'heat-gun-no-heat', title: 'Heat gun blows cold air',
      symptom: 'Fan works, no heat.',
      causes: ['Open heating element', 'Thermal cut-out'],
      tests: ['Measure element: 2 kW ≈ 26 Ω.'],
      fix: ['Replace element or cut-out.'], parts: ['Element', 'Thermal cut-out'], tools: ['Digital multimeter'],
      difficulty: 'Moderate', minutes: 30, safety: 'Let cool fully.', only: ['heat_gun'],
    },
  ],
  brandNotes: {
    makita: { '*': 'Makita LXT: charger flashing red/green = pack fault; packs have a star-protection chip that locks on deep discharge.' },
    dewalt: { '*': 'DeWalt 20V MAX / FLEXVOLT: charger fast-blink red = bad pack.' },
    bosch: { '*': 'Bosch: blue (professional) and green (DIY) battery systems are not interchangeable.' },
    ryobi: { '*': 'Ryobi ONE+: widely available in SA; trigger switches are common replacements.' },
    milwaukee: { '*': 'Milwaukee M18 / M12: red flashing on fuel gauge = pack fault.' },
    black_decker: { '*': 'Black+Decker: brushed motors, budget gearboxes; replacement often cheaper than repair.' },
    ingco: { '*': 'Ingco (SA budget): standard brushes and switches available at hardware stores.' },
    karcher: { '*': 'Kärcher K-series: pulsing is commonly a leaking trigger gun or pump seals.' },
  },
};

export const pumps: FamilyLibrary = {
  issues: [
    {
      id: 'pump-hums', title: 'Pump hums but does not run',
      symptom: 'The {model} hums and trips its overload.',
      causes: ['Failed start / run capacitor', 'Seized impeller (debris / scale)', 'Low voltage'],
      tests: ['Measure capacitor µF (typically 8–30 µF depending on kW).', 'Turn the shaft by hand (power off): it should spin freely.'],
      fix: ['Replace capacitor; free the impeller; check voltage.'], parts: ['Run capacitor', 'Impeller'],
      tools: ['Capacitance meter', 'Screwdriver'], difficulty: 'Moderate', minutes: 45, safety: 'Isolate at the DB; pumps are in wet locations, ensure RCD protection.',
    },
    {
      id: 'pump-no-prime', title: 'Pump runs but no water / loses prime',
      symptom: 'Motor runs, water does not flow.',
      causes: ['Air leak on suction side', 'Foot valve / non-return valve leaking', 'Blocked strainer basket', 'Low water level'],
      tests: ['Check strainer basket; check lid O-ring; watch for bubbles in the return.'],
      fix: ['Clean basket, lubricate O-ring, replace foot valve, re-prime.'], parts: ['O-ring', 'Foot valve', 'Strainer basket'],
      tools: ['Silicone lubricant', 'Spanner'], difficulty: 'Easy', minutes: 30, safety: 'Never run a pump dry for long.',
    },
    {
      id: 'pump-leaking', title: 'Leaking from the pump body',
      symptom: 'Water drips between motor and pump housing.',
      causes: ['Worn mechanical shaft seal'],
      tests: ['Check for drips at the seal plate while running.'],
      fix: ['Replace mechanical seal (match size) before water reaches motor bearings.'], parts: ['Mechanical seal'],
      tools: ['Spanners', 'Puller'], difficulty: 'Advanced', minutes: 90, safety: 'Isolate power.',
    },
    {
      id: 'pressure-cycling', title: 'Booster pump cycles on and off',
      symptom: 'Pump starts and stops rapidly.',
      causes: ['Pressure tank waterlogged (lost air charge)', 'Leaking tap / toilet', 'Faulty pressure switch / flow controller'],
      tests: ['Check tank pre-charge with a tyre gauge (empty tank): about 0.2 bar below cut-in.', 'Close all taps and watch for cycling.'],
      fix: ['Recharge tank air; fix leaks; replace pressure switch / controller.'], parts: ['Pressure switch', 'Pressure tank bladder'],
      tools: ['Tyre gauge', 'Pump'], difficulty: 'Moderate', minutes: 45, safety: 'Isolate power before adjusting the switch.', only: ['water_pump'],
    },
  ],
  brandNotes: {
    dab: { '*': 'DAB: E.sybox shows codes (BL = no water, PB = supply voltage).' },
    grundfos: { '*': 'Grundfos: SCALA2 display codes; check the dry-run protection.' },
    speck: { '*': 'Speck (pool): BADU pumps — mechanical seal and capacitor are the common spares in SA.' },
    pentair: { '*': 'Pentair: shaft seal kits by model.' },
  },
};

export const test_equipment: FamilyLibrary = {
  issues: [
    {
      id: 'meter-wrong-readings', title: 'Meter readings erratic or wrong',
      symptom: 'Readings jump or do not match a known reference.',
      causes: ['Low battery', 'Damaged test leads', 'Blown fuse (current ranges)', 'Input protection damaged'],
      tests: ['Short leads in Ω mode: should read < 0.5 Ω.', 'Check fuses (mA and 10 A) for continuity.', 'Measure a known reference (fresh 1.5 V cell, 9 V battery).'],
      fix: ['Replace battery, leads, fuses with HRC type of the exact rating.'], parts: ['HRC fuses', 'Test leads', '9 V battery'],
      tools: ['Screwdrivers'], difficulty: 'Easy', minutes: 15, safety: 'Never use a meter with damaged leads on mains; use correct CAT rating.', only: ['multimeter', 'oscilloscope'],
    },
    {
      id: 'iron-not-heating', title: 'Soldering iron not heating / temperature error',
      symptom: 'Station shows "S-E", "Sensor error" or the tip stays cold.',
      causes: ['Open heater / sensor in the handle', 'Broken handle cable', 'Worn tip (T12 integrated tips)'],
      tests: ['Measure heater (e.g. Hakko 936 style ≈ 3–4 Ω) and sensor (≈ 40–60 Ω).', 'Flex the cable while measuring.'],
      fix: ['Replace heating element / tip, or handle cable.'], parts: ['Heater element', 'Tips', 'Handle'],
      tools: ['Digital multimeter'], difficulty: 'Easy', minutes: 20, safety: 'Tips reach 450 °C.', only: ['soldering_iron'],
    },
    {
      id: 'tip-oxidised', title: 'Solder will not stick to tip',
      symptom: 'Tip is black and does not wet.',
      causes: ['Oxidised tip from high idle temperature', 'Wiping on dry sponge'],
      tests: ['Inspect tip.'],
      fix: ['Use tip tinner / brass wool; lower idle temperature; replace tip.'], parts: ['Tip tinner', 'Brass wool', 'Tip'],
      tools: [], difficulty: 'Easy', minutes: 5, safety: 'Ventilate flux fumes.', only: ['soldering_iron'],
    },
    {
      id: 'radio-no-transmit', title: 'Two-way radio not transmitting / poor range',
      symptom: 'Others cannot hear transmissions.',
      causes: ['Damaged antenna', 'Wrong frequency / CTCSS', 'Weak battery'],
      tests: ['Check channel settings, antenna, battery voltage (7.4 V packs).'],
      fix: ['Replace antenna; program correct channels (ICASA-licensed frequencies).'], parts: ['Antenna', 'Battery'],
      tools: ['Programming cable'], difficulty: 'Easy', minutes: 20, safety: 'Use only licensed frequencies.', only: ['two_way_radio'],
    },
    {
      id: 'scope-no-trace', title: 'Oscilloscope shows no trace',
      symptom: 'Flat line with a known signal.',
      causes: ['Probe attenuation mismatch', 'Trigger settings', 'Damaged probe'],
      tests: ['Connect the probe to the calibration output (1 kHz square); auto-set.'],
      fix: ['Compensate the probe; replace probe.'], parts: ['Probe'], tools: ['Trim tool'],
      difficulty: 'Easy', minutes: 10, safety: 'Never float the scope ground on mains.', only: ['oscilloscope'],
    },
  ],
  brandNotes: {
    fluke: { '*': 'Fluke: use only Fluke-rated HRC fuses (e.g. 11 A 1000 V).' },
    hakko: { '*': 'Hakko: FX-888D "S-E" = sensor error; replace the tip/heater.' },
    uni_t: { '*': 'UNI-T: affordable in SA; check fuse ratings printed on the PCB.' },
    motorola: { '*': 'Motorola: program with CPS via programming cable.' },
  },
};
