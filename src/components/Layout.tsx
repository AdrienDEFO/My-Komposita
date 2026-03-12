
import React from 'react';
import { motion } from 'motion/react';
import { Home, BookOpen, BarChart3, User as UserIcon, Book } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'lessons', label: 'Leçons', icon: BookOpen },
    { id: 'dictionary', label: 'Lexique', icon: Book },
    { id: 'dashboard', label: 'Stats', icon: BarChart3 },
    { id: 'profile', label: 'Profil', icon: UserIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col md:flex-row relative overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-800 border-r border-slate-100 dark:border-slate-700 p-6 fixed h-full z-50">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">My Komposita</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 dark:shadow-blue-900/20' 
                    : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'fill-white/10' : ''}`} />
                <span className="font-black text-sm uppercase tracking-widest">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="mt-auto p-4 bg-slate-50 dark:bg-slate-700 rounded-3xl border border-slate-100 dark:border-slate-600">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Version</p>
          <p className="text-xs font-black text-slate-900 dark:text-white">1.2.1</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 overflow-y-auto hide-scrollbar pb-24 md:pb-0">
        <div className="max-w-5xl mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-t border-slate-100 dark:border-slate-700 px-6 py-4 flex justify-between items-center z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <motion.button 
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-blue-600 scale-110' : 'text-slate-300 dark:text-slate-600'}`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-blue-600/10' : ''}`} />
              <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
