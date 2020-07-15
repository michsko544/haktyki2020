import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { DebugLink } from './App.style'
import AppRoutes from './App.routes'

const App = () => {
  return (
    <div className="App">
      <Router>
        <DebugLink to="/">Home</DebugLink>
        <DebugLink to="/login">Login</DebugLink>
        <DebugLink to="/register">Register</DebugLink>
        <AppRoutes />
      </Router>
    </div>
  )
}

export default App
