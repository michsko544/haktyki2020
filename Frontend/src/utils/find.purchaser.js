export const findPurchaser = (order) =>
  order.orderDetails.find((elem) => order.purchaserId === elem.userId)
