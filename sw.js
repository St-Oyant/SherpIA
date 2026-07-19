/* SherpIA — service worker réseau-d'abord avec cache de secours.
   ⚠️ Incrémenter CACHE à CHAQUE version pour propager les mises à jour (leçon PyQuest §5). */
const CACHE = "sherpia-v1.3.0";
const CORE = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "icon-192-maskable.png", "icon-512-maskable.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
