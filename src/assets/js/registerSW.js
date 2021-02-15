if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
} else {
    console.log("the browser does not support the serviceWorker");
}
