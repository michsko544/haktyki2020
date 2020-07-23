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
import Loader from '../../../Loader'
import ErrorMessage from '../../../ErrorMessage'

const OrderDetails = ({ orderId }) => {
  const [fisrtStage, setFirstStage] = React.useState(true)
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
    !fisrtStage && (
      <ButtonWrapper>
        <Button text="Dołącz" handleOnClick={() => setFirstStage(false)} />
      </ButtonWrapper>
    )

  const displayCurrentStage = () =>
    fisrtStage ? (
      <OrderFormik />
    ) : (
      <OrderList interested={response.order.interested}>
        {mapOrderDetails()}
      </OrderList>
    )

  return (
    <>
      <OrderBox image={response?.order.image}>
        <TextDisplayer wantOrder={fisrtStage.toString()}>
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
}

export default OrderDetails
