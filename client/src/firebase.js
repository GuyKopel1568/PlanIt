// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'project-p-c38b3.firebaseapp.com',
  projectId: 'project-p-c38b3',
  storageBucket: 'project-p-c38b3.firebasestorage.app',
  messagingSenderId: '791275806887',
  appId: '1:791275806887:web:a35eebb0fc5e6f62373b82',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
