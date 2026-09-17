import { 
  Wrench, Search, Leaf, WifiOff, Wifi, Sun, Moon, LogOut, Menu
} from 'lucide-react';
import type { UserProfile } from '../types';

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
  activeTab,
  onToggleSidebar
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
  activeTab: string;
  onToggleSidebar?: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button 
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div onClick={() => onSelectTab('guides')} className="flex items-center gap-2.5 cursor-pointer group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5 text-stone-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-stone-950 dark:text-amber-400">DIYELECTRONICS</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 uppercase tracking-wider">PRO</span>
              </div>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 font-medium hidden sm:block">Open Hardware & Sustainable Self-Repair</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              value={searchQuery} 
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search guides, IC chips (e.g. M92T36), or symptoms..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white dark:focus:bg-stone-950 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div onClick={() => onSelectTab('progress')} className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors shadow-xs">
            <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{currentUser.eWasteDivertedKg.toFixed(1)} kg E-Waste Prevented</span>
          </div>

          <button onClick={onToggleOfflineMode} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${isOfflineMode ? 'bg-amber-400 text-stone-950 border-amber-500 shadow-sm' : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-200 dark:hover:bg-stone-800'}`}>
            {isOfflineMode ? <WifiOff className="w-3.5 h-3.5 text-stone-950" /> : <Wifi className="w-3.5 h-3.5 text-stone-500" />}
            <span className="hidden sm:inline">{isOfflineMode ? 'Offline Mode' : 'Online'}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-[10px]">{savedGuidesCount}</span>
          </button>

          <button onClick={onToggleDarkMode} className="p-2 rounded-xl text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 transition-colors">
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>

          <button onClick={onOpenAuth} className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-stone-950 text-white dark:bg-amber-400 dark:text-stone-950 hover:opacity-90 transition-all font-bold text-xs shadow-xs">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-6 h-6 rounded-full object-cover border border-amber-400/50" />
            <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
          </button>

          {onSignOut && (
            <button onClick={onSignOut} className="p-2 rounded-xl text-stone-500 hover:text-red-500 bg-stone-100 dark:bg-stone-900 hover:bg-red-50 dark:hover:bg-red-950/40 border border-stone-200 dark:border-stone-800 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
