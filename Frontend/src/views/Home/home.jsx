import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { Link } from 'react-router-dom'

import TuneIcon from '@material-ui/icons/Tune'
import SyncIcon from '@material-ui/icons/Sync'

import Store from './../../components/App/App.store'

import { H1, H3, HBold } from './../../components/Headings'
import Header from '../../components/Header/header'

import { useNFetch as useFetch } from './../../API/ourAPI/useNFetch'

import Container from './Container'
import Button from './../../components/Button'
import Card from '../../components/FoodCard/foodCard'
import { IconLink } from './../../components/App/App.style'

import { AppBackgroundThemes } from './../../components/App/App.themes'

import OrderDetails from '../../components/OrderDetails'
import Loader from '../../components/Loader'
import { BlurChildren } from '../../components/App'

import { messages } from './messages'
import Message from './message.styled'

const Home = () => {
  const store = Store.useStore()
  const { enqueueSnackbar } = useSnackbar()

  const { fetch: fetchOrders, isLoading: loadingOrders } = useFetch('/orders/all')
  const { fetch: fetchUser } = useFetch('/users/my-details')

  const [orders, setOrders] = useState([])
  const [myOrders, setMyOrders] = useState([])
  const [user, setUser] = useState({})
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailsVisibile, setDetailsVisibile] = useState(false)
  const [notificationsLength, setNotificationsLength] = useState(0)

  const handleData = (data, setter) => setter(data)

  /**
   * Initialize
   */
  useEffect(() => {
    const asyncUser = async () => handleData(await fetchUser(), setUser)

    document.title = 'Zamówmy coś 🍕 | TeamFood'
    asyncUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const refreshOrders = async () => {  
    const handleError = (message) => {
      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 3000,
      })
    }

    enqueueSnackbar('Odświeżam zamówienia 🥩', {
      variant: 'info',
      autoHideDuration: 1500
    })

    try {
      const { allOrders: orders, myOrders } = await fetchOrders()

      handleData(orders, setOrders)
      handleData(myOrders, setMyOrders)
    } catch (error) {
      console.warn('Err', error)
      handleError('Serwer spadł z rowerka i nie wstaje :/')
    }
  }

  /**
   * Increment Notification count for refreshando
   */
  useEffect(() => {
    const notifications = store.get('notifications')
    if (notifications.length !== notificationsLength) {
      setNotificationsLength(notifications.length)
    }
  }, [store, notificationsLength])

  /**
   * Refresh orders (SOMETHING CHANGED!)
   */
  useEffect(() => {
    refreshOrders()
  }, [notificationsLength]) // eslint-disable-line react-hooks/exhaustive-deps

  const getFirstname = () => store.get('user')?.split(' ')[0]

  const toggleDetailsVisibility = () => setDetailsVisibile(!isDetailsVisibile)

  const handleShowCard = (order) => {
    toggleDetailsVisibility()
    setSelectedOrder(order)
  }

  const handleCloseCard = () => {
    refreshOrders()
    toggleDetailsVisibility()
    setSelectedOrder(null)
  }

  const orderSort = (a, b) => {
    const aDay = new Date(`${a.date} ${a.time}`)
    const bDay = new Date(`${b.date} ${b.time}`)

    return aDay > bDay
  }

  const hasUserData = () => user.fullName && user.phoneNumber && user.creditCardNumber

  function renderOrderButton() {
    if (user) {
      if (hasUserData())
        return (
          <Link className="button" to="/teamfood">
            <Button text="Dodaj Zamówienie"></Button>
          </Link>
        )
      else {
        return (
          <Link className="button" to="/settings">
            <Button
              text="Dodaj Zamówienie"
              onClick={() =>
                enqueueSnackbar('Aby stworzyć zamówienie uzupełnij wszystkie dane ❗️', {
                  variant: 'info',
                })
              }
            ></Button>
          </Link>
        )
      }
    }

    return null
  }

  const defaultNoFoodResponse = (orders) => {
    const getRandomMessage = () => messages[Math.round(Math.random() * (messages.length - 1))]

    if (orders.length === 0) {
      return <Message color={AppBackgroundThemes[store.get('themeBackgroundId')].fontColor}>{getRandomMessage()}</Message>
    }
  }

  const styleIcon = () => {
    return {
      color: AppBackgroundThemes[store.get('themeBackgroundId')].fontColor,
      cursor: 'pointer',
    }
  }

  return (
    <>
      <BlurChildren shouldBlur={isDetailsVisibile}>
        <Header>
          <H1 className="small">
            Cześć <HBold style={{ textTransform: 'capitallize' }}>{getFirstname() || 'Nieznajomy'},</HBold>
          </H1>
          <div className="icons">
            <SyncIcon onClick={refreshOrders} style={styleIcon()} />
            <IconLink to="/settings">
              <TuneIcon style={styleIcon()} />
            </IconLink>
          </div>
          {renderOrderButton()}
        </Header>
        <Container>
          <div className="your-order">
            <H3>Twoje zamówienia</H3>
            {defaultNoFoodResponse(myOrders)}
            {myOrders.length > 0
              ? myOrders
                  .sort((a, b) => orderSort(a, b))
                  .map((order) => <Card key={order.id} details={order} openCallback={() => handleShowCard(order)} />)
              : loadingOrders && <Loader />}
          </div>
          <div className="available-orders-wrapper">
            <H3>Dostępne zamówienia</H3>
            <div className="orders">
              {defaultNoFoodResponse(orders)}
              {orders.length > 0
                ? orders
                    .sort((a, b) => orderSort(a, b))
                    .map((order) => <Card key={order.id} details={order} openCallback={() => handleShowCard(order)} />)
                : loadingOrders && <Loader />}
            </div>
          </div>
        </Container>
      </BlurChildren>
      {isDetailsVisibile && <OrderDetails order={selectedOrder} closeCallback={handleCloseCard} />}
    </>
  )
}

export default Home
