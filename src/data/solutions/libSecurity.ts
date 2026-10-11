// Issue libraries: security & surveillance, gate motors, lighting, smart home.
import type { FamilyLibrary } from '../catalog/types';

const MAINS = 'Isolate at the DB board before opening fixed wiring. Fixed installation work in South Africa needs a registered electrician and CoC.';

export const security: FamilyLibrary = {
  issues: [
    {
      id: 'camera-offline', title: 'Camera offline / no video',
      symptom: 'The {brand} {model} channel shows "No video" or "Offline".',
      causes: ['PoE / 12 V power supply failure', 'Water in the connector box', 'Cable damage (rodents / lightning)', 'IP conflict'],
      tests: ['Measure supply at the camera: 12 V DC ±10 % (analogue) or PoE 48 V on pairs 1-2/3-6 or 4-5/7-8.', 'Check IR LEDs glow faintly at night (power present).', 'Test the cable with a LAN tester; for coax check BNC connectors.', 'Ping the camera IP / use the brand tool (SADP for Hikvision, ConfigTool for Dahua).'],
      fix: ['Replace PSU / PoE injector; re-terminate with waterproof junction boxes; fit surge protectors on long runs.'], parts: ['12 V PSU', 'PoE switch / injector', 'BNC / RJ45 connectors', 'Junction box'],
      tools: ['Digital multimeter', 'LAN tester', 'CCTV tester'], difficulty: 'Moderate', minutes: 45, safety: 'Ladder safety; PSUs are mains powered.',
      only: ['security_camera', 'cctv_dvr', 'smart_doorbell', 'baby_monitor', 'intercom'],
    },
    {
      id: 'dvr-hdd', title: 'DVR / NVR not recording / HDD error',
      symptom: 'Recorder beeps, shows "HDD error" or footage is missing.',
      causes: ['Failed or unformatted HDD', 'Desktop HDD not rated for 24/7', 'Power cuts corrupting the disk'],
      tests: ['Check HDD status in Storage menu; listen for clicking; check SMART.', 'Check record schedule is set.'],
      fix: ['Replace with a surveillance HDD (WD Purple / Seagate SkyHawk); initialise; put the recorder on a UPS.'], parts: ['Surveillance HDD', 'Mini UPS'],
      tools: ['Screwdrivers'], difficulty: 'Easy', minutes: 30, safety: 'Unplug before opening.', only: ['cctv_dvr'],
    },
    {
      id: 'night-vision', title: 'Night vision white-out or blurry at night',
      symptom: 'Image is foggy or white at night.',
      causes: ['IR reflecting off dome bubble / spider webs', 'IR cut filter stuck', 'IR LEDs failed'],
      tests: ['Clean the lens/dome; tap the camera to hear the IR-cut click when covering the light sensor.'],
      fix: ['Clean, reposition away from walls, replace IR board or camera.'], parts: ['IR board', 'Dome'], tools: ['Microfibre cloth'],
      difficulty: 'Easy', minutes: 20, safety: 'Ladder safety.', only: ['security_camera', 'smart_doorbell', 'baby_monitor'],
    },
    {
      id: 'alarm-false', title: 'Alarm false triggers',
      symptom: 'Alarm goes off at night with no intruder.',
      causes: ['PIR facing heat sources or insects inside', 'Low zone battery (wireless)', 'Loose zone wiring / EOL resistor', 'Pets'],
      tests: ['Check alarm memory for the zone; walk test.', 'Measure zone resistance: with EOL resistor (e.g. 2.2 kΩ / 5.6 kΩ) closed = rated value.'],
      fix: ['Re-aim / clean PIR; use pet-immune detectors; replace batteries; fix wiring.'], parts: ['PIR detector', 'EOL resistors', 'Batteries'],
      tools: ['Digital multimeter', 'Keypad programming code'], difficulty: 'Moderate', minutes: 45, safety: 'Notify your armed-response company before testing.', only: ['alarm_panel'],
    },
    {
      id: 'alarm-battery', title: 'Alarm panel battery / AC fail warning',
      symptom: 'Keypad shows battery low or beeps after load-shedding.',
      causes: ['12 V 7 Ah backup battery worn (2–3 years)', 'Blown AC fuse / transformer'],
      tests: ['Measure battery under load (should hold above 12 V); measure transformer output (16–18 V AC).'],
      fix: ['Replace the battery; replace fuse/transformer.'], parts: ['12 V 7 Ah SLA battery', 'Transformer'],
      tools: ['Digital multimeter'], difficulty: 'Easy', minutes: 20, safety: 'Panel tamper may trigger: inform your security company.', only: ['alarm_panel'],
    },
    {
      id: 'fence-low-voltage', title: 'Electric fence low voltage / zone alarm',
      symptom: 'Energiser shows low kV or alarms.',
      causes: ['Vegetation touching wires', 'Broken insulators', 'Earth spikes dry / corroded', 'Shorted HT cable'],
      tests: ['Use a fence tester at several points (should be 7–9 kV).', 'Disconnect fence: if energiser output recovers, the fault is on the line.'],
      fix: ['Trim vegetation; replace insulators; add earth spikes; replace HT cable.'], parts: ['Insulators', 'HT cable', 'Earth spike'],
      tools: ['Fence tester', 'Pliers'], difficulty: 'Moderate', minutes: 60, safety: 'Switch off the energiser before touching. Installation must have an Electric Fence System Certificate (EFC) in SA.', only: ['electric_fence'],
    },
    {
      id: 'lock-jammed', title: 'Smart lock not locking / jammed',
      symptom: 'Motor whirs but bolt does not extend.',
      causes: ['Door misaligned', 'Low batteries', 'Motor/gear failure'],
      tests: ['Operate the bolt with the door open.'],
      fix: ['Adjust strike plate; replace batteries; replace motor module.'], parts: ['Batteries', 'Strike plate'], tools: ['Screwdrivers'],
      difficulty: 'Easy', minutes: 20, safety: 'Keep a mechanical key available.', only: ['smart_lock'],
    },
    {
      id: 'detector-chirp', title: 'Smoke / CO alarm chirping',
      symptom: 'Short chirp every 30–60 s.',
      causes: ['Low battery', 'End of life (7–10 years)', 'Dust in the chamber'],
      tests: ['Check the manufacture date; replace battery; press test.'],
      fix: ['Replace battery or the whole alarm; vacuum the vents.'], parts: ['Battery', 'Alarm unit'], tools: [],
      difficulty: 'Easy', minutes: 10, safety: 'Never remove alarms without replacing them.', only: ['smoke_detector'],
    },
    {
      id: 'intercom-no-audio', title: 'Intercom: no audio or door release not working',
      symptom: 'Cannot hear the caller or gate does not open.',
      causes: ['Broken wire pair', 'Failed door release relay', 'Power supply fault'],
      tests: ['Measure supply at the indoor unit; check wiring continuity; test release output (dry contact).'],
      fix: ['Repair wiring; replace PSU or relay.'], parts: ['PSU', 'Relay'], tools: ['Digital multimeter'],
      difficulty: 'Moderate', minutes: 45, safety: MAINS, only: ['intercom'],
    },
  ],
  brandNotes: {
    hikvision: { '*': 'Hikvision: SADP tool finds devices and resets passwords; Hik-Connect for remote viewing.' },
    dahua: { '*': 'Dahua: ConfigTool for IP discovery; DMSS app.' },
    paradox: { '*': 'Paradox: trouble display [TBL]; check AC, battery, bell and tamper.' },
    ids: { '*': 'IDS (SA): X-series panels; engineer code needed to clear system trouble.' },
    nemtek: { '*': 'Nemtek: Druid energisers display fence voltage and fault zone.' },
    jva: { '*': 'JVA: Z-series energisers; check earth monitor alarms.' },
    ring: { '*': 'Ring: reset via the orange button; Ring app shows signal (RSSI) — above -60 is good.' },
    ezviz: { '*': 'EZVIZ: reset via pinhole; supports SD-card recording.' },
  },
};

