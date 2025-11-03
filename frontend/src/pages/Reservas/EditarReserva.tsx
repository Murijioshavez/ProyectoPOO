import React from 'react';
import { useParams } from 'react-router-dom';

const EditarReserva: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Reserva #{id}</h1>
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <p>Formulario para editar reserva {id}...</p>
      </div>
    </div>
  );
};

export default EditarReserva;