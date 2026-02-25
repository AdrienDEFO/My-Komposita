
import React, { useState } from 'react';
import { Level } from '../types';
import { Target, CheckCircle2 } from 'lucide-react';

interface PlacementTestProps {
  onComplete: (level: Level) => void;
}

const PlacementTest: React.FC<PlacementTestProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'welcome' | 'testing' | 'result'>('welcome');
  const [currentQ, setCurrentQ] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const TEST_QUESTIONS = [
    { q: "Comment dit-on 'Porte d'entrée'?", options: ["Haustür", "Hausfenster", "Haustisch", "Hausdach"], correct: 0, lvl: Level.A1 },
    { q: "Article de 'Apfelsaft'?", options: ["die", "das", "der", "den"], correct: 2, lvl: Level.A1 },
    { q: "Composition de 'Bahnhof'?", options: ["Bahn + Haus", "Bahn + Hof", "Zug + Hof", "Weg + Hof"], correct: 1, lvl: Level.A1 },
    { q: "Traduction de 'Handschuh'?", options: ["Chaussette", "Gant", "Chapeau", "Veste"], correct: 1, lvl: Level.A1 },
    { q: "Lien dans 'Kindergarten'?", options: ["-s-", "-n-", "-er-", "aucun"], correct: 2, lvl: Level.A2 },
    { q: "Article de 'Sonnenbrille'?", options: ["der", "das", "die", "des"], correct: 2, lvl: Level.A2 },
    { q: "Composition de 'Fahrrad'?", options: ["Fahr + Rad", "Auto + Rad", "Geh + Rad", "Lauf + Rad"], correct: 0, lvl: Level.A2 },
    { q: "Traduction de 'Kühlschrank'?", options: ["Four", "Micro-ondes", "Réfrigérateur", "Lave-vaisselle"], correct: 2, lvl: Level.B1 },
    { q: "Article de 'Schreibtisch'?", options: ["die", "der", "das", "den"], correct: 1, lvl: Level.B1 },
    { q: "Composition de 'Wohnzimmer'?", options: ["Wohn + Haus", "Wohn + Zimmer", "Schlaf + Zimmer", "Bad + Zimmer"], correct: 1, lvl: Level.B1 },
  ];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);
    if (idx === TEST_QUESTIONS[currentQ].correct) setCorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (currentQ < TEST_QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
      setIsAnswered(false);
      setSelectedIdx(null);
    } else {
      setStep('result');
    }
  };

  const getFinalLevel = () => {
    if (correctCount >= 9) return Level.B2;
    if (correctCount >= 7) return Level.B1;
    if (correctCount >= 4) return Level.A2;
    return Level.A1;
  };

  if (step === 'welcome') {
    return (
      <div className="h-screen bg-blue-600 flex flex-col items-center justify-center p-8 text-white text-center">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-8">
          <Target className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-black mb-4">Test d'Évaluation</h1>
        <p className="text-blue-100 mb-12 text-lg font-medium">Déterminons votre niveau actuel pour personnaliser votre apprentissage.</p>
        <button onClick={() => setStep('testing')} className="w-full max-w-xs bg-white text-blue-600 py-5 rounded-[2rem] font-black text-xl shadow-2xl transform transition active:scale-95">COMMENCER</button>
        <button onClick={() => onComplete(Level.A1)} className="mt-8 text-blue-200 underline font-bold">Passer le test (Niveau A1)</button>
      </div>
    );
  }

  if (step === 'result') {
    const finalLvl = getFinalLevel();
    return (
      <div className="h-screen bg-blue-600 flex flex-col items-center justify-center p-8 text-white text-center">
        <CheckCircle2 className="w-24 h-24 text-green-400 mb-8" />
        <h1 className="text-4xl font-black mb-2">Test Terminé !</h1>
        <p className="text-blue-100 mb-8 text-xl font-bold">Votre score : {correctCount}/{TEST_QUESTIONS.length}</p>
        
        <div className="bg-white/10 p-8 rounded-[3rem] mb-12 w-full max-w-sm">
          <p className="text-blue-200 uppercase tracking-widest font-black text-sm mb-2">Niveau suggéré</p>
          <p className="text-6xl font-black">{finalLvl}</p>
        </div>

        <button onClick={() => onComplete(finalLvl)} className="w-full max-w-xs bg-white text-blue-600 py-5 rounded-[2rem] font-black text-xl shadow-2xl transform transition active:scale-95">DÉMARRER L'AVENTURE</button>
      </div>
    );
  }

  const currentQuestion = TEST_QUESTIONS[currentQ];

  return (
    <div className="h-screen bg-white flex flex-col">
      <header className="px-6 py-6 flex items-center gap-4 border-b">
        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${((currentQ + 1) / TEST_QUESTIONS.length) * 100}%` }} />
        </div>
        <span className="font-black text-slate-400">{currentQ + 1}/{TEST_QUESTIONS.length}</span>
      </header>

      <div className="flex-1 p-8 flex flex-col">
        <h2 className="text-3xl font-black text-slate-800 mb-12 leading-tight">{currentQuestion.q}</h2>
        
        <div className="grid gap-4">
          {currentQuestion.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`p-6 border-2 rounded-3xl font-bold text-left text-xl transition-all ${
                isAnswered 
                  ? (i === currentQuestion.correct 
                      ? 'border-green-500 bg-green-50 text-green-700' 
                      : (selectedIdx === i ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-100 text-slate-300'))
                  : (selectedIdx === i ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-700 hover:bg-slate-50')
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 border-t">
        <button 
          disabled={!isAnswered} 
          onClick={handleNext} 
          className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black text-xl shadow-xl shadow-blue-100 disabled:opacity-30 transform transition active:scale-95"
        >
          {currentQ === TEST_QUESTIONS.length - 1 ? 'VOIR LE RÉSULTAT' : 'SUIVANT'}
        </button>
      </div>
    </div>
  );
};

export default PlacementTest;
