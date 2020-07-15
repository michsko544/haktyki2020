import React from 'react'
import PropTypes from 'prop-types'
import H1 from '../../H1'
import H3 from '../../H3'
import HBold from '../../HeadingBold'
import { H3Styled, DescriptionStyled } from './Header.style'

const Header = ({ title, subtitle, description }) => {
  const color = '#FCFCFC'

  const renderSubtitle = () =>
    subtitle && (
      <H3Styled>
        <H3 color={color}>{subtitle}</H3>
      </H3Styled>
    )

  const renderDescription = () =>
    description && (
      <DescriptionStyled color={color}>{description}</DescriptionStyled>
    )

  return (
    <>
      <H1 color={color}>
        <HBold>
          {title}
          {','}
        </HBold>
      </H1>
      {renderSubtitle()}
      {renderDescription()}
    </>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  descrpition: PropTypes.string,
}

export default Header
