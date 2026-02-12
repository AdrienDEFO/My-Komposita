
import React from 'react';
import { Lock, CheckCircle, ChevronRight } from 'lucide-react';
import { Lesson, Language, User } from '../types.ts';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  onStart: (lesson: Lesson) => void;
  user: User | null;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, isCompleted, onStart, user }) => {
  const uiLang = user?.language || Language.FR;

  return (
    <button
      disabled={lesson.isLocked}
      onClick={() => onStart(lesson)}
      className={`w-full flex items-center p-5 rounded-[2rem] border-2 transition-all relative text-left group animate-slide-up ${
        lesson.isLocked 
          ? 'bg-slate-50 border-slate-50 opacity-60 grayscale cursor-not-allowed' 
          : 'bg-white border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md'
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 z-10 ${
        isCompleted ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-600'
      }`}>
        {isCompleted ? <CheckCircle className="w-8 h-8" /> : <span className="text-xl font-black">{lesson.id}</span>}
      </div>
      
      <div className="flex-1 ml-4 pr-4">
        <h3 className="font-black text-slate-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">
          {lesson.targetWords[0].word} & {lesson.targetWords[1].word}
        </h3>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
          {lesson.targetWords[0].translation[uiLang]}...
        </p>
      </div>

      <div className="shrink-0">
        {lesson.isLocked ? <Lock className="w-6 h-6 text-slate-300" /> : <ChevronRight className="w-6 h-6 text-blue-300" />}
      </div>

      {lesson.isLocked && (
        <div className="absolute -top-2 -right-2 bg-slate-200 text-[8px] font-black px-2 py-1 rounded-lg border-2 border-white text-slate-500 uppercase tracking-tighter">
          Verrouillé
        </div>
      )}
    </button>
  );
};

export default LessonCard;
