import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Unirseevento.css';

export default function JoinEvent({ nombreEvento, setNombreEvento }) {
  const [pestana, setPestana] = useState('qr');

  return (
    <div className="contenedor-unirse">
      <div className="encabezado">
        <Link to="/" className="btn-volver">←</Link>
        <div>
          <h2>Unirse al evento</h2>
          <p>Escaneá el QR o ingresá el código</p>
        </div>
      </div>

      <div className="tabs">
        <button 
          className={pestana === 'qr' ? 'tab activa' : 'tab'} 
          onClick={() => setPestana('qr')}
        >
          📷 Escanear QR
        </button>
        <button 
          className={pestana === 'manual' ? 'tab activa' : 'tab'} 
          onClick={() => setPestana('manual')}
        >
          ⌨️ Código manual
        </button>
      </div>

      {pestana === 'qr' && (
        <div className="contenido-tab animar-entrada">
          <div className="caja-qr">
            <div className="cuadro-camara">
              <span className="esquina top-left"></span>
              <span className="esquina top-right"></span>
              <span className="esquina bottom-left"></span>
              <span className="esquina bottom-right"></span>
              
              <span className="texto-camara">CÁMARA</span>
              <div className="linea-escaner"></div>
            </div>
          </div>
          <p className="instruccion">Apuntá la cámara al código QR de {nombreEvento}</p>
          <p className="estado-escaneo">
            <span className="punto-verde"></span> Escaneando...
          </p>
          <div className="cartel-mensaje">
            ✨ QR detectado · Uniéndose a {nombreEvento}...
          </div>
        </div>
      )}

      {pestana === 'manual' && (
        <div className="contenido-tab animar-entrada">
          <div className="tarjeta-input">
            <h3>Código del evento</h3>
            <p className="subtitulo-tarjeta">Ingresá el código que te compartió el organizador</p>
            
            <input 
              type="text" 
              placeholder="Ej: BODA2025" 
              value={nombreEvento}
              onChange={(e) => setNombreEvento(e.target.value.toUpperCase())}
              className="input-codigo"
            />

            <button className={`btn-unirse ${nombreEvento.length > 0 ? 'activo' : ''}`}>
              Unirse a {nombreEvento || 'evento'} →
            </button>

            <div className="eventos-recientes">
              <p>Eventos recientes:</p>
              <div className="botones-recientes">
                <button type="button" onClick={() => setNombreEvento('BODA2025')}>BODA2025</button>
                <button type="button" onClick={() => setNombreEvento('XV-SOFIA')}>XV-SOFIA</button>
                <button type="button" onClick={() => setNombreEvento('CUMP-JULI')}>CUMP-JULI</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}