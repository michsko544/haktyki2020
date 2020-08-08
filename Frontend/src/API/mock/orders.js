const orders = {
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
      image:
        'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/Various_Sandwiches_1296x728-header-1296x728.jpg?w=1155&h=1528',
    },
    {
      id: 3,
      name: 'Inne zamówienie',
      purchaser: 'Atomek',
      date: '2020-07-23',
      time: '17:30',
      interested: '5',
      image:
        'https://article.images.consumerreports.org/f_auto/prod/content/dam/CRO-Images-2020/Magazine/05May/CR-Health-Inlinehero-HealthyFastFood-3-20-v2',
    },
    {
      id: 4,
      name: 'McDonalds',
      purchaser: 'Atomek',
      date: '2020-07-23',
      time: '17:30',
      interested: '2',
      image:
        'https://cdn.cnn.com/cnnnext/dam/assets/200310103455-mcdonalds-little-mac-and-double-big-mac-super-169.jpg',
    },
  ],
}

export const mockOrders = (mockAdapter) => {
  mockAdapter
    .onGet(`${process.env.REACT_APP_API_URL}/orders`)
    .reply(200, orders)
}
