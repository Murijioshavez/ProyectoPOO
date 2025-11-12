import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { apiKey, authDomain, projectId, storageBucket, appId } from "./credenciales";

const firebaseConfig = {
  apiKey,
  authDomain: `${authDomain}.firebaseapp.com`,
  projectId,
  appId,
  storageBucket: storageBucket || `${projectId}.appspot.com`,
  
};

// Inicializa o reutiliza la app
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth: Auth = getAuth(app);
export default app;
