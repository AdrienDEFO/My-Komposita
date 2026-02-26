
import { AppState, Level } from '../types';
import { MAX_LIVES, LIFE_REFILL_TIME } from '../constants';

const DB_KEY = 'my_komposita_pwa_db';

const DEFAULT_STATE: AppState = {
  user: null,
  currentLevel: Level.A1
};

export const getDB = (): AppState => {
  try {
    const data = localStorage.getItem(DB_KEY);
    if (!data) return DEFAULT_STATE;
    const state = JSON.parse(data);
    
    // Auto-refill lives if 24h passed
    if (state.user && state.user.lives < MAX_LIVES) {
      const now = Date.now();
      if (now - state.user.lastLifeUpdate >= LIFE_REFILL_TIME) {
        state.user.lives = MAX_LIVES;
        state.user.lastLifeUpdate = now;
        localStorage.setItem(DB_KEY, JSON.stringify(state));
      }
    }
    
    return state;
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

export const updateUserLevel = (level: Level) => {
  const state = getDB();
  if (state.user) {
    state.user.level = level;
    // When skipping levels, we might want to give some base points or unlock batches
    const levelIndex = Object.values(Level).indexOf(level);
    state.user.unlockedBatches = Math.max(state.user.unlockedBatches, (levelIndex * 4) + 1);
    saveDB(state);
  }
};

export const updateUserProgress = (points: number, livesChange: number = 0, lessonId?: number, newWordIds: string[] = []) => {
  const state = getDB();
  if (state.user) {
    state.user.points += points;
    
    const oldLives = state.user.lives;
    state.user.lives = Math.max(0, Math.min(MAX_LIVES, state.user.lives + livesChange));
    
    if (state.user.lives < oldLives) {
      state.user.lastLifeUpdate = Date.now();
    }
    
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

export const completeLifeChallenge = () => {
  const state = getDB();
  if (state.user) {
    state.user.lives = MAX_LIVES;
    state.user.lastLifeChallenge = Date.now();
    state.user.lastLifeUpdate = Date.now();
    saveDB(state);
  }
};
