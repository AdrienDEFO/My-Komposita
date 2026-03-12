import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, Trophy, Volume2, Search, X, BookOpen, Download, WifiOff, Sparkles, Check, Heart, Zap, Calendar, Share2 } from 'lucide-react';
import { MOCK_KOMPOSITA, TRANSLATIONS, LIFE_CHALLENGE_TIME } from '../constants';
import { Language, User, Level } from '../types';
import { shareProgress } from '../services/feedback';
import Toast, { ToastType } from '../components/Toast';

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
  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({
    message: '',
    type: 'info',
    visible: false
  });
  
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

  const handleShareStreak = async () => {
    if (!user) return;
    const title = 'Ma série sur My Komposita';
    const text = `Je suis sur une série de ${user.dailyStreak} jours sur My Komposita ! Viens me défier et apprendre l'allemand !`;
    const url = window.location.origin;
    
    const result = await shareProgress(title, text, url);
    if (result === 'copied') {
      setToast({ message: 'Lien copié dans le presse-papier !', type: 'success', visible: true });
    }
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
    <div className="p-6 space-y-8 pb-32 md:pb-12">
      {/* Badge Offline */}
      {isOffline && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-500 text-white p-3 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black animate-pulse shadow-lg shadow-orange-200"
        >
          <WifiOff className="w-3 h-3" /> MODE HORS LIGNE ACTIVÉ
        </motion.div>
      )}

      <header className="flex justify-between items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{TRANSLATIONS.welcome[uiLang]}</p>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">{user?.username} !</h1>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-700 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
            <span className="font-black text-slate-700 dark:text-slate-200">{user?.dailyStreak || 0}</span>
          </div>
          <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-700 flex items-center gap-2">
            <Heart className={`w-5 h-5 ${user?.lives === 0 ? 'text-slate-300 dark:text-slate-600' : 'text-red-500 fill-red-500'}`} />
            <span className="font-black text-slate-700 dark:text-slate-200">{user?.lives}</span>
          </div>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Streak Hero Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.01 }}
            className="bg-blue-gradient p-8 rounded-[3rem] text-white shadow-2xl shadow-blue-200 relative overflow-hidden h-full flex flex-col justify-center"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Calendar className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-bounce" />
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Série de jours</span>
              </div>
              <h2 className="text-6xl font-black mb-2">{user?.dailyStreak || 0} JOURS</h2>
              <p className="text-blue-100 font-medium text-sm mb-6">
                {user?.dailyStreak && user.dailyStreak > 0 
                  ? "Incroyable ! Ne lâchez rien, vous êtes sur une lancée." 
                  : "Commencez votre série aujourd'hui pour débloquer des bonus !"}
              </p>
              
              {user?.dailyStreak && user.dailyStreak > 0 && (
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShareStreak}
                  className="bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 hover:bg-white/30 transition-colors"
                >
                  <Share2 className="w-4 h-4" /> PARTAGER MA SÉRIE
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          {/* Test de niveau et Sélection */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 h-full flex flex-col justify-center"
          >
            <div>
              <h2 className="text-xl font-black text-slate-800 dark:text-white mb-2">Identifier votre niveau</h2>
              <p className="text-sm text-slate-400 font-bold mb-4">Passez le test global pour débloquer automatiquement les niveaux adaptés.</p>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={onStartPlacement}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-100 dark:shadow-blue-900/20 flex items-center justify-center gap-2"
              >
                <Trophy className="w-5 h-5" /> COMMENCER LE TEST GLOBAL
              </motion.button>
            </div>

            <div className="pt-4 border-t border-slate-50 dark:border-slate-700">
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-widest">Ou choisir un niveau de départ</h3>
              <div className="grid grid-cols-3 gap-2">
                {Object.values(Level).map((lvl, idx) => (
                  <motion.button
                    key={lvl}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      (window as any).dispatchEvent(new CustomEvent('start-skip-test', { detail: lvl }));
                    }}
                    className={`py-3 rounded-xl font-black text-xs transition-all ${
                      user?.level === lvl 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-600'
                    }`}
                  >
                    {lvl}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Proposer l'installation PWA */}
        {deferredPrompt && !isStandalone && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-200 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Download className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h3 className="font-black text-xl mb-1 text-blue-glow">Installer My Komposita</h3>
              <p className="text-sm text-blue-100 font-medium mb-6 leading-tight">
                Ajoutez l'application à votre écran d'accueil pour apprendre sans connexion internet.
              </p>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={handleInstall}
                disabled={installStatus === 'installing'}
                className="bg-white text-blue-600 px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg flex items-center gap-2"
              >
                {installStatus === 'installing' ? 'Installation...' : installStatus === 'done' ? <><Check className="w-4 h-4" /> INSTALLÉ</> : <><Download className="w-4 h-4" /> INSTALLER MAINTENANT</>}
              </motion.button>
            </div>
          </motion.div>
        )}

        {user?.lives === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-red-100 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="w-24 h-24" />
             </div>
             <div className="relative z-10">
               <h3 className="font-black text-xl mb-1">Plus de vies !</h3>
               <p className="text-sm text-red-100 font-medium mb-6 leading-tight">
                 Vos vies se rechargent toutes les 24h. En attendant, vous pouvez réviser vos leçons terminées.
               </p>
               <motion.button 
                 whileTap={{ scale: 0.95 }}
                 onClick={onStartLifeChallenge}
                 disabled={!canDoLifeChallenge}
                 className={`w-full py-4 rounded-2xl font-black text-sm shadow-lg flex items-center justify-center gap-2 ${
                   canDoLifeChallenge ? 'bg-white text-red-600' : 'bg-red-500/50 text-red-200 cursor-not-allowed'
                 }`}
               >
                 {canDoLifeChallenge ? (
                   <><Zap className="w-4 h-4" /> RELEVER LE DÉFI (+5 VIES)</>
                 ) : (
                   <><Check className="w-4 h-4" /> DÉFI DISPONIBLE DANS 48H</>
                 )}
               </motion.button>
             </div>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartChallenge} 
            className="w-full bg-white dark:bg-slate-800 p-10 rounded-[3rem] border-4 border-blue-50 dark:border-slate-700 text-left shadow-sm relative overflow-hidden group h-full"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-48 h-48 text-blue-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-1">Défi du jour</h3>
            <p className="text-slate-400 font-bold mb-8 text-lg">+50 XP • Maîtrisez de nouveaux mots</p>
            <span className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-lg shadow-blue-100 dark:shadow-blue-900/20">COMMENCER</span>
          </motion.button>
        </div>

        <div>
            <div className="flex justify-between items-center px-1 mb-4">
                <h2 className="text-xl font-black text-slate-800">Lexique acquis ({learnedWordsList.length})</h2>
                <button onClick={() => setShowDict(true)} className="text-blue-600 font-black text-xs uppercase tracking-widest">Tout voir</button>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {learnedWordsList.slice(0, 4).map(word => (
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

                    {word.exampleSentence && (
                      <div className="mt-2 p-2 bg-blue-50/50 rounded-xl border border-blue-50 relative group/example">
                        <button 
                          onClick={() => speak(word.exampleSentence!)}
                          className="absolute top-1.5 right-1.5 p-1 bg-white rounded-lg text-blue-600 shadow-sm opacity-0 group-hover/example:opacity-100 transition-opacity"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                        <p className="text-blue-600 font-black text-[10px] pr-5 leading-tight">"{word.exampleSentence}"</p>
                      </div>
                    )}
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
      </div>

      {showDict && (
        <div className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-900 flex flex-col animate-slide-up">
           <header className="p-6 bg-white dark:bg-slate-800 border-b dark:border-slate-700 flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Mon Lexique</h2>
              <button onClick={() => setShowDict(false)} className="p-3 bg-slate-100 dark:bg-slate-700 rounded-2xl text-slate-500 dark:text-slate-400 btn-bounce"><X className="w-6 h-6" /></button>
           </header>
           <div className="p-4 border-b dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Rechercher un mot..."
                  className="w-full pl-14 pr-4 py-5 bg-slate-50 dark:bg-slate-700 rounded-[1.5rem] border-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 dark:text-slate-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
           </div>
           <div className="flex-1 overflow-y-auto p-6 space-y-3 hide-scrollbar max-w-4xl mx-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learnedWordsList.filter(w => w.word.toLowerCase().includes(searchTerm.toLowerCase())).map(word => (
                  <div key={word.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl flex justify-between items-center border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div>
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-black text-blue-400 uppercase">{word.article || word.type}</span>
                         <p className="font-black text-slate-800 dark:text-slate-100 text-lg">{word.word}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs text-slate-400 font-black uppercase tracking-tight">{word.translation[Language.FR]}</p>
                        <p className="text-[10px] text-slate-300 font-black uppercase tracking-tight">{word.translation[Language.EN]}</p>
                      </div>

                      {word.exampleSentence && (
                        <div className="mt-2 p-2 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-50 dark:border-blue-900/30 relative group/example">
                          <button 
                            onClick={() => speak(word.exampleSentence!)}
                            className="absolute top-1.5 right-1.5 p-1 bg-white dark:bg-slate-700 rounded-lg text-blue-600 dark:text-blue-400 shadow-sm opacity-0 group-hover/example:opacity-100 transition-opacity"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                          <p className="text-blue-600 dark:text-blue-400 font-black text-[10px] pr-5 leading-tight">"{word.exampleSentence}"</p>
                        </div>
                      )}
                    </div>
                    <button onClick={() => speak(word.word)} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 btn-bounce"><Volume2 className="w-5 h-5" /></button>
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}

      <Toast 
        isVisible={toast.visible} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast(t => ({ ...t, visible: false }))} 
      />
    </div>
  );
};

export default HomeScreen;