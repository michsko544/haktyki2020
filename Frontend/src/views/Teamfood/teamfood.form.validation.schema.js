import * as Yup from 'yup'

export const teamfoodFormValidationSchema = Yup.object().shape({
    restaurant: Yup.string().required('Wypełnij to pole'),
    date: Yup.string().required('Wypełnij to pole'),
    time: Yup.string().required('Wypełnij to pole'),
    description: Yup.string().required('Wypełnij to pole'),
    paymentForm: Yup.string().required('Musisz zaznaczyć jedną z opcji'),
    image: Yup.string().required('Wybierz zdjęcie (☞ﾟヮﾟ)☞'),
  })