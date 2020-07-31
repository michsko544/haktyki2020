import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { withFormik, Form } from 'formik'
import { Input, InputStyled } from './../../../components/Inputs'
import {
  ButtonFormWrapper,
  default as Button,
} from './../../../components/Button'
import Store from './../../../components/App/App.store'
import useFetch from './../../../API/useFetch.API';

const SettingsForm = ({ errors, touched, isSubmitting, isLoading }) => {
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
            disabled={isLoading ? 'disabled' : ''}
          />
        </InputStyled>
        <InputStyled>
          <Input
            type="tel"
            name="blik"
            label="Numer telefonu do BLIK"
            placeholder="603 424 420"
            error={errorHandler('blik')}
            disabled={isLoading}
          />
        </InputStyled>
        <InputStyled>
          <Input
            type="text"
            name="account"
            label="Numer konta do przelewów"
            placeholder="78 2323 4333 1234 2333 0000"
            error={errorHandler('account')}
            disabled={isLoading}
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
  const userData = useFetch('/user/me')

  useEffect(() => {
    /**
     * Fetch data from userData to model
     */

     userData.getData()
  }, [])

  useEffect(() => {
    console.log('Response: ', userData.response)
  }, [userData.response])

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

    isLoading: userData.isLoading
  })(SettingsForm)

  return <SettingsWithFormik />
}

export default SettingsFormik
