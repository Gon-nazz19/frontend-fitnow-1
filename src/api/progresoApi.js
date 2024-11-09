// Registrar progreso de un ejercicio
async function registrarProgreso(progresoData) {
    const response = await fetch('http://localhost:3000/api/progresos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(progresoData)
    });
    return await response.json();
}

// Obtener progreso de un ejercicio para gráficos
async function obtenerProgresoParaGrafico(idInforme) {
    const response = await fetch(`http://localhost:3000/api/progresos/informe/${idInforme}`);
    return await response.json();
}