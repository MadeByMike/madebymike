import lozad from 'lozad'
import 'intersection-observer';

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

// Add check list styles
const listItems = document.querySelectorAll('.note .note-body li a');
for (var i = 0; i < listItems.length; i++) {
  const prepend = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  
  prepend.setAttribute("class", "link-check"); 
  prepend.innerHTML = '<use xlink:href="#icon-tick"></use>';
  listItems[i].insertBefore(prepend, listItems[i].firstChild);
}

//Lozad
const nodeList = document.querySelectorAll('img[data-src]');
const observer = lozad(nodeList);
observer.observe();

//SW
if ('serviceWorker' in navigator) {
  // Yay, service workers work!
  navigator.serviceWorker.register('/sw.js');
}
