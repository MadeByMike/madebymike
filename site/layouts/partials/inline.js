function loadCSS(e, n, t) {
  var i = window.document.createElement("link"),
    s = n || window.document.getElementsByTagName("script")[0];
  (i.rel = "stylesheet"),
    (i.href = e),
    (i.media = "only x"),
    s.parentNode.insertBefore(i, s),
    setTimeout(function() {
      i.media = t || "all";
    });
}

if (window.CSS && CSS.supports("color", "var(--test)")) {
  loadCSS("/css/styles.css");
} else {
  loadCSS("/css/styles.old.css");
}
