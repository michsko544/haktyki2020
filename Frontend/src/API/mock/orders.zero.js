const details = {
  order: {
    id: 0,
    restaurant: 'Zdrowa Krowa',
    purchaserId: 0,
    payment: 'BLIK',
    date: '2021-07-21',
    time: '14:30:00',
    image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
    orderDetails: [
      {
        userId: 0,
        who: 'Grzegorz',
        what: 'Duży mcBurger z frytkami i kalafiorem',
        coupon: { code: '123', description: 'Daje 12% zniżki' },
      },
      {
        userId: 2,
        who: 'Tomek',
        what: 'Super Burger XL z serem',
        coupon: null,
      },
      {
        userId: 3,
        who: 'Ania',
        what: 'Super Burger (mały) z frytkami',
        coupon: null,
      },
      {
        userId: 4,
        who: 'Hannah',
        what: 'Duży mcBurger z frytkami i kalafiorem',
        coupon: null,
      },
      {
        userId: 5,
        who: 'Tomek',
        what: 'Super Burger XL z serem',
        coupon: null,
      },
      {
        userId: 6,
        who: 'Basia',
        what: 'Super Burger (mały) z frytkami',
        coupon: {
          code: '55555',
          description:
            'Daje 55% zniżki Kupon obejmuje zamówienie za minimum 40zł i daje zniżkę 10% Kupon obejmuje',
        },
      },
      {
        userId: 7,
        who: 'Marcin',
        what: 'Duży mcBurger z frytkami i kalafiorem',
        coupon: { code: '123532', description: 'Daje darmowe picie' },
      },
      { userId: 8, who: 'Adrian', what: 'Super Burger XL z serem', coupon: '' },
      {
        userId: 9,
        who: 'Ania',
        what: 'Super Burger (mały) z frytkami',
        coupon: {
          code: 'Summer',
          description:
            'Darmowe jedzenie, adfiuadbuadbdguiobagdioubn anopiandgadgpnai adigna gnaiopng aine',
        },
      },
    ],
  },
}

export const mockOrdersZero = (mockAdapter) => {
  mockAdapter
    .onGet(`${process.env.REACT_APP_API_URL}/orders/0`)
    .reply(200, details)
}
