// Issue library: home medical devices (blood pressure monitors, oximeters, CPAP, nebulizers, hearing aids, glucose meters).
// Scope is deliberately limited to user-serviceable faults (power, batteries, cuffs, tubing, filters, contacts, calibration
// checks). Anything inside a sealed medical device or affecting accuracy goes to the manufacturer / an authorised agent.
import type { FamilyLibrary } from '../catalog/types';

const MED = 'Medical devices must give accurate readings. Do not open sealed units or adjust sensors: if accuracy is in doubt, stop using it for medical decisions and have it checked by the manufacturer or an authorised service agent. Talk to your doctor or pharmacist about readings, not this guide.';

export const medical_home: FamilyLibrary = {
  issues: [
    {
      id: 'no-power', title: 'Will not switch on / turns off during use',
      symptom: 'The {brand} {model} shows nothing, flickers, or switches off mid-measurement.',
      causes: ['Flat or wrong-type batteries (alkaline vs rechargeable)', 'Corroded battery contacts from a leaked cell', 'Faulty mains adapter (wrong voltage or polarity)', 'Firmware lock-up'],
      tests: ['Fit fresh batteries of the type in the manual and check polarity marks.', 'Inspect the battery compartment for white/green corrosion on the springs.', 'Measure the adapter output with a multimeter and compare it with the label (voltage and centre-pin polarity).', 'Remove all power for 2 minutes, then try again.'],
      fix: ['Clean corroded contacts with isopropyl alcohol and a cotton bud; dry fully before refitting batteries.', 'Use only the manufacturer\'s adapter (or one with identical voltage, polarity and connector).', 'If it still will not power on, contact the manufacturer: many units are still under warranty.'],
      parts: ['Batteries (as specified)', 'Original mains adapter'], tools: ['Digital multimeter', 'Isopropyl alcohol', 'Cotton buds'],
      difficulty: 'Easy', minutes: 15, safety: MED,
    },
    {
      id: 'cuff-error', title: 'Error code / cuff does not inflate or leaks',
      symptom: 'The monitor shows an E-code, the cuff inflates slowly, deflates early, or the pump runs without pressure building.',
      causes: ['Cuff tube not fully pushed onto the connector', 'Cracked tube or leaking cuff bladder', 'Cuff wrapped incorrectly or wrong cuff size', 'Moving or talking during the reading'],
      tests: ['Look up the error code in the {brand} manual.', 'Push the tube connector fully home; check for splits along the tube.', 'Inflate and listen / feel for a leak along the bladder seams.', 'Measure arm circumference and compare with the cuff size range printed on the cuff.'],
      fix: ['Replace the cuff (bladder + tube) with the genuine {brand} part for your model and arm size.', 'Sit still, arm supported at heart level, feet flat, and repeat after 1–2 minutes.', 'If the pump runs but pressure never builds with a new cuff, return the unit for service.'],
      parts: ['Replacement cuff (correct size)', 'Air tube / connector'], tools: [],
      difficulty: 'Easy', minutes: 10, safety: MED, only: ['blood_pressure_monitor'],
    },
    {
      id: 'reading-accuracy', title: 'Readings seem wrong or inconsistent',
      symptom: 'Readings from the {model} jump around or differ a lot from a clinic measurement.',
      causes: ['Measurement technique (position, cold fingers, nail polish, movement)', 'Wrong cuff size or sensor placement', 'Expired test strips or wrong code (glucose meters)', 'Device out of calibration'],
      tests: ['Repeat the measurement following the manual exactly (rest 5 minutes, correct posture / finger placement).', 'Compare 3 readings taken a few minutes apart.', 'Glucose meters: run a control-solution test and check strip expiry dates.', 'Take the device to your clinic or pharmacy and compare against their calibrated device.'],
      fix: ['Correct the technique / cuff size and re-measure.', 'Replace expired strips; run control solution after opening a new pack.', 'If it is still out of tolerance, have it recalibrated or replaced by the manufacturer — do not try to adjust it yourself.'],
      parts: ['Control solution / test strips', 'Correct-size cuff'], tools: [],
      difficulty: 'Easy', minutes: 20, safety: MED,
    },
    {
      id: 'cpap-airflow', title: 'Weak airflow, noise or water in the tube (CPAP / nebulizer)',
      symptom: 'The {brand} {model} blows weakly, whistles, makes condensation in the hose or the nebulizer produces little mist.',
      causes: ['Clogged air inlet filter', 'Cracked hose, mask cushion or loose connections', 'Humidifier set too high for the room temperature ("rainout")', 'Blocked nebulizer cup / mesh or worn compressor filter'],
      tests: ['Inspect and hold the inlet filter up to the light; check its replacement date.', 'Check the hose and mask for splits and listen for leaks with the unit running.', 'Note humidity / heated-tube settings and the room temperature.', 'Nebulizers: check the medication cup, mesh and tubing for blockage; replace the compressor air filter.'],
      fix: ['Replace filters on schedule (disposable CPAP filters roughly every 2–4 weeks; check the manual).', 'Replace a worn hose, cushion or mask; use a heated tube or insulated hose cover to stop rainout.', 'Clean the cup / mesh exactly as the manual says; replace consumables that do not come clean.', 'Motor or blower noise that remains with new consumables: return to the supplier for service.'],
      parts: ['Inlet filters', 'Hose / heated tube', 'Mask cushion', 'Nebulizer kit'], tools: [],
      difficulty: 'Easy', minutes: 20, safety: MED, only: ['cpap_machine', 'nebulizer'],
    },
    {
      id: 'hearing-aid-weak', title: 'Hearing aid weak, whistling or not charging',
      symptom: 'Sound from the {model} is quiet, distorted, whistles, or it will not charge.',
      causes: ['Blocked wax guard / dome', 'Moisture in the receiver or microphone ports', 'Dirty charging contacts', 'Worn dome or tube causing feedback'],
      tests: ['Inspect the receiver for wax; change the wax guard.', 'Check the dome / tube for cracks and fit.', 'Clean the charger and hearing-aid contacts with a dry brush; confirm the charging LED behaviour in the manual.'],
      fix: ['Replace wax guards and domes (consumables made for your model).', 'Use a drying kit overnight after sweat or rain.', 'If it still will not charge or remains weak, take it to your audiologist; do not open the shell.'],
      parts: ['Wax guards', 'Domes', 'Drying kit'], tools: ['Cleaning brush'],
      difficulty: 'Easy', minutes: 10, safety: MED, only: ['hearing_aid'],
    },
    {
      id: 'display-buttons', title: 'Display missing segments or buttons not responding',
      symptom: 'Digits are incomplete, the screen is faint, or buttons need hard presses.',
      causes: ['Low battery voltage', 'Dirt or moisture under the membrane buttons', 'Failing LCD zebra connector'],
      tests: ['Fit fresh batteries first.', 'Check whether pressing on the edge of the screen changes the missing segments (zebra strip contact).', 'Inspect the buttons for sticky residue.'],
      fix: ['Clean around buttons with a slightly damp cloth; never spray liquid into the device.', 'A faulty LCD on a medical device should be repaired or replaced by the manufacturer so readings can be trusted.'],
      parts: ['Batteries'], tools: ['Soft cloth'], difficulty: 'Easy', minutes: 10, safety: MED,
    },
  ],
};
