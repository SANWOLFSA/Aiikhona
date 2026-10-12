/**
 * App theme. There is one design system now ("Graphite & Cobalt", see src/index.css):
 * graphite neutrals with a single cobalt accent, in light and dark mode.
 * ThemeConfig is kept so components can keep reading semantic class names from it.
 */
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

export const DEFAULT_THEME_ID = 'graphite';

export const APP_THEMES: Record<string, ThemeConfig> = {
  graphite: {
    id: 'graphite',
    name: 'Graphite & Cobalt',
    shortLabel: 'Graphite',
    badge: 'BENCH',
    description: 'Clean graphite neutrals with a single cobalt accent',
    primaryBg: 'bg-cobalt-600 dark:bg-cobalt-500',
    primaryHover: 'hover:bg-cobalt-500 dark:hover:bg-cobalt-400',
    primaryText: 'text-white',
    activeNavBg: 'bg-cobalt-50 text-cobalt-700 dark:bg-cobalt-500/15 dark:text-cobalt-200',
    activeNavText: 'text-cobalt-700 dark:text-cobalt-200',
    activeNavIconBg: 'text-cobalt-600 dark:text-cobalt-300',
    activeNavIconText: 'text-cobalt-600 dark:text-cobalt-300',
    accentText: 'text-cobalt-600 dark:text-cobalt-400',
    accentBorder: 'border-cobalt-500/30 dark:border-cobalt-400/30',
    indicatorBg: 'bg-cobalt-500',
    headerBadgeBg: 'bg-cobalt-50 dark:bg-cobalt-500/10',
    headerBadgeText: 'text-cobalt-700 dark:text-cobalt-300',
    headerBadgeBorder: 'border-cobalt-200 dark:border-cobalt-500/25',
    glowShadow: 'shadow-cobalt-500/10',
    cardBannerBg: 'bg-graphite-950 border-graphite-800',
    bannerTag: 'Repair guides, diagnosis & parts',
  },
};

export const THEME_ORDER = ['graphite'];

export function getNextThemeId(_currentId?: string): string {
  return DEFAULT_THEME_ID;
}
