import { useEffect } from 'react'
import Store from './App.store'
import { AppBackgroundThemes } from './App.themes'

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

  return null
}

export default AppInit
