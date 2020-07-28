import * as firebase from 'firebase'

const config = {
    apiKey: 'AIzaSyDCsve-0cIPkEyeribEuLmZJf5T8mu3IWg',
    authDomain: 'hacktyki2020.firebaseapp.com',
    databaseURL: 'https://hacktyki2020.firebaseio.com',
    projectId: 'hacktyki2020',
    storageBucket: 'hacktyki2020.appspot.com',
    messagingSenderId: '1046227462480',
    appId: '1:1046227462480:web:8384f419b26c1accc6e455',
    measurementId: 'G-1B23RZJ8HT',
  }

  firebase.initializeApp(config)

  export default firebase
  