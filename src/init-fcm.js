import firebase from 'firebase/app'
import "firebase/messaging";
const firebaseConfig = {
    apiKey: "AIzaSyB38Ud1klNDKoP5yatS5w0opO9I9fa-BR8",
    authDomain: "notification-18e4f.firebaseapp.com",
    databaseURL: "https://notification-18e4f.firebaseio.com",
    projectId: "notification-18e4f",
    storageBucket: "notification-18e4f.appspot.com",
    messagingSenderId: "1016992541162",
    appId: "1:1016992541162:web:06632055956f5ef182ea93",
    measurementId: "G-6EMZ2B23LY"
};
const initializedFirebaseApp = firebase.initializeApp(firebaseConfig);
console.log("initializedFirebaseApp",initializedFirebaseApp)
const messaging = initializedFirebaseApp.messaging();
console.log("messaging",messaging)
export { messaging };