import React from 'react'
import PropTypes from 'prop-types'
import { H2Styled } from './H2.style'
import { AppBackgroundThemes } from './../App/App.themes'
import Store from './../App/App.store'

const H2 = ({ children, color }) => {
  const store = Store.useStore()

  return <H2Styled color={AppBackgroundThemes[store.get('themeBackgroundId')].fontColor}>{children}</H2Styled>
}

H2.propTypes = {
  color: PropTypes.string,
  children: PropTypes.any,
}

H2.defaultProps = {
  color: '#000000',
  children: null,
}

export default H2
