import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../Components/InputField/InputField';
import LoginButton from '../../Components/LoginButton/LoginButton';
import { iniciarSesion } from '../../api/usuarioApi';
import './LoginScreen.css';
import MainPage from '../MainPage/MainPage';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Nuevo estado para almacenar el mensaje de error
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Reiniciar el mensaje de error
      setError('');

      // Intentar iniciar sesión
      const response = await iniciarSesion({ email, password });

      if (response.error) {
        // Si el backend responde con un error, mostrarlo
        setError(response.error);
      } else {
        // Si el inicio de sesión es exitoso, navegar a la página principal
        navigate('/main', { state: { user: response } });
      }
    } catch (error) {
      // Manejo de errores (consola y mensaje de usuario)
      console.error('Error:', error);
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="login-screen">
      <img src="/Images/fitnow-logo.png" alt="FitNow Logo" className="logo" />
      <h2>Bienvenido a FitNow</h2>
      <p>
        ¿No tienes una cuenta?{' '}
        <Link to="/register" className="register-link">
          Registrar Usuario
        </Link>
      </p>
      <InputField
        label="Email"
        type="email"
        placeholder="nombre@ejemplo.com"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        label="Contraseña"
        type="password"
        placeholder="********"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="error-message">{error}</p>} {/* Mostrar error si existe */}
      <LoginButton onClick={handleLogin} />
      <MainPage/>
    </div>
  );
}

export default LoginScreen;
