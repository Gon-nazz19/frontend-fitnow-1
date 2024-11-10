import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import RegisterScreen from './Screens/Registrar-usuario/RegisterScreen';
import MainPage from './Screens/MainPage/MainPage';
import CrearRutinaScreen from './Screens/CrearRutinaScreen/CrearRutinaScreen';
import VistaPreliminarRutinaScreen from './Screens/VistaPreliminarRutinaScreen/VistaPreliminarRutinaScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/main" element={<MainPage userId={1} userName="Usuario" />} />
        <Route path="/crear-rutina" element={<CrearRutinaScreen />} />
        <Route path="/vista-preliminar-rutina" element={<VistaPreliminarRutinaScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
