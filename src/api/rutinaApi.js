// Obtener todas las rutinas de un usuario por ID de usuario
async function obtenerRutinasPorUsuario(idUsuario) {
    const response = await fetch(`http://localhost:3000/api/rutinas/${idUsuario}`);
    return await response.json();
}

// Obtener solo el nombre de una rutina por ID
async function obtenerNombreRutina(idRutina) {
    const response = await fetch(`http://localhost:3000/api/rutinas/${idRutina}/nombre`);
    return await response.json();
}

// Crear una nueva rutina
async function crearRutina(rutinaData) {
    const response = await fetch('http://localhost:3000/api/rutinas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rutinaData)
    });
    return await response.json();
}

// Obtener rutinas por nombre
async function obtenerRutinasPorNombre(nombre) {
    const response = await fetch(`http://localhost:3000/api/rutinas/nombre/${nombre}`);
    return await response.json();
}