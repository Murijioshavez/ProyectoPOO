// src/pages/Login/Login.tsx
import React, { useEffect, useState } from "react";
import {
  loginWithGooglePopup,
  handleGoogleRedirectResult,
  // startLoginWithGoogleRedirect, // si quieres usar redirect
} from "../../api/authService";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Si usas redirect, al volver de Google se ejecuta este efecto
  useEffect(() => {
    (async () => {
      try {
        const res = await handleGoogleRedirectResult();
        if (res) {
          await sendTokenToBackend(res.idToken);
          // ✅ Redirige a /dashboard
          navigate("/dashboard", { replace: true });
        }
      } catch (e: any) {
        setMsg(parseFirebaseError(e));
      }
    })();
  }, [navigate]);

  async function onGoogleSignIn() {
    setMsg(null);
    setLoading(true);
    try {
      const { idToken } = await loginWithGooglePopup();
      await sendTokenToBackend(idToken);
      // ✅ Redirige a /dashboard
      navigate("/dashboard", { replace: true });
    } catch (e: any) {
      setMsg(parseFirebaseError(e));
    } finally {
      setLoading(false);
    }
  }

  async function sendTokenToBackend(idToken: string) {
    await fetch("/api/auth/firebase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ idToken }),
    });
  }


return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[400px] h-[400px] bg-[rgb(0,109,255)] rounded-3xl blur-3xl opacity-30"></div>
    </div>

    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl relative z-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Iniciar Sesión</h2>
      <p className="text-center mb-8">Sistema de Gestión de Reservas</p>

      {/* Botón Google */}
      <button
        onClick={onGoogleSignIn}
        disabled={loading}
        className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-3"
      >
        <GoogleIcon />
        {loading ? "Conectando…" : "Entrar con Google"}
      </button>

      {msg && <p className="mt-4 text-center text-sm text-red-600">{msg}</p>}
    </div>
  </div>
);
};

export default Login;

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" className="shrink-0">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.8 33 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.7 3l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.4 19 14 24 14c3 0 5.7 1.1 7.7 3l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.4l-6.3-5.2C29.3 36 26.8 37 24 37c-5.2 0-9.6-3.5-11.2-8.3l-6.5 5C9.7 39.8 16.3 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.8-3.2 4.9-5.9 6.1l.1.1 6.3 5.2C38.7 37.9 44 32.9 44 24c0-1.3-.1-2.7-.4-3.5z"/>
    </svg>
  );
}

function parseFirebaseError(err: any) {
  const code = (err?.code || "").toString();
  const map: Record<string, string> = {
    "auth/popup-closed-by-user": "Se cerró la ventana antes de finalizar.",
    "auth/popup-blocked": "El navegador bloqueó el popup. Usa el botón de redirect.",
    "auth/cancelled-popup-request": "Se canceló la solicitud anterior.",
    "auth/network-request-failed": "Problema de red. Intenta de nuevo.",
  };
  return map[code] || `Error: ${code || err?.message || "desconocido"}`;
}
