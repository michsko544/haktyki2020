import React from 'react'
import PropTypes from 'prop-types'
import H1 from '../../H1'
import H3 from '../../H3'
import HBold from '../../HeadingBold'
import { H3Styled, DescriptionStyled } from './Header.style'
import Store from './../../App/App.store'
import { AppBackgroundThemes } from './../../App/App.themes'

const Header = ({ title, subtitle, description }) => {
  const store = Store.useStore()

  const renderSubtitle = () =>
    subtitle && (
      <H3Styled>
        <H3>{subtitle}</H3>
      </H3Styled>
    )

  const renderDescription = () =>
    description && (
      <DescriptionStyled color={AppBackgroundThemes[store.get('themeBackgroundId')].fontColor}>{description}</DescriptionStyled>
    )

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
