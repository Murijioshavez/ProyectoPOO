// src/api/authService.ts
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

/** Login con Google usando popup (recomendado en desktop). */
export async function loginWithGooglePopup() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const idToken = await user.getIdToken(/* forceRefresh */ true);
  return { user, idToken };
}

/** Inicia flujo con redirect (útil en iOS/Safari). */
export async function startLoginWithGoogleRedirect() {
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider);
}

/** Recupera el resultado del redirect tras volver a tu app. */
export async function handleGoogleRedirectResult() {
  const result = await getRedirectResult(auth);
  if (!result) return null;
  const user = result.user;
  const idToken = await user.getIdToken(true);
  return { user, idToken };
}
