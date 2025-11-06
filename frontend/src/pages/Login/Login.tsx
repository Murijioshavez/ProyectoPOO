import React from "react";

const Login: React.FC = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-100 to-blue-300"
    >
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md border border-gray-200">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Iniciar Sesión
          </h1>
          <p className="text-sm text-gray-500">
            Sistema de Gestión de Reservas · <strong>Key Institute</strong>
          </p>
        </div>

        {/* Formulario */}
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="nombre.apellido@keyinstitute.edu.sv"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full py-3 font-semibold rounded-lg transition-all duration-300 shadow-md bg-blue-600 hover:bg-blue-700 text-white"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Enlaces secundarios */}
        <div className="mt-6 text-center text-sm text-gray-500">
          ¿Olvidaste tu contraseña?{" "}
          <a
            href="#"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Recuperar
          </a>
        </div>

        <div className="mt-4 text-center text-xs text-gray-400">
          © 2025 Key Institute — Todos los derechos reservados
        </div>
      </div>
    </div>
  );
};

export default Login;