export const gate_motor: FamilyLibrary = {
  issues: [
    {
      id: 'gate-not-opening', title: 'Gate motor not responding to remote',
      symptom: 'The {brand} {model} does nothing when you press the remote.',
      causes: ['Flat remote battery', 'Remote not learned / receiver fault', 'Motor battery flat after load-shedding', 'Gate in holiday lockout'],
      tests: ['Check the remote LED; try the second button / another remote.', 'Measure the 12 V gate battery: rested > 12.4 V, under load > 11.5 V.', 'Check the controller LEDs / LCD for status.'],
      fix: ['Replace remote battery (CR2032 / 23A); re-learn the remote; replace the 12 V 7 Ah battery (every 2–3 years).'], parts: ['12 V 7 Ah battery', 'Remote', 'Receiver'],
      tools: ['Digital multimeter'], difficulty: 'Easy', minutes: 20, safety: 'Keep clear of the gate while testing; disengage the motor (manual release) to move it by hand.',
    },
    {
      id: 'gate-stops-reverses', title: 'Gate stops halfway or reverses',
      symptom: 'Gate starts, then stops or reverses direction.',
      causes: ['Collision sensitivity too high', 'Rack / track obstruction or gate binding', 'Weak battery', 'Beams (IR safety) misaligned'],
      tests: ['Disengage and push the gate by hand: it should roll smoothly with one hand.', 'Check beam alignment LED.', 'Check battery under load.'],
      fix: ['Clean track, replace worn wheels, adjust rack gap (2–3 mm), re-align beams, reduce sensitivity after mechanical fix.'], parts: ['Gate wheels', 'Rack', 'Safety beams'],
      tools: ['Spirit level', 'Spanners'], difficulty: 'Moderate', minutes: 60, safety: 'Gates are heavy and can crush: disengage motor before mechanical work.',
    },
    {
      id: 'gate-limits', title: 'Gate limits lost / runs past end positions',
      symptom: 'Gate does not stop at fully open/closed.',
      causes: ['Limit magnets moved', 'Encoder / limit sensor failure', 'Controller lost setup after surge'],
      tests: ['Check magnets / limit switches; run setup mode.'],
      fix: ['Re-run limit setup (per controller manual); replace sensor.'], parts: ['Limit magnets', 'Limit sensor'],
      tools: ['Screwdrivers'], difficulty: 'Moderate', minutes: 30, safety: 'Keep clear during setup runs.',
    },
    {
      id: 'gate-hums', title: 'Motor hums / clicks but gate does not move',
      symptom: 'Relays click, no movement.',
      causes: ['Stripped pinion or gearbox', 'Motor brushes worn', 'Manual release left engaged'],
      tests: ['Check the manual release; check pinion teeth; measure motor current.'],
      fix: ['Replace pinion / gearbox / motor.'], parts: ['Pinion', 'Gearbox', 'Motor'], tools: ['Spanners'],
      difficulty: 'Advanced', minutes: 90, safety: 'Isolate mains and battery.',
    },
    {
      id: 'gate-lightning', title: 'Controller dead after lightning storm',
      symptom: 'No lights on the controller.',
      causes: ['Surge damage to controller', 'Blown fuse', 'Charger failure'],
      tests: ['Check fuse; measure charger output (13.6–13.8 V).'],
      fix: ['Replace controller / charger; fit surge protection and proper earthing.'], parts: ['Controller card', 'Charger', 'Surge arrestor'],
      tools: ['Digital multimeter'], difficulty: 'Moderate', minutes: 45, safety: MAINS,
    },
  ],
  brandNotes: {
    centurion: { '*': 'Centurion (SA): D5 Evo / D10 status LED flash count (e.g. 1 flash = battery low, 2 = collision, 3 = beams); SMART controllers show messages on LCD.' },
    et_nice: { '*': 'ET Nice (SA): ET Drive / ET Blue; check the "Gate Status" LED; receiver learn via the learn button.' },
    gemini: { '*': 'Gemini: DC Slider; learn remotes via the onboard learn button.' },
    digidoor: { '*': 'Digidoor: garage motors; check the 24 V supply and travel limits.' },
  },
};

