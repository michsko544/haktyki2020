import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import usePost from '../../../API/ourAPI/useNPost'
import useFetch from './../../../API/ourAPI/useNFetch'

import validationSchema from './settings.form.validation'
import SettingsForm from './settings.form.template'

const SettingsFormik = () => {
  const { fetch: fetchUser, isLoading } = useFetch('/users/my-details')
  const [ user, setUser ] = useState({})
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

  const transformValues = (values) => {
    return {
      fullName: values.user,
      creditCardNumber: values.account,
      swiftBicCode: values.swift,
      phoneNumber: values.blik,
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
