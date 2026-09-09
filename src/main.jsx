import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from './Principal.jsx';
import JoinEvent from './Unirseevento.jsx';
import Organizar from './Organizar.jsx';

function AppRoutes() {
  // Estado global para el nombre del evento
  const [nombreEvento, setNombreEvento] = useState('BODA2025');

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Principal nombreEvento={nombreEvento} />} 
      />
      <Route 
        path="/unirse" 
        element={<JoinEvent nombreEvento={nombreEvento} setNombreEvento={setNombreEvento} />} 
      />
      <Route 
        path="/organizar" 
        element={<Organizar nombreEvento={nombreEvento} setNombreEvento={setNombreEvento} />} 
      />
    </Routes>
  );
}

const rout = createRoot(document.getElementById('root'));
rout.render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);