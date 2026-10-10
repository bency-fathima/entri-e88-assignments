// Product details

// // Product 1
// let productName = "Laptop";
// let basePrice = 600;
// let discountPercent = 10;
// let taxRate = 18;
// let stockStatus = "In Stock";

// Product 2
let productName = "Smartphone";
let basePrice = 1200;
let discountPercent = 15;
let taxRate = 12;
let stockStatus = "Limited Stock";

// // Product 3
// let productName = "Headphones";
// let basePrice = 350;
// let discountPercent = 5;
// let taxRate = 18;
// let stockStatus = "Out of Stock";

// Calculate discounted price
function calculateDiscountedPrice(price, discount) {
  let discountAmount = price * (discount / 100);
  return price - discountAmount;
}

// Calculate tax
function calculateTax(price, taxRate) {
  return price * (taxRate / 100);
}

// Calculate final price
function calculateFinalPrice(price, discount, taxRate) {
  let discountedPrice = calculateDiscountedPrice(price, discount);
  let taxAmount = calculateTax(basePrice, taxRate);

  let finalPrice = discountedPrice + taxAmount;
  return finalPrice;
}

// Check shipping
function isFreeShipping(finalPrice) {
  if (finalPrice >= 500) {
    return "Free Shipping";
  } else {
    return "Shipping: Rs.49";
  }
}

// Get stock message
function getStockMessage(status) {
  status = status.toLowerCase();
  if (status === "in stock") {
    return "In Stock";
  } else if (status === "limited stock") {
    return "Limited Stock";
  } else {
    return "Out of Stock";
  }
}

// Calculate values
let discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);

let taxAmount = calculateTax(basePrice, taxRate);

let finalPrice = calculateFinalPrice(basePrice, discountPercent, taxRate);

let shipping = isFreeShipping(finalPrice);

let stockMessage = getStockMessage(stockStatus);

// Print summary
console.log("----- Price Summary -----");
console.log("Product Name:", productName);
console.log("Base Price: Rs." + basePrice);
console.log("Discounted Price: Rs." + discountedPrice);
console.log("Tax: Rs." + taxAmount);
console.log("Final Price: Rs." + finalPrice);
console.log("Shipping:", shipping);
console.log("Stock Status:", stockMessage);
