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
import { useFetch } from './../../API'

const Home = () => {
  const [orders, setOrders] = useState([])

  const [myOrders, setMyOrders] = useState([])

  const fetchOrders = useFetch('/orders')
  const fetchUserOrders = useFetch('/user/orders')

  useEffect(() => {
    fetchOrders.getData()
    fetchUserOrders.getData()
  }, [])

  useEffect(() => {
    /**
     * TODO
     * Za pierwszym razem response jest undefined z jakiegoś powodu? Przy pierwszym wywołaniu useEffect... 
     * Gdy chcę zrobić w liście czułości isLoading to i tak muszę dodać response.data
     * Co z tym zrobić?
     * ~ Grzegorz
     */
    if(typeof fetchOrders.response.data !== 'undefined') {
      setOrders(fetchOrders.response.data.orders)
    }
  }, [fetchOrders.response])

  useEffect(() => {
    /**
     * TODO
     * ~ Grzegorz
     */
    if(typeof fetchUserOrders.response.data !== 'undefined') {
      setMyOrders(fetchUserOrders.response.data.orders)
    }
  }, [fetchUserOrders.response])


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
            <Card key={order.id} details={order} />
          ))}
        </div>
        <div className="available-orders-wrapper">
          <H3 color="#F0F0F0">Dostępne zamówienia</H3>
          <div className="orders">
            {orders.map((order) => (
              <Card key={order.id} details={order} />
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home
