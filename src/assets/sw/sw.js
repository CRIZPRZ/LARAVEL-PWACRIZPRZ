//cache name
const CACHE = 'static-' + new Date();

//files necessary for your site to work in offline mode
const APP_SHELL = [
    '/',
    '/offline',
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

//install service worker
self.addEventListener('install', e => {
    this.skipWaiting();
    const cacheStatic = caches.open(CACHE).then(cache =>
        cache.addAll(APP_SHELL));
    e.waitUntil(cacheStatic);

});

//activate service worker an delete old cache
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
    // it is preferable to send the data from a back-end
    const title = "title notification";
    const body = "body notification"
    const options = {
        body: body,
        icon: 'img/icon-72x72.png', //preference use the whole url of the img example: https://tusitioweb.com/img/icon-72x72.png
        badge: 'img/icon-72x72.png', //preference use the whole url of the img example: https://tusitioweb.com/img/icon-72x72.png
        vibrate: [125, 75, 125, 275, 200, 275, 125, 75, 125, 275, 200, 600, 200, 600], // more vibrations
        openUrl: '/', // url where the application will open when clicking on the notification
        data: {
            url: '/', // url where the application will open when clicking on the notification
        }
    };
    e.waitUntil(registration.showNotification(title, options));
});

//event when giving close notification
self.addEventListener('notificationclose', e => {
    console.log('notification close');
});

self.addEventListener('notificationclick', e => {
    const notificacion = e.notification;
    clients.openWindow(notificacion.data.url);
    notification.close();
});