import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Store from './App.store'
import AppRoutes from './App.routes'
import { AppDebug } from './App.debug'
import AppInit from './App.init'
import { AppTheme } from './App.theme'

const App = () => {
  return (
    <Store.Container>
      <AppInit />
      <div className="App">
        <AppTheme>
          <Router>
            <AppDebug />
            <AppRoutes />
          </Router>
        </AppTheme>
      </div>
    </Store.Container>
  )
}

export default App
