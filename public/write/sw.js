// Lets the journal app open without internet. Your writing is always kept on the phone;
// publishing just needs a connection.
const CACHE = 'journal-v2';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(['/write/', '/write/manifest.webmanifest', '/write/apple-touch-icon.png'])),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  // Never keep copies of sign-in or GitHub replies: they must always be fresh.
  if (req.method !== 'GET' || url.hostname === 'api.github.com' || url.pathname.startsWith('/api/')) return;
  // Try the network first so you always get the newest version; fall back to the saved copy.
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok || res.type === 'opaque') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match('/write/'))),
  );
});
