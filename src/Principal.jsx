import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

export default function Principal({ nombreEvento }) {
  return (
    <div className="container">
      <div className="hero-icon-wrapper">
        <div className="circle-glow">
          <span className="main-star">⭐</span>
          <span className="badge-sparkle">✨</span>
          <span className="planet-dot planet-purple"></span>
          <span className="planet-dot planet-yellow"></span>
        </div>
      </div>

      <h1 className="title">Estrellómetro</h1>

      <div className="star-rating">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>

      <p className="description">
        Evento activo: <strong style={{ color: '#f2c062' }}>{nombreEvento}</strong><br />
        Las mejores noches merecen <br />
        <span className="highlight">recordarse entre estrellas.</span>
      </p>

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