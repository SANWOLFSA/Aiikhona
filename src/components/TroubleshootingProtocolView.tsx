import React from 'react';
import { ArrowLeft, CheckCircle2, ShieldAlert, Cpu, BookmarkCheck, Database, Wrench } from 'lucide-react';
import { DeviceCategory, DeviceBrand, DeviceSize } from '../data/deviceCatalog';

interface TroubleshootingProtocolViewProps {
  category: DeviceCategory;
  brand: DeviceBrand;
  size: DeviceSize;
  onBackToModels: () => void;
  onAddToDatabase: () => void;
  isSaving: boolean;
  addedToDatabase: boolean;
  onSourcePart: (partNumber: string) => void;
}

export const TroubleshootingProtocolView: React.FC<TroubleshootingProtocolViewProps> = ({
  category,
  brand,
  size,
  onBackToModels,
  onAddToDatabase,
  isSaving,
  addedToDatabase,
  onSourcePart,
}) => {
  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        <button
          onClick={onBackToModels}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Tier 3: {brand.name} Models & Sizes</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <Cpu className="w-4 h-4" />
              <span>TIER 4 — REPAIR SOLUTIONS & DIAGNOSTIC PROTOCOL</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-stone-900 dark:text-stone-100 mt-1">
              {brand.name} — {size.name}
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Category: {category.name}
            </p>
          </div>

          <button
            onClick={onAddToDatabase}
            disabled={isSaving}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-xs ${
              addedToDatabase
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {addedToDatabase ? (
              <>
                <BookmarkCheck className="w-4 h-4" />
                <span>Saved to Workbench DB</span>
              </>
            ) : (
              <>
                <Database className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save to My Workbench DB'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Repair Manual Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column: Common Faults & Diagnostic Steps */}
        <div className="lg:col-span-2 space-y-6">
          {/* Common Issues */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <h2 className="text-sm font-black text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="w-4 h-4" />
              <span>Common Failure Symptoms</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {size.commonIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className="bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 p-3.5 rounded-xl flex items-start gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                  <span className="text-xs font-medium text-amber-950 dark:text-amber-200 leading-relaxed">
                    {issue}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Protocol Steps */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <h2 className="text-sm font-black text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Multimeter & Test Point Diagnostics</span>
            </h2>
            <div className="space-y-3">
              {size.diagnosticSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 p-4 rounded-xl flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Repair Protocol Summary */}
          {size.repairSummary && (
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
              <h2 className="text-sm font-black text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2 text-stone-700 dark:text-stone-300">
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>Executive Repair Protocol</span>
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-100 dark:border-stone-800 font-mono">
                {size.repairSummary}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Column: Tools & Parts */}
        <div className="space-y-6">
          {/* Required Tools */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <h2 className="text-xs font-black text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-4 h-4 text-blue-600" />
              <span>Required Precision Tools</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {size.requiredTools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Replacement Parts */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <h2 className="text-xs font-black text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>Common Component Parts</span>
            </h2>
            <div className="space-y-2">
              {size.commonParts.map((part, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50 dark:bg-stone-800/50 p-3 rounded-xl border border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-stone-800 dark:text-stone-200 truncate pr-2">
                    {part}
                  </span>
                  <button
                    onClick={() => onSourcePart(part)}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-600 hover:text-white transition-colors shrink-0 text-[11px]"
                  >
                    Source
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
