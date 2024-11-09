// RegisterScreen.jsx
import React, { useState } from 'react';
import InputField from '../../Components/InputField/InputField';
import RegisterButton from '../../Components/RegisterButton/RegisterButton';
import { registrarUsuario } from '../../api/usuarioApi';
import './RegisterScreen.css';

function RegisterScreen() {
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    sexo: '',
    altura: '',
    peso: '',
    edad: '',
    contrasena: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      const response = await registrarUsuario (formData);
      console.log(response); // Log the response to verify if the registration was successful
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="register-screen">
      <img src="/Images/fitnow-logo.png" alt="FitNow Logo" className="logo" />
      <h2>Regístrate en FitNow</h2>
      <div className="form">
        <InputField label="Email" type="email" placeholder="nombre@ejemplo.com" name="email" value={formData.email} onChange={handleChange} />
        <InputField label="Ingrese su nombre" type="text" placeholder="nombre..." name="nombre" value={formData.nombre} onChange={handleChange} />
        <InputField label="Sexo" type="select" options={['Seleccionar', 'Masculino', 'Femenino', 'Otro']} name="sexo" value={formData.sexo} onChange={handleChange} />
        <InputField label="Altura en cm" type="text" placeholder="Ingresar altura" name="altura" value={formData.altura} onChange={handleChange} />
        <InputField label="Peso en kg" type="text" placeholder="Ingresar peso" name="peso" value={formData.peso} onChange={handleChange} />
        <InputField label="Edad" type="text" placeholder="Ingresar edad" name="edad" value={formData.edad} onChange={handleChange} />
        <InputField label="Contraseña" type="password" placeholder="********" name="contrasena" value={formData.contrasena} onChange={handleChange} />
      </div>
      <RegisterButton text="Registrarse" onClick={handleRegister} />
    </div>
  );
}

export default RegisterScreen;
