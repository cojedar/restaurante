import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCwomcQdSJAZg0WjT2doKsHqcxWT1nRqWQ",
  authDomain: "proyectos-eb274.firebaseapp.com",
  projectId: "proyectos-eb274",
  storageBucket: "proyectos-eb274.appspot.com",
  messagingSenderId: "162576367907",
  appId: "1:162576367907:web:b3a9aa4bed8d39a7bccc96"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  const auth = firebase.auth()

  export {db,auth}

