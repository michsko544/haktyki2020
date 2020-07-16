import React from 'react'
import PropTypes from 'prop-types'
import { ContainerStyled } from './container.style'

const Container = ({ children, ...props }) => {
  return <ContainerStyled {...props}>{children}</ContainerStyled>
}

Container.propTypes = {
  children: PropTypes.any,
}

export default Container
