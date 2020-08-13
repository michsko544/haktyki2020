const details = {
  order: {
    id: 1,
    restaurant: 'Zdrowa Krowa',
    purchaserId: 2,
    date: '2021-07-29',
    time: '14:30',
    paymentForm: 'CASH',
    image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
    orderDetails: [
      { userId: 2, who: 'Tomek', what: 'Super Burger XL z serem' },
      {
        userId: 3,
        who: 'Ania',
        what: 'Super Burger (mały) z frytkami',
      },
      {
        userId: 4,
        who: 'Hannah',
        what: 'Duży mcBurger z frytkami i kalafiorem',
      },
      {
        userId: 5,
        who: 'Atomek',
        what: 'Super Burger XL z serem i pieczarkami',
      },
      {
        userId: 6,
        who: 'Basia',
        what: 'Super Burger (mały) z frytkami',
      },
    ],
  },
}

export const mockOrdersOne = (mockAdapter) => {
  mockAdapter
    .onGet(`${process.env.REACT_APP_API_URL}/orders/1`)
    .reply(200, details)
}
