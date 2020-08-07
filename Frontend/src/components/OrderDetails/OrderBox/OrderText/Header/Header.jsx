import React from 'react'
import PropTypes from 'prop-types'
import Store from '../../../../App/App.store'
import { AppBackgroundThemes } from '../../../../App/App.themes'
import { Title, Info } from './Header.style'

const Header = ({ title, info }) => {
  const store = Store.useStore()

  const fontcolor =
    AppBackgroundThemes[store.get('themeBackgroundId')].fontColor
  return (
    <>
      <Title fontcolor={fontcolor}>{title}</Title>
      <Info fontcolor={fontcolor}>{info}</Info>
    </>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
}

export default Header
