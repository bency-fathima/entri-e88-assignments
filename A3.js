//Price & Discount Calculator — JavaScriptFundamentals


let name = "Fridge"
let basePrice = 25000
let discountPercent = 30
let stockStatus = 'limited'
let taxRate = 18

function calculateDiscountedPrice(basePrice, discountPercent) {
    let discounted_price = basePrice * discountPercent / 100;
    return basePrice - discounted_price;
}

function calculateTax(basePrice, taxRate) {
    let tax_amount = basePrice * taxRate / 100;
    return tax_amount;
}

function calculateFinalPrice(basePrice, discountPercent, taxRate) {
    let a = calculateDiscountedPrice(basePrice, discountPercent);
    let b = calculateTax(a, taxRate);
    let finalPrice = a + b;
    return finalPrice;
}

function isFreeShipping(finalPrice) {
    if (finalPrice >= 500) {
        return "Free Shipping";
    }
    else {
        return "Shipping: Rs.49";
    }
}

function getStockMessage(stockStatus) {
    if (stockStatus == 'in_stock') {
        return 'In Stock';
    }
    else if (stockStatus == 'limited') {
        return 'Limited Stock';
    }
    else {
        return 'Out of Stock';
    }
}

let discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);
let taxAmount = calculateTax(discountedPrice, taxRate);
let finalPrice = calculateFinalPrice(basePrice, discountPercent, taxRate);
let shippingMsg = isFreeShipping(finalPrice);
let stockMsg = getStockMessage(stockStatus);
//Printing full price summary.
console.log("Product:", name);
console.log("Base Price:", basePrice);
console.log("Discounted Price:", discountedPrice);
console.log("Tax Amount:", taxAmount);
console.log("Final Price:", finalPrice);
console.log("Shipping Status:", shippingMsg);
console.log("Stock Status:", stockMsg);
