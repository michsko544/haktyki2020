import React from 'react'
import PropTypes from 'prop-types'
import { H3Styled } from './H3.style'
import { useColors } from '../../../utils'

const H3 = ({ children, ...props }) => {
  const { mode } = useColors()

  return (
    <H3Styled {...props} color={mode.fontColor}>
      {children}
    </H3Styled>
  )
}

H3.propTypes = {
  children: PropTypes.any,
}

H3.defaultProps = {
  children: null,
}

export default H3
