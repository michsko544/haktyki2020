import React from 'react'
import PropTypes from 'prop-types'
import { H3Styled } from './H3.style'
import { AppBackgroundThemes } from './../../App/App.themes'
import Store from './../../App/App.store'

const H3 = ({ children, ...props }) => {
  const store = Store.useStore()

  return <H3Styled {...props} color={AppBackgroundThemes[store.get('themeBackgroundId')].fontColor}>{children}</H3Styled>
}

H3.propTypes = {
  children: PropTypes.any,
}

H3.defaultProps = {
  children: null,
}

export default H3