export const lighting: FamilyLibrary = {
  issues: [
    {
      id: 'led-flicker', title: 'LED light flickers or strobes',
      symptom: 'The {device} flickers, especially when dimmed or switched off (ghost glow).',
      causes: ['Incompatible dimmer (non-LED trailing edge)', 'Failing LED driver capacitor', 'Neutral missing / induced voltage on long cables'],
      tests: ['Swap with a known good lamp.', 'Check driver output voltage / current against its label.'],
      fix: ['Use an LED-rated trailing-edge dimmer; replace the driver; fit a load capacitor for ghosting.'], parts: ['LED driver', 'LED dimmer'],
      tools: ['Digital multimeter'], difficulty: 'Moderate', minutes: 30, safety: MAINS,
    },
    {
      id: 'strip-section-dead', title: 'LED strip section dead or wrong colour',
      symptom: 'Part of the strip is off, or colours are wrong.',
      causes: ['Broken solder joint at a cut point', 'Voltage drop on long runs', 'Failed controller channel'],
      tests: ['Measure voltage at both ends (12 V / 24 V); a large drop = inject power.', 'Press along the strip to find intermittent joints.'],
      fix: ['Resolder or replace the segment; inject power every 5 m; replace controller.'], parts: ['LED strip', 'Connectors', 'Controller'],
      tools: ['Soldering iron', 'Digital multimeter'], difficulty: 'Easy', minutes: 30, safety: 'Low voltage side is safe; the PSU is mains powered.', only: ['led_strip_lights'],
    },
    {
      id: 'torch-dim', title: 'Torch dim or not switching',
      symptom: 'Weak beam or switch intermittent.',
      causes: ['Battery worn / dirty contacts', 'Switch worn'],
      tests: ['Measure 18650 cell (3.0–4.2 V); clean threads and contacts.'],
      fix: ['Replace cell and switch; grease threads.'], parts: ['18650 cell', 'Tail switch'], tools: ['Digital multimeter'],
      difficulty: 'Easy', minutes: 15, safety: 'Use protected cells only.', only: ['flashlight'],
    },
    {
      id: 'fitting-dead', title: 'Light fitting not working with new lamp',
      symptom: 'New lamp does not light.',
      causes: ['Switch fault', 'Loose terminal in the ceiling rose', 'Tripped breaker'],
      tests: ['Use a non-contact tester at the fitting with switch on.'],
      fix: ['Tighten terminals; replace switch / fitting.'], parts: ['Switch', 'Fitting'], tools: ['Non-contact voltage tester'],
      difficulty: 'Moderate', minutes: 30, safety: MAINS, only: ['ceiling_light', 'desk_lamp'],
    },
  ],
  brandNotes: {
    philips: { '*': 'Philips Hue: reset bulbs via the Hue app serial-number method; bridge needs Ethernet.' },
    eurolux: { '*': 'Eurolux (SA): check LED driver ratings on the fitting label.' },
  },
};

