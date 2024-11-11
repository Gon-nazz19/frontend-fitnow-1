import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { listarEjercicios } from '../../api/ejercicioApi';
import './CrearRutinaScreen.css';

function CrearRutinaScreen({ userId }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [routineData, setRoutineData] = useState(location.state?.routineData || {
    name: '',
    description: '',
    exercises: [],
    id_usuario: userId,
  });
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await listarEjercicios();
        setExercises(data);
      } catch (error) {
        console.error('Error al listar los ejercicios:', error);
      }
    };
    fetchExercises();
  }, []);

  useEffect(() => {
    setRoutineData((prevData) => ({
      ...prevData,
      id_usuario: userId,
    }));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoutineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleExerciseChange = (index, field, value) => {
    if (field === 'series' || field === 'repeticiones') {
      if (value < 0) {
        alert('Por favor, ingresa un valor positivo.');
        return;
      }
    }
    const updatedExercises = [...routineData.exercises];
    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value,
    };
    setRoutineData((prevData) => ({
      ...prevData,
      exercises: updatedExercises,
    }));
  };

  const addExercise = () => {
    setRoutineData((prevData) => ({
      ...prevData,
      exercises: [...prevData.exercises, { id_ejercicio: '', series: '', repeticiones: '' }],
    }));
  };

  const handleNext = () => {
    if (!routineData.name || !routineData.description) {
      alert("Por favor, completa el nombre y la descripción de la rutina.");
      return;
    }

    if (routineData.exercises.length === 0) {
      alert("Por favor, agrega al menos un ejercicio a la rutina.");
      return;
    }

    for (const exercise of routineData.exercises) {
      if (!exercise.id_ejercicio || !exercise.series || !exercise.repeticiones) {
        alert("Por favor, completa todos los campos de series y repeticiones para cada ejercicio.");
        return;
      }
    }

    navigate('/vista-preliminar-rutina', { state: { routineData } });
  };

  return (
    <div className="crear-rutina-screen">
      <h2>Crear Nueva Rutina</h2>
      <input
        type="text"
        name="name"
        placeholder="Nombre de la rutina"
        value={routineData.name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Descripción de la rutina"
        value={routineData.description}
        onChange={handleChange}
      />
      <div className="button-group">
        <button className="add-exercise-button" onClick={addExercise}>Agregar Ejercicio</button>
        <button className="next-button" onClick={handleNext}>Siguiente</button>
      </div>
      <div className="exercise-list">
        {routineData.exercises.map((exercise, index) => (
          <div key={index} className="exercise-item">
            <select
              value={exercise.id_ejercicio}
              onChange={(e) => handleExerciseChange(index, 'id_ejercicio', e.target.value)}
            >
              <option value="">Seleccionar Ejercicio</option>
              {exercises.map((ex) => (
                <option key={ex.id_ejercicio} value={ex.id_ejercicio}>
                  {ex.nombre}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Series"
              value={exercise.series}
              onChange={(e) => handleExerciseChange(index, 'series', e.target.value)}
              min="0"
            />
            <input
              type="number"
              placeholder="Repeticiones"
              value={exercise.repeticiones}
              onChange={(e) => handleExerciseChange(index, 'repeticiones', e.target.value)}
              min="0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CrearRutinaScreen;