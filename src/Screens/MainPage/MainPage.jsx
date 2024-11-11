import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../../Components/SearchBar/SearchBar';
import RoutineItem from '../../Components/RoutineItem/RoutineItem';
import NewRoutineButton from '../../Components/NewRoutineButton/NewRoutineButton';
import './MainPage.css';

function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  const [routines, setRoutines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Obtener las rutinas del usuario desde el backend
    const fetchRoutines = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/rutinas/obtenerPorUsuario/${user.id_usuario}`);
        if (!response.ok) {
          throw new Error('Error al obtener las rutinas');
        }
        const data = await response.json();
        setRoutines(data);
      } catch (error) {
        console.error("Error al obtener las rutinas:", error);
      }
    };
    if (user) {
      fetchRoutines();
    }
  }, [user]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRoutines = routines.filter((routine) =>
    routine.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-page">
      <header>
        <img src="/Images/fitnow-logo.png" alt="FitNow Logo" className="logo" />
        <h1>Bienvenido, {user?.nombre}</h1>
      </header>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div className="routine-list">
        {filteredRoutines.map((routine) => (
          <RoutineItem key={routine.id_rutina} routine={routine} />
        ))}
      </div>
      <NewRoutineButton onClick={() => navigate('/crear-rutina')} />
    </div>
  );
}

export default MainPage;