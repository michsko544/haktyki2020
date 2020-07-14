import React from 'react'
import PropTypes from 'prop-types'
import { ButtonStyled } from './'
import { CenterStrechContainer } from '../App'

const Button = ({ text, handleOnClick, ...props }) => {
  const [color, setColor] = React.useState('#20DCE8')
  return (
    <>
      <ButtonStyled color={color} onClick={handleOnClick} {...props}>
        {text}
      </ButtonStyled>
    </>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
}

export default Button
