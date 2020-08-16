import React, { useEffect } from 'react'
import * as Yup from 'yup'
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
import { usePost, useFetch } from './../../../API/ourAPI'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'

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

  return (
    <>
      <Form>
        <InputStyled>
          <Field
            component={Input}
            type="text"
            name="user"
            label="Imię i nazwisko"
            placeholder={isLoading ? 'Ładowanie' : 'Jan Kowalski'}
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
            placeholder={isLoading ? 'Ładowanie' : '420 420 420'}
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
                isLoading ? 'Ładowanie' : 'PL78 2323 4333 1234 2333 0000 1234'
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
  const userData = useFetch('/users/my-details')
  const updateData = usePost('/users/my-details')
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    document.title = 'Ustawienia 👏 | TeamFood'
    userData.getData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      !updateData.isLoading &&
      updateData.response !== null &&
      updateData.response.statusCode === 200
    ) {
      enqueueSnackbar('Zapisano 👌', {
        variant: 'success',
        preventDuplicate: true,
      })
      history.push('/')
    }
  }, [updateData.response, updateData.isLoading, history, enqueueSnackbar])

  const initialValues = {
    user: userData?.response?.fullName || '',
    blik: userData?.response?.phoneNumber || '',
    account: userData?.response?.creditCardNumber || '',
    swift: userData?.response?.swiftBicCode || '',
  }

  const validationSchema = Yup.object().shape({
    user: Yup.string()
      .matches(
        /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]*$/,
        'Pole nie może zawierać znaków specjalnych, ani cyfr'
      )
      .matches(
        /^[A-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+\s+[A-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+ ?$/,
        'Podaj dwa wyrazy'
      )
      .min(3, 'Pole musi mieć minimum 3 znaki')
      .max(50, 'Pole musi mieć maksimum 50 znaków')
      .required('Wypełnij to pole'),
    blik: Yup.string()
      .min(9, 'Pole musi mieć minimum 9 znaków')
      .max(12, 'Pole musi mieć maksimum 12 znaków')
      .matches(
        /^[0-9]{3}[ ]{0,1}[0-9]{3}[ ]{0,1}[0-9]{3} ?$/,
        'Podaj poprawny, 9-cyfrowy numer telefonu'
      )
      .required('Wypełnij to pole'),
    account: Yup.string()
      .min(22, 'Pole musi mieć minimum 22 znaków')
      .max(35, 'Pole musi mieć maksimum 35 znaków')
      .matches(
        /^[A-Za-z]{0,2}[0-9]{2}[ ]{0,1}[A-Za-z0-9]{4}[ ]{0,1}[0-9]{4}[ ]{0,1}[0-9]{4}[ ]{0,1}[0-9]{4}[ ]{0,1}[0-9]{2,4}[ ]{0,1}[0-9]{0,4} ?$/,
        'Podaj poprawny numer konta'
      )
      .required('Wypełnij to pole'),
    swift: Yup.string()
      .when('account', {
        is: (account) =>
          account
            ? account.length > 1 &&
              /^[A-Z]*$/.test(
                (account[0] + account[1]).toString().toUpperCase()
              ) &&
              (account[0] + account[1]).toString().toUpperCase() !== 'PL'
            : false,
        then: Yup.string().required('Wypełnij to pole'),
      })
      .min(8, 'Pole musi mieć minimum 8 znaków')
      .max(11, 'Pole musi mieć maksimum 11 znaków')
      .matches(
        /^[A-Za-z0-9]*$/,
        'Pole musi zawierać tylko duże litery i/lub cyfry'
      ),
  })

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
    await updateData.sendData(transformValues(values))
    setSubmitting(false)
  }

  return (
    <Formik
      enableReinitialize={true}
      {...{ initialValues, onSubmit, validationSchema }}
    >
      {(formikProps) => (
        <SettingsForm {...formikProps} isLoading={userData?.isLoading} />
      )}
    </Formik>
  )
}

export default SettingsFormik
