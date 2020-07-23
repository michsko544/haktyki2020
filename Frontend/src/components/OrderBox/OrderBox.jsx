import React from 'react'
import PropTypes from 'prop-types'
import BoxContainer from '../BoxContainer'
import { Padding50 } from './OrderBox.style'
import { OrderDetailsImg } from '../Heroimage/Heroimage.style'
import defaultImage from '../../images/frytki.png'
import { FixedContainer } from './OrderBox.style'

const OrderBox = ({ children, image }) => {
  return (
    <FixedContainer>
      <BoxContainer>
        <OrderDetailsImg src={image || defaultImage} alt="food-order-photo" />
        <Padding50>{children}</Padding50>
      </BoxContainer>
    </FixedContainer>
  )
}

OrderBox.propTypes = {
  image: PropTypes.string,
  children: PropTypes.any,
}

export default OrderBox
