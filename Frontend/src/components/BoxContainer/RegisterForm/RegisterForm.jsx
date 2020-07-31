import React from 'react'
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
  const RegisterWithFormik = withFormik({
    mapPropsToValues() {
      return {
        user: '',
        password: '',
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
      setTimeout(() => {
        console.log(values)
        setSubmitting(false)
        resetForm()
      }, 2000)
    },
  })(RegisterForm)

  return <RegisterWithFormik />
}
export default RegisterFormik
