import React from 'react'
import PropTypes from 'prop-types'
import { Container, Box, BackgroundSpaceToClick } from './'
import Store from './../App/App.store'
import { AppBackgroundThemes } from './../App/App.themes'

const BoxContainer = ({ children, closeCallback }) => {
  const store = Store.useStore()

  return (
    <Container>
      <BackgroundSpaceToClick onClick={closeCallback} />
      <Box
        background={
          AppBackgroundThemes[store.get('themeBackgroundId')].alternate
        }
      >
        {children}
      </Box>
    </Container>
  )
}

BoxContainer.propTypes = {
  children: PropTypes.any,
  closeCallback: PropTypes.func,
}

export default BoxContainer
