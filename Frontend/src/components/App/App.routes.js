import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { GuardedRoute } from './../GuardedRoute'
import { CustomRoute } from './../CustomRoute'
import { Home, Login, Register, Greeter, Settings, NotFound } from '../../views'
import Teamfood from '../../views/Teamfood/teamfood'
import Store from './App.store'

const AppRoutes = () => {
  const store = Store.useStore()

  /**
   * For /login & /register
   */
  const isLogged = () => {
    return store.get('authToken') !== ''
  }

  return (
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
  )
}

export default AppRoutes
