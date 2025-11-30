// src/pages/Login/Login.tsx
import React, { useEffect, useState } from "react";
import {
  loginWithGooglePopup,
  handleGoogleRedirectResult,
} from "../../api/authService";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const hasRedirect = window.location.href.includes("oauthredirect");
      if (!hasRedirect) return; 

      try {
        const res = await handleGoogleRedirectResult();
        if (res) {
          const nombre = res.user?.displayName || "Usuario";
          localStorage.setItem("usuario", nombre);

          await sendTokenToBackend(res.idToken);
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
      const { idToken, user } = await loginWithGooglePopup();

      const nombre = user?.displayName || "Usuario";
      localStorage.setItem("usuario", nombre);

      await sendTokenToBackend(idToken);
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

  function parseFirebaseError(error: any): string {
    return error?.message || "Error desconocido";
  }

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <button onClick={onGoogleSignIn} disabled={loading}>
        {loading ? "Cargando..." : "Iniciar sesión con Google"}
      </button>
    </div>
  );
};

export default Login;
