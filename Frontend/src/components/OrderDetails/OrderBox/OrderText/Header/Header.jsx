import React from 'react'
import PropTypes from 'prop-types'
import { Title, Info } from './Header.style'
import { useColors } from '../../../../../utils'

const Header = ({ title, info }) => {
  const { mode } = useColors()

  return (
    <>
      <Title fontcolor={mode.fontColor}>{title}</Title>
      <Info fontcolor={mode.fontColor}>{info}</Info>
    </>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
}

export default Header
