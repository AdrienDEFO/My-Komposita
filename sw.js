
const CACHE_NAME = 'my-komposita-v1.7'; // Incrément pour forcer le nettoyage du cache
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'index.tsx',
  'App.tsx',
  'types.ts',
  'constants.tsx',
  'metadata.json',
  'services/db.ts',
  'components/Layout.tsx',
  'components/LessonCard.tsx',
  'screens/AuthScreen.tsx',
  'screens/HomeScreen.tsx',
  'screens/LessonsScreen.tsx',
  'screens/LessonDetail.tsx',
  'screens/DashboardScreen.tsx',
  'screens/ProfileScreen.tsx',
  'screens/PlacementTest.tsx',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap',
  'https://cdn-icons-png.flaticon.com/512/197/197571.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Mise en cache des ressources relatives...');
      // On utilise addAll avec précaution
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('SW: Certains fichiers n\'ont pas pu être mis en cache (normal en dev) :', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Stratégie : Réseau d'abord, sinon Cache
  // Plus sûr pour le développement pour éviter de rester bloqué sur une page blanche
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si on est en ligne, on met à jour le cache
        if (response.status === 200) {
          const cacheCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cacheCopy);
          });
        }
        return response;
      })
      .catch(() => {
        // Si on est hors ligne ou erreur réseau, on pioche dans le cache
        return caches.match(event.request);
      })
  );
});
