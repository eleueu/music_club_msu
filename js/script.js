(function () {
  var PAGE_W = 393;
  var MAX_W = 744;
  var page = document.getElementById("page");
  var burger = document.getElementById("burger");
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

    if (burger) {
        var pageOffset = (windowWidth - targetWidth) / 2;
        var burgerLeft = pageOffset + (270 * scale);
        var burgerTop = 0 * scale; 
        
        burger.style.left = burgerLeft + 'px';
        burger.style.top = burgerTop + 'px';
        
        burger.style.transform = 'scale(' + scale + ')';
        burger.style.transformOrigin = 'top left';
    }

    if (sideMenu) {
        
    }
  }

  fit();
  window.addEventListener("resize", fit);
})();

var burgerBtn = document.getElementById('burger');
var sideMenu = document.getElementById('sideMenu');
var overlay = document.getElementById('overlay');

function toggleMenu() {
    sideMenu.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = sideMenu.classList.contains('open') ? 'hidden' : '';
}

burgerBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sideMenu.classList.contains('open')) {
        toggleMenu();
    }
});