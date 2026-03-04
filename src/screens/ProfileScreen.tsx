
import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { LogOut, Info, ChevronRight, UserCircle, Globe, Languages, Mail, ChevronLeft, Puzzle, Target, Edit2, Camera, Check, Share2 } from 'lucide-react';
import { getDB, saveDB } from '../services/db.ts';
import { CONTACT } from '../constants.tsx';
import { Language, User, Level } from '../types.ts';
import { shareProgress } from '../services/feedback';
import Toast, { ToastType } from '../components/Toast';

interface ProfileScreenProps {
  onLogout: () => void;
  onLevelChange: (level: Level) => void;
  onUserUpdate: (user: User) => void;
  user: User | null;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout, onLevelChange, onUserUpdate, user }) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showLevel, setShowLevel] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({
    message: '',
    type: 'info',
    visible: false
  });
  
  const [editName, setEditName] = useState(user?.username || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdateProfile = () => {
    if (!user) return;
    const updatedUser = { ...user, username: editName, avatar: editAvatar };
    onUserUpdate(updatedUser);
    setShowEdit(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = async () => {
    if (!user) return;
    const title = 'Mon parcours sur My Komposita';
    const text = `Salut ! Je suis au niveau ${user.level} sur My Komposita avec ${user.points} XP et une série de ${user.dailyStreak} jours ! Viens apprendre l'allemand avec moi !`;
    const url = window.location.origin;
    
    const result = await shareProgress(title, text, url);
    if (result === 'copied') {
      setToast({ message: 'Lien copié dans le presse-papier !', type: 'success', visible: true });
    }
  };

  const changeLanguage = async (lang: Language) => {
    const db = getDB();
    if (db.user) {
      db.user.language = lang;
      saveDB(db);
      window.location.reload();
    }
  };

  if (showLevel) {
    return (
      <div className="p-6 h-full bg-slate-50 animate-slide-up">
        <button onClick={() => setShowLevel(false)} className="flex items-center gap-2 text-blue-600 font-black uppercase text-xs mb-8">
          <ChevronLeft className="w-5 h-5" /> Retour
        </button>
        <h2 className="text-3xl font-black text-slate-900 mb-8">Changer de niveau</h2>
        <div className="space-y-3">
          {Object.values(Level).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                onLevelChange(lvl);
                setShowLevel(false);
              }}
              className={`w-full p-5 rounded-3xl border-2 flex justify-between items-center transition-all ${
                user?.level === lvl ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-white bg-white text-slate-600'
              }`}
            >
              <span className="font-black">{lvl}</span>
              {user?.level === lvl && <Target className="w-6 h-6" />}
            </button>
          ))}
        </div>
      </div>
    );
  }

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
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-4 text-white shadow-xl shadow-blue-200">
            <Puzzle className="w-10 h-10" />
          </div>
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

  if (showEdit) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-6 h-full bg-slate-50"
      >
        <button onClick={() => setShowEdit(false)} className="flex items-center gap-2 text-blue-600 font-black uppercase text-xs mb-8">
          <ChevronLeft className="w-5 h-5" /> Retour
        </button>
        <h2 className="text-3xl font-black text-slate-900 mb-8">Modifier le profil</h2>
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-white shadow-xl border-4 border-white overflow-hidden flex items-center justify-center">
              {editAvatar ? (
                <img src={editAvatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <UserCircle className="w-24 h-24 text-blue-600" />
              )}
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-slate-50 shadow-lg"
            >
              <Camera className="w-5 h-5" />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <p className="text-slate-400 text-xs font-bold mt-4 uppercase tracking-widest">Photo de profil</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-4">Nom d'utilisateur</label>
            <input 
              type="text" 
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full p-5 bg-white rounded-3xl border border-slate-100 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 font-black text-slate-700"
              placeholder="Votre nom"
            />
          </div>

          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={handleUpdateProfile}
            className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-blue-100 flex items-center justify-center gap-3"
          >
            <Check className="w-6 h-6" /> Enregistrer les modifications
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-6 space-y-8 animate-slide-up max-w-4xl mx-auto">
      <div className="text-center pt-12 relative">
        <button 
          onClick={() => setShowEdit(true)}
          className="absolute top-12 right-0 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-blue-600 hover:bg-slate-50 transition-colors"
        >
          <Edit2 className="w-6 h-6" />
        </button>
        <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white overflow-hidden">
          {user?.avatar ? (
            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <UserCircle className="w-32 h-32 text-blue-600" />
          )}
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-2">{user?.username}</h2>
        <p className="text-slate-400 font-bold mb-6 text-lg">{user?.email}</p>
        <div className="inline-block bg-blue-100 px-6 py-2 rounded-full shadow-sm">
          <span className="text-blue-700 font-black text-xs uppercase tracking-widest">Niveau {user?.level}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={() => setShowLevel(true)}
          className="w-full flex items-center p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm btn-bounce group hover:border-orange-200 transition-all"
        >
          <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
            <Target className="w-7 h-7" />
          </div>
          <div className="flex-1 text-left ml-5">
            <p className="font-black text-slate-800 text-lg leading-none">Niveau</p>
            <p className="text-xs font-bold text-slate-400 uppercase mt-2 tracking-widest">{user?.level}</p>
          </div>
          <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-orange-600 transition-colors" />
        </button>

        <button 
          onClick={() => setShowLang(true)}
          className="w-full flex items-center p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm btn-bounce group hover:border-blue-200 transition-all"
        >
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Languages className="w-7 h-7" />
          </div>
          <div className="flex-1 text-left ml-5">
            <p className="font-black text-slate-800 text-lg leading-none">Langue</p>
            <p className="text-xs font-bold text-slate-400 uppercase mt-2 tracking-widest">{user?.language}</p>
          </div>
          <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-blue-600 transition-colors" />
        </button>

        <button 
          onClick={() => setShowAbout(true)}
          className="w-full flex items-center p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm btn-bounce group hover:border-slate-300 transition-all"
        >
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-800 group-hover:text-white transition-colors">
            <Info className="w-7 h-7" />
          </div>
          <div className="flex-1 text-left ml-5">
            <p className="font-black text-slate-800 text-lg">À propos</p>
          </div>
          <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-slate-800 transition-colors" />
        </button>

        <button 
          onClick={handleShare}
          className="w-full flex items-center p-6 bg-blue-600 rounded-[2.5rem] border border-blue-700 shadow-xl shadow-blue-100 btn-bounce hover:bg-blue-700 transition-all"
        >
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white">
            <Share2 className="w-7 h-7" />
          </div>
          <p className="font-black text-white ml-5 flex-1 text-left text-lg">Partager mon profil</p>
        </button>

        <button 
          onClick={onLogout}
          className="w-full flex items-center p-6 bg-red-50 rounded-[2.5rem] border border-red-100 btn-bounce md:col-span-2 hover:bg-red-100 transition-all"
        >
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm shadow-red-100">
            <LogOut className="w-7 h-7" />
          </div>
          <p className="font-black text-red-700 ml-5 flex-1 text-left text-lg">Se déconnecter</p>
        </button>
      </div>

      <Toast 
        isVisible={toast.visible} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast(t => ({ ...t, visible: false }))} 
      />
    </div>
  );
};

export default ProfileScreen;
