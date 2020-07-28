// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyDCsve-0cIPkEyeribEuLmZJf5T8mu3IWg',
  authDomain: 'hacktyki2020.firebaseapp.com',
  databaseURL: 'https://hacktyki2020.firebaseio.com',
  projectId: 'hacktyki2020',
  storageBucket: 'hacktyki2020.appspot.com',
  messagingSenderId: '1046227462480',
  appId: '1:1046227462480:web:8384f419b26c1accc6e455',
  measurementId: 'G-1B23RZJ8HT',
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})
