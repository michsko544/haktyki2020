const details = {
  order: {
    orderId: 2,
    restaurant: "McDonald's",
    purchaserId: 71,
    date: '2020-07-18',
    time: '12:30',
    interested: 6,
    image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',

    orderDetails: [
	  {
        userId: 71,
        who: 'Janek kowalski',
        what: "Powiększony McZestaw z BigMac'iem, frytkami i liptonem",
      },
      {
        userId: 1,
        who: 'Grzegorz',
        what: "Powiększony McZestaw z BigMac'iem, frytkami i liptonem",
      },
      { userId: 2, who: 'Tomek', what: 'Super Burger XL z serem' },
      { userId: 6, who: 'Basia', what: 'Super Burger (mały) z frytkami' },
      { userId: 7, who: 'Marcin', what: 'Duży mcBurger z frytkami i kalafiorem' },
      { userId: 8, who: 'Adrian', what: 'Super Burger XL z serem' },
    ],
  },
}

export const mockOrdersTwo = (mockAdapter) => {
  mockAdapter
    .onGet(`${process.env.REACT_APP_API_URL}/orders/2`)
    .reply(200, details)
}
