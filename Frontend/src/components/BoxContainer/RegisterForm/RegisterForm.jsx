import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Field, Formik } from 'formik'
import * as Yup from 'yup'
import Button from '../../Button'
import { ButtonFormWrapper } from '../../Button'
import { Input } from '../../Inputs'
import { InputStyled } from '../../Inputs'
import { FormWrapper } from '../LoginForm'
import { useSnackbar } from 'notistack'
import { useNPost } from './../../../API/ourAPI/useNPost'

const RegisterForm = ({ errors, touched, isSubmitting }) => {
  const errorHandler = (name) => touched[name] && errors[name]

  return (
    <FormWrapper>
      <Form>
        <InputStyled>
          <Field
            component={Input}
            type="email"
            name="user"
            label="E-mail"
            placeholder="XxTomekXx@gmail.com"
            error={errorHandler('user')}
            disabled={isSubmitting}
          />
        </InputStyled>
        <InputStyled>
          <Field
            component={Input}
            type="password"
            name="password"
            label="Hasło"
            placeholder="**************"
            error={errorHandler('password')}
            disabled={isSubmitting}
          />
        </InputStyled>
        <ButtonFormWrapper>
          <Button
            disabled={isSubmitting}
            text={isSubmitting ? 'Rejestrowanie...' : 'Rejestruj'}
            type="submit"
          />
        </ButtonFormWrapper>
      </Form>
    </FormWrapper>
  )
}

const RegisterFormik = () => {
  const { send: register } = useNPost('/register')
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  const initialValues = {
    user: '',
    password: '',
  }

  const transformValues = (values) => {
    return {
      login: values.user,
      password: values.password
    }
  }

  const handleError = (message) => {
    enqueueSnackbar(message, {
      variant: 'error',
      autoHideDuration: 2500,
    })
  }

  const onSubmit = async (values, { setSubmitting }) => {
    enqueueSnackbar('Rejestrowanie', {
      variant: 'info',
      autoHideDuration: 1500,
    })

    try {
      const response = await register(transformValues(values))

      if (response.statusCode === 201) {
        enqueueSnackbar('Zarejestrowano pomyślnie!', {
          variant: 'success',
          autoHideDuration: 3000,
        })

        setTimeout(() => { history.replace('/') }, 1500)
      }
    } catch (e) {
      console.warn('HTTP Error: ', e)
      if (e?.response?.status === 400) {
        handleError('Ten email jest już używany')
      } else {
        handleError('Ten error jest zbyt potężny')
      }
    }

    setSubmitting(false)
  }

  const validationSchema = Yup.object().shape({
    user: Yup.string()
      .email('Podaj prawidłowy adres email')
      .max(50, 'Email musi mieć maksimum 50 znaków')
      .required('Wypełnij to pole'),
    password: Yup.string()
      .min(8, 'Hasło musi mieć minimum 8 znaków')
      .max(30, 'Hasło musi mieć maksimum 30 znaki')
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
        'Hasło musi mieć conajmniej jedną małą literę, dużą oraz cyfrę'
      )
      .required('Wypełnij to pole'),
  })

  return (
    <Formik {...{ initialValues, onSubmit, validationSchema }}>
      {RegisterForm}
    </Formik>
  )
}

export default RegisterFormik
