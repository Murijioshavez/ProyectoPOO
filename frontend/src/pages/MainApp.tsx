import React from "react";

const MainApp: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Sección de bienvenida */}
      <section className="bg-white rounded-2xl shadow-md p-10 text-center border border-[#006DFF]">
        <h2 className="text-4xl font-bold text-[#000] mb-4">
          Bienvenido al Sistema de Reservas
        </h2>
        <p className="text-lg text-[#7E7D8A] mb-8">
          Administra fácilmente las reservas de salas de mentoría para
          estudiantes
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => (window.location.href = "/reservas")}
            className="bg-[#006DFF] hover:bg-[#0055CC] text-white px-6 py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-105 shadow-md"
          >
            Ver Salas Disponibles
          </button>
          <button
            onClick={() => (window.location.href = "/reservas/crear")}
            className="bg-[#31F483] hover:bg-[#28D473] text-[#000] px-6 py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-105 shadow-md"
          >
            Crear Nueva Reserva
          </button>
          <button
            onClick={() => (window.location.href = "/login")}
            className="border border-[#8E4BFB] text-[#8E4BFB] hover:bg-[#8E4BFB] hover:text-white px-6 py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-105"
          >
            Acceder al Sistema
          </button>
        </div>
      </section>

      {/* Sección de estadísticas */}
      <section className="bg-white rounded-2xl shadow-md p-8 border border-[#31F483]">
        <h3 className="text-2xl font-bold text-[#000] mb-6">Resumen Rápido</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#006DFF] text-white p-6 rounded-xl text-center shadow-md">
            <h4 className="text-3xl font-bold mb-2">5</h4>
            <p className="text-blue-100 font-medium">Reservas de Hoy</p>
          </div>
          <div className="bg-[#31F483] text-[#000] p-6 rounded-xl text-center shadow-md">
            <h4 className="text-3xl font-bold mb-2">12</h4>
            <p className="text-gray-800 font-medium">Salas Activas</p>
          </div>
          <div className="bg-[#F5F500] text-[#000] p-6 rounded-xl text-center shadow-md">
            <h4 className="text-3xl font-bold mb-2">3</h4>
            <p className="text-gray-800 font-medium">Reservas Pendientes</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainApp;