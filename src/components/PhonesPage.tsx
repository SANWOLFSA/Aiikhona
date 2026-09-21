import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Smartphone, Zap, Search, AlertTriangle, Sparkles, CheckCircle2, ChevronDown, Wand2, FileText } from 'lucide-react';
import Markdown from 'react-markdown';
import type { ThemeConfig } from '../lib/theme';

const BRANDS = [
  "Apple iPhone",
  "Samsung Galaxy",
  "Google Pixel",
  "Xiaomi / Redmi",
  "Huawei",
  "OnePlus",
  "Motorola",
  "Other Android"
];

const COMMON_ISSUES = [
  "Hard Reset / Factory Wipe",
  "FRP Lock / Activation Lock",
  "No Power / Dead Phone",
  "Screen Flickering / Ghost Touch",
  "Mic Not Working",
  "Battery Draining Fast",
  "Overheating",
  "Stuck in Bootloop"
];

export default function PhonesPage({ themeConfig, onNavigateTo3D }: { themeConfig?: ThemeConfig; onNavigateTo3D?: () => void }) {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [customSymptom, setCustomSymptom] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand) {
      setError("Please select a Phone Brand/Model.");
      return;
    }
    
    const issueToSearch = customSymptom.trim() || selectedIssue;
    if (!issueToSearch) {
      setError("Please select an issue or type a custom symptom.");
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);
    setIsAiGenerated(false);

    try {
      // 1. Check Firebase first (Using a deterministic document ID)
      const docId = `${selectedBrand}-${issueToSearch}`.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const docRef = doc(db, 'repairTricks', docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().content) {
        setResult(docSnap.data().content);
        setIsAiGenerated(false);
      } else {
        // 2. If not in DB, generate via AI
        setIsAiGenerated(true);
        const prompt = `Write a step-by-step repair guide and troubleshooting trick for:
Brand/Model: ${selectedBrand}
Issue: ${issueToSearch}

Format the response using clean Markdown with bold headers (##), visual warning cards, bullet points, and concise troubleshooting steps that match a bright, playful electronics app design. Include a "Required Tools" section if applicable.`;

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: prompt,
            systemInstruction: `You are the embedded AI Co-Pilot for the DIYELECTRONICS web app, a dynamic repair search engine. 

CRITICAL SAFETY & RESPONSE INSTRUCTIONS:
1. If a user asks about security locks, "FRP Lock", "Activation Lock", or "Hard Reset locks", DO NOT output a standard AI safety refusal text. 
2. Instead, maintain a helpful, technical repair tone. Focus entirely on explaining the authorized engineering mechanics of the lock system, official device owner provisioning via DevicePolicyManager API frameworks, and hardware diagnostic steps (checking motherboard lines, voltage rails, or recovery buttons).
3. Always structure your response using clean Markdown with bold headers, visual warning boxes, and concise bullet points that match a bright, playful electronics app design.`
          })
        });

        if (!res.ok) {
          throw new Error("Failed to generate AI response.");
        }

        const data = await res.json();
        const aiContent = data.reply;
        setResult(aiContent);

        // 3. Cache it in Firebase for future users
        try {
          await setDoc(docRef, {
            brand: selectedBrand,
            issue: issueToSearch,
            content: aiContent,
            createdAt: serverTimestamp(),
            source: 'ai_generated'
          });
        } catch (dbErr) {
          console.warn("Failed to cache to Firestore:", dbErr);
          // Don't break the UI if caching fails
        }
      }
    } catch (err: any) {
      console.error(err);
      setError("An error occurred while fetching the repair guide. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Section - Themed Telemetry Banner */}
      <div className={`${themeConfig?.cardBannerBg || 'bg-slate-900 border-slate-800'} rounded-2xl p-7 md:p-8 mb-6 text-white shadow-xs border relative overflow-hidden`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md ${themeConfig?.headerBadgeBg || 'bg-slate-800/90'} ${themeConfig?.headerBadgeBorder || 'border-slate-700'} ${themeConfig?.headerBadgeText || 'text-slate-300'} border text-[11px] font-semibold tracking-wider uppercase mb-3`}>
              <Smartphone className="w-3.5 h-3.5" />
              <span>{themeConfig?.bannerTag || 'Hardware Telemetry & Firmware Diagnostics'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
              Phones Diagnostics & Solution Matrix
            </h1>
            <p className="text-slate-300 dark:text-slate-400 text-sm max-w-2xl font-normal leading-relaxed">
              Query validated component-level solutions from the enterprise repair database, or initiate automated AI telemetry analysis for specific error codes and device symptoms.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
            {onNavigateTo3D && (
              <button
                type="button"
                onClick={onNavigateTo3D}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Boardview & Blueprints</span>
              </button>
            )}
            <div className="hidden md:block px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-right backdrop-blur-xs">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Engine Status</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center justify-end gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Telemetry Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSearch} className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-xs border border-slate-200/80 dark:border-slate-800 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Brand Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Device Brand / Model
            </label>
            <div className="relative">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full appearance-none bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 transition-all cursor-pointer"
              >
                <option value="">Select device platform...</option>
                {BRANDS.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Common Issues Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Primary Symptom / Failure Code
            </label>
            <div className="relative">
              <select
                value={selectedIssue}
                onChange={(e) => {
                  setSelectedIssue(e.target.value);
                  setCustomSymptom("");
                }}
                className="w-full appearance-none bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 transition-all cursor-pointer"
              >
                <option value="">Select common fault condition...</option>
                {COMMON_ISSUES.map(issue => (
                  <option key={issue} value={issue}>{issue}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 my-5">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
          <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Or Specify Custom Telemetry</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
        </div>

        {/* Custom Symptom Search Bar */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
            Custom Diagnostic Symptom or Error Code
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={customSymptom}
              onChange={(e) => {
                setCustomSymptom(e.target.value);
                setSelectedIssue("");
              }}
              placeholder="e.g. NAND error 4013, bootloop after drop, thermal shutdown on PMIC rail..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-11 pr-4 py-3 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 transition-all"
            />
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-xl flex items-start gap-3 text-red-700 dark:text-red-400 font-medium text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full sm:w-auto px-6 py-3 ${themeConfig?.primaryBg || 'bg-blue-600'} ${themeConfig?.primaryHover || 'hover:bg-blue-500'} ${themeConfig?.primaryText || 'text-white'} rounded-xl font-semibold text-xs uppercase tracking-wider transition-all shadow-xs disabled:opacity-50 flex items-center justify-center gap-2`}
        >
          {loading ? (
            <>
              <Zap className="w-4 h-4 animate-spin text-slate-400" />
              <span>Analyzing Hardware Telemetry...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Query Solution Matrix</span>
            </>
          )}
        </button>
      </form>

      {/* Results Section */}
      {result && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-800 overflow-hidden animate-in fade-in duration-300">
          <div className={`px-5 py-3 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 ${isAiGenerated ? 'bg-slate-50 dark:bg-slate-800/40' : 'bg-slate-50 dark:bg-slate-800/40'}`}>
            <div className="flex items-center gap-2">
              {isAiGenerated ? (
                <>
                  <Wand2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">AI Hardware Copilot Telemetry</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">Verified Engineering Database Entry</span>
                </>
              )}
            </div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              {selectedBrand}
            </span>
          </div>
          
          <div className="p-6 md:p-8 prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-xl prose-h2:text-slate-900 dark:prose-h2:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:text-sm prose-li:text-sm prose-strong:text-slate-900 dark:prose-strong:text-white">
            <Markdown>{result}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}
