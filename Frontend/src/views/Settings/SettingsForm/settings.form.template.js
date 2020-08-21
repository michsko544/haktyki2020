import React from 'react'
import { Form, Field } from 'formik'
import { Input, InputStyled, SmallerInputStyled, RowOnMediumScreen } from './../../../components/Inputs'
import { ButtonFormWrapper, default as Button } from './../../../components/Button'

export const SettingsFormTemplate = ({ errors, touched, isSubmitting, handleSubmit, isLoading, isIBANNotFromPoland, values }) => {
  const errorHandler = (name) => touched[name] && errors[name]

  const handleEnter = (event) => {
    if (event.key === 'Enter') handleSubmit()
  }

  const showSwiftWhenIBAN = () => {
    return (
      isIBANNotFromPoland(values.account) && (
        <SmallerInputStyled>
          <Field
            component={Input}
            type="text"
            name="swift"
            label="SWIFT/BIC"
            placeholder="REVOGB21XXX"
            error={errorHandler('swift')}
            style={{ textTransform: 'uppercase' }}
            aria-label="swift-bic"
            aria-required="true"
          />
        </SmallerInputStyled>
      )
    )
  }

  const superHolder = (val) => (isLoading ? 'Ładowanie' : val)

  return (
    <>
      <Form onKeyPress={handleEnter}>
        <InputStyled>
          <Field
            component={Input}
            type="text"
            name="user"
            label="Imię i nazwisko"
            placeholder={superHolder('Jan Kowalski')}
            error={errorHandler('user')}
            style={{ textTransform: 'capitalize' }}
            disabled={isLoading}
            aria-label="fullname"
            aria-required="true"
          />
        </InputStyled>
        <InputStyled>
          <Field
            component={Input}
            type="tel"
            name="blik"
            label="Numer telefonu do BLIK"
            placeholder={superHolder('420 420 420')}
            error={errorHandler('blik')}
            disabled={isLoading}
            aria-label="phone-number"
            aria-required="true"
          />
        </InputStyled>
        <RowOnMediumScreen>
          <InputStyled>
            <Field
              component={Input}
              type="text"
              name="account"
              label="Numer konta do przelewów"
              placeholder={superHolder('GB78 S3XY 2323 1234 2333 0000 1234')}
              error={errorHandler('account')}
              style={!isLoading ? { textTransform: 'uppercase' } : null}
              aria-label="bank-number"
              aria-required="true"
            />
          </InputStyled>
          {showSwiftWhenIBAN()}
        </RowOnMediumScreen>
        <ButtonFormWrapper>
          <Button disabled={isSubmitting || isLoading} text={isSubmitting ? 'Zapisywanie...' : 'Zapisz i wróć'} type="submit" />
        </ButtonFormWrapper>
      </Form>
    </>
  )
}

export default SettingsFormTemplate
