const CACHE_NAME = "english-learning-ai-shell-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./flashcards.css",
  "./app.js",
  "./flashcards.js",
  "./manifest.webmanifest",
  "./icon.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(key => key.startsWith("english-learning-ai-shell-") && key !== CACHE_NAME)
        .map(key => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || url.pathname.includes("/api/")) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cacheKey = request.mode === "navigate"
      ? new URL("./index.html", self.registration.scope)
      : request;

    try {
      // Revalidate the browser HTTP cache too, so a deployed asset is not hidden
      // behind an older service-worker or HTTP-cache entry.
      const response = await fetch(request, { cache: "no-cache" });
      if (response.ok && response.type !== "opaque") {
        await cache.put(cacheKey, response.clone());
      }

      // Prefer a recent cached copy during a temporary server error, but do not
      // mask genuine 404 responses with stale content.
      if (response.status >= 500) {
        const fallback = await cache.match(cacheKey);
        return fallback || response;
      }
      return response;
    } catch (error) {
      const fallback = await cache.match(cacheKey);
      if (fallback) return fallback;
      throw error;
    }
  })());
});
