import React from "react";
import { Link } from "react-router-dom";
import SchedulerSalas from "../../components/SchedulerSalas";

const Reservas: React.FC = () => {
  const reservas = [
    { id: 1, cliente: "Juan Pérez", fecha: "2025-11-6", estado: "confirmada" },
    { id: 2, cliente: "María García", fecha: "2024-01-16", estado: "pendiente" },
    { id: 3, cliente: "Carlos López", fecha: "2024-01-14", estado: "completada" },
  ];

  return (
    <div className="space-y-10">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">
            Gestión de Reservas
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Administra, edita y consulta las reservas activas en el sistema.
          </p>
        </div>

        <Link
          to="/reservas/crear"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all text-center"
        >
          + Nueva Reserva
        </Link>
      </div>

      {/* Tabla de reservas */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Lista de Reservas
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                {["ID", "Cliente", "Fecha", "Estado", "Acciones"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {reservas.map((reserva) => (
                <tr
                  key={reserva.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-800 border-b">
                    {reserva.id}
                  </td>
                  <td className="px-6 py-4 text-gray-600 border-b">
                    {reserva.cliente}
                  </td>
                  <td className="px-6 py-4 text-gray-600 border-b">
                    {reserva.fecha}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        reserva.estado === "confirmada"
                          ? "bg-green-100 text-green-700"
                          : reserva.estado === "pendiente"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {reserva.estado.charAt(0).toUpperCase() +
                        reserva.estado.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b flex gap-3">
                    <Link
                      to={`/reservas/editar/${reserva.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium transition"
                    >
                      Editar
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-800 font-medium transition"
                      onClick={() =>
                        alert(`Eliminar reserva #${reserva.id} (solo ejemplo)`)
                      }
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Si no hay reservas */}
          {reservas.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No hay reservas registradas.
            </div>
          )}
        </div>
      </div>

      {/* Scheduler de salas */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Disponibilidad de Salas
        </h2>

        {/* Renderizado del calendario */}
        <SchedulerSalas />
      </div>
    </div>
  );
};

export default Reservas;
