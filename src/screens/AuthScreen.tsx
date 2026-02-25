
import React, { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock, User as UserIcon, Puzzle } from 'lucide-react';
import { User, Level, Language } from '../types';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: username || 'Apprenant',
      email,
      level: Level.A1,
      language: Language.FR,
      points: 0,
      lives: 5,
      lastLifeUpdate: Date.now(),
      completedLessons: [],
      unlockedBatches: 1,
      dailyStreak: 0,
      lastDailyChallenge: 0,
      learnedWords: []
    };
    onLogin(newUser);
  };

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-flex w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl items-center justify-center mb-4 border border-white/30 shadow-xl">
            <Puzzle className="text-white w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">My Komposita</h1>
          <p className="text-blue-100 font-medium">L'allemand par les mots composés</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
          <div className="flex border-b border-slate-100 mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-4 font-bold text-sm uppercase tracking-wider transition-all ${isLogin ? 'text-blue-600 border-b-4 border-blue-600' : 'text-slate-400'}`}
            >
              Connexion
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-4 font-bold text-sm uppercase tracking-wider transition-all ${!isLogin ? 'text-blue-600 border-b-4 border-blue-600' : 'text-slate-400'}`}
            >
              Inscription
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Nom d'utilisateur"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="email" 
                placeholder="Email"
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                placeholder="Mot de passe"
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 flex items-center justify-center gap-3 btn-bounce mt-4"
            >
              {isLogin ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
              {isLogin ? 'Se connecter' : "Créer un compte"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
