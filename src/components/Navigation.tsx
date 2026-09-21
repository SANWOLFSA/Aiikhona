import { Home, Smartphone, BookOpen, Activity, Cpu, Layers, ShoppingBag, GraduationCap, MessageSquare, Award, ShieldCheck, FileText } from 'lucide-react';
import type { ThemeConfig } from '../lib/theme';

export default function Navigation({ activeTab, onSelectTab, pendingVerificationsCount, currentUser, themeConfig }: {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  pendingVerificationsCount?: number;
  currentUser?: any;
  themeConfig?: ThemeConfig;
}) {
  const tabs: any[] = [
    { id: 'home', label: '', icon: Home },
    { id: 'devices', label: 'Devices', icon: Smartphone, highlight: true },
    { id: 'phones', label: 'Phones Page', icon: Smartphone, highlight: true },
    { id: 'blueprint_viewer', label: 'Boardview & Blueprints', icon: FileText, highlight: true },
    { id: 'guides', label: 'Repair Guides', icon: BookOpen },
    { id: 'diagnostic', label: 'AI Diagnostic', icon: Activity, highlight: true },
    { id: 'circuit', label: 'Circuit Lab', icon: Cpu },
    { id: 'parts', label: 'Spare Parts', icon: Layers },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'studies', label: 'Studies & Theory', icon: GraduationCap },
    { id: 'forum', label: 'Community Forum', icon: MessageSquare },
    { id: 'progress', label: 'My Progress', icon: Award },
  ];

  if (currentUser?.email === 'sbheko1@gmail.com' || currentUser?.email === 'diy.electronicsa@gmail.com') {
    tabs.push({
      id: 'admin',
      label: 'Admin Desk',
      icon: ShieldCheck,
      badge: (pendingVerificationsCount && pendingVerificationsCount > 0) ? pendingVerificationsCount : undefined
    });
  }

  return (
    <nav className="w-full bg-slate-50/95 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80 sticky top-16 z-30 overflow-x-auto no-scrollbar backdrop-blur-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-1.5 py-2 min-w-max">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button 
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive 
                    ? (themeConfig?.activeNavBg || 'bg-blue-600 text-white shadow-sm') 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-800/70'
                }`}
              >
                <div className={`w-5.5 h-5.5 rounded-md flex items-center justify-center transition-colors ${
                  isActive 
                    ? (themeConfig?.activeNavIconBg || 'bg-blue-800 text-white') 
                    : 'bg-slate-200/60 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 group-hover:bg-slate-300/80 dark:group-hover:bg-slate-700'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                {tab.label && <span>{tab.label}</span>}
                {tab.badge && <span className="ml-1 px-1.5 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold">{tab.badge}</span>}
                {tab.highlight && !isActive && <span className={`w-1.5 h-1.5 rounded-full ${themeConfig?.indicatorBg || 'bg-blue-500'}`}></span>}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
