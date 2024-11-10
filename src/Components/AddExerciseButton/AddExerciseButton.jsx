import React from 'react';
import './AddExerciseButton.css';

function AddExerciseButton({ onClick }) {
  return (
    <div className="add-exercise-button">
      <button onClick={onClick}>Agregar ejercicio +</button>
    </div>
  );
}

export default AddExerciseButton;
