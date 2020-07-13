import React from 'react';
import Input from "../Input"
import { withFormik, Form } from 'formik'
import Button from '../Button'

const App = () => {
  return (
    <div className="App">
      <Form>
        <Input type="text" name="user" label="Login" />
        <Input type="password" name="password" label="Hasło" />
      </Form>
      <Button text="Zaloguj" handleOnClick={() => { }} />
    </div>
  );
}

const FormikApp = withFormik({
  mapPropsToValues() {
    return {
      user: "",
      password: ""
    }
  }
})(App)

export default FormikApp;
