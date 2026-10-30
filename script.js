// Before / after slider: moves the divider when the visitor drags the range input
document.querySelectorAll('.compare').forEach(function (box) {
  var handle = box.querySelector('.handle');

  function update() {
    box.style.setProperty('--pos', handle.value + '%');
  }

  handle.addEventListener('input', update);
  update();
});

// Fill the product page title and price from the ?pack= link parameter
// Add a line for each pack you sell
var packs = {
  moody: { title: 'Moody Pack', price: 'US$12' },
  bright: { title: 'Bright Pack', price: 'US$12' },
  film: { title: 'Film Pack', price: 'US$15', buy: 'https://prettyplusmy.lemonsqueezy.com/checkout/buy/21ea6804-47f2-400a-b591-acb6a91ed8ea' }
};

var params = new URLSearchParams(window.location.search);
var pack = packs[params.get('pack')];

if (pack) {
  var titleEl = document.getElementById('pack-title');
  var priceEl = document.getElementById('pack-price');
  if (titleEl) titleEl.textContent = pack.title;
  if (priceEl) priceEl.textContent = pack.price;
  var buyEl = document.getElementById('buy-link');
  if (buyEl && pack.buy) buyEl.href = pack.buy;
  document.title = pack.title + ' | PrettyPlus+';
}
