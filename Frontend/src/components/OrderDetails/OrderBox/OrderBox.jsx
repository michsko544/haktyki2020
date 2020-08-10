import React from 'react'
import PropTypes from 'prop-types'
import BoxContainer from '../../BoxContainer'
import CloseIcon from '@material-ui/icons/Close'
import {
  OrderDetailsImg,
  HeroimagePosition,
} from '../../Heroimage/Heroimage.style'
import { FixedContainer, CloseBtnBackground } from './OrderBox.style'
import Store from '../../App/App.store'
import { AppBackgroundThemes } from '../../App/App.themes'
import ImageLoadingLogic from '../../ImageLoadingLogic'

const OrderBox = ({ children, image, closeCallback, isLoading, error }) => {
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
        <HeroimagePosition>
          <ImageLoadingLogic
            image={image}
            isLoading={isLoading}
            error={error}
            alt="food-order-photo"
            component={OrderDetailsImg}
          />
        </HeroimagePosition>
        {children}
      </BoxContainer>
    </FixedContainer>
  )
}

OrderBox.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  closeCallback: PropTypes.func,
  children: PropTypes.any,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
}

export default OrderBox
