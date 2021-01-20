import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBY8vLHR9LIusNWl9zr0O25yTjU1kXyzNg",
    authDomain: "muso-ninjas-2fd74.firebaseapp.com",
    projectId: "muso-ninjas-2fd74",
    storageBucket: "muso-ninjas-2fd74.appspot.com",
    messagingSenderId: "280446068236",
    appId: "1:280446068236:web:a07d598aa735decf00f029"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {
    projectFirestore,
    projectAuth,
    projectStorage,
    timestamp
}