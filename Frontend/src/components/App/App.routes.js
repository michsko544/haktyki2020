import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home, Login, Register, Greeter, Settings, NotFound } from '../../views'
import Teamfood from '../../views/Teamfood/teamfood'

import Store from './App.store'
import { AppBackgroundThemes } from './App.themes'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const AppRoutes = () => {
  const store = Store.useStore()
  window.document.body.style.background =
    AppBackgroundThemes[store.get('themeBackgroundId')].background

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

  return (
    <ThemeProvider
      theme={store.get('themeBackgroundId') === 0 ? darkTheme : lightTheme}
    >
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/greeter" component={Greeter}></Route>
        <Route path="/settings" component={Settings}></Route>
        <Route path="/teamfood" component={Teamfood}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </ThemeProvider>
  )
}

export default AppRoutes
