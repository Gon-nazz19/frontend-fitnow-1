import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EjercicioCard from '../../Components/EjercicioCard/EjercicioCard';
import { obtenerEjercicioPorId } from '../../api/ejercicioApi';
import { obtenerInformesPorIdRutina } from '../../api/informeApi';
import { obtenerNombreRutina } from '../../api/rutinaApi';
import './RutinaPage.css';
import logo from '../../Images/logo.jpg';

function RutinaPage() {
  const { idRutina } = useParams();
  const navigate = useNavigate();
  const [ejercicios, setEjercicios] = useState([]);
  const [nombreRutina, setNombreRutina] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRutinaData = async () => {
      setIsLoading(true);
      try {
        // Obtener el nombre de la rutina
        const rutinaNombre = await obtenerNombreRutina(idRutina);
        setNombreRutina(rutinaNombre.nombre);
        // Obtener los informes de la rutina
        const informes = await obtenerInformesPorIdRutina(idRutina);
        // Obtener los detalles de cada ejercicio y combinarlos con la información del informe
        const ejerciciosData = await Promise.all(
          informes.map(async (informe) => {
            const ejercicio = await obtenerEjercicioPorId(informe.id_ejercicio);
            return {
              ...ejercicio,
              series: informe.series,
              repeticiones: informe.repeticiones,
              id_informe: informe.id_informe
            };
          })
        );
        setEjercicios(ejerciciosData);
        setError(null);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setError('Error al cargar los ejercicios. Por favor, intente nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRutinaData();
  }, [idRutina]);

  if (isLoading) {
    return <div className="loading">Cargando ejercicios...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="rutina-page">
      <img src={logo} alt="FitNow Logo" className="logo" />
      <div className="button-group">
        <button className="back-button" onClick={() => navigate('/main')}>Volver</button>
      </div>
      <header className="rutina-header">
        <h1>{nombreRutina || 'Mi Rutina'}</h1>
      </header>
      <main className="rutina-content">
        {ejercicios.length === 0 ? (
          <p className="no-ejercicios">No hay ejercicios en esta rutina.</p>
        ) : (
          <div className="ejercicios-list">
            {ejercicios.map((ejercicio) => (
              <EjercicioCard 
                key={ejercicio.id_ejercicio} 
                ejercicio={ejercicio}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default RutinaPage;