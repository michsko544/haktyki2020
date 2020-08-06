import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { withFormik, Form } from 'formik'
import { Input, InputStyled } from './../../../components/Inputs'
import {
  ButtonFormWrapper,
  default as Button,
} from './../../../components/Button'
import useFetch from './../../../API/useFetch.API'
import { usePost } from '../../../API'
import { useHistory } from 'react-router-dom';

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
            placeholder="Ładowanie"
            error={errorHandler('user')}
            disabled={isLoading}
          />
        </InputStyled>
        <InputStyled>
          <Input
            type="tel"
            name="blik"
            label="Numer telefonu do BLIK"
            placeholder="Ładowanie"
            error={errorHandler('blik')}
            disabled={isLoading}
          />
        </InputStyled>
        <InputStyled>
          <Input
            type="text"
            name="account"
            label="Numer konta do przelewów"
            placeholder="Ładowanie"
            error={errorHandler('account')}
            disabled={isLoading}
          />
        </InputStyled>
        <ButtonFormWrapper>
          <Button disabled={isSubmitting || isLoading} text="Zapisz i wróć" type="submit" />
        </ButtonFormWrapper>
      </Form>
    </>
  )
}

const SettingsFormik = () => {
  const userData = useFetch('/user/me')
  const updateData = usePost('/user/me')
  const history = useHistory()

  useEffect(() => {
    userData.getData()
  }, [])

  useEffect(() => {
    if(updateData.response.statusCode === 0)
      return;

    console.log('Finished', updateData.response)
    history.push('/')
  }, [updateData.response])

  const SettingsWithFormik = withFormik({
    enableReinitialize: true,

    mapPropsToValues({ user, blik, account }) {
      return {
        user: user || userData?.response?.user || '',
        blik: blik || userData?.response?.blik || '',
        account: account || userData?.response?.account || '',
      }
    },

    validationSchema: Yup.object().shape({
      user: Yup.string().required('Wypełnij to pole'),
      blik: Yup.string().required('Wypełnij to pole'),
      account: Yup.string().required('Wypełnij to pole'),
    }),

    handleSubmit(values, { resetForm, setSubmitting }) {
      updateData.sendData(values)
    },
  })(SettingsForm)

  return <SettingsWithFormik isLoading={userData.isLoading} />
}

export default SettingsFormik
