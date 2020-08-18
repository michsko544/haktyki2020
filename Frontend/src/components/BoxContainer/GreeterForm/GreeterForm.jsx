import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Button from '../../Button'
import { ButtonFormWrapper } from '../../Button'
import { Input } from '../../Inputs'
import { InputStyled } from '../../Inputs'
import { FormWrapper } from '../LoginForm'
import { FormContainer } from '../BoxContainer.style'
import { usePost } from './../../../API'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import Store from './../../App/App.store'

const GreeterForm = ({ errors, touched, isSubmitting }) => {
  const errorHandler = (name) => touched[name] && errors[name]

  return (
    <FormContainer>
      <FormWrapper>
        <Form>
          <InputStyled>
            <Field
              component={Input}
              type="text"
              name="name"
              label="Twoje imię i nazwisko"
              placeholder="Jan Nowak"
              error={errorHandler('name')}
              style={{ textTransform: 'capitalize' }}
              disabled={isSubmitting}
            />
          </InputStyled>
          <ButtonFormWrapper>
            <Button
              disabled={isSubmitting}
              text={isSubmitting ? 'Zapisywanie...' : 'Przejdź do aplikacji'}
              type="submit"
            />
          </ButtonFormWrapper>
        </Form>
      </FormWrapper>
    </FormContainer>
  )
}

const GreeterFormik = () => {
  const api = usePost('/users/my-fullname')
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const store = Store.useStore()
  const [completed, setCompleted] = useState(false)

  const transformRequest = (values) => {
    const r = {
      fullname: values.name
        .split(' ')
        .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
        .join(' '),
    }

    return r
  }

  const initialValues = {
    name: '',
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]*$/,
        'Pole nie może zawierać znaków specjalnych'
      )
      .matches(
        /^[A-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+\s+[A-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+ ?$/,
        'Podaj imię i nazwisko'
      )
      .min(3, 'Pole musi mieć minimum 3 znaki')
      .max(50, 'Pole musi mieć maximum 50 znaków')
      .required('Wypełnij to pole'),
  })

  useEffect(() => {
    if (
      !api.isLoading &&
      api.response !== null &&
      api.response.statusCode === 200 &&
      !completed
    ) {
      console.log('Loaded: ', api.response)
      history.push('/')
      setCompleted(true)
    }
  }, [api.response, api.isLoading, history, completed])

  const onSubmit = async (values, { setSubmitting }) => {
    setCompleted(false)
    enqueueSnackbar('Zapisywanie danych 🤞', {
      variant: 'info',
    })
    await api.sendData(transformRequest(values))
    store.set('user')(values.name)
    setSubmitting(false)
  }

  return (
    <Formik {...{ initialValues, validationSchema, onSubmit }}>
      {GreeterForm}
    </Formik>
  )
}

export default GreeterFormik
