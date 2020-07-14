import React from 'react'
import { FormWrapper, OptionLinkStyled } from './'
import PropTypes from 'prop-types'

const FormWithLink = ({ children, linkText, link }) => {
  return (
    <FormWrapper>
      {children}
      {linkText && link && (
        <OptionLink text={linkText} onClick={() => console.log(link)} />
      )}
    </FormWrapper>
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
