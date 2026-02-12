
import React from 'react';
import { Trophy, Medal, Crown, Star, Flame, Zap } from 'lucide-react';

const DashboardScreen: React.FC = () => {
  const leaderboard = [
    { name: 'Adrien Defo', points: 4500, avatar: 'AD' },
    { name: 'Lalende Waffo', points: 4200, avatar: 'LW' },
    { name: 'Sophie M.', points: 3800, avatar: 'SM' },
    { name: 'Thomas K.', points: 3500, avatar: 'TK' },
    { name: 'Vous', points: 120, avatar: 'ME', current: true },
  ];

  return (
    <div className="p-6 space-y-8 animate-slide-up">
      <div className="text-center py-4">
        <div className="inline-flex p-5 bg-yellow-50 rounded-[2rem] mb-4">
          <Trophy className="w-16 h-16 text-yellow-500" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Classement</h2>
        <p className="text-slate-400 font-bold">Ligue des Compositeurs</p>
      </div>

      <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm">
        {leaderboard.map((user, i) => (
          <div 
            key={user.name} 
            className={`flex items-center p-5 border-b border-slate-50 last:border-0 ${user.current ? 'bg-blue-50/50' : ''}`}
          >
            <div className="w-8 text-center shrink-0">
              {i === 0 ? <Crown className="w-6 h-6 text-yellow-500 mx-auto" /> : <span className="font-black text-slate-300">{i + 1}</span>}
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black ml-4 shrink-0 ${
              i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-slate-300' : i === 2 ? 'bg-orange-400' : 'bg-blue-300'
            }`}>
              {user.avatar}
            </div>
            <div className="flex-1 ml-4">
              <p className={`font-bold ${user.current ? 'text-blue-700' : 'text-slate-800'}`}>{user.name}</p>
              <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">{user.points} XP</p>
            </div>
            {i < 3 && <Medal className={`w-5 h-5 ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-slate-300' : 'text-orange-400'}`} />}
          </div>
        ))}
      </div>

      <section>
        <h3 className="text-xl font-black text-slate-800 mb-4 px-1">Mes Badges</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Premier mot', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
            { label: 'Série 3j', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: 'Vague 1', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
          ].map((s, i) => {
             const Icon = s.icon;
             return (
              <div key={i} className="bg-white p-4 rounded-[2rem] border border-slate-100 text-center shadow-sm">
                <div className={`w-12 h-12 ${s.bg} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <p className="text-[9px] font-black text-slate-400 uppercase leading-tight">{s.label}</p>
              </div>
             );
          })}
        </div>
      </section>
    </div>
  );
};

export default DashboardScreen;
