
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log("main.tsx: Démarrage du montage React...");
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("index.tsx: Élément root non trouvé !");
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log("index.tsx: React.render appelé");

// Fallback removal of splash screen
setTimeout(() => {
  const splash = document.getElementById('splash-screen');
  if (splash) {
    splash.style.opacity = '0';
    setTimeout(() => splash.remove(), 500);
  }
}, 1000);
