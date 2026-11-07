# ShopHub

ShopHub is a small online shopping website built with HTML, CSS, and JavaScript. You can browse products, search for items, save products to a wishlist, and manage a shopping cart. It uses sample product data and saves your cart, wishlist, and selections in your browser.

## How to run

1. Open the `Assignment-5` folder in Visual Studio Code.
2. Start the website with the Live Server extension, beginning with `index.html`.
3. Use the links on the page to browse the other sections.

Run it through a local web server such as Live Server rather than opening the HTML file directly. The website loads product data from `products.json` using `fetch`.

## What you can do

- **Home:** See a banner, product categories, and a small selection of trending products.
- **Shop all:** Browse products and filter them by category or collection.
- **Product details:** Open a product, change its quantity, and add it to the cart.
- **Cart:** Change quantities, remove products, and view the subtotal, shipping, and total.
- **Wishlist:** Add or remove products using the heart button.
- **Search:** Type a product name to see matching suggestions, then select one to open its details.

## How it works

- `products.json` contains the sample product information, including its name, category, price, rating, image, and collections.
- `main.js` loads the products, displays the right products for each page, and handles search, navigation, wishlist, cart, and quantity changes.
- Product details are opened with the product ID in the page URL. The details page uses that ID to find and display the product.
- Product data, cart contents, wishlist contents, and selected navigation filters are saved in the browser's `localStorage`. This keeps them available when you move between pages or reload the site in the same browser.
- Quantity changes are saved with the product and cart data so the details page and cart can show the same quantity. Removing a product from the cart resets its product quantity to 1.
- The cart summary adds up each item's price multiplied by its quantity. Shipping is free when the subtotal is at least ₹500; otherwise, it is ₹50. An empty cart has no shipping charge.

## Project files

```text
Assignment-5/
├── index.html                 Home page
├── main.js                    Shared website behavior
├── products.json              Sample product data
├── Components/
│   ├── cart.html              Shopping cart
│   ├── error.html             Error page
│   ├── productDetails.html    Product details
│   ├── shopCategory.html      Product browsing
│   └── wishlist.html          Saved products
├── Style/
│   ├── common.css             Shared page and product styles
│   ├── index.css              Home page styles
│   ├── cart.css               Cart styles
│   ├── error.css              Error page styles
│   ├── productDetails.css     Product details styles
│   ├── shopCategory.css       Product browsing styles
│   └── wishlist.css           Wishlist styles
└── image/
    └── hero.png               Home page banner image
```

## Notes

- There is no package installation or build step; the site uses plain HTML, CSS, and JavaScript.
- Product photos and Font Awesome icons are loaded from online services, so those may need an internet connection.
- The profile link, search buttons, disabled sort control, and “Buy Now” button are visual elements and do not currently perform an action.
