
import React, { useState, useMemo } from 'react';
import { Search, Volume2, X, BookOpen } from 'lucide-react';
import { MOCK_KOMPOSITA } from '../constants';
import { Language, User } from '../types';

interface DictionaryScreenProps {
  user: User | null;
}

const DictionaryScreen: React.FC<DictionaryScreenProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
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
      <header>
        <h1 className="text-3xl font-black text-slate-900">Dictionnaire</h1>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">
          Explorez les mots composés par thèmes
        </p>
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
                <span className="text-[10px] font-black text-blue-400 uppercase">{word.article}</span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter bg-slate-50 px-2 py-0.5 rounded-full">{word.level}</span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter bg-slate-50 px-2 py-0.5 rounded-full">{word.category}</span>
              </div>
              <h3 className="font-black text-slate-800 text-xl">{word.word}</h3>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-tight">{word.translation[uiLang]}</p>
              
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
    </div>
  );
};

export default DictionaryScreen;
