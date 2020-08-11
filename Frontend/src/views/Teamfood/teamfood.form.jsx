import React, { useEffect } from 'react'
import { useState } from 'react'
import * as Yup from 'yup'
import { withFormik, Field } from 'formik'
import { FormStyled } from './Container/form.style'
import { Input, InputStyled, RadioGroupFormik } from '../../components/Inputs'
import {
  ButtonFormWrapper,
  default as ButtonBig,
} from '../../components/Button'

import Button from '@material-ui/core/Button'
import Loader from '../../components/Loader'
import ErrorMessage from '../../components/ErrorMessage'

import { PhotoSelectionStyled } from './PhotoSelection/photo.selection.style'
import { PhotoSelectionContainer } from './PhotoSelection/photo.selection.container.style'
import { DoubleInputStyled } from './Container/double.input.style'
import Store from '../../components/App/App.store'
import { AppThemes } from '../../components/App/App.themes'
import { FoodKeywords } from './teamfood.keywords'
import usePhotoSearch from './../../API/unsplashAPI/usePhotoSearch'
import { TeamfoodDefaultImages } from './teamfood.default.images'

const TeamfoodForm = ({ errors, touched, isSubmitting, values }) => {
  const store = Store.useStore()
  const errorHandler = (name) => touched[name] && errors[name]
  const images = usePhotoSearch()
  const [photos, setPhotos] = useState(TeamfoodDefaultImages)

  useEffect(() => {
    images.setKeywords(['food'])
  }, [])

  const photoSelectionHandler = (photo) => {
    let photocopy = [...photos]
    photocopy = photocopy.map((p) => {
      p.selected = p.id === photo.id
      return p
    })

    setPhotos(photocopy)
  }

  const newPhotosHandler = async (e) => {
    await images.search(6)
  }

  useEffect(() => {
    if(images.images.length === 6) {
      console.log('New Images: ', images.images)
      setPhotos(images.images)
    }
  }, [images.images])

  const showLoaderIfLoading = () => images.isLoading && <Loader />

  const showErrorIfError = () =>
    images.error && (
      <ErrorMessage error={images.error.code} advice={images.error.text} />
    )

  const checkKeywords = () => {
    let matched = []

    for (let word of FoodKeywords) {
      if (values.what.toLowerCase().includes(word.match))
        matched.push(word.keyword)

      if (values.where.toLowerCase().includes(word.match))
        matched.push(word.keyword)
    }

    if (matched.length === 0) {
      console.log('Nothing matched, using every keyword')
      matched = [...values.what.split(' '), ...values.where.split(' ')].filter(
        (v) => v !== ''
      )
    }

    if (matched.length === 0) {
      console.log('Empty.')
      matched.push('dinner', 'food')
    }

    console.log('Matched keywords: ', matched)
    images.setKeywords(matched)
  }

  useEffect(checkKeywords, [values])

  useEffect(() => {
    console.log('Photos: ', photos.filter((i) => i.selected)[0])
  }, [photos])

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
              error={errorHandler('whenHour')}
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
        <Field
          name="payment"
          options={[
            { value: 'BLIK', label: 'BLIK' },
            { value: 'TRANSFER', label: 'Przelew' },
            { value: 'CASH', label: 'Gotówka' },
          ]}
          error={() => errorHandler('payment')}
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
          {showLoaderIfLoading()}
          {showErrorIfError()}
          {photos.map((photo) => (
            <PhotoSelectionStyled
              onClick={(e) => photoSelectionHandler(photo, e)}
              key={photo.id}
              selected={photo.selected}
              url={`${photo.urls.raw}&w=160&h=100`}
              from={AppThemes[store.get('themeId')].from}
              to={AppThemes[store.get('themeId')].to}
            />
          ))}
          <Button onClick={newPhotosHandler}>Wylosuj nowe</Button>
        </PhotoSelectionContainer>
      </div>
    </FormStyled>
  )
}

const TeamfoodFormik = () => {
  const TeamfoodWithFormik = withFormik({
    mapPropsToValues() {
      return {
        where: '',
        when: '',
        whenHour: '',
        what: '',
        payment: '',
        image: '',
      }
    },

    validationSchema: Yup.object().shape({
      where: Yup.string().required('Wypełnij to pole'),
      when: Yup.string().required('Wypełnij to pole'),
      whenHour: Yup.string().required('Wypełnij to pole'),
      what: Yup.string().required('Wypełnij to pole'),
      payment: Yup.string().required('Musisz zaznaczyć jedną z opcji'),
    }),

    handleSubmit(values, { resetForm, setSubmitting }) {
      //TODO

      setTimeout(() => {
        console.log('Values: ', values)
        setSubmitting(false)
        resetForm()
      }, 500)
    },
  })(TeamfoodForm)

  return <TeamfoodWithFormik />
}

export default TeamfoodFormik
