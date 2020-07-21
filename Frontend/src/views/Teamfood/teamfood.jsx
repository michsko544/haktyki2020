import React from 'react'
import Header from './../../components/Header'
import H1 from './../../components/H1'
import CloseIcon from '@material-ui/icons/Close'
import H4 from './../../components/H4'
import { ContainerStyled } from './Container/container.style'
import HBold from '../../components/HeadingBold'
import { IconLink } from './../../components/App/App.style'
import TeamfoodFormik from './teamfood.form'

const Teamfood = () => {
  return (
    <>
      <Header>
        <H1 color="#F0F0F0">
          Team<HBold>Food</HBold>
        </H1>
        <div className="icons">
          <IconLink to="/">
            <CloseIcon />
          </IconLink>
        </div>
        <H4>Po prostu zamów swoje jedzenie.</H4>
      </Header>
      <ContainerStyled>
          <TeamfoodFormik/>
      </ContainerStyled>
    </>
  )
}

export default Teamfood
