import React from 'react'
import PropTypes from 'prop-types'
import H1 from '../../H1'
import H3 from '../../H3'
import HBold from '../../HeadingBold'
import { H3Styled } from './Header.style'

const Header = ({ title, subtitle }) => {
  const color = '#FCFCFC'

  return (
    <>
      <H1 color={color}>
        <HBold>
          {title}
          {','}
        </HBold>
      </H1>
      <H3Styled>
        <H3 color={color}>{subtitle}</H3>
      </H3Styled>
    </>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

export default Header
