import React, { useState } from 'react';
import { registrarProgreso } from '../../api/progresoApi';
import './EjercicioCard.css';

function EjercicioCard({ ejercicio }) {
  const [peso, setPeso] = useState('');

  const handleVerProgreso = () => {
    // Implementar navegación a la vista de progreso
    console.log(`Ver progreso del ejercicio ${ejercicio.id_ejercicio}`);
  };

  const handleIngresarPeso = async () => {
    if (!peso) {
      alert('Por favor ingrese un peso válido');
      return;
    }

    try {
      await registrarProgreso({
        id_informe: ejercicio.id_informe,
        peso: Number(peso),
        fecha: new Date()
      });
      alert('Peso registrado exitosamente');
      setPeso('');
    } catch (error) {
      console.error('Error al registrar el peso:', error);
      alert('Error al registrar el peso');
    }
  };

  return (
    <div className="ejercicio-card">
      <img 
        src={ejercicio.url_video_imagen || 'https://via.placeholder.com/150'} 
        alt={ejercicio.nombre} 
        className="ejercicio-imagen"
      />
      <div className="ejercicio-detalle">
        <h3>{ejercicio.nombre}</h3>
        <p>{ejercicio.descripcion}</p>
        <div className="ejercicio-stats">
          <span>Series: {ejercicio.series}</span>
          <span>Repeticiones: {ejercicio.repeticiones}</span>
        </div>
      </div>
      <div className="acciones">
        <button 
          className="btn-ver-progreso" 
          onClick={handleVerProgreso}
        >
          Ver progreso
        </button>
        <input
          type="number"
          placeholder="Peso (kg)"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          className="input-peso"
        />
        <button 
          className="btn-ingresar-peso"
          onClick={handleIngresarPeso}
        >
          Ingresar peso
        </button>
      </div>
    </div>
  );
}

export default EjercicioCard;