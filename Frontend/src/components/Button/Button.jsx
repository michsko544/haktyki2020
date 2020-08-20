import React from 'react'
import PropTypes from 'prop-types'
import { ButtonStyled } from './'
import { useColors } from '../../utils'

const Button = ({ text, handleOnClick, ...props }) => {
  const { theme, mode } = useColors()
  return (
    <>
      <ButtonStyled text={text} firstColor={theme.from} secondColor={theme.to} background={mode.alternate} onClick={handleOnClick} {...props} />
    </>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func,
}

export default Button
