// Obtener informes por ID de rutina
async function obtenerInformesPorIdRutina(idRutina) {
    const response = await fetch(`http://localhost:3000/api/informes/rutina/${idRutina}`);
    return await response.json();
}

// Obtener un informe por ID
async function obtenerInformePorId(idInforme) {
    const response = await fetch(`http://localhost:3000/api/informes/${idInforme}`);
    return await response.json();
}

// Crear un nuevo informe
async function crearInforme(informeData) {
    const response = await fetch('http://localhost:3000/api/informes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(informeData)
    });
    return await response.json();
}

// Eliminar un informe específico
async function eliminarInforme(informeId) {
    const response = await fetch(`http://localhost:3000/api/informes/${informeId}`, {
        method: 'DELETE'
    });
    return response.ok;
}