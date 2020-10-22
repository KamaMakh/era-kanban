import firebase from "firebase";
const config = {
  piKey: "AIzaSyDC0ukOMiCxFNvXyK_bJJd6Nmgqc0IJEKE",
  authDomain: "era-canban.firebaseapp.com",
  databaseURL: "https://era-canban.firebaseio.com",
  projectId: "era-canban",
  storageBucket: "era-canban.appspot.com",
  messagingSenderId: "455993501165",
  appId: "1:455993501165:web:b38283b2ee81ea9cfa73e4",
  measurementId: "G-REZ8B7MTHL",
  rules: {
    ".read": true,
    ".write": true
  }
};
firebase.initializeApp(config)
const database = firebase.database()

export default database
