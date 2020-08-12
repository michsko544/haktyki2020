import React, { useEffect } from 'react'
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
      <Form>
        <InputStyled>
          <Field
            component={Input}
            disabled={isSubmitting}
            type="email"
            name="user"
            label="eMail"
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
          <Button disabled={isSubmitting} text="Zaloguj" type="submit" />
        </ButtonFormWrapper>
      </Form>
    </FormWrapper>
  )
}

const LoginFormik = () => {
  const store = Store.useStore()
  const loginAPI = usePost('/login')
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    console.log('LoginEffect: ', loginAPI.response)
    if(loginAPI.response.authToken && loginAPI.response.fullname && loginAPI.response.userId) {
      store.set('authToken')(loginAPI.response.authToken)
      store.set('user')(loginAPI.response.fullname)
      store.set('userId')(loginAPI.response.userId)

    }
  }, [loginAPI.response])

  useEffect(() => {
    if (loginAPI.error.code >= 400 && loginAPI.error.code <= 599) {
      console.log('ErrorEffect: ', loginAPI.error)
      enqueueSnackbar('Spróbuj jeszcze raz', {
        variant: 'error',
      })
    }
  }, [loginAPI.error, enqueueSnackbar])

  const initialValues = {
    user: '',
    password: '',
  }

  const onSubmit = async (values, { setSubmitting }) => {
    enqueueSnackbar('Logowanie', {
      variant: 'info'
    })
    console.log('Submitted vals: ', values)
    await loginAPI.sendData(values)
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
