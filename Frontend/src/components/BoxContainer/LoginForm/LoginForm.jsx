import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../../Button'
import { ButtonFormWrapper } from '../../Button'
import { Input } from '../../Inputs'
import { InputStyled } from '../../Inputs'
import { FormWrapper } from './'
import Store from './../../App/App.store'
import { usePost } from './../../../API'
import { Field } from 'formik'
import { useSnackbar } from 'notistack'

const LoginForm = ({ errors, touched, isSubmitting }) => {
  const errorHandler = (name) => touched[name] && errors[name]

  return (
    <FormWrapper>
      <Form autoComplete={'on'}>
        <InputStyled>
          <Field
            component={Input}
            disabled={isSubmitting}
            type="email"
            name="user"
            label="E-mail"
            placeholder="XxTomekXx@gmail.com"
            error={errorHandler('user')}
          />
        </InputStyled>
        <InputStyled>
          <Field
            component={Input}
            disabled={isSubmitting}
            type="password"
            name="password"
            label="Hasło"
            placeholder="**************"
            error={errorHandler('password')}
          />
        </InputStyled>
        <ButtonFormWrapper>
          <Button
            disabled={isSubmitting}
            text={isSubmitting ? 'Logowanie...' : 'Zaloguj'}
            type="submit"
          />
        </ButtonFormWrapper>
      </Form>
    </FormWrapper>
  )
}

const LoginFormik = () => {
  const store = Store.useStore()
  const history = useHistory()
  const loginAPI = usePost('/login')
  const { enqueueSnackbar } = useSnackbar()
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!loginAPI.isLoading && loginAPI.response && !completed) {
      if (loginAPI.response.statusCode === 200) {
        enqueueSnackbar('Pomyślnie zalogowano', {
          variant: 'success',
        })
      }
      store.set('authToken')(loginAPI.response.authToken)
      store.set('user')(loginAPI.response.fullname || '')
      store.set('userId')(loginAPI.response.userId)
      localStorage.setItem('login', JSON.stringify(loginAPI.response))
      const loginExpiry = new Date()
      loginExpiry.setDate(loginExpiry.getDate() + 1)
      localStorage.setItem('loginExpiry', loginExpiry.toISOString())
      setCompleted(true)
      if (!loginAPI.response.fullname) history.push('/greeter')
      else history.push('/')
    }
  }, [
    loginAPI.isLoading,
    loginAPI.response,
    history,
    completed,
    store,
    enqueueSnackbar,
  ])

  useEffect(() => {
    if (loginAPI.error) {
      if (loginAPI.error.code === -1) {
        enqueueSnackbar(loginAPI.error.text, {
          variant: 'error',
        })
      } else if (loginAPI.error.code === 401) {
        enqueueSnackbar('Niepoprawny email lub hasło', {
          variant: 'error',
        })
      } else if (loginAPI.error.code >= 400 && loginAPI.error.code <= 599) {
        enqueueSnackbar(loginAPI.error.text, {
          variant: 'error',
        })
      }
    }
  }, [loginAPI.error, enqueueSnackbar])

  const initialValues = {
    user: '',
    password: '',
  }

  const onSubmit = async (values, { setSubmitting }) => {
    setCompleted(false)
    enqueueSnackbar('Logowanie', {
      variant: 'info',
    })
    await loginAPI.sendData({ login: values.user, password: values.password })
    setSubmitting(false)
  }

  const validationSchema = Yup.object().shape({
    user: Yup.string()
      .email('Podaj poprawny email')
      .required('Wypełnij to pole'),
    password: Yup.string().required('Wypełnij to pole'),
  })

  return (
    <Formik {...{ initialValues, onSubmit, validationSchema }}>
      {LoginForm}
    </Formik>
  )
}

export default LoginFormik
