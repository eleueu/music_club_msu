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

document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('role');
    const arrow = document.querySelector('.select-arrow');

    if (select && arrow) {
        select.addEventListener('change', function() {
            arrow.classList.remove('rotated');
        });

        select.addEventListener('focus', function() {
            arrow.classList.add('rotated');
        });

        select.addEventListener('blur', function() {
            arrow.classList.remove('rotated');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.field-input');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const field = this.closest('.field');
            if (field) {
                if (this.value.trim() !== '') {
                    field.classList.add('filled');
                } else {
                    field.classList.remove('filled');
                }
            }
        });
    });
});

document.querySelectorAll('textarea.field-input').forEach(textarea => {
    function autoResize() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    }
    
    textarea.addEventListener('input', autoResize);
    
    if (textarea.value) {
        autoResize.call(textarea);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('success.html')) {
        const refillBtn = document.getElementById('refill-btn');
        const shareBtn = document.getElementById('share-btn');
        const homeBtn = document.getElementById('home-btn');

        if (refillBtn) {
            refillBtn.addEventListener('click', function() {
                window.location.href = '../join/index.html';
            });
        }

        if (homeBtn) {
            homeBtn.addEventListener('click', function() {
                window.location.href = '../index.html';
            });
        }

        if (shareBtn) {
            shareBtn.addEventListener('click', function() {
                const url = window.location.href.replace('success.html', 'index.html');

                if (navigator.share) {
                    navigator.share({
                        title: 'Анкета для вступления в Клуб классической музыки МГУ',
                        url: url
                    }).catch(function(err) {
                        if (err.name !== 'AbortError') {
                            console.warn('Ошибка при попытке поделиться:', err);
                        }
                    });
                } else {
                    navigator.clipboard.writeText(url).then(function() {
                        const originalText = shareBtn.textContent;
                        shareBtn.textContent = 'Ссылка скопирована!';
                        setTimeout(function() {
                            shareBtn.textContent = originalText;
                        }, 3000);
                    }).catch(function() {
                        alert('Не удалось скопировать ссылку. Попробуйте вручную: ' + url);
                    });
                }
            });
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const pastList = document.querySelector('.past-list');
    const hiddenCards = Array.from(document.querySelectorAll('.past-card-hidden'));
    const STEP = 6;

    if (!showMoreBtn || !pastList || hiddenCards.length === 0) return;

    let shown = 0;

    showMoreBtn.addEventListener('click', function() {
        const willHideBtn = (shown + STEP) >= hiddenCards.length;
        const visibleCards = pastList.querySelectorAll('.past-card:not(.past-card-hidden)');
        const anchor = willHideBtn
            ? visibleCards[visibleCards.length - 1]
            : showMoreBtn;

        const anchorTopBefore = anchor.getBoundingClientRect().top;

        for (let i = shown; i < shown + STEP && i < hiddenCards.length; i++) {
            hiddenCards[i].classList.remove('past-card-hidden');
        }
        shown += STEP;

        if (willHideBtn) {
            showMoreBtn.style.display = 'none';
        }

        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                const anchorTopAfter = anchor.getBoundingClientRect().top;
                const diff = anchorTopAfter - anchorTopBefore;

                if (diff !== 0) {
                    window.scrollBy(0, diff);
                }
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const pastCards = document.querySelectorAll('.past-card');

    if (!modalOverlay || !modalClose || pastCards.length === 0) return;

    const modalPic = document.getElementById('modalPic');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalDay = document.getElementById('modalDay');
    const modalMonth = document.getElementById('modalMonth');
    const modalYear = document.getElementById('modalYear');
    const modalLinks = document.getElementById('modalLinks');

    const LIGHT_DIR = 'light';

    function getLightSrc(imgSrc) {
        if (!imgSrc) return '';
        const idx = imgSrc.lastIndexOf('/');
        if (idx === -1) return imgSrc;
        return imgSrc.slice(0, idx + 1) + LIGHT_DIR + '/' + imgSrc.slice(idx + 1);
    }

    function addLink(url, label) {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.className = 'register-btn';
        a.textContent = label;
        modalLinks.appendChild(a);
    }

    function openModal(card) {
        modalTitle.textContent = card.dataset.title || '';
        modalSubtitle.textContent = card.dataset.subtitle || '';
        modalDay.textContent = card.dataset.day || '';
        modalMonth.textContent = card.dataset.month || '';
        modalYear.textContent = card.dataset.year || '';

        const cardImg = card.querySelector('img');

        if (modalPic) {
            const lightSrc = cardImg
                ? getLightSrc(cardImg.getAttribute('src'))
                : '';

            modalPic.onerror = function () {
                if (cardImg) {
                    modalPic.src = cardImg.getAttribute('src');
                }
                modalPic.onerror = null;
            };

            modalPic.src = lightSrc;
            modalPic.alt = (card.dataset.title || '') + ' — афиша';
        }

        modalLinks.innerHTML = '';

        let links = [];
        try {
            links = JSON.parse(card.dataset.links || '[]');
        } catch (e) {
            console.warn('Не удалось разобрать data-links у карточки:', card.dataset.title, e);
            links = [];
        }

        links.forEach(function(item) {
            const label = item.label || (item.type === 'video' ? 'Смотреть видео' : 'Смотреть фотоальбом');
            addLink(item.url, label);
        });

        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    pastCards.forEach(function(card) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            openModal(card);
        });
    });

    modalClose.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
            closeModal();
        }
    });
});