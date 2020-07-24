import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Store from './App.store'
import AppRoutes from './App.routes'
import { AppDebug } from './App.debug'
const App = () => {
  return (
    <Store.Container>
      <div className="App">
        <Router>
          <AppDebug />
          <AppRoutes />
        </Router>
      </div>
    </Store.Container>
  )
}

export default App
