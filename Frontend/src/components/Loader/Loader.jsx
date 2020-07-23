import React from 'react'
import Store from '../App/App.store'
import { AppBackgroundThemes } from '../App/App.themes'
import { LoaderStyled } from './Loader.style'

const Loader = () => {
  const store = Store.useStore()
  const fontcolor =
    AppBackgroundThemes[store.get('themeBackgroundId')].fontColor

  return <LoaderStyled color={fontcolor}>Ładowanie...</LoaderStyled>
}

export default Loader
