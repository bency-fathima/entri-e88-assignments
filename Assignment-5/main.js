const ProductContainer = document.querySelector(".productsGrid")
const shopCategoryContainer = document.querySelector(".shopCategoryGrid")
let wishlistContainer = document.querySelector(".wishlistGrid")
let productsDetailsContainer = document.querySelector(".productsDetailsGrid")

let cartGridContainer = document.querySelector(".cartGrid")
const cartItemCount = document.querySelector("#cartItemCount")

let allProductsItems = JSON.parse(localStorage.getItem("allProductsItems")) || [];
let selectedOption = localStorage.getItem("selectedOption") || "trending";
let selectedCollection = localStorage.getItem("selectedCollection") || selectedOption;
let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


async function fetchProducts() {

    navigationButtons();

    if (allProductsItems.length === 0) {
        try {
            const response = await fetch("products.json");
            allProductsItems = await response.json();

            localStorage.setItem("allProductsItems", JSON.stringify(allProductsItems));

        } catch (error) {
            console.log("Error fetching data:", error);
            return;
        }
    }

    liveSearch();
    filteredProducts(allProductsItems, selectedOption);
}


function filteredProducts(allProducts, selectedOption) {

    if (!selectedOption) {
        selectedOption = "trending";
    }

    if (selectedOption === "All") {
        selectedCollection = "All";
        localStorage.setItem("selectedCollection", selectedCollection);
        displayProducts(allProducts);
        return;
    }

    const categories = [];
    const collections = [];

    allProducts.forEach((item) => {
        if (!categories.includes(item.category)) {
            categories.push(item.category);
        }

        item.collections.forEach((collection) => {
            if (!collections.includes(collection)) {
                collections.push(collection);
            }
        });
    });

    // If a category is selected, filter by the saved collection AND category.
    if (categories.includes(selectedOption)) {

        let filterValue;

        if (collections.includes(selectedCollection)) {
            filterValue = allProducts.filter(item =>
                item.collections.includes(selectedCollection) &&
                item.category === selectedOption
            );
        } else {
            filterValue = allProducts.filter(item =>
                item.category === selectedOption
            );
        }

        displayProducts(filterValue);

    } else if (collections.includes(selectedOption)) {

        // If a collection is selected, save it for the next category selection.
        selectedCollection = selectedOption;
        localStorage.setItem("selectedCollection", selectedCollection);

        const filterValue = allProducts.filter(item =>
            item.collections.includes(selectedOption)
        );

        displayProducts(filterValue);
    }
}


function displayProducts(products) {

    let container;

    if (ProductContainer) {
        container = ProductContainer;
    } else {
        container = productsDetailsContainer || shopCategoryContainer || wishlistContainer || cartGridContainer;
    }

    if (!container) return;

    updateCartSummary();

    if (ProductContainer) {
        products = products.slice(0, 4);
    }

    if (wishlistContainer) {
        if (wishlistItems.length === 0) {
            container.innerHTML = `<h2 class="emptyWishlist">Your wishlist is empty ❤️</h2>`;
            return;
        }

        products = wishlistItems;
    }

    if (cartGridContainer) {
        if (cartItems.length === 0) {
            container.innerHTML = `<h2 class="emptyCart">Your cart is empty ❤️</h2>`;
            return;
        }

        products = cartItems;
    }

    if (productsDetailsContainer) {

        const params = new URLSearchParams(location.search);
        const id = Number(params.get("id"));

        const productdetails = allProductsItems.filter(item => item.id === id);
        products = productdetails;
    }

    container.innerHTML = products.map((product) => {

        return `
            <article class="productCard">

                <div class="productImages">

                    <img class="productImage" id=${product.id} src="${product.imageUrl}" alt="" data-name=${product.category}>

                    <button class="wishlistBtn" type="button" id=${product.id}> 
                    <i class="fa-regular fa-heart">
                    </i></button>

                </div>

                ${cartGridContainer ? `
                    <h3 class="productTitle">${product.name}</h3>

                    <div class="quantityBtn">
                        <button class="increaseQty">+</button>
                        <span class="quantity">${product.quantity || 1}</span>
                        <button class="decreaseQty">-</button>
                    </div>

                    <div>
                        <button class="dltBtn" id=${product.id}>
                            <span><i class="fa-solid fa-trash"></i></span>
                        </button>
                    </div>

                ` : `
                    <h3 class="productTitle">${product.name}</h3>
                    <span class="ratingStars">*******</span>
                    <span class="ratingCount">(${product.rating})</span>
                `}

                <div class="productPricing">

                    <span class="currentPrice">₹${product.price}</span>

                    <del class="oldPrice">₹${product.originalPrice}</del>

                    <span class="discountPercentage">${product.discount}% OFF</span>

                </div>

                ${productsDetailsContainer ? `
                    <div class="quantityBtn">
                        <button class="increaseQty">+</button>
                        <span class="quantity">${product.quantity || 1}</span>
                        <button class="decreaseQty">-</button>
                    </div>

                    <div class="productsDetailsbtn"> 
                        <button type="button" class="addToCartBtn" id=${product.id}>Add to Cart</button>
                        <button type="button" class="buyNowBtn">Buy Now</button>
                    </div>

                ` : wishlistContainer ? `
                    <button type="button" class="addToCartBtn" id=${product.id}>Added to Cart</button>
                ` : ""}

            </article>`;
    }).join("");

    btnClick(container);
    addToWishlist();

    if (cartItemCount) {
        cartItemCount.textContent = cartItems.length;
    }
}


