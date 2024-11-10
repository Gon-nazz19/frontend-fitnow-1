import React from 'react';
import './NewRoutineButton.css';

const NewRoutineButton = ({onClick}) => {
  return (
    <div className="new-routine-button" >
      <button onClick={onClick}>
        Crear nueva rutina <span className="plus-sign">+</span>
      </button>
    </div>
  );
}

export default NewRoutineButton;
