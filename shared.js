/**
 * shared.js — DZ One shared cart/checkout/toast library
 * Include AFTER config.js and supabase.js
 */
(function() {
  'use strict';

  // Anti-flash: inject CSS + class on <html> BEFORE any body content renders
  try {
    if (localStorage.getItem('dz_theme') === 'light') {
      document.documentElement.classList.add('dz-light');
      var _af = document.createElement('style');
      _af.id = 'dz-preflash';
      _af.textContent =
        'html.dz-light,html.dz-light body,html.dz-light #page-root{background:#F0F4FF!important;color:#111827!important}' +
        'html.dz-light [style*="#070B12"]{background:#F0F4FF!important}' +
        'html.dz-light [style*="#0A1220"]{background:#E8EEFF!important}' +
        'html.dz-light [style*="#0A1120"]{background:#ECEFFF!important}' +
        'html.dz-light [style*="#080E1C"]{background:#EEF3FF!important}' +
        'html.dz-light [style*="#0D1421"]{background:#EEF2FF!important}' +
        'html.dz-light [style*="#040710"]{background:#E4EBFF!important}' +
        'html.dz-light [style*="#141E30"]{background:#FFFFFF!important}' +
        'html.dz-light [style*="#1C2A42"]{background:#EDF2FF!important}' +
        'html.dz-light [style*="#1E2E48"]{background:#DCE7FF!important}' +
        'html.dz-light [style*="#111B2E"]{background:#F8FAFF!important}' +
        'html.dz-light [style*="#0E1929"]{background:#FFFFFF!important}' +
        'html.dz-light [style*="#111B30"]{background:#F8FAFF!important}' +
        'html.dz-light [style*="#060D1A"]{background:#F0F4FF!important}' +
        'html.dz-light [style*="color:#fff"]{color:#111827!important}' +
        'html.dz-light [style*="color: #fff"]{color:#111827!important}' +
        'html.dz-light [style*="color:#ffffff"]{color:#111827!important}' +
        'html.dz-light [style*="color:#FFFFFF"]{color:#111827!important}' +
        'html.dz-light [style*="color:#94A3B8"]{color:#374151!important}' +
        'html.dz-light [style*="color:#475569"]{color:#4B5563!important}';
      document.head.appendChild(_af);
    }
  } catch(e) {}

  // ─── Supabase client ─────────────────────────────────────────────────────────
  var sb = null;
  try {
    if (window.supabase && window.SUPABASE_URL && window.SUPABASE_URL.indexOf('supabase.co') !== -1) {
      sb = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    }
  } catch(e) { console.error('DZ shared.js Supabase init:', e); }
  window.DZ_SB = sb;

  // ─── Product map ─────────────────────────────────────────────────────────────
  window.DZ_PRODUCTS = {};

  // ─── Category visual styles ──────────────────────────────────────────────────
  var CAT_STYLES = {
    'معالجات':        { bg:'#1A2B4A', dark:'#0C1525', glow:'rgba(37,99,235,0.14)',  text:'#60A5FA', cls:'prod-card-blue'   },
    'كروت شاشة':     { bg:'#112822', dark:'#071210', glow:'rgba(16,185,129,0.11)',  text:'#34D399', cls:'prod-card-green'  },
    'ذاكرة RAM':      { bg:'#1C1A40', dark:'#0A0819', glow:'rgba(99,102,241,0.12)',  text:'#818CF8', cls:'prod-card-indigo' },
    'تخزين':          { bg:'#1E1535', dark:'#0D0820', glow:'rgba(139,92,246,0.11)',  text:'#A78BFA', cls:'prod-card-purple' },
    'لوحات أم':       { bg:'#2A1A10', dark:'#130C05', glow:'rgba(251,146,60,0.11)',  text:'#FB923C', cls:'prod-card-orange' },
    'تجميعات جاهزة': { bg:'#14233A', dark:'#080E1C', glow:'rgba(37,99,235,0.13)',   text:'#60A5FA', cls:'prod-card-blue'   },
    'شاشات':          { bg:'#0D1E2E', dark:'#060F18', glow:'rgba(56,189,248,0.11)',  text:'#38BDF8', cls:'prod-card-sky'    },
    'تبريد':          { bg:'#0C1E24', dark:'#040F13', glow:'rgba(103,232,249,0.11)', text:'#67E8F9', cls:'prod-card-sky'    },
    'أبراج':          { bg:'#171C26', dark:'#0A0D14', glow:'rgba(148,163,184,0.09)', text:'#94A3B8', cls:'prod-card-gray'   },
    'طاقة':           { bg:'#261A00', dark:'#120D00', glow:'rgba(251,191,36,0.10)',  text:'#FBBF24', cls:'prod-card-amber'  }
  };
  window.DZ_catStyle = function(cat) {
    return CAT_STYLES[cat] || CAT_STYLES['معالجات'];
  };

  // ─── Stars helper ────────────────────────────────────────────────────────────
  function stars(r) {
    var n = Math.min(5, Math.round(r || 4.5));
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  }

  // ─── Skeleton card ───────────────────────────────────────────────────────────
  window.DZ_skeleton = function() {
    return '<div style="background:#141E30;border:1px solid rgba(255,255,255,0.06);border-radius:18px;overflow:hidden;">' +
      '<div style="height:196px;background:linear-gradient(90deg,#141E30 25%,#1E2E48 50%,#141E30 75%);background-size:200% 100%;animation:shimmer 1.5s ease-in-out infinite;"></div>' +
      '<div style="padding:20px 22px;">' +
        '<div style="height:10px;width:45%;background:#1E2E48;border-radius:5px;margin-bottom:12px;"></div>' +
        '<div style="height:14px;width:75%;background:#1E2E48;border-radius:5px;margin-bottom:12px;"></div>' +
        '<div style="height:10px;width:30%;background:#1E2E48;border-radius:5px;margin-bottom:16px;"></div>' +
        '<div style="height:22px;width:50%;background:#1E2E48;border-radius:5px;margin-bottom:16px;"></div>' +
        '<div style="height:42px;background:#1E2E48;border-radius:10px;"></div>' +
      '</div></div>';
  };

  // ─── Image HTML ──────────────────────────────────────────────────────────────
  function resolveImg(raw) {
    var img = raw || '';
    // Handle JSON array stored as string: ["data:..."] or ["https://..."]
    if (img.charAt(0) === '[') {
      try { var arr = JSON.parse(img); if (arr && arr[0]) img = arr[0]; } catch(e) {}
    }
    return img;
  }

  function imgHTML(p) {
    var img = resolveImg(p.img);
    if (img && (img.indexOf('data:') === 0 || img.indexOf('http') === 0 || img.charAt(0) === '/')) {
      return '<img src="' + img + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;" onerror="this.style.display=\'none\'">';
    }
    return '<span style="font-size:72px;position:relative;z-index:1;">' + (img || '📦') + '</span>';
  }

  // ─── Specs resolver (handles array, JSON-string, PG-literal, newline) ────────
  function resolveSpecs(raw) {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.filter(function(x){ return x && String(x).trim(); });
    if (typeof raw === 'string') {
      var s = raw.trim();
      if (s.charAt(0) === '[') { try { return JSON.parse(s).filter(Boolean); } catch(e) {} }
      if (s.charAt(0) === '{') return s.replace(/^\{|\}$/g,'').split(',').map(function(x){ return x.replace(/^"|"$/g,'').trim(); }).filter(Boolean);
      return s.split('\n').map(function(x){ return x.trim(); }).filter(Boolean);
    }
    return [];
  }
  window.DZ_resolveSpecs = resolveSpecs;

  // ─── Product card HTML ───────────────────────────────────────────────────────
  window.DZ_productCardHTML = function(p, delay, isDeal) {
    var cs   = window.DZ_catStyle(p.category_ar);
    var disc = (p.old_price && p.old_price > p.price) ? Math.round((1 - p.price / p.old_price) * 100) : 0;
    var ps   = p.price.toLocaleString('fr-DZ');
    var ops  = p.old_price ? p.old_price.toLocaleString('fr-DZ') : '';
    var sav  = p.old_price ? (p.old_price - p.price).toLocaleString('fr-DZ') : '';
    var border   = isDeal ? 'rgba(239,68,68,0.18)' : 'rgba(255,255,255,0.06)';
    var btnCls   = isDeal ? 'btn-deal' : 'btn-cart';
    var btnStyle = isDeal ? 'background:linear-gradient(135deg,#EF4444,#B91C1C)' : 'background:linear-gradient(135deg,#2563EB,#1D4ED8)';

    var badgeHTML = '';
    if (isDeal && disc > 0) {
      badgeHTML = '<div style="position:absolute;top:10px;right:10px;padding:5px 14px;background:linear-gradient(135deg,#EF4444,#B91C1C);border-radius:8px;font-size:12px;font-weight:800;color:#fff;box-shadow:0 3px 12px rgba(239,68,68,0.45);z-index:3;">خصم ' + disc + '%</div>';
    } else if (p.badge_ar) {
      badgeHTML = '<div style="position:absolute;top:10px;right:10px;padding:4px 11px;background:#F59E0B;border-radius:6px;font-size:11px;font-weight:800;color:#000;z-index:3;">' + p.badge_ar + '</div>';
    }

    var priceHTML = '';
    if (p.old_price && p.old_price > p.price) {
      priceHTML = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;flex-wrap:wrap;">' +
        '<span style="font-size:21px;font-weight:900;color:#60A5FA;letter-spacing:-0.5px;">' + ps + ' دج</span>' +
        '<span style="font-size:12px;color:#475569;text-decoration:line-through;">' + ops + ' دج</span>' +
        (isDeal ? '<span style="font-size:10px;color:#F87171;background:rgba(239,68,68,0.1);padding:2px 7px;border-radius:5px;font-weight:700;">وفر ' + sav + '</span>' : '') +
        '</div>';
    } else {
      priceHTML = '<div style="font-size:22px;font-weight:900;color:#60A5FA;margin-bottom:16px;letter-spacing:-0.5px;">' + ps + ' دج</div>';
    }

    var wishlistBtn = '<button class="dz-wl-btn" data-wid="' + p.id + '" onclick="DZ_toggleWishlist(' + p.id + ',this)" style="position:absolute;top:10px;left:10px;width:32px;height:32px;background:rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.12);border-radius:8px;color:#94A3B8;cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;z-index:3;transition:all 0.22s;">' + (DZ_isWishlisted(p.id) ? '❤️' : '🤍') + '</button>';

    return '<div data-reveal="1" data-delay="' + (delay || 0) + '" style="opacity:0;">' +
      '<a href="/product.html?id=' + p.id + '" style="text-decoration:none;display:block;" class="dz-prod-link">' +
      '<div class="' + cs.cls + '" style="background:#141E30;border:1px solid ' + border + ';border-radius:18px;overflow:hidden;cursor:pointer;">' +
        '<div class="dz-card-img" style="position:relative;height:196px;background:linear-gradient(155deg,' + cs.bg + ' 0%,' + cs.dark + ' 100%);display:flex;align-items:center;justify-content:center;overflow:hidden;">' +
          '<div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,' + cs.glow + ' 0%,transparent 70%);z-index:2;pointer-events:none;"></div>' +
          imgHTML(p) + badgeHTML + wishlistBtn +
        '</div>' +
        '<div style="padding:20px 22px;">' +
          '<div style="font-size:11px;color:' + cs.text + ';font-weight:700;margin-bottom:7px;">' + (p.brand || '') + ' · ' + (p.category_ar || '') + '</div>' +
          '<h3 style="font-size:15px;font-weight:700;color:#fff;margin:0 0 12px;line-height:1.35;">' + (p.name || '') + '</h3>' +
          '<div style="display:flex;align-items:center;gap:6px;margin-bottom:11px;"><span style="color:#F59E0B;font-size:12px;">' + stars(p.rating) + '</span><span style="font-size:12px;color:#475569;">(' + (p.reviews || 0) + ')</span></div>' +
          (function() {
            var sp = resolveSpecs(p.specs_ar).slice(0, 2);
            if (!sp.length) return '';
            return '<div style="margin-bottom:11px;">' +
              sp.map(function(s){ return '<div style="display:flex;align-items:flex-start;gap:5px;margin-bottom:3px;"><span style="color:#34D399;font-size:10px;flex-shrink:0;margin-top:2px;">✓</span><span style="font-size:11px;color:#475569;line-height:1.4;">' + String(s) + '</span></div>'; }).join('') +
              '</div>';
          })() +
          priceHTML +
          '<button class="' + btnCls + '" data-pid="' + p.id + '" style="width:100%;padding:11px;' + btnStyle + ';border:none;border-radius:10px;color:#fff;font-family:\'Cairo\',sans-serif;font-size:14px;font-weight:700;cursor:pointer;">أضف للسلة</button>' +
        '</div>' +
      '</div>' +
      '</a></div>';
  };

  // ─── Wishlist helpers ────────────────────────────────────────────────────────
  function loadWishlist() {
    try { return JSON.parse(localStorage.getItem('dz_wishlist') || '[]'); } catch(e) { return []; }
  }
  function saveWishlist(wl) {
    try { localStorage.setItem('dz_wishlist', JSON.stringify(wl)); } catch(e) {}
  }
  function DZ_isWishlisted(id) {
    var wl = loadWishlist();
    return wl.some(function(p) { return p.id === id; });
  }
  window.DZ_isWishlisted = DZ_isWishlisted;

  window.DZ_toggleWishlist = function(id, btn) {
    var wl = loadWishlist();
    var idx = -1;
    for (var i = 0; i < wl.length; i++) { if (wl[i].id === id) { idx = i; break; } }
    if (idx >= 0) {
      wl.splice(idx, 1);
      if (btn) btn.textContent = '🤍';
      window.DZ_toast('المفضلة', 'تمت الإزالة من المفضلة');
    } else {
      var p = window.DZ_PRODUCTS[id];
      if (p) { wl.push(p); if (btn) btn.textContent = '❤️'; window.DZ_toast('المفضلة', 'تمت الإضافة للمفضلة'); }
    }
    saveWishlist(wl);
  };

  // ─── Cart state ──────────────────────────────────────────────────────────────
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem('dz_cart') || '[]'); } catch(e) { cart = []; }

  function saveCart() { try { localStorage.setItem('dz_cart', JSON.stringify(cart)); } catch(e) {} }
  function cartTotal() { return cart.reduce(function(s, i) { return s + i.price * (i.qty || 1); }, 0); }

  function updateCartBadge() {
    var n = cart.reduce(function(s, i) { return s + (i.qty || 1); }, 0);
    document.querySelectorAll('#cart-badge').forEach(function(badge) {
      badge.textContent = n;
      badge.style.display = n > 0 ? 'flex' : 'none';
    });
  }

  function renderCartItems() {
    var list = document.getElementById('cart-items-list');
    var footer = document.getElementById('cart-footer');
    if (!list) return;
    if (cart.length === 0) {
      list.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:60px 20px;text-align:center;color:#475569;">' +
        '<svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>' +
        '<span style="font-size:15px;font-weight:600;">السلة فارغة</span>' +
        '<a href="/store.html" style="font-size:13px;color:#60A5FA;text-decoration:none;">تصفح المتجر ←</a></div>';
      if (footer) footer.style.display = 'none';
      return;
    }
    list.innerHTML = cart.map(function(item) {
      var imgPart = (item.img && (item.img.indexOf('data:') === 0 || item.img.indexOf('http') === 0))
        ? '<img src="' + item.img + '" style="width:100%;height:100%;object-fit:cover;border-radius:9px;" onerror="this.parentElement.textContent=\'📦\'">'
        : '<span style="font-size:24px;">' + (item.img || '📦') + '</span>';
      return '<div style="display:flex;align-items:center;gap:14px;padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.06);">' +
        '<div style="width:52px;height:52px;background:#1A2840;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;">' + imgPart + '</div>' +
        '<div style="flex:1;min-width:0;">' +
          '<div style="font-size:13px;font-weight:700;color:#fff;line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + (item.name || '') + '</div>' +
          '<div style="font-size:12px;color:#60A5FA;margin-top:5px;font-weight:700;">' + (item.price * (item.qty || 1)).toLocaleString('fr-DZ') + ' دج</div>' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">' +
          '<button onclick="dzQty(' + item.id + ',-1)" style="width:28px;height:28px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:7px;color:#fff;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;font-family:\'Cairo\',sans-serif;">−</button>' +
          '<span style="font-size:13px;font-weight:700;color:#fff;min-width:18px;text-align:center;">' + (item.qty || 1) + '</span>' +
          '<button onclick="dzQty(' + item.id + ',1)" style="width:28px;height:28px;background:rgba(37,99,235,0.2);border:1px solid rgba(37,99,235,0.3);border-radius:7px;color:#60A5FA;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;font-family:\'Cairo\',sans-serif;">+</button>' +
          '<button onclick="dzRemove(' + item.id + ')" style="width:28px;height:28px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:7px;color:#F87171;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;font-family:\'Cairo\',sans-serif;" title="حذف">×</button>' +
        '</div></div>';
    }).join('');
    if (footer) {
      footer.style.display = 'block';
      var el = document.getElementById('cart-total-amount');
      if (el) { var cu = window.DZ_getLang && window.DZ_getLang() === 'fr'; el.textContent = cartTotal().toLocaleString('fr-DZ') + (cu ? ' DA' : ' دج'); }
    }
  }

  window.dzQty = function(id, delta) {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        cart[i].qty = (cart[i].qty || 1) + delta;
        if (cart[i].qty <= 0) cart.splice(i, 1);
        break;
      }
    }
    saveCart(); updateCartBadge(); renderCartItems();
  };
  window.dzRemove = function(id) {
    cart = cart.filter(function(i) { return i.id !== id; });
    saveCart(); updateCartBadge(); renderCartItems();
  };

  window.DZ_addToCart = function(p, qty) {
    var addQty = (qty && qty > 0) ? qty : 1;
    var found = null;
    for (var i = 0; i < cart.length; i++) { if (cart[i].id === p.id) { found = cart[i]; break; } }
    if (found) { found.qty = (found.qty || 1) + addQty; }
    else { cart.push({ id: p.id, name: p.name, price: p.price, img: p.img || '', category_ar: p.category_ar || '', qty: addQty }); }
    saveCart(); updateCartBadge(); renderCartItems();
    window.DZ_toast('تمت الإضافة', p.name);
    window.DZ_openCart();
  };

  window.DZ_openCart = function() {
    var d = document.getElementById('cart-drawer');
    var o = document.getElementById('cart-overlay');
    if (d) d.style.transform = 'translateX(0)';
    if (o) { o.style.opacity = '1'; o.style.pointerEvents = 'all'; }
    document.body.style.overflow = 'hidden';
  };

  function closeCartDrawer() {
    var d = document.getElementById('cart-drawer');
    var o = document.getElementById('cart-overlay');
    if (d) d.style.transform = 'translateX(100%)';
    if (o) { o.style.opacity = '0'; o.style.pointerEvents = 'none'; }
    document.body.style.overflow = '';
  }

  // ─── Checkout ────────────────────────────────────────────────────────────────
  function openCheckout() {
    closeCartDrawer();
    var sum = document.getElementById('order-summary-items');
    if (sum) {
      sum.innerHTML = cart.map(function(item) {
        return '<div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:13px;">' +
          '<span style="color:#94A3B8;">' + (item.name || '') + ' <span style="color:#475569;">×' + (item.qty || 1) + '</span></span>' +
          '<span style="color:#60A5FA;font-weight:700;">' + (item.price * (item.qty || 1)).toLocaleString('fr-DZ') + ' دج</span></div>';
      }).join('');
    }
    var tot = document.getElementById('order-total-amount');
    if (tot) { var cu2 = window.DZ_getLang && window.DZ_getLang() === 'fr'; tot.textContent = cartTotal().toLocaleString('fr-DZ') + (cu2 ? ' DA' : ' دج'); }
    var m = document.getElementById('checkout-modal');
    if (m) m.style.display = 'flex';
  }

  function closeCheckout() {
    var m = document.getElementById('checkout-modal');
    if (m) m.style.display = 'none';
  }

  function submitOrder(e) {
    e.preventDefault();
    var btn  = document.getElementById('submit-order-btn');
    var name = document.getElementById('c-name').value.trim();
    var phone = document.getElementById('c-phone').value.trim();
    var wilaya = document.getElementById('c-wilaya').value;
    var address = document.getElementById('c-address').value.trim();
    var payment = document.getElementById('c-payment').value;
    if (!name || !phone || !wilaya || !address || !payment) {
      window.DZ_toast('خطأ', 'يرجى ملء جميع الحقول', true); return;
    }
    if (btn) { btn.disabled = true; btn.textContent = window.DZ_tr ? window.DZ_tr('جاري الإرسال...') : 'جاري الإرسال...'; }
    var orderRef = 'DZ-' + Date.now().toString().slice(-8);
    var items = cart.map(function(i) { return { id: i.id, name: i.name, qty: i.qty || 1, price: i.price }; });
    var total = cartTotal();

    function onSuccess() {
      cart = []; saveCart(); updateCartBadge(); closeCheckout();
      var refEl = document.getElementById('success-order-ref');
      if (refEl) refEl.textContent = orderRef;
      var modal = document.getElementById('success-modal');
      if (modal) modal.style.display = 'flex';
      if (btn) { btn.disabled = false; btn.textContent = window.DZ_tr ? window.DZ_tr('تأكيد الطلب ←') : 'تأكيد الطلب ←'; }
    }
    function onError(err) {
      console.error('Order error:', err);
      window.DZ_toast('خطأ في الإرسال', 'حاول مرة أخرى', true);
      if (btn) { btn.disabled = false; btn.textContent = window.DZ_tr ? window.DZ_tr('تأكيد الطلب ←') : 'تأكيد الطلب ←'; }
    }
    if (window.DZ_SB) {
      window.DZ_SB.from('orders').insert({
        order_ref: orderRef, customer_name: name, customer_phone: phone,
        wilaya: wilaya, address: address, payment_method: payment,
        items: items, total: total, status: 'معلق'
      }).then(function(r) { if (r.error) onError(r.error); else onSuccess(); }).catch(onError);
    } else {
      onSuccess();
    }
  }

  // ─── Toast ───────────────────────────────────────────────────────────────────
  window.DZ_toast = function(title, msg, isErr) {
    var t = document.getElementById('dz-toast'); if (!t) return;
    var tr = window.DZ_tr || function(x) { return x; };
    t.querySelector('.toast-title').textContent = tr(title) || '';
    t.querySelector('.toast-msg').textContent = tr(msg) || '';
    t.style.borderColor = isErr ? 'rgba(239,68,68,0.4)' : 'rgba(37,99,235,0.4)';
    t.style.background  = isErr ? 'rgba(20,5,5,0.96)'   : 'rgba(14,20,46,0.96)';
    t.style.transform   = 'translateX(0)';
    t.style.opacity     = '1';
    clearTimeout(t._tid);
    t._tid = setTimeout(function() { t.style.transform = 'translateX(-130%)'; t.style.opacity = '0'; }, 3200);
  };

  // ─── Reveal observer ─────────────────────────────────────────────────────────
  var _revealObs = null;
  window.DZ_setupReveal = function() {
    if (_revealObs) _revealObs.disconnect();
    _revealObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(function() {
          el.style.animation = 'revealUp 0.68s cubic-bezier(0.22,1,0.36,1) forwards';
        }, delay);
        _revealObs.unobserve(el);
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });
    document.querySelectorAll('[data-reveal]').forEach(function(el) {
      _revealObs.observe(el);
    });
  };

  // ─── Navbar scroll ───────────────────────────────────────────────────────────
  window.DZ_setupNav = function() {
    var nav = document.getElementById('main-nav');
    if (!nav) return;
    function onScroll() {
      if (window.scrollY > 60) {
        nav.style.background = 'rgba(4,7,16,0.88)';
        nav.style.backdropFilter = 'blur(22px)';
        nav.style.webkitBackdropFilter = 'blur(22px)';
        nav.style.borderBottomColor = 'rgba(255,255,255,0.07)';
        nav.style.boxShadow = '0 2px 36px rgba(0,0,0,0.45)';
        nav.classList.add('scrolled');
      } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.webkitBackdropFilter = 'none';
        nav.style.borderBottomColor = 'transparent';
        nav.style.boxShadow = 'none';
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  // ─── Theme toggle (persistent, full color transform) ─────────────────────────
  function setupTheme() {
    var toggleBtn   = document.getElementById('theme-toggle');
    var toggleThumb = document.getElementById('theme-thumb');
    var iconMoon    = document.getElementById('icon-moon');
    var iconSun     = document.getElementById('icon-sun');
    var root        = document.getElementById('page-root') || document.body;
    if (!toggleBtn) return;

    // Dark → Light color pairs (longest values first to prevent partial matches)
    var DL = [
      ['rgba(255,255,255,0.16)','rgba(0,0,0,0.13)'],
      ['rgba(255,255,255,0.12)','rgba(0,0,0,0.11)'],
      ['rgba(255,255,255,0.09)','rgba(0,0,0,0.09)'],
      ['rgba(255,255,255,0.08)','rgba(0,0,0,0.08)'],
      ['rgba(255,255,255,0.07)','rgba(0,0,0,0.07)'],
      ['rgba(255,255,255,0.06)','rgba(0,0,0,0.06)'],
      ['rgba(255,255,255,0.05)','rgba(0,0,0,0.05)'],
      ['rgba(255,255,255,0.04)','rgba(0,0,0,0.04)'],
      ['rgba(255,255,255,0.03)','rgba(0,0,0,0.03)'],
      ['rgba(0,0,0,0.78)','rgba(0,0,0,0.45)'],
      ['rgba(0,0,0,0.65)','rgba(0,0,0,0.35)'],
      ['rgba(0,0,0,0.45)','rgba(0,0,0,0.2)'],
      ['#1E293B','#9CA3AF'], ['#1E2E48','#DCE7FF'], ['#1C2A42','#EDF2FF'],
      ['#141E30','#FFFFFF'], ['#0D1421','#EEF2FF'], ['#0A1628','#EEF3FF'],
      ['#0A1220','#E8EEFF'], ['#0A1120','#ECEFFF'], ['#080E1C','#EEF3FF'],
      ['#070B12','#F0F4FF'], ['#040710','#E4EBFF'],
      // card image gradient colors (per category)
      ['#1A2B4A','#DBEAFE'], ['#0C1525','#EFF6FF'],
      ['#112822','#D1FAE5'], ['#071210','#ECFDF5'],
      ['#1C1A40','#E0E7FF'], ['#0A0819','#EEF2FF'],
      ['#1E1535','#EDE9FE'], ['#0D0820','#F5F3FF'],
      ['#2A1A10','#FFEDD5'], ['#130C05','#FFF7ED'],
      ['#14233A','#DBEAFE'],
      ['#0D1E2E','#E0F2FE'], ['#060F18','#F0F9FF'],
      ['#0C1E24','#CFFAFE'], ['#040F13','#ECFEFF'],
      ['#171C26','#F1F5F9'], ['#0A0D14','#F8FAFC'],
      ['#261A00','#FEF3C7'], ['#120D00','#FFFBEB'],
      // surface cards & inputs
      ['#0E1929','#FFFFFF'], ['#111B30','#F8FAFF'],
      ['#060D1A','#F0F4FF'],
      ['#111B2E','#F8FAFF'],
      ['#334155','#6B7280'], ['#475569','#4B5563'], ['#94A3B8','#374151'],
      ['#ffffff','#111827'], ['#FFFFFF','#111827'],
    ];
    // Short #fff regex (only when not followed by another hex char)
    var RE_WHITE = /#fff(?![0-9a-fA-F])/g;

    var SKIP = { 'theme-toggle':1, 'theme-thumb':1, 'icon-moon':1, 'icon-sun':1,
                 'product-detail':1, 'product-skeleton':1, 'related-section':1, 'product-error':1, 'breadcrumb-sep':1,
                 'results-section':1 };

    function transformToLight(orig) {
      var s = orig;
      for (var i = 0; i < DL.length; i++) {
        if (s.indexOf(DL[i][0]) !== -1) s = s.split(DL[i][0]).join(DL[i][1]);
      }
      s = s.replace(RE_WHITE, '#111827');
      return s;
    }

    function applyToEl(el, toLight) {
      if (!el || el.nodeType !== 1 || SKIP[el.id]) return;
      if (el.hasAttribute('data-reveal')) return;
      if (toLight) {
        var orig = el.getAttribute('style') || '';
        if (orig && !el.hasAttribute('data-ds')) el.setAttribute('data-ds', orig);
        var base = el.getAttribute('data-ds') || '';
        if (base) el.setAttribute('style', transformToLight(base));
      } else {
        var saved = el.getAttribute('data-ds');
        if (saved !== null) { el.setAttribute('style', saved); el.removeAttribute('data-ds'); }
      }
    }

    function applyAll(toLight, scope) {
      var els = (scope || document).querySelectorAll('[style]');
      for (var i = 0; i < els.length; i++) applyToEl(els[i], toLight);
    }

    // Expose for dynamic content (product cards loaded from Supabase)
    window.DZ_isLightMode = false;
    window.DZ_applyThemeTo = function(container) {
      if (!window.DZ_isLightMode || !container) return;
      applyToEl(container, true);
      var kids = container.querySelectorAll ? container.querySelectorAll('[style]') : [];
      for (var i = 0; i < kids.length; i++) applyToEl(kids[i], true);
    };

    function setToggleUI(isLight) {
      if (!toggleThumb) return;
      if (isLight) {
        toggleThumb.style.right = 'auto'; toggleThumb.style.left = '3px';
        toggleThumb.style.background = 'linear-gradient(135deg,#F59E0B,#D97706)';
        toggleThumb.style.boxShadow = '0 2px 6px rgba(245,158,11,0.5)';
        toggleBtn.style.background = '#E0E7FF'; toggleBtn.style.borderColor = 'rgba(37,99,235,0.35)';
        if (iconMoon) iconMoon.style.display = 'none';
        if (iconSun)  iconSun.style.display  = 'block';
      } else {
        toggleThumb.style.right = '3px'; toggleThumb.style.left = 'auto';
        toggleThumb.style.background = 'linear-gradient(135deg,#60A5FA,#3B82F6)';
        toggleThumb.style.boxShadow = '0 2px 6px rgba(37,99,235,0.5)';
        toggleBtn.style.background = '#1C2A42'; toggleBtn.style.borderColor = 'rgba(255,255,255,0.12)';
        if (iconMoon) iconMoon.style.display = 'block';
        if (iconSun)  iconSun.style.display  = 'none';
      }
    }

    var LIGHT_CLASS_CSS =
      '.prod-card-blue,.prod-card-red,.prod-card-indigo,.prod-card-green,.prod-card-purple,' +
      '.prod-card-orange,.prod-card-sky,.prod-card-amber,.prod-card-gray' +
      '{background:#FFFFFF!important;border-color:rgba(0,0,0,0.08)!important;}' +
      '.dz-card-img{background:linear-gradient(155deg,#EEF2FF,#F0F4FF)!important;}' +
      '.dz-wl-btn{background:rgba(0,0,0,0.06)!important;border-color:rgba(0,0,0,0.1)!important;color:#4B5563!important;}' +
      '.cat-card,.cat-card-amber,.cat-card-sky{background:#FFFFFF!important;border-color:rgba(0,0,0,0.08)!important;}' +
      '.team-card,.whyus-card,.dz-builder-card,.dz-surface-card{background:#FFFFFF!important;border-color:rgba(0,0,0,0.08)!important;}' +
      '.whyus-blue,.whyus-green,.whyus-amber,.whyus-purple{background:#FFFFFF!important;border-color:rgba(0,0,0,0.08)!important;}' +
      'h3.dz-card-title{color:#111827!important;}';

    function activate(isLight) {
      window.DZ_isLightMode = isLight;
      // toggle classes FIRST so CSS !important rules don't fight inline style restoration
      root.classList.toggle('dz-light', isLight);
      document.documentElement.classList.toggle('dz-light', isLight);
      // inject/remove class-based light CSS
      var lcss = document.getElementById('dz-light-cls');
      if (isLight && !lcss) {
        var st = document.createElement('style');
        st.id = 'dz-light-cls';
        st.textContent = LIGHT_CLASS_CSS;
        document.head.appendChild(st);
      } else if (!isLight && lcss) {
        lcss.parentNode.removeChild(lcss);
      }
      applyAll(isLight);
      root.style.background = isLight ? '#F0F4FF' : '#070B12';
      setToggleUI(isLight);
      try { localStorage.setItem('dz_theme', isLight ? 'light' : 'dark'); } catch(e) {}
    }

    // Auto-apply theme + language to dynamically added content
    if (typeof MutationObserver !== 'undefined') {
      var mo = new MutationObserver(function(muts) {
        for (var mi = 0; mi < muts.length; mi++) {
          var added = muts[mi].addedNodes;
          for (var ni = 0; ni < added.length; ni++) {
            var node = added[ni];
            if (node.nodeType !== 1) continue;
            if (window.DZ_isLightMode) {
              applyToEl(node, true);
              var kids = node.querySelectorAll ? node.querySelectorAll('[style]') : [];
              for (var ki = 0; ki < kids.length; ki++) applyToEl(kids[ki], true);
            }
            if (window.DZ_translateNew) window.DZ_translateNew(node);
          }
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }

    // Restore saved theme on page load
    var saved = 'dark';
    try { saved = localStorage.getItem('dz_theme') || 'dark'; } catch(e) {}
    if (saved === 'light') { activate(true); } else { setToggleUI(false); }

    toggleBtn.addEventListener('click', function() { activate(!window.DZ_isLightMode); });
  }

  // ─── Inject cart/modal HTML ──────────────────────────────────────────────────
  var WILAYAS_OPTIONS = '<option value="">اختر الولاية...</option>' +
    '<option>01 - أدرار</option><option>02 - الشلف</option><option>03 - الأغواط</option>' +
    '<option>04 - أم البواقي</option><option>05 - باتنة</option><option>06 - بجاية</option>' +
    '<option>07 - بسكرة</option><option>08 - بشار</option><option>09 - البليدة</option>' +
    '<option>10 - البويرة</option><option>11 - تمنراست</option><option>12 - تبسة</option>' +
    '<option>13 - تلمسان</option><option>14 - تيارت</option><option>15 - تيزي وزو</option>' +
    '<option>16 - الجزائر</option><option>17 - الجلفة</option><option>18 - جيجل</option>' +
    '<option>19 - سطيف</option><option>20 - سعيدة</option><option>21 - سكيكدة</option>' +
    '<option>22 - سيدي بلعباس</option><option>23 - عنابة</option><option>24 - قالمة</option>' +
    '<option>25 - قسنطينة</option><option>26 - المدية</option><option>27 - مستغانم</option>' +
    '<option>28 - المسيلة</option><option>29 - معسكر</option><option>30 - ورقلة</option>' +
    '<option>31 - وهران</option><option>32 - البيض</option><option>33 - إليزي</option>' +
    '<option>34 - برج بوعريريج</option><option>35 - بومرداس</option><option>36 - الطارف</option>' +
    '<option>37 - تيندوف</option><option>38 - تيسمسيلت</option><option>39 - الوادي</option>' +
    '<option>40 - خنشلة</option><option>41 - سوق أهراس</option><option>42 - تيبازة</option>' +
    '<option>43 - ميلة</option><option>44 - عين الدفلى</option><option>45 - النعامة</option>' +
    '<option>46 - عين تموشنت</option><option>47 - غرداية</option><option>48 - غليزان</option>' +
    '<option>49 - المغير</option><option>50 - المنيعة</option><option>51 - أولاد جلال</option>' +
    '<option>52 - برج باجي مختار</option><option>53 - بني عباس</option><option>54 - تيميمون</option>' +
    '<option>55 - توقرت</option><option>56 - جانت</option><option>57 - عين صالح</option>' +
    '<option>58 - عين قزام</option>';

  function injectHTML() {
    if (document.getElementById('cart-overlay')) return; // already injected (index.html)

    var frag = document.createDocumentFragment();
    var div  = document.createElement('div');
    div.innerHTML =
      /* CART OVERLAY */
      '<div id="cart-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:1100;opacity:0;pointer-events:none;backdrop-filter:blur(3px);"></div>' +
      /* CART DRAWER */
      '<div id="cart-drawer" style="position:fixed;top:0;right:0;bottom:0;width:min(420px,100vw);background:#0A1120;border-left:1px solid rgba(255,255,255,0.07);z-index:1200;transform:translateX(100%);display:flex;flex-direction:column;font-family:\'Cairo\',sans-serif;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.07);">' +
          '<div style="display:flex;align-items:center;gap:10px;">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>' +
            '<h2 style="font-size:17px;font-weight:700;color:#fff;margin:0;">سلة التسوق</h2>' +
          '</div>' +
          '<button id="cart-close-btn" style="width:34px;height:34px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:8px;color:#94A3B8;cursor:pointer;font-size:20px;display:flex;align-items:center;justify-content:center;font-family:\'Cairo\',sans-serif;">×</button>' +
        '</div>' +
        '<div id="cart-items-list" style="flex:1;overflow-y:auto;padding:0 24px;"></div>' +
        '<div id="cart-footer" style="border-top:1px solid rgba(255,255,255,0.07);padding:20px 24px;display:none;">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">' +
            '<span style="font-size:14px;color:#94A3B8;font-weight:600;">الإجمالي</span>' +
            '<span id="cart-total-amount" style="font-size:20px;font-weight:900;color:#60A5FA;letter-spacing:-0.5px;"></span>' +
          '</div>' +
          '<button id="checkout-btn" style="width:100%;padding:13px;background:linear-gradient(135deg,#2563EB,#1D4ED8);border:none;border-radius:12px;color:#fff;font-family:\'Cairo\',sans-serif;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(37,99,235,0.4);">إتمام الطلب ←</button>' +
        '</div>' +
      '</div>' +
      /* CHECKOUT MODAL */
      '<div id="checkout-modal" style="display:none;position:fixed;inset:0;z-index:1300;background:rgba(0,0,0,0.78);align-items:center;justify-content:center;backdrop-filter:blur(5px);font-family:\'Cairo\',sans-serif;padding:20px;overflow-y:auto;">' +
        '<div style="background:#0A1120;border:1px solid rgba(255,255,255,0.08);border-radius:24px;width:min(900px,100%);display:grid;grid-template-columns:1.2fr 0.8fr;overflow:hidden;">' +
          '<div style="padding:36px 40px;border-left:1px solid rgba(255,255,255,0.07);">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;">' +
              '<h2 style="font-size:20px;font-weight:800;color:#fff;margin:0;">معلومات التوصيل</h2>' +
              '<button id="checkout-close-btn" style="width:32px;height:32px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:8px;color:#94A3B8;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;font-family:\'Cairo\',sans-serif;">×</button>' +
            '</div>' +
            '<form id="checkout-form">' +
              '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">' +
                '<div><label style="display:block;font-size:12px;font-weight:700;color:#64748B;margin-bottom:6px;">الاسم الكامل *</label>' +
                '<input id="c-name" type="text" placeholder="محمد العربي" required style="width:100%;padding:11px 14px;background:#111B30;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-family:\'Cairo\',sans-serif;font-size:14px;outline:none;"></div>' +
                '<div><label style="display:block;font-size:12px;font-weight:700;color:#64748B;margin-bottom:6px;">رقم الهاتف *</label>' +
                '<input id="c-phone" type="tel" placeholder="0550 XXX XXX" required style="width:100%;padding:11px 14px;background:#111B30;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-family:\'Cairo\',sans-serif;font-size:14px;outline:none;direction:ltr;text-align:right;"></div>' +
              '</div>' +
              '<div style="margin-bottom:14px;"><label style="display:block;font-size:12px;font-weight:700;color:#64748B;margin-bottom:6px;">الولاية *</label>' +
              '<select id="c-wilaya" required style="width:100%;padding:11px 14px;background:#111B30;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-family:\'Cairo\',sans-serif;font-size:14px;outline:none;cursor:pointer;appearance:none;">' + WILAYAS_OPTIONS + '</select></div>' +
              '<div style="margin-bottom:14px;"><label style="display:block;font-size:12px;font-weight:700;color:#64748B;margin-bottom:6px;">العنوان التفصيلي *</label>' +
              '<textarea id="c-address" rows="2" placeholder="الحي، الشارع، رقم المبنى..." required style="width:100%;padding:11px 14px;background:#111B30;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-family:\'Cairo\',sans-serif;font-size:14px;outline:none;resize:none;"></textarea></div>' +
              '<div style="margin-bottom:26px;"><label style="display:block;font-size:12px;font-weight:700;color:#64748B;margin-bottom:6px;">طريقة الدفع *</label>' +
              '<select id="c-payment" required style="width:100%;padding:11px 14px;background:#111B30;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-family:\'Cairo\',sans-serif;font-size:14px;outline:none;cursor:pointer;appearance:none;">' +
                '<option value="">اختر طريقة الدفع...</option>' +
                '<option value="COD">الدفع عند الاستلام (COD)</option>' +
                '<option value="CIB">CIB / Edahabia</option>' +
                '<option value="تحويل بنكي">تحويل بنكي</option>' +
              '</select></div>' +
              '<button id="submit-order-btn" type="submit" style="width:100%;padding:14px;background:linear-gradient(135deg,#2563EB,#1D4ED8);border:none;border-radius:12px;color:#fff;font-family:\'Cairo\',sans-serif;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(37,99,235,0.4);">تأكيد الطلب ←</button>' +
            '</form>' +
          '</div>' +
          '<div style="padding:36px 32px;background:#060D1A;">' +
            '<h3 style="font-size:15px;font-weight:700;color:#fff;margin:0 0 20px;">ملخص الطلب</h3>' +
            '<div id="order-summary-items" style="max-height:300px;overflow-y:auto;"></div>' +
            '<div style="margin-top:18px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.07);display:flex;justify-content:space-between;align-items:center;">' +
              '<span style="font-size:14px;color:#94A3B8;font-weight:700;">الإجمالي</span>' +
              '<span id="order-total-amount" style="font-size:22px;font-weight:900;color:#60A5FA;letter-spacing:-0.5px;"></span>' +
            '</div>' +
            '<div style="margin-top:20px;padding:14px 16px;background:rgba(37,99,235,0.07);border:1px solid rgba(37,99,235,0.15);border-radius:12px;">' +
              '<p style="font-size:12px;color:#475569;line-height:1.8;margin:0;">سيتم تأكيد طلبك عبر الهاتف خلال 24 ساعة. التوصيل متاح لجميع ولايات الجزائر.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      /* SUCCESS MODAL */
      '<div id="success-modal" style="display:none;position:fixed;inset:0;z-index:1400;background:rgba(0,0,0,0.82);align-items:center;justify-content:center;backdrop-filter:blur(5px);font-family:\'Cairo\',sans-serif;">' +
        '<div style="background:#0A1120;border:1px solid rgba(52,211,153,0.25);border-radius:24px;padding:50px 44px;text-align:center;max-width:460px;width:calc(100% - 40px);">' +
          '<div style="width:72px;height:72px;margin:0 auto 22px;background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.25);border-radius:50%;display:flex;align-items:center;justify-content:center;">' +
            '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
          '</div>' +
          '<h2 style="font-size:22px;font-weight:800;color:#fff;margin:0 0 10px;">تم تأكيد طلبك!</h2>' +
          '<p style="font-size:14px;color:#475569;margin:0 0 22px;line-height:1.8;">سنتواصل معك قريباً لتأكيد التفاصيل والتوصيل.</p>' +
          '<div style="background:rgba(37,99,235,0.08);border:1px solid rgba(37,99,235,0.18);border-radius:12px;padding:14px 20px;margin-bottom:28px;">' +
            '<div style="font-size:11px;color:#475569;margin-bottom:5px;">رقم الطلب</div>' +
            '<div id="success-order-ref" style="font-size:20px;font-weight:900;color:#60A5FA;letter-spacing:1.5px;"></div>' +
          '</div>' +
          '<button id="success-close-btn" style="width:100%;padding:13px;background:linear-gradient(135deg,#2563EB,#1D4ED8);border:none;border-radius:12px;color:#fff;font-family:\'Cairo\',sans-serif;font-size:15px;font-weight:700;cursor:pointer;">متابعة التسوق</button>' +
        '</div>' +
      '</div>' +
      /* TOAST */
      '<div id="dz-toast" style="position:fixed;bottom:24px;left:24px;z-index:1500;min-width:240px;max-width:300px;background:rgba(14,20,46,0.96);border:1px solid rgba(37,99,235,0.35);border-radius:14px;padding:14px 18px;font-family:\'Cairo\',sans-serif;transform:translateX(-130%);opacity:0;transition:transform 0.32s ease,opacity 0.32s ease;backdrop-filter:blur(14px);">' +
        '<div class="toast-title" style="font-size:13px;font-weight:700;color:#fff;margin-bottom:3px;"></div>' +
        '<div class="toast-msg" style="font-size:12px;color:#64748B;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"></div>' +
      '</div>';

    while (div.firstChild) frag.appendChild(div.firstChild);
    document.body.appendChild(frag);
  }

  // ─── Wire up all events ──────────────────────────────────────────────────────
  function wireEvents() {
    var cartBtn = document.getElementById('cart-btn');
    if (cartBtn) cartBtn.addEventListener('click', window.DZ_openCart);
    var cartCloseBtn = document.getElementById('cart-close-btn');
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
    var cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);
    var checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckout);
    var checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) checkoutForm.addEventListener('submit', submitOrder);
    var checkoutCloseBtn = document.getElementById('checkout-close-btn');
    if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', closeCheckout);
    var successCloseBtn = document.getElementById('success-close-btn');
    if (successCloseBtn) successCloseBtn.addEventListener('click', function() {
      var m = document.getElementById('success-modal');
      if (m) m.style.display = 'none';
      renderCartItems();
    });
    // wishlist icon in navbar
    var wlIcon = document.getElementById('nav-wl-icon');
    if (wlIcon) wlIcon.addEventListener('click', function() { window.location.href = '/wishlist.html'; });
  }

  // ─── Global click delegation for [data-pid] ──────────────────────────────────
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-pid]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    var id = parseInt(btn.getAttribute('data-pid'), 10);
    var p = window.DZ_PRODUCTS[id];
    if (p) window.DZ_addToCart(p);
  });

  // ─── Global click delegation for .dz-wl-btn ──────────────────────────────────
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.dz-wl-btn');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
  });

  // ─── DOMContentLoaded init ───────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    injectHTML();
    wireEvents();
    updateCartBadge();
    renderCartItems();
    setupTheme();
    // Wire language toggle buttons
    document.querySelectorAll('[data-lang-btn]').forEach(function(el) {
      el.addEventListener('click', function() {
        if (window.DZ_setLang) window.DZ_setLang(el.getAttribute('data-lang-btn'));
      });
    });
  });

})();
