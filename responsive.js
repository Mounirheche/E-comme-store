(function () {
  'use strict';

  var BURGER_SVG = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="2" y1="5" x2="16" y2="5"/><line x1="2" y1="9" x2="16" y2="9"/><line x1="2" y1="13" x2="16" y2="13"/></svg>';
  var CLOSE_SVG  = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="3" x2="15" y2="15"/><line x1="15" y1="3" x2="3" y2="15"/></svg>';

  function init() {
    var nav = document.getElementById('main-nav');
    if (!nav) return;

    // Identify the nav-links container: the child that holds <a> tags
    var navLinksEl = null;
    var rightControls = null;
    var children = Array.from(nav.children);

    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (child.querySelector('a') && child.querySelectorAll('a').length >= 2) {
        navLinksEl = child;
      }
    }
    // Right controls = last child (theme toggle, cart, etc.)
    rightControls = children[children.length - 1];

    if (navLinksEl) navLinksEl.id = 'nav-links';

    // ── Create hamburger button ──────────────────────────
    var burger = document.createElement('button');
    burger.id = 'nav-hamburger';
    burger.setAttribute('aria-label', 'القائمة');
    burger.innerHTML = BURGER_SVG;

    // Insert hamburger at start of right-controls group
    if (rightControls) {
      rightControls.insertBefore(burger, rightControls.firstChild);
    } else {
      nav.appendChild(burger);
    }

    // ── Create mobile dropdown menu ──────────────────────
    var mobileMenu = document.createElement('div');
    mobileMenu.id = 'nav-mobile-menu';
    mobileMenu.setAttribute('aria-hidden', 'true');

    if (navLinksEl) {
      var links = navLinksEl.querySelectorAll('a');
      links.forEach(function (link) {
        var clone = link.cloneNode(true);
        // Remove inline color overrides so CSS controls appearance
        clone.removeAttribute('style');
        mobileMenu.appendChild(clone);
      });
    }

    document.body.appendChild(mobileMenu);

    // ── Toggle logic ─────────────────────────────────────
    var menuOpen = false;

    function openMenu() {
      menuOpen = true;
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      burger.innerHTML = CLOSE_SVG;
      burger.setAttribute('aria-label', 'إغلاق القائمة');
    }

    function closeMenu() {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      burger.innerHTML = BURGER_SVG;
      burger.setAttribute('aria-label', 'القائمة');
    }

    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      menuOpen ? closeMenu() : openMenu();
    });

    document.addEventListener('click', function (e) {
      if (menuOpen && !mobileMenu.contains(e.target) && e.target !== burger) {
        closeMenu();
      }
    });

    // Close when a link is clicked
    mobileMenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' || e.target.closest('a')) closeMenu();
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    });

    // ── Sync light/dark theme on mobile menu ─────────────
    var htmlEl = document.documentElement;
    var observer = new MutationObserver(function () {
      // dz-light class changes handled via CSS — nothing extra needed
    });
    observer.observe(htmlEl, { attributes: true, attributeFilter: ['class'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
