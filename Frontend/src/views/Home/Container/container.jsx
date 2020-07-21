import React from 'react'
import PropTypes from 'prop-types'
import { ContainerStyled } from './container.style'
import Store from './../../../components/App/App.store'
import { AppBackgroundThemes } from './../../../components/App/App.themes'

const Container = ({ children, ...props }) => {
  const store = Store.useStore()

  return <ContainerStyled background={AppBackgroundThemes[store.get('themeBackgroundId')].alternate} {...props}>{children}</ContainerStyled>
}

Container.propTypes = {
  children: PropTypes.any,
}

export default Container
