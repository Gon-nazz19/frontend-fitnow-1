// LoginScreen.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../Components/InputField/InputField';
import LoginButton from '../../Components/LoginButton/LoginButton';
import { iniciarSesion } from '../../api/usuarioApi';
import './LoginScreen.css';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await iniciarSesion({ email, password });
      console.log(response); // This will log the API response to check if login was successful
      // Navigate or update UI based on response if successful
    } catch (error) {
      console.error('Error:', error);
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
      <InputField label="Email" type="email" placeholder="nombre@ejemplo.com" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      <InputField label="Contraseña" type="password" placeholder="********" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      <LoginButton onClick={handleLogin} />
    </div>
  );
}

export default LoginScreen;
