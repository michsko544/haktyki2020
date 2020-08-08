import React from 'react'
import Header from './../../components/Header'
import { H1, H3, H4, HBold } from './../../components/Headings'

import CloseIcon from '@material-ui/icons/Close'

import { ContainerStyled } from './Container/container.style'

import SettingsFormik from './SettingsForm/settings.form'
import { GradientBoxStyled } from './GradientBox/gradientbox.style'
import { GradientBoxContainerStyled } from './GradientBox/gradientbox.container.style'
import { ThemeContainerStyled } from './ThemeContainer/theme.container.style'
import { IconLink } from './../../components/App/App.style'
import Store from './../../components/App/App.store'
import {
  AppThemes,
  AppBackgroundThemes,
} from './../../components/App/App.themes'
import { NotificationStyled } from './Notifications/notifications.style'
import firebase from './../../firebase'
import { ButtonFormWrapper, default as Button } from './../../components/Button'

/**
 * TODO
 * Populate data form API (user, blik, account)
 * ~ Grzegorz
 */
const Settings = () => {
  const store = Store.useStore()
  const setThemeId = store.set('themeId')
  const setBackgroundThemeId = store.set('themeBackgroundId')

  const gradientClick = (theme) => {
    setThemeId(theme.id)
    localStorage.setItem('themeId', theme.id)
  }

  const backgroundClick = (theme) => {
    setBackgroundThemeId(theme.id)
    localStorage.setItem('themeBackgroundId', theme.id)
  }

  const grantNotificationPermission = () => {
    const messaging = firebase.messaging()
    messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken()
      })
      .then((token) => {
        console.log('Token: ', token)
      })
      .catch((e) => {
        console.warn('Error: ', e)
      })

    messaging.onMessage((msg) => {
      console.log('Message: ', msg)
    })
  }

  const notificationGrantedElement = () => {
    if (Notification.permission === 'granted') {
      return <H3>Powiadomienia Włączone</H3>
    }

    return (
      <ButtonFormWrapper>
        <Button onClick={grantNotificationPermission} text="Włącz powiadomienia" />
      </ButtonFormWrapper>
    )
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
            <CloseIcon
              style={{
                color:
                  AppBackgroundThemes[store.get('themeBackgroundId')].fontColor,
              }}
            />
          </IconLink>
        </div>
      </Header>
      <ContainerStyled
        background={
          AppBackgroundThemes[store.get('themeBackgroundId')].alternate
        }
      >
        <NotificationStyled>
          <H4>Powiadomienia</H4>
          {notificationGrantedElement()}
        </NotificationStyled>
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
