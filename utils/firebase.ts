// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu14zw5zQvOawlZWb6_4DjfIy6Az7QnBA",
  authDomain: "twitter-000.firebaseapp.com",
  projectId: "twitter-000",
  storageBucket: "twitter-000.appspot.com",
  messagingSenderId: "398488086920",
  appId: "1:398488086920:web:72ebed2214fbd77e9bf23d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }
