// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPmiuO_AOc7AqHlsqL_KpOg7hfLQIQPx8",
  authDomain: "hspantryapp-bfbab.firebaseapp.com",
  projectId: "hspantryapp-bfbab",
  storageBucket: "hspantryapp-bfbab.appspot.com",
  messagingSenderId: "509344497770",
  appId: "1:509344497770:web:624497bce30ca1a1cb4a13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };