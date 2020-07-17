import React from 'react'
import BoxContainer from '../BoxContainer'
import { Padding50 } from './OrderBox.style'
import { OrderDetailsImg } from '../Heroimage/Heroimage.style'
import img from '../../images/frytki.png'
import { FixedContainer } from './OrderBox.style'
import OrderText from './OrderText'

const OrderBox = ({ children }) => {
  return (
    <FixedContainer>
      <BoxContainer>
        <OrderDetailsImg src={img} alt="food-order-photo" />
        <Padding50>
          <OrderText
            title="Hamburgery Zdrowa Krowa"
            info="Zamawia Grzegorz - Dziś 18:30"
          >
            {children}
          </OrderText>
        </Padding50>
      </BoxContainer>
    </FixedContainer>
  )
}

export default OrderBox
