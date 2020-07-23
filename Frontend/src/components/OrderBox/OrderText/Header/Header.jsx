import React from 'react'
import PropTypes from 'prop-types'
import { Title, Info } from './Header.style'

const Header = ({ title, info }) => {
  const isDarkMode = true

  return (
    <>
      <Title isdarkmode={isDarkMode.toString()}>{title}</Title>
      <Info isdarkmode={isDarkMode.toString()}>{info}</Info>
    </>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
}

export default Header
