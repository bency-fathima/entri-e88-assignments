//Product variables
let name = "Laptop Bag";
let basePrice = 1200;
let discountPercent = 20;
let taxRate = 18;
let stockStatus = "limited";

//Caculate discounted price
function calculateDiscountedPrice(price,discount){
    let discountAmount = (price * discount) / 100;
    return price - discountAmount;
}

//Calculate tax amount
function calculateTax(price,taxRate){
    return (price * taxRate) / 100;
}

//Calculate final price
function calculateFinalPrice(price,discount,taxRate){
    let discountedPrice = calculateDiscountedPrice(price,discount);
    let taxAmount = calculateTax(discountedPrice, taxRate);
    return discountedPrice + taxAmount;
}

//Check free shipping
function isFreeShipping(finalPrice){
    if(finalPrice >= 500){
        return "Free Shipping"
    }
    else{
        return "Shipping Charge: Rs.49/-"
    }
}

//Stock message
function getStockMessage(status){
    switch(status){
        case "in_stock":
            return "In Stock";

        case "limited":
            return "Limited Stock";

        case "out_of_stock":
            return "Out of stock";

        default:
            return "Unknown status";
    }
}

//Call all functions & print summary
let discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);
let taxAmount = calculateTax(discountedPrice, taxRate);
let finalPrice = calculateFinalPrice(basePrice, discountPercent, taxRate);
let shippingMessage = isFreeShipping(finalPrice);
let stockMessage = getStockMessage(stockStatus);

console.log("--- Price Summary ---");
console.log("Product: " + name);
console.log("Base Price: Rs." + basePrice);
console.log("Discounted Price: Rs." + discountedPrice);
console.log("Tax Amount: Rs." + taxAmount);
console.log("Final Price: Rs." + finalPrice);
console.log("Shipping: " + shippingMessage);
console.log("Stock: " + stockMessage);
    
