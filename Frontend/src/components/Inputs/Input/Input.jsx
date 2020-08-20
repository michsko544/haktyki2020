import React from 'react'
import PropTypes from 'prop-types'
import { FieldStyled, TextareaStyled, Label, Underline } from './'
import InputError from '../InputError'
import { useColors } from '../../../utils'

const Input = ({ label, error, name, componentType, field, ...props }) => {
  const { theme, mode } = useColors()

  const selectComponentType = () => {
    switch (componentType) {
      case 'textarea':
        return <TextareaStyled autoComplete="off" id={name} name={name} color={mode.fontColor} {...field} {...props} />
      default:
        return <FieldStyled autoComplete="off" id={name} component={componentType} name={name} color={mode.fontColor} {...field} {...props} />
    }
  }

  return (
    <>
      <Label htmlFor={name} firstcolor={theme.from} secondcolor={theme.to}>
        {label}
      </Label>
      <Underline firstcolor={theme.from} secondcolor={theme.to}>
        {selectComponentType()}
      </Underline>
      <InputError error={error} color={mode.fontColor} />
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
