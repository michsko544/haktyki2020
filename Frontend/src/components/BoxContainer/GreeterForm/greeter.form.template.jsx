import React from 'react'
import { Form, Field } from 'formik'
import Button from '../../Button'
import { ButtonFormWrapper } from '../../Button'
import { Input } from '../../Inputs'
import { InputStyled } from '../../Inputs'
import { FormWrapper } from '../LoginForm'
import { FormContainer } from '../BoxContainer.style'

const GreeterFormTemplate = ({ errors, touched, isSubmitting, handleSubmit }) => {
  const errorHandler = (name) => touched[name] && errors[name]

  const handleEnter = (event) => {
    if (event.key === 'Enter') handleSubmit()
  }

  return (
    <FormContainer>
      <FormWrapper>
        <Form onKeyPress={handleEnter}>
          <InputStyled>
            <Field
              component={Input}
              type="text"
              name="name"
              label="Twoje imię i nazwisko"
              placeholder="Jan Nowak"
              error={errorHandler('name')}
              style={{ textTransform: 'capitalize' }}
              disabled={isSubmitting}
              aria-label="fullname"
              aria-required="true"
            />
          </InputStyled>
          <ButtonFormWrapper>
            <Button
              disabled={isSubmitting}
              text={isSubmitting ? 'Zapisywanie...' : 'Przejdź do aplikacji'}
              type="submit"
              aria-label="submit"
              aria-required="true"
            />
          </ButtonFormWrapper>
        </Form>
      </FormWrapper>
    </FormContainer>
  )
}

export default GreeterFormTemplate
