// RegisterButton.js
import React from 'react';
import './RegisterButton.css';

function RegisterButton({ text, onClick }) {
  return (
    <button className="register-button" onClick={onClick}>
      {text}
    </button>
  );
}

export default RegisterButton;

