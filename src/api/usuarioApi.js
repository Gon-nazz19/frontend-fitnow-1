// usuarioApi.js

// Registrar un nuevo usuario
async function registrarUsuario(usuarioData) {
    if (!usuarioData || !usuarioData.email || !usuarioData.contrasena) {
        throw new Error("Email y contraseña son obligatorios.");
    }
    try {
        const response = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuarioData)
        });
        if (!response.ok) throw new Error("Error al registrar usuario.");
        return await response.json();
    } catch (error) {
        console.error("Error en registrarUsuario:", error);
        throw error;
    }
}
  
// Iniciar sesión
async function iniciarSesion({ email, contraseña }) {
    if (!email || !contraseña) {
        throw new Error("Email y contraseña son obligatorios.");
    }
    try {
        const response = await fetch('http://localhost:3000/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, contraseña })
        });
        if (!response.ok) throw new Error("Error en inicio de sesión.");
        return await response.json();
    } catch (error) {
        console.error("Error en iniciarSesion:", error);
        throw error;
    }
}

// Obtener usuario por ID
async function obtenerUsuarioPorId(id) {
    if (!id) throw new Error("ID de usuario es obligatorio.");
    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/${id}`);
        if (!response.ok) throw new Error("Usuario no encontrado.");
        return await response.json();
    } catch (error) {
        console.error("Error en obtenerUsuarioPorId:", error);
        throw error;
    }
}

export { registrarUsuario, iniciarSesion, obtenerUsuarioPorId };
