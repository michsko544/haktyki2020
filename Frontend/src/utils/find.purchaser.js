export const findPurchaser = (order) => {
    console.log('Order:', order)
    return order.orderDetails.find((elem) => order.purchaserId === elem.userId)
}