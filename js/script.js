(function () {
  var PAGE_W = 393;
  var MAX_W = 744;
  var page = document.getElementById("page");
  var canZoom = typeof page.style.zoom === "string";

  function fit() {
    var windowWidth = window.innerWidth;
    var targetWidth = Math.min(windowWidth, MAX_W);
    var scale = targetWidth / PAGE_W;
    
    if (canZoom) {
      page.style.zoom = String(scale);
      page.style.transform = "";
    } else {
      page.style.transform = "scale(" + scale + ")";
      page.style.transformOrigin = "top center";
    }
  }

  fit();
  window.addEventListener("resize", fit);
})();