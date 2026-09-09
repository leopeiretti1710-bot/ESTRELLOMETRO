import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Unirseevento.css';

export default function JoinEvent() {
  const [pestana, setPestana] = useState('qr');
  const [codigo, setCodigo] = useState('');

  return (
    <div className="contenedor-unirse">
      {/* Encabezado */}
      <div className="encabezado">
        <Link to="/" className="btn-volver">←</Link>
        <div>
          <h2>Unirse al evento</h2>
          <p>Escaneá el QR o ingresá el código</p>
        </div>
      </div>

      {/* Selector de Pestañas */}
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

      {/* Pestaña 1: Escanear QR */}
      {pestana === 'qr' && (
        <div className="contenido-tab animar-entrada">
          <div className="caja-qr">
            <div className="cuadro-camara">
              {/* Esquinas decorativas doradas */}
              <span className="esquina top-left"></span>
              <span className="esquina top-right"></span>
              <span className="esquina bottom-left"></span>
              <span className="esquina bottom-right"></span>
              
              <span className="texto-camara">CÁMARA</span>
              {/* Línea de escaneo animada */}
              <div className="linea-escaner"></div>
            </div>
          </div>
          <p className="instruccion">Apuntá la cámara al código QR del evento</p>
          <p className="estado-escaneo">
            <span className="punto-verde"></span> Escaneando...
          </p>
          <div className="cartel-mensaje">
            ✨ QR detectado · Uniéndose automáticamente...
          </div>
        </div>
      )}

      {/* Pestaña 2: Código Manual */}
      {pestana === 'manual' && (
        <div className="contenido-tab animar-entrada">
          <div className="tarjeta-input">
            <h3>Código del evento</h3>
            <p className="subtitulo-tarjeta">Ingresá el código que te compartió el organizador</p>
            
            <input 
              type="text" 
              placeholder="Ej: BODA2025" 
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              className="input-codigo"
            />

            <button className={`btn-unirse ${codigo.length > 0 ? 'activo' : ''}`}>
              Unirse →
            </button>

            <div className="eventos-recientes">
              <p>Eventos recientes:</p>
              <div className="botones-recientes">
                <button type="button" onClick={() => setCodigo('BODA2025')}>BODA2025</button>
                <button type="button" onClick={() => setCodigo('XV-SOFIA')}>XV-SOFIA</button>
                <button type="button" onClick={() => setCodigo('CUMP-JULI')}>CUMP-JULI</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}