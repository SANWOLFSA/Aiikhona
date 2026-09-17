export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  authProvider: string;
  avatar: string;
  role: string;
  isVerifiedTrader?: boolean;
  reputationPoints: number;
  experiencePoints?: number;
  repairsCompleted: number;
  eWasteDivertedKg: number;
  co2SavedKg: number;
  coursesEnrolled?: string[];
  completedCourseIds: string[];
  savedGuideIds: string[];
  badges: any[];
  companyName?: string;
  customBackground?: string;
  favoriteBrands?: string[];
}

export interface Guide {
  id: string;
  title: string;
  deviceCategory: string;
  deviceModel: string;
  issueType: string;
  difficulty: string;
  estimatedTimeMinutes: number;
  author: any;
  thumbnailUrl: string;
  videoUrl?: string;
  views?: number;
  likes?: number;
  eWasteSavedKg: number;
  toolsRequired: string[];
  partsRequired: any[];
  steps: any[];
  publishedAt?: string;
}

export interface SparePart {
  id: string;
  partNumber: string;
  name: string;
  category: string;
  packageFootprint: string;
  description: string;
  typicalDevices: string[];
  substitutes: string[];
  specifications: Record<string, string>;
  datasheetSummary: string;
  inStock: boolean;
  priceUSD: number;
  supplier: any;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  durationHours: number;
  lessonsCount?: number;
  description: string;
  instructor: string;
  progressPercent?: number;
  isCompleted?: boolean;
  skillsAcquired?: string[];
  modules: any[];
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: any;
  deviceCategory: string;
  deviceModel?: string;
  issueType: string;
  tags: string[];
  upvotes: number;
  repliesCount: number;
  isSolved: boolean;
  createdAt: string;
  replies: any[];
}

export interface VerificationRequest {
  id: string;
  companyName: string;
  registrationNumber: string;
  countryOfRegistration: string;
  tradingLicenseDocument: string;
  vatTaxNumber: string;
  contactEmail: string;
  contactPhone: string;
  officialAddress: string;
  status: string;
  submittedDate: string;
  reviewerNotes: string;
}
