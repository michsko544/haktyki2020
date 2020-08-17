import { useEffect } from 'react'
import Store from './App.store'
import { AppBackgroundThemes } from './App.themes'
import {
  setTokenIntoHeader,
  removeTokenFromHeader,
} from './../../API/ourAPI/API'
import firebase from './../../firebase'
import { usePost } from '../../API'

const AppInit = () => {
  const store = Store.useStore()
  const deviceRegister = usePost('/notifications/add-device')

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

  useEffect(() => {
    const asyncToken = async () => {
      if(Notification.permission === 'granted') {
        const messaging = firebase.messaging()
        const token = await messaging.getToken()
        store.set('deviceToken')(token)
        console.log('Setting Token:', token)

        messaging.onMessage((payload) => {
          console.log('New msg: ', payload)
        })
      }
    }
    asyncToken()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const asyncToken = async () => {
      const token = store.get('deviceToken')
      const user = store.get('userId')
      const isAuth = store.get('authToken').length > 0
      if(token && token !== null && token.length > 0 && user > 0 && isAuth) {
        await deviceRegister.sendData({
          userId: user,
          token: token
        })
      }
    }
    asyncToken()
  }, [store])

  useEffect(() => {
    window.document.body.style.background =
      AppBackgroundThemes[store.get('themeBackgroundId')].background
  }, [store])

  return null
}

export default AppInit
