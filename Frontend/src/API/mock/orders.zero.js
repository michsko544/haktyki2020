const details = {
  order: {
    id: 0,
    restaurant: 'Zdrowa Krowa',
    purchaserId: 0,
    date: '2020-07-21',
    time: '14:30',
    image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
    orderDetails: [
      {
        userId: 0,
        who: 'Grzegorz',
        what: 'Duży mcBurger z frytkami i kalafiorem',
        coupon: '123',
      },
      { userId: 2, who: 'Tomek', what: 'Super Burger XL z serem', coupon: '' },
      {
        userId: 3,
        who: 'Ania',
        what: 'Super Burger (mały) z frytkami',
        coupon: '',
      },
      {
        userId: 4,
        who: 'Hannah',
        what: 'Duży mcBurger z frytkami i kalafiorem',
        coupon: '',
      },
      { userId: 5, who: 'Tomek', what: 'Super Burger XL z serem', coupon: '' },
      {
        userId: 6,
        who: 'Basia',
        what: 'Super Burger (mały) z frytkami',
        coupon: '55555',
      },
      {
        userId: 7,
        who: 'Marcin',
        what: 'Duży mcBurger z frytkami i kalafiorem',
        coupon: 'Big burger gratis',
      },
      { userId: 8, who: 'Adrian', what: 'Super Burger XL z serem', coupon: '' },
      {
        userId: 9,
        who: 'Ania',
        what: 'Super Burger (mały) z frytkami',
        coupon: 'Summer',
      },
    ],
  },
}

export const mockOrdersZero = (mockAdapter) => {
  mockAdapter
    .onGet(`${process.env.REACT_APP_API_URL}/orders/0`)
    .reply(200, details)
}
