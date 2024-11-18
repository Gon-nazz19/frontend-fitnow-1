// frontend/src/Screens/Progresos/progresos.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns-tz';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { obtenerProgresoParaGrafico } from '../../api/progresoApi';
import './progresos.css';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Progresos() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const informeId = location.state?.informeId;

  useEffect(() => {
    const fetchProgresoData = async () => {
      try {
        const data = await obtenerProgresoParaGrafico(informeId);
        
        // Formatear datos para el gráfico
        const formattedData = data.map(item => ({
          x: format(new Date(item.fecha), 'yyyy-MM-dd HH:mm'),
          y: item.peso
        }));

        setChartData({
          labels: formattedData.map(item => item.x),
          datasets: [
            {
              label: 'Peso (kg)',
              data: formattedData,
              borderColor: '#4CAF50',
              backgroundColor: 'rgba(76, 175, 80, 0.5)',
              tension: 0.1
            }
          ]
        });
      } catch (error) {
        console.error('Error in fetchProgresoData:', error);
        setError('Error al obtener los datos del progreso');
      } finally {
        setLoading(false);
      }
    };

    if (informeId) {
      fetchProgresoData();
    }
  }, [informeId]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Fecha y Hora'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Peso (kg)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Progreso del Ejercicio'
      }
    }
  };

  if (!informeId) return <div>No se proporcionó ID del informe</div>;
  if (loading) return <div className="loading">Cargando gráfico...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="progreso-container">
      <h2>Progreso del Ejercicio</h2>
      <div className="chart-container">
        {chartData && <Line data={chartData} options={options} />}
      </div>
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