import React from 'react'
import PropTypes from 'prop-types'
import Store from '../../../../../App/App.store'
import { AppThemes, AppBackgroundThemes } from '../../../../../App/App.themes'
import { Number } from './Payment.style'
import { SmallTitle } from '../../Header'

const Payment = ({ payment, isOrderClosed }) => {
  const store = Store.useStore()
  const theme = AppThemes[store.get('themeId')]
  const backgroundTheme = AppBackgroundThemes[store.get('themeBackgroundId')]
  const fontcolor = backgroundTheme.fontColor
  const firstcolor = theme.from
  const secondcolor = theme.to

  const displayPaymentType = () => {
    switch (payment.type) {
      case 'CASH':
        return 'GOTÓWKA'
      case 'TRANSFER':
        return 'PRZELEW'
      default:
        return payment.type
    }
  }

  const displaySwift = () =>
    payment.swift ? (
      <>
        <SmallTitle fontcolor={fontcolor}>Swift/BIC: </SmallTitle>
        <Number firstcolor={firstcolor} secondcolor={secondcolor}>
          {payment.swift}
        </Number>
      </>
    ) : (
      ''
    )

  const displayPaymentNumber = () => {
    if (payment.number && isOrderClosed) {
      return (
        <>
          <SmallTitle fontcolor={fontcolor}>na numer: </SmallTitle>
          <Number firstcolor={firstcolor} secondcolor={secondcolor}>
            {payment.number}
          </Number>
          {displaySwift()}
        </>
      )
    }
    return ''
  }

  return (
    <div>
      <SmallTitle fontcolor={fontcolor}>
        Preferowana forma zwrotu - {displayPaymentType()}
      </SmallTitle>
      {displayPaymentNumber()}
    </div>
  )
}

Payment.propTypes = {
  payment: PropTypes.object.isRequired,
  isOrderClosed: PropTypes.PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
}

export default Payment
