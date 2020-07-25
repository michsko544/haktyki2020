const details = {
  order: {
    id: 2,
    restaurant: "McDonald's",
    purchaser: 'Tomek',
    date: '2020-07-18',
    time: '12:30',
    interested: 5,
    image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
    loggedUserOrder: { order: '', coupon: '' },
    orderDetails: [
      {
        id: 1,
        who: 'Grzegorz',
        what: "Powiększony McZestaw z BigMac'iem, frytkami i liptonem",
      },
      { id: 2, who: 'Tomek', what: 'Super Burger XL z serem' },
      { id: 6, who: 'Basia', what: 'Super Burger (mały) z frytkami' },
      { id: 7, who: 'Marcin', what: 'Duży mcBurger z frytkami i kalafiorem' },
      { id: 8, who: 'Adrian', what: 'Super Burger XL z serem' },
    ],
  },
}

export const mockOrdersTwo = (mockAdapter) => {
  mockAdapter
    .onGet(`${process.env.REACT_APP_API_URL}/orders/2`)
    .reply(200, details)
}
