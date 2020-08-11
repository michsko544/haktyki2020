import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { mockOrders } from './../mock/orders'
import { mockUserOrders } from './../mock/user.orders'
import { mockOrdersFour } from './../mock/orders.four'
import { mockOrdersZero } from './../mock/orders.zero'
import { mockOrdersOne } from './../mock/orders.one'
import { mockOrdersTwo } from './../mock/orders.two'
import { mockPhotos } from './../mock/photos'
import { mockOrder } from './../mock/order'
import { mockRegister } from './../mock/register'
import { mockLogin } from './../mock/login'
import { mockSettings } from './../mock/settings';
import { mockMe } from './../mock/me';

const axiosAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export const setTokenIntoHeader = (token) => {
  axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const removeTokenFromHeader = () => {
  delete axiosAPI.defaults.headers.common['Authorization']
}

const mock = new MockAdapter(axiosAPI, { delayResponse: 2000 })

mockRegister(mock)
mockLogin(mock)
mockOrder(mock)
mockOrders(mock)
mockUserOrders(mock)
mockOrdersZero(mock)
mockOrdersOne(mock)
mockOrdersTwo(mock)
mockOrdersFour(mock)
mockPhotos(mock)
mockSettings(mock)
mockMe(mock)

export default axiosAPI
