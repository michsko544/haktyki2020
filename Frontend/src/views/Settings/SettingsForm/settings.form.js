import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { Input, InputStyled, SmallerInputStyled, RowOnMediumScreen } from './../../../components/Inputs'
import { ButtonFormWrapper, default as Button } from './../../../components/Button'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { settingsFormValidation } from './settings.form.validation'
import { useNPost as usePost } from '../../../API/ourAPI/useNPost'
import { useNFetch as useFetch } from './../../../API/ourAPI/useNFetch'

const SettingsForm = ({ errors, touched, isSubmitting, isLoading, isIBANNotFromPoland, values }) => {
  const errorHandler = (name) => touched[name] && errors[name]

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
          />
        </SmallerInputStyled>
      )
    )
  }

  const superHolder = (val) => (isLoading ? 'Ładowanie' : val)

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
              placeholder={superHolder('GB78 2323 S3XY 1234 2333 0000 1234')}
              error={errorHandler('account')}
              style={!isLoading ? { textTransform: 'uppercase' } : null}
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

const SettingsFormik = () => {
  const { fetch: fetchUser, isLoading } = useFetch('/users/my-details')
  const [user, setUser] = useState({})
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

  const isPolishIBAN = (accountNumber) => {
    const IBAN = (accountNumber[0] + accountNumber[1]).toString().toUpperCase()
    return IBAN === 'PL'
  }

  const deletePolishIBAN = (accountNumber) => (isPolishIBAN(accountNumber) ? accountNumber.slice(2) : accountNumber)

  const isIBANNotFromPoland = (accountNumber) => {
    const IBAN = (accountNumber[0] + accountNumber[1]).toString().toUpperCase()

    const isItIBAN = /^[A-Z]*$/.test(IBAN)
    const isNotPolishIBAN = IBAN !== 'PL'

    return accountNumber !== '' && accountNumber.length > 1 && isItIBAN && isNotPolishIBAN
  }

  const insertSpaces = (input, howOften, whenStart) => {
    whenStart = whenStart < 1 ? howOften : whenStart
    const START = whenStart || howOften

    var output = ''

    let spacesCounter = 0
    let i = 0
    let pointer = START + i * howOften
    let suspect = input.substring(0, START + 1)
    while (pointer <= input.length) {
      if (i === 0 && suspect[START] !== ' ') {
        output = output + suspect.substring(0, suspect.length - 1) + ' '
      } else if (suspect[howOften] !== ' ' && suspect[howOften] !== undefined) {
        output = output + suspect.substring(0, suspect.length - 1) + ' '
      } else {
        output += suspect
        ++spacesCounter
      }
      ++i
      pointer = START + i * howOften + spacesCounter
      suspect = input.substring(pointer - howOften, pointer + 1)
    }
    return output
  }

  const transformValues = (values) => {
    return {
      fullName: values.user,
      creditCardNumber: isIBANNotFromPoland(values.account)
        ? insertSpaces(values.account.toUpperCase(), 4)
        : insertSpaces(deletePolishIBAN(values.account.toUpperCase()), 4, 2),
      swiftBicCode: isIBANNotFromPoland(values.account) ? values.swift.toUpperCase() : '',
      phoneNumber: insertSpaces(values.blik.toString(), 3),
    }
  }

  const onSubmit = async (values, { setSubmitting }) => {
    console.log('Sending values: ', transformValues(values))
    try {
      enqueueSnackbar('Zapisywanie 🤞', { variant: 'info' })
      const response = await update(transformValues(values))
      console.log('Response: ', response)

      enqueueSnackbar('Zapisano 👌', {
        variant: 'success',
        autoHideDuration: 3000,
      })

      setTimeout(() => history.push('/'), 1500)
    } catch (error) {
      console.log(error.response)
    }

    setSubmitting(false)
  }

  return (
    <Formik enableReinitialize={true} {...{ initialValues, onSubmit, validationSchema }}>
      {(formikProps) => <SettingsForm {...formikProps} isLoading={isLoading} isIBANNotFromPoland={isIBANNotFromPoland} />}
    </Formik>
  )
}

export default SettingsFormik
