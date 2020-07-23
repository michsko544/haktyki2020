import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export const setTokenIntoHeader = (token) => {
  axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const removeTokenFromHeader = () => {
  delete axiosAPI.defaults.headers.common['Authorization']
}

const mock = new MockAdapter(axiosAPI)

mock.onGet(`${process.env.REACT_APP_API_URL}/orders`).reply(200, {
  orders: [
    {
      id: 1,
      name: 'Zdrowa Krowa',
      purchaser: 'Grzegorz',
      date: '2020-07-16',
      time: '18:30',
      interested: '4',
      image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
    },
    {
      id: 2,
      name: 'Zdrowa Krowa',
      purchaser: 'Tomek',
      date: '2020-07-16',
      time: '19:30',
      interested: '12',
      image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
    },
  ],
})

mock.onGet(`${process.env.REACT_APP_API_URL}/user/orders`).reply(200, {
  orders: [
    {
      id: 0,
      name: 'Zdrowa Krowa',
      purchaser: 'Grzegorz',
      date: '2020-07-16',
      time: '18:30',
      interested: '4',
      image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
      orderDetails: 'Duży mcBurger z frytkami i kalafiorem',
    },
  ],
})

mock.onGet(`${process.env.REACT_APP_API_URL}/orders/1`).reply(200, {
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
})

mock.onGet(`${process.env.REACT_APP_API_URL}/orders/2`).reply(200, {
  order: {
    id: 2,
    restaurant: "McDonald's",
    purchaser: 'Tomek',
    date: '2020-07-18',
    time: '12:30',
    interested: 5,
    image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
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
})

export default axiosAPI
