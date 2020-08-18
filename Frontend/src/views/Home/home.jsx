import React, { useState, useEffect } from 'react'
import { H1, H3, HBold } from './../../components/Headings'
import Header from '../../components/Header/header'
import Container from './Container'
import TuneIcon from '@material-ui/icons/Tune'
import SyncIcon from '@material-ui/icons/Sync';
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
import { useSnackbar } from 'notistack'
import Message from './message.styled'


const Home = () => {
  const store = Store.useStore()
  const fetchOrders = useFetch('/orders/all')
  const fetchUserOrders = useFetch('/orders/my')
  const userData = useFetch('/users/my-details')

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailsVisibile, setDetailsVisibile] = useState(false)

  const [notificationsLength, setNotificationsLength] = useState(0)

  const { enqueueSnackbar } = useSnackbar()

  const refreshOrders = async () => {
    enqueueSnackbar(
      'Odświeżam zamówienia 🥩',
      { variant: 'info', preventDuplicate: true, autoHideDuration: 1500 }
    )
    fetchOrders.getData()
    fetchUserOrders.getData()
    userData.getData()
  }

  /**
   * CDM
   */
  useEffect(() => {
    document.title = 'Zamówmy coś 🍕 | TeamFood'
    fetchOrders.getData()
    fetchUserOrders.getData()
    userData.getData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const notifications = store.get('notifications')
    if(notifications.length !== notificationsLength) {
      setNotificationsLength(notifications.length)
    }
  }, [store, notificationsLength])

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
    fetchOrders.getData()
    fetchUserOrders.getData()
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

  const hasUserData = () => 
      userData.response.fullName &&
      userData.response.phoneNumber &&
      userData.response.creditCardNumber

  function renderOrderButton() {
    if (userData.response) {
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
                enqueueSnackbar(
                  'Aby stworzyć zamówienie uzupełnij wszystkie dane ❗️',
                  { variant: 'info', preventDuplicate: true }
                )
              }
            ></Button>
          </Link>
        )
      }
    }
    return ''
    }

  const getRandomMessage = () => {
    const messages = [
      'Nic tu nie ma, zamów coś!',
      'Gdzie jest food? 📸',
      's🅱inalla ヾ(•ω•`)o',
      'Food inżyniering here, dodaj jakieś zamówienie!',
      'Hejo, głodek z tej strony, zamów może 🍕?',
      'Mały głód? Wielki problem, zrzuć się na 🍕!',
      'I co teraz? Pusto tu ...',
      '🍔 d=====(￣▽￣*)b',
      '🍕🍔🍟🌭🍿🥞🍞'
    ]

    return messages[Math.round(Math.random() * (messages.length - 1))]
  }

  const defaultNoFoodResponse = (orders) => {
    if (orders.response !== null && orders.response.orders.length === 0) {
      return <Message color={AppBackgroundThemes[store.get('themeBackgroundId')].fontColor}>{getRandomMessage()}</Message>
    }
  }

  const styleIcon = () => {
    return {
      color: AppBackgroundThemes[store.get('themeBackgroundId')].fontColor,
      cursor: 'pointer'
    }
  }

  return (
    <>
      <BlurChildren shouldBlur={isDetailsVisibile}>
        <Header>
          <H1 className="small">
            Cześć <HBold>{getFirstname() || 'Nieznajomy'},</HBold>
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
            {defaultNoFoodResponse(fetchUserOrders)}
            {fetchUserOrders.response
              ? fetchUserOrders.response.orders
                  .sort((a, b) => orderSort(a, b))
                  .map((order) => (
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
              {defaultNoFoodResponse(fetchOrders)}
              {fetchOrders.response
                ? fetchOrders.response.orders
                    .sort((a, b) => orderSort(a, b))
                    .map((order) => (
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
