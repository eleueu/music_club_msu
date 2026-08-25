(function () {
  var BASE_WIDTH = 393;   // ширина макета, на который завёрстана страница
  var MAX_WIDTH = 744;    // ширина, после которой страница перестаёт расти

  var page = document.getElementById('page');
  var stage = document.getElementById('stage');

  if (!page || !stage) return;

  function applyScale() {
    var viewportWidth = window.innerWidth;
    var scale = Math.min(viewportWidth, MAX_WIDTH) / BASE_WIDTH;

    page.style.transform = 'scale(' + scale + ')';

    // transform не влияет на высоту в потоке документа,
    // поэтому явно задаём #stage реальную (уже отмасштабированную) высоту,
    // иначе внизу останется пустое место (scale < 1) или страница обрежется (scale > 1)
    stage.style.height = (page.offsetHeight * scale) + 'px';
  }

  applyScale();

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyScale, 50);
  });

  window.addEventListener('orientationchange', applyScale);
})();
