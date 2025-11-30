import React from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const usuario = localStorage.getItem("usuario");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0A1428] to-[#006DFF] flex flex-col text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#006DFF] rounded-full blur-[100px] opacity-25"></div>
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-[#8E4BFB] rounded-full blur-[90px] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#31E083] rounded-full blur-[70px] opacity-15"></div>
      </div>

      {/* HEADER */}
      <header className="bg-transparent text-white pt-6 pb-4 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

            {/* logo */}
            <Link
              to="/"
              className="flex items-center justify-center lg:justify-start mb-4 lg:mb-0 relative group"
            >
              <img
                src="/reservas.png"
                alt="Sistema de Reservas"
                className="w-16 h-16 lg:w-32 lg:h-32 object-contain transition-all duration-500 group-hover:brightness-125 group-hover:scale-110 drop-shadow-2xl"
              />
            </Link>

            {/* Navegación */}
            <nav className="flex flex-wrap gap-2 justify-center lg:justify-end relative">
              {[ 
                { path: "/", label: "Inicio" },
                { path: "/reservas", label: "Salas" },
                { path: "/reservas/crear", label: "Nueva Reserva" },
                { path: "/login", label: "Iniciar Sesión" },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isActive(path)
                      ? "bg-gradient-to-r from-[#006DFF] to-[#8E4BFB] text-white shadow-lg shadow-[#006DFF]/40"
                      : "bg-gray-800/80 text-white border border-gray-600 hover:bg-gradient-to-r hover:from-[#006DFF] hover:to-[#8E4BFB] hover:border-transparent hover:shadow-lg hover:shadow-[#006DFF]/30"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/**/}
          {usuario && (
            <p className="text-xl mt-4 font-semibold tracking-wide text-center lg:text-left">
              Bienvenido, {usuario}
            </p>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 container mx-auto px-6 py-8 relative z-10">
        <div className="backdrop-blur-md bg-gray-800/60 rounded-3xl border border-gray-600 shadow-2xl p-8">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-transparent text-white py-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center gap-4">
            <img
              src="/reservas.png"
              className="w-30 h-30 object-contain transition-all duration-500 drop-shadow-lg"
            />
            <p className="text-gray-300 text-lg font-semibold">Sistema de Reservas</p>
            <p className="text-gray-500 text-sm">KeyInstitute</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
