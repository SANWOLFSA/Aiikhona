import { useState } from 'react';
import { Settings, Moon, Sun, Bell, User, CheckCircle2, Heart, Palette, Sparkles } from 'lucide-react';
import { APP_THEMES, DEFAULT_THEME_ID, THEME_ORDER } from '../lib/theme';

interface SettingsViewProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  currentUser: any;
  onUpdateUser?: (user: any) => void;
  themeId?: string;
  onSelectTheme?: (themeId: string) => void;
  onCycleTheme?: () => void;
}

const AVAILABLE_BRANDS = [
  "Apple", "Samsung", "Sony", "LG", "Dyson", "Philips", "Nintendo", "Microsoft", "Dell", "HP", "Lenovo", "Asus", "Panasonic"
];

export default function SettingsView({ 
  darkMode, 
  onToggleDarkMode, 
  currentUser, 
  onUpdateUser,
  themeId = DEFAULT_THEME_ID,
  onSelectTheme,
  onCycleTheme
}: SettingsViewProps) {
  const [savedMessage, setSavedMessage] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);
  const [favoriteBrands, setFavoriteBrands] = useState<string[]>(currentUser?.favoriteBrands || []);

  const handleSave = () => {
    if (onUpdateUser) {
      onUpdateUser({
        ...currentUser,
        favoriteBrands
      });
    }
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const toggleBrand = (brand: string) => {
    setFavoriteBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const activeThemeConfig = APP_THEMES[themeId] || APP_THEMES[DEFAULT_THEME_ID];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl ${activeThemeConfig.primaryBg} text-white flex items-center justify-center font-black shadow-sm`}>
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">App Settings</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Manage your workspace preferences, appearance, themes, and sync settings</p>
          </div>
        </div>
        {savedMessage && (
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Appearance & Themes */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Workspace Themes & Styling</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Choose your active engineering color profile or cycle to the next theme</p>
              </div>
            </div>

            {onCycleTheme && (
              <button
                onClick={onCycleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span>Next Theme</span>
              </button>
            )}
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {THEME_ORDER.map((tId) => {
              const cfg = APP_THEMES[tId];
              const isSelected = themeId === tId;
              return (
                <div
                  key={tId}
                  onClick={() => onSelectTheme && onSelectTheme(tId)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 ring-2 ring-blue-500/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/50 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{cfg.name}</span>
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${cfg.headerBadgeBg} ${cfg.headerBadgeText} border ${cfg.headerBadgeBorder}`}>
                      {cfg.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mb-3">
                    {cfg.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full ${cfg.primaryBg} border border-white/20 inline-block shadow-2xs`}></span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">
                      {isSelected ? 'Active Profile' : 'Select Theme'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Dark Mode Contrast</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">High-contrast laboratory dark mode for component soldering</p>
              </div>
            </div>
            <button
              onClick={onToggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {/* Notifications & Offline */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Notifications & Offline Bench</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Configure real-time alerts and offline cache settings</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Community Notifications</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Receive alerts when someone replies to your forum posts</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Auto Offline Sync</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Automatically download favorited repair manuals for offline use</p>
              </div>
              <button
                onClick={() => setOfflineSync(!offlineSync)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${offlineSync ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${offlineSync ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Favorite Brands */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Favorite Device Ecosystems</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Prioritize these brands in your parts and repair feeds</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_BRANDS.map(brand => {
                const isSelected = favoriteBrands.includes(brand);
                return (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Account Profile</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Your technician credentials and organization</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Name</span>
              <span className="font-semibold text-slate-900 dark:text-white">{currentUser?.name || 'Technician'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Email</span>
              <span className="font-semibold text-slate-900 dark:text-white">{currentUser?.email}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500 dark:text-slate-400">Role</span>
              <span className="font-semibold text-slate-900 dark:text-white">{currentUser?.role || 'Senior Repair Tech'}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
