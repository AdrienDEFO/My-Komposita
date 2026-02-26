
import { Level, Kompositum, Lesson, ExerciseType, Language, Exercise } from './types';

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
    id: 'a1-6', word: 'Schulbuch', article: 'das', level: Level.A1,
    translation: { [Language.FR]: 'Livre scolaire', [Language.EN]: 'School book', [Language.DE]: 'Schulbuch' },
    components: { word1: 'Schule', word2: 'Buch' },
    declensions: { nominative: 'das Schulbuch', genitive: 'des Schulbuchs', dative: 'dem Schulbuch', accusative: 'das Schulbuch' },
    category: 'Éducation'
  },
  {
    id: 'a1-7', word: 'Wasserglas', article: 'das', level: Level.A1,
    translation: { [Language.FR]: 'Verre d\'eau', [Language.EN]: 'Water glass', [Language.DE]: 'Wasserglas' },
    components: { word1: 'Wasser', word2: 'Glas' },
    declensions: { nominative: 'das Wasserglas', genitive: 'des Wasserglases', dative: 'dem Wasserglas', accusative: 'das Wasserglas' },
    category: 'Maison'
  },
  {
    id: 'a1-8', word: 'Tischlampe', article: 'die', level: Level.A1,
    translation: { [Language.FR]: 'Lampe de table', [Language.EN]: 'Table lamp', [Language.DE]: 'Tischlampe' },
    components: { word1: 'Tisch', word2: 'Lampe' },
    declensions: { nominative: 'die Tischlampe', genitive: 'der Tischlampe', dative: 'der Tischlampe', accusative: 'die Tischlampe' },
    category: 'Maison'
  },
  {
    id: 'a1-9', word: 'Fußball', article: 'der', level: Level.A1,
    translation: { [Language.FR]: 'Ballon de football', [Language.EN]: 'Football', [Language.DE]: 'Fußball' },
    components: { word1: 'Fuß', word2: 'Ball' },
    declensions: { nominative: 'der Fußball', genitive: 'des Fußballs', dative: 'dem Fußball', accusative: 'den Fußball' },
    category: 'Sport'
  },
  {
    id: 'a1-10', word: 'Wochenende', article: 'das', level: Level.A1,
    translation: { [Language.FR]: 'Week-end', [Language.EN]: 'Weekend', [Language.DE]: 'Wochenende' },
    components: { word1: 'Woche', word2: 'Ende' },
    declensions: { nominative: 'das Wochenende', genitive: 'des Wochenendes', dative: 'dem Wochenende', accusative: 'das Wochenende' },
    category: 'Temps'
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
  {
    id: 'a2-6', word: 'Reisepass', article: 'der', level: Level.A2,
    translation: { [Language.FR]: 'Passeport', [Language.EN]: 'Passport', [Language.DE]: 'Reisepass' },
    components: { word1: 'Reise', word2: 'Pass' },
    declensions: { nominative: 'der Reisepass', genitive: 'des Reisepasses', dative: 'dem Reisepass', accusative: 'den Reisepass' },
    category: 'Voyage'
  },
  {
    id: 'a2-7', word: 'Bücherregal', article: 'das', level: Level.A2,
    translation: { [Language.FR]: 'Bibliothèque (meuble)', [Language.EN]: 'Bookshelf', [Language.DE]: 'Bücherregal' },
    components: { word1: 'Bücher', word2: 'Regal' },
    declensions: { nominative: 'das Bücherregal', genitive: 'des Bücherregals', dative: 'dem Bücherregal', accusative: 'das Bücherregal' },
    category: 'Maison'
  },
  {
    id: 'a2-8', word: 'Kreditkarte', article: 'die', level: Level.A2,
    translation: { [Language.FR]: 'Carte de crédit', [Language.EN]: 'Credit card', [Language.DE]: 'Kreditkarte' },
    components: { word1: 'Kredit', word2: 'Karte' },
    declensions: { nominative: 'die Kreditkarte', genitive: 'der Kreditkarte', dative: 'der Kreditkarte', accusative: 'die Kreditkarte' },
    category: 'Finance'
  },
  {
    id: 'a2-9', word: 'Mülltonne', article: 'die', level: Level.A2,
    translation: { [Language.FR]: 'Poubelle', [Language.EN]: 'Dustbin', [Language.DE]: 'Mülltonne' },
    components: { word1: 'Müll', word2: 'Tonne' },
    declensions: { nominative: 'die Mülltonne', genitive: 'der Mülltonne', dative: 'der Mülltonne', accusative: 'die Mülltonne' },
    category: 'Maison'
  },
  {
    id: 'a2-10', word: 'Parkplatz', article: 'der', level: Level.A2,
    translation: { [Language.FR]: 'Place de parking', [Language.EN]: 'Parking space', [Language.DE]: 'Parkplatz' },
    components: { word1: 'Park', word2: 'Platz' },
    declensions: { nominative: 'der Parkplatz', genitive: 'des Parkplatzes', dative: 'dem Parkplatz', accusative: 'den Parkplatz' },
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
  {
    id: '26', word: 'Kaffeemaschine', article: 'die', level: Level.B1,
    translation: { [Language.FR]: 'Machine à café', [Language.EN]: 'Coffee machine', [Language.DE]: 'Kaffeemaschine' },
    components: { word1: 'Kaffee', word2: 'Maschine' },
    declensions: { nominative: 'die Kaffeemaschine', genitive: 'der Kaffeemaschine', dative: 'der Kaffeemaschine', accusative: 'die Kaffeemaschine' },
    category: 'Aliments'
  },
  {
    id: 'b1-7', word: 'Zahnarzt', article: 'der', level: Level.B1,
    translation: { [Language.FR]: 'Dentiste', [Language.EN]: 'Dentist', [Language.DE]: 'Zahnarzt' },
    components: { word1: 'Zahn', word2: 'Arzt' },
    declensions: { nominative: 'der Zahnarzt', genitive: 'des Zahnarztes', dative: 'dem Zahnarzt', accusative: 'den Zahnarzt' },
    category: 'Santé'
  },
  {
    id: 'b1-8', word: 'Fahrkarte', article: 'die', level: Level.B1,
    translation: { [Language.FR]: 'Ticket de transport', [Language.EN]: 'Ticket', [Language.DE]: 'Fahrkarte' },
    components: { word1: 'Fahr', word2: 'Karte' },
    declensions: { nominative: 'die Fahrkarte', genitive: 'der Fahrkarte', dative: 'der Fahrkarte', accusative: 'die Fahrkarte' },
    category: 'Transport'
  },
  {
    id: 'b1-9', word: 'Haushaltsgerät', article: 'das', level: Level.B1,
    translation: { [Language.FR]: 'Appareil ménager', [Language.EN]: 'Household appliance', [Language.DE]: 'Haushaltsgerät' },
    components: { word1: 'Haushalt', word2: 'Gerät', linkingElement: 's' },
    declensions: { nominative: 'das Haushaltsgerät', genitive: 'des Haushaltsgeräts', dative: 'dem Haushaltsgerät', accusative: 'das Haushaltsgerät' },
    category: 'Maison'
  },
  {
    id: 'b1-10', word: 'Lebensmittel', article: 'das', level: Level.B1,
    translation: { [Language.FR]: 'Denrée alimentaire', [Language.EN]: 'Foodstuff', [Language.DE]: 'Lebensmittel' },
    components: { word1: 'Leben', word2: 'Mittel', linkingElement: 's' },
    declensions: { nominative: 'das Lebensmittel', genitive: 'des Lebensmittels', dative: 'dem Lebensmittel', accusative: 'das Lebensmittel' },
    category: 'Aliments'
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
  },
  {
    id: '27', word: 'Nachhaltigkeit', article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Durabilité', [Language.EN]: 'Sustainability', [Language.DE]: 'Nachhaltigkeit' },
    components: { word1: 'nachhalt', word2: 'keit' },
    declensions: { nominative: 'die Nachhaltigkeit', genitive: 'der Nachhaltigkeit', dative: 'der Nachhaltigkeit', accusative: 'die Nachhaltigkeit' },
    category: 'Environnement'
  },
  {
    id: 'b2-7', word: 'Berufserfahrung', article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Expérience professionnelle', [Language.EN]: 'Work experience', [Language.DE]: 'Berufserfahrung' },
    components: { word1: 'Beruf', word2: 'Erfahrung', linkingElement: 's' },
    declensions: { nominative: 'die Berufserfahrung', genitive: 'der Berufserfahrung', dative: 'der Berufserfahrung', accusative: 'die Berufserfahrung' },
    category: 'Travail'
  },
  {
    id: 'b2-8', word: 'Entwicklungsland', article: 'das', level: Level.B2,
    translation: { [Language.FR]: 'Pays en développement', [Language.EN]: 'Developing country', [Language.DE]: 'Entwicklungsland' },
    components: { word1: 'Entwicklung', word2: 'Land', linkingElement: 's' },
    declensions: { nominative: 'das Entwicklungsland', genitive: 'des Entwicklungslandes', dative: 'dem Entwicklungsland', accusative: 'das Entwicklungsland' },
    category: 'Politique'
  },
  {
    id: 'b2-9', word: 'Gleichberechtigung', article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Égalité des droits', [Language.EN]: 'Equality', [Language.DE]: 'Gleichberechtigung' },
    components: { word1: 'gleich', word2: 'Berechtigung' },
    declensions: { nominative: 'die Gleichberechtigung', genitive: 'der Gleichberechtigung', dative: 'der Gleichberechtigung', accusative: 'die Gleichberechtigung' },
    category: 'Société'
  },
  {
    id: 'b2-10', word: 'Wiedervereinigung', article: 'die', level: Level.B2,
    translation: { [Language.FR]: 'Réunification', [Language.EN]: 'Reunification', [Language.DE]: 'Wiedervereinigung' },
    components: { word1: 'wieder', word2: 'Vereinigung' },
    declensions: { nominative: 'die Wiedervereinigung', genitive: 'der Wiedervereinigung', dative: 'der Wiedervereinigung', accusative: 'die Wiedervereinigung' },
    category: 'Histoire'
  },
  // C1
  {
    id: '21', word: 'Wirtschaftswachstum', article: 'das', level: Level.C1,
    translation: { [Language.FR]: 'Croissance économique', [Language.EN]: 'Economic growth', [Language.DE]: 'Wirtschaftswachstum' },
    components: { word1: 'Wirtschaft', word2: 'Wachstum', linkingElement: 's' },
    declensions: { nominative: 'das Wirtschaftswachstum', genitive: 'des Wirtschaftswachstums', dative: 'dem Wirtschaftswachstum', accusative: 'das Wirtschaftswachstum' },
    category: 'Économie'
  },
  {
    id: '22', word: 'Auseinandersetzung', article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Confrontation / Débat', [Language.EN]: 'Confrontation', [Language.DE]: 'Auseinandersetzung' },
    components: { word1: 'auseinander', word2: 'Setzung' },
    declensions: { nominative: 'die Auseinandersetzung', genitive: 'der Auseinandersetzung', dative: 'der Auseinandersetzung', accusative: 'die Auseinandersetzung' },
    category: 'Abstrait'
  },
  {
    id: '23', word: 'Gerechtigkeitsempfinden', article: 'das', level: Level.C1,
    translation: { [Language.FR]: 'Sens de la justice', [Language.EN]: 'Sense of justice', [Language.DE]: 'Gerechtigkeitsempfinden' },
    components: { word1: 'Gerechtigkeit', word2: 'Empfinden', linkingElement: 's' },
    declensions: { nominative: 'das Gerechtigkeitsempfinden', genitive: 'des Gerechtigkeitsempfindens', dative: 'dem Gerechtigkeitsempfinden', accusative: 'das Gerechtigkeitsempfinden' },
    category: 'Psychologie'
  },
  {
    id: '24', word: 'Selbstverwirklichung', article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Épanouissement personnel', [Language.EN]: 'Self-fulfillment', [Language.DE]: 'Selbstverwirklichung' },
    components: { word1: 'Selbst', word2: 'Verwirklichung' },
    declensions: { nominative: 'die Selbstverwirklichung', genitive: 'der Selbstverwirklichung', dative: 'der Selbstverwirklichung', accusative: 'die Selbstverwirklichung' },
    category: 'Abstrait'
  },
  {
    id: '25', word: 'Entscheidungsfreiheit', article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Liberté de décision', [Language.EN]: 'Freedom of choice', [Language.DE]: 'Entscheidungsfreiheit' },
    components: { word1: 'Entscheidung', word2: 'Freiheit', linkingElement: 's' },
    declensions: { nominative: 'die Entscheidungsfreiheit', genitive: 'der Entscheidungsfreiheit', dative: 'der Entscheidungsfreiheit', accusative: 'die Entscheidungsfreiheit' },
    category: 'Philosophie'
  },
  {
    id: '28', word: 'Glaubwürdigkeit', article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Crédibilité', [Language.EN]: 'Credibility', [Language.DE]: 'Glaubwürdigkeit' },
    components: { word1: 'glaubwürdig', word2: 'keit' },
    declensions: { nominative: 'die Glaubwürdigkeit', genitive: 'der Glaubwürdigkeit', dative: 'der Glaubwürdigkeit', accusative: 'die Glaubwürdigkeit' },
    category: 'Abstrait'
  },
  {
    id: 'c1-7', word: 'Verallgemeinerung', article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Généralisation', [Language.EN]: 'Generalization', [Language.DE]: 'Verallgemeinerung' },
    components: { word1: 'allgemein', word2: 'erung' },
    declensions: { nominative: 'die Verallgemeinerung', genitive: 'der Verallgemeinerung', dative: 'der Verallgemeinerung', accusative: 'die Verallgemeinerung' },
    category: 'Abstrait'
  },
  {
    id: 'c1-8', word: 'Voraussetzung', article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Condition préalable', [Language.EN]: 'Prerequisite', [Language.DE]: 'Voraussetzung' },
    components: { word1: 'voraus', word2: 'Setzung' },
    declensions: { nominative: 'die Voraussetzung', genitive: 'der Voraussetzung', dative: 'der Voraussetzung', accusative: 'die Voraussetzung' },
    category: 'Abstrait'
  },
  {
    id: 'c1-9', word: 'Wettbewerbsfähigkeit', article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Compétitivité', [Language.EN]: 'Competitiveness', [Language.DE]: 'Wettbewerbsfähigkeit' },
    components: { word1: 'Wettbewerb', word2: 'Fähigkeit', linkingElement: 's' },
    declensions: { nominative: 'die Wettbewerbsfähigkeit', genitive: 'der Wettbewerbsfähigkeit', dative: 'der Wettbewerbsfähigkeit', accusative: 'die Wettbewerbsfähigkeit' },
    category: 'Économie'
  },
  {
    id: 'c1-10', word: 'Zukunftsperspektive', article: 'die', level: Level.C1,
    translation: { [Language.FR]: 'Perspective d\'avenir', [Language.EN]: 'Future perspective', [Language.DE]: 'Zukunftsperspektive' },
    components: { word1: 'Zukunft', word2: 'Perspektive', linkingElement: 's' },
    declensions: { nominative: 'die Zukunftsperspektive', genitive: 'der Zukunftsperspektive', dative: 'der Zukunftsperspektive', accusative: 'die Zukunftsperspektive' },
    category: 'Abstrait'
  }
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
      } else if (type === ExerciseType.ARTICLE) {
        testExercises.push({
          id: `test-${lvl}-${word.id}-art`,
          type: ExerciseType.ARTICLE,
          question: `Quel est l'article de "${word.word}" ?`,
          correctAnswer: word.article,
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
