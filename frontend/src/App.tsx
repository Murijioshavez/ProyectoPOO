import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Componentes de páginas
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Reservas from './pages/Reservas/Reservas';
import CrearReserva from './pages/Reservas/CrearReserva';
import EditarReserva from './pages/Reservas/EditarReserva';
import Clientes from './pages/Clientes/Clientes';
import Layout from './components/common/Layout/Layout';

// Tu componente principal actual adaptado al tema
const MainApp: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-[#006DFF]"> {/* LCD Blue border */}
        <h2 className="text-4xl font-bold text-[#000] mb-4">
          ¡Bienvenido al Sistema de Reservas!
        </h2>
        <p className="text-xl text-[#7E7D8A] mb-8"> {/* Iron Gray */}
          Gestiona las reservas de salas de mentoría para estudiantes
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => window.location.href = '/reservas'}
            className="bg-[#006DFF] hover:bg-[#0055CC] text-white px-6 py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-105 shadow-lg flex items-center"
          >
            <span className="mr-2">📚</span>
            Ver Salas Disponibles
          </button>
          <button 
            onClick={() => window.location.href = '/reservas/crear'}
            className="bg-[#31F483] hover:bg-[#28D473] text-[#000] px-6 py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-105 shadow-lg flex items-center"
          >
            <span className="mr-2">➕</span>
            Nueva Reserva
          </button>
          <button 
            onClick={() => window.location.href = '/login'}
            className="border-2 border-[#8E4BFB] text-[#8E4BFB] hover:bg-[#8E4BFB] hover:text-white px-6 py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-105 flex items-center"
          >
            <span className="mr-2">🔐</span>
            Acceder al Sistema
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#31F483]"> {/* Mecha Green border */}
        <h3 className="text-2xl font-bold text-[#000] mb-6">Resumen Rápido</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#006DFF] to-[#8E4BFB] text-white p-6 rounded-xl text-center shadow-lg"> {/* LCD Blue to Ultra Violet */}
            <h4 className="text-3xl font-bold mb-2">5</h4>
            <p className="text-blue-100">Reservas Hoy</p>
          </div>
          <div className="bg-gradient-to-br from-[#31F483] to-[#F5F500] text-[#000] p-6 rounded-xl text-center shadow-lg"> {/* Mecha Green to Spark Yellow */}
            <h4 className="text-3xl font-bold mb-2">12</h4>
            <p className="text-gray-800">Salas Activas</p>
          </div>
          <div className="bg-gradient-to-br from-[#F5F500] to-[#FF6B6B] text-[#000] p-6 rounded-xl text-center shadow-lg"> {/* Spark Yellow to Red */}
            <h4 className="text-3xl font-bold mb-2">3</h4>
            <p className="text-gray-800">Pendientes</p>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#F5F500]"> {/* Spark Yellow border */}
        <h3 className="text-2xl font-bold text-[#000] mb-6">Actividad Reciente</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-lg border-l-4 border-[#31F483]"> {/* Mecha Green accent */}
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-[#31F483] rounded-full"></div> {/* Mecha Green */}
              <span className="text-[#000]">Juan Pérez - Sala 101 confirmada</span>
            </div>
            <span className="text-[#7E7D8A]">Hace 2 horas</span> {/* Iron Gray */}
          </div>
          <div className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-lg border-l-4 border-[#F5F500]"> {/* Spark Yellow accent */}
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-[#F5F500] rounded-full"></div> {/* Spark Yellow */}
              <span className="text-[#000]">María García - Sala 203 pendiente</span>
            </div>
            <span className="text-[#7E7D8A]">Hace 5 horas</span> {/* Iron Gray */}
          </div>
        </div>
      </section>
    </div>
  );
};

// App principal con Router
const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Ruta raíz muestra tu contenido actual */}
          <Route path="/" element={<MainApp />} />
          
          {/* Otras rutas */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/reservas/crear" element={<CrearReserva />} />
          <Route path="/reservas/editar/:id" element={<EditarReserva />} />
          <Route path="/clientes" element={<Clientes />} />
          
          {/* Ruta 404 */}
          <Route path="*" element={
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-[#7E7D8A] mb-4">404</h1> {/* Iron Gray */}
                <p className="text-xl text-[#000]">Página no encontrada</p> {/* Negro */}
                <button 
                  onClick={() => window.location.href = '/'}
                  className="mt-4 bg-[#006DFF] hover:bg-[#0055CC] text-white px-6 py-2 rounded-lg transition duration-200"
                >
                  Volver al Inicio
                </button>
              </div>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;