(function () {
  var PAGE_W = 393;
  var PAGE_H = 4674;
  var MAX_SCALE = 1.5; 
  var page = document.getElementById("page");
  var stage = document.getElementById("stage");
  var canZoom = typeof page.style.zoom === "string";

  function fit() {
    var scale = window.innerWidth / PAGE_W;
    
    if (scale > MAX_SCALE) {
      scale = MAX_SCALE;
    }
    
    if (canZoom) {
      page.style.zoom = String(scale);
      page.style.transform = "";
    } else {
      page.style.transform = "scale(" + scale + ")";
    }
    stage.style.height = PAGE_H * scale + "px";
  }

  fit();
  window.addEventListener("resize", fit);
})();