// Registrar progreso de un ejercicio
export async function registrarProgreso(progresoData) {
    const response = await fetch('http://localhost:3000/api/progresos', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(progresoData)
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al registrar el progreso');
    }
  
    return await response.json();
  }

// Obtener progreso de un ejercicio para gráficos
export async function obtenerProgresoParaGrafico(idInforme) {
    const response = await fetch(`http://localhost:3000/api/progresos/grafico/${idInforme}`);
    if (!response.ok) {
        throw new Error('Error al obtener los datos de progreso');
    }
    return await response.json();
}