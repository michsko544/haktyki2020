import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { mockOrders } from './mock/orders'
import { mockUserOrders } from './mock/user.orders'
import { mockOrdersOne } from './mock/orders.one'
import { mockOrdersTwo } from './mock/orders.two'
import { mockPhotos } from './mock/photos'
import { mockOrder } from './mock/order'
import { mockRegister } from './mock/register'
import { mockLogin } from './mock/login'

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

mockRegister(mock)
mockLogin(mock)
mockOrder(mock)
mockOrders(mock)
mockUserOrders(mock)
mockOrdersOne(mock)
mockOrdersTwo(mock)
mockPhotos(mock)

export default axiosAPI
