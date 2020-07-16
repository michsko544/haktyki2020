import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { DebugLink } from './App.style'
import AppRoutes from './App.routes'

const App = () => {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
        }
      })
  );

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Router>
        <DebugLink to="/">Home</DebugLink>
        <DebugLink to="/login">Login</DebugLink>
        <DebugLink to="/register">Register</DebugLink>
        <DebugLink to="/greeter">Greeter</DebugLink>
        <AppRoutes />
      </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
