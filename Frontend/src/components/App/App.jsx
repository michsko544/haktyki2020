import React from 'react'
import H1 from './../H1'
import H2 from './../H2'
import H3 from './../H3'
import HBold from './../HeadingBold'
import { withFormik, Form } from 'formik'
import Button from '../Button'
import Input from '../Input'
import BoxContainer from '../BoxContainer'
import Header from '../BoxContainer/Header'

const App = () => {
  return (
    <div className="App">
      Hello world
      <H1 color="#232327">
        Team<HBold>Food</HBold>
      </H1>
      <H2 color="#CACAFF">
        Po prostu zamów swoje <HBold>jedzenie</HBold>.
      </H2>
      <H3 color="#FFCA0C">
        Po prostu zamów swoje <HBold>jedzenie</HBold>.
      </H3>
      <Form>
        <Input type="text" name="user" label="Login" />
        <Input
          type="password"
          name="password"
          label="Hasło"
          error="Przykładowy error"
        />
      </Form>
      <Button text="Zaloguj" handleOnClick={() => {}} />
      <BoxContainer>
        <Header title="Logowanie" subtitle="Podaj login i hasło" />
      </BoxContainer>
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
