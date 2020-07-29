import React from 'react'
import * as Yup from 'yup'
import { withFormik, Form, useField } from 'formik'
import Store from '../../../../App/App.store'
import { AppBackgroundThemes } from '../../../../App/App.themes'
import Checkbox from '@material-ui/core/Checkbox'
import { SmallTitle } from '../Header'
import { CheckboxStyled, CheckboxLabel } from './OrderForm.style'
import Input from '../../../../Input'
import Button from '../../../../Button'
import { ButtonWrapper, TextDisplayer } from '../../'

const OrderForm = ({ values, touched, errors, isSubmitting, handleChange }) => {
  const store = Store.useStore()
  // const [field, meta] = useField({ ...props, type })

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
      <Input type="text" label="Kod kuponu" name="coupon" />
    )

  return (
    <Form>
      <SmallTitle fontcolor={fontcolor}>Co chcesz zamówić?</SmallTitle>
      <TextDisplayer>
        <Input
          name="orderContent"
          component="textarea"
          label="Treść zamówienia"
          style={{ height: 80 }}
          error={touched.orderContent && errors.orderContent}
          placeholder="Penne z boczkiem i brokułami w sosie śmietanowym, kompot, zestaw sztućców"
        />
        {showCouponInput()}
      </TextDisplayer>
      <ButtonWrapper>
        <Button text="Zapisz" type="submit" disabled={isSubmitting} />
      </ButtonWrapper>
    </Form>
  )
}

const OrderFormik = ({ order, coupon, isPurchaser, closeCallback }) => {
  const OrderWithFormik = withFormik({
    mapPropsToValues({ order, coupon }) {
      return {
        orderContent: order || '',
        hasCoupon: coupon ? true : false,
        coupon: coupon || '',
      }
    },

    validationSchema: Yup.object().shape({
      orderContent: Yup.string()
        .max(255, 'Maksymalnie 255 znaków')
        .required('Wypełnij to pole'),
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
  return <OrderWithFormik order={order} coupon={coupon} />
}

export default OrderFormik
