import React from 'react'
import PropTypes from 'prop-types'
import { FieldStyled, Label, ErrorStyled, InputWrapper } from './'

const Input = ({ label, error, ...props }) => {
  const isDarkMode = true
  const borderColor = '#20DCE8'

  return (
    <InputWrapper>
      <Label textColor={borderColor}>
        {label}
        <FieldStyled
          borderColor={borderColor}
          isDarkMode={isDarkMode}
          autoComplete="off"
          {...props}
        />
      </Label>
      <Error error={error} isDarkMode={isDarkMode} />
    </InputWrapper>
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
}

const Error = ({ error, isDarkMode }) => {
  return <ErrorStyled isDarkMode={isDarkMode}>{error}</ErrorStyled>
}

Error.propTypes = {
  error: PropTypes.string,
  isDarkMode: PropTypes.bool,
}

export default Input
