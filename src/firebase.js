import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import 'firebase/functions'


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDpPiSU7WGFi0O3GeIr9RfaaYik_r7nyvY",
    authDomain: "encuestas-web-20883.firebaseapp.com",
    databaseURL: "https://encuestas-web-20883.firebaseio.com",
    projectId: "encuestas-web-20883",
    storageBucket: "encuestas-web-20883.appspot.com",
    messagingSenderId: "310770952506",
    appId: "1:310770952506:web:d9bd2bd0d9a7547bb74803"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()

  const auth = firebase.auth()

  // esto sirve para leer (solo leer) las funciones)
  const functions = firebase.functions()

  export {db, auth, firebase, functions}