import React from 'react'
import PropTypes from 'prop-types'
import { H2Styled } from './H2.style'
import { useColors } from '../../../utils'

const H2 = ({ children, ...props }) => {
  const { mode } = useColors()

  return (
    <H2Styled {...props} color={mode.fontColor}>
      {children}
    </H2Styled>
  )
}

H2.propTypes = {
  children: PropTypes.any,
}

H2.defaultProps = {
  children: null,
}

export default H2
