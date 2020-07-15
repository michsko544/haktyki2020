import React from 'react'
import { withFormik, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../../Button'
import { ButtonFormWrapper } from '../../Button'
import Input from '../../Input'
import { InputStyled } from '../../Input'
import { FormWrapper } from '../LoginForm'
import { FormContainer } from '../BoxContainer.style'

const GreeterForm = ({ errors, touched, isSubmitting }) => {
  const errorHandler = (name) => touched[name] && errors[name]

  return (
    <FormContainer>
      <FormWrapper>
        <Form>
          <InputStyled>
            <Input
              type="text"
              name="name"
              label="Twoje imię i nazwisko"
              placeholder="Jan Nowak"
              error={errorHandler('name')}
            />
          </InputStyled>
          <ButtonFormWrapper>
            <Button
              disabled={isSubmitting}
              text="Przejdź do aplikacji"
              type="submit"
            />
          </ButtonFormWrapper>
        </Form>
      </FormWrapper>
    </FormContainer>
  )
}

const GreeterFormik = withFormik({
  mapPropsToValues() {
    return {
      name: '',
    }
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Wypełnij to pole'),
  }),

  handleSubmit(values, { resetForm, setSubmitting }) {
    setTimeout(() => {
      console.log(values)
      setSubmitting(false)
      resetForm()
    }, 2000)
  },
})(GreeterForm)

export default GreeterFormik
