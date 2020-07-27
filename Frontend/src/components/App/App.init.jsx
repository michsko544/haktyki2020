import Store from './App.store'
import { useEffect } from 'react'

const AppInit = () => {
    const store = Store.useStore()

    /**
     * Init theme once from localStorage
     */
    useEffect(() => {
        const themeId = localStorage.getItem('themeId') || 0
        const themeBgId = localStorage.getItem('themeBackgroundId') || 0

        store.set('themeId')(themeId)
        store.set('themeBackgroundId')(themeBgId)
    }, [])

    return null
}

export default AppInit
