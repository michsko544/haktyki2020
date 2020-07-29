import React from 'react'
import PropTypes from 'prop-types'
import OrderBox from './OrderBox'
import OrderList from './OrderBox/OrderText/OrderList'
import OrderFormik from './OrderBox/OrderText/OrderForm'
import OrderText from './OrderBox/OrderText'
import Button from '../Button'
import { useFetch } from '../../API'
import { ButtonWrapper, Margins } from './OrderBox'
import Loader from '../Loader'
import ErrorMessage from '../ErrorMessage'
import Store from '../App/App.store'

const OrderDetails = ({ orderId, closeCallback }) => {
  const [isFirstStage, setFirstStage] = React.useState(true)
  const { response, getData, isLoading, error } = useFetch(`/orders/${orderId}`)
  const store = Store.useStore()

  React.useEffect(() => {
    getData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const isOrderClosed = () => {
    const date = response.order.date
    const time = response.order.time

    const dateSplited = date.split('-')
    const timeSplited = time.split(':')
    dateSplited[1]--
    const orderDate = new Date(...dateSplited, timeSplited[0], timeSplited[1])
    const dateNow = new Date(Date.now())
    const result = orderDate < dateNow

    return result
  }

  const displayDate = () => {
    const date = response.order.date
    const dateSplited = date.split('-')
    //decrement because constructor Date numbered months from 0
    dateSplited[1]--
    const orderDate = new Date(...dateSplited)
    const dateNow = new Date(Date.now())

    //comparison dates in miliseconds from 1970
    if (orderDate - dateNow.setHours(0, 0, 0, 0) >= 48 * 3600 * 1000) {
      return date
    } else if (orderDate - dateNow.setHours(0, 0, 0, 0) >= 24 * 3600 * 1000) {
      return 'Jutro'
    } else if (orderDate - dateNow.setHours(0, 0, 0, 0) >= 0) {
      return 'Dzisiaj'
    } else if (orderDate - dateNow.setHours(0, 0, 0, 0) >= -24 * 3600 * 1000) {
      return 'Wczoraj'
    } else if (orderDate - dateNow.setHours(0, 0, 0, 0) >= -48 * 3600 * 1000) {
      return 'Przedwczoraj'
    } else {
      return date
    }
  }

  const isLoggedUserPurchaser = () =>
    store.get('userId') === response.order.purchaserId

  const findPurchaser = () =>
    response.order.orderDetails.find(
      (elem) => response.order.purchaserId === elem.userId
    )

  const findLoggedPerson = () =>
    response.order.orderDetails.find(
      (elem) => store.get('userId') === elem.userId
    )

  const recognizePurchaser = () => {
    if (isLoggedUserPurchaser()) {
      return 'Zamawiasz Ty'
    } else {
      return `Zamawia ${findPurchaser().who}`
    }
  }

  const displayPurchaser = () => {
    if (!isOrderClosed()) {
      return recognizePurchaser()
    } else {
      return `Zamawiał/a ${findPurchaser().who}`
    }
  }

  const showLoaderIfLoading = () => isLoading && <Loader />

  const showErrorIfError = () =>
    error && <ErrorMessage error={error.code} advice={error.text} />

  const showSuitableButton = () => {
    if (isFirstStage && !isOrderClosed())
      return (
        <ButtonWrapper>
          <Button
            text={findLoggedPerson()?.what ? 'Edytuj' : 'Dołącz'}
            handleOnClick={() => setFirstStage(false)}
          />
        </ButtonWrapper>
      )
    else if (isFirstStage && isOrderClosed)
      return (
        store.get('userId') === response.order.purchaserId && (
          <ButtonWrapper>
            <Button
              text={'Powiadom o dotarciu jedzenia'}
              handleOnClick={() =>
                console.log('Call API that order arrived to company')
              }
            />
          </ButtonWrapper>
        )
      )
    else return ''
  }

  const displayCurrentStage = () =>
    !isFirstStage ? (
      <OrderFormik
        order={findLoggedPerson()?.what}
        coupon={findLoggedPerson()?.coupon}
        isPurchaser={isLoggedUserPurchaser()}
        closeCallback={closeCallback}
      />
    ) : (
      <OrderList
        orders={response.order.orderDetails}
        purchaserId={response.order.purchaserId}
        isPurchaser={isLoggedUserPurchaser()}
      />
    )

  const handleDisplay = () => {
    return (
      <Margins isFirstStage={isFirstStage.toString()}>
        {showLoaderIfLoading()}
        {showErrorIfError()}
        {response && (
          <OrderText
            title={response.order.restaurant}
            info={`${displayPurchaser()} - ${displayDate()} ${
              response.order.time
            }`}
          >
            {displayCurrentStage()}
            {showSuitableButton()}
          </OrderText>
        )}
      </Margins>
    )
  }

  return (
    <>
      <OrderBox
        image={!isLoading && response?.order.image}
        closeCallback={closeCallback}
      >
        {handleDisplay()}
      </OrderBox>
    </>
  )
}

OrderDetails.propTypes = {
  orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  closeCallback: PropTypes.func,
}

export default OrderDetails
