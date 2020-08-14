import React, { useEffect } from 'react'
import BoxContainer from '../../components/BoxContainer'
import Header from '../../components/BoxContainer/Header'
import Heroimage from '../../components/Heroimage'
import { HeroimagePosition } from '../../components/Heroimage'
import { Padding30 } from '../../components/App'
import GreeterFormik from '../../components/BoxContainer/GreeterForm'
import { HeaderStyled } from '../../components/BoxContainer/Header'

const Greeter = () => {
  useEffect(() => {
    document.title = 'Poznajmy się 🖐🏻🖐🖐🏾 | TeamFood'
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
        <HeroimagePosition>
          <Heroimage />
        </HeroimagePosition>
        <GreeterFormik />
      </Padding30>
    </BoxContainer>
  )
}

export default Greeter
