
import React, { useMemo } from 'react';
import { generateLessons } from '../constants.tsx';
import LessonCard from '../components/LessonCard.tsx';
import { Level, User, Lesson } from '../types.ts';

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
    <div className="p-6 space-y-6">
      <header>
        <h2 className="text-3xl font-black text-slate-900">Parcours {currentLevel}</h2>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Étape {user?.unlockedBatches || 1}</p>
      </header>
      <div className="space-y-4">
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
    </div>
  );
};

export default LessonsScreen;
