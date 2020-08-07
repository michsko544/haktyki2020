import React from 'react'
import PropTypes from 'prop-types'
import { H1Styled } from './H1.style'
import { AppBackgroundThemes } from './../../App/App.themes'
import Store from './../../App/App.store'

const H1 = ({ children, ...props }) => {
  const store = Store.useStore()
  return <H1Styled {...props} color={AppBackgroundThemes[store.get('themeBackgroundId')].fontColor}>{children}</H1Styled>
}

H1.propTypes = {
  children: PropTypes.any,
}

H1.defaultProps = {
  children: null,
}

export default H1
