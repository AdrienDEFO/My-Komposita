
const CACHE_NAME = 'my-komposita-v1.6'; // Version incrémentée pour forcer le rafraîchissement
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/constants.tsx',
  '/metadata.json',
  '/services/db.ts',
  '/components/Layout.tsx',
  '/components/LessonCard.tsx',
  '/screens/AuthScreen.tsx',
  '/screens/HomeScreen.tsx',
  '/screens/LessonsScreen.tsx',
  '/screens/LessonDetail.tsx',
  '/screens/DashboardScreen.tsx',
  '/screens/ProfileScreen.tsx',
  '/screens/PlacementTest.tsx',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap',
  'https://cdn-icons-png.flaticon.com/512/197/197571.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Mise en cache des ressources...');
      return cache.addAll(ASSETS_TO_CACHE);
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

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networked = fetch(event.request)
        .then((response) => {
          const cacheCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cacheCopy);
          });
          return response;
        })
        .catch(() => cached);
      return cached || networked;
    })
  );
});
