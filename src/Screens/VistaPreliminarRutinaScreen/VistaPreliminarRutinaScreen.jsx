import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ExerciseItem from '../../Components/ExerciseItem/ExerciseItem';
import './VistaPreliminarRutinaScreen.css';

function VistaPreliminarRutinaScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { routineData } = location.state || { exercises: [] };

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
        navigate('/mainpage');
      } else {
        console.error('Error al guardar la rutina');
      }
    } catch (error) {
      console.error('Error:', error);
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
