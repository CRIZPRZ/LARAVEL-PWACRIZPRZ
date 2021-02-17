const CACHE = 'static-' + new Date();

const APP_SHELL = [
    '/',
    '/img/icons/icon_72px.png',
    '/img/icons/icon_96px.png',
    '/img/icons/icon_128px.png',
    '/img/icons/icon_144px.png',
    '/img/icons/icon_152px.png',
    '/img/icons/icon_192px.png',
    '/img/icons/icon_384px.png',
    '/img/icons/icon_512px.png',
    '/img/splashScreen/SplashScreen-1125x2436.png',
    '/img/splashScreen/SplashScreen-1242x2208.png',
    '/img/splashScreen/SplashScreen-1242x2688.png',
    '/img/splashScreen/SplashScreen-1536x2048.png',
    '/img/splashScreen/SplashScreen-1668x2224.png',
    '/img/splashScreen/SplashScreen-1668x2388.png',
    '/img/splashScreen/SplashScreen-2048x2732.png',
    '/img/splashScreen/SplashScreen-750x1334.png',
    '/img/splashScreen/SplashScreen-828x1792.png',
];

self.addEventListener('install', e => {
    this.skipWaiting();
    const cacheStatic = caches.open(CACHE).then(cache =>
        cache.addAll(APP_SHELL));

    e.waitUntil(cacheStatic);

});

self.addEventListener('activate', e => {
    const response = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== CACHE && key.includes('static')) {
                return caches.delete(key);
            }
        });

    });

    e.waitUntil(response);

});

// Serve from Cache
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            return response || fetch(e.request);
        })
        .catch(() => {
            return caches.match('/');
        })
    )
});


//push notifications

self.addEventListener('push', e => {
    // preferible mandar la data desde un back-end
    const title = "title notification";
    const body = "body notification"
    const options = {
        body: body,
        icon: 'img/icon-72x72.png', //preferencia usar toda la url de la img ejemplo: https://tusitioweb.com/img/icon-72x72.png
        badge: 'img/icon-72x72.png', //preferencia usar toda la url de la img ejemplo: https://tusitioweb.com/img/icon-72x72.png
        vibrate: [125, 75, 125, 275, 200, 275, 125, 75, 125, 275, 200, 600, 200, 600], // more vibrations
        openUrl: '/', // url donde se abrila la aplicacion al ar click en la notifcacion
        data: {
            url: '/', // url donde se abrila la aplicacion al ar click en la notifcacion
        }
    };

    e.waitUntil(registration.showNotification(title, options));
});


self.addEventListener('notificationclose', e => {
    console.log('notification close');
});

self.addEventListener('notificationclick', e => {
    const notificacion = e.notification;
    clients.openWindow(notificacion.data.url);
    notification.close();
});
