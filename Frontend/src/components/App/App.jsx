import React from 'react'
import { withFormik, Form } from 'formik'
import Input from './../Input'
import Button from '../Button'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import AppRoutes from './App.routes'
import { DebugLink } from './App.style'

const App = () => {
  return (
    <div className="App">
      <Form>
        <Input type="text" name="user" label="Login" />
        <Input type="password" name="password" label="Hasło" />
      </Form>
      <Button text="Zaloguj" handleOnClick={() => {}} />
      <DebugLink to="/login">Login</DebugLink>
      <DebugLink to="/">Home</DebugLink>
      <Router></Router>
      <AppRoutes />
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
