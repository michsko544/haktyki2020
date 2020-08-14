import React from 'react'
import PropTypes from 'prop-types'
import Store from '../../App/App.store'
import { AppBackgroundThemes, AppThemes } from '../../App/App.themes'
import { FieldStyled, TextareaStyled, Label, Underline } from './'
import InputError from '../InputError'

const Input = ({ label, error, name, componentType, field, ...props }) => {
  const store = Store.useStore()

  const selectComponentType = () => {
    switch (componentType) {
      case 'textarea':
        return (
          <TextareaStyled
            autoComplete="off"
            id={name}
            name={name}
            color={
              AppBackgroundThemes[store.get('themeBackgroundId')].fontColor
            }
            {...field}
            {...props}
          />
        )
      default:
        return (
          <FieldStyled
            autoComplete="off"
            id={name}
            component={componentType}
            name={name}
            color={
              AppBackgroundThemes[store.get('themeBackgroundId')].fontColor
            }
            {...field}
            {...props}
          />
        )
    }
  }

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
        {selectComponentType()}
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
  componentType: PropTypes.string,
  label: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default Input
