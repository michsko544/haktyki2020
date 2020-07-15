import React from 'react'
import BoxContainer from '../../components/BoxContainer'
import Header from '../../components/BoxContainer/Header'
import FormWithLink from '../../components/BoxContainer/FormWithLink'
import Heroimage from '../../components/BoxContainer/Heroimage'
import { Padding30 } from '../../components/App'
import LoginFormik from '../../components/BoxContainer/LoginForm'
import { HeaderStyled } from '../../components/BoxContainer/Header'

const Login = () => {
  return (
    <BoxContainer>
      <Padding30>
        <HeaderStyled>
          <Header title="Logowanie" subtitle="Podaj login i hasło" />
        </HeaderStyled>
        <Heroimage />
        <FormWithLink linkText={'Chce dołączyć'} link="/register">
          <LoginFormik />
        </FormWithLink>
      </Padding30>
    </BoxContainer>
  )
}

export default Login