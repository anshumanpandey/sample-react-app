importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyA8omet5c_3AWcmx3A6Pe5WSWS5ibOQmBc",
    authDomain: "floquote-306615.firebaseapp.com",
    projectId: "floquote-306615",
    storageBucket: "floquote-306615.appspot.com",
    messagingSenderId: "279354336606",
    appId: "1:279354336606:web:3150802998980a9793dbcf",
    measurementId: "G-V5ST20WWHF"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
     const promiseChain = clients
          .matchAll({
               type: "window",
               includeUncontrolled: true,
          })
          .then((windowClients) => {
               console.log({ payload })
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

self.addEventListener("push", function(payload) {
     const promiseChain = clients
          .matchAll({
               type: "window",
               includeUncontrolled: true,
          })
          .then((windowClients) => {
               console.log({ payload })
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