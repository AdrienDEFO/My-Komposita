
import { useState, useEffect } from 'react';
import { Level, User, Lesson } from './types';
import { getDB, saveDB, clearDB } from './services/db';
import { generateLessons } from './constants';
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
  const [user, setUser] = useState<User | null>(getDB().user);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [showPlacement, setShowPlacement] = useState(false);

  useEffect(() => {
    // Hide splash screen once React is mounted
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.style.opacity = '0';
      setTimeout(() => splash.remove(), 500);
    }
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

  const handleStartDailyChallenge = () => {
    if (!user) return;
    const lessons = generateLessons(user.level);
    // Find first uncompleted lesson
    const uncompleted = lessons.find(l => !user.completedLessons.includes(l.id));
    if (uncompleted) {
      setCurrentLesson(uncompleted);
    } else {
      // If all completed, start a random one
      const random = lessons[Math.floor(Math.random() * lessons.length)];
      setCurrentLesson(random);
    }
  };

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
        user={user}
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
        return <HomeScreen onStartPlacement={() => setShowPlacement(true)} onStartDailyChallenge={handleStartDailyChallenge} user={user} />;
      case 'lessons':
        return <LessonsScreen onStartLesson={setCurrentLesson} user={user} />;
      case 'dashboard':
        return <DashboardScreen user={user} />;
      case 'profile':
        return <ProfileScreen onLogout={handleLogout} user={user} />;
      default:
        return <HomeScreen onStartPlacement={() => setShowPlacement(true)} onStartDailyChallenge={handleStartDailyChallenge} user={user} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} user={user}>
      {renderContent()}
    </Layout>
  );
}
