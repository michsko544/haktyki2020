import React from 'react'
import PropTypes from 'prop-types'
import { HeaderStyled } from './header.style'

const Header = ({ children, ...props }) => {
  return (
    <HeaderStyled {...props}>
      {children}
    </HeaderStyled>
  )
}

Header.propTypes = {
  children: PropTypes.any,
  icons: PropTypes.array,
}

export default Header
