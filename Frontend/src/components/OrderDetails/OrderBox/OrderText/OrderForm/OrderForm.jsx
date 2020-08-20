import React, { useEffect } from 'react'
import Store from '../../../../App/App.store'
import { usePost } from '../../../../../API'
import { useSnackbar } from 'notistack'
import { Formik } from 'formik'
import OrderForm from './OrderForm.template'
import { orderFormValidationSchema } from './OrderForm.validation.schema'

const OrderFormik = ({ order, coupon, date, time, payment, orderId, isPurchaser, closeCallback, formAction }) => {
  const updateData = usePost('/orders/edit')
  const addData = usePost('/orders/join')
  const { enqueueSnackbar } = useSnackbar()
  const store = Store.useStore()

  useEffect(() => {
    if (!updateData.isLoading && updateData.response !== null && updateData.response.statusCode === 200) {
      enqueueSnackbar('Zapisano 👌', {
        variant: 'success',
      })
      closeCallback()
    }
  }, [updateData.response, updateData.isLoading, enqueueSnackbar, closeCallback])

  useEffect(() => {
    if (!addData.isLoading && addData.response !== null && addData.response.statusCode === 201) {
      enqueueSnackbar('Dołączono 👌', {
        variant: 'success',
      })
      closeCallback()
    }
  }, [addData.response, addData.isLoading, enqueueSnackbar, closeCallback])

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

  const onSubmit = async (values, { setSubmitting }) => {
    enqueueSnackbar('Zapisywanie 🤞', { variant: 'info', autoHideDuration: 3000 })
    if (formAction === 'edit') await updateData.sendData(transformValuesForUpadate(values))
    else await addData.sendData(transformValuesForJoin(values))

    setSubmitting(false)
  }

  return (
    <Formik {...{ initialValues, onSubmit, validationSchema }}>{(formikProps) => <OrderForm {...formikProps} isPurchaser={isPurchaser} />}</Formik>
  )
}

export default OrderFormik
