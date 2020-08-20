import React from 'react'
import PropTypes from 'prop-types'
import { H1Styled } from './H1.style'
import { useColors } from '../../../utils'

const H1 = ({ children, ...props }) => {
  const { mode } = useColors()

  return (
    <H1Styled {...props} color={mode.fontColor}>
      {children}
    </H1Styled>
  )
}

H1.propTypes = {
  children: PropTypes.any,
}

H1.defaultProps = {
  children: null,
}

export default H1
