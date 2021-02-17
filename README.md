# Progressive Web Aplication (PWA) for Laravel by CRIZPRZ

[![Laravel 5.x](https://img.shields.io/badge/Laravel-5.x-orange.svg)](https://laravel.com/docs/5.8)
[![Laravel 6.x](https://img.shields.io/badge/Laravel-6.x-blue.svg)](https://laravel.com/docs/6.x)
[![Laravel 7.x](https://img.shields.io/badge/Laravel-7.x-red.svg)](https://laravel.com/docs/7.x)
[![Laravel 8.x](https://img.shields.io/badge/Laravel-8.x-red.svg)](https://laravel.com)
[![Latest Stable Version](https://poser.pugx.org/crizprz/pwacrizprz/v/stable)](https://packagist.org/packages/silviolleite/laravelpwa)
[![Total Downloads](https://poser.pugx.org/crizprz/pwacrizprz/downloads)](https://packagist.org/packages/crizprz/pwacrizprz)
[![License](https://poser.pugx.org/composer/composer/license)](//packagist.org/packages/crizprz/pwacrizprz)


This package for Laravel converts your project to a [(PWA)](https://developer.mozilla.org/es/docs/Web/Progressive_web_apps). When entering the site from a device it will ask to add to the home screen

Your application should work with navigation within the HTML. (no reliance on the browser back or forward button).


REQUIREMENTS
====

Composer v.2 is recommended

progressive web applications require working over the [HTTPS](https://developers.google.com/search/docs/advanced/security/https?hl=es) protocol, unless you are working with localhost, if your site does not have an SSL certificate visit [Let's Encrypt](https://letsencrypt.org/es/)

## INSTALLATION

Install the package through [Composer](http://getcomposer.org/).

```bash
composer require crizprz/pwacrizprz
```
Or add the following to your `composer.json` file :
```json
"require": {
    "crizprz/pwacrizprz": "^1.0",
},
```

## CONFIGURATION
1. Open `config/app.php` and add this line to your Service Providers Array.
```php
Crizprz\Pwacrizprz\Providers\PwacrizprzServiceProvider::class,
```

2. publish the assets.
```php
php artisan vendor:publish --provider="Crizprz\Pwacrizprz\Providers\PwacrizprzServiceProvider"
```

3. clear the views.
```php
php artisan view:clear
```

## HOW TO USE
-   [Manifest](#manifest)
-   [Blade Directive](#directive)
-   [Meta Tags](#meta)
-   [Possible mistakes](#mistakes)
-   [Service Worker](#serviceworker)
-   [Contributing](#contributing)
-   [License](#license)

## manifest
configure [manifest.json](https://web.dev/add-manifest/) file located in `public_path/manifest.json`
# Key manifest properties
`"short_name": "My PWA",` You must provide at least the `short_name` or `name` property.

`"start_url": "/"` The `start_url` is required and tells the browser where your application should start when it is launched.

`"background_color": "#5DCCE2"` The `background_color` property is used on the splash screen when the application is first launched on mobile.

`"display": "standalone"` You can customize what browser UI is shown when your app is launched. Example: `fullscreen`, `standalone`, `minimal-ui`, for more details visit [manifest.json](https://web.dev/add-manifest/).

`"theme_color": "#5DCCE2"` The `theme_color` sets the color of the tool bar, and may be reflected in the app's preview in task switchers. The theme_color should match the meta theme color specified in your document head. ```<meta name="theme-color" content="#5DCCE2">```
This meta has already been included in the file `resources/views/PWA/metatags.blade.php`.

`"icons": "[{}]"` When a user installs your PWA, you can define a set of icons for the browser to use on the home screen, app launcher, task switcher, splash screen, and so on.

`"shortcuts": "[{}]"` The `shortcuts` property is an array of [app shortcut](https://web.dev/app-shortcuts/) objects whose goal is to provide quick access to key tasks within your app. Each member is a dictionary that contains at least a name and a url
```php
{
    "short_name": "My PWA",
    "name": "PWA by CRIZPRZ",
    "start_url": "/",
    "background_color": "#5DCCE2",
    "theme_color": "#5DCCE2",
    "display": "standalone",
    "orientation": "portrait",
    "status_bar": "black",
    "icons": [{
            "src": "/img/icons/icon_72px.png",
            "type": "image/png",
            "sizes": "72x72",
            "purpose": "maskable any"
        },
        {
            "src": "/img/icons/icon_96px.png",
            "type": "image/png",
            "sizes": "96x96",
            "purpose": "maskable any"
        },
        {
            "src": "/img/icons/icon_128px.png",
            "type": "image/png",
            "sizes": "128x128",
            "purpose": "maskable any"
        },
        {
            "src": "/img/icons/icon_144px.png",
            "type": "image/png",
            "sizes": "144x144",
            "purpose": "maskable any"
        },
        {
            "src": "/img/icons/icon_152px.png",
            "type": "image/png",
            "sizes": "152x152",
            "purpose": "maskable any"
        },
        {
            "src": "/img/icons/icon_192px.png",
            "type": "image/png",
            "sizes": "192x192",
            "purpose": "maskable any"
        },
        {
            "src": "/img/icons/icon_384px.png",
            "type": "image/png",
            "sizes": "384x384",
            "purpose": "maskable any"
        },
        {
            "src": "/img/icons/icon_512px.png",
            "type": "image/png",
            "sizes": "512x512",
            "purpose": "maskable any"
        }
    ],
    "shortcuts": [{
            "name": "Register",
            "short_name": "Register in site web",
            "description": "Redirect register",
            "url": "/register",
            "icons": [{ "src": "/img/icons/icon_192px.png", "sizes": "192x192" }]
        },
        {
            "name": "Login",
            "short_name": "Login",
            "description": "Redirect Login",
            "url": "/login",
            "icons": [{ "src": "/img/icons/icon_192px.png", "sizes": "192x192" }]
        }

    ]
}
```

## directive
Include within your <head> the blade directive @PWACRIZPRZ
```php
<html>
  head>
    <title>My Title</title>
    ...
    @PWACRIZPRZ
  </head>
  <body>
    ..
  </body>
</html>
```

## meta
The meta tags must be included for the correct deployment to an android and IOS device.
You find this in the file `resources/views/PWA/metatags.blade.php`.

in this file the service worker is registered, the meta theme-color is configured and the splash screens for IOS devices are included.

```php
<link rel="manifest" href="{{ asset('manifest.json') }}">
<script src="{{ asset('js/registerSW.js') }}" charset="utf-8"></script>

{{-- Android --}}
<meta name="theme-color" content="#5DCCE2">

{{-- IOS --}}
<meta name="apple-mobile-web-app-capable" content="yes">

<link rel="apple-touch-icon" href="img/icons/icon_192px.png">
<link rel="apple-touch-icon" sizes="152x152" href="img/icons/icon_152px.png">
<link rel="apple-touch-icon" sizes="180x180" href="img/icons/icon_192px.png">
<link rel="apple-touch-icon" sizes="167x167" href="img/icons/icon_152px.png">

<!-- iPhone Xs Max (1242px x 2688px) -->
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" href="img/splashScreen/SplashScreen-1242x2688.png">
<!-- iPhone Xr (828px x 1792px) -->
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" href="img/splashScreen/SplashScreen-828x1792.png">
<!-- iPhone X, Xs (1125px x 2436px) -->
<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="img/splashScreen/SplashScreen-1125x2436.png">
<!-- iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px) -->
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" href="img/splashScreen/SplashScreen-1242x2208.png">
<!-- iPhone 8, 7, 6s, 6 (750px x 1334px) -->
<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="img/splashScreen/SplashScreen-750x1334.png">
<!-- iPad Pro 12.9" (2048px x 2732px) -->
<link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" href="img/splashScreen/SplashScreen-2048x2732.png">
<!-- iPad Pro 11” (1668px x 2388px) -->
<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" href="img/splashScreen/SplashScreen-1668x2388.png">
<!-- iPad Pro 10.5" (1668px x 2224px) -->
<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" href="img/splashScreen/SplashScreen-1668x2224.png">
<!-- iPad Mini, Air (1536px x 2048px) -->
<link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" href="img/splashScreen/SplashScreen-1536x2048.png">

<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<meta name="apple-mobile-web-app-title" content="PWA by CRIZPRZ">


<style>
    body{
        overscroll-behavior-y: contain;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
    }
</style>
```

## mistakes
1. Check syntax of `public_path/manifest.json` .

2. when the `manifest.json` file is edited run the artisan command `php artisan view:clear`.

3. Check syntax of `sw.js` .

4. check icon names and splash screen match `public_path/manifest.json`, `public_path/sw.js`, and `resources/views/PWA/metatags.blade.php` files .

## ServiceWorker
you can customize the service worker in the file `public_path/sw.js`
By default, the service worker implemented by this app is:

Note that if files are added to the cache when registering the new service worker removes the old cache and creates the new one
```php
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
```

## Contributing
To contribute fork the repository, make your changes then send a pull request on GitHub, then send CRIZPRZ an [email](mailto:al221711754@gmail.com).

## License

The Laravel CRIZPRZ\PWACRIZPRZ open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

