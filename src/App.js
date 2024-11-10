import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Screens/MainPage/MainPage';
import CrearRutinaScreen from './Screens/CrearRutinaScreen/CrearRutinaScreen';
import VistaPreliminarRutinaScreen from './Screens/VistaPreliminarRutinaScreen/VistaPreliminarRutinaScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage userId={1} userName="Usuario" />} />
        <Route path="/crear-rutina" element={<CrearRutinaScreen />} />
        <Route path="/vista-preliminar-rutina" element={<VistaPreliminarRutinaScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
