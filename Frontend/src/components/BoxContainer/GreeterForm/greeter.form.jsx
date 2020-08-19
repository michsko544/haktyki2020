import React from 'react'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import Store from '../../App/App.store'
import usePost from '../../../API/ourAPI/useNPost';

import { validationSchema } from './greeter.form.validation'
import GreeterForm from './greeter.form.template';

const GreeterFormik = () => {
  const store = Store.useStore()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const { send: fullname } = usePost('/users/my-fullname')

  const transformRequest = (values) => {
    const capitalize = (v) => v.charAt(0).toUpperCase() + v.slice(1)

    return {
      fullname: values.name
        .split(' ')
        .map(v => capitalize(v))
        .join(' '),
    }
  }

  const initialValues = {
    name: '',
  }

  const setLocalStorage = (fullname) => {
    const login = localStorage.getItem('login')
    if(login === null) return
    const json = JSON.parse(login)

    json.fullname = fullname
    localStorage.setItem('login', JSON.stringify(json))
  }

  const onSubmit = async (values, { setSubmitting }) => {
    enqueueSnackbar('Zapisywanie danych 🤞', {
      variant: 'info',
      autoHideDuration: 1200
    })

    try {
      const response = await fullname(transformRequest(values))
      if(response.statusCode === 200) {
        store.set('user')(values.name)
        setLocalStorage(values.name)
        setSubmitting(false)
        history.push('/')
      }
    } catch (error) {
      console.warn('Error: Serwer spadł z rowerka', error)
      enqueueSnackbar('Serwer spadł z rowerka, spróbuj ponownie później', {
        variant: 'error',
        autoHideDuration: 4000
      })
      setSubmitting(false)
    }
  }

  return (
    <Formik {...{ initialValues, validationSchema, onSubmit }}>
      {GreeterForm}
    </Formik>
  )
}

export default GreeterFormik
