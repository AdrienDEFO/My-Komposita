
import { Level, Kompositum, Lesson, ExerciseType, Language, Exercise, WordType } from './types';

export const POINTS_PER_BATCH = 100;
export const MAX_LIVES = 5;
export const LIFE_REFILL_TIME = 24 * 60 * 60 * 1000;
export const LIFE_CHALLENGE_TIME = 48 * 60 * 60 * 1000;

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
    id: '1', word: 'Haustür', type: WordType.NOUN, article: 'die', level: Level.A1,
    translation: { [Language.FR]: 'Porte d\'entrée', [Language.EN]: 'Front door', [Language.DE]: 'Haustür' },
    components: { word1: 'Haus', word2: 'Tür' },
    declensions: { nominative: 'die Haustür', genitive: 'der Haustür', dative: 'der Haustür', accusative: 'die Haustür' },
    category: 'Maison',
    exampleSentence: 'Ich schließe die Haustür ab.',
    exampleTranslation: { [Language.FR]: 'Je ferme la porte d\'entrée à clé.', [Language.EN]: 'I am locking the front door.' }
  },
  {
    id: '2', word: 'Apfelsaft', type: WordType.NOUN, article: 'der', level: Level.A1,
    translation: { [Language.FR]: 'Jus de pomme', [Language.EN]: 'Apple juice', [Language.DE]: 'Apfelsaft' },
    components: { word1: 'Apfel', word2: 'Saft' },
    declensions: { nominative: 'der Apfelsaft', genitive: 'des Apfelsaftes', dative: 'dem Apfelsaft', accusative: 'den Apfelsaft' },
    category: 'Aliments',
    exampleSentence: 'Ich trinke morgens gerne Apfelsaft.',
    exampleTranslation: { [Language.FR]: 'J\'aime boire du jus de pomme le matin.', [Language.EN]: 'I like to drink apple juice in the morning.' }
  },
  {
    id: '3', word: 'Bahnhof', type: WordType.NOUN, article: 'der', level: Level.A1,
    translation: { [Language.FR]: 'Gare', [Language.EN]: 'Station', [Language.DE]: 'Bahnhof' },
    components: { word1: 'Bahn', word2: 'Hof' },
    declensions: { nominative: 'der Bahnhof', genitive: 'des Bahnhofs', dative: 'dem Bahnhof', accusative: 'den Bahnhof' },
    category: 'Transport',
    exampleSentence: 'Der Zug kommt am Bahnhof an.',
    exampleTranslation: { [Language.FR]: 'Le train arrive à la gare.', [Language.EN]: 'The train arrives at the station.' }
  },
  {
    id: '4', word: 'Kühlschrank', type: WordType.NOUN, article: 'der', level: Level.A1,
    translation: { [Language.FR]: 'Réfrigérateur', [Language.EN]: 'Fridge', [Language.DE]: 'Kühlschrank' },
    components: { word1: 'kühl', word2: 'Schrank' },
    declensions: { nominative: 'der Kühlschrank', genitive: 'des Kühlschranks', dative: 'dem Kühlschrank', accusative: 'den Kühlschrank' },
    category: 'Maison',
    exampleSentence: 'Die Milch steht im Kühlschrank.',
    exampleTranslation: { [Language.FR]: 'Le lait est dans le réfrigérateur.', [Language.EN]: 'The milk is in the fridge.' }
  },
  {
    id: '5', word: 'Handschuh', type: WordType.NOUN, article: 'der', level: Level.A1,
    translation: { [Language.FR]: 'Gant', [Language.EN]: 'Glove', [Language.DE]: 'Handschuh' },
    components: { word1: 'Hand', word2: 'Schuh' },
    declensions: { nominative: 'der Handschuh', genitive: 'des Handschuhs', dative: 'dem Handschuh', accusative: 'den Handschuh' },
    category: 'Vêtements',
    exampleSentence: 'Ich habe einen Handschuh verloren.',
    exampleTranslation: { [Language.FR]: 'J\'ai perdu un gant.', [Language.EN]: 'I lost a glove.' }
  },
  {
    id: 'a1-6', word: 'Schulbuch', type: WordType.NOUN, article: 'das', level: Level.A1,
    translation: { [Language.FR]: 'Livre scolaire', [Language.EN]: 'School book', [Language.DE]: 'Schulbuch' },
    components: { word1: 'Schule', word2: 'Buch' },
    declensions: { nominative: 'das Schulbuch', genitive: 'des Schulbuchs', dative: 'dem Schulbuch', accusative: 'das Schulbuch' },
    category: 'Éducation',
    exampleSentence: 'Das Schulbuch liegt auf dem Tisch.',
    exampleTranslation: { [Language.FR]: 'Le livre scolaire est sur la table.', [Language.EN]: 'The school book is on the table.' }
  },
  {
    id: 'a1-7', word: 'Wasserglas', type: WordType.NOUN, article: 'das', level: Level.A1,
    translation: { [Language.FR]: 'Verre d\'eau', [Language.EN]: 'Water glass', [Language.DE]: 'Wasserglas' },
    components: { word1: 'Wasser', word2: 'Glas' },
    declensions: { nominative: 'das Wasserglas', genitive: 'des Wasserglases', dative: 'dem Wasserglas', accusative: 'das Wasserglas' },
    category: 'Maison',
    exampleSentence: 'Ich fülle das Wasserglas.',
    exampleTranslation: { [Language.FR]: 'Je remplis le verre d\'eau.', [Language.EN]: 'I am filling the water glass.' }
  },
  {
    id: 'a1-8', word: 'Tischlampe', type: WordType.NOUN, article: 'die', level: Level.A1,
    translation: { [Language.FR]: 'Lampe de table', [Language.EN]: 'Table lamp', [Language.DE]: 'Tischlampe' },
    components: { word1: 'Tisch', word2: 'Lampe' },
    declensions: { nominative: 'die Tischlampe', genitive: 'der Tischlampe', dative: 'der Tischlampe', accusative: 'die Tischlampe' },
    category: 'Maison',
    exampleSentence: 'Die Tischlampe ist sehr hell.',
    exampleTranslation: { [Language.FR]: 'La lampe de table est très lumineuse.', [Language.EN]: 'The table lamp is very bright.' }
  },
  {
    id: 'a1-9', word: 'Fußball', type: WordType.NOUN, article: 'der', level: Level.A1,
    translation: { [Language.FR]: 'Ballon de football', [Language.EN]: 'Football', [Language.DE]: 'Fußball' },
    components: { word1: 'Fuß', word2: 'Ball' },
    declensions: { nominative: 'der Fußball', genitive: 'des Fußballs', dative: 'dem Fußball', accusative: 'den Fußball' },
    category: 'Sport',
    exampleSentence: 'Wir spielen am Nachmittag Fußball.',
    exampleTranslation: { [Language.FR]: 'Nous jouons au football l\'après-midi.', [Language.EN]: 'We play football in the afternoon.' }
  },
  {
    id: 'a1-10', word: 'Wochenende', type: WordType.NOUN, article: 'das', level: Level.A1,
    translation: { [Language.FR]: 'Week-end', [Language.EN]: 'Weekend', [Language.DE]: 'Wochenende' },
    components: { word1: 'Woche', word2: 'Ende' },
    declensions: { nominative: 'das Wochenende', genitive: 'des Wochenendes', dative: 'dem Wochenende', accusative: 'das Wochenende' },
    category: 'Temps',
    exampleSentence: 'Ich wünsche dir ein schönes Wochenende.',
    exampleTranslation: { [Language.FR]: 'Je te souhaite un bon week-end.', [Language.EN]: 'I wish you a nice weekend.' }
  },
  {
    id: 'a1-adj-1', word: 'hellblau', type: WordType.ADJECTIVE, level: Level.A1,
    translation: { [Language.FR]: 'Bleu clair', [Language.EN]: 'Light blue', [Language.DE]: 'hellblau' },
    components: { word1: 'hell', word2: 'blau' },
    category: 'Couleurs',
    exampleSentence: 'Sie trägt ein hellblaues Kleid.',
    exampleTranslation: { [Language.FR]: 'Elle porte une robe bleu clair.', [Language.EN]: 'She is wearing a light blue dress.' }
  },
  {
    id: 'a1-verb-1', word: 'kennenlernen', type: WordType.VERB, level: Level.A1,
    translation: { [Language.FR]: 'Faire la connaissance', [Language.EN]: 'To get to know', [Language.DE]: 'kennenlernen' },
    components: { word1: 'kennen', word2: 'lernen' },
    category: 'Social',
    exampleSentence: 'Ich möchte dich gerne kennenlernen.',
    exampleTranslation: { [Language.FR]: 'J\'aimerais beaucoup faire ta connaissance.', [Language.EN]: 'I would like to get to know you.' }
  },
  // A2
  {
    id: '6', word: 'Fahrrad', type: WordType.NOUN, article: 'das', level: Level.A2,
    translation: { [Language.FR]: 'Vélo', [Language.EN]: 'Bicycle', [Language.DE]: 'Fahrrad' },
    components: { word1: 'Fahr', word2: 'Rad' },
    declensions: { nominative: 'das Fahrrad', genitive: 'des Fahrrades', dative: 'dem Fahrrad', accusative: 'das Fahrrad' },
    category: 'Transport',
    exampleSentence: 'Mein Fahrrad ist kaputt.',
    exampleTranslation: { [Language.FR]: 'Mon vélo est cassé.', [Language.EN]: 'My bicycle is broken.' }
  },
  {
    id: '7', word: 'Sonnenbrille', type: WordType.NOUN, article: 'die', level: Level.A2,
    translation: { [Language.FR]: 'Lunettes de soleil', [Language.EN]: 'Sunglasses', [Language.DE]: 'Sonnenbrille' },
    components: { word1: 'Sonnen', word2: 'Brille' },
    declensions: { nominative: 'die Sonnenbrille', genitive: 'der Sonnenbrille', dative: 'der Sonnenbrille', accusative: 'die Sonnenbrille' },
    category: 'Vêtements',
    exampleSentence: 'Im Sommer trage ich eine Sonnenbrille.',
    exampleTranslation: { [Language.FR]: 'En été, je porte des lunettes de soleil.', [Language.EN]: 'In summer, I wear sunglasses.' }
  },
  {
    id: '8', word: 'Kindergarten', type: WordType.NOUN, article: 'der', level: Level.A2,
    translation: { [Language.FR]: 'Jardin d\'enfants', [Language.EN]: 'Kindergarten', [Language.DE]: 'Kindergarten' },
    components: { word1: 'Kind', word2: 'Garten', linkingElement: 'er' },
    declensions: { nominative: 'der Kindergarten', genitive: 'des Kindergartens', dative: 'dem Kindergarten', accusative: 'den Kindergarten' },
    category: 'Éducation',
    exampleSentence: 'Die Kinder spielen im Kindergarten.',
    exampleTranslation: { [Language.FR]: 'Les enfants jouent au jardin d\'enfants.', [Language.EN]: 'The children are playing in the kindergarten.' }
  },
  {
    id: '9', word: 'Regenschirm', type: WordType.NOUN, article: 'der', level: Level.A2,
    translation: { [Language.FR]: 'Parapluie', [Language.EN]: 'Umbrella', [Language.DE]: 'Regenschirm' },
    components: { word1: 'Regen', word2: 'Schirm' },
    declensions: { nominative: 'der Regenschirm', genitive: 'des Regenschirms', dative: 'dem Regenschirm', accusative: 'den Regenschirm' },
    category: 'Accessoires',
    exampleSentence: 'Vergiss deinen Regenschirm nicht!',
    exampleTranslation: { [Language.FR]: 'N\'oublie pas ton parapluie !', [Language.EN]: 'Don\'t forget your umbrella!' }
  },
  {
    id: '10', word: 'Flugzeug', type: WordType.NOUN, article: 'das', level: Level.A2,
    translation: { [Language.FR]: 'Avion', [Language.EN]: 'Airplane', [Language.DE]: 'Flugzeug' },
    components: { word1: 'Flug', word2: 'Zeug' },
    declensions: { nominative: 'das Flugzeug', genitive: 'des Flugzeugs', dative: 'dem Flugzeug', accusative: 'das Flugzeug' },
    category: 'Transport',
    exampleSentence: 'Das Flugzeug fliegt über die Alpen.',
    exampleTranslation: { [Language.FR]: 'Le train arrive à la gare.', [Language.EN]: 'The train arrives at the station.' }
  },
  {
    id: 'a2-6', word: 'Reisepass', type: WordType.NOUN, article: 'der', level: Level.A2,
    translation: { [Language.FR]: 'Passeport', [Language.EN]: 'Passport', [Language.DE]: 'Reisepass' },
    components: { word1: 'Reise', word2: 'Pass' },
    declensions: { nominative: 'der Reisepass', genitive: 'des Reisepasses', dative: 'dem Reisepass', accusative: 'den Reisepass' },
    category: 'Voyage',
    exampleSentence: 'Ich brauche meinen Reisepass für die Reise.',
    exampleTranslation: { [Language.FR]: 'J\'ai besoin de mon passeport pour le voyage.', [Language.EN]: 'I need my passport for the trip.' }
  },
  {
    id: 'a2-7', word: 'Bücherregal', type: WordType.NOUN, article: 'das', level: Level.A2,
    translation: { [Language.FR]: 'Bibliothèque (meuble)', [Language.EN]: 'Bookshelf', [Language.DE]: 'Bücherregal' },
    components: { word1: 'Bücher', word2: 'Regal' },
    declensions: { nominative: 'das Bücherregal', genitive: 'des Bücherregals', dative: 'dem Bücherregal', accusative: 'das Bücherregal' },
    category: 'Maison',
    exampleSentence: 'Das Bücherregal ist voll mit Romanen.',
    exampleTranslation: { [Language.FR]: 'La bibliothèque est pleine de romans.', [Language.EN]: 'The bookshelf is full of novels.' }
  },
  {
    id: 'a2-8', word: 'Kreditkarte', type: WordType.NOUN, article: 'die', level: Level.A2,
    translation: { [Language.FR]: 'Carte de crédit', [Language.EN]: 'Credit card', [Language.DE]: 'Kreditkarte' },
    components: { word1: 'Kredit', word2: 'Karte' },
    declensions: { nominative: 'die Kreditkarte', genitive: 'der Kreditkarte', dative: 'der Kreditkarte', accusative: 'die Kreditkarte' },
    category: 'Finance',
    exampleSentence: 'Kann ich mit Kreditkarte bezahlen?',
    exampleTranslation: { [Language.FR]: 'Puis-je payer par carte de crédit ?', [Language.EN]: 'Can I pay by credit card?' }
  },
  {
    id: 'a2-9', word: 'Mülltonne', type: WordType.NOUN, article: 'die', level: Level.A2,
    translation: { [Language.FR]: 'Poubelle', [Language.EN]: 'Dustbin', [Language.DE]: 'Mülltonne' },
    components: { word1: 'Müll', word2: 'Tonne' },
    declensions: { nominative: 'die Mülltonne', genitive: 'der Mülltonne', dative: 'der Mülltonne', accusative: 'die Mülltonne' },
    category: 'Maison',
    exampleSentence: 'Die Mülltonne steht vor dem Haus.',
    exampleTranslation: { [Language.FR]: 'La poubelle est devant la maison.', [Language.EN]: 'The dustbin is in front of the house.' }
  },
  {
    id: 'a2-10', word: 'Parkplatz', type: WordType.NOUN, article: 'der', level: Level.A2,
    translation: { [Language.FR]: 'Place de parking', [Language.EN]: 'Parking space', [Language.DE]: 'Parkplatz' },
    components: { word1: 'Park', word2: 'Platz' },
    declensions: { nominative: 'der Parkplatz', genitive: 'des Parkplatzes', dative: 'dem Parkplatz', accusative: 'den Parkplatz' },
    category: 'Transport',
    exampleSentence: 'Hier gibt es keinen freien Parkplatz.',
    exampleTranslation: { [Language.FR]: 'Il n\'y a pas de place de parking libre ici.', [Language.EN]: 'There is no free parking space here.' }
  },
  {
    id: 'a2-adj-1', word: 'dunkelgrün', type: WordType.ADJECTIVE, level: Level.A2,
    translation: { [Language.FR]: 'Vert foncé', [Language.EN]: 'Dark green', [Language.DE]: 'dunkelgrün' },
    components: { word1: 'dunkel', word2: 'grün' },
    category: 'Couleurs',
    exampleSentence: 'Das Auto ist dunkelgrün.',
    exampleTranslation: { [Language.FR]: 'La voiture est vert foncé.', [Language.EN]: 'The car is dark green.' }
  },
  {
    id: 'a2-verb-1', word: 'fernsehen', type: WordType.VERB, level: Level.A2,
    translation: { [Language.FR]: 'Regarder la télé', [Language.EN]: 'To watch TV', [Language.DE]: 'fernsehen' },
    components: { word1: 'fern', word2: 'sehen' },
    category: 'Loisirs',
    exampleSentence: 'Wir fernsehen jeden Abend.',
    exampleTranslation: { [Language.FR]: 'Nous regardons la télé tous les soirs.', [Language.EN]: 'We watch TV every evening.' }
  },
  // B1
  {
    id: '11', word: 'Schreibtisch', type: WordType.NOUN, article: 'der', level: Level.B1,
    translation: { [Language.FR]: 'Bureau', [Language.EN]: 'Desk', [Language.DE]: 'Schreibtisch' },
    components: { word1: 'Schreib', word2: 'Tisch' },
    declensions: { nominative: 'der Schreibtisch', genitive: 'des Schreibtisches', dative: 'dem Schreibtisch', accusative: 'den Schreibtisch' },
    category: 'Maison',
    exampleSentence: 'Mein Schreibtisch ist immer unordentlich.',
    exampleTranslation: { [Language.FR]: 'Mon bureau est toujours en désordre.', [Language.EN]: 'My desk is always messy.' }
  },
  {
    id: '12', word: 'Wohnzimmer', type: WordType.NOUN, article: 'das', level: Level.B1,
    translation: { [Language.FR]: 'Salon', [Language.EN]: 'Living room', [Language.DE]: 'Wohnzimmer' },
    components: { word1: 'Wohn', word2: 'Zimmer' },
    declensions: { nominative: 'das Wohnzimmer', genitive: 'des Wohnzimmers', dative: 'dem Wohnzimmer', accusative: 'das Wohnzimmer' },
    category: 'Maison',
    exampleSentence: 'Wir sitzen gemütlich im Wohnzimmer.',
    exampleTranslation: { [Language.FR]: 'Nous sommes assis confortablement dans le salon.', [Language.EN]: 'We are sitting comfortably in the living room.' }
  },
  {
    id: '13', word: 'Arbeitsplatz', type: WordType.NOUN, article: 'der', level: Level.B1,
    translation: { [Language.FR]: 'Lieu de travail', [Language.EN]: 'Workplace', [Language.DE]: 'Arbeitsplatz' },
    components: { word1: 'Arbeits', word2: 'Platz' },
    declensions: { nominative: 'der Arbeitsplatz', genitive: 'des Arbeitsplatzes', dative: 'dem Arbeitsplatz', accusative: 'den Arbeitsplatz' },
    category: 'Travail',
    exampleSentence: 'Mein Arbeitsplatz ist modern ausgestattet.',
    exampleTranslation: { [Language.FR]: 'Mon lieu de travail est équipé de façon moderne.', [Language.EN]: 'My workplace is modernly equipped.' }
  },
  {
    id: '14', word: 'Staubsauger', type: WordType.NOUN, article: 'der', level: Level.B1,
    translation: { [Language.FR]: 'Aspirateur', [Language.EN]: 'Vacuum cleaner', [Language.DE]: 'Staubsauger' },
    components: { word1: 'Staub', word2: 'Sauger' },
    declensions: { nominative: 'der Staubsauger', genitive: 'des Staubsaugers', dative: 'dem Staubsauger', accusative: 'den Staubsauger' },
    category: 'Maison',
    exampleSentence: 'Der Staubsauger macht viel Lärm.',
    exampleTranslation: { [Language.FR]: 'L\'aspirateur fait beaucoup de bruit.', [Language.EN]: 'The vacuum cleaner makes a lot of noise.' }
  },
  {
    id: '15', word: 'Taschenlampe', type: WordType.NOUN, article: 'die', level: Level.B1,
    translation: { [Language.FR]: 'Lampe de poche', [Language.EN]: 'Flashlight', [Language.DE]: 'Taschenlampe' },
    components: { word1: 'Taschen', word2: 'Lampe' },
    declensions: { nominative: 'die Taschenlampe', genitive: 'der Taschenlampe', dative: 'der Taschenlampe', accusative: 'die Taschenlampe' },
    category: 'Accessoires',
    exampleSentence: 'Im Keller brauchen wir eine Taschenlampe.',
    exampleTranslation: { [Language.FR]: 'À la cave, nous avons besoin d\'une lampe de poche.', [Language.EN]: 'In the cellar, we need a flashlight.' }
  },
  {
    id: '26', word: 'Kaffeemaschine', type: WordType.NOUN, article: 'die', level: Level.B1,
    translation: { [Language.FR]: 'Machine à café', [Language.EN]: 'Coffee machine', [Language.DE]: 'Kaffeemaschine' },
    components: { word1: 'Kaffee', word2: 'Maschine' },
    declensions: { nominative: 'die Kaffeemaschine', genitive: 'der Kaffeemaschine', dative: 'der Kaffeemaschine', accusative: 'die Kaffeemaschine' },
    category: 'Aliments',
    exampleSentence: 'Die Kaffeemaschine kocht frischen Kaffee.',
    exampleTranslation: { [Language.FR]: 'La machine à café prépare du café frais.', [Language.EN]: 'The coffee machine is brewing fresh coffee.' }
  },
  {
    id: 'b1-7', word: 'Zahnarzt', type: WordType.NOUN, article: 'der', level: Level.B1,
    translation: { [Language.FR]: 'Dentiste', [Language.EN]: 'Dentist', [Language.DE]: 'Zahnarzt' },
    components: { word1: 'Zahn', word2: 'Arzt' },
    declensions: { nominative: 'der Zahnarzt', genitive: 'des Zahnarztes', dative: 'dem Zahnarzt', accusative: 'den Zahnarzt' },
    category: 'Santé',
    exampleSentence: 'Ich habe morgen einen Termin beim Zahnarzt.',
    exampleTranslation: { [Language.FR]: 'J\'ai rendez-vous chez le dentiste demain.', [Language.EN]: 'I have an appointment with the dentist tomorrow.' }
  },
  {
    id: 'b1-8', word: 'Fahrkarte', type: WordType.NOUN, article: 'die', level: Level.B1,
    translation: { [Language.FR]: 'Ticket de transport', [Language.EN]: 'Ticket', [Language.DE]: 'Fahrkarte' },
    components: { word1: 'Fahr', word2: 'Karte' },
    declensions: { nominative: 'die Fahrkarte', genitive: 'der Fahrkarte', dative: 'der Fahrkarte', accusative: 'die Fahrkarte' },
    category: 'Transport',
    exampleSentence: 'Ich kauwe eine Fahrkarte am Automaten.',
    exampleTranslation: { [Language.FR]: 'J\'achète un ticket au distributeur.', [Language.EN]: 'I am buying a ticket at the machine.' }
  },
  {
    id: 'b1-9', word: 'Haushaltsgerät', type: WordType.NOUN, article: 'das', level: Level.B1,
    translation: { [Language.FR]: 'Appareil ménager', [Language.EN]: 'Household appliance', [Language.DE]: 'Haushaltsgerät' },
    components: { word1: 'Haushalt', word2: 'Gerät', linkingElement: 's' },
    declensions: { nominative: 'das Haushaltsgerät', genitive: 'des Haushaltsgeräts', dative: 'dem Haushaltsgerät', accusative: 'das Haushaltsgerät' },
    category: 'Maison',
    exampleSentence: 'Der Mixer ist ein nützliches Haushaltsgerät.',
    exampleTranslation: { [Language.FR]: 'Le mixeur est un appareil ménager utile.', [Language.EN]: 'The blender is a useful household appliance.' }
  },
  {
    id: 'b1-10', word: 'Lebensmittel', type: WordType.NOUN, article: 'das', level: Level.B1,
    translation: { [Language.FR]: 'Denrée alimentaire', [Language.EN]: 'Foodstuff', [Language.DE]: 'Lebensmittel' },
    components: { word1: 'Leben', word2: 'Mittel', linkingElement: 's' },
    declensions: { nominative: 'das Lebensmittel', genitive: 'des Lebensmittels', dative: 'dem Lebensmittel', accusative: 'das Lebensmittel' },
    category: 'Aliments',
    exampleSentence: 'Wir kaufen frische Lebensmittel auf dem Markt.',
    exampleTranslation: { [Language.FR]: 'Nous achetons des denrées alimentaires fraîches au marché.', [Language.EN]: 'We buy fresh food at the market.' }
  },
  {
    id: 'b1-adj-1', word: 'hilfsbereit', type: WordType.ADJECTIVE, level: Level.B1,
    translation: { [Language.FR]: 'Serviable', [Language.EN]: 'Helpful', [Language.DE]: 'hilfsbereit' },
    components: { word1: 'Hilfe', word2: 'bereit', linkingElement: 's' },
    category: 'Personnalité',
    exampleSentence: 'Meine Nachbarn sind sehr hilfsbereit.',
    exampleTranslation: { [Language.FR]: 'Mes voisins sont très serviables.', [Language.EN]: 'My neighbors are very helpful.' }
  },
  {
    id: 'b1-verb-1', word: 'vorbereiten', type: WordType.VERB, level: Level.B1,
    translation: { [Language.FR]: 'Préparer', [Language.EN]: 'To prepare', [Language.DE]: 'vorbereiten' },
    components: { word1: 'vor', word2: 'bereiten' },
    category: 'Travail',
    exampleSentence: 'Ich muss mich auf die Prüfung vorbereiten.',
    exampleTranslation: { [Language.FR]: 'Je dois me préparer pour l\'examen.', [Language.EN]: 'I have to prepare for the exam.' }
  },
  // B2
  {
    id: '16', word: 'Herausforderung', type: WordType.NOUN, article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Défi', [Language.EN]: 'Challenge', [Language.DE]: 'Herausforderung' },
    components: { word1: 'heraus', word2: 'Forderung' },
    declensions: { nominative: 'die Herausforderung', genitive: 'der Herausforderung', dative: 'der Herausforderung', accusative: 'die Herausforderung' },
    category: 'Abstrait',
    exampleSentence: 'Das neue Projekt ist eine große Herausforderung.',
    exampleTranslation: { [Language.FR]: 'Le nouveau projet est un grand défi.', [Language.EN]: 'The new project is a big challenge.' }
  },
  {
    id: '17', word: 'Verantwortung', type: WordType.NOUN, article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Responsabilité', [Language.EN]: 'Responsibility', [Language.DE]: 'Verantwortung' },
    components: { word1: 'verantwort', word2: 'ung' },
    declensions: { nominative: 'die Verantwortung', genitive: 'der Verantwortung', dative: 'der Verantwortung', accusative: 'die Verantwortung' },
    category: 'Abstrait',
    exampleSentence: 'Er trägt viel Verantwortung im Beruf.',
    exampleTranslation: { [Language.FR]: 'Il a beaucoup de responsabilités dans son travail.', [Language.EN]: 'He carries a lot of responsibility in his job.' }
  },
  {
    id: '18', word: 'Sehenswürdigkeit', type: WordType.NOUN, article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Curiosité touristique', [Language.EN]: 'Sight', [Language.DE]: 'Sehenswürdigkeit' },
    components: { word1: 'sehenswert', word2: 'keit' },
    declensions: { nominative: 'die Sehenswürdigkeit', genitive: 'der Sehenswürdigkeit', dative: 'der Sehenswürdigkeit', accusative: 'die Sehenswürdigkeit' },
    category: 'Tourisme',
    exampleSentence: 'Der Kölner Dom ist eine berühmte Sehenswürdigkeit.',
    exampleTranslation: { [Language.FR]: 'La cathédrale de Cologne est une curiosité touristique célèbre.', [Language.EN]: 'Cologne Cathedral is a famous sight.' }
  },
  {
    id: '19', word: 'Umweltverschmutzung', type: WordType.NOUN, article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Pollution de l\'environnement', [Language.EN]: 'Environmental pollution', [Language.DE]: 'Umweltverschmutzung' },
    components: { word1: 'Umwelt', word2: 'Verschmutzung' },
    declensions: { nominative: 'die Umweltverschmutzung', genitive: 'der Umweltverschmutzung', dative: 'der Umweltverschmutzung', accusative: 'die Umweltverschmutzung' },
    category: 'Environnement',
    exampleSentence: 'Wir müssen die Umweltverschmutzung reduzieren.',
    exampleTranslation: { [Language.FR]: 'Nous devons réduire la pollution de l\'environnement.', [Language.EN]: 'We must reduce environmental pollution.' }
  },
  {
    id: '20', word: 'Zusammenarbeit', type: WordType.NOUN, article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Collaboration', [Language.EN]: 'Collaboration', [Language.DE]: 'Zusammenarbeit' },
    components: { word1: 'zusammen', word2: 'Arbeit' },
    declensions: { nominative: 'die Zusammenarbeit', genitive: 'der Zusammenarbeit', dative: 'der Zusammenarbeit', accusative: 'die Zusammenarbeit' },
    category: 'Travail',
    exampleSentence: 'Die Zusammenarbeit im Team funktioniert gut.',
    exampleTranslation: { [Language.FR]: 'La collaboration au sein de l\'équipe fonctionne bien.', [Language.EN]: 'Collaboration within the team works well.' }
  },
  {
    id: '27', word: 'Nachhaltigkeit', type: WordType.NOUN, article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Durabilité', [Language.EN]: 'Sustainability', [Language.DE]: 'Nachhaltigkeit' },
    components: { word1: 'nachhalt', word2: 'keit' },
    declensions: { nominative: 'die Nachhaltigkeit', genitive: 'der Nachhaltigkeit', dative: 'der Nachhaltigkeit', accusative: 'die Nachhaltigkeit' },
    category: 'Environnement',
    exampleSentence: 'Nachhaltigkeit ist wichtig für unsere Zukunft.',
    exampleTranslation: { [Language.FR]: 'La durabilité est importante pour notre avenir.', [Language.EN]: 'Sustainability is important for our future.' }
  },
  {
    id: 'b2-7', word: 'Berufserfahrung', type: WordType.NOUN, article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Expérience professionnelle', [Language.EN]: 'Work experience', [Language.DE]: 'Berufserfahrung' },
    components: { word1: 'Beruf', word2: 'Erfahrung', linkingElement: 's' },
    declensions: { nominative: 'die Berufserfahrung', genitive: 'der Berufserfahrung', dative: 'die Berufserfahrung', accusative: 'die Berufserfahrung' },
    category: 'Travail',
    exampleSentence: 'Sie hat bereits viel Berufserfahrung gesammelt.',
    exampleTranslation: { [Language.FR]: 'Elle a déjà acquis beaucoup d\'expérience professionnelle.', [Language.EN]: 'She has already gained a lot of work experience.' }
  },
  {
    id: 'b2-8', word: 'Entwicklungsland', type: WordType.NOUN, article: 'das', level: Level.B2,
    translation: { [Language.FR]: 'Pays en développement', [Language.EN]: 'Developing country', [Language.DE]: 'Entwicklungsland' },
    components: { word1: 'Entwicklung', word2: 'Land', linkingElement: 's' },
    declensions: { nominative: 'das Entwicklungsland', genitive: 'des Entwicklungslandes', dative: 'dem Entwicklungsland', accusative: 'das Entwicklungsland' },
    category: 'Politique',
    exampleSentence: 'Dieses Land gilt als Entwicklungsland.',
    exampleTranslation: { [Language.FR]: 'Ce pays est considéré comme un pays en développement.', [Language.EN]: 'This country is considered a developing country.' }
  },
  {
    id: 'b2-9', word: 'Gleichberechtigung', type: WordType.NOUN, article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Égalité des droits', [Language.EN]: 'Equality', [Language.DE]: 'Gleichberechtigung' },
    components: { word1: 'gleich', word2: 'Berechtigung' },
    declensions: { nominative: 'die Gleichberechtigung', genitive: 'der Gleichberechtigung', dative: 'der Gleichberechtigung', accusative: 'die Gleichberechtigung' },
    category: 'Société',
    exampleSentence: 'Gleichberechtigung ist ein Menschenrecht.',
    exampleTranslation: { [Language.FR]: 'L\'égalité des droits est un droit de l\'homme.', [Language.EN]: 'Equality is a human right.' }
  },
  {
    id: 'b2-10', word: 'Wiedervereinigung', type: WordType.NOUN, article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Réunification', [Language.EN]: 'Reunification', [Language.DE]: 'Wiedervereinigung' },
    components: { word1: 'wieder', word2: 'Vereinigung' },
    declensions: { nominative: 'die Wiedervereinigung', genitive: 'der Wiedervereinigung', dative: 'der Wiedervereinigung', accusative: 'die Wiedervereinigung' },
    category: 'Histoire',
    exampleSentence: 'Die Wiedervereinigung Deutschlands war 1990.',
    exampleTranslation: { [Language.FR]: 'La réunification de l\'Allemagne a eu lieu en 1990.', [Language.EN]: 'The reunification of Germany was in 1990.' }
  },
  {
    id: 'b2-adj-1', word: 'umweltfreundlich', type: WordType.ADJECTIVE, level: Level.B2,
    translation: { [Language.FR]: 'Écologique', [Language.EN]: 'Eco-friendly', [Language.DE]: 'umweltfreundlich' },
    components: { word1: 'Umwelt', word2: 'freundlich' },
    category: 'Environnement',
    exampleSentence: 'Dieses Produkt ist umweltfreundlich verpackt.',
    exampleTranslation: { [Language.FR]: 'Ce produit est emballé de manière écologique.', [Language.EN]: 'This product is eco-friendly packaged.' }
  },
  {
    id: 'b2-verb-1', word: 'mitarbeiten', type: WordType.VERB, level: Level.B2,
    translation: { [Language.FR]: 'Collaborer', [Language.EN]: 'To collaborate', [Language.DE]: 'mitarbeiten' },
    components: { word1: 'mit', word2: 'arbeiten' },
    category: 'Travail',
    exampleSentence: 'Möchten Sie an diesem Projekt mitarbeiten?',
    exampleTranslation: { [Language.FR]: 'Souhaitez-vous collaborer à ce projet ?', [Language.EN]: 'Would you like to collaborate on this project?' }
  },
  // C1
  {
    id: '21', word: 'Wirtschaftswachstum', type: WordType.NOUN, article: 'das', level: Level.C1,
    translation: { [Language.FR]: 'Croissance économique', [Language.EN]: 'Economic growth', [Language.DE]: 'Wirtschaftswachstum' },
    components: { word1: 'Wirtschaft', word2: 'Wachstum', linkingElement: 's' },
    declensions: { nominative: 'das Wirtschaftswachstum', genitive: 'des Wirtschaftswachstums', dative: 'dem Wirtschaftswachstum', accusative: 'das Wirtschaftswachstum' },
    category: 'Économie',
    exampleSentence: 'Das Wirtschaftswachstum hat sich verlangsamt.',
    exampleTranslation: { [Language.FR]: 'La croissance économique a ralenti.', [Language.EN]: 'Economic growth has slowed down.' }
  },
  {
    id: '22', word: 'Auseinandersetzung', type: WordType.NOUN, article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Confrontation / Débat', [Language.EN]: 'Confrontation', [Language.DE]: 'Auseinandersetzung' },
    components: { word1: 'auseinander', word2: 'Setzung' },
    declensions: { nominative: 'die Auseinandersetzung', genitive: 'der Auseinandersetzung', dative: 'der Auseinandersetzung', accusative: 'die Auseinandersetzung' },
    category: 'Abstrait',
    exampleSentence: 'Es gab eine heftige Auseinandersetzung.',
    exampleTranslation: { [Language.FR]: 'Il y a eu une vive confrontation.', [Language.EN]: 'There was a fierce confrontation.' }
  },
  {
    id: '23', word: 'Gerechtigkeitsempfinden', type: WordType.NOUN, article: 'das', level: Level.C1,
    translation: { [Language.FR]: 'Sens de la justice', [Language.EN]: 'Sense of justice', [Language.DE]: 'Gerechtigkeitsempfinden' },
    components: { word1: 'Gerechtigkeit', word2: 'Empfinden', linkingElement: 's' },
    declensions: { nominative: 'das Gerechtigkeitsempfinden', genitive: 'des Gerechtigkeitsempfindens', dative: 'dem Gerechtigkeitsempfinden', accusative: 'das Gerechtigkeitsempfinden' },
    category: 'Psychologie',
    exampleSentence: 'Sein Gerechtigkeitsempfinden ist sehr stark.',
    exampleTranslation: { [Language.FR]: 'Son sens de la justice est très fort.', [Language.EN]: 'His sense of justice is very strong.' }
  },
  {
    id: '24', word: 'Selbstverwirklichung', type: WordType.NOUN, article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Épanouissement personnel', [Language.EN]: 'Self-fulfillment', [Language.DE]: 'Selbstverwirklichung' },
    components: { word1: 'Selbst', word2: 'Verwirklichung' },
    declensions: { nominative: 'die Selbstverwirklichung', genitive: 'der Selbstverwirklichung', dative: 'der Selbstverwirklichung', accusative: 'die Selbstverwirklichung' },
    category: 'Abstrait',
    exampleSentence: 'Arbeit dient auch der Selbstverwirklichung.',
    exampleTranslation: { [Language.FR]: 'Le travail sert aussi à l\'épanouissement personnel.', [Language.EN]: 'Work also serves self-fulfillment.' }
  },
  {
    id: '25', word: 'Entscheidungsfreiheit', type: WordType.NOUN, article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Liberté de décision', [Language.EN]: 'Freedom of choice', [Language.DE]: 'Entscheidungsfreiheit' },
    components: { word1: 'Entscheidung', word2: 'Freiheit', linkingElement: 's' },
    declensions: { nominative: 'die Entscheidungsfreiheit', genitive: 'der Entscheidungsfreiheit', dative: 'der Entscheidungsfreiheit', accusative: 'die Entscheidungsfreiheit' },
    category: 'Philosophie',
    exampleSentence: 'Wir schätzen unsere Entscheidungsfreiheit.',
    exampleTranslation: { [Language.FR]: 'Nous apprécions notre liberté de décision.', [Language.EN]: 'We value our freedom of choice.' }
  },
  {
    id: '28', word: 'Glaubwürdigkeit', type: WordType.NOUN, article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Crédibilité', [Language.EN]: 'Credibility', [Language.DE]: 'Glaubwürdigkeit' },
    components: { word1: 'glaubwürdig', word2: 'keit' },
    declensions: { nominative: 'die Glaubwürdigkeit', genitive: 'der Glaubwürdigkeit', dative: 'der Glaubwürdigkeit', accusative: 'die Glaubwürdigkeit' },
    category: 'Abstrait',
    exampleSentence: 'Die Glaubwürdigkeit des Politikers ist gesunken.',
    exampleTranslation: { [Language.FR]: 'La crédibilité du politicien a baissé.', [Language.EN]: 'The politician\'s credibility has decreased.' }
  },
  {
    id: 'c1-7', word: 'Verallgemeinerung', type: WordType.NOUN, article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Généralisation', [Language.EN]: 'Generalization', [Language.DE]: 'Verallgemeinerung' },
    components: { word1: 'allgemein', word2: 'erung' },
    declensions: { nominative: 'die Verallgemeinerung', genitive: 'der Verallgemeinerung', dative: 'der Verallgemeinerung', accusative: 'die Verallgemeinerung' },
    category: 'Abstrait',
    exampleSentence: 'Diese Verallgemeinerung ist unzulässig.',
    exampleTranslation: { [Language.FR]: 'Cette généralisation est inadmissible.', [Language.EN]: 'This generalization is inadmissible.' }
  },
  {
    id: 'c1-8', word: 'Voraussetzung', type: WordType.NOUN, article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Condition préalable', [Language.EN]: 'Prerequisite', [Language.DE]: 'Voraussetzung' },
    components: { word1: 'voraus', word2: 'Setzung' },
    declensions: { nominative: 'die Voraussetzung', genitive: 'der Voraussetzung', dative: 'der Voraussetzung', accusative: 'die Voraussetzung' },
    category: 'Abstrait',
    exampleSentence: 'Gute Sprachkenntnisse sind eine Voraussetzung.',
    exampleTranslation: { [Language.FR]: 'De bonnes connaissances linguistiques sont une condition préalable.', [Language.EN]: 'Good language skills are a prerequisite.' }
  },
  {
    id: 'c1-9', word: 'Wettbewerbsfähigkeit', type: WordType.NOUN, article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Compétitivité', [Language.EN]: 'Competitiveness', [Language.DE]: 'Wettbewerbsfähigkeit' },
    components: { word1: 'Wettbewerb', word2: 'Fähigkeit', linkingElement: 's' },
    declensions: { nominative: 'die Wettbewerbsfähigkeit', genitive: 'der Wettbewerbsfähigkeit', dative: 'der Wettbewerbsfähigkeit', accusative: 'die Wettbewerbsfähigkeit' },
    category: 'Économie',
    exampleSentence: 'Wir müssen unsere Wettbewerbsfähigkeit steigern.',
    exampleTranslation: { [Language.FR]: 'Nous devons accroître notre compétitivité.', [Language.EN]: 'We must increase our competitiveness.' }
  },
  {
    id: 'c1-10', word: 'Zukunftsperspektive', type: WordType.NOUN, article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Perspective d\'avenir', [Language.EN]: 'Future perspective', [Language.DE]: 'Zukunftsperspektive' },
    components: { word1: 'Zukunft', word2: 'Perspektive', linkingElement: 's' },
    declensions: { nominative: 'die Zukunftsperspektive', genitive: 'der Zukunftsperspektive', dative: 'der Zukunftsperspektive', accusative: 'die Zukunftsperspektive' },
    category: 'Abstrait',
    exampleSentence: 'Die Branche bietet gute Zukunftsperspektiven.',
    exampleTranslation: { [Language.FR]: 'Le secteur offre de bonnes perspectives d\'avenir.', [Language.EN]: 'The industry offers good future perspectives.' }
  },
  {
    id: 'c1-adj-1', word: 'zukunftsorientiert', type: WordType.ADJECTIVE, level: Level.C1,
    translation: { [Language.FR]: 'Tourné vers l\'avenir', [Language.EN]: 'Future-oriented', [Language.DE]: 'zukunftsorientiert' },
    components: { word1: 'Zukunft', word2: 'orientiert', linkingElement: 's' },
    category: 'Abstrait',
    exampleSentence: 'Wir brauchen zukunftsorientierte Lösungen.',
    exampleTranslation: { [Language.FR]: 'Nous avons besoin de solutions tournées vers l\'avenir.', [Language.EN]: 'We need future-oriented solutions.' }
  },
  {
    id: 'c1-verb-1', word: 'auseinandersetzen', type: WordType.VERB, level: Level.C1,
    translation: { [Language.FR]: 'Se confronter à', [Language.EN]: 'To deal with', [Language.DE]: 'auseinandersetzen' },
    components: { word1: 'auseinander', word2: 'setzen' },
    category: 'Abstrait',
    exampleSentence: 'Man muss sich mit dem Thema auseinandersetzen.',
    exampleTranslation: { [Language.FR]: 'Il faut se confronter au sujet.', [Language.EN]: 'One has to deal with the topic.' }
  },
];

