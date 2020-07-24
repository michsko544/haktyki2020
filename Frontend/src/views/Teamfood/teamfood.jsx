import React from 'react'
import Header from './../../components/Header'
import H1 from './../../components/H1'
import CloseIcon from '@material-ui/icons/Close'
import H4 from './../../components/H4'
import { ContainerStyled } from './Container/container.style'
import HBold from '../../components/HeadingBold'
import { IconLink } from './../../components/App/App.style'
import TeamfoodFormik from './teamfood.form'
import Store from './../../components/App/App.store'
import { AppBackgroundThemes } from './../../components/App/App.themes'

const Teamfood = () => {
  const store = Store.useStore()

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
                color:
                  AppBackgroundThemes[store.get('themeBackgroundId')].fontColor,
              }}
            />
          </IconLink>
        </div>
        <H4>Po prostu zamów swoje jedzenie.</H4>
      </Header>
      <ContainerStyled
        background={
          AppBackgroundThemes[store.get('themeBackgroundId')].alternate
        }
      >
        <TeamfoodFormik />
      </ContainerStyled>
    </>
  )
}

export default Teamfood
