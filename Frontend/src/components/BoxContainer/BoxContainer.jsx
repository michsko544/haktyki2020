import React from 'react'
import PropTypes from 'prop-types'
import { Container, Box } from './'
import Store from './../App/App.store'
import { AppBackgroundThemes } from './../App/App.themes'

const BoxContainer = ({ children }) => {
  const store = Store.useStore()

  return (
    <Container>
      <Box background={AppBackgroundThemes[store.get('themeBackgroundId')].alternate}>{children}</Box>
    </Container>
  )
}

BoxContainer.propTypes = {
  children: PropTypes.any,
}

export default BoxContainer
