import { UserProfile } from '../types';

const Nt = {
  USER_PROFILE: "diyelectronics_user_profile",
  OFFLINE_GUIDES: "diyelectronics_offline_guides",
  SAVED_GUIDE_IDS: "diyelectronics_saved_guide_ids",
  THEME_MODE: "diyelectronics_dark_mode",
  VERIFICATION_REQUESTS: "diyelectronics_verification_requests",
  CACHED_FORUM_POSTS: "diyelectronics_forum_posts",
  REPAIR_HISTORY: "diyelectronics_repair_history",
  IS_AUTHENTICATED: "diyelectronics_is_authenticated"
};

const wl: UserProfile = {
  id: "tech_usr_102",
  name: "Alex Vance",
  email: "alex.vance@diyelectronics.org",
  phoneNumber: "+1 (555) 382-9012",
  authProvider: "google",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  role: "Technician",
  isVerifiedTrader: false,
  reputationPoints: 1420,
  experiencePoints: 3850,
  repairsCompleted: 27,
  eWasteDivertedKg: 64.8,
  co2SavedKg: 182.4,
  coursesEnrolled: ["course_1", "course_2"],
  completedCourseIds: ["course_1"],
  savedGuideIds: ["guide_1", "guide_3"],
  badges: [
    {
      id: "badge_1",
      name: "Soldering Novice",
      icon: "Flame",
      description: "Completed 5 successful board repairs",
      unlockedAt: "2026-08-10"
    },
    {
      id: "badge_2",
      name: "E-Waste Champion",
      icon: "Leaf",
      description: "Diverted over 50kg of electronics from landfills",
      unlockedAt: "2026-09-02"
    },
    {
      id: "badge_3",
      name: "Diagnostic Hawk",
      icon: "Search",
      description: "Used AI diagnostic tool to trace 10 component faults",
      unlockedAt: "2026-09-12"
    }
  ]
};

export const storage = {
  getUserProfile() {
    try {
      const u = localStorage.getItem(Nt.USER_PROFILE);
      return u ? JSON.parse(u) : wl;
    } catch {
      return wl;
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
      return u ? JSON.parse(u) : ["guide_1", "guide_3"];
    } catch {
      return ["guide_1", "guide_3"];
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
    } catch (u) {
      console.warn(u);
    }
  }
};

export const defaultUser = wl;
