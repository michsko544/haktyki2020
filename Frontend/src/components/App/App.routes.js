import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home, Login, Register, Greeter, Settings } from '../../views'
import Teamfood from '../../views/Teamfood/teamfood'

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/greeter" component={Greeter}></Route>
      <Route path="/settings" component={Settings}></Route>
      <Route path="/teamfood" component={Teamfood}></Route>
    </Switch>
  )
}

export default AppRoutes
