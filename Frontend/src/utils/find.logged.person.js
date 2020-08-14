export const findLoggedPerson = (userid, order) =>
    order.orderDetails.find((elem) => userid === elem.userId)