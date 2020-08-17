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
      <AppTheme>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          dense
        >
          <AppInit />
          <div className="App">
            <Router>
              <AppRoutes />
            </Router>
          </div>
        </SnackbarProvider>
      </AppTheme>
    </Store.Container>
  )
}

export default App
