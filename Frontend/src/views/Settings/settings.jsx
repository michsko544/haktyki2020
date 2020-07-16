import React from 'react'
import Header from './../../components/Header'
import H1 from './../../components/H1'
import CloseIcon from '@material-ui/icons/Close'
import H4 from './../../components/H4'
import { ContainerStyled } from './Container/container.style'
import HBold from '../../components/HeadingBold'
import SettingsFormik from './SettingsForm/settings.form'
import { GradientBoxStyled } from './GradientBox/gradientbox.style'
import { GradientBoxContainerStyled } from './GradientBox/gradientbox.container.style'
import { ThemeContainerStyled } from './ThemeContainer/theme.container.style'
import { IconLink } from './../../components/App/App.style'

/**
 * TODO
 * Add store for user settings locally
 * Populate data form API (user, blik, account)
 * Settings persistence
 * ~ Grzegorz
 */
const Settings = () => {
  const gradientClick = (event) => {
    console.log('Hello there', event)
  }
  return (
    <>
      <Header>
        <H1 color="#F0F0F0">
          <HBold>Ustawienia</HBold>
        </H1>
        <H4 color="#F0F0F0">Po prostu zmień swoje dane.</H4>
        <div className="icons">
          <IconLink to="/">
            <CloseIcon />
          </IconLink>
        </div>
      </Header>
      <ContainerStyled>
        <ThemeContainerStyled>
          <div>
            <H4 color="#F0F0F0">Motyw Aplikacji</H4>
            <GradientBoxContainerStyled>
              <GradientBoxStyled
                from="#36B7FF"
                to="#A736FF"
                onClick={gradientClick}
              />
              <GradientBoxStyled
                from="#46D3FF"
                to="#3687FF"
                onClick={gradientClick}
              />
              <GradientBoxStyled
                from="#20B0E8"
                to="#20DCE8"
                onClick={gradientClick}
              />
              <GradientBoxStyled
                from="#20B0E8"
                to="#20E888"
                onClick={gradientClick}
              />
              <GradientBoxStyled
                from="#46D3FF"
                to="#3687FF"
                onClick={gradientClick}
              />
            </GradientBoxContainerStyled>
          </div>
          <div>
            <H4 color="#F0F0F0">Kolor Tła</H4>
            <GradientBoxContainerStyled>
              <GradientBoxStyled
                from="#FFFFFF"
                to="#D0D0D0"
                onClick={gradientClick}
              />
              <GradientBoxStyled
                from="#505050"
                to="#292929"
                onClick={gradientClick}
              />
            </GradientBoxContainerStyled>
          </div>
        </ThemeContainerStyled>
        <SettingsFormik />
      </ContainerStyled>
    </>
  )
}

export default Settings
