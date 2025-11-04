import React, { useState } from 'react';

interface ReservaForm {
  sala: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  nombre: string;
  email: string;
  descripcion: string;
}

const CrearReserva: React.FC = () => {
  const [formData, setFormData] = useState<ReservaForm>({
    sala: '',
    fecha: '',
    horaInicio: '',
    horaFin: '',
    nombre: '',
    email: '',
    descripcion: ''
  });

  const salas = [
    { id: '201', nombre: 'Sala 201 - Pequeña (4 personas)' },
    { id: '202', nombre: 'Sala 202 - Mediana (6 personas)' },
    { id: '203', nombre: 'Sala 203 - Grande (8 personas)' },
    { id: '204', nombre: 'Sala 204 - Pequeña (4 personas)' },
    { id: '205', nombre: 'Sala 205 - Mediana (6 personas)' },
    { id: '206', nombre: 'Sala 206 - Grande (10 personas)' },
    { id: '207', nombre: 'Sala 207 - Premium (12 personas)' }
  ];

  const horasDisponibles = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'horaInicio' && value) {
      const [horas, minutos] = value.split(':');
      const horaFin = `${String(parseInt(horas) + 1).padStart(2, '0')}:${minutos}`;
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        horaFin: horaFin
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos de la reserva:', formData);
    alert('✅ Reserva creada exitosamente');
    
    // Reset form
    setFormData({
      sala: '',
      fecha: '',
      horaInicio: '',
      horaFin: '',
      nombre: '',
      email: '',
      descripcion: ''
    });
  };

  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de que quieres cancelar? Se perderán los datos ingresados.')) {
      setFormData({
        sala: '',
        fecha: '',
        horaInicio: '',
        horaFin: '',
        nombre: '',
        email: '',
        descripcion: ''
      });
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const salaSeleccionada = salas.find(s => s.id === formData.sala);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Crear Nueva Reserva</h1>
      <p className="text-gray-600 mb-6">Completa el formulario para reservar tu espacio de estudio</p>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información de la Sala */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">📅 Información de la Reserva</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Selección de Sala */}
              <div>
                <label htmlFor="sala" className="block text-sm font-medium text-gray-700 mb-2">
                  Sala de Estudio *
                </label>
                <select
                  id="sala"
                  name="sala"
                  value={formData.sala}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona una sala</option>
                  {salas.map((sala) => (
                    <option key={sala.id} value={sala.id}>
                      {sala.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fecha de Reserva */}
              <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Reserva *
                </label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  min={today}
                  max={maxDateString}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Hora de Inicio */}
              <div>
                <label htmlFor="horaInicio" className="block text-sm font-medium text-gray-700 mb-2">
                  Hora de Inicio *
                </label>
                <select
                  id="horaInicio"
                  name="horaInicio"
                  value={formData.horaInicio}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona hora inicio</option>
                  {horasDisponibles.map((hora) => (
                    <option key={hora} value={hora}>
                      {hora}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hora de Fin (automática) */}
              <div>
                <label htmlFor="horaFin" className="block text-sm font-medium text-gray-700 mb-2">
                  Hora de Fin
                </label>
                <input
                  type="text"
                  id="horaFin"
                  name="horaFin"
                  value={formData.horaFin}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">Duración: 1 hora</p>
              </div>
            </div>
          </div>

          {/* Información del Usuario */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">👤 Información del Solicitante</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  placeholder="Ingresa tu nombre completo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="tu@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
              📝 Descripción de la Actividad
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              rows={3}
              placeholder="Describe el propósito de tu estudio, grupo de trabajo, materiales necesarios, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Crear Reserva
            </button>
          </div>
        </form>

        {/* Resumen de la Reserva */}
        {(formData.sala || formData.fecha || formData.horaInicio) && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Resumen de la Reserva</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {formData.sala && salaSeleccionada && (
                <div>
                  <p className="font-medium text-blue-700">Sala:</p>
                  <p className="text-blue-600">{salaSeleccionada.nombre}</p>
                </div>
              )}
              {formData.fecha && (
                <div>
                  <p className="font-medium text-blue-700">Fecha:</p>
                  <p className="text-blue-600">{new Date(formData.fecha).toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
              )}
              {formData.horaInicio && (
                <div>
                  <p className="font-medium text-blue-700">Horario:</p>
                  <p className="text-blue-600">{formData.horaInicio} - {formData.horaFin}</p>
                </div>
              )}
              {formData.nombre && (
                <div>
                  <p className="font-medium text-blue-700">Solicitante:</p>
                  <p className="text-blue-600">{formData.nombre}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrearReserva;