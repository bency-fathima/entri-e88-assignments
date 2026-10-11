
let name = "Shoes"
let basePrice = 1000
let discountPercent = 20
let taxRate = 10
let stockStatus = "in_stock"

function calculateDiscountedPrice(price, discount) {
    discount = price * (discount / 100)
    return (price - discount)
}

console.log("Discounted Price:", calculateDiscountedPrice(basePrice, discountPercent))

function calculateTax(price, tax) {
    tax = (tax * price) / 100
    return (tax)
}
console.log("Tax Rate:", calculateTax(basePrice, taxRate))

function calculateFinalPrice(price, discount, tax) {
    const getDiscount = calculateDiscountedPrice(price, discount)
    const getTax = calculateTax(getDiscount, tax)
    return getDiscount + getTax
}
console.log("Total Price:", calculateFinalPrice(basePrice, discountPercent, taxRate))


function isFreeShipping(finalPrice) {
    if (finalPrice >= 500) {
        return ("Free Shipping")
    } else {
        return ("Shipping: Rs.49")
    }
}

console.log(isFreeShipping(704))

function getStockMessage(status) {
    switch (true) {
        case status === "in_stock":
            return ("In Stock")

        case status === "limited":
            return ("Limited Stock")

        default:
            return ("Out of Stock")
    }
}

console.log("Stock Status:", getStockMessage(stockStatus))