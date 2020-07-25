import React from 'react'
import { useHistory } from 'react-router-dom'
import { withFormik, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../../Button'
import { ButtonFormWrapper } from '../../Button'
import Input from '../../Input'
import { InputStyled } from '../../Input'
import { FormWrapper } from './'
import Store from './../../App/App.store'

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
            placeholder="xx_Tomek_xx2000"
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
          <Button disabled={isSubmitting} text="Zaloguj" type="submit" />
        </ButtonFormWrapper>
      </Form>
    </FormWrapper>
  )
}

const LoginFormik = () => {
  const history = useHistory()

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    setTimeout(() => {
      console.log(values)
      setSubmitting(false)
      resetForm()
      history.replace('/')
    }, 2000)
  }

  const LoginWithFormik = withFormik({
    mapPropsToValues() {
      return {
        user: '',
        password: '',
      }
    },

    validationSchema: Yup.object().shape({
      user: Yup.string().required('Wypełnij to pole'),
      password: Yup.string().required('Wypełnij to pole'),
    }),

    handleSubmit: handleSubmit,
  })(LoginForm)

  return <LoginWithFormik />
}

export default LoginFormik
