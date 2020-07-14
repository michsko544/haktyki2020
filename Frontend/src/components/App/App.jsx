import React from 'react'
import { withFormik, Form } from 'formik'
import Input from './../Input'
import Button from '../Button'
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
      <Form>
        <Input type="text" name="user" label="Login" />
        <Input type="password" name="password" label="Hasło" />
      </Form>
      <Button text="Zaloguj" handleOnClick={() => {}} />
      <Router>
        <DebugLink to="/login">Login</DebugLink>
        <DebugLink to="/">Home</DebugLink>
        <AppRoutes />
      </Router>
      </ThemeProvider>
    </div>
  )
}

const FormikApp = withFormik({
  mapPropsToValues() {
    return {
      user: '',
      password: '',
    }
  },
})(App)

export default FormikApp
