// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generator-c1892.firebaseapp.com",
  projectId: "ai-course-generator-c1892",
  storageBucket: "ai-course-generator-c1892.appspot.com",
  messagingSenderId: "693776197367",
  appId: "1:693776197367:web:1337b6fec7eaff9ffc15f2",
  measurementId: "G-YSDPEMFPEC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
