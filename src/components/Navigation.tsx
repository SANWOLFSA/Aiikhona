import { BookOpen, Activity, Cpu, Layers, ShoppingBag, GraduationCap, MessageSquare, Award, ShieldCheck } from 'lucide-react';

export default function Navigation({ activeTab, onSelectTab, pendingVerificationsCount, currentUser }: any) {
  const tabs: any[] = [
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
      badge: pendingVerificationsCount > 0 ? pendingVerificationsCount : undefined
    });
  }

  return (
    <nav className="w-full bg-stone-100/80 dark:bg-stone-900/60 border-b border-stone-200 dark:border-stone-800/80 sticky top-16 z-30 overflow-x-auto no-scrollbar backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-2 py-2 min-w-max">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button 
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${isActive ? 'bg-amber-400 text-stone-950 shadow-md scale-[1.02]' : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'}`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${isActive ? 'bg-stone-950 text-amber-400' : 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 group-hover:bg-amber-400 group-hover:text-stone-950'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span>{tab.label}</span>
                {tab.badge && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black">{tab.badge}</span>}
                {tab.highlight && !isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
