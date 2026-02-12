
import React from 'react';
import { Home, Book, Award, User, Heart, Zap } from 'lucide-react';
import { User as UserType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: UserType | null;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, user }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'lessons', icon: Book, label: 'Cours' },
    { id: 'dashboard', icon: Award, label: 'Ligue' },
    { id: 'profile', icon: User, label: 'Profil' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative">
      {/* Top Header */}
      <header className="px-6 pt-4 pb-3 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
          <Zap className="w-4 h-4 text-blue-600 fill-blue-600" />
          <span className="font-black text-blue-700 text-sm">{user?.points || 0}</span>
        </div>
        <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span className="font-black text-red-700 text-sm">{user?.lives || 0}</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-24 bg-slate-50/50">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 flex justify-around items-center px-4 pb-6 pt-3 z-50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 flex-1 transition-all btn-bounce ${isActive ? 'text-blue-600 scale-110' : 'text-slate-400'}`}
            >
              <div className={`p-2 rounded-xl ${isActive ? 'bg-blue-50' : ''}`}>
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[3px]' : 'stroke-2'}`} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
