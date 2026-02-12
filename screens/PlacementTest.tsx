
import React, { useState } from 'react';
import { Level } from '../types';
import { Target, Check, ArrowRight } from 'lucide-react';

interface PlacementTestProps {
  onComplete: (level: Level) => void;
}

const PlacementTest: React.FC<PlacementTestProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'welcome' | 'testing'>('welcome');
  const [currentQ, setCurrentQ] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // 20 Mock questions spanning A1 to C1
  const TEST_QUESTIONS = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    question: `Question de niveau ${i < 4 ? 'A1' : i < 8 ? 'A2' : i < 12 ? 'B1' : i < 16 ? 'B2' : 'C1'}: Que signifie ce mot composé?`,
    options: ["Option A", "Option B", "Correcte", "Option D"],
    correctIdx: 2
  }));

  const handleNext = () => {
    if (currentQ < 19) {
      setCurrentQ(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      // Determine level based on score
      let finalLvl = Level.A1;
      if (correctCount > 17) finalLvl = Level.C1;
      else if (correctCount > 13) finalLvl = Level.B2;
      else if (correctCount > 9) finalLvl = Level.B1;
      else if (correctCount > 5) finalLvl = Level.A2;
      onComplete(finalLvl);
    }
  };

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    if (idx === TEST_QUESTIONS[currentQ].correctIdx) {
      setCorrectCount(prev => prev + 1);
    }
  };

  if (step === 'welcome') {
    return (
      <div className="h-screen bg-blue-600 p-8 flex flex-col items-center justify-center text-white text-center">
        <Target className="w-20 h-20 mb-6 animate-pulse" />
        <h1 className="text-4xl font-black mb-4">Test d'Évaluation</h1>
        <p className="text-blue-100 mb-8 max-w-xs">
          Répondez à 20 questions pour que nous puissions déterminer votre niveau réel (A1 à C1).
        </p>
        <button 
          onClick={() => setStep('testing')}
          className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black text-lg shadow-2xl hover:bg-blue-50 active:scale-95 transition-all"
        >
          COMMENCER LE TEST
        </button>
        <button onClick={() => onComplete(Level.A1)} className="mt-6 text-blue-200 text-sm font-bold underline">
          Sauter le test (Niveau A1)
        </button>
      </div>
    );
  }

  const q = TEST_QUESTIONS[currentQ];

  return (
    <div className="h-screen bg-slate-50 flex flex-col max-w-md mx-auto">
      <div className="p-6 bg-white border-b flex items-center justify-between">
         <span className="font-black text-blue-600">Question {currentQ + 1}/20</span>
         <div className="flex-1 h-2 bg-slate-100 mx-4 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${((currentQ + 1) / 20) * 100}%` }} />
         </div>
      </div>

      <div className="flex-1 p-8 flex flex-col justify-center gap-8">
        <h2 className="text-2xl font-black text-slate-800 leading-tight">{q.question}</h2>
        
        <div className="grid grid-cols-1 gap-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`p-4 rounded-2xl border-2 font-bold text-left transition-all ${
                isAnswered 
                  ? i === q.correctIdx ? 'border-green-500 bg-green-50 text-green-700' : selectedOpt === i ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-100 opacity-50'
                  : selectedOpt === i ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white border-t">
        <button
          disabled={!isAnswered}
          onClick={handleNext}
          className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {currentQ < 19 ? 'Suivant' : 'Voir mon niveau'} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PlacementTest;
