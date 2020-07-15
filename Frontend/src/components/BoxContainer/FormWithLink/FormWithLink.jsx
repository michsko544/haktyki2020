import React from 'react'
import { OptionLinkStyled } from './'
import { FormContainer } from '../BoxContainer.style'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

const FormWithLink = ({ children, linkText, link }) => {
  const history = useHistory()

  return (
    <FormContainer>
      {children}
      {linkText && link && (
        <OptionLink text={linkText} onClick={() => history.replace(link)} />
      )}
    </FormContainer>
  )
}

FormWithLink.propTypes = {
  linkText: PropTypes.string,
  link: PropTypes.string,
  childern: PropTypes.any,
}

const OptionLink = ({ text, ...props }) => {
  const isDarkMode = true

  return (
    <OptionLinkStyled isDarkMode={isDarkMode} {...props}>
      {text}
    </OptionLinkStyled>
  )
}

OptionLink.propTypes = {
  text: PropTypes.string.isRequired,
}

OptionLink.defaultProps = {
  text: '',
}

export default FormWithLink
