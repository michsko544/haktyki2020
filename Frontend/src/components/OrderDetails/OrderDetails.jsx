import React from 'react'
import PropTypes from 'prop-types'
import OrderBox from './OrderBox'
import OrderList from './OrderBox/OrderText/OrderList'
import OrderFormik from './OrderBox/OrderText/OrderForm'
import { OrderRecord } from './OrderBox/OrderText/OrderList'
import OrderText from './OrderBox/OrderText'
import Button from '../Button'
import { useFetch } from '../../API'
import { ButtonWrapper, TextDisplayer } from './OrderBox'
import { recognizeCreator } from '.'
import Loader from '../Loader'
import ErrorMessage from '../ErrorMessage'

const OrderDetails = ({ orderId, closeCallback }) => {
  const [firstStage, setFirstStage] = React.useState(true)
  const { response, getData, isLoading, error } = useFetch(`/orders/${orderId}`)

  React.useEffect(() => {
    getData()
  }, [])

  const mapOrderDetails = () =>
    response.order.orderDetails.map((order) => (
      <OrderRecord
        key={order.id}
        name={recognizeCreator(order.who, response.order.purchaser)}
        order={order.what}
      />
    ))

  const showLoaderIfLoading = () => isLoading && <Loader />

  const showErrorIfError = () =>
    error && <ErrorMessage error={error.code} advice={error.text} />

  const showButtonJoinIfFirstStage = () =>
    firstStage && (
      <ButtonWrapper>
        <Button
          text={response.order.loggedUserOrder.order ? 'Edytuj' : 'Dołącz'}
          handleOnClick={() => setFirstStage(false)}
        />
      </ButtonWrapper>
    )

  const displayCurrentStage = () =>
    !firstStage ? (
      <OrderFormik
        order={response.order.loggedUserOrder.order}
        coupon={response.order.loggedUserOrder.coupon}
      />
    ) : (
      <OrderList interested={response.order.interested}>
        {mapOrderDetails()}
      </OrderList>
    )

  return (
    <>
      <OrderBox image={response?.order.image} closeCallback={closeCallback}>
        <TextDisplayer firstStage={firstStage.toString()}>
          {showLoaderIfLoading()}
          {showErrorIfError()}
          {response && (
            <>
              <OrderText
                title={response.order.restaurant}
                info={`Zamawia ${response.order.purchaser} - ${response.order.date} ${response.order.time}`}
              >
                {displayCurrentStage()}
              </OrderText>
              {showButtonJoinIfFirstStage()}
            </>
          )}
        </TextDisplayer>
      </OrderBox>
    </>
  )
}

OrderDetails.propTypes = {
  orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  closeCallback: PropTypes.func,
}

export default OrderDetails
