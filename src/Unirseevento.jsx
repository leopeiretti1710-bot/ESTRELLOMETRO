import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from './firebase';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import './JoinEvent.css';

export default function JoinEvent() {
  const [codigo, setCodigo] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUnirse = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    const codigoLimpio = codigo.trim().toUpperCase();

    try {
      const docRef = doc(db, "eventos", codigoLimpio);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Incrementar contador de participantes
        await updateDoc(docRef, { invitadosCount: increment(1) });

        // Guardar la sesión localmente
        localStorage.setItem('evento_codigo', codigoLimpio);
        localStorage.setItem('usuario_nombre', nombreUsuario);

        // Redirigir al detalle del evento
        navigate(`/evento/${codigoLimpio}`);
      } else {
        setError('El código no existe. Verificá que esté bien escrito.');
      }
    } catch (err) {
      console.error(err);
      setError('Error al conectar con la base de datos.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="join-event-container">
      <div className="join-event-card">
        <div className="join-event-header">
          <div className="join-event-icon">🎉</div>
          <h2>Unirse al Evento</h2>
          <p>Ingresá el código de la sala para empezar a compartir fotos.</p>
        </div>

        {error && <div className="join-error-msg">{error}</div>}

        <form className="join-event-form" onSubmit={handleUnirse}>
          <div className="input-group">
            <label>Código del Evento</label>
            <input
              type="text"
              className="join-input code-input"
              placeholder="EJ: CUMPLE-2026"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Tu Nombre / Apodo</label>
            <input
              type="text"
              className="join-input"
              placeholder="¿Cómo te dicen?"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-join-submit" disabled={cargando}>
            {cargando ? 'Validando...' : 'Ingresar a la Sala 🚀'}
          </button>
        </form>

        <div className="join-event-footer">
          <Link to="/" className="btn-back-link">← Volver al Inicio</Link>
        </div>
      </div>
    </div>
  );
}