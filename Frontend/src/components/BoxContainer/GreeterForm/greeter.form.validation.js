import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]*$/,
        'Pole nie może zawierać znaków specjalnych'
      )
      .matches(
        /^[A-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+\s+[A-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+ ?$/,
        'Podaj imię i nazwisko'
      )
      .min(3, 'Minimum 3 znaki. Po znajomości')
      .max(50, 'Maksymalnie 50 znaków szefie')
      .required('Wypełnij to pole'),
  })
