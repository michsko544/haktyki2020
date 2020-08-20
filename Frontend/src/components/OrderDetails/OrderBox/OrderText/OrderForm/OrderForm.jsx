import React from 'react'
import Store from '../../../../App/App.store'
import { usePost } from '../../../../../API'
import { useSnackbar } from 'notistack'
import { Formik } from 'formik'
import OrderForm from './OrderForm.template'
import { orderFormValidationSchema } from './OrderForm.validation.schema'

const OrderFormik = ({ order, coupon, date, time, payment, orderId, isPurchaser, closeCallback, formAction }) => {
  const { send: edit } = usePost('/orders/edit')
  const { send: join } = usePost('/orders/join')
  const { enqueueSnackbar } = useSnackbar()
  const store = Store.useStore()

  const initialValues = {
    orderContent: order || '',
    hasCoupon: coupon?.code ? true : false,
    coupon: coupon?.code || '',
    couponDescription: coupon?.description || '',
    date: date || '',
    hour: time || '',
    payment: payment || '',
  }

  const validationSchema = () => orderFormValidationSchema(isPurchaser)

  const transformValuesForUpadate = (values) => {
    return {
      date: values.date,
      orderId: orderId,
      paymentForm: values.payment,
      time: values.hour,
      userOrderDetails: {
        coupon: {
          code: values.coupon || '',
          description: values.couponDescription || '',
        },
        description: values.orderContent,
        userFullname: store.get('user'),
        userId: store.get('userId'),
      },
    }
  }

  const transformValuesForJoin = (values) => {
    return {
      coupon: {
        code: values.coupon || '',
        description: values.couponDescription || '',
      },
      description: values.orderContent,
      orderId: orderId,
      userId: store.get('userId'),
    }
  }

  const showError = () => {
    enqueueSnackbar('Problem z serwerem. Spróbuj jeszcze raz :/', {
      variant: 'error',
    })
  }

  const onSubmit = async (values, { setSubmitting }) => {
    enqueueSnackbar('Zapisywanie 🤞', { variant: 'info', autoHideDuration: 3000 })
    if (formAction === 'edit') {
      const response = await edit(transformValuesForUpadate(values))
      if (response.statusCode === 200) {
        enqueueSnackbar('Zapisano 👌', {
          variant: 'success',
        })
        setSubmitting(false)
        closeCallback()
      } else showError()
    } else {
      const response = await join(transformValuesForJoin(values))
      if (response.statusCode === 201) {
        enqueueSnackbar('Dołączono 👌', {
          variant: 'success',
        })
        closeCallback()
      } else showError()
    }

    setSubmitting(false)
  }

  return (
    <Formik {...{ initialValues, onSubmit, validationSchema }}>{(formikProps) => <OrderForm {...formikProps} isPurchaser={isPurchaser} />}</Formik>
  )
}

export default OrderFormik
