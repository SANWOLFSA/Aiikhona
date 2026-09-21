export interface ReferenceSchematic {
  id: string;
  title: string;
  category: 'Avionics & Drones' | 'TV & Audio' | 'Storage & Flash' | 'Motherboards & BIOS' | 'Mobile & Smartphones' | 'System & Power' | 'Components & Testing';
  deviceModels: string[];
  tag: string;
  summary: string;
  keySpecs: Record<string, string>;
  pinoutTable?: { pin: string; name: string; description: string; targetVoltage?: string }[];
  steps?: { step: number; title: string; detail: string; warning?: string; proTip?: string }[];
  technicalNotes: string[];
  boardPresetId?: 'smartphone' | 'drone' | 'motherboard' | 'storage_recovery';
}

export const REFERENCE_SCHEMATICS: ReferenceSchematic[] = [
  {
    id: 'drone-internal-avionics',
    title: 'Drone Flight Controller & Internal Avionics Architecture',
    category: 'Avionics & Drones',
    deviceModels: ['FPV Freestyle 5"', 'DJI Mini / Mavic Series', 'Betaflight / INAV Quadcopters'],
    tag: 'Avionics Blueprint',
    boardPresetId: 'drone',
    summary: 'Complete subsystem architecture of an unmanned aerial vehicle (UAV). Integrates brushless propulsion, electronic speed control (ESC), STM32 flight controller with 6-axis gyro, ELRS 2.4GHz RC receiver, and GPS telemetry.',
    keySpecs: {
      'Input Voltage': '3S - 6S LiPo (11.1V - 25.2V)',
      'Flight Controller MCU': 'STM32F405 / STM32F722 (168MHz - 216MHz)',
      'IMU Sensor': 'ICM-42688P / BMI270 (Low-Noise 6-Axis Gyro/Acc)',
      'ESC Protocol': 'DShot300 / DShot600 / DShot1200 Bidirectional',
      'Receiver Protocol': 'ExpressLRS (ELRS) 2.4GHz CRSF Serial (500Hz-1000Hz)',
      'GPS & Compass': 'U-Blox M10Q / M8N with QMC5883L Magnetometer'
    },
    pinoutTable: [
      { pin: '1', name: 'Motor Phases (U, V, W)', description: '3-phase brushless AC pulsed from ESC MOSFETs', targetVoltage: '0V - 25.2V PWM' },
      { pin: '2', name: 'ESC 4-in-1 Stack', description: 'Dual N-channel power MOSFET bridge with current shunt', targetVoltage: 'VBAT Direct (Up to 50A/ch)' },
      { pin: '3', name: 'Flight Controller 5V BEC', description: 'Step-down buck regulator supplying receiver and camera', targetVoltage: '5.0V ± 0.1V' },
      { pin: '4', name: 'Flight Controller 9V/12V BEC', description: 'Dedicated filtered rail for FPV Video Transmitter (VTX)', targetVoltage: '9.0V / 12.0V' },
      { pin: '5', name: 'ELRS Receiver (TX/RX)', description: 'Full-duplex serial UART connected to FC UART1/UART2', targetVoltage: '3.3V Logic / 5V VCC' },
      { pin: '6', name: 'GPS Module (SDA/SCL)', description: 'I2C bus connection for digital compass orientation', targetVoltage: '3.3V Pull-Up (4.7kΩ)' },
      { pin: '7', name: 'FPV Camera Video Out', description: 'Analog composite CVBS (75Ω) or HD digital MIPI', targetVoltage: '1.0Vp-p 75Ω' },
      { pin: '8', name: 'Current Sensor (CURR)', description: 'Analog voltage proportional to instantaneous battery draw', targetVoltage: '0V - 3.3V Scale' }
    ],
    steps: [
      {
        step: 1,
        title: 'Smoke Stopper Pre-Check',
        detail: 'Always connect a current-limited fuse (Smoke Stopper) on the XT60 battery lead before first power-up. If the LED trips, check for solder bridges between motor phase pads and ground.',
        warning: 'Direct short on a 6S LiPo battery can vaporize traces within 50 milliseconds.'
      },
      {
        step: 2,
        title: '5V & 9V Regulator Rail Inspection',
        detail: 'Measure the 5V and 9V test pads with a multimeter. A reading below 4.7V indicates overloaded peripheral draw or a damaged step-down inductor.'
      },
      {
        step: 3,
        title: 'UART Packet Verification in Betaflight',
        detail: 'Connect USB to the STM32 flight controller. Ensure the ELRS receiver binds on CRSF telemetry protocol and channels respond smoothly on the Receiver tab.'
      }
    ],
    technicalNotes: [
      'Motor desync or violent twitching is usually caused by cold solder joints on the 3 motor ESC pads or a damaged gate resistor.',
      'Gyro noise spikes can be eliminated by adding a 35V 1000uF low-ESR Rubycon capacitor directly across the main battery XT60 pads.',
      'GPS fix requires minimum 6-8 satellites and clear sky visibility; ensure the compass ceramic patch points upwards away from high-current battery leads.'
    ]
  },
  {
    id: 'sony-2-blink-dc-det',
    title: 'Sony TV 2-Blink Error (DC_det Protection Circuit Diagnostics)',
    category: 'TV & Audio',
    deviceModels: ['Sony Bravia KDL-EX650', 'KDL-HX750', 'KDL-HX850', 'KDL-40R412', 'KDL-EX710', 'KDL-32R402', 'KDL-46R452', 'KDL-48R482', 'KDL-W652', 'KDL-W750', 'KLV-24EX430'],
    tag: 'Protection Circuit Matrix',
    boardPresetId: 'motherboard',
    summary: 'Detailed diagnostic matrix for Sony Bravia televisions showing red standby LED 2-blink shutdown loop. Caused by high-voltage sensing resistors drifting out of tolerance in the DC_DET (DC Detect) comparator circuit.',
    keySpecs: {
      'Standby LED Code': '2 Blinks Repeated (DC_DET Over-Voltage / Over-Current Error)',
      'Primary Input Rail': '19.5V DC Adaptor / 12V Main Power Supply Rail',
      'Normal DC_det Voltage': '1.5V to 2.1V (Chassis Dependent)',
      'Fault Threshold': '< 1.2V or > 2.6V trips MCU system protection latch',
      'Divider Resistors': 'High-precision 1% SMD resistors (typically 100kΩ / 10kΩ pairs)'
    },
    pinoutTable: [
      { pin: 'EX650 / HX750', name: 'DC_det Test Point', description: 'Resistor divider connected to 12V primary rail', targetVoltage: '1.5V DC Nominal' },
      { pin: 'R412 Series', name: 'DC_det Test Point', description: 'Resistor divider connected to 19.5V adapter input', targetVoltage: '2.1V DC Nominal' },
      { pin: 'EX710 Series', name: 'DC_det Test Point', description: 'Divider network on main motherboard regulator', targetVoltage: '2.0V DC Nominal' },
      { pin: 'R402 / R452 / R482', name: 'DC_det Test Point', description: 'SMD voltage divider near audio/tuner shield', targetVoltage: '2.1V DC Nominal' },
      { pin: 'W652 / W750', name: 'DC_det Test Point', description: 'Main CPU input protection sense trace', targetVoltage: '2.1V DC Nominal' },
      { pin: '24EX430 Series', name: 'DC_det Test Point', description: 'Lower-voltage comparator line near DC jack', targetVoltage: '1.5V DC Nominal' }
    ],
    steps: [
      {
        step: 1,
        title: 'Measure Input Supply Voltage',
        detail: 'Verify the external AC adapter or internal power supply delivers a clean 19.5V or 12.0V without voltage sag during power button turn-on.',
        warning: 'A weak 19.5V AC adapter dropping to 17V will trigger the 2-blink error even if the board is healthy.'
      },
      {
        step: 2,
        title: 'Locate DC_det Resistor Divider Pair',
        detail: 'Under a microscope, find the SMD resistors marked near the DC_det test points shown in the chassis matrix (e.g. R412 series near the input mosfets). Measure resistance with TV unplugged.'
      },
      {
        step: 3,
        title: 'Voltage Check While Powering On',
        detail: 'Place multimeter black probe on chassis ground and red probe on the DC_det test point. Press power button: the line should instantly rise to 1.5V or 2.1V. If it reads 0.3V - 0.8V, the upper divider resistor is open or drifted high.'
      },
      {
        step: 4,
        title: 'Resistor Replacement or Bypass Calibration',
        detail: 'Replace the defective high-value SMD resistor (usually 100kΩ to 200kΩ 0402/0603 1% tolerance) to restore the exact 1.5V or 2.1V bias.'
      }
    ],
    technicalNotes: [
      'Sony TVs employ a dedicated hardware comparator circuit that shuts down the set in 1.8 seconds if any internal rail is abnormal.',
      'Never permanently tie DC_det directly to a 3.3V rail without a voltage divider; over-voltage can destroy the MCU input pin.',
      'If the DC_det voltage is exact (1.5V/2.1V) but the 2-blink persists, inspect the secondary 1.2V DDR and 3.3V standby buck converter outputs.'
    ]
  },
  {
    id: 'microsd-spi-recovery',
    title: 'Micro SD Card Data Recovery via Direct SPI Wire Harness',
    category: 'Storage & Flash',
    deviceModels: ['SanDisk Ultra / Extreme', 'Samsung EVO / Pro', 'Kingston Canvas', 'Generic Monolithic MicroSD'],
    tag: 'Forensic Hardware Recovery',
    boardPresetId: 'storage_recovery',
    summary: 'Hardware pinout mapping and direct SPI jumper wiring table to bypass broken card reader controllers and read raw sectors from corrupt or unrecognized Micro SD cards using an Arduino or USB-to-SPI adapter.',
    keySpecs: {
      'Interface Mode': 'SPI Bus Mode (Low-Speed Direct Flash Access)',
      'Operating Voltage': '3.3V Logic & VDD (STRICT: 5V WILL DESTROY CARD)',
      'Clock Speed (Initial)': '100kHz - 400kHz for ID initialization, up to 25MHz for dump',
      'Supported Tools': 'Arduino UNO / Mega, FTDI FT232H, CH341A Black Edition, ddrescue'
    },
    pinoutTable: [
      { pin: 'Pin 1 (MicroSD)', name: 'DAT2', description: 'Data line 2 (Not connected in SPI mode)', targetVoltage: 'N/C' },
      { pin: 'Pin 2 (MicroSD)', name: 'DAT3 / CS', description: 'Chip Select (Active LOW) -> Connect to Arduino Pin 10 or D4', targetVoltage: '3.3V Logic' },
      { pin: 'Pin 3 (MicroSD)', name: 'CMD / DI', description: 'Command Input / Master Out Slave In -> Connect to Arduino D11 (MOSI)', targetVoltage: '3.3V Logic' },
      { pin: 'Pin 4 (MicroSD)', name: 'VDD', description: 'Main Flash Core Power Supply -> Connect to Arduino 3.3V (NOT 5V!)', targetVoltage: '3.3V ± 0.1V' },
      { pin: 'Pin 5 (MicroSD)', name: 'CLK / SCLK', description: 'Serial Clock -> Connect to Arduino D13 (SCK)', targetVoltage: '3.3V Logic' },
      { pin: 'Pin 6 (MicroSD)', name: 'VSS (GND)', description: 'Chassis & Flash Ground Return -> Connect to Arduino GND', targetVoltage: '0.0V (Ground)' },
      { pin: 'Pin 7 (MicroSD)', name: 'DAT0 / DO', description: 'Data Output / Master In Slave Out -> Connect to Arduino D12 (MISO)', targetVoltage: '3.3V Logic' },
      { pin: 'Pin 8 (MicroSD)', name: 'DAT1', description: 'Data line 1 (Not connected in SPI mode)', targetVoltage: 'N/C' }
    ],
    steps: [
      {
        step: 1,
        title: 'Solder 38 AWG Enamelled Copper Jumpers',
        detail: 'Under a stereo microscope, carefully solder 38 AWG magnet wire jumpers to pins 2, 3, 4, 5, 6, and 7 of the MicroSD card.',
        warning: 'Soldering iron temperature must not exceed 280°C; heat applied for more than 2 seconds will delaminate the golden pads.'
      },
      {
        step: 2,
        title: '3.3V Level Shifter Confirmation',
        detail: 'If using an Arduino Uno with 5V logic, you MUST run signals through a 74LVC245 or resistive voltage dividers (1kΩ/2kΩ). Direct 5V IO pins will destroy the internal NAND controller.'
      },
      {
        step: 3,
        title: 'Send CMD0 & CMD8 Reset Commands',
        detail: 'Initialize SPI bus at 250kHz. Send CMD0 (0x40 0x00 0x00 0x00 0x00 0x95) to force the card into SPI mode (Expected return: 0x01 Idle State).'
      },
      {
        step: 4,
        title: 'Bit-Stream Sector Extraction via ddrescue',
        detail: 'Once the card answers CID and CSD register queries, stream raw 512-byte blocks directly into an uncompressed .IMG file for file carving with PhotoRec or TestDisk.'
      }
    ],
    technicalNotes: [
      'If the card draws excessive current (>150mA at 3.3V) and gets burning hot to the touch, the internal monolithic silicon substrate has an internal short.',
      'Pull-up resistors (10kΩ to 47kΩ to 3.3V) on DO (DAT0) and CS lines prevent line floating and CRC checksum errors.',
      'Monolithic cards without exposed gold pins require scraping the black epoxy coating with a fiberglass pen to reach the hidden test matrix.'
    ]
  },
  {
    id: 'bios-password-bypass',
    title: 'PC & Laptop Motherboard BIOS Forgotten Password Removal',
    category: 'Motherboards & BIOS',
    deviceModels: ['Dell OptiPlex / Latitude', 'HP EliteBook / ProDesk', 'Lenovo ThinkPad', 'ASUS / MSI Desktop Motherboards'],
    tag: 'Security & Firmware',
    boardPresetId: 'motherboard',
    summary: 'Comprehensive 3-method guide to remove or bypass forgotten BIOS / UEFI supervisor passwords on desktop motherboards and laptops using CLR_CMOS hardware jumpers, CR2032 RTC coin cell discharge, and master backdoor hash generation.',
    keySpecs: {
      'Storage Type': 'CMOS NVRAM / 24C08 / SPI Flash 25Q64/25Q128',
      'RTC Battery Voltage': '3.0V (CR2032 Lithium Coin Cell)',
      'Jumper Designators': 'CLR_CMOS, JBAT1, CLRTC, PWCLR, PSWD',
      'Unlock Hash Utility': 'bios-pw.org (System Disabled Hash Algorithm)'
    },
    pinoutTable: [
      { pin: 'CLR_CMOS Pin 1-2', name: 'Normal Boot Position', description: 'Standard running state with battery backed NVRAM active', targetVoltage: '3.0V VBAT' },
      { pin: 'CLR_CMOS Pin 2-3', name: 'Clear CMOS State', description: 'Grounds NVRAM supply pin to wipe stored system configuration and passwords', targetVoltage: '0.0V (Grounded)' },
      { pin: 'CR2032 Socket (+)', name: 'RTC Coin Cell Positive', description: 'Supplies real-time clock and volatile CMOS RAM', targetVoltage: '2.8V - 3.2V' },
      { pin: 'SOIC-8 Clip Pin 8', name: 'SPI Flash VCC', description: 'Power pin for external CH341A programmer (3.3V)', targetVoltage: '3.3V' }
    ],
    steps: [
      {
        step: 1,
        title: 'Method 1: Desktop Motherboard Jumper (CLR_CMOS)',
        detail: 'Power down PC, unplug AC cable. Locate the 3-pin jumper labeled CLR_CMOS or PWCLR near the battery. Move jumper from pins 1-2 to pins 2-3 for 10 seconds, then return to pins 1-2. Power on.',
        proTip: 'On Dell desktops, look for the jumper labeled PSWD and simply remove the jumper cap completely to wipe password.'
      },
      {
        step: 2,
        title: 'Method 2: CMOS Battery Removal & Capacitance Drain',
        detail: 'Disconnect main battery and charger. Pop out the CR2032 coin cell battery. Hold the power button down continuously for 45-60 seconds to completely discharge motherboard electrolytic capacitors. Leave disconnected for 15 minutes.'
      },
      {
        step: 3,
        title: 'Method 3: Master Password Generator (Laptops)',
        detail: 'On modern laptops where passwords reside in non-volatile EEPROM, enter an incorrect password 3 times. The screen will display a System Disabled hash (e.g., [5 to 8 alphanumeric characters] or Service Tag e.g. ABC1234-595B). Enter this code into bios-pw.org to retrieve the official factory master backdoor unlock password.'
      }
    ],
    technicalNotes: [
      'Modern corporate laptops (ThinkPad T/X series, HP EliteBook) store supervisor passwords in encrypted TPM or SPI EEPROM chips that cannot be reset by battery removal.',
      'On ThinkPads, shorting the SDA and SCL lines of the security chip (e.g. 24RF08 / ATMEL chip) during boot cycles past the password prompt.',
      'Always test the removed CR2032 coin cell with a multimeter. Any battery below 2.75V should be replaced to prevent date/time loss and CMOS checksum error 0271.'
    ]
  },
  {
    id: 'lg-tv-vga-serial-uart',
    title: 'LG Smart TV Firmware Read & Write via VGA-to-3.5mm Serial Port',
    category: 'TV & Audio',
    deviceModels: ['LG 32LN540B', 'LG 42LN5700', 'LG 47LA6200', 'LG OLED C-Series / B-Series Service Port'],
    tag: 'UART Service Console',
    boardPresetId: 'motherboard',
    summary: 'Hardware wiring diagram and pinout connection guide to build a VGA-to-3.5mm RS232/UART serial service cable. Allows technicians to access LG TV debug consoles, unbrick bootloops, read memory registers, and flash eMMC firmware.',
    keySpecs: {
      'Baud Rate': '115200 bps, 8 Data Bits, No Parity, 1 Stop Bit (8-N-1)',
      'Signal Levels': 'TTL 3.3V or True RS-232 (Chassis Dependent)',
      'Connector A': 'VGA DB15 Male Connector',
      'Connector B': '3.5mm Stereo Audio Mini-Jack (3-pole or 4-pole TRS)'
    },
    pinoutTable: [
      { pin: 'VGA Pin 4', name: 'UART TX', description: 'Transmitted Data from TV motherboard -> Connect to 3.5mm Tip', targetVoltage: '3.3V Logic' },
      { pin: 'VGA Pin 11', name: 'UART RX', description: 'Received Data into TV motherboard -> Connect to 3.5mm Ring 1', targetVoltage: '3.3V Logic' },
      { pin: 'VGA Pin 5 & 15', name: 'Chassis GND', description: 'Common Signal Ground -> Connect to 3.5mm Sleeve', targetVoltage: '0.0V (Ground)' },
      { pin: '3.5mm Jack Tip', name: 'Console TX', description: 'Connects to USB-TTL RX adapter pin', targetVoltage: '3.3V' },
      { pin: '3.5mm Jack Ring', name: 'Console RX', description: 'Connects to USB-TTL TX adapter pin', targetVoltage: '3.3V' },
      { pin: '3.5mm Jack Sleeve', name: 'Console GND', description: 'Connects to USB-TTL GND pin', targetVoltage: '0.0V' }
    ],
    steps: [
      {
        step: 1,
        title: 'Cable Construction & Continuity Test',
        detail: 'Solder wires according to the pinout diagram: VGA Pin 4 to 3.5mm Tip (TX), VGA Pin 11 to Ring (RX), and VGA Pin 5/15 to Sleeve (GND). Verify with multimeter continuity beep.',
        warning: 'Ensure RX and TX are not shorted to ground; feeding 5V into the 3.3V SoC UART port will burn the processor core.'
      },
      {
        step: 2,
        title: 'Connect Terminal Emulator',
        detail: 'Open PuTTY or TeraTerm on your PC. Select the COM port corresponding to your USB-UART bridge. Set Speed to 115200, Data bits 8, Stop bits 1, Parity None, Flow control None.'
      },
      {
        step: 3,
        title: 'Capture U-Boot Kernel Log',
        detail: 'Plug the 3.5mm jack into the LG TV service port and power on the set. The terminal will immediately stream bootloader output and memory partition health.'
      }
    ],
    technicalNotes: [
      'If you see garbage ASCII characters on the screen, the baud rate is mismatched or signal ground has high resistance.',
      'Typing "debug" or pressing ESC during U-Boot bootloader sequence breaks into the recovery shell to reload kernel partition images.'
    ]
  },
  {
    id: 'universal-jtag-isp-header',
    title: '10-Pin Universal JTAG / ISP / ICSP Programming Header',
    category: 'System & Power',
    deviceModels: ['AVR Atmega / Attiny', 'Microchip PIC Microcontrollers', 'Atmel XMEGA Devices', 'ARM Cortex Debug Connectors'],
    tag: 'Microcontroller Pinout',
    boardPresetId: 'storage_recovery',
    summary: 'Definitive reference pinout and pin assignment table for the standardized 10-pin dual-row 2.54mm box header used for in-circuit system programming (ISP), JTAG hardware debugging, and PIC MCLR high-voltage flashing.',
    keySpecs: {
      'Connector Form Factor': '10-Pin (2x5) 2.54mm Pitch IDC Box Header',
      'Target VCC': '3.3V or 5.0V (Current limited to 30mA - 100mA)',
      'Programming Protocols': 'SPI ISP, JTAG, PDI (XMEGA), ICSP (PIC 13V MCLR)',
      'Compatible Programmers': 'USBasp, PICkit 3/4, Atmel-ICE, Segger J-Link'
    },
    pinoutTable: [
      { pin: 'Pin 1', name: 'SDO / TDO / MISO / PGD', description: 'Serial Data Output / Test Data Output / Programming Data', targetVoltage: '3.3V / 5V Logic' },
      { pin: 'Pin 2', name: 'VCC', description: 'Target supply voltage detection & low-current power (5V 30mA max)', targetVoltage: '3.3V - 5.0V' },
      { pin: 'Pin 3', name: 'RESET / TMS', description: 'Microcontroller hardware reset or JTAG Test Mode Select', targetVoltage: 'Active LOW' },
      { pin: 'Pin 4', name: 'Clock Out (CLK)', description: 'Auxiliary clock output for chips with bricked fuse bits', targetVoltage: 'Square Wave 1MHz' },
      { pin: 'Pin 5', name: 'SCK / TCK / PGC', description: 'Serial Programming Clock / JTAG Test Clock', targetVoltage: '3.3V / 5V Logic' },
      { pin: 'Pin 6', name: 'XMEGA PDI', description: 'Program & Debug Interface for Atmel XMEGA series', targetVoltage: '3.3V' },
      { pin: 'Pin 7', name: 'SDI / TDI / MOSI', description: 'Serial Data Input / Test Data Input / Master Out Slave In', targetVoltage: '3.3V / 5V Logic' },
      { pin: 'Pin 8', name: 'GND', description: 'Primary System Logic Ground Return', targetVoltage: '0.0V (Ground)' },
      { pin: 'Pin 9', name: 'MCLR', description: 'Master Clear High-Voltage (13V for PIC flash erase and programming)', targetVoltage: '13.0V DC (PIC only)' },
      { pin: 'Pin 10', name: 'GND', description: 'Secondary Logic Ground Return (Shielding)', targetVoltage: '0.0V (Ground)' }
    ],
    technicalNotes: [
      'Pin 9 MCLR receives 13V pulses only when programming Microchip PIC MCUs; ensure your target board does not bridge Pin 9 to low-voltage 3.3V lines!',
      'Pin 4 is critical for reviving AVR chips where clock selection fuse bits were accidentally programmed for an external crystal when no crystal is present.',
      'Pin 8 and Pin 10 must both be tied to ground plane to minimize high-speed SPI clock ringing and corrupted flash memory verification.'
    ]
  },
  {
    id: 'samsung-galaxy-a05-hard-reset',
    title: 'Samsung Galaxy A05 / Android Complete Hard Reset & Recovery Mode',
    category: 'Mobile & Smartphones',
    deviceModels: ['Samsung Galaxy A05 (SM-A055F)', 'Galaxy A05s', 'Galaxy A14 / A15 / A25', 'Universal One UI 6 Android Devices'],
    tag: 'Device Maintenance',
    boardPresetId: 'smartphone',
    summary: 'Official step-by-step hardware button sequence and recovery menu navigation guide to hard reset frozen, locked, or bootlooping Samsung Galaxy devices when the touch screen or PIN passcode is inaccessible.',
    keySpecs: {
      'Key Combination': 'Volume Up (+) + Side Power Button simultaneously',
      'Cable Requirement': 'Modern Samsung devices require connecting to a PC or USB-C headset to enter Recovery Mode',
      'Battery Requirement': 'Minimum 50% battery charged before starting wipe process',
      'Security Alert': 'Triggers Google FRP (Factory Reset Protection) activation lock'
    },
    steps: [
      {
        step: 1,
        title: 'Power Off Device Completely',
        detail: 'Press and hold Side Power button until Power menu appears. Tap Power off and wait for phone to vibrate and screen to turn pitch black. If locked, force restart by holding Volume Down + Power for 10s, then immediately switch to Step 2.'
      },
      {
        step: 2,
        title: 'Connect USB Cable to Computer',
        detail: 'On One UI 5/6 (Galaxy A05), plug the phone into a PC via USB-C cable (or USB-C headphones). Without this, modern Samsung devices will simply boot normally into Android.'
      },
      {
        step: 3,
        title: 'Press & Hold Volume Up + Side Power',
        detail: 'Hold both buttons firmly. Keep holding through the initial screen until the bold white "SAMSUNG Galaxy" logo appears, then release both buttons immediately.'
      },
      {
        step: 4,
        title: 'Navigate to "Wipe data / factory reset"',
        detail: 'The touch screen is disabled in Android Recovery. Use Volume Up and Down buttons to move the highlight bar down to "Wipe data / factory reset".'
      },
      {
        step: 5,
        title: 'Confirm Factory Data Reset',
        detail: 'Press the Side Power button to select. Press Volume Down to highlight "Factory data reset", then press Power button once more to confirm.'
      },
      {
        step: 6,
        title: 'Reboot System Now',
        detail: 'Wait until the lower terminal prints "Data wipe complete". Highlight "Reboot system now" and press Power button. The phone will perform a clean initialization boot.'
      }
    ],
    technicalNotes: [
      'CAUTION: This process permanently erases all photos, apps, SMS, and local files.',
      'Google Account Verification (FRP): If a Google account was active prior to the reset, the phone will request that exact account password upon reaching the setup Wi-Fi screen.',
      'Do not interrupt power or unplug the battery while "Formatting /data..." is active, or internal eMMC / UFS storage partitions may corrupt.'
    ]
  },
  {
    id: 'windows-cmd-admin-password-reset',
    title: 'Reset Windows Admin Password via CMD (Utilman Bypass Protocol)',
    category: 'System & Power',
    deviceModels: ['Windows 11 (22H2 / 23H2 / 24H2)', 'Windows 10', 'Windows Server 2019 / 2022'],
    tag: 'OS System Maintenance',
    boardPresetId: 'motherboard',
    summary: 'Authorized technician procedure to reset forgotten local administrator account passwords using the Windows Recovery Environment (WinRE) Command Prompt and the utilman.exe accessibility replacement technique.',
    keySpecs: {
      'Access Mode': 'Windows Advanced Startup -> Command Prompt',
      'Target Path': 'C:\\Windows\\System32\\utilman.exe & cmd.exe',
      'Account Scope': 'Local User Accounts & Administrator Accounts',
      'Prerequisite': 'BitLocker recovery key required if OS drive is encrypted'
    },
    steps: [
      {
        step: 1,
        title: 'Boot into Advanced Startup WinRE',
        detail: 'Hold the Shift key on your physical keyboard while clicking Power -> Restart on the Windows sign-in screen. When the blue "Choose an option" menu appears, select Troubleshoot -> Advanced options -> Command Prompt.'
      },
      {
        step: 2,
        title: 'Locate the Operating System Drive Letter',
        detail: 'In WinRE, the OS drive is often mounted as D: or E:. Run "dir C:\\Windows" and "dir D:\\Windows" until you see the directory of Windows.'
      },
      {
        step: 3,
        title: 'Backup & Swap utilman.exe with cmd.exe',
        detail: 'Run the following two commands sequentially:\n1) copy D:\\Windows\\System32\\utilman.exe D:\\Windows\\System32\\utilman.exe.bak\n2) copy D:\\Windows\\System32\\cmd.exe D:\\Windows\\System32\\utilman.exe (Confirm overwrite with Y).'
      },
      {
        step: 4,
        title: 'Reboot & Launch Elevated Console',
        detail: 'Close Command Prompt, click Continue to Windows. On the login screen, click the Accessibility icon (the human figure / wheelchair icon in the bottom right corner). An elevated Administrator Command Prompt will open directly over the login screen.'
      },
      {
        step: 5,
        title: 'Change Password & Restore File',
        detail: 'In the elevated CMD, type:\nnet user Administrator YourNewPassword123!\nPress Enter. You can now log into Windows immediately with your new password! Afterward, restore utilman.exe from utilman.exe.bak to restore system security.'
      }
    ],
    technicalNotes: [
      'This method is strictly for local accounts; Microsoft cloud accounts (Outlook/Hotmail) must be reset online at account.live.com/password/reset.',
      'If BitLocker encryption is enabled on the drive, you must enter your 48-digit recovery key before WinRE unlocks command prompt access.',
      'Always restore the original utilman.exe.bak file immediately following maintenance to prevent security vulnerabilities.'
    ]
  },
  {
    id: 'laptop-battery-calibration-power',
    title: 'Laptop Battery Longevity Optimization & Power Rail Calibration',
    category: 'System & Power',
    deviceModels: ['Dell XPS & Inspiron', 'Lenovo ThinkPad & Yoga', 'HP Spectre & Envy', 'ASUS ZenBook & ROG'],
    tag: 'Hardware Longevity',
    boardPresetId: 'motherboard',
    summary: 'Hardware and operating system calibration steps to optimize laptop lithium-ion battery lifespan, mitigate parasitic thermal degradation, audit background power consumption, and calibrate the fuel gauge IC.',
    keySpecs: {
      'Chemistry': 'Lithium-Polymer (LiPo) / Lithium-Ion 18650/21700',
      'Optimal Storage Voltage': '3.85V per cell (approx. 50% - 60% state of charge)',
      'Recommended Power Profile': 'Windows 11 Balanced Mode (Dynamic P-State scaling)',
      'Fuel Gauge IC': 'Texas Instruments BQ40Z50 / BQ20Z45 (SMBus Battery Gauge)'
    },
    steps: [
      {
        step: 1,
        title: 'Configure Windows Power & Battery Mode',
        detail: 'Press Windows + I to open Settings -> System -> Power & battery. Set Power mode to "Balanced" or "Best power efficiency". This enables CPU core sleep states (C-states).'
      },
      {
        step: 2,
        title: 'Set Display Brightness to 50%',
        detail: 'The LED backlight panel accounts for 35% - 45% of total laptop power consumption. Reduce brightness to 50% in Action Center for up to 2.5 hours of additional battery life.'
      },
      {
        step: 3,
        title: 'Audit High Power Draw Tasks in Task Manager',
        detail: 'Press Ctrl + Shift + Esc to open Task Manager. Right-click column header, check "Power usage". Sort by High power usage and terminate unneeded background processes.'
      },
      {
        step: 4,
        title: 'Hardware BMS Fuel Gauge Calibration Cycle',
        detail: 'Charge battery uninterrupted to 100%. Leave plugged in for 2 hours. Unplug and run down until laptop automatically sleeps at 5%. Leave unpowered for 3 hours, then charge back to 100% without interruption. This recalibrates the SMBus gas gauge state-of-charge calculation.'
      }
    ],
    technicalNotes: [
      'Operating a laptop continuously at 100% while gaming at 85°C accelerates lithium cathode electrolyte oxidation by 300%.',
      'Enable OEM battery conservation mode (e.g. Lenovo Vantage Battery Charge Threshold, Dell Command Power Manager) to cap maximum charging at 80% if plugged in constantly.'
    ]
  },
  {
    id: 'common-electrical-fuses-guide',
    title: 'Common Electrical Fuses: Types, Ratings, Symbols & Selection Matrix',
    category: 'Components & Testing',
    deviceModels: ['SMPS Power Supplies', 'Automotive ECUs', 'Consumer Electronics', 'Industrial Panels'],
    tag: 'Circuit Protection & Safety',
    summary: 'Comprehensive engineering guide for electrical and electronic fuses. Covers 6 core categories: Fast-Acting Glass, Slow-Blow Ceramic, Automotive Blade, High-Interrupting Cartridge, Resettable PPTC Polyfuses, and Surface Mount (SMD) fuses. Includes Blown vs. Good test procedures, schematic symbols, and rating calculations.',
    keySpecs: {
      'Glass Fuses (Fast Acting)': '5x20mm / 6x38mm, 32mA - 20A, 250VAC, Interrupting: 35A - 1500A',
      'Ceramic Fuses (Slow Blow)': '10x38mm, 100mA - 30A, 250V - 690VAC, Interrupting: 1kA - 100kA',
      'Automotive Blade Fuses': '2A - 40A, 32VDC (Brown 7.5A, Red 10A, Blue 15A, Yellow 20A, Clear 25A, Green 30A)',
      'Cartridge Fuses (Industrial)': 'gG type 1A - 63A, 500V - 1000VAC, Interrupting: 10kA - 200kA',
      'Resettable Polyfuses (PPTC)': '50mA - 5A, 6V - 60VDC, Polymer (PPTC) auto-resetting matrix',
      'SMD Surface Mount Fuses': '0603 / 1206 footprints, 100mA - 5A, 32V - 125VAC/DC (Markings: F1, 1A, T2A, 10)'
    },
    pinoutTable: [
      { pin: '1', name: 'Glass Fuses (Fast Acting)', description: 'Clear glass body with instant fuse element. Burns immediately on current surges.', targetVoltage: '250VAC Rated' },
      { pin: '2', name: 'Ceramic Fuses (Slow Blow)', description: 'Sand-filled ceramic body absorbing inrush current surges from motors and transformers.', targetVoltage: '250V - 690VAC' },
      { pin: '3', name: 'Automotive Blade Fuses', description: 'Color-coded plastic shell with dual spade terminals for 12V/24V vehicular harnesses.', targetVoltage: '32VDC Max' },
      { pin: '4', name: 'Cartridge Fuses', description: 'Heavy-duty ceramic tubes with silver plated brass caps for distribution switchboards.', targetVoltage: '500V - 1000VAC' },
      { pin: '5', name: 'Resettable Polyfuses (PPTC)', description: 'Conductive carbon polymer matrix. Trips into high-resistance state when hot, resets when cool.', targetVoltage: '6V - 60VDC' },
      { pin: '6', name: 'SMD Fuses (Surface Mount)', description: 'Sub-miniature thin-film ceramic fuses soldered directly onto smartphone and laptop PCBs.', targetVoltage: '32V - 125VAC/DC' }
    ],
    steps: [
      {
        step: 1,
        title: 'Visual Inspection (Blown vs Good)',
        detail: 'In Glass fuses: Look for an intact continuous wire (Good) vs a blackened/vaporized tube or snapped filament with a melt bead (Blown). In Blade fuses: Inspect the central S-curve bridge inside the transparent housing. In Cartridge/Ceramic fuses: Visual inspection is impossible; proceed to continuity test.'
      },
      {
        step: 2,
        title: 'Digital Multimeter Continuity & Resistance Check',
        detail: 'Power OFF the device. Touch red and black DMM probes across the fuse terminals in Continuity mode (Beeper). A good fuse displays 0.00Ω to 0.20Ω with an immediate steady beep. A blown fuse displays OL (Open Loop) with no sound.'
      },
      {
        step: 3,
        title: 'Formula for Fuse Selection',
        detail: '1. Voltage Rating: Must be equal to or greater than circuit operating voltage (V_fuse ≥ V_circuit). 2. Current Rating: Multiply continuous operating current by 1.25 (Safety margin: I_fuse ≈ 1.25 × I_load). 3. Surge Speed: Select Slow-Blow for inductive/capacitive loads and Fast-Acting for sensitive semiconductor logic.'
      }
    ],
    technicalNotes: [
      'CRITICAL SAFETY: Never bypass, jumper, or wrap a blown fuse with aluminum foil or copper wire. This defeats the thermal fire protection and causes PCB trace vaporization.',
      'Always diagnose and resolve the downstream short circuit (e.g. shorted MOSFET, punctured MLCC capacitor, or bridge rectifier) before installing a replacement fuse.',
      'Cartridge fuses filled with silica sand actively extinguish high-energy electric arcs, preventing explosive casing rupture in industrial 480V three-phase systems.'
    ]
  },
  {
    id: 'digital-multimeter-symbol-guide',
    title: 'Digital Multimeter (DMM) Symbol Guide & Rotary Dial Matrix',
    category: 'Components & Testing',
    deviceModels: ['Fluke 87V / 117', 'Uni-T UT61E+', 'Aneng AN8008', 'Kaiweets', 'Brymen Bench Meters'],
    tag: 'Essential Test Equipment',
    summary: 'Comprehensive visual reference and operator matrix for digital multimeters. Decodes standard rotary dial symbols including AC/DC Voltage (V~ / V⎓), AC/DC Current (A~ / A⎓), Resistance (Ω), Continuity Beeper, Diode Drop (VF), Frequency (Hz), Duty Cycle (%), Relative Mode (REL), and Port Jack configurations.',
    keySpecs: {
      'AC Voltage (V~)': 'Measures true RMS or average sinusoidal alternating voltage (Mains 110V/230V, AC inverters)',
      'DC Voltage (V⎓)': 'Direct current voltage (Batteries, USB 5V, PCB logic rails 3.3V, 1.8V, 1.2V, 0.85V)',
      'Resistance (Ω)': 'Measures electrical impedance in Ohms (Must only be executed on powered-off circuits)',
      'Continuity Test (Beeper)': 'Audible tone when resistance < 30Ω - 50Ω. Detects broken PCB traces, shorted rails, switch state',
      'Diode Test (Diode Symbol)': 'Injects constant 1mA current; measures forward voltage drop in Volts (0.15V-0.4V Schottky, 0.5V-0.7V Silicon)',
      'Frequency (Hz) & Duty Cycle (%)': 'Counts waveform transitions per second and high-state pulse width percentage'
    },
    pinoutTable: [
      { pin: 'COM', name: 'Common Port (Black Probe)', description: 'Chassis ground and circuit negative reference for all measurement modes.', targetVoltage: '0.0V Reference' },
      { pin: 'V Ω Hz', name: 'Main Input Port (Red Probe)', description: 'Used for Voltage (AC/DC), Resistance, Continuity, Diode Drop, and Frequency testing.', targetVoltage: '1000V DC / 750V AC Max' },
      { pin: 'mA / µA', name: 'Low Current Port (Red Probe)', description: 'Fused input for microampere and milliampere current measurements in series.', targetVoltage: 'Max 200mA - 400mA Fused' },
      { pin: '10A / 20A', name: 'High Current Port (Red Probe)', description: 'Heavy-duty shunt input for high-amperage motor and power supply draws.', targetVoltage: 'Max 10A - 20A Fused' }
    ],
    steps: [
      {
        step: 1,
        title: 'Safety Check & Jack Selection',
        detail: 'Ensure test probes are firmly seated. COM is always Black. Plug Red into V-Ω-Hz for voltage/resistance/continuity/diode. NEVER connect probes to 10A jack when measuring voltage, as this creates a dead short across the power source.'
      },
      {
        step: 2,
        title: 'Diode Mode Hardware Probing (Red-to-Ground Rule)',
        detail: 'When diagnosing circuit board component lines: Place RED probe on motherboard chassis Ground. Touch BLACK probe to the target signal pin or power rail test pad. Compare reading against reference specs (0.350V - 0.550V normal; continuous beep < 0.050V indicates short).'
      },
      {
        step: 3,
        title: 'Utilizing REL (Relative) Mode for Sub-Ohm Precision',
        detail: 'Touch red and black probe tips together (typically reads 0.12Ω - 0.25Ω due to probe lead resistance). Press the REL button to zero out lead impedance. You can now measure ultra-low current sense resistors (e.g. 0.05Ω shunts) with laboratory accuracy.'
      }
    ],
    technicalNotes: [
      'HOLD function freezes the live value on screen, enabling single-operator measurements in blind or cramped chassis locations.',
      'Manual RANGE button overrides auto-ranging hunt delays, accelerating repetitive assembly-line component sorting by 300%.',
      'Modern digital multimeters offer a 10MΩ input impedance in voltage mode to prevent loading down sensitive high-impedance microcontroller sensor lines.'
    ]
  },
  {
    id: 'smartphone-17pin-lcd-connector',
    title: '17-Pin Smartphone LCD Display Connector: Complete Pinout & Diagnostics',
    category: 'Mobile & Smartphones',
    deviceModels: ['Motorola Moto G Series', 'Xiaomi Redmi & POCO', 'Samsung Galaxy A-Series', 'Oppo & Vivo Smartphones'],
    tag: 'Display Subsystem',
    boardPresetId: 'smartphone',
    summary: 'Full 17-pin engineering pinout, voltage rail specifications, and diagnostic troubleshooting workflow for smartphone LCD and display flex module connectors (Smartphone Xpert standard). Maps backlight cathode/anode (LEDK/LEDA up to 20V), logic power rails (VCI 2.8V-3.3V, IOVCC 1.8V), MIPI high-speed differential data/clock lanes, and reset/standby control lines.',
    keySpecs: {
      'Pins 1-3 (LEDK)': 'Backlight Cathode Negative (PWM current sink return from LED string)',
      'Pins 4-5 (LEDA)': 'Backlight Anode Positive (Boosted 15V - 20V DC from Backlight Driver IC)',
      'Pin 6 (VCI)': 'Main Display Power Supply: 2.8V - 3.3V analog input to LCD Driver IC',
      'Pin 7 (IOVCC)': 'I/O Logic Interface Power: 1.8V - 2.8V digital bus reference',
      'Pins 8-9 (GND)': 'System Ground & shield isolation return paths',
      'Pins 10-15 (MIPI D0/D1/CLK)': 'High-Speed Differential MIPI Lanes (D0P/D0N, D1P/D1N, CLKP/CLKN) 200mV-400mV',
      'Pins 16-17 (RESET / STBYB)': 'Display Control Lines: Active-LOW Reset and Active-LOW Standby Wake Signals'
    },
    pinoutTable: [
      { pin: '1', name: 'LEDK', description: 'Backlight Cathode (-) Negative terminal returning current to ground via boost IC sink', targetVoltage: '0V - 2.5V' },
      { pin: '2', name: 'LEDK', description: 'Backlight Cathode (-) Negative terminal for parallel LED string balance', targetVoltage: '0V - 2.5V' },
      { pin: '3', name: 'LEDK', description: 'Backlight Cathode (-) Negative terminal for high brightness models', targetVoltage: '0V - 2.5V' },
      { pin: '4', name: 'LEDA', description: 'Backlight Anode (+) Positive high-voltage power driving series display LEDs', targetVoltage: '15.0V - 20.0V Boosted' },
      { pin: '5', name: 'LEDA', description: 'Backlight Anode (+) Positive high-voltage terminal with dual contact trace', targetVoltage: '15.0V - 20.0V Boosted' },
      { pin: '6', name: 'VCI', description: 'Main Power Supply: Powers the display glass internal driver circuits', targetVoltage: '2.8V - 3.3V' },
      { pin: '7', name: 'IOVCC', description: 'I/O Logic Power: Powers the digital interface and timing control logic', targetVoltage: '1.8V - 2.8V' },
      { pin: '8', name: 'GND', description: 'Primary power ground return', targetVoltage: '0.0V (Ground)' },
      { pin: '9', name: 'GND', description: 'Secondary digital signal ground and RF shielding return', targetVoltage: '0.0V (Ground)' },
      { pin: '10', name: 'D0P', description: 'MIPI Data Lane 0 Positive: High-speed differential video data signal', targetVoltage: '200mV - 400mV AC Differential' },
      { pin: '11', name: 'D0N', description: 'MIPI Data Lane 0 Negative: Inverted differential video data complement', targetVoltage: '200mV - 400mV AC Differential' },
      { pin: '12', name: 'D1P', description: 'MIPI Data Lane 1 Positive: High-speed secondary video data lane', targetVoltage: '200mV - 400mV AC Differential' },
      { pin: '13', name: 'D1N', description: 'MIPI Data Lane 1 Negative: Inverted secondary video data complement', targetVoltage: '200mV - 400mV AC Differential' },
      { pin: '14', name: 'CLKP', description: 'MIPI Clock Lane Positive: High-speed pixel clock synchronization pulse', targetVoltage: '200mV - 400mV AC Differential' },
      { pin: '15', name: 'CLKN', description: 'MIPI Clock Lane Negative: Inverted clock synchronization complement', targetVoltage: '200mV - 400mV AC Differential' },
      { pin: '16', name: 'RESET', description: 'Display IC Hardware Reset line: Active LOW (held HIGH at 1.8V during operation)', targetVoltage: '1.8V Normal / 0V Reset' },
      { pin: '17', name: 'STBYB', description: 'Standby / Enable Wake signal: Active LOW to wake display panel from deep sleep', targetVoltage: '0V Wake / 1.8V Sleep' }
    ],
    steps: [
      {
        step: 1,
        title: 'Troubleshooting: No Backlight (Black screen, flashlight shows faint image)',
        detail: 'Measure Pins 4 & 5 (LEDA) with screen powered. If voltage is only battery voltage (~3.8V) instead of 15V-20V, the backlight boost coil is blown or the Schottky diode (e.g. SS14/MBR0520) is open. Check Pins 1-3 (LEDK) diode mode drop to ground.'
      },
      {
        step: 2,
        title: 'Troubleshooting: No Display (Totally blank, no image under flashlight)',
        detail: 'Check Pin 6 (VCI) for 2.8V - 3.3V and Pin 7 (IOVCC) for 1.8V. If either power rail reads 0V, inspect the PMIC LDO regulators or look for cracked MLCC decoupling filter capacitors along the power rail.'
      },
      {
        step: 3,
        title: 'Troubleshooting: Screen Distorted, Glitching, or Colored Lines',
        detail: 'Perform diode mode check on MIPI lines (Pins 10 to 15). All 6 pins must display nearly identical readings (typically 0.350V - 0.450V). An OL reading indicates a torn flex trace, and < 0.050V indicates an ESD suppression filter TVS diode shorted to ground.'
      },
      {
        step: 4,
        title: 'Troubleshooting: Display Fails to Wake / Black After Sleep',
        detail: 'Verify Pin 16 (RESET) and Pin 17 (STBYB). When wake button is pressed, RESET must remain at 1.8V and STBYB must pull LOW to command the display driver IC out of deep hibernation.'
      }
    ],
    technicalNotes: [
      'ALWAYS disconnect the battery flex cable BEFORE connecting or disconnecting the display connector. Plugging in while live allows 20V LEDA pins to short into 1.8V MIPI CPU lines, permanently destroying the application processor.',
      'Pin numbering standard: Pins 1 through 17 are counted from left to right when viewing the socket receptacle from the front with contact pads facing upward.'
    ]
  },
  {
    id: 'mini-bluetooth-audio-board',
    title: 'Mini Bluetooth + Audio Board Pinout & RF Circuit Architecture',
    category: 'TV & Audio',
    deviceModels: ['Mini BT 5.0 Receivers', 'Wireless Audio DAC Boards', 'DIY Bluetooth Speakers', 'Portable Boomboxes'],
    tag: 'Wireless Audio',
    summary: 'Hardware pinout mapping and circuit subsystem analysis for mini Bluetooth + audio receiver modules (Kenny Telecom blueprint). Details the 5V VBUS power rail, 24.000 MHz master crystal oscillator, Bluetooth SoC transceiver, stereo audio amplifier IC, 3.5mm AUX line out, differential speaker pads, and battery charging controller.',
    keySpecs: {
      'Main Power Input': '5.0V DC Micro-USB / direct solder pads (VBUS & Ground)',
      'Reference Oscillator': '24.000 MHz Quartz Crystal for RF baseband carrier synthesis',
      'Audio Output Ports': 'Dual Output: 3.5mm stereo AUX mini-jack + SPK differential solder pads',
      'Audio Amplifier IC': 'Integrated Class-D stereo audio power amplifier (3W - 5W output)',
      'Bluetooth Core SoC': 'Single-chip 2.4GHz Bluetooth 5.0/5.3 audio decoder with A2DP/AVRCP profiles',
      'Charging Subsystem': 'Onboard Li-Ion/LiPo single-cell charge management controller with status LED'
    },
    pinoutTable: [
      { pin: '5V', name: '5V VBUS Power Entrance', description: 'Primary power supply input from Micro-USB or solder pads', targetVoltage: '5.0V ± 0.25V' },
      { pin: 'G', name: 'System Ground (GND)', description: 'Chassis ground reference and RF antenna ground plane', targetVoltage: '0.0V (Ground)' },
      { pin: 'D+', name: 'USB Data Positive (D+)', description: 'USB protocol communication and firmware flashing bus', targetVoltage: '3.3V Logic' },
      { pin: 'D-', name: 'USB Data Inverted (D-)', description: 'USB differential data complementary line', targetVoltage: '3.3V Logic' },
      { pin: 'AUX', name: '3.5mm Stereo Audio Jack', description: 'Line-level analog audio output (Tip: Left, Ring: Right, Sleeve: Ground)', targetVoltage: '1.0Vrms Audio' },
      { pin: 'SPK', name: 'Speaker Output Terminals', description: 'Direct high-power audio drive for 4Ω / 8Ω passive loudspeaker drivers', targetVoltage: '0V - 5.0V Audio Waveform' },
      { pin: 'CRYSTAL', name: '24.000 MHz Crystal', description: 'Master reference clock feeding the Bluetooth RF synthesizer PLL', targetVoltage: 'Sinusoidal 24.0MHz Clock' },
      { pin: 'CHARGING', name: 'Charging Status Line', description: 'Battery charge controller interface (Red charging / Blue full)', targetVoltage: '3.7V - 4.2V VBAT' }
    ],
    steps: [
      {
        step: 1,
        title: 'Power Entrance Verification',
        detail: 'Measure voltage between 5V pad and G (Ground). If 0V is read, inspect the Micro-USB port solder joints and test the series polarity protection diode for an open circuit.'
      },
      {
        step: 2,
        title: 'Master Clock Oscillator Test',
        detail: 'Measure the two pins of the 24.000 MHz crystal with an oscilloscope or high-frequency DMM. Both pins should show a clean 24MHz sine wave. If flatline, replace crystal and its two 15pF loading capacitors.'
      },
      {
        step: 3,
        title: 'Audio Output & Distortion Check',
        detail: 'If Bluetooth connects but audio is distorted, check the DC bias on the SPK terminals. A constant DC voltage > 0.1V indicates a punctured output MOSFET in the audio amplifier IC.'
      }
    ],
    technicalNotes: [
      'To prevent ground loop hum/buzzing when powered from the same supply as a main power amplifier, install an isolated B0505S-1W DC-DC converter on the 5V line.',
      'Keep the meandered PCB trace antenna clear of ground planes, battery wires, and metallic chassis enclosures to maintain 10-meter line-of-sight range.'
    ]
  },
  {
    id: 'tv-lcd-panel-tcon-level-shifter',
    title: 'TV LCD Panel T-CON & COF Level Shifter Signals (Al-Amin Lab Blueprint)',
    category: 'TV & Audio',
    deviceModels: ['Samsung UHD 4K TVs', 'LG Smart LED TVs', 'Sony Bravia Panels', 'TCL & Hisense LCD Panels'],
    tag: 'Display Driver & T-CON',
    boardPresetId: 'motherboard',
    summary: 'Master diagnostic blueprint for LCD TV panel edge driver strips (T-CON & Source/Gate COF flex circuit). Details the 12V main input, high-voltage boost AVDD (17V), gate turn-on VGH (25V-32V), gate turn-off VGL (-5V to -10V), common electrode VCOM (6V), HVAA (7.5V), gate clock lines CLK1-CLK8, level shifter lines LC1/LC2, and LVDS mapping resistor exchange (R72/R73).',
    keySpecs: {
      '12V IN': 'Main panel supply rail from motherboard or power board (12.0V DC ± 0.5V)',
      'AVDD (17V)': 'Analog High Voltage: Powers the gamma reference generator and source driver DACs (15V - 17.5V)',
      'VGH (25V - 32V)': 'Gate High Voltage (Von): Pulsed positive bias turning ON the thin-film transistors (TFTs)',
      'VGL (-5V to -10V)': 'Gate Low Voltage (Voff): Negative DC bias keeping unselected pixel rows firmly OFF',
      'VCOM (6.0V - 7.5V)': 'Common Electrode Voltage: Front-glass reference voltage eliminating liquid crystal flicker',
      'Gate Clocks (CLK1 - CLK8)': 'Pulsed shift-register clocks driving row-by-row scanning along edge COF chips',
      'Level Shifter (LC1 / LC2)': 'High-voltage clock drivers alternating polarities to prevent liquid crystal polarization',
      'LVDS Mapping (R72 / R73)': 'Hardware configuration resistors switching panel bit format between VESA and JEIDA'
    },
    pinoutTable: [
      { pin: '12V IN', name: 'Main 12V Power Entrance', description: 'Primary power entrance protected by SMD surface mount fuse F1', targetVoltage: '12.0V DC' },
      { pin: 'AVDD', name: 'Analog High Voltage Rail', description: 'Powers the internal gamma resistor ladder and column source driver DACs', targetVoltage: '17.0V ± 0.5V' },
      { pin: 'VGH', name: 'Gate High Voltage (Von)', description: 'Positive potential required to turn on TFT row switches during vertical scan', targetVoltage: '25.0V - 32.0V DC' },
      { pin: 'VGL', name: 'Gate Low Voltage (Voff)', description: 'Negative potential required to keep unaddressed rows completely dark', targetVoltage: '-5.0V to -10.0V Negative DC' },
      { pin: 'VCOM', name: 'Common Voltage Rail', description: 'Center reference voltage adjusted by precision trimmer or programmable pot', targetVoltage: '6.0V - 7.5V DC' },
      { pin: 'HVAA', name: 'Half AVDD Voltage Rail', description: 'Intermediate bias reference for panel column drivers (typically AVDD / 2)', targetVoltage: '7.5V - 8.5V DC' },
      { pin: 'CLK1-CLK8', name: 'Gate Shift Clock Array', description: 'Eight phased clock lines shifting gate activation down the LCD panel', targetVoltage: '-7V to +30V Pulse Waveform' },
      { pin: 'LC1 / LC2', name: 'Level Shifter Alternating Lines', description: 'Alternating clock outputs driving Gate-in-Panel (GIP) circuits', targetVoltage: '-7V to +30V Square Wave' },
      { pin: 'STV', name: 'Start Vertical Scan Pulse', description: 'Vertical synchronization pulse initiating the top scanline frame', targetVoltage: '3.3V Logic Pulse' },
      { pin: 'R72 / R73', name: 'LVDS Format Selection Resistors', description: 'Exchanging R72 and R73 swaps between JEIDA and VESA color standards', targetVoltage: 'Pull-Up / Pull-Down 3.3V' }
    ],
    steps: [
      {
        step: 1,
        title: 'Check 12V IN & SMD Fuse F1',
        detail: 'Measure both sides of fuse F1. If 12V is present on input side but 0V on output side, F1 is blown due to a shorted ceramic capacitor on the 12V or AVDD rail. Never bridge with solder; locate the short with a thermal camera or multimeter in continuity mode.'
      },
      {
        step: 2,
        title: 'Verify Boosted Rails: AVDD (17V), VGH (28V), VGL (-7V)',
        detail: 'If 12V is good but AVDD, VGH, and VGL are all 0V, the LCD PMIC (e.g. LP6283 or SM4186) has entered protection latch-up mode due to a shorted gate line on the panel glass.'
      },
      {
        step: 3,
        title: 'Tape Bypass Method for Shorted Panel Glass (CLK1-CLK8)',
        detail: 'If the TV power LED blinks and shuts down with dark screen, cut a 3mm strip of Kapton or electrical tape. Mask off CLK1 through CLK8 on the left-side T-CON flat flex cable. Reconnect and power on. If the picture restores cleanly, the internal glass short on the left COF is successfully isolated!'
      },
      {
        step: 4,
        title: 'Fixing Solarized / Negative / Oil-Painting Colors',
        detail: 'If the screen displays inverted colors with washed out outlines after a mainboard replacement, locate resistors R72 and R73 labeled "LVDS MAPPING". Remove the resistor from R72 and solder it onto R73 (or vice-versa) to swap VESA and JEIDA color formats.'
      }
    ],
    technicalNotes: [
      'VGH and VGL must maintain clean DC levels with zero ripple. A leaking charge-pump diode causes rolling horizontal dark bars.',
      'VCOM voltage must be calibrated precisely. If VCOM drifts by more than 0.5V, the panel will exhibit severe image retention (ghosting) and noticeable 60Hz flicker.'
    ]
  },
  {
    id: 'infineon-coolmos-70s360p7-mosfet',
    title: 'Infineon CoolMOS 70S360P7 Power MOSFET & LED TV SMPS Repair Protocol',
    category: 'Components & Testing',
    deviceModels: ['China Universal LED TV Power Supplies', 'Chassis SMPS Boards', 'AC/DC Adapters', 'Set Top Box SMPS'],
    tag: 'Power Semiconductor',
    boardPresetId: 'motherboard',
    summary: 'Technical datasheet specifications, circuit pinout, and catastrophic failure repair protocol for the 70S360P7 N-Channel Power MOSFET (Infineon CoolMOS P7 Series). Packaged in surface-mount DPAK / TO-252, this 700V 11A switch is the primary workhorse of flyback converter power supplies. Outlines failure modes and the mandatory 7-component replacement checklist.',
    keySpecs: {
      'Drain-Source Voltage (VDSS)': '700V Breakdown Voltage rating for high line transient withstand',
      'Continuous Drain Current (ID)': '11.0A @ 25°C case temperature (7.0A @ 100°C)',
      'Pulsed Drain Current (IDM)': '34.0A maximum instantaneous pulse rating',
      'Static RDS(on)': '0.36Ω Maximum low conduction resistance for superior efficiency',
      'Gate Threshold Voltage (VGS_th)': '2.1V - 3.0V (Turn-on threshold)',
      'Total Gate Charge (Qg)': '16.4 nC ultra-low gate capacitance enabling ultra-fast switching transitions',
      'Power Dissipation (PD)': '131 Watts continuous maximum dissipation',
      'Package Footprint': 'DPAK (TO-252) Surface Mount with Drain central tab'
    },
    pinoutTable: [
      { pin: '1', name: 'Gate (G)', description: 'Control terminal receiving PWM drive pulses from the switching controller IC', targetVoltage: '0V - 12V Pulsed' },
      { pin: '2', name: 'Drain (D)', description: 'High-voltage switching terminal connected to primary transformer winding. Central tab is Drain', targetVoltage: 'Up to 700V Peak Pulsed' },
      { pin: '3', name: 'Source (S)', description: 'Current return terminal connected to ground via current sense resistor (R_sense)', targetVoltage: '0V - 1.0V Ramp' }
    ],
    steps: [
      {
        step: 1,
        title: 'Multimeter Diode Test: Diagnosing Shorted MOSFET',
        detail: 'Power OFF and discharge main 450V capacitor. Place RED probe on Source (Pin 3) and BLACK probe on Drain (Pin 2 / Tab). Expected reading is body diode: 0.450V - 0.520V. Reverse probes (RED on Drain, BLACK on Source): Expected is OL. If meter beeps < 0.050V in both directions, the MOSFET is blown short!'
      },
      {
        step: 2,
        title: 'Gate Dielectric Leakage Check',
        detail: 'Measure resistance between Gate (Pin 1) and Source (Pin 3) with one lead lifted. Expected is Open Loop (Megohms). Any reading below 100kΩ indicates punctured gate oxide, which routed high-voltage mains directly into the PWM controller.'
      },
      {
        step: 3,
        title: 'The Mandatory 7-Component Check & Replace Cluster',
        detail: 'When the 70S360P7 MOSFET blows, you MUST check/replace all 7 associated parts before installing a new MOSFET: 1. PWM Controller IC (e.g. UC3842 / 6-pin SOT23), 2. Gate Resistor (typically 10Ω - 47Ω), 3. Startup Resistor (100kΩ - 220kΩ), 4. Current Sense Resistor (e.g. R270 / 0.27Ω), 5. Snubber Capacitor, 6. Snubber Diode (Ultra-fast), 7. AC Bridge Rectifier.'
      },
      {
        step: 4,
        title: 'Safe First Power-Up with Series Light Bulb',
        detail: 'Always wire an incandescent 60W or 100W light bulb in series with the AC mains hot lead for initial power testing. If the bulb glows bright and stays on, a dead short remains. If the bulb flashes brightly for 1 second then dims to near-zero, the SMPS is healthy and regulated!'
      }
    ],
    technicalNotes: [
      'NEVER install a replacement MOSFET without verifying the gate resistor and PWM IC. A defective PWM IC holding the gate HIGH will instantly detonate the brand-new MOSFET in under 2 milliseconds.',
      'Ensure the RCD snubber circuit (parallel resistor-capacitor-diode across primary winding) is functional. An open snubber capacitor allows inductive spikes to exceed 700V, piercing the MOSFET drain.'
    ]
  },
  {
    id: 'lp6283-lcd-pmic-schematic-circuit',
    title: 'LP6283 Multi-Channel LCD PMIC Circuit Architecture & Diagnostics',
    category: 'TV & Audio',
    deviceModels: ['4K Ultra HD LCD Panels', 'BOE & CSOT T-CON Boards', 'High-Res Computer Monitors'],
    tag: 'Power Management IC',
    summary: 'Schematic circuit diagram and pin topology for the LP6283 high-performance multi-channel power management IC for LCD displays (Ornate Pixels blueprint). Generates all essential LCD bias rails: AVDD boost regulator, inverting charge pump (VGL), positive charge pump (VGH), VCOM high-current operational amplifier buffer, and auxiliary step-down buck regulators.',
    keySpecs: {
      'Package': '48-Pin QFN / TQFN Surface Mount with Exposed Ground Thermal Pad',
      'Input Voltage (VIN)': '8.0V to 14.0V (Standard 12.0V panel supply rail)',
      'AVDD Boost Regulator': 'Step-up converter generating up to 18.0V (17V typical) for column drivers',
      'VGH Positive Charge Pump': 'Tripler/doubler pump generating +25V to +35V gate-on bias',
      'VGL Inverting Charge Pump': 'Charge pump generating -5V to -12V gate-off negative bias',
      'VCOM Buffer Amplifier': 'High-speed unity gain op-amp capable of ±150mA continuous current output',
      'Switching Frequency': '500kHz to 1.2MHz selectable via FSEL pin'
    },
    pinoutTable: [
      { pin: 'VIN / INVL', name: 'Main Power Input', description: '12V DC input rail with decoupling MLCC capacitor bank', targetVoltage: '12.0V DC' },
      { pin: 'EN', name: 'Chip Enable', description: 'Active-HIGH logic enable signal initiating power-up sequencing', targetVoltage: '3.3V Logic' },
      { pin: 'LX1', name: 'Boost Converter Switching Node', description: 'Connects to boost inductor and external Schottky rectifier diode', targetVoltage: '12V - 18V PWM Switch' },
      { pin: 'FB1', name: 'AVDD Voltage Feedback', description: 'Resistor divider input maintaining regulated 17V AVDD rail', targetVoltage: '1.25V Reference' },
      { pin: 'DRVN', name: 'Negative Charge Pump Driver', description: 'Pumping pin driving inverting diode-capacitor network for VGL', targetVoltage: '0V to -10V Pulsed' },
      { pin: 'DRVP', name: 'Positive Charge Pump Driver', description: 'Pumping pin driving positive voltage doubler network for VGH', targetVoltage: '17V to 30V Pulsed' },
      { pin: 'VCOM / OPO', name: 'VCOM Output Buffer', description: 'Outputs center-voltage bias to panel liquid crystal common plane', targetVoltage: '6.0V - 7.5V DC' },
      { pin: 'SS / COMP', name: 'Soft-Start & Loop Compensation', description: 'RC compensation network stabilizing control loop and setting inrush ramp', targetVoltage: 'Analog Reference' }
    ],
    steps: [
      {
        step: 1,
        title: 'Verifying Enable and Power Inputs',
        detail: 'Probe VIN (Pin 20/25) for 12V and EN (Pin 9) for 3.3V. If EN is low (0V), the panel timing controller (T-CON SoC) has kept the PMIC asleep or detected an LVDS clock synchronization error.'
      },
      {
        step: 2,
        title: 'Probing LX1 Boost Node & AVDD Diode',
        detail: 'Examine the LX1 switching node with an oscilloscope or DMM. You should observe high-frequency square wave switching. Check the external Schottky rectifier diode for shorted junction.'
      },
      {
        step: 3,
        title: 'Checking Charge Pump Diodes for VGH and VGL',
        detail: 'Dual Schottky diode pairs connected to DRVN and DRVP frequently fail short. If VGH reads 0V while AVDD is 17V, replace the high-side BAT54S / BAV99 dual diode array.'
      }
    ],
    technicalNotes: [
      'The exposed central thermal pad (PGND / CPGND) on the underside of the 48-pin QFN must be solidly soldered to the PCB ground plane. Poor solder coverage causes thermal shutdown within 45 seconds of operation.',
      'A leaky ceramic capacitor on the SS (Soft Start) pin prevents the boost converter from ramping up, resulting in infinite restart loops.'
    ]
  },
  {
    id: 'cd4017-decade-counter-pinout',
    title: 'CD4017 / 4017 CMOS Decade Counter & Frequency Divider Pinout Guide',
    category: 'Components & Testing',
    deviceModels: ['Digital Clocks & Timers', 'Sequencer & Synthesizer Circuits', 'LED Chasers', 'Electronic Roulette Wheels'],
    tag: 'Digital Logic IC',
    summary: 'Master pinout reference and functional breakdown for the CD4017 5-stage Johnson decade counter IC (ElecCircuit reference). Provides 10 fully decoded active-HIGH outputs (Output 0 to Output 9), active-HIGH clock input, active-LOW clock enable, active-HIGH master reset, and a Carry-Out (÷10) pin for cascaded multi-digit counting across an ultra-wide 3V to 15V supply range.',
    keySpecs: {
      'Supply Voltage (Vcc / Pin 16)': '+3.0V to +15.0V DC wide operating voltage capability',
      'Ground Reference (Vss / Pin 8)': '0.0V (System Ground)',
      'Decoded Outputs': '10 mutually exclusive active-HIGH outputs (Q0 through Q9)',
      'Clock Input (Pin 14)': 'Positive edge-triggered clock pulse with Schmitt-trigger action',
      'Clock Enable (Pin 13)': 'Active-LOW: Grounded to count, HIGH inhibits clocking',
      'Reset Input (Pin 15)': 'Active-HIGH: Pulsed HIGH resets counter to Output 0 (Pin 3)',
      'Carry-Out (Pin 12)': 'Outputs 1 cycle for every 10 input clocks (HIGH during Q0-Q4, LOW during Q5-Q9)',
      'Package Footprint': '16-Pin Dual In-line Package (DIP-16) / SOIC-16'
    },
    pinoutTable: [
      { pin: '1', name: 'Output 5 (Q5)', description: 'Goes HIGH on the 6th clock pulse', targetVoltage: '0V or Vcc' },
      { pin: '2', name: 'Output 1 (Q1)', description: 'Goes HIGH on the 2nd clock pulse', targetVoltage: '0V or Vcc' },
      { pin: '3', name: 'Output 0 (Q0)', description: 'Active HIGH on power-up and immediately following Reset', targetVoltage: '0V or Vcc' },
      { pin: '4', name: 'Output 2 (Q2)', description: 'Goes HIGH on the 3rd clock pulse', targetVoltage: '0V or Vcc' },
      { pin: '5', name: 'Output 6 (Q6)', description: 'Goes HIGH on the 7th clock pulse', targetVoltage: '0V or Vcc' },
      { pin: '6', name: 'Output 7 (Q7)', description: 'Goes HIGH on the 8th clock pulse', targetVoltage: '0V or Vcc' },
      { pin: '7', name: 'Output 3 (Q3)', description: 'Goes HIGH on the 4th clock pulse', targetVoltage: '0V or Vcc' },
      { pin: '8', name: 'Vss (GND)', description: 'Negative power supply return terminal', targetVoltage: '0.0V (Ground)' },
      { pin: '9', name: 'Output 8 (Q8)', description: 'Goes HIGH on the 9th clock pulse', targetVoltage: '0V or Vcc' },
      { pin: '10', name: 'Output 4 (Q4)', description: 'Goes HIGH on the 5th clock pulse', targetVoltage: '0V or Vcc' },
      { pin: '11', name: 'Output 9 (Q9)', description: 'Goes HIGH on the 10th clock pulse', targetVoltage: '0V or Vcc' },
      { pin: '12', name: 'Carry-Out (÷10)', description: 'Divided clock output used to cascade next CD4017 counter stage', targetVoltage: '50% Duty Cycle Square' },
      { pin: '13', name: 'Clock ENABLE', description: 'Active-LOW enable control. Must be connected to GND for continuous counting', targetVoltage: '0V = Count / Vcc = Stop' },
      { pin: '14', name: 'Clock Input', description: 'Step clock input triggering next output on each rising edge transition', targetVoltage: '0V to Vcc Pulse' },
      { pin: '15', name: 'Reset', description: 'Active-HIGH reset line. Pulsing HIGH forces counter back to Output 0', targetVoltage: '0V Normal / Vcc Reset' },
      { pin: '16', name: 'Vcc (+3V to +15V)', description: 'Positive power supply terminal', targetVoltage: '+3.0V to +15.0V DC' }
    ],
    steps: [
      {
        step: 1,
        title: 'Critical CMOS Floating Pin Rule',
        detail: 'NEVER leave Pins 13 (Clock Enable), 14 (Clock), or 15 (Reset) floating! High-impedance CMOS inputs pick up ambient electro-static fields, causing erratic counting or total freeze. Pin 13 must be hardwired to GND if unused; Pin 15 must be pulled to GND via 10kΩ resistor.'
      },
      {
        step: 2,
        title: 'Custom Counting Lengths (e.g. 1-to-6 Dice Counter)',
        detail: 'To configure the CD4017 to count to N and reset, simply connect Output N directly to Reset (Pin 15). For example, for a 1-to-6 dice sequence, wire Output 6 (Pin 5) into Reset (Pin 15); the counter will cycle Q0 through Q5 then instantly reset back to Q0!'
      },
      {
        step: 3,
        title: 'Cascading Counters for Multi-Digit Displays',
        detail: 'Connect Carry-Out (Pin 12) of the first CD4017 to Clock Input (Pin 14) of the second CD4017. The second IC will increment by 1 count for every 10 counts of the first IC, creating a two-digit decimal counter.'
      }
    ],
    technicalNotes: [
      'Each decoded output can comfortably source or sink up to 10mA @ 15V (approx. 2mA @ 5V). Always use current-limiting series resistors (330Ω - 1kΩ) when driving LEDs directly.',
      'Use a 100nF ceramic bypass capacitor directly between Pin 16 and Pin 8 placed within 5mm of the IC to prevent false clock triggers from power supply transients.'
    ]
  },
  {
    id: 'smd-schottky-diode-ss14',
    title: 'SMD Schottky Barrier Diode SS14 (Ultra-Fast 1A / 40V SMA DO-214AC)',
    category: 'Components & Testing',
    deviceModels: ['Step-Down Buck Converters', 'Battery Chargers', 'DC-DC Inverters', 'Reverse Polarity Protection'],
    tag: 'Fast Rectifier',
    summary: 'Exploded internal construction anatomy, electrical characteristics, and multimeter testing protocol for the SS14 surface-mount Schottky barrier diode (Rizwan Khan engineering reference). Features ultra-fast switching speed, ultra-low 0.45V forward voltage drop, metal-semiconductor junction, and cathode stripe polarity identification in standard SMA (DO-214AC) package.',
    keySpecs: {
      'Package Type': 'SMA (DO-214AC) Surface Mount Molded Epoxy Case with Matte Tin Terminals',
      'Repetitive Peak Reverse Voltage (VRRM)': '40 Volts maximum blocking capability',
      'Average Forward Current (IF_AV)': '1.0 Ampere continuous rectified forward current',
      'Peak Forward Surge Current (IFSM)': '30 Amperes (8.3ms single half sine-wave)',
      'Typical Forward Voltage Drop (VF)': '0.45V @ 1.0A (significantly lower than silicon PN junction 0.70V)',
      'Maximum Reverse Leakage (IR)': '0.5 mA @ 40V rated reverse voltage at 25°C',
      'Junction Operating Temperature': '-55°C to +150°C'
    },
    pinoutTable: [
      { pin: '1', name: 'Anode (+)', description: 'Positive terminal (lead opposite the white/silver stripe)', targetVoltage: 'Positive Anode' },
      { pin: '2', name: 'Cathode (-)', description: 'Negative terminal (indicated by prominent printed band / stripe)', targetVoltage: 'Negative Cathode' }
    ],
    steps: [
      {
        step: 1,
        title: 'Exploded Construction Anatomy',
        detail: '1. Molded Epoxy Body (insulation), 2. Cathode Mark Stripe (negative polarity), 3. Metal Terminals (SMD solder leads), 4. Silicon Schottky Die (metal-semiconductor barrier), 5. Gold Bond Wire (connects die to cathode lead), 6. Die Attach Solder, 7. Copper Lead Frame, 8. Molded Epoxy Base.'
      },
      {
        step: 2,
        title: 'Digital Multimeter Diode Mode Test Protocol',
        detail: '1. De-energize circuit. 2. Forward Bias: Connect RED probe to Anode (+) and BLACK probe to Cathode (-) (stripe). Expected reading: 0.250V to 0.450V. 3. Reverse Bias: Connect RED probe to Cathode (-) and BLACK probe to Anode (+). Expected reading: OL (Open Loop).'
      },
      {
        step: 3,
        title: 'Fault Analysis & Diagnosis',
        detail: 'Short Circuit Failure: DMM beeps continuously (< 0.050V) in both forward and reverse directions (indicates silicon die punctured from over-voltage or thermal runaway). Open Circuit Failure: Reads OL in both forward and reverse directions (indicates internal gold bond wire burned open).'
      }
    ],
    technicalNotes: [
      'Because Schottky diodes feature a metal-to-semiconductor barrier rather than a PN junction, reverse recovery time (trr) is virtually zero, making them mandatory in high-frequency SMPS buck converters (>100kHz).',
      'Caution: Reverse leakage current increases exponentially with temperature (up to 10mA @ 100°C). Ensure adequate PCB copper heatsinking on the cathode terminal.'
    ]
  },
  {
    id: 'uc3842-pwm-controller-ic-smps',
    title: 'UC3842 Current-Mode PWM Controller IC in Flyback SMPS Power Supplies',
    category: 'Components & Testing',
    deviceModels: ['Desktop PC Power Supplies', 'LED TV SMPS Mainboards', 'DIN Rail Industrial Supplies', 'Battery Chargers'],
    tag: 'Switch-Mode Power Supply',
    boardPresetId: 'motherboard',
    summary: 'Complete pin configuration, internal error amplifier circuit, and diagnostic flowchart for the industry-standard UC3842 8-pin current-mode PWM controller IC. Explains the 16V start-up UVLO threshold, 5.0V precision reference (VREF), cycle-by-cycle current sensing (ISENSE), and high-current totem-pole gate driver output.',
    keySpecs: {
      'Package Footprint': '8-Pin Dual In-line Package (DIP-8) / SOIC-8 Surface Mount',
      'Start-Up Threshold VCC(ON)': '16.0V Typical (Turn-on threshold voltage with 6V hysteresis)',
      'Minimum Operating Voltage VCC(OFF)': '10.0V Typical (Turn-off under-voltage lockout threshold)',
      'Precision Reference Output (VREF)': '5.0V ± 1% regulated reference (up to 50mA output capacity on Pin 8)',
      'Totem Pole Gate Output (Pin 6)': '±1.0 Ampere peak drive current for fast MOSFET gate capacitance charging',
      'Current Sense Comparator Limit (Pin 3)': '1.0V maximum trip threshold for cycle-by-cycle current limiting',
      'Max Duty Cycle': '< 100% (Typically capped at 95% for single-ended flyback topologies)'
    },
    pinoutTable: [
      { pin: '1', name: 'COMP (Compensation)', description: 'Output of the internal error amplifier. RC network connected to VFB sets loop frequency response', targetVoltage: '1.0V - 4.5V Analog' },
      { pin: '2', name: 'VFB (Voltage Feedback)', description: 'Inverting input to the error amplifier; compared against internal 2.5V reference to regulate output', targetVoltage: '2.50V Regulated' },
      { pin: '3', name: 'CURRENT SENSE (ISENSE)', description: 'Non-inverting input to current comparator. Measures voltage drop across source shunt resistor', targetVoltage: '0V - 1.0V Ramp' },
      { pin: '4', name: 'RT / CT (Timing Components)', description: 'Oscillator timing resistor connected to VREF and timing capacitor connected to GND', targetVoltage: 'Sawtooth Waveform' },
      { pin: '5', name: 'GROUND', description: 'Combined power ground and signal reference terminal', targetVoltage: '0.0V (Ground)' },
      { pin: '6', name: 'OUTPUT (Gate Drive)', description: 'High-current totem pole driver output directly switching power MOSFET gate', targetVoltage: '0V - 12V PWM Square' },
      { pin: '7', name: 'VCC (Supply Voltage)', description: 'Operating supply input. Must exceed 16V to start up; operates down to 10V before UVLO shutdown', targetVoltage: '12V - 18V DC' },
      { pin: '8', name: 'VREF (5.0V Reference)', description: 'Internally generated precision reference voltage powering timing circuits and pull-ups', targetVoltage: '5.00V ± 0.05V' }
    ],
    steps: [
      {
        step: 1,
        title: 'Step 1: Check VCC Supply (Pin 7) & Hiccup Mode Test',
        detail: 'Measure DC voltage at Pin 7 with power applied. Scenario A: Steady 0V - Startup resistor (typically 100kΩ - 220kΩ 2W from 320V DC rail) is blown open. Scenario B: Voltage bouncing rhythmically between 10V and 16V (Hiccup mode) - The UC3842 is attempting to boot, but secondary short circuit or open auxiliary diode is starving sustained VCC.'
      },
      {
        step: 2,
        title: 'Step 2: Inspect Precision 5.0V Reference (Pin 8)',
        detail: 'Measure Pin 8. If VCC exceeds 16V but Pin 8 reads 0V (or < 4.8V), the internal bandgap reference is destroyed. Replace the UC3842 IC.'
      },
      {
        step: 3,
        title: 'Step 3: Inspect Current Sense Resistor (Pin 3)',
        detail: 'Inspect the low-value source shunt resistor connected to Pin 3 (typically 0.22Ω to 0.47Ω 2W). If the power MOSFET previously blew, high current surged into Pin 3, blowing both the shunt resistor and the internal current sense comparator.'
      },
      {
        step: 4,
        title: 'Step 4: Verify Totem Pole Gate Drive (Pin 6)',
        detail: 'Use an oscilloscope to view Pin 6. A healthy IC outputs crisp rectangular PWM pulses with rise times < 50ns. If pulses are sluggish or triangular, check the series gate resistor (10Ω - 22Ω) and 1N4148 reverse discharge diode.'
      }
    ],
    technicalNotes: [
      'FAMILY DIFFERENCES: UC3842 (UVLO: 16V on / 10V off, Max Duty: <100%), UC3843 (UVLO: 8.4V on / 7.6V off, Max Duty: <100%), UC3844 (UVLO: 16V on / 10V off, Max Duty: 50%), UC3845 (UVLO: 8.4V on / 7.6V off, Max Duty: 50%). Do not interchange a UC3842 with a UC3843 without recalculating startup resistors!',
      'Always replace the electrolytic reservoir capacitor on Pin 7 (typically 47µF 50V 105°C low-ESR) during power supply refurbishment.'
    ]
  }
];

