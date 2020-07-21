import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { DebugLink } from './App.style'
import Store from './App.store'
import AppRoutes from './App.routes'

const App = () => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      main: '#20B0E8',
      primary: {
        main: '#20B0E8',
      },
      secondary: {
        main: '#20B0E8',
      },
    },
  })

  return (
    <Store.Container>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Router>
            <DebugLink to="/">Home</DebugLink>
            <DebugLink to="/login">Login</DebugLink>
            <DebugLink to="/register">Register</DebugLink>
            <DebugLink to="/greeter">Greeter</DebugLink>
            <DebugLink to="/settings">Settings</DebugLink>
            <DebugLink to="/teamfood">TeamFood</DebugLink>
            <AppRoutes />
          </Router>
        </ThemeProvider>
      </div>
    </Store.Container>
  )
}

export default App
