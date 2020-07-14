import React from 'react'
import BoxContainer from '../BoxContainer'
import Header from '../BoxContainer/Header'
import FormWithLink from '../BoxContainer/FormWithLink'
import Heroimage from '../BoxContainer/Heroimage'
import { Container30 } from '../App'
import LoginFormik from '../BoxContainer/FormWithLink/LoginForm'

const App = () => {
  return (
    <div className="App">
      <BoxContainer>
        <Container30>
          <Header title="Logowanie" subtitle="Podaj login i hasło" />
          <Heroimage />
          <FormWithLink linkText={'Chce dołączyć'} link="XD">
            <LoginFormik />
          </FormWithLink>
        </Container30>
      </BoxContainer>
    </div>
  )
}

export default App
