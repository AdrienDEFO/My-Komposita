
import { AppState, Level } from '../types.ts';

const DB_KEY = 'my_komposita_pwa_db';

const DEFAULT_STATE: AppState = {
  user: null,
  currentLevel: Level.A1
};

export const getDB = (): AppState => {
  try {
    const data = localStorage.getItem(DB_KEY);
    if (!data) return DEFAULT_STATE;
    return JSON.parse(data);
  } catch (error) {
    console.error("Erreur de lecture DB:", error);
    return DEFAULT_STATE;
  }
};

export const saveDB = (state: AppState) => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Erreur de sauvegarde DB:", error);
  }
};

export const clearDB = () => {
  localStorage.removeItem(DB_KEY);
};

export const updateUserProgress = (points: number, livesChange: number = 0, lessonId?: number, newWordIds: string[] = []) => {
  const state = getDB();
  if (state.user) {
    state.user.points += points;
    state.user.lives = Math.max(0, Math.min(5, state.user.lives + livesChange));
    
    if (lessonId && !state.user.completedLessons.includes(lessonId)) {
      state.user.completedLessons.push(lessonId);
    }

    newWordIds.forEach(id => {
      if (!state.user?.learnedWords.includes(id)) {
        state.user?.learnedWords.push(id);
      }
    });
    
    const unlocked = Math.floor(state.user.points / 100) + 1;
    state.user.unlockedBatches = Math.max(state.user.unlockedBatches, unlocked);
    
    saveDB(state);
  }
};
