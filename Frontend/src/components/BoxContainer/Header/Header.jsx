import React from 'react'
import PropTypes from 'prop-types'
import H1 from '../../H1'
import H3 from '../../H3'
import HBold from '../../HeadingBold'
import { HeaderStyled } from './'

const Header = ({ title, subtitle }) => {
  const color = '#FCFCFC'

  return (
    <HeaderStyled>
      <H1 color={color}>
        <HBold>
          {title}
          {','}
        </HBold>
      </H1>
      <H3 color={color}>{subtitle}</H3>
    </HeaderStyled>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

export default Header
