import React from 'react';
import './RoutineItem.css';

function RoutineItem({ routine }) {
  return (
    <div className="routine-item">
      <h3>{routine.name}</h3>
      <p>{routine.description}</p>
      <button className="access-button">Acceder</button>
    </div>
  );
}

export default RoutineItem;
