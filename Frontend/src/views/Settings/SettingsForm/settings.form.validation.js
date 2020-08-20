import * as Yup from 'yup'

export const settingsFormValidation = Yup.object().shape({
    user: Yup.string()
      .matches(
        /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]*$/,
        'Pole nie może zawierać znaków specjalnych, ani cyfr'
      )
      .matches(
        /^[A-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+\s+[A-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+ ?$/,
        'Podaj dwa wyrazy'
      )
      .min(3, 'Pole może zawierać minimalnie 3 znaki')
      .max(50, 'Pole może zawierać maksymalnie 50 znaków')
      .required('Wypełnij to pole'),
    blik: Yup.string()
      .min(9, 'Pole może zawierać minimalnie 9 znaków')
      .max(12, 'Pole może zawierać maksymalnie 12 znaków')
      .matches(
        /^[0-9]{3}[ ]{0,1}[0-9]{3}[ ]{0,1}[0-9]{3} ?$/,
        'Podaj poprawny, 9-cyfrowy numer telefonu'
      )
      .required('Wypełnij to pole'),
    account: Yup.string()
      .min(22, 'Pole może zawierać minimalnie 22 znaków')
      .max(35, 'Pole może zawierać maksymalnie 35 znaków')
      .matches(
        /^[A-Za-z]{0,2}[0-9]{2}[ ]{0,1}[A-Za-z0-9]{4}[ ]{0,1}[0-9]{4}[ ]{0,1}[0-9]{4}[ ]{0,1}[0-9]{4}[ ]{0,1}[0-9]{2,4}[ ]{0,1}[0-9]{0,4} ?$/,
        'Podaj poprawny numer konta'
      )
      .required('Wypełnij to pole'),
    swift: Yup.string()
      .when('account', {
        is: (account) =>
          account
            ? account.length > 1 &&
              /^[A-Z]*$/.test(
                (account[0] + account[1]).toString().toUpperCase()
              ) &&
              (account[0] + account[1]).toString().toUpperCase() !== 'PL'
            : false,
        then: Yup.string().required('Wypełnij to pole'),
      })
      .min(8, 'Pole może zawierać minimalnie 8 znaków')
      .max(11, 'Pole może zawierać maksymalnie 11 znaków')
      .matches(
        /^[A-Za-z0-9]*$/,
        'Pole musi zawierać tylko duże litery i/lub cyfry'
      ),
  })

  export default settingsFormValidation

  