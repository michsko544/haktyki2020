import { createMuiTheme } from '@material-ui/core/styles'
import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/core/styles'
import Store from './App.store'

export const AppTheme = ({ children, ...props }) => {
  const store = Store.useStore()

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      main: '#20B0E8',
      primary: {
        main: '#20B0E8',
      },
      secondary: {
        main: '#20B0E8',
      },
    },
  })

  const lightTheme = createMuiTheme({
    palette: {
      type: 'light',
      main: '#20B0E8',
      primary: {
        main: '#20B0E8',
      },
      secondary: {
        main: '#20B0E8',
      },
    },
  })

  const chooseTheme = () => {
    return store.get('themeBackgroundId') === 0 ? darkTheme : lightTheme
  }

  return (
    <ThemeProvider theme={chooseTheme()} {...props}>
      {children}
    </ThemeProvider>
  )
}

AppTheme.propTypes = {
  children: PropTypes.any,
}

AppTheme.defaultProps = {
  children: null,
}
