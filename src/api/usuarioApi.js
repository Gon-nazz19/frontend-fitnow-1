// Registrar un nuevo usuario
async function registrarUsuario(usuarioData) {
    const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioData)
    });
    return await response.json();
}

// Iniciar sesión
async function iniciarSesion(email, contraseña) {
    const response = await fetch('http://localhost:3000/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contraseña })
    });
    return await response.json(); // Retorna el JSON de la respuesta
  }

// Obtener usuario por ID
async function obtenerUsuarioPorId(id) {
    const response = await fetch(`http://localhost:3000/api/usuarios/${id}`);
    return await response.json();
}

// Obtener solo el nombre del usuario por ID
async function obtenerNombreUsuario(id) {
    const response = await fetch(`http://localhost:3000/api/usuarios/${id}/nombre`);
    return await response.json();
}