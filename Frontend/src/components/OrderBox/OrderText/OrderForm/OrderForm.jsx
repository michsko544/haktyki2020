import React from 'react'
import * as Yup from 'yup'
import { withFormik, Form, Field } from 'formik'
import Checkbox from '@material-ui/core/Checkbox'
import { SmallTitle } from '../Header'
import Input from '../../../Input'
import Button from '../../../Button'
import { ButtonWrapper } from '../../'

const OrderForm = ({ values, touched, errors }) => {
  const isDarkMode = true
  const [hasCoupon, setHasCoupon] = React.useState(false)

  const showCouponInput = () =>
    !hasCoupon ? (
      <>
        <Checkbox color="primary" onClick={() => setHasCoupon(true)}>
          <Field
            type="checkbox"
            name="couponCheckbox"
            checked={values.couponCheckbox}
          />
        </Checkbox>
        {'Mam kupon'}
      </>
    ) : (
      <Input type="text" label="Kod kuponu" name="coupon" />
    )

  return (
    <Form>
      <SmallTitle isdarkmode={isDarkMode.toString()}>
        {`Co chcesz zamówić?`}
      </SmallTitle>
      <Input
        as="textarea"
        label="Treść zamówienia"
        name="order"
        error={touched.order && errors.order}
        style={{ height: 100 }}
        placeholder="Penne z boczkiem i brokułami w sosie śmietanowym, kompot, zestaw sztućców"
      />
      {showCouponInput()}
      <ButtonWrapper>
        <Button text="Zapisz" type="submit" />
      </ButtonWrapper>
    </Form>
  )
}

const OrderFormik = withFormik({
  mapPropsToValues() {
    return {
      order: '',
      coupon: '',
      couponCheckbox: false,
    }
  },

  validationSchema: Yup.object().shape({
    //order: Yup.string().required('Wypełnij to pole'),
  }),

  handleSubmit(values, { resetForm, setSubmitting }) {
    setTimeout(() => {
      console.log(values)
      setSubmitting(false)
      resetForm()
    }, 2000)
  },
})(OrderForm)

export default OrderFormik
