import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import BoxContainer from '../../BoxContainer'
import CloseIcon from '@material-ui/icons/Close'
import { OrderDetailsImg, HeroimagePosition } from '../../Heroimage/Heroimage.style'
import { FixedContainer, CloseBtnBackground } from './OrderBox.style'
import { imgUrlBuilder, useColors } from '../../../utils'
import { useResizeObserver } from '../../../utils/useResizeObserver'

const OrderBox = ({ children, image, closeCallback }) => {
  const { mode } = useColors()

  const { imageRef, imageUrl, setImage } = useResizeObserver()

  const background = mode.background

  useEffect(() => {
    setImage(image)
  }, [image, setImage])

  return (
    <FixedContainer>
      <BoxContainer closeCallback={closeCallback}>
        <CloseBtnBackground onClick={closeCallback} background={background}>
          <CloseIcon
            style={{
              color: mode.fontColor,
            }}
          />
        </CloseBtnBackground>
        <HeroimagePosition>
          <OrderDetailsImg ref={imageRef} src={imageUrl || imgUrlBuilder(image, 320, 480, 1)} alt="food-order-photo" />
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
}

export default OrderBox
