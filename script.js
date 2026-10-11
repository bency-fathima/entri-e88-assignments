
const name = "Wireless Headphones";   
const basePrice = 2000;               
const discountPercent = 10;           
const taxRate = 18;                  
const stockStatus = "limited";       


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
  } else {
    return "Shipping: Rs.49";
  }
}


function getStockMessage(status) {
  switch (status) {
    case "in_stock":
      return "In Stock";
    case "limited":
      return "Limited Stock";
    case "out_of_stock":
      return "Out of Stock";
    default:
      return "Unknown Stock Status";
  }
}


const discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);
const taxAmount = calculateTax(discountedPrice, taxRate);
const finalPrice = calculateFinalPrice(basePrice, discountPercent, taxRate);
const shipping = isFreeShipping(finalPrice);
const stockMessage = getStockMessage(stockStatus);


console.log("Product          : " + name);
console.log("Base Price       : Rs." + basePrice.toFixed(2));
console.log("Discount         : " + discountPercent + "%");
console.log("Discounted Price : Rs." + discountedPrice.toFixed(2));
console.log("Tax (" + taxRate + "%)       : Rs." + taxAmount.toFixed(2));
console.log("Final Price      : Rs." + finalPrice.toFixed(2));
console.log("Shipping         : " + shipping);
console.log("Stock Status     : " + stockMessage);
