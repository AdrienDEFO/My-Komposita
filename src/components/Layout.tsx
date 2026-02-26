
import React from 'react';
import { Home, BookOpen, BarChart3, User as UserIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden">
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-24">
        {children}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50">
        <button 
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'home' ? 'text-blue-600 scale-110' : 'text-slate-300'}`}
        >
          <Home className={`w-6 h-6 ${activeTab === 'home' ? 'fill-blue-600/10' : ''}`} />
          <span className="text-[10px] font-black uppercase tracking-widest">Accueil</span>
        </button>
        <button 
          onClick={() => onTabChange('lessons')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'lessons' ? 'text-blue-600 scale-110' : 'text-slate-300'}`}
        >
          <BookOpen className={`w-6 h-6 ${activeTab === 'lessons' ? 'fill-blue-600/10' : ''}`} />
          <span className="text-[10px] font-black uppercase tracking-widest">Leçons</span>
        </button>
        <button 
          onClick={() => onTabChange('dashboard')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'dashboard' ? 'text-blue-600 scale-110' : 'text-slate-300'}`}
        >
          <BarChart3 className={`w-6 h-6 ${activeTab === 'dashboard' ? 'fill-blue-600/10' : ''}`} />
          <span className="text-[10px] font-black uppercase tracking-widest">Stats</span>
        </button>
        <button 
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'profile' ? 'text-blue-600 scale-110' : 'text-slate-300'}`}
        >
          <UserIcon className={`w-6 h-6 ${activeTab === 'profile' ? 'fill-blue-600/10' : ''}`} />
          <span className="text-[10px] font-black uppercase tracking-widest">Profil</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
