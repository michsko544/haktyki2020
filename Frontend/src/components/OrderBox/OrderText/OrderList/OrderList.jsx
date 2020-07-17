import React from 'react'
import { SmallTitle } from '../Header'
import { Name, Order } from './OrderList.style'

const OrderList = ({ children }) => {
  const isDarkMode = true
  const willing = 3

  return (
    <>
      <SmallTitle isdarkmode={isDarkMode.toString()}>
        {`Obecnie chętnych: ${willing}`}
      </SmallTitle>
      {children}
    </>
  )
}

export const OrderRecord = ({ name, order }) => {
  const firstcolor = '#46D3FF'
  const secondcolor = '#3687FF'

  return (
    <>
      <Name>{name}</Name>
      <Order firstcolor={firstcolor} secondcolor={secondcolor}>
        {order}
      </Order>
    </>
  )
}

export default OrderList
