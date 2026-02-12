
import React, { useMemo } from 'react';
import { generateLessons } from '../constants';
import LessonCard from '../components/LessonCard';
import { Level, User, Lesson } from '../types';

interface LessonsScreenProps {
  onStartLesson: (lesson: Lesson) => void;
  user: User | null;
}

const LessonsScreen: React.FC<LessonsScreenProps> = ({ onStartLesson, user }) => {
  const currentLevel = user?.level || Level.A1;
  
  const lessons = useMemo(() => {
    const raw = generateLessons(currentLevel);
    const unlockedUpTo = (user?.unlockedBatches || 1) * 4;
    return raw.map((l, i) => ({
      ...l,
      isLocked: i >= unlockedUpTo
    }));
  }, [currentLevel, user?.unlockedBatches]);

  return (
    <div className="p-6 space-y-8 animate-slide-up">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Parcours {currentLevel}</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Étape {user?.unlockedBatches || 1}</p>
        </div>
        <div className="bg-blue-100 px-4 py-2 rounded-xl">
          <span className="text-blue-700 font-black text-xs uppercase">Vague active</span>
        </div>
      </header>

      <div className="relative space-y-6">
        {/* Connection line */}
        <div className="absolute left-[34px] top-10 bottom-10 w-1 bg-slate-100 rounded-full" />
        
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isCompleted={user?.completedLessons.includes(lesson.id) || false}
            onStart={onStartLesson}
            user={user}
          />
        ))}
      </div>

      <div className="pt-12 pb-8 text-center">
        <div className="inline-block p-8 bg-slate-100 rounded-[2.5rem] border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-black text-sm uppercase tracking-wider">Plus de leçons bientôt !</p>
        </div>
      </div>
    </div>
  );
};

export default LessonsScreen;
