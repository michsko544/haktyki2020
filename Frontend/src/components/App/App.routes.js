import React from 'react'
import { Route } from 'react-router-dom'
import { GuardedRoute } from './../GuardedRoute'
import { CustomRoute } from './../CustomRoute'
import {
  Home,
  Login,
  Register,
  Greeter,
  Settings,
  NotFound,
  Teamfood,
} from '../../views'
import Store from './App.store'
import { AnimatedSwitch } from 'react-router-transition'

import './App.router.animation.css'

const AppRoutes = () => {
  const store = Store.useStore()

  /**
   * For /login & /register
   */
  const isLogged = () => store.get('authToken') !== ''

  const hasFullname = () => store.get('user') !== ''

  return (
    <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="route-wrapper"
    >
      <GuardedRoute exact path="/" component={Home} />
      <CustomRoute
        customGuard={!isLogged()}
        redirectTo="/greeter"
        path="/login"
        component={Login}
      />
      <CustomRoute
        customGuard={!isLogged()}
        redirectTo="/"
        path="/register"
        component={Register}
      />
      <CustomRoute
        customGuard={isLogged() && !hasFullname()}
        redirectTo="/"
        path="/greeter"
        component={Greeter}
      />
      <GuardedRoute path="/settings" component={Settings} />
      <GuardedRoute path="/teamfood" component={Teamfood} />
      <Route path="*" component={NotFound} />
    </AnimatedSwitch>
  )
}

export default AppRoutes
