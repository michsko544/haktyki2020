import { useEffect } from 'react'
import Store from './App.store'
import { AppBackgroundThemes } from './App.themes'
import {
  setTokenIntoHeader,
  removeTokenFromHeader,
} from './../../API/ourAPI/API'
import firebase from './../../firebase'
import { useSnackbar } from 'notistack'
import { useNPost } from './../../API/ourAPI/useNPost';

const AppInit = () => {
  const store = Store.useStore()
  const { send: device } = useNPost('/notifications/add-device')
  const { enqueueSnackbar } = useSnackbar()

  /**
   * LocalStorage Auth Token check
   */
  useEffect(() => {
    const loginExpiry = localStorage.getItem('loginExpiry') || null
    if (loginExpiry === null) return

    const loginDate = new Date(loginExpiry)

    if (loginDate < new Date()) {
      console.debug('This token is dead boi')

      localStorage.removeItem('loginExpiry')
      localStorage.removeItem('login')

      enqueueSnackbar('Twoja sesja wygasła, zaloguj się ponownie', {
        variant: 'warning',
        autoHideDuration: 6000,
      })

      return
    }

    const storageAuth = localStorage.getItem('login') || null
    if (storageAuth === null) return

    if (typeof storageAuth === 'string') {
      const login = JSON.parse(storageAuth)
     
      store.set('authToken')(login.authToken)
      store.set('user')(login.fullname || '')
      store.set('userId')(login.userId)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Auth Token Injection
   */
  useEffect(() => {
    const token = store.get('authToken')
    if (token.length > 0) {
      setTokenIntoHeader(token)
    } else {
      removeTokenFromHeader()
    }
  }, [store])

  /**
   * Init theme once from localStorage
   */
  useEffect(() => {
    const themeId = parseInt(localStorage.getItem('themeId') || 0)
    const themeBgId = parseInt(localStorage.getItem('themeBackgroundId') || 0)

    store.set('themeId')(themeId)
    store.set('themeBackgroundId')(themeBgId)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Setup Firebase
   */
  useEffect(() => {
    const asyncToken = async () => {
      try {
        if (Notification.permission === 'granted') {
          const messaging = firebase.messaging()
          const token = await messaging.getToken()

          console.debug('Setting Token:', token)
          store.set('deviceToken')(token)

          messaging.onMessage((payload) => {
            console.debug(payload)

            store.set('notifications')([
              payload.notification,
              ...store.get('notifications'),
            ])
            
            enqueueSnackbar(
              `${payload.notification.title} - ${payload.notification.body}`,
              {
                variant: 'success',
                autoHideDuration: 8000,
              }
            )
          })
        }
      } catch (e) {
        console.warn('Firebase is not supported', e)
        enqueueSnackbar(
          'Kolego, twoja przeglądarka jest za stara na nasz wspaniały program.',
          { variant: 'info', autoHideDuration: 8000 }
        )
        enqueueSnackbar(
          'Ściągnij sobie jakiegoś Chromka, Firefoxa czy innego Edga （〃｀ 3′〃）',
          { variant: 'info', autoHideDuration: 8000 }
        )
      }
    }

    asyncToken()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Add Device to Server
   */
  useEffect(() => {
    const asyncToken = async () => {
      const token = store.get('deviceToken')
      const user = store.get('userId')
      const isUserValid = user > 0
      const isTokenValid = token && token !== null && token.length > 0
      const isAuthenticated = store.get('authToken').length > 0

      if (
        isTokenValid &&
        isUserValid &&
        isAuthenticated
      ) {
        try {
          const response = await device({
            userId: user,
            token: token
          })

          console.log(response)
        } catch (error) {
          console.warn('Failed to add device', error)
        }
      }
    }

    asyncToken()
  }, [store, device])

  /**
   * Style body background
   */
  useEffect(() => {
    window.document.body.style.background =
      AppBackgroundThemes[store.get('themeBackgroundId')].background
  }, [store])

  return null
}

export default AppInit
