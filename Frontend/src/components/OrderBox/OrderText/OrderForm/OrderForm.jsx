import React from 'react'
import * as Yup from 'yup'
import { withFormik, Form } from 'formik'
import { SmallTitle } from '../Header'
import Input from "../../../Input"

const OrderForm = ({values, errors}) => {
    const isDarkMode = true

    return (
      <Form>
          <SmallTitle isdarkmode={isDarkMode.toString()}>
                {`Co chcesz zamówić?`}
          </SmallTitle>
          <Input type="text" name="order"/>
          <Input type="checkbox" name="coupon" checked={values.coupon}/>
        </Form>
    )
}

const OrderFormik = withFormik({
  mapPropsToValues() {
    return {
      order: "",
      coupon: false
    }
  },

  validationSchema: Yup.object().shape({
    order: Yup.string().required('Wypełnij to pole'),
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
