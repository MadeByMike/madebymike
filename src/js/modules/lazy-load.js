import lozad from 'lozad';

function loadScript(src, done) {
    var js = document.createElement('script');
    js.src = src;
    js.onload = function() {
        done();
    };
    js.onerror = function() {
        done(new Error('Failed to load script ' + src));
    };
    document.head.appendChild(js);
}

function startObserving() {
    const nodeList = document.querySelectorAll('img[data-src]');
    const observer = lozad(nodeList);
    observer.observe();
}


if('IntersectionObserver' in window) {
    startObserving();
} else {
    loadScript('/js/intersection-observer.js', startObserving);
}
