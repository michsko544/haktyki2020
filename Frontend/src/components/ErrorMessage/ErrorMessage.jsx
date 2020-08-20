import React from 'react'
import PropTypes from 'prop-types'
import { ErrorStyled, Advice } from './ErrorMessage.style'
import { useColors } from '../../utils'

const ErrorMessage = ({ error, advice }) => {
  const { mode } = useColors()

  return (
    <>
      <ErrorStyled color={mode.fontColor}>Wystąpił błąd {':('}</ErrorStyled>
      {error && <ErrorStyled color={mode.fontColor}>{`Kod błędu: ${error}`}</ErrorStyled>}
      <Advice color={mode.fontColor}>{advice || 'Spróbuj ponownie później'}</Advice>
    </>
  )
}

ErrorMessage.propTypes = {
  error: PropTypes.string,
  advice: PropTypes.string,
}

export default ErrorMessage
