import React from 'react'
import * as Yup from 'yup'
import { withFormik, Form } from 'formik'
import { default as Input, InputStyled } from './../../../components/Input'
import {
  ButtonFormWrapper,
  default as Button,
} from './../../../components/Button'
import Store from './../../../components/App/App.store'

const SettingsForm = ({ errors, touched, isSubmitting }) => {
  const errorHandler = (name) => touched[name] && errors[name]

  return (
    <>
      <Form>
        <InputStyled>
          <Input
            type="text"
            name="user"
            label="Imię i nazwisko"
            placeholder="Tomek Adamczyk"
            error={errorHandler('user')}
          />
        </InputStyled>
        <InputStyled>
          <Input
            type="tel"
            name="blik"
            label="Numer telefonu do BLIK"
            placeholder="603 424 420"
            error={errorHandler('blik')}
          />
        </InputStyled>
        <InputStyled>
          <Input
            type="text"
            name="account"
            label="Numer konta do przelewów"
            placeholder="78 2323 4333 1234 2333 0000"
            error={errorHandler('account')}
          />
        </InputStyled>
        <ButtonFormWrapper>
          <Button disabled={isSubmitting} text="Zapisz i wróć" type="submit" />
        </ButtonFormWrapper>
      </Form>
    </>
  )
}

const SettingsFormik = () => {
  const store = Store.useStore()

  const SettingsWithFormik = withFormik({
    mapPropsToValues() {
      return {
        user: store.get('user') || '',
        blik: '',
        account: '',
      }
    },

    validationSchema: Yup.object().shape({
      user: Yup.string().required('Wypełnij to pole'),
      blik: Yup.string().required('Wypełnij to pole'),
      account: Yup.string().required('Wypełnij to pole'),
    }),

    handleSubmit(values, { resetForm, setSubmitting }) {
      setTimeout(() => {
        console.log(values)
        setSubmitting(false)
        resetForm()
      }, 200)
    },
  })(SettingsForm)

  return <SettingsWithFormik />
}

export default SettingsFormik
