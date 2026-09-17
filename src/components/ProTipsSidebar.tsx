import { Wrench, ShieldAlert, Cpu } from 'lucide-react';

export default function ProTipsSidebar() {
  const references = [
    {
      title: "Hot Air Rework Safety",
      detail: "Set temperature to 340°C - 360°C and airflow to 40% for typical lead-free QFN chips. Never exceed 380°C on thin phone PCBs to prevent fiberglass layer delamination."
    },
    {
      title: "Active Short-Circuit Sourcing",
      detail: "Inject no more than 1.2V at 1.5A into shorted power rails. Check for warm spots using freeze spray or a thermal camera. High voltage will punch through delicate logic gates."
    },
    {
      title: "Standard Capacitor Code Chart",
      detail: "104 = 100nF (0.1µF). 106 = 10µF. Under high DC-bias, MLCC capacitors can lose up to 60% of their rated capacitance value."
    }
  ];

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 space-y-4 shadow-xs">
      <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 pb-2 border-b border-stone-100 dark:border-stone-800">
        <Wrench className="w-4 h-4 text-amber-500" />
        <span>Workbench Cheat-Sheets</span>
      </div>
      
      <div className="space-y-4">
        {references.map((ref, idx) => (
          <div key={idx} className="space-y-1 text-xs">
            <span className="font-bold text-stone-900 dark:text-stone-100 block flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-500" />
              <span>{ref.title}</span>
            </span>
            <p className="text-stone-500 leading-relaxed font-normal">{ref.detail}</p>
          </div>
        ))}
      </div>
      
      <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-[11px] text-amber-900 dark:text-amber-400 flex gap-2">
        <ShieldAlert className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Safe Bench Rule:</strong> Always disconnect both battery and AC charger before using a soldering iron or probing passives.
        </p>
      </div>
    </div>
  );
}
