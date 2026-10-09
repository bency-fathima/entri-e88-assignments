const name = "Wireless Headphones";
const basePrice = 799;
const discountPercent = 20;
const taxRate = 5;
const stockStatus = "in_stock";

function calculateDiscountedPrice(price, discount) {
  return price - (price * discount) / 100;
}

function calculateTax(price, taxRate) {
  return (price * taxRate) / 100;
}

function calculateFinalPrice(price, discount, taxRate) {
  const discountedPrice = calculateDiscountedPrice(price, discount);
  const taxAmount = calculateTax(discountedPrice, taxRate);
  return discountedPrice + taxAmount;
}

function isFreeShipping(finalPrice) {
  if (finalPrice >= 500) {
    return "Free Shipping";
  }
  return "Shipping: Rs.49";
}

function getStockMessage(status) {
  if (status === "in_stock") {
    return "In Stock";
  } else if (status === "limited") {
    return "Limited Stock";
  } else {
    return "Out of Stock";
  }
}

const discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);
const taxAmount = calculateTax(discountedPrice, taxRate);
const finalPrice = calculateFinalPrice(basePrice, discountPercent, taxRate);
const shippingMessage = isFreeShipping(finalPrice);
const stockMessage = getStockMessage(stockStatus);

console.log("Product: " + name);
console.log("Discounted price: Rs." + discountedPrice.toFixed(2));
console.log("Tax amount: Rs." + taxAmount.toFixed(2));
console.log("Final price: Rs." + finalPrice.toFixed(2));
console.log("Shipping charge: " + shippingMessage);
console.log("Stock status: " + stockMessage);
