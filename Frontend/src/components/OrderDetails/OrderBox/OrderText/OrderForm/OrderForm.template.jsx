import React from 'react'
import { Form, Field } from 'formik'
import Checkbox from '@material-ui/core/Checkbox'
import { SmallTitle } from '../Header'
import { CheckboxStyled, CheckboxLabel } from './OrderForm.style'
import { Input, InputStyled } from '../../../../Inputs'
import { DoubleInputStyled } from '../../../../../views/Teamfood/Container/double.input.style'
import Button from '../../../../Button'
import { ButtonWrapper, TextDisplayer } from '../../'
import { RadioGroupFormik } from '../../../../Inputs'
import { useColors } from '../../../../../utils'

const OrderForm = ({ values, touched, errors, isSubmitting, handleChange, handleSubmit, isPurchaser }) => {
  const { mode } = useColors()

  const errorHandler = (name) => touched[name] && errors[name]

  const handleEnter = (event) => {
    if (event.key === 'Enter') handleSubmit()
  }

  const showCouponInput = () =>
    !values.hasCoupon ? (
      <CheckboxStyled>
        <Checkbox color="primary" name="hasCoupon" onChange={handleChange} checked={values.hasCoupon} />
        <CheckboxLabel fontcolor={mode.fontColor}>Mam kupon</CheckboxLabel>
      </CheckboxStyled>
    ) : (
      <>
        <InputStyled>
          <Field type="text" label="Kod kuponu" name="coupon" component={Input} aria-label="coupon-code" aria-required="true" />
        </InputStyled>
        <InputStyled>
          <Field
            componentType="textarea"
            placeholder="Kupon obejmuje zamówienie za minimum 40zł i daje zniżkę 10%"
            label="Informacje o kuponie"
            name="couponDescription"
            component={Input}
            error={errorHandler('couponDescription')}
            aria-label="coupon-description"
            aria-required="true"
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
              aria-label="date"
              aria-required="true"
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
              aria-label="time"
              aria-required="true"
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
            aria-required="true"
          />
        </InputStyled>
      )
    )
  }

  return (
    <Form onKeyPress={handleEnter}>
      <SmallTitle fontcolor={mode.fontColor}>Co chcesz zamówić?</SmallTitle>
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
            aria-label="order"
            aria-required="true"
          />
        </InputStyled>
        {showCouponInput()}
        {showTermInputIfPurchaser()}
        {showPaymentFormIfPurchaser()}
      </TextDisplayer>
      <ButtonWrapper>
        <Button text="Zapisz" type="submit" disabled={isSubmitting} aria-label="submit" aria-required="true" />
      </ButtonWrapper>
    </Form>
  )
}

export default OrderForm
