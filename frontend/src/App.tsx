import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Contexto de autenticación PRIMERO
import { AuthProvider } from "./contexts/AuthContext";

// Componentes que dependen de AuthProvider
import Layout from "./components/common/Layout/Layout";
import MainApp from "./pages/MainApp"; // Extrae el contenido de MainApp si es necesario

// Otras páginas
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Reservas from "./pages/Reservas/Reservas";
import CrearReserva from "./pages/Reservas/CrearReserva";
import EditarReserva from "./pages/Reservas/EditarReserva";
import Clientes from "./pages/Clientes/Clientes";
import ProtectedRoute from "./components/common/ProtectedRoute";

// App principal - SIN AuthProvider aquí
const AppContent: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route
            path="/reservas/crear"
            element={
              <ProtectedRoute>
                <CrearReserva />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservas/editar/:id"
            element={
              <ProtectedRoute>
                <EditarReserva />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-[70vh]">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-[#7E7D8A] mb-4">404</h1>
                  <p className="text-xl text-[#000] mb-6">Página no encontrada</p>
                  <button
                    onClick={() => (window.location.href = "/")}
                    className="bg-[#006DFF] hover:bg-[#0055CC] text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
                  >
                    Volver al Inicio
                  </button>
                </div>
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

// App principal ENVUELTA con AuthProvider
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;