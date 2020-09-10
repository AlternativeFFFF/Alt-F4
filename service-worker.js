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

// use `networkFirst` strategy for `*.html`, like all my posts
workbox.routing.registerRoute(
    /\.html$/,
    workbox.strategies.networkFirst()
);

const matchCallback = ({url, request, event}) => {
    const imageRegex = /assets\/GLOBAL\/img/
    const altf4Regex = /assets\/ALTF4/\d/
    
    return imageRegex.test(url) && altf4Regex.test(url);
}

// use `cacheFirst` strategy for images
workbox.routing.registerRoute(
    MatchCallback,
    workbox.strategies.cacheFirst()
);

// third party files
workbox.routing.registerRoute(
    /^https?:\/\/imgur.com/,
    workbox.strategies.staleWhileRevalidate()
);
