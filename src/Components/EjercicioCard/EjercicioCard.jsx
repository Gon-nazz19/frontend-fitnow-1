import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrarProgreso } from '../../api/progresoApi';
import './EjercicioCard.css';

function EjercicioCard({ ejercicio }) {
  const [peso, setPeso] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // In EjercicioCard.jsx when navigating
const handleVerProgreso = () => {
  if (!ejercicio.id_informe) {
      alert('No hay informe asociado a este ejercicio');
      return;
  }
  navigate('/progreso', { 
      state: { 
          informeId: ejercicio.id_informe 
      } 
  });
};

  const handleIngresarPeso = async () => {
    if (!peso.trim()) {
      alert('Por favor ingrese un peso');
      return;
    }

    const pesoNum = Number(peso);
    if (isNaN(pesoNum) || pesoNum <= 0) {
      alert('Por favor ingrese un peso válido mayor a 0');
      return;
    }

    setIsLoading(true);
    try {
      const progresoData = {
        id_informe: ejercicio.id_informe,
        peso: pesoNum,
        fecha: new Date().toISOString()
      };

      await registrarProgreso(progresoData);
      setPeso('');
      alert('Peso registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar el peso:', error);
      alert('Error al registrar el peso. Por favor intente nuevamente');
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
        >
          Ver progreso
        </button>
        <input
          type="number"
          placeholder="Peso (kg)"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          className="input-peso"
          min="0"
          step="0.1"
          disabled={isLoading}
        />
        <button 
          className="btn-ingresar-peso"
          onClick={handleIngresarPeso}
          disabled={isLoading}
        >
          {isLoading ? 'Registrando...' : 'Ingresar peso'}
        </button>
      </div>
    </div>
  );
}

export default EjercicioCard;