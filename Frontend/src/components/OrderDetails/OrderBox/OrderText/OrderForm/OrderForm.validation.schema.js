import * as Yup from 'yup'

export const orderFormValidationSchema = (isPurchaser) => {
  console.log(isPurchaser, 'from validation schema')
  return Yup.object().shape({
    orderContent: Yup.string()
      .min(5, 'Pole może zawierać minimalnie 5 znaków')
      .max(191, 'Pole może zawierać maksymalnie 190 znaków')
      .required('Wypełnij to pole'),
    coupon: Yup.string().max(20, 'Pole może zawierać maksymalnie 20 znaków'),
    couponDescription: Yup.string().max(100, 'Pole może zawierać maksymalnie 100 znaków'),
    date: isPurchaser ? Yup.string().required('Wypełnij to pole') : Yup.string(),
    hour: isPurchaser ? Yup.string().required('Wypełnij to pole') : Yup.string(),
    payment: isPurchaser ? Yup.string().required('Zaznacz to pole') : Yup.string(),
  })
}
