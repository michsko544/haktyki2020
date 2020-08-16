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
import Payment from './Payment'

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
  const theme = AppThemes[store.get('themeId')]
  const firstcolor = theme.from
  const secondcolor = theme.to

  const OrderRecord = ({ name, order }) => {
    const hasCoupon = () => isPurchaser && order.coupon && order.coupon.code

    return (
      <RecordStyled hascoupon={hasCoupon()}>
        <Name color={fontcolor}>{name}</Name>
        <Order firstcolor={firstcolor} secondcolor={secondcolor}>
          {order.description}
        </Order>
        {hasCoupon() && (
          <>
            <Coupon
              color={fontcolor}
            >{`Posiada kupon: ${order.coupon.code}`}</Coupon>

            <CouponInfo color={backgroundcolor}>
              <Name color={fontcolor}>Kod kuponu: {order.coupon.code}</Name>
              <Coupon color={fontcolor}>
                Dodatkowe informacje:{' '}
                {order.coupon.description ? order.coupon.description : 'Brak'}
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
          order.userFullname
        )}
        order={order}
      />
    ))

  return (
    <>
      <div style={{ marginTop: 15, marginBottom: 5 }}>
        <Payment payment={payment} isOrderClosed={isOrderClosed} />
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
  payment: PropTypes.object.isRequired,
  isOrderClosed: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
}

export default OrderList
