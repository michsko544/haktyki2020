import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import OrderBox from './OrderBox'
import OrderList from './OrderBox/OrderText/OrderList'
import OrderFormik from './OrderBox/OrderText/OrderForm'
import OrderText from './OrderBox/OrderText'
import Button from '../Button'
import { ButtonWrapper, Margins } from './OrderBox'
import Store from '../App/App.store'
import { isOrderClosed, displayDate, displayTime, findLoggedPerson, isLoggedUserPurchaser, displayPurchaser } from './../../utils'
import { useSnackbar } from 'notistack'
import { usePost } from '../../API'

const OrderDetails = ({ order, closeCallback }) => {
  const [isFirstStage, setFirstStage] = useState(true)
  const { enqueueSnackbar: toast } = useSnackbar()
  const store = Store.useStore()

  const { send: deliver } = usePost('/notifications/order-delivered')
  const { send: remind } = usePost('/notifications/payment-remind')
  const { send: finish } = usePost('/orders/finish')

  useEffect(() => {
    const oldTitle = document.title
    document.title = `${order.restaurant} 🍔 | TeamFood`
    return () => {
      document.title = oldTitle
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const errorToast = (message) => {
    toast(message, {
      variant: 'error',
      autoHideDuration: 3000,
    })
  }

  const okToast = (message) => {
    toast(message, {
      variant: 'success',
      autoHideDuration: 3000,
    })
  }

  const isDelivered = (order) => order.delivered

  const showSuitableButton = () => {
    if (isFirstStage && !isOrderClosed(order))
      return (
        <ButtonWrapper>
          <Button text={findLoggedPerson(store.get('userId'), order)?.description ? 'Edytuj' : 'Dołącz'} handleOnClick={() => setFirstStage(false)} />
        </ButtonWrapper>
      )
    else if (isFirstStage && isOrderClosed(order) && isLoggedUserPurchaser(store.get('userId'), order) && !isDelivered(order))
      return (
        <ButtonWrapper>
          <Button
            text={'Powiadom o dotarciu jedzenia'}
            handleOnClick={async () => {
              try {
                await deliver({ id: order.id })
                okToast('Wysłano powiadomienia!')
              } catch (error) {
                console.warn('Cannot deliver: ', error)
                errorToast('Serwer nie odpowiedział na to żądanie :/ Spróbuj jeszcze raz, oki?')
              }
              closeCallback()
            }}
          />
        </ButtonWrapper>
      )
    else if (isFirstStage && isOrderClosed(order) && isLoggedUserPurchaser(store.get('userId'), order) && isDelivered(order)) {
      return (
        <>
          <ButtonWrapper>
            <Button
              text={'Przypomnij o zapłacie'}
              handleOnClick={async () => {
                try {
                  await remind({ id: order.id })
                  okToast('Poszło! :D')
                } catch (error) {
                  console.warn('Cannot remind: ', error)
                  errorToast('Serwer nie odpowiedział na to żądanie :/ Spróbuj jeszcze raz, oki?')
                }
                closeCallback()
              }}
            />
            <Button
              text={'Kończmy to'}
              handleOnClick={async () => {
                try {
                  await finish({ id: order.id })
                  okToast('Dzięki! Do następnego! :D')
                } catch (error) {
                  console.warn('Cannot finish: ', error)
                  errorToast('Serwer nie odpowiedział na to żądanie :/ Spróbuj jeszcze raz, oki?')
                }
                closeCallback()
              }}
            />
          </ButtonWrapper>
        </>
      )
    } else return ''
  }

  const displayCurrentStage = () => {
    return !isFirstStage ? (
      <OrderFormik
        order={findLoggedPerson(store.get('userId'), order)?.description}
        coupon={findLoggedPerson(store.get('userId'), order)?.coupon}
        date={order.date}
        time={order.time}
        payment={order.paymentForm}
        orderId={order.id}
        isPurchaser={isLoggedUserPurchaser(store.get('userId'), order)}
        closeCallback={() => closeCallback()}
        formAction={findLoggedPerson(store.get('userId'), order)?.description ? 'edit' : 'join'}
      />
    ) : (
      <OrderList
        order={order}
        purchaserId={order.purchaserId}
        isPurchaser={isLoggedUserPurchaser(store.get('userId'), order)}
        payment={{
          type: order.paymentForm,
          number: order.paymentNumber,
          swift: order.swiftBicCode,
        }}
        isOrderClosed={isOrderClosed(order)}
      />
    )
  }

  const handleDisplay = () => {
    return (
      <Margins isFirstStage={isFirstStage.toString()}>
        {order && (
          <OrderText title={order.restaurant} info={`${displayPurchaser(store.get('userId'), order)} - ${displayDate(order)} ${displayTime(order)}`}>
            {displayCurrentStage()}
            {showSuitableButton()}
          </OrderText>
        )}
      </Margins>
    )
  }

  return (
    <>
      <OrderBox image={order.image} closeCallback={closeCallback}>
        {handleDisplay()}
      </OrderBox>
    </>
  )
}

OrderDetails.propTypes = {
  order: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  closeCallback: PropTypes.func,
}

export default OrderDetails
