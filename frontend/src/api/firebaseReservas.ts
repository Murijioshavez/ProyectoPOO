import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfigReservas = {
  apiKey: "AIzaSyD3bxOdhq1jsxn43-kEFmI-76kNCcW4osI",
  authDomain: "proyectopoo-5dac8.firebaseapp.com",
  databaseURL: "https://proyectopoo-5dac8-default-rtdb.firebaseio.com",
  projectId: "proyectopoo-5dac8",
  storageBucket: "proyectopoo-5dac8.appspot.com",
  messagingSenderId: "879806307035",
  appId: "1:879806307035:web:523a4ab4a32c3f82414afe",
};

const appReservas = initializeApp(firebaseConfigReservas, "reservasApp"); // nombre distinto
const db = getDatabase(appReservas);

export { db };
