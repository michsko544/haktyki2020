import React from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../../Button'
import { ButtonFormWrapper } from '../../Button'
import { Input } from '../../Inputs'
import { InputStyled } from '../../Inputs'
import { FormWrapper } from './'
import Store from './../../App/App.store'
import { Field } from 'formik'
import { useSnackbar } from 'notistack'
import { usePost } from '../../../API'

const LoginForm = ({ errors, touched, isSubmitting, handleSubmit, ...args }) => {
  const errorHandler = (name) => touched[name] && errors[name]

  const handleEnter = (event) => {
    if (event.key === 'Enter') handleSubmit()
  }

  return (
    <FormWrapper>
      <Form autoComplete={'on'} onKeyPress={handleEnter}>
        <InputStyled>
          <Field
            component={Input}
            disabled={isSubmitting}
            type="email"
            name="email"
            label="E-mail"
            placeholder="XxTomekXx@gmail.com"
            error={errorHandler('email')}
            aria-label="email"
            aria-required="true"
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
            aria-label="password"
            aria-required="true"
          />
        </InputStyled>
        <ButtonFormWrapper>
          <Button disabled={isSubmitting} text={isSubmitting ? 'Logowanie...' : 'Zaloguj'} type="submit" aria-label="submit" aria-required="true" />
        </ButtonFormWrapper>
      </Form>
    </FormWrapper>
  )
}

const LoginFormik = () => {
  const store = Store.useStore()
  const history = useHistory()
  const { send: login } = usePost('/login')
  const { enqueueSnackbar } = useSnackbar()

  const initialValues = {
    email: '',
    password: '',
  }

  const setLocalStorage = (response) => {
    localStorage.setItem('login', JSON.stringify(response))
  }

  const transformValues = (values) => {
    return { login: values.email, password: values.password }
  }

  const handleError = (message) => {
    enqueueSnackbar(message, {
      variant: 'error',
      autoHideDuration: 2500,
    })
  }

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await login(transformValues(values))

      store.set('authToken')(response.authToken)
      store.set('user')(response.fullname || '')
      store.set('userId')(response.userId)

      setLocalStorage(response)

      if (!response.fullname) {
        history.push('/greeter')
      } else {
        history.push('/')
      }
    } catch (error) {
      if (error?.response?.status === -1) {
        handleError('Błąd wewnętrzny, odśwież apkę?')
      } else if (error?.response?.status === 401) {
        handleError('Niepoprawny email lub hasło ψ(._. )>')
      } else if (error?.response?.status >= 400 && error?.response?.status <= 599) {
        handleError('Błąd serwera, spróbuj ponownie później (ヘ･_･)ヘ┳━┳')
      } else {
        handleError('Bardzo mocne ojej! Spadliśmy właśnie z planszy (╯‵□′)╯︵┻━┻')
      }
    }

    setSubmitting(false)
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Podaj poprawny email').required('Wypełnij to pole'),
    password: Yup.string().required('Wypełnij to pole'),
  })

  return <Formik {...{ initialValues, onSubmit, validationSchema }}>{LoginForm}</Formik>
}

export default LoginFormik
