const CACHE_NAME = 'my-komposita-v2.3';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/metadata.json',
  '/src/main.tsx',
  '/src/index.css',
  'https://cdn-icons-png.flaticon.com/512/3079/3079165.png',
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap',
  'https://fonts.gstatic.com/s/fredoka/v12/X7nP4b87MdcF2jMdsWfW.woff2'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(url => 
          fetch(url, { mode: 'no-cors' }).then(response => {
            return cache.put(url, response);
          }).catch(() => console.warn('SW: Échec de mise en cache pour', url))
        )
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      return clients.openWindow('/');
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const cacheCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cacheCopy));
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});