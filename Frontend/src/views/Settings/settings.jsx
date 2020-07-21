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
import Store from './../../components/App/App.store'
import { AppThemes, AppBackgroundThemes } from './../../components/App/App.themes'

/**
 * TODO
 * Add store for user settings locally
 * Populate data form API (user, blik, account)
 * Settings persistence
 * ~ Grzegorz
 */
const Settings = () => {
  const store = Store.useStore()
  const setThemeId = store.set('themeId')
  const setBackgroundThemeId = store.set('themeBackgroundId')

  const gradientClick = (theme, event) => {
    setThemeId(theme.id)
  }

  const backgroundClick=(theme, event) => {
    setBackgroundThemeId(theme.id)
  }

  return (
    <>
      <Header>
        <H1>
          <HBold>Ustawienia</HBold>
        </H1>
        <H4>Po prostu zmień swoje dane.</H4>
        <div className="icons">
          <IconLink to="/">
            <CloseIcon style={{ color: AppBackgroundThemes[store.get('themeBackgroundId')].fontColor }} />
          </IconLink>
        </div>
      </Header>
      <ContainerStyled background={AppBackgroundThemes[store.get('themeBackgroundId')].alternate}>
        <ThemeContainerStyled>
          <div>
            <H4>Motyw Aplikacji</H4>
            <GradientBoxContainerStyled>
              {AppThemes.map((theme) => (
                <GradientBoxStyled
                  key={theme.id}
                  from={theme.from}
                  to={theme.to}
                  onClick={(e) => gradientClick(theme, e)}
                />
              ))}
            </GradientBoxContainerStyled>
          </div>
          <div>
            <H4>Kolor Tła</H4>
            <GradientBoxContainerStyled>
              {AppBackgroundThemes.map((theme) => (
                <GradientBoxStyled
                  key={theme.id}
                  from={theme.from}
                  to={theme.to}
                  onClick={(e) => backgroundClick(theme, e)}
              />
              ))}
            </GradientBoxContainerStyled>
          </div>
        </ThemeContainerStyled>
        <SettingsFormik />
      </ContainerStyled>
    </>
  )
}

export default Settings
