import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Unirseevento.css';

export default function JoinEvent() {
  const [pestana, setPestana] = useState('qr');
  const [codigo, setCodigo] = useState('');
  const navigate = useNavigate();
  
  const ingresarAlEvento = (codigoIngresado) => {
  if (!codigoIngresado) return;
  navigate(`/evento/${codigoIngresado}`);
};

  return (
    <div className="join-event-container">
      <div className="join-event-card">
        
        <div className="join-event-header">
          <div className="join-event-icon">🎉</div>
          <h2>Unirse al Evento</h2>
          <p>Ingresá el código de la sala y tu nombre para empezar a compartir fotos.</p>
        </div>

        <form className="join-event-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>Código del Evento</label>
            <input 
              type="text" 
              className="join-input code-input" 
              placeholder="EJ: FIESTA-2026" 
              maxLength={12}
              required 
            />
          </div>

          <div className="input-group">
            <label>Tu Nombre / Apodo</label>
            <input 
              type="text" 
              className="join-input" 
              placeholder="¿Cómo te dicen?" 
              required 
            />
          </div>

          <button type="submit" className="btn-join-submit">
            Ingresar a la Sala 🚀
          </button>
        </form>

        <div className="join-event-footer">
          <Link to="/" className="btn-back-link">
            ← Volver al Inicio
          </Link>
        </div>

      </div>
    </div>
  );
}