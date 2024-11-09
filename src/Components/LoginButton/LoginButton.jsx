// LoginButton.jsx
import React from 'react';
import './LoginButton.css';

const LoginButton = ({ onClick }) => {
  return (
    <button className="login-button" onClick={onClick}>
      Iniciar sesión
    </button>
  );
};

export default LoginButton;
