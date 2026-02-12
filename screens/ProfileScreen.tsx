
import React, { useState } from 'react';
import { LogOut, Info, ChevronRight, UserCircle, Globe, Languages, Mail, Phone, ChevronLeft } from 'lucide-react';
import { getDB, saveDB } from '../services/db.ts';
import { CONTACT } from '../constants.tsx';
import { Language, User } from '../types.ts';

interface ProfileScreenProps {
  onLogout: () => void;
  user: User | null;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout, user }) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showLang, setShowLang] = useState(false);

  const changeLanguage = async (lang: Language) => {
    const db = await getDB();
    if (db.user) {
      db.user.language = lang;
      await saveDB(db);
      window.location.reload(); // Recharger pour appliquer les changements PWA
    }
  };

  if (showLang) {
    return (
      <div className="p-6 h-full bg-slate-50 animate-slide-up">
        <button onClick={() => setShowLang(false)} className="flex items-center gap-2 text-blue-600 font-black uppercase text-xs mb-8">
          <ChevronLeft className="w-5 h-5" /> Retour
        </button>
        <h2 className="text-3xl font-black text-slate-900 mb-8">Langue d'interface</h2>
        <div className="space-y-3">
          {Object.values(Language).map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`w-full p-5 rounded-3xl border-2 flex justify-between items-center transition-all ${
                user?.language === lang ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-white bg-white text-slate-600'
              }`}
            >
              <span className="font-black">{lang}</span>
              {user?.language === lang && <Globe className="w-6 h-6" />}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (showAbout) {
    return (
      <div className="p-6 h-full bg-slate-50 animate-slide-up">
        <button onClick={() => setShowAbout(false)} className="flex items-center gap-2 text-blue-600 font-black uppercase text-xs mb-8">
          <ChevronLeft className="w-5 h-5" /> Retour
        </button>
        
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-4 text-white font-black text-3xl shadow-xl shadow-blue-200">MK</div>
          <h2 className="text-2xl font-black text-slate-900">{CONTACT.appName}</h2>
          <p className="text-slate-400 font-bold">Version {CONTACT.version}</p>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 mb-6">
          <h3 className="text-lg font-black mb-3">Notre Équipe</h3>
          <div className="space-y-6">
            {CONTACT.team.map((member, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1 bg-blue-600 rounded-full shrink-0" />
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{member.role}</p>
                  <p className="font-black text-slate-800">{member.name}</p>
                  <div className="flex items-center gap-4 mt-1 opacity-60">
                    <Mail className="w-3 h-3" />
                    <span className="text-[10px] font-bold">{member.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-tighter">© 2026 MyKomposita. Tous droits réservés.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 animate-slide-up">
      <div className="text-center pt-8">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-white">
          <UserCircle className="w-24 h-24 text-blue-600" />
        </div>
        <h2 className="text-3xl font-black text-slate-900">{user?.username}</h2>
        <p className="text-slate-400 font-bold mb-4">{user?.email}</p>
        <div className="inline-block bg-blue-100 px-4 py-1.5 rounded-full">
          <span className="text-blue-700 font-black text-[10px] uppercase tracking-widest">Niveau {user?.level}</span>
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => setShowLang(true)}
          className="w-full flex items-center p-5 bg-white rounded-3xl border border-slate-100 shadow-sm btn-bounce group"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Languages className="w-6 h-6" />
          </div>
          <div className="flex-1 text-left ml-4">
            <p className="font-black text-slate-700 leading-none">Langue</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-tight">{user?.language}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300" />
        </button>

        <button 
          onClick={() => setShowAbout(true)}
          className="w-full flex items-center p-5 bg-white rounded-3xl border border-slate-100 shadow-sm btn-bounce group"
        >
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-800 group-hover:text-white transition-colors">
            <Info className="w-6 h-6" />
          </div>
          <div className="flex-1 text-left ml-4">
            <p className="font-black text-slate-700">À propos</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300" />
        </button>

        <button 
          onClick={onLogout}
          className="w-full flex items-center p-5 bg-red-50 rounded-3xl border border-red-100 mt-8 btn-bounce"
        >
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm shadow-red-100">
            <LogOut className="w-6 h-6" />
          </div>
          <p className="font-black text-red-700 ml-4 flex-1 text-left">Se déconnecter</p>
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
