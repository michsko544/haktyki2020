import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { withFormik, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../../Button'
import { ButtonFormWrapper } from '../../Button'
import { Input } from '../../Inputs'
import { InputStyled } from '../../Inputs'
import { FormWrapper } from '../LoginForm'
import { usePost } from './../../../API'

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
            placeholder="XxTomekXx@gmail.com"
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
  const register = usePost('/register')

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
    }),

    handleSubmit(values, { resetForm, setSubmitting }) {
      register.sendData(values)
    },
  })(RegisterForm)

  return <RegisterWithFormik />
}
export default RegisterFormik
