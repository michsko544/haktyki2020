import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { Link } from 'react-router-dom'

import TuneIcon from '@material-ui/icons/Tune'
import SyncIcon from '@material-ui/icons/Sync'

import Store from './../../components/App/App.store'

import { H1, H3, HBold } from './../../components/Headings'
import Header from '../../components/Header/header'

import { useFetch } from '../../API'

import Container from './Container'
import Button from './../../components/Button'
import Card from '../../components/FoodCard/foodCard'
import CardSkeleton from './../../components/FoodCard/foodCard.skeleton'
import { IconLink } from './../../components/App/App.style'

import { AppBackgroundThemes } from './../../components/App/App.themes'

import OrderDetails from '../../components/OrderDetails'
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

  /**
   * Initialize
   */
  useEffect(() => {
    const asyncUser = async () => {
      try {
        setUser(await fetchUser())
      } catch (error) {
        console.warn('Cannot download user data: ', error)
        enqueueSnackbar('Nie udało się pobrać twoich danych z serwera. Spróbuj ponownie później', {
          variant: 'error',
          autoHideDuration: 3000,
        })
      }
    }

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
      setOrders(orders)
      setMyOrders(myOrders)
    } catch (error) {
      console.warn('Fetch orders error:', error)
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
    setSelectedOrder(order)
    toggleDetailsVisibility()
  }

  const handleCloseCard = () => {
    refreshOrders()
    toggleDetailsVisibility()
    setSelectedOrder(null)
  }

  const orderSort = (a, b) => new Date(`${a.date} ${a.time}`) > new Date(`${b.date} ${b.time}`)

  const renderOrderButton = () => {
    const hasUserData = () => user.fullName && user.phoneNumber && user.creditCardNumber

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
                enqueueSnackbar('Przed wyruszeniem w drogę należy zebrać informacje!', {
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

    if (orders.length === 0 && !loadingOrders) {
      return <Message color={AppBackgroundThemes[store.get('themeBackgroundId')].fontColor}>{getRandomMessage()}</Message>
    }
  }

  const styleIcon = () => {
    return {
      color: AppBackgroundThemes[store.get('themeBackgroundId')].fontColor,
      cursor: 'pointer',
    }
  }

  const hideIfEmpty = () => {
    return myOrders.length === 0 && !loadingOrders ? 'empty' : null
  }

  const expandIfEmpty = () => {
    return myOrders.length === 0 && !loadingOrders ? 'expand' : null
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
          <div className={`your-order ${hideIfEmpty()}`}>
            <H3>Twoje zamówienia</H3>
            {defaultNoFoodResponse(myOrders)}
            {myOrders.length > 0
              ? myOrders
                  .sort((a, b) => orderSort(a, b))
                  .map((order) => <Card key={order.id} details={order} openCallback={() => handleShowCard(order)} />)
              : loadingOrders && <><CardSkeleton /><CardSkeleton /></>}
          </div>
          <div className={`available-orders-wrapper ${expandIfEmpty()}`}>
            <H3>Dostępne zamówienia</H3>
            <div className="orders">
              {defaultNoFoodResponse(orders)}
              {orders.length > 0
                ? orders
                    .sort((a, b) => orderSort(a, b))
                    .map((order) => <Card key={order.id} details={order} openCallback={() => handleShowCard(order)} />)
                : loadingOrders && <><CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton /></>}
            </div>
          </div>
        </Container>
      </BlurChildren>
      {isDetailsVisibile && <OrderDetails order={selectedOrder} closeCallback={handleCloseCard} />}
    </>
  )
}

export default Home
