import React from 'react'
import BoxContainer from '../../components/BoxContainer'
import Header from '../../components/BoxContainer/Header'
import Heroimage from '../../components/BoxContainer/Heroimage'
import { Padding30 } from '../../components/App'
import GreeterFormik from '../../components/BoxContainer/GreeterForm'
import { HeaderStyled } from '../../components/BoxContainer/Header'

const Greeter = () => {
  return (
    <BoxContainer>
      <Padding30>
        <HeaderStyled>
          <Header
            title="Cześć"
            subtitle="Jak masz na imię?"
            description={`Tylko krok dzieli Cię\nod wspólnego zamawiania jedzenia!`}
          />
        </HeaderStyled>
        <Heroimage />
        <GreeterFormik />
      </Padding30>
    </BoxContainer>
  )
}

export default Greeter
