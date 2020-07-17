import React from 'react'
import PropTypes from 'prop-types'
import BoxContainer from '../BoxContainer'
import { Padding50 } from './OrderBox.style'
import { OrderDetailsImg } from '../Heroimage/Heroimage.style'
import img from '../../images/frytki.png'
import { FixedContainer } from './OrderBox.style'
import OrderText from './OrderText'

const OrderBox = ({ restaurant, date, time, purchaser, children }) => {
  return (
    <FixedContainer>
      <BoxContainer>
        <OrderDetailsImg src={img} alt="food-order-photo" />
        <Padding50>
          <OrderText
            title={restaurant}
            info={`Zamawia ${purchaser} - ${date} ${time}`}
          >
            {children}
          </OrderText>
        </Padding50>
      </BoxContainer>
    </FixedContainer>
  )
}

OrderBox.propTypes = {
  restaurant: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  purchaser: PropTypes.string,
  children: PropTypes.any,
}

export default OrderBox
