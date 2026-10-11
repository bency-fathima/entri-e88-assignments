// Product Declaration

const productName = "Apple 18 pro";
const basePrice = 164999;
const discPercent = 22;
const taxRate = 18;
const stockStatus = "limited";

// Functions

// Discount function
function calculateDiscountPrice(price, discount) {
  const discountAmount = (price * discount) / 100;
  return price - discountAmount;
}

// Tax Calculation function

function taxCalculation(price, taxRate) {
  return (price * taxRate) / 100;
}

//final price calculation

function calculateFinalPrice(price, discount, taxRate) {
  const discountedPrice = calculateDiscountPrice(price, discount);
  const taxAmount = taxCalculation(discountedPrice, taxRate);

  return discountedPrice + taxAmount;
}

// check free ship function

function isFreeshipng(finalprice) {
  if (finalprice >= 500) {
    return "Free shipping";
  } else {
    return "Shipping charge : Rs.49";
  }
}


// stock status msg

function productInStockCheck(status) {
  switch (status) {
    case "in_stock":
      return "In Stock";
    case "limited":
      return "Limited Stock";
    case "out_of_stock":
      return "Out of Stock";
    default:
      return "Status Unknown";
  }
}


// Execution

const discountedPrice = calculateDiscountPrice(basePrice,discPercent)
const taxAmount = taxCalculation(discountedPrice,taxRate)
const finalprice = calculateFinalPrice(basePrice,discPercent,taxRate)
const shippingStatus = isFreeshipng(finalprice)
const stockMessage = productInStockCheck(stockStatus)


// Console Output

console.log("Prouct Name:"+ productName);
console.log("Base Price : Rs." + basePrice);
console.log("Discount("+ discPercent +"%):Rs." +(basePrice-discountedPrice).toFixed(2));
console.log("Discounted Price: Rs." + discountedPrice.toFixed(2));
console.log("Tax Amount (" + taxRate + "%): Rs." + taxAmount.toFixed(2));
console.log("Final Payable Price: Rs." + finalprice.toFixed(2));
console.log("Shipping: " + shippingStatus);
console.log("Stock Status: " + stockMessage);