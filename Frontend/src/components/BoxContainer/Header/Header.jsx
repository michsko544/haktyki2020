import React from 'react'
import PropTypes from 'prop-types'
import { H1, H3, HBold } from './../../Headings'
import { H3Styled, DescriptionStyled } from './Header.style'
import { useColors } from '../../../utils'

const Header = ({ title, subtitle, description }) => {
  const { mode } = useColors()

  const renderSubtitle = () =>
    subtitle && (
      <H3Styled>
        <H3>{subtitle}</H3>
      </H3Styled>
    )

  const renderDescription = () => description && <DescriptionStyled color={mode.fontColor}>{description}</DescriptionStyled>

  return (
    <>
      <H1>
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
