import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage';
import "firebase/auth";
// import dotenv from 'dotenv';

// dotenv.config();
// require('dotenv').config({path: '.env'})

const firebaseConfig = {
  apiKey: "AIzaSyDiEmNJSG9ho98BNccEXj0_5F0qeBJJtXE",
  authDomain: "cs5500-a70f8.firebaseapp.com",
  databaseURL: "https://cs5500-a70f8-default-rtdb.firebaseio.com",
  projectId: "cs5500-a70f8",
  storageBucket: "cs5500-a70f8.appspot.com",
  messagingSenderId: "772060825103",
  appId: "1:772060825103:web:39bd6116618019e1d5857a"
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_MESSAGING_APP_ID
// };

firebase.initializeApp(firebaseConfig);

export default firebase;

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };