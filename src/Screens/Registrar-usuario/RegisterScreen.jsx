import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente
    const camposVacios = Object.values(formData).some((campo) => campo === '');
    if (camposVacios) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    try {
      const response = await registrarUsuario(formData);
      if (response.success) {
        alert("Registro exitoso");
        navigate('/main');
      } else {
        setError("Error al registrar. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setError("Hubo un error en el registro. Verifica los datos e intenta nuevamente.");
    }
  };

  return (
    <div className="register-screen">
      <img src="/Images/fitnow-logo.png" alt="FitNow Logo" className="logo" />
      <h2>Regístrate en FitNow</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister}>
        <div className="form">
          <InputField label="Email" type="email" placeholder="nombre@ejemplo.com" name="email" value={formData.email} onChange={handleChange} />
          <InputField label="Ingrese su nombre" type="text" placeholder="nombre..." name="nombre" value={formData.nombre} onChange={handleChange} />
          <InputField label="Sexo" type="select" options={['Seleccionar', 'Masculino', 'Femenino', 'Otro']} name="sexo" value={formData.sexo} onChange={handleChange} />
          <InputField label="Altura en cm" type="text" placeholder="Ingresar altura" name="altura" value={formData.altura} onChange={handleChange} />
          <InputField label="Peso en kg" type="text" placeholder="Ingresar peso" name="peso" value={formData.peso} onChange={handleChange} />
          <InputField label="Edad" type="text" placeholder="Ingresar edad" name="edad" value={formData.edad} onChange={handleChange} />
          <InputField label="Contraseña" type="password" placeholder="********" name="contrasena" value={formData.contrasena} onChange={handleChange} />
        </div>
        <RegisterButton text="Registrarse" />
      </form>
    </div>
  );
}

export default RegisterScreen;