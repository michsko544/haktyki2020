export const displayDate = (order) => {
    const date = order.date
    const dateSplited = date.split('-')
    //decrement because constructor Date numbered months from 0
    dateSplited[1]--
    const orderDate = new Date(...dateSplited)
    const dateNow = new Date(Date.now())

    //comparison order and now dates in miliseconds from 1970
    if (orderDate - dateNow.setHours(0, 0, 0, 0) >= 48 * 3600 * 1000) {
      return date
    } else if (orderDate - dateNow.setHours(0, 0, 0, 0) >= 24 * 3600 * 1000) {
      return 'Jutro'
    } else if (orderDate - dateNow.setHours(0, 0, 0, 0) >= 0) {
      return 'Dzisiaj'
    } else if (orderDate - dateNow.setHours(0, 0, 0, 0) >= -24 * 3600 * 1000) {
      return 'Wczoraj'
    } else if (orderDate - dateNow.setHours(0, 0, 0, 0) >= -48 * 3600 * 1000) {
      return 'Przedwczoraj'
    } else {
      return date
    }
  }