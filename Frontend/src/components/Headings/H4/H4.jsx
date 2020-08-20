import React from 'react'
import PropTypes from 'prop-types'
import { H4Styled } from './H4.style'
import { useColors } from '../../../utils'

const H4 = ({ children, ...props }) => {
  const { mode } = useColors()

  return (
    <H4Styled {...props} color={mode.fontColor}>
      {children}
    </H4Styled>
  )
}

H4.propTypes = {
  children: PropTypes.any,
}

H4.defaultProps = {
  children: null,
}

export default H4
