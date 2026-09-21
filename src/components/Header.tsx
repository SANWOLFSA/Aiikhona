import { useState, useEffect, useCallback } from 'react';
import { 
  Wrench, Search, Leaf, WifiOff, Wifi, Sun, Moon, LogOut, Menu, Palette, Loader2
} from 'lucide-react';
import type { UserProfile } from '../types';
import type { ThemeConfig } from '../lib/theme';
import { initialGuides, initialParts } from '../data';

export default function Header({ 
  currentUser, 
  darkMode, 
  onToggleDarkMode, 
  isOfflineMode, 
  onToggleOfflineMode, 
  savedGuidesCount, 
  onOpenAuth, 
  onSignOut, 
  searchQuery, 
  onSearchChange, 
  onSelectTab, 
  onToggleSidebar,
  themeConfig,
  onCycleTheme
}: {
  currentUser: UserProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isOfflineMode: boolean;
  onToggleOfflineMode: () => void;
  savedGuidesCount: number;
  onOpenAuth: () => void;
  onSignOut: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectTab: (t: string) => void;
  activeTab?: string;
  onToggleSidebar?: () => void;
  themeConfig?: ThemeConfig;
  onCycleTheme?: () => void;
  logSearch: (query: string, resultsCount: number) => Promise<void>;
}) {
  const [suggestions, setSuggestions] = useState<{type: 'guide' | 'part', title: string}[]>([]);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  const filterData = useCallback((query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    const q = query.toLowerCase();
    
    const guideMatches = initialGuides
      .filter(g => g.title.toLowerCase().includes(q) || g.device.toLowerCase().includes(q))
      .slice(0, 3)
      .map(g => ({ type: 'guide' as const, title: g.title }));
      
    const partMatches = initialParts
      .filter(p => p.name.toLowerCase().includes(q) || p.partNumber.toLowerCase().includes(q))
      .slice(0, 3)
      .map(p => ({ type: 'part' as const, title: p.name }));
      
    setSuggestions([...guideMatches, ...partMatches]);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      filterData(searchQuery);
    }, 200); // Faster debounce for local search
    return () => clearTimeout(handler);
  }, [searchQuery, filterData]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button 
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div onClick={() => onSelectTab('guides')} className="flex items-center gap-3 cursor-pointer group shrink-0">
            <div className={`w-9 h-9 rounded-lg ${themeConfig?.primaryBg || 'bg-blue-600'} flex items-center justify-center shadow-xs transition-transform group-hover:scale-105`}>
              <Wrench className="w-4.5 h-4.5 text-white stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">DIYELECTRONICS</span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${themeConfig?.headerBadgeBg || 'bg-blue-50 dark:bg-blue-950/60'} ${themeConfig?.headerBadgeText || 'text-blue-700 dark:text-blue-300'} border ${themeConfig?.headerBadgeBorder || 'border-blue-200 dark:border-blue-800/80'} uppercase tracking-wider`}>
                  {themeConfig?.badge || 'AEROSPACE'}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">Hardware Telemetry & Professional Repair Systems</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 max-w-md hidden md:block relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery} 
              onChange={e => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  logSearch(searchQuery, suggestions.length);
                }
              }}
              placeholder="Search guides, IC chips (e.g. M92T36), or symptoms..."
              className="w-full pl-9 pr-4 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:bg-white dark:focus:bg-slate-950 transition-all font-medium"
            />
            {isFetchingSuggestions && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin" />
            )}
          </div>
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg z-50 p-2 space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">Search Results</div>
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => onSearchChange(s.title)}
                  className="w-full text-left px-2 py-1.5 rounded text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${s.type === 'guide' ? 'bg-blue-500' : 'bg-amber-500'}`} />
                  {s.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <div onClick={() => onSelectTab('progress')} className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{currentUser.eWasteDivertedKg.toFixed(1)} kg ESG Offset</span>
          </div>

          {/* Theme Quick Cycle Button */}
          {onCycleTheme && (
            <button 
              onClick={onCycleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              title={`Active Theme: ${themeConfig?.name}. Click for Next Theme.`}
            >
              <Palette className={`w-3.5 h-3.5 ${themeConfig?.accentText || 'text-blue-500'}`} />
              <span className="hidden sm:inline text-[11px] font-medium">{themeConfig?.shortLabel || 'Theme'}</span>
            </button>
          )}

          <button onClick={onToggleOfflineMode} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${isOfflineMode ? `${themeConfig?.primaryBg || 'bg-blue-600'} text-white shadow-xs` : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            {isOfflineMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5 text-slate-500" />}
            <span className="hidden sm:inline">{isOfflineMode ? 'Offline Vault' : 'Online'}</span>
            <span className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[10px] font-bold">{savedGuidesCount}</span>
          </button>

          <button onClick={onToggleDarkMode} className="p-2 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors" title="Toggle Light / Dark Mode">
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <button onClick={onOpenAuth} className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-all font-semibold text-xs shadow-xs">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-6 h-6 rounded-full object-cover border border-slate-400/40" />
            <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
          </button>

          {onSignOut && (
            <button onClick={onSignOut} className="p-2 rounded-lg text-slate-500 hover:text-red-500 bg-slate-50 dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-950/40 border border-slate-200 dark:border-slate-800 transition-colors" title="Sign Out">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
