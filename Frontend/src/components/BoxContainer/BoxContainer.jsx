import React from 'react'
import PropTypes from 'prop-types'
import { Container, Box } from './'

const BoxContainer = ({ children }) => {
  const isDarkMode = true

  return (
    <Container>
      <Box isDarkMode={isDarkMode}> {children}</Box>
    </Container>
  )
}

BoxContainer.propTypes = {
  children: PropTypes.any,
}

export default BoxContainer
