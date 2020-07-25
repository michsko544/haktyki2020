import React from 'react'
import PropTypes from 'prop-types'
import Store from '../../../../App/App.store'
import { AppThemes, AppBackgroundThemes } from '../../../../App/App.themes'
import { SmallTitle } from '../Header'
import { Name, Order } from './OrderList.style'

const OrderList = ({ interested, children }) => {
  const store = Store.useStore()

  const fontcolor =
    AppBackgroundThemes[store.get('themeBackgroundId')].fontColor

  return (
    <>
      <SmallTitle fontcolor={fontcolor}>
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
  const store = Store.useStore()

  const fontcolor =
    AppBackgroundThemes[store.get('themeBackgroundId')].fontColor
  const theme = AppThemes[store.get('themeId')]
  const firstcolor = theme.from
  const secondcolor = theme.to

  return (
    <>
      <Name color={fontcolor}>{name}</Name>
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
