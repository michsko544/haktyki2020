import React from 'react'
import { withFormik, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../../Button'
import { ButtonFormWrapper } from '../../Button'
import { Input } from '../../Inputs'
import { InputStyled } from '../../Inputs'
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
              style={{ textTransform: 'capitalize' }}
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

const GreeterFormik = () => {
  const GreeterWithFormik = withFormik({
    mapPropsToValues() {
      return {
        name: '',
      }
    },

    validationSchema: Yup.object().shape({
      name: Yup.string()
        .matches(
          /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]*$/,
          'Pole nie może zawierać znaków specjalnych'
        )
        .matches(
          /^[A-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+\s+[A-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+ ?$/,
          'Podaj dwa wyrazy'
        )
        .min(3, 'Pole musi mieć minimum 3 znaki')
        .max(50, 'Pole musi mieć maximum 50 znaków')
        .required('Wypełnij to pole'),
    }),

    handleSubmit(values, { resetForm, setSubmitting }) {
      setTimeout(() => {
        console.log(values)
        setSubmitting(false)
        resetForm()
      }, 2000)
    },
  })(GreeterForm)

  return <GreeterWithFormik />
}

export default GreeterFormik
