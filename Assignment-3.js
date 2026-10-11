const name = "Wireless Headphones";
const basePrice = 1600;       
const discountPercent = 15;    
const taxRate = 18;            
const stockStatus = 3;

function calculateDiscountedPrice(price, discount)
{
    const newprice = price - (price * discount / 100);
    return newprice;
}
function calculateTax(price, taxrate)
{
    const tax = price * taxrate / 100;
    return tax;
}
function calculateFinalPrice(price, discount, taxRate)
{
    const discountedPrice = calculateDiscountedPrice(price, discount);
    const tax = calculateTax(discountedPrice, taxRate);
    const finalPrice = discountedPrice + tax;
   
    return finalPrice;
}
function isFreeShipping(finalPrice){
    if(finalPrice >= 500){
        return "shipping is free"
}
else{
    return "shipping charge 49"
}
}
function getStockMessage(status){
    switch(true){
        case status>1:
            return "Product is in stock";
        case status == 0:
            return "Product is out of stock";
        case status ==1 :
            return "Product is in limited stock";
        default:
            return "Invalid stock status";
    }
}
let discountPrice=calculateDiscountedPrice(basePrice, discountPercent);
let tax=calculateTax(discountPrice, taxRate);
let finalPrice = calculateFinalPrice(basePrice, discountPercent, taxRate);
let freeShippingMessage = isFreeShipping(finalPrice);
let stockMessage = getStockMessage(stockStatus);

console.log("Product Summary");
console.log("Product Name: " + name);   
console.log("Base Price: " + basePrice);
console.log("Discount Percent: " + discountPercent + "%");
console.log("Discounted Price: " + discountPrice);
console.log("Tax Rate: " + taxRate + "%");
console.log("Tax: " + tax);
 console.log("Final price is: " + finalPrice);
 console.log("Free Shipping: " + freeShippingMessage);
console.log("Stock Status: " + stockMessage);    