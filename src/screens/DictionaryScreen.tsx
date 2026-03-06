
import React, { useState, useMemo } from 'react';
import { Search, Volume2, X, BookOpen, Layers, RotateCw, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_KOMPOSITA } from '../constants';
import { Language, User, Kompositum } from '../types';

interface DictionaryScreenProps {
  user: User | null;
}

const FlashcardModal: React.FC<{ 
  words: Kompositum[], 
  onClose: () => void, 
  uiLang: Language,
  speak: (text: string) => void
}> = ({ words, onClose, uiLang, speak }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const word = words[currentIndex];

  const next = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  const prev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center p-6"
    >
      <button onClick={onClose} className="absolute top-8 right-8 text-white/50 hover:text-white">
        <X className="w-8 h-8" />
      </button>

      <div className="w-full max-w-md aspect-[3/4] relative perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + (isFlipped ? '-flipped' : '')}
            initial={{ rotateY: isFlipped ? -180 : 180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 180 : -180, opacity: 0 }}
            transition={{ duration: 0.4, type: 'spring', damping: 20 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className={`w-full h-full rounded-[3rem] p-8 flex flex-col items-center justify-center text-center cursor-pointer shadow-2xl border-4 ${
              isFlipped ? 'bg-white border-blue-600' : 'bg-blue-600 border-white/20'
            }`}
          >
            {!isFlipped ? (
              <>
                <span className="text-white/50 font-black text-xs uppercase tracking-[0.3em] mb-4">Mot Allemand</span>
                <h2 className="text-5xl font-black text-white mb-4 leading-tight">{word.word}</h2>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black text-white uppercase">{word.article || word.type}</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black text-white uppercase">{word.level}</span>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); speak(word.word); }}
                  className="mt-8 p-4 bg-white/10 rounded-2xl text-white hover:bg-white/20 transition-all"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </>
            ) : (
              <>
                <span className="text-blue-200 font-black text-xs uppercase tracking-[0.3em] mb-4">Traduction & Contexte</span>
                <h3 className="text-3xl font-black text-slate-800 mb-2">{word.translation[uiLang]}</h3>
                <p className="text-slate-400 font-bold italic mb-8">{word.translation[Language.EN]}</p>
                
                {word.exampleSentence && (
                  <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 w-full relative group/example">
                    <button 
                      onClick={(e) => { e.stopPropagation(); speak(word.exampleSentence!); }}
                      className="absolute top-4 right-4 p-2 bg-white rounded-xl text-blue-600 shadow-sm opacity-0 group-hover/example:opacity-100 transition-opacity"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <p className="text-blue-600 font-black text-lg mb-2 pr-8">"{word.exampleSentence}"</p>
                    {word.exampleTranslation && (
                      <p className="text-slate-400 font-bold italic text-sm">
                        {word.exampleTranslation[uiLang]}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-auto pt-6 flex gap-2 text-[10px] font-bold text-slate-300">
                  <span className="bg-slate-50 px-3 py-1 rounded-lg">{word.components.word1}</span>
                  {word.components.linkingElement && <span className="bg-blue-50 text-blue-400 px-3 py-1 rounded-lg">-{word.components.linkingElement}-</span>}
                  <span className="bg-slate-50 px-3 py-1 rounded-lg">{word.components.word2}</span>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center gap-8">
        <button onClick={prev} className="p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <div className="text-white font-black text-xl tracking-widest">
          {currentIndex + 1} <span className="text-white/30">/</span> {words.length}
        </div>
        <button onClick={next} className="p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all">
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      <p className="mt-8 text-white/30 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
        <RotateCw className="w-3 h-3" /> Appuyez sur la carte pour la retourner
      </p>
    </motion.div>
  );
};

const DictionaryScreen: React.FC<DictionaryScreenProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFlashcards, setShowFlashcards] = useState(false);
  
  const uiLang = user?.language || Language.FR;

  const categories = useMemo(() => {
    const cats = new Set<string>();
    MOCK_KOMPOSITA.forEach(w => cats.add(w.category));
    return Array.from(cats);
  }, []);

  const filteredWords = useMemo(() => {
    return MOCK_KOMPOSITA.filter(w => {
      const matchesSearch = w.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           w.translation[uiLang].toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? w.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, uiLang]);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-6 space-y-6 animate-slide-up pb-32">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Dictionnaire</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">
            Explorez les mots composés par thèmes
          </p>
        </div>
        {filteredWords.length > 0 && (
          <button 
            onClick={() => setShowFlashcards(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
          >
            <Layers className="w-4 h-4" /> Flashcards
          </button>
        )}
      </header>

      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Rechercher un mot..."
          className="w-full pl-14 pr-4 py-5 bg-white rounded-[1.5rem] border-none shadow-sm focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <button 
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
            selectedCategory === null ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white text-slate-400 shadow-sm'
          }`}
        >
          Tous
        </button>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
              selectedCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white text-slate-400 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredWords.map(word => (
          <div key={word.id} className="bg-white p-5 rounded-[2rem] flex justify-between items-center border border-slate-50 shadow-sm group hover:border-blue-100 transition-all">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black text-blue-400 uppercase">{word.article || word.type}</span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter bg-slate-50 px-2 py-0.5 rounded-full">{word.level}</span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter bg-slate-50 px-2 py-0.5 rounded-full">{word.category}</span>
              </div>
              <h3 className="font-black text-slate-800 text-xl">{word.word}</h3>
              <div className="flex flex-col">
                <p className="text-sm text-slate-400 font-bold uppercase tracking-tight">{word.translation[Language.FR]}</p>
                <p className="text-xs text-slate-300 font-bold uppercase tracking-tight">{word.translation[Language.EN]}</p>
              </div>

              {word.exampleSentence && (
                <div className="mt-3 p-3 bg-blue-50/30 rounded-2xl border border-blue-50/50 relative group/example">
                  <button 
                    onClick={() => speak(word.exampleSentence!)}
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-lg text-blue-600 shadow-sm opacity-0 group-hover/example:opacity-100 transition-opacity"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                  <p className="text-blue-600 font-black text-xs pr-6">"{word.exampleSentence}"</p>
                  {word.exampleTranslation && (
                    <p className="text-slate-400 font-bold italic text-[10px] mt-1">
                      {word.exampleTranslation[uiLang]}
                    </p>
                  )}
                </div>
              )}
              
              <div className="mt-3 flex gap-2 text-[10px] font-bold text-slate-300">
                <span className="bg-slate-50 px-2 py-1 rounded-lg">{word.components.word1}</span>
                {word.components.linkingElement && <span className="bg-blue-50 text-blue-400 px-2 py-1 rounded-lg">-{word.components.linkingElement}-</span>}
                <span className="bg-slate-50 px-2 py-1 rounded-lg">{word.components.word2}</span>
              </div>
            </div>
            <button 
              onClick={() => speak(word.word)} 
              className="p-5 bg-slate-50 rounded-[1.5rem] text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all btn-bounce"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>
        ))}

        {filteredWords.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-slate-400 mb-2">Aucun résultat</h3>
            <p className="text-slate-300 font-bold italic">Essayez une autre recherche ou catégorie.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showFlashcards && (
          <FlashcardModal 
            words={filteredWords} 
            onClose={() => setShowFlashcards(false)} 
            uiLang={uiLang}
            speak={speak}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DictionaryScreen;
