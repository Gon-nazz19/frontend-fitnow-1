// LoginScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../../api/usuarioApi';
import InputField from '../../Components/InputField/InputField';
import './LoginScreen.css';

function LoginScreen() {
  const [formData, setFormData] = useState({ email: '', contrasena: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.contrasena) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await iniciarSesion(formData);
      console.log("Respuesta del servidor:", response); // Verifica la respuesta del servidor
  
      if (response.success) {
        alert("Inicio de sesión exitoso");
        navigate('/main'); // Redirige a MainPage después de iniciar sesión exitosamente
      } else {
        setError("Correo o contraseña incorrectos. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Hubo un error al iniciar sesión. Verifica los datos e intenta nuevamente.");
    }
  };

  return (
    <div className="login-screen">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form">
        <InputField label="Email" type="email" placeholder="nombre@ejemplo.com" name="email" value={formData.email} onChange={handleChange} />
        <InputField label="Contraseña" type="password" placeholder="********" name="contrasena" value={formData.contrasena} onChange={handleChange} />
      </div>
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
}

export default LoginScreen;
