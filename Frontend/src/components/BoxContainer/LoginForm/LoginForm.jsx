import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { withFormik, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../../Button'
import { ButtonFormWrapper } from '../../Button'
import { Input } from '../../Inputs'
import { InputStyled } from '../../Inputs'
import { FormWrapper } from './'
import Store from './../../App/App.store'
import usePost from './../../../API/usePost.API'

const LoginForm = ({ errors, touched, isSubmitting }) => {
  const errorHandler = (name) => touched[name] && errors[name]

  return (
    <FormWrapper>
      <Form>
        <InputStyled>
          <Input
            disabled={isSubmitting}
            type="email"
            name="user"
            label="eMail"
            placeholder="XxTomekXx@gmail.com"
            error={errorHandler('user')}
          />
        </InputStyled>
        <InputStyled>
          <Input
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
  const history = useHistory()
  const store = Store.useStore()
  const login = usePost('/login')

  const handleSubmit = (values, ...rest) => {
    console.log(rest)
    login.sendData(values)
  }

  useEffect(() => {
    console.log('LoginEffect: ', login.response)
    store.set('authToken')(login.response.authToken)
    store.set('user')(login.response.fullname)
    store.set('userId')(login.response.userId)
  }, [login.response])

  const LoginWithFormik = withFormik({
    mapPropsToValues({ user, password }) {
      return {
        user: user || '',
        password: password || '',
      }
    },

    validationSchema: Yup.object().shape({
      user: Yup.string()
        .email('Podaj poprawny email')
        .required('Wypełnij to pole'),
      password: Yup.string().required('Wypełnij to pole'),
    }),

    handleSubmit: handleSubmit,
  })(LoginForm)

  return <LoginWithFormik />
}

export default LoginFormik
