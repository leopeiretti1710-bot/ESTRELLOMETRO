import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

export default function Principal() {
  return (
    <div className="container">
      {/* Círculo Central con Animaciones */}
      <div className="hero-icon-wrapper">
        <div className="circle-glow">
          <span className="main-star">⭐</span>
          <span className="badge-sparkle">✨</span>
          <span className="planet-dot planet-purple"></span>
          <span className="planet-dot planet-yellow"></span>
        </div>
      </div>

      {/* Título Principal */}
      <h1 className="title">Estrellómetro</h1>

      {/* Estrellitas pequeñas */}
      <div className="star-rating">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>

      {/* Texto Descriptivo */}
      <p className="description">
        Las mejores noches merecen <br />
        <span className="highlight">recordarse entre estrellas.</span>
      </p>

      {/* Botones estilo pill / rounded */}
      <div className="button-group">
        <Link to="/unirse" className="btn btn-primary">
          ✨ Entrar a un evento
        </Link>
        <Link to="/organizar" className="btn btn-secondary">
          Soy organizador →
        </Link>
      </div>
    </div>
  );
}