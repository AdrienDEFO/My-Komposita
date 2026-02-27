
import React, { useState, useEffect, useRef } from 'react';
import { X, Star, Volume2, VolumeX, CheckCircle2, XCircle } from 'lucide-react';
import { Lesson, User, Language } from '../types';
import { updateUserProgress } from '../services/db';

interface LessonDetailProps {
  lesson: Lesson;
  onFinish: () => void;
  user: User | null;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, onFinish, user }) => {
  const [step, setStep] = useState<'intro1' | 'intro2' | 'intro3' | 'exercises' | 'summary'>('intro1');
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [qroValue, setQroValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [lives, setLives] = useState(user?.lives || 5);
  const [isMuted, setIsMuted] = useState(false);

  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const correctSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'));
  const incorrectSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3'));

  const currentExercise = lesson.exercises[exerciseIdx];

  const speak = (text: string) => {
    if (isMuted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Background music setup
    bgMusicRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.1;
    
    if (!isMuted) {
      bgMusicRef.current.play().catch(() => console.log("Autoplay blocked"));
    }

    return () => {
      bgMusicRef.current?.pause();
      bgMusicRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (bgMusicRef.current) {
      if (isMuted) bgMusicRef.current.pause();
      else bgMusicRef.current.play().catch(() => console.log("Autoplay blocked"));
    }
  }, [isMuted]);

  useEffect(() => {
    if (step === 'intro1') speak(lesson.targetWords[0].word);
    if (step === 'intro2') speak(lesson.targetWords[1].word);
    if (step === 'intro3') speak(lesson.targetWords[2].word);
  }, [step]);

  const handleCheckAnswer = () => {
    const answer = currentExercise.isQRO ? qroValue : selectedAnswer;
    const correct = answer?.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase().trim();
    
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      if (!isMuted) correctSound.current.play();
      setPointsEarned(p => p + 10);
      speak(currentExercise.correctAnswer);
    } else {
      if (!isMuted) incorrectSound.current.play();
      const newLives = Math.max(0, lives - 1);
      setLives(newLives);
      // Update DB immediately for life loss
      updateUserProgress(0, -1);
    }
  };

  const handleNext = () => {
    if (lives === 0 && !isCorrect) {
      // If lives are exhausted and the answer was wrong, we can't continue
      setStep('summary');
      return;
    }

    setShowResult(false);
    setSelectedAnswer(null);
    setQroValue('');
    if (exerciseIdx < lesson.exercises.length - 1) {
      setExerciseIdx(prev => prev + 1);
    } else {
      setStep('summary');
    }
  };

  const finishLesson = () => {
    // Points are added at the end
    updateUserProgress(pointsEarned, 0, lesson.id, lesson.targetWords.map(w => w.id));
    onFinish();
  };

  if (step === 'summary') {
    const isSuccess = lives > 0 || exerciseIdx === lesson.exercises.length - 1;
    return (
      <div className={`h-full flex flex-col items-center justify-center p-8 text-center ${isSuccess ? 'bg-blue-600' : 'bg-red-600'}`}>
        {isSuccess ? (
          <Star className="w-24 h-24 text-yellow-300 fill-yellow-300 mb-6 animate-bounce" />
        ) : (
          <XCircle className="w-24 h-24 text-white mb-6 animate-pulse" />
        )}
        <h2 className="text-5xl font-black text-white mb-2">{isSuccess ? 'GÉNIAL !' : 'OUPS...'}</h2>
        <p className="text-blue-100 font-bold text-xl mb-12">
          {isSuccess ? `Leçon terminée avec succès • +${pointsEarned} XP` : 'Vous n\'avez plus de vies. Revenez plus tard ou relevez un défi !'}
        </p>
        <button onClick={finishLesson} className="w-full max-w-sm bg-white py-5 rounded-[2rem] text-blue-600 font-black text-xl shadow-2xl transform transition active:scale-95">CONTINUER</button>
      </div>
    );
  }

  if (step === 'intro1' || step === 'intro2' || step === 'intro3') {
    const wordIndex = step === 'intro1' ? 0 : step === 'intro2' ? 1 : 2;
    const word = lesson.targetWords[wordIndex];
    return (
      <div className="h-screen flex flex-col bg-white p-8">
        <header className="flex justify-between items-center mb-12">
          <button onClick={onFinish} className="p-2"><X className="w-6 h-6 text-slate-300" /></button>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMuted(!isMuted)} className="p-2 text-slate-400">
              {isMuted ? <VolumeX /> : <Volume2 />}
            </button>
            <span className="text-blue-600 font-black text-sm uppercase tracking-widest">Nouveau mot {wordIndex + 1}/3</span>
          </div>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-48 h-48 bg-blue-50 rounded-[3rem] flex items-center justify-center mb-8 shadow-inner">
            <span className="text-7xl font-black text-blue-600">{word.word[0].toUpperCase()}</span>
          </div>
          <p className="text-blue-400 font-black text-xl uppercase mb-2">{word.article || word.type}</p>
          <h2 className="text-6xl font-black text-slate-900 mb-4">{word.word}</h2>
          <p className="text-3xl text-slate-400 font-bold italic">"{word.translation[Language.FR]}"</p>
          <p className="text-xl text-slate-300 font-bold italic">"{word.translation[Language.EN]}"</p>
          
          <div className="mt-12 flex gap-4">
            <div className="bg-slate-50 px-8 py-4 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Partie 1</p>
              <p className="text-xl font-black text-slate-700">{word.components.word1}</p>
            </div>
            {word.components.linkingElement && (
              <div className="bg-blue-50 px-4 py-4 rounded-3xl border border-blue-100">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Lien</p>
                <p className="text-xl font-black text-blue-700">-{word.components.linkingElement}-</p>
              </div>
            )}
            <div className="bg-slate-50 px-8 py-4 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Partie 2</p>
              <p className="text-xl font-black text-slate-700">{word.components.word2}</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => {
            if (step === 'intro1') setStep('intro2');
            else if (step === 'intro2') setStep('intro3');
            else setStep('exercises');
          }} 
          className="w-full bg-blue-600 py-5 rounded-[2rem] text-white font-black text-xl shadow-xl shadow-blue-100 transform transition active:scale-95"
        >
          {step === 'intro3' ? "C'EST PARTI !" : "SUIVANT"}
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="px-6 py-4 flex items-center gap-4 border-b">
        <button onClick={onFinish} className="p-2"><X className="w-6 h-6 text-slate-300" /></button>
        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${((exerciseIdx + 1) / lesson.exercises.length) * 100}%` }} />
        </div>
        <button onClick={() => setIsMuted(!isMuted)} className="p-2 text-slate-400">
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </header>

      <div className="flex-1 p-6 flex flex-col">
        <div className="flex-1">
          <h2 className="text-2xl font-black text-slate-800 mb-8 leading-tight">{currentExercise.question}</h2>
          
          {currentExercise.isQRO ? (
            <div className="space-y-4">
              <input
                type="text"
                value={qroValue}
                onChange={(e) => !showResult && setQroValue(e.target.value)}
                placeholder="Tapez votre réponse..."
                className={`w-full p-6 rounded-3xl border-4 text-xl font-bold outline-none transition-all ${
                  showResult 
                    ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                    : 'border-slate-100 focus:border-blue-600'
                }`}
                autoFocus
              />
              {showResult && !isCorrect && (
                <p className="text-red-500 font-bold px-2">Réponse correcte : <span className="underline">{currentExercise.correctAnswer}</span></p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {currentExercise.options?.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => !showResult && setSelectedAnswer(opt)}
                  className={`w-full p-5 rounded-2xl border-b-4 font-bold text-left text-lg transition-all transform active:scale-[0.98] ${
                    selectedAnswer === opt 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 translate-y-1' 
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  } ${
                    showResult && opt === currentExercise.correctAnswer 
                      ? '!border-green-600 !bg-green-100 !text-green-800' 
                      : (showResult && selectedAnswer === opt && !isCorrect ? '!border-red-600 !bg-red-100 !text-red-800' : '')
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Result Banner */}
      {showResult && (
        <div className={`p-6 animate-in slide-in-from-bottom duration-300 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
          <div className="flex items-center gap-4 mb-4">
            {isCorrect ? (
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            ) : (
              <XCircle className="w-10 h-10 text-red-600" />
            )}
            <div>
              <h3 className={`text-xl font-black ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Excellent !' : 'Dommage...'}
              </h3>
              {!isCorrect && <p className="text-red-700 font-bold">Solution : {currentExercise.correctAnswer}</p>}
            </div>
          </div>
          <button onClick={handleNext} className={`w-full py-4 rounded-2xl text-white font-black text-lg shadow-lg ${isCorrect ? 'bg-green-600' : 'bg-red-600'}`}>
            CONTINUER
          </button>
        </div>
      )}

      {!showResult && (
        <div className="p-6 border-t bg-white">
          <button 
            disabled={currentExercise.isQRO ? !qroValue : !selectedAnswer} 
            onClick={handleCheckAnswer} 
            className="w-full bg-blue-600 py-5 rounded-2xl text-white font-black text-xl shadow-xl shadow-blue-100 disabled:opacity-30 transform transition active:scale-95"
          >
            VÉRIFIER
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonDetail;
