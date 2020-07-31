import React from 'react'
import PropTypes from 'prop-types'
import Store from '../../App/App.store'

import InputError from '../InputError'
import { AppBackgroundThemes } from '../../App/App.themes'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { FormControlLabelStyled } from '../../../views/Teamfood/form.control.label.style'

const RadioGroupFormik = ({ field, error, name, label, options, ...props }) => {
  const store = Store.useStore()
  const fieldName = name || field.name
  const fontcolor =
    AppBackgroundThemes[store.get('themeBackgroundId')].fontColor

  return (
    <FormControl component="fieldset" style={{ marginTop: 20 }}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup name={fieldName} {...field} {...props}>
        {options.map((option) => (
          <FormControlLabelStyled
            key={option.value}
            color={fontcolor}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
        <InputError>{error}</InputError>
      </RadioGroup>
    </FormControl>
  )
}

RadioGroupFormik.propTypes = {
  field: PropTypes.object,
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
}

export default RadioGroupFormik