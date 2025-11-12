import {db} from "./firebaseReservas"
import {ref,set,update,push,get,onValue,remove, DataSnapshot, Unsubscribe} from "firebase/database"

interface Reserva {
    title: string,
    start: Date,
    end: Date,
    resourceId: string
    salaId: string
}

interface ReservaConId extends Reserva{
    id: string
}

// Firebase no acepta formatos de fecha como tal, por lo que hay que convertirlos a timestamps
function reservaToFirebase(reserva: Reserva) {
    return {
        title: reserva.title,
        start: reserva.start.getTime(),
        end: reserva.end.getTime(),
        resourceId: reserva.resourceId,
        salaId: reserva.salaId
    }
}

// Función helper para convertir snapshot a reservas
function snapshotToReservas(snapshot: DataSnapshot): ReservaConId[] {
    if (!snapshot.exists()) return [];
    
    const data = snapshot.val();
    return Object.entries(data).map(([id, datos]) => {
        const reservaData = datos as any;
        return {
            id,
            title: reservaData.title,
            start: new Date(reservaData.start),
            end: new Date(reservaData.end),
            resourceId: reservaData.resourceId,
            salaId: reservaData.resourceId
        } as ReservaConId;
    });
}

const reservasRef = ref(db, "reservas");

// CRUD de la aplicación
async function crearReserva(reserva: Reserva): Promise<void>{
    if (!(await hayConflictos(reserva))){
        await push(reservasRef, reservaToFirebase(reserva))
    }
    else {
         throw new Error('Ya hay una reserva agendada a esa hora')
    }
}

async function obtenerReservas(): Promise<ReservaConId[]> {
    const snap = await get(reservasRef);
    return snapshotToReservas(snap);
}

async function actualizarReserva(id: string, datos: Reserva): Promise<void>{
    const idReservasRef = ref(db, "reservas/"+id)
    await update(idReservasRef, reservaToFirebase(datos))
}

async function eliminarReserva(id: string): Promise<void> {
    const idReservasRef = ref(db, "reservas/"+id)
    await remove(idReservasRef)
}

// Función para escuchar cambios en tiempo real
function escucharReservas(callback: (reservas: ReservaConId[]) => void): Unsubscribe {
    return onValue(reservasRef, (snapshot) => {
        callback(snapshotToReservas(snapshot));
    });
}

// Verificar que no hayan duplicados en las salas
async function hayConflictos(nuevaReserva: Reserva): Promise<Boolean> {
    const reservasObtenidas = await obtenerReservas()
    const salaCoincidente = reservasObtenidas.filter((reserva: ReservaConId) => reserva.salaId == nuevaReserva.salaId)
    for (let index = 0; index < salaCoincidente.length; index++) {
        const reservaFiltrada = salaCoincidente[index];
        if(reservaFiltrada.start.getTime() == nuevaReserva.start.getTime()) {
            return true
        }
    }
    return false
}

export {crearReserva, escucharReservas, obtenerReservas, hayConflictos, eliminarReserva, actualizarReserva};
export type {Reserva, ReservaConId}