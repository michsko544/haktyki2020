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

mock.onGet(`${process.env.REACT_APP_API_URL}/photos`).reply(200, {
  pictures: [
    {
      id: 1,
      url:
        'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
    },
    {
      id: 2,
      url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1S6AixYiLXs1A8N7FeneBefw_6xm5x09lAOFVxW4StTMyfnC7MtTzDVeng_fa9eARzamZAZaJOyxO5g&usqp=CAU',
    },
    {
      id: 3,
      url:
        'https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/article/2020/04/22/coronavirus-and-obesity-doctors-take-aim-at-food-industry-over-poor-diets/10933380-3-eng-GB/Coronavirus-and-obesity-Doctors-take-aim-at-food-industry-over-poor-diets_wrbm_large.jpg',
    },
    {
      id: 4,
      url:
        'https://www.helpguide.org/wp-content/uploads/fast-foods-candy-cookies-pastries-768.jpg',
    },
    {
      id: 5,
      url:
        'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/Various_Sandwiches_1296x728-header-1296x728.jpg?w=1155&h=1528',
    },
    {
      id: 6,
      url: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/healthy-eating-ingredients-1296x728-header.jpg?w=1155&h=1528',
    },
  ],
})

export default axiosAPI
