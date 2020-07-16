import React, { useState, useEffect } from 'react'

import H1 from './../../components/H1'
import H3 from './../../components/H3'
import HBold from './../../components/HeadingBold'
import Header from '../../components/Header/header'
import Container from './Container'
import TuneIcon from '@material-ui/icons/Tune'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined'
import Button from './../../components/Button'
import Card from '../../components/FoodCard/foodCard'
import { IconLink } from './../../components/App/App.style'

const Home = () => {
  const [orders, setOrders] = useState([
    {
      id: 0,
      name: 'Zdrowa Krowa',
      purchaser: 'Grzegorz',
      date: '2020-07-16',
      time: '18:30',
      interested: '4',
      image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
      orderDetails: undefined,
    },
    {
      id: 0,
      name: 'Zdrowa Krowa',
      purchaser: 'Grzegorz',
      date: '2020-07-16',
      time: '18:30',
      interested: '4',
      image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
      orderDetails: undefined,
    },
    {
      id: 0,
      name: 'Zdrowa Krowa',
      purchaser: 'Grzegorz',
      date: '2020-07-16',
      time: '18:30',
      interested: '4',
      image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
      orderDetails: undefined,
    },
    {
      id: 0,
      name: 'Zdrowa Krowa',
      purchaser: 'Grzegorz',
      date: '2020-07-16',
      time: '18:30',
      interested: '4',
      image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
      orderDetails: undefined,
    },
  ])

  const [myOrders, setMyOrders] = useState([
    {
      id: 0,
      name: 'Zdrowa Krowa',
      purchaser: 'Grzegorz',
      date: '2020-07-16',
      time: '18:30',
      interested: '4',
      image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
      orderDetails: 'Duży mcBurger z frytkami i kalafiorem',
    }
  ])

  return (
    <>
      <Header>
        <H1 color="#F0F0F0">
          Cześć <HBold>Tomek,</HBold>
        </H1>
        <div className="icons">
          <NotificationsNoneOutlinedIcon />
          <IconLink to="/settings">
            <TuneIcon />
          </IconLink>
        </div>
        <Button text="Dodaj Zamówienie"></Button>
      </Header>
      <Container>
        <div className="your-order">
          <H3 color="#F0F0F0">Twoje zamówienia</H3>
          {myOrders.map((order) => (
            <Card details={order} />
          ))}
        </div>
        <div className="available-orders-wrapper">
          <H3 color="#F0F0F0">Dostępne zamówienia</H3>
          <div className="orders">
            {orders.map((order) => (
              <Card details={order} />
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home
