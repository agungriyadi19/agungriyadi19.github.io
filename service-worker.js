const CACHE_NAME = "LigaBola-v1";
var urlsToCache = [
    "/",
    "/manifest.json",
    "/nav.html",
    "/index.html",
    "/detailTeam.html",
    "/pages/home.html",
    "/pages/team.html",
    "/pages/favorites.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/api.js",
    "/js/db.js",
    "/js/idb.js",
    "/js/materialize.min.js",
    "/js/myScript.js",
    "/js/nav.js",
    "/img/icon-192x192.png",
    "/img/icon-512x512.png",
    "/img/icon.png",
    "/img/La_Liga.png",
    "/img/eredivisie.png",
    "/img/premier.png",
    "/img/ucl.png",
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    var base_url = "https://api.football-data.org/v2";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());

                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function(response) {
                return response ||  fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + "dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("push", function(event) {
    var body;
    
    if (event.data) {
        body = event.data.text();
   importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/detailTeam.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/team.html', revision: '1' },
    { url: '/pages/favorites.html', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/myScript.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/img/icon-192x192.png', revision: '1' },
    { url: '/img/icon-512x512.png', revision: '1' },
    { url: '/img/icon.png', revision: '1' },
    { url: '/img/La_Liga.png', revision: '1' },
    { url: '/img/eredivisie.png', revision: '1' },
    { url: '/img/premier.png', revision: '1' },
    { url: '/img/ucl.png', revision: '1' },
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "pages"
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

self.addEventListener("push", function(event) {
    var body;
    
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    var options = {
        body: body,
        icon: "img/icon-512x512.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
}); } else {
        body = "Push message no payload";
    }

    var options = {
        body: body,
        icon: "img/icon-512x512.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});