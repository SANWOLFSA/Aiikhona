import { useState } from 'react';
import { 
  X, Clock, Leaf, Wrench, ArrowLeft, ArrowRight, 
  CheckCircle, ShieldAlert, Award, Bookmark, BookmarkCheck 
} from 'lucide-react';
import VideoTutorial from './VideoTutorial';
import type { Guide } from '../types';

export default function GuideDetail({ 
  guide, 
  onClose, 
  onCompleteRepair, 
  onSourcePart, 
  onToggleSaveGuide, 
  isSaved 
}: { 
  guide: Guide; 
  onClose: () => void; 
  onCompleteRepair: (eWasteSaved: number) => void; 
  onSourcePart: (pn: string) => void; 
  onToggleSaveGuide: (g: Guide) => void; 
  isSaved: boolean; 
}) {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [multimeterChecked, setMultimeterChecked] = useState<boolean | null>(null);
  const [repairLogged, setRepairLogged] = useState(false);

  const activeStep = guide.steps[activeStepIdx];

  const handleNextStep = () => {
    if (activeStepIdx < guide.steps.length - 1) {
      setActiveStepIdx(activeStepIdx + 1);
      setMultimeterChecked(null);
    }
  };

  const handlePrevStep = () => {
    if (activeStepIdx > 0) {
      setActiveStepIdx(activeStepIdx - 1);
      setMultimeterChecked(null);
    }
  };

  const handleLogRepairComplete = () => {
    onCompleteRepair(guide.eWasteSavedKg);
    setRepairLogged(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[95vh] rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 overflow-y-auto space-y-6 shadow-2xl flex flex-col justify-between">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 z-10">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6 flex-1">
          <div className="space-y-3 pb-4 border-b border-stone-200 dark:border-stone-800 flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1 pr-6">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold uppercase tracking-wider">{guide.deviceCategory}</span>
                <span className="text-stone-500 font-medium">Model: {guide.deviceModel}</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 leading-tight">{guide.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
                <span className="flex items-center gap-1 font-mono"><Clock className="w-4 h-4 text-amber-500" /> {guide.estimatedTimeMinutes} Min</span>
                <span className="flex items-center gap-1 font-mono"><Leaf className="w-4 h-4 text-emerald-500" /> {guide.eWasteSavedKg} Kg E-waste saved</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">Difficulty: {guide.difficulty}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => onToggleSaveGuide(guide)} 
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${isSaved ? 'bg-amber-400 text-stone-950 shadow-md' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'}`}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                <span>{isSaved ? "Saved Offline" : "Bookmark Offline"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 bg-stone-50 dark:bg-stone-850 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-stone-400">Required Tools & Consumables</h3>
                <ul className="space-y-1.5 text-xs">
                  {guide.toolsRequired.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">▪</span>
                      <span className="text-stone-700 dark:text-stone-300 font-medium">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {guide.partsRequired && guide.partsRequired.length > 0 && (
                <div className="p-4 bg-stone-50 dark:bg-stone-850 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-stone-400">Spare Parts Needed</h3>
                  <div className="space-y-2">
                    {guide.partsRequired.map((p, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex justify-between items-center text-xs">
                        <div>
                          <span className="font-bold text-stone-800 dark:text-stone-200 block">{p.name}</span>
                          <span className="text-[10px] text-stone-400 font-mono">{p.partNumber}</span>
                        </div>
                        <button 
                          onClick={() => onSourcePart(p.partNumber)}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-400 text-stone-950 font-bold text-[10px]"
                        >
                          Source
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-8 space-y-6">
              {isVideoPlaying ? (
                <div className="rounded-2xl overflow-hidden aspect-video relative bg-stone-950 border border-stone-800">
                  <VideoTutorial videoUrl={guide.videoUrl} onClose={() => setIsVideoPlaying(false)} />
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden aspect-video relative bg-stone-950 border border-stone-800 flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <img src={guide.thumbnailUrl} alt="Video thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-40 filter blur-xs" />
                  <div className="relative z-10 w-14 h-14 rounded-full bg-amber-400 hover:scale-105 active:scale-95 transition-all text-stone-950 flex items-center justify-center cursor-pointer shadow-lg" onClick={() => setIsVideoPlaying(true)}>
                    <svg className="w-6 h-6 fill-current pl-1" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4l12 6-12 6V4z"/></svg>
                  </div>
                  <span className="relative z-10 text-xs text-stone-200 font-bold">Watch Official Bench Walkthrough Video</span>
                </div>
              )}

              <div className="p-5 sm:p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-4">
                <div className="flex justify-between items-center pb-2.5 border-b border-stone-100 dark:border-stone-800">
                  <span className="text-xs font-black text-amber-600 dark:text-amber-400">STEP {activeStep.stepNumber} OF {guide.steps.length}</span>
                  <span className="text-[10px] text-stone-400 uppercase font-bold">Guided Flow</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100">{activeStep.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">{activeStep.description}</p>
                </div>

                {activeStep.safetyWarning && (
                  <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex gap-2">
                    <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Technician Safety Warning:</span>
                      <p className="mt-0.5 leading-relaxed font-normal">{activeStep.safetyWarning}</p>
                    </div>
                  </div>
                )}

                {activeStep.proTip && (
                  <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-900/30 text-xs text-emerald-900 dark:text-emerald-300 flex gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Bench Pro-Tip:</span>
                      <p className="mt-0.5 leading-relaxed font-normal">{activeStep.proTip}</p>
                    </div>
                  </div>
                )}

                {activeStep.multimeterCheck && (
                  <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-3">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Multimeter Diagnostic Validation</span>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-stone-400 block text-[9px] uppercase font-bold">Multimeter Mode</span>
                        <span className="font-bold text-stone-800 dark:text-stone-200">{activeStep.multimeterCheck.mode}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[9px] uppercase font-bold">Probing Strategy</span>
                        <span className="font-bold text-stone-800 dark:text-stone-200">Red: {activeStep.multimeterCheck.probeRed}</span>
                        <span className="block text-stone-500 text-[10px]">Black: {activeStep.multimeterCheck.probeBlack}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-stone-900 rounded-lg text-xs font-mono text-center">
                      <span className="text-stone-400 text-[10px] block uppercase font-bold">Expected Target Value</span>
                      <span className="text-sm font-black text-amber-400">{activeStep.multimeterCheck.expectedValue}</span>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-stone-200 dark:border-stone-800 text-xs">
                      <span className="font-bold text-stone-700 dark:text-stone-300">Are you reading the expected value?</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setMultimeterChecked(true)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${multimeterChecked === true ? "bg-emerald-500 border-emerald-500 text-white font-black" : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-850 hover:border-emerald-400 text-stone-600 dark:text-stone-300"}`}
                        >
                          Yes (Move to Next Step)
                        </button>
                        <button 
                          onClick={() => setMultimeterChecked(false)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${multimeterChecked === false ? "bg-red-500 border-red-500 text-white font-black" : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-850 hover:border-red-400 text-stone-600 dark:text-stone-300"}`}
                        >
                          No (Requires desoldering/IC swap)
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4">
          <button 
            disabled={activeStepIdx === 0}
            onClick={handlePrevStep}
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-amber-400 text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          {activeStepIdx < guide.steps.length - 1 ? (
            <button 
              onClick={handleNextStep}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-xs"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              disabled={repairLogged}
              onClick={handleLogRepairComplete}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs transition-colors flex items-center gap-1.5 shadow-md disabled:opacity-50"
            >
              <Award className="w-4 h-4" />
              <span>{repairLogged ? "Repair Logged Successfully!" : "Log Successful Repair"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
