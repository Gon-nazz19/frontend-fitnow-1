import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ExerciseItem from '../../Components/ExerciseItem/ExerciseItem';
import { crearRutina } from '../../api/rutinaApi';
import { obtenerEjercicioPorId } from '../../api/ejercicioApi';
import './VistaPreliminarRutinaScreen.css';

function VistaPreliminarRutinaScreen({ userId }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { routineData } = location.state || { exercises: [] };
  const [exerciseDetails, setExerciseDetails] = useState([]);

  useEffect(() => {
    if (userId) {
      routineData.id_usuario = userId;
    }
  }, [userId, routineData]);

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      const details = await Promise.all(
        routineData.exercises.map(async (exercise) => {
          const data = await obtenerEjercicioPorId(exercise.id_ejercicio);
          return { ...exercise, ...data };
        })
      );
      setExerciseDetails(details);
    };
    fetchExerciseDetails();
  }, [routineData.exercises]);

  const handleSave = async () => {
    try {
      console.log('Datos de la rutina a guardar:', routineData); // Verifica los datos enviados
      await crearRutina(routineData); // Elimina la variable 'response' si no es necesaria
      alert('Rutina guardada exitosamente');
      navigate('/main');
    } catch (error) {
      console.error('Error al guardar la rutina:', error);
    }
  };

  const handleAddMore = () => {
    navigate('/crear-rutina', { state: { routineData } });
  };

  return (
    <div className="vista-preliminar-rutina-screen">
      <h2 className="vista-preliminar-rutina-title">{routineData.name}</h2>
      <p className="vista-preliminar-rutina-description">{routineData.description}</p>
      <div className="vista-preliminar-rutina-exercise-list">
        {exerciseDetails.map((exercise, index) => (
          <ExerciseItem key={index} exercise={exercise} />
        ))}
      </div>
      <div className="vista-preliminar-rutina-button-group">
        <button className="vista-preliminar-rutina-add-more-button" onClick={handleAddMore}>Agregar más</button>
        <button className="vista-preliminar-rutina-save-button" onClick={handleSave}>Guardar</button>
      </div>
    </div>
  );
}

export default VistaPreliminarRutinaScreen;