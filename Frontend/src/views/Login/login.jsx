import React, { useEffect } from 'react'
import BoxContainer from '../../components/BoxContainer'
import Header from '../../components/BoxContainer/Header'
import FormWithLink from '../../components/BoxContainer/FormWithLink'
import Heroimage from '../../components/Heroimage'
import { HeroimagePosition } from '../../components/Heroimage'
import { Padding30 } from '../../components/App'
import LoginFormik from '../../components/BoxContainer/LoginForm'
import { HeaderStyled } from '../../components/BoxContainer/Header'

const Login = () => {
  useEffect(() => {
    document.title = 'Logowanie 🎂 | TeamFood'
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BoxContainer>
      <Padding30>
        <HeaderStyled>
          <Header title="Logowanie" subtitle="Podaj email i hasło" />
        </HeaderStyled>
        <HeroimagePosition>
          <Heroimage />
        </HeroimagePosition>
        <FormWithLink linkText={'Chce dołączyć!'} link="/register">
          <LoginFormik />
        </FormWithLink>
      </Padding30>
    </BoxContainer>
  )
}

export default Login
