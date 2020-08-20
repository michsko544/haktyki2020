import * as Yup from 'yup'

export const teamfoodFormValidationSchema = Yup.object().shape({
  restaurant: Yup.string()
    .required('Wypełnij to pole')
    // eslint-disable-next-line
    .min(5, 'Wybierz dłuższą nazwę, minimum ${min} znaków')
    .max(191, 'Serwer nie ogarnie! Za długa nazwa'),
  date: Yup.string()
    .required('Wypełnij to pole')
    .test('datetime-test', 'Data nie może być w przeszłości', function (date) {
      let { time } = this.parent
      if (typeof time === 'undefined' && new Date(`${date}`) <= new Date()) return false
      if (typeof time === 'undefined') return true

      const datetime = new Date(`${date} ${time}`)
      const now = new Date()
      return datetime > now
    })
    .test('datetime-buffer-test', 'Wymagamy 15 minut czasu, żeby inni mogli dołączyć!', function (date) {
      let { time } = this.parent
      if (typeof time === 'undefined') return true

      const datetime = new Date(`${date} ${time}`)
      const now = new Date()
      const buffer = 15 //minut
      now.setMinutes(now.getMinutes() + buffer)
      return datetime > now
    }),
  time: Yup.string().required('Wypełnij to pole'),
  description: Yup.string()
    .required('Wypełnij to pole')
    // eslint-disable-next-line
    .min(5, 'Wprowadź dłuższy opis, minimum ${min} znaków')
    .max(191, 'Serwer nie ogarnie! Za długi opis szefuniu'),
  paymentForm: Yup.string().required('Zaznacz jedną z opcji'),
  image: Yup.string().required('Wybierz zdjęcie (☞ﾟヮﾟ)☞'),
})

export default teamfoodFormValidationSchema
