import React from 'react'
import PropTypes from 'prop-types'
import { H2Styled } from './H2.style'
import { AppBackgroundThemes } from '../../App/App.themes'
import Store from '../../App/App.store'

const H2 = ({ children, ...props }) => {
  const store = Store.useStore()

  return <H2Styled {...props} color={AppBackgroundThemes[store.get('themeBackgroundId')].fontColor}>{children}</H2Styled>
}

H2.propTypes = {
  children: PropTypes.any,
}

H2.defaultProps = {
  children: null,
}

export default H2
