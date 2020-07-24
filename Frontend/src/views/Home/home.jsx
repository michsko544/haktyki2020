import React, { useEffect } from 'react'
import { H1, H3, HBold } from './../../components/Headings'
import Header from '../../components/Header/header'
import Container from './Container'
import TuneIcon from '@material-ui/icons/Tune'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined'
import Button from './../../components/Button'
import Card from '../../components/FoodCard/foodCard'
import { IconLink } from './../../components/App/App.style'
import { useFetch } from './../../API'
import Store from './../../components/App/App.store'
import { AppBackgroundThemes } from './../../components/App/App.themes'
import { Link } from 'react-router-dom'
import OrderDetails from '../../components/OrderDetails'
import Loader from '../../components/Loader'

const Home = () => {
  const store = Store.useStore()
  const fetchOrders = useFetch('/orders')
  const fetchUserOrders = useFetch('/user/orders')

  useEffect(() => {
    fetchOrders.getData()
    fetchUserOrders.getData()
  }, [])

  const getFirstname = () => {
    return store.get('user').split(' ')[0]
  }

  return (
    <>
      <Header>
        <H1 className="small">
          Cześć <HBold>{getFirstname()},</HBold>
        </H1>
        <div className="icons">
          <NotificationsNoneOutlinedIcon
            style={{
              color:
                AppBackgroundThemes[store.get('themeBackgroundId')].fontColor,
            }}
          />
          <IconLink to="/settings">
            <TuneIcon
              style={{
                color:
                  AppBackgroundThemes[store.get('themeBackgroundId')].fontColor,
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
            ? fetchUserOrders.response.orders.map((order) => (
                <Card key={order.id} details={order} />
              ))
            : fetchUserOrders.isLoading && <Loader />}
        </div>
        <div className="available-orders-wrapper">
          <H3>Dostępne zamówienia</H3>
          <div className="orders">
            {fetchOrders.response
              ? fetchOrders.response.orders.map((order) => (
                  <Card key={order.id} details={order} />
                ))
              : fetchOrders.isLoading && <Loader />}
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home
