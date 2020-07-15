import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home, Login, Register } from '../../views'

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
    </Switch>
  )
}

export default AppRoutes
