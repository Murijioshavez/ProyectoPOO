import React from "react";
import SchedulerSalas from "../../components/SchedulerSalas";

const Reservas: React.FC = () => {
  // Leyenda de salas (mismo esquema de colores que en SchedulerSalas)
  const salas = [
    { id: "sala1", name: "Sala 1", color: "#9e5fff" },
    { id: "sala2", name: "Sala 2", color: "#00a9ff" },
    { id: "sala3", name: "Sala 3", color: "#ff5583" },
    { id: "sala4", name: "Sala 4", color: "#03bd9e" },
    { id: "sala5", name: "Sala 5", color: "#bbdc00" },
    { id: "sala6", name: "Sala 6", color: "#9d9d9d" },
    { id: "sala7", name: "Sala 7", color: "#ffbb3b" },
  ];

  return (
  <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200 h-[90vh] flex flex-col">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
    <h2 className="text-2xl font-semibold text-gray-800">
      Disponibilidad de Salas
    </h2>

    {/* Leyenda */}
    <div className="flex flex-wrap items-center gap-3">
      {salas.map((sala) => (
        <div key={sala.id} className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-sm inline-block"
            style={{ backgroundColor: sala.color }}
          ></span>
          <span className="text-sm text-gray-600">{sala.name}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Calendario ocupa todo el espacio disponible */}
  <div className="flex-grow">
    <SchedulerSalas />
  </div>
</div>
  );
};

export default Reservas;
