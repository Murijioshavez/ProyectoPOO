import React, { useState } from "react";
import { crearReserva, Reserva } from '../../api/reservaService';

const CrearReserva: React.FC = () => {
  // Fecha de hoy en formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    title: "",
    fecha: today, // fecha fija: hoy
    horaInicio: "",
    horaFin: "",
    salaId: "",
    resourceId: ""
  });

  // Generar opciones de hora de 8:00 a 17:00
  const horasDisponibles = Array.from({ length: 10 }, (_, i) => {
    const hora = i + 8;
    return { value: hora, label: `${hora}:00` };
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "horaInicio") {
      // Calcular hora de fin automáticamente (horaInicio + 1)
      const horaFin = parseInt(value) + 1;
      setFormData((prev) => ({
        ...prev,
        horaInicio: value,
        horaFin: horaFin <= 17 ? horaFin.toString() : "17"
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.horaInicio || !formData.salaId) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    if (parseInt(formData.horaFin) > 17) {
      alert("La reserva no puede extenderse más allá de las 17:00.");
      return;
    }

    const fechaSeleccionada = new Date(formData.fecha);
    const year = fechaSeleccionada.getFullYear();
    const month = fechaSeleccionada.getMonth();
    const day = fechaSeleccionada.getDate();

    const start = new Date(year, month, day, parseInt(formData.horaInicio), 0);
    const end = new Date(year, month, day, parseInt(formData.horaFin), 0);

    const nuevaReserva: Reserva = {
      title: formData.title,
      start: start,
      end: end,
      salaId: formData.salaId,
      resourceId: formData.salaId
    };

    try {
      await crearReserva(nuevaReserva);
      console.log("Reserva creada");
      setFormData({
        title: "",
        fecha: today,
        horaInicio: "",
        horaFin: "",
        salaId: "",
        resourceId: ""
      });
      alert("Reserva creada exitosamente");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Encabezado */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
          Crear Nueva Reserva
        </h1>
        <p className="text-gray-200 text-base">
          Completa los campos para registrar una nueva reserva. Horario: 8:00 - 17:00
        </p>
      </div>

      {/* Formulario */}
      <div className="rounded-2xl bg-gradient-to-br from-[#ffffff20] to-[#ffffff05] backdrop-blur-xl border border-white/20 shadow-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6 text-white">
          {/* Campo oculto con la fecha de hoy */}
          <input type="hidden" name="fecha" value={formData.fecha} />

          {/* Título */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#F5F500]">
              Título del Evento
            </label>
            <input
              type="text"
              name="title"
              placeholder="Ej. Mentoría con Juan Pérez"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#31F483] focus:border-[#31F483] outline-none transition-all"
            />
          </div>

          {/* Sala */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#F5F500]">
              Sala
            </label>
            <select
              name="salaId"
              value={formData.salaId}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#31F483] focus:border-[#31F483] outline-none transition-all"
            >
              <option className="text-black" value="">Selecciona una sala</option>
              <option className="text-black" value="sala1">Sala 1</option>
              <option className="text-black" value="sala2">Sala 2</option>
              <option className="text-black" value="sala3">Sala 3</option>
              <option className="text-black" value="sala4">Sala 4</option>
              <option className="text-black" value="sala5">Sala 5</option>
              <option className="text-black" value="sala6">Sala 6</option>
              <option className="text-black" value="sala7">Sala 7</option>
            </select>
          </div>

          {/* Horas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[#F5F500]">
                Hora Inicio
              </label>
              <select
                name="horaInicio"
                value={formData.horaInicio}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#31F483] focus:border-[#31F483] outline-none transition-all"
              >
                <option className="text-black" value="">Selecciona hora inicio</option>
                {horasDisponibles.map((hora) => (
                  <option key={hora.value} className="text-black" value={hora.value}>
                    {hora.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[#F5F500]">
                Hora Fin
              </label>
              <select
                name="horaFin"
                value={formData.horaFin}
                onChange={handleChange}
                disabled
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-gray-300 cursor-not-allowed"
              >
                <option className="text-black" value="">Se calculará automáticamente</option>
                {horasDisponibles.map((hora) => (
                  <option key={hora.value} className="text-black" value={hora.value}>
                    {hora.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-300 mt-1">
                {formData.horaFin ? `Hora fin: ${formData.horaFin}:00` : "Se establece 1 hora después del inicio"}
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-6 py-3 rounded-lg border border-white/40 text-white hover:bg-white/20 transition-all"
              onClick={() =>
                setFormData({
                  title: "",
                  fecha: today,
                  horaInicio: "",
                  horaFin: "",
                  salaId: "",
                  resourceId: ""
                })
              }
            >
              Limpiar
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-lg font-semibold text-black bg-[#31F483] hover:bg-[#2BE075] shadow-md transition-all"
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
