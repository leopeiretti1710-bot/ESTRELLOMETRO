import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Organizar.css';

export default function Organizar() {
  const [tabActiva, setTabActiva] = useState('galeria');

  // Nombre del evento editable
  const [nombreEvento, setNombreEvento] = useState('BODA2025');

  // Estados iniciales vacíos
  const [fotos, setFotos] = useState([]);
  const [desafios, setDesafios] = useState([]);

  // Estados para el formulario de nuevo desafío
  const [nuevoTituloDesafio, setNuevoTituloDesafio] = useState('');
  const [nuevaDescDesafio, setNuevaDescDesafio] = useState('');
  const [mostrarFormDesafio, setMostrarFormDesafio] = useState(false);

  // Referencia para el input de archivos oculto
  const inputFotoRef = useRef(null);

  // Abre el explorador de archivos
  const abrirExploradorArchivos = () => {
    inputFotoRef.current?.click();
  };

  // Procesa y agrega las imágenes seleccionadas
  const manejarSeleccionFoto = (e) => {
    const archivos = Array.from(e.target.files);

    if (archivos.length > 0) {
      const horaActual = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });

      const nuevasFotos = archivos.map((archivo, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(archivo),
        estrellas: 0,
        hora: horaActual
      }));

      setFotos((prevFotos) => [...nuevasFotos, ...prevFotos]);
      setTabActiva('galeria');
    }
  };

  // Función para agregar un nuevo desafío
  const agregarDesafio = (e) => {
    e.preventDefault();
    if (!nuevoTituloDesafio.trim()) return;

    const nuevo = {
      id: Date.now(),
      titulo: nuevoTituloDesafio,
      descripcion: nuevaDescDesafio || 'Sin descripción',
      participantes: 0
    };

    setDesafios((prev) => [...prev, nuevo]);
    setNuevoTituloDesafio('');
    setNuevaDescDesafio('');
    setMostrarFormDesafio(false);
  };

  return (
    <div className="contenedor-organizar">
      {/* INPUT OCULTO PARA SUBIR FOTOS */}
      <input
        type="file"
        ref={inputFotoRef}
        onChange={manejarSeleccionFoto}
        accept=".jpg, .jpeg, .png, image/jpeg, image/png"
        multiple
        style={{ display: 'none' }}
      />

      {/* 1. ENCABEZADO SUPERIOR */}
      <header className="encabezado-evento">
        <div className="info-evento">
          <Link to="/" className="btn-volver-evento" aria-label="Volver">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h2>{nombreEvento || 'Nombre del evento'}</h2>
            <p>{fotos.length} fotos · 0 invitados</p>
          </div>
        </div>
        <div className="contador-tiempo">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>En curso</span>
        </div>
      </header>

      {/* 2. TARJETA RESUMEN */}
      <section className="tarjeta-resumen-evento">
        <div className="resumen-header">
          <div style={{ flex: 1, marginRight: '12px' }}>
            <span className="etiqueta-activo">EVENTO ACTIVO</span>
            
            {/* INPUT PARA ESCRIBIR O EDITAR EL NOMBRE DEL EVENTO */}
            <input
              type="text"
              value={nombreEvento}
              onChange={(e) => setNombreEvento(e.target.value)}
              placeholder="Nombre de tu evento..."
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: '1px dashed rgba(242, 192, 98, 0.4)',
                color: '#f2c062',
                fontSize: '20px',
                fontWeight: '700',
                letterSpacing: '0.5px',
                width: '100%',
                outline: 'none',
                marginTop: '4px',
                padding: '2px 0'
              }}
            />
          </div>
          <button className="btn-mas-foto" onClick={abrirExploradorArchivos}>
            + Foto
          </button>
        </div>

        <div className="grid-metricas">
          <div className="caja-metrica">
            <span className="numero-metrica text-amarillo">{fotos.length}</span>
            <span className="label-metrica">Fotos</span>
          </div>
          <div className="caja-metrica">
            <span className="numero-metrica text-violeta">0</span>
            <span className="label-metrica">Estrellas</span>
          </div>
          <div className="caja-metrica">
            <span className="numero-metrica text-verde">0</span>
            <span className="label-metrica">Invitados</span>
          </div>
        </div>

        <div className="destacado-mas-votada">
          <div className="preview-foto-destacada">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f2c062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <div className="info-destacada">
            <h4>Foto más votada</h4>
            <p>Sin votos aún</p>
          </div>
          <div className="icono-copa">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f2c062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
            </svg>
          </div>
        </div>
      </section>

      {/* 3. VISTAS Y CONTENIDO */}
      <main className="contenido-seccion animar-entrada">
        {/* PESTAÑA: GALERÍA */}
        {tabActiva === 'galeria' && (
          <div className="vista-galeria">
            {fotos.length > 0 && (
              <div className="caja-buscador">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a0a5ba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input type="text" placeholder="Buscar fotos..." className="input-buscador" />
              </div>
            )}

            {fotos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 10px', color: '#82889e' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px', opacity: 0.6 }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p style={{ margin: 0, fontSize: '14px' }}>Aún no hay fotos cargadas</p>
                <p style={{ margin: '4px 0 16px 0', fontSize: '12px', color: '#50566e' }}>Hacé clic en "+ Foto" para comenzar a subir la galería</p>
                <button className="btn-mas-foto" onClick={abrirExploradorArchivos}>
                  + Subir fotos
                </button>
              </div>
            ) : (
              <div className="grid-fotos">
                {fotos.map((foto) => (
                  <div
                    key={foto.id}
                    className="tarjeta-foto"
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(8,10,20,0.85), transparent 60%), url(${foto.url})`
                    }}
                  >
                    <span className="badge-estrellas">★ {foto.estrellas}</span>
                    <span className="hora-foto">{foto.hora}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA: DESAFÍOS */}
        {tabActiva === 'desafios' && (
          <div className="vista-desafios">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div className="banner-participa" style={{ margin: 0 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>Desafíos activos</span>
              </div>
              <button 
                className="btn-participar" 
                onClick={() => setMostrarFormDesafio(!mostrarFormDesafio)}
                style={{ height: '38px', padding: '0 12px' }}
              >
                {mostrarFormDesafio ? 'Cancelar' : '+ Crear Desafío'}
              </button>
            </div>

            {/* FORMULARIO PARA AGREGAR DESAFÍOS */}
            {mostrarFormDesafio && (
              <form onSubmit={agregarDesafio} style={{ background: 'rgba(18, 22, 38, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '14px', marginBottom: '16px' }}>
                <input 
                  type="text" 
                  placeholder="Título del desafío (ej. Foto más divertida)" 
                  value={nuevoTituloDesafio}
                  onChange={(e) => setNuevoTituloDesafio(e.target.value)}
                  style={{ width: '100%', background: 'rgba(10, 12, 22, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '10px', borderRadius: '8px', color: '#fff', marginBottom: '8px', boxSizing: 'border-box' }}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Descripción rápida..." 
                  value={nuevaDescDesafio}
                  onChange={(e) => setNuevaDescDesafio(e.target.value)}
                  style={{ width: '100%', background: 'rgba(10, 12, 22, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '10px', borderRadius: '8px', color: '#fff', marginBottom: '10px', boxSizing: 'border-box' }}
                />
                <button type="submit" className="btn-mas-foto" style={{ width: '100%' }}>Guardar Desafío</button>
              </form>
            )}

            {desafios.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 10px', color: '#82889e' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px', opacity: 0.6 }}>
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <p style={{ margin: 0, fontSize: '14px' }}>No hay desafíos creados aún</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#50566e' }}>Crea un desafío para motivar a los invitados</p>
              </div>
            ) : (
              desafios.map((d) => (
                <div key={d.id} className="tarjeta-desafio">
                  <div className="icono-desafio">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f2c062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <div className="info-desafio">
                    <h4>{d.titulo}</h4>
                    <p>{d.descripcion}</p>
                    <div className="footer-desafio">
                      <span>{d.participantes} participantes</span>
                      <button className="btn-participar" onClick={abrirExploradorArchivos}>
                        Participar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* PESTAÑA: PODIO */}
        {tabActiva === 'podio' && (
          <div className="vista-podio">
            <div className="círculo-copa-animado">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f2c062" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
              </svg>
            </div>
            <h2>Podio Final</h2>
            <p className="subtitulo-podio">
              ¿Están listos para conocer las fotos más votadas de la noche?
            </p>
            <button className="btn-revelar-podio">Revelar Ganadores</button>
          </div>
        )}

        {/* PESTAÑA: ADMIN */}
        {tabActiva === 'admin' && (
          <div className="vista-admin">
            <div className="caja-qr-admin">
              <h3>Código QR del evento</h3>
              <div className="grafico-qr-placeholder">
                <div className="qr-patron"></div>
              </div>
              <h2 className="codigo-evento-texto">{nombreEvento || 'EVENTO'}</h2>
              <div className="grupo-botones-qr">
                <button className="btn-secundario-admin">Descargar</button>
                <button className="btn-principal-admin">Compartir link</button>
              </div>
            </div>

            <div className="seccion-acciones-admin">
              <h4>Acciones</h4>
              <div className="lista-acciones">
                <button className="item-accion">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Descargar todas las fotos</span>
                  <span className="flecha-accion">›</span>
                </button>
                <button className="item-accion">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>Moderar imágenes</span>
                  <span className="flecha-accion">›</span>
                </button>
                <button className="item-accion">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f2c062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  <span>Ver estadísticas detalladas</span>
                  <span className="flecha-accion">›</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. TABBAR INFERIOR */}
      <nav className="barra-navegacion-inferior">
        <button 
          className={`item-tab ${tabActiva === 'galeria' ? 'activo' : ''}`}
          onClick={() => setTabActiva('galeria')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          <span className="texto-tab">Galería</span>
        </button>

        <button 
          className={`item-tab ${tabActiva === 'desafios' ? 'activo' : ''}`}
          onClick={() => setTabActiva('desafios')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span className="texto-tab">Desafíos</span>
        </button>

        <button 
          className={`item-tab ${tabActiva === 'podio' ? 'activo' : ''}`}
          onClick={() => setTabActiva('podio')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
          </svg>
          <span className="texto-tab">Podio</span>
        </button>

        <button 
          className={`item-tab ${tabActiva === 'admin' ? 'activo' : ''}`}
          onClick={() => setTabActiva('admin')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span className="texto-tab">Admin</span>
        </button>
      </nav>
    </div>
  );
}