
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
  // A1
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
  // A2
  {
    id: '6', word: 'Fahrrad', article: 'das', level: Level.A2,
    translation: { [Language.FR]: 'Vélo', [Language.EN]: 'Bicycle', [Language.DE]: 'Fahrrad' },
    components: { word1: 'Fahr', word2: 'Rad' },
    declensions: { nominative: 'das Fahrrad', genitive: 'des Fahrrades', dative: 'dem Fahrrad', accusative: 'das Fahrrad' },
    category: 'Transport'
  },
  {
    id: '7', word: 'Sonnenbrille', article: 'die', level: Level.A2,
    translation: { [Language.FR]: 'Lunettes de soleil', [Language.EN]: 'Sunglasses', [Language.DE]: 'Sonnenbrille' },
    components: { word1: 'Sonnen', word2: 'Brille' },
    declensions: { nominative: 'die Sonnenbrille', genitive: 'der Sonnenbrille', dative: 'der Sonnenbrille', accusative: 'die Sonnenbrille' },
    category: 'Vêtements'
  },
  {
    id: '8', word: 'Kindergarten', article: 'der', level: Level.A2,
    translation: { [Language.FR]: 'Jardin d\'enfants', [Language.EN]: 'Kindergarten', [Language.DE]: 'Kindergarten' },
    components: { word1: 'Kind', word2: 'Garten', linkingElement: 'er' },
    declensions: { nominative: 'der Kindergarten', genitive: 'des Kindergartens', dative: 'dem Kindergarten', accusative: 'den Kindergarten' },
    category: 'Éducation'
  },
  {
    id: '9', word: 'Regenschirm', article: 'der', level: Level.A2,
    translation: { [Language.FR]: 'Parapluie', [Language.EN]: 'Umbrella', [Language.DE]: 'Regenschirm' },
    components: { word1: 'Regen', word2: 'Schirm' },
    declensions: { nominative: 'der Regenschirm', genitive: 'des Regenschirms', dative: 'dem Regenschirm', accusative: 'den Regenschirm' },
    category: 'Accessoires'
  },
  {
    id: '10', word: 'Flugzeug', article: 'das', level: Level.A2,
    translation: { [Language.FR]: 'Avion', [Language.EN]: 'Airplane', [Language.DE]: 'Flugzeug' },
    components: { word1: 'Flug', word2: 'Zeug' },
    declensions: { nominative: 'das Flugzeug', genitive: 'des Flugzeugs', dative: 'dem Flugzeug', accusative: 'das Flugzeug' },
    category: 'Transport'
  },
  // B1
  {
    id: '11', word: 'Schreibtisch', article: 'der', level: Level.B1,
    translation: { [Language.FR]: 'Bureau', [Language.EN]: 'Desk', [Language.DE]: 'Schreibtisch' },
    components: { word1: 'Schreib', word2: 'Tisch' },
    declensions: { nominative: 'der Schreibtisch', genitive: 'des Schreibtisches', dative: 'dem Schreibtisch', accusative: 'den Schreibtisch' },
    category: 'Maison'
  },
  {
    id: '12', word: 'Wohnzimmer', article: 'das', level: Level.B1,
    translation: { [Language.FR]: 'Salon', [Language.EN]: 'Living room', [Language.DE]: 'Wohnzimmer' },
    components: { word1: 'Wohn', word2: 'Zimmer' },
    declensions: { nominative: 'das Wohnzimmer', genitive: 'des Wohnzimmers', dative: 'dem Wohnzimmer', accusative: 'das Wohnzimmer' },
    category: 'Maison'
  },
  {
    id: '13', word: 'Arbeitsplatz', article: 'der', level: Level.B1,
    translation: { [Language.FR]: 'Lieu de travail', [Language.EN]: 'Workplace', [Language.DE]: 'Arbeitsplatz' },
    components: { word1: 'Arbeits', word2: 'Platz' },
    declensions: { nominative: 'der Arbeitsplatz', genitive: 'des Arbeitsplatzes', dative: 'dem Arbeitsplatz', accusative: 'den Arbeitsplatz' },
    category: 'Travail'
  },
  {
    id: '14', word: 'Staubsauger', article: 'der', level: Level.B1,
    translation: { [Language.FR]: 'Aspirateur', [Language.EN]: 'Vacuum cleaner', [Language.DE]: 'Staubsauger' },
    components: { word1: 'Staub', word2: 'Sauger' },
    declensions: { nominative: 'der Staubsauger', genitive: 'des Staubsaugers', dative: 'dem Staubsauger', accusative: 'den Staubsauger' },
    category: 'Maison'
  },
  {
    id: '15', word: 'Taschenlampe', article: 'die', level: Level.B1,
    translation: { [Language.FR]: 'Lampe de poche', [Language.EN]: 'Flashlight', [Language.DE]: 'Taschenlampe' },
    components: { word1: 'Taschen', word2: 'Lampe' },
    declensions: { nominative: 'die Taschenlampe', genitive: 'der Taschenlampe', dative: 'der Taschenlampe', accusative: 'die Taschenlampe' },
    category: 'Accessoires'
  },
  // B2
  {
    id: '16', word: 'Herausforderung', article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Défi', [Language.EN]: 'Challenge', [Language.DE]: 'Herausforderung' },
    components: { word1: 'heraus', word2: 'Forderung' },
    declensions: { nominative: 'die Herausforderung', genitive: 'der Herausforderung', dative: 'der Herausforderung', accusative: 'die Herausforderung' },
    category: 'Abstrait'
  },
  {
    id: '17', word: 'Verantwortung', article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Responsabilité', [Language.EN]: 'Responsibility', [Language.DE]: 'Verantwortung' },
    components: { word1: 'verantwort', word2: 'ung' },
    declensions: { nominative: 'die Verantwortung', genitive: 'der Verantwortung', dative: 'der Verantwortung', accusative: 'die Verantwortung' },
    category: 'Abstrait'
  },
  {
    id: '18', word: 'Sehenswürdigkeit', article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Curiosité touristique', [Language.EN]: 'Sight', [Language.DE]: 'Sehenswürdigkeit' },
    components: { word1: 'sehenswert', word2: 'keit' },
    declensions: { nominative: 'die Sehenswürdigkeit', genitive: 'der Sehenswürdigkeit', dative: 'der Sehenswürdigkeit', accusative: 'die Sehenswürdigkeit' },
    category: 'Tourisme'
  },
  {
    id: '19', word: 'Umweltverschmutzung', article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Pollution de l\'environnement', [Language.EN]: 'Environmental pollution', [Language.DE]: 'Umweltverschmutzung' },
    components: { word1: 'Umwelt', word2: 'Verschmutzung' },
    declensions: { nominative: 'die Umweltverschmutzung', genitive: 'der Umweltverschmutzung', dative: 'der Umweltverschmutzung', accusative: 'die Umweltverschmutzung' },
    category: 'Environnement'
  },
  {
    id: '20', word: 'Zusammenarbeit', article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Collaboration', [Language.EN]: 'Collaboration', [Language.DE]: 'Zusammenarbeit' },
    components: { word1: 'zusammen', word2: 'Arbeit' },
    declensions: { nominative: 'die Zusammenarbeit', genitive: 'der Zusammenarbeit', dative: 'der Zusammenarbeit', accusative: 'die Zusammenarbeit' },
    category: 'Travail'
  }
];

