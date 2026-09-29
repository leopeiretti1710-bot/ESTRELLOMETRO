import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { db } from './firebase';
import { doc, setDoc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import './Organizar.css';

export default function Organizar() {
  const [eventoActivo, setEventoActivo] = useState(null);
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [nombreEvento, setNombreEvento] = useState('');
  const [tipoEvento, setTipoEvento] = useState('Fiesta');

  const [tab, setTab] = useState('galeria');
  const [busqueda, setBusqueda] = useState('');
  const [fotos, setFotos] = useState([]);
  const [desafios, setDesafios] = useState([]);
  const [nuevoTituloDesafio, setNuevoTituloDesafio] = useState('');
  const [nuevaDescDesafio, setNuevaDescDesafio] = useState('');

  const inputOcultoRef = useRef(null);

  // Escuchar cambios del evento en Firestore en TIEMPO REAL
  useEffect(() => {
    if (!eventoActivo?.codigo) return;

    const unsub = onSnapshot(doc(db, "eventos", eventoActivo.codigo), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFotos(data.fotos || []);
        setDesafios(data.desafios || []);
      }
    });

    return () => unsub();
  }, [eventoActivo?.codigo]);

  // Crear nuevo evento en la NUBE
  const crearEventoSubmit = async (e) => {
    e.preventDefault();
    if (!nombreEvento.trim()) return;

    const codigoGenerado = nombreEvento.toUpperCase().replace(/\s+/g, '-') + '-2026';
    const nuevoEvento = {
      nombre: nombreEvento,
      tipo: tipoEvento,
      codigo: codigoGenerado,
      invitadosCount: 1,
      fotos: [
        { id: 1, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500', estrellas: 14, hora: '22:10', usuario: 'Santi' },
        { id: 2, url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500', estrellas: 9, hora: '22:45', usuario: 'Cande' }
      ],
      desafios: [
        { id: 1, titulo: 'Foto más divertida 🤪', descripcion: 'Capturá el momento más insólito' }
      ]
    };

    try {
      await setDoc(doc(db, "eventos", codigoGenerado), nuevoEvento);
      setEventoActivo(nuevoEvento);
      localStorage.setItem('evento_codigo', codigoGenerado);
      setMostrarModalNuevo(false);
    } catch (err) {
      console.error("Error al crear evento:", err);
      alert("Error al conectar con la base de datos.");
    }
  };

  // Agregar nuevo desafío a Firestore
  const agregarDesafio = async (e) => {
    e.preventDefault();
    if (!nuevoTituloDesafio.trim() || !eventoActivo?.codigo) return;

    const nuevoD = { id: Date.now(), titulo: nuevoTituloDesafio, descripcion: nuevaDescDesafio };

    try {
      await updateDoc(doc(db, "eventos", eventoActivo.codigo), {
        desafios: arrayUnion(nuevoD)
      });
      setNuevoTituloDesafio('');
      setNuevaDescDesafio('');
    } catch (err) {
      console.error(err);
    }
  };

  // Subir foto local a Firestore
  const subirFotoOrganizador = async (e) => {
    const archivos = Array.from(e.target.files);
    if (archivos.length === 0 || !eventoActivo?.codigo) return;

    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Por practicidad generamos la URL temporal de muestra
    const fotosNuevas = archivos.map((file, i) => ({
      id: Date.now() + i,
      url: URL.createObjectURL(file),
      estrellas: 0,
      hora: horaActual,
      usuario: 'Organizador'
    }));

    try {
      const eventoRef = doc(db, "eventos", eventoActivo.codigo);
      for (let f of fotosNuevas) {
        await updateDoc(eventoRef, { fotos: arrayUnion(f) });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copiarLinkAcceso = () => {
    const url = `${window.location.origin}/join`;
    navigator.clipboard.writeText(`${url} | Código: ${eventoActivo?.codigo}`);
    alert(`¡Código ${eventoActivo?.codigo} copiado! Usalo en la otra computadora para ingresar.`);
  };

  const fotosFiltradas = fotos.filter((f) =>
    f.usuario.toLowerCase().includes(busqueda.toLowerCase()) || f.hora.includes(busqueda)
  );
  const fotoGanadora = fotos.reduce((max, f) => (f.estrellas > (max?.estrellas || -1) ? f : max), null);
  const totalEstrellas = fotos.reduce((sum, f) => sum + f.estrellas, 0);

  return (
    <div className="contenedor-organizar">
      <input type="file" ref={inputOcultoRef} onChange={subirFotoOrganizador} accept="image/*" multiple style={{ display: 'none' }} />

      <header className="header-organizar">
        <Link to="/" className="btn-volver-home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="titulo-header">
          <h2>Panel de Control</h2>
          <p>{eventoActivo ? `Código: ${eventoActivo.codigo}` : 'Modo Organizador'}</p>
        </div>
        {eventoActivo && (
          <button className="btn-nuevo-mini" onClick={() => setMostrarModalNuevo(true)}>+ Nuevo</button>
        )}
      </header>

      {!eventoActivo ? (
        <main className="bienvenida-organizador">
          <div className="card-bienvenida">
            <div className="icono-bienvenida">👑</div>
            <h3>Crear un evento global</h3>
            <p>Generá tu código de sala para sincronizar la fiesta con todos los invitados.</p>
            <button className="btn-crear-primero" onClick={() => setMostrarModalNuevo(true)}>Crear Nuevo Evento</button>
          </div>
        </main>
      ) : (
        <main className="panel-principal-organizar">
          <section className="grid-metricas">
            <div className="card-metrica"><span className="metrica-valor">{fotos.length}</span><span className="metrica-label">Fotos</span></div>
            <div className="card-metrica"><span className="metrica-valor">★ {totalEstrellas}</span><span className="metrica-label">Estrellas</span></div>
            <div className="card-metrica"><span className="metrica-valor">{eventoActivo.invitadosCount}</span><span className="metrica-label">Unidos</span></div>
          </section>

          <section className="barra-acciones-admin">
            <button className="btn-accion-admin" onClick={copiarLinkAcceso}>🔗 Copiar Código</button>
            <button className="btn-accion-admin" onClick={() => inputOcultoRef.current?.click()}>➕ Subir Foto</button>
          </section>

          <nav className="tabs-organizar">
            <button className={`tab-btn ${tab === 'galeria' ? 'activo' : ''}`} onClick={() => setTab('galeria')}>Galería ({fotos.length})</button>
            <button className={`tab-btn ${tab === 'desafios' ? 'activo' : ''}`} onClick={() => setTab('desafios')}>Desafíos</button>
            <button className={`tab-btn ${tab === 'podio' ? 'activo' : ''}`} onClick={() => setTab('podio')}>Podio</button>
          </nav>

          {tab === 'galeria' && (
            <div className="tab-contenido">
              <div className="caja-buscador">
                <input type="text" placeholder="Buscar foto..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
              </div>
              <div className="grid-galeria-admin">
                {fotosFiltradas.map((foto) => (
                  <div key={foto.id} className="item-foto-admin" style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85), transparent 60%), url(${foto.url})` }}>
                    <div className="info-foto-overlay">
                      <span>{foto.usuario}</span>
                      <span>★ {foto.estrellas}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'desafios' && (
            <div className="tab-contenido">
              <form className="form-nuevo-desafio" onSubmit={agregarDesafio}>
                <h4>Nuevo Desafío</h4>
                <input type="text" placeholder="Título" value={nuevoTituloDesafio} onChange={(e) => setNuevoTituloDesafio(e.target.value)} required />
                <input type="text" placeholder="Descripción" value={nuevaDescDesafio} onChange={(e) => setNuevaDescDesafio(e.target.value)} />
                <button type="submit" className="btn-agregar-desafio">Publicar</button>
              </form>
              {desafios.map((d) => (
                <div key={d.id} className="card-desafio-admin">
                  <h5>{d.titulo}</h5>
                  <p>{d.descripcion}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'podio' && (
            <div className="tab-contenido">
              {fotoGanadora ? (
                <div className="card-destacada-podio">
                  <div className="badge-podio">👑 Foto N° 1</div>
                  <img src={fotoGanadora.url} alt="Ganadora" className="img-podio" />
                  <p>Subida por: <strong>{fotoGanadora.usuario}</strong> - ★ {fotoGanadora.estrellas} Estrellas</p>
                </div>
              ) : <p className="vacio-mensaje">Sin votos acumulados aún.</p>}
            </div>
          )}
        </main>
      )}

      {mostrarModalNuevo && (
        <div className="overlay-modal" onClick={() => setMostrarModalNuevo(false)}>
          <div className="card-modal" onClick={(e) => e.stopPropagation()}>
            3<h3>Crear Nuevo Evento</h3>
            <form onSubmit={crearEventoSubmit}>
              <div className="campo-form">
                <label>Nombre del Evento</label>
                <input type="text" placeholder="ej: Cumple Santi" value={nombreEvento} onChange={(e) => setNombreEvento(e.target.value)} required />
              </div>
              <div className="campo-form">
                <label>Tipo</label>
                <select value={tipoEvento} onChange={(e) => setTipoEvento(e.target.value)}>
                  <option value="Fiesta">Fiesta / Boliche</option>
                  <option value="Cumpleaños">Cumpleaños</option>
                  <option value="Casamiento">Casamiento</option>
                </select>
              </div>
              <div className="botones-modal">
                <button type="button" className="btn-cancelar-modal" onClick={() => setMostrarModalNuevo(false)}>Cancelar</button>
                <button type="submit" className="btn-confirmar-modal">Crear en la Nube</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}