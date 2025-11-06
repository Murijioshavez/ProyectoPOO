import React, { useMemo } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Event as RBCEvent,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

// ---- Localización ----
const locales = { es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// ---- Tipos ----
interface Sala {
  id: string;
  name: string;
  color: string;
  bgColor: string;
}

interface Evento extends RBCEvent {
  salaId: string;
}

// ---- Componente principal ----
const SchedulerSalas: React.FC = () => {
  // Salas disponibles
  const salas: Sala[] = [
    { id: "sala1", name: "Sala 1", color: "#ffffff", bgColor: "#9e5fff" },
    { id: "sala2", name: "Sala 2", color: "#ffffff", bgColor: "#00a9ff" },
    { id: "sala3", name: "Sala 3", color: "#ffffff", bgColor: "#ff5583" },
    { id: "sala4", name: "Sala 4", color: "#ffffff", bgColor: "#03bd9e" },
    { id: "sala5", name: "Sala 5", color: "#ffffff", bgColor: "#bbdc00" },
    { id: "sala6", name: "Sala 6", color: "#ffffff", bgColor: "#9d9d9d" },
    { id: "sala7", name: "Sala 7", color: "#ffffff", bgColor: "#ffbb3b" },
  ];

  // Eventos de ejemplo
  const eventos: Evento[] = [
    {
      title: "Mentoría con Juan Pérez",
      start: new Date(2025, 10, 6, 9, 0),
      end: new Date(2025, 9, 30, 10, 0),
      salaId: "sala1",
    },
    {
      title: "Reserva María García",
      start: new Date(2025, 9, 30, 11, 0),
      end: new Date(2025, 9, 30, 12, 30),
      salaId: "sala3",
    },
    {
      title: "Mentoría Backend",
      start: new Date(2025, 9, 30, 15, 0),
      end: new Date(2025, 9, 30, 16, 30),
      salaId: "sala5",
    },
  ];

  // ---- Estilo dinámico según sala ----
  const eventPropGetter = (event: Evento) => {
    const sala = salas.find((s) => s.id === event.salaId);
    const backgroundColor = sala?.bgColor ?? "#3174ad";
    const color = sala?.color ?? "white";
    return {
      style: {
        backgroundColor,
        color,
        borderRadius: "6px",
        border: "none",
        padding: "4px 6px",
        fontWeight: 500,
      },
    };
  };

  // ---- Textos en español ----
  const messages = useMemo(
    () => ({
      today: "Hoy",
      previous: "Anterior",
      next: "Siguiente",
      month: "Mes",
      week: "Semana",
      day: "Día",
      agenda: "Agenda",
      noEventsInRange: "No hay eventos en este rango.",
    }),
    []
  );

  return (
    <div className="min-h-screen bg-[#E5E5E8] flex flex-col items-center py-8">
      {/* Encabezado */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-[#006DFF] mb-2">
          Programación de Salas
        </h1>
        <p className="text-gray-600 text-sm">
          Visualiza las reservas actuales de las diferentes salas de estudio.
        </p>
      </div>

      {/* Leyenda de salas */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-4 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Leyenda de Salas
        </h2>
        <div className="flex flex-wrap gap-3">
          {salas.map((sala) => (
            <div
              key={sala.id}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <span
                className="w-4 h-4 rounded"
                style={{ backgroundColor: sala.bgColor }}
              ></span>
              {sala.name}
            </div>
          ))}
        </div>
      </div>

      {/* Calendario */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md border border-gray-200 p-4">
        <div style={{ height: "75vh" }}>
          <Calendar
            localizer={localizer}
            events={eventos}
            defaultView="day"
            views={["day"]}
            step={30}
            timeslots={2}
            min={new Date(2025, 9, 30, 8, 0)}
            max={new Date(2025, 9, 30, 20, 0)}
            style={{ height: "100%" }}
            eventPropGetter={eventPropGetter}
            culture="es"
            messages={messages}
          />
        </div>
      </div>
    </div>
  );
};

export default SchedulerSalas;
