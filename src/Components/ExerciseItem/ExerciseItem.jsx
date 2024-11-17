import React from 'react';
import './ExerciseItem.css';

function ExerciseItem({ exercise }) {
  return (
    <div className="vista-preliminar-rutina-exercise-item">
      <img 
        src={exercise.url_video_imagen} 
        alt={exercise.nombre} 
        onError={(e) => {
          e.target.onerror = null; // Evita bucle infinito
          e.target.src = 'https://via.placeholder.com/300x200?text=Ejercicio'; // URL válida de imagen por defecto
        }}
      />
      <div className="vista-preliminar-rutina-exercise-details">
        <h3>{exercise.nombre}</h3>
        <p>{exercise.descripcion}</p>
        <p>Series: {exercise.series}</p>
        <p>Repeticiones: {exercise.repeticiones}</p>
      </div>
    </div>
  );
}

export default ExerciseItem;
