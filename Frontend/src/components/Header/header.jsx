import React from 'react'
import PropTypes from 'prop-types'
import { HeaderStyled } from './header.style'
import { useColors } from './../../utils'

const Header = ({ children, ...props }) => {
  const { mode } = useColors()

  return (
    <HeaderStyled background={mode.alternate} {...props}>
      {children}
    </HeaderStyled>
  )
}

Header.propTypes = {
  children: PropTypes.any,
  icons: PropTypes.array,
}

export default Header
