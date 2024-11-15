import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { createChart } from 'lightweight-charts';
import { obtenerProgresoParaGrafico } from '../../api/progresoApi';
import './progresos.css';

function Progresos() {
  const chartContainerRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const informeId = location.state?.informeId;

  useEffect(() => {
    const fetchAndCreateChart = async () => {
      try {
        const data = await obtenerProgresoParaGrafico(informeId);
        
        // Format data for lightweight-charts
        const chartData = data.map(item => ({
          time: new Date(item.fecha).toISOString().split('T')[0],
          value: item.peso
        }));

        // Create chart
        const chart = createChart(chartContainerRef.current, {
          width: 600,
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
          },
          timeScale: {
            borderVisible: false,
          },
        });

        // Add line series
        const lineSeries = chart.addLineSeries({
          color: '#2962FF',
          lineWidth: 2,
        });
        lineSeries.setData(chartData);

        // Fit content
        chart.timeScale().fitContent();

        // Cleanup
        return () => {
          chart.remove();
        };
      } catch (err) {
        setError('Error al cargar los datos de progreso');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (informeId) {
      fetchAndCreateChart();
    }
  }, [informeId]);

  if (loading) return <div>Cargando progreso...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="progreso-container">
      <h2>Historial de Progreso</h2>
      <div ref={chartContainerRef} className="chart-container" />
    </div>
  );
}

export default Progresos;