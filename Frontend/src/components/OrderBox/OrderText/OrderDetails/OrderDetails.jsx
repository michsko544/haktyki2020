import React from 'react'
import OrderBox from '../../'
import OrderList from '../OrderList'
import { OrderRecord } from '../OrderList'
import Button from '../../../Button'
import { useFetch } from '../../../../API'

const OrderDetails = () => {
  const { response, getData, isLoading, error } = useFetch('/orders/1')

  React.useEffect(() => {
    getData()
  }, [])

  const isCreator = (person) => response.order.purchaser === person

  const generateName = (person) =>
    isCreator(person) ? person + ' (Założyciel)' : person

  const mapOrderDetails = () =>
    response.order.orderDetails.map((order) => (
      <OrderRecord
        key={order.id}
        name={generateName(order.who)}
        order={order.what}
      />
    ))

  return (
    <>
      {response ? (
        <OrderBox
          restaurant={isLoading ? 'Ładowanie...' : response.order.restaurant}
          date={response.order.date}
          time={response.order.time}
          purchaser={response.order.purchaser}
        >
          <OrderList interested={response.order.interested}>
            {mapOrderDetails()}
          </OrderList>
          <Button text="Dołącz" />
        </OrderBox>
      ) : (
        <>{isLoading && <OrderBox restaurant={'Ładowanie...'} />}</>
      )}
    </>
  )
}

export default OrderDetails
