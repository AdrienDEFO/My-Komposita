
import React, { useState, useEffect } from 'react';
import { Level, User, Lesson } from './types';
import { getDB, saveDB, clearDB } from './services/db';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import LessonsScreen from './screens/LessonsScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import LessonDetail from './screens/LessonDetail';
import PlacementTest from './screens/PlacementTest';
import Layout from './components/Layout';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [showPlacement, setShowPlacement] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDB();
    setUser(db.user);
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    const db = getDB();
    db.user = userData;
    saveDB(db);
    setUser(userData);
  };

  const handleLogout = () => {
    clearDB();
    setUser(null);
    setActiveTab('home');
  };

  const handleLevelSelected = (level: Level) => {
    if (!user) return;
    const updatedUser = { ...user, level };
    const db = getDB();
    db.user = updatedUser;
    saveDB(db);
    setUser(updatedUser);
    setShowPlacement(false);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-blue-600">
        <div className="animate-bounce">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center font-black text-blue-600 text-3xl shadow-2xl rotate-12">
            MK
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  if (showPlacement) {
    return <PlacementTest onComplete={handleLevelSelected} />;
  }

  if (currentLesson) {
    return (
      <LessonDetail 
        lesson={currentLesson} 
        onFinish={() => {
          setCurrentLesson(null);
          setUser(getDB().user); // Refresh UI
        }} 
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onStartPlacement={() => setShowPlacement(true)} user={user} />;
      case 'lessons':
        return <LessonsScreen onStartLesson={setCurrentLesson} user={user} />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'profile':
        return <ProfileScreen onLogout={handleLogout} user={user} />;
      default:
        return <HomeScreen onStartPlacement={() => setShowPlacement(true)} user={user} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} user={user}>
      {renderContent()}
    </Layout>
  );
}