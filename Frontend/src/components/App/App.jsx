import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Store from './App.store'
import AppRoutes from './App.routes'
import { AppDebug } from './App.debug'

const App = () => {
  return (
    <Store.Container>
      <Router>
        <AppDebug />
        <AppRoutes />
      </Router>
    </Store.Container>
  )
}

export default App
