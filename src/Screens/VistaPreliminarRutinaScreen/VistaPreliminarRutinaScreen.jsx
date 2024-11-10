import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './VistaPreliminarRutinaScreen.css';

function VistaPreliminarRutinaScreen() {
  const location = useLocation();
  const { routineData } = location.state;
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const response = await fetch('/api/rutinas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routineData),
      });

      if (response.ok) {
        alert("Rutina guardada exitosamente.");
        navigate('/main'); // Redirige a MainPage
      } else {
        alert("Error al guardar la rutina.");
      }
    } catch (error) {
      console.error("Error al guardar la rutina:", error);
    }
  };

  return (
    <div className="vista-preliminar-rutina-screen">
      <h2>Vista Preliminar de la Rutina</h2>
      <p><strong>Nombre:</strong> {routineData.name}</p>
      <p><strong>Descripción:</strong> {routineData.description}</p>
      <button onClick={handleSave}>Guardar Rutina</button>
    </div>
  );
}

export default VistaPreliminarRutinaScreen;
