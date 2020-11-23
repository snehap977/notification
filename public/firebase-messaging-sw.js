importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
// import firebase from 'firebase'
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
console.log("in fire base file")
const fire=firebase.initializeApp(firebaseConfig);
console.log("fire",fire)
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
     console.log("setBackgroundMessageHandler",payload)
     const promiseChain = clients
          .matchAll({
               type: "window",
               includeUncontrolled: true,
          })
          .then((windowClients) => {
               for (let i = 0; i < windowClients.length; i++) {
                    const windowClient = windowClients[i];
                    windowClient.postMessage(payload);
               }
          })
          .then(() => {
               return registration.showNotification("my notification title");
          });
     return promiseChain;
});
self.addEventListener("notificationclick", function(event) {
     console.log(event);
});