import React from 'react'
import { useHistory } from 'react-router-dom'
import BoxContainer from '../../components/BoxContainer'
import Header from '../../components/BoxContainer/Header'
import Heroimage from '../../components/Heroimage'
import { HeroimagePosition } from '../../components/Heroimage'
import { Padding30 } from '../../components/App'
import { HeaderStyled } from '../../components/BoxContainer/Header'
import img from '../../images/sad-face.jpg'
import { FormWrapper } from '../../components/BoxContainer/FormWithLink'
import Button from '../../components/Button'

const NotFound = () => {
  const history = useHistory()

  return (
    <BoxContainer>
      <Padding30>
        <HeaderStyled>
          <Header
            title="Error 404"
            subtitle="Nie znaleziono strony."
            description="Ta strona śmierdzi jajkami &#128565;&#129370;"
          />
        </HeaderStyled>
        <HeroimagePosition>
          <Heroimage propImage={img} />
        </HeroimagePosition>
        <FormWrapper>
          <Button
            text="Przycisk ucieczki"
            handleOnClick={() => history.replace('/')}
          />
        </FormWrapper>
      </Padding30>
    </BoxContainer>
  )
}

export default NotFound
