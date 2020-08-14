export const isOrderClosed = (order) => {
    const date = order.date
    const time = order.time

    const dateSplited = date.split('-')
    const timeSplited = time.split(':')
    dateSplited[1]--
    const orderDate = new Date(...dateSplited, timeSplited[0], timeSplited[1])
    const dateNow = new Date(Date.now())

    const result = orderDate < dateNow

    return result
  }