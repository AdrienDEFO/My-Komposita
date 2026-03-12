
export enum Level {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1'
}

export enum Language {
  FR = 'Français',
  EN = 'English',
  DE = 'Deutsch'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum WordType {
  NOUN = 'NOM',
  ADJECTIVE = 'ADJECTIF',
  VERB = 'VERBE'
}

export enum ExerciseType {
  COMPOSITION = 'COMPOSITION',
  DECOMPOSITION = 'DECOMPOSITION',
  TRANSLATION = 'TRANSLATION',
  LINKING_ELEMENT = 'LINKING_ELEMENT',
  PARAPHRASE = 'PARAPHRASE',
  SPEAKING = 'SPEAKING',
  ARTICLE = 'ARTICLE'
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  isQRO?: boolean;
  wordToSpeak?: string; // For SPEAKING type
  components?: string[]; // For COMPOSITION/DECOMPOSITION
}

export interface Kompositum {
  id: string;
  word: string;
  type: WordType;
  article?: 'der' | 'die' | 'das';
  translation: { [key: string]: string }; // Traduction multi-langue
  components: {
    word1: string;
    word2: string;
    linkingElement?: string;
  };
  declensions?: {
    nominative: string;
    genitive: string;
    dative: string;
    accusative: string;
  };
  category: string;
  level: Level;
  synonyms?: string[];
  exampleSentence?: string;
  exampleTranslation?: { [key: string]: string };
}

export interface Lesson {
  id: number;
  level: Level;
  title: string;
  targetWords: Kompositum[];
  exercises: Exercise[];
  isLocked: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  level: Level;
  language: Language; // Langue de l'UI
  points: number;
  lives: number;
  lastLifeUpdate: number;
  lastLifeChallenge: number;
  completedLessons: number[];
  unlockedBatches: number;
  dailyStreak: number;
  lastDailyChallenge: number;
  lastActivityTimestamp: number;
  learnedWords: string[];
  notificationsEnabled?: boolean;
  reminderFrequency?: 'daily' | 'weekly' | 'none';
  theme?: Theme;
}

export interface AppState {
  user: User | null;
  currentLevel: Level;
}
