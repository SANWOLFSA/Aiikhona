import { Smartphone, BookOpen, ShoppingBag, MessageSquare, Bot, Settings, Info, HelpCircle, Wrench, ShieldCheck } from 'lucide-react';
import type { UserProfile } from '../types';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  currentUser: UserProfile;
  pendingVerificationsCount?: number;
}

export default function Sidebar({ activeTab, onSelectTab, isOpen, onCloseMobile, currentUser, pendingVerificationsCount }: SidebarProps) {
  const menuItems: any[] = [
    { id: 'devices', label: 'Devices', icon: Smartphone, description: 'Repair guides & diagnostics' },
    { id: 'learning', label: 'Learning', icon: BookOpen, description: 'Electrical courses & exams' },
    { id: 'marketplace', label: 'Market place', icon: ShoppingBag, description: 'Verified parts & tools' },
    { id: 'forum', label: 'Community forum', icon: MessageSquare, description: 'Tech discussions & help' },
    { id: 'ai_assistant', label: 'SANWOLF AI', icon: Bot, description: 'Smart repair copilot', highlight: true },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'Preferences & account' },
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

      <aside className={`fixed lg:sticky top-0 lg:top-16 left-0 h-screen lg:h-[calc(100vh-4rem)] w-72 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 z-50 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Sidebar Header / Logo area */}
        <div className="p-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black shadow-md">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-stone-900 dark:text-stone-100 tracking-tight text-sm">DIY ELECTRONICS</h2>
              <p className="text-[11px] text-stone-500 font-medium">Repair Hub & AI Studio</p>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 no-scrollbar">
          <div className="px-3 pb-2 text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
            Main Menu
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
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-bold transition-all group relative text-left ${
                  isActive 
                    ? 'bg-amber-400 text-stone-950 shadow-md scale-[1.01]' 
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/80 hover:text-stone-950 dark:hover:text-stone-100'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                  isActive 
                    ? 'bg-stone-950 text-amber-400' 
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 group-hover:bg-amber-400 group-hover:text-stone-950'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="truncate">{item.label}</span>
                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black">{item.badge}</span>
                      )}
                      {item.highlight && !isActive && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                      )}
                    </div>
                  </div>
                  <p className={`text-[10px] font-normal truncate mt-0.5 ${isActive ? 'text-stone-800 opacity-90' : 'text-stone-400 dark:text-stone-500'}`}>
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer / Eco Impact Widget */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50 m-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              🌿
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-stone-900 dark:text-stone-100 truncate">Right to Repair</p>
              <p className="text-[10px] text-stone-500 dark:text-stone-400">Save E-Waste & Carbon</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
