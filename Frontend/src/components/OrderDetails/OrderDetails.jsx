import React from 'react'
import PropTypes from 'prop-types'
import OrderBox from './OrderBox'
import OrderList from './OrderBox/OrderText/OrderList'
import OrderFormik from './OrderBox/OrderText/OrderForm'
import OrderText from './OrderBox/OrderText'
import Button from '../Button'
import { useFetch } from '../../API'
import { ButtonWrapper, Margins } from './OrderBox'
import Skeleton from '@material-ui/lab/Skeleton'
import ErrorMessage from '../ErrorMessage'
import Store from '../App/App.store'

const OrderDetails = ({ order, closeCallback, isLoading }) => {
  const [isFirstStage, setFirstStage] = React.useState(true)
  //const { response, getData, isLoading, error } = useFetch(`/orders/${orderId}`)
  const store = Store.useStore()

  React.useEffect(() => {
    //getData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const isOrderClosed = () => {
    const date = order.date
    const time = order.time

    const dateSplited = date.split('-')
    const timeSplited = time.split(':')
    dateSplited[1]--
    const orderDate = new Date(...dateSplited, timeSplited[0], timeSplited[1])
    const dateNow = new Date(Date.now())
    const result = orderDate < dateNow

    return result
  }

  const displayDate = () => {
    const date = order.date
    const dateSplited = date.split('-')
    //decrement because constructor Date numbered months from 0
    dateSplited[1]--
    const orderDate = new Date(...dateSplited)
    const dateNow = new Date(Date.now())

    //comparison order and now dates in miliseconds from 1970
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

  const isLoggedUserPurchaser = () => store.get('userId') === order.purchaserId

  const findPurchaser = () =>
    order.orderDetails.find((elem) => order.purchaserId === elem.userId)

  const findLoggedPerson = () =>
    order.orderDetails.find((elem) => store.get('userId') === elem.userId)

  const recognizePurchaser = () => {
    if (isLoggedUserPurchaser()) {
      return 'Ty'
    } else {
      return findPurchaser().userFullname
    }
  }

  const displayPurchaser = () => {
    const who = recognizePurchaser()
    if (!isOrderClosed()) {
      return who === 'Ty' ? `Zamawiasz ${who}` : `Zamawia ${who}`
    } else {
      return who === 'Ty' ? `Zamawiałeś/aś ${who}` : `Zamawiał/a ${who}`
    }
  }

  const showSuitableButton = () => {
    if (isFirstStage && !isOrderClosed())
      return (
        <ButtonWrapper>
          <Button
            text={findLoggedPerson()?.description ? 'Edytuj' : 'Dołącz'}
            handleOnClick={() => setFirstStage(false)}
          />
        </ButtonWrapper>
      )
    else if (isFirstStage && isOrderClosed() && isLoggedUserPurchaser())
      return (
        <ButtonWrapper>
          <Button
            text={'Powiadom o dotarciu jedzenia'}
            handleOnClick={() =>
              console.log('Call API that order arrived to company')
            }
          />
        </ButtonWrapper>
      )
    else return ''
  }

  const displayCurrentStage = () =>
    !isFirstStage ? (
      <OrderFormik
        order={findLoggedPerson()?.desctiption}
        coupon={findLoggedPerson()?.coupon}
        date={order.date}
        time={order.time}
        payment={order.paymentForm}
        orderId={order.id}
        isPurchaser={isLoggedUserPurchaser()}
        closeCallback={closeCallback}
      />
    ) : (
      <OrderList
        orders={order.orderDetails}
        purchaserId={order.purchaserId}
        isPurchaser={isLoggedUserPurchaser()}
        payment={{
          type: order.paymentForm,
          number: order.paymentNumber,
          swift: order.swiftBicCode,
        }}
        isOrderClosed={isOrderClosed()}
      />
    )

  const handleDisplay = () => {
    return (
      <Margins isFirstStage={isFirstStage.toString()}>
        {showLoaderIfLoading()}
        {/* {showErrorIfError()} */}
        {order && (
          <OrderText
            title={order.restaurant}
            info={`${displayPurchaser()} - ${displayDate()} ${order.time}`}
          >
            {displayCurrentStage()}
            {showSuitableButton()}
          </OrderText>
        )}
      </Margins>
    )
  }

  const showLoaderIfLoading = () =>
    isLoading && (
      <>
        <Skeleton variant="text" animation="wave" height={35} width={'50%'} />
        <Skeleton variant="text" animation="wave" height={22} width={'80%'} />
        <br />
        <Skeleton variant="text" animation="wave" height={22} width={'60%'} />
        <br />
        <Skeleton variant="text" animation="wave" height={22} width={'50%'} />
        <Skeleton variant="text" animation="wave" height={17} width={'70%'} />
        <br />
        <Skeleton variant="text" animation="wave" height={22} width={'35%'} />
        <Skeleton variant="text" animation="wave" height={17} width={'90%'} />
        <br />
        <Skeleton variant="text" animation="wave" height={22} width={'29%'} />
        <Skeleton variant="text" animation="wave" height={17} width={'75%'} />
        <br />
        <Skeleton variant="text" animation="wave" height={22} width={'40%'} />
        <Skeleton variant="text" animation="wave" height={17} width={'60%'} />
      </>
    )

  // const showErrorIfError = () =>
  //   error && <ErrorMessage error={error.code} advice={error.text} />

  return (
    <>
      <OrderBox
        image={!isLoading && order.image}
        closeCallback={closeCallback}
        isLoading={isLoading}
        //error={error}
      >
        {handleDisplay()}
      </OrderBox>
    </>
  )
}

OrderDetails.propTypes = {
  order: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  closeCallback: PropTypes.func,
  isLoading: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
}

export default OrderDetails
