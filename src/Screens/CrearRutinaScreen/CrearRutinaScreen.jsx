import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearRutinaScreen.css';

function CrearRutinaScreen({ userId }) {
  const [routineData, setRoutineData] = useState({
    name: '',
    description: '',
    exercises: [],
    id_usuario: userId, // Asegúrate de que el ID del usuario esté aquí
  });
  const navigate = useNavigate();

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

  const handleNext = () => {
    if (routineData.name && routineData.description) {
      // Navegar a vista preliminar y pasar los datos de la rutina
      navigate('/vista-preliminar-rutina', { state: { routineData } });
    } else {
      alert("Por favor, completa el nombre y la descripción de la rutina.");
    }
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