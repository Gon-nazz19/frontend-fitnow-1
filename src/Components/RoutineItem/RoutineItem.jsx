import React from 'react';
import './RoutineItem.css';

function RoutineItem({ routine, onAccess }) {
  return (
    <div className="routine-item">
      <div>
        <h3>{routine.nombre}</h3>
        <p>{routine.descripcion}</p>
      </div>
      <button className="access-button" onClick={() => onAccess(routine.id_rutina)}>Acceder</button>
    </div>
  );
}

export default RoutineItem;