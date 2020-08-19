import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { usePost, useFetch } from '../../../API'

import validationSchema from './settings.form.validation'
import SettingsForm from './settings.form.template'

const SettingsFormik = () => {
  const { fetch: fetchUser, isLoading } = useFetch('/users/my-details')
  const [user, setUser] = useState({})
  const { send: update } = usePost('/users/my-details')
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  const getData = async () => {
    try {
      setUser(await fetchUser())
    } catch (error) {
      enqueueSnackbar('Nie udało się pobrać twoich danych z serwera (⓿_⓿)', {
        variant: 'warn',
        autoHideDuration: 3000
      })
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
    enqueueSnackbar('Zapisywanie 🤞', { variant: 'info', autoHideDuration: 1500 })

    try {
      await update(transformValues(values))
      enqueueSnackbar('Zapisano 👌', {
        variant: 'success',
        autoHideDuration: 1500
      })
      
      setTimeout(() => history.push('/'), 1500)
    } catch(error) {
      enqueueSnackbar('Serwer się sypnął, daj znać adminowi ;/', {
        variant: 'error',
        autoHideDuration: 3000
      })
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
