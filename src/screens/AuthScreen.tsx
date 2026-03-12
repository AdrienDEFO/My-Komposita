
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, UserPlus, Mail, Lock, User as UserIcon, Puzzle, ArrowLeft, Send } from 'lucide-react';
import { User, Level, Language } from '../types';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isForgotPassword) {
      setResetSent(true);
      return;
    }
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: username || 'Apprenant',
      email,
      level: Level.A1,
      language: Language.FR,
      points: 0,
      lives: 5,
      lastLifeUpdate: Date.now(),
      lastLifeChallenge: 0,
      completedLessons: [],
      unlockedBatches: 1,
      dailyStreak: 0,
      lastDailyChallenge: 0,
      lastActivityTimestamp: 0,
      learnedWords: []
    };
    onLogin(newUser);
  };

  return (
    <div className="min-h-screen bg-blue-600 dark:bg-slate-950 flex flex-col items-center justify-center p-6 sm:p-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex w-20 h-20 bg-white/20 dark:bg-blue-900/20 backdrop-blur-md rounded-3xl items-center justify-center mb-4 border border-white/30 dark:border-blue-800/30 shadow-xl"
          >
            <Puzzle className="text-white w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl font-black text-white mb-2">My Komposita</h1>
          <p className="text-blue-100 dark:text-blue-300 font-medium">L'allemand par les mots composés</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
        >
          <div className="flex border-b border-slate-100 dark:border-slate-800 mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-4 font-bold text-sm uppercase tracking-wider transition-all ${isLogin ? 'text-blue-600 border-b-4 border-blue-600' : 'text-slate-400 dark:text-slate-600'}`}
            >
              Connexion
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-4 font-bold text-sm uppercase tracking-wider transition-all ${!isLogin ? 'text-blue-600 border-b-4 border-blue-600' : 'text-slate-400 dark:text-slate-600'}`}
            >
              Inscription
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isForgotPassword ? (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <button 
                  onClick={() => {
                    setIsForgotPassword(false);
                    setResetSent(false);
                  }}
                  className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase"
                >
                  <ArrowLeft className="w-4 h-4" /> Retour
                </button>
                
                <div className="text-center">
                  <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">Mot de passe oublié ?</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Entrez votre email pour recevoir un lien de récupération.</p>
                </div>

                {resetSent ? (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-green-50 dark:bg-green-900/20 p-6 rounded-3xl border border-green-100 dark:border-green-900/30 text-center"
                  >
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-green-800 dark:text-green-400 font-bold">Email envoyé !</p>
                    <p className="text-green-600 dark:text-green-500 text-xs mt-1 text-pretty">Consultez votre boîte de réception pour réinitialiser votre mot de passe.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-600" />
                      <input 
                        type="email" 
                        placeholder="Email"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none font-medium dark:text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 dark:shadow-none"
                    >
                      Envoyer le lien
                    </motion.button>
                  </form>
                )}
              </motion.div>
            ) : (
              <motion.form 
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                onSubmit={handleSubmit} 
                className="space-y-4"
              >
                {!isLogin && (
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-600" />
                    <input 
                      type="text" 
                      placeholder="Nom d'utilisateur"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none font-medium dark:text-white"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-600" />
                  <input 
                    type="email" 
                    placeholder="Email"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none font-medium dark:text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-600" />
                  <input 
                    type="password" 
                    placeholder="Mot de passe"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none font-medium dark:text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {isLogin && (
                  <div className="text-right">
                    <button 
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-blue-600 font-bold text-xs uppercase tracking-tight"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                )}

                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 dark:shadow-none flex items-center justify-center gap-3 mt-4"
                >
                  {isLogin ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
                  {isLogin ? 'Se connecter' : "Créer un compte"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthScreen;
