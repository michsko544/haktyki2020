import { createMuiTheme } from '@material-ui/core/styles'
import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/core/styles'
import Store from './App.store'
import { AppThemes } from './App.themes';

export const AppTheme = ({ children, ...props }) => {
  const store = Store.useStore()

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      main: AppThemes[store.get('themeId')].from,
      primary: {
        main: AppThemes[store.get('themeId')].from,
      },
      secondary: {
        main: AppThemes[store.get('themeId')].to,
      },
    },
  })

  const lightTheme = createMuiTheme({
    palette: {
      type: 'light',
      main: AppThemes[store.get('themeId')].from,
      primary: {
        main: AppThemes[store.get('themeId')].from,
      },
      secondary: {
        main: AppThemes[store.get('themeId')].to,
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
