import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../Components/SearchBar/SearchBar';
import RoutineItem from '../../Components/RoutineItem/RoutineItem';
import NewRoutineButton from '../../Components/NewRoutineButton/NewRoutineButton';
import './MainPage.css';

function MainPage({ userId, userName }) {
  const [routines, setRoutines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener las rutinas del usuario desde el backend
    const fetchRoutines = async () => {
      try {
        const response = await fetch(`/api/rutinas?userId=${userId}`);
        const data = await response.json();
        setRoutines(data);
      } catch (error) {
        console.error("Error al obtener las rutinas:", error);
      }
    };

    fetchRoutines();
  }, [userId]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRoutines = routines.filter((routine) =>
    routine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-page">
      <header>
        <img src="/Images/fitnow-logo.png" alt="FitNow Logo" className="logo" />
        <h1>Bienvenido, {userName}</h1>
      </header>

      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <div className="routine-list">
        {filteredRoutines.map((routine) => (
          <RoutineItem key={routine.id} routine={routine} />
        ))}
      </div>

      <NewRoutineButton onClick={() => navigate('/CrearRutinaScreen')} />
    </div>
  );
}

export default MainPage;
