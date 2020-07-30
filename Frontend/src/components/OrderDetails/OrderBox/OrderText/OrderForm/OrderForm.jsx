import React from 'react'
import * as Yup from 'yup'
import { withFormik, Form, useField, Field } from 'formik'
import Store from '../../../../App/App.store'
import { AppBackgroundThemes } from '../../../../App/App.themes'
import Checkbox from '@material-ui/core/Checkbox'
import { SmallTitle } from '../Header'
import { CheckboxStyled, CheckboxLabel } from './OrderForm.style'
import Input from '../../../../Input'
import Button from '../../../../Button'
import { ButtonWrapper, TextDisplayer } from '../../'
import RadioGroupFormik from '../../../../RadioGroup'

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
        <Input type="text" label="Kod kuponu" name="coupon" />
        <Input
          component="textarea"
          placeholder="Kupon obejmuje zamówienie za minimum 40zł i daje zniżkę 10%"
          label="Informacje o kuponie"
          name="couponDescription"
          error={errors.couponDescription}
        />
      </>
    )

  const showPaymentFormIfPurchaser = () => {
    return (
      isPurchaser && (
        <Field
          name="payment"
          options={[
            { value: 'BLIK', label: 'BLIK' },
            { value: 'TRANSFER', label: 'Przelew' },
            { value: 'CASH', label: 'Gotówka' },
          ]}
          label={'Forma Płatności'}
          component={RadioGroupFormik}
          aria-label="payment"
        />
      )
    )
  }

  return (
    <Form>
      <SmallTitle fontcolor={fontcolor}>Co chcesz zamówić?</SmallTitle>
      <TextDisplayer>
        <Input
          name="orderContent"
          component="textarea"
          label="Treść zamówienia"
          style={{ height: 77 }}
          error={touched.orderContent && errors.orderContent}
          placeholder="Penne z boczkiem i brokułami w sosie śmietanowym, kompot, zestaw sztućców"
        />
        {showCouponInput()}
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
  payment,
  isPurchaser,
  closeCallback,
}) => {
  const OrderWithFormik = withFormik({
    mapPropsToValues({ order, coupon, payment }) {
      return {
        orderContent: order || '',
        hasCoupon: coupon?.code ? true : false,
        coupon: coupon?.code || '',
        couponDescription: coupon?.description || '',
        payment: payment || '',
      }
    },

    validationSchema: Yup.object().shape({
      orderContent: Yup.string()
        .max(255, 'Maksymalnie 255 znaków')
        .required('Wypełnij to pole'),
      couponDescription: Yup.string().max(100, 'Maksymalnie 100 znaków'),
    }),

    handleSubmit(values, { resetForm, setSubmitting }) {
      setTimeout(() => {
        console.log(values)
        setSubmitting(false)
        resetForm()
        closeCallback()
      }, 2000)
    },
  })(OrderForm)
  return (
    <OrderWithFormik
      order={order}
      coupon={coupon}
      payment={payment}
      isPurchaser={isPurchaser}
    />
  )
}

export default OrderFormik
