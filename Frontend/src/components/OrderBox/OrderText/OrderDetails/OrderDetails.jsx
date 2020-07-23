import React from 'react'
import PropTypes from 'prop-types'
import OrderBox from '../../'
import OrderList from '../OrderList'
import OrderFormik from '../OrderForm'
import { OrderRecord } from '../OrderList'
import OrderText from '../'
import Button from '../../../Button'
import { useFetch } from '../../../../API'
import { ButtonWrapper, TextDisplayer } from '../../'
import { recognizeCreator } from './'

const OrderDetails = ({ orderId }) => {
  const [wantOrder, setWantOrder] = React.useState(false)
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

  const showLoaderIfLoading = () => isLoading && <p>Ładowanie...</p>
  const showErrorIfError = () => error && <p>Error</p>

  return (
    <>
      <OrderBox image={response?.order.image}>
        <TextDisplayer wantOrder={wantOrder.toString()}>
          {showLoaderIfLoading()}
          {showErrorIfError()}
          {response && (
            <>
              <OrderText
                title={response.order.restaurant}
                info={`Zamawia ${response.order.purchaser} - ${response.order.date} ${response.order.time}`}
              >
                {wantOrder ? (
                  <OrderFormik />
                ) : (
                  <OrderList interested={response.order.interested}>
                    {mapOrderDetails()}
                  </OrderList>
                )}
              </OrderText>
              {!wantOrder && (
                <ButtonWrapper>
                  <Button
                    text="Dołącz"
                    handleOnClick={() => setWantOrder(true)}
                  />
                </ButtonWrapper>
              )}
            </>
          )}
        </TextDisplayer>
      </OrderBox>
    </>
  )
}

OrderDetails.propTypes = {
  orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default OrderDetails
