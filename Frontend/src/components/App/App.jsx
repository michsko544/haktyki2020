import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Store from './App.store'
import AppRoutes from './App.routes'
import AppInit from './App.init'
import { AppTheme } from './App.theme'
import { SnackbarProvider } from 'notistack'

const App = () => {
  return (
    <Store.Container>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        dense
      >
        <AppInit />
        <div className="App">
          <AppTheme>
            <Router>
              <AppRoutes />
            </Router>
          </AppTheme>
        </div>
      </SnackbarProvider>
    </Store.Container>
  )
}

export default App
