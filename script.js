
// Variable declarations


const prod_name = "Laptop";
const base_price = 45000;
const discount_percent = 10;
const tax_rate = 20;
const stock_status = "limited";

// calculate  the discount price

function calculateDiscountedPrice(price,discount){
    const discountPrice = (price * (discount/100));
    return price - discountPrice;
}

// calculate the tax amount

function calculateTax(price,tax_rate){
    const tax_amount = price * (tax_rate / 100);
    return tax_amount;

}

// calculate the final price

function calculateFinalPrice(price, discount, tax_rate){

    const discount_price =calculateDiscountedPrice(price,discount);
    const taxAmount = calculateTax(price,tax_rate);
    return discount_price + taxAmount;

}

// determines free shipping

function isFreeShipping(finalPrice){
    if(finalPrice >= 500){
        return "Free Shipping"
    }else{
        return "Please pay shipping rate: rs.49"
    }
}

// stock status


function getStockMessage(status){
    switch ( status.toLowerCase()){
        case "in_stock":
            return "In stock";
        case "limited":
             return "Limited";
        case "out_of_stock":
            return "Out of stock";
        default:
            return "Apply a vallid product name";
    }
}


// calculation and Execution

const currentDiscountPrice = calculateDiscountedPrice(base_price,discount_percent);
const Tax = currentDiscountPrice;
const calculatedTaxAmount = calculateTax(Tax,tax_rate);
const totalFinalPrice = calculateFinalPrice(base_price,discount_percent,tax_rate);

const ship_status = isFreeShipping(totalFinalPrice);
const stockMessage = getStockMessage(stock_status);

// Output summary


console.log("========================================");
console.log(`PRODUCT PRICE SUMMARY: ${prod_name.toUpperCase()}`);
console.log("========================================");
console.log(`Product Name:      ${prod_name}`);
console.log(`Availability:      ${stockMessage}`);
console.log(`Base Retail Price: Rs. ${base_price.toFixed(2)}`);
console.log(`Discount Applied:  ${discount_percent}%`);
console.log(`Discounted Price:  Rs. ${currentDiscountPrice}`);
console.log(`Tax Amount (${tax_rate}%): Rs. ${calculatedTaxAmount}`);
console.log("----------------------------------------");
console.log(`FINAL PAYABLE:     Rs. ${totalFinalPrice}`);
console.log(`Shipping Option:   ${ship_status}`);
console.log("========================================");