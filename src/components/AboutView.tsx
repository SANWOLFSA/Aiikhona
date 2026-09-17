import { Info, ShieldCheck, Cpu, Leaf, Globe, Award } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black shadow-lg">
          <Info className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-black text-stone-900 dark:text-stone-100">About DIY Electronics Hub</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">Empowering technicians, makers, and the global Right-to-Repair movement</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-500 flex items-center justify-center">
            <Leaf className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">Our E-Waste Mission</h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Every year, millions of tons of electronic waste are discarded prematurely due to lack of component-level repair documentation and proprietary lockdowns. We provide open-source repair guides, schematics, and diagnostic tools to keep hardware in circulation longer.
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">Verified Marketplace</h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Our trusted spare parts marketplace connects vetted component distributors and independent repair shops with verified trading registration, ensuring authentic ICs, passive components, and display modules.
          </p>
        </div>
      </div>

      <div className="bg-stone-900 text-stone-100 dark:bg-stone-900 dark:border dark:border-stone-800 rounded-3xl p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold">Platform Architecture & AI</h3>
            <p className="text-xs text-stone-400">Built with React, TypeScript, Tailwind CSS, Firebase, and Gemini AI</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-800">
          <div>
            <p className="text-2xl font-black text-amber-400">1,420+</p>
            <p className="text-[11px] text-stone-400">Repair Guides</p>
          </div>
          <div>
            <p className="text-2xl font-black text-amber-400">8.4k kg</p>
            <p className="text-[11px] text-stone-400">E-Waste Diverted</p>
          </div>
          <div>
            <p className="text-2xl font-black text-amber-400">99.8%</p>
            <p className="text-[11px] text-stone-400">Diagnostic Accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
