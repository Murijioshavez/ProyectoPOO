import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SchedulerSalas from '../../components/SchedulerSalas';
import api from '../../api/axiosConfig'; // 👈 Importamos la instancia de Axios

interface Reserva {
  id: number;
  nombre_estudiante: string;
  fecha: string;
  estado: string;
}

const Reservas: React.FC = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 useEffect: se ejecuta cuando el componente se monta
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await api.get('reservas/'); // GET a Django
        setReservas(response.data); // Guardamos la data en el estado
      } catch (err) {
        console.error('Error al obtener reservas:', err);
        setError('No se pudieron cargar las reservas.');
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  // 🔸 Manejamos estados de carga o error
  if (loading) return <p className="text-gray-500">Cargando reservas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Reservas</h1>
        <Link 
          to="/reservas/crear"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
        >
          ➕ Nueva Reserva
        </Link>
      </div>

      {/* Tabla de reservas */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  nombre_estudiante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No hay reservas registradas.
                  </td>
                </tr>
              ) : (
                reservas.map((reserva) => (
                  <tr key={reserva.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {reserva.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reserva.nombre_estudiante}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reserva.fecha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        reserva.estado === 'confirmada'
                          ? 'bg-green-100 text-green-800'
                          : reserva.estado === 'pendiente'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {reserva.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link 
                        to={`/reservas/editar/${reserva.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Editar
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scheduler de salas */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Disponibilidad de salas
        </h2>

        <SchedulerSalas />
      </div>
    </div>
  );
};

export default Reservas;
