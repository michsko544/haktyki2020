import { useEffect } from 'react'
import Store from './App.store'
import { AppBackgroundThemes } from './App.themes'
import {
  setTokenIntoHeader,
  removeTokenFromHeader,
} from './../../API/ourAPI/API'
import firebase from './../../firebase'
const AppInit = () => {
  const store = Store.useStore()

  /**
   * Init theme once from localStorage
   */
  useEffect(() => {
    const themeId = parseInt(localStorage.getItem('themeId') || 0)
    const themeBgId = parseInt(localStorage.getItem('themeBackgroundId') || 0)

    store.set('themeId')(themeId)
    store.set('themeBackgroundId')(themeBgId)

    const messaging = firebase.messaging()
    messaging.requestPermission().then(()=>{
      return messaging.getToken()
    }).then(token=>{
      console.log('Token : ',token)
    }).catch((err)=>{
      console.log(err);
      
    })
    messaging.onMessage((payload) => {
      console.log(payload)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.document.body.style.background =
      AppBackgroundThemes[store.get('themeBackgroundId')].background
  }, [store])

  useEffect(() => {
    const token = store.get('authToken')
    if (token.length > 0) {
      setTokenIntoHeader(token)
    } else {
      removeTokenFromHeader()
    }
  }, [store])

  return null
}

export default AppInit
