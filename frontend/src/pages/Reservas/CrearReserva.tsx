import React, { useState } from "react";

const CrearReserva: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    salaId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "start") {
      const startDate = new Date(value);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

      setFormData((prev) => ({
        ...prev,
        start: value,
        end:
          !prev.end || new Date(prev.end) <= startDate
            ? endDate.toISOString().slice(0, 16)
            : prev.end,
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.start || !formData.end || !formData.salaId) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    console.log("Reserva creada:", formData);
    alert("Reserva creada correctamente (solo demo)");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Encabezado */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
          Crear Nueva Reserva
        </h1>
        <p className="text-gray-200 text-base">
          Completa los campos para registrar una nueva reserva.
        </p>
      </div>

      {/* Formulario */}
      <div className="rounded-2xl bg-gradient-to-br from-[#ffffff20] to-[#ffffff05] backdrop-blur-xl border border-white/20 shadow-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6 text-white">
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
              <option value="">Selecciona una sala</option>
              <option value="sala1">Sala 1</option>
              <option value="sala2">Sala 2</option>
              <option value="sala3">Sala 3</option>
              <option value="sala4">Sala 4</option>
              <option value="sala5">Sala 5</option>
              <option value="sala6">Sala 6</option>
              <option value="sala7">Sala 7</option>
            </select>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[#F5F500]">
                Inicio
              </label>
              <input
                type="datetime-local"
                name="start"
                value={formData.start}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#31F483] focus:border-[#31F483] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[#F5F500]">
                Fin
              </label>
              <input
                type="datetime-local"
                name="end"
                value={formData.end}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#31F483] focus:border-[#31F483] outline-none transition-all"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-6 py-3 rounded-lg border border-white/40 text-white hover:bg-white/20 transition-all"
              onClick={() =>
                setFormData({ title: "", start: "", end: "", salaId: "" })
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
