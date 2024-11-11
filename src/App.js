import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import RegisterScreen from './Screens/Registrar-usuario/RegisterScreen';
import MainPage from './Screens/MainPage/MainPage';
import CrearRutinaScreen from './Screens/CrearRutinaScreen/CrearRutinaScreen';
import VistaPreliminarRutinaScreen from './Screens/VistaPreliminarRutinaScreen/VistaPreliminarRutinaScreen';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen setUser={setUser} />} />
        <Route path="/register" element={<RegisterScreen userId={user?.id_usuario}/>} />
        <Route path="/main" element={<MainPage user={user} />} />
        <Route path="/crear-rutina" element={<CrearRutinaScreen userId={user?.id_usuario} />} />
        <Route path="/vista-preliminar-rutina" element={<VistaPreliminarRutinaScreen userId={user?.id_usuario} />} />
      </Routes>
    </Router>
  );
}

export default App;