import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import {
  Input,
  InputStyled,
  SmallerInputStyled,
  RowOnMediumScreen,
} from './../../../components/Inputs'
import {
  ButtonFormWrapper,
  default as Button,
} from './../../../components/Button'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { settingsFormValidation } from './settings.form.validation'
import { useNPost as usePost } from '../../../API/ourAPI/useNPost'
import { useNFetch as useFetch } from './../../../API/ourAPI/useNFetch';


const SettingsForm = ({ errors, touched, isSubmitting, isLoading, values }) => {
  const errorHandler = (name) => touched[name] && errors[name]

  const isIBANNotFromPoland = () => {
    const IBAN = (values.account[0] + values.account[1])
      .toString()
      .toUpperCase()

    const isItIBAN = /^[A-Z]*$/.test(IBAN)
    const isNotPolishIBAN = IBAN !== 'PL'

    return (
      values.account !== '' &&
      values.account.length > 1 &&
      isItIBAN &&
      isNotPolishIBAN
    )
  }

  const showSwiftWhenIBAN = () => {
    return (
      isIBANNotFromPoland() && (
        <SmallerInputStyled>
          <Field
            component={Input}
            type="text"
            name="swift"
            label="SWIFT/BIC"
            placeholder="REVOGB21XXX"
            error={errorHandler('swift')}
            style={{ textTransform: 'uppercase' }}
          />
        </SmallerInputStyled>
      )
    )
  }

  const superHolder = (val) => isLoading ? 'Ładowanie' : val

  return (
    <>
      <Form>
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
          />
        </InputStyled>
        <RowOnMediumScreen>
          <InputStyled>
            <Field
              component={Input}
              type="text"
              name="account"
              label="Numer konta do przelewów"
              placeholder={
                superHolder('PL78 2323 4333 1234 2333 0000 1234')
              }
              error={errorHandler('account')}
              style={isLoading ? { textTransform: 'uppercase' } : null}
            />
          </InputStyled>
          {showSwiftWhenIBAN()}
        </RowOnMediumScreen>
        <ButtonFormWrapper>
          <Button
            disabled={isSubmitting || isLoading}
            text="Zapisz i wróć"
            type="submit"
          />
        </ButtonFormWrapper>
      </Form>
    </>
  )
}

const SettingsFormik = () => {
  const { fetch: fetchUser, isLoading } = useFetch('/users/my-details')
  const [ user, setUser ] = useState({})
  const { send: update } = usePost('/users/my-details')
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  const getData = async () => {
    try {
      const response = await fetchUser()
      console.log('User: ', response)
      setUser(response)
    } catch (error) {
      console.warn('Erroro :c')
    }
  }

  useEffect(() => {
    document.title = 'Ustawienia 👏 | TeamFood'
    getData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const initialValues = {
    user: user?.fullName || '',
    blik: user?.phoneNumber || '',
    account: user?.creditCardNumber || '',
    swift: user?.swiftBicCode || '',
  }

  const validationSchema = settingsFormValidation

  const transformValues = (values) => {
    return {
      fullName: values.user,
      creditCardNumber: values.account,
      swiftBicCode: values.swift,
      phoneNumber: values.blik,
    }
  }

  const onSubmit = async (values, { setSubmitting }) => {
    enqueueSnackbar('Zapisywanie 🤞', { variant: 'info' })
    console.log('Sending values: ', transformValues(values))

    try {
      const response = await update(transformValues(values))
      console.log('Response: ', response)

      enqueueSnackbar('Zapisano 👌', {
        variant: 'success',
        autoHideDuration: 3000
      })
      
      setTimeout(() => history.push('/'), 1500)
    } catch(error) {

    }
    
    setSubmitting(false)
  }

  return (
    <Formik
      enableReinitialize={true}
      {...{ initialValues, onSubmit, validationSchema }}
    >
      {(formikProps) => (
        <SettingsForm {...formikProps} isLoading={isLoading} />
      )}
    </Formik>
  )
}

export default SettingsFormik
