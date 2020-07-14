import React from 'react'
import { withFormik, Form } from 'formik'
import Input from './../Input'
import Button from '../Button'
import { BrowserRouter as Router } from 'react-router-dom'
import { DebugLink } from './App.style'
import AppRoutes from './App.routes'

const App = () => {
  return (
    <div className="App">
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
