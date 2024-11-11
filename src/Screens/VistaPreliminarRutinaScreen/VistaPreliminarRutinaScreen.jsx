import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ExerciseItem from '../../Components/ExerciseItem/ExerciseItem';
import { crearRutina } from '../../api/rutinaApi';
import './VistaPreliminarRutinaScreen.css';

function VistaPreliminarRutinaScreen({ userId }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { routineData } = location.state || { exercises: [] };

  useEffect(() => {
    if (userId) {
      routineData.id_usuario = userId;
    }
  }, [userId]);

  const handleSave = async () => {
    try {
      console.log('Datos de la rutina a guardar:', routineData); // Verifica los datos enviados
      const response = await crearRutina(routineData);
      alert('Rutina guardada exitosamente');
      navigate('/main');
    } catch (error) {
      console.error('Error al guardar la rutina:', error);
    }
  };

  return (
    <div className="vista-preliminar-rutina-screen">
      <h2>{routineData.name}</h2>
      <p>{routineData.description}</p>
      <div className="exercise-list">
        {routineData.exercises.map((exercise, index) => (
          <ExerciseItem key={index} exercise={exercise} />
        ))}
      </div>
      <button onClick={handleSave}>Guardar</button>
      <button onClick={() => navigate('/crear-rutina')}>Agregar más</button>
    </div>
  );
}

export default VistaPreliminarRutinaScreen;