import React from 'react'
import PropTypes from 'prop-types'
import { Container, Box, BackgroundSpaceToClick } from './'
import { useColors } from '../../utils'

const BoxContainer = ({ children, closeCallback }) => {
  const { mode } = useColors()

  return (
    <Container>
      <BackgroundSpaceToClick onClick={closeCallback} />
      <Box background={mode.alternate}>{children}</Box>
    </Container>
  )
}

BoxContainer.propTypes = {
  children: PropTypes.any,
  closeCallback: PropTypes.func,
}

export default BoxContainer
