import * as firebase from 'firebase/app'
import 'firebase/messaging'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'hacktyki2020.firebaseapp.com',
  databaseURL: 'https://hacktyki2020.firebaseio.com',
  projectId: 'hacktyki2020',
  storageBucket: 'hacktyki2020.appspot.com',
  messagingSenderId: '1046227462480',
  appId: '1:1046227462480:web:8384f419b26c1accc6e455',
  measurementId: 'G-1B23RZJ8HT',
}

try {
firebase.initializeApp(config)
} catch (e) {
  console.warn('Firebase error: ', e)
}

export default firebase
