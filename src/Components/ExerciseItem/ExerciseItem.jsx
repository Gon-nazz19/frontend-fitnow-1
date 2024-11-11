import React from 'react';
import './ExerciseItem.css';

function ExerciseItem({ exercise }) {
  return (
    <div className="vista-preliminar-rutina-exercise-item">
      <h3>{exercise.nombre}</h3>
      <p>{exercise.descripcion}</p>
      <p>Series: {exercise.series}</p>
      <p>Repeticiones: {exercise.repeticiones}</p>
    </div>
  );
}

export default ExerciseItem;