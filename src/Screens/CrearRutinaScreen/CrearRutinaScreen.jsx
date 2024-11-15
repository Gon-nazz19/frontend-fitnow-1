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
  const [tempInputs, setTempInputs] = useState({});

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

  const handleTempInputChange = (exerciseId, field, value) => {
    setTempInputs(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        [field]: value
      }
    }));
  };

  const addExercise = (exercise) => {
    const exerciseInput = tempInputs[exercise.id_ejercicio];
    if (!exerciseInput?.series || !exerciseInput?.repeticiones) {
      alert('Por favor, ingresa series y repeticiones');
      return;
    }

    // Verificar si el ejercicio ya existe en la rutina
    if (routineData.exercises.some(e => e.id_ejercicio === exercise.id_ejercicio)) {
      alert('Este ejercicio ya ha sido agregado a la rutina');
      return;
    }

    setRoutineData(prev => ({
      ...prev,
      exercises: [...prev.exercises, {
        ...exercise,
        series: exerciseInput.series,
        repeticiones: exerciseInput.repeticiones
      }]
    }));

    setTempInputs(prev => ({
      ...prev,
      [exercise.id_ejercicio]: { series: '', repeticiones: '' }
    }));
  };

  const removeExercise = (index) => {
    setRoutineData(prevData => ({
      ...prevData,
      exercises: prevData.exercises.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    if (!routineData.name || !routineData.description) {
      alert("Por favor, completa el nombre y la descripción de la rutina.");
      return;
    }
    navigate('/vista-preliminar-rutina', { state: { routineData } });
  };

  return (
    <div className="crear-rutina-screen">
      
      <div className="button-group">
        <button className="back-button" onClick={() => navigate('/main')}>Volver</button>
      </div>

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
      
      <div className="added-exercises">
        <h3>Ejercicios Agregados</h3>
        {routineData.exercises.length === 0 ? (
          <p>No hay ejercicios agregados</p>
        ) : (
          <ul>
            {routineData.exercises.map((exercise, index) => (
              <li key={index} className="added-exercise-item">
                <span className="exercise-info">
                  {exercise.nombre} - Series: {exercise.series}, Repeticiones: {exercise.repeticiones}
                </span>
                <button 
                  className="delete-button"
                  onClick={() => removeExercise(index)}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="button-group">
        <button className="next-button" onClick={handleNext}>Siguiente</button>
      </div>
      
      <div className="available-exercises">
        <h3>Ejercicios Disponibles</h3>
        <div className="exercise-grid">
          {exercises.map((exercise) => (
            <div key={exercise.id_ejercicio} className="exercise-card">
              <img 
                  src={exercise.url_video_imagen} 
                  alt={exercise.nombre} 
                  onError={(e) => {
                    e.target.onerror = null; // Evita bucle infinito
                    e.target.src = 'https://via.placeholder.com/300x200?text=Ejercicio'; // URL válida de imagen por defecto
                  }}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>
              <h4>{exercise.nombre}</h4>
              <p>{exercise.descripcion}</p>
              <div className="exercise-inputs">
                <input
                  type="number"
                  placeholder="Series"
                  value={tempInputs[exercise.id_ejercicio]?.series || ''}
                  onChange={(e) => handleTempInputChange(exercise.id_ejercicio, 'series', e.target.value)}
                  min="1"
                />
                <input
                  type="number"
                  placeholder="Repeticiones"
                  value={tempInputs[exercise.id_ejercicio]?.repeticiones || ''}
                  onChange={(e) => handleTempInputChange(exercise.id_ejercicio, 'repeticiones', e.target.value)}
                  min="1"
                />
                <button onClick={() => addExercise(exercise)}>Agregar Ejercicio</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CrearRutinaScreen;