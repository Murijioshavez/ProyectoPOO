import React from "react";
import { Link } from "react-router-dom";

const Clientes: React.FC = () => {
  const clientes = [
    { id: 1, nombre: "Juan Pérez", correo: "juan.perez@keyinstitute.edu.sv", estado: "activo" },
    { id: 2, nombre: "María García", correo: "maria.garcia@keyinstitute.edu.sv", estado: "inactivo" },
    { id: 3, nombre: "Carlos López", correo: "carlos.lopez@keyinstitute.edu.sv", estado: "activo" },
  ];

  return (
    <div className="space-y-10">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">
            Gestión de Clientes
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Consulta, edita o registra nuevos clientes del sistema.
          </p>
        </div>

        <Link
          to="/clientes/crear"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all text-center"
        >
          + Nuevo Cliente
        </Link>
      </div>

      {/* Tabla de clientes */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Lista de Clientes
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                {["ID", "Nombre", "Correo Electrónico", "Estado", "Acciones"].map((header) => (
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
              {clientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800 border-b">
                    {cliente.id}
                  </td>
                  <td className="px-6 py-4 text-gray-600 border-b">
                    {cliente.nombre}
                  </td>
                  <td className="px-6 py-4 text-gray-600 border-b">
                    {cliente.correo}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        cliente.estado === "activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {cliente.estado.charAt(0).toUpperCase() + cliente.estado.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b flex gap-3">
                    <Link
                      to={`/clientes/editar/${cliente.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium transition"
                    >
                      Editar
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-800 font-medium transition"
                      onClick={() =>
                        alert(`Eliminar cliente #${cliente.id} (solo ejemplo)`)
                      }
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Si no hay clientes */}
          {clientes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No hay clientes registrados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clientes;
