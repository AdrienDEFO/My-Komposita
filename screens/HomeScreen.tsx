
import React, { useState, useMemo, useEffect } from 'react';
import { Flame, Trophy, Calendar, Volume2, Search, X, ChevronRight, BookOpen, Download, WifiOff, Sparkles, Share, PlusSquare } from 'lucide-react';
import { MOCK_KOMPOSITA, TRANSLATIONS } from '../constants';
import { Language, User } from '../types';

interface HomeScreenProps {
  onStartPlacement: () => void;
  user: User | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartPlacement, user }) => {
  const [showDict, setShowDict] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  
  // États pour l'installation
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  const [playingId, setPlayingId] = useState<string | null>(null);
  const uiLang = user?.language || Language.FR;

  useEffect(() => {
    // 1. Détecter si déjà installé (standalone)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    // 2. Détecter iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIosDevice);

    // 3. Gérer l'événement d'installation (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Afficher l'invite automatiquement après 3 secondes si pas encore installé
      if (!standalone) {
        setTimeout(() => setShowInstallModal(true), 3000);
      }
    };

    // 4. Si iOS et non standalone, proposer l'aide à l'installation après 5s
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
      
      {/* Modal d'installation automatique */}
      {showInstallModal && !isStandalone && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl animate-bounce-in">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-xl">MK</div>
              <button onClick={() => setShowInstallModal(false)} className="p-2 bg-slate-100 rounded-full"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            
            <h3 className="text-2xl font-black text-slate-800 mb-2">Installer l'app ?</h3>
            <p className="text-slate-500 font-medium mb-8">
              {isIOS 
                ? "Pour installer sur iPhone : appuyez sur le bouton de partage puis 'Sur l'écran d'accueil'." 
                : "Installez My Komposita pour apprendre sans connexion et plus rapidement !"}
            </p>

            {isIOS ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                  <Share className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-bold text-blue-800">1. Appuyez sur Partager</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                  <PlusSquare className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-bold text-blue-800">2. 'Sur l'écran d'accueil'</span>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleInstallAction}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 flex items-center justify-center gap-3 btn-bounce"
              >
                <Download className="w-6 h-6" /> INSTALLER MAINTENANT
              </button>
            )}
          </div>
        </div>
      )}

      {isOffline && (
        <div className="bg-orange-600 p-3 rounded-2xl flex items-center gap-3 text-white shadow-lg animate-slide-up">
          <WifiOff className="w-5 h-5 shrink-0" />
          <span className="text-xs font-black uppercase tracking-tight">Mode Hors ligne Actif</span>
        </div>
      )}

      <header>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{TRANSLATIONS.welcome[uiLang]}</p>
        <h1 className="text-4xl font-black text-slate-900 leading-tight">{user?.username} !</h1>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-orange-500"><Flame className="w-4 h-4 fill-current" /><span className="text-[10px] font-black uppercase tracking-wider">Série</span></div>
          <p className="text-3xl font-black text-slate-800">{user?.dailyStreak || 0} J</p>
        </div>
        <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-blue-600"><Trophy className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-wider">Niveau</span></div>
          <p className="text-3xl font-black text-slate-800">{user?.level}</p>
        </div>
      </div>

      <button onClick={() => alert('Bientôt !')} className="w-full bg-blue-600 p-6 rounded-[2.5rem] text-white text-left relative overflow-hidden btn-bounce shadow-xl shadow-blue-200">
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-1">Défi du jour</h3>
          <p className="text-blue-100 font-bold mb-4 opacity-80">+50 XP à gagner</p>
          <span className="bg-white/20 px-4 py-2 rounded-xl font-black text-sm backdrop-blur-md">Commencer</span>
        </div>
        <Calendar className="absolute -right-8 -bottom-8 w-40 h-40 text-blue-500/20 rotate-12" />
      </button>

      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xl font-black text-slate-800">Ma Progression</h2>
          <button onClick={() => setShowDict(true)} className="text-blue-600 font-bold text-sm">Dictionnaire</button>
        </div>
        <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600"><BookOpen className="w-7 h-7" /></div>
          <div><p className="font-black text-slate-800 text-lg">{learnedWordsList.length} Mots</p><p className="text-sm text-slate-400 font-bold">Maîtrisés</p></div>
        </div>
      </section>

      {/* Dictionnaire simplifié intégré */}
      {showDict && (
        <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col p-6 animate-slide-up">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-800">Dictionnaire</h2>
              <button onClick={() => setShowDict(false)} className="p-2 bg-white rounded-full shadow-sm"><X /></button>
           </div>
           <div className="space-y-4 overflow-y-auto pb-20">
              {learnedWordsList.map(word => (
                <div key={word.id} className="bg-white p-5 rounded-3xl flex justify-between items-center border border-slate-100">
                  <div>
                    <p className="font-black text-lg">{word.word}</p>
                    <p className="text-sm text-slate-400">{word.translation[uiLang]}</p>
                  </div>
                  <button onClick={() => speak(word.word, word.id)} className={`p-3 rounded-xl ${playingId === word.id ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
