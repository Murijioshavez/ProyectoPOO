// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLarKoAlLK2qxFGwqOyGvOoUaZpizAwFQ",
  authDomain: "loginpoo-ee802.firebaseapp.com",
  projectId: "loginpoo-ee802",
  storageBucket: "loginpoo-ee802.firebasestorage.app",
  messagingSenderId: "440636884289",
  appId: "1:440636884289:web:b81f54b0a34b303c4f0dc0"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
export {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId}
