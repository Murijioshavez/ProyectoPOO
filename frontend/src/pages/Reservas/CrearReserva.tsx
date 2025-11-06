import React from "react";

const CrearReserva: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Encabezado */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Crear Nueva Reserva
        </h1>
        <p className="text-gray-500 text-base">
          Completa la información para agendar una nueva reserva de sala.
        </p>
      </div>

      {/* Contenedor del formulario */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <form className="space-y-6">
          {/* Nombre del solicitante */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Solicitante
            </label>
            <input
              type="text"
              placeholder="Ej. Juan Pérez"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
          </div>

          {/* Correo electrónico */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="juan.perez@keyinstitute.edu.sv"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
          </div>

          {/* Selección de sala */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sala a Reservar
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            >
              <option value="">Selecciona una sala</option>
              <option value="101">M 201 - Mentoría</option>
              <option value="202">Sala 202 - Trabajo en equipo</option>
              <option value="303">Sala 303 - Presentaciones</option>
            </select>
          </div>

          {/* Fecha y hora */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hora
              </label>
              <input
                type="time"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              />
            </div>
          </div>

          {/* Motivo o descripción */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Motivo de la Reserva
            </label>
            <textarea
              rows={4}
              placeholder="Describe brevemente el propósito de la reserva..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            ></textarea>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all"
            >
              Guardar Reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearReserva;
