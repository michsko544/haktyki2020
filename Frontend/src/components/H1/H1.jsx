import React from 'react'
import PropTypes from 'prop-types'
import { H1Styled } from './H1.style'
import { AppBackgroundThemes } from './../App/App.themes'
import Store from './../App/App.store'

const H1 = ({ children, color, ...props }) => {
  const store = Store.useStore()

  return <H1Styled {...props} color={AppBackgroundThemes[store.get('themeBackgroundId')].fontColor}>{children}</H1Styled>
}

H1.propTypes = {
  color: PropTypes.string,
  children: PropTypes.any,
}

H1.defaultProps = {
  color: '#000000',
  children: null,
}

export default H1
