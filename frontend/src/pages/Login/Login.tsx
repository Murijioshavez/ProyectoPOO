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
  function saveUserToLocalStorage(user: any) {
    if (!user) return;

    const nombreCompleto = user.displayName || "Usuario";
    const partes = nombreCompleto.split(" ");

    const usuario = {
      nombres: partes.slice(0, -1).join(" ") || partes[0] || "Usuario",
      apellidos: partes.length > 1 ? partes.slice(-1).join(" ") : "",
      email: user.email || "",
      foto: user.photoURL || "",
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
  }

  useEffect(() => {
    (async () => {
      const hasRedirect = window.location.href.includes("oauthredirect");
      if (!hasRedirect) return;

      try {
        const res = await handleGoogleRedirectResult();
        if (res) {
          saveUserToLocalStorage(res.user);

          await sendTokenToBackend(res.idToken);
          navigate("/", { replace: true });
        }
      } catch (e: any) {
        setMsg(e?.message || "Error desconocido");
      }
    })();
  }, [navigate]);

  async function onGoogleSignIn() {
    setMsg(null);
    setLoading(true);

    try {
      const { idToken, user } = await loginWithGooglePopup();

      saveUserToLocalStorage(user);

      await sendTokenToBackend(idToken);
      navigate("/", { replace: true });
    } catch (e: any) {
      setMsg(e?.message || "Error desconocido");
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
