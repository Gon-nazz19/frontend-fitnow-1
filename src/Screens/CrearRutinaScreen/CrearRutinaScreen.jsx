import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearRutinaScreen.css';

function CrearRutinaScreen() {
  const [routineData, setRoutineData] = useState({
    name: '',
    description: '',
    exercises: [], // Lista de ejercicios si quieres agregarla
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoutineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
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
      <button onClick={handleNext}>Siguiente</button>
    </div>
  );
}

export default CrearRutinaScreen;
