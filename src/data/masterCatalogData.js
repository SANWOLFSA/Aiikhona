import React from 'react';
import { Zap, Volume2, Snowflake, Flame, Smartphone, Tv, Monitor, Cpu, Wifi, Camera, Coffee, ShieldAlert, Wrench, Battery, Radio, Printer, Headphones, Power, Thermometer, Lock, Tablet, HardDrive, Mic, Laptop, Gauge, Plug, Wind, Disc, Eye, Sun, Scissors, Sparkles, Droplets, Box, Home, Activity } from 'lucide-react';
export const MASTER_CATALOG = {
    air_conditioner: {
        name: 'Air Conditioner',
        icon: React.createElement(Wind, { className: "w-5 h-5 text-sky-500" }),
        brands: {
            daikin: {
                name: 'Daikin',
                hasModels: true,
                models: {
                    'FTXN-Series Inverter': {
                        name: 'FTXN-Series Inverter',
                        steps: [
                            'Check error code on remote control display by holding the CANCEL button.',
                            'Inspect outdoor unit capacitor and fan motor for voltage drop.',
                            'Clean indoor unit evaporator fins and check drain pipe for blockage.',
                            'Test thermistor resistance values at the PCB mainboard.'
                        ],
                        tools: ['Multimeter', 'Manifold Gauge Set', 'Fin Comb', 'Hex Key Set'],
                        commonIssues: ['E7 Fan Motor Short', 'U4 Communication Error', 'Refrigerant Leak']
                    },
                    'Sensira Split Unit': {
                        name: 'Sensira Split Unit',
                        steps: [
                            'Verify 230V mains supply at terminal block.',
                            'Inspect optical infrared receiver board on front panel.',
                            'Check indoor fan run capacitor and coil temperature sensor.'
                        ],
                        tools: ['Multimeter', 'Insulated Screwdrivers'],
                        commonIssues: ['No power response from remote', 'Indoor unit freezing up']
                    }
                }
            },
            mitsubishi_electric: {
                name: 'Mitsubishi Electric',
                hasModels: true,
                models: {
                    'MSZ-AP / MSZ-EF Inverter': {
                        name: 'MSZ-AP / MSZ-EF Inverter',
                        steps: ['Read self-diagnosis blink codes on indoor indicator LED.', 'Inspect electronic expansion valve (EEV) coil stepper pulse.'],
                        tools: ['Multimeter', 'Torx Screwdriver'],
                        commonIssues: ['Flash 5 times / Indoor thermistor fault', 'Airflow vanes stuck']
                    }
                }
            },
            carrier: {
                name: 'Carrier',
                hasModels: true,
                models: {
                    'Infinity 19VS Inverter': {
                        name: 'Infinity 19VS Inverter',
                        steps: ['Test compressor contactor coil voltage.', 'Inspect dual run capacitor for capacitance loss.'],
                        tools: ['Multimeter', 'Capacitance Tester'],
                        commonIssues: ['Contactor buzzing / pitted contacts', 'Capacitor bulging']
                    }
                }
            },
            panasonic: {
                name: 'Panasonic',
                hasModels: true,
                models: {
                    'nanoe-X Inverter Split': {
                        name: 'nanoe-X Inverter Split',
                        steps: ['Inspect nanoe-X ion generator needle.', 'Check indoor blower motor hall IC feedback.'],
                        tools: ['Multimeter', 'Fine Wire Brush'],
                        commonIssues: ['H11 Communication Error', 'Timer light blinking continuously']
                    }
                }
            },
            lg: {
                name: 'LG',
                hasModels: true,
                models: {
                    'Dual Inverter Smart Cool': {
                        name: 'Dual Inverter Smart Cool',
                        steps: [
                            'Check LED blink count on main outdoor PCB.',
                            'Measure inverter compressor motor winding resistance (U, V, W phases).',
                            'Inspect 4-way reversing valve solenoid coil for open circuit.'
                        ],
                        tools: ['Digital Multimeter', 'Clamp Meter', 'Thermometer Probe'],
                        commonIssues: ['CH05 Communication Fault', 'CH21 DC Peak Current Error']
                    }
                }
            },
            samsung: {
                name: 'Samsung',
                hasModels: true,
                models: {
                    'WindFree Inverter AR9500': {
                        name: 'WindFree Inverter AR9500',
                        steps: [
                            'Inspect micro-hole diffuser for mold accumulation.',
                            'Test indoor blower cross-flow fan motor tachometer feedback signal.',
                            'Verify DC bus voltage on outdoor power board.'
                        ],
                        tools: ['Multimeter', 'Cleaning Spray', 'Soft Brush'],
                        commonIssues: ['E101 Communication Error', 'Water dripping from micro-holes']
                    }
                }
            },
            gree: {
                name: 'Gree Electric',
                hasModels: true,
                models: {
                    'Lomo 16 Seer Eco Inverter': {
                        name: 'Lomo 16 Seer Eco Inverter',
                        steps: ['Check IPM inverter intelligent power module diodes.', 'Test outdoor discharge sensor resistance.'],
                        tools: ['Multimeter', 'Thermal Paste'],
                        commonIssues: ['E6 Communication Error', 'H6 Indoor motor stall']
                    }
                }
            },
            midea: {
                name: 'Midea Group',
                hasModels: true,
                models: {
                    'Mission Pro Inverter': {
                        name: 'Mission Pro Inverter',
                        steps: ['Check run capacitor on compressor.', 'Inspect refrigerant pressure lines.', 'Clean filter mesh.'],
                        tools: ['Multimeter', 'Pressure Gauge'],
                        commonIssues: ['EC Leak Detection Error', 'Compressor short cycling']
                    }
                }
            },
            haier: {
                name: 'Haier',
                hasModels: true,
                models: {
                    'Dawn Smart Clean Inverter': {
                        name: 'Dawn Smart Clean Inverter',
                        steps: ['Inspect self-cleaning evaporator drain flow.', 'Test high pressure protection switch.'],
                        tools: ['Pressure Gauge', 'Multimeter'],
                        commonIssues: ['E7 Indoor/Outdoor Communication error', 'Frost on suction line']
                    }
                }
            },
            toshiba: {
                name: 'Toshiba',
                hasModels: true,
                models: {
                    'Shorai Edge High-Wall': {
                        name: 'Shorai Edge High-Wall',
                        steps: ['Check swing louver stepper motor gears.', 'Test outdoor heat exchanger thermistor.'],
                        tools: ['Multimeter', 'Precision Screwdrivers'],
                        commonIssues: ['04 Error code', 'Louver clicking']
                    }
                }
            },
            hitachi: {
                name: 'Hitachi',
                hasModels: true,
                models: {
                    'airHome 400 Inverter': {
                        name: 'airHome 400 Inverter',
                        steps: ['Check FrostWash water drainage.', 'Test outdoor fan motor DC inverter drive.'],
                        tools: ['Multimeter', 'Drain Snake'],
                        commonIssues: ['03 Communication Alarm', 'Drain pan overflow']
                    }
                }
            },
            fujitsu: {
                name: 'Fujitsu General',
                hasModels: true,
                models: {
                    'Halcyon Inverter Wall Mounted': {
                        name: 'Halcyon Inverter Wall Mounted',
                        steps: ['Read flash sequence of Operation & Timer LEDs.', 'Test indoor ambient sensor resistance.'],
                        tools: ['Multimeter', 'Sensor Probe'],
                        commonIssues: ['Operation flashes 1 / Timer flashes 1 (Serial Error)', 'Compressor failure']
                    }
                }
            },
            trane: {
                name: 'Trane',
                hasModels: true,
                models: {
                    'XR14 Central System': {
                        name: 'XR14 Central System',
                        steps: ['Inspect Spine Fin outdoor coil for blockage.', 'Test 24VAC contactor relay voltage.'],
                        tools: ['Multimeter', 'Fin Tool', 'Coil Cleaner'],
                        commonIssues: ['Contactor chattering', 'Low airflow']
                    }
                }
            },
            lennox: {
                name: 'Lennox',
                hasModels: true,
                models: {
                    'Signature XC25 Variable-Capacity': {
                        name: 'Signature XC25 Variable-Capacity',
                        steps: ['Inspect Communicating Control Board diagnostics.', 'Test crankcase heater continuity.'],
                        tools: ['Multimeter', 'Clamp Meter'],
                        commonIssues: ['Code 410 Outdoor unit communication loss', 'Hard start issue']
                    }
                }
            },
            york: {
                name: 'York',
                hasModels: true,
                models: {
                    'LX Series YCG 17 SEER': {
                        name: 'LX Series YCG 17 SEER',
                        steps: ['Check defrost control board relays.', 'Test high and low pressure cut-out switches.'],
                        tools: ['Multimeter', 'Manifold Gauge'],
                        commonIssues: ['Short cycling on high pressure switch', 'Fan blade loose']
                    }
                }
            },
            defy: {
                name: 'Defy',
                hasModels: true,
                models: {
                    '12000 BTU Inverter AC': {
                        name: '12000 BTU Inverter AC',
                        steps: ['Check indoor evaporator filter cleanliness.', 'Test compressor starting capacitor.', 'Inspect outdoor fan capacitor.'],
                        tools: ['Multimeter', 'Capacitance Meter', 'Cleaning Kit'],
                        commonIssues: ['F6 Motor error', 'Not cooling / Compressor hums without starting']
                    }
                }
            },
            tcl: {
                name: 'TCL',
                hasModels: true,
                models: {
                    'BreezeIN Fresh Air Split': {
                        name: 'BreezeIN Fresh Air Split',
                        steps: ['Inspect fresh air motorized damper valve.', 'Test outdoor electronic expansion valve.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['E0 Communication failure', 'Damper motor stall']
                    }
                }
            },
            hisense: {
                name: 'Hisense',
                hasModels: true,
                models: {
                    'Easy Smart Inverter AC': {
                        name: 'Easy Smart Inverter AC',
                        steps: ['Check display panel LED codes.', 'Test ambient temperature thermistor resistance.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['EA Communication error', 'F0 Refrigerant leak warning']
                    }
                }
            },
            bosch: {
                name: 'Bosch',
                hasModels: true,
                models: {
                    'Climate 3000i Mini-Split': {
                        name: 'Climate 3000i Mini-Split',
                        steps: ['Check DC inverter driver board.', 'Test indoor heat exchanger temperature sensor.'],
                        tools: ['Multimeter', 'Pressure Gauges'],
                        commonIssues: ['E1 Sensor open circuit', 'Slow cooling rate']
                    }
                }
            },
            whirlpool: {
                name: 'Whirlpool',
                hasModels: true,
                models: {
                    '6th Sense Inverter AC': {
                        name: '6th Sense Inverter AC',
                        steps: ['Inspect 6th Sense auto climate sensor.', 'Check outdoor condenser motor bearings.'],
                        tools: ['Multimeter', 'Lubricant'],
                        commonIssues: ['E9 Indoor fan stall', 'Condenser fan squeal']
                    }
                }
            },
            sharp: {
                name: 'Sharp',
                hasModels: true,
                models: {
                    'Plasmacluster J-Tech Inverter': {
                        name: 'Plasmacluster J-Tech Inverter',
                        steps: ['Inspect Plasmacluster ion generator electrode.', 'Test power board surge protector MOV.'],
                        tools: ['Multimeter', 'Opening Tools'],
                        commonIssues: ['Ion generator blinking', 'Power surge trip']
                    }
                }
            },
            electrolux: {
                name: 'Electrolux',
                hasModels: true,
                models: {
                    'ComfortClime Split AC': {
                        name: 'ComfortClime Split AC',
                        steps: ['Inspect air purification filter.', 'Check compressor PTC relay and thermal fuse.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['E3 Fan motor abnormal', 'Refrigerant pressure low']
                    }
                }
            }
        }
    },
    air_fryer: {
        name: 'Air Fryer',
        icon: React.createElement(Zap, { className: "w-5 h-5 text-amber-500" }),
        brands: {
            philips: {
                name: 'Philips',
                hasModels: true,
                models: {
                    'Essential HD9200': {
                        name: 'Essential HD9200',
                        steps: [
                            'Unplug unit and remove bottom base screws.',
                            'Test thermal fuse continuity (192°C rating) clipped to heating element.',
                            'Inspect control knob potentiometer or touch panel ribbon cable.',
                            'Verify fan impeller blade clearance.'
                        ],
                        tools: ['Screwdriver Set', 'Multimeter', 'Replacement Thermal Fuse'],
                        commonIssues: ['Dead unit / Thermal fuse open', 'Element glows but fan stuck', 'Timer knob slipping']
                    },
                    'XXL Smart Sensing HD9860': {
                        name: 'XXL Smart Sensing HD9860',
                        steps: [
                            'Inspect display board for moisture ingress.',
                            'Check NTC temperature thermistor resistance.',
                            'Test drawer interlock microswitch.'
                        ],
                        tools: ['Torx T10 Screwdriver', 'Multimeter'],
                        commonIssues: ['E1 Error Code', 'Drawer open detection fault']
                    }
                }
            },
            ninja: {
                name: 'Ninja (SharkNinja)',
                hasModels: true,
                models: {
                    'Air Fryer Max XL AF160': {
                        name: 'Air Fryer Max XL AF160',
                        steps: ['Disassemble top cap.', 'Inspect PCB triac driving element.', 'Verify fan motor thermal switch.'],
                        tools: ['Torx Screwdrivers', 'Multimeter'],
                        commonIssues: ['SHUT code on screen', 'Overheating shutdown']
                    },
                    'Foodi DualZone DZ201': {
                        name: 'Foodi DualZone DZ201',
                        steps: ['Test independent left/right heating relays.', 'Check dual zone temperature sensors.'],
                        tools: ['Multimeter', 'Screwdriver Set'],
                        commonIssues: ['Uneven zone heating', 'Zone 2 sensor error']
                    }
                }
            },
            tefal: {
                name: 'Tefal / T-Fal (Groupe SEB)',
                hasModels: true,
                models: {
                    'Easy Fry Precision EY4018': {
                        name: 'Easy Fry Precision EY4018',
                        steps: ['Check internal thermal cut-off link.', 'Verify digital touch display ribbon connection.'],
                        tools: ['Torx Screwdriver', 'Multimeter'],
                        commonIssues: ['Touchscreen unresponsive', 'No heat generation']
                    },
                    'Actifry Genius XL': {
                        name: 'Actifry Genius XL',
                        steps: ['Check paddle drive motor gear alignment.', 'Test circulation blower motor.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Paddle not turning', 'E2 error code']
                    }
                }
            },
            cosori: {
                name: 'Cosori',
                hasModels: true,
                models: {
                    'Pro LE 5.0-Quart CAF-L501': {
                        name: 'Pro LE 5.0-Quart CAF-L501',
                        steps: ['Inspect glass touch panel connection.', 'Test thermal fuse on heating ring bracket.', 'Verify top fan bearing lubrication.'],
                        tools: ['Phillips Screwdriver', 'Digital Multimeter'],
                        commonIssues: ['E01/E02 sensor errors', 'No power to display']
                    },
                    'Dual Blaze 6.8-Quart': {
                        name: 'Dual Blaze 6.8-Quart',
                        steps: ['Test top and bottom dual heating elements independently.', 'Inspect smart Wi-Fi module power rail.'],
                        tools: ['Multimeter', 'Spudger'],
                        commonIssues: ['Bottom element not heating', 'Wi-Fi connection drop']
                    }
                }
            },
            instant_brands: {
                name: 'Instant Brands (Instant Pot)',
                hasModels: true,
                models: {
                    'Vortex Plus 6-in-1 6QT': {
                        name: 'Vortex Plus 6-in-1 6QT',
                        steps: ['Inspect OdorErase carbon filter housing.', 'Check drawer limit microswitch.', 'Test 1800W heating coil continuity.'],
                        tools: ['Screwdriver Set', 'Multimeter'],
                        commonIssues: ['"Close Basket" false alarm', 'Fan making grinding noise']
                    }
                }
            },
            breville: {
                name: 'Breville / Sage',
                hasModels: true,
                models: {
                    'Smart Oven Air Fryer BOV860': {
                        name: 'Smart Oven Air Fryer BOV860',
                        steps: ['Check quartz Element IQ heating tube continuity.', 'Inspect convection fan dual-speed relay board.'],
                        tools: ['Torx Screwdrivers', 'Multimeter'],
                        commonIssues: ['Thermal fuse blown', 'Door switch alignment error']
                    }
                }
            },
            midea: {
                name: 'Midea Group',
                hasModels: true,
                models: {
                    'Dual Basket Air Fryer 11QT': {
                        name: 'Dual Basket Air Fryer 11QT',
                        steps: ['Inspect main switched-mode power supply (SMPS) board.', 'Test heating element resistance.'],
                        tools: ['Multimeter', 'Phillips Screwdriver'],
                        commonIssues: ['Power LED flashes but no heat', 'Basket detection failure']
                    }
                }
            },
            gourmia: {
                name: 'Gourmia',
                hasModels: true,
                models: {
                    'GAF698 6-Quart Digital': {
                        name: 'GAF698 6-Quart Digital',
                        steps: ['Test inline thermal fuse located inside heat shield.', 'Check top fan motor capacitor.'],
                        tools: ['Multimeter', 'Screwdriver Set'],
                        commonIssues: ['Unit dead / No display', 'Beeping repeatedly on power-up']
                    }
                }
            },
            cuisinart: {
                name: 'Cuisinart',
                hasModels: true,
                models: {
                    'TOA-60 Convection Toaster AirFryer': {
                        name: 'TOA-60 Convection Toaster AirFryer',
                        steps: ['Inspect mechanical rotary selector switches for burnt contacts.', 'Check convection fan belt/motor.'],
                        tools: ['Multimeter', 'Contact Cleaner', 'Pliers'],
                        commonIssues: ['Knob turns but elements do not activate', 'Uneven browning']
                    }
                }
            },
            dash: {
                name: 'Dash',
                hasModels: true,
                models: {
                    'Compact 2QT Air Fryer': {
                        name: 'Compact 2QT Air Fryer',
                        steps: ['Inspect mechanical dial timer and auto-off switch.', 'Test thermal safety cutoff.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Timer ticks but unit does not heat', 'Power indicator light out']
                    }
                }
            },
            hamilton_beach: {
                name: 'Hamilton Beach',
                hasModels: true,
                models: {
                    'Sure-Crisp Digital 5L': {
                        name: 'Sure-Crisp Digital 5L',
                        steps: ['Check power relay contacts on main control PCB.', 'Measure heating ring resistance.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Relay clicking continuously', 'Cold air circulating without heat']
                    }
                }
            },
            russell_hobbs: {
                name: 'Russell Hobbs',
                hasModels: true,
                models: {
                    '5L Crisp-Fry Digital': {
                        name: '5L Crisp-Fry Digital',
                        steps: ['Check digital timer board relay output.', 'Measure fan coil resistance.', 'Inspect basket microswitch.'],
                        tools: ['Multimeter', 'Phillips Screwdriver'],
                        commonIssues: ['Timer ticks down but stays cold', 'Drawer detection fault']
                    }
                }
            },
            kenwood: {
                name: 'Kenwood',
                hasModels: true,
                models: {
                    'Dual Air Fryer HFP70': {
                        name: 'Dual Air Fryer HFP70',
                        steps: ['Inspect double drawer interlocks.', 'Test heating element continuity for both cooking chambers.'],
                        tools: ['Multimeter', 'Torx Driver'],
                        commonIssues: ['Left drawer not heating', 'E3 sensor error code']
                    }
                }
            },
            delonghi: {
                name: "De'Longhi",
                hasModels: true,
                models: {
                    'IdealFry FH2133': {
                        name: 'IdealFry FH2133',
                        steps: ['Check upper and lower heating coils.', 'Verify ventilation fan motor bearings.'],
                        tools: ['Multimeter', 'Screwdriver Set'],
                        commonIssues: ['Upper element open-circuit', 'Excessive fan noise']
                    }
                }
            },
            xiaomi: {
                name: 'Xiaomi',
                hasModels: true,
                models: {
                    'Mi Smart Air Fryer 3.5L': {
                        name: 'Mi Smart Air Fryer 3.5L',
                        steps: ['Check OLED rotary dial encoder.', 'Test Wi-Fi module power regulator.', 'Verify NTC thermistor sensor.'],
                        tools: ['Plastic Opening Tool', 'Multimeter'],
                        commonIssues: ['OLED knob unresponsive', 'E01 temperature probe error']
                    }
                }
            },
            defy: {
                name: 'Defy',
                hasModels: true,
                models: {
                    '4L Manual Air Fryer': {
                        name: '4L Manual Air Fryer',
                        steps: ['Test continuity across heating ring.', 'Check basket safety switch.', 'Verify mechanical thermostat contacts.'],
                        tools: ['Multimeter', 'Phillips Screwdriver'],
                        commonIssues: ['No heat output', 'Microswitch misaligned']
                    },
                    '5.5L Digital Air Fryer': {
                        name: '5.5L Digital Air Fryer',
                        steps: ['Check top thermal limit fuse.', 'Clean heating tube grease deposits.', 'Test control PCB capacitors.'],
                        tools: ['Multimeter', 'Wire Brush'],
                        commonIssues: ['Smoke generation', 'No display power']
                    }
                }
            },
            salter: {
                name: 'Salter',
                hasModels: true,
                models: {
                    'Aero Cook Pro 5.5L': {
                        name: 'Aero Cook Pro 5.5L',
                        steps: ['Inspect lid safety switch.', 'Check halogen heating element continuity.', 'Verify blower fan.'],
                        tools: ['Multimeter', 'Screwdriver'],
                        commonIssues: ['Halogen tube not igniting', 'Lid switch open']
                    }
                }
            },
            bella: {
                name: 'Bella',
                hasModels: true,
                models: {
                    'Pro Series 4.2QT': {
                        name: 'Pro Series 4.2QT',
                        steps: ['Test thermal fuse inline with power input.', 'Inspect touch membrane keyboard.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Will not turn on', 'Touch panel buttons unresponsive']
                    }
                }
            },
            powerxl: {
                name: 'PowerXL',
                hasModels: true,
                models: {
                    'Vortex Air Fryer 5QT': {
                        name: 'Vortex Air Fryer 5QT',
                        steps: ['Check main power supply board diodes.', 'Inspect basket handle safety release.'],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['Dead unit', 'Display flashing Err']
                    }
                }
            },
            nuwave: {
                name: 'NuWave',
                hasModels: true,
                models: {
                    'Brio 6-Quart Digital': {
                        name: 'Brio 6-Quart Digital',
                        steps: ['Inspect digital probe thermometer jack.', 'Test heating coil triac on PCB.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Probe temperature read error', 'Fan running continuously']
                    }
                }
            },
            gowise_usa: {
                name: 'GoWISE USA',
                hasModels: true,
                models: {
                    '8-in-1 Digital 5.8QT': {
                        name: '8-in-1 Digital 5.8QT',
                        steps: ['Test thermal cut-off fuse.', 'Check push button basket latch mechanism.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['E1 / E2 temperature errors', 'Drawer latch loose']
                    }
                }
            },
            black_decker: {
                name: 'Black+Decker',
                hasModels: true,
                models: {
                    'Purify 2L Air Fryer': {
                        name: 'Purify 2L Air Fryer',
                        steps: ['Inspect dual mechanical dials.', 'Test heating element resistance.'],
                        tools: ['Multimeter', 'Phillips Screwdriver'],
                        commonIssues: ['Timer does not shut off', 'Cold element']
                    }
                }
            },
            chefman: {
                name: 'Chefman',
                hasModels: true,
                models: {
                    'TurboFry 3.6-Quart': {
                        name: 'TurboFry 3.6-Quart',
                        steps: ['Test internal thermal cutoff fuse.', 'Verify fan motor windings.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Power cord continuity failure', 'Blower rattle']
                    }
                }
            },
            oster: {
                name: 'Oster',
                hasModels: true,
                models: {
                    'DiamondForce 3.3-Quart': {
                        name: 'DiamondForce 3.3-Quart',
                        steps: ['Check power cord strain relief.', 'Inspect thermal fuse and basket microswitch.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['No power', 'Element not heating']
                    }
                }
            },
            sunbeam: {
                name: 'Sunbeam',
                hasModels: true,
                models: {
                    'Copper Infused 4L': {
                        name: 'Copper Infused 4L',
                        steps: ['Inspect rotary temperature dial thermostat contacts.', 'Test fan blower motor.'],
                        tools: ['Multimeter', 'Contact Cleaner'],
                        commonIssues: ['Thermostat stuck open', 'Fan slow spin']
                    }
                }
            },
            tower_housewares: {
                name: 'Tower Housewares',
                hasModels: true,
                models: {
                    'Vortx 4L Manual Air Fryer': {
                        name: 'Vortx 4L Manual Air Fryer',
                        steps: ['Test thermal fuse.', 'Inspect mechanical timer switch contacts.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['No heat', 'Timer stuck midway']
                    }
                }
            },
            emeril_lagasse: {
                name: 'Emeril Lagasse',
                hasModels: true,
                models: {
                    'Power AirFryer 360': {
                        name: 'Power AirFryer 360',
                        steps: ['Check multiple quartz heating elements.', 'Test door microswitch and convection fan.'],
                        tools: ['Multimeter', 'Torx Drivers'],
                        commonIssues: ['E01 code', 'Lower elements not glowing']
                    }
                }
            },
            farberware: {
                name: 'Farberware',
                hasModels: true,
                models: {
                    '3.2-Quart Multi-Functional': {
                        name: '3.2-Quart Multi-Functional',
                        steps: ['Test inline thermal cutoff.', 'Verify basket interlock switch alignment.'],
                        tools: ['Multimeter', 'Phillips Driver'],
                        commonIssues: ['Unit dead', 'Basket fails to engage switch']
                    }
                }
            },
            ultrean: {
                name: 'Ultrean',
                hasModels: true,
                models: {
                    '4.2-Quart Digital Air Fryer': {
                        name: '4.2-Quart Digital Air Fryer',
                        steps: ['Inspect LCD display connector.', 'Test thermal fuse on heating ring.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Screen blank', 'Food cooks unevenly']
                    }
                }
            },
            dreo: {
                name: 'Dreo',
                hasModels: true,
                models: {
                    'Air Fryer Pro Max 6.8QT': {
                        name: 'Air Fryer Pro Max 6.8QT',
                        steps: ['Test dual heating control circuit.', 'Check NTC high-precision temp probe.'],
                        tools: ['Multimeter', 'Precision Screwdrivers'],
                        commonIssues: ['E1 error', 'Fan noise']
                    }
                }
            },
            joyoung: {
                name: 'Joyoung',
                hasModels: true,
                models: {
                    'Visible Window Air Fryer 5.5L': {
                        name: 'Visible Window Air Fryer 5.5L',
                        steps: ['Check internal chamber halogen lamp.', 'Inspect blower fan assembly.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Interior lamp dead', 'Thermal switch open']
                    }
                }
            },
            bear_electric: {
                name: 'Bear Electric',
                hasModels: true,
                models: {
                    'Mini Retro Air Fryer 3L': {
                        name: 'Mini Retro Air Fryer 3L',
                        steps: ['Test rotary timer spring and contacts.', 'Inspect thermal fuse.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['No heat', 'Timer chime does not ring']
                    }
                }
            },
            galanz: {
                name: 'Galanz',
                hasModels: true,
                models: {
                    'Speed-Wave 3-in-1 Air Fryer': {
                        name: 'Speed-Wave 3-in-1 Air Fryer',
                        steps: ['Inspect high voltage diode and inverter board.', 'Test air fry convection element.'],
                        tools: ['High-voltage probe', 'Multimeter'],
                        commonIssues: ['Convection element open', 'Error code E-5']
                    }
                }
            },
            supor: {
                name: 'Supor',
                hasModels: true,
                models: {
                    'Smart Touch Air Fryer 4.5L': {
                        name: 'Smart Touch Air Fryer 4.5L',
                        steps: ['Check touch PCB ribbon cable.', 'Inspect top thermal sensor.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Touch panel unresponsive', 'Overheat cutoff']
                    }
                }
            },
            taurus: {
                name: 'Taurus',
                hasModels: true,
                models: {
                    'Air Fry Digital 4L': {
                        name: 'Air Fry Digital 4L',
                        steps: ['Test main power relay.', 'Check basket switch continuity.'],
                        tools: ['Multimeter', 'Screwdriver'],
                        commonIssues: ['Does not heat', 'Display flashes']
                    }
                }
            },
            severin: {
                name: 'Severin',
                hasModels: true,
                models: {
                    'Low Fat Fryer 3.2L': {
                        name: 'Low Fat Fryer 3.2L',
                        steps: ['Test thermal fuse.', 'Inspect temperature sensor resistance.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Dead unit', 'Overheating']
                    }
                }
            },
            princess_housewares: {
                name: 'Princess Housewares',
                hasModels: true,
                models: {
                    'Digital Family Aerofryer XXL 5.2L': {
                        name: 'Digital Family Aerofryer XXL 5.2L',
                        steps: ['Inspect heating ring terminals.', 'Verify digital display cable.'],
                        tools: ['Multimeter', 'Torx Driver'],
                        commonIssues: ['No heat output', 'E2 error code']
                    }
                }
            },
            kalorik: {
                name: 'Kalorik',
                hasModels: true,
                models: {
                    'MAXX 26QT Air Fryer Oven': {
                        name: 'MAXX 26QT Air Fryer Oven',
                        steps: ['Check French door dual microswitches.', 'Test upper and lower heating elements.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Door sensor open error', 'Lower elements not heating']
                    }
                }
            },
            krups: {
                name: 'Krups',
                hasModels: true,
                models: {
                    'Air Fryer EY401': {
                        name: 'Air Fryer EY401',
                        steps: ['Inspect digital control board.', 'Test thermal protection cut-out.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Unit dead', 'Beeps 3 times then shuts down']
                    }
                }
            },
            morphy_richards: {
                name: 'Morphy Richards',
                hasModels: true,
                models: {
                    'Health Fryer 3L': {
                        name: 'Health Fryer 3L',
                        steps: ['Check mechanical thermostat dial.', 'Verify blower motor continuity.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Thermostat open', 'Slow air circulation']
                    }
                }
            },
            westinghouse: {
                name: 'Westinghouse',
                hasModels: true,
                models: {
                    'Opti-Fry 5.2L': {
                        name: 'Opti-Fry 5.2L',
                        steps: ['Test thermal fuse in heat shield.', 'Inspect drawer engagement switch.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['No power', 'Drawer switch not closing']
                    }
                }
            },
            sencor: {
                name: 'Sencor',
                hasModels: true,
                models: {
                    'Digital Air Fryer SFR 5320WH': {
                        name: 'Digital Air Fryer SFR 5320WH',
                        steps: ['Check LED display board.', 'Test heating coil resistance.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['E1 error', 'No heat']
                    }
                }
            },
            panasonic: {
                name: 'Panasonic',
                hasModels: true,
                models: {
                    'Steam Air Fryer Oven NF-CC500': {
                        name: 'Steam Air Fryer Oven NF-CC500',
                        steps: ['Check steam generator water pump and scale buildup.', 'Test convection air fry fan motor and heating ring.'],
                        tools: ['Multimeter', 'Descaling Kit', 'Screwdrivers'],
                        commonIssues: ['Steam injection failure', 'H98 error code']
                    }
                }
            },
            sharp: {
                name: 'Sharp',
                hasModels: true,
                models: {
                    'Air Fryer AF-GS552A': {
                        name: 'Air Fryer AF-GS552A',
                        steps: ['Inspect digital control panel.', 'Check thermal fuse and upper heating tube.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['No power', 'E02 temperature reading fault']
                    }
                }
            },
            haier: {
                name: 'Haier',
                hasModels: true,
                models: {
                    'Air Fryer HAF4000': {
                        name: 'Air Fryer HAF4000',
                        steps: ['Test heating coil continuity.', 'Check fan motor capacitor and thermal fuse.'],
                        tools: ['Multimeter', 'Phillips Screwdriver'],
                        commonIssues: ['Unit dead', 'Fan motor humming without spinning']
                    }
                }
            },
            toshiba: {
                name: 'Toshiba',
                hasModels: true,
                models: {
                    'Air Fryer Combo ML2-EC10SA': {
                        name: 'Air Fryer Combo ML2-EC10SA',
                        steps: ['Check convection fan motor.', 'Test upper air fryer heating element and door microswitches.'],
                        tools: ['Multimeter', 'Torx Screwdrivers'],
                        commonIssues: ['Door switch misalignment', 'E-03 convection error']
                    }
                }
            },
            electrolux: {
                name: 'Electrolux',
                hasModels: true,
                models: {
                    'Explore 6 Air Fryer E6AF1-520K': {
                        name: 'Explore 6 Air Fryer E6AF1-520K',
                        steps: ['Inspect touch panel display.', 'Test thermal safety cutout.', 'Check air circulation motor.'],
                        tools: ['Multimeter', 'Torx Screwdrivers'],
                        commonIssues: ['No power / thermal fuse blown', 'Touch panel lock error']
                    }
                }
            }
        }
    },
    air_purifier: {
        name: 'Air Purifier',
        icon: React.createElement(Wind, { className: "w-5 h-5 text-emerald-500" }),
        brands: {
            dyson: {
                name: 'Dyson',
                hasModels: true,
                models: {
                    'Purifier Cool TP07': {
                        name: 'Purifier Cool TP07',
                        steps: ['Check HEPA filter door sensor switch.', 'Clean PM2.5 laser sensor chamber with compressed air.', 'Test stepper motor oscillation mechanism.'],
                        tools: ['Torx Screwdrivers', 'Compressed Air Can', 'Multimeter'],
                        commonIssues: ['Triangle Exclamation Mark on screen', 'Squeaking oscillation motor']
                    },
                    'Hot+Cool Gen1 HP10': {
                        name: 'Hot+Cool Gen1 HP10',
                        steps: ['Inspect ceramic PTC heating elements and thermal limit switch.', 'Check tilt safety cut-off microswitch.'],
                        tools: ['Torx T8 / T10', 'Multimeter'],
                        commonIssues: ['E7 error code / Thermal sensor failure', 'Remote control magnet weak']
                    }
                }
            },
            xiaomi: {
                name: 'Xiaomi',
                hasModels: true,
                models: {
                    'Smart Air Purifier 4 Pro': {
                        name: 'Smart Air Purifier 4 Pro',
                        steps: ['Reset RFID filter chip sensor if filter replaced.', 'Inspect brushless DC fan motor motor controller PCB.'],
                        tools: ['Plastic Spudger', 'Multimeter'],
                        commonIssues: ['PM2.5 reading stuck high', 'Wi-Fi pairing failure']
                    }
                }
            },
            levoit: {
                name: 'Levoit',
                hasModels: true,
                models: {
                    'Core 400S / Core 600S Smart True HEPA': {
                        name: 'Core 400S / Core 600S Smart True HEPA',
                        steps: ['Clean AirSight Plus laser particulate sensor mirror using lens wipe.', 'Test capacitive top touch panel ribbon cable.', 'Inspect DC brushless centrifugal blower motor bearings.'],
                        tools: ['Torx T10', 'Precision Spudger', 'Contact Cleaner'],
                        commonIssues: ['Air quality indicator ring stuck on red / dirty sensor', 'Touch panel buttons not beeping or responding', 'High-pitch fan motor bearing whistle']
                    },
                    'Vital 200S Pet Air Purifier': {
                        name: 'Vital 200S Pet Air Purifier',
                        steps: ['Inspect washable U-shaped pet hair pre-filter clips.', 'Test Smart Auto Mode infrared particle detector.'],
                        tools: ['Cotton Swab', 'Isopropyl Alcohol'],
                        commonIssues: ['Filter replacement indicator won’t reset (hold reset 3s)', 'Auto mode fan speed oscillating wildly']
                    }
                }
            },
            coway: {
                name: 'Coway (Airmega)',
                hasModels: true,
                models: {
                    'Airmega AP-1512HH Mighty': {
                        name: 'Airmega AP-1512HH Mighty',
                        steps: ['Open side dust sensor door and clean optical sensor lens with damp cotton swab.', 'Inspect bipolar ionizer Vital Ion module and high-voltage transformer.', 'Test multi-speed squirrel cage blower fan.'],
                        tools: ['Phillips #2', 'Cotton Swabs', 'Multimeter'],
                        commonIssues: ['Air quality lamp permanently blue or red', 'Fan rattling against plastic housing on speed 3', 'Ionizer crackling ozone smell']
                    },
                    'Airmega 250 / 400 Dual Suction': {
                        name: 'Airmega 250 / 400 Dual Suction',
                        steps: ['Inspect dual EZ-release pre-filter micro-latches.', 'Test Smart Mode air velocity servo damper.'],
                        tools: ['Precision Screwdrivers', 'Soft Brush'],
                        commonIssues: ['Filter door magnetic interlock not engaging', 'Motor stalling in sleep mode']
                    }
                }
            },
            blueair: {
                name: 'Blueair',
                hasModels: true,
                models: {
                    'Blue Pure 211+ Auto / 311i Max': {
                        name: 'Blue Pure 211+ Auto / 311i Max',
                        steps: ['Inspect HEPASilent dual-stage mechanical + electrostatic charging ionization wire.', 'Test auto-mode particle sensor in rear hatch.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['Top single-button controller stuck down', 'Electrostatic wire loose creating ozone smell']
                    },
                    'Protect 7470i / 7770i': {
                        name: 'Protect 7470i / 7770i',
                        steps: ['Inspect GermShield active antimicrobial fan motor.', 'Check LCD color display touch panel.'],
                        tools: ['Torx T8 / T10', 'Spudger'],
                        commonIssues: ['SmartFilter RFID chip recognition failure', 'SpiralAir airflow outlet damper stuck']
                    }
                }
            },
            winix: {
                name: 'Winix',
                hasModels: true,
                models: {
                    '5500-2 PlasmaWave / AM90': {
                        name: '5500-2 PlasmaWave / AM90',
                        steps: ['Clean optical dust sensor photocell in right-side vent.', 'Test PlasmaWave corona discharge pin.', 'Inspect carbon pellets cassette tray.'],
                        tools: ['Phillips #2', 'Cotton Swab', 'Multimeter'],
                        commonIssues: ['PlasmaWave clicking sound (needs cleaning)', 'Auto fan speed sensor sluggish']
                    }
                }
            },
            honeywell_air: {
                name: 'Honeywell',
                hasModels: true,
                models: {
                    'HPA300 True HEPA / AirGenius 5': {
                        name: 'HPA300 True HEPA / AirGenius 5',
                        steps: ['Inspect 3x True HEPA R-filter perimeter seal gaskets.', 'Test 4-position mechanical rotary selector switch or capacitive touch panel.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Filter check light stays illuminated', 'Motor thermal cut-off fuse blown on Turbo setting']
                    }
                }
            },
            philips_air: {
                name: 'Philips',
                hasModels: true,
                models: {
                    'Series 3000i / Series 1000i': {
                        name: 'Series 3000i / Series 1000i',
                        steps: ['Inspect AeraSense professional-grade optical particle sensor.', 'Test 360-degree aerodynamic cylindrical filter intake.'],
                        tools: ['Torx T10', 'Lens Cloth'],
                        commonIssues: ['AeraSense numerical PM2.5 reading frozen', 'Air+ app Wi-Fi discovery timeout']
                    }
                }
            },
            medify_air: {
                name: 'Medify Air',
                hasModels: true,
                models: {
                    'MA-40 H13 True HEPA / MA-112': {
                        name: 'MA-40 H13 True HEPA / MA-112',
                        steps: ['Inspect tempered glass control touch panel.', 'Test dual-intake fan motor capacitors.'],
                        tools: ['Phillips #2', 'Multimeter'],
                        commonIssues: ['Glass touch panel unresponsive to finger taps', 'Fan motor start capacitor failure']
                    }
                }
            },
            germguardian: {
                name: 'GermGuardian',
                hasModels: true,
                models: {
                    'AC4825 3-in-1 UV-C / AC5900W': {
                        name: 'AC4825 3-in-1 UV-C / AC5900W',
                        steps: ['Inspect UV-C germicidal bulb socket and ballast.', 'Check rear filter door safety microswitch.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['UV-C bulb indicator flashing (bulb life exceeded or ballast dead)', 'Unit won’t power on (door interlock lever bent)']
                    }
                }
            },
            alen_air: {
                name: 'Alen',
                hasModels: true,
                models: {
                    'BreatheSmart 75i / 45i': {
                        name: 'BreatheSmart 75i / 45i',
                        steps: ['Inspect laser particle counter calibration chamber.', 'Test whisper-quiet DC motor tuned airflow chamber.'],
                        tools: ['Torx T15', 'Multimeter'],
                        commonIssues: ['LED color ring sensor drift', 'Designer front panel magnetic latch rattling']
                    }
                }
            },
            rabbit_air: {
                name: 'Rabbit Air',
                hasModels: true,
                models: {
                    'MinusA2 SPA-780N / A3 Ultra Quiet': {
                        name: 'MinusA2 SPA-780N / A3 Ultra Quiet',
                        steps: ['Inspect 6-stage customized filter cassette rail alignment.', 'Test wall-mount safety bracket interlock microswitch.'],
                        tools: ['Phillips Screwdriver', 'Contact Cleaner'],
                        commonIssues: ['Filter alignment error code', 'Mood light LED strip color stuck']
                    }
                }
            },
            sharp_air: {
                name: 'Sharp',
                hasModels: true,
                models: {
                    'Plasmacluster KC-850U with Humidifier': {
                        name: 'Plasmacluster KC-850U with Humidifier',
                        steps: ['Descale rotating humidifier water wick wheel assembly.', 'Clean high-density Plasmacluster ion generating unit electrodes.'],
                        tools: ['Citric Acid Descaler', 'Toothbrush', 'Multimeter'],
                        commonIssues: ['Musty humidifying wheel odor', 'Plasmacluster electrode unit replacement indicator']
                    }
                }
            },
            molekule: {
                name: 'Molekule',
                hasModels: true,
                models: {
                    'Air Pro / Air Mini+ PECO': {
                        name: 'Air Pro / Air Mini+ PECO',
                        steps: ['Inspect Photo Electrochemical Oxidation (PECO) internal UV-A LED array.', 'Test leather handle rotational latch and cylindrical base lock switch.'],
                        tools: ['Torx T8', 'Multimeter'],
                        commonIssues: ['Base lock switch not recognized / Red LED ring', 'PECO filter RFID sensor reset failure']
                    }
                }
            }
        }
    },
    amplifier: {
        name: 'Amplifier / Hi-Fi Stereo Receiver',
        icon: React.createElement(Volume2, { className: "w-5 h-5 text-indigo-500" }),
        brands: {
            yamaha: {
                name: 'Yamaha',
                hasModels: true,
                models: {
                    'A-S301 / A-S801 Stereo Integrated': {
                        name: 'A-S301 / A-S801 Stereo Integrated',
                        steps: ['Check speaker output relays for oxidation.', 'Test main filter capacitors for DC offset at speaker terminals.', 'Verify bias current on power transistor heat sink.'],
                        tools: ['Multimeter', 'Oscilloscope', 'Contact Cleaner Spray'],
                        commonIssues: ['Protection Mode activated', 'One channel crackling/silent']
                    },
                    'R-N803 / R-N2000A Network Receiver': {
                        name: 'R-N803 / R-N2000A Network Receiver',
                        steps: ['Inspect toroidal transformer and dual ESS SABRE DAC boards.', 'Test YPAO room acoustic optimizer input jack.'],
                        tools: ['Hex Screwdrivers', 'Multimeter'],
                        commonIssues: ['Pure Direct mode relay click loop', 'Firmware network update stall']
                    }
                }
            },
            denon: {
                name: 'Denon',
                hasModels: true,
                models: {
                    'PMA-600NE / PMA-1700NE': {
                        name: 'PMA-600NE / PMA-1700NE',
                        steps: ['Test toroidal transformer secondary windings voltage.', 'Check DAC optical input switcher IC.'],
                        tools: ['Multimeter', 'Logic Probe'],
                        commonIssues: ['Red flashing standby LED', 'No optical audio sync']
                    }
                }
            },
            marantz: {
                name: 'Marantz',
                hasModels: true,
                models: {
                    'Model 40n / Cinema 50': {
                        name: 'Model 40n / Cinema 50',
                        steps: ['Inspect proprietary HDAM-SA3 (Hyper Dynamic Amplifier Module) discrete circuits.', 'Test porthole OLED display ribbon connector.'],
                        tools: ['JIS Screwdrivers', 'Multimeter'],
                        commonIssues: ['Porthole display dark', 'Auto-standby triggering prematurely on HDMI eARC']
                    },
                    'PM6007 Integrated Amplifier': {
                        name: 'PM6007 Integrated Amplifier',
                        steps: ['Check discrete dual-differential phono MM input stage.', 'Test gold-plated brass speaker binding posts solder joints.'],
                        tools: ['Soldering Iron', 'Multimeter'],
                        commonIssues: ['Phono channel left side silent', 'Selector switch encoder erratic']
                    }
                }
            },
            onkyo: {
                name: 'Onkyo',
                hasModels: true,
                models: {
                    'TX-NR7100 / TX-RZ50 9.2ch': {
                        name: 'TX-NR7100 / TX-RZ50 9.2ch',
                        steps: ['Inspect HDMI board D2Audio DSP chip (known solder ball micro-fractures on legacy boards).', 'Test Dirac Live calibration mic pre-amp.'],
                        tools: ['Hot Air Rework Station', 'Multimeter'],
                        commonIssues: ['No sound from all channels (DSP chip failure)', 'HDMI board pass-through handshake drop']
                    }
                }
            },
            pioneer_audio: {
                name: 'Pioneer / Pioneer Elite',
                hasModels: true,
                models: {
                    'Elite VSX-LX505 / SX-10AE': {
                        name: 'Elite VSX-LX505 / SX-10AE',
                        steps: ['Inspect Direct Energy Class D amplification modules.', 'Check speaker terminal protection circuit relays.'],
                        tools: ['Multimeter', 'DeoxIT'],
                        commonIssues: ['"AMP DIAG" error on front VFD display', 'Speaker channel cutting in and out at low volume']
                    }
                }
            },
            cambridge_audio: {
                name: 'Cambridge Audio',
                hasModels: true,
                models: {
                    'CXA81 / CXA61 Stereo Amplifier': {
                        name: 'CXA81 / CXA61 Stereo Amplifier',
                        steps: ['Inspect oversized custom toroidal transformer and extruded heatsink.', 'Test ALPS motorized volume potentiometer.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['Motorized volume knob sticking', 'Cap Protection LED flashing 3 or 4 times (over-current)']
                    },
                    'EVO 150 All-in-One Player': {
                        name: 'EVO 150 All-in-One Player',
                        steps: ['Inspect Hypex NCore Class D modules.', 'Test dual-concentric rotary volume/input ring encoder.'],
                        tools: ['Torx Screwdrivers', 'Fine Tweezers'],
                        commonIssues: ['Concentric ring friction scraping', 'StreamMagic network card freeze']
                    }
                }
            },
            rotel: {
                name: 'Rotel',
                hasModels: true,
                models: {
                    'A14MKII / Michi X3': {
                        name: 'A14MKII / Michi X3',
                        steps: ['Inspect British-made custom slit-foil reservoir capacitors.', 'Check Texas Instruments 32-bit/384kHz DAC PCB.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Thermal protection trip during low-impedance 4Ω loudspeaker drive', 'PC-USB driver USB audio class mismatch']
                    }
                }
            },
            nad_electronics: {
                name: 'NAD Electronics',
                hasModels: true,
                models: {
                    'C 3050 / C 316BEE V2': {
                        name: 'C 3050 / C 316BEE V2',
                        steps: ['Inspect retro dual analog VU meter illumination lamps and coils.', 'Test MDC2 (Modular Design Construction) upgrade slot connections.'],
                        tools: ['Hex Keys', 'Multimeter'],
                        commonIssues: ['VU meter needle stuck or unlit', 'BluOS expansion card pairing drop']
                    }
                }
            },
            mcintosh: {
                name: 'McIntosh Laboratory',
                hasModels: true,
                models: {
                    'MA8950 / MA5300 Integrated': {
                        name: 'MA8950 / MA5300 Integrated',
                        steps: ['Inspect iconic patented Autoformer output transformers (2, 4, 8Ω taps).', 'Test glass front panel fiber optic LED illumination and Power Guard circuit.'],
                        tools: ['Precision Tool Set', 'Oscilloscope', 'Multimeter'],
                        commonIssues: ['Power Guard amber light flashing (clipping prevention)', 'Meter calibration potentiometer drift']
                    }
                }
            },
            technics_audio: {
                name: 'Technics',
                hasModels: true,
                models: {
                    'SU-G700M2 / SU-R1000': {
                        name: 'SU-G700M2 / SU-R1000',
                        steps: ['Inspect JENO Engine (Jitter Elimination and Noise-shaping Optimization) processor.', 'Test LAPC (Load Adaptive Phase Calibration) impedance load detector.'],
                        tools: ['Hex Drivers', 'Multimeter'],
                        commonIssues: ['LAPC calibration tone failure', 'Switching power supply silent high-frequency whine']
                    }
                }
            },
            emotiva: {
                name: 'Emotiva',
                hasModels: true,
                models: {
                    'BasX TA2 / XPA-3 Gen3': {
                        name: 'BasX TA2 / XPA-3 Gen3',
                        steps: ['Inspect modular amplifier blade cards and heavy duty copper bus bars.', 'Test microprocessor-controlled status LEDs and standby power supply.'],
                        tools: ['Phillips #2', 'Multimeter'],
                        commonIssues: ['Blade amplifier module fault channel amber light', 'Mains soft-start thermistor open']
                    }
                }
            }
        }
    },
    angle_grinder: {
        name: 'Angle Grinder',
        icon: React.createElement(Wrench, { className: "w-5 h-5 text-stone-600" }),
        brands: {
            bosch: {
                name: 'Bosch',
                hasModels: true,
                models: {
                    'GWS 700 Professional': {
                        name: 'GWS 700 Professional',
                        steps: ['Remove rear motor cover and inspect carbon brushes for wear.', 'Measure armature commutator segment resistance.', 'Inspect bevel gear grease and spindle lock switch.'],
                        tools: ['Screwdriver', 'Multimeter', 'High-Temp Grease', 'Replacement Carbon Brushes'],
                        commonIssues: ['Heavy commutator sparking', 'Motor dead / Carbon brushes worn', 'Gearbox grinding noise']
                    }
                }
            },
            makita: {
                name: 'Makita',
                hasModels: true,
                models: {
                    'GA4530R 720W': {
                        name: 'GA4530R 720W',
                        steps: ['Inspect paddle switch lock-on tab.', 'Test stator coil continuity.', 'Check power cord strain relief for broken internal copper.'],
                        tools: ['Multimeter', 'Wire Strippers'],
                        commonIssues: ['Intermittent power when cord flexes', 'Stator short circuit']
                    },
                    'XAG04Z 18V LXT Brushless': {
                        name: 'XAG04Z 18V LXT Brushless',
                        steps: ['Inspect BL brushless motor controller hall sensors.', 'Test electric brake circuit on release.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['Battery terminal pins burned', 'Electric brake failing to stop disc in 2 seconds']
                    }
                }
            },
            dewalt_grinder: {
                name: 'DeWalt',
                hasModels: true,
                models: {
                    'DWE402 4-1/2" 11-Amp Small Angle': {
                        name: 'DWE402 4-1/2" 11-Amp Small Angle',
                        steps: ['Inspect Dust Ejection System fan and intake shroud.', 'Test Quick-Change wheel release button mechanism and spring.'],
                        tools: ['Torx T20', 'Flathead Screwdriver', 'Multimeter'],
                        commonIssues: ['Spindle lock button stuck down / Won’t release', 'Paddle switch linkage jam from concrete dust']
                    },
                    'DCG413B 20V MAX XR Brushless': {
                        name: 'DCG413B 20V MAX XR Brushless',
                        steps: ['Inspect Kickback Brake E-Clutch electronics.', 'Test battery connector blade tension.'],
                        tools: ['Torx T15', 'Multimeter'],
                        commonIssues: ['Tool shuts down immediately under load (E-Clutch sensor fault)', 'LED light blinking code']
                    }
                }
            },
            milwaukee_grinder: {
                name: 'Milwaukee (M18 FUEL)',
                hasModels: true,
                models: {
                    '2880-20 M18 FUEL 4-1/2" / 5" Grinder': {
                        name: '2880-20 M18 FUEL 4-1/2" / 5" Grinder',
                        steps: ['Inspect removable dust screen vents for metal shaving build-up.', 'Check REDLINK PLUS intelligence module conformal coating.'],
                        tools: ['Torx T15', 'Multimeter', 'Air Compressor'],
                        commonIssues: ['Metal filings shorting stator magnets through vents', 'Rapid-stop brake module failure']
                    }
                }
            },
            metabo_grinder: {
                name: 'Metabo',
                hasModels: true,
                models: {
                    'W 9-115 Quick / Marathon Motor': {
                        name: 'W 9-115 Quick / Marathon Motor',
                        steps: ['Inspect patented Metabo Marathon motor epoxy resin windings protection.', 'Test M-Quick tool-free nut spring tension.'],
                        tools: ['Torx Screwdrivers', 'High-Pressure Grease'],
                        commonIssues: ['S-automatic mechanical safety clutch slipping', 'Carbon brush auto-stop cutoff triggered']
                    }
                }
            },
            ryobi_grinder: {
                name: 'Ryobi',
                hasModels: true,
                models: {
                    'PBLAG01B ONE+ HP Brushless 4-1/2"': {
                        name: 'PBLAG01B ONE+ HP Brushless 4-1/2"',
                        steps: ['Inspect 3-position auxiliary handle mount threads.', 'Check trigger lock-out safety button.'],
                        tools: ['Phillips #2', 'Multimeter'],
                        commonIssues: ['Trigger safety paddle stuck with drywall dust', 'Gearbox thermal overload']
                    }
                }
            },
            hilti_grinder: {
                name: 'Hilti',
                hasModels: true,
                models: {
                    'AG 125-13S / AG 4S-22 Nuron': {
                        name: 'AG 125-13S / AG 4S-22 Nuron',
                        steps: ['Inspect Active Torque Control (ATC) gyroscopic sensor.', 'Check Nuron 22V high-drain battery interface contacts.'],
                        tools: ['Torx Security T15', 'Hilti Service Tool'],
                        commonIssues: ['ATC light flashing (recalibration required)', 'Smart dust hood airflow obstruction']
                    }
                }
            },
            flex_tools: {
                name: 'Flex',
                hasModels: true,
                models: {
                    'FX3171A-Z 24V Brushless 5" Grinder': {
                        name: 'FX3171A-Z 24V Brushless 5" Grinder',
                        steps: ['Inspect anti-kickback dual sensor board.', 'Check variable speed dial potentiometer.'],
                        tools: ['Torx T15', 'Multimeter'],
                        commonIssues: ['Speed dial jitter', 'Drop control vibration sensor false trip']
                    }
                }
            },
            bauer_harbor: {
                name: 'Bauer / Harbor Freight',
                hasModels: true,
                models: {
                    '20V Cordless 4-1/2" Angle Grinder': {
                        name: '20V Cordless 4-1/2" Angle Grinder',
                        steps: ['Inspect carbon brushes on base models or MOSFETs on brushless.', 'Check aluminum gear head bevel gear lash.'],
                        tools: ['Phillips #2', 'Marine Grease'],
                        commonIssues: ['Gear teeth stripping under heavy pressure', 'Power switch contacts scorching']
                    }
                }
            }
        }
    },
    baby_monitor: {
        name: 'Baby Monitor',
        icon: React.createElement(Eye, { className: "w-5 h-5 text-pink-400" }),
        brands: {
            motorola: {
                name: 'Motorola Nursery',
                hasModels: true,
                models: {
                    'MBP36S Video Monitor': {
                        name: 'MBP36S Video Monitor',
                        steps: ['Check micro-USB charging port jack solder joints.', 'Test camera unit pan/tilt servo gear assembly.', 'Verify 3.7V Li-ion battery health.'],
                        tools: ['Soldering Iron', 'Multimeter', 'Precision Screwdrivers'],
                        commonIssues: ['Not charging / Loose micro-USB port', 'Out of range signal error']
                    }
                }
            },
            nanit: {
                name: 'Nanit',
                hasModels: true,
                models: {
                    'Pro Smart Baby Monitor & Floor Stand': {
                        name: 'Pro Smart Baby Monitor & Floor Stand',
                        steps: ['Inspect camera overhead quick-clip pogo pin connector.', 'Test wall/floor stand cable channel power supply wiring (5V 2A).', 'Check Breathing Wear computer vision sensor lens.'],
                        tools: ['Multimeter', 'Alcohol Swab'],
                        commonIssues: ['Camera disconnected from Wi-Fi router 2.4GHz', 'Pogo pin corrosion causing reboot loops', 'Night vision IR light ring failure']
                    }
                }
            },
            owlet: {
                name: 'Owlet',
                hasModels: true,
                models: {
                    'Cam 2 / Smart Sock 3': {
                        name: 'Cam 2 / Smart Sock 3',
                        steps: ['Inspect Smart Sock pulse oximetry optical sensor and magnetic charging base.', 'Test Cam 2cry detection microphone capsule.'],
                        tools: ['Multimeter', 'Alcohol Wipes'],
                        commonIssues: ['Sock sensor reading "Sock placement error"', 'Base station yellow pulse error', 'Cam 2 video stream delay']
                    }
                }
            },
            infant_optics: {
                name: 'Infant Optics',
                hasModels: true,
                models: {
                    'DXR-8 PRO 720P (Active Noise Reduction)': {
                        name: 'DXR-8 PRO 720P (Active Noise Reduction)',
                        steps: ['Inspect optical zoom lens screw-on thread and safety switch.', 'Test parent unit round DC charging barrel jack (commonly cracks solder joints).', 'Replace 2800mAh high-capacity battery pack.'],
                        tools: ['Precision Phillips #00', 'Soldering Iron', 'Multimeter'],
                        commonIssues: ['Parent unit only charges when cord is bent at an angle (broken DC jack)', 'Battery drains in under 1 hour', 'Antenna hinge cracked']
                    }
                }
            },
            vtech_baby: {
                name: 'VTech Baby',
                hasModels: true,
                models: {
                    'VM819 / VM923 720p Pan & Tilt': {
                        name: 'VM819 / VM923 720p Pan & Tilt',
                        steps: ['Inspect 2.4GHz FHSS wireless transceiver antenna.', 'Test camera optical night sensor photocell.'],
                        tools: ['Phillips #00', 'Multimeter'],
                        commonIssues: ['"No Link to Camera" error message', 'Screen remains black and white during daytime (stuck IR filter)']
                    }
                }
            },
            eufy_baby: {
                name: 'Eufy Baby',
                hasModels: true,
                models: {
                    'SpaceView Pro / S340 Smart Sock': {
                        name: 'SpaceView Pro / S340 Smart Sock',
                        steps: ['Inspect 5200mAh internal lithium battery in 5" 720p monitor.', 'Check wide-angle lens magnetic attachment ring.'],
                        tools: ['Spudger', 'Torx T5'],
                        commonIssues: ['Monitor screen battery swelled', 'Pan/tilt motor clicking noise']
                    }
                }
            },
            cubo_ai: {
                name: 'CuboAi',
                hasModels: true,
                models: {
                    'CuboAi Plus Smart Baby Monitor': {
                        name: 'CuboAi Plus Smart Baby Monitor',
                        steps: ['Inspect USB-C 3-meter flat cable connector.', 'Test temperature & humidity environmental dongle probe.'],
                        tools: ['USB-C Power Meter', 'Pin Tool'],
                        commonIssues: ['Temperature probe readings erroneous', 'AI face-covered alert notification delay']
                    }
                }
            },
            hellobaby: {
                name: 'HelloBaby',
                hasModels: true,
                models: {
                    'HB65 / HB6550 Video Monitor': {
                        name: 'HB65 / HB6550 Video Monitor',
                        steps: ['Inspect USB Type-C power input port.', 'Test VOX sound sensitivity trigger circuit.'],
                        tools: ['Soldering Station', 'Multimeter'],
                        commonIssues: ['VOX mode screen fails to wake on baby cry', 'USB-C socket pins bent']
                    }
                }
            }
        }
    },
    battery_charger: {
        name: 'Battery Charger / Maintainer / Jump Starter',
        icon: React.createElement(Battery, { className: "w-5 h-5 text-emerald-600" }),
        brands: {
            noco: {
                name: 'NOCO Genius / Boost',
                hasModels: true,
                models: {
                    'GENIUS5 5-Amp / Boost Plus GB40 Jump Starter': {
                        name: 'GENIUS5 5-Amp / Boost Plus GB40 Jump Starter',
                        steps: ['Check inline DC output blade fuse (10A/15A mini blade fuse).', 'Inspect heavy-gauge battery clamp cable copper fatigue at clamp pivot.', 'Test reverse polarity and overvoltage protection MOSFETs on power board.', 'Test internal 12V 24Wh lithium-ion pouch cell balance voltage on Boost jump starters.'],
                        tools: ['Multimeter', 'Torx T8 Screwdriver', 'Wire Strippers', 'Replacement Blade Fuse'],
                        commonIssues: ['"Bad Battery" / Red exclamation error light flashing', 'Zero DC output voltage when clamps disconnected (NOCO zero-volt force mode required)', 'Internal jump starter battery won’t recharge past 25%']
                    }
                }
            },
            ctek: {
                name: 'CTEK',
                hasModels: true,
                models: {
                    'MXS 5.0 / Multi US 7002 8-Step Smart Charger': {
                        name: 'MXS 5.0 / Multi US 7002 8-Step Smart Charger',
                        steps: ['Inspect comfort connect eyelet harness cable strain relief.', 'Test 8-stage microprocessing charging algorithm LED indicators.', 'Check desulfation high-frequency pulse circuit.'],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['Mode selector button stuck or won’t toggle between Car/Motorcycle/AGM/Recond modes', 'Red error exclamation LED on Step 5 (battery cannot hold charge)']
                    }
                }
            },
            battery_tender: {
                name: 'Battery Tender (Deltran)',
                hasModels: true,
                models: {
                    'Battery Tender Plus 1.25A / Junior 0.75A': {
                        name: 'Battery Tender Plus 1.25A / Junior 0.75A',
                        steps: ['Inspect molded SAE quick-disconnect plug for loose pins.', 'Test float/maintenance mode switching voltage (13.2V - 13.6V DC).', 'Inspect internal potted transformer circuit.'],
                        tools: ['Multimeter', 'Contact Cleaner'],
                        commonIssues: ['Solid red LED never transitions to flashing green (battery sulfated or shorted cell)', 'Loose SAE terminal connection cutting power intermittently']
                    }
                }
            },
            schumacher: {
                name: 'Schumacher Electric',
                hasModels: true,
                models: {
                    'SC1281 100A Engine Starter / Battery Maintainer': {
                        name: 'SC1281 100A Engine Starter / Battery Maintainer',
                        steps: ['Inspect heavy-duty 100A jump start copper wound transformer secondary taps.', 'Test digital alternator / battery tester display PCB.', 'Check heavy-gauge 6 AWG copper clamp jaw connections.'],
                        tools: ['Nut Driver Set', 'Multimeter'],
                        commonIssues: ['Internal cooling fan seized with dust / Overheat shutoff', 'Rotary function dial loose']
                    }
                }
            },
            dewalt_charger: {
                name: 'DeWalt',
                hasModels: true,
                models: {
                    'DCB115 12V/20V MAX / DXAEJ14 Digital Jump Starter': {
                        name: 'DCB115 12V/20V MAX / DXAEJ14 Digital Jump Starter',
                        steps: ['Inspect power tool battery slide terminal prongs for oxidation.', 'Test high-voltage switching transistor and optocoupler feedback loop.', 'Check jump starter integrated air compressor pump motor.'],
                        tools: ['Torx T10', 'Multimeter', 'Contact Cleaner'],
                        commonIssues: ['Red light blinks fast (hot/cold pack delay error)', 'Jump starter reverse polarity buzzer sounds when clamps connected correctly']
                    }
                }
            },
            milwaukee_charger: {
                name: 'Milwaukee Tool',
                hasModels: true,
                models: {
                    'M18 & M12 Multi-Voltage Charger 48-59-1812': {
                        name: 'M18 & M12 Multi-Voltage Charger 48-59-1812',
                        steps: ['Inspect dual M12 stem / M18 slide terminal leaves.', 'Test main fuse and electrolytic smoothing capacitors on switching supply.'],
                        tools: ['Security Torx T10', 'Multimeter', 'Soldering Iron'],
                        commonIssues: ['Alternating red/green flash (damaged battery pack or dirty terminal contacts)', 'Blown input bridge rectifier after jobsite generator voltage spike']
                    }
                }
            }
        }
    },
    blender: {
        name: 'Blender / Food Processor',
        icon: React.createElement(Zap, { className: "w-5 h-5 text-emerald-400" }),
        brands: {
            nutribullet: {
                name: 'NutriBullet',
                hasModels: false,
                sizes: {
                    '600W Pro': {
                        name: '600W Pro',
                        steps: ['Clean sugar/liquid sticky residue from 3 base activator microswitches.', 'Inspect rubber drive coupler teeth for stripping.', 'Test motor thermal cutoff thermostat.'],
                        tools: ['Flathead Screwdriver', 'Contact Cleaner', 'Pliers'],
                        commonIssues: ['Motor will not trigger when pressed', 'Stripped rubber drive gear', 'Leaking blade bearing']
                    },
                    '900W Pro': {
                        name: '900W Pro',
                        steps: ['Test motor armature brushes.', 'Inspect blade assembly gasket sealing ring.'],
                        tools: ['Multimeter', 'Replacement Brushes'],
                        commonIssues: ['Burning rubber smell', 'Intermittent switch contact']
                    }
                }
            },
            vitamix: {
                name: 'Vitamix',
                hasModels: true,
                models: {
                    'E310 Explorian / 5200 Classic': {
                        name: 'E310 Explorian / 5200 Classic',
                        steps: ['Check variable speed potentiometer.', 'Inspect drive socket allen set screw (use 5/64" hex key to replace drive socket kit).', 'Test thermal overload switch reset button on bottom plate.'],
                        tools: ['Hex Wrench 5/64"', 'Multimeter', 'Vitamix Wrench'],
                        commonIssues: ['Thermal shutdown during heavy peanut butter blending', 'Stripped drive socket teeth', 'Blade assembly bearing seized']
                    },
                    'A3500 Ascent Series Smart': {
                        name: 'A3500 Ascent Series Smart',
                        steps: ['Inspect SELF-DETECT NFC container recognition sensor ring.', 'Test capacitive glass touchscreen control PCB.'],
                        tools: ['Torx T15', 'Multimeter'],
                        commonIssues: ['"Container Not Detected" error symbol', 'Touch screen calibration drift']
                    }
                }
            },
            ninja_blender: {
                name: 'Ninja (SharkNinja)',
                hasModels: true,
                models: {
                    'Professional Plus Kitchen System BL770 / BN801': {
                        name: 'Professional Plus Kitchen System BL770 / BN801',
                        steps: ['Inspect lid safety locking handle microswitch plunger pin.', 'Test Total Crushing 6-blade stack driveshaft locking splines.', 'Check pitcher base safety interlock collar.'],
                        tools: ['Phillips #2 Screwdriver', 'Multimeter', 'Contact Cleaner'],
                        commonIssues: ['Power button blinking / Lid handle not clicked fully shut', 'Pitcher base locking tab snapped off', 'Blade shaft stripped']
                    },
                    'Twisti High-Speed SS151': {
                        name: 'Twisti High-Speed SS151',
                        steps: ['Inspect built-in twist tamper paddle gears.', 'Test hybrid edge stainless steel blade high-torque motor.'],
                        tools: ['Phillips Screwdriver', 'Food-Grade Grease'],
                        commonIssues: ['Twist tamper paddle jamming on frozen fruit', 'Auto-iQ program stopping mid-cycle']
                    }
                }
            },
            cuisinart_blender: {
                name: 'Cuisinart',
                hasModels: true,
                models: {
                    'Core Custom 14-Cup Food Processor / Hurricane': {
                        name: 'Core Custom 14-Cup Food Processor / Hurricane',
                        steps: ['Inspect work bowl lid pusher safety interlock rod.', 'Test heavy-duty induction motor start capacitor.', 'Check touchpad membrane switch continuity.'],
                        tools: ['Phillips Screwdriver', 'Capacitance Meter', 'Multimeter'],
                        commonIssues: ['Motor buzzes but bowl blade will not spin (dead motor capacitor)', 'Work bowl interlock safety tab broken', 'Control paddle switch snapped']
                    }
                }
            },
            oster: {
                name: 'Oster',
                hasModels: true,
                models: {
                    'Classic 700W / Pro 1200': {
                        name: 'Classic 700W / Pro 1200',
                        steps: ['Inspect iconic All-Metal Drive (Duralast) coupler gear teeth.', 'Replace crushed rubber sealing O-ring beneath 4-point star blade.', 'Inspect carbon brushes.'],
                        tools: ['Flathead Screwdriver', 'Wrench', 'Replacement O-Rings'],
                        commonIssues: ['Liquid leaking into motor base past worn seal', 'Metal drive coupler screw loosened (reverse thread)', 'Pitcher glass cracked at collar']
                    }
                }
            },
            braun_blender: {
                name: 'Braun',
                hasModels: true,
                models: {
                    'MultiQuick 9 Hand Immersion / PureMix': {
                        name: 'MultiQuick 9 Hand Immersion / PureMix',
                        steps: ['Inspect ActiveBlade flexible shaft spring travel.', 'Test SmartSpeed pressure-sensitive trigger switch potentiometer.'],
                        tools: ['Torx T8', 'Fine Tweezers'],
                        commonIssues: ['ActiveBlade shaft stuck in down position with food residue', 'Immersion bell attachment release buttons jammed']
                    }
                }
            },
            hamilton_beach: {
                name: 'Hamilton Beach',
                hasModels: true,
                models: {
                    'Wave Crusher / Big Mouth Food Processor': {
                        name: 'Wave Crusher / Big Mouth Food Processor',
                        steps: ['Inspect wave-action glass jar base threaded ring.', 'Test 40-oz bowl safety interlock bar.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Plastic blade clutch stripped', 'Safety chute microswitch misaligned']
                    }
                }
            },
            blendtec: {
                name: 'Blendtec',
                hasModels: true,
                models: {
                    'Total Blender Classic 575 / Designer 650': {
                        name: 'Total Blender Classic 575 / Designer 650',
                        steps: ['Inspect heavy-duty forged single-piece wingtip blunt safety blade bearing.', 'Test capacitive slider touch bar controller.', 'Check 3.0 peak HP motor brushes.'],
                        tools: ['Hex Drivers', 'Multimeter'],
                        commonIssues: ['WildSide+ jar black rubber bearing leaking black grease into pitcher', 'Capacitive touch slider unresponsive']
                    }
                }
            },
            breville_blender: {
                name: 'Breville',
                hasModels: true,
                models: {
                    'The Super Q / The Fresh & Furious': {
                        name: 'The Super Q / The Fresh & Furious',
                        steps: ['Inspect noise suppression acoustic hood microswitch.', 'Test clip-in Vac Q vacuum pump valve seal on lid.'],
                        tools: ['Phillips Screwdriver', 'Torx T10'],
                        commonIssues: ['Overload protection code "OVERLOAD" on LCD display', 'Vac Q vacuum valve not sealing']
                    }
                }
            },
            thermomix: {
                name: 'Vorwerk (Thermomix)',
                hasModels: true,
                models: {
                    'Thermomix TM6 / TM5 Smart Cooker': {
                        name: 'Thermomix TM6 / TM5 Smart Cooker',
                        steps: ['Inspect motorized locking arms and mixing bowl contact pin array.', 'Calibrate high-precision weighing sensor load cells in feet.', 'Test integrated resistive heating element inside bowl.'],
                        tools: ['Torx T10 / T20', 'Isopropanol', 'Calibration Weight'],
                        commonIssues: ['Error code C160 / Motor locking arms stuck', 'Weight scales jumping wildly (clean crumb buildup under feet)', 'Bowl heating contact pins oxidized']
                    }
                }
            },
            magimix: {
                name: 'Magimix',
                hasModels: true,
                models: {
                    'Compact 3200 XL / Cook Expert': {
                        name: 'Compact 3200 XL / Cook Expert',
                        steps: ['Inspect direct-drive commercial asynchronous induction motor.', 'Check triple safety interlock bowl lid rod.'],
                        tools: ['Flathead Screwdriver', 'Multimeter'],
                        commonIssues: ['Spindle extension shaft stuck on motor shaft', 'Safety lid push tab fractured']
                    }
                }
            },
            kitchenaid_blender: {
                name: 'KitchenAid',
                hasModels: true,
                models: {
                    'K400 Variable Speed / High Performance': {
                        name: 'K400 Variable Speed / High Performance',
                        steps: ['Inspect 1.5 peak HP motor with Intelli-Speed motor control board.', 'Test die-cast metal rotary dial encoder switch.'],
                        tools: ['Torx Screwdriver', 'Multimeter'],
                        commonIssues: ['Speed dial flashes white LED / Motor stall', 'Drive coupler stripped']
                    }
                }
            },
            bosch_blender: {
                name: 'Bosch (MUM / VitaPower)',
                hasModels: true,
                models: {
                    'VitaPower Series 4 / MUM5 Kitchen Machine': {
                        name: 'VitaPower Series 4 / MUM5 Kitchen Machine',
                        steps: ['Inspect 3D Planetary Mixing gear drive.', 'Check ProEdge stainless steel blade assembly.'],
                        tools: ['Torx T15', 'High-Temp Gear Grease'],
                        commonIssues: ['Multi-motion arm hinge lock seized', 'Thermal cut-off trip']
                    }
                }
            }
        }
    },
    bluray_player: {
        name: 'DVD & Blu-ray / 4K UHD Disc Player',
        icon: React.createElement(Disc, { className: "w-5 h-5 text-blue-500" }),
        brands: {
            samsung_bd: {
                name: 'Samsung (Blu-ray & DVD)',
                hasModels: true,
                models: {
                    'BD-J5100 / BD-H6500 / DVD-C500 / UBD-K8500 4K': {
                        name: 'BD-J5100 / BD-H6500 / DVD-C500 / UBD-K8500 4K',
                        steps: [
                            'Inspect switch-mode power supply (SMPS) secondary filter electrolytic capacitors (typically 1000uF 10V / 16V) for bulging or high ESR causing endless "LOAD" boot loops.',
                            'Clean dual optical laser pickup lens (SOH-BDP7G / AK96 block) with isopropyl alcohol swab.',
                            'Check disc tray loading motor square rubber drive belt for stretching or slipping.',
                            'Inspect optical drive spindle brushless motor bearing and chuck magnetic clamp.'
                        ],
                        tools: ['Precision Phillips Screwdriver', 'Multimeter', 'Soldering Iron & Solder Wick', 'Replacement 1000uF 16V Capacitors', 'Lens Cleaning Swab'],
                        commonIssues: ['Stuck in continuous boot loop flashing "LOAD" on front panel display', '"NO DISC" error on Blu-ray discs while still reading standard DVDs', 'Disc drawer refuses to open or requires a manual pin poke in the emergency eject hole']
                    }
                }
            },
            telefunken_dvd: {
                name: 'Telefunken',
                hasModels: true,
                models: {
                    'TDV-200 / TDV-500 HDMI DVD Player / TEP-100': {
                        name: 'TDV-200 / TDV-500 HDMI DVD Player / TEP-100',
                        steps: [
                            'Inspect power supply board output voltages (+5V, +12V, -12V rails).',
                            'Check SMPS secondary high-speed Schottky rectifier diode (SR360 / 1N5822) for short-circuit.',
                            'Inspect optical laser sled assembly (Sanyo SF-HD850 / SOH-DL6 mechanism); clean objective lens and lubricate guide rails with white lithium grease.',
                            'Test front panel tactile push buttons for high resistance (>50 ohms) causing wrong button presses.'
                        ],
                        tools: ['Multimeter', 'Soldering Iron', 'Replacement SF-HD850 Laser Pickup', 'White Lithium Grease'],
                        commonIssues: ['No power / Standby light off (blown power supply Schottky diode or Viper22A PWM IC)', '"NO DISC" / "ERR" when reading discs', 'Tray ejects immediately after closing (dirty tray limit leaf switch)']
                    }
                }
            },
            harwa_dvd: {
                name: 'Harwa',
                hasModels: true,
                models: {
                    'HW-9000 / HW-6000 / HW-711 HDMI Mini Hi-Fi & DVD': {
                        name: 'HW-9000 / HW-6000 / HW-711 HDMI Mini Hi-Fi & DVD',
                        steps: [
                            'Check Sunplus (SPHE8202R / SPHE8202L) MPEG decoder IC for overheating or cold solder joints.',
                            'Measure spindle motor internal coil resistance across terminals (normal range is 8-14 ohms; if <5 ohms or open, motor commutator is shorted with carbon dust).',
                            'Carefully tweak laser diode gain potentiometer (anti-clockwise by 5-10% only) if reading dual-layer DVD fails.',
                            'Check 12V DC auxiliary power brick/transformer output under load.'
                        ],
                        tools: ['Multimeter', 'Small Phillips Screwdriver', 'Fine-Tip Soldering Iron', 'Replacement RF-300 Spindle Motor'],
                        commonIssues: ['Disc spins briefly and stops with "NO DISC" (shorted spindle motor or worn laser diode)', 'Freezes or stutters during playback after 20 minutes (overheating Sunplus chipset)', 'Remote control unresponsive due to degraded IR receiver diode']
                    }
                }
            },
            condere_dvd: {
                name: 'Condere',
                hasModels: true,
                models: {
                    'CD-8828 / CD-902 Portable & Desktop DVD Player': {
                        name: 'CD-8828 / CD-902 Portable & Desktop DVD Player',
                        steps: [
                            'Check 12V DC input reverse-polarity protection diode and input ceramic filter caps.',
                            'Inspect flexible flat cable (FFC ribbon cable) connecting laser carriage to main PCB for hairline trace fractures.',
                            'Clean spindle turntable rubber grip pad to prevent disc slippage during high-speed spin-up.',
                            'Test 3.7V / 7.4V lithium battery pack voltage on portable models.'
                        ],
                        tools: ['Multimeter', 'Tweezers', 'Replacement FFC Ribbon Cable', 'Isopropyl Alcohol'],
                        commonIssues: ['Clicks repeatedly and fails to spin disc (cracked ribbon cable to laser sled)', 'Won\'t power on on battery power (tripped BMS protection board)', 'Audio buzzing on RCA analog outputs']
                    }
                }
            },
            bbk_electronics: {
                name: 'BBK Electronics',
                hasModels: true,
                models: {
                    'DV965S / DV985S / DV997S High-Fidelity DVD': {
                        name: 'DV965S / DV985S / DV997S High-Fidelity DVD',
                        steps: [
                            'Inspect linear power transformer secondary outputs and LM317 / 7805 voltage regulators.',
                            'Test MediaTek MT1389 video processor clock oscillator crystal (27MHz).',
                            'Check laser pickup mechanism and replace worn rubber drive belt on motorized loader.'
                        ],
                        tools: ['Oscilloscope', 'Multimeter', 'Desoldering Pump'],
                        commonIssues: ['Laser sled skips across chapters (sticky grease on worm gear)', 'Stuck on "BBK" greeting splash screen']
                    }
                }
            },
            shinco: {
                name: 'Shinco (Jiangsu)',
                hasModels: true,
                models: {
                    'DVP-3111 / SDP-1720 Portable & Desktop DVD': {
                        name: 'DVP-3111 / SDP-1720 Portable & Desktop DVD',
                        steps: [
                            'Inspect internal motorized tray mechanism micro-switches.',
                            'Check laser lens focus coil and tracking coil impedance (approx 4-6 ohms).',
                            'Test swivel LCD display LVDS ribbon hinge cable on portable models.'
                        ],
                        tools: ['Multimeter', 'Phillips #0', 'Lubricant'],
                        commonIssues: ['Blank or flickering LCD screen when opening swivel display', 'Disc spins backwards or erratically']
                    }
                }
            },
            malata: {
                name: 'Malata (Wanlida)',
                hasModels: true,
                models: {
                    'DVP-520 / DVP-550 Progressive Scan DVD': {
                        name: 'DVP-520 / DVP-550 Progressive Scan DVD',
                        steps: [
                            'Test progressive scan DAC output transistors.',
                            'Inspect power supply secondary filtering section capacitors.',
                            'Check disc clamping magnetic puck alignment.'
                        ],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['No video on Component YPbPr outputs', 'Disc rubs against metal chassis during spin-up']
                    }
                }
            },
            desay: {
                name: 'Desay Electronics',
                hasModels: true,
                models: {
                    'DS-5310 / DS-5115 Ultra-Slim DVD': {
                        name: 'DS-5310 / DS-5115 Ultra-Slim DVD',
                        steps: [
                            'Inspect compact switch-mode power board for cold solder joints around flyback transformer.',
                            'Clean optical pickup lens and inspect laser flex cable.'
                        ],
                        tools: ['Multimeter', 'Isopropyl Alcohol'],
                        commonIssues: ['Power LED blinks dimly without turning on', 'Disc loading tray gets jammed halfway']
                    }
                }
            },
            changhong_dvd: {
                name: 'Changhong',
                hasModels: true,
                models: {
                    'DVD-500 / DVD-3000 Series': {
                        name: 'DVD-500 / DVD-3000 Series',
                        steps: ['Inspect power supply primary switching MOSFET.', 'Test spindle motor and sled motor driver IC (BA5954FP / CD5888CB).'],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['Motor driver IC gets extremely hot within 2 minutes', 'Tray will not open']
                    }
                }
            },
            skyworth_dvd: {
                name: 'Skyworth',
                hasModels: true,
                models: {
                    'DVD-728 / Mini Disc Player': {
                        name: 'DVD-728 / Mini Disc Player',
                        steps: ['Check 5V USB playback port supply line.', 'Inspect laser sled limit switch.'],
                        tools: ['Multimeter', 'Contact Cleaner'],
                        commonIssues: ['USB drive not recognized', 'Laser optical head slams into center spindle continuously']
                    }
                }
            },
            konka_dvd: {
                name: 'Konka',
                hasModels: true,
                models: {
                    'KD-818 / KD-820 Home Theater Disc Player': {
                        name: 'KD-818 / KD-820 Home Theater Disc Player',
                        steps: ['Check 5.1 channel analog audio pre-amp op-amps (4558).', 'Inspect tray motor gear teeth.'],
                        tools: ['Multimeter', 'Audio Signal Tracer'],
                        commonIssues: ['No sound on surround channels', 'Hum on subwoofer output']
                    }
                }
            },
            coby_dvd: {
                name: 'Coby Electronics',
                hasModels: true,
                models: {
                    'DVD-224 / DVD-515 / TFDVD7009 Portable': {
                        name: 'DVD-224 / DVD-515 / TFDVD7009 Portable',
                        steps: ['Test DC barrel power jack center pin solder joint.', 'Inspect laser sled transport guide bar.'],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['Wobbly DC power jack causes unit to reset when wire moves', 'Motor spins but optical head does not move']
                    }
                }
            },
            naxa_dvd: {
                name: 'Naxa Electronics',
                hasModels: true,
                models: {
                    'ND-843 / NPD-952 Swivel Screen Portable DVD': {
                        name: 'ND-843 / NPD-952 Swivel Screen Portable DVD',
                        steps: ['Inspect lithium battery pack pouch for swelling.', 'Test built-in stereo speaker coil continuity.'],
                        tools: ['Multimeter', 'Plastic Spudger'],
                        commonIssues: ['Swollen battery preventing door from latching', 'Distorted speaker audio']
                    }
                }
            },
            sylvania_dvd: {
                name: 'Sylvania (Funai)',
                hasModels: true,
                models: {
                    'SDVD1041 / SDVD6670 / SDVD7014': {
                        name: 'SDVD1041 / SDVD6670 / SDVD7014',
                        steps: ['Clean optical lens with lint-free swab.', 'Inspect tray eject spring and limit latch.'],
                        tools: ['Cotton Swab', 'Isopropyl Alcohol', 'Needlenose Pliers'],
                        commonIssues: ['Tray pops back open immediately', 'Pixelation and freezing during movie playback']
                    }
                }
            },
            craig_dvd: {
                name: 'Craig Electronics',
                hasModels: true,
                models: {
                    'CVD401A / CTFT712 Portable DVD': {
                        name: 'CVD401A / CTFT712 Portable DVD',
                        steps: ['Inspect AC wall adapter output.', 'Check spindle motor solder tabs.'],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['Dead with zero power', 'Grinding noise when spinning']
                    }
                }
            },
            gpx_dvd: {
                name: 'GPX',
                hasModels: true,
                models: {
                    'D200B / PD901B Portable DVD Player': {
                        name: 'D200B / PD901B Portable DVD Player',
                        steps: ['Check headphone jack audio switch leaf contacts.', 'Inspect laser carriage worm gear.'],
                        tools: ['Multimeter', 'Contact Cleaner'],
                        commonIssues: ['No audio through speakers when headphones are unplugged', 'Disc fails to read']
                    }
                }
            },
            fangor_dvd: {
                name: 'Fangor',
                hasModels: true,
                models: {
                    'F-1002 / 10.5" Dual Screen Car Portable DVD': {
                        name: 'F-1002 / 10.5" Dual Screen Car Portable DVD',
                        steps: ['Inspect car 12V cigarette lighter power adapter cord fuse.', 'Test secondary screen AV-out cable continuity.'],
                        tools: ['Multimeter', 'Replacement 2A Glass Fuse'],
                        commonIssues: ['Secondary screen black with no signal', 'Blows car lighter fuse on startup']
                    }
                }
            },
            wonnie_dvd: {
                name: 'Wonnie',
                hasModels: true,
                models: {
                    'W-1088 17.9" Large Screen Portable DVD': {
                        name: 'W-1088 17.9" Large Screen Portable DVD',
                        steps: ['Inspect internal 5000mAh battery cell voltage balance.', 'Clean high-definition laser optical sensor.'],
                        tools: ['Multimeter', 'Microfiber Swab'],
                        commonIssues: ['Battery indicates 100% then drops to 0% in 5 minutes', 'Stuck on "READING"']
                    }
                }
            },
            panasonic_bd: {
                name: 'Panasonic (Reference 4K UHD)',
                hasModels: true,
                models: {
                    'DP-UB820 / DP-UB9000 Reference 4K HDR': {
                        name: 'DP-UB820 / DP-UB9000 Reference 4K HDR',
                        steps: ['Clean triple-wavelength optical laser pickup lens (CD 780nm / DVD 650nm / BD 405nm) with reagent-grade isopropyl alcohol.', 'Inspect tray loading belt and gear track alignment.', 'Check HCX video processor thermal paste and power board filter capacitors.'],
                        tools: ['Lens Cleaning Swabs', 'Reagent Isopropyl Alcohol', 'Precision Tweezers', 'Torx T8'],
                        commonIssues: ['"NO DISC" or "CANNOT READ DISC" on 4K Triple-Layer 100GB discs', 'Disc tray stalls or reverses immediately after closing', 'Audio drops on secondary HDMI audio-only output']
                    }
                }
            },
            sony: {
                name: 'Sony',
                hasModels: true,
                models: {
                    'UBP-X700 / UBP-X800M2 / BDP-S3700': {
                        name: 'UBP-X700 / UBP-X800M2 / BDP-S3700',
                        steps: ['Clean dual laser diodes with optical swab.', 'Replace stretched tray loading motor rubber drive belt.', 'Inspect external 12V DC power adapter barrel jack on X700.'],
                        tools: ['Cotton Swabs', 'Isopropyl Alcohol', 'Replacement Loading Belt', 'Multimeter'],
                        commonIssues: ['Freezes at the 2-hour mark on 4K UHD BD-100 triple layer discs (laser sled rail needs grease)', 'Disc tray refuses to open / Gears grinding', 'Stuck on "SONY" logo screen']
                    }
                }
            },
            lg_bd: {
                name: 'LG',
                hasModels: true,
                models: {
                    'UBK90 4K Ultra HD / BP175': {
                        name: 'UBK90 4K Ultra HD / BP175',
                        steps: ['Inspect spindle motor turntable rubber ring for disc slippage.', 'Test optical sled worm drive stepper motor.'],
                        tools: ['Precision Screwdrivers', 'Contact Cleaner'],
                        commonIssues: ['Spinning disc buzzing noise', 'Player shuts down after 15 minutes']
                    }
                }
            },
            oppo: {
                name: 'OPPO Digital (Audiophile)',
                hasModels: true,
                models: {
                    'UDP-203 / UDP-205 4K Ultra HD Universal': {
                        name: 'UDP-203 / UDP-205 4K Ultra HD Universal',
                        steps: ['Inspect custom toroidal linear power supply on UDP-205.', 'Clean optical drive mechanism precision damping suspension springs.', 'Test Sabre ES9038PRO DAC analog output board.'],
                        tools: ['Torx Screwdrivers', 'Oscilloscope', 'Multimeter'],
                        commonIssues: ['Disc tray sticking due to aged silicon grease on guide rails', 'No analog XLR audio output']
                    }
                }
            },
            pioneer_bd: {
                name: 'Pioneer Elite',
                hasModels: true,
                models: {
                    'UDP-LX500 / BDP-80FD Universal Disc Player': {
                        name: 'UDP-LX500 / BDP-80FD Universal Disc Player',
                        steps: ['Inspect honeycomb drive mechanism cover for vibration resonance.', 'Test high-rigidity chassis ground contacts.'],
                        tools: ['JIS Screwdrivers', 'Multimeter'],
                        commonIssues: ['SACD / DSD layer not recognized', 'Front panel OLED dim']
                    }
                }
            }
        }
    },
    ceiling_light: {
        name: 'Ceiling Light Fixture / Smart Flushmount',
        icon: React.createElement(Sun, { className: "w-5 h-5 text-amber-300" }),
        brands: {
            philips_hue: {
                name: 'Philips Hue (Being / Enrave / Infuse)',
                hasModels: true,
                models: {
                    'Being / Enrave / Infuse LED Flushmount': {
                        name: 'Being / Enrave / Infuse LED Flushmount',
                        steps: ['Test constant current 24V-36V DC LED driver output voltage.', 'Inspect Zigbee / Bluetooth controller board antenna trace.', 'Check AC quick-connect push wire terminals for loose ground or neutral.'],
                        tools: ['Non-Contact Voltage Tester', 'Multimeter', 'Wire Stripper'],
                        commonIssues: ['LED light strip flickering on high brightness (failing LED driver electrolytic capacitor)', 'Unresponsive in Hue app / Factory reset via 5 power cycle toggles required', 'Half of dual-zone diffuser unlit']
                    }
                }
            },
            lutron_ketra: {
                name: 'Lutron / Ketra',
                hasModels: true,
                models: {
                    'Ketra D3 / Natural Light Smart Downlight': {
                        name: 'Ketra D3 / Natural Light Smart Downlight',
                        steps: ['Test Clear Connect Type X RF transceiver communication.', 'Inspect dynamic color calibration LED optic cluster.', 'Check heatsink thermal interface.'],
                        tools: ['Multimeter', 'Lutron App Diagnostics'],
                        commonIssues: ['Downlight drops offline from Lutron Athena/HomeWorks processor', 'Color temperature calibration drift']
                    }
                }
            },
            halo: {
                name: 'Halo Lighting (Cooper)',
                hasModels: true,
                models: {
                    'RL56 Smart LED Recessed / HLB Ultra-Thin': {
                        name: 'RL56 Smart LED Recessed / HLB Ultra-Thin',
                        steps: ['Inspect remote junction box driver circuit.', 'Test 5-position selectable CCT (2700K - 5000K) slider switch.'],
                        tools: ['Voltage Tester', 'Wire Nuts'],
                        commonIssues: ['Light strobing when used with older triac dimmer switch (requires ELV/LED dimmer)', 'Junction box spring clip broke']
                    }
                }
            },
            lithonia: {
                name: 'Lithonia Lighting (Acuity Brands)',
                hasModels: true,
                models: {
                    'Wafer Ultra-Thin Canless Downlight / Futra Flushmount': {
                        name: 'Wafer Ultra-Thin Canless Downlight / Futra Flushmount',
                        steps: ['Test isolated class 2 driver output wires.', 'Inspect edge-lit acrylic light guide plate for heat yellowing.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Driver hums or buzzes loudly', 'Light stays dim at 10% brightness']
                    }
                }
            },
            yeelight: {
                name: 'Yeelight',
                hasModels: true,
                models: {
                    'Arwen 450C / 550C Smart Ceiling Light': {
                        name: 'Arwen 450C / 550C Smart Ceiling Light',
                        steps: ['Inspect quick-swap base plate electrical shoe prongs.', 'Test ambient 16M color RGB ceiling mood light LEDs.'],
                        tools: ['Precision Screwdrivers', 'Contact Cleaner'],
                        commonIssues: ['Main light works but RGB back-glow dead', 'Base release lock tab stuck']
                    }
                }
            }
        }
    },
    circular_saw: {
        name: 'Circular Saw / Worm Drive / Track Saw',
        icon: React.createElement(Wrench, { className: "w-5 h-5 text-red-500" }),
        brands: {
            skilsaw: {
                name: 'SKIL / Skilsaw (The Original Worm Drive)',
                hasModels: true,
                models: {
                    'SPT77WML-01 7-1/4" Magnesium Worm Drive': {
                        name: 'SPT77WML-01 7-1/4" Magnesium Worm Drive',
                        steps: ['Drain and replace worm drive gear oil (use only Skilsaw Worm Drive Oil).', 'Inspect heavy-duty bronze worm gear and steel drive arbor for tooth wear.', 'Check carbon brushes and push-button spindle lock pin.'],
                        tools: ['Wrench / Spanner', 'Skilsaw Oil', 'Screwdrivers'],
                        commonIssues: ['Oil leaking from front arbor seal', 'Motor running but blade slips under heavy cutting load (worn worm gear teeth)', 'Bevel lock lever loose']
                    }
                }
            },
            makita: {
                name: 'Makita',
                hasModels: true,
                models: {
                    '5007MG 7-1/4" Magnesium / XSH06Z 36V Cordless': {
                        name: '5007MG 7-1/4" Magnesium / XSH06Z 36V Cordless',
                        steps: ['Check electronic blade brake switch mechanism and resistor.', 'Inspect motor carbon brushes and commutator copper segments.', 'Verify lower blade guard spring tension and free swinging return.'],
                        tools: ['Multimeter', 'Screwdrivers', 'Replacement Guard Spring', 'Arbor Wrench'],
                        commonIssues: ['Electric brake fails to stop blade within 2 seconds (brake switch contacts pitted)', 'Lower guard sticking open (wood dust packed inside pivot spring)', 'LED cut line shadow light wire severed']
                    }
                }
            },
            dewalt_saw: {
                name: 'DeWalt',
                hasModels: true,
                models: {
                    'DWE575SB Lightweight with Electric Brake / DCS570 20V MAX': {
                        name: 'DWE575SB Lightweight with Electric Brake / DCS570 20V MAX',
                        steps: ['Inspect ball bearing sleeve on motor armature.', 'Test variable trigger switch and electric brake feedback.', 'Inspect integrated dust blower port.'],
                        tools: ['Torx T20', 'Multimeter'],
                        commonIssues: ['Trigger switch unresponsive (dust packing)', 'Base plate bent after drop on concrete']
                    }
                }
            },
            milwaukee_saw: {
                name: 'Milwaukee Tool',
                hasModels: true,
                models: {
                    'M18 FUEL 7-1/4" Circular Saw 2732-20': {
                        name: 'M18 FUEL 7-1/4" Circular Saw 2732-20',
                        steps: ['Inspect POWERSTATE brushless motor stator windings.', 'Test REDLINK PLUS electronic overload protection circuit.', 'Inspect magnesium shoe and rafter hook.'],
                        tools: ['Torx T15', 'Multimeter'],
                        commonIssues: ['Cuts out in thick wet lumber (thermal overload protection)', 'Blade arbor bolt threads stripped']
                    }
                }
            },
            festool_saw: {
                name: 'Festool',
                hasModels: true,
                models: {
                    'TS 55 FEQ Plunge Cut Track Saw': {
                        name: 'TS 55 FEQ Plunge Cut Track Saw',
                        steps: ['Inspect FastFix blade change spindle lock system.', 'Test riving knife spring return and anti-kickback mechanism.', 'Inspect guide rail play adjustment jaws.'],
                        tools: ['Festool 5mm Hex Key', 'Multimeter'],
                        commonIssues: ['Plunge action sticking on guide column', 'Splinter guard rubber strip chewed up']
                    }
                }
            },
            bosch_saw: {
                name: 'Bosch',
                hasModels: true,
                models: {
                    'CS10 7-1/4" 15-Amp / GKS18V-25GC PROFACTOR': {
                        name: 'CS10 7-1/4" 15-Amp / GKS18V-25GC PROFACTOR',
                        steps: ['Inspect 56-degree bevel gauge detent lock.', 'Test composite footplate flatness.'],
                        tools: ['Screwdrivers', 'Straight Edge'],
                        commonIssues: ['Cut line indicator misaligned with 90° blade path', 'Brush arcing']
                    }
                }
            }
        }
    },
    clothes_dryer: {
        name: 'Clothes Dryer (Vented / Condenser / Heat Pump / Gas)',
        icon: React.createElement(Flame, { className: "w-5 h-5 text-orange-500" }),
        brands: {
            whirlpool_dryer: {
                name: 'Whirlpool',
                hasModels: true,
                models: {
                    'Duet / Cabrio / WED4815EW Front & Top Load': {
                        name: 'Duet / Cabrio / WED4815EW Front & Top Load',
                        steps: ['Remove lower front access panel or rear inspection shroud.', 'Test thermal cut-off fuse (WP3392519 196°F) on blower housing for continuity.', 'Inspect 240V 5400W nickel-chromium heating element coil for breaks.', 'Check drum belt tensioner pulley and support rollers for flat spots.'],
                        tools: ['1/4" & 5/16" Nut Drivers', 'Multimeter', 'Putty Knife', 'Replacement Thermal Fuse'],
                        commonIssues: ['Dryer spins and blows air but stays completely cold (blown thermal fuse or broken heater coil)', 'Loud screeching / thumping during drum rotation (seized rear drum support roller)', 'Runs 2 minutes then stops (failing cycling thermostat)']
                    }
                }
            },
            ge_appliances_dryer: {
                name: 'GE Appliances',
                hasModels: true,
                models: {
                    'GE Profile 7.8 cu. ft. Smart Front Load / GFD85ESPNRS': {
                        name: 'GE Profile 7.8 cu. ft. Smart Front Load / GFD85ESPNRS',
                        steps: ['Access diagnostic mode via control knob rotation sequence.', 'Test inlet and outlet thermistors.', 'Inspect dual gas burner solenoid coils (split-coil & three-terminal secondary) on gas models.', 'Inspect steam injection nozzle solenoid.'],
                        tools: ['Torx T20', '1/4" Nut Driver', 'Digital Multimeter'],
                        commonIssues: ['Gas igniter glows red hot but burner does not ignite (defective solenoid coils)', 'Error code "tS" or "t0" (thermistor open circuit)', 'Lint trap bypass warning']
                    }
                }
            },
            maytag_dryer: {
                name: 'Maytag',
                hasModels: true,
                models: {
                    'Commercial Grade MEDP586GW / Bravos XL Extra Power': {
                        name: 'Commercial Grade MEDP586GW / Bravos XL Extra Power',
                        steps: ['Inspect heavy-duty commercial blower fan wheel for stripped D-shaft threads.', 'Test push-to-start relay and door latch interlock switch.'],
                        tools: ['5/16" Nut Driver', 'Multimeter'],
                        commonIssues: ['Dryer won’t start when Start button is pushed (door switch actuator arm bent)', 'Rattling metal noise from blower wheel']
                    }
                }
            },
            samsung_dryer: {
                name: 'Samsung',
                hasModels: true,
                models: {
                    'DV45B6300EW 7.5 cu. ft. Smart Dial Electric Dryer': {
                        name: 'DV45B6300EW 7.5 cu. ft. Smart Dial Electric Dryer',
                        steps: ['Inspect heating element restringing coil and ceramic insulator blocks.', 'Test moisture sensor metal strips located near lint filter.', 'Check idler arm switch on motor bracket.'],
                        tools: ['Phillips Screwdriver', 'Multimeter', 'Insulated Gloves'],
                        commonIssues: ['"tE" / "tS" / "hE" error codes on digital display', 'Heating element grounded to metal casing (heats continuously even when turned off)', 'Moisture sensor bars coated in fabric softener residue causing cycle to end after 5 minutes']
                    }
                }
            },
            lg: {
                name: 'LG TurboSteam / Inverter Heat Pump',
                hasModels: true,
                models: {
                    'DLEX4000W TurboSteam / Dual Inverter Heat Pump 9kg': {
                        name: 'DLEX4000W TurboSteam / Dual Inverter Heat Pump 9kg',
                        steps: [
                            'Enter test mode by pressing Power + Temp + Cycle buttons.',
                            'Test high-limit safety thermostat and centrifugal drive motor switch.',
                            'Inspect condenser coil lint accumulation and auto-cleaning pump on heat pump units.'
                        ],
                        tools: ['Digital Multimeter', 'Phillips #2 Screwdriver'],
                        commonIssues: ['"d80" or "d90" Exhaust vent flow blockage error code', '"nE" or "tE1" temperature sensor error', 'Drum light blinks but motor hums without turning']
                    }
                }
            },
            bosch_dryer: {
                name: 'Bosch',
                hasModels: true,
                models: {
                    '500 / 800 Series 24" Compact Condensation / Heat Pump': {
                        name: '500 / 800 Series 24" Compact Condensation / Heat Pump',
                        steps: ['Remove and rinse front-accessible condenser heat exchanger under cold faucet.', 'Inspect condensate drain pump reservoir and float switch microswitch.'],
                        tools: ['Torx T20', 'Multimeter'],
                        commonIssues: ['"Empty Condensate Container" error light flashing when tank is empty (lint in float chamber)', 'Takes over 3 hours to dry small load']
                    }
                }
            },
            miele_dryer: {
                name: 'Miele',
                hasModels: true,
                models: {
                    'T1 Heat Pump Dryer with FragranceDos & SteamFinish': {
                        name: 'T1 Heat Pump Dryer with FragranceDos & SteamFinish',
                        steps: ['Clean dual plinth filter foam inserts.', 'Inspect optical drum ground contact brush on top of drum.', 'Test brushless ProfiEco variable speed motor.'],
                        tools: ['Miele Plinth Key', 'Multimeter'],
                        commonIssues: ['"Clean out airways" prompt on M Touch screen', 'Static shocks from drum (worn carbon ground brush)']
                    }
                }
            },
            speed_queen: {
                name: 'Speed Queen',
                hasModels: true,
                models: {
                    'DC5003WE Commercial Heavy Duty Tumble Dryer': {
                        name: 'DC5003WE Commercial Heavy Duty Tumble Dryer',
                        steps: ['Inspect all-metal blower fan wheel.', 'Check commercial mechanical timer motor and contacts.', 'Inspect front teflon drum glide pads.'],
                        tools: ['Nut Drivers', 'Multimeter'],
                        commonIssues: ['Thumping noise caused by worn front teflon glides', 'Timer knob will not advance']
                    }
                }
            },
            defy: {
                name: 'Defy',
                hasModels: false,
                sizes: {
                    '5kg Tumble Dryer': {
                        name: '5kg Tumble Dryer',
                        steps: ['Remove rear metal panel.', 'Test high-limit thermostat continuity.', 'Inspect drum belt for snapping or slipping.', 'Check door switch lever.'],
                        tools: ['Multimeter', 'Nut Driver Set', 'Replacement Drive Belt'],
                        commonIssues: ['Runs but does not heat / Thermal fuse blown', 'Drum does not spin / Belt snapped', 'Squealing drum idler pulley']
                    },
                    '8kg Heat Pump Dryer': {
                        name: '8kg Heat Pump Dryer',
                        steps: ['Clean heat exchanger condenser coils.', 'Test condensate pump float switch and drain filter.'],
                        tools: ['Vacuum Cleaner', 'Multimeter'],
                        commonIssues: ['E03 Water Tank Full error when empty', 'Long drying cycles']
                    }
                }
            }
        }
    },
    clothes_iron: {
        name: 'Clothes Iron / Steam Generator / Fabric Steamer',
        icon: React.createElement(Flame, { className: "w-5 h-5 text-blue-400" }),
        brands: {
            rowenta: {
                name: 'Rowenta (German Precision Steam)',
                hasModels: true,
                models: {
                    'Focus Excel DW5280 / Steamforce DW9280': {
                        name: 'Focus Excel DW5280 / Steamforce DW9280',
                        steps: [
                            'Descale 400-hole Microsteam 400 HD soleplate with equal parts white vinegar and distilled water.',
                            'Test thermal fuse (240°C) crimped to soleplate heating element.',
                            'Inspect smart auto-off electronic 3-way motion sensor (shuts off after 8 min upright or 30 sec flat).',
                            'Inspect electronic steam pump motor on Steamforce models.'
                        ],
                        tools: ['Torx T10 / T15 Security Screwdrivers', 'Multimeter', 'Replacement Thermal Fuse'],
                        commonIssues: ['Spitting brown water or calcium flakes onto clothes', 'Auto-off LED flashes red constantly and iron remains completely cold', 'Water leaking profusely from water tank door latch']
                    }
                }
            },
            tefal: {
                name: 'Tefal / T-fal',
                hasModels: true,
                models: {
                    'FV6811 Ultimate Pure Steam / Pro Express Steam Generator': {
                        name: 'FV6811 Ultimate Pure Steam / Pro Express Steam Generator',
                        steps: ['Remove and wash patented micro-calc collector filter cartridge.', 'Test boiler high-pressure solenoid release valve on steam generator base.', 'Inspect soleplate Durilium Airglide coating.'],
                        tools: ['Descaling Solution', 'Multimeter', 'Torx T10'],
                        commonIssues: ['No heat output / Blown soleplate thermal fuse', 'Water leaking onto garments / Anti-drip valve calcified', 'Steam generator base continuously beeping calc alert']
                    }
                }
            },
            philips_iron: {
                name: 'Philips',
                hasModels: true,
                models: {
                    'PerfectCare Elite Plus Steam Generator / Azur 8000': {
                        name: 'PerfectCare Elite Plus Steam Generator / Azur 8000',
                        steps: ['Perform Easy De-Calc Plus drainage procedure.', 'Inspect OptimalTEMP technology temperature sensor.', 'Check DynamiQ intelligent motion sensor.'],
                        tools: ['Container for Drainage', 'Multimeter'],
                        commonIssues: ['Steam trigger delivers delayed steam burst', 'Soleplate not heating to high temp']
                    }
                }
            },
            chi_iron: {
                name: 'CHI Electronic Clothing Iron',
                hasModels: true,
                models: {
                    'Titanium Infused Ceramic Soleplate 13101': {
                        name: 'Titanium Infused Ceramic Soleplate 13101',
                        steps: ['Inspect digital fabric temperature control dial potentiometer.', 'Test ceramic heating element resistance (~13 ohms).'],
                        tools: ['Precision Screwdrivers', 'Multimeter'],
                        commonIssues: ['Digital screen temperature blinks but soleplate does not heat', 'Steam lever stuck in dry mode']
                    }
                }
            },
            conair_iron: {
                name: 'Conair / Turbo Extremesteam',
                hasModels: true,
                models: {
                    'Turbo Extremesteam Handheld Fabric Steamer GS38': {
                        name: 'Turbo Extremesteam Handheld Fabric Steamer GS38',
                        steps: ['Descale dual-slotted aluminum faceplate jets.', 'Test 1875W dual chamber heating system and mini vibratory pump.'],
                        tools: ['Fine Wire Probe', 'Vinegar', 'Multimeter'],
                        commonIssues: ['Pump vibrates loudly but no steam emerges (air lock in supply tube)', 'Water dribbling from faceplate']
                    }
                }
            },
            black_decker_iron: {
                name: 'BLACK+DECKER',
                hasModels: true,
                models: {
                    'Allure Professional Steam Iron D3030 / Classic F67E': {
                        name: 'Allure Professional Steam Iron D3030 / Classic F67E',
                        steps: ['Inspect heavy aluminum soleplate on Classic series.', 'Test bi-metallic mechanical thermostat contact points.'],
                        tools: ['Flathead & Phillips Screwdrivers', 'Fine Sandpaper / Contact File'],
                        commonIssues: ['Thermostat points welded together (overheating soleplate)', 'Spray mist pump button fails to prime']
                    }
                }
            }
        }
    },
    coffee_maker: {
        name: 'Coffee Maker / Espresso Machine',
        icon: React.createElement(Coffee, { className: "w-5 h-5 text-amber-700" }),
        brands: {
            delonghi: {
                name: 'DeLonghi',
                hasModels: true,
                models: {
                    'Magnifica S ECAM22.110.B': {
                        name: 'Magnifica S ECAM22.110.B',
                        steps: ['Clean and lubricate infuser transmission screw spindle.', 'Test thermoblock boiler heating element resistance.', 'Inspect ULKA water pump pressure check valve.'],
                        tools: ['Torx T15 Screwdriver', 'Multimeter', 'Food-Grade Silicone Grease'],
                        commonIssues: ['Infuser assembly jammed / General Alarm light', 'No water flow / Air lock in pump', 'Weak or lukewarm coffee']
                    },
                    'Dedica Deluxe EC685': {
                        name: 'Dedica Deluxe EC685',
                        steps: ['Descale flow meter impeller chamber.', 'Test 3-way steam valve microswitch.'],
                        tools: ['Torx T20', 'Descaling Solution'],
                        commonIssues: ['Flashing orange descaling light won’t reset', 'Portafilter leaking around gasket']
                    }
                }
            },
            breville: {
                name: 'Breville / Sage',
                hasModels: true,
                models: {
                    'Barista Express BES870XL': {
                        name: 'Barista Express BES870XL',
                        steps: ['Check solenoid valve 3-way block for scale blockages.', 'Inspect grinder burr gear teeth for pebbles/jamming.'],
                        tools: ['Allen Keys', 'Descaling Agent', 'Multimeter'],
                        commonIssues: ['Low extraction pressure', 'Grinder motor hums but won’t spin', 'Steam wand dripping continuously']
                    },
                    'Dual Boiler BES920XL': {
                        name: 'Dual Boiler BES920XL',
                        steps: ['Replace high-temperature silicone O-rings on boiler probes.', 'Test triac PCB board for blown triac.'],
                        tools: ['#007 Silicone O-Rings', 'Multimeter', 'Torx T10'],
                        commonIssues: ['Hissing steam leak inside casing', 'GFCI breaker trips when heating']
                    }
                }
            },
            jura: {
                name: 'Jura',
                hasModels: true,
                models: {
                    'ENA 8 / E8 Automatic': {
                        name: 'ENA 8 / E8 Automatic',
                        steps: ['Disassemble and clean non-removable brewing unit with Jura oval head key.', 'Replace drainage valve gaskets.'],
                        tools: ['Jura Oval Head Tool', 'O-Ring Seal Kit', 'Silicone Lube'],
                        commonIssues: ['Error 8 / Brewing unit initialization failed', 'Coffee grounds dumped into drip tray dry']
                    }
                }
            },
            gaggia: {
                name: 'Gaggia',
                hasModels: true,
                models: {
                    'Classic Pro / Classic Evo Pro': {
                        name: 'Classic Pro / Classic Evo Pro',
                        steps: ['Clean 3-way solenoid valve orifice using 0.5mm guitar string or needle.', 'Inspect OPV overpressure valve spring.'],
                        tools: ['10mm Wrench', 'Needle', 'Multimeter'],
                        commonIssues: ['Water won’t flow from group head but steam works', 'Group head gasket dried out']
                    }
                }
            },
            philips_saeco: {
                name: 'Philips (Saeco / Gaggia)',
                hasModels: true,
                models: {
                    'LatteGo 3200 / 5400 Series': {
                        name: 'LatteGo 3200 / 5400 Series',
                        steps: ['Clean removable brew group under tap and grease guide tracks.', 'Inspect AquaClean filter optical sensor.'],
                        tools: ['Food-Grade Grease', 'Descaler'],
                        commonIssues: ['Squeaking brew group during cycle', 'Milk froth thin or sputtering']
                    }
                }
            },
            nespresso: {
                name: 'Nespresso (Krups / Magimix)',
                hasModels: true,
                models: {
                    'Vertuo Next / Plus': {
                        name: 'Vertuo Next / Plus',
                        steps: ['Clean optical barcode reader ring inside brewing head.', 'Check centrifugal spin motor bearing.'],
                        tools: ['Cotton Swab', 'Alcohol', 'Torx T10'],
                        commonIssues: ['Two red/orange flashes / Barcode unreadable', 'Capsule puncture needle dull or jammed']
                    },
                    'Citiz / Essenza Mini': {
                        name: 'Citiz / Essenza Mini',
                        steps: ['Prime ULKA vibration pump with water syringe to remove air bubble.', 'Inspect flow meter.'],
                        tools: ['Syringe', 'Torx T10'],
                        commonIssues: ['Pump loud but no water pumped (air lock)', 'Water leaking under machine']
                    }
                }
            },
            keurig: {
                name: 'Keurig',
                hasModels: true,
                models: {
                    'K-Elite / K-Supreme Plus': {
                        name: 'K-Supreme Plus',
                        steps: ['Clear bottom and top puncture needle nozzles with paperclip.', 'Reset thermal cutoff switch on water reservoir tank.'],
                        tools: ['Paperclip', 'Multimeter'],
                        commonIssues: ['"Add Water" light on with full reservoir', 'Descale light permanently stuck', 'Thermal cutoff tripped']
                    }
                }
            },
            rancilio: {
                name: 'Rancilio',
                hasModels: true,
                models: {
                    'Silvia M / Pro X': {
                        name: 'Silvia M / Pro X',
                        steps: ['Inspect brass boiler heating element terminals.', 'Test commercial 58mm group head 3-way solenoid valve.'],
                        tools: ['17mm Socket', 'Multimeter'],
                        commonIssues: ['Boiler element blown due to running dry', 'Steam knob leaking from stem seal']
                    }
                }
            },
            la_marzocco: {
                name: 'La Marzocco Home',
                hasModels: true,
                models: {
                    'Linea Micra / Mini': {
                        name: 'Linea Micra / Mini',
                        steps: ['Inspect saturated group neck seals.', 'Calibrate rotary vane pump pressure bypass screw (9 bar).'],
                        tools: ['Flathead Screwdriver', 'Pressure Gauge Portafilter'],
                        commonIssues: ['Group head gasket leaking', 'Rotary pump pressure fluctuation']
                    }
                }
            },
            smeg_coffee: {
                name: 'Smeg',
                hasModels: true,
                models: {
                    'Retro Espresso Machine ECF01': {
                        name: 'Retro Espresso Machine ECF01',
                        steps: ['Inspect thermoblock NTC temperature sensor.', 'Clean group shower screen and dispersion disc.'],
                        tools: ['Torx T15', 'Phillips #1'],
                        commonIssues: ['All 3 button lights flashing simultaneously (NTC fault)', 'Steam lever stiff']
                    }
                }
            },
            moccamaster: {
                name: 'Moccamaster (Technivorm)',
                hasModels: true,
                models: {
                    'KBG Select Drip Coffee Maker': {
                        name: 'KBG Select Drip Coffee Maker',
                        steps: ['Inspect copper boiling element and glass transfer tube.', 'Test brew basket anti-drip stop valve spring.'],
                        tools: ['Phillips Screwdriver', 'Descaling Agent'],
                        commonIssues: ['Anti-drip valve leaking onto hot plate', 'Boiling water pulse slow due to scale']
                    }
                }
            },
            cuisinart_coffee: {
                name: 'Cuisinart',
                hasModels: true,
                models: {
                    'DCC-3200P1 PerfecTemp 14-Cup': {
                        name: 'DCC-3200P1 PerfecTemp 14-Cup',
                        steps: ['Test inline thermal thermal fuse (216°C).', 'Clean one-way silicone check valve in water line.'],
                        tools: ['Multimeter', 'Crimping Pliers'],
                        commonIssues: ['Completely dead display (Thermal fuse blown)', 'Water reservoir drains slowly']
                    }
                }
            },
            bialetti: {
                name: 'Bialetti',
                hasModels: true,
                models: {
                    'Moka Express / Brikka': {
                        name: 'Moka Express / Brikka',
                        steps: ['Inspect rubber/silicone filter gasket and aluminum shower screen.', 'Test brass pressure relief safety valve.'],
                        tools: ['Butter Knife / Spudger', 'Replacement Gasket Kit'],
                        commonIssues: ['Steam escaping from middle screw thread', 'Pressure valve spraying steam']
                    }
                }
            },
            mr_coffee: {
                name: 'Mr. Coffee',
                hasModels: true,
                models: {
                    '12-Cup Programmable Coffee Maker': {
                        name: '12-Cup Programmable Coffee Maker',
                        steps: ['Inspect warming plate heating element continuity (~30Ω).', 'Test thermostat switch.'],
                        tools: ['Multimeter', 'Pliers'],
                        commonIssues: ['Heats up but won’t pump water', 'Carafe warming plate stays cold']
                    }
                }
            }
        }
    },
    computer_monitor: {
        name: 'Computer Monitor',
        icon: React.createElement(Monitor, { className: "w-5 h-5 text-sky-600" }),
        brands: {
            dell: {
                name: 'Dell',
                hasModels: true,
                models: {
                    'UltraSharp U2720Q / U3223QE': {
                        name: 'UltraSharp U2720Q / U3223QE',
                        steps: ['Inspect internal power supply board electrolytic capacitors for bulging.', 'Check LED backlight driver IC voltages.', 'Verify USB-C 90W PD controller chip and mosfets.'],
                        tools: ['Plastic Pry Tools', 'Multimeter', 'Soldering Iron'],
                        commonIssues: ['No power LED / Blown power supply caps', 'Backlight flashes then goes dark', 'USB-C charging negotiation failure']
                    }
                }
            },
            lg: {
                name: 'LG Electronics',
                hasModels: true,
                models: {
                    'UltraGear 27GP950 / UltraFine 32UN880': {
                        name: 'UltraGear 27GP950 / UltraFine 32UN880',
                        steps: ['Inspect Nano-IPS display panel LVDS/eDP ribbon cable seat.', 'Test 19V DC power barrel jack socket.', 'Check RGB Sphere Lighting controller.'],
                        tools: ['Torx T8 / T10', 'Multimeter', 'Plastic Spudger'],
                        commonIssues: ['Black screen with sound (blown LED edge backlight strip)', 'DC jack center pin cracked solder', 'OSD joystick snapped']
                    },
                    'UltraGear OLED 27GR95QE / 45GR95QE': {
                        name: 'UltraGear OLED 27GR95QE / 45GR95QE',
                        steps: ['Inspect OLED panel T-Con timing controller board.', 'Check internal active fan cooling heatsink connector.'],
                        tools: ['Torx T6 / T8', 'Multimeter'],
                        commonIssues: ['Image burn-in pixel cleaning cycle interrupted', 'Fan failure error warning']
                    }
                }
            },
            samsung_mon: {
                name: 'Samsung',
                hasModels: true,
                models: {
                    'Odyssey G7 / Neo G9 Curved': {
                        name: 'Odyssey G7 / Neo G9 Curved',
                        steps: ['Inspect 1000R extreme curve bezel adhesive separation.', 'Test Mini-LED local dimming backlight driver array.', 'Check external power adapter 24V supply.'],
                        tools: ['Suction Cups', 'Multimeter', 'Double-Sided Bezel Tape'],
                        commonIssues: ['Screen top bezel popping open / peeling away', 'HDR flickering on 240Hz DisplayPort', 'Popping/clicking noise from plastic thermal expansion']
                    },
                    'ViewFinity S9 5K / Smart Monitor M8': {
                        name: 'ViewFinity S9 5K / Smart Monitor M8',
                        steps: ['Inspect magnetic pogo-pin SlimFit camera mount.', 'Test Tizen smart OS mainboard flash memory.'],
                        tools: ['Torx Screwdrivers', 'Multimeter'],
                        commonIssues: ['Smart hub boot loop', 'Pogo pin camera unrecognized']
                    }
                }
            },
            asus_mon: {
                name: 'ASUS (ROG / TUF / ProArt)',
                hasModels: true,
                models: {
                    'ROG Swift PG279QM / PG32UCDM OLED': {
                        name: 'ROG Swift PG279QM / PG32UCDM OLED',
                        steps: ['Inspect custom graphene heatsink thermal paste contact.', 'Test 5-way OSD navigation joystick switch.'],
                        tools: ['Precision Screwdrivers', 'Thermal Compound'],
                        commonIssues: ['5-way joystick direction failure', 'DisplayPort 1.4 DSC handshake glitch']
                    },
                    'ProArt PA278CV / PA329CV Color Accurate': {
                        name: 'ProArt PA278CV / PA329CV Color Accurate',
                        steps: ['Inspect factory calibration EEPROM chip.', 'Test USB hub 65W PD controller.'],
                        tools: ['Multimeter', 'Hex Drivers'],
                        commonIssues: ['Color profile drift', 'USB-C video blanking intermittently']
                    }
                }
            },
            benq_mon: {
                name: 'BenQ',
                hasModels: true,
                models: {
                    'ZOWIE XL2546K / XL2566K (Esports)': {
                        name: 'ZOWIE XL2546K / XL2566K (Esports)',
                        steps: ['Inspect DyAc+ (Dynamic Accuracy) backlight strobing controller circuit.', 'Test S-Switch external keypad 5-pin mini-USB cable.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['DyAc strobing ghosting artifact', 'S-Switch profiles failing to save']
                    },
                    'MOBIUZ EX2710Q / EX3210R Gaming': {
                        name: 'MOBIUZ EX2710Q / EX3210R Gaming',
                        steps: ['Inspect integrated treVolo 2.1 channel speaker woofer.', 'Check HDRi ambient light sensor photocell.'],
                        tools: ['Spudger', 'Contact Cleaner'],
                        commonIssues: ['treVolo subwoofer rattle', 'HDRi auto-brightness flickering']
                    }
                }
            },
            acer_mon: {
                name: 'Acer',
                hasModels: true,
                models: {
                    'Predator XB273U / Nitro XV272U': {
                        name: 'Predator XB273U / Nitro XV272U',
                        steps: ['Inspect main logic scaler board LVDS flat flexible cable.', 'Test power button daughterboard tactile switch.'],
                        tools: ['Plastic Pry Tool', 'Multimeter'],
                        commonIssues: ['Monitor won’t turn on from standby / Tactile switch failure', 'Vertical colored lines on panel']
                    }
                }
            },
            msi_mon: {
                name: 'MSI',
                hasModels: true,
                models: {
                    'Optix MAG274QRF-QD / MPG 321URX QD-OLED': {
                        name: 'Optix MAG274QRF-QD / MPG 321URX QD-OLED',
                        steps: ['Inspect Quantum Dot enhancement film layer.', 'Check MSI OLED Care thermal sensor calibration.'],
                        tools: ['Torx T8', 'Multimeter'],
                        commonIssues: ['Red tint oversaturation before sRGB clamp firmware', 'Firmware update stall over Gaming OSD USB']
                    }
                }
            },
            viewsonic: {
                name: 'ViewSonic',
                hasModels: true,
                models: {
                    'Elite XG270QG / ColorPro VP2768a': {
                        name: 'Elite XG270QG / ColorPro VP2768a',
                        steps: ['Inspect built-in RJ45 Ethernet pass-through and USB hub IC.', 'Test integrated mouse bungee and headphone hook microswitches.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Ethernet port not passing 1Gbps traffic', 'Backlight bleed in corners']
                    }
                }
            },
            gigabyte_mon: {
                name: 'Gigabyte / AORUS',
                hasModels: true,
                models: {
                    'M27Q / M32U (KVM Gaming)': {
                        name: 'M27Q / M32U (KVM Gaming)',
                        steps: ['Inspect physical hardware KVM switch IC and USB controller.', 'Test HDMI 2.1 48Gbps redriver chips.'],
                        tools: ['Multimeter', 'Plastic Spudger'],
                        commonIssues: ['KVM button not switching mouse/keyboard between inputs', 'High pitched coil whine from internal power board']
                    }
                }
            },
            alienware: {
                name: 'Alienware',
                hasModels: true,
                models: {
                    'AW3423DW / AW3423DWF QD-OLED': {
                        name: 'AW3423DW / AW3423DWF QD-OLED',
                        steps: ['Inspect G-Sync Ultimate module fan and motherboard fan bearings.', 'Test dual micro-switches on joystick.'],
                        tools: ['Torx T8', 'Fine Lubricant'],
                        commonIssues: ['G-Sync fan loud whirring noise', 'Pixel refresh prompt loop']
                    }
                }
            },
            apple_mon: {
                name: 'Apple',
                hasModels: true,
                models: {
                    'Studio Display 27" 5K': {
                        name: 'Studio Display 27" 5K',
                        steps: ['Inspect internal Apple A13 Bionic logic board.', 'Test 12MP Center Stage camera and 3-mic array flex cables.', 'Check 6-speaker force-cancelling woofers.'],
                        tools: ['Torx T5 / T8', 'Suction Cups', 'Pentalobe Screwdriver'],
                        commonIssues: ['Speaker buzzing / Audio cut-out (requires display firmware restart)', 'Webcam video feed black or stuttering']
                    }
                }
            },
            aoc: {
                name: 'AOC',
                hasModels: true,
                models: {
                    'Agon Pro AG274QZM / 24G2': {
                        name: 'Agon Pro AG274QZM / 24G2',
                        steps: ['Inspect Mini-LED full array local dimming board.', 'Test OSD QuickSwitch wired infrared controller.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Horizontal pixel scanlines on 144Hz', 'Mini-LED zone halo blooming']
                    }
                }
            },
            hp_mon: {
                name: 'HP (OMEN / E-Series)',
                hasModels: true,
                models: {
                    'OMEN 27qs / E27m G4 Conferencing': {
                        name: 'OMEN 27qs / E27m G4 Conferencing',
                        steps: ['Inspect pop-up 5MP privacy webcam module latch spring.', 'Test front dual microphones and USB Type-C hub.'],
                        tools: ['Torx T8', 'Spudger'],
                        commonIssues: ['Pop-up camera mechanical latch stuck inside frame', 'Power light flashes amber 5 times (panel power fault)']
                    }
                }
            }
        }
    },
    dehumidifier: {
        name: 'Dehumidifier',
        icon: React.createElement(Droplets, { className: "w-5 h-5 text-blue-500" }),
        brands: {
            frigidaire: {
                name: 'Frigidaire',
                hasModels: true,
                models: {
                    'FFAD5033W1 50-Pint': {
                        name: 'FFAD5033W1 50-Pint',
                        steps: ['Test bucket full switch microswitch lever.', 'Clean evaporator coil dust filter.', 'Test compressor overload protector and start relay.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['EC Error Code (refrigerant leak or thermistor)', 'Bucket Full light on when bucket empty', 'Frost/ice buildup on coils']
                    }
                }
            },
            midea_deh: {
                name: 'Midea',
                hasModels: true,
                models: {
                    'Cube 20/50 Pint Smart Inverter': {
                        name: 'Cube 20/50 Pint Smart Inverter',
                        steps: ['Inspect nested bucket expansion alignment microswitch.', 'Test internal continuous drain pump motor and check-valve.'],
                        tools: ['Torx T15', 'Multimeter'],
                        commonIssues: ['"Bucket Not Positioned" error indicator', 'Drain pump impeller seized with biofilm']
                    }
                }
            },
            ge_deh: {
                name: 'GE Appliances',
                hasModels: true,
                models: {
                    'ADEL50LZ 50-Pint with Built-in Pump': {
                        name: 'ADEL50LZ 50-Pint with Built-in Pump',
                        steps: ['Inspect condensation pump discharge hose quick-connect nozzle.', 'Test humidity sensor RH% calibration on main board.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Pump failure / P1 water error code', 'Compressor short cycling']
                    }
                }
            },
            homelabs: {
                name: 'hOmeLabs',
                hasModels: true,
                models: {
                    'hOmeLabs 1,500 - 4,500 Sq Ft (50 Pint)': {
                        name: 'hOmeLabs 1,500 - 4,500 Sq Ft (50 Pint)',
                        steps: ['Inspect float switch magnetic reed switch inside bucket.', 'Test centrifugal blower fan bearings.'],
                        tools: ['Multimeter', 'Pry Tool'],
                        commonIssues: ['E1 / E2 temperature/humidity sensor failure', 'Water dripping around bucket rim instead of inside']
                    }
                }
            },
            honeywell_deh: {
                name: 'Honeywell',
                hasModels: true,
                models: {
                    'TP50WK / TP70PWK Energy Star': {
                        name: 'TP50WK / TP70PWK Energy Star',
                        steps: ['Inspect washable anti-dust mesh filter safety latch.', 'Test auto-defrost thermistor sensor.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Coil freezing solid into ice block (defrost sensor failure)', 'Continuous drain hose gravity siphon block']
                    }
                }
            },
            lg_deh: {
                name: 'LG PuriCare',
                hasModels: true,
                models: {
                    'PuriCare 50-Pint Smart with Safety Standby': {
                        name: 'PuriCare 50-Pint Smart with Safety Standby',
                        steps: ['Inspect heavy-duty metal thermal shielding over compressor.', 'Test dual inverter compressor driver board.'],
                        tools: ['Torx Screwdriver', 'Multimeter'],
                        commonIssues: ['E5 error code / High pressure limit trip', 'Wi-Fi ThinQ board sync failure']
                    }
                }
            },
            alorair: {
                name: 'AlorAir',
                hasModels: true,
                models: {
                    'Sentinel HD55 Crawl Space / Commercial': {
                        name: 'Sentinel HD55 Crawl Space / Commercial',
                        steps: ['Inspect hot gas bypass valve defrost mechanism for low-temp basements down to 33°F.', 'Test external remote humidistat terminal block.'],
                        tools: ['Hex Keys', 'Multimeter', 'Manifold Gauges'],
                        commonIssues: ['Hot gas defrost solenoid valve stuck open', 'Drain line freeze up']
                    }
                }
            },
            aprilaire: {
                name: 'AprilAire',
                hasModels: true,
                models: {
                    'E080 / E100 Pro Whole-House': {
                        name: 'E080 / E100 Pro Whole-House',
                        steps: ['Inspect 10" round duct collar backdraft dampers.', 'Test HVAC 24VAC communication relay board and MERV 13 filter sensor.'],
                        tools: ['1/4" Nut Driver', 'Multimeter'],
                        commonIssues: ['"Clean Filter" light won’t clear', 'HVAC interlock not waking dehumidifier']
                    }
                }
            }
        }
    },
    desk_lamp: {
        name: 'Desk Lamp',
        icon: React.createElement(Sun, { className: "w-5 h-5 text-yellow-400" }),
        brands: {
            benq: {
                name: 'BenQ WiT e-Reading Lamp',
                hasModels: true,
                models: {
                    'WiT ScreenBar': {
                        name: 'WiT ScreenBar',
                        steps: ['Check capacitive touch control board solder contacts.', 'Inspect USB power cord wire strain relief.'],
                        tools: ['Soldering Iron', 'Multimeter'],
                        commonIssues: ['Flickering LED array', 'Touch switch unresponsive']
                    }
                }
            }
        }
    },
    desktop_pc: {
        name: 'Desktop PC / Workstation',
        icon: React.createElement(Cpu, { className: "w-5 h-5 text-purple-500" }),
        brands: {
            custom_atx: {
                name: 'Custom ATX / Custom Build',
                hasModels: true,
                models: {
                    'Custom Gaming Desktop': {
                        name: 'Custom Gaming Desktop',
                        steps: [
                            'Perform paperclip test on 24-pin ATX power supply connector to check PSU fan jumpstart.',
                            'Reseat RAM DIMMs one at a time and clear CMOS jumper.',
                            'Check motherboard DEBUG LEDs (CPU, DRAM, VGA, BOOT).',
                            'Inspect GPU 12VHPWR / 8-pin PCIe power cables for melt signs.'
                        ],
                        tools: ['Multimeter', 'PSU Tester', 'Thermal Paste', 'Screwdriver Set'],
                        commonIssues: ['No POST / Motherboard DEBUG LED stuck on DRAM', 'Power cycles repeatedly', 'GPU black screen under gaming load', '12VHPWR cable not fully seated']
                    }
                }
            },
            dell: {
                name: 'Dell (OptiPlex / XPS Desktop)',
                hasModels: true,
                models: {
                    'OptiPlex 7080 Tower / XPS 8960': {
                        name: 'OptiPlex 7080 Tower / XPS 8960',
                        steps: ['Decode front amber power button blink code (e.g. 2 amber 3 white = MB fault).', 'Check proprietary 6-pin/8-pin ATX power connector.'],
                        tools: ['Multimeter', 'Torx Screwdrivers'],
                        commonIssues: ['Blinking Amber Power Button', 'Fan spins at 100% max speed', 'Proprietary power supply failure']
                    }
                }
            },
            apple_mac: {
                name: 'Apple (Mac Studio / Mac Pro / Mac mini)',
                hasModels: true,
                models: {
                    'Mac Studio M2 Max/Ultra / Mac mini M2/M4': {
                        name: 'Mac Studio M2 Max/Ultra / Mac mini M2/M4',
                        steps: ['Inspect bottom rubber ring intake and twin centrifugal blower fans for dust impaction.', 'Test Apple Silicon unified memory substrate thermal contact.', 'Perform DFU mode restore over Type-C.'],
                        tools: ['Torx T5 / T8 / T10 Security', 'Air Duster', 'Mac with Apple Configurator 2'],
                        commonIssues: ['Flashing SOS amber light on front (DFU firmware recovery needed)', 'Internal power supply board failure (no light, no chime)']
                    }
                }
            },
            hp_pc: {
                name: 'HP (OMEN / Pavilion / EliteDesk)',
                hasModels: true,
                models: {
                    'OMEN 45L / EliteDesk 800 Mini': {
                        name: 'OMEN 45L / EliteDesk 800 Mini',
                        steps: ['Inspect Cryo Chamber external AIO liquid cooling radiator pump.', 'Check proprietary HP power supply 12V only motherboard header.'],
                        tools: ['Torx T15', 'Phillips #2', 'Multimeter'],
                        commonIssues: ['AIO pump tachometer failure / CPU overheating shutdown', 'Beep code 3 long 2 short (memory not initialized)']
                    }
                }
            },
            lenovo_pc: {
                name: 'Lenovo (Legion / ThinkCentre)',
                hasModels: true,
                models: {
                    'Legion Tower 7i / ThinkCentre M70q Tiny': {
                        name: 'Legion Tower 7i / ThinkCentre M70q Tiny',
                        steps: ['Inspect Lenovo Vantage RGB/ARBG hub controller board.', 'Check external 65W/135W yellow slim-tip power adapter voltage.'],
                        tools: ['Phillips #2', 'Multimeter'],
                        commonIssues: ['Slim-tip center signal pin broken (adapter unrecognized)', 'Lenovo Vantage fan curve stuck on 100%']
                    }
                }
            },
            asus_pc: {
                name: 'ASUS (ROG Strix / ExpertCenter)',
                hasModels: true,
                models: {
                    'ROG Strix G16CH / ProArt Station': {
                        name: 'ROG Strix G16CH / ProArt Station',
                        steps: ['Inspect motherboard Q-LED diagnostic LEDs.', 'Check PCIe 4.0 riser cable on vertical GPU mount models.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['PCIe riser cable signal degradation causing WHEA errors', 'Front audio jack combo ground hum']
                    }
                }
            },
            msi_pc: {
                name: 'MSI (Aegis / Trident)',
                hasModels: true,
                models: {
                    'Aegis RS / MEG Trident X2': {
                        name: 'Aegis RS / MEG Trident X2',
                        steps: ['Inspect front HMI (Human Machine Interface) touchscreen panel ribbon.', 'Test Coreliquid AIO liquid cooler for pump sediment blockage.'],
                        tools: ['Phillips Screwdriver', 'Thermal Paste'],
                        commonIssues: ['AIO cooler gurgling noise and high idle temps (silicate buildup in pump fins)', 'Front HMI screen freeze']
                    }
                }
            },
            alienware_pc: {
                name: 'Alienware (Aurora)',
                hasModels: true,
                models: {
                    'Aurora R15 / R16 Gaming Desktop': {
                        name: 'Aurora R15 / R16 Gaming Desktop',
                        steps: ['Inspect 240mm AIO liquid cooler mounting bracket and 12-phase voltage regulation.', 'Check side panel clear interlock switch.'],
                        tools: ['Phillips #2', 'Torx T10'],
                        commonIssues: ['Chassis intrusion switch triggered prevents boot', 'AlienFX LED controller USB disconnect']
                    }
                }
            },
            corsair_pc: {
                name: 'Corsair',
                hasModels: true,
                models: {
                    'Vengeance i7500 / Corsair ONE i500': {
                        name: 'Vengeance i7500 / Corsair ONE i500',
                        steps: ['Inspect iCUE LINK system hub single-cable bus architecture.', 'Test dual convection liquid cooling pumps on Corsair ONE.'],
                        tools: ['Hex Drivers', 'Torx T8', 'Multimeter'],
                        commonIssues: ['iCUE LINK hub firmware error (all RGB turns red)', 'Pump speed sensor disconnect']
                    }
                }
            },
            nzxt_pc: {
                name: 'NZXT',
                hasModels: true,
                models: {
                    'Player: Three / H-Series Prebuilt': {
                        name: 'Player: Three / H-Series Prebuilt',
                        steps: ['Inspect Kraken AIO LCD screen USB header communication.', 'Test NZXT RGB & Fan Controller hub.'],
                        tools: ['Phillips #2', 'USB Header Cable'],
                        commonIssues: ['Kraken LCD shows white exclamation mark (USB disconnected in Windows)', 'Smart Device V2 fan curve not adjusting']
                    }
                }
            }
        }
    },
    digital_camera: {
        name: 'Digital Camera / Camcorder',
        icon: React.createElement(Camera, { className: "w-5 h-5 text-stone-700" }),
        brands: {
            canon: {
                name: 'Canon (EOS / PowerShot)',
                hasModels: true,
                models: {
                    'EOS R5 / R6 Mark II': {
                        name: 'EOS R5 / R6 Mark II',
                        steps: ['Inspect CFexpress card slot pins.', 'Test 5-axis IBIS sensor stabilizer floating carrier flex.', 'Inspect EVF diopter OLED ribbon.'],
                        tools: ['JIS #00 Screwdriver', 'Plastic Spudger', 'Multimeter'],
                        commonIssues: ['Err 70 / Image processor freeze', 'Overheating shutdown during 8K/4K recording', 'Hot shoe pin corrosion']
                    },
                    'EOS Rebel T7 / 2000D': {
                        name: 'EOS Rebel T7 / 2000D',
                        steps: ['Check battery door safety interlock switch.', 'Inspect mirror box shutter solenoid coil.', 'Clean SD card slot pins with contact spray on card.'],
                        tools: ['Precision JIS Screwdrivers', 'Contact Cleaner'],
                        commonIssues: ['Err 20 / Shutter mechanism error', 'Err 02 / SD Card read failure']
                    }
                }
            },
            sony: {
                name: 'Sony (Alpha / FX Cinema)',
                hasModels: true,
                models: {
                    'Alpha A7 IV / A7R V': {
                        name: 'Alpha A7 IV / A7R V',
                        steps: ['Check sensor IBIS flex cable grounding.', 'Test multi-interface hot shoe pins.', 'Inspect vari-angle LCD hinge ribbon.'],
                        tools: ['JIS #000 Screwdriver', 'Fine Tweezers', 'Magnifier'],
                        commonIssues: ['"Camera Error - Turn power off and on"', 'Shutter curtain sticking closed', 'Lens unrecognized']
                    },
                    'Alpha A6400 / ZV-E10': {
                        name: 'Alpha A6400 / ZV-E10',
                        steps: ['Inspect sensor flex cable.', 'Test lens mount electronic contact spring pins.'],
                        tools: ['Precision Tweezers', 'Magnifier'],
                        commonIssues: ['Display black screen but EVF works', 'Microphone 3.5mm jack loose connection']
                    }
                }
            },
            nikon: {
                name: 'Nikon (Z Series / D-SLR)',
                hasModels: true,
                models: {
                    'Z8 / Z9 Full-Frame Mirrorless': {
                        name: 'Z8 / Z9 Full-Frame Mirrorless',
                        steps: ['Inspect sensor shield mechanism motor and gear train.', 'Verify dual CFexpress Type B bus voltage (3.3V).', 'Inspect magnesium chassis tripod mount reinforcement.'],
                        tools: ['JIS #00', 'Precision Spudger', 'Multimeter'],
                        commonIssues: ['Lens strap lug loose service recall', 'Lens lock pin sticking', 'Viewfinder freeze on high FPS burst']
                    },
                    'Z6 II / D850 DSLR': {
                        name: 'Z6 II / D850 DSLR',
                        steps: ['Inspect reflex mirror aperture lever motor.', 'Clean EN-EL15 battery communication pins.', 'Test shutter blind carbon blades.'],
                        tools: ['JIS Screwdriver Set', 'Sensor Cleaning Swabs'],
                        commonIssues: ['Err message in top LCD', 'Aperture lever bent / Overexposed shots']
                    }
                }
            },
            fujifilm: {
                name: 'Fujifilm (X Series / GFX)',
                hasModels: true,
                models: {
                    'X-T5 / X-T4 Mirrorless': {
                        name: 'X-T5 / X-T4 Mirrorless',
                        steps: ['Inspect analog shutter speed / ISO dial click detent springs.', 'Test IBIS sensor suspension coils.', 'Check front command dial encoder.'],
                        tools: ['JIS #00 Screwdriver', 'Fine Tweezers'],
                        commonIssues: ['"Turn Off Camera and Turn On Again"', 'Front command dial skipping values', 'Eye sensor stuck in EVF mode']
                    },
                    'X100V / X100VI Premium Compact': {
                        name: 'X100V / X100VI Premium Compact',
                        steps: ['Inspect hybrid optical/electronic optical curtain lever.', 'Check fixed 23mm F2 leaf shutter ribbon.'],
                        tools: ['Precision Screwdrivers', 'Anti-Static Tweezers'],
                        commonIssues: ['OVF/EVF lever unresponsive', 'Leaf shutter stuck open / Overexposed image']
                    },
                    'GFX 100 II Medium Format': {
                        name: 'GFX 100 II Medium Format',
                        steps: ['Inspect 102MP giant medium format sensor thermal pad.', 'Test removable EVF pogo connector array.'],
                        tools: ['Torx T5', 'JIS #00', 'Multimeter'],
                        commonIssues: ['Removable EVF intermittent contact', 'Write speed throttling on UHS-II SD']
                    }
                }
            },
            panasonic_lumix: {
                name: 'Panasonic (Lumix)',
                hasModels: true,
                models: {
                    'Lumix GH6 / S5 IIX': {
                        name: 'Lumix GH6 / S5 IIX',
                        steps: ['Inspect active cooling exhaust fan in pentaprism.', 'Test phase hybrid AF sensor module.', 'Inspect full-size HDMI Type-A solder joints.'],
                        tools: ['JIS #000', 'Thermal Paste', 'Multimeter'],
                        commonIssues: ['Cooling fan rattle noise', 'HDMI port broken internal tongue', 'Card door sensor failure']
                    }
                }
            },
            olympus_om: {
                name: 'OM System / Olympus',
                hasModels: true,
                models: {
                    'OM-1 Mark II / OM-D E-M1 III': {
                        name: 'OM-1 Mark II / OM-D E-M1 III',
                        steps: ['Inspect IP53 weather-sealing perimeter rubber gaskets.', 'Test Supersonic Wave Filter (SSWF) dust reduction piezo.'],
                        tools: ['JIS #00', 'Silicon Sealant', 'Tweezers'],
                        commonIssues: ['Rear thumb dial spinning freely without friction', 'Strap eyelet pulling out']
                    },
                    'Tough TG-6 / TG-7 Waterproof': {
                        name: 'Tough TG-6 / TG-7 Waterproof',
                        steps: ['Check dual-lock battery and card door O-ring grease.', 'Test folded-optics internal periscope zoom prism.'],
                        tools: ['Silicone O-ring Grease', 'JIS Screwdrivers'],
                        commonIssues: ['Moisture ingress fogging inner front lens element', 'Mode dial skipping']
                    }
                }
            },
            leica: {
                name: 'Leica',
                hasModels: true,
                models: {
                    'Leica M11 / M10 Rangefinder': {
                        name: 'Leica M11 / M10 Rangefinder',
                        steps: ['Calibrate mechanical rangefinder split-image cam follower eccentric screw.', 'Inspect 64GB internal storage flash chip on mainboard.'],
                        tools: ['Leica Rangefinder Adjustment Tool', 'Precision Screwdrivers'],
                        commonIssues: ['Rangefinder horizontal/vertical alignment out of calibration', 'Camera freeze on wake from sleep']
                    },
                    'Leica Q2 / Q3 Full-Frame': {
                        name: 'Leica Q2 / Q3 Full-Frame',
                        steps: ['Inspect 28mm Summilux optical stabilization flex.', 'Check macro mode ring mechanical switch linkage.'],
                        tools: ['Precision Torx', 'Tweezers'],
                        commonIssues: ['Dust on sensor (fixed lens model)', 'Tilt LCD ribbon fatigue']
                    }
                }
            },
            ricoh_pentax: {
                name: 'Ricoh / Pentax',
                hasModels: true,
                models: {
                    'Ricoh GR III / GR IIIx': {
                        name: 'Ricoh GR III / GR IIIx',
                        steps: ['Clean lens barrel extension step motor gears from pocket lint.', 'Inspect 3-axis sensor-shift shake reduction.'],
                        tools: ['JIS #00', 'Air Blower', 'Fine Tweezers'],
                        commonIssues: ['Dust spot on sensor inside lens barrel', 'Lens retract failure / Lens error']
                    },
                    'Pentax K-1 Mark II DSLR': {
                        name: 'Pentax K-1 Mark II DSLR',
                        steps: ['Test aperture solenoid block.', 'Inspect 5-axis SR II shake reduction unit.'],
                        tools: ['JIS Screwdriver', 'Multimeter'],
                        commonIssues: ['Aperture solenoid failure (Dark picture / Aperture block problem)']
                    }
                }
            },
            gopro: {
                name: 'GoPro',
                hasModels: true,
                models: {
                    'HERO11 / HERO12 Black Action Camera': {
                        name: 'HERO11 / HERO12 Black Action Camera',
                        steps: ['Inspect waterproof USB-C side door silicone seal.', 'Check front color LCD ribbon connector.', 'Test folding mounting finger Torx screws.'],
                        tools: ['Torx T4', 'Plastic Spudger'],
                        commonIssues: ['Camera freezing / SD card write error', 'Side door latch sheared', 'Battery drain in standby']
                    }
                }
            },
            dji_camera: {
                name: 'DJI (Osmo)',
                hasModels: true,
                models: {
                    'Osmo Pocket 3 / Action 4': {
                        name: 'Osmo Pocket 3 / Action 4',
                        steps: ['Inspect 2-inch rotatable OLED screen swivel mechanism flex ribbon.', 'Test 3-axis mechanical gimbal brushless motors.'],
                        tools: ['Torx T3 / T4', 'Fine Tweezers', 'Multimeter'],
                        commonIssues: ['Gimbal IMU calibration error 40003', 'Swivel screen ribbon cable wear', 'Overheating in 4K 120fps']
                    }
                }
            },
            insta360: {
                name: 'Insta360',
                hasModels: true,
                models: {
                    'X3 / X4 360 Action Camera': {
                        name: 'X3 / X4 360 Action Camera',
                        steps: ['Inspect dual 1/2" fish-eye lens glass covers.', 'Test 5.7K/8K video processing SoC thermal heatsink pad.'],
                        tools: ['Suction Cup', 'Torx T3', 'Heat Gun'],
                        commonIssues: ['Lens glass scratched', 'Touchscreen dead zone near edge', 'USB-C microphone adapter not detected']
                    }
                }
            },
            hasselblad: {
                name: 'Hasselblad',
                hasModels: true,
                models: {
                    'X2D 100C Medium Format': {
                        name: 'X2D 100C Medium Format',
                        steps: ['Inspect 100MP BSI CMOS sensor IBIS module.', 'Verify built-in 1TB PCIe NVMe SSD bus interface.'],
                        tools: ['Precision Torx T4 / T5', 'ESD Mat'],
                        commonIssues: ['Internal SSD formatting timeout', 'Top display screen flicker']
                    }
                }
            },
            sigma_camera: {
                name: 'Sigma',
                hasModels: true,
                models: {
                    'Sigma fp / fp L Full-Frame': {
                        name: 'Sigma fp / fp L Full-Frame',
                        steps: ['Inspect large die-cast aluminum heatsink between LCD and body.', 'Test electronic shutter sensor read-out lines.'],
                        tools: ['JIS #00', 'Thermal Compound'],
                        commonIssues: ['HDMI micro port physical strain', 'Hot shoe electronic viewfinder unit EVF-11 connection drop']
                    }
                }
            },
            blackmagic: {
                name: 'Blackmagic Design',
                hasModels: true,
                models: {
                    'Pocket Cinema Camera 4K / 6K Pro': {
                        name: 'Pocket Cinema Camera 4K / 6K Pro',
                        steps: ['Inspect motorized internal ND filter glass slider mechanism.', 'Check 12V 2-pin Weipu locking power connector solder pads.'],
                        tools: ['Torx T6', 'Soldering Iron', 'Multimeter'],
                        commonIssues: ['Weipu DC power jack disconnected internally', 'Tilt screen hinge cable wear', 'USB-C SSD dropping frames']
                    }
                }
            },
            polaroid: {
                name: 'Polaroid',
                hasModels: true,
                models: {
                    'Polaroid Now+ / I-2 Instant Camera': {
                        name: 'Polaroid Now+ / I-2 Instant Camera',
                        steps: ['Inspect film pick-arm and stainless steel development spreader rollers.', 'Clean chemical paste residue from rollers with damp swab.'],
                        tools: ['Cotton Swabs', 'Phillips #00'],
                        commonIssues: ['Film packs jam / Pick arm skips sheet', 'Dirty rollers creating repeating white dots on photos']
                    }
                }
            },
            kodak: {
                name: 'Kodak',
                hasModels: true,
                models: {
                    'PIXPRO AZ421 / Printomatic': {
                        name: 'PIXPRO AZ421 / Printomatic',
                        steps: ['Inspect 42x optical zoom barrel guide pins.', 'Clean Zink printer thermal element bar.'],
                        tools: ['Phillips #00', 'Rubbing Alcohol'],
                        commonIssues: ['"Lens Error" during zoom extension', 'Printhead lines on instant prints']
                    }
                }
            }
        }
    },
    digital_thermostat: {
        name: 'Digital & Smart Thermostat',
        icon: React.createElement(Thermometer, { className: "w-5 h-5 text-red-400" }),
        brands: {
            google_nest: {
                name: 'Google Nest',
                hasModels: true,
                models: {
                    'Nest Learning Thermostat 3rd / 4th Gen / Nest Thermostat E': {
                        name: 'Nest Learning Thermostat 3rd / 4th Gen / Nest Thermostat E',
                        steps: [
                            'Check 24VAC C-wire (Common wire) supply voltage (24V-29V AC).',
                            'Inspect internal 3.7V 380mAh rechargeable lithium-polymer backup battery voltage (must read >3.7V DC to maintain Wi-Fi connection).',
                            'Test optical baseplate connector push terminals (Rh, Rc, W1, Y1, G, C) for loose wire grip.',
                            'Check baseplate electronic PTC reset fuse.'
                        ],
                        tools: ['Multimeter', 'Small Flathead Screwdriver', 'Micro USB Cable (for emergency bench charging)'],
                        commonIssues: ['"e195 No Power" or "e298" error code (HVAC furnace board power stolen without dedicated C-wire)', 'Thermostat turns off and loses Wi-Fi connection repeatedly when heating kicks on', 'Spinning click wheel dial sticks or lags']
                    }
                }
            },
            ecobee: {
                name: 'ecobee',
                hasModels: true,
                models: {
                    'Smart Thermostat Premium / Enhanced / ecobee3 lite': {
                        name: 'Smart Thermostat Premium / Enhanced / ecobee3 lite',
                        steps: ['Inspect Power Extender Kit (PEK) wiring on furnace terminal block.', 'Test built-in air quality sensor (VOC and CO2) calibration.', 'Check SmartSensor 915MHz RF wireless pairing receiver.'],
                        tools: ['Multimeter', 'Wire Strippers', 'Smartphone ecobee App'],
                        commonIssues: ['Thermostat screen reboots in a loop every time the air conditioner turns on (furnace limit switch opening)', 'SmartSensor remote sensor disconnects constantly', 'Inaccurate room temperature reading due to draft behind drywall hole']
                    }
                }
            },
            honeywell_home: {
                name: 'Honeywell Home (Resideo)',
                hasModels: true,
                models: {
                    'T9 Smart Thermostat / T5+ / VisionPRO 8000': {
                        name: 'T9 Smart Thermostat / T5+ / VisionPRO 8000',
                        steps: ['Inspect UWP (Universal Wall Plate) mounting block spring fingers.', 'Test 24V AC transformer polarity on R and C terminals.', 'Test K-terminal wire saver module.'],
                        tools: ['Multimeter', 'Precision Screwdrivers'],
                        commonIssues: ['Touchscreen unresponsive in corners', 'Wi-Fi setup error "Cloud connection failed" / WPA3 router incompatibility']
                    }
                }
            },
            emerson_sensi: {
                name: 'Sensi (Copeland / Emerson)',
                hasModels: true,
                models: {
                    'Sensi Touch Smart ST75 / Wi-Fi ST55': {
                        name: 'Sensi Touch Smart ST75 / Wi-Fi ST55',
                        steps: ['Test dual AA battery backup voltage on ST55.', 'Inspect heat pump reversing valve O/B terminal jumper configuration.'],
                        tools: ['Multimeter', '2x AA Batteries'],
                        commonIssues: ['Blowing hot air when set to Cool (O/B reversing valve setting inverted for Heat Pump)', 'Backlight flickers on call for heat']
                    }
                }
            },
            wyze_thermostat: {
                name: 'Wyze',
                hasModels: true,
                models: {
                    'Wyze Smart Thermostat': {
                        name: 'Wyze Smart Thermostat',
                        steps: ['Inspect C-wire adapter (CWA) diode board in air handler.', 'Test Bluetooth pairing handshake button.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Display shows flashing "Waiting for equipment" for over 5 minutes', 'Temperature dial clicks without advancing digits']
                    }
                }
            }
        }
    },
    dishwasher: {
        name: 'Dishwasher',
        icon: React.createElement(Box, { className: "w-5 h-5 text-blue-400" }),
        brands: {
            bosch: {
                name: 'Bosch',
                hasModels: true,
                models: {
                    '300 Series SHXM63W55N': {
                        name: '300 Series SHXM63W55N',
                        steps: [
                            'Check bottom drip tray float switch for water leakage triggering AquaStop.',
                            'Inspect circulation pump heat exchanger element for burnouts.',
                            'Clean drain pump impeller and check non-return check valve rubber flap.'
                        ],
                        tools: ['Torx T20 Screwdriver', 'Multimeter', 'Pliers'],
                        commonIssues: ['E15 Error / Water in bottom pan', 'E24 Error / Drain failure', 'E09 Error / Heating element open circuit']
                    }
                }
            },
            defy: {
                name: 'Defy',
                hasModels: false,
                sizes: {
                    '13 Place Setting': {
                        name: '13 Place Setting',
                        steps: ['Test inlet water solenoid valve coil resistance (~3.5kΩ).', 'Inspect door latch microswitch.'],
                        tools: ['Multimeter'],
                        commonIssues: ['Does not fill with water', 'Beeps and stops mid-wash']
                    }
                }
            }
        }
    },
    electric_drill: {
        name: 'Electric Drill',
        icon: React.createElement(Wrench, { className: "w-5 h-5 text-amber-600" }),
        brands: {
            dewalt: {
                name: 'DeWalt',
                hasModels: true,
                models: {
                    'DCD791 / DCD996 20V Max XR': {
                        name: 'DCD791 / DCD996 20V Max XR',
                        steps: [
                            'Inspect variable speed trigger switch harness.',
                            'Test brushless motor stator hall sensor board.',
                            'Verify keyless chuck retaining screw thread (reverse left-hand thread inside chuck).'
                        ],
                        tools: ['Torx T10 Screwdriver', 'Multimeter', 'Allen Wrench Set'],
                        commonIssues: ['Trigger clicks but motor won’t spin', 'Chuck slips / Wobbles', 'Worklight flashes 3 times']
                    }
                }
            },
            milwaukee: {
                name: 'Milwaukee Tool',
                hasModels: true,
                models: {
                    'M18 Fuel Gen 4 Hammer Drill 2904-20': {
                        name: 'M18 Fuel Gen 4 Hammer Drill 2904-20',
                        steps: ['Check AutoStop kickback gyroscopic sensor connector.', 'Test Powerstate brushless stator windings (~0.1Ω phase-to-phase).'],
                        tools: ['Torx T10', 'Multimeter', 'Loctite 242'],
                        commonIssues: ['AutoStop indicator flashing red/green', 'Electronic brake squeal', 'Chuck wobble / runout']
                    },
                    'M12 Fuel Subcompact Drill 3404-20': {
                        name: 'M12 Fuel Subcompact Drill 3404-20',
                        steps: ['Inspect battery latch terminal block contacts.', 'Test mechanical 2-speed planetary gearbox slider.'],
                        tools: ['Torx T8', 'Multimeter'],
                        commonIssues: ['Battery rattles loose during vibration', 'Speed 1 jumps into neutral']
                    }
                }
            },
            makita: {
                name: 'Makita',
                hasModels: true,
                models: {
                    'DDF484 / XFD13 18V LXT Brushless': {
                        name: 'DDF484 / XFD13 18V LXT Brushless',
                        steps: ['Inspect star protection battery connector yellow terminal.', 'Check electronic controller potting compound for cracks.'],
                        tools: ['Torx T10 / T20', 'Multimeter'],
                        commonIssues: ['Yellow battery terminal communication fault', 'Trigger potentiometer dead spot']
                    },
                    '40V Max XGT Hammer Drill': {
                        name: '40V Max XGT Hammer Drill',
                        steps: ['Inspect digital torque clutch electronic dial.', 'Test cooling blower fan impeller.'],
                        tools: ['Torx T15', 'Multimeter'],
                        commonIssues: ['Electronic clutch erratically disengaging', 'Dust ingress in chuck']
                    }
                }
            },
            bosch: {
                name: 'Bosch Professional',
                hasModels: true,
                models: {
                    'GSB 18V-55 / GSR 18V-60 C': {
                        name: 'GSB 18V-55 / GSR 18V-60 C',
                        steps: ['Test battery contact terminal block flex pins.', 'Inspect planetary gearbox selector ring and kickback control accelerometer.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['Gear slips under load', 'Intermittent battery connection', 'Kickback LED blinking']
                    }
                }
            },
            ryobi: {
                name: 'Ryobi (ONE+)',
                hasModels: true,
                models: {
                    'ONE+ HP 18V Brushless PBLDD01': {
                        name: 'ONE+ HP 18V Brushless PBLDD01',
                        steps: ['Inspect stem battery post contacts inside handle.', 'Test variable speed trigger switch.'],
                        tools: ['Phillips #2', 'Multimeter'],
                        commonIssues: ['Trigger clicks but dead / Blown switch FET', 'Chuck loose on spindle']
                    }
                }
            },
            ridgid: {
                name: 'Ridgid',
                hasModels: true,
                models: {
                    '18V SubCompact Brushless R87012': {
                        name: '18V SubCompact Brushless R87012',
                        steps: ['Inspect die-cast metal gearbox housing screws.', 'Test brushless control board.'],
                        tools: ['Torx T15', 'Multimeter'],
                        commonIssues: ['High-torque stall', 'LED ring light stays on']
                    }
                }
            },
            metabo_hpt: {
                name: 'Metabo HPT (Hitachi)',
                hasModels: true,
                models: {
                    'MultiVolt 18V/36V DV18DC': {
                        name: 'MultiVolt 18V/36V DV18DC',
                        steps: ['Inspect MultiVolt battery terminal detection pins.', 'Test RFC (Reactive Force Control) gyro.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['RFC false triggers on quick wrist snap', 'Forward/reverse lever sticking']
                    }
                }
            },
            festool: {
                name: 'Festool',
                hasModels: true,
                models: {
                    'T 18+3 / C 18 Cordless Drill': {
                        name: 'T 18+3 / C 18 Cordless Drill',
                        steps: ['Inspect FastFix quick-change chuck interface collar.', 'Test EC-TEC brushless motor controller.'],
                        tools: ['Torx T15', 'Isopropyl Alcohol'],
                        commonIssues: ['FastFix collar sticking with sawdust', 'Electronic torque selector beep code']
                    }
                }
            },
            hilti: {
                name: 'Hilti',
                hasModels: true,
                models: {
                    'SF 6-A22 / SF 6H-22 Nuron': {
                        name: 'SF 6-A22 / SF 6H-22 Nuron',
                        steps: ['Inspect Nuron battery interface data pins.', 'Test ATC (Active Torque Control) clutch disc magnetic brake.'],
                        tools: ['Torx T15 / T20', 'Multimeter'],
                        commonIssues: ['ATC service light indicator', 'Chuck locking sleeve stiff']
                    }
                }
            },
            craftsman: {
                name: 'Craftsman',
                hasModels: true,
                models: {
                    'V20 Brushless Drill/Driver CMCD720': {
                        name: 'V20 Brushless Drill/Driver CMCD720',
                        steps: ['Inspect motor trigger switch module.', 'Check keyless ratcheting chuck teeth.'],
                        tools: ['Phillips #2', 'Torx T10'],
                        commonIssues: ['Trigger intermittent on low RPM', 'Bits slipping in chuck']
                    }
                }
            },
            black_decker_drill: {
                name: 'Black+Decker',
                hasModels: true,
                models: {
                    '20V Max Matrix / LDX120C': {
                        name: '20V Max Matrix / LDX120C',
                        steps: ['Inspect brush contacts on RS-550 DC motor.', 'Test forward/reverse rocker switch.'],
                        tools: ['Phillips #1', 'Multimeter'],
                        commonIssues: ['Motor smoking / Burnt carbon brushes', 'Charger flashes red/green']
                    }
                }
            },
            kobalt: {
                name: 'Kobalt (Lowe’s)',
                hasModels: true,
                models: {
                    '24V Max Brushless KDD 1424A-03': {
                        name: '24V Max Brushless KDD 1424A-03',
                        steps: ['Test 24V 6-cell battery pack output voltage.', 'Inspect planetary gear ring.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['Battery won’t charge / Blinking red charger', 'Gear selector stuck between 1 and 2']
                    }
                }
            },
            skil: {
                name: 'Skil (PWRCore)',
                hasModels: true,
                models: {
                    'PWRCore 20 Brushless DL5293': {
                        name: 'PWRCore 20 Brushless DL5293',
                        steps: ['Check PWRCore temperature management cooling jacket.', 'Inspect trigger switch.'],
                        tools: ['Phillips #2', 'Multimeter'],
                        commonIssues: ['Thermal shutdown when driving large lags', 'Chuck screw backing out']
                    }
                }
            }
        }
    },
    electric_kettle: {
        name: 'Electric Kettle / Gooseneck Pour-Over',
        icon: React.createElement(Flame, { className: "w-5 h-5 text-amber-500" }),
        brands: {
            fellow: {
                name: 'Fellow (Stagg EKG / Corvo EKG)',
                hasModels: true,
                models: {
                    'Stagg EKG / Corvo EKG Electric Pour-Over': {
                        name: 'Stagg EKG / Corvo EKG Electric Pour-Over',
                        steps: ['Inspect Otter / Strix 360-degree connector contacts in base and kettle bottom for arcing and copper burnishing.', 'Test precision PID temperature controller circuit on base PCB.', 'Inspect high-contrast black LCD screen ribbon cable.', 'Check concealed 1200W quick-heating element.'],
                        tools: ['Torx T10', 'Multimeter', 'Fine Emery Cloth', 'Contact Cleaner'],
                        commonIssues: ['Base screen flashing or showing "- - -" (Strix connector contact arcing/tarnished)', 'Kettle temperature overshooting boiling point', 'Rotary encoder dial skipping numbers']
                    }
                }
            },
            breville_kettle: {
                name: 'Breville',
                hasModels: true,
                models: {
                    'The Smart Kettle Luxe / The Soft Top Pure (BKE845)': {
                        name: 'The Soft Top Pure / The Smart Kettle Luxe',
                        steps: ['Inspect 5-temperature preset buttons and keep-warm relay on base.', 'Descale auto-shutoff steam tube with vinegar or citric acid solution.', 'Inspect soft-opening lid damping gear mechanism.'],
                        tools: ['Phillips Screwdriver', 'Multimeter', 'Citric Acid Powder'],
                        commonIssues: ['Beeps and turns off immediately after pressing start (limescale build-up on thermistor)', 'Lid pops open violently instead of soft-opening (damping grease dried out)', 'Keep warm function dropping temp']
                    }
                }
            },
            smeg_kettle: {
                name: 'SMEG',
                hasModels: true,
                models: {
                    '50s Retro Variable Temperature KLF04 / KLF03': {
                        name: '50s Retro Variable Temperature KLF04 / KLF03',
                        steps: ['Inspect 7-step LED temperature selector lever mechanism.', 'Clean Strix concealed base electrical connectors.', 'Check removable stainless steel limescale filter.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['Chime sounds repeatedly and LEDs flash (dry boil sensor triggered)', 'Lever ball knob loose']
                    }
                }
            },
            cuisinart_kettle: {
                name: 'Cuisinart',
                hasModels: true,
                models: {
                    'PerfecTemp 1.7L Cordless Electric Kettle CPK-17P1': {
                        name: 'PerfecTemp 1.7L Cordless Electric Kettle CPK-17P1',
                        steps: ['Inspect handle-mounted 6 preset temperature microswitches.', 'Check internal silicone water gauge seals for dripping.', 'Test 1500W heating coil continuity (~9.6Ω on 120V).'],
                        tools: ['Phillips Screwdriver', 'Multimeter', 'Silicone Sealant'],
                        commonIssues: ['Water leaking from lower bottom rim (degraded water level window seal)', 'Blue LED backlights flashing error sequence']
                    }
                }
            },
            bonavita: {
                name: 'Bonavita',
                hasModels: true,
                models: {
                    '1.0L / 1.7L Digital Variable Temperature Gooseneck (BV382510V)': {
                        name: '1.0L / 1.7L Digital Variable Temperature Gooseneck',
                        steps: ['Inspect base PCB micro-controller and temperature probe pin in bottom center of kettle.', 'Clean corrosion on base brass contact rings.'],
                        tools: ['Precision Screwdrivers', 'Contact Cleaner'],
                        commonIssues: ['Display shows "888" or "Err" (probe disconnected or water splashed inside base)', 'Gooseneck spout base weld seepage']
                    }
                }
            },
            zojirushi_kettle: {
                name: 'Zojirushi',
                hasModels: true,
                models: {
                    'Micom Water Boiler & Warmer CD-WCC30 / CK-EAQ15': {
                        name: 'Micom Water Boiler & Warmer CD-WCC30 / CK-EAQ15',
                        steps: ['Descale nonstick fluororesin inner container with Zojirushi citric acid cleaner.', 'Inspect motorized electric dispensing pump and rubber diaphragm.', 'Replace degraded silicone lid gasket.'],
                        tools: ['Citric Acid', 'Phillips Screwdriver', 'Replacement Lid Gasket'],
                        commonIssues: ['Motor hums but does not pump water (scale blocked impeller or calcified check valve)', 'Steam leaking around lid perimeter', 'Plastic flake contamination from failing lid inner liner']
                    }
                }
            },
            russell_hobbs: {
                name: 'Russell Hobbs',
                hasModels: true,
                models: {
                    'Retro Style 1.7L / Glass Kettle': {
                        name: 'Retro Style 1.7L / Glass Kettle',
                        steps: [
                            'Inspect Strix connector pins on kettle base and pedestal for heat corrosion / bending.',
                            'Test thermal bi-metal steam switch located inside handle or under base.',
                            'Check water temperature dial gauge needle.'
                        ],
                        tools: ['Multimeter', 'Emery Cloth', 'Phillips Screwdriver'],
                        commonIssues: ['Does not turn on / Strix connector melted or pitted', 'Boils continuously without shutting off (steam switch blocked)', 'Water leaks around base element seal']
                    }
                }
            },
            dualit_kettle: {
                name: 'Dualit',
                hasModels: true,
                models: {
                    'Classic Kettle with Whisper Boil / Studio': {
                        name: 'Classic Kettle with Whisper Boil / Studio',
                        steps: ['Inspect patented multi-ring Whisper Boil quiet disk on base of element.', 'Test dual viewing window seals and neon power indicator.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['Loud boiling rumble (Whisper Boil disc covered in limescale)', 'Power rocker switch spring loose']
                    }
                }
            },
            telefunken_kettle: {
                name: 'Telefunken Kettle',
                hasModels: true,
                models: {
                    'TSK-1700 / TSK-1800 1.7L Stainless Steel Kettle': {
                        name: 'TSK-1700 / TSK-1800 1.7L Stainless Steel Kettle',
                        steps: [
                            'Inspect 360-degree swivel cordless power base circular copper contact rings for pitting and black soot arc deposits.',
                            'Test handle-mounted steam shutoff thermostat bi-metallic strip mechanism.',
                            'Measure 1850W-2200W concealed bottom heating element resistance (~26-30 ohms on 230V mains).',
                            'Check dual boil-dry safety cutoff switches on bottom element flange.'
                        ],
                        tools: ['Fine Sandpaper / Emery Cloth', 'Multimeter', 'Phillips Screwdriver'],
                        commonIssues: ['Kettle does not turn on / base pins recessed or melted', 'Kettle keeps boiling furiously and never clicks off automatically', 'Water leaking from clear plastic water level gauge indicator seam']
                    }
                }
            },
            condere_kettle: {
                name: 'Condere Kettle',
                hasModels: true,
                models: {
                    'CDK-1800 / CDK-200 Cordless Rapid Boil 1.8L-2.0L': {
                        name: 'CDK-1800 / CDK-200 Cordless Rapid Boil 1.8L-2.0L',
                        steps: [
                            'Clean burnt circular connector contact fingers on power base with contact cleaner and wire brush.',
                            'Inspect bottom boil-dry safety push rod mechanism.',
                            'Test power indicator neon lamp and series current-limiting resistor (100kΩ - 150kΩ).'
                        ],
                        tools: ['Wire Brush', 'Multimeter', 'Insulated Screwdrivers'],
                        commonIssues: ['Power light illuminates but water remains cold (burnt heating coil element)', 'Lid catch button sticks closed', 'Sparks seen inside base when setting kettle down']
                    }
                }
            },
            defy_kettle: {
                name: 'Defy Kettle',
                hasModels: true,
                models: {
                    'WK 828 / WK 728 Retro Stainless Steel 1.7L': {
                        name: 'WK 828 / WK 728 Retro Stainless Steel 1.7L',
                        steps: ['Inspect genuine Strix thermostatic control base.', 'Test handle steam sensor channel for calcification blockage.'],
                        tools: ['Multimeter', 'Citric Acid Solution'],
                        commonIssues: ['Turns off prematurely before water reaches boiling point', 'Handle switch pops up immediately']
                    }
                }
            },
            xiaomi_kettle: {
                name: 'Xiaomi (Mijia Smart Kettle)',
                hasModels: true,
                models: {
                    'Mi Smart Electric Kettle Pro / 1S': {
                        name: 'Mi Smart Electric Kettle Pro / 1S',
                        steps: ['Inspect digital OLED temperature display handle connector.', 'Test STMicroelectronics Bluetooth MCU and NTC thermistor sensor on cavity bottom.'],
                        tools: ['Torx Screwdriver', 'Multimeter', 'Smartphone Mi Home App'],
                        commonIssues: ['Bluetooth pairing failure / App connection timeout', 'OLED display dim or flickering']
                    }
                }
            }
        }
    },
    electric_shaver: {
        name: 'Electric Shaver / Trimmer',
        icon: React.createElement(Scissors, { className: "w-5 h-5 text-stone-500" }),
        brands: {
            philips: {
                name: 'Philips Norelco',
                hasModels: true,
                models: {
                    'Series 9000 Prestige / Series 5000': {
                        name: 'Series 9000 Prestige / Series 5000',
                        steps: ['Disassemble waterproof housing seal.', 'Test 3.7V 14500 Li-ion battery voltage.', 'Clean motor drive eccentric shaft hair blockage.', 'Inspect SkinIQ sensor optical reader.'],
                        tools: ['Precision Screwdrivers', 'Soldering Iron', 'Replacement Li-ion Cell'],
                        commonIssues: ['Unresponsive / Water ingress', 'Battery won’t hold charge', 'Head replacement orange tap icon persists']
                    },
                    'OneBlade / OneBlade Pro 360': {
                        name: 'OneBlade / OneBlade Pro 360',
                        steps: ['Inspect blade cartridge dual latch spring clips.', 'Test USB-A / NiMH or Li-ion charging board.', 'Clean hair buildup beneath flexible blade neck.'],
                        tools: ['Precision Spudger', 'Multimeter'],
                        commonIssues: ['Blade pops off during shaving', 'Motor buzzes weakly but cutter doesn’t oscillate']
                    }
                }
            },
            braun_shaver: {
                name: 'Braun',
                hasModels: true,
                models: {
                    'Series 9 Pro+ / Series 7': {
                        name: 'Series 9 Pro+ / Series 7',
                        steps: ['Inspect 10,000 sonic vibration linear motor voice coils.', 'Clean SmartCare clean & charge station fluid siphon pump.', 'Replace soldered Li-ion battery cell.'],
                        tools: ['Torx T6', 'Soldering Iron', 'Multimeter'],
                        commonIssues: ['Linear motor magnets rubbing against housing (buzzing rattle)', 'SmartCare dock fails to pump cleaning fluid', 'Lock icon flashing on display']
                    }
                }
            },
            panasonic_shaver: {
                name: 'Panasonic',
                hasModels: true,
                models: {
                    'Arc5 / Arc6 Linear Motor 14,000 CPM': {
                        name: 'Arc5 / Arc6 Linear Motor 14,000 CPM',
                        steps: ['Inspect ultrafast 14,000 CPM linear drive magnetic levitation coil.', 'Replace silicone waterproof o-rings on inner chassis.', 'Test inner stainless Japanese blades.'],
                        tools: ['Phillips #00', 'Dielectric Grease', 'Multimeter'],
                        commonIssues: ['Water intrusion shorting PCB after wet shaving', 'Foil mesh worn with sharp edge holes']
                    }
                }
            },
            wahl_shaver: {
                name: 'Wahl',
                hasModels: true,
                models: {
                    '5-Star Vanish / Lifeproof Foil': {
                        name: '5-Star Vanish / Lifeproof Foil',
                        steps: ['Inspect gold hypoallergenic micro-foil suspension bars.', 'Test high-torque rotary DC motor commutators.'],
                        tools: ['Small Phillips', 'Contact Cleaner'],
                        commonIssues: ['Individual foil bar dislodged from spring', 'Power switch contact carbon buildup']
                    }
                }
            },
            babyliss_shaver: {
                name: 'BaBylissPRO',
                hasModels: true,
                models: {
                    'FOILFX02 Dual Foil / FXONE': {
                        name: 'FOILFX02 Dual Foil / FXONE',
                        steps: ['Inspect metal housing ground spring.', 'Test quick-release battery pack contacts on FXONE.'],
                        tools: ['Torx T8', 'Multimeter'],
                        commonIssues: ['Foil head locking button stuck', 'Charging dock pins pushed inside base']
                    }
                }
            },
            andis: {
                name: 'Andis',
                hasModels: true,
                models: {
                    'ProFoil Lithium Titanium Shaver TS-1 / TS-2': {
                        name: 'ProFoil Lithium Titanium Shaver TS-1 / TS-2',
                        steps: ['Inspect twin octagonal titanium foil cutters.', 'Replace 80-minute lithium-ion battery cell.'],
                        tools: ['Phillips Screwdriver', 'Soldering Iron'],
                        commonIssues: ['Cutter drive fork nylon tip snapped', 'Charger cord wire fatigue at strain relief']
                    }
                }
            },
            skull_shaver: {
                name: 'Skull Shaver',
                hasModels: true,
                models: {
                    'Pitbull Gold PRO / Platinum PRO': {
                        name: 'Pitbull Gold PRO / Platinum PRO',
                        steps: ['Inspect 4-head rotary drive bevel gear train.', 'Clean internal hair catch reservoir.'],
                        tools: ['Precision Tweezers', 'Cleaning Brush'],
                        commonIssues: ['One rotary head seized from hair compaction', 'LCD battery percentage jumping erratic']
                    }
                }
            },
            manscaped: {
                name: 'Manscaped',
                hasModels: true,
                models: {
                    'The Lawn Mower 4.0 / 5.0 Ultra': {
                        name: 'The Lawn Mower 4.0 / 5.0 Ultra',
                        steps: ['Inspect SkinSafe ceramic blade snap-in latch.', 'Test wireless Qi inductive charging receiver coil on base.'],
                        tools: ['Plastic Pry Tool', 'Multimeter'],
                        commonIssues: ['Ceramic blade teeth chipped', 'Wireless charging dock LED flashing red (alignment fault)']
                    }
                }
            }
        }
    },
    electric_toothbrush: {
        name: 'Electric Toothbrush',
        icon: React.createElement(Sparkles, { className: "w-5 h-5 text-sky-400" }),
        brands: {
            oral_b: {
                name: 'Oral-B',
                hasModels: true,
                models: {
                    'iO Series 9/10 / Genius Pro 1000': {
                        name: 'iO Series 9/10 / Genius Pro 1000',
                        steps: ['Check inductive charging coil continuity at base.', 'Replace internal 3.7V Li-ion / NiMH cell soldered to PCB.', 'Inspect magnetic drive frictionless drive shaft seal.', 'Clean limescale around metal drive post.'],
                        tools: ['Soldering Iron', 'Desoldering Pump', 'Replacement Battery', 'Spudger'],
                        commonIssues: ['Red charge LED blinks continuously / Battery flat', 'Motor vibrates weakly or chatters', 'Water leaking into handle through top neck seal']
                    }
                }
            },
            philips_sonicare: {
                name: 'Philips Sonicare',
                hasModels: true,
                models: {
                    'DiamondClean 9000 / ProtectiveClean 4100': {
                        name: 'DiamondClean 9000 / ProtectiveClean 4100',
                        steps: ['Tighten loose 1.5mm hex screw on acoustic magnetic actuator drive arm (causes loud chattering vibration noise).', 'Replace deteriorated silicone top rubber cap seal.', 'Test inductive charging base.'],
                        tools: ['1.5mm Hex Wrench', 'Torx T6', 'Replacement Sonicare Rubber Seal'],
                        commonIssues: ['Loud buzzing/rattling noise (magnetic actuator screw loosened inside)', 'Turns on by itself or won’t turn off (liquid on PCB microswitch)', 'Metal shaft has loose play']
                    }
                }
            },
            quip: {
                name: 'Quip',
                hasModels: true,
                models: {
                    'Smart Sonic Rechargeable / AAA Battery': {
                        name: 'Smart Sonic Rechargeable / AAA Battery',
                        steps: ['Clean AAA spring battery terminal contacts with white vinegar.', 'Inspect motor eccentric weight and 2-minute timer circuit.'],
                        tools: ['Cotton Swab', 'White Vinegar'],
                        commonIssues: ['Toothbrush won’t turn on with fresh battery (bent negative contact prong)', 'Brush head vibrating loose from motor stem']
                    }
                }
            },
            burst: {
                name: 'BURST Oral Care',
                hasModels: true,
                models: {
                    'Sonic Toothbrush Charcoal': {
                        name: 'Sonic Toothbrush Charcoal',
                        steps: ['Inspect USB charging base magnetic contact alignment.', 'Test 33,000 sonic vibrations per min voice coil motor.'],
                        tools: ['Precision Screwdrivers', 'Multimeter'],
                        commonIssues: ['Handle battery dies after few seconds', 'Mode select button stuck down with toothpaste']
                    }
                }
            },
            curaprox: {
                name: 'Curaprox',
                hasModels: true,
                models: {
                    'Hydrosonic Pro Sonic Toothbrush': {
                        name: 'Hydrosonic Pro Sonic Toothbrush',
                        steps: ['Inspect Curen filament head drive coupling.', 'Test single-button intuitive blue LED control circuit.'],
                        tools: ['Precision Pry Tool'],
                        commonIssues: ['Blue mode LED locked up', 'Drive shaft seal degradation']
                    }
                }
            },
            waterpik_brush: {
                name: 'Waterpik',
                hasModels: true,
                models: {
                    'Sonic-Fusion 2.0 Flossing Toothbrush': {
                        name: 'Sonic-Fusion 2.0 Flossing Toothbrush',
                        steps: ['Inspect handle water hose swivel connection for crimping.', 'Test dual ultrasonic motor and water flosser solenoid pump valve.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Water leaking from handle swivel joint', 'Brush works but water flosser does not pump']
                    }
                }
            }
        }
    },
    epilator: {
        name: 'Epilator',
        icon: React.createElement(Scissors, { className: "w-5 h-5 text-pink-500" }),
        brands: {
            braun: {
                name: 'Braun Silk-Épil',
                hasModels: true,
                models: {
                    'Silk-Épil 9 Flex / Silk-Épil 7': {
                        name: 'Silk-Épil 9 Flex / Silk-Épil 7',
                        steps: ['Clean hair clogged miniature gear train inside rotating epilator head.', 'Test Li-ion cell voltage on mainboard.', 'Lubricate nylon bevel gears with mineral oil.'],
                        tools: ['Tweezers', 'Multimeter', 'Torx T5', 'Mineral Oil'],
                        commonIssues: ['Head stalls when pressed against skin (hair wrapped around pinion gear)', 'Battery drains overnight', 'Smartlight LED flickering']
                    }
                }
            },
            philips_epilator: {
                name: 'Philips',
                hasModels: true,
                models: {
                    'Series 8000 Wet & Dry / Satinelle Essential': {
                        name: 'Series 8000 Wet & Dry / Satinelle Essential',
                        steps: ['Inspect ceramic textured epilator tweezers disc alignment.', 'Test 2-speed slider switch contacts.'],
                        tools: ['Spudger', 'Contact Cleaner'],
                        commonIssues: ['Ceramic discs slipping / failing to grip fine hairs', 'Motor bogging down under load']
                    }
                }
            },
            panasonic_epilator: {
                name: 'Panasonic',
                hasModels: true,
                models: {
                    'ES-EL9A Double Disc 60 Tweezers': {
                        name: 'ES-EL9A Double Disc 60 Tweezers',
                        steps: ['Inspect dual wide counter-rotating 60-tweezer rollers.', 'Check 90-degree flexible pivoting head spring tension.'],
                        tools: ['Precision Screwdrivers', 'Cleaning Brush'],
                        commonIssues: ['Secondary tweezer disc not spinning', 'Pressure sensor beeping continuously']
                    }
                }
            },
            remington_epilator: {
                name: 'Remington',
                hasModels: true,
                models: {
                    'Smooth & Silky EP7030E Deluxe': {
                        name: 'Smooth & Silky EP7030E Deluxe',
                        steps: ['Inspect 40-tweezer barrel drive pins.', 'Test AC adapter cord connection.'],
                        tools: ['Multimeter', 'Tweezers'],
                        commonIssues: ['Barrel stops spinning under pressure', 'Loose barrel latch clip']
                    }
                }
            },
            emjoi: {
                name: 'Emjoi',
                hasModels: true,
                models: {
                    'eRase e60 / AP-18 Emagine': {
                        name: 'eRase e60 / AP-18 Emagine',
                        steps: ['Inspect dual-opposed 72-tweezer staggered heads.', 'Test internal DC motor carbon brushes.'],
                        tools: ['Small Screwdrivers', 'Tweezers'],
                        commonIssues: ['Pinion gear stripped on main motor shaft', 'Silver Ion antimicrobial head cracked']
                    }
                }
            }
        }
    },
    external_hard_drive: {
        name: 'External Hard Drive',
        icon: React.createElement(HardDrive, { className: "w-5 h-5 text-stone-600" }),
        brands: {
            western_digital: {
                name: 'Western Digital',
                hasModels: true,
                models: {
                    'My Passport 4TB USB 3.0': {
                        name: 'My Passport 4TB USB 3.0',
                        steps: [
                            'Inspect micro-B or USB-C connector port solder joints.',
                            'Check PCB TVS diode (Transient Voltage Suppressor) for short circuit.',
                            'Listen for drive clicking (read/write head assembly crash).'
                        ],
                        tools: ['Soldering Station', 'Multimeter', 'Torx T5 Screwdriver'],
                        commonIssues: ['USB port wiggles / Broken connector', 'Clicking sound of death', 'Drive LED blinks but unreadable in OS']
                    }
                }
            }
        }
    },
    fan: {
        name: 'Fan',
        icon: React.createElement(Wind, { className: "w-5 h-5 text-teal-500" }),
        brands: {
            dyson: {
                name: 'Dyson Air Multiplier',
                hasModels: true,
                models: {
                    'AM07 Tower Fan': {
                        name: 'AM07 Tower Fan',
                        steps: ['Check remote control IR receiver diode.', 'Inspect brushless DC motor driver MOSFETs.', 'Clean base air intake grill dust filter.'],
                        tools: ['Torx T10 Screwdriver', 'Multimeter'],
                        commonIssues: ['F flashing on display', 'Oscillation motor clicking']
                    }
                }
            },
            goldair: {
                name: 'Goldair / Generic Pedestal Fan',
                hasModels: false,
                sizes: {
                    '40cm Pedestal Fan': {
                        name: '40cm Pedestal Fan',
                        steps: ['Lubricate sintered bronze motor sleeve bearings with 3-in-1 oil.', 'Replace motor starter run capacitor (1.2µF - 1.5µF 450V).'],
                        tools: ['Screwdriver', 'Machine Oil', 'Soldering Iron'],
                        commonIssues: ['Motor hums but won’t spin / Dry bearings', 'Only works on high speed']
                    }
                }
            }
        }
    },
    flashlight: {
        name: 'Flashlight / Torch',
        icon: React.createElement(Sun, { className: "w-5 h-5 text-yellow-500" }),
        brands: {
            olight: {
                name: 'Olight',
                hasModels: true,
                models: {
                    'Baton 3 Pro': {
                        name: 'Baton 3 Pro',
                        steps: ['Clean tailcap magnetic charge contact ring with alcohol.', 'Check side switch retaining ring tightness.'],
                        tools: ['Isopropyl Alcohol', 'Fine Tweezers'],
                        commonIssues: ['Magnetic charging light stays red', 'Intermittent mode switching']
                    }
                }
            }
        }
    },
    food_processor: {
        name: 'Food Processor',
        icon: React.createElement(Box, { className: "w-5 h-5 text-orange-400" }),
        brands: {
            kitchenaid: {
                name: 'KitchenAid',
                hasModels: true,
                models: {
                    'KFP1311 13-Cup': {
                        name: 'KFP1311 13-Cup',
                        steps: ['Inspect bowl lid pusher safety interlock pin.', 'Test motor centrifugal switch.'],
                        tools: ['Screwdriver Set', 'Multimeter'],
                        commonIssues: ['Motor will not start when lid locked', 'Drive shaft gear stripped']
                    }
                }
            }
        }
    },
    fridge_refrigerator: {
        name: 'Fridge / Refrigerator',
        icon: React.createElement(Snowflake, { className: "w-5 h-5 text-sky-400" }),
        brands: {
            defy: {
                name: 'Defy',
                hasModels: false,
                sizes: {
                    '150L Single Door': {
                        name: '150L Single Door',
                        steps: [
                            'Test compressor PTC starter relay and overload protector bi-metal disc.',
                            'Check mechanical thermostat capillary bulb and contact switch.',
                            'Inspect door gasket seal magnetic strip for cold air leaks.'
                        ],
                        tools: ['Multimeter', 'Relay Tester', 'Dollar Bill Test'],
                        commonIssues: ['Compressor clicks every 30 seconds then stops', 'Fridge running constantly / Heavy ice on back wall', 'Warm interior light working']
                    },
                    '350L Combi Bottom Freezer': {
                        name: '350L Combi Bottom Freezer',
                        steps: ['Test no-frost heater element resistance (~120Ω).', 'Inspect defrost bi-metal thermostat and thermal fuse.', 'Clean evaporator drain hole with hot water.'],
                        tools: ['Multimeter', 'Hot Water Syringe'],
                        commonIssues: ['Freezer cold but fridge section warm', 'Water pooling under vegetable drawer']
                    }
                }
            },
            samsung: {
                name: 'Samsung',
                hasModels: true,
                models: {
                    'Twin Cooling French Door RF28': {
                        name: 'Twin Cooling French Door RF28',
                        steps: ['Check evaporator fan motor ice buildup jamming blades.', 'Inspect main inverter compressor PCB LED error blinks.'],
                        tools: ['Multimeter', 'Hairdryer / Heat Gun'],
                        commonIssues: ['Rattling fan noise / Ice buildup in fresh food section', 'Ice maker jammed with frost']
                    }
                }
            },
            lg: {
                name: 'LG',
                hasModels: true,
                models: {
                    'Linear Inverter Door-in-Door': {
                        name: 'Linear Inverter Door-in-Door',
                        steps: ['Test linear compressor winding resistance.', 'Check inverter board frequency output.'],
                        tools: ['Digital Multimeter', 'Oscilloscope'],
                        commonIssues: ['FF Error Code / Freezer Fan Error', 'Compressor failure / Not cooling']
                    }
                }
            },
            whirlpool: {
                name: 'Whirlpool',
                hasModels: true,
                models: {
                    'Double Door Frost-Free IntelliFresh': {
                        name: 'Double Door Frost-Free IntelliFresh',
                        steps: ['Test adaptive defrost control board.', 'Measure evaporator defrost heater resistance (~80-120Ω).', 'Inspect bi-metal thermostat.'],
                        tools: ['Multimeter', 'Nut Driver Set'],
                        commonIssues: ['Defrost cycle failing / Evaporator frosted solid', 'Drain line frozen over']
                    }
                }
            },
            bosch: {
                name: 'Bosch',
                hasModels: true,
                models: {
                    'Series 6 MultiAirFlow NoFrost': {
                        name: 'Series 6 MultiAirFlow NoFrost',
                        steps: ['Check MultiAirFlow duct motorized baffle damper.', 'Test NTC evaporator temperature sensor resistance.'],
                        tools: ['Multimeter', 'Torx T20'],
                        commonIssues: ['E01 NTC sensor open circuit', 'Damper door clicked or stuck shut']
                    }
                }
            },
            haier: {
                name: 'Haier',
                hasModels: true,
                models: {
                    'Quad Door French Door Inverter': {
                        name: 'Quad Door French Door Inverter',
                        steps: ['Inspect inverter driver PCB test LEDs.', 'Check DC evaporator fan motor RPM signal.'],
                        tools: ['Multimeter', 'Screwdriver Set'],
                        commonIssues: ['F1 / F2 Sensor malfunction', 'Compressor failure to spin']
                    }
                }
            },
            hisense: {
                name: 'Hisense',
                hasModels: true,
                models: {
                    'PureFlat French Door 509L': {
                        name: 'PureFlat French Door 509L',
                        steps: ['Test dispenser water solenoid valve coil.', 'Check LED display touch ribbon cable.'],
                        tools: ['Multimeter', 'Plastic Spudger'],
                        commonIssues: ['Water dispenser dripping', 'Freezer temperature reading incorrect']
                    }
                }
            },
            electrolux: {
                name: 'Electrolux',
                hasModels: true,
                models: {
                    'TasteLock French Door 600L': {
                        name: 'TasteLock French Door 600L',
                        steps: ['Inspect TasteLock humidity membrane.', 'Test defrost heating calrod.'],
                        tools: ['Multimeter', 'Socket Set'],
                        commonIssues: ['Defrost heater open circuit', 'Ice build-up on air tower']
                    }
                }
            },
            liebherr: {
                name: 'Liebherr',
                hasModels: true,
                models: {
                    'BioFresh BluPerformance Combi': {
                        name: 'BioFresh BluPerformance Combi',
                        steps: ['Check BioFresh compartment air temperature sensor.', 'Inspect door soft-close hydraulic dampers.'],
                        tools: ['Multimeter', 'Hex Keys'],
                        commonIssues: ['Alarm beeps continually / Sensor out of calibration', 'BioFresh freezing vegetables']
                    }
                }
            },
            ge_appliances: {
                name: 'GE Appliances',
                hasModels: true,
                models: {
                    'Profile French Door Ice Maker': {
                        name: 'Profile French Door Ice Maker',
                        steps: ['Check main motherboard J1 and J2 connector pins for 13.6VDC to evaporator fan.', 'Test ice maker auger motor.'],
                        tools: ['Multimeter', '1/4" Nut Driver'],
                        commonIssues: ['Fresh food section too warm (Fan motor dead)', 'Ice maker not ejecting cubes']
                    }
                }
            },
            frigidaire: {
                name: 'Frigidaire',
                hasModels: true,
                models: {
                    'Gallery 2-Door Top Freezer': {
                        name: 'Gallery 2-Door Top Freezer',
                        steps: ['Check mechanical defrost timer motor.', 'Inspect cold control thermostat dial.'],
                        tools: ['Flathead Screwdriver', 'Multimeter'],
                        commonIssues: ['Stuck in defrost mode / Compressor never restarts', 'Cold control broken']
                    }
                }
            },
            panasonic: {
                name: 'Panasonic',
                hasModels: true,
                models: {
                    'PrimeFresh Inverter Econavi': {
                        name: 'PrimeFresh Inverter Econavi',
                        steps: ['Check Econavi optical light sensor.', 'Test PrimeFresh fast freezing drawer fan.'],
                        tools: ['Multimeter', 'Opening Tools'],
                        commonIssues: ['H27 Inverter communication failure', 'PrimeFresh drawer cold loss']
                    }
                }
            },
            beko: {
                name: 'Beko',
                hasModels: true,
                models: {
                    'HarvestFresh Bottom Freezer': {
                        name: 'HarvestFresh Bottom Freezer',
                        steps: ['Check HarvestFresh 3-color LED lighting cycle.', 'Test compressor PTC relay.'],
                        tools: ['Multimeter'],
                        commonIssues: ['Relay clicks off repeatedly', 'Defrost drain blocked']
                    }
                }
            },
            miele: {
                name: 'Miele',
                hasModels: true,
                models: {
                    'MasterCool Built-In Fridge': {
                        name: 'MasterCool Built-In Fridge',
                        steps: ['Test motorized MasterFresh humidity damper.', 'Inspect dual compressor circuits.'],
                        tools: ['Torx Screwdrivers', 'Multimeter'],
                        commonIssues: ['F46 MasterCool air sensor defect', 'Door motor pull-in failure']
                    }
                }
            },
            smeg: {
                name: 'Smeg',
                hasModels: true,
                models: {
                    'FAB28 50s Retro Style': {
                        name: 'FAB28 50s Retro Style',
                        steps: ['Check retro mechanical thermostat and bulb.', 'Inspect door hinge chrome bracket alignment.'],
                        tools: ['Screwdrivers', 'Multimeter'],
                        commonIssues: ['Heavy frost buildup on back plate', 'Door sagging / cold air leak']
                    }
                }
            },
            sharp: {
                name: 'Sharp',
                hasModels: true,
                models: {
                    'Plasmacluster J-Tech Inverter': {
                        name: 'Plasmacluster J-Tech Inverter',
                        steps: ['Inspect Plasmacluster deodorizer unit.', 'Check inverter compressor driver capacitor.'],
                        tools: ['Multimeter'],
                        commonIssues: ['Inverter board error', 'Fan noise']
                    }
                }
            },
            hitachi: {
                name: 'Hitachi',
                hasModels: true,
                models: {
                    'Big French Glass Door Inverter': {
                        name: 'Big French Glass Door Inverter',
                        steps: ['Inspect vacuum compartment air extraction pump and gasket.', 'Test dual fan cooling system.'],
                        tools: ['Multimeter', 'Silicone Grease'],
                        commonIssues: ['Vacuum compartment losing seal', 'Fan motor stall']
                    }
                }
            },
            toshiba: {
                name: 'Toshiba',
                hasModels: true,
                models: {
                    'Origin Inverter Multi-Door': {
                        name: 'Origin Inverter Multi-Door',
                        steps: ['Check Pure BIO odor filter.', 'Test inverter fan control board.'],
                        tools: ['Multimeter'],
                        commonIssues: ['Defrost sensor open circuit', 'Compressor overheat cutout']
                    }
                }
            },
            sub_zero: {
                name: 'Sub-Zero',
                hasModels: true,
                models: {
                    'Classic Series Dual Refrigeration': {
                        name: 'Classic Series Dual Refrigeration',
                        steps: ['Inspect dual independent compressors (refrigerator vs freezer).', 'Test condenser fan and clean front grille.'],
                        tools: ['Vacuum Attachment', 'Multimeter', 'Gauges'],
                        commonIssues: ['Vacuum Condenser light flashing', 'Evaporator coil pinhole leak']
                    }
                }
            },
            maytag: {
                name: 'Maytag',
                hasModels: true,
                models: {
                    'French Door with PowerCold': {
                        name: 'French Door with PowerCold',
                        steps: ['Test compressor overload relay.', 'Inspect water filter bypass head.'],
                        tools: ['1/4" Nut Driver', 'Multimeter'],
                        commonIssues: ['No water flow from dispenser', 'Evaporator fan bearing rattle']
                    }
                }
            }
        }
    },
    gaming_console: {
        name: 'Gaming Console',
        icon: React.createElement(Tv, { className: "w-5 h-5 text-indigo-400" }),
        brands: {
            sony_playstation: {
                name: 'Sony PlayStation',
                hasModels: true,
                models: {
                    'PlayStation 5 (Disc & Digital)': {
                        name: 'PlayStation 5 (Disc & Digital)',
                        steps: [
                            'Check HDMI port 19 pins for bent or pushed back pins inside port.',
                            'Test HDMI encoder IC chip (Panasonic MN864739) filter caps for shorts.',
                            'Inspect liquid metal thermal compound distribution on APU die.',
                            'Clean power supply unit honeycomb intake vents.'
                        ],
                        tools: ['Microscope', 'Soldering Station', 'Hot Air Rework Station', 'Torx T8 Security Screwdriver'],
                        commonIssues: ['Blue Light of Death (BLOD)', 'No HDMI display output / Damaged HDMI port', 'Shuts down abruptly after 20 minutes of PS5 games']
                    },
                    'PlayStation 4 Pro': {
                        name: 'PlayStation 4 Pro',
                        steps: ['Replace APU thermal paste with high-viscosity compound.', 'Inspect power supply N15-160P1A output voltage.'],
                        tools: ['Torx T8 Security', 'Thermal Paste'],
                        commonIssues: ['Loud jet engine fan noise', 'Red light overheating warning']
                    }
                }
            },
            microsoft_xbox: {
                name: 'Microsoft Xbox',
                hasModels: true,
                models: {
                    'Xbox Series X / Series S': {
                        name: 'Xbox Series X / Series S',
                        steps: ['Inspect Southbridge chip caps.', 'Test HDMI retimer chip.', 'Verify internal power supply 12V rail.'],
                        tools: ['Multimeter', 'Hot Air Rework', 'Torx T8 & T10 Security'],
                        commonIssues: ['Powers on then immediately shuts off (1 second)', 'No 4K 120Hz display signal', 'Overheating shutdown']
                    },
                    'Xbox One X': {
                        name: 'Xbox One X',
                        steps: ['Test internal hard drive sector health.', 'Inspect TDP158 HDMI retimer IC.'],
                        tools: ['Torx T8/T9', 'Multimeter'],
                        commonIssues: ['Black screen on boot (No signal)', 'E102 / E105 System update error']
                    }
                }
            },
            nintendo: {
                name: 'Nintendo',
                hasModels: true,
                models: {
                    'Nintendo Switch (OLED & V2)': {
                        name: 'Nintendo Switch (OLED & V2)',
                        steps: ['Inspect USB-C port power delivery chip (M92T36).', 'Test MAX77620 power management IC caps.', 'Replace Joy-Con analog joystick module.'],
                        tools: ['Tri-Point Y00 Screwdriver', 'Micro-Soldering Station', 'Hall Effect Replacement Sticks'],
                        commonIssues: ['Joy-Con Stick Drift', 'Not charging / M92T36 IC shorted', 'Orange screen of death / Wi-Fi chip failure']
                    },
                    'Nintendo Switch Lite': {
                        name: 'Nintendo Switch Lite',
                        steps: ['Check soldered joystick ribbon connectors.', 'Test backlight driver IC.'],
                        tools: ['Tri-Point Y00', 'Multimeter'],
                        commonIssues: ['Analog stick drifting', 'Blue screen of death']
                    }
                }
            },
            valve: {
                name: 'Valve (Steam Deck)',
                hasModels: true,
                models: {
                    'Steam Deck LCD / OLED': {
                        name: 'Steam Deck LCD / OLED',
                        steps: ['Remove microSD card before opening shell!', 'Disconnect battery cable with pull tab.', 'Inspect USB-C power delivery IC.'],
                        tools: ['Phillips #0 / Torx T6', 'Plastic Spudger', 'Multimeter'],
                        commonIssues: ['Slow charging / Battery recalibration bug', 'Left or right trigger rubbing shell', 'MicroSD snapped in card slot']
                    }
                }
            },
            asus_gaming: {
                name: 'ASUS ROG',
                hasModels: true,
                models: {
                    'ROG Ally / Ally X': {
                        name: 'ROG Ally / Ally X',
                        steps: ['Inspect MicroSD card reader thermal heat shielding near exhaust.', 'Test left/right bumper switches and hall triggers.'],
                        tools: ['Phillips #0', 'Thermal Shield Tape', 'Tweezers'],
                        commonIssues: ['MicroSD reader failure due to thermal exposure', 'Joystick deadzone stiffness']
                    }
                }
            },
            lenovo_gaming: {
                name: 'Lenovo',
                hasModels: true,
                models: {
                    'Legion Go': {
                        name: 'Legion Go',
                        steps: ['Check detachable TrueStrike controller pogo pin contacts.', 'Inspect 8.8" QHD+ display ribbon connector.'],
                        tools: ['Torx T5', 'Contact Cleaner'],
                        commonIssues: ['Controller disconnecting while attached', 'FPS mode optical mouse sensor jitter']
                    }
                }
            },
            ayaneo: {
                name: 'Ayaneo',
                hasModels: true,
                models: {
                    'Ayaneo 2 / Geek': {
                        name: 'Ayaneo 2 / Geek',
                        steps: ['Inspect frameless front glass panel clips.', 'Test hall effect linear motors.'],
                        tools: ['Torx T5', 'Plastic Pry Picks'],
                        commonIssues: ['Shell hairline cracking around heat vent', 'Haptic feedback rattling']
                    }
                }
            },
            ayn: {
                name: 'Ayn Technologies',
                hasModels: true,
                models: {
                    'Odin / Odin 2': {
                        name: 'Odin / Odin 2',
                        steps: ['Test Snapdragon 8 Gen 2 active cooling fan bearing.', 'Inspect analog trigger hall sensors.'],
                        tools: ['Phillips #00', 'Multimeter'],
                        commonIssues: ['Fan whistling noise on high speed', 'L1/R1 microswitch clicking spongy']
                    }
                }
            },
            anbernic: {
                name: 'Anbernic',
                hasModels: true,
                models: {
                    'RG35XX / RG505': {
                        name: 'Anbernic RG35XX / RG505',
                        steps: ['Inspect D-pad pivot rubber silicone membrane.', 'Flash firmware onto brand-name replacement microSD card.'],
                        tools: ['Precision Screwdriver', 'MicroSD Card Reader'],
                        commonIssues: ['Corrupted stock generic SD card boot loop', 'False diagonal inputs on D-pad']
                    }
                }
            },
            miyoo: {
                name: 'Miyoo',
                hasModels: true,
                models: {
                    'Miyoo Mini / Mini Plus': {
                        name: 'Miyoo Mini / Mini Plus',
                        steps: ['Test speaker terminal contacts against PCB.', 'Inspect IPS display ribbon cable connection.'],
                        tools: ['Phillips #00', 'Tweezers'],
                        commonIssues: ['Crackling speaker sound', 'Display separation after drop']
                    }
                }
            },
            retroid: {
                name: 'Retroid',
                hasModels: true,
                models: {
                    'Retroid Pocket 4 Pro': {
                        name: 'Retroid Pocket 4 Pro',
                        steps: ['Inspect R2/L2 analog trigger spring.', 'Test mini-HDMI video out port.'],
                        tools: ['Torx T5', 'Replacement Trigger Springs'],
                        commonIssues: ['R2 trigger spring broken / Floppy trigger', 'Screen ghosting at high refresh rate']
                    }
                }
            },
            analogue: {
                name: 'Analogue',
                hasModels: true,
                models: {
                    'Analogue Pocket': {
                        name: 'Analogue Pocket',
                        steps: ['Clean cartridge slot 32-pin connector with isopropyl alcohol.', 'Inspect D-pad PCB pads.'],
                        tools: ['Torx T6', '99% Isopropyl Alcohol'],
                        commonIssues: ['Cartridge tilt / read error during gameplay', 'Power button mushy']
                    }
                }
            },
            sega: {
                name: 'Sega (Retro Classic)',
                hasModels: true,
                models: {
                    'Dreamcast / Genesis': {
                        name: 'Dreamcast / Genesis',
                        steps: ['Replace optical GD-ROM laser assembly or recalibrate laser pot (~900Ω).', 'Replace power supply electrolytic capacitors.'],
                        tools: ['Phillips Screwdriver', 'Capacitor Kit', 'Soldering Iron'],
                        commonIssues: ['Random rebooting due to oxidized PSU pins', 'GD-ROM disc read errors']
                    }
                }
            },
            atari: {
                name: 'Atari',
                hasModels: true,
                models: {
                    'Atari 2600+ / VCS': {
                        name: 'Atari 2600+ / VCS',
                        steps: ['Inspect 7805 voltage regulator (5V output).', 'Clean cartridge slot contacts and test TIA chip.'],
                        tools: ['Multimeter', 'DeoxIT Contact Cleaner'],
                        commonIssues: ['Static on screen / Dead 7805 voltage regulator', 'No audio output']
                    }
                }
            }
        }
    },
    garbage_disposal: {
        name: 'Garbage Disposal / Food Waste Disposer',
        icon: React.createElement(Box, { className: "w-5 h-5 text-stone-600" }),
        brands: {
            insinkerator: {
                name: 'InSinkErator',
                hasModels: true,
                models: {
                    'Badger 5 (1/2 HP) / Evolution Excel (1 HP)': {
                        name: 'Badger 5 (1/2 HP) / Evolution Excel (1 HP)',
                        steps: [
                            'Insert 1/4" hex Allen jam wrench into center bottom socket of motor shaft; rotate back and forth 360° to free jammed swivel impellers.',
                            'Allow motor to cool for 5 minutes and depress red square thermal overload reset button on bottom housing.',
                            'Inspect Quick Lock sink mount mounting flange rubber gasket and snap ring.',
                            'Check SoundSeal anti-vibration baffle on Evolution models.'
                        ],
                        tools: ['1/4" Hex Allen Jam Key', 'Flashlight', 'Long Needlenose Pliers', 'Plumber\'s Putty'],
                        commonIssues: ['Unit hums loudly without spinning (fruit pit or utensil jammed between shredder ring and impeller)', 'Dead with no humming sound (tripped red bottom reset button)', 'Water leaking from dishwasher inlet plug knockout nipple or bottom housing seams (corrosion hole in galvanized chamber)']
                    }
                }
            },
            waste_king: {
                name: 'Waste King',
                hasModels: true,
                models: {
                    'Legend Series L-8000 1 HP / L-1001 1/2 HP': {
                        name: 'Legend Series L-8000 1 HP / L-1001 1/2 HP',
                        steps: ['Inspect EZ Mount collar twist lock mechanism.', 'Test high-speed 2800 RPM permanent magnet motor starting torque.', 'Clear jam using wooden broom handle inserted from top drain opening (Waste King models do not feature a bottom hex socket).'],
                        tools: ['Wooden Broom Handle', 'Flashlight', 'Screwdrivers'],
                        commonIssues: ['Excessive vibration on sink basin (EZ Mount rubber cushion displaced)', 'Splash guard baffle cracked / Water splashing up onto counter']
                    }
                }
            },
            moen_disposal: {
                name: 'Moen',
                hasModels: true,
                models: {
                    'Host Series 3/4 HP GXS75C / Chef Series 1 HP': {
                        name: 'Host Series 3/4 HP GXS75C / Chef Series 1 HP',
                        steps: ['Inspect Universal Xpress Mount twist locking ring.', 'Test SoundSHIELD insulation barrier.', 'Check pre-installed power cord strain relief grommet.'],
                        tools: ['Hex Wrench', 'Screwdrivers'],
                        commonIssues: ['Reset button will not stay pushed in (shorted motor windings)', 'Dishwasher drain water backing up into disposal']
                    }
                }
            },
            ge_appliances_disposal: {
                name: 'GE Appliances',
                hasModels: true,
                models: {
                    'Continuous Feed GFC525N 1/2 HP / GFC720N 3/4 HP': {
                        name: 'Continuous Feed GFC525N 1/2 HP / GFC720N 3/4 HP',
                        steps: ['Inspect dual stainless steel swivel impellers.', 'Test wall switch electrical box line voltage.'],
                        tools: ['Hex Key', 'Multimeter'],
                        commonIssues: ['Drain elbow gasket leaking dirty greywater', 'Rattling metal coin sound']
                    }
                }
            },
            frigidaire_disposal: {
                name: 'Frigidaire',
                hasModels: true,
                models: {
                    'Gallery 1/2 HP FF05DISP1 / 1 HP FF10DISP1': {
                        name: 'Gallery 1/2 HP FF05DISP1 / 1 HP FF10DISP1',
                        steps: ['Inspect Torque Master grinding system balanced turntable.', 'Check drain elbow flange screws.'],
                        tools: ['Screwdrivers', 'Pliers'],
                        commonIssues: ['Slow sink drainage with disposal running', 'Grinding turntable binding']
                    }
                }
            }
        }
    },
    hair_dryer: {
        name: 'Hair Dryer / Blow Dryer',
        icon: React.createElement(Wind, { className: "w-5 h-5 text-pink-500" }),
        brands: {
            dyson: {
                name: 'Dyson (Supersonic / Airwrap)',
                hasModels: true,
                models: {
                    'Supersonic HD08 / Airwrap Multi-Styler': {
                        name: 'Supersonic HD08 / Airwrap Multi-Styler',
                        steps: ['Remove and wash handle bottom magnetic mesh filter cage with warm soapy water.', 'Inspect high-speed V9 digital brushless motor (110,000 RPM).', 'Test handle PCB thermal fuse (rated ~121°C).', 'Test 360-degree swivel power cord strain relief wires.'],
                        tools: ['Torx T5 / T6 Screwdriver', 'Multimeter', 'Filter Cleaning Brush'],
                        commonIssues: ['Shuts down after 10 seconds / 3 red flashing LEDs (clogged filter cage)', 'Pulsing motor and thermal cut-out', 'Swivel cord wire broken inside rubber boot']
                    }
                }
            },
            babyliss_dryer: {
                name: 'BaBylissPRO',
                hasModels: true,
                models: {
                    'Nano Titanium / Portofino 6600 2000W': {
                        name: 'Nano Titanium / Portofino 6600 2000W',
                        steps: ['Inspect Italian AC motor carbon brushes for wear.', 'Check ceramic heating element grid and thermal bimetal switch.', 'Clean stainless steel removable rear filter.'],
                        tools: ['Torx T10', 'Soldering Iron', 'Multimeter'],
                        commonIssues: ['Sparks visible through rear intake / Carbon brush worn down', 'Cold air output only (blown thermal fuse on element)', 'Rocker switches loose']
                    }
                }
            },
            shark_beauty: {
                name: 'Shark Beauty',
                hasModels: true,
                models: {
                    'SpeedStyle / HyperAIR': {
                        name: 'SpeedStyle / HyperAIR',
                        steps: ['Inspect IQ Styler smart attachment optical / pin recognition contacts.', 'Clean high-velocity brushless motor intake.'],
                        tools: ['Torx T6', 'Alcohol Wipes'],
                        commonIssues: ['Attachment not recognized / Temperature won’t adjust automatically', 'Yellow maintenance LED flashing']
                    }
                }
            },
            parlux: {
                name: 'Parlux',
                hasModels: true,
                models: {
                    'Alyon 2250W / Advance Light': {
                        name: 'Alyon 2250W / Advance Light',
                        steps: ['Replace worn K-Advance AC motor carbon brushes.', 'Test mica heating element lattice frame.', 'Inspect HFS (Hair Free System) hair trap mechanism.'],
                        tools: ['Screwdriver', 'Soldering Iron', 'Replacement Brushes'],
                        commonIssues: ['Sparking inside handle / AC motor stall', 'Cold air output only', 'Cord fatigue near plug']
                    }
                }
            },
            laifen: {
                name: 'Laifen',
                hasModels: true,
                models: {
                    'Swift Special High-Speed 110,000 RPM': {
                        name: 'Swift Special High-Speed 110,000 RPM',
                        steps: ['Inspect 0.2mm double-layer stainless steel ultra-dense mesh filter.', 'Test 3-color LED ring microprocessor temp controller.'],
                        tools: ['Torx T5', 'Multimeter'],
                        commonIssues: ['Red LED ring stays on / Overheat shutoff', 'Magnetic concentrator nozzle falling off']
                    }
                }
            },
            panasonic_dryer: {
                name: 'Panasonic nanoe',
                hasModels: true,
                models: {
                    'nanoe Moisture Infusion EH-NA65 / EH-NA98': {
                        name: 'nanoe Moisture Infusion EH-NA65 / EH-NA98',
                        steps: ['Clean high-voltage nanoe moisture ionizer needle with cotton swab.', 'Inspect dual airflow oscillation nozzle motor.'],
                        tools: ['Cotton Swab', 'Precision Screwdrivers'],
                        commonIssues: ['Hissing/buzzing ozone sound missing (nanoe electrode scaled)', 'Quick-dry nozzle mechanism stuck']
                    }
                }
            },
            revlon_dryer: {
                name: 'Revlon Hair Tools',
                hasModels: true,
                models: {
                    'One-Step Hair Dryer & Volumizer Plus': {
                        name: 'One-Step Hair Dryer & Volumizer Plus',
                        steps: ['Clean wound hair from oval brush barrel air vents.', 'Inspect rotary bottom speed/heat dial switch contacts.', 'Test 1875W element thermal fuse.'],
                        tools: ['Tweezers', 'Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Shuts off after 5 minutes of drying (thermal safety cut-off tripped)', 'Plastic burning smell from hair wound inside base', 'Dial switch loose']
                    }
                }
            },
            conair: {
                name: 'Conair / InfinitiPRO',
                hasModels: true,
                models: {
                    'InfinitiPRO 1875W Salon Performance AC Motor': {
                        name: 'InfinitiPRO 1875W Salon Performance AC Motor',
                        steps: ['Inspect heavy-duty AC motor fan blade for hair binding shaft.', 'Test ceramic coated grill thermistor.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Motor groaning / Fan blade rubbing outer plastic shroud', 'Cold shot button jammed down']
                    }
                }
            }
        }
    },
    hair_straightener: {
        name: 'Hair Straightener / Flat Iron / Curling Iron',
        icon: React.createElement(Flame, { className: "w-5 h-5 text-rose-500" }),
        brands: {
            ghd: {
                name: 'ghd (Good Hair Day)',
                hasModels: true,
                models: {
                    'Gold Styler / Platinum+ Smart Styler': {
                        name: 'Gold Styler / Platinum+ Smart Styler',
                        steps: [
                            'Test thermal fuse (240°C ceramic inline fuse) on heater plate with multimeter.',
                            'Measure MCH ceramic heater plate resistance (~70Ω each on 110V-240V dual voltage).',
                            'Check swivel power cord cable socket connector copper spring pins for wear and oxidation.',
                            'Inspect predictive ultra-zone sensor on Platinum+ for red ring of death beep code.'
                        ],
                        tools: ['Multimeter', 'Soldering Iron', 'Replacement Thermal Fuse', 'Torx T8'],
                        commonIssues: ['Continuous beeping sound / Red Ring of Death (thermistor failure)', 'No heat on one plate (cracked ceramic element)', 'Dead unit / Swivel cable broken at hinge']
                    }
                }
            },
            dyson_straightener: {
                name: 'Dyson (Corrale / Airstrait)',
                hasModels: true,
                models: {
                    'Corrale Cordless / Airstrait Wet-to-Dry': {
                        name: 'Corrale Cordless / Airstrait Wet-to-Dry',
                        steps: ['Inspect 4-cell lithium-ion battery balance voltage on Corrale.', 'Check Flight-ready flight tag magnetic safety connector.', 'Inspect high-velocity glass bead thermistors measuring 16 times per sec on Airstrait.'],
                        tools: ['Torx T5 / T6', 'Multimeter', 'Spudger'],
                        commonIssues: ['Airplane icon flashing on OLED screen (flight tag not seated)', 'Battery critically low warning even when plugged into 360 magnetic charging cable', 'Airstrait air diffuser vents blocked by lint']
                    }
                }
            },
            babyliss_iron: {
                name: 'BaBylissPRO',
                hasModels: true,
                models: {
                    'Nano Titanium Prima 3000 / 1.25" Ultra-Thin': {
                        name: 'Nano Titanium Prima 3000 / 1.25" Ultra-Thin',
                        steps: ['Inspect aircraft-grade Ryton exterior housing insulating pads.', 'Test dual ceramic heating elements (up to 465°F).', 'Check hinge spring tension and locking switch.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Housing exterior becoming scalding hot (insulating pad worn)', 'Digital temperature display flickering']
                    }
                }
            },
            chi: {
                name: 'CHI (Farouk Systems)',
                hasModels: true,
                models: {
                    'Original Ceramic 1" Hairstyling Iron / G2 Pro': {
                        name: 'Original Ceramic 1" Hairstyling Iron / G2 Pro',
                        steps: ['Inspect ceramic PTC heating elements and thermal resistor.', 'Test internal on/off wheel potentiometer and LED pilot light.'],
                        tools: ['Precision Screwdrivers', 'Multimeter', 'Soldering Iron'],
                        commonIssues: ['Red light blinks but plates do not get hot (blown thermal fuse)', 'Swivel cord connection crackles and cuts power when rotated']
                    }
                }
            },
            cloud_nine: {
                name: 'Cloud Nine',
                hasModels: true,
                models: {
                    'The Original Iron / Touch Iron': {
                        name: 'The Original Iron / Touch Iron',
                        steps: ['Inspect mineral-infused ceramic floating plates.', 'Test touch-controlled plate tap sensor mechanism on Touch Iron.'],
                        tools: ['Torx Screwdrivers', 'Multimeter'],
                        commonIssues: ['Touch sensor fails to switch between 165°C and 195°C', 'Single plate cold']
                    }
                }
            },
            bio_ionic_iron: {
                name: 'Bio Ionic',
                hasModels: true,
                models: {
                    'OnePass 1" Nano Ceramic / Long Barrel Styler': {
                        name: 'OnePass 1" Nano Ceramic / Long Barrel Styler',
                        steps: ['Inspect patented silicone speed strips along edge of heating plate.', 'Test bio-ceramic MCH heater resistance.'],
                        tools: ['Precision Screwdrivers', 'Tweezers'],
                        commonIssues: ['Silicone speed strips scorched or peeling out of groove', 'Temperature display locked']
                    }
                }
            },
            hot_tools: {
                name: 'Hot Tools Professional',
                hasModels: true,
                models: {
                    '24K Gold Professional Marcel / Flat Iron': {
                        name: '24K Gold Professional Marcel / Flat Iron',
                        steps: ['Inspect Marcel handle locking mechanism and rotating barrel.', 'Test pulse technology fast heat-up circuitry.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Marcel clamp spring loose or broken', 'Rheostat dial temperature calibration drift']
                    }
                }
            }
        }
    },
    headphones: {
        name: 'Headphones / Earphones',
        icon: React.createElement(Headphones, { className: "w-5 h-5 text-indigo-500" }),
        brands: {
            sony: {
                name: 'Sony',
                hasModels: true,
                models: {
                    'WH-1000XM4 / XM5': {
                        name: 'WH-1000XM4 / XM5',
                        steps: ['Replace 3.7V custom lithium button battery inside right ear cup.', 'Clean ANC inner feedback microphone foam pad moisture.', 'Inspect headband swivel hinge plastic stop.'],
                        tools: ['Precision Screwdriver Set', 'Plastic Spudger', 'Replacement Battery'],
                        commonIssues: ['High pitched screeching sound in ANC mode', 'Battery drains in 1 hour', 'Snapping headband hinge']
                    },
                    'WF-1000XM4 / XM5 Earbuds': {
                        name: 'WF-1000XM4 / XM5 Earbuds',
                        steps: ['Heat earbud casing with hair dryer to soften waterproof adhesive.', 'Replace Z55H coin cell battery.', 'Reseat Bluetooth antenna flex.'],
                        tools: ['Z55H Coin Cell', 'B-7000 Glue', 'Precision Tweezers'],
                        commonIssues: ['Severe battery drain in one bud after firmware update', 'Overheating while charging']
                    }
                }
            },
            bose: {
                name: 'Bose',
                hasModels: true,
                models: {
                    'QuietComfort 45 / Ultra': {
                        name: 'QuietComfort 45 / Ultra',
                        steps: ['Replace worn ear pad cushion rings.', 'Clean Bluetooth power slider switch with contact spray.', 'Inspect headband slider wire harness.'],
                        tools: ['Contact Cleaner Spray', 'Spudger', 'Torx T6'],
                        commonIssues: ['Turns on by itself in case', 'Bluetooth disconnects during movement', 'Ear cup foam flaking']
                    },
                    'QuietComfort Earbuds II': {
                        name: 'QuietComfort Earbuds II',
                        steps: ['Clean pogo pin charging contacts with isopropyl alcohol.', 'Inspect case USB-C port.'],
                        tools: ['Alcohol Swab', 'Fine Tweezers'],
                        commonIssues: ['Earbud not charging in case', 'Wind noise in ANC mode']
                    }
                }
            },
            apple: {
                name: 'Apple AirPods / Beats',
                hasModels: true,
                models: {
                    'AirPods Pro 2nd Gen': {
                        name: 'AirPods Pro 2nd Gen',
                        steps: ['Clean optical ear detection sensors with isopropyl alcohol.', 'Inspect case lightning / USB-C charging flex.'],
                        tools: ['Alcohol Wipes', 'Fine Brush'],
                        commonIssues: ['Crackling static sound', 'One AirPod not charging in case', 'Muffled transparency mode']
                    },
                    'AirPods Max': {
                        name: 'AirPods Max',
                        steps: ['Remove magnetic ear cushions and disconnect headband with SIM tool.', 'Clean condensation corrosion on Lightning headband pins.'],
                        tools: ['SIM Card Ejector', 'Contact Cleaner', 'Torx T3'],
                        commonIssues: ['Three amber flashes / No connection', 'Condensation build-up under drivers', 'Headband mesh sagging']
                    },
                    'Beats Studio3 / Studio Pro': {
                        name: 'Beats Studio3 / Studio Pro',
                        steps: ['Inspect folding hinge screws and metal headband band.', 'Test 350mAh lithium battery.'],
                        tools: ['Torx T5', 'Multimeter', 'Soldering Iron'],
                        commonIssues: ['Hinge snap on fold', 'Will only power on while plugged into charger']
                    }
                }
            },
            sennheiser: {
                name: 'Sennheiser',
                hasModels: true,
                models: {
                    'Momentum 4 Wireless': {
                        name: 'Momentum 4 Wireless',
                        steps: ['Test right ear cup capacitive touch sensor ribbon.', 'Inspect 700mAh battery connector.'],
                        tools: ['Plastic Opening Pick', 'Multimeter'],
                        commonIssues: ['Touch gesture phantom presses in cold weather', 'Headband fabric fraying']
                    },
                    'HD 600 / HD 650 Studio': {
                        name: 'HD 600 / HD 650 Studio',
                        steps: ['Remove outer metal grille.', 'Inspect 2-pin spade connector springs for oxidation.', 'Test 300Ω driver voice coil continuity.'],
                        tools: ['Tweezers', 'Multimeter'],
                        commonIssues: ['Intermittent audio when cable wiggles', 'Driver dead on one channel']
                    }
                }
            },
            audio_technica: {
                name: 'Audio-Technica',
                hasModels: true,
                models: {
                    'ATH-M50x / M50xBT2': {
                        name: 'ATH-M50x / M50xBT2',
                        steps: ['Inspect 2.5mm twist-lock female cable jack.', 'Replace pleather ear pads and headband cover.'],
                        tools: ['Small Phillips Screwdriver', 'Replacement Pads'],
                        commonIssues: ['2.5mm jack loose inside left ear cup', 'Headband vinyl peeling']
                    }
                }
            },
            jbl_audio: {
                name: 'JBL (Harman)',
                hasModels: true,
                models: {
                    'Live 660NC / Tune 760NC': {
                        name: 'Live 660NC / Tune 760NC',
                        steps: ['Inspect plastic swivel joint yoke for hairline stress fractures.', 'Test micro-USB / Type-C charging board.'],
                        tools: ['Super Glue / Plastic Weld', 'Multimeter'],
                        commonIssues: ['Swivel bracket snapped', 'Red charging LED flashes but won’t hold charge']
                    }
                }
            },
            beyerdynamic: {
                name: 'Beyerdynamic',
                hasModels: true,
                models: {
                    'DT 770 / DT 990 Pro': {
                        name: 'DT 770 / DT 990 Pro',
                        steps: ['Carefully unclip ear cushion and white dampening ring.', 'Remove hair strands touching 45mm driver diaphragm.'],
                        tools: ['Fine Tweezers', 'Soldering Iron'],
                        commonIssues: ['Hair causing buzzing/rattling on low bass notes', 'Cable strain relief sheared']
                    }
                }
            },
            shure: {
                name: 'Shure',
                hasModels: true,
                models: {
                    'AONIC 50 / SE215 IEM': {
                        name: 'AONIC 50 / SE215 IEM',
                        steps: ['Clean MMCX coaxial earphone connectors with DeoxIT.', 'Check dynamic micro-driver solder pads.'],
                        tools: ['DeoxIT Pen', 'Magnifying Glass'],
                        commonIssues: ['MMCX connector spinning loose / Audio cuts out', 'Wax blockage in acoustic nozzle']
                    }
                }
            },
            akg: {
                name: 'AKG',
                hasModels: true,
                models: {
                    'K240 Studio / K702': {
                        name: 'K240 Studio / K702',
                        steps: ['Inspect mini-XLR 3-pin connector.', 'Replace elastic headband adjustment tension bands.'],
                        tools: ['Small Screwdriver', 'Replacement Elastic Bands'],
                        commonIssues: ['Headband loose / Slips down ears', 'Mini-XLR latch stuck']
                    }
                }
            },
            jabra: {
                name: 'Jabra',
                hasModels: true,
                models: {
                    'Elite 7 Pro / Elite 8 Active': {
                        name: 'Elite 7 Pro / Elite 8 Active',
                        steps: ['Clean acoustic mesh vent with blu-tack or needle.', 'Test wireless charging dock receiver.'],
                        tools: ['Fine Needle', 'Alcohol Pad'],
                        commonIssues: ['Low volume in one earbud due to earwax blockage in pinhole vent', 'Case not charging']
                    }
                }
            },
            bang_olufsen: {
                name: 'Bang & Olufsen',
                hasModels: true,
                models: {
                    'Beoplay H95 / HX': {
                        name: 'Beoplay H95 / HX',
                        steps: ['Inspect lambskin magnetic cushion mounting.', 'Test rotary aluminum ear cup dial potentiometer.'],
                        tools: ['Torx T5', 'Contact Cleaner'],
                        commonIssues: ['Volume dial skipping steps', 'Bluetooth pairing timeout']
                    }
                }
            },
            bowers_wilkins: {
                name: 'Bowers & Wilkins',
                hasModels: true,
                models: {
                    'Px7 S2 / Px8': {
                        name: 'Px7 S2 / Px8',
                        steps: ['Inspect carbon fiber composite arm hinges.', 'Test wear detection proximity sensor.'],
                        tools: ['Torx T4', 'Multimeter'],
                        commonIssues: ['Wear sensor pauses music erratically', 'ANC distortion']
                    }
                }
            },
            marshall_headphones: {
                name: 'Marshall',
                hasModels: true,
                models: {
                    'Major IV / Monitor II ANC': {
                        name: 'Major IV / Monitor II ANC',
                        steps: ['Inspect brass multi-directional control knob.', 'Test 80+ hour battery pack voltage.'],
                        tools: ['Torx T6', 'Multimeter'],
                        commonIssues: ['Brass knob joystick unresponsive in one direction', 'Headband hinge pin sliding out']
                    }
                }
            },
            anker_soundcore: {
                name: 'Anker Soundcore',
                hasModels: true,
                models: {
                    'Space Q45 / Life Q30': {
                        name: 'Space Q45 / Life Q30',
                        steps: ['Inspect plastic headband slider notches.', 'Check USB-C fast charging port.'],
                        tools: ['Precision Screwdrivers', 'Multimeter'],
                        commonIssues: ['Headband plastic cracking near hinge', 'ANC hiss in left cup']
                    }
                }
            },
            skullcandy: {
                name: 'Skullcandy',
                hasModels: true,
                models: {
                    'Crusher Evo / Hesh ANC': {
                        name: 'Crusher Evo / Hesh ANC',
                        steps: ['Inspect Sensory Bass haptic tactile driver transducer.', 'Test bass slider potentiometer.'],
                        tools: ['Screwdrivers', 'Multimeter'],
                        commonIssues: ['Haptic bass rattle / loose weight', 'Plastic folding hinge cracked']
                    }
                }
            }
        }
    },
    heat_gun: {
        name: 'Heat Gun / Hot Air Gun',
        icon: React.createElement(Flame, { className: "w-5 h-5 text-red-600" }),
        brands: {
            wagner: {
                name: 'Wagner SprayTech',
                hasModels: true,
                models: {
                    'Furno 300 / Furno 500 / Furno 750 Smart Heat Gun': {
                        name: 'Furno 300 / Furno 500 / Furno 750 Smart Heat Gun',
                        steps: [
                            'Test mica core ceramic heating element coil resistance (typically 10-18 ohms across 1500W element).',
                            'Inspect DC permanent magnet fan motor bridge rectifier diodes (1N4007) and smoothing capacitor.',
                            'Check dual thermal protection switches: bi-metal auto-reset thermostat and one-shot 184°C thermal cut-off fuse.',
                            'Inspect LCD temperature digital control logic PCB on Furno 750.'
                        ],
                        tools: ['Torx T15 Screwdriver', 'Multimeter', 'Soldering Iron', 'Replacement Thermal Fuse'],
                        commonIssues: ['Blowing cold air only (blown thermal fuse or snapped ceramic mica heating element)', 'Fan motor hums or runs sluggishly before element turns cherry red (bad bridge rectifier diode)', 'Rocker switch contacts melted from high current draw']
                    }
                }
            },
            steinel: {
                name: 'Steinel (Professional)',
                hasModels: true,
                models: {
                    'HG 2320 E / HL 1920 E Precision Industrial': {
                        name: 'HG 2320 E / HL 1920 E Precision Industrial',
                        steps: ['Inspect plug-in ceramic heating cartridge element.', 'Test brushless DC blower motor and residual heat indicator LED.', 'Inspect LOC lockable override control system.'],
                        tools: ['Torx Screwdrivers', 'Multimeter', 'Replacement Steinel Element'],
                        commonIssues: ['"Res" indicator blinks on display / Heating element life counter expired', 'Air intake fine dust filter clogged']
                    }
                }
            },
            dewalt_heatgun: {
                name: 'DeWalt',
                hasModels: true,
                models: {
                    'D26960K Heavy-Duty LCD / DCE530B 20V MAX': {
                        name: 'D26960K Heavy-Duty LCD / DCE530B 20V MAX',
                        steps: ['Inspect built-in kickstand bracket.', 'Test digital LCD push-button temperature up/down membrane switch.', 'Inspect 20V MAX battery terminal block on cordless model.'],
                        tools: ['Torx T20', 'Multimeter'],
                        commonIssues: ['Cordless model runtime short / Battery protection cuts power after 10 minutes continuous high heat', 'LCD backlight failing']
                    }
                }
            },
            milwaukee_heatgun: {
                name: 'Milwaukee Tool',
                hasModels: true,
                models: {
                    'M18 Compact Heat Gun 2688-20 / Dual Temp 8975-6': {
                        name: 'M18 Compact Heat Gun 2688-20 / Dual Temp 8975-6',
                        steps: ['Inspect high-demand coil element reaching operational temp in 6 seconds.', 'Test REDLINK intelligence temperature management.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['Over-temperature shutdown LED blinks', 'Nozzle attachment loose']
                    }
                }
            },
            makita_heatgun: {
                name: 'Makita',
                hasModels: true,
                models: {
                    'HG6530VK Variable Temperature LCD 2000W': {
                        name: 'HG6530VK Variable Temperature LCD 2000W',
                        steps: ['Inspect rear rubberized flat bumper for hands-free vertical stance.', 'Test push-button air volume selector slide switch.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Element rattles inside barrel', 'Power cord jacket split at strain relief']
                    }
                }
            }
        }
    },
    home_appliances: {
        name: 'Home Appliances',
        icon: React.createElement(Home, { className: "w-5 h-5 text-stone-700" }),
        brands: {
            defy: {
                name: 'Defy',
                hasModels: false,
                sizes: {
                    'General Home Appliances': {
                        name: 'General Home Appliances',
                        steps: ['Inspect power line filter capacitor.', 'Check main relay board terminal blocks.'],
                        tools: ['Multimeter'],
                        commonIssues: ['Power line surges', 'Tripping main breaker']
                    }
                }
            }
        }
    },
    humidifier: {
        name: 'Humidifier',
        icon: React.createElement(Droplets, { className: "w-5 h-5 text-sky-400" }),
        brands: {
            levoit: {
                name: 'Levoit',
                hasModels: true,
                models: {
                    'Classic 300S Ultrasonic': {
                        name: 'Classic 300S Ultrasonic',
                        steps: ['Clean mineral scale buildup on piezoelectric ultrasonic transducer disc.', 'Test water level float switch reed sensor.', 'Inspect silent DC mist duct blower fan.'],
                        tools: ['Vinegar Solution', 'Multimeter', 'Soft Brush'],
                        commonIssues: ['No mist production / Scale on disc', 'Refill light stays on when full', 'Blower fan buzzing noise']
                    }
                }
            },
            dyson_hum: {
                name: 'Dyson (Humidify+Cool)',
                hasModels: true,
                models: {
                    'Purifier Humidify+Cool PH04 / AM10': {
                        name: 'Purifier Humidify+Cool PH04 / AM10',
                        steps: ['Run deep clean cycle with 150g citric acid powder.', 'Inspect UV-C ultraviolet water purification tube.', 'Test evaporator mesh rotation drive motor.'],
                        tools: ['Citric Acid Powder', 'Torx T8 / T10', 'Multimeter'],
                        commonIssues: ['Deep Clean cycle won’t complete / Pump column fault', 'Water droplet icon flashing', 'Piezo disc calcified']
                    }
                }
            },
            vicks: {
                name: 'Vicks',
                hasModels: true,
                models: {
                    'Warm Mist V745A / Filter-Free Cool Mist': {
                        name: 'Warm Mist V745A / Filter-Free Cool Mist',
                        steps: ['Descale heating chamber boiling cup with white vinegar.', 'Inspect auto shut-off float mechanism.'],
                        tools: ['White Vinegar', 'Phillips Screwdriver'],
                        commonIssues: ['Mineral scale buildup preventing water boil', 'Reset light permanently illuminated']
                    }
                }
            },
            honeywell_hum: {
                name: 'Honeywell',
                hasModels: true,
                models: {
                    'HCM-350 Germ-Free Evaporative': {
                        name: 'HCM-350 Germ-Free Evaporative',
                        steps: ['Replace wicking filter cartridge (HAC-504).', 'Inspect UV sanitizing bulb and lamp ballast.'],
                        tools: ['Replacement Wick', 'Cotton Swab'],
                        commonIssues: ['Mold/musty smell from wicking filter', 'UV light indicator dark']
                    }
                }
            },
            canopy: {
                name: 'Canopy',
                hasModels: true,
                models: {
                    'Bedside Humidifier (No-Mist Anti-Mold)': {
                        name: 'Bedside Humidifier (No-Mist Anti-Mold)',
                        steps: ['Inspect embedded UV LEDs in water channel.', 'Test smart auto-dry fan run-out cycle sensor.'],
                        tools: ['Replacement Paper Filter', 'Microfiber Cloth'],
                        commonIssues: ['Fan continues running on low (normal auto-dry feature)', 'Tray water scale accumulation']
                    }
                }
            },
            boneco: {
                name: 'Boneco (Air-O-Swiss)',
                hasModels: true,
                models: {
                    'U350 Ultrasonic Warm & Cool / W200 Air Washer': {
                        name: 'U350 Ultrasonic Warm & Cool / W200 Air Washer',
                        steps: ['Inspect demineralization cartridge A250.', 'Replace Ionic Silver Stick (ISS).', 'Clean titanium surface ultrasonic membrane.'],
                        tools: ['EZCal Cleaner', 'Toothbrush'],
                        commonIssues: ['Fine white mineral dust settling around unit', 'Red cleaning indicator warning']
                    }
                }
            },
            pure_enrichment: {
                name: 'Pure Enrichment',
                hasModels: true,
                models: {
                    'MistAire Ultrasonic Cool Mist': {
                        name: 'MistAire Ultrasonic Cool Mist',
                        steps: ['Inspect silicone base valve ring.', 'Clean center mist nozzle air flow column.'],
                        tools: ['Small Cleaning Brush', 'Multimeter'],
                        commonIssues: ['Water puddling underneath base unit (misaligned tank valve)', 'Night light LED burned out']
                    }
                }
            },
            miro: {
                name: 'Miro',
                hasModels: true,
                models: {
                    'NR07G Modular Washable': {
                        name: 'NR07G Modular Washable',
                        steps: ['Inspect floating waterproof ultrasonic oscillator module.', 'Check magnetic induction power pins.'],
                        tools: ['Mild Detergent', 'Pry Tool'],
                        commonIssues: ['Floating module tilted causing mist failure', 'Induction contact corrosion']
                    }
                }
            }
        }
    },
    induction_cooktop: {
        name: 'Induction Cooktop / Electric Stove',
        icon: React.createElement(Flame, { className: "w-5 h-5 text-orange-600" }),
        brands: {
            bosch_cooktop: {
                name: 'Bosch',
                hasModels: true,
                models: {
                    '800 Series NIT8060UC / Benchmark 36"': {
                        name: '800 Series NIT8060UC / Benchmark 36"',
                        steps: ['Inspect induction coil power inverter module (IGBT heatsink assembly).', 'Test glass surface capacitive touch control ribbon.', 'Check dual 40A / 50A terminal block wiring connections.'],
                        tools: ['Torx T20', 'Multimeter', 'Thermal Paste'],
                        commonIssues: ['E0513 Error / Inverter communications error', 'Flashing "e" on cooking zone display', 'Cooling blower fan failure']
                    }
                }
            },
            miele_cooktop: {
                name: 'Miele',
                hasModels: true,
                models: {
                    'KM 7000 Series SmartLine Induction': {
                        name: 'KM 7000 Series SmartLine Induction',
                        steps: ['Inspect Con@ctivity RF communication module.', 'Test pan size detection optical and inductive resonance sensors.'],
                        tools: ['Torx T15 / T20', 'Multimeter'],
                        commonIssues: ['Fault F31 / Temperature sensor fault', 'Zone turns off after 10 seconds (unrecognized pan material)']
                    }
                }
            },
            ge_cooktop: {
                name: 'GE Profile / Café',
                hasModels: true,
                models: {
                    'CHP90362TSS / Touch Control Induction': {
                        name: 'CHP90362TSS / Touch Control Induction',
                        steps: ['Inspect glide touch control board.', 'Test thermal cutoff safety limiter switch on central burner coil.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Burner clicking repeatedly without heating', 'Error code 32 / Keypad stuck key']
                    }
                }
            },
            samsung_cooktop: {
                name: 'Samsung',
                hasModels: true,
                models: {
                    'Smart Induction with Virtual Flame NZ36K7880UG': {
                        name: 'Smart Induction with Virtual Flame NZ36K7880UG',
                        steps: ['Inspect LED Virtual Flame optical ring array.', 'Test magnetic analog knob sensor.'],
                        tools: ['Phillips #2', 'Multimeter'],
                        commonIssues: ['Virtual flame LED flicker', 'C-F0 / C-A0 Communication error between touch and sub-inverter']
                    }
                }
            },
            kitchenaid_cooktop: {
                name: 'KitchenAid',
                hasModels: true,
                models: {
                    'Architect Series II 5-Element Induction': {
                        name: 'Architect Series II 5-Element Induction',
                        steps: ['Inspect coil resonance capacitors.', 'Test bridge zone sensor and relay.'],
                        tools: ['Multimeter', 'Screwdriver Set'],
                        commonIssues: ['F47 Power board low voltage fault', 'Bridge element uneven heating']
                    }
                }
            },
            duxtop: {
                name: 'Duxtop (Secura)',
                hasModels: true,
                models: {
                    '9100MC / 9600LS Portable 1800W': {
                        name: '9100MC / 9600LS Portable 1800W',
                        steps: ['Replace blown 15A ceramic fuse on main board.', 'Clean bottom intake fan debris.', 'Inspect central spring-loaded thermal thermistor.'],
                        tools: ['Phillips Screwdriver', 'Replacement 15A Fuse', 'Multimeter'],
                        commonIssues: ['E0 Error (No cookware or non-magnetic cookware)', 'E1 Low voltage / E2 High voltage', 'E7 IGBT sensor overheating']
                    }
                }
            },
            defy: {
                name: 'Defy',
                hasModels: false,
                sizes: {
                    '4-Zone Induction Hob': {
                        name: '4-Zone Induction Hob',
                        steps: ['Inspect high-power IGBT transistors heat sink thermal paste.', 'Test induction coil temperature thermistor sensor.', 'Check glass touch panel optical sensors.'],
                        tools: ['Multimeter', 'Soldering Iron', 'Replacement IGBT'],
                        commonIssues: ['E2 Overheating Error', 'E4 IGBT Short Circuit', 'No pot detection beep']
                    }
                }
            },
            snappy_chef: {
                name: 'Snappy Chef',
                hasModels: false,
                sizes: {
                    '1-Burner Portable Stove': {
                        name: '1-Burner Portable Stove',
                        steps: ['Replace blown 15A glass fuse on PCB.', 'Inspect cooling fan for stuck debris.'],
                        tools: ['Multimeter', 'Fuse Puller'],
                        commonIssues: ['E0 No pan error', 'Dead unit / Fuse blown']
                    }
                }
            }
        }
    },
    juicer: {
        name: 'Juicer (Cold Press / Centrifugal / Citrus)',
        icon: React.createElement(Zap, { className: "w-5 h-5 text-lime-500" }),
        brands: {
            hurom: {
                name: 'Hurom Slow Juicer',
                hasModels: true,
                models: {
                    'H-AA / H320N Easy Clean Slow Juicer': {
                        name: 'H-AA / H320N Easy Clean Slow Juicer',
                        steps: ['Inspect reduction gear box planetary gears and grease.', 'Test safety chute magnet interlock switch.', 'Clean silicone pulp control gasket strip.'],
                        tools: ['Screwdrivers', 'Multimeter', 'Food Grade Grease'],
                        commonIssues: ['Auger jammed with hard celery fiber', 'Motor won’t reverse / Reverse switch broken', 'Juice bowl locked stuck to motor base']
                    }
                }
            },
            breville_juicer: {
                name: 'Breville',
                hasModels: true,
                models: {
                    'Juice Fountain Cold Plus / Compact BJE200XL': {
                        name: 'Juice Fountain Cold Plus / Compact BJE200XL',
                        steps: ['Clean micro-mesh Italian stainless steel cutting disc with stiff bristle nylon brush.', 'Inspect safety locking arm microswitch.', 'Test overload protection circuit breaker on base.'],
                        tools: ['Nylon Bristle Brush', 'Multimeter', 'Phillips Screwdriver'],
                        commonIssues: ['Motor stops after 30 seconds (overload thermal reset tripped)', 'Juice spraying out around rubber gasket', 'Cutting disc dull/vibrating']
                    }
                }
            },
            omega: {
                name: 'Omega Juicers',
                hasModels: true,
                models: {
                    'J8006HDC Nutrition Center / Cold Press 365': {
                        name: 'J8006HDC Nutrition Center / Cold Press 365',
                        steps: ['Inspect heavy-duty GE Ultem masticating auger teeth.', 'Check motor drive shaft brass drive coupling.'],
                        tools: ['Phillips Screwdriver', 'Pliers'],
                        commonIssues: ['Drum lock clip cracked', 'Squeaking sound from silicone end cap seal']
                    }
                }
            },
            kuvings: {
                name: 'Kuvings',
                hasModels: true,
                models: {
                    'Whole Slow Juicer EVO820 / REVO830': {
                        name: 'Whole Slow Juicer EVO820 / REVO830',
                        steps: ['Inspect 82mm flip-gate feeding chute spring.', 'Test high-torque brushless DC motor Hall sensors.'],
                        tools: ['Torx T15', 'Multimeter'],
                        commonIssues: ['Flip-gate latch not locking safety switch', 'Strainer basket cracked under root vegetable pressure']
                    }
                }
            },
            nama: {
                name: 'Nama',
                hasModels: true,
                models: {
                    'Nama J2 Cold Press Slow Juicer': {
                        name: 'Nama J2 Cold Press Slow Juicer',
                        steps: ['Inspect hands-free batch hopper auto-cutting blade.', 'Test hopper lid magnetic interlock sensor.'],
                        tools: ['Precision Screwdrivers', 'Multimeter'],
                        commonIssues: ['Hopper safety sensor misaligned prevents starting', 'Pulp nozzle silicone plug dislodged']
                    }
                }
            },
            champion: {
                name: 'Champion Juicer',
                hasModels: true,
                models: {
                    'Commercial Heavy-Duty Masticating G5-PG710': {
                        name: 'Commercial Heavy-Duty Masticating G5-PG710',
                        steps: ['Lubricate stainless steel motor shaft with food-grade olive oil.', 'Inspect General Electric 1/3 HP capacitor-start induction motor.'],
                        tools: ['Wrench', 'Screwdriver', 'Food Grade Lubricant'],
                        commonIssues: ['Cutter blade stuck frozen onto motor shaft', 'Motor hums but does not spin (bad start capacitor)']
                    }
                }
            },
            angel: {
                name: 'Angel Juicer',
                hasModels: true,
                models: {
                    'Angel 5500 / 7500 / 8500S Twin Gear Stainless': {
                        name: 'Angel 5500 / 7500 / 8500S Twin Gear Stainless',
                        steps: ['Inspect surgical grade SUS316 twin counter-rotating gears.', 'Test automatic anti-jam reverse sensor and relay on 7500/8500S.'],
                        tools: ['Hex Keys', 'Multimeter'],
                        commonIssues: ['Extracting screen silicone ring tear', 'Auto-reverse cycling continuously on hard carrots']
                    }
                }
            }
        }
    },
    laptop_computer: {
        name: 'Laptop Computer',
        icon: React.createElement(Laptop, { className: "w-5 h-5 text-sky-500" }),
        brands: {
            apple_macbook: {
                name: 'Apple MacBook',
                hasModels: true,
                models: {
                    'MacBook Pro 16" M1/M2/M3': {
                        name: 'MacBook Pro 16" M1/M2/M3',
                        steps: [
                            'Check MagSafe 3 / USB-C port 20V power delivery handshake with CD3217 USB-C controller chips.',
                            'Test short circuits on PPBUS_G3H main power rail.',
                            'Inspect EDP display backlight flex cable (Flexgate).',
                            'Check trackpad connector flex cable for liquid corrosion.'
                        ],
                        tools: ['Thermal Camera', 'Microscope', 'Multimeter', 'P5 Pentalobe Screwdriver'],
                        commonIssues: ['5V 0.00A stuck on USB-C meter', 'No screen backlight / Image visible under flashlight', 'Liquid damage corrosion on board']
                    },
                    'MacBook Air M1/M2': {
                        name: 'MacBook Air M1/M2',
                        steps: ['Check power button touch ID flex cable.', 'Inspect battery BMS controller board.'],
                        tools: ['Multimeter', 'P5 Pentalobe'],
                        commonIssues: ['Service Recommended Battery', 'Black screen after liquid spill']
                    }
                }
            },
            dell: {
                name: 'Dell',
                hasModels: true,
                models: {
                    'XPS 15 9500 / 9510': {
                        name: 'XPS 15 9500 / 9510',
                        steps: ['Decode diagnostic LED light code on front edge.', 'Test DC-in jack socket flex cable.', 'Reseat NVMe SSD and RAM.'],
                        tools: ['Torx T5 Screwdriver', 'Multimeter'],
                        commonIssues: ['2 Amber 7 White Flash / LCD Failure', 'DC jack center pin broken']
                    },
                    'Latitude 5420 / 7420': {
                        name: 'Latitude 5420 / 7420',
                        steps: ['Check CMOS coin battery voltage.', 'Test Type-C PD charging controller.'],
                        tools: ['Torx T5', 'Multimeter'],
                        commonIssues: ['3 Amber 5 White / Power rail failure', 'No POST after sleep']
                    }
                }
            },
            lenovo: {
                name: 'Lenovo ThinkPad',
                hasModels: true,
                models: {
                    'ThinkPad T14 Gen 2/3': {
                        name: 'ThinkPad T14 Gen 2/3',
                        steps: ['Perform emergency pinhole reset button press on bottom cover.', 'Inspect Thunderbolt controller chip firmware fix.'],
                        tools: ['Paperclip', 'Multimeter'],
                        commonIssues: ['Will not turn on / System frozen', 'Thunderbolt port stopped charging']
                    },
                    'Legion 5 / 7 Pro Gaming': {
                        name: 'Legion 5 / 7 Pro Gaming',
                        steps: ['Repaste Honeywell PTM7950 phase-change pad on CPU/GPU.', 'Clean dual vapor chamber intake fans.'],
                        tools: ['Phillips #0', 'PTM7950 Pad', 'Thermal Putty'],
                        commonIssues: ['Thermal throttling under GPU load', 'Charging port yellow rectangular connector cracked']
                    }
                }
            },
            hp: {
                name: 'HP (Hewlett-Packard)',
                hasModels: true,
                models: {
                    'Spectre x360 14 / Envy 15': {
                        name: 'Spectre x360 14 / Envy 15',
                        steps: ['Check 360-degree hinge angle sensor.', 'Test blue tip / barrel DC-in power jack or dual Thunderbolt 4 controllers.'],
                        tools: ['Torx T5', 'Multimeter'],
                        commonIssues: ['HP Battery Alert 601', 'Touchscreen digitizer dead in tent mode']
                    },
                    'Omen 16 Gaming Laptop': {
                        name: 'Omen 16 Gaming Laptop',
                        steps: ['Inspect hall effect lid sensor switch for false sleep trigger.', 'Check GPU power delivery chokes.'],
                        tools: ['Torx T5', 'Multimeter'],
                        commonIssues: ['Black screen on boot / Hall sensor defect', 'Keyboard RGB backlight failing']
                    }
                }
            },
            asus: {
                name: 'ASUS',
                hasModels: true,
                models: {
                    'ROG Zephyrus G14 / G16': {
                        name: 'ROG Zephyrus G14 / G16',
                        steps: ['Carefully inspect liquid metal barrier on AMD Ryzen CPU die.', 'Test 20V barrel charger mosfets.'],
                        tools: ['Torx T6', 'Thermal Paste / Liquid Metal Shield', 'Multimeter'],
                        commonIssues: ['Liquid metal pump-out causing CPU thermal shutdown', 'USB-C and AC barrel charging conflict']
                    },
                    'ZenBook Duo / 14 UX3402': {
                        name: 'ZenBook Duo / 14 UX3402',
                        steps: ['Check secondary ScreenPad Plus ribbon cable.', 'Test ErgoLift hinge tension.'],
                        tools: ['Precision Screwdrivers', 'Spudger'],
                        commonIssues: ['ScreenPad black screen', 'Battery draining while powered down']
                    }
                }
            },
            acer: {
                name: 'Acer',
                hasModels: true,
                models: {
                    'Nitro 5 / Predator Helios 300': {
                        name: 'Nitro 5 / Predator Helios 300',
                        steps: ['Inspect DC power jack socket pins for solder fracture on motherboard.', 'Reseat DDR4/DDR5 SO-DIMM RAM modules.'],
                        tools: ['Soldering Iron', 'Multimeter', 'Phillips #0'],
                        commonIssues: ['Loose power jack / Only charges when cord bent', 'Blue screen memory management']
                    }
                }
            },
            microsoft_surface: {
                name: 'Microsoft Surface',
                hasModels: true,
                models: {
                    'Surface Laptop 4 / 5 / Studio': {
                        name: 'Surface Laptop 4 / 5 / Studio',
                        steps: ['Remove rubber feet to access hidden Torx Plus screws.', 'Disconnect Surface Connect magnetic charging ribbon.'],
                        tools: ['Torx Plus 3IP', 'Guitar Picks', 'Multimeter'],
                        commonIssues: ['Surface Connect port LED blinking slowly', 'Battery swelling bulging keyboard deck']
                    }
                }
            },
            msi: {
                name: 'MSI',
                hasModels: true,
                models: {
                    'Stealth 15M / Raider GE76': {
                        name: 'Stealth 15M / Raider GE76',
                        steps: ['Inspect display hinge brass standoffs for separation from plastic chassis.', 'Test cooler booster dual blower fans.'],
                        tools: ['Epoxy Resin / Hinge Repair Kit', 'Phillips #0'],
                        commonIssues: ['Display hinge cracking plastic casing', 'High pitched fan bearing whine']
                    }
                }
            },
            razer: {
                name: 'Razer Blade',
                hasModels: true,
                models: {
                    'Razer Blade 15 / 16': {
                        name: 'Razer Blade 15 / 16',
                        steps: [
                            'SAFETY: Inspect lithium polymer battery pack for pillowing / swelling that makes trackpad hard to click.',
                            'Replace swollen battery immediately to prevent puncture fire.',
                            'Clean dual micro-fin vapor chamber.'
                        ],
                        tools: ['Torx T5 Screwdriver', 'Replacement Razer Battery Pack', 'Multimeter'],
                        commonIssues: ['Swollen battery preventing trackpad click', 'Vapor chamber dry-out overheating']
                    }
                }
            },
            samsung_laptop: {
                name: 'Samsung Galaxy Book',
                hasModels: true,
                models: {
                    'Galaxy Book3 / Book4 Pro 360': {
                        name: 'Galaxy Book3 / Book4 Pro 360',
                        steps: ['Inspect ultra-thin AMOLED panel flex ribbon.', 'Check dual USB-C Thunderbolt charging ports.'],
                        tools: ['Suction Tool', 'Torx T5', 'Multimeter'],
                        commonIssues: ['Hairline glass crack on AMOLED screen', 'USB-C fast charging drops to slow 5V']
                    }
                }
            },
            toshiba_dynabook: {
                name: 'Toshiba / Dynabook',
                hasModels: true,
                models: {
                    'Portégé X30 / Tecra A50': {
                        name: 'Portégé X30 / Tecra A50',
                        steps: ['Check power management IC (PMIC).', 'Test internal Wi-Fi M.2 card antennas.'],
                        tools: ['Multimeter', 'Phillips #00'],
                        commonIssues: ['Power LED amber flash / No power', 'Weak Wi-Fi reception']
                    }
                }
            },
            lg_gram: {
                name: 'LG Gram',
                hasModels: true,
                models: {
                    'LG Gram 16" / 17" Ultra-Light': {
                        name: 'LG Gram 16" / 17" Ultra-Light',
                        steps: ['Pry rubber screw caps under magnesium alloy base.', 'Inspect ultra-thin high-capacity 80Wh battery.'],
                        tools: ['Plastic Prying Tool', 'Precision Phillips'],
                        commonIssues: ['Trackpad clicking spongy', 'Fan rattle due to thin chassis flex']
                    }
                }
            },
            huawei_laptop: {
                name: 'Huawei MateBook',
                hasModels: true,
                models: {
                    'MateBook X Pro / D15': {
                        name: 'MateBook X Pro / D15',
                        steps: ['Inspect pop-up webcam keyboard mechanism.', 'Check fingerprint power button flex.'],
                        tools: ['Torx T5', 'Spudger'],
                        commonIssues: ['Pop-up camera stuck down', 'Fingerprint reader undetected in Windows Hello']
                    }
                }
            },
            framework: {
                name: 'Framework Laptop',
                hasModels: true,
                models: {
                    'Framework Laptop 13 / 16 Modular': {
                        name: 'Framework Laptop 13 / 16 Modular',
                        steps: ['Loosen 5 captive screws with Framework screwdriver.', 'Swap modular expansion card or repair socket.'],
                        tools: ['Framework Screwdriver & Spudger'],
                        commonIssues: ['Expansion card not recognized', 'Magnetic bezel alignment']
                    }
                }
            }
        }
    },
    led_strip_lights: {
        name: 'LED Strip Lights / Smart Lightstrip',
        icon: React.createElement(Sun, { className: "w-5 h-5 text-emerald-400" }),
        brands: {
            govee: {
                name: 'Govee (RGBIC Smart Strips)',
                hasModels: true,
                models: {
                    'RGBIC LED Strip Light M1 / H617A Wi-Fi': {
                        name: 'RGBIC LED Strip Light M1 / H617A Wi-Fi',
                        steps: [
                            'Locate dead WS2811 / WS2812 IC segment; cut along designated cut marks and solder 3-pin / 4-pin copper bypass jumper bridge.',
                            'Test 24V / 12V DC 2A-3A power brick output under load using multimeter probe.',
                            'Inspect in-line 3-button control pod microphone for music sync and Wi-Fi/Bluetooth MCU board.',
                            'Check for cold solder joints at 3M adhesive backing corner bends.'
                        ],
                        tools: ['Precision Soldering Iron', 'Multimeter', 'Wire Cutters / Strippers', 'Heat Shrink Tubing'],
                        commonIssues: ['Half or section of strip is stuck on bright green/red or flickering wildly (blown data line in addressable IC chip)', 'Power supply brick makes high-pitched whistling/ticking noise and strip turns off', 'App connectivity drops intermittently']
                    }
                }
            },
            philips_hue_strip: {
                name: 'Philips Hue',
                hasModels: true,
                models: {
                    'Hue Lightstrip Plus V4 / Gradient Lightstrip': {
                        name: 'Hue Lightstrip Plus V4 / Gradient Lightstrip',
                        steps: ['Inspect 6-pin micro connector pins at strip extension joint.', 'Test Zigbee controller box 24V PWM output channels (R, G, B, Warm White, Cool White).', 'Inspect corner connector ribbon flex.'],
                        tools: ['Multimeter', 'Tweezers', 'Hue App Diagnostics'],
                        commonIssues: ['Only white LEDs light up / Color channels dead (broken PWM trace on flexible PCB)', 'Connection corner clip creates intermittent contact when bumped']
                    }
                }
            },
            lifx: {
                name: 'LIFX',
                hasModels: true,
                models: {
                    'LIFX Lightstrip 80" / Z LED Strip': {
                        name: 'LIFX Lightstrip 80" / Z LED Strip',
                        steps: ['Inspect Polychrome technology multi-zone data line.', 'Check controller reset button pinhole sequence.'],
                        tools: ['Multimeter', 'Paperclip'],
                        commonIssues: ['Zone count mismatched in app after adding extensions (requires controller hardware power cycle re-count)', 'Flickers on low dimming settings']
                    }
                }
            },
            nanoleaf_strip: {
                name: 'Nanoleaf',
                hasModels: true,
                models: {
                    'Essentials Lightstrip Matter & Thread': {
                        name: 'Essentials Lightstrip Matter & Thread',
                        steps: ['Inspect Thread border router pairing mesh status.', 'Test inline physical remote controller toggle buttons.'],
                        tools: ['Multimeter', 'Smartphone with Thread/Matter Border Router'],
                        commonIssues: ['Unresponsive in Apple Home / Matter pairing credential timeout', 'White phosphor coating peeling off 5050 SMD LEDs']
                    }
                }
            },
            btf_lighting: {
                name: 'BTF-LIGHTING',
                hasModels: true,
                models: {
                    'WS2812B / WS2815 12V Individually Addressable': {
                        name: 'WS2812B / WS2815 12V Individually Addressable',
                        steps: ['Inspect dual data backup lines (BIN/DIN) on WS2815.', 'Inject 12V DC power injection taps every 5 meters to prevent voltage drop yellowing.'],
                        tools: ['Soldering Iron', '18 AWG Wire', '12V Power Supply', 'Multimeter'],
                        commonIssues: ['Color fades to red/dim white toward end of 5-meter reel (DC voltage drop along thin copper traces)', 'Static discharge burns out first pixel']
                    }
                }
            }
        }
    },
    microphone: {
        name: 'Microphone',
        icon: React.createElement(Mic, { className: "w-5 h-5 text-stone-700" }),
        brands: {
            shure: {
                name: 'Shure',
                hasModels: true,
                models: {
                    'SM7B Vocal Dynamic': {
                        name: 'SM7B Vocal Dynamic',
                        steps: ['Check 3-pin XLR male connector solder lugs inside base barrel.', 'Inspect humbucking coil wiring.', 'Test bass roll-off switch.'],
                        tools: ['Soldering Iron', 'Multimeter'],
                        commonIssues: ['Low audio signal / Missing ground', 'Crackling when XLR moved']
                    }
                }
            },
            blue_yeti: {
                name: 'Blue Yeti',
                hasModels: true,
                models: {
                    'Yeti USB Condenser': {
                        name: 'Yeti USB Condenser',
                        steps: ['Resolder wobbly mini-USB or micro-USB port connector leads.', 'Inspect gain control potentiometer shaft.'],
                        tools: ['Soldering Station', 'Magnifier'],
                        commonIssues: ['Broken USB port / Device not recognized']
                    }
                }
            }
        }
    },
    microwave: {
        name: 'Microwave',
        icon: React.createElement(Zap, { className: "w-5 h-5 text-red-500" }),
        brands: {
            defy: {
                name: 'Defy',
                hasModels: false,
                sizes: {
                    '20L Solo Microwave': {
                        name: '20L Solo Microwave',
                        steps: [
                            'SAFETY: Discharge high-voltage capacitor using 100kΩ 10W resistor before touching any internal wires!',
                            'Test high-voltage magnetron tube cathode-to-anode resistance (should be infinite to ground).',
                            'Measure high-voltage diode forward/reverse resistance.',
                            'Inspect 3 door safety interlock microswitches for latch alignment.'
                        ],
                        tools: ['High-Voltage Probe', 'Multimeter', 'Insulated Pliers', 'Capacitor Discharger'],
                        commonIssues: ['Runs but does not heat food / Magnetron dead', 'Sparks inside oven cavity / Burnt mica wave guide sheet', 'Blows main 15A ceramic fuse as soon as door shuts']
                    },
                    '30L Grill & Convection': {
                        name: '30L Grill & Convection',
                        steps: ['Check convection fan motor coil.', 'Inspect turntable motor gear teeth.'],
                        tools: ['Multimeter'],
                        commonIssues: ['Turntable stopped spinning', 'Grill element cold']
                    }
                }
            },
            lg: {
                name: 'LG',
                hasModels: true,
                models: {
                    'NeoChef Smart Inverter 42L': {
                        name: 'NeoChef Smart Inverter 42L',
                        steps: ['Test inverter power board output high frequency transformer.', 'Inspect magnetron filament terminals.'],
                        tools: ['High-Voltage Probe', 'Multimeter'],
                        commonIssues: ['F3 Error Code', 'Inverter board short circuit']
                    }
                }
            },
            samsung: {
                name: 'Samsung',
                hasModels: true,
                models: {
                    'MS40J5133BT 40L Solo': {
                        name: 'MS40J5133BT 40L Solo',
                        steps: ['Replace scorched mica waveguide cover panel.', 'Check door latch switches.'],
                        tools: ['Screwdriver', 'Replacement Mica Sheet'],
                        commonIssues: ['Arcing / Sparking on right wall']
                    }
                }
            },
            panasonic: {
                name: 'Panasonic',
                hasModels: true,
                models: {
                    'Inverter Cyclonic Wave NN-SD975S': {
                        name: 'Inverter Cyclonic Wave NN-SD975S',
                        steps: ['Discharge HV circuit.', 'Check DPC inverter driver board output.', 'Inspect optical turntable sensor.'],
                        tools: ['HV Probe', 'Multimeter'],
                        commonIssues: ['H97 / H98 Inverter Failure error code', 'Runs for 3 seconds then stops']
                    }
                }
            },
            sharp: {
                name: 'Sharp',
                hasModels: true,
                models: {
                    'Carousel Countertop SMC1442CS': {
                        name: 'Carousel Countertop SMC1442CS',
                        steps: ['Inspect bottom glass turntable drive coupler.', 'Test primary and secondary door interlock switches.'],
                        tools: ['Multimeter', 'Pry Tool'],
                        commonIssues: ['Turntable coupler sheared', 'Door switch shorting fuse']
                    }
                }
            },
            whirlpool: {
                name: 'Whirlpool',
                hasModels: true,
                models: {
                    'Over-the-Range WMH31017': {
                        name: 'Over-the-Range WMH31017',
                        steps: ['Inspect exhaust fan charcoal grease filter.', 'Test high voltage capacitor (0.91uF 2100VAC).'],
                        tools: ['Capacitance Meter', 'HV Resistor'],
                        commonIssues: ['Exhaust blower noisy', 'F1E4 Door latch error']
                    }
                }
            },
            toshiba: {
                name: 'Toshiba',
                hasModels: true,
                models: {
                    'Smart Inverter EM131A5C': {
                        name: 'Smart Inverter EM131A5C',
                        steps: ['Check humidity sensor connector on cavity ceiling.', 'Inspect membrane keypad ribbon cable.'],
                        tools: ['Multimeter', 'Alcohol Wipes'],
                        commonIssues: ['Sensor Cook error', 'Buttons 1, 2, or Start unresponsive']
                    }
                }
            },
            breville: {
                name: 'Breville',
                hasModels: true,
                models: {
                    'Smooth Wave BMO850': {
                        name: 'Smooth Wave BMO850',
                        steps: ['Inspect soft-close door damper mechanism.', 'Test inverter power supply board.'],
                        tools: ['Torx Screwdrivers', 'Multimeter'],
                        commonIssues: ['Soft-close door sticking', 'Inverter cut-out']
                    }
                }
            },
            galanz: {
                name: 'Galanz',
                hasModels: true,
                models: {
                    'Retro Microwave GLCMKA07RDR': {
                        name: 'Retro Microwave GLCMKA07RDR',
                        steps: ['Check rotary dial pulse encoder.', 'Test high-voltage transformer secondary winding.'],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['Rotary knob skips timer values', 'Humming sound but no heat']
                    }
                }
            },
            midea: {
                name: 'Midea Group',
                hasModels: true,
                models: {
                    'Custom Defrost Solo 25L': {
                        name: 'Custom Defrost Solo 25L',
                        steps: ['Inspect magnetron thermal cut-out switch.', 'Test cavity lamp bulb and socket.'],
                        tools: ['Multimeter'],
                        commonIssues: ['Thermal cutout tripped due to clogged fan', 'Cavity light flickering']
                    }
                }
            },
            bosch: {
                name: 'Bosch',
                hasModels: true,
                models: {
                    'Series 8 Built-In Microwave BFL634': {
                        name: 'Series 8 Built-In Microwave BFL634',
                        steps: ['Check motorized electric door opening actuator.', 'Test cooling blower tachometer.'],
                        tools: ['Torx T20', 'Multimeter'],
                        commonIssues: ['E1005 Door actuator fault', 'Overheating shutdown']
                    }
                }
            },
            ge_appliances: {
                name: 'GE Appliances',
                hasModels: true,
                models: {
                    'Profile 2.2 Cu. Ft. Countertop': {
                        name: 'Profile 2.2 Cu. Ft. Countertop',
                        steps: ['Test dual line fuses (20A ceramic).', 'Inspect microwave door switch bracket.'],
                        tools: ['Multimeter', 'Nut Drivers'],
                        commonIssues: ['Blown line fuse on door open', 'No heat']
                    }
                }
            },
            kenwood: {
                name: 'Kenwood',
                hasModels: true,
                models: {
                    'Combination Microwave K30CSS': {
                        name: 'Combination Microwave K30CSS',
                        steps: ['Inspect upper quartz grill element.', 'Test convection fan motor.'],
                        tools: ['Multimeter'],
                        commonIssues: ['Grill element burnt out', 'Convection rattling']
                    }
                }
            },
            russell_hobbs: {
                name: 'Russell Hobbs',
                hasModels: true,
                models: {
                    'Heritage Digital Microwave 20L': {
                        name: 'Heritage Digital Microwave 20L',
                        steps: ['Check membrane switch panel continuity.', 'Inspect waveguide cover.'],
                        tools: ['Multimeter', 'Replacement Mica Plate'],
                        commonIssues: ['Mica cover burned', 'Display digits missing segments']
                    }
                }
            },
            farberware: {
                name: 'Farberware',
                hasModels: true,
                models: {
                    'Classic Microwave 1.1 Cu. Ft.': {
                        name: 'Classic Microwave 1.1 Cu. Ft.',
                        steps: ['Check high voltage diode rectifier.', 'Test turntable synchronous motor.'],
                        tools: ['Multimeter', 'HV Probe'],
                        commonIssues: ['Diode shorted out', 'Turntable stopped rotating']
                    }
                }
            },
            hamilton_beach: {
                name: 'Hamilton Beach',
                hasModels: true,
                models: {
                    'Countertop 0.9 Cu. Ft.': {
                        name: 'Countertop 0.9 Cu. Ft.',
                        steps: ['Inspect plastic door latch hooks for breakage.', 'Test door interlock switches.'],
                        tools: ['Screwdrivers', 'Multimeter'],
                        commonIssues: ['Door latch spring snapped', 'Oven won’t start when door closed']
                    }
                }
            },
            cuisinart: {
                name: 'Cuisinart',
                hasModels: true,
                models: {
                    'Convection Microwave CMW-200': {
                        name: 'Convection Microwave CMW-200',
                        steps: ['Test convection temperature sensor.', 'Inspect door hinge alignment.'],
                        tools: ['Multimeter'],
                        commonIssues: ['Convection temp inaccurate', 'Door rubbing front bezel']
                    }
                }
            },
            black_decker: {
                name: 'Black+Decker',
                hasModels: true,
                models: {
                    'Digital Countertop Microwave 0.7 Cu. Ft.': {
                        name: 'Digital Countertop Microwave 0.7 Cu. Ft.',
                        steps: ['Test line fuse.', 'Inspect magnetron filament resistance (~0.2Ω).'],
                        tools: ['Multimeter'],
                        commonIssues: ['Dead display / Blown fuse', 'Humming but food stays cold']
                    }
                }
            },
            telefunken_microwave: {
                name: 'Telefunken',
                hasModels: true,
                models: {
                    'TMO-200 / TMO-300 / TME-200 20L-30L Mirror Finish': {
                        name: 'TMO-200 / TMO-300 / TME-200 20L-30L Mirror Finish',
                        steps: [
                            'SAFETY FIRST: Discharge high-voltage capacitor (2100VAC 0.95uF) through a 100kΩ 10W power resistor to chassis ground before servicing.',
                            'Test high-voltage transformer (HVT) primary coil (1-3 ohms) and high-voltage secondary winding (60-120 ohms).',
                            'Inspect high-voltage rectifier diode (2CL4512 / HVR-1X) with high-voltage 9V battery circuit.',
                            'Check door interlock microswitch primary/monitor switch lever alignment to prevent blowing the 15A ceramic line fuse upon opening door.'
                        ],
                        tools: ['Multimeter', 'High Voltage Capacitor Discharger', 'Insulated Pliers', 'Phillips Screwdriver'],
                        commonIssues: ['Oven runs and light turns on but food stays completely cold (blown high-voltage fuse or defective 2M214 magnetron)', 'Loud buzzing or vibrating hum when starting cook cycle', 'Sparks jumping behind mica plate waveguide inside cooking cavity']
                    }
                }
            },
            condere_microwave: {
                name: 'Condere',
                hasModels: true,
                models: {
                    'CDM-20L / CDM-30L Manual & Digital Microwave': {
                        name: 'CDM-20L / CDM-30L Manual & Digital Microwave',
                        steps: [
                            'Discharge high-voltage capacitor with insulated discharging tool.',
                            'Measure magnetron filament terminals for continuity (~0.2-0.5 ohms) and ensure infinite resistance to the metal chassis casing.',
                            'Inspect bottom synchronous turntable motor (220V-240V AC 4W 5/6 RPM) winding continuity.',
                            'Clean or replace charred mica waveguide cover on right cavity wall.'
                        ],
                        tools: ['Multimeter', 'Insulated Screwdrivers', 'Replacement Mica Sheet', 'Scissors'],
                        commonIssues: ['Turntable glass plate will not spin / Food heats unevenly', 'Burning plastic smell / Arcing sparks on inner wall', 'Turns off after 3-5 seconds of cooking']
                    }
                }
            }
        }
    },
    mobile_phone: {
        name: 'Mobile Phone / Smartphone',
        icon: React.createElement(Smartphone, { className: "w-5 h-5 text-blue-500" }),
        brands: {
            apple: {
                name: 'Apple iPhone',
                hasModels: true,
                models: {
                    'iPhone 13 / 14 / 15 Pro Max': {
                        name: 'iPhone 13 / 14 / 15 Pro Max',
                        steps: [
                            'Unscrew bottom P2 pentalobe screws and heat screen perimeter to soften IP68 water seal adhesive.',
                            'Use suction cup and razor spudger to open screen from left edge like a book.',
                            'Disconnect battery flex connector shield first before servicing screen or camera.',
                            'Measure USB-C / Lightning port line diode mode readings at tristar / hydra chip.'
                        ],
                        tools: ['P2 Pentalobe Screwdriver', 'Tri-Point Y000 Screwdriver', 'Heat Mat / iOpener', 'Spudger Set'],
                        commonIssues: ['Cracked OLED / Touch screen unresponsiveness', 'Bootlooping on Apple logo / NAND storage full', 'Not charging / Port debris or Tristar IC short']
                    }
                }
            },
            samsung_galaxy: {
                name: 'Samsung Galaxy',
                hasModels: true,
                models: {
                    'Galaxy S23 Ultra / S22 Ultra': {
                        name: 'Galaxy S22 / S23 Ultra',
                        steps: [
                            'Heat rear glass panel to 80°C and slice adhesive around perimeter avoiding S-Pen sensor flex.',
                            'Disconnect wireless charging coil assembly.',
                            'Check sub-board USB-C daughterboard flex cable connection to main PCB.'
                        ],
                        tools: ['Heat Gun', 'Thin Plastic Picks', 'Phillips #00 Screwdriver'],
                        commonIssues: ['Moisture Detected in charging port warning', 'Black Screen of Death / Display internal flex cracked', 'S-Pen connection error']
                    }
                }
            },
            google_pixel: {
                name: 'Google Pixel',
                hasModels: true,
                models: {
                    'Pixel 7 / 8 Pro': {
                        name: 'Pixel 7 / 8 Pro',
                        steps: ['Remove screen from front by heating bezel adhesive to 70°C.', 'Disconnect display ribbon cable clip.', 'Inspect under-display optical fingerprint scanner calibration.'],
                        tools: ['iOpener', 'Suction Handle', 'Torx T3'],
                        commonIssues: ['Fingerprint sensor calibration required after display swap', 'Camera glass visor shattered', 'Battery drain / Overheating Tensor chip']
                    }
                }
            },
            xiaomi: {
                name: 'Xiaomi',
                hasModels: true,
                models: {
                    'Redmi Note 12 / 13 Pro': {
                        name: 'Redmi Note 12 / 13 Pro',
                        steps: ['Remove SIM tray and plastic back cover.', 'Test battery connector voltage.', 'Inspect PMIC power IC.'],
                        tools: ['Prying Tools', 'Multimeter'],
                        commonIssues: ['Power button stuck in reboot loop', 'Fast charging failing / 67W handshake loss']
                    }
                }
            },
            huawei: {
                name: 'Huawei',
                hasModels: true,
                models: {
                    'P50 / P60 Pro': {
                        name: 'P50 / P60 Pro',
                        steps: ['Heat curved OLED edge adhesive.', 'Disconnect periscope zoom camera flex connector.'],
                        tools: ['Heat Mat', 'Curved Spudger', 'Torx T2'],
                        commonIssues: ['Periscope camera OIS jitter', 'Kirin PMIC power failure']
                    }
                }
            },
            oneplus: {
                name: 'OnePlus',
                hasModels: true,
                models: {
                    'OnePlus 11 / 12': {
                        name: 'OnePlus 11 / 12',
                        steps: ['Heat circular camera island rear glass.', 'Test SuperVOOC 100W charging daughterboard.'],
                        tools: ['Plastic Picks', 'Torx T3'],
                        commonIssues: ['Green line on AMOLED screen after software update', 'Alert slider mechanism clogged with pocket lint']
                    }
                }
            },
            motorola: {
                name: 'Motorola',
                hasModels: true,
                models: {
                    'Moto G Power / Edge Series': {
                        name: 'Moto G Power / Edge Series',
                        steps: ['Pry polycarbonate rear cover.', 'Test 5000mAh battery terminal voltage.', 'Inspect fingerprint sensor embedded in power button.'],
                        tools: ['Spudger', 'Phillips #00'],
                        commonIssues: ['Charging port pins bent or loose', 'Battery swelling lifting rear cover']
                    }
                }
            },
            sony_xperia: {
                name: 'Sony Xperia',
                hasModels: true,
                models: {
                    'Xperia 1 V / 5 IV': {
                        name: 'Xperia 1 V / 5 IV',
                        steps: ['Carefully slice IP68 adhesive around flat Gorilla Glass back.', 'Inspect dedicated 2-stage shutter button flex switch.'],
                        tools: ['Heat Gun', 'Suction Cup', 'JIS Screwdriver'],
                        commonIssues: ['Fingerprint sensor hardware missing error', 'Camera overheating warning']
                    }
                }
            },
            oppo: {
                name: 'Oppo',
                hasModels: true,
                models: {
                    'Find X6 Pro / Reno 10': {
                        name: 'Find X6 Pro / Reno 10',
                        steps: ['Inspect MariSilicon X ISP chip caps.', 'Test VOOC flash charging sub-board.'],
                        tools: ['Multimeter', 'Opening Cards'],
                        commonIssues: ['Sub-board ribbon ripped during screen repair', 'Optical in-display scanner dirt']
                    }
                }
            },
            vivo: {
                name: 'Vivo',
                hasModels: true,
                models: {
                    'X90 / X100 Pro': {
                        name: 'X90 / X100 Pro',
                        steps: ['Inspect Zeiss gimbal camera stabilization coils.', 'Test FlashCharge power IC.'],
                        tools: ['Microscope', 'Picks'],
                        commonIssues: ['Gimbal camera OIS rattle', 'FlashCharge handshake drops to slow charge']
                    }
                }
            },
            realme: {
                name: 'Realme',
                hasModels: true,
                models: {
                    'Realme GT Neo / Pro': {
                        name: 'Realme GT Neo / Pro',
                        steps: ['Check vapor chamber liquid cooling seat.', 'Inspect dual-cell battery series connection.'],
                        tools: ['Multimeter', 'Plastic Spudger'],
                        commonIssues: ['Ghost touches on digitizer', 'Reboot loop']
                    }
                }
            },
            nokia: {
                name: 'Nokia (HMD)',
                hasModels: true,
                models: {
                    'Nokia G42 / G22 QuickFix': {
                        name: 'Nokia G42 / G22 QuickFix',
                        steps: ['Unscrew quick-release Torx screws for DIY screen / battery replacement.', 'Pop rear recycled plastic shell with guitar pick.'],
                        tools: ['Torx T5', 'Plastic Pick', 'SIM Eject Tool'],
                        commonIssues: ['Damaged charging port daughterboard', 'Cracked screen']
                    }
                }
            },
            asus_rog: {
                name: 'Asus (ROG / Zenfone)',
                hasModels: true,
                models: {
                    'ROG Phone 7 / Zenfone 10': {
                        name: 'ROG Phone 7 / Zenfone 10',
                        steps: ['Inspect dual side USB-C accessory port connector.', 'Test AirTrigger ultrasonic touch sensors.'],
                        tools: ['Heat Mat', 'Torx T3', 'Multimeter'],
                        commonIssues: ['Side port dead after connecting AeroActive Cooler', 'Wi-Fi / Bluetooth IC detachment']
                    }
                }
            },
            tecno: {
                name: 'Tecno',
                hasModels: true,
                models: {
                    'Camon 20 / Spark 10': {
                        name: 'Camon 20 / Spark 10',
                        steps: ['Remove rear plastic cover clips.', 'Inspect main FPC interconnect flex cable to charging board.'],
                        tools: ['Pry Tool', 'Phillips #00'],
                        commonIssues: ['Charging board flex torn or detached', 'No microphone sound during calls']
                    }
                }
            },
            infinix: {
                name: 'Infinix',
                hasModels: true,
                models: {
                    'Note 30 Pro / Hot 30': {
                        name: 'Note 30 Pro / Hot 30',
                        steps: ['Check wireless charging pad coil solder points.', 'Inspect volume button flex contacts.'],
                        tools: ['Soldering Iron', 'Spudger'],
                        commonIssues: ['Fast charge drops out', 'Power button unresponsive']
                    }
                }
            },
            honor: {
                name: 'Honor',
                hasModels: true,
                models: {
                    'Magic 5 / 90 Pro': {
                        name: 'Magic 5 / 90 Pro',
                        steps: ['Heat quad-curved glass edges.', 'Inspect silicon-carbon battery management connector.'],
                        tools: ['Heat Gun', 'Suction Plier'],
                        commonIssues: ['Display edge touch glitch', 'Rear camera glass micro-cracks']
                    }
                }
            },
            nothing: {
                name: 'Nothing Phone',
                hasModels: true,
                models: {
                    'Phone (1) / Phone (2)': {
                        name: 'Phone (1) / Phone (2)',
                        steps: ['Heat transparent rear glass panel.', 'Disconnect Glyph Interface LED matrix flex connectors.', 'Inspect wireless charging coil.'],
                        tools: ['iOpener', 'Suction Cup', 'Torx T3 Screwdriver'],
                        commonIssues: ['Glyph LED zone not illuminating', 'Rear glass moisture condensation']
                    }
                }
            }
        }
    },
    multimeter: {
        name: 'Multimeter',
        icon: React.createElement(Gauge, { className: "w-5 h-5 text-yellow-500" }),
        brands: {
            fluke: {
                name: 'Fluke',
                hasModels: true,
                models: {
                    'Fluke 87V Industrial Multimeter': {
                        name: 'Fluke 87V Industrial Multimeter',
                        steps: [
                            'Test high-energy ceramic fuses (11A 1000V and 440mA 1000V Bussmann fuses) for open circuit in A/mA jacks.',
                            'Clean rotary dial selector contacts with isopropyl alcohol.',
                            'Inspect LCD conductive zebra strip rubber elastomer for missing segments.'
                        ],
                        tools: ['Replacement Bussmann Fuses', 'Contact Cleaner', 'Torx Screwdriver'],
                        commonIssues: ['LEAD error / Blown internal ceramic fuses', 'Missing LCD digits / Faded screen', 'Incorrect resistance readings']
                    }
                }
            }
        }
    },
    printer: {
        name: 'Printer',
        icon: React.createElement(Printer, { className: "w-5 h-5 text-indigo-500" }),
        brands: {
            hp: {
                name: 'HP (LaserJet / OfficeJet)',
                hasModels: true,
                models: {
                    'LaserJet Pro M404dn / M428fdw': {
                        name: 'LaserJet Pro M404dn / M428fdw',
                        steps: ['Clean paper pickup roller rubber tires with rubber restore fluid.', 'Inspect fuser unit pressure roller film sleeve for tears.', 'Check manual feed tray paper pickup solenoid.'],
                        tools: ['Rubber Restorer Solution', 'Torx Screwdrivers'],
                        commonIssues: ['Paper Jam in Tray 2 or Fuser', 'Vertical black streak lines down page', 'Toner not fusing / Smudging off paper']
                    },
                    'OfficeJet Pro 9015e / 9025e': {
                        name: 'OfficeJet Pro 9015e / 9025e',
                        steps: ['Clean optical encoder strip with lint-free cloth and distilled water.', 'Inspect printhead carriage drive belt tension.'],
                        tools: ['Lint-Free Wipes', 'Distilled Water'],
                        commonIssues: ['Printhead missing or not detected error', 'Carriage jam error 0x6100004a']
                    }
                }
            },
            canon: {
                name: 'Canon (PIXMA / imageCLASS)',
                hasModels: true,
                models: {
                    'PIXMA G3010 / G6020 MegaTank': {
                        name: 'PIXMA G3010 / G6020 MegaTank',
                        steps: ['Perform manual printhead ink priming flush using syringe adapter.', 'Reset waste ink absorber pad counter using service tool software.'],
                        tools: ['Syringe Adapter', 'Service Tool Software'],
                        commonIssues: ['Error 5B00 / Waste Ink Pad Full', 'Missing colors / Air bubbles in ink tubes', 'P02 / Carriage error']
                    },
                    'imageCLASS MF445dw Laser': {
                        name: 'imageCLASS MF445dw Laser',
                        steps: ['Clean laser scanner glass slit.', 'Inspect transfer roller high voltage bias spring.'],
                        tools: ['Microfiber Cloth', 'Multimeter'],
                        commonIssues: ['Faint or light printouts', 'Paper feed sensor error']
                    }
                }
            },
            epson: {
                name: 'Epson (EcoTank / WorkForce)',
                hasModels: true,
                models: {
                    'EcoTank L3250 / ET-2800 / ET-4800': {
                        name: 'EcoTank L3250 / ET-2800 / ET-4800',
                        steps: ['Perform piezo printhead nozzle ultrasonic cleaning.', 'Inspect carriage belt tensioner.', 'Replace maintenance box waste ink sponge.'],
                        tools: ['Printhead Flush Solution', 'Syringe & Tube', 'Replacement Maintenance Box'],
                        commonIssues: ['Horizontal white lines through prints', 'Paper feed grinding', 'Maintenance box at end of service life']
                    }
                }
            },
            brother: {
                name: 'Brother',
                hasModels: true,
                models: {
                    'HL-L2350DW / MFC-L2710DW Monochrome Laser': {
                        name: 'HL-L2350DW / MFC-L2710DW Monochrome Laser',
                        steps: ['Clean corona wire by sliding green tab left to right.', 'Reset drum counter manually in printer menu.', 'Clean paper feed separation pad.'],
                        tools: ['Soft Cloth', 'Replacement Drum DR-730'],
                        commonIssues: ['"Drum!" error warning', 'Repeating black dots on paper every 75mm (damaged OPC drum cylinder)', 'Paper curl']
                    },
                    'MFC-J4335DW INKvestment Tank': {
                        name: 'MFC-J4335DW INKvestment Tank',
                        steps: ['Inspect internal ink tube purge pump.', 'Clean linear encoder strip.'],
                        tools: ['Lint-Free Cloth', 'Flashlight'],
                        commonIssues: ['Cannot Detect Ink Cartridge', 'Paper jam clear tray 1']
                    }
                }
            },
            xerox: {
                name: 'Xerox',
                hasModels: true,
                models: {
                    'VersaLink C405 / B405': {
                        name: 'VersaLink C405 / B405',
                        steps: ['Inspect transfer belt cleaner blade.', 'Test high voltage power supply (HVPS) board.', 'Replace waste toner container.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['091-402 Waste toner full', 'Color registration misalignment lines']
                    }
                }
            },
            kyocera: {
                name: 'Kyocera',
                hasModels: true,
                models: {
                    'ECOSYS P2040dn / M2040dn': {
                        name: 'ECOSYS P2040dn / M2040dn',
                        steps: ['Inspect ceramic long-life drum surface.', 'Clean polygon mirror laser scanner unit.'],
                        tools: ['Air Duster', 'Screwdrivers'],
                        commonIssues: ['Fuser sleeve torn (C-6000 error)', 'White streaks down page']
                    }
                }
            },
            ricoh: {
                name: 'Ricoh',
                hasModels: true,
                models: {
                    'IM C3000 / Aficio Series': {
                        name: 'IM C3000 / Aficio Series',
                        steps: ['Inspect PCU (Photoconductor Unit) charge roller.', 'Calibrate automatic paper registration sensors.'],
                        tools: ['Service Key', 'Vacuum Cleaner for Toner'],
                        commonIssues: ['SC542 Fusing temperature warm-up error', 'Paper jam code J001']
                    }
                }
            },
            lexmark: {
                name: 'Lexmark',
                hasModels: true,
                models: {
                    'MS331dn / MC3224dwe': {
                        name: 'MS331dn / MC3224dwe',
                        steps: ['Check imaging unit photoconductor drum contact pins.', 'Test pickup roller solenoid actuation.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['200.02 Paper jam in transport', 'Toner low premature warning']
                    }
                }
            },
            konica_minolta: {
                name: 'Konica Minolta',
                hasModels: true,
                models: {
                    'bizhub C250i / C360i': {
                        name: 'bizhub C250i / C360i',
                        steps: ['Inspect intermediate transfer belt (ITB) drive motor.', 'Test ozone filter and air suction fan.'],
                        tools: ['Special Service Tools', 'Multimeter'],
                        commonIssues: ['C-2152 Transfer belt separation failure', 'Streaking across lead edge']
                    }
                }
            },
            pantum: {
                name: 'Pantum',
                hasModels: true,
                models: {
                    'P2502W / M6552NW Laser': {
                        name: 'P2502W / M6552NW Laser',
                        steps: ['Inspect toner cartridge chip contact pins.', 'Clean feed rubber roller.'],
                        tools: ['Rubbing Alcohol', 'Cloth'],
                        commonIssues: ['Toner cartridge not recognized', 'Pulls multiple sheets of paper']
                    }
                }
            },
            zebra: {
                name: 'Zebra Technologies',
                hasModels: true,
                models: {
                    'ZD421 / GX420d Thermal Label': {
                        name: 'ZD421 / GX420d Thermal Label',
                        steps: ['Clean thermal printhead element bar with 99% isopropyl alcohol pen.', 'Calibrate transmissive label gap sensor.'],
                        tools: ['Thermal Printhead Cleaning Pen', 'Sensor Calibration Utility'],
                        commonIssues: ['Faded or skipped lines on barcode', 'Red flashing pause LED / Out of media error']
                    }
                }
            },
            dymo: {
                name: 'Dymo',
                hasModels: true,
                models: {
                    'LabelWriter 450 / 550 Turbo': {
                        name: 'LabelWriter 450 / 550 Turbo',
                        steps: ['Clean platen rubber drive roller.', 'Clear label adhesive wrap-around jam from spool spindle.'],
                        tools: ['Cleaning Card', 'Fine Tweezers'],
                        commonIssues: ['Label wrapped around platen roller', 'RFID label roll not recognized (LW 550)']
                    }
                }
            }
        }
    },
    projector: {
        name: 'Projector',
        icon: React.createElement(Tv, { className: "w-5 h-5 text-purple-600" }),
        brands: {
            epson: {
                name: 'Epson',
                hasModels: true,
                models: {
                    'Home Cinema 2250 / 5050UB 3LCD': {
                        name: 'Home Cinema 2250 / 5050UB 3LCD',
                        steps: ['Clean air intake dust filter mesh.', 'Inspect optical color wheel motor speed sensor.', 'Replace UHE projector lamp bulb assembly.', 'Inspect motorized lens shift gear assembly.'],
                        tools: ['Precision Screwdrivers', 'Replacement Lamp Module', 'Compressed Air'],
                        commonIssues: ['Lamp / Temp orange warning lights blinking', 'Dust blobs / Colored spots on image', 'Lens iris aperture sticking']
                    }
                }
            },
            benq_proj: {
                name: 'BenQ',
                hasModels: true,
                models: {
                    'HT3550 / TK700STi 4K HDR': {
                        name: 'HT3550 / TK700STi 4K HDR',
                        steps: ['Inspect RGBRGB 6-segment color wheel optical index sensor.', 'Test Texas Instruments 0.47" DMD chip thermal pad.'],
                        tools: ['Torx T10', 'High-Temp Thermal Paste', 'Multimeter'],
                        commonIssues: ['High pitch color wheel bearing whine', 'White/black dead pixels on screen (DMD chip micro-mirror failure)']
                    },
                    'X3000i 4LED Gaming Projector': {
                        name: 'X3000i 4LED Gaming Projector',
                        steps: ['Inspect 4LED solid-state light engine cooling fans.', 'Check QS01 Android TV HDMI dongle cavity connector.'],
                        tools: ['Torx T8', 'Multimeter'],
                        commonIssues: ['Fan failure thermal shutdown code', 'Android TV dongle no signal']
                    }
                }
            },
            optoma: {
                name: 'Optoma',
                hasModels: true,
                models: {
                    'UHD38x / CinemaX P2 Ultra Short Throw': {
                        name: 'UHD38x / CinemaX P2 Ultra Short Throw',
                        steps: ['Inspect phosphor wheel and laser diode bank on UST models.', 'Check main ballast board power capacitors.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Dead pixel starry night effect (DMD chip overheating)', 'Blinking red lamp LED error code']
                    }
                }
            },
            sony_proj: {
                name: 'Sony (SXRD)',
                hasModels: true,
                models: {
                    'VPL-XW5000ES Native 4K Laser': {
                        name: 'VPL-XW5000ES Native 4K Laser',
                        steps: ['Inspect 0.61" Native 4K SXRD silicon crystal panels.', 'Test Z-Phosphor laser light engine power driver.'],
                        tools: ['Precision Screwdrivers', 'Optical Cleaning Cloth'],
                        commonIssues: ['Contrast degradation over time (SXRD panel optical block wear)', 'Cooling duct air intake sensor clogged']
                    }
                }
            },
            jvc: {
                name: 'JVC (D-ILA)',
                hasModels: true,
                models: {
                    'DLA-NP5 / DLA-NZ7 8K e-shift': {
                        name: 'DLA-NP5 / DLA-NZ7 8K e-shift',
                        steps: ['Inspect BLU-Escent laser diode array.', 'Test 8K e-shift dual-axis glass actuator.'],
                        tools: ['Torx Screwdrivers', 'Multimeter'],
                        commonIssues: ['Warning/Light indicator blinking warning code', 'HDMI sync handshake delay (15-20s normal on D-ILA)']
                    }
                }
            },
            viewsonic_proj: {
                name: 'ViewSonic',
                hasModels: true,
                models: {
                    'PX701-4K / M1 Mini Portable': {
                        name: 'PX701-4K / M1 Mini Portable',
                        steps: ['Inspect built-in battery charging circuit on M1.', 'Check blower fan tachometer wire.'],
                        tools: ['Phillips #1', 'Multimeter'],
                        commonIssues: ['Fan lock error shutdown', 'Battery won’t hold charge']
                    }
                }
            },
            xgimi: {
                name: 'XGIMI',
                hasModels: true,
                models: {
                    'Horizon Ultra / Halo+ Portable': {
                        name: 'Horizon Ultra / Halo+ Portable',
                        steps: ['Inspect Dual Light (Laser + LED) hybrid optical engine.', 'Test ISA 3.0 auto-keystone CMOS camera and ToF laser sensor.'],
                        tools: ['Torx T6 / T8', 'Lens Pen'],
                        commonIssues: ['Auto-keystone autofocus fails to focus lens', 'Harman Kardon integrated speaker crackle']
                    }
                }
            },
            anker_nebula: {
                name: 'Anker Nebula',
                hasModels: true,
                models: {
                    'Capsule 3 Laser / Mars 3': {
                        name: 'Capsule 3 Laser / Mars 3',
                        steps: ['Inspect internal 52Wh Li-ion battery pack.', 'Clean front ToF distance sensor glass.', 'Test USB-C PD 65W charging input.'],
                        tools: ['Torx T5 / T6', 'Multimeter'],
                        commonIssues: ['Laser engine thermal throttle', 'USB-C charging negotiation drop']
                    }
                }
            },
            hisense_proj: {
                name: 'Hisense Laser TV',
                hasModels: true,
                models: {
                    'L9H TriChroma / PX2-PRO': {
                        name: 'L9H TriChroma / PX2-PRO',
                        steps: ['Inspect pure red, green, and blue triple-laser light engine.', 'Test eye-protection proximity sensor.'],
                        tools: ['Torx T10 / T15', 'Multimeter'],
                        commonIssues: ['Eye protection sensor falsely dimming lasers', 'Geometric warp alignment drift']
                    }
                }
            },
            formovie: {
                name: 'Formovie',
                hasModels: true,
                models: {
                    'Formovie Theater 4K UST': {
                        name: 'Formovie Theater 4K UST',
                        steps: ['Inspect ALPD 4.0 RGB+ laser technology module.', 'Test Bowers & Wilkins tuned speaker amplifier.'],
                        tools: ['Torx Screwdrivers', 'Multimeter'],
                        commonIssues: ['Dolby Vision black screen glitch on specific firmware', 'Fan bearing tick']
                    }
                }
            }
        }
    },
    radio: {
        name: 'Radio (AM/FM / DAB / Shortwave)',
        icon: React.createElement(Radio, { className: "w-5 h-5 text-stone-600" }),
        brands: {
            roberts: {
                name: 'Roberts Radio',
                hasModels: true,
                models: {
                    'Revival iSTREAM 3': {
                        name: 'Revival iSTREAM 3',
                        steps: ['Check telescopic antenna base swivel screw.', 'Test DC power input socket flex.', 'Inspect Frontier Silicon Wi-Fi/DAB module.'],
                        tools: ['Soldering Iron', 'Multimeter'],
                        commonIssues: ['Static noise on FM/DAB', 'Loose DC jack', 'Network connection timeout']
                    }
                }
            },
            tivoli: {
                name: 'Tivoli Audio',
                hasModels: true,
                models: {
                    'Model One BT / Model Three': {
                        name: 'Model One BT / Model Three',
                        steps: ['Clean 5:1 ratio analog vernier tuning dial potentiometer with DeoxIT.', 'Test internal AM ferrite rod and 3-inch full-range driver.'],
                        tools: ['DeoxIT D5 Contact Cleaner', 'Phillips Screwdriver'],
                        commonIssues: ['Scratchy crackling sound when tuning radio dial', 'FM reception drift over time (cleaning tuning capacitor solves this)']
                    }
                }
            },
            sangean: {
                name: 'Sangean',
                hasModels: true,
                models: {
                    'WR-11 / HDR-16 HD Radio': {
                        name: 'WR-11 / HDR-16 HD Radio',
                        steps: ['Inspect HD Radio DSP processing board.', 'Test battery compartment spring terminals for alkaline leak corrosion.'],
                        tools: ['Wire Brush', 'White Vinegar', 'Multimeter'],
                        commonIssues: ['Battery terminal acid corrosion', 'HD Radio station multicast dropping to analog']
                    }
                }
            },
            sony_radio: {
                name: 'Sony Radio',
                hasModels: true,
                models: {
                    'ICF-P26 / XDR-S61D DAB+': {
                        name: 'ICF-P26 / XDR-S61D DAB+',
                        steps: ['Inspect thumbwheel tuning dial string and tension spring.', 'Test headphone 3.5mm jack disconnect switch.'],
                        tools: ['Phillips #00', 'Fine Tweezers'],
                        commonIssues: ['Dial string slipping off pulley', 'Speaker muted when headphone unplugged (stuck jack switch)']
                    }
                }
            },
            c_crane: {
                name: 'C. Crane',
                hasModels: true,
                models: {
                    'CC Skywave / CC Radio 3': {
                        name: 'CC Skywave / CC Radio 3',
                        steps: ['Inspect twin-coil ferrite AM antenna.', 'Test weather alert NOAA SAME decoder circuit.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Volume rotary encoder jumping values', 'Backlight LED burned out']
                    }
                }
            },
            tecsun: {
                name: 'Tecsun',
                hasModels: true,
                models: {
                    'PL-880 / PL-330 High-Performance DSP': {
                        name: 'PL-880 / PL-330 High-Performance DSP',
                        steps: ['Inspect Silicon Labs Si4735 DSP chip.', 'Test 18650 Li-ion internal charging circuit.'],
                        tools: ['Precision Screwdrivers', 'Multimeter'],
                        commonIssues: ['SSB fine tuning rotary knob erratic', 'External antenna 3.5mm socket solder crack']
                    }
                }
            },
            pure_radio: {
                name: 'Pure',
                hasModels: true,
                models: {
                    'Evoke H4 / Pop Maxi DAB+': {
                        name: 'Evoke H4 / Pop Maxi DAB+',
                        steps: ['Inspect ChargePAK lithium rechargeable battery contacts.', 'Test color TFT screen display ribbon cable.'],
                        tools: ['Torx T6', 'Multimeter'],
                        commonIssues: ['Display shows "No Stations Found" / DAB tuner failure', 'Pop button latch spring displaced']
                    }
                }
            },
            telefunken_radio: {
                name: 'Telefunken Radio',
                hasModels: true,
                models: {
                    'TR-100 / TR-200 Retro & Portable AM/FM/SW': {
                        name: 'TR-100 / TR-200 Retro & Portable AM/FM/SW',
                        steps: [
                            'Clean analog variable tuning capacitor wiper contact fingers with non-residue contact cleaner to eliminate crackling.',
                            'Inspect dial cord string pulley tension spring for proper slip-free tracking across the frequency scale.',
                            'Test AC/DC internal transformer step-down secondary output (9V AC) and bridge rectifier diodes.'
                        ],
                        tools: ['Contact Cleaner Spray', 'Small Screwdriver', 'Multimeter'],
                        commonIssues: ['Loud static and scratchy noise when turning tuning dial', 'Tuning needle does not move when knob is turned (broken or slipped dial cord)', 'Dead on AC mains but works on D-cell batteries']
                    }
                }
            },
            harwa_radio: {
                name: 'Harwa Radio',
                hasModels: true,
                models: {
                    'HW-801 / HW-905 Multi-Band World Radio with USB': {
                        name: 'HW-801 / HW-905 Multi-Band World Radio with USB',
                        steps: [
                            'Check 18650 lithium battery cell terminal solder tabs and onboard mini charging PCB.',
                            'Inspect solar panel 5V charging input diode to prevent battery back-drain.',
                            'Test telescopic whip antenna base swivel screw and internal antenna copper wire lead.'
                        ],
                        tools: ['Soldering Iron', 'Multimeter', 'Wire Stripper'],
                        commonIssues: ['Shortwave or FM signal extremely weak (snapped internal antenna wire at pivot)', 'Battery will not charge via solar or micro USB port', 'Volume control potentiometer produces loud squealing feedback']
                    }
                }
            },
            condere_radio: {
                name: 'Condere Radio',
                hasModels: true,
                models: {
                    'CDR-808 / CDR-918 Solar AM/FM/SW Radio': {
                        name: 'CDR-808 / CDR-918 Solar AM/FM/SW Radio',
                        steps: [
                            'Inspect multi-position band selector slide switch (AM/FM/SW1-SW4) for oxidized copper leaf contacts.',
                            'Test emergency LED flashlight switch and internal 3.7V lithium pouch battery.',
                            'Check built-in speaker paper cone voice coil impedance (4 ohms / 3W).'
                        ],
                        tools: ['DeoxIT Contact Cleaner', 'Multimeter', 'Soldering Iron'],
                        commonIssues: ['No sound on SW bands (oxidized band selector switch contacts)', 'Flashlight works but radio is silent', 'Distorted buzzing audio at moderate volume']
                    }
                }
            },
            retekess: {
                name: 'Retekess',
                hasModels: true,
                models: {
                    'V115 / TR604 AM/FM/SW DSP Portable': {
                        name: 'V115 / TR604 AM/FM/SW DSP Portable',
                        steps: [
                            'Inspect BL-5C removable lithium battery spring pin contacts.',
                            'Test Silicon Labs Si4734 / Si4735 DSP radio tuner chip clock crystal (32.768 kHz).',
                            'Check MicroSD card slot spring eject mechanism and audio DAC output.'
                        ],
                        tools: ['Multimeter', 'Tweezers', 'Magnifying Glass'],
                        commonIssues: ['Auto-scan passes all stations without locking (DSP crystal frequency drift)', 'MicroSD card "Card Error" message']
                    }
                }
            },
            kchibo: {
                name: 'Kchibo (Shenzhen)',
                hasModels: true,
                models: {
                    'KK-9 / KK-2005 Multi-Band Shortwave': {
                        name: 'KK-9 / KK-2005 Multi-Band Shortwave',
                        steps: ['Inspect miniature PVC tuning capacitor trim trimmer capacitors.', 'Test earphone 3.5mm bypass switch.'],
                        tools: ['Ceramic Alignment Tool', 'Multimeter'],
                        commonIssues: ['Frequency dial misaligned by several MHz', 'No sound from internal speaker']
                    }
                }
            },
            degen: {
                name: 'Degen',
                hasModels: true,
                models: {
                    'DE1103 / DE1104 PLL Synthesized SSB Radio': {
                        name: 'DE1103 / DE1104 PLL Synthesized SSB Radio',
                        steps: ['Inspect dual gate MOSFET RF front end protection diodes.', 'Check LCD ribbon zebra strip contacts.'],
                        tools: ['Fine Soldering Iron', 'IPA Swabs'],
                        commonIssues: ['Front end FET blown by static discharge on external wire antenna', 'Missing LCD digits']
                    }
                }
            }
        }
    },
    rice_cooker: {
        name: 'Rice Cooker',
        icon: React.createElement(Flame, { className: "w-5 h-5 text-amber-500" }),
        brands: {
            zojirushi: {
                name: 'Zojirushi',
                hasModels: true,
                models: {
                    'Neuro Fuzzy NS-ZCC10 / Induction NP-HCC10': {
                        name: 'Neuro Fuzzy NS-ZCC10 / Induction NP-HCC10',
                        steps: [
                            'Replace soldered CR2450 3V lithium internal clock memory battery on control PCB.',
                            'Test central magnetic center thermostat sensor spring.',
                            'Inspect lid thermal sensor wires inside rubber hinge sheath (wires frequently fatigue and snap).'
                        ],
                        tools: ['Soldering Iron', 'Replacement CR2450 Tabbed Battery', 'Multimeter'],
                        commonIssues: ['Blank LCD display screen / Clock battery dead', 'Rice burns / Undercooked', 'H01 / H02 error code (broken lid sensor wire in hinge)']
                    }
                }
            },
            cuckoo: {
                name: 'Cuckoo Electronics',
                hasModels: true,
                models: {
                    'CRP-P1009S / Twin Pressure Induction': {
                        name: 'CRP-P1009S / Twin Pressure Induction',
                        steps: ['Clean pressure weight steam release valve nozzle using clean-out pin.', 'Inspect dual rubber lid gasket ring for hardness or tears.', 'Test induction heating coil IGBT switches.'],
                        tools: ['Nozzle Cleaning Pin', 'Replacement Gaskets', 'Multimeter'],
                        commonIssues: ['Steam leaking around rim of lid during pressurized cooking', 'E01 error / Lid locking handle microswitch misaligned', 'Steam vent whistling continuously']
                    }
                }
            },
            tiger: {
                name: 'Tiger Corporation',
                hasModels: true,
                models: {
                    'JAX-T10U / JBV-A10U Micom': {
                        name: 'JAX-T10U / JBV-A10U Micom',
                        steps: ['Inspect inner steam cap silicone seal.', 'Test thermal fuse on main heating plate element (rated ~167°C).'],
                        tools: ['Multimeter', 'Phillips Screwdriver'],
                        commonIssues: ['No power at all (blown thermal fuse)', 'Tacook cooking plate food sticking']
                    }
                }
            },
            panasonic_cooker: {
                name: 'Panasonic',
                hasModels: true,
                models: {
                    'SR-HZ106 Induction Heating 5-Layer': {
                        name: 'SR-HZ106 Induction Heating 5-Layer',
                        steps: ['Inspect 5-layer Binchotan charcoal-coated diamond pot sensor.', 'Test bottom cooling fan motor.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['U14 error code / Keep warm timer exceed', 'Fan obstruction error']
                    }
                }
            },
            yum_asia: {
                name: 'Yum Asia',
                hasModels: true,
                models: {
                    'Bamboo / Sakura Ceramic Micom': {
                        name: 'Bamboo / Sakura Ceramic Micom',
                        steps: ['Inspect Jouatsu 5-phase induction heating coil.', 'Test touch control panel flat flex ribbon.'],
                        tools: ['Precision Screwdriver', 'Contact Cleaner'],
                        commonIssues: ['Touch panel unresponsive with wet fingers', 'Steam vent cap gasket loose']
                    }
                }
            },
            instant_pot_cooker: {
                name: 'Instant Pot',
                hasModels: true,
                models: {
                    'Instant Zest 8-Cup / Duo Plus': {
                        name: 'Instant Zest 8-Cup / Duo Plus',
                        steps: ['Inspect bottom heating element plate center spring sensor.', 'Test triac heating controller PCB.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['"Burn" warning indicator premature trigger', 'Lid float valve not popping up']
                    }
                }
            },
            aroma: {
                name: 'Aroma Housewares',
                hasModels: true,
                models: {
                    'ARC-914SBD / Professional 20-Cup': {
                        name: 'ARC-914SBD / Professional 20-Cup',
                        steps: ['Inspect bi-metal thermostat leaf switch.', 'Check power cord fuse inside base.'],
                        tools: ['Multimeter', 'Pliers'],
                        commonIssues: ['Cook switch trips to Warm too early before water evaporates', 'Base plate burning rice bottom']
                    }
                }
            },
            toshiba_cooker: {
                name: 'Toshiba',
                hasModels: true,
                models: {
                    'TRCS01 / Low-Carb Healthy IH': {
                        name: 'TRCS01 / Low-Carb Healthy IH',
                        steps: ['Inspect low-carb starch siphon drain basket.', 'Test 3D surround induction heating sensors.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Starch overflow in upper steam valve', 'Sensor calibration error']
                    }
                }
            }
        }
    },
    robot_vacuum: {
        name: 'Robot Vacuum',
        icon: React.createElement(Activity, { className: "w-5 h-5 text-blue-500" }),
        brands: {
            irobot: {
                name: 'iRobot Roomba',
                hasModels: true,
                models: {
                    'Roomba i7+ / j7+ / Combo j9+': {
                        name: 'Roomba i7+ / j7+ / Combo j9+',
                        steps: [
                            'Clean 6 bottom cliff drop infrared optical sensors with microfiber cloth.',
                            'Inspect side brush gearbox gears for wound hair.',
                            'Test right and left drive wheel module optical encoders.',
                            'Clean charging contact plates with melamine eraser.'
                        ],
                        tools: ['Phillips Screwdriver', 'Microfiber Cloth', 'Melamine Eraser'],
                        commonIssues: ['Error 14 / Extractors not detected', 'Error 6 / Move to new location (Cliff sensor dirty)', 'Will not dock or charge', 'Obstacle avoidance camera LED lens smudge']
                    }
                }
            },
            roborock: {
                name: 'Roborock',
                hasModels: true,
                models: {
                    'Roborock S7 / S8 MaxV Ultra': {
                        name: 'Roborock S7 / S8 MaxV Ultra',
                        steps: ['Check LiDAR laser turret motor belt for hair jamming drive pulley.', 'Inspect VibraRise mop motor gear.', 'Test auto-empty dock water pump valve.'],
                        tools: ['Precision Screwdrivers', 'Tweezers', 'Replacement O-Rings'],
                        commonIssues: ['Error 1 / LiDAR turret stuck (hair in belt)', 'Mop vibration motor error', 'Dock clean water tank not pumping']
                    }
                }
            },
            ecovacs: {
                name: 'Ecovacs Deebot',
                hasModels: true,
                models: {
                    'Deebot X2 Omni / T20 Omni': {
                        name: 'Deebot X2 Omni / T20 Omni',
                        steps: ['Inspect dual spinning pressurized mop disc magnetic clutches.', 'Test semi-solid-state LiDAR optical window.', 'Check hot water mop washing heating element in base station.'],
                        tools: ['Phillips Screwdriver', 'Multimeter', 'Lens Wipes'],
                        commonIssues: ['Spinning mop plate falling off', 'Front dToF sensor error / navigation lost', 'Base station dirty water container suction leak']
                    }
                }
            },
            dreame: {
                name: 'Dreame',
                hasModels: true,
                models: {
                    'L20 Ultra / X40 Ultra (MopExtend)': {
                        name: 'L20 Ultra / X40 Ultra (MopExtend)',
                        steps: ['Inspect MopExtend robotic arm swing servo motor.', 'Check AI RGB camera and dual cross-line 3D structured light lasers.'],
                        tools: ['Precision Torx', 'Multimeter'],
                        commonIssues: ['Mop arm extension mechanism jammed with dirt', 'Auto-detachable mop pads not re-attaching at dock']
                    }
                }
            },
            shark_robot: {
                name: 'Shark Clean',
                hasModels: true,
                models: {
                    'AI Ultra / Matrix Plus 2-in-1': {
                        name: 'AI Ultra / Matrix Plus 2-in-1',
                        steps: ['Inspect self-cleaning brushroll teeth and comb.', 'Test bagless self-empty dock cyclonic vacuum motor.'],
                        tools: ['Phillips #2', 'Soft Brush'],
                        commonIssues: ['Brushroll indicator light red (hair obstruction)', 'Self-empty dock clog in bottom throat tube']
                    }
                }
            },
            eufy_robot: {
                name: 'Eufy Clean',
                hasModels: true,
                models: {
                    'X10 Pro Omni / RoboVac 11S': {
                        name: 'X10 Pro Omni / RoboVac 11S',
                        steps: ['Inspect roller brush drive belt tension.', 'Clean front infrared bumper bounce sensors.'],
                        tools: ['Phillips Screwdriver', 'Replacement Belt'],
                        commonIssues: ['Bumping into obstacles repeatedly (stuck microswitch in bumper)', 'Beeping 4 times / Brush roller stall']
                    }
                }
            },
            narwal: {
                name: 'Narwal',
                hasModels: true,
                models: {
                    'Freo X Ultra / Freo': {
                        name: 'Freo X Ultra / Freo',
                        steps: ['Inspect zero-tangling floating brush conical aerofoil.', 'Test smart base touch screen display LCD.'],
                        tools: ['Phillips Screwdriver', 'Tweezers'],
                        commonIssues: ['Dirty water pump impeller clog', 'Waste tank float switch stuck down']
                    }
                }
            },
            dyson_robot: {
                name: 'Dyson',
                hasModels: true,
                models: {
                    '360 Vis Nav / 360 Heurist': {
                        name: '360 Vis Nav / 360 Heurist',
                        steps: ['Inspect 360-degree fisheye camera lens and LED light ring.', 'Test side-actuator extendable squeegee arm.'],
                        tools: ['Torx T8 / T10', 'Lens Cloth'],
                        commonIssues: ['Camera blinded in dark room / LED ring failure', 'Side duct extension arm jammed']
                    }
                }
            }
        }
    },
    scanner: {
        name: 'Scanner (Document / Flatbed / Book)',
        icon: React.createElement(Printer, { className: "w-5 h-5 text-stone-600" }),
        brands: {
            fujitsu: {
                name: 'Fujitsu / Ricoh (ScanSnap)',
                hasModels: true,
                models: {
                    'ScanSnap iX1600 / iX1400': {
                        name: 'ScanSnap iX1600 / iX1400',
                        steps: ['Replace worn brake roller and pick roller set (recommended every 200k scans).', 'Clean upper and lower glass optical CIS sensor strips with isopropyl lens wipe.', 'Test ADF feed motor.'],
                        tools: ['Replacement Roller Kit', 'Lens Cleaner Solution', 'Microfiber Cloth'],
                        commonIssues: ['Multi-page double feed error', 'Vertical black or colored streaks down scanned images (paper dust on glass)']
                    }
                }
            },
            epson_scanner: {
                name: 'Epson',
                hasModels: true,
                models: {
                    'WorkForce DS-530 II / Perfection V600 Photo': {
                        name: 'WorkForce DS-530 II / Perfection V600 Photo',
                        steps: ['Clean dual CCD / CIS optical carriage mirror array on V600.', 'Test stepper motor carriage drive belt and lubricate guide rails.'],
                        tools: ['White Lithium Grease', 'Lint-free Cloth', 'Torx Screwdrivers'],
                        commonIssues: ['Scanner carriage grinds against end stop during calibration', 'Fluorescent / LED lamp calibration error']
                    }
                }
            },
            canon_scanner: {
                name: 'Canon (imageFORMULA)',
                hasModels: true,
                models: {
                    'imageFORMULA R40 / CanoScan LiDE 400': {
                        name: 'imageFORMULA R40 / CanoScan LiDE 400',
                        steps: ['Inspect USB bus-power cable connections (ensure 5V 500mA min).', 'Unlock mechanical scanner lock slider on bottom of chassis.'],
                        tools: ['USB Power Meter', 'Precision Screwdriver'],
                        commonIssues: ['"Release lock switch" error message', 'Paper jam in ADF retard roller']
                    }
                }
            },
            brother_scanner: {
                name: 'Brother',
                hasModels: true,
                models: {
                    'ADS-2700W / ADS-4700W High-Speed': {
                        name: 'ADS-2700W / ADS-4700W High-Speed',
                        steps: ['Clean ultrasonic multi-feed detection sensor transducers.', 'Inspect separation pad spring tension.'],
                        tools: ['Cotton Swab', 'Isopropyl Alcohol'],
                        commonIssues: ['Ultrasonic sensor falsely detecting double feeds on thick paper', 'Touchscreen unresponsive']
                    }
                }
            },
            czur: {
                name: 'CZUR',
                hasModels: true,
                models: {
                    'ET18 Pro / Aura Pro Book Scanner': {
                        name: 'ET18 Pro / Aura Pro Book Scanner',
                        steps: ['Inspect 3-laser curve flattening array emitter lenses.', 'Test hand button and foot pedal 3.5mm trigger switches.'],
                        tools: ['Lens Pen', 'Multimeter'],
                        commonIssues: ['Foot pedal trigger wire shorted', 'Laser line uneven on dark book pages']
                    }
                }
            },
            plustek: {
                name: 'Plustek',
                hasModels: true,
                models: {
                    'OpticFilm 8200i Ai / ePhoto Z300': {
                        name: 'OpticFilm 8200i Ai / ePhoto Z300',
                        steps: ['Inspect infrared dust/scratch detection channel.', 'Clean optical 35mm film holder feed rollers.'],
                        tools: ['Compressed Air', 'Optical Wipes'],
                        commonIssues: ['SilverFast software scanner detection drop', 'Film holder feed stutter']
                    }
                }
            }
        }
    },
    security_camera: {
        name: 'Security Camera',
        icon: React.createElement(Eye, { className: "w-5 h-5 text-red-500" }),
        brands: {
            hikvision: {
                name: 'Hikvision',
                hasModels: true,
                models: {
                    'DS-2CD2143G0-I Dome IP Camera': {
                        name: 'DS-2CD2143G0-I Dome IP Camera',
                        steps: ['Press internal waterproof hard reset button for 15 seconds while powering on.', 'Test 48V PoE 802.3af power handshake.', 'Check IR LED ring board sensor.'],
                        tools: ['Multimeter', 'PoE Injector'],
                        commonIssues: ['Forgot admin password / Hard reset required', 'Night vision IR reflection inside dome cover', 'No PoE link LED']
                    },
                    'ColorVu 4K Turret DS-2CD2387G2': {
                        name: 'ColorVu 4K Turret DS-2CD2387G2',
                        steps: ['Inspect F1.0 super-aperture lens housing.', 'Test supplemental warm LED light controller.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['Warm light staying on continuously', 'Condensation behind front glass']
                    }
                }
            },
            dahua: {
                name: 'Dahua Technology',
                hasModels: true,
                models: {
                    'TiOC 2.0 / WizSense 4K': {
                        name: 'TiOC 2.0 / WizSense 4K',
                        steps: ['Inspect red/blue strobe warning lights wiring.', 'Test bidirectional audio speaker diaphragm.', 'Check Smart Dual Illuminators.'],
                        tools: ['Torx Security Driver', 'Multimeter'],
                        commonIssues: ['Audio feedback squeal', 'False AI tripwire trigger in heavy rain']
                    }
                }
            },
            arlo: {
                name: 'Arlo',
                hasModels: true,
                models: {
                    'Pro 4 / Pro 5S 2K Wireless': {
                        name: 'Pro 4 / Pro 5S 2K Wireless',
                        steps: ['Inspect magnetic charging dock contact pins for corrosion.', 'Test rechargeable battery latch mechanism.', 'Verify Wi-Fi dual-band antenna.'],
                        tools: ['Contact Cleaner', 'Fine Probe'],
                        commonIssues: ['Camera won’t charge via magnetic cable', 'Offline blinking amber LED']
                    }
                }
            },
            blink: {
                name: 'Blink (Amazon)',
                hasModels: true,
                models: {
                    'Outdoor 4 / XT2 Wire-Free': {
                        name: 'Outdoor 4 / XT2 Wire-Free',
                        steps: ['Inspect AA Energizer Ultimate Lithium battery terminal spring contacts.', 'Check Sync Module 2 proprietary sub-GHz radio link.'],
                        tools: ['Phillips #0', 'Multimeter'],
                        commonIssues: ['Battery dies in 2 weeks (alkaline used instead of lithium)', 'Cannot connect to Sync Module']
                    }
                }
            },
            wyze: {
                name: 'Wyze',
                hasModels: true,
                models: {
                    'Cam v3 / Cam v4 Color Night Vision': {
                        name: 'Cam v3 / Cam v4 Color Night Vision',
                        steps: ['Check micro-USB right-angle waterproof rubber boot.', 'Inspect IR cut filter mechanical solenoid slider.'],
                        tools: ['Plastic Spudger', 'Multimeter'],
                        commonIssues: ['Pink screen tint (IR cut filter stuck)', 'Error code 90 device offline']
                    },
                    'Cam Pan v3': {
                        name: 'Cam Pan v3',
                        steps: ['Inspect dual-axis stepper motor gears.', 'Test slip-ring cable flex.'],
                        tools: ['Phillips Screwdriver', 'Synthetic Grease'],
                        commonIssues: ['Pan motor grinding / clicking sound', 'Stuck tracking position']
                    }
                }
            },
            reolink: {
                name: 'Reolink',
                hasModels: true,
                models: {
                    'Argus 3 Pro Solar / TrackMix': {
                        name: 'Argus 3 Pro Solar / TrackMix',
                        steps: ['Inspect solar panel USB-C port silicone seal.', 'Test PIR motion sensor lens dome.'],
                        tools: ['USB-C Power Meter', 'Tweezers'],
                        commonIssues: ['Solar panel not charging battery in direct sun', 'Dual-lens auto-tracking freeze']
                    },
                    'RLC-810A 4K PoE': {
                        name: 'RLC-810A 4K PoE',
                        steps: ['Check RJ45 waterproof gland seal.', 'Inspect PoE transformer on camera PCB.'],
                        tools: ['PoE Tester', 'Torx T8'],
                        commonIssues: ['Ethernet port corroded from water intrusion', 'Night IR flickering']
                    }
                }
            },
            ring_cam: {
                name: 'Ring (Amazon)',
                hasModels: true,
                models: {
                    'Stick Up Cam Pro / Spotlight Cam': {
                        name: 'Stick Up Cam Pro / Spotlight Cam',
                        steps: ['Test quick-release battery pack micro-USB charging circuit.', 'Inspect 3D Motion Detection radar sensor board.'],
                        tools: ['Ring Star Tool (Torx T6)', 'Multimeter'],
                        commonIssues: ['Spotlight LEDs won’t illuminate', '3D Motion radar false alerts']
                    }
                }
            },
            google_nest_cam: {
                name: 'Google Nest',
                hasModels: true,
                models: {
                    'Nest Cam (Battery / Wired)': {
                        name: 'Nest Cam (Battery / Wired)',
                        steps: ['Inspect strong magnetic mount contact pogo pins.', 'Test battery thermal sensor in freezing weather.'],
                        tools: ['Contact Spray', 'Precision Tweezers'],
                        commonIssues: ['Battery won’t charge below 0°C (designed behavior)', 'Status light pulsing yellow']
                    }
                }
            },
            amcrest: {
                name: 'Amcrest',
                hasModels: true,
                models: {
                    'UltraHD 4K (8MP) Outdoor Turret': {
                        name: 'UltraHD 4K (8MP) Outdoor Turret',
                        steps: ['Check RTSP/ONVIF streaming port status.', 'Inspect optical glass cover for condensation.'],
                        tools: ['Network Cable Tester', 'Silica Gel Packet'],
                        commonIssues: ['NVR packet drops on high bitrate', 'Foggy lens inside housing']
                    }
                }
            },
            lorex: {
                name: 'Lorex',
                hasModels: true,
                models: {
                    '4K Fusion Smart Deterrence Dome': {
                        name: '4K Fusion Smart Deterrence Dome',
                        steps: ['Inspect active siren transducer.', 'Check deterrence LED matrix driver.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['Siren sound muffled', 'Color Night Vision switching glitch']
                    }
                }
            },
            swann: {
                name: 'Swann',
                hasModels: true,
                models: {
                    'Enforcer 4K Thermal Sensing CCTV': {
                        name: 'Enforcer 4K Thermal Sensing CCTV',
                        steps: ['Inspect True Detect heat-sensing PIR sensor.', 'Test flashing police-style warning lights.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['True Detect sensor false alarm', 'BNC video signal distortion']
                    }
                }
            },
            axis: {
                name: 'Axis Communications',
                hasModels: true,
                models: {
                    'P3245-V / Q3538-LVE Network Camera': {
                        name: 'P3245-V / Q3538-LVE Network Camera',
                        steps: ['Inspect remote zoom and focus stepper motor clutch.', 'Test Lightfinder 2.0 sensor gain calibration.'],
                        tools: ['Axis Security Tool', 'Multimeter'],
                        commonIssues: ['Remote focus drift after temperature cycles', 'PoE class negotiation failure']
                    }
                }
            },
            eufy_cam: {
                name: 'Eufy Security (Anker)',
                hasModels: true,
                models: {
                    'eufyCam S330 (eufyCam 3) / 2C Pro': {
                        name: 'eufyCam S330 (eufyCam 3) / 2C Pro',
                        steps: ['Inspect integrated solar panel monocrystalline cells.', 'Check HomeBase 3 AI BionicMind sub-GHz sync.'],
                        tools: ['Multimeter', 'Plastic Spudger'],
                        commonIssues: ['BionicMind facial recognition delay', 'Battery drain without direct sunlight']
                    }
                }
            },
            tplink_tapo: {
                name: 'TP-Link (Tapo / Kasa)',
                hasModels: true,
                models: {
                    'Tapo C210 Pan/Tilt / C320WS': {
                        name: 'Tapo C210 Pan/Tilt / C320WS',
                        steps: ['Inspect microSD card slot push-push spring latch.', 'Test micro-stepper motor pan mechanism.'],
                        tools: ['MicroSD Card', 'Precision Phillips'],
                        commonIssues: ['MicroSD card unformatted error', 'Pan/tilt calibration grind']
                    }
                }
            },
            uniview: {
                name: 'Uniview (UNV)',
                hasModels: true,
                models: {
                    'LightHunter 4MP IP Turret': {
                        name: 'LightHunter 4MP IP Turret',
                        steps: ['Inspect surge protection varistors (6kV rated).', 'Check Ultra 265 compression hardware encoder.'],
                        tools: ['PoE Tester', 'Torx T10'],
                        commonIssues: ['Surge arrestor tripped after electrical storm', 'Sub-stream frame stutter']
                    }
                }
            }
        }
    },
    slow_cooker: {
        name: 'Slow Cooker / Multi-Cooker',
        icon: React.createElement(Flame, { className: "w-5 h-5 text-amber-600" }),
        brands: {
            crock_pot: {
                name: 'Crock-Pot (Original Slow Cooker)',
                hasModels: true,
                models: {
                    'Cook & Carry 6-Quart Programmable / Express Crock': {
                        name: 'Cook & Carry 6-Quart Programmable / Express Crock',
                        steps: ['Inspect locking lid rubber latch clips and lid gasket seal.', 'Test wrap-around band heating element (~240W low / ~320W high).', 'Check control PCB browning relay.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Cook & Carry locking handle plastic latch snapped', 'Food boiling violently on Low setting (runaway thermistor)', 'Digital timer screen dead']
                    }
                }
            },
            instant_pot: {
                name: 'Instant Pot',
                hasModels: true,
                models: {
                    'Duo 7-in-1 / Pro Plus Smart Multi-Cooker': {
                        name: 'Duo 7-in-1 / Pro Plus Smart Multi-Cooker',
                        steps: [
                            'Clean silicone float valve ring and anti-block shield under lid.',
                            'Test bottom heating plate thermal fuse and central spring-loaded NTC thermistor.',
                            'Inspect lid locking reed sensor switch on rim.',
                            'Test pressure release solenoid valve on Pro Plus.'
                        ],
                        tools: ['Multimeter', 'Phillips Screwdrivers', 'Replacement Thermal Fuse (172°C)'],
                        commonIssues: ['"BURN" food error message displayed prematurely', 'C6 / C6H Pressure sensor fault error code', 'Steam leaking continuously around lid perimeter (stretched silicone ring)']
                    }
                }
            },
            ninja_cooker: {
                name: 'Ninja',
                hasModels: true,
                models: {
                    'Foodi PossibleCooker PRO 8.5-Quart (MC1001)': {
                        name: 'Foodi PossibleCooker PRO 8.5-Quart (MC1001)',
                        steps: ['Inspect triple fusion heating elements (base, sides, and steam).', 'Test digital touch control panel ribbon cable.', 'Check pot-in-base detection microswitch.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['"POT" error displayed when nonstick cooking pot is inserted', 'Bottom sear temperature failing to reach 450°F']
                    }
                }
            },
            hamilton_beach_cooker: {
                name: 'Hamilton Beach',
                hasModels: true,
                models: {
                    'Set & Forget 6-Quart with Temperature Probe': {
                        name: 'Set & Forget 6-Quart with Temperature Probe',
                        steps: ['Inspect lid temperature probe 3.5mm input jack on side wall.', 'Test auto-shift to warm thermostat switch.'],
                        tools: ['Multimeter', 'Contact Cleaner'],
                        commonIssues: ['Probe temperature read displays "---" (probe cable broken internally)', 'Gasket seal deteriorated']
                    }
                }
            },
            breville_cooker: {
                name: 'Breville',
                hasModels: true,
                models: {
                    'The Fast Slow Pro Multicooker BPR700BSS': {
                        name: 'The Fast Slow Pro Multicooker BPR700BSS',
                        steps: ['Inspect dual sensor top and bottom temperature monitoring probes.', 'Check hands-free auto steam release motorized solenoid valve.', 'Test pressure transducer transducer diaphragm.'],
                        tools: ['Torx Screwdrivers', 'Multimeter'],
                        commonIssues: ['Steam release valve venting erratic pressure', 'Lid sensor not detecting lid closed']
                    }
                }
            },
            all_clad_cooker: {
                name: 'All-Clad Metalcrafters',
                hasModels: true,
                models: {
                    'Deluxe Slow Cooker with Cast Aluminum Insert 7-Qt': {
                        name: 'Deluxe Slow Cooker with Cast Aluminum Insert 7-Qt',
                        steps: ['Inspect cast aluminum insert non-stick stovetop-safe base contact.', 'Test 26-hour digital countdown display board.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Heating indicator blinks but base remains cold', 'Handle rivet loose']
                    }
                }
            }
        }
    },
    smart_doorbell: {
        name: 'Smart Doorbell',
        icon: React.createElement(ShieldAlert, { className: "w-5 h-5 text-blue-500" }),
        brands: {
            ring: {
                name: 'Ring (Amazon)',
                hasModels: true,
                models: {
                    'Video Doorbell Pro 2': {
                        name: 'Video Doorbell Pro 2',
                        steps: ['Verify 16-24VAC door chime transformer voltage.', 'Check internal micro battery pack voltage.'],
                        tools: ['Multimeter'],
                        commonIssues: ['Insufficient power error light', 'Mechanical chime humming']
                    },
                    'Battery Doorbell Plus': {
                        name: 'Battery Doorbell Plus',
                        steps: ['Inspect quick-release battery pack latch.', 'Check Head-to-Toe 1536p camera lens seal.'],
                        tools: ['Torx T6', 'Multimeter'],
                        commonIssues: ['Poor Wi-Fi signal through exterior stucco', 'Chime box bypass kit needed']
                    }
                }
            },
            google_nest_db: {
                name: 'Google Nest Doorbell',
                hasModels: true,
                models: {
                    'Nest Doorbell (Battery / Wired 2nd Gen)': {
                        name: 'Nest Doorbell (Battery / Wired 2nd Gen)',
                        steps: ['Inspect chime puck connector in indoor chime box.', 'Test internal cold-weather lithium pouch cell.'],
                        tools: ['Multimeter', 'Release Pin'],
                        commonIssues: ['Indoor chime buzzes or doesn’t ring', 'Battery shuts down in sub-zero temps']
                    }
                }
            },
            eufy_db: {
                name: 'Eufy Security',
                hasModels: true,
                models: {
                    'Video Doorbell Dual 2K': {
                        name: 'Video Doorbell Dual 2K',
                        steps: ['Inspect downward-facing package detection camera.', 'Test dual radar and PIR motion detection sensors.'],
                        tools: ['SIM Pin Tool', 'Multimeter'],
                        commonIssues: ['Package camera dirty / blocked', 'HomeBase pairing timeout']
                    }
                }
            },
            arlo_db: {
                name: 'Arlo',
                hasModels: true,
                models: {
                    'Essential Video Doorbell Wire-Free': {
                        name: 'Essential Video Doorbell Wire-Free',
                        steps: ['Inspect 1:1 square aspect ratio lens assembly.', 'Test rear power bypass jumper wire.'],
                        tools: ['Multimeter', 'Release Tool'],
                        commonIssues: ['LED ring amber pulsing', 'Delay between button press and phone alert']
                    }
                }
            },
            blink_db: {
                name: 'Blink',
                hasModels: true,
                models: {
                    'Blink Video Doorbell': {
                        name: 'Blink Video Doorbell',
                        steps: ['Inspect 2x AA lithium batteries polarity.', 'Test Sync Module 2 two-way audio bridge.'],
                        tools: ['Phillips #0', 'Key Opening Tool'],
                        commonIssues: ['Clipping audio on two-way talk', 'Chime transformer power bypass error']
                    }
                }
            },
            reolink_db: {
                name: 'Reolink',
                hasModels: true,
                models: {
                    'Video Doorbell PoE / Wi-Fi 2K+': {
                        name: 'Video Doorbell PoE / Wi-Fi 2K+',
                        steps: ['Inspect 802.3af PoE power handshake.', 'Test RF 433MHz wireless plug-in chime receiver.'],
                        tools: ['PoE Tester', 'Small Screwdriver'],
                        commonIssues: ['Wireless chime out of RF range', 'MicroSD card wear after constant recording']
                    }
                }
            },
            wyze_db: {
                name: 'Wyze',
                hasModels: true,
                models: {
                    'Video Doorbell Pro / v2': {
                        name: 'Video Doorbell Pro / v2',
                        steps: ['Inspect micro-USB/Type-C charging port on back.', 'Test 24V chime controller fuse.'],
                        tools: ['Multimeter', 'Torx T6'],
                        commonIssues: ['Wi-Fi chime disconnected', 'Night vision IR glare on doorframe']
                    }
                }
            },
            logitech_db: {
                name: 'Logitech',
                hasModels: true,
                models: {
                    'Circle View Apple HomeKit Doorbell': {
                        name: 'Circle View Apple HomeKit Doorbell',
                        steps: ['Inspect Apple HomeKit Secure Video chip.', 'Test chime kit wiring on mechanical chime solenoid.'],
                        tools: ['Multimeter', 'Wire Strippers'],
                        commonIssues: ['Overheating in direct sunlight (thermal shutoff)', 'HomeKit "No Response" error']
                    }
                }
            },
            amcrest_db: {
                name: 'Amcrest',
                hasModels: true,
                models: {
                    'AD410 4K Video Doorbell': {
                        name: 'AD410 4K Video Doorbell',
                        steps: ['Inspect 16V-24V AC transformer input power pins.', 'Check SmartHuman AI detection sensor.'],
                        tools: ['Multimeter', 'Phillips #1'],
                        commonIssues: ['Reboots when button is pressed (transformer undersized)', 'SD card slot cover loose']
                    }
                }
            },
            unifi_protect_db: {
                name: 'Ubiquiti UniFi Protect',
                hasModels: true,
                models: {
                    'G4 Doorbell Pro (PoE / Wi-Fi)': {
                        name: 'G4 Doorbell Pro (PoE / Wi-Fi)',
                        steps: ['Inspect secondary package camera and programmable OLED greeting display.', 'Check USB-C PoE adapter connection.'],
                        tools: ['UniFi Tool', 'PoE Meter'],
                        commonIssues: ['USB-C PoE dongle strain', 'UniFi Protect NVR adoption loop']
                    }
                }
            }
        }
    },
    smart_lock: {
        name: 'Smart Lock',
        icon: React.createElement(Lock, { className: "w-5 h-5 text-stone-700" }),
        brands: {
            august: {
                name: 'August',
                hasModels: true,
                models: {
                    'Wi-Fi Smart Lock 4th Gen': {
                        name: 'Wi-Fi Smart Lock 4th Gen',
                        steps: ['Replace 2x CR123A 3V batteries.', 'Calibrate DoorSense magnetic sensor.'],
                        tools: ['Precision Screwdriver'],
                        commonIssues: ['Jamming bolt motor noise', 'Rapid battery depletion']
                    }
                }
            },
            schlage: {
                name: 'Schlage',
                hasModels: true,
                models: {
                    'Encode Plus / Sense Smart Deadbolt': {
                        name: 'Encode Plus / Sense Smart Deadbolt',
                        steps: ['Inspect 4x AA alkaline battery tray contacts for corrosion.', 'Test motorized deadbolt latch gear train and physical key override cylinder.'],
                        tools: ['Phillips #2 Screwdriver', 'Multimeter'],
                        commonIssues: ['"Jam" red X error on keypad', 'Apple Home Key tap NFC reader failure', 'Motor grinding on misaligned strike plate']
                    }
                }
            },
            yale: {
                name: 'Yale (Assure Lock)',
                hasModels: true,
                models: {
                    'Assure Lock 2 / Assure Lock SL Key-Free': {
                        name: 'Assure Lock 2 / Assure Lock SL Key-Free',
                        steps: ['Inspect external 9V battery emergency contact posts.', 'Test Yale Access Wi-Fi / Matter smart module slot pins.'],
                        tools: ['Phillips Screwdriver', '9V Battery for Testing'],
                        commonIssues: ['Touchscreen keypad numbers unresponsive', 'Lock dead with depleted batteries (use 9V jump on bottom)']
                    }
                }
            },
            kwikset: {
                name: 'Kwikset',
                hasModels: true,
                models: {
                    'Halo Touch / SmartCode 916': {
                        name: 'Halo Touch / SmartCode 916',
                        steps: ['Inspect biometric fingerprint optical scanner sensor.', 'Check SmartKey cylinder mechanical re-key wafers.'],
                        tools: ['SmartKey Reset Tool', 'Phillips #2'],
                        commonIssues: ['Fingerprint recognition failing on dry fingers', 'Bolt jammed due to weather-stripping friction']
                    }
                }
            },
            ultraloq: {
                name: 'Ultraloq',
                hasModels: true,
                models: {
                    'U-Bolt Pro Wi-Fi': {
                        name: 'U-Bolt Pro Wi-Fi',
                        steps: ['Inspect 360° fingerprint scanner sensor on handle.', 'Test anti-peep tactile numeric keypad.'],
                        tools: ['Phillips Screwdriver', 'Micro Spudger'],
                        commonIssues: ['Rubber keypad button stuck down', 'Auto-unlock geofence delay']
                    }
                }
            },
            eufy_lock: {
                name: 'Eufy Security',
                hasModels: true,
                models: {
                    'Smart Lock Touch & Wi-Fi': {
                        name: 'Smart Lock Touch & Wi-Fi',
                        steps: ['Inspect 10,000mAh rechargeable lithium battery pack.', 'Test BHMA Grade 2 deadbolt motor drive.'],
                        tools: ['Phillips #2', 'Multimeter'],
                        commonIssues: ['Deadbolt motor stall error', 'Micro-USB emergency charging port loose']
                    }
                }
            },
            aqara_lock: {
                name: 'Aqara',
                hasModels: true,
                models: {
                    'Smart Lock U100 / U50': {
                        name: 'Smart Lock U100 / U50',
                        steps: ['Inspect Apple Home Key NFC sensor array.', 'Test Zigbee 3.0 / Matter radio communication.'],
                        tools: ['Phillips #2', 'Torx T10'],
                        commonIssues: ['NFC chip read delay', 'Matter bridge pairing timeout']
                    }
                }
            },
            switchbot_lock: {
                name: 'SwitchBot',
                hasModels: true,
                models: {
                    'Lock Pro / Smart Lock': {
                        name: 'Lock Pro / Smart Lock',
                        steps: ['Inspect universal thumbturn adapter clamp teeth.', 'Test ultra-strong adhesive backplate shear strength.'],
                        tools: ['Allen Key', '3M Adhesive Tape'],
                        commonIssues: ['Thumbturn slipping inside plastic adapter', 'Calibration offset after manual key turn']
                    }
                }
            },
            lockly: {
                name: 'Lockly',
                hasModels: true,
                models: {
                    'Vision Elite / Secure Pro': {
                        name: 'Vision Elite / Secure Pro',
                        steps: ['Inspect PIN Genie rotating algorithm touchscreen.', 'Test integrated HD video doorbell camera ribbon.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['PIN Genie screen dim', 'Camera battery draining deadbolt cell fast']
                    }
                }
            },
            wyze_lock: {
                name: 'Wyze',
                hasModels: true,
                models: {
                    'Lock Bolt / Wyze Lock': {
                        name: 'Lock Bolt / Wyze Lock',
                        steps: ['Inspect internal deadbolt motor encoder.', 'Test Bluetooth BLE antenna range.'],
                        tools: ['Phillips #2', 'Multimeter'],
                        commonIssues: ['Bluetooth connection range drop through metal door', 'Keypad disconnect']
                    }
                }
            },
            level_lock: {
                name: 'Level Home',
                hasModels: true,
                models: {
                    'Level Lock+ / Level Bolt (Invisible)': {
                        name: 'Level Lock+ / Level Bolt (Invisible)',
                        steps: ['Unscrew deadbolt bolt faceplate to replace hidden CR2 battery inside bolt core.', 'Inspect patented miniaturized brushless motor inside bore hole.'],
                        tools: ['Level Puzzle Tool / Phillips #1'],
                        commonIssues: ['Deadbolt motor struggles if door strike plate is off by even 1mm', 'CR2 battery hard to remove']
                    }
                }
            },
            nuki: {
                name: 'Nuki',
                hasModels: true,
                models: {
                    'Smart Lock 4.0 Pro (Matter over Thread)': {
                        name: 'Smart Lock 4.0 Pro (Matter over Thread)',
                        steps: ['Inspect Power Pack USB-C lithium accumulator.', 'Check key motor rotational adapter bracket.'],
                        tools: ['Hex Key', 'USB-C Cable'],
                        commonIssues: ['Key turned too stiffly for motor', 'Thread border router sync drop']
                    }
                }
            }
        }
    },
    soldering_iron: {
        name: 'Soldering Iron / Rework Station',
        icon: React.createElement(Flame, { className: "w-5 h-5 text-red-500" }),
        brands: {
            hakko: {
                name: 'Hakko',
                hasModels: true,
                models: {
                    'FX-888D Digital Station': {
                        name: 'FX-888D Digital Station',
                        steps: ['Measure heating element resistance across pins 1-2 (~12Ω) and sensor pins 3-4 (~1.2Ω).', 'Clean iron barrel ground spring contact.'],
                        tools: ['Multimeter', 'Brass Wool'],
                        commonIssues: ['5-E Error / Element or sensor open circuit', 'Temperature fluctuating wild']
                    },
                    'FR-301 Portable Desoldering Gun': {
                        name: 'FR-301 Portable Desoldering Gun',
                        steps: ['Clean solder collection chamber ceramic filter.', 'Clear suction nozzle orifice with clearing pin.'],
                        tools: ['Cleaning Pin', 'Silicone Grease'],
                        commonIssues: ['Loss of suction vacuum', 'Nozzle heater clog']
                    }
                }
            },
            weller: {
                name: 'Weller',
                hasModels: true,
                models: {
                    'WE1010NA / WT1010': {
                        name: 'WE1010NA / WT1010',
                        steps: ['Inspect WEP70 iron silicone cable strain relief.', 'Test tip-to-ground resistance (<2Ω for ESD).'],
                        tools: ['Multimeter', 'Hex Wrench'],
                        commonIssues: ['"S-E" Sensor error', 'Tip locking collar seized from heat oxidization']
                    }
                }
            },
            pine64: {
                name: 'Pine64 / Miniware',
                hasModels: true,
                models: {
                    'Pinecil V2 / TS101 Smart Iron': {
                        name: 'Pinecil V2 / TS101 Smart Iron',
                        steps: ['Inspect USB-C PD 3.1 / DC5525 power input negotiation.', 'Test cartridge tip thermocouple continuity.'],
                        tools: ['USB-C Power Meter', 'Precision Tweezers'],
                        commonIssues: ['"Thermal Runaway" or "Tip Error"', 'PD charger cycling power on cold tip']
                    }
                }
            },
            jbc: {
                name: 'JBC Tools',
                hasModels: true,
                models: {
                    'CD-2BQF Advanced Precision Station': {
                        name: 'CD-2BQF Advanced Precision Station',
                        steps: ['Inspect C245 / C210 cartridge quick-change socket pogo pins.', 'Test instant sleep & hibernation stand optical microswitch.'],
                        tools: ['JBC Cartridge Extractor', 'Multimeter'],
                        commonIssues: ['Cartridge not detected', 'Stand sensor fails to enter sleep mode']
                    }
                }
            },
            quick_soldering: {
                name: 'Quick',
                hasModels: true,
                models: {
                    '861DW ESD Hot Air Rework': {
                        name: '861DW ESD Hot Air Rework',
                        steps: ['Inspect magnetic reed switch in handpiece handle.', 'Test ceramic heating coil element resistance.'],
                        tools: ['Multimeter', 'Phillips #2'],
                        commonIssues: ['Fan running at full speed cold', 'Error code S-E in display']
                    }
                }
            },
            atten: {
                name: 'Atten',
                hasModels: true,
                models: {
                    'ST-862D Hot Air / MS-900 Station': {
                        name: 'ST-862D Hot Air / MS-900 Station',
                        steps: ['Inspect turbine blower motor bearing.', 'Check thermocouple junction.'],
                        tools: ['Multimeter', 'Lubricating Oil'],
                        commonIssues: ['Airflow turbine rattle noise', 'Heating element burned out']
                    }
                }
            },
            yihua: {
                name: 'Yihua',
                hasModels: true,
                models: {
                    '853D / 936B 3-in-1 Station': {
                        name: '853D / 936B 3-in-1 Station',
                        steps: ['Inspect diaphragm air pump rubber bellows.', 'Check analog temperature calibration trimpot.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Diaphragm pump vibration hum', 'Heater ceramic core fractured']
                    }
                }
            },
            ksger: {
                name: 'KSGER',
                hasModels: true,
                models: {
                    'T12 STM32 OLED Soldering Station': {
                        name: 'T12 STM32 OLED Soldering Station',
                        steps: ['Inspect GX12-5 aviation socket wiring and vibration wake ball switch in handle.', 'Check 24V switching power supply electrolytic capacitor.'],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['"ERROR" blinking on OLED', 'Handle vibration shake-to-wake not triggering']
                    }
                }
            },
            aoyue: {
                name: 'Aoyue',
                hasModels: true,
                models: {
                    '968A+ SMD Rework Station': {
                        name: '968A+ SMD Rework Station',
                        steps: ['Clean integrated smoke absorber vacuum filter.', 'Test heating core continuity.'],
                        tools: ['Filter Sponge', 'Multimeter'],
                        commonIssues: ['Smoke absorber vacuum drop', 'Iron fails to heat above 200°C']
                    }
                }
            },
            ersa: {
                name: 'Ersa',
                hasModels: true,
                models: {
                    'i-CON NANO / Digital 2000 A': {
                        name: 'i-CON NANO / Digital 2000 A',
                        steps: ['Inspect i-Tool heating element sensor leads.', 'Calibrate standby temperature standby parameters via SD card.'],
                        tools: ['Ersa Tool Key', 'Multimeter'],
                        commonIssues: ['Calibration parameter reset', 'Element connector pins oxidization']
                    }
                }
            }
        }
    },
    soundbar: {
        name: 'Soundbar',
        icon: React.createElement(Volume2, { className: "w-5 h-5 text-indigo-500" }),
        brands: {
            samsung: {
                name: 'Samsung',
                hasModels: true,
                models: {
                    'HW-Q990C 11.1.4ch': {
                        name: 'HW-Q990C 11.1.4ch',
                        steps: ['Check wireless subwoofer pairing button ID SET.', 'Inspect HDMI eARC CEC IC chip.'],
                        tools: ['Multimeter'],
                        commonIssues: ['Subwoofer blue light flashing / Unpaired', 'No eARC TV audio sync']
                    },
                    'HW-B550 / HW-S60B': {
                        name: 'HW-B550 / HW-S60B',
                        steps: ['Inspect optical input port shutter door flap.', 'Test DC power input barrel jack.'],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['Optical audio jack door snapped', 'Auto-power off cutting off dialogue']
                    }
                }
            },
            sonos_sb: {
                name: 'Sonos',
                hasModels: true,
                models: {
                    'Arc / Arc SL Dolby Atmos': {
                        name: 'Arc / Arc SL Dolby Atmos',
                        steps: ['Inspect HDMI eARC interface PHY chip and TV eARC handshake.', 'Test internal Class-D multichannel amplifier modules and power supply board capacitors.'],
                        tools: ['Torx T10 / T15', 'Multimeter', 'Plastic Spudger'],
                        commonIssues: ['Sonos pop sound / audio dropout over eARC', 'Flashing white status LED boot loop', 'Touch controls unresponsive']
                    },
                    'Beam Gen 2 / Ray': {
                        name: 'Beam Gen 2 / Ray',
                        steps: ['Inspect side-firing speaker cones and center tweeter voice coil.', 'Test internal Wi-Fi/Ethernet network daughtercard.'],
                        tools: ['Torx T8', 'Multimeter'],
                        commonIssues: ['Audio out of sync with TV video', 'No sound over optical audio adapter']
                    }
                }
            },
            bose_sb: {
                name: 'Bose',
                hasModels: true,
                models: {
                    'Smart Ultra Soundbar / Smart Soundbar 600': {
                        name: 'Smart Ultra Soundbar / Smart Soundbar 600',
                        steps: ['Inspect upward-firing PhaseGuide transducer wiring.', 'Test ADAPTiQ calibration microphone jack.'],
                        tools: ['Torx T9', 'Multimeter'],
                        commonIssues: ['Red blinking error light (firmware recovery mode)', 'Bass module wireless sync disconnect']
                    }
                }
            },
            sony_sb: {
                name: 'Sony',
                hasModels: true,
                models: {
                    'HT-A7000 / HT-A5000 360 Spatial': {
                        name: 'HT-A7000 / HT-A5000 360 Spatial',
                        steps: ['Inspect dual HDMI 2.1 pass-through switch ICs.', 'Test Acoustic Center Sync 3.5mm link to Bravia TV.'],
                        tools: ['JIS Screwdriver', 'Multimeter'],
                        commonIssues: ['HDMI 2.1 4K 120Hz black screen passthrough', 'Wireless rear speaker static noise']
                    }
                }
            },
            jbl_sb: {
                name: 'JBL',
                hasModels: true,
                models: {
                    'Bar 1300X / Bar 1000 (Detachable Rears)': {
                        name: 'Bar 1300X / Bar 1000 (Detachable Rears)',
                        steps: ['Clean pogo charging pins on soundbar ends and detachable rear speaker docks.', 'Test lithium battery pack in detachable wireless speakers.'],
                        tools: ['Contact Cleaner', 'Precision Screwdrivers'],
                        commonIssues: ['Detachable speakers not charging when docked', 'Rear surround sound dropping randomly']
                    }
                }
            },
            lg_sb: {
                name: 'LG',
                hasModels: true,
                models: {
                    'S95QR 9.1.5ch / SC9S': {
                        name: 'S95QR 9.1.5ch / SC9S',
                        steps: ['Inspect center upward-firing channel amplifier.', 'Test WOW Orchestra wireless synergy link.'],
                        tools: ['Phillips #2', 'Multimeter'],
                        commonIssues: ['Subwoofer red LED solid / Pair button fail', 'eARC muting on PCM 5.1 input']
                    }
                }
            },
            vizio_sb: {
                name: 'Vizio',
                hasModels: true,
                models: {
                    'Elevate M-Series / V-Series 5.1': {
                        name: 'Elevate M-Series / V-Series 5.1',
                        steps: ['Inspect motorized rotating auto-rotating height speakers and gear drive.', 'Test 24V external power adapter output voltage under load.'],
                        tools: ['Multimeter', 'Phillips Screwdriver'],
                        commonIssues: ['Rotating speaker sides stuck at 45 degree angle', 'Subwoofer humming / ground loop buzz']
                    }
                }
            },
            yamaha_sb: {
                name: 'Yamaha',
                hasModels: true,
                models: {
                    'SR-B20A / True X Bar 50A': {
                        name: 'SR-B20A / True X Bar 50A',
                        steps: ['Inspect built-in dual subwoofers spider and cone.', 'Test Clear Voice DSP processor IC.'],
                        tools: ['Phillips #2', 'Multimeter'],
                        commonIssues: ['Soundbar turns off automatically after 20 minutes', 'Muffled bass rattle on low frequency']
                    }
                }
            },
            sennheiser_sb: {
                name: 'Sennheiser',
                hasModels: true,
                models: {
                    'AMBEO Soundbar Max / Plus': {
                        name: 'AMBEO Soundbar Max / Plus',
                        steps: ['Inspect 13 high-end drivers and Class D 500W SMPS board.', 'Verify calibration mic measurement circuit.'],
                        tools: ['Torx T10 / T15', 'Multimeter'],
                        commonIssues: ['Thermal fan hum inside AMBEO Max chassis', 'Soundbar stuck in "Booting" status']
                    }
                }
            },
            denon_sb: {
                name: 'Denon',
                hasModels: true,
                models: {
                    'DHT-S517 / Home Sound Bar 550': {
                        name: 'DHT-S517 / Home Sound Bar 550',
                        steps: ['Inspect HEOS multi-room streaming PCB.', 'Test wireless subwoofer RF transmitter.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Subwoofer fails to link automatically', 'Optical audio volume fixed / non-responsive']
                    }
                }
            },
            klipsch_sb: {
                name: 'Klipsch',
                hasModels: true,
                models: {
                    'Cinema 800 / Cinema 1200': {
                        name: 'Cinema 800 / Cinema 1200',
                        steps: ['Inspect power supply internal fuse and standby transformer.', 'Test Tractrix horn loaded tweeters.'],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['Power supply completely dead / No standby red light (known capacitor issue)', 'Subwoofer crackling']
                    }
                }
            },
            polk_sb: {
                name: 'Polk Audio',
                hasModels: true,
                models: {
                    'MagniFi Max AX SR / Signa S4': {
                        name: 'MagniFi Max AX SR / Signa S4',
                        steps: ['Inspect VoiceAdjust center driver matrix.', 'Test 10" wireless down-firing subwoofer amplifier board.'],
                        tools: ['Phillips #2', 'Multimeter'],
                        commonIssues: ['Wireless subwoofer intermittent thumping', 'HDMI pass-through HDCP error']
                    }
                }
            },
            roku_sb: {
                name: 'Roku',
                hasModels: true,
                models: {
                    'Streambar Pro / Streambar': {
                        name: 'Streambar Pro / Streambar',
                        steps: ['Inspect built-in Roku streaming player processor and thermal pad.', 'Test Voice Remote Pro pairing button.'],
                        tools: ['Torx T8', 'Multimeter'],
                        commonIssues: ['Overheating warning banner on TV', 'Remote control disconnects frequently']
                    }
                }
            }
        }
    },
    space_heater: {
        name: 'Space Heater (Ceramic / Infrared / Oil-Filled)',
        icon: React.createElement(Flame, { className: "w-5 h-5 text-orange-500" }),
        brands: {
            delonghi: {
                name: 'De\'Longhi (Dragon4 / Radia S)',
                hasModels: true,
                models: {
                    'Dragon4 / Radia S 1500W Oil-Filled Radiator': {
                        name: 'Dragon4 / Radia S 1500W Oil-Filled Radiator',
                        steps: ['Inspect mechanical weighted anti-tip ball tip-over switch.', 'Test thermal safety cut-off fuse attached to lower fin assembly.', 'Check dual rocker power switches (700W / 800W / 1500W combined) for melted terminal spade connectors.'],
                        tools: ['Multimeter', 'Phillips Screwdriver', 'High-Temp Spade Terminals'],
                        commonIssues: ['Unit dead / Melted plastic on power switch spade terminal', 'Will not turn on when placed upright (bent tip-over lever)', 'Thermostat clicks but no heat output']
                    }
                }
            },
            dyson_heater: {
                name: 'Dyson Hot + Cool',
                hasModels: true,
                models: {
                    'Pure Hot + Cool HP07 / AM09 Fan Heater': {
                        name: 'Pure Hot + Cool HP07 / AM09 Fan Heater',
                        steps: ['Inspect PTC ceramic heating stones inside annular loop amplifier.', 'Inspect motorized oscillation base gearbox pinion teeth.', 'Test brushless DC fan motor and ambient temperature sensor thermistor.'],
                        tools: ['Torx T8 / T9', 'Multimeter', 'Plastic Spudger'],
                        commonIssues: ['H2 error code (heating element thermal cut-off tripped)', 'Grinding squeaking noise during 350-degree oscillation', 'Tilt error code on circular display']
                    }
                }
            },
            lasko: {
                name: 'Lasko',
                hasModels: true,
                models: {
                    'Ceramic Oscillating Tower Heater 755320 / 5307': {
                        name: 'Ceramic Oscillating Tower Heater 755320 / 5307',
                        steps: ['Clean dust from squirrel-cage blower fan wheel and intake screen.', 'Test positive temperature coefficient (PTC) ceramic heating block.', 'Inspect oscillation motor synchronous gear.'],
                        tools: ['Long Phillips Screwdriver', 'Vacuum Brush', 'Multimeter'],
                        commonIssues: ['Heater shuts off after 2 minutes (overheat safety sensor clogged with carpet lint)', 'Remote control sensor unresponsive', 'Oscillation motor groaning']
                    }
                }
            },
            vornado_heater: {
                name: 'Vornado',
                hasModels: true,
                models: {
                    'VH200 / Velocity 3R Whole Room Heater': {
                        name: 'VH200 / Velocity 3R Whole Room Heater',
                        steps: ['Inspect deep-pitch vortex blower fan blades for hair tangles.', 'Test automatic tip-over toggle switch in base pedestal.', 'Inspect inlet air temperature thermistor probe.'],
                        tools: ['Phillips Screwdriver', 'Multimeter', 'Tweezers'],
                        commonIssues: ['Fan runs continuously on high speed / Thermostat stuck closed', 'Tip-over safety switch sticks down on high-pile carpets']
                    }
                }
            },
            dr_infrared: {
                name: 'Dr. Infrared Heater',
                hasModels: true,
                models: {
                    'DR-968 1500W Dual Heating System': {
                        name: 'DR-968 1500W Dual Heating System',
                        steps: ['Inspect quartz infrared tube heating bulbs and PTC ceramic element.', 'Test 7" ultra-quiet squirrel cage blower fan.', 'Check digital push-button thermostat control board.'],
                        tools: ['Phillips Screwdriver', 'Multimeter', 'Replacement Quartz Tube'],
                        commonIssues: ['One quartz tube burned out / Cold draft from vent', 'E1 Overheat error code / Air filter clogged']
                    }
                }
            },
            dreo_heater: {
                name: 'Dreo',
                hasModels: true,
                models: {
                    'Solaris Max / Atom One 1500W PTC Tower': {
                        name: 'Solaris Max / Atom One 1500W PTC Tower',
                        steps: ['Inspect Hyperamics fast PTC heating element.', 'Test smart capacitive touch control board and tilt gyro sensor.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['Beeping 3 times and powering down (tilt gyro sensor false alarm)', 'Blower fan vibration']
                    }
                }
            }
        }
    },
    steam_mop: {
        name: 'Steam Mop / Hard Floor Steam Cleaner',
        icon: React.createElement(Wind, { className: "w-5 h-5 text-teal-400" }),
        brands: {
            shark: {
                name: 'Shark Steam Cleaners',
                hasModels: true,
                models: {
                    'Steam Pocket Mop S3501 / Genius S5003D / Steam & Scrub S7001': {
                        name: 'Steam Pocket Mop S3501 / Genius S5003D / Steam & Scrub S7001',
                        steps: [
                            'Descale 1200W aluminum boiler pump nozzle with 50/50 white vinegar flush and acupuncture needle probe.',
                            'Inspect rotary rotating scrubber pad dual motor drive gear train on S7001.',
                            'Test mechanical manual pump stroke piston silicone one-way umbrella check-valve on S3501.',
                            'Inspect electric solenoid pump diaphragm on intelligent steam control models.'
                        ],
                        tools: ['Fine Needle Probe', 'White Vinegar / Descaler', 'Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['No steam generation despite full water tank (calcium scale clogged boiler jet)', 'Pump hums or chatters loudly without drawing water (vapor lock in supply line)', 'Water leaking from bottom joint onto floor']
                    }
                }
            },
            bissell_steam: {
                name: 'BISSELL',
                hasModels: true,
                models: {
                    'PowerFresh Steam Mop 1940 / Symphony 1132A': {
                        name: 'PowerFresh Steam Mop 1940 / Symphony 1132A',
                        steps: ['Inspect internal water filter cartridge beads (change when color shifts from blue to green).', 'Test smart steam control PCB high/med/low solenoid valve.', 'Descale brass steam distributor bar in foot base.'],
                        tools: ['Phillips Screwdriver', 'Multimeter', 'Replacement Water Filter'],
                        commonIssues: ['Blue steam indicator lights flash but unit never produces steam (calcified solenoid valve)', 'Water tank cap valve seal split']
                    }
                }
            },
            karcher_steam: {
                name: 'Kärcher',
                hasModels: true,
                models: {
                    'SC 3 EasyFix Upright Steam Cleaner': {
                        name: 'SC 3 EasyFix Upright Steam Cleaner',
                        steps: ['Replace descaling cartridge (automatic calcification prevention).', 'Inspect floor nozzle flexible slat hinge joint.', 'Test continuous-fill high pressure boiler.'],
                        tools: ['Torx Screwdrivers', 'Replacement Descaler Cartridge'],
                        commonIssues: ['Red descaling indicator LED illuminated', 'Steam escaping from pressure relief safety cap']
                    }
                }
            },
            pursteam: {
                name: 'PurSteam',
                hasModels: true,
                models: {
                    '10-in-1 Steam Mop with Detachable Handheld ThermaPro 211': {
                        name: '10-in-1 Steam Mop with Detachable Handheld ThermaPro 211',
                        steps: ['Inspect detachable handheld boiler latch electrical interlock.', 'Test variable steam rotary rheostat control dial.'],
                        tools: ['Small Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Handheld unit won’t latch into upright floor base', 'Steam output weak']
                    }
                }
            },
            black_decker_steam: {
                name: 'BLACK+DECKER',
                hasModels: true,
                models: {
                    '7-in-1 Steam Mop with Handheld Cleaner BHSM168U': {
                        name: '7-in-1 Steam Mop with Handheld Cleaner BHSM168U',
                        steps: ['Inspect SmartSelect variable floor dial microswitch.', 'Descale delta steam head nozzles.'],
                        tools: ['Phillips Screwdriver', 'Descaling Solution'],
                        commonIssues: ['Floor dial setting does not alter steam volume', 'Water reservoir leaking at inlet grommet']
                    }
                }
            }
        }
    },
    stereo: {
        name: 'Stereo',
        icon: React.createElement(Radio, { className: "w-5 h-5 text-stone-700" }),
        brands: {
            sony: {
                name: 'Sony',
                hasModels: true,
                models: {
                    'MHC-GX450 Hi-Fi Component': {
                        name: 'MHC-GX450 Hi-Fi Component',
                        steps: ['Replace 3-disc carousel optical gear belt.', 'Check power amplifier STK IC solder joints.'],
                        tools: ['Soldering Iron', 'Replacement Belt'],
                        commonIssues: ['EJECT error on CD changer', 'Push Power Protect Code']
                    }
                }
            }
        }
    },
    tablet: {
        name: 'Tablet',
        icon: React.createElement(Tablet, { className: "w-5 h-5 text-blue-500" }),
        brands: {
            apple_ipad: {
                name: 'Apple iPad',
                hasModels: true,
                models: {
                    'iPad Pro 11" / 12.9" M2/M4': {
                        name: 'iPad Pro 11" / 12.9" M2/M4',
                        steps: [
                            'Heat perimeter glass to 75°C and carefully slice foam adhesive.',
                            'Disconnect battery screw before unplugging digitizer and OLED/Liquid Retina XDR flex cables.',
                            'Test Tristar / CD3217 / Thunderbolt USB-C charging IC diode mode values.'
                        ],
                        tools: ['iOpener Heat Pad', 'Plastic Opening Cards', 'Phillips #000 Screwdriver', 'Multimeter'],
                        commonIssues: ['Cracked digitizer glass', 'Not charging / Stuck at 0%', 'Apple logo boot loop', 'Face ID sensor damaged by liquid']
                    },
                    'iPad Air / Mini 6': {
                        name: 'iPad Air / Mini 6',
                        steps: ['Inspect Touch ID top button flex ribbon.', 'Test USB-C charging port board daughterboard.'],
                        tools: ['Heat Mat', 'Spudger', 'Torx T3'],
                        commonIssues: ['Jelly scroll visual distortion', 'Battery degradation below 80%']
                    }
                }
            },
            samsung_tab: {
                name: 'Samsung Galaxy Tab',
                hasModels: true,
                models: {
                    'Galaxy Tab S8 / S9 / S9 Ultra': {
                        name: 'Galaxy Tab S8 / S9 / S9 Ultra',
                        steps: ['Inspect AMOLED screen flex ribbon under bezel.', 'Test USB-C sub-board connector.', 'Check magnetic S-Pen charging coil on rear plate.'],
                        tools: ['Heat Gun', 'Spudger Set', 'Multimeter'],
                        commonIssues: ['Display flicker / Green line', 'S-Pen gesture delay', 'Moisture detected in charging port error']
                    },
                    'Galaxy Tab A8 / A9+': {
                        name: 'Galaxy Tab A8 / A9+',
                        steps: ['Inspect separate glass digitizer and TFT LCD panel connectors.', 'Test micro-USB / USB-C socket.'],
                        tools: ['Plastic Picks', 'Soldering Iron'],
                        commonIssues: ['Touch digitizer ghost touching', 'Broken charging port pins']
                    }
                }
            },
            microsoft_surface: {
                name: 'Microsoft Surface',
                hasModels: true,
                models: {
                    'Surface Pro 8 / 9 / 10': {
                        name: 'Surface Pro 8 / 9 / 10',
                        steps: ['Remove magnetic SSD access door.', 'Heat display edge to separate adhesive and disconnect fragile display ribbon cables.'],
                        tools: ['Heat Mat (75°C)', 'Display Opening Tool', 'Torx Plus 3IP / 4IP'],
                        commonIssues: ['Swollen battery lifting display glass', 'Surface Connect port sparking / Loose connection', 'Thermal throttling fan noise']
                    }
                }
            },
            lenovo_tab: {
                name: 'Lenovo Tab',
                hasModels: true,
                models: {
                    'Tab P11 Pro / Tab P12': {
                        name: 'Tab P11 Pro / Tab P12',
                        steps: ['Inspect 4-point pogo keyboard dock pins.', 'Test dual-cell lithium battery balanced charging circuit.'],
                        tools: ['Spudger', 'Multimeter'],
                        commonIssues: ['Keyboard folio won’t register', 'Rapid battery discharge while sleeping']
                    }
                }
            },
            amazon_fire: {
                name: 'Amazon Fire Tablet',
                hasModels: true,
                models: {
                    'Fire HD 10 / Fire Max 11': {
                        name: 'Fire HD 10 / Fire Max 11',
                        steps: ['Pop rear plastic snap-fit clips using guitar pick.', 'Test surface-mount USB-C jack solder joints on mainboard.'],
                        tools: ['Plastic Guitar Picks', 'Soldering Iron', 'Flux'],
                        commonIssues: ['Loose USB-C charging port (broken solder pins)', 'Bootloop on Fire OS logo']
                    }
                }
            },
            google_pixel_tab: {
                name: 'Google Pixel Tablet',
                hasModels: true,
                models: {
                    'Pixel Tablet with Speaker Dock': {
                        name: 'Pixel Tablet with Speaker Dock',
                        steps: ['Inspect rear 4-pin magnetic dock connector pins.', 'Test Speaker Dock 24V power supply.'],
                        tools: ['Multimeter', 'Plastic Spudger'],
                        commonIssues: ['Speaker dock does not initiate Hub Mode', 'Tablet won’t charge via dock pins']
                    }
                }
            },
            xiaomi_pad: {
                name: 'Xiaomi Pad',
                hasModels: true,
                models: {
                    'Xiaomi Pad 6 / 6S Pro': {
                        name: 'Xiaomi Pad 6 / 6S Pro',
                        steps: ['Inspect 144Hz IPS display panel ribbon.', 'Test 67W/120W fast charging sub-board.'],
                        tools: ['Heat Gun', 'Multimeter'],
                        commonIssues: ['Fast charging drops to standard 5W', 'Smart Pen wireless charging coil fault']
                    }
                }
            },
            oneplus_pad: {
                name: 'OnePlus Pad',
                hasModels: true,
                models: {
                    'OnePlus Pad / Pad Go': {
                        name: 'OnePlus Pad / Pad Go',
                        steps: ['Inspect 7:5 ratio display assembly.', 'Test 67W SuperVOOC power rail.'],
                        tools: ['Plastic Pry Tool', 'Multimeter'],
                        commonIssues: ['Touch delay along top edge', 'Magnetic keyboard connection drops']
                    }
                }
            },
            huawei_tab: {
                name: 'Huawei MatePad',
                hasModels: true,
                models: {
                    'MatePad Pro 13.2 / 11': {
                        name: 'MatePad Pro 13.2 / 11',
                        steps: ['Inspect flexible OLED display matrix.', 'Test NearLink stylus antenna coupling.'],
                        tools: ['Curved Spudger', 'Precision Tweezers'],
                        commonIssues: ['M-Pencil latency', 'Battery health error in HarmonyOS']
                    }
                }
            },
            wacom: {
                name: 'Wacom',
                hasModels: true,
                models: {
                    'Cintiq Pro 16 / 27': {
                        name: 'Cintiq Pro 16 / 27',
                        steps: ['Inspect EMR electromagnetic resonance digitizer loop sensor board.', 'Check internal fan PWM controller.'],
                        tools: ['Torx T8', 'Multimeter'],
                        commonIssues: ['Pen pressure curve stuck at 100%', 'Display flickering over DisplayPort / USB-C']
                    }
                }
            },
            remarkable: {
                name: 'reMarkable',
                hasModels: true,
                models: {
                    'reMarkable 2 E-Paper': {
                        name: 'reMarkable 2 E-Paper',
                        steps: ['Inspect CANVAS E-Ink display ribbon connector.', 'Test ultra-thin 3000mAh battery cell.'],
                        tools: ['Precision Opening Cards', 'Multimeter'],
                        commonIssues: ['Marker nib sensor offset calibration', 'Device frozen on "reMarkable is sleeping"']
                    }
                }
            }
        }
    },
    toaster_oven: {
        name: 'Toaster Oven / Countertop Convection Oven',
        icon: React.createElement(Flame, { className: "w-5 h-5 text-amber-500" }),
        brands: {
            breville: {
                name: 'Breville (Smart Oven Series)',
                hasModels: true,
                models: {
                    'Smart Oven Pro / Air Fryer Pro (BOV845 / BOV900)': {
                        name: 'Smart Oven Pro / Air Fryer Pro (BOV845 / BOV900)',
                        steps: ['Test top and bottom smart quartz element tube resistance (~25Ω to 32Ω).', 'Replace degraded NTC glass bead temperature probe thermistor mounted in chassis wall.', 'Inspect door closure microswitch arm and thermal ceramic fuse (216°C).', 'Clean dual-speed convection fan motor shaft.'],
                        tools: ['Multimeter', 'Screwdrivers', 'Replacement NTC Thermistor', 'Torx T10'],
                        commonIssues: ['E01 Temperature Sensor Error (open circuit on NTC thermistor probe)', 'Top heating elements remain unlit while bottom glows', 'LCD backlight flashing / Convection fan squeaking']
                    }
                }
            },
            cuisinart_oven: {
                name: 'Cuisinart',
                hasModels: true,
                models: {
                    'Air Fryer + Convection Toaster Oven TOA-60 / TOA-70': {
                        name: 'Air Fryer + Convection Toaster Oven TOA-60 / TOA-70',
                        steps: ['Inspect mechanical rotary timer bell switch contacts for carbon pitting.', 'Test 1800W calrod heating elements.', 'Inspect dual-spring door hinge mechanism.'],
                        tools: ['Phillips Screwdriver', 'Multimeter', 'Contact Cleaner'],
                        commonIssues: ['Timer ticks down but does not turn on heaters (scorched contact leaf in timer)', 'Uneven browning / Air fry fan vibrating loudly']
                    }
                }
            },
            ninja_oven: {
                name: 'Ninja',
                hasModels: true,
                models: {
                    'Foodi 8-in-1 Flip-Away Oven SP101 / Double Oven DCT401': {
                        name: 'Foodi 8-in-1 Flip-Away Oven SP101 / Double Oven DCT401',
                        steps: ['Inspect flip-up safety interlock tilt switch inside hinge pivot.', 'Clean grease accumulation from high-velocity convection fan cage.', 'Test ceramic infrared heating elements.'],
                        tools: ['Torx T15', 'Degreaser', 'Multimeter'],
                        commonIssues: ['Display shows "FLIP" error and won’t heat when placed flat', 'Smoke escaping from upper seals due to grease bake-on']
                    }
                }
            },
            panasonic_oven: {
                name: 'Panasonic',
                hasModels: true,
                models: {
                    'FlashXpress Compact Double Infrared NB-G110P': {
                        name: 'FlashXpress Compact Double Infrared NB-G110P',
                        steps: ['Inspect near-infrared and far-infrared quartz heater tubes.', 'Test electronic touch pushbuttons on membrane keypad.', 'Check door roll-out tray linkage arms.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Bottom quartz tube cracked or not heating', 'Toasting shade cycle stops prematurely']
                    }
                }
            },
            black_decker_oven: {
                name: 'BLACK+DECKER',
                hasModels: true,
                models: {
                    'Crisp \'N Bake Air Fry Convection Oven TO3215SSD': {
                        name: 'Crisp \'N Bake Air Fry Convection Oven TO3215SSD',
                        steps: ['Inspect mechanical 60-minute stay-on timer dial.', 'Test 1500W heating element continuity.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Timer dial knob cracked or spinning freely on shaft', 'Bottom element cold']
                    }
                }
            },
            oster_oven: {
                name: 'Oster',
                hasModels: true,
                models: {
                    'French Door Convection Countertop Oven TSSTTVFDDG': {
                        name: 'French Door Convection Countertop Oven TSSTTVFDDG',
                        steps: ['Inspect synchronized French door gear linkage behind lower threshold.', 'Test turbo convection fan motor and turbo switch.'],
                        tools: ['Phillips Screwdriver', 'High-Temp Food Grade Grease'],
                        commonIssues: ['One french door does not open when pulling the other (linkage arm popped off gear)', 'Door gasket sag']
                    }
                }
            },
            hamilton_beach_oven: {
                name: 'Hamilton Beach',
                hasModels: true,
                models: {
                    'Easy Reach Roll-Top Door 31127D': {
                        name: 'Easy Reach Roll-Top Door 31127D',
                        steps: ['Inspect roll-top curved glass door track glides and return spring.', 'Test bake/broil selector switch.'],
                        tools: ['Phillips Screwdriver', 'Silicone Lubricant'],
                        commonIssues: ['Roll-top glass door sticking or falling off track', 'Bake element cold']
                    }
                }
            },
            wolf_gourmet: {
                name: 'Wolf Gourmet',
                hasModels: true,
                models: {
                    'Countertop Oven with Convection WGCO100S': {
                        name: 'Countertop Oven with Convection WGCO100S',
                        steps: ['Inspect commercial-grade integrated temperature probe jack.', 'Test dual-convection high CFM fan motors and perimeter silicone door seal.'],
                        tools: ['Torx T10 / T15', 'Multimeter'],
                        commonIssues: ['Probe temperature read error', 'Red Wolf signature knob friction ring worn']
                    }
                }
            }
        }
    },
    tv_television: {
        name: 'TV (Television)',
        icon: React.createElement(Tv, { className: "w-5 h-5 text-blue-600" }),
        brands: {
            samsung: {
                name: 'Samsung',
                hasModels: true,
                models: {
                    '55" Crystal UHD TU8000 / AU8000': {
                        name: '55" Crystal UHD TU8000 / AU8000',
                        steps: [
                            'Check power board (PSU) standby 13V output rail to mainboard.',
                            'Perform panel cut tape trick on T-CON / COF ribbons to isolate shorted display glass gate lines.',
                            'Test LED backlight strips with LED TV backlight tester (3V or 6V LEDs).'
                        ],
                        tools: ['Multimeter', 'LED Backlight Tester', 'Kapton Tape', 'Suction Cups'],
                        commonIssues: ['Restart loop / Backlight flashes every 2 seconds', 'No picture / Sound working (Blown LED backlights)', 'Half screen dark or distorted horizontal lines']
                    },
                    'Neo QLED 4K QN90B': {
                        name: 'Neo QLED 4K QN90B',
                        steps: ['Check One Connect box cable connection.', 'Inspect Mini-LED local dimming driver voltages.'],
                        tools: ['Multimeter', 'Torx Screwdrivers'],
                        commonIssues: ['One Connect cable not detected', 'Dimming zone flickering']
                    }
                }
            },
            lg: {
                name: 'LG',
                hasModels: true,
                models: {
                    'OLED55C1 / OLED55C2 4K TV': {
                        name: 'OLED55C1 / OLED55C2 4K TV',
                        steps: ['Inspect mainboard optical output and HDMI eARC ports.', 'Check power supply relay click-off error codes.'],
                        tools: ['Multimeter', 'Oscilloscope'],
                        commonIssues: ['Relay clicks on then off instantly', 'Horizontal bright line across screen']
                    },
                    '4K UHD NanoCell 55NANO75': {
                        name: '4K UHD NanoCell 55NANO75',
                        steps: ['Test edge-lit backlight array strips.', 'Inspect T-Con ribbon cable seats.'],
                        tools: ['LED Backlight Tester', 'Multimeter'],
                        commonIssues: ['Blue screen tint due to degraded phosphor', 'Half screen dark']
                    }
                }
            },
            sony: {
                name: 'Sony Bravia',
                hasModels: true,
                models: {
                    'Bravia XR A80K / X90K': {
                        name: 'Bravia XR A80K / X90K',
                        steps: [
                            'Count red LED standby blink codes (4 blinks = Backlight/Inverter fault, 6 blinks = Panel/Mainboard failure).',
                            'Inspect T-CON board SMD fuse continuity.',
                            'Check main power supply standby 3.3V and 12V rails.'
                        ],
                        tools: ['Multimeter', 'Microscope', 'Plastic Pry Tools'],
                        commonIssues: ['Red light blinks 4 times', 'Red light blinks 6 times', 'Sound works but no picture']
                    }
                }
            },
            tcl: {
                name: 'TCL',
                hasModels: true,
                models: {
                    '6-Series Mini-LED Roku / Google TV': {
                        name: '6-Series Mini-LED Roku / Google TV',
                        steps: ['Check eMMC flash memory for firmware crash.', 'Test power board diode bridge and main filter caps.'],
                        tools: ['Multimeter', 'Screwdriver Set', 'Flash Programmer'],
                        commonIssues: ['Stuck in bootloop on TCL logo', 'Screen turns on with sound but no display']
                    }
                }
            },
            hisense: {
                name: 'Hisense',
                hasModels: true,
                models: {
                    '55A6H 4K Smart TV': {
                        name: '55A6H 4K Smart TV',
                        steps: ['Inspect mainboard eMMC flash IC for bootloop corruption.', 'Test LED backlight array voltages.'],
                        tools: ['Multimeter', 'Backlight Tester'],
                        commonIssues: ['Stuck on Hisense logo screen', 'Blueish screen tint']
                    },
                    'U7H / U8H Quantum ULED': {
                        name: 'U7H / U8H Quantum ULED',
                        steps: ['Test local dimming zones.', 'Check 120Hz T-Con timing controller voltage.'],
                        tools: ['Multimeter', 'Oscilloscope'],
                        commonIssues: ['Ghosting / Vertical color banding', 'No signal on HDMI 2.1 ports']
                    }
                }
            },
            philips: {
                name: 'Philips TV',
                hasModels: true,
                models: {
                    'Ambilight The One 4K LED': {
                        name: 'Ambilight The One 4K LED',
                        steps: ['Test Ambilight LED rear strip ribbon connectors.', 'Check power supply standby circuitry.'],
                        tools: ['Multimeter', 'Screwdriver Set'],
                        commonIssues: ['Ambilight rear LEDs dead or mismatched colors', 'Red standby light blinking 2 times']
                    }
                }
            },
            panasonic: {
                name: 'Panasonic',
                hasModels: true,
                models: {
                    'Viera 4K Pro OLED / LED': {
                        name: 'Viera 4K Pro OLED / LED',
                        steps: ['Count power LED blink error code sequence.', 'Inspect A-board and P-board ribbon interlinks.'],
                        tools: ['Multimeter', 'JIS Screwdrivers'],
                        commonIssues: ['10-blink SOS power shutoff code', 'Power supply board capacitor failure']
                    }
                }
            },
            sharp: {
                name: 'Sharp Aquos',
                hasModels: true,
                models: {
                    'Aquos 4K Android TV': {
                        name: 'Aquos 4K Android TV',
                        steps: ['Perform Sharp factory service mode reset via Vol- and Input key combination.', 'Test LED driver invertor IC.'],
                        tools: ['Remote Controller', 'Multimeter'],
                        commonIssues: ['Power LED flashes alternating green and red (Backlight error lock)', 'Display won’t turn on']
                    }
                }
            },
            vizio: {
                name: 'Vizio',
                hasModels: true,
                models: {
                    'M-Series Quantum 4K HDR': {
                        name: 'M-Series Quantum 4K HDR',
                        steps: ['Test voltage regulator ICs on mainboard.', 'Check standby 5V and 12V rails from power supply.'],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['White power light fades away with no display', 'Lines on screen / T-Con failure']
                    }
                }
            },
            toshiba: {
                name: 'Toshiba TV',
                hasModels: true,
                models: {
                    'Toshiba Fire TV Smart UHD': {
                        name: 'Toshiba Fire TV Smart UHD',
                        steps: ['Reset Fire TV OS cache.', 'Test mainboard LVDS cable connection.'],
                        tools: ['Multimeter', 'Phillips Screwdrivers'],
                        commonIssues: ['Stuck on Fire TV logo screen', 'Backlight on with black screen']
                    }
                }
            },
            jvc: {
                name: 'JVC',
                hasModels: true,
                models: {
                    'LT-Series Smart LED TV': {
                        name: 'LT-Series Smart LED TV',
                        steps: ['Test power supply filter capacitors for bulging.', 'Inspect LED backlight string voltages.'],
                        tools: ['Multimeter', 'LED Tester'],
                        commonIssues: ['No display / Sound works fine', 'Slow to turn on']
                    }
                }
            },
            sanyo: {
                name: 'Sanyo',
                hasModels: true,
                models: {
                    'FW-Series LED TV': {
                        name: 'FW-Series LED TV',
                        steps: ['Check power supply output diodes.', 'Inspect main logic board regulator chips.'],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['Blown Schottky diodes on power supply', 'Dead unit / No standby light']
                    }
                }
            },
            rca: {
                name: 'RCA',
                hasModels: true,
                models: {
                    'Virtuoso 4K UHD TV': {
                        name: 'Virtuoso 4K UHD TV',
                        steps: ['Check main power supply ceramic fuse.', 'Test LED backlights with tester.'],
                        tools: ['Multimeter', 'Backlight Tester'],
                        commonIssues: ['Short-circuit fuse blown', 'Dim screen or single dark band']
                    }
                }
            },
            xiaomi: {
                name: 'Xiaomi Mi TV',
                hasModels: true,
                models: {
                    'Mi TV 4X / 5X 4K': {
                        name: 'Mi TV 4X / 5X 4K',
                        steps: ['Check PatchWall firmware boot state.', 'Test backlight driver IC and boost diode.'],
                        tools: ['Multimeter', 'USB Flash Tool'],
                        commonIssues: ['Boot loop / Stuck on MI logo', 'Flickering backlight']
                    }
                }
            },
            skyworth: {
                name: 'Skyworth',
                hasModels: true,
                models: {
                    'Android Smart 4K UHD': {
                        name: 'Android Smart 4K UHD',
                        steps: ['Inspect power supply capacitors.', 'Test T-Con gamma voltage generator IC.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Negative / solarized washed out picture', 'No power response']
                    }
                }
            },
            hitachi: {
                name: 'Hitachi TV',
                hasModels: true,
                models: {
                    'Smart 4K Roku TV': {
                        name: 'Smart 4K Roku TV',
                        steps: ['Inspect power supply secondary rectifiers.', 'Check Wi-Fi module ribbon cable.'],
                        tools: ['Multimeter'],
                        commonIssues: ['Wi-Fi connection error code 014', 'Standby LED dead']
                    }
                }
            },
            insignia: {
                name: 'Insignia',
                hasModels: true,
                models: {
                    'F30 Series 4K Fire TV': {
                        name: 'F30 Series 4K Fire TV',
                        steps: ['Check LED backlight strips (typically 6V LEDs).', 'Inspect mainboard power distribution.'],
                        tools: ['LED Tester', 'Multimeter'],
                        commonIssues: ['Half screen dark / Dead backlight strip', 'Flashlight test shows picture']
                    }
                }
            },
            defy: {
                name: 'Defy',
                hasModels: true,
                models: {
                    '55" 4K Smart UHD TV': {
                        name: '55" 4K Smart UHD TV',
                        steps: ['Inspect 3-in-1 combo mainboard for swollen capacitors.', 'Test LED backlight string current.'],
                        tools: ['Multimeter', 'LED Tester'],
                        commonIssues: ['Sound present without picture', 'Unit clicks into protection mode']
                    }
                }
            },
            haier: {
                name: 'Haier TV',
                hasModels: true,
                models: {
                    'Smart LED Android TV': {
                        name: 'Smart LED Android TV',
                        steps: ['Check power supply standby converter chip.', 'Test LVDS cable contact fingers.'],
                        tools: ['Multimeter', 'Alcohol Wipes'],
                        commonIssues: ['White vertical lines on screen', 'Power won’t engage']
                    }
                }
            },
            telefunken_tv: {
                name: 'Telefunken TV',
                hasModels: true,
                models: {
                    'TLEDD / TWM 32" / 40" / 55" Smart UHD': {
                        name: 'TLEDD / TWM 32" / 40" / 55" Smart UHD',
                        steps: [
                            'Inspect 3-in-1 combo board (TP.MS338E / TP.VST59S / TP.MS628) secondary voltage rails (+12V, +24V, +5V standby).',
                            'Test LED backlight string arrays (typically 3V 1W SMD LEDs) using LED tester; check for open-circuit diodes.',
                            'Inspect 25Q64 / 25Q32 SPI flash memory IC for firmware corruption causing blue/red standby light lockup.',
                            'Check T-CON VGH (25V-30V), VGL (-6V to -10V), and VDD (15V) test points on panel PCB.'
                        ],
                        tools: ['Multimeter', 'LED Backlight Tester', 'CH341A SPI Flash Programmer', 'Soldering Iron'],
                        commonIssues: ['Stuck on red standby light or flashes red-to-blue without starting up (corrupt SPI flash firmware)', 'Sound plays normally but screen is completely dark (open-circuit LED in backlight strip)', 'Screen displays horizontal color bars or freezes on Telefunken logo']
                    }
                }
            },
            sinotec_tv: {
                name: 'Sinotec',
                hasModels: true,
                models: {
                    'STL-Series 32" HD / 43" FHD / 55" 4K Android TV': {
                        name: 'STL-Series 32" HD / 43" FHD / 55" 4K Android TV',
                        steps: [
                            'Test power supply standby 5VSB and 12V outputs.',
                            'Check LED backlight driver boost converter MOSFET and current-sense resistor bank.',
                            'Perform USB firmware force update via FAT32 formatted flash drive.'
                        ],
                        tools: ['Multimeter', 'LED Tester', 'FAT32 USB Flash Drive'],
                        commonIssues: ['Stuck on Android loading recovery screen', 'Backlight flashes once on power-on then screen goes black (tripped OVP over-voltage protection)', 'Remote control receiver unresponsive']
                    }
                }
            },
            harwa_tv: {
                name: 'Harwa TV',
                hasModels: true,
                models: {
                    'HW-LED 24" / 32" / 40" / 55" Smart & Slim LED TV': {
                        name: 'HW-LED 24" / 32" / 40" / 55" Smart & Slim LED TV',
                        steps: [
                            'Check 12V DC input connector solder joints on universal combo mainboard (TP.V56 / T.V53).',
                            'Test 1117-3.3V and 1117-1.8V low-dropout voltage regulators on main PCB.',
                            'Inspect LVDS 30-pin ribbon cable connection to LCD glass panel.',
                            'Check LED backlight driver boost circuit output voltage (typically 36V-72V DC depending on screen size).'
                        ],
                        tools: ['Multimeter', 'Soldering Iron', 'Contact Cleaner', 'LED Backlight Tester'],
                        commonIssues: ['Power indicator LED dead (cold solder joint on 12V DC jack or blown SMD fuse)', 'Negative image / inverted solarized colors (LVDS JEIDA/VESA map mismatch in factory menu: press Menu + 1147)', 'Backlight flashes once on power-on then screen goes black while audio continues']
                    }
                }
            },
            changhong_tv: {
                name: 'Changhong TV',
                hasModels: true,
                models: {
                    'CHiQ 4K UHD Smart Android TV': {
                        name: 'CHiQ 4K UHD Smart Android TV',
                        steps: ['Inspect power supply secondary electrolytic capacitors.', 'Test LED driver boost circuit.'],
                        tools: ['Multimeter', 'LED Backlight Tester'],
                        commonIssues: ['Black screen with sound (blown 6V LED bead)', 'Randomly reboots during Netflix playback']
                    }
                }
            },
            konka_tv: {
                name: 'Konka TV',
                hasModels: true,
                models: {
                    'U5-Series / Smart LED 4K': {
                        name: 'U5-Series / Smart LED 4K',
                        steps: ['Check main power supply standby regulator IC.', 'Test panel gate driver signals.'],
                        tools: ['Multimeter', 'Oscilloscope'],
                        commonIssues: ['Vertical jittering lines on display', 'Standby LED clicks and does not turn blue']
                    }
                }
            },
            coocaa_tv: {
                name: 'Coocaa (Skyworth Group)',
                hasModels: true,
                models: {
                    'S3U / S6M Smart 4K Google TV': {
                        name: 'S3U / S6M Smart 4K Google TV',
                        steps: ['Check Wi-Fi / Bluetooth combo module USB data bus.', 'Test backlights and T-Con DC-DC converter.'],
                        tools: ['Multimeter', 'Backlight Tester'],
                        commonIssues: ['Wi-Fi disconnected and will not toggle on', 'Dim flickering backlight']
                    }
                }
            },
            utsave_tv: {
                name: 'Utsave / Utsav TV',
                hasModels: true,
                models: {
                    'Utsave 19" & 22" Compact HD LED TV': {
                        name: 'Utsave 19" & 22" Compact HD LED TV',
                        steps: [
                            'Test external 12V 2.5A DC power adapter output voltage under load.',
                            'Check single-string 3V LED backlight driver boost diode and capacitor.'
                        ],
                        tools: ['Multimeter', '12V Power Supply', 'Precision Screwdrivers'],
                        commonIssues: ['No power light', 'Faint image with dark screen']
                    },
                    'Utsave 24" / 32" / 40" HD LED TV': {
                        name: 'Utsave 24" / 32" / 40" HD LED TV',
                        steps: [
                            'Test external 12V 3A-4A DC power adapter barrel jack plug and inner center-pin contact tension.',
                            'Inspect universal 3-in-1 combo board (TP.V56.PB801 / T.V53.03) 12V to 5V step-down DC-DC buck converter chip.',
                            'Check LED backlight driver constant-current boost circuit output voltage under load.',
                            'Inspect LVDS cable connector latch to LCD glass panel timing controller.'
                        ],
                        tools: ['Multimeter', '12V DC Bench Power Supply', 'LED Backlight Tester', 'Screwdrivers'],
                        commonIssues: ['Red standby LED stays on solid and does not respond to remote or physical power button', 'Sound is heard but screen is pitch black (blown LED strip on single-channel string)', 'Distorted audio buzzing from cheap internal 8-ohm 3W oval speakers']
                    },
                    'Utsave 43" / 50" / 55" Smart Android 4K UHD TV': {
                        name: 'Utsave 43" / 50" / 55" Smart Android 4K UHD TV',
                        steps: [
                            'Inspect dual-string LED backlight connectors and constant-current constant-voltage (CCCV) LED driver IC.',
                            'Test eMMC flash memory for read/write corruption during Android OS boot.'
                        ],
                        tools: ['Multimeter', 'LED Backlight Tester', 'USB Programmer'],
                        commonIssues: ['Stuck on Android loading animation', 'Horizontal lines across top panel quadrant']
                    }
                }
            },
            condere_tv: {
                name: 'Condere TV',
                hasModels: true,
                models: {
                    'Condere 24" / 32" / 40" / 43" Smart LED TV': {
                        name: 'Condere 24" / 32" / 40" / 43" Smart LED TV',
                        steps: [
                            'Check main switch-mode power supply (SMPS) secondary filter capacitors for swelling or ESR degradation.',
                            'Inspect LED backlight strips (usually two 6-LED or 7-LED 6V strips wired in series).',
                            'Check SPI flash memory chip (Winbond 25Q32 / 25Q64) for corrupt firmware; reflash using programmer if stuck on logo.',
                            'Test keypad button ladder resistor divider circuit for drifted resistor values causing channel-up to act as volume-down.'
                        ],
                        tools: ['Multimeter', 'CH341A USB Programmer & SOIC8 Clip', 'LED Tester', 'Soldering Iron'],
                        commonIssues: ['Stuck on boot splash logo indefinitely', 'Half of the screen is noticeably dimmer than the other half', 'Remote control fails to register unless held 2 inches away from sensor window']
                    },
                    'Condere 50" / 55" / 65" Frameless 4K UHD Smart TV': {
                        name: 'Condere 50" / 55" / 65" Frameless 4K UHD Smart TV',
                        steps: [
                            'Inspect mainboard power rails (12V, 5V, 3.3V, 1.5V DDR) and crystal oscillators.',
                            'Test T-Con board level shifter and source driver COF ICs for thermal breakdown.'
                        ],
                        tools: ['Multimeter', 'Thermal Imager', 'Soldering Station'],
                        commonIssues: ['No picture on HDMI 2 port (faulty ESD protection diode array)', 'Random reboot during high-brightness scenes']
                    }
                }
            },
            sonic_tv: {
                name: 'Sonic / SuperSonic TV',
                hasModels: true,
                models: {
                    'SuperSonic SC-1912 / SC-2412 12V Portable RV LED TV': {
                        name: 'SuperSonic SC-1912 / SC-2412 12V Portable RV LED TV',
                        steps: [
                            'Inspect 12V DC car adapter fuse and internal voltage regulator step-down board.',
                            'Test built-in DVD mechanism laser pickup and spindle motor.'
                        ],
                        tools: ['Multimeter', 'Soldering Iron', 'IPA Swabs'],
                        commonIssues: ['Blown fuse when plugged into truck cigarette lighter', 'DVD player refuses to swallow disc']
                    },
                    'SuperSonic SC-3210 / SC-4010 / SC-5510 LED & Smart TV': {
                        name: 'SuperSonic SC-3210 / SC-4010 / SC-5510 LED & Smart TV',
                        steps: [
                            'Test dual AC mains / 12V DC vehicle cigarette lighter input protection fuse and reverse-polarity Schottky diode.',
                            'Inspect built-in slot-in DVD mechanism (on combo models) limit switch and laser sled ribbon.',
                            'Measure voltage rails on universal mainboard (+12V, +5V, +3.3V, +1.2V core voltage).',
                            'Check audio power amplifier IC (TDA1517P / PAM8610) for excessive heat.'
                        ],
                        tools: ['Multimeter', '12V Automotive Tester', 'JIS Screwdriver', 'Contact Cleaner'],
                        commonIssues: ['Screen flashes white/gray and restarts when powered from RV 12V auxiliary battery', 'Combos with DVD drive fail to spin or eject disc', 'No sound from headphone output jack']
                    }
                }
            },
            sceptre_tv: {
                name: 'Sceptre',
                hasModels: true,
                models: {
                    'Sceptre 24" / 27" 75Hz / 144Hz Gaming & Office LED TV': {
                        name: 'Sceptre 24" / 27" 75Hz / 144Hz Gaming & Office LED TV',
                        steps: [
                            'Inspect external power brick output and panel controller board caps.',
                            'Test HDMI / VGA port ESD protection ICs.'
                        ],
                        tools: ['Multimeter', 'Hot Air Station'],
                        commonIssues: ['No signal on HDMI port 1', 'Vertical colored band on panel']
                    },
                    'E325BV-SR / X405BV-FSR / U550CV 4K UHD': {
                        name: 'E325BV-SR / X405BV-FSR / U550CV 4K UHD',
                        steps: [
                            'Inspect power supply board (PSU) electrolytic capacitors (often 1000uF 25V / 470uF 35V) for domed tops.',
                            'Test main board to T-Con flat ribbon cable pins for oxidation.',
                            'Check LED backlight driver board pulse-width modulation (PWM) dimming signal from main SoC.'
                        ],
                        tools: ['Multimeter', 'Soldering Iron & Desoldering Wick', 'Replacement Low-ESR Capacitors'],
                        commonIssues: ['Blue/red power light blinks once then turns off completely', 'TV takes 10 to 15 minutes of clicking power button before it turns on (cold capacitor symptom)', 'Audio works but screen remains dark (flashlight test reveals faint video)']
                    },
                    'Sceptre 65" / 75" / 86" 4K UHD HDR Smart LED TV': {
                        name: 'Sceptre 65" / 75" / 86" 4K UHD HDR Smart LED TV',
                        steps: [
                            'Check multi-board LED driver string balance and MOSFET switches.',
                            'Inspect massive panel glass thermal expansion joints and T-con flat flex connectors.'
                        ],
                        tools: ['Multimeter', 'LED Backlight Tester', 'Insulated Gloves'],
                        commonIssues: ['Half screen dark due to one of four backlight driver channels tripping OVP', 'Power supply relay clicking repeatedly without booting']
                    }
                }
            },
            onn_tv: {
                name: 'Onn. (Walmart Roku / Google TV)',
                hasModels: true,
                models: {
                    'Onn. 24" / 32" HD Roku Smart TV': {
                        name: 'Onn. 24" / 32" HD Roku Smart TV',
                        steps: [
                            'Inspect power board 12V rail stability and Roku streaming module Wi-Fi antenna connector.',
                            'Test single LED backlight bar for open circuit string.'
                        ],
                        tools: ['Multimeter', 'LED Tester'],
                        commonIssues: ['Wi-Fi dropping frequently', 'Dark spot in upper corner of screen']
                    },
                    'Onn. 32" / 43" / 50" / 65" 4K Smart TV': {
                        name: 'Onn. 32" / 43" / 50" / 65" 4K Smart TV',
                        steps: [
                            'Inspect combo mainboard LED driver section for open-circuit surface-mount current-sense resistors.',
                            'Check Wi-Fi / Bluetooth ribbon cable seated securely in mainboard ZIF socket.',
                            'Measure panel VGH, VGL, and AVDD test points on the panel timing controller edge board.',
                            'Test hard reset tactile button pinhole on rear I/O plate.'
                        ],
                        tools: ['Torx & Phillips Screwdrivers', 'Multimeter', 'LED Strip Tester', 'Flashlight'],
                        commonIssues: ['Error code 014.30 "Cannot connect to your wireless network" during initial setup', 'Backlight LEDs burn out creating bluish/purple tint on screen before failing completely', 'Volume bar stuck on screen']
                    },
                    'Onn. 70" / 75" 4K UHD Frameless Google TV': {
                        name: 'Onn. 70" / 75" 4K UHD Frameless Google TV',
                        steps: [
                            'Inspect large screen dual T-Con boards and high-current LED boost drivers.',
                            'Test mainboard processor heatsink thermal transfer pad.'
                        ],
                        tools: ['Multimeter', 'Infrared Thermometer', 'Torx Driver'],
                        commonIssues: ['Screen turns pinkish magenta (degraded LED phosphor or polarized film shift)', 'App crashes back to home screen during 4K HDR playback']
                    }
                }
            },
            element_tv: {
                name: 'Element Electronics',
                hasModels: true,
                models: {
                    'Element 24" / 32" / 40" HD / FHD LED TV': {
                        name: 'Element 24" / 32" / 40" HD / FHD LED TV',
                        steps: [
                            'Check power supply board primary fuse and bridge rectifier diodes.',
                            'Test LVDS cable continuity to T-con.'
                        ],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['No power after power surge', 'No sound on digital channels']
                    },
                    'Element 4K Roku / Fire TV Edition 43" / 50" / 55"': {
                        name: 'Element 4K Roku / Fire TV Edition 43" / 50" / 55"',
                        steps: [
                            'Inspect standby power supply standby IC (VIPer22A / TNY277) and snubber diode.',
                            'Check backlight LED strips for shorted or open 3V/6V LED chips.',
                            'Perform hardware factory reset by holding physical power button while plugging into AC power.'
                        ],
                        tools: ['Multimeter', 'LED Backlight Tester', 'Soldering Station'],
                        commonIssues: ['Stuck in boot loop displaying Element logo', 'Screen turns on for 1 second then goes black with sound continuing', 'Remote unpairs after software update']
                    },
                    'Element 65" / 70" 4K UHD Smart TV': {
                        name: 'Element 65" / 70" 4K UHD Smart TV',
                        steps: [
                            'Inspect backlight driver MOSFETs and electrolytic filter banks.',
                            'Test mainboard HDMI switch IC (Silicon Image / Parade Technologies).'
                        ],
                        tools: ['Multimeter', 'Hot Air Rework Station'],
                        commonIssues: ['All HDMI ports report no signal', 'Backlight flickers during dark movie scenes']
                    }
                }
            },
            westinghouse_tv: {
                name: 'Westinghouse',
                hasModels: true,
                models: {
                    'Westinghouse 24" / 32" / 40" D-Series HD LED TV': {
                        name: 'Westinghouse 24" / 32" / 40" D-Series HD LED TV',
                        steps: [
                            'Inspect power supply smoothing capacitors and switching transformer pins.',
                            'Check IR receiver board cable connection.'
                        ],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Takes minutes to turn on from cold state', 'Remote control does not respond']
                    },
                    'Roku 4K UHD / D-Series Full HD': {
                        name: 'Roku 4K UHD / D-Series Full HD',
                        steps: [
                            'Inspect power supply output diodes (MBR20100CT / SR5200 dual Schottky rectifiers) on secondary heatsink.',
                            'Test mainboard LVDS clock and data differential pairs.',
                            'Check standby 5V rail ripple using oscilloscope or AC mV multimeter setting.'
                        ],
                        tools: ['Multimeter', 'Screwdrivers', 'Oscilloscope'],
                        commonIssues: ['Blinking power light code / Relays clicking continuously', 'Horizontal lines across top third of screen (failing gate COF driver)', 'Static screech on built-in speakers']
                    },
                    'Westinghouse 55" / 65" / 75" 4K Roku Smart TV': {
                        name: 'Westinghouse 55" / 65" / 75" 4K Roku Smart TV',
                        steps: [
                            'Inspect dual LED driver boost circuits and backlight strip connectors.',
                            'Test mainboard eMMC memory and thermal pad contact.'
                        ],
                        tools: ['Multimeter', 'Thermal Pads', 'LED Tester'],
                        commonIssues: ['Vertical dark shadow across panel', 'Freezes on Roku TV purple logo screen']
                    }
                }
            },
            sansui_tv: {
                name: 'Sansui',
                hasModels: true,
                models: {
                    'Sansui 24" / 32" HD LED TV': {
                        name: 'Sansui 24" / 32" HD LED TV',
                        steps: [
                            'Check external 12V adapter or internal AC-DC board output.',
                            'Inspect backlight LED strip connectors.'
                        ],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['No power indicator light', 'Sound but no backlight']
                    },
                    'Sansui 24" / 32" / 43" HD / 4K UHD Android TV': {
                        name: 'Sansui 24" / 32" / 43" HD / 4K UHD Android TV',
                        steps: [
                            'Check 12V / 24V supply rails from power board to audio amplifier and mainboard.',
                            'Inspect panel T-Con level shifter IC and ceramic MLCC bypass caps for short to ground.',
                            'Test infrared sensor window filter alignment.'
                        ],
                        tools: ['Multimeter', 'Thermal Camera / Freeze Spray', 'Soldering Iron'],
                        commonIssues: ['Short-circuit ceramic SMD capacitor on LCD panel PCB pulling down VGH voltage (causes blank screen)', 'Remote control only functions from direct straight angle', 'Flickering picture on HDMI 1']
                    },
                    'Sansui 50" / 55" / 65" 4K UHD Smart Frameless TV': {
                        name: 'Sansui 50" / 55" / 65" 4K UHD Smart Frameless TV',
                        steps: [
                            'Inspect mainboard Android OS flash storage and RAM chips.',
                            'Test LED backlight driver PWM dimming circuit.'
                        ],
                        tools: ['Multimeter', 'USB Flash Drive'],
                        commonIssues: ['Stuck in reboot loop on Sansui logo', 'Wi-Fi disconnects after sleep mode']
                    }
                }
            },
            polaroid_tv: {
                name: 'Polaroid',
                hasModels: true,
                models: {
                    'Polaroid 24" / 32" HD Ready LED TV': {
                        name: 'Polaroid 24" / 32" HD Ready LED TV',
                        steps: [
                            'Inspect power supply secondary diodes and filter caps.',
                            'Test panel LVDS connection.'
                        ],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Standby light red but won\'t turn green', 'No sound on HDMI']
                    },
                    'Polaroid 32" / 43" / 55" Smart LED TV': {
                        name: 'Polaroid 32" / 43" / 55" Smart LED TV',
                        steps: [
                            'Inspect power supply secondary rectifier diodes and safety fuse.',
                            'Test edge-lit or direct-lit LED backlight arrays.',
                            'Check eMMC or SPI flash chip firmware handshake.'
                        ],
                        tools: ['Multimeter', 'LED Tester', 'Phillips Screwdriver'],
                        commonIssues: ['TV turns on but no backlight illumination', 'Freezes on "Polaroid" startup screen', 'HDMI ports report "No Signal" after lightning storm']
                    },
                    'Polaroid 65" 4K UHD Smart Android TV': {
                        name: 'Polaroid 65" 4K UHD Smart Android TV',
                        steps: [
                            'Inspect dual-string LED backlight boost regulator and current sense resistors.',
                            'Test mainboard HDMI switcher IC.'
                        ],
                        tools: ['Multimeter', 'LED Backlight Tester'],
                        commonIssues: ['Backlight trips OVP and shuts off after 5 seconds', 'Smart apps fail to load']
                    }
                }
            },
            aiwa_tv: {
                name: 'Aiwa TV',
                hasModels: true,
                models: {
                    'Aiwa 24" / 32" HD Ready LED TV': {
                        name: 'Aiwa 24" / 32" HD Ready LED TV',
                        steps: [
                            'Check power input fuse and 12V switching regulator.',
                            'Test front panel tactile buttons.'
                        ],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['Completely dead when plugged in', 'Buttons on side panel do not respond']
                    },
                    'Aiwa 32" / 40" / 50" Frameless Smart 4K TV': {
                        name: 'Aiwa 32" / 40" / 50" Frameless Smart 4K TV',
                        steps: [
                            'Check 3-in-1 integrated mainboard processor heatsink thermal pad.',
                            'Inspect panel COF (Chip on Film) flexible ribbon bonding for lifting or overheating.',
                            'Test audio output Class D chip PAM8406 / CS8673E.'
                        ],
                        tools: ['Multimeter', 'Infrared Thermometer', 'Tweezers'],
                        commonIssues: ['Screen flickers horizontally when warm (overheating COF gate driver)', 'Audio cuts out after 30 minutes of playback', 'Power LED flashes 5 times']
                    },
                    'Aiwa 55" / 65" 4K UHD Smart Google TV': {
                        name: 'Aiwa 55" / 65" 4K UHD Smart Google TV',
                        steps: [
                            'Inspect mainboard memory and processor solder joints.',
                            'Test LED backlight string balance.'
                        ],
                        tools: ['Multimeter', 'Reflow Station'],
                        commonIssues: ['Wi-Fi module not recognized', 'Vertical lines on screen when starting up']
                    }
                }
            },
            akai_tv: {
                name: 'Akai TV',
                hasModels: true,
                models: {
                    'Akai 24" / 32" HD LED TV': {
                        name: 'Akai 24" / 32" HD LED TV',
                        steps: [
                            'Check mainboard 5V and 3.3V regulator ICs.',
                            'Test backlight LED strips.'
                        ],
                        tools: ['Multimeter', 'LED Tester'],
                        commonIssues: ['Red standby light stays red', 'Sound works but dark screen']
                    },
                    'Akai 32" / 43" FHD / 4K Smart WebOS / Android TV': {
                        name: 'Akai 32" / 43" FHD / 4K Smart WebOS / Android TV',
                        steps: [
                            'Inspect mainboard DC-DC buck converters (5V to 3.3V, 1.8V, 1.1V).',
                            'Check backlight LED bar connectors for burnt pin contacts.',
                            'Perform factory service menu reset (Source + 2580 or Menu + 1147).'
                        ],
                        tools: ['Multimeter', 'Service Remote', 'Soldering Iron'],
                        commonIssues: ['Stuck in standby red LED mode (faulty 1.1V core DC-DC converter IC)', 'Dark horizontal band across center of picture (dead LED strip segment)', 'Mirror image or upside-down picture after mainboard replacement (panel mirror setting)']
                    },
                    'Akai 55" / 65" 4K UHD Smart Frameless TV': {
                        name: 'Akai 55" / 65" 4K UHD Smart Frameless TV',
                        steps: [
                            'Inspect power board PFC (Power Factor Correction) boost diode and capacitor.',
                            'Test T-Con board data signals.'
                        ],
                        tools: ['Multimeter', 'Soldering Station'],
                        commonIssues: ['Tripping home circuit breaker when plugged in (shorted PFC bridge rectifier)', 'Apps crashing on WebOS / Android']
                    }
                }
            },
            blaupunkt_tv: {
                name: 'Blaupunkt TV',
                hasModels: true,
                models: {
                    'Blaupunkt 24" / 32" HD Ready LED TV': {
                        name: 'Blaupunkt 24" / 32" HD Ready LED TV',
                        steps: [
                            'Check SMPS board capacitor ESR and secondary output diodes.',
                            'Test LVDS cable seating.'
                        ],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['Clicking sound from power supply and no boot', 'No audio on headphone jack']
                    },
                    'Blaupunkt 32" / 43" / 50" 4K Smart Android TV': {
                        name: 'Blaupunkt 32" / 43" / 50" 4K Smart Android TV',
                        steps: [
                            'Inspect switch-mode power board output voltages and optocoupler feedback loop (PC817).',
                            'Check LED backlight driver constant current control IC (OB3350CP / MP3398A).',
                            'Inspect T-Con mini LVDS flex ribbon connectors.'
                        ],
                        tools: ['Multimeter', 'LED Backlight Tester', 'Soldering Station'],
                        commonIssues: ['Backlight flashes for split second and shuts down (over-voltage protection tripped by single burnt LED bead)', 'Standby red light blinks continuously and unit will not power on', 'Audio distortion on left speaker']
                    },
                    'Blaupunkt 55" / 65" 4K UHD Smart QLED TV': {
                        name: 'Blaupunkt 55" / 65" 4K UHD Smart QLED TV',
                        steps: [
                            'Inspect Quantum Dot backlight array and blue LED strip driver board.',
                            'Test mainboard eMMC storage chip.'
                        ],
                        tools: ['Multimeter', 'LED Tester'],
                        commonIssues: ['Color shifting to purplish tint (degraded blue backlight driving QDs)', 'Smart TV freezes on network connection']
                    }
                }
            },
            seiki_tv: {
                name: 'Seiki',
                hasModels: true,
                models: {
                    'Seiki 24" / 28" / 32" HD LED TV': {
                        name: 'Seiki 24" / 28" / 32" HD LED TV',
                        steps: [
                            'Check external 12V power brick or internal power board fuse.',
                            'Inspect mainboard flash chip.'
                        ],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['No power when pressing remote', 'Distorted picture lines']
                    },
                    'Seiki Retro Color 22" / 32" / 40" 4K SE-Series': {
                        name: 'Seiki Retro Color 22" / 32" / 40" 4K SE-Series',
                        steps: [
                            'Inspect power supply board capacitors for high ESR.',
                            'Test mainboard firmware via USB flash update.',
                            'Check T-Con board timing controller chip.'
                        ],
                        tools: ['Multimeter', 'FAT32 USB Drive', 'Screwdrivers'],
                        commonIssues: ['TV turns on with green light but screen stays black', 'HDMI audio out of sync with video', 'Remote sensor dead']
                    },
                    'Seiki 50" / 55" / 65" 4K UHD Smart LED TV': {
                        name: 'Seiki 50" / 55" / 65" 4K UHD Smart LED TV',
                        steps: [
                            'Inspect power supply board heavy duty diodes and MOSFETs.',
                            'Test panel T-con board ribbon cables.'
                        ],
                        tools: ['Multimeter', 'Soldering Station'],
                        commonIssues: ['HDMI 30Hz or 4K resolution handshake failure', 'Backlight uneven brightness spots']
                    }
                }
            },
            kogan_tv: {
                name: 'Kogan',
                hasModels: true,
                models: {
                    'Kogan 24" / 32" HD LED TV': {
                        name: 'Kogan 24" / 32" HD LED TV',
                        steps: [
                            'Check 12V DC input or internal AC power supply board.',
                            'Inspect LED backlight connector pins.'
                        ],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['No power light', 'Sound works but no backlight']
                    },
                    'Kogan 32" / 43" / 55" / 65" 4K Smart HDR LED TV': {
                        name: 'Kogan 32" / 43" / 55" / 65" 4K Smart HDR LED TV',
                        steps: [
                            'Check Android TV SoC system RAM and eMMC solder ball joints.',
                            'Inspect edge-lit or direct-lit LED backlight arrays with LED tester.',
                            'Test power board standby transformer primary snubber circuit.'
                        ],
                        tools: ['Multimeter', 'LED Tester', 'Heat Gun / Reflow Station'],
                        commonIssues: ['Reboots in endless loop on Android recovery screen', 'Dark patches or bright white circles on screen (diffuser lenses fell off LEDs)', 'Wi-Fi antenna cable pinched by back cover']
                    },
                    'Kogan 70" / 75" / 85" 4K UHD Smart QLED / Google TV': {
                        name: 'Kogan 70" / 75" / 85" 4K UHD Smart QLED / Google TV',
                        steps: [
                            'Inspect large screen dual T-Con boards and high-current LED boost drivers.',
                            'Test mainboard processor heatsink thermal transfer pad.'
                        ],
                        tools: ['Multimeter', 'Infrared Thermometer', 'Torx Driver'],
                        commonIssues: ['Screen turns pinkish magenta (degraded LED phosphor or polarized film shift)', 'App crashes back to home screen during 4K HDR playback']
                    }
                }
            },
            cello_tv: {
                name: 'Cello Electronics',
                hasModels: true,
                models: {
                    'Cello 16" / 20" / 24" 12V Traveller LED TV': {
                        name: 'Cello 16" / 20" / 24" 12V Traveller LED TV',
                        steps: [
                            'Check 12V cigarette lighter plug fuse and internal surge suppression diode.',
                            'Test built-in DVD player loading mechanism.'
                        ],
                        tools: ['Multimeter', '12V Power Supply', 'Screwdrivers'],
                        commonIssues: ['Blown fuse when vehicle alternator charges battery', 'DVD stuck inside drive']
                    },
                    'Cello 24" / 32" / 40" Smart Traveller 12V & 240V LED TV': {
                        name: 'Cello 24" / 32" / 40" Smart Traveller 12V & 240V LED TV',
                        steps: [
                            'Inspect dual voltage power input circuit (12V DC auxiliary and 230V AC adapter).',
                            'Test satellite / terrestrial dual tuner input circuitry.',
                            'Check LED driver boost inductor and MOSFET switch.'
                        ],
                        tools: ['Multimeter', '12V Power Source', 'Screwdrivers'],
                        commonIssues: ['Powers off when RV engine starts (voltage surge trigger)', 'Tuner displays "Weak or No Signal" on terrestrial channels', 'Disc mechanism jamming on DVD combi models']
                    },
                    'Cello 50" / 55" 4K UHD Smart LED TV': {
                        name: 'Cello 50" / 55" 4K UHD Smart LED TV',
                        steps: [
                            'Inspect switch-mode power board output voltages and optocoupler feedback loop.',
                            'Check LED backlight driver constant current control IC.'
                        ],
                        tools: ['Multimeter', 'LED Backlight Tester', 'Soldering Station'],
                        commonIssues: ['Backlight flashes and shuts down', 'Smart portal fails to connect']
                    }
                }
            }
        }
    },
    ups: {
        name: 'Uninterruptible Power Supply (UPS)',
        icon: React.createElement(Power, { className: "w-5 h-5 text-emerald-500" }),
        brands: {
            apc: {
                name: 'APC Schneider Electric',
                hasModels: true,
                models: {
                    'Back-UPS BX1400U-MS 1400VA': {
                        name: 'Back-UPS BX1400U-MS 1400VA',
                        steps: [
                            'Test 12V 7.2Ah SLA (Sealed Lead Acid) battery internal resistance and under-load terminal voltage drop.',
                            'Inspect inverter MOSFETs on heavy aluminum heat sink for short circuits.',
                            'Check line relay click switches.'
                        ],
                        tools: ['Multimeter', 'Battery Load Tester', 'Soldering Iron'],
                        commonIssues: ['Continuous red light / Replace battery code', 'UPS beeps constantly when plugged into wall mains', 'Overload light comes on with no load plugged in']
                    }
                }
            }
        }
    },
    vacuum_cleaner: {
        name: 'Vacuum Cleaner',
        icon: React.createElement(Wind, { className: "w-5 h-5 text-indigo-400" }),
        brands: {
            dyson: {
                name: 'Dyson Cordless',
                hasModels: true,
                models: {
                    'Dyson V11 / V15 Detect': {
                        name: 'Dyson V11 / V15 Detect',
                        steps: [
                            'Clean washable HEPA filter mesh and let dry completely for 24 hours.',
                            'Test trigger switch plastic latch pin inside handle assembly.',
                            'Check 7-cell or 8-cell 25.2V lithium battery pack BMS cell balancing.'
                        ],
                        tools: ['Torx T8 Screwdriver', 'Multimeter', 'Replacement Handle Trigger'],
                        commonIssues: ['Pulsing motor / Airflow block filter light', 'Trigger snapped inside handle', 'Battery red light flashing 12 times']
                    }
                }
            },
            shark: {
                name: 'Shark (SharkNinja)',
                hasModels: true,
                models: {
                    'Vertex DuoClean PowerFins AZ2002': {
                        name: 'Vertex DuoClean PowerFins AZ2002',
                        steps: ['Inspect DuoClean dual motorized roller drive belt.', 'Clear hose clogs using broomstick test.', 'Test nozzle floor headlight LEDs.'],
                        tools: ['Torx Screwdrivers', 'Pliers'],
                        commonIssues: ['Brush roller indicator solid red', 'Brush roll not spinning due to wrapped hair']
                    }
                }
            },
            bissell: {
                name: 'Bissell',
                hasModels: true,
                models: {
                    'CleanView Swivel Pet 2252': {
                        name: 'CleanView Swivel Pet 2252',
                        steps: ['Replace geared rubber stretch drive belt (Style 7/9/10/12/14/16).', 'Clear lower duct hose lint block.'],
                        tools: ['Phillips Screwdriver', 'Replacement Belt'],
                        commonIssues: ['Burning rubber smell', 'Brush roller stopped turning']
                    }
                }
            },
            hoover: {
                name: 'Hoover',
                hasModels: true,
                models: {
                    'WindTunnel 3 High Performance': {
                        name: 'WindTunnel 3 High Performance',
                        steps: ['Inspect carbon motor brushes for wear.', 'Check HEPA media filter chamber seal.'],
                        tools: ['Nut Driver', 'Multimeter'],
                        commonIssues: ['Loss of suction', 'Thermal overload switch tripped']
                    }
                }
            },
            irobot: {
                name: 'iRobot Roomba',
                hasModels: true,
                models: {
                    'Roomba j7+ / i7+': {
                        name: 'Roomba j7+ / i7+',
                        steps: ['Clean front caster wheel drop sensor optical lenses.', 'Replace worn green dual aeroforce rubber extractors.', 'Test clean base evacuation dock vacuum motor.'],
                        tools: ['Phillips Screwdriver', 'Compressed Air'],
                        commonIssues: ['Error 14 / Bin not detected', 'Error 26 / Vacuum motor airflow restricted', 'Bumper stuck']
                    }
                }
            },
            roborock: {
                name: 'Roborock',
                hasModels: true,
                models: {
                    'S7 MaxV / S8 Pro Ultra': {
                        name: 'S7 MaxV / S8 Pro Ultra',
                        steps: ['Inspect LiDAR LDS turret motor rotation belt.', 'Check VibraRise sonic mopping vibration motor.', 'Test dock wash tray pump.'],
                        tools: ['Torx T6', 'Fine Tweezers'],
                        commonIssues: ['Error 1 LiDAR turret jammed', 'Dock drain tray full error']
                    }
                }
            },
            miele: {
                name: 'Miele',
                hasModels: true,
                models: {
                    'Complete C3 Canister Vacuum': {
                        name: 'Complete C3 Canister Vacuum',
                        steps: ['Inspect automatic cord rewind spring reel brake.', 'Test electronic suction regulator PCB slider.'],
                        tools: ['Torx T20', 'Multimeter'],
                        commonIssues: ['Power cord will not latch or retract', 'Motor hums but won’t accelerate']
                    }
                }
            },
            electrolux: {
                name: 'Electrolux',
                hasModels: true,
                models: {
                    'Pure F9 / Well Q7 Cordless': {
                        name: 'Pure F9 / Well Q7 Cordless',
                        steps: ['Test battery pack lithium cells voltage.', 'Clean motorized nozzle brush roll bearings.'],
                        tools: ['Torx T8', 'Multimeter'],
                        commonIssues: ['Nozzle stops spinning after 5 seconds', 'Short run time']
                    }
                }
            },
            philips: {
                name: 'Philips',
                hasModels: true,
                models: {
                    'SpeedPro Max 8000 Series': {
                        name: 'SpeedPro Max 8000 Series',
                        steps: ['Clean 360-degree LED suction nozzle.', 'Inspect PowerBlade digital motor airflow sensor.'],
                        tools: ['Opening Tools', 'Brush'],
                        commonIssues: ['E4 error code / Filter saturated', 'Nozzle LED dark']
                    }
                }
            },
            samsung_vacuum: {
                name: 'Samsung',
                hasModels: true,
                models: {
                    'Bespoke Jet AI Cordless': {
                        name: 'Bespoke Jet AI Cordless',
                        steps: ['Check All-in-One clean station bag seal.', 'Inspect dual action brush head drive motor.'],
                        tools: ['Screwdrivers', 'Multimeter'],
                        commonIssues: ['Clean station not emptying dustbin', 'AI mode sensor fault']
                    }
                }
            },
            lg_vacuum: {
                name: 'LG',
                hasModels: true,
                models: {
                    'CordZero A9 Kompressor': {
                        name: 'CordZero A9 Kompressor',
                        steps: ['Clean Kompressor lever mechanism blade.', 'Test dual interchangeable battery pack terminals.'],
                        tools: ['Torx T8', 'Multimeter'],
                        commonIssues: ['Kompressor lever jammed with debris', 'Wi-Fi connection failed']
                    }
                }
            },
            karcher: {
                name: 'Kärcher',
                hasModels: true,
                models: {
                    'WD 3 / WD 5 Wet & Dry': {
                        name: 'WD 3 / WD 5 Wet & Dry',
                        steps: ['Inspect float valve basket for wet shut-off.', 'Test bypass cooling suction turbine motor.'],
                        tools: ['Screwdrivers', 'Multimeter'],
                        commonIssues: ['Loss of suction with dry debris', 'Motor squealing bearing failure']
                    }
                }
            },
            dreame: {
                name: 'Dreame',
                hasModels: true,
                models: {
                    'L10s Ultra / L20 Ultra': {
                        name: 'L10s Ultra / L20 Ultra',
                        steps: ['Inspect motorized extendable mop arm gears.', 'Clean 3D structured light obstacle sensors.'],
                        tools: ['Micro Spudger', 'Cotton Swab'],
                        commonIssues: ['Mop arm failed to retract', 'Water tank air lock']
                    }
                }
            },
            ecovacs: {
                name: 'Ecovacs Deebot',
                hasModels: true,
                models: {
                    'Deebot X1 / X2 Omni': {
                        name: 'Deebot X1 / X2 Omni',
                        steps: ['Check dToF laser sensor mirror.', 'Inspect omni station clean water peristaltic pump.'],
                        tools: ['Tweezers', 'Multimeter'],
                        commonIssues: ['Radar malfunction error', 'Base station auto-fill failed']
                    }
                }
            },
            black_decker_vacuum: {
                name: 'Black+Decker',
                hasModels: true,
                models: {
                    'Dustbuster Pivot 20V Max': {
                        name: 'Dustbuster Pivot 20V Max',
                        steps: ['Inspect pivoting nose angle locking latch.', 'Test onboard lithium-ion cells for dead cell.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['Pivoting latch loose', 'Red charging LED flashes rapidly']
                    }
                }
            },
            eufy: {
                name: 'Eufy (Anker)',
                hasModels: true,
                models: {
                    'RoboVac 11S / X8 Pro': {
                        name: 'RoboVac 11S / X8 Pro',
                        steps: ['Test side brush motor gear drive.', 'Clear hair from bumper infrared cliff sensors.'],
                        tools: ['Phillips Screwdriver'],
                        commonIssues: ['4 beeps error / Roller brush stuck', 'Robot traveling in circles']
                    }
                }
            },
            eureka: {
                name: 'Eureka',
                hasModels: true,
                models: {
                    'Airspeed / RapidClean Pro': {
                        name: 'Airspeed / RapidClean Pro',
                        steps: ['Inspect motorized floor nozzle pivot joint wires.', 'Test on/off trigger switch.'],
                        tools: ['Phillips #1', 'Multimeter'],
                        commonIssues: ['Intermittent floor nozzle power when swivelled', 'Clogged cyclonic separator']
                    }
                }
            },
            tineco: {
                name: 'Tineco',
                hasModels: true,
                models: {
                    'Floor One S5 / S7 Wet Dry': {
                        name: 'Floor One S5 / S7 Wet Dry',
                        steps: ['Clean iLoop smart dirt sensor window with alcohol swab.', 'Test clean water spray peristaltic pump.'],
                        tools: ['Alcohol Swab', 'Fine Pick'],
                        commonIssues: ['Dirty water tank full false alarm', 'Brush roller error after self-cleaning']
                    }
                }
            },
            numatic: {
                name: 'Numatic (Henry)',
                hasModels: true,
                models: {
                    'Henry HVR 160 / 200': {
                        name: 'Henry HVR 160 / 200',
                        steps: ['Inspect carbon motor brushes for wear.', 'Test 2-speed Hi/Lo rocker switch and cable rewind slip rings.'],
                        tools: ['Slot & Pozidriv Screwdrivers', 'Multimeter'],
                        commonIssues: ['Intermittent power when cable is pulled', 'Motor sparking excessively']
                    }
                }
            }
        }
    },
    waffle_iron: {
        name: 'Waffle Iron / Waffle Maker',
        icon: React.createElement(Flame, { className: "w-5 h-5 text-amber-500" }),
        brands: {
            breville: {
                name: 'Breville',
                hasModels: true,
                models: {
                    'The Smart Waffle Pro 2-Slice / 4-Slice BWM520XL / BWM640XL': {
                        name: 'The Smart Waffle Pro 2-Slice / 4-Slice BWM520XL / BWM640XL',
                        steps: ['Inspect Waffle IQ intelligent batter cook timer logic.', 'Test upper and lower die-cast aluminum plate heating elements.', 'Inspect wrap-around overflow moat thermal insulation.', 'Replace high-temp internal wiring harness silicone sleeving.'],
                        tools: ['Torx T10', 'Multimeter', 'High-Temp Wire Nuts'],
                        commonIssues: ['No-mess overflow moat smoking from trapped batter oil', 'Browning dial sensor out of calibration', 'Upper plate hinge wire fatigue']
                    }
                }
            },
            all_clad: {
                name: 'All-Clad Metalcrafters',
                hasModels: true,
                models: {
                    'Classic Round / 4-Slice Digital Belgian Waffle Maker': {
                        name: 'Classic Round / 4-Slice Digital Belgian Waffle Maker',
                        steps: ['Inspect stainless steel polished housing earth ground connection.', 'Test precision digital browning countdown timer.', 'Check audible ready tone piezo buzzer.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Ready beep silent / Piezo transducer failed', 'Top plate heating intermittently when lid opened']
                    }
                }
            },
            cuisinart: {
                name: 'Cuisinart',
                hasModels: true,
                models: {
                    'Vertical Waffle Maker WAF-V100 / Double Flip WAF-F20': {
                        name: 'Vertical Waffle Maker WAF-V100 / Double Flip WAF-F20',
                        steps: ['Clean vertical pour spout silicone seal.', 'Inspect rotary 180-degree flip mechanism pivot detent spring.', 'Test bi-metal thermostat snap disc contact points (~190°C).'],
                        tools: ['Multimeter', 'Phillips Screwdriver', 'Fine Sandpaper'],
                        commonIssues: ['Ready light never turns green (dirty thermostat contact points)', 'Flip lock latch broken', 'Uneven baking between top and bottom plates']
                    }
                }
            },
            presto: {
                name: 'Presto',
                hasModels: true,
                models: {
                    'FlipSide Belgian Waffle Maker 03510': {
                        name: 'FlipSide Belgian Waffle Maker 03510',
                        steps: ['Replace CR2032 digital countdown timer battery in handle base.', 'Inspect 180-degree flip handle locking latch.', 'Test 1100W heating element.'],
                        tools: ['Small Phillips Screwdriver', 'CR2032 Battery', 'Multimeter'],
                        commonIssues: ['Countdown timer display blank (dead coin cell battery in handle)', 'Flip pivot arm loose on base bracket']
                    }
                }
            },
            dash: {
                name: 'DASH',
                hasModels: true,
                models: {
                    'Mini Waffle Maker 4" / Multi-Plate Express': {
                        name: 'Mini Waffle Maker 4" / Multi-Plate Express',
                        steps: ['Inspect 350W miniature heating coil.', 'Test inline thermal fuse inside bottom housing.', 'Check indicator light resistor.'],
                        tools: ['Phillips #1', 'Multimeter'],
                        commonIssues: ['Blue indicator light does not illuminate / Blown thermal fuse', 'Top lid hinge pin sliding out']
                    }
                }
            },
            waring_commercial: {
                name: 'Waring Commercial',
                hasModels: true,
                models: {
                    'Heavy-Duty Belgian Waffle Maker WW180X / WW200': {
                        name: 'Heavy-Duty Belgian Waffle Maker WW180X / WW200',
                        steps: ['Inspect heavy-duty commercial rotary hinge swivel wires.', 'Replace field-serviceable nonstick triple-coated plates.', 'Test industrial rocker power switch.'],
                        tools: ['Commercial Service Wrench', 'Multimeter'],
                        commonIssues: ['Rotary swivel wires sheared from constant 180° rotation', 'Plates sticking / Teflon coating worn']
                    }
                }
            }
        }
    },
    washing_machine: {
        name: 'Washing Machine',
        icon: React.createElement(Box, { className: "w-5 h-5 text-sky-500" }),
        brands: {
            defy: {
                name: 'Defy',
                hasModels: false,
                sizes: {
                    '6kg Front Loader': {
                        name: '6kg Front Loader',
                        steps: [
                            'Test drain pump motor winding resistance (~160Ω) and clean coin filter trap.',
                            'Check door interlock PTC switch 3-wire plug connector for scorching.',
                            'Inspect carbon brushes on drive motor commutator.',
                            'Test heating element resistance (~28Ω) and NTC thermistor sensor.'
                        ],
                        tools: ['Multimeter', 'Pliers', 'Replacement Carbon Brushes'],
                        commonIssues: ['Door will not unlock / Door lock switch burnt', 'Does not drain water / Pump blocked with coins', 'Motor hums but drum won’t turn / Carbon brushes worn out']
                    },
                    '13kg Top Loader': {
                        name: '13kg Top Loader',
                        steps: ['Test water inlet solenoid valve coils.', 'Check drain pump motor.', 'Inspect lid safety switch magnet.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['E2 Door Open Fault during spin', 'E4 Water inlet timeout']
                    }
                }
            },
            lg: {
                name: 'LG',
                hasModels: true,
                models: {
                    'Direct Drive 8kg Front Loader': {
                        name: 'Direct Drive 8kg Front Loader',
                        steps: [
                            'Test Direct Drive motor hall sensor rotor position switch (RPS).',
                            'Inspect drain pump impeller for debris.',
                            'Check pressure switch water level sensor hose.'
                        ],
                        tools: ['Multimeter', 'Socket Wrench Set'],
                        commonIssues: ['LE Error Code / Motor Hall Sensor failure', 'OE Error Code / Drain error', 'UE Error Code / Unbalanced load']
                    },
                    'TurboWash 360 AI DD': {
                        name: 'TurboWash 360 AI DD',
                        steps: ['Inspect recirculation spray pump nozzle.', 'Test 3D multi-spray solenoid valves.'],
                        tools: ['Pliers', 'Multimeter'],
                        commonIssues: ['dE Door Error', 'Spray jets blocked with lint']
                    }
                }
            },
            samsung: {
                name: 'Samsung',
                hasModels: true,
                models: {
                    'EcoBubble 9kg Front Loader': {
                        name: 'EcoBubble 9kg Front Loader',
                        steps: ['Check EcoBubble generator pump motor.', 'Inspect door latch solenoid.'],
                        tools: ['Multimeter'],
                        commonIssues: ['4E / 4C Water Supply Error', '5E / 5C Drain Error']
                    },
                    'QuickDrive AddWash 10.5kg': {
                        name: 'QuickDrive AddWash 10.5kg',
                        steps: ['Check AddWash miniature door microswitch.', 'Inspect dual-drum rear planetary gear belt.'],
                        tools: ['Torx Screwdrivers', 'Multimeter'],
                        commonIssues: ['AddWash door latch sensor error', 'Sudden spin imbalance (Ub)']
                    }
                }
            },
            whirlpool: {
                name: 'Whirlpool',
                hasModels: true,
                models: {
                    'FreshCare+ 8kg Front Loader': {
                        name: 'FreshCare+ 8kg Front Loader',
                        steps: ['Test heating element resistance and earth leakage.', 'Inspect drive belt tension and motor capacitor.'],
                        tools: ['Multimeter', 'Ratchet Set'],
                        commonIssues: ['F08 Heating circuit failure', 'F05 Drain pipe clogged']
                    },
                    'Cabrio / Top Load High Efficiency': {
                        name: 'Cabrio / Top Load High Efficiency',
                        steps: ['Check optical shift actuator motor and optical switch.', 'Inspect tub suspension spring rods.'],
                        tools: ['5/16" Nut Driver', 'Putty Knife'],
                        commonIssues: ['uL / Unbalanced load banging violently', 'F51 Motor rotor position sensor error']
                    }
                }
            },
            bosch: {
                name: 'Bosch',
                hasModels: true,
                models: {
                    'Series 4 / 6 EcoSilence Drive': {
                        name: 'Series 4 / 6 EcoSilence Drive',
                        steps: ['Test EcoSilence brushless motor 3-phase resistance.', 'Check AquaStop valve solenoid on inlet hose.'],
                        tools: ['Multimeter', 'Torx T20'],
                        commonIssues: ['E18 Drain pump error / Drain filter jammed', 'E23 AquaStop activated / Water in base tray']
                    }
                }
            },
            electrolux: {
                name: 'Electrolux',
                hasModels: true,
                models: {
                    'UltimateCare 700 / 800': {
                        name: 'UltimateCare 700 / 800',
                        steps: ['Inspect vapor spray boiler nozzle.', 'Check electronic pressure sensor frequency.'],
                        tools: ['Multimeter', 'Torx Screwdrivers'],
                        commonIssues: ['E20 Draining fault', 'E40 Door lock malfunction']
                    }
                }
            },
            miele: {
                name: 'Miele',
                hasModels: true,
                models: {
                    'TwinDos W1 Chrome Edition': {
                        name: 'TwinDos W1 Chrome Edition',
                        steps: ['Flush TwinDos detergent line with warm water to clear dried gel blockages.', 'Test optical flow meter sensor.'],
                        tools: ['Syringe Flush Kit', 'Multimeter'],
                        commonIssues: ['TwinDos dosing failed alarm', 'Waterproof System Waterproof Fault (F138)']
                    }
                }
            },
            haier: {
                name: 'Haier',
                hasModels: true,
                models: {
                    'I-Pro Series 7 Front Loader': {
                        name: 'I-Pro Series 7 Front Loader',
                        steps: ['Inspect Direct Motion motor magnetic rotor poles.', 'Check door bellow antibacterial seal.'],
                        tools: ['Socket Set', 'Multimeter'],
                        commonIssues: ['CLR FLTR Drain prompt', 'E4 Water level not reached']
                    }
                }
            },
            ge_appliances: {
                name: 'GE Appliances',
                hasModels: true,
                models: {
                    'UltraFresh Vent System with Microban': {
                        name: 'UltraFresh Vent System with Microban',
                        steps: ['Check UltraFresh vent circulation fan motor.', 'Inspect inverter drive board blinking LED codes.'],
                        tools: ['Multimeter', '1/4" Hex Driver'],
                        commonIssues: ['Vent fan not spinning', 'Code 26 / Drain pump timeout']
                    }
                }
            },
            maytag: {
                name: 'Maytag',
                hasModels: true,
                models: {
                    'Commercial Grade Top Loader': {
                        name: 'Commercial Grade Top Loader',
                        steps: ['Inspect drive belt and splutch assembly cam teeth.', 'Test lid lock solenoid.'],
                        tools: ['Nut Driver Set', 'Multimeter'],
                        commonIssues: ['Lid lock flashing red', 'Grinding noise during agitation / Worn splutch']
                    }
                }
            },
            panasonic: {
                name: 'Panasonic',
                hasModels: true,
                models: {
                    'StainMaster+ Top Loader': {
                        name: 'StainMaster+ Top Loader',
                        steps: ['Inspect pulsator water agitation agitator fins.', 'Check drain valve pull motor.'],
                        tools: ['Socket Wrench', 'Multimeter'],
                        commonIssues: ['U11 Drain failure', 'U12 Door open warning']
                    }
                }
            },
            siemens: {
                name: 'Siemens',
                hasModels: true,
                models: {
                    'iQ500 / iQ700 i-Dos': {
                        name: 'iQ500 / iQ700 i-Dos',
                        steps: ['Check i-Dos automatic dispensing pump modules.', 'Test brushless iQdrive motor.'],
                        tools: ['Multimeter', 'Torx T20'],
                        commonIssues: ['E18 Drain blocked', 'E29 Water inlet problem']
                    }
                }
            },
            beko: {
                name: 'Beko',
                hasModels: true,
                models: {
                    'ProSmart Inverter SteamCure': {
                        name: 'ProSmart Inverter SteamCure',
                        steps: ['Test motor carbon brushes or inverter module.', 'Check heating element heater relay.'],
                        tools: ['Multimeter', 'Pliers'],
                        commonIssues: ['E08 Motor tachometer open circuit', 'E04 Door lock fault']
                    }
                }
            },
            candy: {
                name: 'Candy / Hoover',
                hasModels: true,
                models: {
                    'RapidÓ Smart Front Loader': {
                        name: 'RapidÓ Smart Front Loader',
                        steps: ['Inspect door delay lock switch.', 'Test drain pump impeller.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['E03 Drain timeout', 'E01 Door safety lock defective']
                    }
                }
            },
            sharp: {
                name: 'Sharp',
                hasModels: true,
                models: {
                    'Pro-Flex Front Loading Washer': {
                        name: 'Pro-Flex Front Loading Washer',
                        steps: ['Inspect water inlet triple solenoid valves.', 'Check drum shock absorber damping.'],
                        tools: ['Multimeter', 'Pliers'],
                        commonIssues: ['E01 Door improperly closed', 'Excessive vibration during spin']
                    }
                }
            },
            toshiba: {
                name: 'Toshiba',
                hasModels: true,
                models: {
                    'The GreatWaves Inverter Front Load': {
                        name: 'The GreatWaves Inverter Front Load',
                        steps: ['Test Real INVERTER BLDC motor winding resistance.', 'Inspect pressure level sensor switch.'],
                        tools: ['Multimeter'],
                        commonIssues: ['E21 Door lock error', 'E10 Water supply timeout']
                    }
                }
            },
            hisense: {
                name: 'Hisense',
                hasModels: true,
                models: {
                    'PureJet Series Front Loader': {
                        name: 'PureJet Series Front Loader',
                        steps: ['Inspect PureJet water circulation pump.', 'Test drain filter trap.'],
                        tools: ['Multimeter', 'Pliers'],
                        commonIssues: ['F03 Drain fault', 'F01 Water inflow failure']
                    }
                }
            },
            speed_queen: {
                name: 'Speed Queen',
                hasModels: true,
                models: {
                    'TC5 / TR7 Classic Top Loader': {
                        name: 'TC5 / TR7 Classic Top Loader',
                        steps: ['Inspect steel transmission and belt drive pulley.', 'Test heavy-duty mechanical timer switch and motor capacitor.'],
                        tools: ['1/2" Socket', 'Multimeter'],
                        commonIssues: ['Belt slippage', 'Motor start switch centrifugal contact sticky']
                    }
                }
            },
            indesit: {
                name: 'Indesit',
                hasModels: true,
                models: {
                    'Innex Push&Go Front Loader': {
                        name: 'Innex Push&Go Front Loader',
                        steps: ['Check motor brushes for wear (<15mm length).', 'Inspect NTC temperature sensor.'],
                        tools: ['Multimeter', 'Replacement Carbon Brushes'],
                        commonIssues: ['F05 Drain pump blockage', 'F01 Motor triac short']
                    }
                }
            },
            hotpoint: {
                name: 'Hotpoint',
                hasModels: true,
                models: {
                    'ActiveCare Anti-Stain Washer': {
                        name: 'ActiveCare Anti-Stain Washer',
                        steps: ['Inspect door interlock latch.', 'Check wash drum heating element.'],
                        tools: ['Multimeter', 'Torx Keys'],
                        commonIssues: ['F06 Door lock failure', 'F08 Heater relay stuck']
                    }
                }
            }
        }
    },
    water_heater: {
        name: 'Water Heater / Geyser',
        icon: React.createElement(Flame, { className: "w-5 h-5 text-red-500" }),
        brands: {
            kwikot: {
                name: 'Kwikot',
                hasModels: false,
                sizes: {
                    '150L Electric Geyser': {
                        name: '150L Electric Geyser',
                        steps: [
                            'Isolate 230V mains breaker at DB board before opening thermostat cover!',
                            'Test VKF / TSE rod thermostat bi-metal trip contacts and temperature dial.',
                            'Measure spiral flange heating element resistance (~18Ω for 3kW element).',
                            'Check sacrificial magnesium anode rod for corrosion consumption.'
                        ],
                        tools: ['Multimeter', '38mm Element Socket Wrench', 'Voltage Tester Pen'],
                        commonIssues: ['No hot water / Thermostat tripped or element blown', 'Water leaking from pressure control valve (PCV) drain pipe', 'Warm water only']
                    },
                    '200L Electric Geyser': {
                        name: '200L Electric Geyser',
                        steps: ['Measure 4kW element resistance (~13Ω).', 'Inspect expansion relief valve vacuum breakers.'],
                        tools: ['Multimeter', 'Adjustable Wrench'],
                        commonIssues: ['Tripping main house circuit breaker instantly']
                    }
                }
            }
        }
    },
    wifi_router: {
        name: 'Wi-Fi Router / Modem',
        icon: React.createElement(Wifi, { className: "w-5 h-5 text-sky-500" }),
        brands: {
            tp_link: {
                name: 'TP-Link',
                hasModels: true,
                models: {
                    'Archer AX55 Dual-Band Wi-Fi 6': {
                        name: 'Archer AX55 Dual-Band Wi-Fi 6',
                        steps: [
                            'Perform 10-second factory pinhole reset to default factory settings.',
                            'Inspect 12V 1.5A DC power supply adapter voltage under load.',
                            'Check WAN Ethernet RJ45 port transformer filter magnetics.'
                        ],
                        tools: ['Paperclip', 'Multimeter'],
                        commonIssues: ['Orange Internet Light / No WAN connection', '5GHz Wi-Fi network missing', 'Router reboots continuously under high load']
                    },
                    'Deco Mesh X50 / X60': {
                        name: 'Deco Mesh X50 / X60',
                        steps: ['Check Ethernet backhaul port auto-sensing.', 'Test internal ceramic antenna coax micro-connectors.'],
                        tools: ['Multimeter', 'Torx T6'],
                        commonIssues: ['Deco unit flashing red', 'Satellite node dropping mesh sync']
                    }
                }
            },
            netgear: {
                name: 'Netgear (Nighthawk / Orbi)',
                hasModels: true,
                models: {
                    'Nighthawk RAX50 AX5400': {
                        name: 'Nighthawk RAX50 AX5400',
                        steps: ['Flash TFTP emergency recovery firmware.', 'Test 2.4GHz amplifier chip.'],
                        tools: ['TFTP Client Software', 'Multimeter'],
                        commonIssues: ['Corrupt firmware bootloop', '2.4GHz radio disabled']
                    },
                    'Orbi WiFi 6 RBK752 / RBK852': {
                        name: 'Orbi WiFi 6 RBK752 / RBK852',
                        steps: ['Inspect dedicated 5GHz quad-stream backhaul radio.', 'Check 12V 3.5A power brick ripple voltage.'],
                        tools: ['Multimeter', 'Oscilloscope'],
                        commonIssues: ['Magenta ring LED / No internet', 'Power adapter capacitor degradation']
                    }
                }
            },
            asus_networking: {
                name: 'ASUS (RT / ROG Rapture)',
                hasModels: true,
                models: {
                    'RT-AX88U / ROG GT-AX11000': {
                        name: 'RT-AX88U / ROG GT-AX11000',
                        steps: ['Check power switch mechanical toggle.', 'Inspect Broadcom quad-core CPU heatsink thermal pad.', 'Inspect 2.5G WAN/LAN port.'],
                        tools: ['Multimeter', 'Phillips Screwdriver', 'Thermal Pad'],
                        commonIssues: ['Power LED dim / Blown capacitor in PSU', 'Thermal shutdown under gigabit routing']
                    }
                }
            },
            linksys: {
                name: 'Linksys (Velop)',
                hasModels: true,
                models: {
                    'Atlas Pro 6 / Velop Tri-Band': {
                        name: 'Atlas Pro 6 / Velop Tri-Band',
                        steps: ['Inspect status LED light guide prism.', 'Test Qualcomm IPQ series power management IC.'],
                        tools: ['Torx T8', 'Multimeter'],
                        commonIssues: ['Red solid light / WAN handshake timeout', 'Node reboot loop']
                    }
                }
            },
            dlink: {
                name: 'D-Link',
                hasModels: true,
                models: {
                    'EXO AX5400 / DIR-X5460': {
                        name: 'EXO AX5400 / DIR-X5460',
                        steps: ['Inspect external antenna solder joints.', 'Test 12V input filter capacitor.'],
                        tools: ['Soldering Iron', 'Multimeter'],
                        commonIssues: ['Antenna hinge sheared', 'Wi-Fi drops under heavy torrent / stream traffic']
                    }
                }
            },
            ubiquiti: {
                name: 'Ubiquiti UniFi / AmpliFi',
                hasModels: true,
                models: {
                    'UniFi Dream Machine (UDM / UDM Pro)': {
                        name: 'UniFi Dream Machine (UDM / UDM Pro)',
                        steps: ['Inspect internal 40mm fan bearing.', 'Test 802.3at/bt PoE output voltage rail on switch ports.'],
                        tools: ['PoE Tester', 'Torx T10'],
                        commonIssues: ['Fan noise error', 'SFP+ LAN lock-up after optical transceiver swap']
                    },
                    'AmpliFi Alien Wi-Fi 6': {
                        name: 'AmpliFi Alien Wi-Fi 6',
                        steps: ['Inspect circular touchscreen ribbon cable.', 'Test green ring LED under-glow controller.'],
                        tools: ['Plastic Opening Tools', 'Multimeter'],
                        commonIssues: ['Touchscreen unresponsive', 'Power brick failure']
                    }
                }
            },
            google_nest: {
                name: 'Google Nest Wifi',
                hasModels: true,
                models: {
                    'Nest Wifi Pro (Wi-Fi 6E)': {
                        name: 'Nest Wifi Pro (Wi-Fi 6E)',
                        steps: ['Check 6GHz radio regulatory domain calibration.', 'Inspect USB-C 10V/2.25A custom power brick voltage.'],
                        tools: ['USB-C Power Meter', 'Pin Tool'],
                        commonIssues: ['Slow speed over 6GHz channel', 'Yellow blinking pulse / Reset required']
                    }
                }
            },
            amazon_eero: {
                name: 'Amazon eero',
                hasModels: true,
                models: {
                    'eero Pro 6E / eero Max 7': {
                        name: 'eero Pro 6E / eero Max 7',
                        steps: ['Test USB-C PD power negotiation with official 27W/45W adapter.', 'Inspect internal thermal sink.'],
                        tools: ['USB-C Tester', 'Torx T6'],
                        commonIssues: ['Red LED / Internet offline', 'Will not power on with generic USB-C charger']
                    }
                }
            },
            synology_router: {
                name: 'Synology',
                hasModels: true,
                models: {
                    'RT6600ax Tri-Band': {
                        name: 'RT6600ax Tri-Band',
                        steps: ['Inspect 2.5GbE configurable port magnetics.', 'Verify SRM flash memory chip solder points.'],
                        tools: ['Multimeter', 'Network Cable Tester'],
                        commonIssues: ['SRM OS update boot failure', '5.9GHz UNII-4 band DFS radar false trip']
                    }
                }
            },
            mikrotik: {
                name: 'MikroTik',
                hasModels: true,
                models: {
                    'hAX³ / hAP ax²': {
                        name: 'hAX³ / hAP ax²',
                        steps: ['Connect via WinBox MAC-Telnet.', 'Inspect passive PoE in/out diode protection.'],
                        tools: ['WinBox Software', 'Multimeter'],
                        commonIssues: ['Kernel panic after ROS update', 'Blown PoE pass-through diode']
                    }
                }
            },
            avm_fritz: {
                name: 'AVM (FRITZ!Box)',
                hasModels: true,
                models: {
                    'FRITZ!Box 7590 AX / 6690': {
                        name: 'FRITZ!Box 7590 AX / 6690',
                        steps: ['Inspect DSL modem front-end analog surge protection varistors.', 'Test internal DECT base station transmitter.'],
                        tools: ['Multimeter', 'Oscilloscope'],
                        commonIssues: ['DSL sync loss after lightning storm', 'Power LED flashing steadily']
                    }
                }
            },
            tenda: {
                name: 'Tenda',
                hasModels: true,
                models: {
                    'Nova MW6 / TX12 Pro': {
                        name: 'Nova MW6 / TX12 Pro',
                        steps: ['Check Realtek / Broadcom SoC solder ball reflow.', 'Inspect barrel plug socket pins.'],
                        tools: ['Soldering Iron', 'Multimeter'],
                        commonIssues: ['Mesh node refuses to sync', 'Intermittent power socket']
                    }
                }
            }
        }
    },
    led_strip: {
        name: 'LED Strip Lights',
        icon: React.createElement(Sparkles, { className: "w-5 h-5 text-amber-400" }),
        brands: {
            govee: {
                name: 'Govee',
                hasModels: true,
                models: {
                    'RGBIC LED Strip Light 10m': {
                        name: 'RGBIC LED Strip Light 10m',
                        steps: ['Inspect 12V 2A DC power supply adapter.', 'Test inline Bluetooth/Wi-Fi controller board MOSFETs.', 'Check copper cut segment solder joint continuity.'],
                        tools: ['Multimeter', 'Soldering Iron', '12V Power Supply'],
                        commonIssues: ['Half of strip unlit', 'Wrong color channel output', 'Unresponsive Wi-Fi controller']
                    }
                }
            }
        }
    },
    smart_plug: {
        name: 'Smart Plug',
        icon: React.createElement(Plug, { className: "w-5 h-5 text-emerald-500" }),
        brands: {
            tp_link_tapo: {
                name: 'TP-Link Tapo',
                hasModels: true,
                models: {
                    'Tapo P100 / P110 Mini': {
                        name: 'Tapo P100 / P110 Mini',
                        steps: ['Check internal 10A latching relay contacts.', 'Inspect AC-DC step-down buck converter IC.'],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['Clicking relay but no power output', 'Wi-Fi pairing timeout']
                    }
                }
            }
        }
    },
    smart_watch: {
        name: 'Smart Watch / Fitness Tracker',
        icon: React.createElement(Activity, { className: "w-5 h-5 text-blue-500" }),
        brands: {
            apple_watch: {
                name: 'Apple Watch',
                hasModels: true,
                models: {
                    'Series 8 / 9 / Ultra 2': {
                        name: 'Series 8 / 9 / Ultra 2',
                        steps: ['Heat OLED display perimeter seal to 70°C.', 'Inspect magnetic wireless charging coil flex.', 'Test Li-ion cell voltage.'],
                        tools: ['Heat Pad', 'Precision Spudger', 'Multimeter'],
                        commonIssues: ['Popped screen / Swollen battery', 'Digital Crown sticky / Unresponsive', 'Red exclamation mark error']
                    },
                    'Apple Watch SE (2nd Gen)': {
                        name: 'Apple Watch SE (2nd Gen)',
                        steps: ['Inspect composite back crystal.', 'Test force touch sensor gasket.'],
                        tools: ['Heat Mat', 'Curved Spudger'],
                        commonIssues: ['Screen glass cracked', 'Battery health below 80%']
                    }
                }
            },
            garmin: {
                name: 'Garmin',
                hasModels: true,
                models: {
                    'Fenix 7 / Epix Pro / Forerunner 965': {
                        name: 'Fenix 7 / Epix Pro / Forerunner 965',
                        steps: ['Clean 4-pin proprietary pogo pin charging contacts with isopropyl alcohol.', 'Inspect barometer / altimeter sensor port diaphragm.'],
                        tools: ['Isopropyl Alcohol', 'Torx T3 / T5 Screwdriver'],
                        commonIssues: ['Intermittent charging / Loose cable fit', 'Altimeter erratic readings after swimming in chlorinated pool']
                    },
                    'Venu 2 / 3 AMOLED': {
                        name: 'Venu 2 / 3 AMOLED',
                        steps: ['Check optical Elevate heart rate sensor lens for micro-fractures.', 'Inspect vibrating haptic motor.'],
                        tools: ['Precision Torx', 'Alcohol Wipes'],
                        commonIssues: ['HR sensor cracked from sweat exposure', 'Vibration weak']
                    }
                }
            },
            samsung_watch: {
                name: 'Samsung Galaxy Watch',
                hasModels: true,
                models: {
                    'Galaxy Watch 4 / 5 / 6 Classic': {
                        name: 'Galaxy Watch 4 / 5 / 6 Classic',
                        steps: ['Inspect mechanical rotating bezel ball bearings and spring clips.', 'Test BioActive BIA bioelectrical impedance sensor.'],
                        tools: ['Y00 Screwdriver', 'Heat Gun', 'Fine Tweezers'],
                        commonIssues: ['Rotating bezel gritty or jammed with grit', 'Watch rebooting continuously during Samsung Health workout']
                    }
                }
            },
            fitbit: {
                name: 'Fitbit (Google)',
                hasModels: true,
                models: {
                    'Charge 5 / 6 / Sense 2': {
                        name: 'Charge 5 / 6 / Sense 2',
                        steps: ['Inspect metal magnetic charging contact dimples for corrosion pitting.', 'Test capacitive touch haptic groove.'],
                        tools: ['Fiberglass Scratch Brush', 'Contact Cleaner'],
                        commonIssues: ['Battery drains in 2 hours / Shorted battery cell', 'Screen completely blank but vibrates on charger']
                    }
                }
            },
            google_pixel_watch: {
                name: 'Google Pixel Watch',
                hasModels: true,
                models: {
                    'Pixel Watch 1 / 2': {
                        name: 'Pixel Watch 1 / 2',
                        steps: ['Inspect dome Gorilla Glass adhesive seal.', 'Clean 4-pin contact pad array on Pixel Watch 2.'],
                        tools: ['Micro Spudger', 'Contact Cleaner'],
                        commonIssues: ['Rear glass back plate fell off', 'Digital haptic crown spinning free without registering']
                    }
                }
            },
            huawei_watch: {
                name: 'Huawei Watch',
                hasModels: true,
                models: {
                    'Watch GT 3 / GT 4 Pro': {
                        name: 'Watch GT 3 / GT 4 Pro',
                        steps: ['Inspect titanium / ceramic rear casing seal.', 'Test TruSeen optical pulse sensor.'],
                        tools: ['Torx T3', 'Multimeter'],
                        commonIssues: ['Step count stuck', 'Wireless charging pad disconnects']
                    }
                }
            },
            amazfit: {
                name: 'Amazfit (Zepp Health)',
                hasModels: true,
                models: {
                    'GTR 4 / T-Rex 2 / Cheetah': {
                        name: 'GTR 4 / T-Rex 2 / Cheetah',
                        steps: ['Inspect dual-band circularly polarized GPS antenna.', 'Check dual magnetic charging contacts.'],
                        tools: ['Torx Screwdriver', 'Multimeter'],
                        commonIssues: ['GPS satellite lock slow', 'Charging pins oxidized']
                    }
                }
            },
            suunto: {
                name: 'Suunto',
                hasModels: true,
                models: {
                    'Suunto 9 Peak / Vertical': {
                        name: 'Suunto 9 Peak / Vertical',
                        steps: ['Inspect sapphire glass bezel retaining ring.', 'Test barometer pressure sensor port.'],
                        tools: ['Torx T4', 'Pry Tool'],
                        commonIssues: ['Compass calibration loop', 'Battery drain in GPS tracking mode']
                    }
                }
            },
            polar: {
                name: 'Polar',
                hasModels: true,
                models: {
                    'Vantage V2 / Grit X Pro': {
                        name: 'Vantage V2 / Grit X Pro',
                        steps: ['Clean Precision Prime 10-LED sensor array.', 'Inspect optical wrist HR skin contact electrodes.'],
                        tools: ['Alcohol Pad', 'Torx T4'],
                        commonIssues: ['Erratic heart rate spikes', 'Push button tactile click lost']
                    }
                }
            },
            coros: {
                name: 'Coros',
                hasModels: true,
                models: {
                    'Pace 2 / 3 / Vertix 2': {
                        name: 'Pace 2 / 3 / Vertix 2',
                        steps: ['Inspect Digital Dial optical encoder mechanism.', 'Test silicone charging port dust cover.'],
                        tools: ['Fine Tweezers', 'Precision Screwdriver'],
                        commonIssues: ['Digital dial skipping menu items', 'Moisture inside charging port']
                    }
                }
            },
            withings: {
                name: 'Withings',
                hasModels: true,
                models: {
                    'ScanWatch 2 / Horizon': {
                        name: 'ScanWatch 2 / Horizon',
                        steps: ['Inspect mechanical analog clock hands gearbox.', 'Test PPG / SpO2 / ECG stainless steel bezel electrodes.'],
                        tools: ['Watch Case Opener', 'Tweezers'],
                        commonIssues: ['Analog hands out of sync with PMOLED sub-dial', 'Back cover glass dislodged']
                    }
                }
            },
            xiaomi_wearables: {
                name: 'Xiaomi Mi Band',
                hasModels: true,
                models: {
                    'Smart Band 7 / 8 / 9 Pro': {
                        name: 'Smart Band 7 / 8 / 9 Pro',
                        steps: ['Inspect quick-release strap lug mechanisms.', 'Test magnetic 2-pin charger polarity.'],
                        tools: ['Fine Pick', 'Multimeter'],
                        commonIssues: ['Screen unresponsive to touch gestures', 'Fast discharge after moisture exposure']
                    }
                }
            }
        }
    },
    smoke_detector: {
        name: 'Smoke Detector / Carbon Monoxide Alarm',
        icon: React.createElement(ShieldAlert, { className: "w-5 h-5 text-red-500" }),
        brands: {
            first_alert: {
                name: 'First Alert / BRK Electronics',
                hasModels: true,
                models: {
                    'BRK 3120B Hardwired / Onelink Smart Smoke & CO': {
                        name: 'BRK 3120B Hardwired / Onelink Smart Smoke & CO',
                        steps: ['Clean dual ionization & photoelectric chamber with compressed air can (30-degree angle).', 'Replace 9V alkaline backup battery or test 10-year sealed lithium cell.', 'Inspect AC 120V interconnect wiring harness (orange/yellow signal wire).'],
                        tools: ['Compressed Air Can', '9V Battery', 'Multimeter'],
                        commonIssues: ['Single chirp every 60 seconds (low battery or end-of-life 10-year warning)', 'Continuous false alarming caused by spider/dust in optical sensing chamber', 'Interconnected alarms all sounding simultaneously']
                    }
                }
            },
            kidde: {
                name: 'Kidde',
                hasModels: true,
                models: {
                    'Worry-Free 10-Year Sealed Battery / TruSense Intelligent': {
                        name: 'Worry-Free 10-Year Sealed Battery / TruSense Intelligent',
                        steps: ['Test dual-spectrum optical smoke sensor diodes.', 'Inspect rear permanent deactivation switch slide.', 'Check electrochemical carbon monoxide sensor life counter.'],
                        tools: ['Vacuum Cleaner Crevice Tool', 'Multimeter'],
                        commonIssues: ['3 chirps every 30 seconds (malfunction / sensor fault)', '5 chirps every 30 seconds (10-year end of unit life timer expired)', 'Unit won’t quiet after pressing Hush button']
                    }
                }
            },
            google_nest_smoke: {
                name: 'Google Nest',
                hasModels: true,
                models: {
                    'Nest Protect (2nd Gen) Battery / Wired 120V': {
                        name: 'Nest Protect (2nd Gen) Battery / Wired 120V',
                        steps: ['Inspect Split-Spectrum sensor (450nm and 880nm wavelengths) chamber for dust buildup.', 'Replace all 6 Energizer Ultimate Lithium AA batteries (do not use alkaline).', 'Test Pathlight motion sensor ring LEDs and voice announcement speaker.'],
                        tools: ['6x Energizer Ultimate Lithium AA', 'Compressed Air', 'Torx T6'],
                        commonIssues: ['Yellow glowing ring during Nightly Promise (sensor dust or low battery warning)', 'Steam check false alarm in humid hallway', 'Voice speaker crackling or quiet']
                    }
                }
            },
            x_sense: {
                name: 'X-Sense',
                hasModels: true,
                models: {
                    'XS01-WT Wi-Fi Smart Smoke / SC01 Combo': {
                        name: 'XS01-WT Wi-Fi Smart Smoke / SC01 Combo',
                        steps: ['Inspect miniature photoelectric chamber insect mesh.', 'Replace CR123A 3V lithium battery.', 'Test 2.4GHz Wi-Fi gateway pairing reset button.'],
                        tools: ['CR123A Battery', 'Paperclip'],
                        commonIssues: ['App shows offline status after router reboot', 'Rapid red LED flashing with 85dB siren']
                    }
                }
            },
            aico_ei: {
                name: 'Ei Electronics / Aico',
                hasModels: true,
                models: {
                    'Ei3024 Multi-Sensor / Ei146e Optical Smoke': {
                        name: 'Ei3024 Multi-Sensor / Ei146e Optical Smoke',
                        steps: ['Inspect easi-fit base plate terminal screws.', 'Test AudioLINK acoustic data extraction sensor diagnostics.', 'Check rechargeable vanadium lithium backup cell.'],
                        tools: ['Terminal Screwdriver', 'Multimeter', 'Smartphone AudioLINK App'],
                        commonIssues: ['Yellow fault LED flash with beep every 48 seconds', 'Loose engagement in easi-fit mounting base']
                    }
                }
            }
        }
    },
    soldering_station: {
        name: 'Soldering Station / Iron',
        icon: React.createElement(Flame, { className: "w-5 h-5 text-red-500" }),
        brands: {
            hakko: {
                name: 'Hakko',
                hasModels: true,
                models: {
                    'FX-888D Digital Station': {
                        name: 'FX-888D Digital Station',
                        steps: ['Measure heating element resistance across pins 1-2 (~12Ω) and sensor pins 3-4 (~1.2Ω).', 'Clean iron barrel ground spring contact.'],
                        tools: ['Multimeter', 'Brass Wool'],
                        commonIssues: ['5-E Error / Element or sensor open circuit', 'Temperature fluctuating wild']
                    }
                }
            }
        }
    },
    speaker: {
        name: 'Speaker (Bluetooth / Portable / Active Hi-Fi)',
        icon: React.createElement(Volume2, { className: "w-5 h-5 text-indigo-500" }),
        brands: {
            jbl: {
                name: 'JBL',
                hasModels: true,
                models: {
                    'Charge 5 / Flip 6': {
                        name: 'Charge 5 / Flip 6',
                        steps: ['Inspect USB-C charging port board pins.', 'Test 3.7V 7500mAh 18650/21700 battery pack voltage under load.', 'Replace torn passive radiator rubber surround.'],
                        tools: ['Torx T5 Screwdriver', 'Plastic Pry Tools', 'Multimeter'],
                        commonIssues: ['Red light flashing / Battery dead', 'USB-C port loose / No charging', 'Rattling bass sound']
                    },
                    'Boombox 3 / PartyBox 310': {
                        name: 'Boombox 3 / PartyBox 310',
                        steps: ['Inspect subwoofer driver rubber surround and spider.', 'Test internal 72Wh battery management BMS board.'],
                        tools: ['Torx T10 / T15', 'Soldering Iron', 'Multimeter'],
                        commonIssues: ['Distortion at high volume', 'BMS circuit trips into safety shutdown']
                    }
                }
            },
            bose: {
                name: 'Bose',
                hasModels: true,
                models: {
                    'SoundLink Max / Revolve+ II': {
                        name: 'SoundLink Max / Revolve+ II',
                        steps: ['Inspect 360-degree deflector acoustic transducer.', 'Test bottom charging cradle contact pads.'],
                        tools: ['Torx T8', 'Contact Cleaner'],
                        commonIssues: ['Charging cradle pogo pins stuck down', 'Flashing red battery error LED']
                    },
                    'SoundLink Flex / Micro': {
                        name: 'SoundLink Flex / Micro',
                        steps: ['Inspect IP67 silicone outer shell and PositionIQ orientation sensor.', 'Test sealed passive radiators.'],
                        tools: ['Plastic Pry Tool', 'Torx T6'],
                        commonIssues: ['Speaker won’t power on after salt water submersion', 'Bluetooth pairing loop']
                    }
                }
            },
            sonos: {
                name: 'Sonos',
                hasModels: true,
                models: {
                    'Era 300 / Era 100 Smart Speaker': {
                        name: 'Era 300 / Era 100 Smart Speaker',
                        steps: ['Inspect directional acoustic horn wave-guides.', 'Test USB-C Line-In / Ethernet adapter sensing logic.'],
                        tools: ['Torx T10', 'Plastic Spudger'],
                        commonIssues: ['Trueplay tuning microphone error', 'Line-In adapter unrecognized']
                    },
                    'Move 2 / Roam 2 Portable': {
                        name: 'Move 2 / Roam 2 Portable',
                        steps: ['Inspect user-replaceable lithium battery dock pins.', 'Test Qi wireless charging receiver coil.'],
                        tools: ['Torx T8', 'Multimeter'],
                        commonIssues: ['Roam battery drains completely and won’t revive without high-amp charger', 'Dock charging alignment']
                    }
                }
            },
            marshall: {
                name: 'Marshall',
                hasModels: true,
                models: {
                    'Stanmore III / Acton III Bluetooth': {
                        name: 'Stanmore III / Acton III Bluetooth',
                        steps: ['Inspect brass analog volume, bass, and treble potentiometers for scratchy noise.', 'Check internal 50W Class D woofer amplifier.'],
                        tools: ['DeoxIT Potentiometer Cleaner', 'Phillips #2'],
                        commonIssues: ['Scratchy static sound when adjusting volume brass knob', 'Power toggle switch snapped']
                    },
                    'Emberton II / Willen Portable': {
                        name: 'Emberton II / Willen Portable',
                        steps: ['Inspect multi-directional brass control knob microswitches.', 'Test 20-hour battery cell voltage.'],
                        tools: ['Torx T6', 'Fine Tweezers'],
                        commonIssues: ['Multi-directional knob unresponsive in one axis', 'USB-C port moisture lock']
                    }
                }
            },
            ultimate_ears: {
                name: 'Ultimate Ears (UE)',
                hasModels: true,
                models: {
                    'Megaboom 3 / Wonderboom 3': {
                        name: 'Megaboom 3 / Wonderboom 3',
                        steps: ['Peel weather-sealed rubber spine gasket to access internal chassis.', 'Inspect large tactile (+ / -) volume dome switches.'],
                        tools: ['UE D-Ring Tool', 'Heat Gun', 'Torx T8'],
                        commonIssues: ['Micro-USB / Type-C port silicone flap torn', 'Speaker buzzes on deep bass due to loose internal weight']
                    },
                    'Hyperboom Portable Party Speaker': {
                        name: 'Hyperboom Portable Party Speaker',
                        steps: ['Inspect adaptive EQ microphone sensor.', 'Test dual 4.5" woofers and passive radiators.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['Optical audio input intermittent', 'Power brick DC plug loose']
                    }
                }
            },
            harman_kardon: {
                name: 'Harman Kardon',
                hasModels: true,
                models: {
                    'Onyx Studio 8 / Aura Studio 4': {
                        name: 'Onyx Studio 8 / Aura Studio 4',
                        steps: ['Inspect iconic round chassis woofer suspension spider.', 'Test internal 3250mAh Li-ion battery pouch.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Distortion at moderate volume (battery sag under bass hit)', 'Self-tuning microphone failure']
                    }
                }
            },
            bang_olufsen: {
                name: 'Bang & Olufsen (B&O)',
                hasModels: true,
                models: {
                    'Beolit 20 / Beosound A1 2nd Gen': {
                        name: 'Beolit 20 / Beosound A1 2nd Gen',
                        steps: ['Inspect top Qi wireless charging pad coil on Beolit.', 'Test pearl-blasted aluminum dome driver voice coils.'],
                        tools: ['Torx T6 / T10', 'Multimeter'],
                        commonIssues: ['Qi charging tray overheating phone', 'Touch capacitive button ribbon loose']
                    }
                }
            },
            anker_soundcore: {
                name: 'Anker Soundcore',
                hasModels: true,
                models: {
                    'Motion Boom Plus / Motion X600': {
                        name: 'Motion Boom Plus / Motion X600',
                        steps: ['Inspect titanium driver domes.', 'Test LDAC high-res audio Bluetooth receiver board.'],
                        tools: ['Torx T8', 'Multimeter'],
                        commonIssues: ['Spatial audio speaker rattle', 'Firmware update timeout over Bluetooth']
                    }
                }
            },
            klipsch_spk: {
                name: 'Klipsch',
                hasModels: true,
                models: {
                    'The Three Plus / ProMedia Heritage 2.1': {
                        name: 'The Three Plus / ProMedia Heritage 2.1',
                        steps: ['Inspect real wood veneer cabinet internal dampening acoustic batting.', 'Test optical/phono preamp input RCA jacks.'],
                        tools: ['Phillips #2', 'Contact Cleaner'],
                        commonIssues: ['Phono ground hum / buzzing', 'Optical PCM bitstream drop']
                    }
                }
            },
            edifier_spk: {
                name: 'Edifier',
                hasModels: true,
                models: {
                    'S1000MKII / R1280DB Powered Bookshelf': {
                        name: 'S1000MKII / R1280DB Powered Bookshelf',
                        steps: ['Inspect 4-pin interconnect cable between active and passive speakers.', 'Test side rotary dials for bass/treble/volume.'],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['Passive speaker silent (interconnect cable pin bent)', 'Rotary volume encoder jumping numbers']
                    }
                }
            },
            audioengine_spk: {
                name: 'Audioengine',
                hasModels: true,
                models: {
                    'A5+ Wireless / HD3': {
                        name: 'A5+ Wireless / HD3',
                        steps: ['Inspect internal 24-bit DAC and toroidal power transformer.', 'Test custom Kevlar woofers and silk tweeters.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Transformer low hum in standby', 'Left speaker silent']
                    }
                }
            },
            kef_spk: {
                name: 'KEF',
                hasModels: true,
                models: {
                    'LS50 Wireless II / LSX II': {
                        name: 'LS50 Wireless II / LSX II',
                        steps: ['Inspect 12th Gen Uni-Q driver array with Metamaterial Absorption Technology (MAT).', 'Test internal dual Class D + Class A/B amplifiers and cooling heatsink.'],
                        tools: ['Hex Key Set', 'Torx Screwdrivers', 'Multimeter'],
                        commonIssues: ['Amber/red flashing light on master speaker (network sync error)', 'Inter-speaker wireless link latency']
                    }
                }
            },
            bowers_wilkins: {
                name: 'Bowers & Wilkins',
                hasModels: true,
                models: {
                    'Zeppelin / Formation Wedge': {
                        name: 'Zeppelin / Formation Wedge',
                        steps: ['Inspect decoupled Double Dome tweeters and 6-inch subwoofer driver.', 'Test 240W high-performance digital amplifier PCB.'],
                        tools: ['Torx T10 / T15', 'Multimeter'],
                        commonIssues: ['AirPlay 2 streaming dropout', 'Subwoofer DSP excursion limiter distortion']
                    }
                }
            },
            tribit_spk: {
                name: 'Tribit',
                hasModels: true,
                models: {
                    'StormBox Blast 90W Loud Speaker': {
                        name: 'StormBox Blast 90W Loud Speaker',
                        steps: ['Inspect 32 LED party light ribbon controller.', 'Test 9-cell 18650 high-capacity battery pack.'],
                        tools: ['Torx Screwdriver', 'Multimeter'],
                        commonIssues: ['LED light pulse out of sync with beat', 'XBass EQ button tactile switch unresponsive']
                    }
                }
            },
            telefunken_speaker: {
                name: 'Telefunken Speaker',
                hasModels: true,
                models: {
                    'TTS-500 / TBT-400 / TTW-200 Party Sound Tower': {
                        name: 'TTS-500 / TBT-400 / TTW-200 Party Sound Tower',
                        steps: [
                            'Inspect high-power Class D stereo/bridge-tied amplifier IC (TPA3116D2 / CS8673E) and heatsink mounting.',
                            'Check 12V 7Ah SLA or 11.1V 3S lithium battery pack charge controller PCB.',
                            'Test microphone 1/4" input jack leaf contacts and digital echo preamplifier potentiometer.',
                            'Inspect front dancing LED flame ring lighting driver circuitry.'
                        ],
                        tools: ['Phillips Screwdriver', 'Multimeter', 'Soldering Iron', 'DeoxIT Contact Cleaner'],
                        commonIssues: ['Distorted buzzing bass at high volume (loose woofer screws or ruptured surround foam)', 'Microphone echo knob crackles violently when rotated', 'Dead on battery power but operates when plugged into AC wall adapter']
                    }
                }
            },
            harwa_speaker: {
                name: 'Harwa Speaker',
                hasModels: true,
                models: {
                    'HW-888 / HW-12A / HW-15A Rechargeable Trolley Speaker': {
                        name: 'HW-888 / HW-12A / HW-15A Rechargeable Trolley Speaker',
                        steps: [
                            'Check 12V DC input charging barrel jack and internal battery charge indicator LED circuit.',
                            'Measure 12" / 15" woofer voice coil impedance (4 ohms); check for rubbing voice coil in magnetic gap.',
                            'Inspect piezoceramic horn tweeter protection capacitor (typically 2.2uF 50V non-polar bipoloar cap).',
                            'Test telescoping luggage handle lock release pin mechanism.'
                        ],
                        tools: ['Multimeter', 'Soldering Iron', 'Replacement 2.2uF Non-Polarized Capacitor'],
                        commonIssues: ['Treble horn tweeter completely silent (blown 2.2uF crossover capacitor from high-frequency feedback)', 'Battery refuses to take a charge (bad lead-acid/lithium cell or damaged charging port)', 'Wireless VHF/UHF microphone cuts out beyond 3 meters']
                    }
                }
            },
            condere_speaker: {
                name: 'Condere Speaker',
                hasModels: true,
                models: {
                    'CDSP-80 / CDSP-120 Portable Wireless Bluetooth Party Speaker': {
                        name: 'CDSP-80 / CDSP-120 Portable Wireless Bluetooth Party Speaker',
                        steps: [
                            'Inspect Micro-USB / Type-C charging port solder anchor tabs on main amplifier PCB.',
                            'Test 3.7V 18650 lithium battery cell terminal voltage under load.',
                            'Inspect rotary master volume potentiometer for dirt or carbon wear.'
                        ],
                        tools: ['Soldering Iron', 'Multimeter', 'Hot Glue Gun'],
                        commonIssues: ['USB charging port broke off inside housing when charging cable was inserted', 'Speaker produces loud cyclic ticking sound and turns off (depleted 18650 cell triggering BMS UVP lock)']
                    }
                }
            },
            zealot: {
                name: 'Zealot (Shenzhen)',
                hasModels: true,
                models: {
                    'S67 60W / S32 / S51 Deep Bass Portable': {
                        name: 'S67 60W / S32 / S51 Deep Bass Portable',
                        steps: [
                            'Inspect dual high-excursion passive bass radiators on cabinet ends.',
                            'Test 14,400mAh multi-cell internal battery bank voltage balance.',
                            'Inspect rubberized silicone control panel buttons for tactile click.'
                        ],
                        tools: ['Torx Screwdriver', 'Multimeter', 'Plastic Spudger'],
                        commonIssues: ['Flapping noise on deep bass notes (passive radiator rim unglued)', 'Power button requires heavy force to activate']
                    }
                }
            },
            tronsmart: {
                name: 'Tronsmart',
                hasModels: true,
                models: {
                    'Bang Max 130W / Mega Pro 60W': {
                        name: 'Bang Max 130W / Mega Pro 60W',
                        steps: ['Inspect SoundPulse audio DSP processor.', 'Test 3-way sound system crossover wiring.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['Sound drops intermittently when SoundPulse EQ is engaged', 'RGB circular halo light desynced']
                    }
                }
            },
            wking: {
                name: 'W-KING',
                hasModels: true,
                models: {
                    'D8 / X10 / T9 Pro 80W Heavy Duty Outdoor': {
                        name: 'D8 / X10 / T9 Pro 80W Heavy Duty Outdoor',
                        steps: ['Inspect rugged shockproof casing seal.', 'Test dual tweeters and dual neodymium subwoofers.'],
                        tools: ['Hex Drivers', 'Multimeter'],
                        commonIssues: ['Left woofer dead', 'Power bank reverse charging port disabled']
                    }
                }
            }
        }
    },
    subwoofer: {
        name: 'Subwoofer (Powered Home Theater / Pro Audio)',
        icon: React.createElement(Volume2, { className: "w-5 h-5 text-purple-600" }),
        brands: {
            svs: {
                name: 'SVS',
                hasModels: true,
                models: {
                    'PB-1000 Pro / SB-1000 Pro': {
                        name: 'PB-1000 Pro / SB-1000 Pro',
                        steps: ['Inspect Class-D Sledge amplifier PCB power supply capacitors.', 'Check woofer voice coil resistance (~4Ω).', 'Test BLE smartphone app DSP control board.'],
                        tools: ['Multimeter', 'Soldering Station'],
                        commonIssues: ['Humming noise / Blown filter cap', 'No power / Blown mains slow-blow fuse', 'Auto-on signal sensing fails to wake sub']
                    },
                    'PB-3000 / SB-3000 (800W RMS)': {
                        name: 'PB-3000 / SB-3000 (800W RMS)',
                        steps: ['Inspect dual 13-inch split-wind voice coil.', 'Test MOSFET high-current discrete output stages.'],
                        tools: ['Torx T15', 'Multimeter', 'Capacitance Meter'],
                        commonIssues: ['Protection mode red LED', 'Port chuffing noise at 20Hz infrasonic peaks']
                    }
                }
            },
            klipsch_sub: {
                name: 'Klipsch',
                hasModels: true,
                models: {
                    'Reference Premiere RP-1400SW / R-121SW': {
                        name: 'Reference Premiere RP-1400SW / R-121SW',
                        steps: ['Inspect Spun Copper Cerametallic woofer voice coil.', 'Test internal standby power transformer (TNY278/similar standby IC).'],
                        tools: ['Phillips #2', 'Multimeter', 'Soldering Iron'],
                        commonIssues: ['Subwoofer dead / Standby green light does not illuminate (classic standby capacitor C9 failure)', 'Chuffing through front Aerofoil slot port']
                    }
                }
            },
            rel_sub: {
                name: 'REL Acoustics',
                hasModels: true,
                models: {
                    'Serie T/9x / T/7x': {
                        name: 'Serie T/9x / T/7x',
                        steps: ['Inspect Neutrik Speakon High-Level input cable connection and resistors.', 'Test Class A/B linear amplifier power stage and heavy toroidal transformer.'],
                        tools: ['Multimeter', 'Neutrik Speakon Connector Tool'],
                        commonIssues: ['Ground loop 60Hz hum over High-Level input (check black wire ground to chassis)', 'Rotary crossover click detent stiff']
                    },
                    'HT/1205 MKII (Pure Home Theater)': {
                        name: 'HT/1205 MKII (Pure Home Theater)',
                        steps: ['Inspect 500W NextGen5 Class D amplifier board.', 'Test carbonGlas lightweight driver cone.'],
                        tools: ['Torx T15', 'Multimeter'],
                        commonIssues: ['RCA LFE input jack loose from PCB', 'No output when receiving low-level signal']
                    }
                }
            },
            polk_sub: {
                name: 'Polk Audio',
                hasModels: true,
                models: {
                    'HTS 12 / HTS 10 Power Port': {
                        name: 'HTS 12 / HTS 10 Power Port',
                        steps: ['Inspect patented floor-firing Power Port diffuser cone.', 'Test auto-on audio signal threshold comparator circuit.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Relay clicking on and off intermittently', 'Bass distortion at moderate volume']
                    },
                    'PSW10 / PSW505': {
                        name: 'PSW10 / PSW505',
                        steps: ['Inspect plate amplifier bridge rectifier and filtering electrolytic capacitors.', 'Check thermal fuse embedded in primary transformer windings.'],
                        tools: ['Multimeter', 'Soldering Iron'],
                        commonIssues: ['Loud heartbeat thumping sound (failing power supply capacitors)', 'Blown T2AL 250V fuse']
                    }
                }
            },
            monolith_sub: {
                name: 'Monolith (Monoprice)',
                hasModels: true,
                models: {
                    'THX Ultra 10" / 12" / 15" Powered Sub': {
                        name: 'THX Ultra 10" / 12" / 15" Powered Sub',
                        steps: ['Inspect massive 100+ lb HDF cabinet internal bracing.', 'Test Claridy Audio 500W/1000W Class D plate amp with DSP.'],
                        tools: ['Hex Key Set', 'Multimeter'],
                        commonIssues: ['Amplifier module failure / Red fault LED', 'Foam port plug disintegration over time']
                    }
                }
            },
            bic_america: {
                name: 'BIC America',
                hasModels: true,
                models: {
                    'Formula F-12 / America RTR-EV1200': {
                        name: 'Formula F-12 / America RTR-EV1200',
                        steps: ['Inspect 475W peak BASH design amplifier board.', 'Check high-excursion injection-molded woofer.'],
                        tools: ['Phillips #2', 'Multimeter'],
                        commonIssues: ['Volume potentiometer scratchy', 'Loud buzz when audio cables are touched']
                    }
                }
            },
            jl_audio: {
                name: 'JL Audio',
                hasModels: true,
                models: {
                    'Dominion d110 / Fathom f112v2': {
                        name: 'Dominion d110 / Fathom f112v2',
                        steps: ['Inspect DMA-optimized motor system and extreme excursion W-Cone.', 'Calibrate D-AP automated room optimization circuit.'],
                        tools: ['Torx T15 / T20', 'Multimeter'],
                        commonIssues: ['Surround foam rot after 10+ years', 'Switching power supply PFC rail drop']
                    }
                }
            },
            martinlogan_sub: {
                name: 'MartinLogan',
                hasModels: true,
                models: {
                    'Dynamo 1100X / Dynamo 800X': {
                        name: 'Dynamo 1100X / Dynamo 800X',
                        steps: ['Inspect inverted surround inverted-cone woofer.', 'Test Anthem Room Correction (ARC) USB communication port.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['ARC calibration microphone not detected', 'Down-firing to front-firing conversion foot rattle']
                    }
                }
            },
            def_tech: {
                name: 'Definitive Technology',
                hasModels: true,
                models: {
                    'SuperCube 4000 / Descend DN10': {
                        name: 'SuperCube 4000 / Descend DN10',
                        steps: ['Inspect dual Ultra-Low Bass passive radiators and active driver.', 'Test front-panel hidden LED display matrix.'],
                        tools: ['Phillips #2', 'Multimeter'],
                        commonIssues: ['Passive radiator surround tearing', 'Display LED segments burned out']
                    }
                }
            },
            yamaha_sub: {
                name: 'Yamaha',
                hasModels: true,
                models: {
                    'NS-SW300 / HS8S Studio Subwoofer': {
                        name: 'NS-SW300 / HS8S Studio Subwoofer',
                        steps: ['Inspect Twisted Flare Port aerodynamics and internal drive coil.', 'Test Advanced YST II (Yamaha Active Servo Technology) negative-impedance converter.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Phase switch oxidation causing intermittent cutouts', 'Power relay clicking on low volume']
                    }
                }
            }
        }
    },
    toaster: {
        name: 'Toaster (2-Slice / 4-Slice / Steam)',
        icon: React.createElement(Flame, { className: "w-5 h-5 text-amber-500" }),
        brands: {
            dualit: {
                name: 'Dualit (Handbuilt in the UK)',
                hasModels: true,
                models: {
                    'Classic 2-Slice / 4-Slice Handbuilt': {
                        name: 'Classic 2-Slice / 4-Slice Handbuilt',
                        steps: ['Inspect ProHeat patented armored filament elements.', 'Test mechanical clockwork timer switch contacts.', 'Check manual ejector lever linkage and crumb tray catch.'],
                        tools: ['Screwdrivers', 'Multimeter', 'Replacement ProHeat Element'],
                        commonIssues: ['Mechanical timer stops ticking down', 'Individual heating element strip burned out (easily replaceable modular parts)', 'Ejector knob lever loose']
                    }
                }
            },
            breville_toaster: {
                name: 'Breville',
                hasModels: true,
                models: {
                    'Die-Cast Smart Toaster / "A Bit More" 2-Slice': {
                        name: 'Die-Cast Smart Toaster / "A Bit More" 2-Slice',
                        steps: ['Inspect motorized carriage elevator lift motor and drive gear belt.', 'Test LED browning progress indicator board.', 'Clean optical toast shade sensor.'],
                        tools: ['Torx T10', 'Multimeter'],
                        commonIssues: ['Motorized elevator jams halfway down or up', '"A Bit More" button microswitch unresponsive', 'Beep signal muted']
                    }
                }
            },
            smeg_toaster: {
                name: 'SMEG',
                hasModels: true,
                models: {
                    '50s Retro Style 2-Slice / 4-Slice TSF01': {
                        name: '50s Retro Style 2-Slice / 4-Slice TSF01',
                        steps: ['Inspect electromagnet base latch coil (requires 12V from PCB to hold carriage down).', 'Test rotary 6-level browning knob potentiometer.', 'Check chrome ball lever handle screw.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Carriage lever will not lock down (dead electromagnet coil or dirty contacts)', 'Uneven browning on outer elements']
                    }
                }
            },
            balmuda: {
                name: 'BALMUDA',
                hasModels: true,
                models: {
                    'The Toaster Steam-Powered K01M / K05M': {
                        name: 'The Toaster Steam-Powered K01M / K05M',
                        steps: ['Descale 5cc water injection boiler pipe with citric acid.', 'Inspect upper and lower quartz halogen heating tubes.', 'Test electronic precision thermistor PID controller.'],
                        tools: ['Citric Acid', 'Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Steam boiler pipe clogged with mineral scale (no steam generated)', 'Blinking orange error light / Quartz heater failure']
                    }
                }
            },
            kitchenaid_toaster: {
                name: 'KitchenAid',
                hasModels: true,
                models: {
                    'Pro Line Series 2-Slice / 4-Slice Automatic': {
                        name: 'Pro Line Series 2-Slice / 4-Slice Automatic',
                        steps: ['Inspect auto-sensor motorized lowering mechanism.', 'Test keep-warm heating cycle relay.'],
                        tools: ['Torx Screwdrivers', 'Multimeter'],
                        commonIssues: ['Automatic bread drop sensor does not detect bread in slot', 'Motorized carriage gear grinding']
                    }
                }
            },
            cuisinart_toaster: {
                name: 'Cuisinart',
                hasModels: true,
                models: {
                    'Custom Select 4-Slice CPT-180 / Touchscreen': {
                        name: 'Custom Select 4-Slice CPT-180 / Touchscreen',
                        steps: ['Clean dual crumb trays.', 'Inspect dual independent carriage latch electromagnets and mica element sheets.'],
                        tools: ['Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['One side carriage lever won’t catch down', 'Bagel mode button stuck']
                    }
                }
            },
            russell_hobbs: {
                name: 'Russell Hobbs',
                hasModels: true,
                models: {
                    'Retro Style / Classic 2-Slice': {
                        name: 'Retro Style / Classic 2-Slice',
                        steps: ['Inspect countdown toast timer analog gauge needle linkage.', 'Test lift & look carriage lever tension spring.'],
                        tools: ['Multimeter', 'Soft Brush'],
                        commonIssues: ['Gauge needle stuck', 'Carriage handle won’t stay down', 'One side element not glowing']
                    }
                }
            }
        }
    },
    water_dispenser: {
        name: 'Water Dispenser / Water Cooler',
        icon: React.createElement(Droplets, { className: "w-5 h-5 text-sky-400" }),
        brands: {
            primo: {
                name: 'Primo Water',
                hasModels: true,
                models: {
                    'Deluxe Bottom Loading Hot/Cold Dispenser': {
                        name: 'Deluxe Bottom Loading Hot/Cold Dispenser',
                        steps: ['Inspect bottom water bottle suction straw pump motor and check-valve.', 'Test hot tank band heater snap-disc thermal cutouts.', 'Inspect cold tank mini-compressor start relay.'],
                        tools: ['Phillips Screwdriver', 'Multimeter', 'Sanitizing Solution'],
                        commonIssues: ['Flashing empty bottle LED when bottle is full (air lock in suction tube)', 'Water not heating (tripped manual reset button on hot tank thermostat)', 'No cold water (compressor relay click)']
                    }
                }
            },
            avalon: {
                name: 'Avalon',
                hasModels: true,
                models: {
                    'A5 Self-Cleaning Bottom Loading / Bottleless': {
                        name: 'A5 Self-Cleaning Bottom Loading / Bottleless',
                        steps: ['Inspect ozone generator self-cleaning sanitization cycle tube.', 'Test sediment and carbon block filtration quick-connect fittings.', 'Check leak detector float switch on base tray.'],
                        tools: ['Phillips Screwdriver', 'Multimeter', '1/4" Tubing Cutter'],
                        commonIssues: ['Red leak detector light flashing with loud beep', 'Ozone sanitizer pump humming continuously', 'Slow flow rate from cold spout']
                    }
                }
            },
            brio: {
                name: 'Brio',
                hasModels: true,
                models: {
                    'Moderna Bottom Load / Tri-Temp Dispenser': {
                        name: 'Moderna Bottom Load / Tri-Temp Dispenser',
                        steps: ['Inspect digital temperature touch display PCB.', 'Test stainless steel hot/cold water reservoirs.'],
                        tools: ['Phillips #2', 'Multimeter'],
                        commonIssues: ['E2 Water supply timeout error', 'Cold water temperature fluctuating']
                    }
                }
            },
            elkay: {
                name: 'Elkay',
                hasModels: true,
                models: {
                    'ezH2O Commercial Bottle Filling Station': {
                        name: 'ezH2O Commercial Bottle Filling Station',
                        steps: ['Replace WaterSentry Plus filter (51300C) and reset green/yellow/red filter monitor.', 'Inspect infrared bottle filling proximity sensor.', 'Test solenoid water valve diaphragm.'],
                        tools: ['5/16" Nut Driver', 'Security Torx T20', 'Multimeter'],
                        commonIssues: ['Water continues running after bottle removed (solenoid valve stuck open with debris)', 'Red filter status LED on', 'IR sensor blindness under direct sun']
                    }
                }
            },
            midea: {
                name: 'Midea',
                hasModels: false,
                sizes: {
                    'Top Loading Bottled Dispenser': {
                        name: 'Top Loading Bottled Dispenser',
                        steps: ['Inspect cold water tank semiconductor peltier / mini-compressor.', 'Test hot water tank heating band thermal fuse.'],
                        tools: ['Multimeter', 'Screwdrivers'],
                        commonIssues: ['Water not heating', 'No cold water output']
                    }
                }
            }
        }
    },
    wood_router: {
        name: 'Wood Router / Palm Router',
        icon: React.createElement(Wrench, { className: "w-5 h-5 text-stone-600" }),
        brands: {
            makita: {
                name: 'Makita',
                hasModels: true,
                models: {
                    'RT0701C 1-1/4 HP / RP2301FC 3-1/4 HP Plunge': {
                        name: 'RT0701C 1-1/4 HP / RP2301FC 3-1/4 HP Plunge',
                        steps: ['Inspect CB-411 carbon brushes for wear past limit line.', 'Test electronic speed control module variable dial potentiometer.', 'Inspect 1/4" / 3/8" / 1/2" collet cone and collet nut for bit slippage.', 'Lubricate plunge base linear bearing guide rods with dry Teflon spray.'],
                        tools: ['Collet Wrench (13mm / 22mm)', 'Multimeter', 'Replacement Carbon Brushes', 'Teflon Dry Lube'],
                        commonIssues: ['Excessive sparking from motor brushes', 'Variable speed dial unstable / hunting RPM under load', 'Collet bit slipping during deep cut', 'Plunge base binding']
                    }
                }
            },
            dewalt_router: {
                name: 'DeWalt',
                hasModels: true,
                models: {
                    'DW618PKB 2-1/4 HP / DWP611 Compact Router': {
                        name: 'DW618PKB 2-1/4 HP / DWP611 Compact Router',
                        steps: ['Inspect motor commutator ring and carbon brushes.', 'Test dual LED workpiece lights and wiring.', 'Check micro-fine depth adjustment ring threads.'],
                        tools: ['Collet Wrenches', 'Phillips Screwdriver', 'Multimeter'],
                        commonIssues: ['Motor cuts out when tilted / Power switch dust infiltration', 'LED guide lights flickering', 'Depth clamp lever loose']
                    }
                }
            },
            bosch_router: {
                name: 'Bosch',
                hasModels: true,
                models: {
                    '1617EVSPK 2-1/4 HP / Colt GKF125CE Palm': {
                        name: '1617EVSPK 2-1/4 HP / Colt GKF125CE Palm',
                        steps: ['Replace Constant Response circuitry control board.', 'Clean sawdust from rocker power switch rubber boot.', 'Inspect self-releasing collet chuck.'],
                        tools: ['Torx T20', 'Collet Wrench', 'Contact Cleaner'],
                        commonIssues: ['Power switch failure due to sawdust packing inside', 'Bit stuck in collet (Bosch self-releasing collet requires double turn)']
                    }
                }
            },
            milwaukee_router: {
                name: 'Milwaukee Tool',
                hasModels: true,
                models: {
                    'M18 FUEL Compact Router 2723-20': {
                        name: 'M18 FUEL Compact Router 2723-20',
                        steps: ['Inspect POWERSTATE brushless motor stator windings.', 'Test REDLINK PLUS electronic overload communication.', 'Check spindle lock pin return spring.'],
                        tools: ['Torx T10 / T15', 'Multimeter'],
                        commonIssues: ['Spindle lock button stuck engaged', 'Rapid micro-depth adjustment screw stripped']
                    }
                }
            },
            festool_router: {
                name: 'Festool',
                hasModels: true,
                models: {
                    'OF 1400 EQ / OF 2200 EB Plunge Router': {
                        name: 'OF 1400 EQ / OF 2200 EB Plunge Router',
                        steps: ['Inspect fast-acting electric motor brake circuit (stops bit in 2 seconds).', 'Check plug-it detachable power cord bayonet prongs.', 'Test MMC electronic multi-material speed control.'],
                        tools: ['Festool T-LOC Wrenches', 'Multimeter'],
                        commonIssues: ['Electric brake fails to stop bit rapidly', 'Plug-it cord connection arcing/loose']
                    }
                }
            },
            porter_cable: {
                name: 'Porter-Cable',
                hasModels: true,
                models: {
                    '690LR 1-3/4 HP / 7518 3-1/4 HP Router Table': {
                        name: '690LR 1-3/4 HP / 7518 3-1/4 HP Router Table',
                        steps: ['Inspect heavy-duty sealed ball bearings on motor armature.', 'Clean spiral motor casing height adjustment threads.'],
                        tools: ['Bearing Puller', 'Collet Wrenches', 'Degreaser'],
                        commonIssues: ['Loud squealing bearing noise at 21,000 RPM', 'Casing stuck in base from fine wood dust']
                    }
                }
            }
        }
    }
};
