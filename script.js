
const name = "Smart Watch";
const basePrice = 1200;
const discountPercent = 20;
const taxRate = 18;
const stockStatus = "in_stock";

// 1. Calculate discounted price
function calculateDiscountedPrice(price, discount) {
    return price - (price * discount / 100);
}

// 2. Calculate tax amount
function calculateTax(price, taxRate) {
    return price * taxRate / 100;
}

// 3. Calculate final price
function calculateFinalPrice(price, discount, taxRate) {
    const discountedPrice = calculateDiscountedPrice(price, discount);
    const tax = calculateTax(discountedPrice, taxRate);

    return discountedPrice + tax;
}

// 4. Check free shipping
function isFreeShipping(finalPrice) {
    if (finalPrice >= 500) {
        return "Free Shipping";
    } else {
        return "Shipping: Rs.49";
    }
}

// 5. Get stock message
function getStockMessage(status) {
    if (status === "in_stock") {
        return "In Stock";
    } else if (status === "limited") {
        return "Limited Stock";
    } else if (status === "out_of_stock") {
        return "Out of Stock";
    } else {
        return "Invalid Stock Status";
    }
}

// Calculate values
const discountedPrice = calculateDiscountedPrice(
    basePrice,
    discountPercent
);

const taxAmount = calculateTax(discountedPrice, taxRate);

const finalPrice = calculateFinalPrice(
    basePrice,
    discountPercent,
    taxRate
);

const shipping = isFreeShipping(finalPrice);
const stockMessage = getStockMessage(stockStatus);

// Print price summary
console.log("Product Name:", name);
console.log("Base Price: Rs.", basePrice);
console.log("Discount:", discountPercent + "%");
console.log("Discounted Price: Rs.", discountedPrice);
console.log("Tax Amount: Rs.", taxAmount);
console.log("Final Price: Rs.", finalPrice);
console.log("Shipping:", shipping);
console.log("Stock Status:", stockMessage);
