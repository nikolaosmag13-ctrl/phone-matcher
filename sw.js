// Αύξηση έκδοσης cache για άμεση ανανέωση
const CACHE_NAME = 'phone-matcher-v2';

// Η λίστα αρχείων που αποθηκεύονται στη μνήμη
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon512.png',
  'https://cdn.tailwindcss.com'
];

// Εγκατάσταση και αποθήκευση
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ενεργοποίηση και καθαρισμός παλιών εκδόσεων cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Ανάκτηση από cache ή από το δίκτυο
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
