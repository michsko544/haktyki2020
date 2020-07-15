import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { DebugLink } from './App.style'
import AppRoutes from './App.routes'

const App = () => {
  return (
    <div className="App">
      <Router>
        <DebugLink to="/login">Login</DebugLink>
        <DebugLink to="/">Home</DebugLink>
        <AppRoutes />
      </Router>
    </div>
  )
}

export default App
