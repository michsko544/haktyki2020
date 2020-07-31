import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { withFormik, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../../Button'
import { ButtonFormWrapper } from '../../Button'
import { Input } from '../../Inputs'
import { InputStyled } from '../../Inputs'
import { FormWrapper } from '../LoginForm'
import usePost from './../../../API/usePost.API'

const RegisterForm = ({ errors, touched, isSubmitting }) => {
  const errorHandler = (name) => touched[name] && errors[name]

  return (
    <FormWrapper>
      <Form>
        <InputStyled>
          <Input
            type="email"
            name="user"
            label="eMail"
            placeholder="xxxTomekxxx2000@gmail.com"
            error={errorHandler('user')}
          />
        </InputStyled>
        <InputStyled>
          <Input
            type="password"
            name="password"
            label="Hasło"
            placeholder="**************"
            error={errorHandler('password')}
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
  const history = useHistory()
  const register = usePost("/register")

  useEffect(() => {
    console.log('ErrorEffect: ', register.error)
  }, [register.error])

  useEffect(() => {
    console.log('RegisterEffect: ', register.response)
    // What do? Po prostu redirect?
    if(!register.isLoading && register.response.statusCode === 201)
      history.replace('/');
  }, [register.response, register.isLoading])

  const RegisterWithFormik = withFormik({
    mapPropsToValues({ user, password }) {
      return {
        user: user || '',
        password: password || '',
      }
    },

    validationSchema: Yup.object().shape({
      user: Yup.string()
        .email('Podaj prawidłowy adres email')
        .required('Wypełnij to pole'),
      password: Yup.string()
        .min(6, 'Hasło musi mieć minimum 6 znaków')
        .required('Wypełnij to pole'),
    }),

    handleSubmit(values, { resetForm, setSubmitting }) {
      register.sendData(values)
    },
  })(RegisterForm)

  return <RegisterWithFormik />
}
export default RegisterFormik
