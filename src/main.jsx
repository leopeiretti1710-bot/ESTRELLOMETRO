import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Principal from './Principal.jsx';
import JoinEvent from './Unirseevento.jsx';
import Organizar from './Organizar.jsx';

const rout = createRoot(document.getElementById('root'));
rout.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element ={<Principal />}/>
      <Route path="/unirse" element ={<JoinEvent />}/>
      <Route path="/organizar" element ={<Organizar />}/>
    </Routes>
  </BrowserRouter>
)
