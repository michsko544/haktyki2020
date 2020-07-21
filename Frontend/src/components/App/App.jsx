import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { DebugLink } from './App.style'
import Store from './App.store'
import AppRoutes from './App.routes'

const App = () => {
  return (
    <Store.Container>
      <div className="App">
        <Router>
          <DebugLink to="/">Home</DebugLink>
          <DebugLink to="/login">Login</DebugLink>
          <DebugLink to="/register">Register</DebugLink>
          <DebugLink to="/greeter">Greeter</DebugLink>
          <DebugLink to="/settings">Settings</DebugLink>
          <DebugLink to="/teamfood">TeamFood</DebugLink>
          <AppRoutes />
        </Router>
      </div>
    </Store.Container>
  )
}

export default App
