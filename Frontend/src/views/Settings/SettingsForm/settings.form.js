import React from 'react'
import * as Yup from 'yup'
import { withFormik, Form } from 'formik'
import { Input, InputStyled } from './../../../components/Inputs'
import {
  ButtonFormWrapper,
  default as Button,
} from './../../../components/Button'
import Store from './../../../components/App/App.store'

const SettingsForm = ({ errors, touched, isSubmitting }) => {
  const errorHandler = (name) => touched[name] && errors[name]

  return (
    <>
      <Form>
        <InputStyled>
          <Input
            type="text"
            name="user"
            label="Imię i nazwisko"
            placeholder="Tomek Adamczyk"
            error={errorHandler('user')}
            style={{ textTransform: 'capitalize' }}
          />
        </InputStyled>
        <InputStyled>
          <Input
            type="tel"
            name="blik"
            label="Numer telefonu do BLIK"
            placeholder="603 424 420"
            error={errorHandler('blik')}
          />
        </InputStyled>
        <InputStyled>
          <Input
            type="text"
            name="account"
            label="Numer konta do przelewów"
            placeholder="78 2323 4333 1234 2333 0000"
            error={errorHandler('account')}
          />
        </InputStyled>
        <ButtonFormWrapper>
          <Button disabled={isSubmitting} text="Zapisz i wróć" type="submit" />
        </ButtonFormWrapper>
      </Form>
    </>
  )
}

const SettingsFormik = () => {
  const store = Store.useStore()

  const SettingsWithFormik = withFormik({
    mapPropsToValues() {
      return {
        user: store.get('user') || '',
        blik: '',
        account: '',
      }
    },

    validationSchema: Yup.object().shape({
      user: Yup.string()
        .matches(
          /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]*$/,
          'Pole nie może zawierać znaków specjalnych, ani cyfr'
        )
        .matches(
          /^[A-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+\s+[A-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+ ?$/,
          'Podaj dwa wyrazy'
        )
        .min(3, 'Pole musi mieć minimum 3 znaki')
        .max(50, 'Pole musi mieć maksimum 50 znaków')
        .required('Wypełnij to pole'),
      blik: Yup.string()
        .min(9, 'Pole musi mieć minimum 9 znaków')
        .max(12, 'Pole musi mieć maksimum 12 znaków')
        .matches(
          /^[0-9]{3}[ ]{0,1}[0-9]{3}[ ]{0,1}[0-9]{3} ?$/,
          'Podaj poprawny, 9-cyfrowy numer telefonu'
        )
        .required('Wypełnij to pole'),
      account: Yup.string()
        .min(22, 'Pole musi mieć minimum 22 znaków')
        .max(28, 'Pole musi mieć maksimum 28 znaków')
        .matches(
          /^[0-9]{2}[ ]{0,1}[0-9]{4}[ ]{0,1}[0-9]{4}[ ]{0,1}[0-9]{4}[ ]{0,1}[0-9]{4}[ ]{0,1}[0-9]{4} ?$/,
          'Podaj poprawny, 22-cyfrowy numer konta'
        )
        .required('Wypełnij to pole'),
    }),

    handleSubmit(values, { resetForm, setSubmitting }) {
      setTimeout(() => {
        console.log(values)
        setSubmitting(false)
        resetForm()
      }, 200)
    },
  })(SettingsForm)

  return <SettingsWithFormik />
}

export default SettingsFormik
