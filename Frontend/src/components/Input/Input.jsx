import React from 'react'
import PropTypes from 'prop-types'
import { FieldStyled, Label, ErrorStyled, InputWrapper } from './'
import { CenterStrechContainer } from '../App'

const Input = ({ label, ...props }) => {
  const [isDarkMode, setDarkMode] = React.useState(true)
  const [borderColor, setBorderColor] = React.useState('#20DCE8')

  return (
    <CenterStrechContainer>
      <Label textColor={borderColor}>
        {label}
        <FieldStyled
          borderColor={borderColor}
          isDarkMode={isDarkMode}
          {...props}
        />
      </Label>
      <Error error="Wypełnij to pole" isDarkMode={isDarkMode} />
    </CenterStrechContainer>
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

const Error = ({ error, isDarkMode }) => {
  return <ErrorStyled isDarkMode={isDarkMode}>{error}</ErrorStyled>
}

Error.propTypes = {
  error: PropTypes.string,
  isDarkMode: PropTypes.bool,
}

export default Input
