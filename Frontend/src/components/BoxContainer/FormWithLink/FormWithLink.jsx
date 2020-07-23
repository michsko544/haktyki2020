import React from 'react'
import { OptionLinkStyled } from './'
import { FormContainer } from '../BoxContainer.style'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import Store from './../../App/App.store'
import { AppBackgroundThemes } from './../../App/App.themes'

const FormWithLink = ({ children, linkText, link }) => {
  const history = useHistory()

  return (
    <FormContainer>
      {children}
      {linkText && link && (
        <OptionLink text={linkText} onClick={() => history.push(link)} />
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
  const store = Store.useStore()

  return (
    <OptionLinkStyled
      color={AppBackgroundThemes[store.get('themeBackgroundId')].fontColor}
      {...props}
    >
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
