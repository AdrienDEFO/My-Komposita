
import React, { useState } from 'react';
import { Level } from '../types.ts';
import { Target } from 'lucide-react';

interface PlacementTestProps {
  onComplete: (level: Level) => void;
}

const PlacementTest: React.FC<PlacementTestProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'welcome' | 'testing'>('welcome');
  const [currentQ, setCurrentQ] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const TEST_QUESTIONS = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    question: `Niveau ${i < 4 ? 'A1' : i < 8 ? 'A2' : i < 12 ? 'B1' : i < 16 ? 'B2' : 'C1'}: Traduction?`,
    options: ["Option A", "Option B", "Correct", "Option D"],
    correctIdx: 2
  }));

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    if (idx === TEST_QUESTIONS[currentQ].correctIdx) setCorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (currentQ < 19) {
      setCurrentQ(q => q + 1);
      setIsAnswered(false);
    } else {
      let finalLvl = Level.A1;
      if (correctCount > 17) finalLvl = Level.C1;
      else if (correctCount > 13) finalLvl = Level.B2;
      else if (correctCount > 9) finalLvl = Level.B1;
      else if (correctCount > 5) finalLvl = Level.A2;
      onComplete(finalLvl);
    }
  };

  if (step === 'welcome') {
    return (
      <div className="h-screen bg-blue-600 flex flex-col items-center justify-center p-8 text-white text-center">
        <Target className="w-16 h-16 mb-4" />
        <h1 className="text-3xl font-black mb-4">Test d'Évaluation</h1>
        <button onClick={() => setStep('testing')} className="bg-white text-blue-600 px-8 py-4 rounded-xl font-black">LANCER LE TEST</button>
        <button onClick={() => onComplete(Level.A1)} className="mt-6 text-blue-200 underline text-sm">Passer (Niveau A1)</button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <div className="p-6 bg-white border-b font-black text-blue-600 text-center">Question {currentQ + 1}/20</div>
      <div className="flex-1 p-8 flex flex-col justify-center gap-6">
        <h2 className="text-2xl font-black">{TEST_QUESTIONS[currentQ].question}</h2>
        <div className="grid gap-3">
          {TEST_QUESTIONS[currentQ].options.map((opt, i) => (
            <button key={i} onClick={() => handleSelect(i)} className={`p-4 border-2 rounded-xl font-bold text-left ${isAnswered && i === 2 ? 'border-green-500 bg-green-50' : 'border-slate-100'}`}>{opt}</button>
          ))}
        </div>
      </div>
      <div className="p-6 bg-white border-t">
        <button disabled={!isAnswered} onClick={handleNext} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black disabled:opacity-50">SUIVANT</button>
      </div>
    </div>
  );
};

export default PlacementTest;
