// JS Goes here - ES6 supported
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

const listItems = document.querySelectorAll('.note .note-body li a');

for (var i = 0; i < listItems.length; i++) {
  const prepend = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  prepend.classList.add("link-check"); 
  prepend.innerHTML = '<use xlink:href="#icon-tick"></use>';
  listItems[i].insertBefore(prepend, listItems[i].firstChild);
}