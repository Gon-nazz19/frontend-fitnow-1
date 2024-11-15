// Agregar la palabra clave 'export' antes de la función
// Obtener informes por ID de rutina
export async function obtenerInformesPorIdRutina(idRutina) {
    try {
        const response = await fetch(`http://localhost:3000/api/informes/${idRutina}`);
        if (!response.ok) {
            throw new Error('Error al obtener los informes');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener informes:', error);
        throw error;
    }
}

// Obtener un informe por ID
export async function obtenerInformePorId(idInforme) {
    const response = await fetch(`http://localhost:3000/api/informes/${idInforme}`);
    return await response.json();
}

// Crear un nuevo informe
export async function crearInforme(informeData) {
    const response = await fetch('http://localhost:3000/api/informes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(informeData)
    });
    return await response.json();
}

// Eliminar un informe específico
export async function eliminarInforme(informeId) {
    const response = await fetch(`http://localhost:3000/api/informes/${informeId}`, {
        method: 'DELETE'
    });
    return response.ok;
}