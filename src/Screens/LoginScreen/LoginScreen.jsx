import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../Components/InputField/InputField';
import LoginButton from '../../Components/LoginButton/LoginButton';
import { iniciarSesion } from '../../api/usuarioApi';
import './LoginScreen.css';
import logo from '../../Images/logo.jpg';

function LoginScreen({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente
    try {
      setError('');
      const response = await iniciarSesion({ email, password });
      if (response.error) {
        setError(response.error);
      } else {
        setUser(response); // Establece el usuario en el estado global o contexto
        navigate('/main', { state: { user: response } });
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="login-screen">
      <img src={logo} alt="FitNow Logo" className="login-logo" />
      <h2>Bienvenido a FitNow</h2>
      <form onSubmit={handleLogin}>
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
        {error && <p className="error-message">{error}</p>}
        <LoginButton />
      </form>
      <p>
        ¿No tienes una cuenta?{' '}
        <Link to="/register" className="register-link">
          Registrar Usuario
        </Link>
      </p>
    </div>
  );
}

export default LoginScreen;