import React from 'react'
import PropTypes from 'prop-types'
import BoxContainer from '../../BoxContainer'
import { Padding50 } from './OrderBox.style'
import CloseIcon from '@material-ui/icons/Close'
import { OrderDetailsImg } from '../../Heroimage/Heroimage.style'
import defaultImage from '../../../images/frytki.png'
import { FixedContainer, CloseBtnBackground } from './OrderBox.style'
import Store from '../../App/App.store'
import { AppBackgroundThemes } from '../../App/App.themes'

const OrderBox = ({ children, image, closeCallback }) => {
  const store = Store.useStore()

  const background =
    AppBackgroundThemes[store.get('themeBackgroundId')].background

  return (
    <FixedContainer>
      <BoxContainer closeCallback={closeCallback}>
        <CloseBtnBackground onClick={closeCallback} background={background}>
          <CloseIcon
            style={{
              color:
                AppBackgroundThemes[store.get('themeBackgroundId')].fontColor,
            }}
          />
        </CloseBtnBackground>
        <OrderDetailsImg src={image || defaultImage} alt="food-order-photo" />
        <Padding50>{children}</Padding50>
      </BoxContainer>
    </FixedContainer>
  )
}

OrderBox.propTypes = {
  image: PropTypes.string,
  closeCallback: PropTypes.func,
  children: PropTypes.any,
}

export default OrderBox
