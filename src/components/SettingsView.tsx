import { useState } from 'react';
import { Settings, Moon, Sun, Wifi, Shield, Bell, User, CheckCircle2, Heart } from 'lucide-react';
import { storage } from '../lib/storage';

interface SettingsViewProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  currentUser: any;
  onUpdateUser?: (user: any) => void;
}

const AVAILABLE_BRANDS = [
  "Apple", "Samsung", "Sony", "LG", "Dyson", "Philips", "Nintendo", "Microsoft", "Dell", "HP", "Lenovo", "Asus", "Panasonic"
];

export default function SettingsView({ darkMode, onToggleDarkMode, currentUser, onUpdateUser }: SettingsViewProps) {
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black shadow-lg">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-stone-900 dark:text-stone-100">App Settings</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">Manage your workspace preferences, appearance, and sync settings</p>
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
        {/* Appearance */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-500 flex items-center justify-center">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Appearance & Theme</h3>
              <p className="text-xs text-stone-500">Choose between light mode and high-contrast twilight dark mode</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
            <div>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100">Dark Mode</p>
              <p className="text-[11px] text-stone-500">Easier on the eyes during late-night workbench soldering</p>
            </div>
            <button
              onClick={onToggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-amber-400' : 'bg-stone-300 dark:bg-stone-700'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-stone-950 transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {/* Notifications & Offline */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Notifications & Offline Bench</h3>
              <p className="text-xs text-stone-500">Configure real-time alerts and offline cache settings</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900 dark:text-stone-100">Community Notifications</p>
                <p className="text-[11px] text-stone-500">Receive alerts when someone replies to your forum posts</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications ? 'bg-amber-400' : 'bg-stone-300 dark:bg-stone-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-stone-950 transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
              <div>
                <p className="text-xs font-bold text-stone-900 dark:text-stone-100">Auto-Cache Guides Offline</p>
                <p className="text-[11px] text-stone-500">Keep bookmarked guides available without an internet connection</p>
              </div>
              <button
                onClick={() => setOfflineSync(!offlineSync)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${offlineSync ? 'bg-amber-400' : 'bg-stone-300 dark:bg-stone-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-stone-950 transition-transform ${offlineSync ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* User Account Info */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Account Credentials</h3>
              <p className="text-xs text-stone-500">Currently signed in as {currentUser?.email || 'Repair Technician'}</p>
            </div>
          </div>
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100">{currentUser?.name}</p>
              <p className="text-[11px] text-stone-500">{currentUser?.role || 'Master Technician'} • {currentUser?.reputationPoints || 0} Rep Points</p>
            </div>
          </div>
        </div>

        {/* Favorite Brands */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Preferred Brands</h3>
                <p className="text-xs text-stone-500">Select the brands you frequently repair to customize your experience</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-opacity"
            >
              Save Preferences
            </button>
          </div>
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_BRANDS.map(brand => {
                const isSelected = favoriteBrands.includes(brand);
                return (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`px-4 py-2 rounded-xl text-[11px] font-bold border transition-all ${isSelected ? 'bg-amber-400 border-amber-400 text-stone-950 shadow-sm' : 'bg-transparent border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400 hover:text-stone-900 dark:hover:text-stone-100'}`}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
