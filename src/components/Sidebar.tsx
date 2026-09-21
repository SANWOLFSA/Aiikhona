import { Home, Smartphone, BookOpen, ShoppingBag, MessageSquare, Bot, Settings, Info, HelpCircle, Wrench, ShieldCheck, FileText } from 'lucide-react';
import type { UserProfile } from '../types';
import type { ThemeConfig } from '../lib/theme';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  currentUser: UserProfile;
  pendingVerificationsCount?: number;
  themeConfig?: ThemeConfig;
}

export default function Sidebar({ activeTab, onSelectTab, isOpen, onCloseMobile, currentUser, pendingVerificationsCount, themeConfig }: SidebarProps) {
  const menuItems: any[] = [
    { id: 'home', label: 'Home Feed', icon: Home, description: 'Community forum posts & updates', highlight: true },
    { id: 'phones', label: 'Phones Page', icon: Smartphone, description: 'AI troubleshooting & tricks', highlight: true },
    { id: 'blueprint_viewer', label: 'Boardview & Blueprints', icon: FileText, description: 'Realistic boardviews, OEM schematics & blueprints', highlight: true },
    { id: 'devices', label: 'Devices', icon: Smartphone, description: 'Repair guides & diagnostics' },
    { id: 'learning', label: 'Learning', icon: BookOpen, description: 'Electrical courses & exams' },
    { id: 'marketplace', label: 'Market place', icon: ShoppingBag, description: 'Verified parts & tools' },
    { id: 'forum', label: 'Community forum', icon: MessageSquare, description: 'Tech discussions & help' },
    { id: 'ai_assistant', label: 'SANWOLF AI', icon: Bot, description: 'Smart repair copilot', highlight: true },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'Preferences & theme selection' },
    { id: 'about', label: 'About', icon: Info, description: 'Mission & e-waste impact' },
    { id: 'help', label: 'Help', icon: HelpCircle, description: 'FAQ & support docs' },
  ];

  // Admin Desk is restricted exclusively to admins
  if (currentUser?.email === 'sbheko1@gmail.com' || currentUser?.email === 'diy.electronicsa@gmail.com') {
    menuItems.push({
      id: 'admin',
      label: 'Admin Desk',
      icon: ShieldCheck,
      description: 'Review merchant verifications',
      badge: pendingVerificationsCount && pendingVerificationsCount > 0 ? pendingVerificationsCount : undefined
    });
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs z-45 lg:hidden"
        />
      )}

      <aside className={`fixed lg:sticky top-0 lg:top-16 left-0 h-screen lg:h-[calc(100vh-4rem)] w-72 bg-white dark:bg-slate-950 border-r border-slate-200/80 dark:border-slate-800/80 z-50 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Sidebar Header / Logo area */}
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg ${themeConfig?.primaryBg || 'bg-blue-600'} text-white flex items-center justify-center font-bold shadow-xs`}>
              <Wrench className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white tracking-tight text-sm">DIYELECTRONICS</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{themeConfig?.bannerTag || 'Hardware & Telemetry Systems'}</p>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-1 no-scrollbar">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Operations & Lab
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || 
              (item.id === 'devices' && (activeTab === 'guides' || activeTab === 'diagnostic' || activeTab === 'circuit' || activeTab === 'progress')) ||
              (item.id === 'learning' && activeTab === 'studies') ||
              (item.id === 'marketplace' && (activeTab === 'marketplace' || activeTab === 'parts'));

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all group relative text-left ${
                  isActive 
                    ? (themeConfig?.activeNavBg || 'bg-blue-600 text-white shadow-sm') 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                  isActive 
                    ? (themeConfig?.activeNavIconBg || 'bg-blue-800 text-white') 
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="truncate">{item.label}</span>
                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold">{item.badge}</span>
                      )}
                      {item.highlight && !isActive && (
                        <span className={`w-1.5 h-1.5 rounded-full ${themeConfig?.indicatorBg || 'bg-blue-500'}`}></span>
                      )}
                    </div>
                  </div>
                  <p className={`text-[10px] font-normal truncate mt-0.5 ${isActive ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'}`}>
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer / Eco Impact Widget */}
        <div className="p-3.5 border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 m-3.5 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              🌿
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-slate-900 dark:text-slate-100 truncate">ESG Compliance</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Right to Repair Standards</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
