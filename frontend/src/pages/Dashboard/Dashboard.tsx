import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      {/* Encabezado principal */}
      <section className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-10 text-white text-center">
        <h2 className="text-5xl font-extrabold tracking-tight mb-4">
          Aulas de Estudio
        </h2>
        <p className="text-lg opacity-90 mb-10 leading-relaxed">
          Administra y organiza tus reservas de salas con facilidad y eficiencia.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* Ver Reservas */}
          <Link
            to="/reservas"
            className="flex items-center gap-3 bg-white text-blue-700 hover:bg-blue-100 px-8 py-3 rounded-xl font-semibold shadow-md transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Ver Reservas
          </Link>

          {/* Crear Reserva */}
          <Link
            to="/crear-reserva"
            className="flex items-center gap-3 bg-white text-blue-700 hover:bg-blue-100 px-8 py-3 rounded-xl font-semibold shadow-md transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nueva Reserva
          </Link>

          {/* Clientes */}
          <Link
            to="/clientes"
            className="flex items-center gap-3 bg-white text-blue-700 hover:bg-blue-100 px-8 py-3 rounded-xl font-semibold shadow-md transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A4 4 0 0112 15a4 4 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
            Clientes
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