export const generatePlacementTest = (): Exercise[] => {
  const testExercises: Exercise[] = [];
  const levels = [Level.A1, Level.A2, Level.B1, Level.B2];
  
  levels.forEach(lvl => {
    const lvlWords = MOCK_KOMPOSITA.filter(w => w.level === lvl);
    // Pick 3 random words for each level
    const selectedWords = [...lvlWords].sort(() => Math.random() - 0.5).slice(0, 3);
    
    selectedWords.forEach((word, idx) => {
      // Vary exercise types for the test
      const types = [ExerciseType.TRANSLATION, ExerciseType.ARTICLE, ExerciseType.DECOMPOSITION];
      const type = types[idx % types.length];
      
      if (type === ExerciseType.TRANSLATION) {
        testExercises.push({
          id: `test-${lvl}-${word.id}-trans`,
          type: ExerciseType.TRANSLATION,
          question: `Comment dit-on "${word.translation[Language.FR]}" en allemand ?`,
          correctAnswer: word.word,
          options: [word.word, ...MOCK_KOMPOSITA.filter(w => w.id !== word.id).slice(0, 3).map(w => w.word)].sort(() => Math.random() - 0.5),
          explanation: lvl // Store level in explanation field temporarily for scoring
        });
      } else if (type === ExerciseType.ARTICLE) {
        testExercises.push({
          id: `test-${lvl}-${word.id}-art`,
          type: ExerciseType.ARTICLE,
          question: `Quel est l'article de "${word.word}" ?`,
          correctAnswer: word.article,
          options: ['der', 'die', 'das'].sort(() => Math.random() - 0.5),
          explanation: lvl
        });
      } else {
        testExercises.push({
          id: `test-${lvl}-${word.id}-decomp`,
          type: ExerciseType.DECOMPOSITION,
          question: `De quoi est composé "${word.word}" ?`,
          correctAnswer: `${word.components.word1} + ${word.components.word2}`,
          options: [
            `${word.components.word1} + ${word.components.word2}`,
            `${word.components.word1} + Saft`,
            `Haus + ${word.components.word2}`,
            `Kind + Garten`
          ].sort(() => Math.random() - 0.5),
          explanation: lvl
        });
      }
    });
  });
  
  return testExercises;
};

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
