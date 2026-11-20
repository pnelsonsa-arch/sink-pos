const CACHE_NAME = 'jubilee-pos-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  'https://tailwindcss.com',
  'https://cloudflare.com',
  'https://cloudflare.com'
];

// Install: Cache all core files and CDNs
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Fetch: Serve from cache first, fall back to network
self.addEventListener('fetch', event => {
  // Ignore Google Apps Script API calls so they don't get cached
  if (event.request.url.includes('://google.com')) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
