// Registrar un nuevo usuario
export async function registrarUsuario(usuarioData) {
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
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Error en registrarUsuario:", error);
        return { success: false, error: error.message };
    }
}

// Iniciar sesión
export async function iniciarSesion({ email, password }) {
    if (!email || !password) {
        throw new Error("Email y contraseña son obligatorios.");
    }
    try {
        const response = await fetch('http://localhost:3000/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) throw new Error("Error en inicio de sesión.");
        return await response.json();
    } catch (error) {
        console.error("Error en iniciarSesion:", error);
        throw error;
    }
}

// Obtener usuario por ID
export async function obtenerUsuarioPorId(id) {
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