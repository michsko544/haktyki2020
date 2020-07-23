import React from 'react'
import * as Yup from 'yup'
import { withFormik, Form } from 'formik'
import Checkbox from '@material-ui/core/Checkbox'
import { SmallTitle } from '../Header'
import { CheckboxStyled } from './OrderForm.style'
import Input from '../../../Input'
import Button from '../../../Button'
import { ButtonWrapper } from '../../'

const OrderForm = ({ values, touched, errors, handleChange, handleBlur }) => {
  const isDarkMode = true
  const [hasCoupon, setHasCoupon] = React.useState(false)

  const showCouponInput = () =>
    !hasCoupon ? (
      <CheckboxStyled>
        <Checkbox
          color="primary"
          onClick={() => setHasCoupon(true)}
          checked={hasCoupon}
        />
        {'Mam kupon'}
      </CheckboxStyled>
    ) : (
      <Input type="text" label="Kod kuponu" name="coupon" />
    )

  return (
    <Form>
      <SmallTitle isdarkmode={isDarkMode.toString()}>
        {`Co chcesz zamówić?`}
      </SmallTitle>
      <Input
        name="orderContent"
        as="textarea"
        label="Treść zamówienia"
        style={{ height: 80 }}
        value={values.orderContent}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.orderContent && errors.orderContent}
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
      orderContent: '',
      coupon: '',
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
    }, 2000)
  },
})(OrderForm)

export default OrderFormik