function btnClick(container) {

    const images = container.querySelectorAll(".productImage");
    const cart = container.querySelectorAll(".addToCartBtn");

    images.forEach((image) => {
        image.addEventListener("click", () => {
            const imageName = image.dataset.name;
            const imageId = Number(image.id);
            openProductDetails(imageId, imageName);
        });
    });

    cart.forEach((cart) => {
        cart.addEventListener("click", () => {
            const cartItemId = Number(cart.id);
            addToCard(cartItemId);
        });
    });

    container.addEventListener("click", (e) => {

        const inBtn = e.target.closest(".increaseQty");
        const deBtn = e.target.closest(".decreaseQty");

        if (!inBtn && !deBtn) return;

        const quantityBtn = e.target.closest(".quantityBtn");
        const quantity = quantityBtn.querySelector(".quantity");

        const productCard = e.target.closest(".productCard");

        const productId = Number(
            productCard.querySelector(".productImage").id
        );

        let value = Number(quantity.textContent);

        if (inBtn) value++;

        if (deBtn && value > 1) value--;

        quantity.textContent = value;

        const product = allProductsItems.find(item => item.id === productId);
        if (product) {
            product.quantity = value;
        }

        const cartProduct = cartItems.find(item => item.id === productId);
        if (cartProduct) {
            cartProduct.quantity = value;
        }

        localStorage.setItem("allProductsItems", JSON.stringify(allProductsItems));
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        updateCartSummary();

    });

    container.addEventListener("click", (e) => {

        const wishlistBtn = e.target.closest(".wishlistBtn");

        if (wishlistBtn) {
            addToWishlist(wishlistBtn);
        }
    });

    container.addEventListener("click", (e) => {

        const deleteButton = e.target.closest(".dltBtn");

        if (!deleteButton) return;

        const productId = Number(deleteButton.id);
        const product = allProductsItems.find(item => item.id === productId);

        if (product) {
            product.quantity = 1;
            localStorage.setItem("allProductsItems", JSON.stringify(allProductsItems));
        }

        cartItems = cartItems.filter(item => item.id !== productId);

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        displayProducts(allProductsItems);
    });
}


function updateCartSummary() {

    const itemCount = document.querySelector("#summaryItemCount");
    const subtotalText = document.querySelector("#summarySubtotal");
    const shippingText = document.querySelector("#summaryShipping");
    const totalText = document.querySelector("#summaryTotal");

    if (!itemCount || !subtotalText || !shippingText || !totalText) return;

    const subtotal = cartItems.reduce((total, item) => {
        return total + item.price * (item.quantity || 1);
    }, 0);

    const totalItems = cartItems.reduce((total, item) => {
        return total + (item.quantity || 1);
    }, 0);

    const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 50;
    const total = subtotal + shipping;

    itemCount.textContent = totalItems;
    subtotalText.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
    shippingText.textContent = shipping === 0 ? "Free" : `₹${shipping.toLocaleString("en-IN")}`;
    totalText.textContent = `₹${total.toLocaleString("en-IN")}`;
}


function addToWishlist(wishlist = null) {

    const wishlistButtons = document.querySelectorAll(".wishlistBtn");

    if (!wishlist) {

        wishlistButtons.forEach(button => {

            const icon = button.querySelector("i");
            const id = Number(button.id);

            const exists = wishlistItems.find(item => item.id === id);

            if (exists) {
                icon.classList.add("fa-solid");
                icon.classList.remove("fa-regular");
            } else {
                icon.classList.add("fa-regular");
                icon.classList.remove("fa-solid");
            }
        });

        return;
    }

    const id = Number(wishlist.id);
    const icon = wishlist.querySelector("i");

    if (icon.classList.contains("fa-solid")) {

        wishlistItems = wishlistItems.filter(item => item.id !== id);

        if (wishlistContainer) {
            wishlist.closest(".productCard").remove();
        }

    } else {

        const product = allProductsItems.find(item => item.id === id);

        if (product) wishlistItems.push(product);
    }

    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));

    addToWishlist();
}


