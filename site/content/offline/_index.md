---
title: Offline
class: offline
---

<article>
  <section class="container">
    <h1 class="display-title">It looks like you are offline</h1>

    <p class="ptl lead">We can't connect to madebymike.com.au at the moment.</p>

    <div class="offline-content"></div>
  </section>

  <script>
    if ('serviceWorker' in navigator) {

      navigator.serviceWorker.register('/sw.js');

      function getCachedPages(cb) {
        return new Promise(function (res, rej) {
          window.caches.keys().then(function (cacheNames) {

            cacheName = cacheNames.filter(function (cacheName) {
              return cacheName.indexOf("::madebymike") !== -1;
            })[0]

            caches.open(cacheName).then(function (cache) {
              return cache.keys().then(function (requests) {
                var urls = requests.filter(function (request) {
                  return request.url.indexOf("/writing/") !== -1;
                }).map(function (request) {
                  return request.url;
                });
                res(urls.sort());
              });
            });

          });
        });
      }

      getCachedPages().then(function (urls) {
        if (urls.length) {
          document.querySelector('.offline-content').innerHTML =
            '<p>We haven’t saved this page for offline reading. We’ll do that as soon as we can. These pages are available offline:</p>';
          var ul = document.createElement('ul');
          urls.forEach(function (url) {
            var li = document.createElement('li');
            li.innerHTML = '<a href="' + url + '">' + url + '</a>';
            ul.appendChild(li);
          });
          document.querySelector('.offline-content').appendChild(ul);
        }
      });

    }
  </script>
</article>