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

  // Eventos (fijos por ahora)
  const eventos: Evento[] = [
    {
      title: "Mentoría con Juan Pérez",
      start: new Date(2025, 9, 30, 9, 0),
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
        borderRadius: "4px",
        border: "none",
        padding: "4px 6px",
      },
    };
  };

  // ---- Config general ----
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
    <div style={{ height: "85vh", padding: "20px" }}>
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
  );
};

export default SchedulerSalas;
