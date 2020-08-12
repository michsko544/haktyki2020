import React from 'react'
import PropTypes from 'prop-types'
import Store from '../../App/App.store'
import { AppBackgroundThemes, AppThemes } from '../../App/App.themes'
import { FieldStyled, Label, Underline } from './'
import InputError from '../InputError'

const Input = ({ label, error, name, children, field, ...props }) => {
  const store = Store.useStore()

  return (
    <>
      <Label
        htmlFor={name}
        firstcolor={AppThemes[store.get('themeId')].from}
        secondcolor={AppThemes[store.get('themeId')].to}
      >
        {label}
      </Label>
      <Underline
        firstcolor={AppThemes[store.get('themeId')].from}
        secondcolor={AppThemes[store.get('themeId')].to}
      >
        <FieldStyled
          autoComplete="off"
          id={name}
          color={AppBackgroundThemes[store.get('themeBackgroundId')].fontColor}
          {...field}
          {...props}
        />
      </Underline>
      <InputError
        error={error}
        color={AppBackgroundThemes[store.get('themeBackgroundId')].fontColor}
      />
    </>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  component: PropTypes.string,
  label: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default Input
