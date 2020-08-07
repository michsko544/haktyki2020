import React from 'react'
import Store from '../App/App.store'
import { AppBackgroundThemes } from '../App/App.themes'
import { LoaderStyled } from './Loader.style'

const Loader = () => {
  const [state, setState] = React.useState(3)

  React.useEffect(() => {
    const timeout = setTimeout(incrementState, 600)
    return () => {
      clearTimeout(timeout)
    }
  }, [state]) // eslint-disable-line react-hooks/exhaustive-deps

  const incrementState = () => {
    if (state === 5) setState(1)
    else setState(state + 1)
  }

  const handleDisplayDots = () => {
    switch (state) {
      case 1:
        return '.'
      case 2:
        return '..'
      case 3:
        return '...'
      case 4:
        return '....'
      case 5:
        return '.....'
      default:
        return '...'
    }
  }

  const store = Store.useStore()
  const fontcolor =
    AppBackgroundThemes[store.get('themeBackgroundId')].fontColor

  return (
    <LoaderStyled color={fontcolor}>
      Ładowanie{handleDisplayDots()}
    </LoaderStyled>
  )
}

export default Loader
