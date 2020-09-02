// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB0AUTInDeMI4_ClV7YSSQzyCZGifONYJo",
  authDomain: "chrtsio.firebaseapp.com",
  databaseURL: "https://chrtsio.firebaseio.com",
  projectId: "chrtsio",
  storageBucket: "chrtsio.appspot.com",
  messagingSenderId: "266074650529",
  appId: "1:266074650529:web:d90b786da5405068bb7de0",
  measurementId: "G-RLW45F0GCS"
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
  firebase.auth().onAuthStateChanged(user => {
    console.log('auth state changed, user:', user)
  })
}

export default firebase