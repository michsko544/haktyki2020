import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Store from './App.store'
import AppRoutes from './App.routes'
import { AppDebug } from './App.debug'
import AppInit from './App.init'
import { AppTheme } from './App.theme'
import { SnackbarProvider } from 'notistack'

const App = () => {
  return (
    <Store.Container>
      <AppInit />
      <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'bottom',horizontal: 'center'}} dense>
        <div className="App">
          <AppTheme>
            <Router>
              <AppDebug />
              <AppRoutes />
            </Router>
          </AppTheme>
        </div>
      </SnackbarProvider>
    </Store.Container>
  )
}

export default App
