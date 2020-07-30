import React from 'react'
import Store from '../App/App.store'
import { AppBackgroundThemes } from '../App/App.themes'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { FormControlLabelStyled } from '../../views/Teamfood/form.control.label.style'

const RadioGroupFormik = ({
  field,
  form: { touched, errors },
  name,
  label,
  options,
  ...props
}) => {
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
        {touched[fieldName] && errors[fieldName] && (
          <React.Fragment>{errors[fieldName]}</React.Fragment>
        )}
      </RadioGroup>
    </FormControl>
  )
}

export default RadioGroupFormik
