const CACHE = 'europa2026-v2';

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

// Activar: limpiar caches viejos (europa2026-v1, etc.)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch:
//  - index.html → network-first (siempre trae la versión más nueva)
//  - Firebase CDN → cache-first (scripts estáticos, no cambian)
//  - Firebase API / Nominatim → solo red, nunca cachear
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  const url = e.request.url;

  // No cachear APIs externas
  if(
    url.includes('firebaseio.com') ||
    url.includes('firebasestorage.app') ||
    url.includes('nominatim.openstreetmap.org')
  ) return;

  // CDN Firebase → cache-first
  if(url.includes('gstatic.com')) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        if(res && res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }))
    );
    return;
  }

  // index.html y resto del origen → network-first, fallback a caché
  e.respondWith(
    fetch(e.request).then(res => {
      if(res && res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
