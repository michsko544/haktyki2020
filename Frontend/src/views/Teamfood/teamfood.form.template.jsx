import React, { useEffect, useState } from 'react'
import { Field } from 'formik'
import { useSnackbar } from 'notistack'
import Button from '@material-ui/core/Button'

import usePhotoSearch from './../../API/unsplashAPI/usePhotoSearch'

import { Input, InputStyled, RadioGroupFormik } from '../../components/Inputs'
import { ButtonFormWrapper, default as ButtonBig } from '../../components/Button'

import PhotoSelection from './PhotoSelection/photo.selection'
import { PhotoSelectionContainer } from './PhotoSelection/photo.selection.container.style'

import { FormStyled } from './Container/form.style'
import { DoubleInputStyled } from './Container/double.input.style'

import { FoodKeywords } from './teamfood.keywords'
import { TeamfoodDefaultImages } from './teamfood.default.images'
import { useColors } from '../../utils'

export const TeamfoodFormTemplate = ({ errors, touched, isSubmitting, values, setValues }) => {
  const { mode } = useColors()
  const errorHandler = (name) => touched[name] && errors[name]
  const images = usePhotoSearch()
  const [photos, setPhotos] = useState(TeamfoodDefaultImages)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    images.setKeywords(['food'])
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (values.restaurant.length > 0) {
      let title = values.restaurant
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
      document.title = `${title} | TeamFood`
    } else {
      document.title = 'Nowe Zamówienie | TeamFood'
    }
  }, [values])

  const photoSelectionHandler = (photo) => {
    let photocopy = [...photos]
    photocopy = photocopy.map((p) => {
      p.selected = p.id === photo.id
      return p
    })

    console.log('Selected Photo: ', photo.urls.raw)
    setValues({ ...values, image: photo.urls.raw })
    setPhotos(photocopy)
  }

  const newPhotosHandler = async (e) => {
    enqueueSnackbar('Ładowanie nowych zdjęć ^_+', {
      variant: 'info',
    })
    await images.search(6)
  }

  useEffect(() => {
    if (images.images.length === 6) {
      console.log('New Images: ', images.images)
      setPhotos(images.images)
    }
  }, [images.images])

  const checkKeywords = () => {
    let matched = []

    for (let word of FoodKeywords) {
      if (values.restaurant.toLowerCase().includes(word.match)) matched.push(word.keyword)

      if (values.description.toLowerCase().includes(word.match)) matched.push(word.keyword)
    }

    if (matched.length === 0) {
      console.log('Nothing matched, using every keyword')
      matched = [...values.restaurant.split(' '), ...values.description.split(' ')].filter((v) => v !== '')
    }

    if (matched.length === 0) {
      console.log('Empty.')
      matched.push('fastfood', 'food')
    }

    console.log('Matched keywords: ', matched)
    images.setKeywords(matched)
  }

  useEffect(checkKeywords, [values])

  return (
    <FormStyled>
      <div>
        <InputStyled>
          <Field component={Input} type="text" name="restaurant" label="Skąd?" placeholder="Nazwa miejsca" error={errorHandler('restaurant')} />
        </InputStyled>
        <DoubleInputStyled>
          <InputStyled>
            <Field component={Input} type="date" name="date" label="Kiedy?" placeholder="Dzisiaj" error={errorHandler('date')} />
          </InputStyled>
          <InputStyled>
            <Field component={Input} type="time" name="time" label="O której?" placeholder="17:00" error={errorHandler('time')} />
          </InputStyled>
        </DoubleInputStyled>
        <InputStyled>
          <Field
            component={Input}
            type="text"
            name="description"
            label="Co zamawiasz?"
            placeholder="Twoje zamówienie"
            error={errorHandler('description')}
          />
        </InputStyled>
        <Field
          name="paymentForm"
          options={[
            { value: 'BLIK', label: 'BLIK' },
            { value: 'TRANSFER', label: 'Przelew' },
            { value: 'CASH', label: 'Gotówka' },
          ]}
          error={errorHandler('paymentForm')}
          label={'Forma Płatności'}
          component={RadioGroupFormik}
          aria-label="payment"
        />
        <ButtonFormWrapper>
          <ButtonBig disabled={isSubmitting} text="Dodaj" type="submit" />
        </ButtonFormWrapper>
      </div>
      <div>
        <PhotoSelectionContainer>
          {photos.map((photo) => (
            <PhotoSelection key={photo.id} onClick={(e) => photoSelectionHandler(photo, e)} photo={photo} />
          ))}
          <p
            style={{
              textAlign: 'center',
              gridColumn: 'span 2',
              width: '100%',
              color: mode.fontColor,
            }}
          >
            {errorHandler('image')}
          </p>
          <Button onClick={newPhotosHandler}>Wylosuj nowe</Button>
        </PhotoSelectionContainer>
      </div>
    </FormStyled>
  )
}

export default TeamfoodFormTemplate
