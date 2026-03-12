
import React from 'react';
import { Trophy, Medal, Crown, Star, Flame, Zap } from 'lucide-react';
import { User } from '../types';

interface DashboardScreenProps {
  user: User | null;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ user }) => {
  const leaderboard = [
    { name: 'Adrien Defo', points: 4500, avatar: 'AD' },
    { name: 'Lalende Waffo', points: 4200, avatar: 'LW' },
    { name: 'Sophie M.', points: 3800, avatar: 'SM' },
    { name: 'Thomas K.', points: 3500, avatar: 'TK' },
    { name: user?.username || 'Vous', points: user?.points || 0, avatar: user?.username?.[0] || 'V', current: true },
  ].sort((a, b) => b.points - a.points);

  return (
    <div className="p-6 space-y-8 animate-slide-up max-w-4xl mx-auto">
      <div className="text-center py-8">
        <div className="inline-flex p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-[2.5rem] mb-6 shadow-xl shadow-yellow-100 dark:shadow-none">
          <Trophy className="w-20 h-20 text-yellow-500" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Classement</h2>
        <p className="text-slate-400 font-bold text-lg uppercase tracking-widest">Ligue des Compositeurs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-[3rem] overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm">
          {leaderboard.map((user, i) => (
            <div 
              key={user.name} 
              className={`flex items-center p-6 border-b border-slate-50 dark:border-slate-700 last:border-0 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${user.current ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}
            >
              <div className="w-10 text-center shrink-0">
                {i === 0 ? <Crown className="w-8 h-8 text-yellow-500 mx-auto animate-bounce" /> : <span className="font-black text-slate-300 dark:text-slate-600 text-xl">{i + 1}</span>}
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black ml-4 shrink-0 text-xl shadow-sm ${
                i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-slate-300' : i === 2 ? 'bg-orange-400' : 'bg-blue-300'
              }`}>
                {user.avatar}
              </div>
              <div className="flex-1 ml-6">
                <p className={`font-black text-lg ${user.current ? 'text-blue-700 dark:text-blue-400' : 'text-slate-800 dark:text-slate-100'}`}>{user.name}</p>
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">{user.points} XP</p>
              </div>
              {i < 3 && <Medal className={`w-6 h-6 ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-orange-400' : ''}`} />}
            </div>
          ))}
        </div>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-slate-800 dark:text-white px-1 uppercase tracking-widest">Mes Badges</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {[
              { label: 'Premier mot', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20', desc: 'Appris votre premier mot composé' },
              { label: 'Série 3j', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', desc: '3 jours consécutifs d\'apprentissage' },
              { label: 'Vague 1', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', desc: 'Terminé le premier niveau A1' },
            ].map((s, i) => {
               const Icon = s.icon;
               return (
                <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 text-center lg:text-left shadow-sm flex flex-col lg:flex-row items-center gap-4 group hover:border-blue-200 dark:hover:border-blue-900 transition-all">
                  <div className={`w-16 h-16 ${s.bg} rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${s.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest mb-1">{s.label}</p>
                    <p className="text-[10px] font-bold text-slate-400 leading-tight hidden lg:block">{s.desc}</p>
                  </div>
                </div>
               );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardScreen;
