import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { usePost } from '../../../../../API'
import { Form, Field, Formik } from 'formik'
import Store from '../../../../App/App.store'
import { AppBackgroundThemes } from '../../../../App/App.themes'
import Checkbox from '@material-ui/core/Checkbox'
import { SmallTitle } from '../Header'
import { CheckboxStyled, CheckboxLabel } from './OrderForm.style'
import { Input, InputStyled } from '../../../../Inputs'
import { DoubleInputStyled } from '../../../../../views/Teamfood/Container/double.input.style'
import Button from '../../../../Button'
import { ButtonWrapper, TextDisplayer } from '../../'
import { RadioGroupFormik } from '../../../../Inputs'
import { useSnackbar } from 'notistack'

const OrderForm = ({
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  isPurchaser,
}) => {
  const store = Store.useStore()
  const fontcolor =
    AppBackgroundThemes[store.get('themeBackgroundId')].fontColor

  const errorHandler = (name) => touched[name] && errors[name]

  const showCouponInput = () =>
    !values.hasCoupon ? (
      <CheckboxStyled>
        <Checkbox
          color="primary"
          name="hasCoupon"
          onChange={handleChange}
          checked={values.hasCoupon}
        />
        <CheckboxLabel fontcolor={fontcolor}>Mam kupon</CheckboxLabel>
      </CheckboxStyled>
    ) : (
      <>
        <InputStyled>
          <Field
            type="text"
            label="Kod kuponu"
            name="coupon"
            component={Input}
          />
        </InputStyled>
        <InputStyled>
          <Field
            componentType="textarea"
            placeholder="Kupon obejmuje zamówienie za minimum 40zł i daje zniżkę 10%"
            label="Informacje o kuponie"
            name="couponDescription"
            component={Input}
            error={errors.couponDescription}
          />
        </InputStyled>
      </>
    )

  const showTermInputIfPurchaser = () => {
    return (
      isPurchaser && (
        <DoubleInputStyled>
          <InputStyled>
            <Field
              type="date"
              name="date"
              label="Kiedy?"
              placeholder="Dzisiaj"
              component={Input}
              error={errorHandler('date')}
            />
          </InputStyled>
          <InputStyled>
            <Field
              type="time"
              name="hour"
              label="O której?"
              placeholder="17:00"
              component={Input}
              error={errorHandler('hour')}
            />
          </InputStyled>
        </DoubleInputStyled>
      )
    )
  }

  const showPaymentFormIfPurchaser = () => {
    return (
      isPurchaser && (
        <InputStyled style={{ marginTop: 11 }}>
          <Field
            name="payment"
            options={[
              { value: 'BLIK', label: 'BLIK' },
              { value: 'TRANSFER', label: 'Przelew' },
              { value: 'CASH', label: 'Gotówka' },
            ]}
            error={errorHandler('payment')}
            label={'Forma Płatności'}
            component={RadioGroupFormik}
            aria-label="payment"
          />
        </InputStyled>
      )
    )
  }

  return (
    <Form>
      <SmallTitle fontcolor={fontcolor}>Co chcesz zamówić?</SmallTitle>
      <TextDisplayer>
        <InputStyled>
          <Field
            name="orderContent"
            component={Input}
            componentType="textarea"
            label="Treść zamówienia"
            style={{ height: 77 }}
            error={errorHandler('orderContent')}
            placeholder="Penne z boczkiem i brokułami w sosie śmietanowym, kompot, zestaw sztućców"
          />
        </InputStyled>
        {showCouponInput()}
        {showTermInputIfPurchaser()}
        {showPaymentFormIfPurchaser()}
      </TextDisplayer>
      <ButtonWrapper>
        <Button text="Zapisz" type="submit" disabled={isSubmitting} />
      </ButtonWrapper>
    </Form>
  )
}

const OrderFormik = ({
  order,
  coupon,
  date,
  time,
  payment,
  orderId,
  isPurchaser,
  closeCallback,
}) => {
  const updateData = usePost('/orders/edit')
  const { enqueueSnackbar } = useSnackbar()
  const store = Store.useStore()

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
      closeCallback()
    }
  }, [updateData.response, updateData.isLoading, enqueueSnackbar])

  const initialValues = {
    orderContent: order || '',
    hasCoupon: coupon?.code ? true : false,
    coupon: coupon?.code || '',
    couponDescription: coupon?.description || '',
    date: date || '',
    hour: time || '',
    payment: payment || '',
  }

  const validationSchema = Yup.object().shape({
    orderContent: Yup.string()
      .min(5, 'Pole musi mieć minimum 5 znaków')
      .max(200, 'Pole musi mieć maksimum 200 znaków')
      .required('Wypełnij to pole'),
    coupon: Yup.string().max(20, 'Pole musi mieć maksimum 20 znaków'),
    couponDescription: Yup.string().max(
      100,
      'Pole musi mieć maksimum 100 znaków'
    ),
    date: isPurchaser
      ? Yup.string().required('Wypełnij to pole')
      : Yup.string(),
    hour: isPurchaser
      ? Yup.string().required('Wypełnij to pole')
      : Yup.string(),
    payment: isPurchaser
      ? Yup.string().required('Zaznacz to pole')
      : Yup.string(),
  })

  const transformValues = (values) => {
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

  const onSubmit = async (values, { setSubmitting }) => {
    enqueueSnackbar('Zapisywanie 🤞', { variant: 'info' })
    await updateData.sendData(transformValues(values))
    setSubmitting(false)
  }

  return (
    <Formik
      enableReinitialize={true}
      {...{ initialValues, onSubmit, validationSchema }}
    >
      {(formikProps) => (
        <OrderForm {...formikProps} isPurchaser={isPurchaser} />
      )}
    </Formik>
  )
}

export default OrderFormik
