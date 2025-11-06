import React from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#006DFF] flex flex-col text-white">
      {/* HEADER */}
      <header className="bg-gradient-to-b from-black to-[#006DFF] text-white shadow-lg relative overflow-visible">
        <div className="container mx-auto px-15 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Logo grande sin aumentar el alto del header */}
            <Link
              to="/"
              className="flex items-center justify-center md:justify-start mb-2 md:mb-0 relative"
            >
              <img
                src="/salalogos.png"
                alt="Logo"
                className="h-8 w-9 scale-[4] -mt-25 origin-top drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
              />
            </Link>

            {/* Navegación */}
            <nav className="flex flex-wrap gap-2 mt-2 md:mt-0 justify-center md:justify-end">
              {[
                { path: "/", label: "Inicio" },
                { path: "/reservas", label: "Salas" },
                { path: "/reservas/crear", label: "Nueva Reserva" },
                { path: "/login", label: "Iniciar Sesión" },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-5 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    isActive(path)
                      ? "bg-[#31F483] text-black shadow-lg scale-105"
                      : "hover:bg-[#F5F500] hover:text-black"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      {/* FOOTER */}
      <footer className="bg-gradient-to-b from-black to-[#006DFF] text-white py-6 mt-8 shadow-inner">
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/keyblanco.png" alt="Logo" className="h-7 w-7" />
              <div>
                <h3 className="text-lg font-bold text-[#F5F500]">
                  Reservas de Salas
                </h3>
                <p className="text-[#CBCBD4] text-sm">
                  Sistema de gestión para estudiantes
                </p>
              </div>
            </div>
            <div className="text-[#CBCBD4] text-sm text-center md:text-right">
              <p>&copy; keyinstitute</p>
              <p className="mt-1">contacto@universidad.edu</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
