
import React, { useState, useMemo, useEffect } from 'react';
import { Flame, Trophy, Calendar, Volume2, Search, X, ChevronRight, BookOpen, Download, WifiOff, Sparkles, Share, PlusSquare } from 'lucide-react';
import { MOCK_KOMPOSITA, TRANSLATIONS } from '../constants.tsx';
import { Language, User } from '../types.ts';

interface HomeScreenProps {
  onStartPlacement: () => void;
  user: User | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartPlacement, user }) => {
  const [showDict, setShowDict] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  const [playingId, setPlayingId] = useState<string | null>(null);
  const uiLang = user?.language || Language.FR;

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIosDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!standalone) {
        setTimeout(() => setShowInstallModal(true), 3000);
      }
    };

    if (isIosDevice && !standalone) {
      setTimeout(() => setShowInstallModal(true), 5000);
    }

    const handleConnectionChange = () => setIsOffline(!navigator.onLine);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, []);

  const handleInstallAction = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallModal(false);
      }
    }
  };

  const learnedWordsList = useMemo(() => 
    MOCK_KOMPOSITA.filter(w => user?.learnedWords.includes(w.id)),
    [user?.learnedWords]
  );

  const filteredWords = useMemo(() => {
    let result = learnedWordsList.filter(w => 
      w.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
      w.translation[uiLang]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return result.sort((a, b) => sortAsc ? a.word.localeCompare(b.word) : b.word.localeCompare(a.word));
  }, [learnedWordsList, searchTerm, sortAsc, uiLang]);

  const speak = (text: string, wordId: string) => {
    window.speechSynthesis.cancel();
    setPlayingId(wordId);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.onend = () => setPlayingId(null);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-6 space-y-8 animate-slide-up relative">
      {showInstallModal && !isStandalone && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl animate-bounce-in">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-xl">MK</div>
              <button onClick={() => setShowInstallModal(false)} className="p-2 bg-slate-100 rounded-full"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Installer l'app ?</h3>
            <p className="text-slate-500 font-medium mb-8">
              {isIOS ? "Partager > Sur l'écran d'accueil" : "Installez l'app pour apprendre hors ligne !"}
            </p>
            {isIOS ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl text-blue-700 font-bold"><Share /> 1. Partager</div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl text-blue-700 font-bold"><PlusSquare /> 2. Écran d'accueil</div>
              </div>
            ) : (
              <button onClick={handleInstallAction} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg">INSTALLER</button>
            )}
          </div>
        </div>
      )}
      <header>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{TRANSLATIONS.welcome[uiLang]}</p>
        <h1 className="text-4xl font-black text-slate-900">{user?.username} !</h1>
      </header>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100"><Flame className="w-4 h-4 text-orange-500 mb-2" /><p className="text-2xl font-black">{user?.dailyStreak || 0} J</p></div>
        <div className="bg-white p-5 rounded-3xl border border-slate-100"><Trophy className="w-4 h-4 text-blue-600 mb-2" /><p className="text-2xl font-black">{user?.level}</p></div>
      </div>
      <button onClick={onStartPlacement} className="w-full bg-blue-600 p-6 rounded-[2rem] text-white text-left shadow-xl shadow-blue-200">
        <h3 className="text-xl font-black">Défi du jour</h3>
        <p className="text-blue-100 opacity-80 mb-4">+50 XP</p>
        <span className="bg-white/20 px-4 py-2 rounded-xl font-bold">Commencer</span>
      </button>
      <div className="flex justify-between items-center px-1">
          <h2 className="text-xl font-black text-slate-800">Maîtrisés ({learnedWordsList.length})</h2>
          <button onClick={() => setShowDict(true)} className="text-blue-600 font-bold">Voir tout</button>
      </div>
      {showDict && (
        <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col p-6 overflow-y-auto">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black">Dictionnaire</h2>
              <button onClick={() => setShowDict(false)} className="p-2 bg-white rounded-full"><X /></button>
           </div>
           <div className="space-y-4 pb-20">
              {learnedWordsList.map(word => (
                <div key={word.id} className="bg-white p-4 rounded-2xl flex justify-between items-center border border-slate-100 shadow-sm">
                  <div><p className="font-black">{word.word}</p><p className="text-xs text-slate-400">{word.translation[uiLang]}</p></div>
                  <button onClick={() => speak(word.word, word.id)} className="p-2 bg-blue-50 rounded-lg text-blue-600"><Volume2 className="w-4 h-4" /></button>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
