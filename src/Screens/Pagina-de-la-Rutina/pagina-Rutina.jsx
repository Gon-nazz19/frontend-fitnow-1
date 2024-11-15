import React, { useState, useEffect } from 'react';
import './PaginaRutina.css'; // Archivo CSS para estilos personalizados

const PaginaRutina = ({ rutinaId }) => {
  const [informes, setInformes] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los informes de la rutina seleccionada
    const fetchInformes = async () => {
      try {
        const response = await fetch(`/api/rutinas/${rutinaId}/informes`);
        const data = await response.json();
        setInformes(data);
      } catch (error) {
        console.error('Error al obtener los informes:', error);
      }
    };
    fetchInformes();
  }, [rutinaId]);

  return (
    <div className="pagina-rutina-container">
      <header className="pagina-rutina-header">
        <img src="/path/to/logo.png" alt="Logo" className="logo" />
        <h1>Nombre de la Rutina</h1>
      </header>

      <div className="informes-container">
        {informes.map((informe) => (
          <div key={informe.id} className="informe-card">
            <div className="ejercicio-imagen">
              <img src={informe.ejercicioImagen || '/path/to/placeholder.png'} alt="Ejercicio" />
            </div>
            <div className="ejercicio-detalle">
              <h3>{informe.ejercicioNombre}</h3>
              <p>{informe.descripcion}</p>
              <p><strong>Series:</strong> {informe.series} <strong>Repeticiones:</strong> {informe.repeticiones}</p>
            </div>
            <div className="acciones">
              <button className="btn-ver-progreso">Ver progreso</button>
              <input
                type="text"
                placeholder="Ingresar peso"
                className="input-peso"
              />
              <button className="btn-ingresar-peso">Ingresar peso</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaginaRutina;
