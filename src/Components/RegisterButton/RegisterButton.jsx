import React from 'react';
import './RegisterButton.css';

function RegisterButton({ text }) {
  return (
    <button className="register-button">
      {text}
    </button>
  );
}

export default RegisterButton;
