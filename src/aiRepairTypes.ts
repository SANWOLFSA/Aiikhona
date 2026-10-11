// AI repair helpers ported from the original DIYELECTRONICS-web-app
export interface ProTipMistake {
  id: string;
  mistakeTitle: string;
  whyItHappens: string;
  preventionTip: string;
  riskLevel: 'Caution' | 'High Risk' | 'Critical Damage';
  componentOrArea: string;
}

export interface ProTipsResponse {
  deviceModel: string;
  brand?: string;
  summary: string;
  benchDoAndDonts: {
    doTip: string;
    dontMistake: string;
  }[];
  commonMistakes: ProTipMistake[];
  torqueOrTempSpecs?: {
    label: string;
    spec: string;
  }[];
  source: string;
}
/** One text chapter of an AI-written repair walkthrough (no video is hosted or generated). */
export interface VideoChapter {
  id: string;
  title: string;
  actionSummary: string;
  benchTool?: string;
  cautionNotice?: string;
  multimeterMode?: string;
  targetComponents?: string[];
  /** Legacy fields from the old fake-video player; no longer sent by the server. */
  timestamp?: string;
  seconds?: number;
}

export interface AIVideoTutorial {
  title: string;
  deviceModel: string;
  issueType: string;
  benchSafetyProtocol?: string;
  magnificationLevel?: string;
  hotAirReworkTemp?: string;
  chapters: VideoChapter[];
  keyTakeaways?: string[];
  /** Real YouTube search for repair videos of this device/issue. */
  youtubeSearchUrl?: string;
  /** Legacy fields, no longer sent by the server. */
  totalDurationSeconds?: number;
  instructorName?: string;
  instructorRole?: string;
  videoUrl?: string;
}

export interface AIVideoTutorialResponse {
  success: boolean;
  tutorial?: AIVideoTutorial;
  source?: string;
  error?: string;
  youtubeSearchUrl?: string;
}
