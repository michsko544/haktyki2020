import React from 'react'
import { Form, Field } from 'formik'
import Button from '../../Button'
import { ButtonFormWrapper } from '../../Button'
import { Input } from '../../Inputs'
import { InputStyled } from '../../Inputs'
import { FormWrapper } from '../LoginForm'
import { FormContainer } from '../BoxContainer.style'

const GreeterFormTemplate = ({ errors, touched, isSubmitting }) => {
    const errorHandler = (name) => touched[name] && errors[name]
  
    return (
      <FormContainer>
        <FormWrapper>
          <Form>
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
              />
            </InputStyled>
            <ButtonFormWrapper>
              <Button
                disabled={isSubmitting}
                text={isSubmitting ? 'Zapisywanie...' : 'Przejdź do aplikacji'}
                type="submit"
              />
            </ButtonFormWrapper>
          </Form>
        </FormWrapper>
      </FormContainer>
    )
  }

  export default GreeterFormTemplate
