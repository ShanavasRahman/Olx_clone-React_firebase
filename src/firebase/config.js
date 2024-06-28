import firebase from 'firebase' 

import 'firebase/auth'

import 'firebase/firebase-firestore'

import 'firebase/firebase-storage'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdbSttbvI5QVb98rLTXu2CP4s64mG-i8s",
    authDomain: "olx-clone-cdbd8.firebaseapp.com",
    projectId: "olx-clone-cdbd8",
    storageBucket: "olx-clone-cdbd8.appspot.com",
    messagingSenderId: "241093566073",
    appId: "1:241093566073:web:62d24147cd5068ed40bea8",
    measurementId: "G-75BFQ811CP"
};
  
export default firebase.initializeApp(firebaseConfig);
