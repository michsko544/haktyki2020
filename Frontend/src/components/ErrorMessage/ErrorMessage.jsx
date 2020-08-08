import React from 'react'
import PropTypes from 'prop-types'
import Store from '../App/App.store'
import { AppBackgroundThemes } from '../App/App.themes'
import { ErrorStyled, Advice } from './ErrorMessage.style'

const ErrorMessage = ({ error, advice }) => {
  const store = Store.useStore()
  const fontcolor =
    AppBackgroundThemes[store.get('themeBackgroundId')].fontColor

  return (
    <>
      <ErrorStyled color={fontcolor}>Wystąpił błąd {':('}</ErrorStyled>
      {error && (
        <ErrorStyled color={fontcolor}>{`Kod błędu: ${error}`}</ErrorStyled>
      )}
      <Advice color={fontcolor}>{advice || 'Spróbuj ponownie później'}</Advice>
    </>
  )
}

ErrorMessage.propTypes = {
  error: PropTypes.string,
  advice: PropTypes.string,
}

export default ErrorMessage
