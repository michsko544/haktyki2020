import React from 'react'
import PropTypes from 'prop-types'
import Store from '../../../../App/App.store'
import { AppThemes, AppBackgroundThemes } from '../../../../App/App.themes'
import { SmallTitle } from '../Header'
import {
  Name,
  Order,
  Coupon,
  RecordStyled,
  CouponInfo,
} from './OrderList.style'
import { recognizeUser } from './OrderList.utils'
import { TextDisplayer } from '../../'

const OrderList = ({
  orders,
  purchaserId,
  isPurchaser,
  payment,
  isOrderClosed,
}) => {
  const store = Store.useStore()

  const backgroundTheme = AppBackgroundThemes[store.get('themeBackgroundId')]

  const fontcolor = backgroundTheme.fontColor
  const backgroundcolor = backgroundTheme.background

  const OrderRecord = ({ name, order }) => {
    const store = Store.useStore()

    const theme = AppThemes[store.get('themeId')]
    const firstcolor = theme.from
    const secondcolor = theme.to

    return (
      <RecordStyled hascoupon={isPurchaser && order.coupon}>
        <Name color={fontcolor}>{name}</Name>
        <Order firstcolor={firstcolor} secondcolor={secondcolor}>
          {order.what}
        </Order>
        {isPurchaser && order.coupon && (
          <>
            <Coupon
              color={fontcolor}
            >{`Posiada kupon: ${order.coupon.code}`}</Coupon>

            <CouponInfo color={backgroundcolor}>
              <Name color={fontcolor}>Kod kuponu: {order.coupon.code}</Name>
              <Coupon color={fontcolor}>
                Dodatkowe informacje: {order.coupon.description}
              </Coupon>
            </CouponInfo>
          </>
        )}
      </RecordStyled>
    )
  }

  OrderRecord.propTypes = {
    name: PropTypes.string.isRequired,
    order: PropTypes.object.isRequired,
  }

  const displayPayment = () => {
    switch (payment) {
      case 'CASH':
        return 'GOTÓWKA'
      case 'TRANSFER':
        return 'PRZELEW'
      default:
        return payment
    }
  }

  const displayInterested = () => {
    if (orders.length > 1) {
      if (!isOrderClosed) {
        return `Obecnie chętnych: ${orders.length}`
      } else {
        return `Zapisało się ${orders.length} wyżerkowiczów`
      }
    }
    return ''
  }

  const mapOrderDetails = () =>
    orders.map((order) => (
      <OrderRecord
        key={order.userId}
        name={recognizeUser(
          order.userId,
          store.get('userId'),
          purchaserId,
          order.who
        )}
        order={order}
      />
    ))

  return (
    <>
      <div style={{ marginTop: 15, marginBottom: 5 }}>
        <SmallTitle fontcolor={fontcolor}>
          Preferowana forma zwrotu: {displayPayment()}
        </SmallTitle>
        <SmallTitle fontcolor={fontcolor}>{displayInterested()}</SmallTitle>
      </div>
      <TextDisplayer>{mapOrderDetails()}</TextDisplayer>
    </>
  )
}

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
  purchaserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  isPurchaser: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
}

export default OrderList