export const generatePlacementTest = (): Exercise[] => {
  const testExercises: Exercise[] = [];
  const levels = [Level.A1, Level.A2, Level.B1, Level.B2, Level.C1];
  
  levels.forEach(lvl => {
    const lvlWords = MOCK_KOMPOSITA.filter(w => w.level === lvl);
    // Pick 4 random words for each level for a more robust test (total 16 questions)
    const selectedWords = [...lvlWords].sort(() => Math.random() - 0.5).slice(0, 4);
    
    selectedWords.forEach((word, idx) => {
      // Vary exercise types for the test
      const types = [
        ExerciseType.TRANSLATION, 
        ExerciseType.ARTICLE, 
        ExerciseType.DECOMPOSITION,
        ExerciseType.COMPOSITION,
        ExerciseType.LINKING_ELEMENT
      ];
      
      // If word doesn't have a linking element, don't ask for it
      let type = types[idx % types.length];
      if (type === ExerciseType.LINKING_ELEMENT && !word.components.linkingElement) {
        type = ExerciseType.TRANSLATION;
      }
      
      if (type === ExerciseType.TRANSLATION) {
        testExercises.push({
          id: `test-${lvl}-${word.id}-trans`,
          type: ExerciseType.TRANSLATION,
          question: `Comment dit-on "${word.translation[Language.FR]}" en allemand ?`,
          correctAnswer: word.word,
          options: [word.word, ...MOCK_KOMPOSITA.filter(w => w.id !== word.id).slice(0, 3).map(w => w.word)].sort(() => Math.random() - 0.5),
          explanation: lvl
        });
      } else if (type === ExerciseType.ARTICLE && word.type === WordType.NOUN) {
        testExercises.push({
          id: `test-${lvl}-${word.id}-art`,
          type: ExerciseType.ARTICLE,
          question: `Quel est l'article de "${word.word}" ?`,
          correctAnswer: word.article || '',
          options: ['der', 'die', 'das'].sort(() => Math.random() - 0.5),
          explanation: lvl
        });
      } else if (type === ExerciseType.DECOMPOSITION) {
        testExercises.push({
          id: `test-${lvl}-${word.id}-decomp`,
          type: ExerciseType.DECOMPOSITION,
          question: `Décomposez "${word.word}" (Mot1 + Mot2) :`,
          correctAnswer: `${word.components.word1} + ${word.components.word2}`,
          isQRO: true,
          explanation: lvl
        });
      } else if (type === ExerciseType.COMPOSITION) {
        testExercises.push({
          id: `test-${lvl}-${word.id}-comp`,
          type: ExerciseType.COMPOSITION,
          question: `Composez le mot : ${word.components.word1} + ${word.components.linkingElement || ''} + ${word.components.word2} = ?`,
          correctAnswer: word.word,
          isQRO: true,
          explanation: lvl
        });
      } else if (type === ExerciseType.LINKING_ELEMENT) {
        testExercises.push({
          id: `test-${lvl}-${word.id}-link`,
          type: ExerciseType.LINKING_ELEMENT,
          question: `Quel est l'élément de liaison dans "${word.word}" ?`,
          correctAnswer: word.components.linkingElement || 'Aucun',
          isQRO: true,
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
    // Select 3 words per lesson for more depth
    const wordsPool = levelWords.length >= 3 ? levelWords : fallbackWords;
    const startIndex = (i * 3) % wordsPool.length;
    
    const targetWords = [
      wordsPool[startIndex],
      wordsPool[(startIndex + 1) % wordsPool.length],
      wordsPool[(startIndex + 2) % wordsPool.length]
    ];
    
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

      // 2. Article (QCM) - Only for Nouns
      if (word.type === WordType.NOUN) {
        exercises.push({
          id: `ex-${i}-${wordIdx}-art`,
          type: ExerciseType.ARTICLE,
          question: `Quel est l'article de "${word.word}" ?`,
          correctAnswer: word.article || '',
          options: ['der', 'die', 'das'].sort(() => Math.random() - 0.5)
        });
      } else {
        // Replace with another translation or paraphrase for non-nouns
        exercises.push({
          id: `ex-${i}-${wordIdx}-para-2`,
          type: ExerciseType.PARAPHRASE,
          question: `Définition de "${word.word}" :`,
          correctAnswer: word.translation[Language.FR],
          options: [word.translation[Language.FR], ...MOCK_KOMPOSITA.filter(w => w.id !== word.id).slice(0, 3).map(w => w.translation[Language.FR])].sort(() => Math.random() - 0.5)
        });
      }

      // 3. Composition (QRO)
      exercises.push({
        id: `ex-${i}-${wordIdx}-comp`,
        type: ExerciseType.COMPOSITION,
        question: `Composez le mot : ${word.components.word1} + ${word.components.linkingElement || ''} + ${word.components.word2} = ?`,
        correctAnswer: word.word,
        isQRO: true
      });

      // 4. Decomposition (QRO)
      exercises.push({
        id: `ex-${i}-${wordIdx}-decomp`,
        type: ExerciseType.DECOMPOSITION,
        question: `Décomposez "${word.word}" (Mot1 + Mot2) :`,
        correctAnswer: `${word.components.word1} + ${word.components.word2}`,
        isQRO: true
      });

      // 5. Linking Element (QRO) or Paraphrase
      if (word.components.linkingElement) {
        exercises.push({
          id: `ex-${i}-${wordIdx}-link`,
          type: ExerciseType.LINKING_ELEMENT,
          question: `Quel est l'élément de liaison dans "${word.word}" ?`,
          correctAnswer: word.components.linkingElement,
          isQRO: true
        });
      } else {
        exercises.push({
          id: `ex-${i}-${wordIdx}-para`,
          type: ExerciseType.PARAPHRASE,
          question: `Quel mot correspond à : "${word.translation[Language.FR]}" ?`,
          correctAnswer: word.word,
          isQRO: true
        });
      }
    });

    const category = targetWords.every(w => w.category === targetWords[0].category) 
      ? targetWords[0].category 
      : 'Divers';

    return {
      id: i + 1,
      level,
      title: `${category}: ${targetWords.map(w => w.word).join(', ')}`,
      targetWords,
      isLocked: i >= 4,
      exercises: exercises.sort(() => Math.random() - 0.5).slice(0, 12) // 12 exercises per lesson
    };
  });
};
