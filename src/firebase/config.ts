import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvdWNPoiwY6j4nwkaHwNFUJnBIfohszr0",
  authDomain: "designcraft-8fdfc.firebaseapp.com",
  projectId: "designcraft-8fdfc",
  storageBucket: "designcraft-8fdfc.firebasestorage.app",
  messagingSenderId: "537828937545",
  appId: "1:537828937545:web:222764adf5f0d8d85e5498",
  measurementId: "G-Z6K0PEE4G8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;