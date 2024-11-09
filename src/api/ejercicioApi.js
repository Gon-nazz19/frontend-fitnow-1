// Crear un nuevo ejercicio
async function crearEjercicio(ejercicioData) {
    const response = await fetch('http://localhost:3000/api/ejercicios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ejercicioData)
    });
    return await response.json();
}

// Listar todos los ejercicios
async function listarEjercicios() {
    const response = await fetch('http://localhost:3000/api/ejercicios');
    return await response.json();
}

// Actualizar un ejercicio específico
async function actualizarEjercicio(ejercicioId, ejercicioData) {
    const response = await fetch(`http://localhost:3000/api/ejercicios/${ejercicioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ejercicioData)
    });
    return await response.json();
}

// Obtener ejercicios por nombre
async function obtenerEjercicioPorNombre(nombre) {
    const response = await fetch(`http://localhost:3000/api/ejercicios/nombre/${nombre}`);
    return await response.json();
}