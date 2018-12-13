import Rebase from 're-base';
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBqWRHqfxb2Sf1Dy_Tw9HeklUASR1J5FS0",
    authDomain: "catch-of-the-day-dan-1ffa0.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-dan-1ffa0.firebaseio.com",
    projectId: "catch-of-the-day-dan-1ffa0",
    storageBucket: "catch-of-the-day-dan-1ffa0.appspot.com",
    messagingSenderId: "449131196860"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
