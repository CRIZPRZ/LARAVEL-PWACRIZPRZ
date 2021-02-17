if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
    console.log("Register Service Worker is successful");
} else {
    console.log("the browser does not support the serviceWorker");
}
