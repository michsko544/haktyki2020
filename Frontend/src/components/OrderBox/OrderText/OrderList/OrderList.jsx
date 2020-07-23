import React from 'react'
import PropTypes from 'prop-types'
import { SmallTitle } from '../Header'
import { Name, Order } from './OrderList.style'

const OrderList = ({ interested, children }) => {
  const isDarkMode = true

  return (
    <>
      <SmallTitle isdarkmode={isDarkMode.toString()}>
        {interested > 0 ? `Obecnie chętnych: ${interested}` : ''}
      </SmallTitle>
      {children}
    </>
  )
}

OrderList.propTypes = {
  interested: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  children: PropTypes.any,
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

OrderRecord.propTypes = {
  name: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
}

export default OrderList
