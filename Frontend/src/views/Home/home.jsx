import React, { useState, useEffect } from 'react'
import { H1, H3, HBold } from './../../components/Headings'
import Header from '../../components/Header/header'
import Container from './Container'
import TuneIcon from '@material-ui/icons/Tune'
import Button from './../../components/Button'
import Card from '../../components/FoodCard/foodCard'
import { IconLink } from './../../components/App/App.style'
import { useFetch } from './../../API'
import Store from './../../components/App/App.store'
import { AppBackgroundThemes } from './../../components/App/App.themes'
import { Link } from 'react-router-dom'
import OrderDetails from '../../components/OrderDetails'
import Loader from '../../components/Loader'
import { BlurChildren } from '../../components/App'

const Home = () => {
  const store = Store.useStore()
  const fetchOrders = useFetch('/orders/all')
  const fetchUserOrders = useFetch('/orders/my')

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailsVisibile, setDetailsVisibile] = useState(false)

  /**
   * CDM
   */
  useEffect(() => {
    document.title = 'Zamówmy coś 🍕 | TeamFood'
    fetchOrders.getData()
    fetchUserOrders.getData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getFirstname = () => {
    return store.get('user')?.split(' ')[0]
  }

  const toggleDetailsVisibility = () => {
    setDetailsVisibile(!isDetailsVisibile)
  }

  const handleShowCard = (order) => {
    toggleDetailsVisibility()
    setSelectedOrder(order)
  }

  const handleCloseCard = () => {
    toggleDetailsVisibility()
    setSelectedOrder(null)
  }

  const orderSort = (a, b) => {
    const aDay = new Date(a.date)
    const bDay = new Date(b.date)

    const [aHour, aMinute, aSecond] = a.time.split(':')
    const [bHour, bMinute, bSecond] = b.time.split(':')
    
    aDay.setHours(aHour)
    aDay.setMinutes(aMinute)
    aDay.setSeconds(aSecond)

    bDay.setHours(bHour)
    bDay.setMinutes(bMinute)
    bDay.setSeconds(bSecond)

    return aDay > bDay
  }

  return (
    <>
      <BlurChildren shouldBlur={isDetailsVisibile}>
        <Header>
          <H1 className="small">
            Cześć <HBold>{getFirstname() || 'Nieznajomy'},</HBold>
          </H1>
          <div className="icons">
            <IconLink to="/settings">
              <TuneIcon
                style={{
                  color:
                    AppBackgroundThemes[store.get('themeBackgroundId')]
                      .fontColor,
                }}
              />
            </IconLink>
          </div>
          <Link className="button" to="/teamfood">
            <Button text="Dodaj Zamówienie"></Button>
          </Link>
        </Header>
        <Container>
          <div className="your-order">
            <H3>Twoje zamówienia</H3>
            {fetchUserOrders.response
              ? fetchUserOrders.response.orders.sort((a, b) => orderSort(a, b)).map((order) => (
                  <Card
                    key={order.id}
                    details={order}
                    openCallback={() => handleShowCard(order)}
                  />
                ))
              : fetchUserOrders.isLoading && <Loader />}
          </div>
          <div className="available-orders-wrapper">
            <H3>Dostępne zamówienia</H3>
            <div className="orders">
              {fetchOrders.response
                ? fetchOrders.response.orders.sort((a, b) => orderSort(a, b)).map((order) => (
                    <Card
                      key={order.id}
                      details={order}
                      openCallback={() => handleShowCard(order)}
                    />
                  ))
                : fetchOrders.isLoading && <Loader />}
            </div>
          </div>
        </Container>
      </BlurChildren>
      {isDetailsVisibile && (
        <OrderDetails order={selectedOrder} closeCallback={handleCloseCard} />
      )}
    </>
  )
}

export default Home
