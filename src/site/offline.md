---
title: It looks like you are offline
subtitle: Can't connect to madebymike.com.au at the moment.
permalink: offline.html
layout: default
---

This page is not saved for offline reading. We will do that next time you visit. For now, these pages are available offline:

<div class="offline-list">
  <!-- <p>Sorry, no pages saved offline yet :(</p> -->
</div>

<script>
// Get a list of cache keys
window.caches.keys().then(function(cacheNames){

  // Find the key that matches my cacheName
  cacheName = cacheNames.filter(function(cacheName) {
    return cacheName.indexOf("::madebymike") !== -1;
  })[0]

  // Open the cache for that key
  caches.open(cacheName).then(function(cache) {
    return cache
      .keys()
      .then(function(requests) {
        var urls = requests
          .filter(function(request) {
            var isWritingPage = request.url.indexOf("/writing/") !== -1
            var isWritingIndexPage = /\/writing\/[0-9]/.test()
            return isWritingPage && !isWritingIndexPage;
          })
          .map(function(request) {
            return request.url;
          });
        return urls.sort();
      })
      .then(function(urls) {
          var getURLs = function(){
              if(!urls.length) {
                return '<p>Sorry, no pages saved offline yet :(</p>';
              }
              return urls.map(function(url){
                  return '<li><a href="'+url+'">' + url + '</a></li>'
              }).join('')
          }  
        document.querySelector(".offline-list").innerHTML = '<ul>' + getURLs() + '</ul>'
      });
  })
});
</script>
