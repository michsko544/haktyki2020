import React from 'react'
import H1 from '../H1'
import H2 from '../H2'
import H3 from '../H3'
import HBold from '../HeadingBold'
import BoxContainer from '../BoxContainer'
import Header from '../BoxContainer/Header'
import FormWithLink from '../BoxContainer/FormWithLink'
import LoginFormik from '../BoxContainer/FormWithLink/LoginForm'

const App = () => {
  return (
    <div className="App">
      <BoxContainer>
        <Header title="Logowanie" subtitle="Podaj login i hasło" />
        <FormWithLink linkText={'Chce dołączyć'} link="XD">
          <LoginFormik />
        </FormWithLink>
      </BoxContainer>
    </div>
  )
}

export default App
