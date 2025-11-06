// src/components/SchedulerSalas.tsx
import React, { useMemo } from "react"
import {
  Calendar,
  dateFnsLocalizer,
  Event as RBCEvent,
} from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { es } from "date-fns/locale"
import "react-big-calendar/lib/css/react-big-calendar.css"


const CustomToolbar = ({ label }: { label: string }) => (
  <div className="rbc-toolbar text-center py-3 font-semibold text-gray-700">
    {label}
  </div>
);
// ---- Localización ----
const locales = { es }
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// ---- Tipos ----
interface Sala {
  id: string
  name: string
  color: string
  bgColor: string
}

export interface Evento extends RBCEvent {
  resourceId: string,
  salaId: string,
}

interface SchedulerSalasProps {
  fechaBase?: Date // fecha seleccionada desde Reservas
}

// ---- Componente principal ----
const SchedulerSalas: React.FC<SchedulerSalasProps> = ({ fechaBase }) => {
  // Determina la fecha a mostrar
  const hoy = fechaBase ?? new Date()
  const y = hoy.getFullYear()
  const m = hoy.getMonth()
  const d = hoy.getDate()

  // ---- Salas disponibles ----
  const salas: Sala[] = [
    { id: "sala1", name: "Sala 1", color: "#ffffff", bgColor: "#9e5fff" },
    { id: "sala2", name: "Sala 2", color: "#ffffff", bgColor: "#00a9ff" },
    { id: "sala3", name: "Sala 3", color: "#ffffff", bgColor: "#ff5583" },
    { id: "sala4", name: "Sala 4", color: "#ffffff", bgColor: "#03bd9e" },
    { id: "sala5", name: "Sala 5", color: "#ffffff", bgColor: "#bbdc00" },
    { id: "sala6", name: "Sala 6", color: "#ffffff", bgColor: "#9d9d9d" },
    { id: "sala7", name: "Sala 7", color: "#ffffff", bgColor: "#ffbb3b" },
  ]

  const recursos = [
    { resourceId: "sala1", resourceTitle: "Sala 1" },
    { resourceId: "sala2", resourceTitle: "Sala 2" },
    { resourceId: "sala3", resourceTitle: "Sala 3" },
    { resourceId: "sala4", resourceTitle: "Sala 4" },
    { resourceId: "sala5", resourceTitle: "Sala 5" },
    { resourceId: "sala6", resourceTitle: "Sala 6" },
    { resourceId: "sala7", resourceTitle: "Sala 7" },
  ];


  // ---- Eventos del día ----
  const eventos: Evento[] = [
    {
      title: "Mentoría con Juan Pérez",
      start: new Date(y, m, d, 9, 0),
      end: new Date(y, m, d, 10, 0),
      resourceId: "sala1",
      salaId: "sala1",
    },
    {
      title: "Reserva María García",
      start: new Date(y, m, d, 9, 0),
      end: new Date(y, m, d, 10, 0),
      resourceId: "sala3",
      salaId: "sala3",
    },
    {
      title: "Mentoría Backend",
      start: new Date(y, m, d, 9, 0),
      end: new Date(y, m, d, 10, 0),
      resourceId: "sala5",
      salaId: "sala5",
    },
  ]

  // ---- Estilo dinámico según sala ----
  const eventPropGetter = (event: Evento) => {
    const sala = salas.find((s) => s.id === event.resourceId)
    const backgroundColor = sala?.bgColor ?? "#3174ad"
    const color = sala?.color ?? "white"
    return {
      style: {
        backgroundColor,
        color,
        borderRadius: "6px",
        border: "none",
        padding: "4px 6px",
        fontWeight: 500,
      },
    }
  }

  // ---- Textos en español ----
  const messages = useMemo(
    () => ({

      month: "Mes",
      week: "Semana",
      day: "Día",
      agenda: "Agenda",
      noEventsInRange: "No hay eventos en este rango.",
    }),
    []
  )

  return (
    <div className="w-full text-black bg-white rounded-2xl shadow-md border border-gray-200 p-4">
      <div > {/* ⬅️ dinámico */}
        <Calendar
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
              eventPropGetter={eventPropGetter}
          resources={recursos}               // ← Aquí están las salas
          resourceIdAccessor="resourceId"    // ← campo identificador
          resourceTitleAccessor="resourceTitle" // ← campo de nombre visible
          defaultView="day"
          views={["day"]}
          step={30}
          timeslots={2}
          toolbar={false} // opcional si querés eliminar botones del header
          min={new Date(y, m, d, 7, 0)}
          max={new Date(y, m, d, 19, 0)}
        />


      </div>
    </div>
  )
}

export default SchedulerSalas
