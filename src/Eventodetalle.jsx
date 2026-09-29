// EventoDetalle.jsx
import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Eventodetalle.css';

export default function EventoDetalle() {
  const { codigo } = useParams();
  const [tabActiva, setTabActiva] = useState('galeria');
  const [filtroFotos, setFiltroFotos] = useState('todas'); // 'todas' | 'mias'
  
  // Lista inicial de fotos simulada con opción de agregar reales
  const [fotos, setFotos] = useState([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500',
      estrellas: 12,
      hora: '21:30',
      esMia: false,
      votadaPorMi: false
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500',
      estrellas: 8,
      hora: '22:15',
      esMia: false,
      votadaPorMi: false
    }
  ]);

  const [desafios, setDesafios] = useState([
    { id: 1, titulo: 'La foto más divertida', descripcion: 'Capturá el momento más gracioso de la fiesta', participantes: 5 },
    { id: 2, titulo: 'Mejor selfie en grupo', descripcion: 'Mínimo 4 personas en la foto', participantes: 8 }
  ]);

  const inputFotoRef = useRef(null);

  const abrirExploradorArchivos = () => {
    inputFotoRef.current?.click();
  };

  const manejarSeleccionFoto = (e) => {
    const archivos = Array.from(e.target.files);
    if (archivos.length > 0) {
      const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const nuevasFotos = archivos.map((archivo, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(archivo),
        estrellas: 0,
        hora: horaActual,
        esMia: true,
        votadaPorMi: false
      }));
      setFotos((prev) => [...nuevasFotos, ...prev]);
    }
  };

  const alternarVotoEstrella = (id) => {
    setFotos((prev) =>
      prev.map((foto) => {
        if (foto.id === id) {
          const yaVotada = foto.votadaPorMi;
          return {
            ...foto,
            estrellas: yaVotada ? foto.estrellas - 1 : foto.estrellas + 1,
            votadaPorMi: !yaVotada
          };
        }
        return foto;
      })
    );
  };

  const fotoMasVotada = fotos.reduce((max, f) => (f.estrellas > (max?.estrellas || -1) ? f : max), null);
  const fotosFiltradas = filtroFotos === 'mias' ? fotos.filter((f) => f.esMia) : fotos;

  return (
    <div className="contenedor-evento-detalle">
      <input
        type="file"
        ref={inputFotoRef}
        onChange={manejarSeleccionFoto}
        accept=".jpg, .jpeg, .png, image/jpeg, image/png"
        multiple
        style={{ display: 'none' }}
      />

      {/* Encabezado Principal */}
      <header className="encabezado-invitado">
        <Link to="/unirse" className="btn-volver-invitado">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="info-evento-invitado">
          <h2>✨ {codigo || 'EVENTO'}</h2>
          <p>Modo Invitado · {fotos.length} fotos subidas</p>
        </div>
      </header>

      {/* Botón Flotante / Destacado para Subir Foto */}
      <section className="seccion-subir-accion">
        <button className="btn-subir-foto-invitado" onClick={abrirExploradorArchivos}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <span>Subir Foto al Evento</span>
        </button>
      </section>

      {/* Contenido Principal */}
      <main className="contenido-invitado animar-entrada">
        {/* GALERÍA DE FOTOS */}
        {tabActiva === 'galeria' && (
          <div className="vista-galeria-invitado">
            {/* Filtros */}
            <div className="filtros-galeria">
              <button
                className={`btn-filtro ${filtroFotos === 'todas' ? 'activo' : ''}`}
                onClick={() => setFiltroFotos('todas')}
              >
                Todas ({fotos.length})
              </button>
              <button
                className={`btn-filtro ${filtroFotos === 'mias' ? 'activo' : ''}`}
                onClick={() => setFiltroFotos('mias')}
              >
                Mis Fotos ({fotos.filter((f) => f.esMia).length})
              </button>
            </div>

            {fotosFiltradas.length === 0 ? (
              <div className="mensaje-vacio">
                <p>No se encontraron fotos en esta sección.</p>
              </div>
            ) : (
              <div className="grid-fotos-invitado">
                {fotosFiltradas.map((foto) => (
                  <div
                    key={foto.id}
                    className="card-foto-invitado"
                    style={{ backgroundImage: `linear-gradient(to top, rgba(8,10,20,0.85), transparent 60%), url(${foto.url})` }}
                  >
                    <span className="hora-foto-invitado">{foto.hora}</span>
                    <button
                      className={`btn-votar-estrella ${foto.votadaPorMi ? 'votado' : ''}`}
                      onClick={() => alternarVotoEstrella(foto.id)}
                    >
                      ★ {foto.estrellas}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* DESAFÍOS */}
        {tabActiva === 'desafios' && (
          <div className="vista-desafios-invitado">
            <h3>Desafíos de la noche 🏆</h3>
            <p className="subtitulo-desafios">Completá los desafíos subiendo fotos divertidas</p>

            <div className="lista-desafios">
              {desafios.map((d) => (
                <div key={d.id} className="card-desafio-invitado">
                  <h4>{d.titulo}</h4>
                  <p>{d.descripcion}</p>
                  <div className="footer-desafio-invitado">
                    <span>{d.participantes} participantes</span>
                    <button className="btn-participar-desafio" onClick={abrirExploradorArchivos}>
                      Subir foto
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PODIO */}
        {tabActiva === 'podio' && (
          <div className="vista-podio-invitado">
            <h3>Foto Lider en Estrellas 🌟</h3>
            {fotoMasVotada ? (
              <div
                className="card-foto-ganadora"
                style={{ backgroundImage: `linear-gradient(to top, rgba(8,10,20,0.9), transparent 50%), url(${fotoMasVotada.url})` }}
              >
                <div className="badge-ganador">👑 Más Votada</div>
                <div className="info-ganadora">
                  <span>★ {fotoMasVotada.estrellas} Estrellas acumuladas</span>
                </div>
              </div>
            ) : (
              <p>Aún no hay votos registrados.</p>
            )}
          </div>
        )}
      </main>

      {/* Navegación Inferior Móvil/PC */}
      <nav className="tabbar-invitado">
        <button className={`tab-item ${tabActiva === 'galeria' ? 'activo' : ''}`} onClick={() => setTabActiva('galeria')}>
          Galería
        </button>
        <button className={`tab-item ${tabActiva === 'desafios' ? 'activo' : ''}`} onClick={() => setTabActiva('desafios')}>
          Desafíos
        </button>
        <button className={`tab-item ${tabActiva === 'podio' ? 'activo' : ''}`} onClick={() => setTabActiva('podio')}>
          Podio
        </button>
      </nav>
    </div>
  );
}