import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Store from './App.store'
import AppRoutes from './App.routes'
import { AppDebug } from './App.debug'
import AppInit from './App.init'

const App = () => {
  return (
    <Store.Container>
      <AppInit />
        <Router>
          <AppDebug />
          <AppRoutes />
        </Router>
    </Store.Container>
  )
}

export default App
