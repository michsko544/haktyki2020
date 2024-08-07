import { useEffect } from 'react'
import Store from './App.store'
import { setTokenIntoHeader, removeTokenFromHeader } from './../../API/ourAPI/API'
import firebase from './../../firebase'
import { useSnackbar } from 'notistack'
import { usePost } from '../../API';
import { useColors } from './../../utils';

const AppInit = () => {
  const store = Store.useStore()
  const { send: device } = usePost('/notifications/add-device')
  const { enqueueSnackbar } = useSnackbar()
  const { mode } = useColors()

  useEffect(() => {
    const log = console.log
    const warn = console.warn
    const error = console.error

    console.log = (...args) => {
      console.debug('[LOG] ', ...args)
    }

    console.warn = (...args) => {
      console.debug('[WARN] ', ...args)
    }

    console.error = (...args) => {
      console.debug('[ERROR] ', ...args)
    }

    return () => {
      console.log = log
      console.warn = warn
      console.error = error
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * LocalStorage Auth Token check
   */
  useEffect(() => {
    const isTokenValid = (token) => {
      const accountB64 = token.split('.')[1]
      const account = JSON.parse(atob(accountB64))
      const unixtime = account.exp * 1000
      const date = new Date(unixtime)
      const now = new Date()
      const buffer = 1 //hour
      now.setHours(now.getHours() + buffer)

      return date > now
    }

    const storageAuth = localStorage.getItem('login') || null
    if (storageAuth === null) return

    if (typeof storageAuth === 'string') {
      const login = JSON.parse(storageAuth)

      if (!isTokenValid(login.authToken)) {
        enqueueSnackbar('Twoja sesja wygasła, zaloguj się ponownie', {
          variant: 'warning',
          autoHideDuration: 6000,
        })

        return
      }

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

            store.set('notifications')([payload.notification, ...store.get('notifications')])

            enqueueSnackbar(`${payload.notification.title} - ${payload.notification.body}`, {
              variant: 'success',
              autoHideDuration: 8000,
            })
          })
        }
      } catch (e) {
        console.warn('Firebase is not supported', e)
        enqueueSnackbar('Kolego, twoja przeglądarka jest za stara na nasz wspaniały program.', { variant: 'info', autoHideDuration: 8000 })
        enqueueSnackbar('Ściągnij sobie jakiegoś Chromka, Firefoxa czy innego Edga （〃｀ 3′〃）', { variant: 'info', autoHideDuration: 8000 })
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

      if (isTokenValid && isUserValid && isAuthenticated) {
        try {
          const response = await device({
            userId: user,
            token: token,
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
    window.document.body.style.background = mode.background
  }, [store, mode.background])

  return null
}

export default AppInit
