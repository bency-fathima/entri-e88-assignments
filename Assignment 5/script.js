const $ = (id) => document.getElementById(id);
const grid = $('product-grid');
const noResults = $('no-results');
const searchInput = $('search-input');
const filterBar = $('filter-bar');
const cartPanel = $('cart-panel');
const cartItemsEl = $('cart-items');
const cartTotalEl = $('cart-total');
const cartCountEl = $('cart-count');

let products = [];
let activeCategory = 'All';
let searchQuery = '';
let cart = loadCart();

/* ---------- helpers ---------- */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
const money = (n) => '$' + n.toFixed(2);

/* ---------- localStorage ---------- */
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem('fashionhub-cart'));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}
function saveCart() {
  try {
    localStorage.setItem('fashionhub-cart', JSON.stringify(cart));
  } catch (err) {
    console.error('Could not save cart', err);
  }
}

/* ---------- fetch products ---------- */
async function loadProducts() {
  try {
    const res = await fetch('products.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    products = await res.json();
    renderProducts();
  } catch (err) {
    console.error(err);
    noResults.textContent = 'Failed to load products.';
    noResults.hidden = false;
  }
}

/* ---------- render products ---------- */
function renderProducts() {
  const filtered = products.filter(
    (p) =>
      (activeCategory === 'All' || p.category === activeCategory) &&
      p.name.toLowerCase().includes(searchQuery)
  );

  grid.replaceChildren();
  noResults.textContent = 'No products found';
  noResults.hidden = filtered.length > 0;

  filtered.forEach((p) => {
    const card = el('article', 'product-card');

    const imgWrap = el('div', 'product-img');
    const img = el('img');
    img.src = p.imageUrl;
    img.alt = p.name;
    imgWrap.appendChild(img);

    const price = el('p', 'product-price', money(p.price));
    price.appendChild(el('span', 'original', money(p.originalPrice)));

    const inCart = cart.some((i) => i.id === p.id);
const btn = el('button', 'add-btn' + (inCart ? ' added' : ''), inCart ? 'Added ✓' : 'Add to Cart');
btn.dataset.id = p.id;

    card.append(
      imgWrap,
      el('p', 'product-category', p.category),
      el('h3', 'product-name', p.name),
      el('p', 'product-rating', '★ ' + p.rating),
      price,
      btn
    );
    grid.appendChild(card);
  });
}

/* ---------- cart logic ---------- */
function addToCart(id) {
  const existing = cart.find((i) => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    cart.push({ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl, qty: 1 });
  }
  updateCart();
}

function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
  updateCart();
}

function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  updateCart();
}

function updateCart() {
    saveCart();
    renderCart();
    renderProducts();
  }

function renderCart() {
  cartItemsEl.replaceChildren();

  if (cart.length === 0) {
    cartItemsEl.appendChild(el('p', 'cart-empty', 'Your cart is empty'));
  }

  cart.forEach((item) => {
    const row = el('div', 'cart-item');
    const img = el('img');
    img.src = item.imageUrl;
    img.alt = item.name;

    const info = el('div', 'cart-item-info');
    const qtyRow = el('div', 'qty-row');

    const minus = el('button', '', '–');
    minus.dataset.action = 'dec';
    minus.dataset.id = item.id;
    const plus = el('button', '', '+');
    plus.dataset.action = 'inc';
    plus.dataset.id = item.id;
    qtyRow.append(minus, el('span', '', item.qty), plus);

    const remove = el('button', 'remove-btn', 'Remove');
    remove.dataset.action = 'remove';
    remove.dataset.id = item.id;

    info.append(
      el('p', '', item.name),
      el('p', '', money(item.price * item.qty)),
      qtyRow,
      remove
    );
    row.append(img, info);
    cartItemsEl.appendChild(row);
  });

  cartCountEl.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
  cartTotalEl.textContent = money(cart.reduce((sum, i) => sum + i.price * i.qty, 0));
}

/* ---------- events ---------- */
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  renderProducts();
});

filterBar.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  activeCategory = btn.dataset.category;
  filterBar.querySelectorAll('.filter-btn').forEach((b) => b.classList.toggle('active', b === btn));
  renderProducts();
});

grid.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-btn');
  if (btn) addToCart(Number(btn.dataset.id));
});

cartItemsEl.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  if (btn.dataset.action === 'inc') changeQty(id, 1);
  if (btn.dataset.action === 'dec') changeQty(id, -1);
  if (btn.dataset.action === 'remove') removeItem(id);
});

$('cart-toggle').addEventListener('click', (e) => {
  e.preventDefault();
  cartPanel.classList.toggle('open');
});
$('cart-close').addEventListener('click', () => cartPanel.classList.remove('open'));

/* ---------- init ---------- */
renderCart();      // restore cart from localStorage on load
loadProducts();