import React from 'react'
import PropTypes from 'prop-types'
import Store from '../../../../App/App.store'
import { SmallTitle } from '../Header'
import { Name, Order, Coupon, RecordStyled, CouponInfo } from './OrderList.style'
import { recognizeUser } from './OrderList.utils'
import { findLoggedPerson, useColors } from './../../../../../utils'
import { TextDisplayer } from '../../'
import Payment from './Payment'

const OrderRecord = ({ name, order, isPurchaser }) => {
  const { theme, mode } = useColors()

  const hasCoupon = () => isPurchaser && order.coupon && order.coupon.code

  return (
    <RecordStyled hascoupon={hasCoupon()}>
      <Name color={mode.fontColor}>{name}</Name>
      <Order firstcolor={theme.from} secondcolor={theme.to}>
        {order.description}
      </Order>
      {hasCoupon() && (
        <>
          <Coupon color={mode.fontColor}>{`Posiada kupon: ${order.coupon.code}`}</Coupon>

          <CouponInfo color={mode.background}>
            <Name color={mode.fontColor}>Kod kuponu: {order.coupon.code}</Name>
            <Coupon color={mode.fontColor}>Dodatkowe informacje: {order.coupon.description ? order.coupon.description : 'Brak'}</Coupon>
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

const OrderList = ({ order, purchaserId, isPurchaser, payment, isOrderClosed }) => {
  const store = Store.useStore()
  const { mode } = useColors()

  const displayInterested = () => {
    if (order.orderDetails.length > 1) {
      if (!isOrderClosed) {
        return `Obecnie chętnych: ${order.orderDetails.length}`
      } else {
        return `Zapisało się ${order.orderDetails.length} wyżerkowiczów`
      }
    }
    return ''
  }

  const mapOrderDetails = () =>
    order.orderDetails.map((order) => (
      <OrderRecord
        key={order.userId}
        name={recognizeUser(order.userId, store.get('userId'), purchaserId, order.userFullname)}
        order={order}
        isPurchaser={isPurchaser}
      />
    ))

  return (
    <>
      <div style={{ marginTop: 15, marginBottom: 5 }}>
        <Payment payment={payment} loggedPersonOrder={findLoggedPerson(store.get('userId'), order) || {}} />
        <SmallTitle fontcolor={mode.fontColor}>{displayInterested()}</SmallTitle>
      </div>
      <TextDisplayer>{mapOrderDetails()}</TextDisplayer>
    </>
  )
}

OrderList.propTypes = {
  order: PropTypes.object.isRequired,
  purchaserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isPurchaser: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  payment: PropTypes.object.isRequired,
  isOrderClosed: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
}

export default OrderList
