export interface ThemeConfig {
  id: string;
  name: string;
  shortLabel: string;
  badge: string;
  description: string;
  primaryBg: string;
  primaryHover: string;
  primaryText: string;
  activeNavBg: string;
  activeNavText: string;
  activeNavIconBg: string;
  activeNavIconText: string;
  accentText: string;
  accentBorder: string;
  indicatorBg: string;
  headerBadgeBg: string;
  headerBadgeText: string;
  headerBadgeBorder: string;
  glowShadow: string;
  cardBannerBg: string;
  bannerTag: string;
}

export const APP_THEMES: Record<string, ThemeConfig> = {
  'obsidian-sapphire': {
    id: 'obsidian-sapphire',
    name: 'Obsidian Sapphire',
    shortLabel: 'Sapphire',
    badge: 'AEROSPACE COBALT',
    description: 'Deep aerospace obsidian with electric cobalt accents & telemetry',
    primaryBg: 'bg-blue-600 dark:bg-blue-600',
    primaryHover: 'hover:bg-blue-500 dark:hover:bg-blue-500',
    primaryText: 'text-white',
    activeNavBg: 'bg-blue-600 text-white shadow-sm shadow-blue-500/25',
    activeNavText: 'text-white',
    activeNavIconBg: 'bg-blue-800 text-blue-100',
    activeNavIconText: 'text-blue-100',
    accentText: 'text-blue-600 dark:text-blue-400',
    accentBorder: 'border-blue-500/30 dark:border-blue-500/40',
    indicatorBg: 'bg-blue-500',
    headerBadgeBg: 'bg-blue-50 dark:bg-blue-950/60',
    headerBadgeText: 'text-blue-700 dark:text-blue-300',
    headerBadgeBorder: 'border-blue-200 dark:border-blue-800/80',
    glowShadow: 'shadow-blue-500/20',
    cardBannerBg: 'bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-blue-900/50',
    bannerTag: 'Telemetry & Aerospace Precision'
  },
  'emerald-circuit': {
    id: 'emerald-circuit',
    name: 'Circuit Emerald',
    shortLabel: 'Emerald',
    badge: 'LAB OSCILLOSCOPE',
    description: 'Component-level lab green with deep matte carbon background',
    primaryBg: 'bg-emerald-600 dark:bg-emerald-600',
    primaryHover: 'hover:bg-emerald-500 dark:hover:bg-emerald-500',
    primaryText: 'text-white',
    activeNavBg: 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/25',
    activeNavText: 'text-white',
    activeNavIconBg: 'bg-emerald-800 text-emerald-100',
    activeNavIconText: 'text-emerald-100',
    accentText: 'text-emerald-600 dark:text-emerald-400',
    accentBorder: 'border-emerald-500/30 dark:border-emerald-500/40',
    indicatorBg: 'bg-emerald-500',
    headerBadgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    headerBadgeText: 'text-emerald-700 dark:text-emerald-300',
    headerBadgeBorder: 'border-emerald-200 dark:border-emerald-800/80',
    glowShadow: 'shadow-emerald-500/20',
    cardBannerBg: 'bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-emerald-900/50',
    bannerTag: 'Circuit Engineering Lab'
  },
  'cyber-neon': {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    shortLabel: 'Neon',
    badge: 'CYBERPUNK MATRIX',
    description: 'High-contrast violet & cyan terminal aesthetic',
    primaryBg: 'bg-indigo-600 dark:bg-indigo-600',
    primaryHover: 'hover:bg-indigo-500 dark:hover:bg-indigo-500',
    primaryText: 'text-white',
    activeNavBg: 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25',
    activeNavText: 'text-white',
    activeNavIconBg: 'bg-indigo-800 text-indigo-100',
    activeNavIconText: 'text-indigo-100',
    accentText: 'text-indigo-600 dark:text-indigo-400',
    accentBorder: 'border-indigo-500/30 dark:border-indigo-500/40',
    indicatorBg: 'bg-indigo-500',
    headerBadgeBg: 'bg-indigo-50 dark:bg-indigo-950/60',
    headerBadgeText: 'text-indigo-700 dark:text-indigo-300',
    headerBadgeBorder: 'border-indigo-200 dark:border-indigo-800/80',
    glowShadow: 'shadow-indigo-500/20',
    cardBannerBg: 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-indigo-900/50',
    bannerTag: 'Cybernetic Firmware Matrix'
  },
  'smart-formal': {
    id: 'smart-formal',
    name: 'Smart Formal',
    shortLabel: 'Slate',
    badge: 'EXECUTIVE SLATE',
    description: 'Clean corporate executive slate & tailored monochrome hierarchy',
    primaryBg: 'bg-slate-900 dark:bg-slate-100',
    primaryHover: 'hover:bg-slate-800 dark:hover:bg-slate-200',
    primaryText: 'text-white dark:text-slate-950',
    activeNavBg: 'bg-slate-900 text-white shadow-xs dark:bg-slate-100 dark:text-slate-950',
    activeNavText: 'text-white dark:text-slate-950',
    activeNavIconBg: 'bg-slate-800 text-slate-100 dark:bg-slate-200 dark:text-slate-900',
    activeNavIconText: 'text-slate-100 dark:text-slate-900',
    accentText: 'text-slate-900 dark:text-white',
    accentBorder: 'border-slate-300 dark:border-slate-700',
    indicatorBg: 'bg-slate-700 dark:bg-slate-300',
    headerBadgeBg: 'bg-slate-100 dark:bg-slate-800/90',
    headerBadgeText: 'text-slate-700 dark:text-slate-300',
    headerBadgeBorder: 'border-slate-200 dark:border-slate-700/80',
    glowShadow: 'shadow-slate-500/10',
    cardBannerBg: 'bg-slate-900 dark:bg-slate-900/95 border-slate-800',
    bannerTag: 'Enterprise Telemetry & Hardware Systems'
  },
  'amber-workshop': {
    id: 'amber-workshop',
    name: 'Amber Workshop',
    shortLabel: 'Amber',
    badge: 'MAKER BENCH',
    description: 'Industrial maker bench with soldering amber accents',
    primaryBg: 'bg-amber-400 hover:bg-amber-300',
    primaryHover: 'hover:bg-amber-300',
    primaryText: 'text-stone-950',
    activeNavBg: 'bg-amber-400 text-stone-950 shadow-xs font-bold',
    activeNavText: 'text-stone-950',
    activeNavIconBg: 'bg-stone-950 text-amber-400',
    activeNavIconText: 'text-amber-400',
    accentText: 'text-amber-500 dark:text-amber-400',
    accentBorder: 'border-amber-400/40',
    indicatorBg: 'bg-amber-400',
    headerBadgeBg: 'bg-amber-100/70 dark:bg-amber-950/50',
    headerBadgeText: 'text-amber-900 dark:text-amber-300',
    headerBadgeBorder: 'border-amber-300/80 dark:border-amber-800/60',
    glowShadow: 'shadow-amber-500/20',
    cardBannerBg: 'bg-gradient-to-r from-stone-900 via-amber-950/60 to-stone-900 border-amber-900/50',
    bannerTag: 'Maker Bench & Open Hardware'
  }
};

export const THEME_ORDER = [
  'obsidian-sapphire',
  'emerald-circuit',
  'cyber-neon',
  'smart-formal',
  'amber-workshop'
];

export function getNextThemeId(currentId: string): string {
  const index = THEME_ORDER.indexOf(currentId);
  if (index === -1 || index === THEME_ORDER.length - 1) {
    return THEME_ORDER[0];
  }
  return THEME_ORDER[index + 1];
}
