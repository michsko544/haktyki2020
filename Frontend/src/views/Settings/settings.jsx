import React, { useState, useEffect } from 'react'
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
import { AppThemes, AppBackgroundThemes } from './../../components/App/App.themes'
import { NotificationStyled } from './Notifications/notifications.style'
import firebase from './../../firebase'
import { ButtonFormWrapper, default as Button } from './../../components/Button'
import { useColors } from '../../utils'

const Settings = () => {
  const store = Store.useStore()
  const { mode } = useColors()
  const setThemeId = store.set('themeId')
  const setBackgroundThemeId = store.set('themeBackgroundId')
  const [isNotificationGranted, setIsNotificationGranted] = useState(false)

  useEffect(() => {
    setIsNotificationGranted(Notification.permission === 'granted')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
        setIsNotificationGranted(true)
        Location.reload()
      })
      .catch((e) => {
        console.warn('Error: ', e)
      })
  }

  const notificationGrantedElement = () => {
    if (isNotificationGranted) {
      return <H3>Powiadomienia Włączone</H3>
    }

    return (
      <ButtonFormWrapper>
        <Button onClick={grantNotificationPermission} text="Włącz powiadomienia" />
      </ButtonFormWrapper>
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('login')
    store.set('authToken')('')
  }

  const logoutButton = () => (
    <ButtonFormWrapper>
      <Button onClick={handleLogout} text="Wyloguj" />
    </ButtonFormWrapper>
  )

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
                color: mode.fontColor,
              }}
            />
          </IconLink>
        </div>
      </Header>
      <ContainerStyled background={mode.alternate}>
        <NotificationStyled style={{ marginBottom: 20 }}>
          <H4>Powiadomienia</H4>
          {notificationGrantedElement()}
          {logoutButton()}
        </NotificationStyled>
        <ThemeContainerStyled>
          <div>
            <H4>Motyw Aplikacji</H4>
            <GradientBoxContainerStyled>
              {AppThemes.map((theme) => (
                <GradientBoxStyled key={theme.id} from={theme.from} to={theme.to} onClick={(e) => gradientClick(theme, e)} />
              ))}
            </GradientBoxContainerStyled>
          </div>
          <div>
            <H4>Kolor Tła</H4>
            <GradientBoxContainerStyled>
              {AppBackgroundThemes.map((theme) => (
                <GradientBoxStyled key={theme.id} from={theme.from} to={theme.to} onClick={(e) => backgroundClick(theme, e)} />
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
