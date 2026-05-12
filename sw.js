const CACHE = 'europa2026-v1';

const CDN_PRECACHE = [
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js',
];

// Instalar: pre-cachear Firebase CDN
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CDN_PRECACHE)));
  self.skipWaiting();
});

// Activar: limpiar caches viejos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first para app + CDN, network-only para Firebase API
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  const url = e.request.url;

  // No cachear llamadas a Firebase API ni Nominatim
  if(
    url.includes('firebaseio.com') ||
    url.includes('firebasestorage.app') ||
    url.includes('nominatim.openstreetmap.org')
  ) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if(cached) return cached;
      return fetch(e.request).then(res => {
        if(res && res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
