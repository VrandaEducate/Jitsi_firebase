// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMF4f4S9gXi8x01mhlpUhbLq7WV53aT5g",
    authDomain: "jitsidemowithfirebase.firebaseapp.com",
    projectId: "jitsidemowithfirebase",
    storageBucket: "jitsidemowithfirebase.appspot.com",
    messagingSenderId: "21144378615",
    appId: "1:21144378615:web:2f43d9e6a7044f57fc07f2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FireBaseStore = getFirestore(app);