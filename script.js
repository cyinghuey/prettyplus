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
