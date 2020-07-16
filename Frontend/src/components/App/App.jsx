import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { DebugLink } from './App.style'
import AppRoutes from './App.routes'

const App = () => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    }
  })

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Router>
        <DebugLink to="/">Home</DebugLink>
        <DebugLink to="/login">Login</DebugLink>
        <DebugLink to="/register">Register</DebugLink>
        <DebugLink to="/greeter">Greeter</DebugLink>
        <DebugLink to="/settings">Settings</DebugLink>
        <AppRoutes />
      </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
