import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <section className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          ¡Bienvenido al Sistema de Reservas!
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Gestiona tus reservas de manera eficiente y profesional
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/reservas"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-105 shadow-md"
          >
            📋 Ver Reservas
          </Link>
          <Link 
            to="/reservas/crear"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-105 shadow-md"
          >
            ➕ Nueva Reserva
          </Link>
          <Link 
            to="/clientes"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-105"
          >
            👥 Gestionar Clientes
          </Link>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Resumen Rápido</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-xl text-center shadow-lg">
            <h4 className="text-3xl font-bold mb-2">5</h4>
            <p className="text-purple-100">Reservas Hoy</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 rounded-xl text-center shadow-lg">
            <h4 className="text-3xl font-bold mb-2">12</h4>
            <p className="text-blue-100">Total Reservas</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl text-center shadow-lg">
            <h4 className="text-3xl font-bold mb-2">3</h4>
            <p className="text-orange-100">Pendientes</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;