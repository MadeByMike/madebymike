var CACHE_NAME = 'v6::madebymike';
var urlsToCache = [
    '/',
    '/offline.html',
    '/css/styles.min.css'
];

// Install
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          console.log('Deleting '+ cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Fetch
self.addEventListener('fetch', function(event) {

  var requestURL = new URL(event.request.url);

  event.respondWith(

    // Open cache
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function(response) {

        // If possible grab the page from the network
        var fetchPromise = fetch(event.request).then(function(networkResponse) {

          // Check if the network request is successful
          // don't update the cache with error pages!!
          // Also check the request domain matches service worker domain
          if (networkResponse.ok && requestURL.origin == location.origin){
            // Keep cache up-to-date by
            cache.put(event.request, networkResponse.clone());
          }

          return networkResponse;

        }).catch(function() {
          // Can't access the network return an offline page from the cache
          return caches.match('/offline.html');
        });

        // If the page is in the cache, return it. Even with network access
        // this is fast. The network request is a promise and we're not
        // waiting for it to resolve to return a cached response.
        // If there is no cache and the network response cannot resolve,
        // an offline page will be returned from the cache.
        return response || fetchPromise;

      })
    })

  )

});

// List pages
self.addEventListener('message', function(event) {
  caches.open(CACHE_NAME).then(function(cache) {

    return cache.keys().then(function(requests) {

      var urls = requests.filter(function(request){
        return request.url.indexOf("/writing/") !== -1;
      }).map(function(request) {
        return request.url;
      });
      return urls.sort();

    }).then(function(urls) {
      event.ports[0].postMessage(urls);
    });

  });
});
