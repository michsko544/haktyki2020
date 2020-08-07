import React from 'react'
import PropTypes from 'prop-types'
import { ErrorStyled } from './InputError.style'

const InputError = ({ error, color }) => {
  return <ErrorStyled color={color}>{error}</ErrorStyled>
}

InputError.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  color: PropTypes.string,
}

export default InputError
