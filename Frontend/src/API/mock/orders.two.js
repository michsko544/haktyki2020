const details = {
  order: {
    orderId: 2,
    restaurant: "McDonald's",
    purchaserId: 71,
    date: '2021-07-18',
    time: '12:30',
    image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
    orderDetails: [
      {
        userId: 71,
        who: 'Janek Kowalski',
        what: "Powiększony McZestaw z BigMac'iem, frytkami i liptonem",
        coupon: '',
      },
      {
        userId: 1,
        who: 'Grzegorz',
        what: "Powiększony McZestaw z BigMac'iem, frytkami i liptonem",
        coupon: '',
      },
      { userId: 2, who: 'Tomek', what: 'Super Burger XL z serem', coupon: '' },
      {
        userId: 6,
        who: 'Basia',
        what: 'Super Burger (mały) z frytkami',
        coupon: '',
      },
      {
        userId: 7,
        who: 'Marcin',
        what: 'Duży mcBurger z frytkami i kalafiorem',
        coupon: '',
      },
      { userId: 8, who: 'Adrian', what: 'Super Burger XL z serem', coupon: '' },
      {
        userId: 9,
        who: 'Ela',
        what: 'Super Burger (duży) z frytkami',
        coupon: '',
      },
      {
        userId: 10,
        who: 'Karol',
        what: 'Duży mcBurger z frytkami i kalafiorem',
        coupon: '',
      },
      { userId: 11, who: 'Adrian', what: 'Cheeseburger maxxx', coupon: '' },
      {
        userId: 12,
        who: 'Marian',
        what: 'Bebek Burger mały, frytki belgijskie',
        coupon: '',
      },
    ],
  },
}

export const mockOrdersTwo = (mockAdapter) => {
  mockAdapter
    .onGet(`${process.env.REACT_APP_API_URL}/orders/2`)
    .reply(200, details)
}
