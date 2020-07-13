import React from 'react'
import { ButtonStyled } from "./"
import PropTypes from "prop-types"

const Button = ({ text, handleOnClick, color }) => {
    return (
        <ButtonStyled color={color} onClick={handleOnClick}>{text}</ButtonStyled>
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    handleOnClick: PropTypes.func.isRequired,
    color: PropTypes.string
}

export default Button
