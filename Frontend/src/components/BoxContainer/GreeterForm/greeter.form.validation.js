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
      .min(3, 'Pole musi mieć minimum 3 znaki')
      .max(50, 'Pole musi mieć maximum 50 znaków')
      .required('Wypełnij to pole'),
  })
