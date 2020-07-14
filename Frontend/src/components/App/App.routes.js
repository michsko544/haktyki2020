import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import { Home, Login } from '../../views'

const AppRoutes = () => {
  return (
    <Route component="{App}">
      <Route exact path="/" component={Home}></Route>
      <Route path="/login" component={Login}></Route>
    </Route>
  )
}

export default AppRoutes
