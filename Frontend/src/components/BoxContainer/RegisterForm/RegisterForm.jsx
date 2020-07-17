import React from 'react'
import { withFormik, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../../Button'
import { ButtonFormWrapper } from '../../Button'
import Input from '../../Input'
import { InputStyled } from '../../Input'
import { FormWrapper } from '../LoginForm'

const RegisterForm = ({ errors, touched, isSubmitting }) => {
  const errorHandler = (name) => touched[name] && errors[name]

  return (
    <FormWrapper>
      <Form>
        <InputStyled>
          <Input
            type="text"
            name="user"
            label="Login"
            placeholder="xxxTomekxxx2000"
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

const RegisterFormik = withFormik({
  mapPropsToValues() {
    return {
      user: '',
      password: '',
    }
  },

  validationSchema: Yup.object().shape({
    user: Yup.string().required('Wypełnij to pole'),
    password: Yup.string()
      .min(8, 'Hasło musi mieć minimum 8 znaków')
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

export default RegisterFormik
