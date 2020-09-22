import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCqeytAdgbXqraM0etbqvmcMO92zlsjxSc",
  authDomain: "fbmessenger-clone-fd3be.firebaseapp.com",
  databaseURL: "https://fbmessenger-clone-fd3be.firebaseio.com",
  projectId: "fbmessenger-clone-fd3be",
  storageBucket: "fbmessenger-clone-fd3be.appspot.com",
  messagingSenderId: "301100356108",
  appId: "1:301100356108:web:d2df60eecc7cd4e6ed5429",
  measurementId: "G-77KXXF5XF1",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
