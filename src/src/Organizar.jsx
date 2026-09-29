import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Organizar.css';

export default function Organizar() {
  // Estado para la sala activa (null si aún no creó el evento)
  const [eventoActivo, setEventoActivo] = useState(null);
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);

  // Formulario nuevo evento
  const [nombreEvento, setNombreEvento] = useState('');
  const [tipoEvento, setTipoEvento] = useState('Fiesta');

  // Navegación interna (Pestañas)
  const [tab, setTab] = useState('galeria'); // 'galeria' | 'desafios' | 'podio' | 'ajustes'
  const [busqueda, setBusqueda] = useState('');

  // Fotos de la galería
  const [fotos, setFotos] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500', estrellas: 14, hora: '22:10', usuario: 'Santi' },
    { id: 2, url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500', estrellas: 9, hora: '22:45', usuario: 'Cande' },
    { id: 3, url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500', estrellas: 18, hora: '23:15', usuario: 'Walter' },
  ]);

  // Lista de desafíos del evento
  const [desafios, setDesafios] = useState([
    { id: 1, titulo: 'Foto más divertida 🤪', descripcion: 'Capturá el momento más insólito de la fiesta' },
    { id: 2, titulo: 'Selfie grupal 📸', descripcion: 'Mínimo 4 personas sonriendo en la foto' }
  ]);
  const [nuevoTituloDesafio, setNuevoTituloDesafio] = useState('');
  const [nuevaDescDesafio, setNuevaDescDesafio] = useState('');

  const inputOcultoRef = useRef(null);

  // Funciones de Creación de Evento
  const crearEventoSubmit = (e) => {
    e.preventDefault();
    if (!nombreEvento.trim()) return;
    const codigoGenerado = nombreEvento.toUpperCase().replace(/\s+/g, '-') + '-2026';
    setEventoActivo({
      nombre: nombreEvento,
      tipo: tipoEvento,
      codigo: codigoGenerado,
      invitadosCount: 24,
      horaInicio: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    setMostrarModalNuevo(false);
  };

  // Funciones de Moderación y Gestión de Fotos
  const eliminarFoto = (id) => {
    if (window.confirm('¿Estás seguro de que querés eliminar esta foto de la galería del evento?')) {
      setFotos((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const subirFotoOrganizador = (e) => {
    const archivos = Array.from(e.target.files);
    if (archivos.length > 0) {
      const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const fotosNuevas = archivos.map((file, i) => ({
        id: Date.now() + i,
        url: URL.createObjectURL(file),
        estrellas: 0,
        hora: horaActual,
        usuario: 'Organizador'
      }));
      setFotos((prev) => [...fotosNuevas, ...prev]);
    }
  };

  const descargarTodasLasFotos = () => {
    if (fotos.length === 0) {
      alert('Aún no hay fotos en este evento.');
      return;
    }
    fotos.forEach((foto, index) => {
      const link = document.createElement('a');
      link.href = foto.url;
      link.download = `${eventoActivo?.codigo || 'estrellometro'}-foto-${index + 1}.jpg`;
      link.click();
    });
  };

  const copiarLinkAcceso = () => {
    const url = `${window.location.origin}/evento/${eventoActivo?.codigo || 'FIESTA'}`;
    navigator.clipboard.writeText(url);
    alert('¡Enlace del evento copiado al portapapeles!');
  };

  // Agregar nuevo desafío
  const agregarDesafio = (e) => {
    e.preventDefault();
    if (!nuevoTituloDesafio.trim()) return;
    setDesafios((prev) => [
      ...prev,
      { id: Date.now(), titulo: nuevoTituloDesafio, descripcion: nuevaDescDesafio }
    ]);
    setNuevoTituloDesafio('');
    setNuevaDescDesafio('');
  };

  // Filtros y Cálculos
  const fotosFiltradas = fotos.filter((f) =>
    f.usuario.toLowerCase().includes(busqueda.toLowerCase()) || f.hora.includes(busqueda)
  );
  const fotoGanadora = fotos.reduce((max, f) => (f.estrellas > (max?.estrellas || -1) ? f : max), null);
  const totalEstrellas = fotos.reduce((sum, f) => sum + f.estrellas, 0);

  return (
    <div className="contenedor-organizar">
      <input
        type="file"
        ref={inputOcultoRef}
        onChange={subirFotoOrganizador}
        accept="image/*"
        multiple
        style={{ display: 'none' }}
      />

      {/* ENCABEZADO GLOBAL */}
      <header className="header-organizar">
        <Link to="/" className="btn-volver-home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="titulo-header">
          <h2>Panel de Control</h2>
          <p>{eventoActivo ? `Evento: ${eventoActivo.nombre}` : 'Modo Organizador'}</p>
        </div>
        {eventoActivo && (
          <button className="btn-nuevo-mini" onClick={() => setMostrarModalNuevo(true)}>
            + Nuevo
          </button>
        )}
      </header>

      {/* SI NO HAY EVENTO CREADO AÚN */}
      {!eventoActivo ? (
        <main className="bienvenida-organizador animar-entrada">
          <div className="card-bienvenida">
            <div className="icono-bienvenida">👑</div>
            <h3>Comenzá a organizar tu evento</h3>
            <p>Creá una sala en tiempo real para que tus invitados suban fotos, voten con estrellas y participen en desafíos.</p>
            <button className="btn-crear-primero" onClick={() => setMostrarModalNuevo(true)}>
              Crear Nuevo Evento
            </button>
          </div>
        </main>
      ) : (
        /* PANEL DEL EVENTO ACTIVO */
        <main className="panel-principal-organizar animar-entrada">
          {/* Tarjeta de métricas rápidas */}
          <section className="grid-metricas">
            <div className="card-metrica">
              <span className="metrica-valor">{fotos.length}</span>
              <span className="metrica-label">Fotos subidas</span>
            </div>
            <div className="card-metrica">
              <span className="metrica-valor">★ {totalEstrellas}</span>
              <span className="metrica-label">Estrellas dadas</span>
            </div>
            <div className="card-metrica">
              <span className="metrica-valor">{eventoActivo.invitadosCount}</span>
              <span className="metrica-label">Invitados unid.</span>
            </div>
          </section>

          {/* Acciones Rápidas del Administrador */}
          <section className="barra-acciones-admin">
            <button className="btn-accion-admin" onClick={copiarLinkAcceso}>
              🔗 Copiar Link / QR
            </button>
            <button className="btn-accion-admin" onClick={() => inputOcultoRef.current?.click()}>
              ➕ Subir Foto
            </button>
            <button className="btn-accion-admin secundario" onClick={descargarTodasLasFotos}>
              ⬇️ Descargar Todo
            </button>
          </section>

          {/* Navegación por pestañas */}
          <nav className="tabs-organizar">
            <button className={`tab-btn ${tab === 'galeria' ? 'activo' : ''}`} onClick={() => setTab('galeria')}>
              Galería ({fotos.length})
            </button>
            <button className={`tab-btn ${tab === 'desafios' ? 'activo' : ''}`} onClick={() => setTab('desafios')}>
              Desafíos
            </button>
            <button className={`tab-btn ${tab === 'podio' ? 'activo' : ''}`} onClick={() => setTab('podio')}>
              Podio
            </button>
          </nav>

          {/* VISTA 1: GALERÍA Y MODERACIÓN */}
          {tab === 'galeria' && (
            <div className="tab-contenido">
              <div className="caja-buscador">
                <input
                  type="text"
                  placeholder="Buscar por usuario o hora..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>

              {fotosFiltradas.length === 0 ? (
                <div className="vacio-mensaje">
                  <p>No hay fotos cargadas que coincidan con la búsqueda.</p>
                </div>
              ) : (
                <div className="grid-galeria-admin">
                  {fotosFiltradas.map((foto) => (
                    <div
                      key={foto.id}
                      className="item-foto-admin"
                      style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85), transparent 60%), url(${foto.url})` }}
                    >
                      <button className="btn-borrar-foto" title="Eliminar foto" onClick={() => eliminarFoto(foto.id)}>
                        ✕
                      </button>
                      <div className="info-foto-overlay">
                        <span className="usuario-foto">{foto.usuario}</span>
                        <span className="votos-foto">★ {foto.estrellas}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VISTA 2: DESAFÍOS */}
          {tab === 'desafios' && (
            <div className="tab-contenido">
              <form className="form-nuevo-desafio" onSubmit={agregarDesafio}>
                <h4>Crear Nuevo Desafío</h4>
                <input
                  type="text"
                  placeholder="Título (ej: Mejor baile de la noche)"
                  value={nuevoTituloDesafio}
                  onChange={(e) => setNuevoTituloDesafio(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Descripción rápida..."
                  value={nuevaDescDesafio}
                  onChange={(e) => setNuevaDescDesafio(e.target.value)}
                />
                <button type="submit" className="btn-agregar-desafio">
                  Publicar Desafío
                </button>
              </form>

              <div className="lista-desafios-admin">
                {desafios.map((d) => (
                  <div key={d.id} className="card-desafio-admin">
                    <h5>{d.titulo}</h5>
                    <p>{d.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VISTA 3: PODIO Y LÍDERES */}
          {tab === 'podio' && (
            <div className="tab-contenido">
              {fotoGanadora ? (
                <div className="card-destacada-podio">
                  <div className="badge-podio">👑 Foto N° 1 del Evento</div>
                  <img src={fotoGanadora.url} alt="Foto ganadora" className="img-podio" />
                  <div className="detalles-podio">
                    <p>Subida por: <strong>{fotoGanadora.usuario}</strong></p>
                    <span className="puntos-estrella">★ {fotoGanadora.estrellas} Estrellas acumuladas</span>
                  </div>
                </div>
              ) : (
                <p className="vacio-mensaje">Aún no hay votos para calcular el podio.</p>
              )}
            </div>
          )}
        </main>
      )}

      {/* MODAL PARA CREAR UN NUEVO EVENTO */}
      {mostrarModalNuevo && (
        <div className="overlay-modal" onClick={() => setMostrarModalNuevo(false)}>
          <div className="card-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Crear Nuevo Evento</h3>
            <form onSubmit={crearEventoSubmit}>
              <div className="campo-form">
                <label>Nombre del Evento</label>
                <input
                  type="text"
                  placeholder="ej: Cumple de Santi"
                  value={nombreEvento}
                  onChange={(e) => setNombreEvento(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="campo-form">
                <label>Tipo de Evento</label>
                <select value={tipoEvento} onChange={(e) => setTipoEvento(e.target.value)}>
                  <option value="Fiesta">Fiesta / Boliche</option>
                  <option value="Cumpleaños">Cumpleaños</option>
                  <option value="Casamiento">Casamiento / Boda</option>
                  <option value="Egresados">Egresados</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="botones-modal">
                <button type="button" className="btn-cancelar-modal" onClick={() => setMostrarModalNuevo(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-confirmar-modal">
                  Comenzar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}