function addToCard(cartItemId) {

    const selectedProduct = allProductsItems.filter(item => item.id === cartItemId);

    const exists = cartItems.some(item => item.id === cartItemId);

    if (selectedProduct.length > 0 && exists === false) {

        selectedProduct[0].quantity = selectedProduct[0].quantity || 1;
        cartItems.push(selectedProduct[0]);

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    if (cartItemCount) {
        cartItemCount.textContent = cartItems.length;
    }

    updateCartSummary();
}


function navigationButtons() {

    const navButtons = document.querySelectorAll(".MainNavigation button");
    const mainCategoriesCarBtn = document.querySelectorAll(".mainCategoriesCard button");
    const shopNowButton = document.querySelector("#shopNowButton");

    if (shopNowButton) {
        shopNowButton.addEventListener("click", () => {
            selectedOption = "All";
            selectedCollection = "All";

            localStorage.setItem("selectedOption", selectedOption);
            localStorage.setItem("selectedCollection", selectedCollection);
        });
    }

    // Keep the selected collection tab active, even when a category is selected.
    navButtons.forEach((button) => {

        if (button.id === selectedCollection) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }

        button.addEventListener("click", () => {

            selectedOption = button.id || "All";
            selectedCollection = selectedOption;

            localStorage.setItem("selectedOption", selectedOption);
            localStorage.setItem("selectedCollection", selectedCollection);

            navButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Clear category active state when a new collection is selected.
            mainCategoriesCarBtn.forEach(btn => btn.classList.remove("active"));

            filteredProducts(allProductsItems, selectedOption);
        });
    });


    // Keep the selected category active after page redirect/reload.
    mainCategoriesCarBtn.forEach((button) => {

        if (button.id === selectedOption) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }

        button.addEventListener("click", () => {

            if (location.pathname.includes("/Components/")) {
                localStorage.setItem("selectedCollection", selectedCollection);
                selectedCollection = localStorage.getItem("selectedCollection") || "trending";
            } else {
                selectedCollection = "All";
                localStorage.setItem("selectedCollection", selectedCollection);
            }

            selectedOption = button.id;
            localStorage.setItem("selectedOption", selectedOption);

            mainCategoriesCarBtn.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Existing redirect logic.
            if (location.pathname.includes("/Components/")) {
                location.href = "shopCategory.html";
            } else {
                location.href = "Components/shopCategory.html";
            }
        });
    });
}


function openProductDetails(id, name) {

    const page = location.pathname.includes("/Components/")
        ? "productDetails.html"
        : "./Components/productDetails.html";

    location.href = `${page}?id=${id}&name=${encodeURIComponent(name)}`;
}


function liveSearch() {

    const searchInput = document.querySelector("#searchInput");
    const searchDropdown = document.querySelector("#searchDropdown");

    if (!searchInput || !searchDropdown) return;

    searchInput.addEventListener("input", () => {

        let searchValue = searchInput.value.toLowerCase().trim();

        searchDropdown.innerHTML = "";

        if (searchValue === "") {
            searchDropdown.style.display = "none";
            return;
        }

        const searchProducts = allProductsItems.filter((product) => {
            return product.name.toLowerCase().includes(searchValue);
        });

        if (searchProducts.length === 0) {

            searchDropdown.innerHTML = `<p>No products found</p>`;

        } else {

            searchDropdown.innerHTML = searchProducts.map((product) => {

                return `
                    <div class="searchItem" id="${product.id}">
                        <img src="${product.imageUrl}" alt="${product.name}">
                        <span>${product.name}</span>
                    </div>
                `;

            }).join("");
        }

        searchDropdown.style.display = "block";

        const searchItems = searchDropdown.querySelectorAll(".searchItem");

        searchItems.forEach((item) => {

            item.addEventListener("click", () => {

                const productId = Number(item.id);
                const product = allProductsItems.find(item => item.id === productId);

                if (product) {
                    openProductDetails(product.id, product.category);
                }
            });
        });
    });


    document.addEventListener("click", (e) => {

        if (!e.target.closest(".SearchBar")) {
            searchDropdown.style.display = "none";
        }
    });
}


fetchProducts();