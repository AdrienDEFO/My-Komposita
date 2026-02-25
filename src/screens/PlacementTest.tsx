
import React, { useState, useMemo } from 'react';
import { Level, Exercise } from '../types';
import { Target, CheckCircle2 } from 'lucide-react';
import { generatePlacementTest } from '../constants';

interface PlacementTestProps {
  onComplete: (level: Level) => void;
}

const PlacementTest: React.FC<PlacementTestProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'welcome' | 'testing' | 'result'>('welcome');
  const [currentQ, setCurrentQ] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [qroValue, setQroValue] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Track correct answers per level
  const [levelScores, setLevelScores] = useState<Record<string, number>>({
    [Level.A1]: 0,
    [Level.A2]: 0,
    [Level.B1]: 0,
    [Level.B2]: 0,
    [Level.C1]: 0
  });

  const testQuestions: Exercise[] = useMemo(() => generatePlacementTest(), []);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);
    
    const currentQuestion = testQuestions[currentQ];
    const isCorrect = currentQuestion.options?.[idx] === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setCorrectCount(c => c + 1);
      const lvl = currentQuestion.explanation as Level;
      if (lvl) {
        setLevelScores(prev => ({ ...prev, [lvl]: prev[lvl] + 1 }));
      }
    }
  };

  const handleCheckQRO = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    
    const currentQuestion = testQuestions[currentQ];
    const isCorrect = qroValue.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
    
    if (isCorrect) {
      setCorrectCount(c => c + 1);
      const lvl = currentQuestion.explanation as Level;
      if (lvl) {
        setLevelScores(prev => ({ ...prev, [lvl]: prev[lvl] + 1 }));
      }
    }
  };

  const handleNext = () => {
    if (currentQ < testQuestions.length - 1) {
      setCurrentQ(q => q + 1);
      setIsAnswered(false);
      setSelectedIdx(null);
      setQroValue('');
    } else {
      setStep('result');
    }
  };

  const getFinalLevel = () => {
    // Logic: If user got at least 3/4 correct in a level, they pass that level
    if (levelScores[Level.C1] >= 3) return Level.C1;
    if (levelScores[Level.B2] >= 3) return Level.B2;
    if (levelScores[Level.B1] >= 3) return Level.B1;
    if (levelScores[Level.A2] >= 3) return Level.A2;
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
        <p className="text-blue-100 mb-8 text-xl font-bold">Votre score : {correctCount}/{testQuestions.length}</p>
        
        <div className="bg-white/10 p-8 rounded-[3rem] mb-12 w-full max-w-sm">
          <p className="text-blue-200 uppercase tracking-widest font-black text-sm mb-2">Niveau suggéré</p>
          <p className="text-6xl font-black">{finalLvl}</p>
        </div>

        <button onClick={() => onComplete(finalLvl)} className="w-full max-w-xs bg-white text-blue-600 py-5 rounded-[2rem] font-black text-xl shadow-2xl transform transition active:scale-95">DÉMARRER L'AVENTURE</button>
      </div>
    );
  }

  const currentQuestion = testQuestions[currentQ];

  return (
    <div className="h-screen bg-white flex flex-col">
      <header className="px-6 py-6 flex items-center gap-4 border-b">
        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${((currentQ + 1) / testQuestions.length) * 100}%` }} />
        </div>
        <span className="font-black text-slate-400">{currentQ + 1}/{testQuestions.length}</span>
      </header>

      <div className="flex-1 p-8 flex flex-col">
        <h2 className="text-3xl font-black text-slate-800 mb-12 leading-tight">{currentQuestion.question}</h2>
        
        {currentQuestion.isQRO ? (
          <div className="space-y-4">
            <input
              type="text"
              value={qroValue}
              onChange={(e) => !isAnswered && setQroValue(e.target.value)}
              placeholder="Tapez votre réponse..."
              className={`w-full p-6 rounded-3xl border-4 text-xl font-bold outline-none transition-all ${
                isAnswered 
                  ? (qroValue.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim() ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                  : 'border-slate-100 focus:border-blue-600'
              }`}
              autoFocus
            />
            {isAnswered && qroValue.toLowerCase().trim() !== currentQuestion.correctAnswer.toLowerCase().trim() && (
              <p className="text-red-500 font-bold px-2">Réponse correcte : <span className="underline">{currentQuestion.correctAnswer}</span></p>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {currentQuestion.options?.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`p-6 border-2 rounded-3xl font-bold text-left text-xl transition-all ${
                  isAnswered 
                    ? (opt === currentQuestion.correctAnswer 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : (selectedIdx === i ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-100 text-slate-300'))
                    : (selectedIdx === i ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-700 hover:bg-slate-50')
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-8 border-t">
        {!isAnswered && currentQuestion.isQRO ? (
          <button 
            disabled={!qroValue} 
            onClick={handleCheckQRO} 
            className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black text-xl shadow-xl shadow-blue-100 disabled:opacity-30 transform transition active:scale-95"
          >
            VÉRIFIER
          </button>
        ) : (
          <button 
            disabled={!isAnswered} 
            onClick={handleNext} 
            className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black text-xl shadow-xl shadow-blue-100 disabled:opacity-30 transform transition active:scale-95"
          >
            {currentQ === testQuestions.length - 1 ? 'VOIR LE RÉSULTAT' : 'SUIVANT'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PlacementTest;
