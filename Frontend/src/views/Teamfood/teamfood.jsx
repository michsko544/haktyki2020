import React, { useEffect } from 'react'
import Header from './../../components/Header'
import { H1, H4, HBold } from './../../components/Headings'
import CloseIcon from '@material-ui/icons/Close'
import { ContainerStyled } from './Container/container.style'
import { IconLink } from './../../components/App/App.style'
import TeamfoodFormik from './teamfood.form'
import { useColors } from '../../utils'

const Teamfood = () => {
  const { mode } = useColors()

  useEffect(() => {
    document.title = 'Nowe Zamówienie 🍔 | TeamFood'
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header>
        <H1>
          Team<HBold>Food</HBold>
        </H1>
        <div className="icons">
          <IconLink to="/">
            <CloseIcon
              style={{
                color: mode.fontColor,
              }}
            />
          </IconLink>
        </div>
        <H4>Po prostu zamów swoje jedzenie.</H4>
      </Header>
      <ContainerStyled background={mode.alternate}>
        <TeamfoodFormik />
      </ContainerStyled>
    </>
  )
}

export default Teamfood
