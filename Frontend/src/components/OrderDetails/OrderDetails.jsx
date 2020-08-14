import React from 'react'
import PropTypes from 'prop-types'
import OrderBox from './OrderBox'
import OrderList from './OrderBox/OrderText/OrderList'
import OrderFormik from './OrderBox/OrderText/OrderForm'
import OrderText from './OrderBox/OrderText'
import Button from '../Button'
import { ButtonWrapper, Margins } from './OrderBox'
import Store from '../App/App.store'
import { isOrderClosed, displayDate, findLoggedPerson, isLoggedUserPurchaser, displayPurchaser } from './../../utils'

const OrderDetails = ({ order, closeCallback }) => {
  const [isFirstStage, setFirstStage] = React.useState(true)
  const store = Store.useStore()

  const showSuitableButton = () => {
    if (isFirstStage && !isOrderClosed(order))
      return (
        <ButtonWrapper>
          <Button
            text={findLoggedPerson(store.get('userId'), order)?.description ? 'Edytuj' : 'Dołącz'}
            handleOnClick={() => setFirstStage(false)}
          />
        </ButtonWrapper>
      )
    else if (isFirstStage && isOrderClosed(order) && isLoggedUserPurchaser(store.get('userId'), order))
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
        order={findLoggedPerson(store.get('userId'), order)?.desctiption}
        coupon={findLoggedPerson(store.get('userId'), order)?.coupon}
        date={order.date}
        time={order.time}
        payment={order.paymentForm}
        orderId={order.id}
        isPurchaser={isLoggedUserPurchaser(store.get('userId'), order)}
        closeCallback={closeCallback}
      />
    ) : (
      <OrderList
        orders={order.orderDetails}
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

  const handleDisplay = () => {
    return (
      <Margins isFirstStage={isFirstStage.toString()}>
        {order && (
          <OrderText
            title={order.restaurant}
            info={`${displayPurchaser(store.get('userId'), order)} - ${displayDate(order)} ${order.time}`}
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
