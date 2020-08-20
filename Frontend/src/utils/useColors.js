import Store from './../components/App/App.store'
import { AppThemes, AppBackgroundThemes } from './../components/App/App.themes'

export const useColors = () => {
  const store = Store.useStore()
  const theme = AppThemes[store.get('themeId')]
  const mode = AppBackgroundThemes[store.get('themeBackgroundId')]

  return {
    theme,
    mode,
  }
}
