// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBEApOivL-T_JKtKL-JEbLBECc8Nc4Sci4',
  authDomain: 'peepz-7.firebaseapp.com',
  projectId: 'peepz-7',
  storageBucket: 'peepz-7.appspot.com',
  messagingSenderId: '740107990196',
  appId: '1:740107990196:web:47d302524b0f6ddf4cd3e1',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
