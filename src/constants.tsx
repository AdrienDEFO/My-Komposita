
import { Level, Kompositum, Lesson, ExerciseType, Language, Exercise } from './types';

export const POINTS_PER_BATCH = 100;
export const MAX_LIVES = 5;
export const LIFE_REFILL_TIME = 24 * 60 * 60 * 1000;

export const TRANSLATIONS: { [key: string]: { [key in Language]: string } } = {
  welcome: { [Language.FR]: 'Bienvenue', [Language.EN]: 'Welcome', [Language.DE]: 'Willkommen' },
  lesson: { [Language.FR]: 'Leçon', [Language.EN]: 'Lesson', [Language.DE]: 'Lektion' },
  start: { [Language.FR]: 'Commencer', [Language.EN]: 'Start', [Language.DE]: 'Starten' },
  check: { [Language.FR]: 'Vérifier', [Language.EN]: 'Check', [Language.DE]: 'Prüfen' },
  continue: { [Language.FR]: 'Continuer', [Language.EN]: 'Continue', [Language.DE]: 'Weiter' },
  points: { [Language.FR]: 'Points', [Language.EN]: 'Points', [Language.DE]: 'Punkte' },
  lives: { [Language.FR]: 'Vies', [Language.EN]: 'Lives', [Language.DE]: 'Leben' },
  dictionary: { [Language.FR]: 'Dictionnaire', [Language.EN]: 'Dictionary', [Language.DE]: 'Wörterbuch' },
  profile: { [Language.FR]: 'Profil', [Language.EN]: 'Profile', [Language.DE]: 'Profil' },
  settings: { [Language.FR]: 'Paramètres', [Language.EN]: 'Settings', [Language.DE]: 'Einstellungen' },
};

export const CONTACT = {
  appName: 'MyKomposita',
  version: '1.2.0',
  team: [
    { name: 'Adrien DEFO # Shadow AD', role: 'Dev & Design', email: 'adriendefo@gmail.com' },
    { name: 'Lalende Waffo', role: 'Visionary', email: 'zalieulrich@gmail.com' }
  ],
  primary: { email: 'adriendefo@gmail.com', phone: '+237 658 463 816' }
};

export const MOCK_KOMPOSITA: Kompositum[] = [
  {
    id: '1', word: 'Haustür', article: 'die', level: Level.A1,
    translation: { [Language.FR]: 'Porte d\'entrée', [Language.EN]: 'Front door', [Language.DE]: 'Haustür' },
    components: { word1: 'Haus', word2: 'Tür' },
    declensions: { nominative: 'die Haustür', genitive: 'der Haustür', dative: 'der Haustür', accusative: 'die Haustür' },
    category: 'Maison'
  },
  {
    id: '2', word: 'Apfelsaft', article: 'der', level: Level.A1,
    translation: { [Language.FR]: 'Jus de pomme', [Language.EN]: 'Apple juice', [Language.DE]: 'Apfelsaft' },
    components: { word1: 'Apfel', word2: 'Saft' },
    declensions: { nominative: 'der Apfelsaft', genitive: 'des Apfelsaftes', dative: 'dem Apfelsaft', accusative: 'den Apfelsaft' },
    category: 'Aliments'
  },
  {
    id: '3', word: 'Bahnhof', article: 'der', level: Level.A1,
    translation: { [Language.FR]: 'Gare', [Language.EN]: 'Station', [Language.DE]: 'Bahnhof' },
    components: { word1: 'Bahn', word2: 'Hof' },
    declensions: { nominative: 'der Bahnhof', genitive: 'des Bahnhofs', dative: 'dem Bahnhof', accusative: 'den Bahnhof' },
    category: 'Transport'
  },
  {
    id: '4', word: 'Kühlschrank', article: 'der', level: Level.A1,
    translation: { [Language.FR]: 'Réfrigérateur', [Language.EN]: 'Fridge', [Language.DE]: 'Kühlschrank' },
    components: { word1: 'kühl', word2: 'Schrank' },
    declensions: { nominative: 'der Kühlschrank', genitive: 'des Kühlschranks', dative: 'dem Kühlschrank', accusative: 'den Kühlschrank' },
    category: 'Maison'
  },
  {
    id: '5', word: 'Handschuh', article: 'der', level: Level.A1,
    translation: { [Language.FR]: 'Gant', [Language.EN]: 'Glove', [Language.DE]: 'Handschuh' },
    components: { word1: 'Hand', word2: 'Schuh' },
    declensions: { nominative: 'der Handschuh', genitive: 'des Handschuhs', dative: 'dem Handschuh', accusative: 'den Handschuh' },
    category: 'Vêtements'
  },
  {
    id: '6', word: 'Fahrrad', article: 'das', level: Level.A1,
    translation: { [Language.FR]: 'Vélo', [Language.EN]: 'Bicycle', [Language.DE]: 'Fahrrad' },
    components: { word1: 'Fahr', word2: 'Rad' },
    declensions: { nominative: 'das Fahrrad', genitive: 'des Fahrrades', dative: 'dem Fahrrad', accusative: 'das Fahrrad' },
    category: 'Transport'
  },
  {
    id: '7', word: 'Sonnenbrille', article: 'die', level: Level.A1,
    translation: { [Language.FR]: 'Lunettes de soleil', [Language.EN]: 'Sunglasses', [Language.DE]: 'Sonnenbrille' },
    components: { word1: 'Sonnen', word2: 'Brille' },
    declensions: { nominative: 'die Sonnenbrille', genitive: 'der Sonnenbrille', dative: 'der Sonnenbrille', accusative: 'die Sonnenbrille' },
    category: 'Vêtements'
  },
  {
    id: '8', word: 'Kindergarten', article: 'der', level: Level.A1,
    translation: { [Language.FR]: 'Jardin d\'enfants', [Language.EN]: 'Kindergarten', [Language.DE]: 'Kindergarten' },
    components: { word1: 'Kind', word2: 'Garten', linkingElement: 'er' },
    declensions: { nominative: 'der Kindergarten', genitive: 'des Kindergartens', dative: 'dem Kindergarten', accusative: 'den Kindergarten' },
    category: 'Éducation'
  },
  {
    id: '9', word: 'Schreibtisch', article: 'der', level: Level.A1,
    translation: { [Language.FR]: 'Bureau', [Language.EN]: 'Desk', [Language.DE]: 'Schreibtisch' },
    components: { word1: 'Schreib', word2: 'Tisch' },
    declensions: { nominative: 'der Schreibtisch', genitive: 'des Schreibtisches', dative: 'dem Schreibtisch', accusative: 'den Schreibtisch' },
    category: 'Maison'
  },
  {
    id: '10', word: 'Wohnzimmer', article: 'das', level: Level.A1,
    translation: { [Language.FR]: 'Salon', [Language.EN]: 'Living room', [Language.DE]: 'Wohnzimmer' },
    components: { word1: 'Wohn', word2: 'Zimmer' },
    declensions: { nominative: 'das Wohnzimmer', genitive: 'des Wohnzimmers', dative: 'dem Wohnzimmer', accusative: 'das Wohnzimmer' },
    category: 'Maison'
  }
];

export const generateLessons = (level: Level): Lesson[] => {
  const levelWords = MOCK_KOMPOSITA.filter(w => w.level === level);
  const fallbackWords = MOCK_KOMPOSITA;
  
  return Array.from({ length: 24 }).map((_, i) => {
    const word1 = (levelWords.length > 0) ? levelWords[(i * 2) % levelWords.length] : fallbackWords[(i * 2) % fallbackWords.length];
    const word2 = (levelWords.length > 1) ? levelWords[(i * 2 + 1) % levelWords.length] : fallbackWords[(i * 2 + 1) % fallbackWords.length];
    
    const targetWords = [word1, word2];
    
    const exercises: Exercise[] = [];
    
    targetWords.forEach((word, wordIdx) => {
      // 1. Translation (QCM)
      exercises.push({
        id: `ex-${i}-${wordIdx}-trans`,
        type: ExerciseType.TRANSLATION,
        question: `Comment dit-on "${word.translation[Language.FR]}" en allemand ?`,
        correctAnswer: word.word,
        options: [word.word, ...MOCK_KOMPOSITA.filter(w => w.id !== word.id).slice(0, 3).map(w => w.word)].sort(() => Math.random() - 0.5)
      });

      // 2. Article (QCM)
      exercises.push({
        id: `ex-${i}-${wordIdx}-art`,
        type: ExerciseType.ARTICLE,
        question: `Quel est l'article de "${word.word}" ?`,
        correctAnswer: word.article,
        options: ['der', 'die', 'das'].sort(() => Math.random() - 0.5)
      });

      // 3. Composition (QRO)
      exercises.push({
        id: `ex-${i}-${wordIdx}-comp`,
        type: ExerciseType.COMPOSITION,
        question: `Composez le mot : ${word.components.word1} + ${word.components.linkingElement || ''} + ${word.components.word2} = ?`,
        correctAnswer: word.word,
        isQRO: true
      });

      // 4. Decomposition (QCM)
      exercises.push({
        id: `ex-${i}-${wordIdx}-decomp`,
        type: ExerciseType.DECOMPOSITION,
        question: `De quoi est composé "${word.word}" ?`,
        correctAnswer: `${word.components.word1} + ${word.components.word2}`,
        options: [
          `${word.components.word1} + ${word.components.word2}`,
          `${word.components.word1} + Saft`,
          `Haus + ${word.components.word2}`,
          `Kind + Garten`
        ].sort(() => Math.random() - 0.5)
      });

      // 5. Linking Element (QCM) - Only if it has one or for variety
      if (word.components.linkingElement) {
        exercises.push({
          id: `ex-${i}-${wordIdx}-link`,
          type: ExerciseType.LINKING_ELEMENT,
          question: `Quel est l'élément de liaison entre "${word.components.word1}" et "${word.components.word2}" ?`,
          correctAnswer: word.components.linkingElement,
          options: [word.components.linkingElement, 's', 'n', 'e', 'Aucun'].sort(() => Math.random() - 0.5)
        });
      } else {
        // Paraphrase instead
        exercises.push({
          id: `ex-${i}-${wordIdx}-para`,
          type: ExerciseType.PARAPHRASE,
          question: `Quel mot correspond à : "${word.translation[Language.FR]}" ?`,
          correctAnswer: word.word,
          isQRO: true
        });
      }
    });

    return {
      id: i + 1,
      level,
      title: `${word1.word} & ${word2.word}`,
      targetWords: [word1, word2],
      isLocked: i >= 4,
      exercises: exercises.sort(() => Math.random() - 0.5).slice(0, 10)
    };
  });
};
