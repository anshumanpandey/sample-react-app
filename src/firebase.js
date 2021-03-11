import firebase from 'firebase/app';
import "firebase/messaging";

if (!firebase.apps.length) {
    firebase.initializeApp({
        // Project Settings => Add Firebase to your web app
        messagingSenderId: "279354336606",
        projectId: "floquote-306615",
        apiKey: "AIzaSyAr3gWZ0HQ9DeWOkVNZMPD-V82SmDZoFSo",
        appId: "1:279354336606:web:3150802998980a9793dbcf",
    });
 }

const messaging = firebase.messaging();
export { messaging };