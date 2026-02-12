
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Check, AlertCircle, Volume2, Star } from 'lucide-react';
import { Lesson, Kompositum, ExerciseType } from '../types.ts';
import { updateUserProgress } from '../services/db.ts';

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

  if (step === 'summary') {
    return (
      <div className="h-full bg-blue-600 flex flex-col items-center justify-center p-8 text-center">
        <Star className="w-16 h-16 text-yellow-300 fill-yellow-300 mb-6" />
        <h2 className="text-4xl font-black text-white mb-2">Bravo !</h2>
        <p className="text-blue-100 font-bold text-xl mb-12">Leçon maîtrisée • +{pointsEarned} XP</p>
        <button onClick={finishLesson} className="w-full bg-white py-5 rounded-[2rem] text-blue-600 font-black text-lg">CONTINUER</button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="px-6 py-4 flex items-center gap-4 border-b">
        <button onClick={onFinish} className="p-2"><X className="w-6 h-6 text-slate-300" /></button>
        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 transition-all" style={{ width: `${((exerciseIdx + 1) / lesson.exercises.length) * 100}%` }} />
        </div>
      </header>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-black text-slate-800 mb-8">{currentExercise.question}</h2>
        <div className="space-y-3">
          {currentExercise.options?.map((opt, i) => (
            <button
              key={i}
              onClick={() => !showResult && setSelectedAnswer(opt)}
              className={`w-full p-4 rounded-2xl border-2 font-bold text-left ${
                selectedAnswer === opt ? 'border-blue-600 bg-blue-50' : 'border-slate-100'
              } ${showResult && opt === currentExercise.correctAnswer ? '!border-green-500 !bg-green-50' : ''}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6 border-t">
        {!showResult ? (
          <button disabled={!selectedAnswer} onClick={handleCheckAnswer} className="w-full bg-blue-600 py-4 rounded-2xl text-white font-black disabled:opacity-50">VÉRIFIER</button>
        ) : (
          <button onClick={handleNext} className={`w-full py-4 rounded-2xl text-white font-black ${isCorrect ? 'bg-green-600' : 'bg-red-500'}`}>CONTINUER</button>
        )}
      </div>
    </div>
  );
};

export default LessonDetail;
