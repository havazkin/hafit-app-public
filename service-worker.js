// =========================
// HAFIT SERVICE WORKER
// =========================

const CACHE_NAME = "hafit-v1-cache";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./CSS/style_base.css",

  "./JS/core/app.js",
  "./JS/core/router.js",
  "./JS/core/data.js",
  "./JS/core/storage.js",

  "./UI/ui_home.js",
  "./UI/ui_category.js",
  "./UI/ui_outdoor.js",
  "./UI/ui_home_workouts.js",
  "./UI/ui_stats.js",
  "./UI/ui_settings.js",
  "./UI/ui_tests.js",

  "./UI/ui_outdoor_w1.js",
  "./UI/ui_outdoor_w2.js",
  "./UI/ui_outdoor_w3.js",
  "./UI/ui_outdoor_w4.js",

  "./UI/ui_home_w1.js",
  "./UI/ui_home_w2.js",
  "./UI/ui_home_w3.js",
  "./UI/ui_home_w4.js",

  "./UI/ui_test_5k.js",
  "./UI/ui_test_pullups.js",
  "./UI/ui_test_pushups.js",
  "./UI/ui_test_squats.js",
  "./UI/ui_test_broadjump.js",

  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});