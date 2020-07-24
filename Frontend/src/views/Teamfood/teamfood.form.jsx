import React, { useEffect } from 'react'
import { useState } from 'react'
import * as Yup from 'yup'
import { withFormik, Form } from 'formik'
import { FormStyled } from './Container/form.style'
import { default as Input, InputStyled } from '../../components/Input'
import {
  ButtonFormWrapper,
  default as ButtonBig,
} from '../../components/Button'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'

import { useFetch } from '../../API'
import { PhotoSelectionStyled } from './PhotoSelection/photo.selection.style'
import { PhotoSelectionContainer } from './PhotoSelection/photo.selection.container.style'
import { DoubleInputStyled } from './Container/double.input.style'
import { FormControlLabelStyled } from './form.control.label.style'
import Store from '../../components/App/App.store'
import { AppBackgroundThemes } from '../../components/App/App.themes'

const TeamfoodForm = ({ errors, touched, isSubmitting }) => {
  const store = Store.useStore()
  const errorHandler = (name) => touched[name] && errors[name]
  const [photos, setPhotos] = useState([])
  const fetchPhotos = useFetch('/photos')

  useEffect(() => {
    fetchPhotos.getData()
  }, [])

  const photoSelectionHandler = (photo, event) => {
    let photocopy = [...fetchPhotos.response.pictures]
    photocopy = photocopy.map((p) => {
      p.selected = p.id === photo.id
      return p
    })

    setPhotos(photocopy)
  }

  const newPhotosHandler = (e) => {
    fetchPhotos.getData()
    console.log('Refresh photos: ', fetchPhotos)
  }

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
        <DoubleInputStyled>
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
        </DoubleInputStyled>
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
            <FormControlLabelStyled
              color={
                AppBackgroundThemes[store.get('themeBackgroundId')].fontColor
              }
              value="blik"
              control={<Radio />}
              label="BLIK"
            />
            <FormControlLabelStyled
              color={
                AppBackgroundThemes[store.get('themeBackgroundId')].fontColor
              }
              value="transfer"
              control={<Radio />}
              label="Przelew"
            />
            <FormControlLabelStyled
              color={
                AppBackgroundThemes[store.get('themeBackgroundId')].fontColor
              }
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
          {fetchPhotos.response &&
            fetchPhotos.response.pictures.map((photo) => (
              <PhotoSelectionStyled
                onClick={(e) => photoSelectionHandler(photo, e)}
                key={photo.id}
                selected={photo.selected}
                url={photo.url}
              />
            ))}
          <Button onClick={newPhotosHandler}>Wylosuj nowe</Button>
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
      console.log('Values: ', values)
      setSubmitting(false)
      resetForm()
    }, 500)
  },
})(TeamfoodForm)

export default TeamfoodFormik
