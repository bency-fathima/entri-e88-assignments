// Product details

// Product 1
const name = "School Bag";
const basePrice = 600;
const discountPercent = 10;
const taxRate = 18;
const stockStatus = "in_stock";

// product 2
// const name = "Gaming Mouse";
// const basePrice = 450;
// const discountPercent = 10;
// const taxRate = 5;
// const stockStatus = "limited";

// Calculate discount
function calculateDiscountedPrice(price, discount) {
  const discountAmount = (price * discount) / 100;
  return price - discountAmount;
}

// Calculate tax
function calculateTax(price, taxRate) {
  return (price * taxRate) / 100;
}

// Calculate final price
function calculateFinalPrice(price, discount, taxRate) {
  const discountedPrice = calculateDiscountedPrice(price, discount);
  const tax = calculateTax(discountedPrice, taxRate);
  return discountedPrice + tax;
}

// Check shipping
function isFreeShipping(finalPrice) {
  if (finalPrice >= 500) {
    return "Free Shipping";
  } else {
    return "Shipping: Rs.49";
  }
}

// Check stock status
function getStockMessage(status) {
  if (status == "in_stock") {
    return "In Stock";
  } else if (status == "limited") {
    return "Limited Stock";
  } else {
    return "Out of Stock";
  }
}

// Get all values
const discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);
const taxAmount = calculateTax(discountedPrice, taxRate);
const finalPrice = calculateFinalPrice(basePrice, discountPercent, taxRate);
const shipping = isFreeShipping(finalPrice);
const stock = getStockMessage(stockStatus);

// Step 8: Print to console
console.log("----Product Price Summary----");
console.log("Product Name: " + name);
console.log("Base Price: " + basePrice);
console.log("Discounted Price: " + discountedPrice);
console.log("Tax Amount: " + taxAmount);
console.log("Final Price: " + finalPrice);
console.log("Shipping: " + shipping);
console.log("Stock Status: " + stock);
