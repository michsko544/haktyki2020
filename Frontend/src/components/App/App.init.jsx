import { useEffect } from 'react'
import Store from './App.store'
import { AppBackgroundThemes } from './App.themes'
import { setTokenIntoHeader, removeTokenFromHeader } from './../../API/ourAPI/API'

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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.document.body.style.background =
      AppBackgroundThemes[store.get('themeBackgroundId')].background
  }, [store])

  useEffect(() => {
    const token = store.get('authToken')
    if(token.length > 0) {
      setTokenIntoHeader(token)
    } else {
      removeTokenFromHeader()
    }
    
  }, [store])

  return null
}

export default AppInit
