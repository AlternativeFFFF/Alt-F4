// set names for both precache & runtime cache
workbox.core.setCacheNameDetails({
    prefix: 'my-blog',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'runtime-cache'
});

// let Service Worker take control of pages ASAP
workbox.skipWaiting();
workbox.clientsClaim();

// let Workbox handle our precache list
workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
    /\.html$/,
    workbox.strategies.networkFirst()
);

//use `staleWhileRevalidate` for CSS
workbox.routing.registerRoute(
    /\.(css|scss)$/,
    workbox.strategies.staleWhileRevalidate()
);

// use `cacheFirst` strategy for images
workbox.routing.registerRoute(
    /assets\/GLOBAL\/img/,
    workbox.strategies.cacheFirst()
);

//thumbnails
workbox.routing.registerRoute(
    /assets\/ALTF4\/\d+\//,
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    /assets\/GLOBAL\/js\/modernizr-webp\.js/,
    workbox.strategies.cacheFirst()
);
