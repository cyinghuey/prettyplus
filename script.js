// ---------- Home page: product list, toggle and search ----------
// EDIT THIS LIST to add or change products.
// type: 'presets' or 'prompts' | badge: small label on the card
// link: product page (leave empty and set soon:true for "Coming soon")
var products = [
  // Lightroom presets
  { type: 'presets', badge: 'Film Style', name: 'Film Pack', price: 'US$15', image: 'images/film-cover.jpg', link: 'preset.html?pack=film' },
  { type: 'presets', badge: 'Minimal', name: 'Minimal Pack', image: 'images/minimal-cover.jpg', soon: true },
  { type: 'presets', badge: 'Dark', name: 'Dark Pack', image: 'images/dark-cover.jpg', soon: true },
  { type: 'presets', badge: 'Bright', name: 'Bright Pack', image: 'images/bright-cover.jpg', soon: true },
  { type: 'presets', badge: 'Cafe & Foodie', name: 'Cafe & Foodie Pack', image: 'images/cafe-cover.jpg', soon: true },
  { type: 'presets', badge: 'Vibrant Color', name: 'Vibrant Color Pack', image: 'images/vibrant-cover.jpg', soon: true },
  { type: 'presets', badge: 'Bundle', name: 'All-in-One Preset Bundle', image: 'images/bundle-cover.jpg', soon: true },

  // AI prompt packs
  { type: 'prompts', badge: 'Portrait', name: 'Portrait Prompt Pack', price: 'US$8', image: 'images/prompts-cover.jpg', link: 'prompt-product.html' },
  { type: 'prompts', badge: 'Product', name: 'Product Prompt Pack', image: 'images/prompts-product-cover.jpg', soon: true },
  { type: 'prompts', badge: 'Social Media', name: 'Social Media Prompt Pack', image: 'images/prompts-social-cover.jpg', soon: true },
  { type: 'prompts', badge: 'Bundle', name: 'All-in-One Prompt Bundle', image: 'images/prompts-bundle-cover.jpg', soon: true }
];

(function () {
  var grid = document.getElementById('product-grid');
  if (!grid) return;

  var toggleBtns = document.querySelectorAll('.toggle-btn');
  var searchInput = document.getElementById('search-input');
  var noResults = document.getElementById('no-results');
  var currentType = 'presets';

  // Open the prompts tab directly with index.html#prompts
  if (window.location.hash === '#prompts') currentType = 'prompts';

  function cardHTML(p) {
    var inner =
      '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy" onerror="this.style.display=\'none\'">' +
      '<span class="badge">' + p.badge + '</span>' +
      '<div class="card-text"><span class="card-name">' + p.name + '</span>' +
      '<span class="card-price">' + (p.soon ? 'Coming soon' : p.price) + '</span></div>';
    if (p.soon) return '<div class="product-card soon">' + inner + '</div>';
    return '<a class="product-card" href="' + p.link + '">' + inner + '</a>';
  }

  function render() {
    var q = (searchInput && searchInput.value || '').trim().toLowerCase();
    var list = products.filter(function (p) {
      var matchesText = !q || (p.name + ' ' + p.badge).toLowerCase().indexOf(q) !== -1;
      // While searching, look through everything; otherwise show the chosen tab
      return q ? matchesText : p.type === currentType;
    });
    grid.innerHTML = list.map(cardHTML).join('');
    if (noResults) noResults.hidden = list.length > 0;
    toggleBtns.forEach(function (b) {
      b.classList.toggle('active', !q && b.getAttribute('data-type') === currentType);
    });
  }

  toggleBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      currentType = b.getAttribute('data-type');
      if (searchInput) searchInput.value = '';
      render();
    });
  });

  if (searchInput) {
    var fromUrl = new URLSearchParams(window.location.search).get('q');
    if (fromUrl) searchInput.value = fromUrl;
    searchInput.addEventListener('input', render);
    // Pressing Enter on the home page filters instead of reloading
    searchInput.form.addEventListener('submit', function (e) { e.preventDefault(); render(); });
  }

  render();
})();

// ---------- Category tabs + swipe panels ----------
// Tapping a tab scrolls the track to that panel.
// Swiping the track updates the highlighted tab.
(function () {
  var track = document.getElementById('swipe-track');
  if (!track) return;

  var tabs = document.querySelectorAll('.cat-tabs button');
  var panels = track.querySelectorAll('.swipe-panel');

  function setActive(id) {
    tabs.forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-target') === id);
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var id = tab.getAttribute('data-target');
      var panel = document.getElementById(id);
      if (panel) {
        track.scrollTo({ left: panel.offsetLeft, behavior: 'smooth' });
        setActive(id);
      }
    });
  });

  // Find which panel is visible while swiping
  var timer;
  track.addEventListener('scroll', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      var best = null, bestDist = Infinity;
      panels.forEach(function (p) {
        var dist = Math.abs(p.offsetLeft - track.scrollLeft);
        if (dist < bestDist) { bestDist = dist; best = p; }
      });
      if (best) setActive(best.id);
    }, 80);
  });
})();

// ---------- Before / after sliders (preset product page) ----------
document.querySelectorAll('.compare').forEach(function (box) {
  var handle = box.querySelector('.handle');
  function update() {
    box.style.setProperty('--pos', handle.value + '%');
  }
  handle.addEventListener('input', update);
  update();
});

// ---------- Pack details for preset.html?pack=... ----------
var packs = {
  film: {
    title: 'Film Pack',
    price: 'US$15',
    buy: 'https://prettyplusmy.lemonsqueezy.com/checkout/buy/21ea6804-47f2-400a-b591-acb6a91ed8ea'
  }
};

var params = new URLSearchParams(window.location.search);
var pack = packs[params.get('pack')];

if (pack) {
  var titleEl = document.getElementById('pack-title');
  var priceEl = document.getElementById('pack-price');
  var buyEl = document.getElementById('buy-link');
  if (titleEl) titleEl.textContent = pack.title;
  if (priceEl) priceEl.textContent = pack.price;
  if (buyEl && pack.buy) buyEl.href = pack.buy;
  document.title = pack.title + ' | PrettyPlus+';
}
