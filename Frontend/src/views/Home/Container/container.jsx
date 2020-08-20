import React from 'react'
import PropTypes from 'prop-types'
import { ContainerStyled } from './container.style'
import { useColors } from '../../../utils'

const Container = ({ children, ...props }) => {
  const { mode } = useColors()

  return (
    <ContainerStyled background={mode.alternate} {...props}>
      {children}
    </ContainerStyled>
  )
}

Container.propTypes = {
  children: PropTypes.any,
}

export default Container
