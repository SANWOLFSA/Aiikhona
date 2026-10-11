// Types for the Electrical Theory study library and Exam Room.
// Data files under ./topics and ./questions are generated from authored sources and loaded lazily.

export type TheoryLevel = 'school' | 'college' | 'university';

export type TheorySubjectId =
  | 'fundamentals'
  | 'dc'
  | 'fields'
  | 'ac'
  | 'machines'
  | 'power'
  | 'installation'
  | 'measurement'
  | 'electronics'
  | 'digital'
  | 'signals';

export interface TheoryFormula {
  /** The formula itself, written with Unicode maths symbols. */
  expr: string;
  /** What the formula gives / when to use it. */
  desc: string;
}

export interface TheoryWorkedExample {
  problem: string;
  steps: string[];
  answer: string;
}

export interface TheoryTopic {
  id: string;
  title: string;
  levels: TheoryLevel[];
  subject: TheorySubjectId;
  summary: string;
  explanation: string[];
  formulas: TheoryFormula[];
  example: TheoryWorkedExample;
  mistakes: string[];
  /** Ids of related topics. */
  related: string[];
  /** Extra search aliases (e.g. "kvl kcl"). */
  keywords: string;
}

interface TheoryQuestionBase {
  id: string;
  level: TheoryLevel;
  subject: TheorySubjectId;
  topicId: string;
  difficulty: 1 | 2 | 3 | number;
  prompt: string;
  /** Worked solution shown on the review screen. */
  solution: string;
  /** True for questions generated on demand by the AI route. */
  aiGenerated?: boolean;
}

export interface TheoryMcqQuestion extends TheoryQuestionBase {
  type: 'mcq';
  options: string[];
  answerIndex: number;
}

export interface TheoryNumericQuestion extends TheoryQuestionBase {
  type: 'numeric';
  answer: number;
  unit: string;
  /** Relative tolerance (0.02 = ±2 %). 0 means the exact value is required. */
  tolerance: number;
}

export type TheoryQuestion = TheoryMcqQuestion | TheoryNumericQuestion;
