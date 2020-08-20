import React from 'react'
import PropTypes from 'prop-types'
import { paymentTypes } from '../../../../../../constants'
import { Number } from './Payment.style'
import { SmallTitle } from '../../Header'
import { useColors } from '../../../../../../utils'

const Payment = ({ payment, loggedPersonOrder }) => {
  const { theme, mode } = useColors()

  const displayPaymentType = () => {
    switch (payment.type) {
      case paymentTypes.cash:
        return 'GOTÓWKA'
      case paymentTypes.transfer:
        return 'PRZELEW'
      default:
        return payment.type
    }
  }

  const displaySwift = () =>
    payment.swift ? (
      <>
        <SmallTitle fontcolor={mode.fontColor}>Swift/BIC: </SmallTitle>
        <Number firstcolor={theme.from} secondcolor={theme.to}>
          {payment.swift}
        </Number>
      </>
    ) : (
      ''
    )

  const displayPaymentNumber = () => {
    if (payment.number && loggedPersonOrder?.description) {
      return (
        <>
          <SmallTitle fontcolor={mode.fontColor}>na numer: </SmallTitle>
          <Number firstcolor={theme.from} secondcolor={theme.to}>
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
      <SmallTitle fontcolor={mode.fontColor}>Preferowana forma zwrotu - {displayPaymentType()}</SmallTitle>
      {displayPaymentNumber()}
    </div>
  )
}

Payment.propTypes = {
  payment: PropTypes.shape({
    type: PropTypes.string.isRequired,
    number: PropTypes.string,
    swift: PropTypes.string,
  }).isRequired,
  loggedPersonOrder: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
}

export default Payment
