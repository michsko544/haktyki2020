import React from 'react'
import PropTypes from 'prop-types'
import { ButtonStyled } from './'

const Button = ({ text, handleOnClick, ...props }) => {
  const firstColor = '#46D3FF'
  const secondColor = '#3687FF'
  const isDarkMode = true

  return (
    <>
      <ButtonStyled
        text={text}
        firstColor={firstColor}
        secondColor={secondColor}
        isDarkMode={isDarkMode}
        onClick={handleOnClick}
        {...props}
      />
    </>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func,
}

export default Button
