import axios from 'axios'

const unsplashAPI = axios.create({
  baseURL: 'https://api.unsplasha.com/photos/',
})

unsplashAPI.defaults.headers.common[
  'Authorization'
] = `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN}`

export default unsplashAPI
