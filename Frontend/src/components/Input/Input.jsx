import React from 'react'
import PropTypes from 'prop-types'
import Store from './../App/App.store'
import { AppBackgroundThemes, AppThemes } from './../App/App.themes'
import { FieldStyled, Label, ErrorStyled, Underline } from './'

const Input = ({ label, error, name ...props }) => {
  const store = Store.useStore()

  return (
    <>
      <Label htmlFor={name} firstcolor={AppThemes[store.get('themeId')].from} secondcolor={AppThemes[store.get('themeId')].to}>
        {label}
      </Label>
      <Underline firstcolor={AppThemes[store.get('themeId')].from} secondcolor={AppThemes[store.get('themeId')].to}>
        <FieldStyled
          autoComplete="off"
          name={name}
          id={name}
          color={AppBackgroundThemes[store.get('themeBackgroundId')].fontColor}
          {...props}
        />
      </Underline>
      <Error error={error} color={AppBackgroundThemes[store.get('themeBackgroundId')].fontColor} />
    </>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  as: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
}

const Error = ({ error, color }) => {
  return <ErrorStyled color={color}>{error}</ErrorStyled>
}

Error.propTypes = {
  error: PropTypes.string,
  isDarkMode: PropTypes.bool,
}

export default Input
