import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCDyS5_QZUorhybVo93wmTLELIQy1y6Co4",
    authDomain: "store-recording.firebaseapp.com",
    databaseURL: "https://store-recording.firebaseio.com",
    projectId: "store-recording",
    storageBucket: "store-recording.appspot.com",
    messagingSenderId: "40962282322",
    appId: "1:40962282322:web:bb2eec9b3918c1c8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export { db };