export const smart_home: FamilyLibrary = {
  issues: [
    {
      id: 'offline-wifi', title: 'Device offline in the app',
      symptom: 'The {model} shows offline after a router change or power cut.',
      causes: ['Router SSID / password changed', '5 GHz network (device needs 2.4 GHz)', 'Cloud service outage', 'Weak signal'],
      tests: ['Check the device LED status pattern; check router 2.4 GHz is enabled.'],
      fix: ['Re-pair via the app (factory reset first); separate 2.4 GHz SSID; add a mesh node.'], parts: [], tools: ['Phone'],
      difficulty: 'Easy', minutes: 15, safety: 'None.',
    },
    {
      id: 'plug-relay', title: 'Smart plug / switch clicks but load stays off',
      symptom: 'Relay clicks in the app but the appliance has no power.',
      causes: ['Relay contacts burnt (overloaded with heaters / geysers)', 'Internal fuse'],
      tests: ['Measure output voltage with the plug on.'],
      fix: ['Replace the plug; use a contactor for high loads (> 10 A).'], parts: ['Smart plug', 'Contactor'], tools: ['Digital multimeter'],
      difficulty: 'Easy', minutes: 10, safety: 'Do not exceed the plug current rating.', only: ['smart_plug'],
    },
    {
      id: 'thermostat-wrong-temp', title: 'Thermostat reads wrong temperature / not switching heating',
      symptom: 'Displayed temperature differs or heating does not start.',
      causes: ['Placed near heat source / draught', 'Wiring (C-wire) issue', 'Relay fault'],
      tests: ['Compare with a separate thermometer; check wiring at the terminals.'],
      fix: ['Relocate; apply temperature offset; correct wiring.'], parts: ['Thermostat'], tools: ['Screwdrivers', 'Thermometer'],
      difficulty: 'Moderate', minutes: 30, safety: MAINS, only: ['digital_thermostat'],
    },
    {
      id: 'speaker-not-listening', title: 'Smart speaker not responding to voice',
      symptom: 'Wake word ignored.',
      causes: ['Mic mute on', 'Wi-Fi offline', 'Firmware'],
      tests: ['Check mic mute LED; check app connectivity.'],
      fix: ['Unmute, re-connect Wi-Fi, factory reset.'], parts: [], tools: [], difficulty: 'Easy', minutes: 10, safety: 'None.', only: ['smart_speaker'],
    },
  ],
  brandNotes: {
    sonoff: { '*': 'Sonoff: pairing mode by holding the button 5–7 s until fast blink; eWeLink app.' },
    tp_link: { '*': 'TP-Link Tapo/Kasa: reset by holding the button 5 s.' },
    google: { '*': 'Google Nest: factory reset in the Home app or by holding the mic switch.' },
    amazon: { '*': 'Amazon Echo: action button 25 s for factory reset.' },
  },
};
