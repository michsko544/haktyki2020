import React from 'react'
import OrderBox from '../../'
import OrderList from '../OrderList'
import { OrderRecord } from '../OrderList'
import Button from '../../../Button'

const OrderDetails = () => {
  return (
    <OrderBox>
      <OrderList>
        <OrderRecord
          name={'Grzegorz (założyciel)'}
          order={'Super Burger XL z podwójnym bekonem'}
        />
        <OrderRecord name={'Tomek'} order={'Super Burger XL z serem'} />
        <OrderRecord name={'Ania'} order={'Super Burger (mały) z frytkami'} />
      </OrderList>
      <Button text="Dołącz" />
    </OrderBox>
  )
}

export default OrderDetails
