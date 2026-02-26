
import React from 'react';
import { Lock, CheckCircle2, Play, Star } from 'lucide-react';
import { Lesson } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  onStart: (lesson: Lesson) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, isCompleted, onStart }) => {
  const isLocked = lesson.isLocked;

  return (
    <button
      disabled={isLocked}
      onClick={() => onStart(lesson)}
      className={`w-full p-6 rounded-[2.5rem] border-2 transition-all text-left relative overflow-hidden group btn-bounce ${
        isLocked 
          ? 'bg-slate-50 border-slate-100 opacity-60 grayscale' 
          : isCompleted 
            ? 'bg-white border-green-100 shadow-sm' 
            : 'bg-white border-blue-50 shadow-md shadow-blue-50/50'
      }`}
    >
      <div className="flex items-center gap-5">
        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-colors ${
          isLocked ? 'bg-slate-200' : isCompleted ? 'bg-green-100' : 'bg-blue-600'
        }`}>
          {isLocked ? (
            <Lock className="w-6 h-6 text-slate-400" />
          ) : isCompleted ? (
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          ) : (
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isLocked ? 'text-slate-400' : 'text-blue-400'}`}>
              Leçon {lesson.id}
            </span>
            {isCompleted && (
              <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                <Star className="w-2 h-2 text-green-600 fill-green-600" />
                <span className="text-[8px] font-black text-green-600 uppercase">Acquis</span>
              </div>
            )}
          </div>
          <h3 className={`text-xl font-black leading-tight ${isLocked ? 'text-slate-400' : 'text-slate-800'}`}>
            {lesson.title}
          </h3>
        </div>
      </div>

      {!isLocked && !isCompleted && (
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
          <Play className="w-12 h-12 text-blue-600" />
        </div>
      )}
    </button>
  );
};

export default LessonCard;
