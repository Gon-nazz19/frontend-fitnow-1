import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import RoutineItem from './RoutineItem';
import NewRoutineButton from './NewRoutineButton';
import './MainPage.css';

function MainPage({ userName }) {
  const [routines, setRoutines] = useState([]);

  // Simulación de la obtención de rutinas desde el backend
  useEffect(() => {
    // Aquí puedes hacer una llamada al backend para obtener las rutinas
    setRoutines([
      { id: 1, name: 'Rutina 1', description: 'Descripción de la rutina 1' },
      { id: 2, name: 'Rutina 2', description: 'Descripción de la rutina 2' },
      { id: 3, name: 'Rutina 3', description: 'Descripción de la rutina 3' },
    ]);
  }, []);

  return (
    <div className="main-page">
      <header>
        <img src="/Images/fitnow-logo.png" alt="FitNow Logo" className="logo" />
        <h1>Bienvenido, {userName}</h1>
      </header>

      <SearchBar />

      <div className="routine-list">
        {routines.map((routine) => (
          <RoutineItem key={routine.id} routine={routine} />
        ))}
      </div>

      <NewRoutineButton />
    </div>
  );
}

export default MainPage;
