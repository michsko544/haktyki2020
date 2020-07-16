import React from 'react'
import PropTypes from 'prop-types'
import { H1Styled } from './H1.style'

const H1 = ({ children, color, ...props }) => {
  return <H1Styled {...props} color={color}>{children}</H1Styled>
}

H1.propTypes = {
  color: PropTypes.string,
  children: PropTypes.any,
}

H1.defaultProps = {
  color: '#000000',
  children: null,
}

export default H1
