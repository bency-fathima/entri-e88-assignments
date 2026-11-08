let allProducts = [];
let cart = JSON.parse(localStorage.getItem('shopnest-cart')) || [];
let activeCategory = 'All';
let searchText = '';

// DOM Elements
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartItems = document.getElementById('cartItems');
const noResult = document.getElementById('noResult');
const cartDrawer = document.getElementById('cartDrawer');

// 1. FETCH with async/await
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        allProducts = await response.json();
        renderProducts();
        renderCart();
    } catch (error) {
        console.error('Failed to load products', error);
        productGrid.innerHTML = '<p>Failed to load products</p>';
    }
}

// 2. RENDER PRODUCTS - Search + Filter together
function renderProducts() {
    productGrid.innerHTML = '';

    const filtered = allProducts.filter(p => {
        const matchCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchSearch = p.name.toLowerCase().includes(searchText.toLowerCase());
        return matchCategory && matchSearch;
    });

    // No Result Message
    if (filtered.length === 0) {
        noResult.classList.remove('hidden');
        return;
    }
    noResult.classList.add('hidden');

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}">
      <span class="cat">${product.category}</span>
      <h3>${product.name}</h3>
      <p>⭐ ${product.rating}</p>
      <p><b>₹${product.price}</b> <s>₹${product.originalPrice}</s></p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
        productGrid.appendChild(card);
    });
}

// 3. CART FUNCTIONS
function addToCart(id) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        const product = allProducts.find(p => p.id === id);
        cart.push({ ...product, qty: 1 });
    }
    saveAndRenderCart();
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    saveAndRenderCart();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveAndRenderCart();
}

function saveAndRenderCart() {
    localStorage.setItem('shopnest-cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
      <img src="${item.imageUrl}" width="60">
      <div>
        <p>${item.name}</p>
        <p>₹${item.price} x ${item.qty} = ₹${item.price * item.qty}</p>
        <button onclick="changeQty(${item.id}, -1)">-</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${item.id}, 1)">+</button>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
        cartItems.appendChild(div);
    });

    cartTotal.textContent = total;
    cartCount.textContent = count;
    if (cart.length === 0) cartItems.innerHTML = '<p>Cart is empty</p>';
}

// 4. EVENTS
searchInput.addEventListener('input', (e) => {
    searchText = e.target.value;
    renderProducts();
});

document.getElementById('categoryFilters').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        document.querySelectorAll('#categoryFilters button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        activeCategory = e.target.dataset.category;
        renderProducts();
    }
});

document.getElementById('cartBtn').addEventListener('click', () => cartDrawer.classList.remove('hidden'));
document.getElementById('closeCart').addEventListener('click', () => cartDrawer.classList.add('hidden'));
document.getElementById('clearCart').addEventListener('click', () => { cart = []; saveAndRenderCart(); });

loadProducts();