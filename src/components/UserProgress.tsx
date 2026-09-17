import { Award, Zap, Trash2, Heart, ShieldAlert, GraduationCap, Flame } from 'lucide-react';
import type { UserProfile, Guide } from '../types';

export default function UserProgress({ 
  currentUser, 
  savedGuides, 
  onOpenGuide, 
  onRemoveSavedGuide, 
  onNavigateToGuides 
}: { 
  currentUser: UserProfile; 
  savedGuides: Guide[]; 
  onOpenGuide: (g: Guide) => void; 
  onRemoveSavedGuide: (g: Guide) => void; 
  onNavigateToGuides: () => void; 
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-850 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-4">
          <div className="flex items-center gap-4">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-16 h-16 rounded-2xl border-2 border-amber-400 object-cover shadow-md" referrerPolicy="no-referrer" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-bold uppercase tracking-wider">{currentUser.role}</span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">Technician Bench Account ID: #{currentUser.id}</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
            You are actively diverting hazardous lead-glass CRT tubes, batteries, and tantalum capacitors from landfills. Keep studying lessons, completing certifications, and filing repairs to level up your bench rank!
          </p>
        </div>

        <div className="md:col-span-4 bg-stone-950 rounded-2xl p-4 sm:p-5 border border-stone-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Reputation Level</span>
            <span className="text-xs font-mono font-bold text-amber-400">{currentUser.reputationPoints} Points</span>
          </div>
          <div className="space-y-1">
            <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400" style={{ width: `${(currentUser.reputationPoints % 1000) / 10}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-stone-500">
              <span>Class 2 Tech</span>
              <span>Class 3 Expert</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs text-center space-y-1">
          <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Repairs Logged</span>
          <p className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">{currentUser.repairsCompleted}</p>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center justify-center gap-1">
            <Zap className="w-3 h-3 fill-current" />
            <span>+100% Success</span>
          </span>
        </div>

        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs text-center space-y-1">
          <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">E-Waste Diverted</span>
          <p className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">{currentUser.eWasteDivertedKg.toFixed(1)} <span className="text-xs font-normal">Kg</span></p>
          <span className="text-[10px] text-stone-400">Total material weight</span>
        </div>

        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs text-center space-y-1">
          <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">CO2 Saved (Est)</span>
          <p className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">{currentUser.co2SavedKg.toFixed(1)} <span className="text-xs font-normal">Kg</span></p>
          <span className="text-[10px] text-emerald-600 font-bold">18.5Kg CO2 / Kg waste</span>
        </div>

        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs text-center space-y-1">
          <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Unlocked Badges</span>
          <p className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">{currentUser.badges.length}</p>
          <span className="text-[10px] text-stone-400">Official certifications</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
            <h3 className="text-sm sm:text-base font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <span>Offline Bench Cache ({savedGuides.length} Cached Guides)</span>
            </h3>
            <button onClick={onNavigateToGuides} className="text-xs font-bold text-amber-600 dark:text-amber-400">Browse Guides</button>
          </div>

          {savedGuides.length === 0 ? (
            <div className="py-12 text-center text-stone-400 space-y-2">
              <ShieldAlert className="w-10 h-10 mx-auto opacity-40 text-stone-500" />
              <p className="text-xs">No guides cached offline yet.</p>
              <p className="text-[11px] max-w-xs mx-auto">Click the bookmark pin icon on any repair guide to store its high-res steps directly inside your browser cache.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedGuides.map(guide => (
                <div key={guide.id} className="p-3 sm:p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{guide.deviceCategory}</span>
                    <h4 onClick={() => onOpenGuide(guide)} className="text-xs sm:text-sm font-black text-stone-900 dark:text-stone-100 cursor-pointer hover:underline">{guide.title}</h4>
                    <p className="text-[10px] text-stone-400">Saved for local offline bench mode</p>
                  </div>

                  <button 
                    onClick={() => onRemoveSavedGuide(guide)}
                    className="p-2 text-stone-400 hover:text-red-500 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Remove from Cache"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Badges & Certifications</span>
          </h3>

          <div className="space-y-3.5">
            {currentUser.badges.map((badge, idx) => (
              <div key={idx} className="p-3 rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/20 dark:bg-amber-950/20 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-400 text-stone-950 shrink-0">
                  {badge.icon === 'Award' ? <GraduationCap className="w-5 h-5" /> : <Flame className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">{badge.name}</span>
                  <p className="text-[10px] text-stone-500 leading-relaxed mt-0.5">{badge.description}</p>
                  <span className="text-[9px] text-stone-400 block mt-1 font-mono">Issued: {badge.unlockedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
