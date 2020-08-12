import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Button from '../../Button'
import { ButtonFormWrapper } from '../../Button'
import { Input } from '../../Inputs'
import { InputStyled } from '../../Inputs'
import { FormWrapper } from '../LoginForm'
import { usePost } from './../../../API'
import { Field } from 'formik'
import { useSnackbar } from 'notistack'

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
            label="E-Mail"
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
          <Button disabled={isSubmitting} text="Rejestruj" type="submit" />
        </ButtonFormWrapper>
      </Form>
    </FormWrapper>
  )
}

const RegisterFormik = () => {
  const registerAPI = usePost('/register')
  const history = useHistory()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    if (!registerAPI.isLoading && registerAPI.error) {
      if (registerAPI.error.code === -1) {
        enqueueSnackbar(registerAPI.error.text, {
          variant: 'error',
        })
      }
      if (registerAPI.error.code >= 400 && registerAPI.error.code <= 599) {
        enqueueSnackbar(registerAPI.error.text, {
          variant: 'error',
        })
      }
    }
  }, [registerAPI.error])

  useEffect(() => {
    if (!registerAPI.isLoading && registerAPI.response?.statusCode === 201) {
      enqueueSnackbar('Zarejestrowano pomyślnie!', {
        variant: 'success',
      })
      setTimeout(() => {
        history.replace('/')
      }, 1500)
    }
  }, [registerAPI.response])

  const initialValues = {
    user: '',
    password: '',
  }

  const onSubmit = async (values, { setSubmitting }) => {
    await registerAPI.sendData({
      login: values.user,
      password: values.password,
    })
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
    <>
      <Formik {...{ initialValues, onSubmit, validationSchema }}>
        {RegisterForm}
      </Formik>
    </>
  )
}

export default RegisterFormik
