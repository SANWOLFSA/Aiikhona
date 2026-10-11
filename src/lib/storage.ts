import { UserProfile } from '../types';
import { APP_THEMES, DEFAULT_THEME_ID } from './theme';
import { NEUTRAL_AVATAR as DEFAULT_AVATAR } from './avatar';

const Nt = {
  USER_PROFILE: "diyelectronics_user_profile",
  OFFLINE_GUIDES: "diyelectronics_offline_guides",
  SAVED_GUIDE_IDS: "diyelectronics_saved_guide_ids",
  THEME_MODE: "diyelectronics_dark_mode",
  APP_THEME: "diyelectronics_app_theme",
  APP_THEME_DEFAULT_V: "diyelectronics_app_theme_default_v",
  VERIFICATION_REQUESTS: "diyelectronics_verification_requests",
  CACHED_FORUM_POSTS: "diyelectronics_forum_posts",
  REPAIR_HISTORY: "diyelectronics_repair_history",
  IS_AUTHENTICATED: "diyelectronics_is_authenticated",
  SOCIAL_ANNOTATIONS: "diyelectronics_social_annotations"
};

// Used only until a real profile is loaded (the app shows the landing page while signed out).
// No invented person or stats: every counter starts at zero.
const wl: UserProfile = {
  id: "signed_out",
  name: "Guest",
  email: "",
  authProvider: "none",
  avatar: DEFAULT_AVATAR,
  role: "Guest",
  isVerifiedTrader: false,
  reputationPoints: 0,
  experiencePoints: 0,
  repairsCompleted: 0,
  eWasteDivertedKg: 0,
  co2SavedKg: 0,
  coursesEnrolled: [],
  completedCourseIds: [],
  savedGuideIds: [],
  badges: []
};

export const storage = {
  getUserProfile() {
    try {
      const u = localStorage.getItem(Nt.USER_PROFILE);
      return u ? { ...wl, ...JSON.parse(u) } : { ...wl };
    } catch {
      return { ...wl };
    }
  },
  saveUserProfile(u: any) {
    try {
      localStorage.setItem(Nt.USER_PROFILE, JSON.stringify(u));
    } catch (y) {
      console.warn("LocalStorage save failed", y);
    }
  },
  getSavedGuideIds() {
    try {
      const u = localStorage.getItem(Nt.SAVED_GUIDE_IDS);
      return u ? JSON.parse(u) : [];
    } catch {
      return [];
    }
  },
  toggleSaveGuide(u: string) {
    const y = this.getSavedGuideIds();
    let O;
    if (y.includes(u)) {
      O = y.filter((d: string) => d !== u);
    } else {
      O = [...y, u];
    }
    try {
      localStorage.setItem(Nt.SAVED_GUIDE_IDS, JSON.stringify(O));
    } catch (d) {
      console.warn("LocalStorage save failed", d);
    }
    return O;
  },
  saveGuideOffline(u: any) {
    try {
      const y = this.getOfflineGuides();
      y[u.id] = { ...u, isSavedOffline: true, cachedAt: new Date().toISOString() };
      localStorage.setItem(Nt.OFFLINE_GUIDES, JSON.stringify(y));
    } catch (y) {
      console.warn("LocalStorage offline guide save failed", y);
    }
  },
  removeGuideOffline(u: string) {
    try {
      const y = this.getOfflineGuides();
      delete y[u];
      localStorage.setItem(Nt.OFFLINE_GUIDES, JSON.stringify(y));
    } catch (y) {
      console.warn("LocalStorage offline guide delete failed", y);
    }
  },
  getOfflineGuides() {
    try {
      const u = localStorage.getItem(Nt.OFFLINE_GUIDES);
      return u ? JSON.parse(u) : {};
    } catch {
      return {};
    }
  },
  getVerificationRequests() {
    try {
      const u = localStorage.getItem(Nt.VERIFICATION_REQUESTS);
      if (u) return JSON.parse(u);
    } catch (u) {
      console.warn(u);
    }
    return [];
  },
  saveVerificationRequests(u: any) {
    try {
      localStorage.setItem(Nt.VERIFICATION_REQUESTS, JSON.stringify(u));
    } catch (y) {
      console.warn(y);
    }
  },
  getDarkMode() {
    try {
      const u = localStorage.getItem(Nt.THEME_MODE);
      return u ? JSON.parse(u) : false;
    } catch {
      return false;
    }
  },
  setDarkMode(u: boolean) {
    try {
      localStorage.setItem(Nt.THEME_MODE, JSON.stringify(u));
    } catch (y) {
      console.warn(y);
    }
  },
  getAppTheme(): string {
    try {
      // One-time migration: when "Circuit Mint" became the default, move everyone
      // onto it once. Any theme picked after that is kept as normal.
      if (!localStorage.getItem(Nt.APP_THEME_DEFAULT_V)) {
        localStorage.setItem(Nt.APP_THEME_DEFAULT_V, DEFAULT_THEME_ID);
        localStorage.setItem(Nt.APP_THEME, JSON.stringify(DEFAULT_THEME_ID));
        return DEFAULT_THEME_ID;
      }
      const u = localStorage.getItem(Nt.APP_THEME);
      if (u) {
        const parsed = JSON.parse(u);
        return APP_THEMES[parsed] ? parsed : DEFAULT_THEME_ID;
      }
      return DEFAULT_THEME_ID;
    } catch {
      return DEFAULT_THEME_ID;
    }
  },
  setAppTheme(theme: string) {
    try {
      localStorage.setItem(Nt.APP_THEME, JSON.stringify(theme));
    } catch (y) {
      console.warn(y);
    }
  },
  getIsAuthenticated() {
    try {
      const u = localStorage.getItem(Nt.IS_AUTHENTICATED);
      return u ? JSON.parse(u) : false;
    } catch {
      return false;
    }
  },
  setIsAuthenticated(u: boolean) {
    try {
      localStorage.setItem(Nt.IS_AUTHENTICATED, JSON.stringify(u));
    } catch (y) {
      console.warn(y);
    }
  },
  clearSession() {
    try {
      localStorage.setItem(Nt.IS_AUTHENTICATED, JSON.stringify(false));
      // Don't leave the signed-out (or guest) user's profile or session clock behind.
      localStorage.removeItem(Nt.USER_PROFILE);
      localStorage.removeItem("diyelectronics_session_started_at");
    } catch (u) {
      console.warn(u);
    }
  },
  getSocialAnnotations() {
    try {
      const u = localStorage.getItem(Nt.SOCIAL_ANNOTATIONS);
      return u ? JSON.parse(u) : [];
    } catch {
      return [];
    }
  },
  saveSocialAnnotations(annotations: any[]) {
    try {
      localStorage.setItem(Nt.SOCIAL_ANNOTATIONS, JSON.stringify(annotations));
    } catch (u) {
      console.warn("LocalStorage annotations save failed", u);
    }
  }
};

export const defaultUser = wl;
