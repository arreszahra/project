// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-de210.firebaseapp.com",
  projectId: "taskmanager-de210",
  storageBucket: "taskmanager-de210.appspot.com",
  messagingSenderId: "220363153791",
  appId: "1:220363153791:web:45ce965e334191b4e6fa4a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);