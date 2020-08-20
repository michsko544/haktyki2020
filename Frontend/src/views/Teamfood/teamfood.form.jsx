import React from 'react'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'

import Store from '../../components/App/App.store'
import { usePost } from '../../API'

import validationSchema from './teamfood.form.validation.schema'
import TeamfoodForm from './teamfood.form.template'

const TeamfoodFormik = () => {
  const store = Store.useStore()
  const { enqueueSnackbar } = useSnackbar()
  const { send: addOrder } = usePost('/orders/add-order')
  const history = useHistory()

  const transformRequest = (order) => {
    return {
      restaurant: order.restaurant,
      date: order.date,
      time: order.time,
      image: order.image,
      paymentForm: order.paymentForm,
      orderDetails: [
        {
          description: order.description,
          userId: store.get('userId'),
        },
      ],
    }
  }

  const initialValues = {
    restaurant: '',
    date: '',
    time: '',
    description: '',
    paymentForm: '',
    image: '',
  }

  const onSubmit = async (values, { setSubmitting }) => {
    enqueueSnackbar('Dodawanie twojego zamówienia （*＾-＾*）↗　', {
      variant: 'info',
    })

    try {
      const response = await addOrder(transformRequest(values))
      console.log('Response: ', response)

      if (response.statusCode >= 200) {
        setTimeout(() => history.replace('/'), 1500)
      } else {
        enqueueSnackbar('Szefie, serwer mówi w esperanto. Spróbuj później', {
          variant: 'warn',
        })
      }

      setSubmitting(false)
    } catch (error) {
      enqueueSnackbar('Szefuniu, serwer nie chce gadać. Spróbuj ponownie później', {
        variant: 'error',
      })
      setSubmitting(false)
    }
  }

  return <Formik {...{ initialValues, onSubmit, validationSchema }}>{TeamfoodForm}</Formik>
}

export default TeamfoodFormik
