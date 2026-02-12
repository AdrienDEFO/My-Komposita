
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Check, AlertCircle, Volume2, Star } from 'lucide-react';
import { Lesson, Kompositum, ExerciseType } from '../types';
import { updateUserProgress } from '../services/db';

interface LessonDetailProps {
  lesson: Lesson;
  onFinish: () => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, onFinish }) => {
  const [step, setStep] = useState<'intro1' | 'intro2' | 'exercises' | 'summary'>('intro1');
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  const currentExercise = lesson.exercises[exerciseIdx];

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // Auto-speak on intro steps
  useEffect(() => {
    if (step === 'intro1') speak(lesson.targetWords[0].word);
    if (step === 'intro2') speak(lesson.targetWords[1].word);
  }, [step]);

  const handleCheckAnswer = () => {
    const correct = selectedAnswer?.toLowerCase() === currentExercise.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      setPointsEarned(p => p + 10);
      speak(currentExercise.correctAnswer);
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    if (exerciseIdx < lesson.exercises.length - 1) {
      setExerciseIdx(prev => prev + 1);
    } else {
      setStep('summary');
    }
  };

  const finishLesson = () => {
    updateUserProgress(pointsEarned, 0, lesson.id, lesson.targetWords.map(w => w.id));
    onFinish();
  };

  const renderIntro = (word: Kompositum, onContinue: () => void) => (
    <div className="h-full flex flex-col p-6 animate-slide-up bg-white">
      <header className="flex justify-between items-center mb-12">
        <button onClick={onFinish} className="p-2 bg-slate-50 rounded-full"><X className="w-6 h-6 text-slate-400" /></button>
        <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Nouveau mot</span>
        <div className="w-10" />
      </header>
      
      <div className="flex-1 flex flex-col items-center text-center">
        <button 
          onClick={() => speak(word.word)}
          className={`w-28 h-28 rounded-[3rem] flex items-center justify-center mb-10 shadow-2xl transition-all btn-bounce active:scale-110 ${
            word.article === 'der' ? 'bg-blue-600 text-white shadow-blue-200' : 
            word.article === 'die' ? 'bg-red-500 text-white shadow-red-200' : 'bg-green-500 text-white shadow-green-200'
          }`}
        >
          <Volume2 className="w-12 h-12" />
        </button>
        
        <span className={`text-xl font-black uppercase mb-2 tracking-widest ${
          word.article === 'der' ? 'text-blue-600' : 
          word.article === 'die' ? 'text-red-500' : 'text-green-600'
        }`}>{word.article}</span>
        
        <h2 className="text-5xl font-black text-slate-900 mb-2 tracking-tight">{word.word}</h2>
        <p className="text-2xl text-slate-400 font-bold italic mb-12">{word.translation['Français']}</p>
        
        <div className="w-full bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Star className="w-12 h-12 text-slate-900" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Anatomie du mot</p>
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center">
              <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 font-black text-xl text-slate-700">{word.components.word1}</div>
              <span className="text-[8px] font-black text-slate-300 mt-2 uppercase">Base</span>
            </div>
            <span className="text-3xl font-black text-blue-600 mb-6">+</span>
            <div className="flex flex-col items-center">
              <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 font-black text-xl text-slate-700">{word.components.word2}</div>
              <span className="text-[8px] font-black text-slate-300 mt-2 uppercase">Déterminant</span>
            </div>
          </div>
        </div>
      </div>

      <button onClick={onContinue} className="w-full bg-blue-600 py-5 rounded-[2rem] text-white font-black text-lg shadow-xl shadow-blue-100 btn-bounce flex items-center justify-center gap-3">
        Suivant <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  );

  if (step === 'intro1') return renderIntro(lesson.targetWords[0], () => setStep('intro2'));
  if (step === 'intro2') return renderIntro(lesson.targetWords[1], () => setStep('exercises'));

  if (step === 'summary') {
    return (
      <div className="h-full bg-blue-600 flex flex-col items-center justify-center p-8 text-center animate-slide-up">
        <div className="w-32 h-32 bg-white/20 rounded-[3rem] flex items-center justify-center mb-8 backdrop-blur-md shadow-2xl">
          <Star className="w-16 h-16 text-yellow-300 fill-yellow-300" />
        </div>
        <h2 className="text-4xl font-black text-white mb-2">Bravo !</h2>
        <p className="text-blue-100 font-bold text-xl mb-12">Leçon maîtrisée • +{pointsEarned} XP</p>
        <button onClick={finishLesson} className="w-full bg-white py-5 rounded-[2rem] text-blue-600 font-black text-lg shadow-2xl btn-bounce active:scale-95">
          CONTINUER
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <header className="px-6 py-4 flex items-center gap-4">
        <button onClick={onFinish} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X className="w-6 h-6 text-slate-300" /></button>
        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-700 ease-out" 
            style={{ width: `${((exerciseIdx + 1) / lesson.exercises.length) * 100}%` }}
          />
        </div>
      </header>

      <div className="flex-1 p-6 overflow-y-auto">
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Défi {exerciseIdx + 1}/{lesson.exercises.length}</p>
        <h2 className="text-3xl font-black text-slate-800 mb-8 leading-tight">{currentExercise.question}</h2>

        <div className="space-y-4">
          {currentExercise.options?.map((opt, i) => (
            <button
              key={i}
              onClick={() => !showResult && setSelectedAnswer(opt)}
              className={`w-full p-6 rounded-[2rem] border-2 font-black text-left transition-all btn-bounce ${
                selectedAnswer === opt 
                  ? 'border-blue-600 bg-blue-50 text-blue-600' 
                  : 'border-slate-100 hover:border-slate-200 text-slate-600'
              } ${showResult && opt === currentExercise.correctAnswer ? '!border-green-500 !bg-green-50 !text-green-700' : (showResult && selectedAnswer === opt ? '!border-red-500 !bg-red-50 !text-red-700' : '')}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className={`p-8 border-t-[3px] rounded-t-[3rem] transition-colors duration-300 ${showResult ? (isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100') : 'bg-white border-transparent'}`}>
        {!showResult ? (
          <button 
            disabled={!selectedAnswer}
            onClick={handleCheckAnswer}
            className="w-full bg-blue-600 py-5 rounded-[2rem] text-white font-black text-lg shadow-xl shadow-blue-100 btn-bounce disabled:opacity-50 disabled:grayscale"
          >
            VÉRIFIER
          </button>
        ) : (
          <div className="animate-slide-up">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                {isCorrect ? <Check className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
              </div>
              <div>
                <span className={`text-xl font-black block leading-none ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? 'C\'est juste !' : 'Oups...'}
                </span>
                {!isCorrect && <p className="text-sm font-bold text-red-500 mt-1">Réponse : {currentExercise.correctAnswer}</p>}
              </div>
            </div>
            <button onClick={handleNext} className={`w-full py-5 rounded-[2rem] text-white font-black text-lg shadow-xl btn-bounce ${isCorrect ? 'bg-green-600 shadow-green-100' : 'bg-red-500 shadow-red-100'}`}>
              CONTINUER
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetail;
