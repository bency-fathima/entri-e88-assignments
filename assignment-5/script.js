
const CART_KEY = "shopnest_cart";
const CATEGORIES = ["All", "Electronics", "Clothing", "Footwear", "Books"];
const FALLBACK_IMG =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#e5e9ee"/><text x="50%" y="50%" fill="#5d6b7a" font-family="sans-serif" font-size="20" text-anchor="middle">No image</text></svg>'
    );

let products = [];          
let cart = [];             
let activeCategory = "All";
let searchTerm = "";

const $ = (id) => document.getElementById(id);
const grid = $("productGrid");
const filtersEl = $("filters");
const searchInput = $("searchInput");
const noResults = $("noResults");
const loadError = $("loadError");
const resultInfo = $("resultInfo");
const cartCountEl = $("cartCount");
const cartItemsEl = $("cartItems");
const cartEmptyEl = $("cartEmpty");
const cartTotalEl = $("cartTotal");
const cartPanel = $("cartPanel");
const overlay = $("overlay");


const formatPrice = (n) => "₹" + n.toLocaleString("en-IN");

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function makeImage(src, alt) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.loading = "lazy";
    img.addEventListener("error", () => { img.src = FALLBACK_IMG; }, { once: true });
    return img;
}


async function loadProducts() {
    try {
        const response = await fetch("products.json");
        if (!response.ok) throw new Error("HTTP " + response.status);
        products = await response.json();
        renderProducts();
    } catch (error) {
        console.error("Failed to load products:", error);
        loadError.textContent =
            "Could not load products. Open this app through a local server (e.g. VS Code Live Server) and refresh.";
        loadError.hidden = false;
    }
}


function getFilteredProducts() {
    const term = searchTerm.trim().toLowerCase();
    return products.filter((p) => {
        const matchesCategory = activeCategory === "All" || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(term);
        return matchesCategory && matchesSearch;
    });
}

function createProductCard(product) {
    const card = el("article", "card");
    card.appendChild(makeImage(product.imageUrl, product.name));

    const body = el("div", "card-body");
    body.appendChild(el("span", "card-cat", product.category));
    body.appendChild(el("h3", "card-name", product.name));
    body.appendChild(el("span", "rating", "★ " + product.rating.toFixed(1)));

    const priceRow = el("div", "price-row");
    priceRow.appendChild(el("span", "price", formatPrice(product.price)));
    if (product.originalPrice > product.price) {
        priceRow.appendChild(el("span", "orig", formatPrice(product.originalPrice)));
        const off = Math.round((1 - product.price / product.originalPrice) * 100);
        priceRow.appendChild(el("span", "off", off + "% off"));
    }
    body.appendChild(priceRow);

    const addBtn = el("button", "add-btn", "Add to Cart");
    addBtn.type = "button";
    addBtn.dataset.id = product.id;
    body.appendChild(addBtn);

    card.appendChild(body);
    return card;
}

function renderProducts() {
    const list = getFilteredProducts();
    grid.replaceChildren(...list.map(createProductCard));
    noResults.hidden = list.length > 0;
    resultInfo.textContent = list.length
        ? `Showing ${list.length} of ${products.length} products`
        : "";
}

function renderFilters() {
    filtersEl.replaceChildren(
        ...CATEGORIES.map((cat) => {
            const btn = el("button", "filter-btn" + (cat === activeCategory ? " active" : ""), cat);
            btn.type = "button";
            btn.dataset.category = cat;
            btn.setAttribute("aria-pressed", String(cat === activeCategory));
            return btn;
        })
    );
}


function addToCart(productId) {
    const existing = cart.find((i) => i.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        const p = products.find((x) => x.id === productId);
        if (!p) return;
        cart.push({ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl, qty: 1 });
    }
    updateCart();
}

function changeQty(productId, delta) {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter((i) => i.id !== productId);
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter((i) => i.id !== productId);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

const getCartCount = () => cart.reduce((sum, i) => sum + i.qty, 0);
const getCartTotal = () => cart.reduce((sum, i) => sum + i.price * i.qty, 0);


function createCartItem(item) {
    const li = el("li", "cart-item");
    li.appendChild(makeImage(item.imageUrl, item.name));

    const info = el("div");
    info.appendChild(el("div", "ci-name", item.name));
    info.appendChild(el("div", "ci-price", formatPrice(item.price) + " each"));

    const controls = el("div", "ci-controls");
    const minus = el("button", "qty-btn", "−");
    minus.type = "button";
    minus.dataset.action = "dec";
    minus.dataset.id = item.id;
    minus.setAttribute("aria-label", "Decrease quantity of " + item.name);

    const qty = el("span", "qty", String(item.qty));

    const plus = el("button", "qty-btn", "+");
    plus.type = "button";
    plus.dataset.action = "inc";
    plus.dataset.id = item.id;
    plus.setAttribute("aria-label", "Increase quantity of " + item.name);

    const remove = el("button", "remove-btn", "Remove");
    remove.type = "button";
    remove.dataset.action = "remove";
    remove.dataset.id = item.id;

    controls.append(minus, qty, plus, remove);
    info.appendChild(controls);
    info.appendChild(el("div", "ci-line", "Subtotal: " + formatPrice(item.price * item.qty)));

    li.appendChild(info);
    return li;
}

function renderCart() {
    cartItemsEl.replaceChildren(...cart.map(createCartItem));
    cartEmptyEl.hidden = cart.length > 0;
    cartCountEl.textContent = getCartCount();
    cartTotalEl.textContent = formatPrice(getCartTotal());
}


function saveCart() {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error("Could not save cart:", error);
    }
}

function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY));
        if (Array.isArray(saved)) {
            cart = saved.filter(
                (i) => i && typeof i.id === "number" && typeof i.price === "number" && i.qty > 0
            );
        }
    } catch (error) {
        console.error("Could not read saved cart:", error);
        cart = [];
    }
}

function updateCart() {
    saveCart();
    renderCart();
}

function openCart() {
    cartPanel.classList.add("open");
    cartPanel.setAttribute("aria-hidden", "false");
    overlay.hidden = false;
}

function closeCart() {
    cartPanel.classList.remove("open");
    cartPanel.setAttribute("aria-hidden", "true");
    overlay.hidden = true;
}


function setupEvents() {

    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        renderProducts();
    });

    filtersEl.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;
        activeCategory = btn.dataset.category;
        renderFilters();
        renderProducts();
    });

    grid.addEventListener("click", (e) => {
        const btn = e.target.closest(".add-btn");
        if (btn) addToCart(Number(btn.dataset.id));
    });

  
    cartItemsEl.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-action]");
        if (!btn) return;
        const id = Number(btn.dataset.id);
        if (btn.dataset.action === "inc") changeQty(id, 1);
        else if (btn.dataset.action === "dec") changeQty(id, -1);
        else if (btn.dataset.action === "remove") removeFromCart(id);
    });

    $("clearCart").addEventListener("click", clearCart);
    $("cartToggle").addEventListener("click", openCart);
    $("cartClose").addEventListener("click", closeCart);
    overlay.addEventListener("click", closeCart);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });
}


function init() {
    loadCart();       
    renderFilters();
    renderCart();
    setupEvents();
    loadProducts();     
}

document.addEventListener("DOMContentLoaded", init);