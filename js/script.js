(function () {
  var BASE_WIDTH = 393;   // ширина макета, на который завёрстана страница
  var MAX_WIDTH = 744;    // ширина, после которой страница перестаёт расти

  var page = document.getElementById("page");
  var stage = document.getElementById("stage");
  if (!page || !stage) return;

  var canZoom = typeof page.style.zoom === "string";

  // натуральная (немасштабированная) высота страницы в её собственных 393px-координатах,
  // снимаем один раз, до первого применения zoom/transform
  var naturalHeight = page.offsetHeight;

  function fit() {
    var scale = Math.min(window.innerWidth, MAX_WIDTH) / BASE_WIDTH;

    if (canZoom) {
      page.style.zoom = String(scale);
      page.style.transform = "";
    } else {
      page.style.transform = "scale(" + scale + ")";
    }

    stage.style.height = naturalHeight * scale + "px";
  }

  fit();
  window.addEventListener("resize", fit);
  window.addEventListener("orientationchange", fit);
})();
