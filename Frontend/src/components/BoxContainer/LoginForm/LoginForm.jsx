import React from 'react'
import { withFormik, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../../Button'
import { ButtonFormWrapper } from '../../Button'
import Input from '../../Input'
import { InputStyled } from '../../Input'
import { FormWrapper } from './'

const LoginForm = ({ errors, touched, isSubmitting }) => {
  const errorHandler = (name) => touched[name] && errors[name]

  return (
    <FormWrapper>
      <Form>
        <InputStyled>
          <Input
            type="text"
            name="user"
            label="Login"
            error={errorHandler('user')}
          />
        </InputStyled>
        <InputStyled>
          <Input
            type="password"
            name="password"
            label="Hasło"
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

const LoginFormik = withFormik({
  mapPropsToValues() {
    return {
      user: '',
      password: '',
    }
  },

  validationSchema: Yup.object().shape({
    user: Yup.string().required('Nazwa użytkownika jest wymagana'),
    password: Yup.string().required('Hasło jest wymagane'),
  }),

  handleSubmit(values, { resetForm, setSubmitting }) {
    setTimeout(() => {
      console.log(values)
      setSubmitting(false)
      resetForm()
    }, 2000)
  },
})(LoginForm)

export default LoginFormik
