import React from 'react'
import PropTypes from 'prop-types'
import { HeaderStyled } from './header.style'
import Store from './../App/App.store'
import { AppBackgroundThemes } from './../App/App.themes'

const Header = ({ children, ...props }) => {
  const store = Store.useStore()

  return (
    <HeaderStyled background={AppBackgroundThemes[store.get('themeBackgroundId')].alternate} {...props}>
      {children}
    </HeaderStyled>
  )
}

Header.propTypes = {
  children: PropTypes.any,
  icons: PropTypes.array,
}

export default Header
