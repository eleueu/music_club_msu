(function() {
    'use strict';

    const page = document.getElementById('page');
    const stage = document.getElementById('stage');
    
    const BASE_WIDTH = 393;
    const MAX_WIDTH = 744;
    const MIN_ZOOM = 0.3;
    
    let currentZoom = 1;
    let resizeTimeout = null;

    function calculateZoom() {
        const windowWidth = window.innerWidth;
        let zoom = windowWidth / BASE_WIDTH;
        const maxZoom = MAX_WIDTH / BASE_WIDTH;
        zoom = Math.min(zoom, maxZoom);
        zoom = Math.max(zoom, MIN_ZOOM);
        return zoom;
    }

    function applyZoom(zoom) {
        currentZoom = zoom;
        page.style.transform = 'scale(' + zoom + ')';
        page.style.transformOrigin = 'top center';
        
        if (zoom < 1) {
            stage.style.width = (BASE_WIDTH * zoom) + 'px';
            stage.style.minWidth = (BASE_WIDTH * zoom) + 'px';
        } else {
            stage.style.width = '100%';
            stage.style.minWidth = 'auto';
        }
    }

    function updateZoom() {
        const newZoom = calculateZoom();
        if (Math.abs(newZoom - currentZoom) > 0.001) {
            applyZoom(newZoom);
        }
    }

    function handleResize() {
        if (resizeTimeout) {
            cancelAnimationFrame(resizeTimeout);
        }
        resizeTimeout = requestAnimationFrame(updateZoom);
    }

    updateZoom();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', function() {
        setTimeout(updateZoom, 300);
    });

})();