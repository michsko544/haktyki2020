import React from 'react'
import BoxContainer from '../../components/BoxContainer'
import Header from '../../components/BoxContainer/Header'
import FormWithLink from '../../components/BoxContainer/FormWithLink'
import Heroimage from '../../components/Heroimage'
import { Padding30 } from '../../components/App'
import RegisterFormik from '../../components/BoxContainer/RegisterForm'
import { HeaderStyled } from '../../components/BoxContainer/Header'
import img from '../../images/frytki.png'

const Login = () => {
  return (
    <BoxContainer>
      <Padding30>
        <HeaderStyled>
          <Header title="Rejestracja" subtitle="Podaj email i hasło" />
        </HeaderStyled>
        <Heroimage image={img} />
        <FormWithLink linkText={'Mam konto!'} link="/login">
          <RegisterFormik />
        </FormWithLink>
      </Padding30>
    </BoxContainer>
  )
}

export default Login
