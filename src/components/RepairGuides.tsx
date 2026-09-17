import { useState } from 'react';
import { Leaf, Search, BookmarkCheck, Bookmark, Clock, Eye, ThumbsUp, Wrench, BookOpen } from 'lucide-react';
import ProTipsSidebar from './ProTipsSidebar';
import DeviceDirectoryView from './DeviceDirectoryView';
import type { Guide } from '../types';

export default function RepairGuides({ 
  guides, 
  savedGuideIds, 
  onToggleSaveGuide, 
  onSelectGuide, 
  isOfflineOnly, 
  onToggleOfflineOnly, 
  initialSearchQuery, 
  onNavigateToDiagnostic,
  onSourcePart
}: { 
  guides: Guide[]; 
  savedGuideIds: string[]; 
  onToggleSaveGuide: (g: Guide) => void; 
  onSelectGuide: (g: Guide) => void; 
  isOfflineOnly: boolean; 
  onToggleOfflineOnly: () => void; 
  initialSearchQuery?: string; 
  onNavigateToDiagnostic: () => void;
  onSourcePart: (partNumber: string) => void;
}) {
  const [viewMode, setViewMode] = useState<'directory' | 'library'>('directory');
  const [search, setSearch] = useState(initialSearchQuery || '');
  const [category, setCategory] = useState("All");

  const categories = ["All", "Gaming Consoles", "Laptops & PCs", "Smartphones", "TVs & Monitors", "Audio & Headphones"];

  const filteredGuides = guides.filter(g => {
    if (isOfflineOnly && !savedGuideIds.includes(g.id)) return false;
    if (category !== "All" && g.deviceCategory !== category) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = g.title.toLowerCase().includes(q);
      const matchModel = g.deviceModel.toLowerCase().includes(q);
      const matchIssue = g.issueType.toLowerCase().includes(q);
      if (!matchTitle && !matchModel && !matchIssue) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* View Mode Toggle Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-stone-900 text-white rounded-2xl p-2 flex items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-2 pl-2">
            <Wrench className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-black uppercase tracking-wider">Device Navigation System</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setViewMode('directory')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'directory' ? 'bg-amber-400 text-stone-950 shadow-md font-black' : 'text-stone-300 hover:text-white hover:bg-stone-800'}`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>A-Z Device Directory</span>
            </button>
            <button
              onClick={() => setViewMode('library')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'library' ? 'bg-amber-400 text-stone-950 shadow-md font-black' : 'text-stone-300 hover:text-white hover:bg-stone-800'}`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Curated Guides Library</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'directory' ? (
        <DeviceDirectoryView 
          savedGuideIds={savedGuideIds}
          onToggleSaveGuide={onToggleSaveGuide}
          onSourcePart={onSourcePart}
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold">
                <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Sustainable Right-to-Repair Movement</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">Categorized Electronics Repair Guides</h1>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Step-by-step interactive teardowns, high-resolution oscilloscope/multimeter probe guides, and video walkthroughs to restore devices and slash electronic waste.
              </p>
            </div>
            <button 
              onClick={onNavigateToDiagnostic}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black transition-all shadow-sm shrink-0 active:scale-98"
            >
              Diagnose Custom Symptom
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-stone-900 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input 
                type="text" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Filter by device model, chip (e.g. M92T36) or symptom..." 
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400" 
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setCategory(cat)} 
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${category === cat ? "bg-amber-400 text-stone-950 shadow-xs" : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"}`}
                >
                  {cat === "All" ? "All Categories" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredGuides.map(g => {
                  const isSaved = savedGuideIds.includes(g.id);
                  return (
                    <div key={g.id} className="group bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
                      <div>
                        <div className="relative aspect-video w-full overflow-hidden bg-stone-100 dark:bg-stone-800 cursor-pointer" onClick={() => onSelectGuide(g)}>
                          <img src={g.thumbnailUrl} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
                          <button 
                            onClick={e => { e.stopPropagation(); onToggleSaveGuide(g); }} 
                            className={`absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isSaved ? 'bg-amber-400 text-stone-950 shadow-md' : 'bg-stone-950/75 text-white hover:bg-stone-950'}`}
                          >
                            {isSaved ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                          </button>
                          
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> {g.estimatedTimeMinutes} Min</span>
                            <span className="flex items-center gap-1 text-emerald-400"><Leaf className="w-3.5 h-3.5 text-emerald-400" /> {g.eWasteSavedKg} Kg</span>
                          </div>
                        </div>

                        <div className="p-5 space-y-2.5 cursor-pointer" onClick={() => onSelectGuide(g)}>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{g.deviceCategory}</span>
                            <span className="text-[10px] text-stone-400 font-semibold">{g.difficulty}</span>
                          </div>
                          
                          <h3 className="text-sm sm:text-base font-black text-stone-900 dark:text-stone-100 leading-snug group-hover:text-amber-500 transition-colors line-clamp-2">{g.title}</h3>
                          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">Symptom: {g.issueType}</p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                        <span>By: {g.author.name.split(' ')[0]}</span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {g.views.toLocaleString()}</span>
                          <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> {g.likes.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-4">
              <ProTipsSidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
