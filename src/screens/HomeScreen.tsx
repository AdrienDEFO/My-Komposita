import { useState, useMemo, useEffect } from 'react';
import { Flame, Trophy, Volume2, Search, X, BookOpen, Download, WifiOff, Sparkles, Check, Heart, Zap } from 'lucide-react';
import { MOCK_KOMPOSITA, TRANSLATIONS, LIFE_CHALLENGE_TIME } from '../constants';
import { Language, User, Level } from '../types';

interface HomeScreenProps {
  onStartPlacement: () => void;
  onStartDailyChallenge: () => void;
  onStartLifeChallenge: () => void;
  user: User | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartPlacement, onStartDailyChallenge, onStartLifeChallenge, user }) => {
  const [showDict, setShowDict] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isStandalone, setIsStandalone] = useState(false);
  const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'done'>('idle');
  
  const uiLang = user?.language || Language.FR;

  const canDoLifeChallenge = useMemo(() => {
    if (!user) return false;
    if (user.lives > 0) return false;
    const now = Date.now();
    return now - user.lastLifeChallenge >= LIFE_CHALLENGE_TIME;
  }, [user?.lives, user?.lastLifeChallenge]);

  const handleStartChallenge = () => {
    if (user?.level === Level.A1 && user?.points === 0 && user?.completedLessons.length === 0) {
      onStartPlacement();
    } else {
      onStartDailyChallenge();
    }
  };

  useEffect(() => {
    const checkStandalone = () => {
      const isS = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
      setIsStandalone(isS);
    };
    
    checkStandalone();

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('PWA: Ready for installation');
    };

    const handleConnectionChange = () => setIsOffline(!navigator.onLine);
    const handleAppInstalled = () => {
      setInstallStatus('done');
      setIsStandalone(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    setInstallStatus('installing');
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setInstallStatus('done');
    } else {
      console.log('User dismissed the install prompt');
      setInstallStatus('idle');
    }
    setDeferredPrompt(null);
  };

  const learnedWordsList = useMemo(() => 
    MOCK_KOMPOSITA.filter(w => user?.learnedWords.includes(w.id)),
    [user?.learnedWords]
  );

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-6 space-y-8 animate-slide-up pb-32">
      {/* Badge Offline */}
      {isOffline && (
        <div className="bg-orange-500 text-white p-3 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black animate-pulse shadow-lg shadow-orange-200">
          <WifiOff className="w-3 h-3" /> MODE HORS LIGNE ACTIVÉ
        </div>
      )}

      <header className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{TRANSLATIONS.welcome[uiLang]}</p>
          <h1 className="text-4xl font-black text-slate-900">{user?.username} !</h1>
        </div>
        {!isStandalone && (
           <div className="bg-blue-100 p-2 rounded-2xl">
             <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
           </div>
        )}
      </header>

      {/* Test de niveau et Sélection */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-black text-slate-800 mb-2">Identifier votre niveau</h2>
          <p className="text-sm text-slate-400 font-bold mb-4">Passez le test global pour débloquer automatiquement les niveaux adaptés.</p>
          <button 
            onClick={onStartPlacement}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-100 flex items-center justify-center gap-2 btn-bounce"
          >
            <Trophy className="w-5 h-5" /> COMMENCER LE TEST GLOBAL
          </button>
        </div>

        <div className="pt-4 border-t border-slate-50">
          <h3 className="text-sm font-black text-slate-800 mb-4 uppercase tracking-widest">Ou choisir un niveau de départ</h3>
          <div className="grid grid-cols-3 gap-2">
            {Object.values(Level).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  // Trigger a skip test for this specific level
                  // We need a way to tell App.tsx to start a skip test for this level
                  // I'll use a custom event or a prop if available
                  (window as any).dispatchEvent(new CustomEvent('start-skip-test', { detail: lvl }));
                }}
                className={`py-3 rounded-xl font-black text-xs transition-all ${
                  user?.level === lvl 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-300 font-bold mt-3 text-center uppercase tracking-tight">
            Réussissez le test du niveau choisi pour le débloquer ainsi que les niveaux inférieurs.
          </p>
        </div>
      </div>

      {/* Proposer l'installation PWA */}
      {deferredPrompt && !isStandalone && (
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-[2.5rem] text-white shadow-xl shadow-blue-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <Download className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <h3 className="font-black text-xl mb-1">Installer My Komposita</h3>
            <p className="text-sm text-blue-100 font-medium mb-6 leading-tight">
              Ajoutez l'application à votre écran d'accueil pour apprendre sans connexion internet.
            </p>
            <button 
              onClick={handleInstall}
              disabled={installStatus === 'installing'}
              className="bg-white text-blue-600 px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg btn-bounce flex items-center gap-2"
            >
              {installStatus === 'installing' ? 'Installation...' : installStatus === 'done' ? <><Check className="w-4 h-4" /> INSTALLÉ</> : <><Download className="w-4 h-4" /> INSTALLER MAINTENANT</>}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Série</p>
          </div>
          <p className="text-xl font-black text-slate-800">{user?.dailyStreak || 0} J</p>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Niveau</p>
          </div>
          <p className="text-xl font-black text-slate-800">{user?.level}</p>
        </div>
        <div className={`p-4 rounded-3xl border shadow-sm flex flex-col justify-center transition-colors ${user?.lives === 0 ? 'bg-red-50 border-red-100' : 'bg-white border-slate-100'}`}>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${user?.lives === 0 ? 'bg-red-100' : 'bg-red-50'}`}>
              <Heart className={`w-3.5 h-3.5 ${user?.lives === 0 ? 'text-red-600 animate-pulse' : 'text-red-500'}`} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Vies</p>
          </div>
          <p className={`text-xl font-black ${user?.lives === 0 ? 'text-red-600' : 'text-slate-800'}`}>{user?.lives || 0}/5</p>
        </div>
      </div>

      {user?.lives === 0 && (
        <div className="bg-red-600 p-6 rounded-[2.5rem] text-white shadow-xl shadow-red-100 relative overflow-hidden animate-slide-up">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="w-24 h-24" />
           </div>
           <div className="relative z-10">
             <h3 className="font-black text-xl mb-1">Plus de vies !</h3>
             <p className="text-sm text-red-100 font-medium mb-6 leading-tight">
               Vos vies se rechargent toutes les 24h. En attendant, vous pouvez réviser vos leçons terminées.
             </p>
             <button 
               onClick={onStartLifeChallenge}
               disabled={!canDoLifeChallenge}
               className={`w-full py-4 rounded-2xl font-black text-sm shadow-lg btn-bounce flex items-center justify-center gap-2 ${
                 canDoLifeChallenge ? 'bg-white text-red-600' : 'bg-red-500/50 text-red-200 cursor-not-allowed'
               }`}
             >
               {canDoLifeChallenge ? (
                 <><Zap className="w-4 h-4" /> RELEVER LE DÉFI (+5 VIES)</>
               ) : (
                 <><Check className="w-4 h-4" /> DÉFI DISPONIBLE DANS 48H</>
               )}
             </button>
           </div>
        </div>
      )}

      <button onClick={handleStartChallenge} className="w-full bg-white p-8 rounded-[2.5rem] border-4 border-blue-50 text-left shadow-sm relative overflow-hidden group btn-bounce">
        <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
          <BookOpen className="w-32 h-32 text-blue-600" />
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-1">Défi du jour</h3>
        <p className="text-slate-400 font-bold mb-6">+50 XP • Maîtrisez de nouveaux mots</p>
        <span className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-100">COMMENCER</span>
      </button>

      <div>
          <div className="flex justify-between items-center px-1 mb-4">
              <h2 className="text-xl font-black text-slate-800">Lexique acquis ({learnedWordsList.length})</h2>
              <button onClick={() => setShowDict(true)} className="text-blue-600 font-black text-xs uppercase tracking-widest">Tout voir</button>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {learnedWordsList.slice(0, 3).map(word => (
              <div key={word.id} className="bg-white p-4 rounded-2xl flex justify-between items-center border border-slate-50 shadow-sm hover:border-blue-100 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-blue-400 uppercase">{word.article || word.type}</span>
                    <p className="font-black text-slate-800 text-lg">{word.word}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">{word.translation[Language.FR]}</p>
                    <p className="text-[10px] text-slate-300 font-bold uppercase tracking-tight">{word.translation[Language.EN]}</p>
                  </div>
                </div>
                <button 
                  onClick={() => speak(word.word)} 
                  className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:bg-blue-600 hover:text-white transition-all btn-bounce"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {learnedWordsList.length === 0 && (
              <div className="text-center py-16 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-slate-200" />
                </div>
                <p className="text-slate-300 font-black italic">Commencez une leçon pour enrichir votre lexique !</p>
              </div>
            )}
          </div>
      </div>

      {showDict && (
        <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col animate-slide-up">
           <header className="p-6 bg-white border-b flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-900">Mon Lexique</h2>
              <button onClick={() => setShowDict(false)} className="p-3 bg-slate-100 rounded-2xl text-slate-500 btn-bounce"><X className="w-6 h-6" /></button>
           </header>
           <div className="p-4 border-b bg-white">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Rechercher un mot..."
                  className="w-full pl-14 pr-4 py-5 bg-slate-50 rounded-[1.5rem] border-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
           </div>
           <div className="flex-1 overflow-y-auto p-6 space-y-3 hide-scrollbar">
              {learnedWordsList.filter(w => w.word.toLowerCase().includes(searchTerm.toLowerCase())).map(word => (
                <div key={word.id} className="bg-white p-5 rounded-2xl flex justify-between items-center border border-slate-100 shadow-sm">
                  <div>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-black text-blue-400 uppercase">{word.article || word.type}</span>
                       <p className="font-black text-slate-800 text-lg">{word.word}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs text-slate-400 font-black uppercase tracking-tight">{word.translation[Language.FR]}</p>
                      <p className="text-[10px] text-slate-300 font-black uppercase tracking-tight">{word.translation[Language.EN]}</p>
                    </div>
                  </div>
                  <button onClick={() => speak(word.word)} className="p-4 bg-blue-50 rounded-2xl text-blue-600 btn-bounce"><Volume2 className="w-5 h-5" /></button>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;