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

mock.onOptions('http://localhost:4200/*').reply(200, {}, {
  'Access-Control-Allow-Origin': '*'
})

mock.onGet('http://localhost:4200/orders').reply(200, {
  orders: [
    {
      id: 1,
      name: 'Zdrowa Krowa',
      purchaser: 'Grzegorz',
      date: '2020-07-16',
      time: '18:30',
      interested: '4',
      image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg'
    },
    {
      id: 2,
      name: 'Zdrowa Krowa',
      purchaser: 'Tomek',
      date: '2020-07-16',
      time: '19:30',
      interested: '12',
      image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg'
    }
  ]
})

mock.onGet('http://localhost:4200/user/orders').reply(200, {
  orders: [
    {
      id: 0,
      name: 'Zdrowa Krowa',
      purchaser: 'Grzegorz',
      date: '2020-07-16',
      time: '18:30',
      interested: '4',
      image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
      orderDetails: 'Duży mcBurger z frytkami i kalafiorem'
    }
  ]
})

export default axiosAPI
