const details = {
  order: {
    id: 1,
    restaurant: 'Zdrowa Krowa',
    purchaser: 'Grzegorz',
    date: '2020-07-16',
    time: '18:30',
    interested: 9,
    image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
    orderDetails: [
      { id: 1, who: 'Grzegorz', what: 'Duży mcBurger z frytkami i kalafiorem' },
      { id: 2, who: 'Tomek', what: 'Super Burger XL z serem' },
      { id: 3, who: 'Ania', what: 'Super Burger (mały) z frytkami' },
      { id: 4, who: 'Hannah', what: 'Duży mcBurger z frytkami i kalafiorem' },
      { id: 5, who: 'Tomek', what: 'Super Burger XL z serem' },
      { id: 6, who: 'Basia', what: 'Super Burger (mały) z frytkami' },
      { id: 7, who: 'Marcin', what: 'Duży mcBurger z frytkami i kalafiorem' },
      { id: 8, who: 'Adrian', what: 'Super Burger XL z serem' },
      { id: 9, who: 'Ania', what: 'Super Burger (mały) z frytkami' },
    ],
  },
}

export const mockOrdersOne = (mockAdapter) => {
  mockAdapter
    .onGet(`${process.env.REACT_APP_API_URL}/orders/1`)
    .reply(200, details)
}
