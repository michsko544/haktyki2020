import React, { useEffect } from 'react'
import { useState } from 'react'
import { Formik, Field } from 'formik'
import { FormStyled } from './Container/form.style'
import { Input, InputStyled, RadioGroupFormik } from '../../components/Inputs'
import {
  ButtonFormWrapper,
  default as ButtonBig,
} from '../../components/Button'

import Button from '@material-ui/core/Button'
import Loader from '../../components/Loader'
import ErrorMessage from '../../components/ErrorMessage'
import { useSnackbar } from 'notistack'
import { PhotoSelectionStyled } from './PhotoSelection/photo.selection.style'
import { PhotoSelectionContainer } from './PhotoSelection/photo.selection.container.style'
import { DoubleInputStyled } from './Container/double.input.style'
import Store from '../../components/App/App.store'
import { AppThemes } from '../../components/App/App.themes'
import { FoodKeywords } from './teamfood.keywords'
import usePhotoSearch from './../../API/unsplashAPI/usePhotoSearch'
import { TeamfoodDefaultImages } from './teamfood.default.images'
import { usePost } from './../../API'
import { AppBackgroundThemes } from './../../components/App/App.themes'
import { useHistory } from 'react-router-dom';
import { teamfoodFormValidationSchema } from './teamfood.form.validation.schema';
import { useResizer } from './../../utils/useResizer';

const TeamfoodForm = ({ errors, touched, isSubmitting, values, setValues }) => {
  const store = Store.useStore()
  const errorHandler = (name) => touched[name] && errors[name]
  const images = usePhotoSearch()
  const [photos, setPhotos] = useState(TeamfoodDefaultImages)
  const { enqueueSnackbar } = useSnackbar()
  const {
    onResize,
    imageProps,
    timeoutRef,
  } = useResizer('photos', photos.map(p => p.urls.raw), 350)

  const photoUrlBuilder = (photo, w, h, dpr) =>
    `${photo.urls.raw}&w=${w}&h=${h}&dpr=${dpr}&auto=format&fit=crop`

  useEffect(() => {
    images.setKeywords(['food'])
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize, true)
      clearTimeout(timeoutRef)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(values.restaurant.length > 0) {
      let title = values.restaurant.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
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
    enqueueSnackbar('Ładowanie nowych zdjęć ^_+')
    await images.search(6)
  }

  useEffect(() => {
    if (images.images.length === 6) {
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
      if (values.restaurant.toLowerCase().includes(word.match))
        matched.push(word.keyword)

      if (values.description.toLowerCase().includes(word.match))
        matched.push(word.keyword)
    }

    if (matched.length === 0) {
      console.log('Nothing matched, using every keyword')
      matched = [
        ...values.restaurant.split(' '),
        ...values.description.split(' '),
      ].filter((v) => v !== '')
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

  const photoUrl = (photo) =>
    photoUrlBuilder(photo, imageProps.w, imageProps.h, imageProps.dpr)

  return (
    <FormStyled>
      <div>
        <InputStyled>
          <Field
            component={Input}
            type="text"
            name="restaurant"
            label="Skąd?"
            placeholder="Nazwa miejsca"
            error={errorHandler('restaurant')}
          />
        </InputStyled>
        <DoubleInputStyled>
          <InputStyled>
            <Field
              component={Input}
              type="date"
              name="date"
              label="Kiedy?"
              placeholder="Dzisiaj"
              error={errorHandler('date')}
            />
          </InputStyled>
          <InputStyled>
            <Field
              component={Input}
              type="time"
              name="time"
              label="O której?"
              placeholder="17:00"
              error={errorHandler('time')}
            />
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
          {showLoaderIfLoading()}
          {showErrorIfError()}
          {photos.map((photo) => (
            <PhotoSelectionStyled
              className="photos"
              onClick={(e) => photoSelectionHandler(photo, e)}
              key={photo.id}
              selected={photo.selected}
              url={photoUrl(photo)}
              from={AppThemes[store.get('themeId')].from}
              to={AppThemes[store.get('themeId')].to}
            />
          ))}
          <p
            style={{
              textAlign: 'center',
              gridColumn: 'span 2',
              width: '100%',
              color:
                AppBackgroundThemes[store.get('themeBackgroundId')].fontColor,
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

const TeamfoodFormik = () => {
  const store = Store.useStore()
  const { enqueueSnackbar } = useSnackbar()
  const api = usePost('/orders/add-order')
  const history = useHistory()
  let [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!api.isLoading && api.response !== null && api.response.statusCode > 0) {
      console.log('Api Response:', api.response)
      if(!completed) {
        history.replace('/')
        setCompleted(true)
      }
    }
  }, [api.response, api.isLoading, history, completed])

  useEffect(() => {
    if (!api.isLoading && api.error !== null && api.error.code > 0) {
      console.warn('Api Error occured: ', api.error)
    }
  }, [api.error, api.isLoading])

  const transformRequest = (order) => {
    return {
      restaurant: order.restaurant,
      date: order.date,
      time: order.time,
      image: order.image,
      paymentForm: order.paymentForm,
      orderDetails: [
        {
          description: order.description,
          userId: store.get('userId'),
        },
      ],
    }
  }

  const initialValues = {
    restaurant: '',
    date: '',
    time: '',
    description: '',
    paymentForm: '',
    image: '',
  }

  const validationSchema = teamfoodFormValidationSchema

  const onSubmit = async (values, { setSubmitting }) => {
    console.log('Submitted values: ', values)
    console.log('Transformed request: ', transformRequest(values))
    setCompleted(false)
    enqueueSnackbar('Dodawanie twojego zamówienia （*＾-＾*）↗　')
    await api.sendData(transformRequest(values))
    setSubmitting(false)
  }

  return (
    <Formik {...{ initialValues, onSubmit, validationSchema }}>
      {TeamfoodForm}
    </Formik>
  )
}

export default TeamfoodFormik
