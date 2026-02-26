
import React, { useMemo } from 'react';
import { generateLessons } from '../constants';
import LessonCard from '../components/LessonCard';
import { Level, User, Lesson } from '../types';

interface LessonsScreenProps {
  onStartLesson: (lesson: Lesson) => void;
  onStartSkipTest: (level: Level) => void;
  user: User | null;
}

const LessonsScreen: React.FC<LessonsScreenProps> = ({ onStartLesson, onStartSkipTest, user }) => {
  const [selectedLevel, setSelectedLevel] = React.useState<Level>(user?.level || Level.A1);
  const currentLevel = user?.level || Level.A1;
  const levels = Object.values(Level);
  const nextLevel = levels[levels.indexOf(currentLevel) + 1];

  const lessons = useMemo(() => {
    const raw = generateLessons(selectedLevel);
    // If it's a lower level than current, all lessons are unlocked
    const isLowerLevel = levels.indexOf(selectedLevel) < levels.indexOf(currentLevel);
    const unlockedUpTo = isLowerLevel ? raw.length : (user?.unlockedBatches || 1) * 4;
    
    const hasLives = (user?.lives || 0) > 0;

    return raw.map((l, i) => {
      const isAlreadyCompleted = user?.completedLessons.includes(l.id) || false;
      // If no lives, only completed lessons are accessible
      const isLockedByLives = !hasLives && !isAlreadyCompleted;
      
      return {
        ...l,
        isLocked: i >= unlockedUpTo || isLockedByLives
      };
    });
  }, [selectedLevel, currentLevel, user?.unlockedBatches, user?.lives, user?.completedLessons]);

  return (
    <div className="p-6 space-y-6 pb-32">
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Parcours {selectedLevel}</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">
            {selectedLevel === currentLevel ? `Étape ${user?.unlockedBatches || 1}` : 'Niveau débloqué'}
          </p>
        </div>
        {nextLevel && selectedLevel === currentLevel && (
          <button 
            onClick={() => onStartSkipTest(nextLevel)}
            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest border border-blue-100 hover:bg-blue-600 hover:text-white transition-all"
          >
            Sauter vers {nextLevel}
          </button>
        )}
      </header>

      {/* Level Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {levels.map((lvl) => {
          const isUnlocked = levels.indexOf(lvl) <= levels.indexOf(currentLevel);
          return (
            <button
              key={lvl}
              disabled={!isUnlocked}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-6 py-3 rounded-2xl font-black text-xs whitespace-nowrap transition-all border-2 ${
                selectedLevel === lvl 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                  : isUnlocked 
                    ? 'bg-white text-slate-600 border-white hover:border-blue-100' 
                    : 'bg-slate-50 text-slate-300 border-slate-50 opacity-50 cursor-not-allowed'
              }`}
            >
              {lvl}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isCompleted={user?.completedLessons.includes(lesson.id) || false}
            onStart={onStartLesson}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonsScreen;
