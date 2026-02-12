import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Vérifie que App.tsx existe bien dans le même dossier

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}