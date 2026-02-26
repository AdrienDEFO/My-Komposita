
import React, { useState, useMemo } from 'react';
import { Level, Exercise } from '../types';
import { Zap, CheckCircle2, XCircle, X } from 'lucide-react';
import { generatePlacementTest } from '../constants';
import { completeLifeChallenge } from '../services/db';

interface LifeChallengeProps {
  onComplete: () => void;
  onCancel: () => void;
  userLevel: Level;
}

const LifeChallenge: React.FC<LifeChallengeProps> = ({ onComplete, onCancel, userLevel }) => {
  const [step, setStep] = useState<'welcome' | 'testing' | 'result'>('welcome');
  const [currentQ, setCurrentQ] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [qroValue, setQroValue] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  
  const testQuestions: Exercise[] = useMemo(() => {
    const allQuestions = generatePlacementTest();
    // Take 5 questions from the user's level or below
    const filtered = allQuestions.filter(q => {
        const levels = [Level.A1, Level.A2, Level.B1, Level.B2, Level.C1];
        return levels.indexOf(q.explanation as Level) <= levels.indexOf(userLevel);
    });
    return filtered.sort(() => Math.random() - 0.5).slice(0, 5);
  }, [userLevel]);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);
    
    const currentQuestion = testQuestions[currentQ];
    const isCorrect = currentQuestion.options?.[idx] === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setCorrectCount(c => c + 1);
    }
  };

  const handleQROSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnswered || !qroValue) return;
    setIsAnswered(true);
    
    const currentQuestion = testQuestions[currentQ];
    const isCorrect = qroValue.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
    
    if (isCorrect) {
      setCorrectCount(c => c + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < testQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setIsAnswered(false);
      setSelectedIdx(null);
      setQroValue('');
    } else {
      setStep('result');
    }
  };

  const handleFinish = () => {
    if (correctCount === testQuestions.length) {
      completeLifeChallenge();
    }
    onComplete();
  };

  if (step === 'welcome') {
    return (
      <div className="h-screen bg-red-600 flex flex-col items-center justify-center p-8 text-white text-center">
        <button onClick={onCancel} className="absolute top-8 left-8 p-2 bg-white/10 rounded-full"><X /></button>
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-8">
          <Zap className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-black mb-4">Défi de Survie</h1>
        <p className="text-red-100 mb-12 text-lg font-medium">
          Répondez correctement à 5 questions pour récupérer toutes vos vies immédiatement.
          <br/><span className="font-black">Attention : 100% de réussite requis !</span>
        </p>
        <button onClick={() => setStep('testing')} className="w-full max-w-xs bg-white text-red-600 py-5 rounded-[2rem] font-black text-xl shadow-2xl transform transition active:scale-95">COMMENCER</button>
      </div>
    );
  }

  if (step === 'result') {
    const isSuccess = correctCount === testQuestions.length;

    return (
      <div className="h-screen bg-red-600 flex flex-col items-center justify-center p-8 text-white text-center overflow-y-auto">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 ${isSuccess ? 'bg-green-400' : 'bg-white/20'}`}>
          {isSuccess ? <CheckCircle2 className="w-12 h-12 text-white" /> : <XCircle className="w-12 h-12 text-white" />}
        </div>
        <h1 className="text-4xl font-black mb-2">{isSuccess ? "Vies Récupérées !" : "Échec du Défi"}</h1>
        <p className="text-red-100 mb-8 text-xl font-bold">Score : {correctCount}/{testQuestions.length}</p>
        
        {isSuccess ? (
          <p className="mb-12 text-red-100 font-medium">Vous avez récupéré vos 5 vies. Bonne chance pour la suite !</p>
        ) : (
          <p className="mb-12 text-red-100 font-medium">Il vous faut un sans-faute pour réussir ce défi. Réessayez dans 48h ou attendez le rechargement automatique.</p>
        )}

        <button onClick={handleFinish} className="w-full max-w-xs bg-white text-red-600 py-5 rounded-[2rem] font-black text-xl shadow-2xl transform transition active:scale-95">RETOUR</button>
      </div>
    );
  }

  const currentQuestion = testQuestions[currentQ];

  return (
    <div className="h-screen bg-white flex flex-col">
      <header className="p-6 flex items-center gap-4 border-b">
        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-red-600 transition-all duration-500" style={{ width: `${((currentQ + 1) / testQuestions.length) * 100}%` }} />
        </div>
        <span className="text-red-600 font-black text-sm">{currentQ + 1}/{testQuestions.length}</span>
      </header>

      <div className="flex-1 p-8 flex flex-col justify-center">
        <div className="mb-8">
            <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block border border-red-100">Défi de Survie</span>
            <h2 className="text-3xl font-black text-slate-800 leading-tight">{currentQuestion.question}</h2>
        </div>

        {currentQuestion.isQRO ? (
          <form onSubmit={handleQROSubmit} className="space-y-4">
            <input
              type="text"
              value={qroValue}
              onChange={(e) => !isAnswered && setQroValue(e.target.value)}
              className={`w-full p-6 rounded-3xl border-4 text-xl font-bold outline-none transition-all ${
                isAnswered 
                  ? (qroValue.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim() ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                  : 'border-slate-100 focus:border-red-600'
              }`}
              placeholder="Votre réponse..."
              autoFocus
            />
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options?.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full p-5 rounded-2xl border-b-4 font-bold text-left text-lg transition-all ${
                  selectedIdx === i 
                    ? (opt === currentQuestion.correctAnswer ? 'border-green-600 bg-green-50 text-green-700' : 'border-red-600 bg-red-50 text-red-700')
                    : isAnswered && opt === currentQuestion.correctAnswer
                      ? 'border-green-600 bg-green-50 text-green-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>

      {isAnswered && (
        <div className="p-8 border-t bg-white animate-in slide-in-from-bottom duration-300">
          <button onClick={handleNext} className="w-full bg-red-600 py-5 rounded-[2rem] text-white font-black text-xl shadow-xl shadow-red-100">CONTINUER</button>
        </div>
      )}
    </div>
  );
};

export default LifeChallenge;
