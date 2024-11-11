// Obtener todas las rutinas de un usuario por ID de usuario
export async function obtenerRutinasPorUsuario(idUsuario) {
    const response = await fetch(`http://localhost:3000/api/rutinas/${idUsuario}`);
    return await response.json();
}

// Obtener solo el nombre de una rutina por ID
export async function obtenerNombreRutina(idRutina) {
    const response = await fetch(`http://localhost:3000/api/rutinas/${idRutina}/nombre`);
    return await response.json();
}

// Crear una nueva rutina
export async function crearRutina(rutinaData) {
    try {
        const response = await fetch('http://localhost:3000/api/rutinas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rutinaData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al guardar la rutina.');
        }
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Error en guardar la rutina:", error);
        return { success: false, error: error.message };
    }
}
// Obtener rutinas por nombre
export async function obtenerRutinasPorNombre(nombre) {
    const response = await fetch(`http://localhost:3000/api/rutinas/nombre/${nombre}`);
    return await response.json();
}