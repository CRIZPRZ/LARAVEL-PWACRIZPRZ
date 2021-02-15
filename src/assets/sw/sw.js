const CACHE = 'static-' + new Date();

const APP_SHELL = [
    '/',
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
