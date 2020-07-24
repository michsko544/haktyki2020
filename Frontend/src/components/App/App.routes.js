import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { GuardedRoute } from './../GuardedRoute'
import { CustomRoute } from './../CustomRoute'
import { Home, Login, Register, Greeter, Settings, NotFound } from '../../views'
import Teamfood from '../../views/Teamfood/teamfood'

import Store from './App.store'
import { AppBackgroundThemes } from './App.themes'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const AppRoutes = () => {
  const store = Store.useStore()

  const styleBackground = () => {
    window.document.body.style.background =
      AppBackgroundThemes[store.get('themeBackgroundId')].background
  }

  styleBackground()

  /**
   * To pewnie można zrobić lepiej, ale nie do końca wiem jak
   * Przeczytałem dokumentację, ale ona nie określa jak inaczej zmieniać styl dynamicznie w aplikacji
   * Więc jeśli masz inny pomysł to ja chętnie przyjmę :v
   */
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

  /**
   * For /login & /register
   */
  const isLogged = () => {
    return store.get('authToken') !== ''
  }

  return (
    <ThemeProvider theme={chooseTheme()}>
      <Switch>
        <GuardedRoute exact path="/" component={Home} />
        <CustomRoute
          customGuard={!isLogged()}
          redirectTo="/"
          path="/login"
          component={Login}
        />
        <CustomRoute
          customGuard={!isLogged()}
          redirectTo="/"
          path="/register"
          component={Register}
        />
        <GuardedRoute path="/greeter" component={Greeter} />
        <GuardedRoute path="/settings" component={Settings} />
        <GuardedRoute path="/teamfood" component={Teamfood} />
        <Route path="*" component={NotFound} />
      </Switch>
    </ThemeProvider>
  )
}

export default AppRoutes
