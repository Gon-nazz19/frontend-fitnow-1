import React from 'react';
import './NewRoutineButton.css';

function NewRoutineButton() {
  return (
    <div className="new-routine-button">
      <button>
        Crear nueva rutina <span className="plus-sign">+</span>
      </button>
    </div>
  );
}

export default NewRoutineButton;
