import React from 'react'
import * as Yup from 'yup'
import { withFormik, Form } from 'formik'
import { FormStyled } from './Container/form.style'
import { default as Input, InputStyled } from './../../components/Input'
import { ButtonFormWrapper, default as ButtonBig } from './../../components/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import PhotoSelection from './PhotoSelection/photo.selection'
import { PhotoSelectionContainer } from './PhotoSelection/photo.selection.container.style'
import Button from '@material-ui/core/Button';

const TeamfoodForm = ({ errors, touched, isSubmitting }) => {
  const errorHandler = (name) => touched[name] && errors[name]

  return (
    <FormStyled>
      <div>
        <InputStyled>
          <Input
            type="text"
            name="where"
            label="Skąd?"
            placeholder="Krowa Zdrowa"
            error={errorHandler('where')}
          />
        </InputStyled>
        <InputStyled>
          <Input
            type="date"
            name="when"
            label="Kiedy?"
            placeholder="Dzisiaj"
            error={errorHandler('when')}
          />
        </InputStyled>
        <InputStyled>
          <Input
            type="time"
            name="whenHour"
            label="O której?"
            placeholder="17:00"
            error={errorHandler('when-hour')}
          />
        </InputStyled>
        <InputStyled>
          <Input
            type="text"
            name="what"
            label="Co zamawiasz?"
            placeholder="Podwójny Krowa Burger"
            error={errorHandler('what')}
          />
        </InputStyled>
        <FormControl component="fieldset">
          <FormLabel component="legend">Forma Płatności</FormLabel>
          <RadioGroup aria-label="gender" name="gender1">
            <FormControlLabel value="blik" control={<Radio />} label="BLIK" />
            <FormControlLabel
              value="transfer"
              control={<Radio />}
              label="Przelew"
            />
            <FormControlLabel
              value="cash"
              control={<Radio />}
              label="Gotówka"
            />
          </RadioGroup>
        </FormControl>
        <ButtonFormWrapper>
          <ButtonBig disabled={isSubmitting} text="Dodaj" type="submit" />
        </ButtonFormWrapper>
      </div>
      <div>
        <PhotoSelectionContainer>
        <PhotoSelection/>
        <PhotoSelection/>
        <PhotoSelection/>
        <PhotoSelection/>
        <PhotoSelection/>
        <PhotoSelection/>
        <Button>Wylosuj nowe</Button>
        </PhotoSelectionContainer>
      </div>
    </FormStyled>
  )
}

const TeamfoodFormik = withFormik({
  mapPropsToValues() {
    return {
      where: '',
      when: '',
      whenHour: '',
      what: '',
    }
  },

  handleSubmit(values, { resetForm, setSubmitting }) {
    setTimeout(() => {
      console.log(values)
      setSubmitting(false)
      resetForm()
    }, 500)
  },
})(TeamfoodForm)

export default TeamfoodFormik
