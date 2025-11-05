// src/api/firebase.ts
import { initializeApp, type FirebaseOptions, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } from "./credenciales";

const firebaseConfig: FirebaseOptions = {
  apiKey: apiKey,
  authDomain: `${authDomain}.firebaseapp.com`,
  projectId: projectId as string,
  appId: appId as string,
  // Asegúrate que sea el nombre del bucket (no la URL)
  storageBucket:
    (storageBucket as string) ||
    `${projectId }.appspot.com`,
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export default app;