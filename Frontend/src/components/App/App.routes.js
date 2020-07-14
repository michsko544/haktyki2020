import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home, Login } from '../../views'

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/login" component={Login}></Route>
    </Switch>
  )
}

export default AppRoutes
