import React from 'react'
import PropTypes from 'prop-types'
import { HeadingBold } from './HeadingBold.style'

const HBold = ({ children }) => {
  return <HeadingBold>{children}</HeadingBold>
}

HBold.propTypes = {
  children: PropTypes.any,
}

HBold.defaultProps = {
  children: null,
}

export default HBold
