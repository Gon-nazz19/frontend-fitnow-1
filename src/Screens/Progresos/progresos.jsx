import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createChart } from 'lightweight-charts';
import { obtenerProgresoParaGrafico } from '../../api/progresoApi';
import './progresos.css';

function Progresos() {
  const chartContainerRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const informeId = location.state?.informeId;

  useEffect(() => {
    const fetchAndCreateChart = async () => {
      try {
        console.log('Fetching data for informeId:', informeId);
        const data = await obtenerProgresoParaGrafico(informeId);
        console.log('Received progress data:', data);

        const chartData = data.map(item => ({
          time: new Date(item.fecha).toISOString().split('T')[0],
          value: parseFloat(item.peso)
        }));

        const chart = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth,
          height: 300,
          layout: {
            background: { color: '#ffffff' },
            textColor: '#333',
          },
          grid: {
            vertLines: { color: '#f0f0f0' },
            horzLines: { color: '#f0f0f0' },
          },
          rightPriceScale: {
            borderVisible: false,
            title: 'Peso (kg)'
          },
          timeScale: {
            borderVisible: false,
            timeVisible: true,
          },
        });

        const lineSeries = chart.addLineSeries({
          color: '#4CAF50',
          lineWidth: 2,
        });
        lineSeries.setData(chartData);

        const handleResize = () => {
          chart.applyOptions({
            width: chartContainerRef.current.clientWidth
          });
        };

        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
          chart.remove();
        };
      } catch (error) {
        console.error('Error in fetchAndCreateChart:', error);
        setError('Error al obtener los datos del progreso');
      } finally {
        setLoading(false);
      }
    };

    if (informeId) {
      fetchAndCreateChart();
    }
  }, [informeId]);

  if (!informeId) return <div>No se proporcionó ID del informe</div>;
  if (loading) return <div className="loading">Cargando gráfico...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="progreso-container">
      <h2>Progreso del Ejercicio</h2>
      <div className="chart-container" ref={chartContainerRef} />
      <button 
        className="back-button"
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
    </div>
  );
}

export default Progresos;