import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <nav className="landing-nav">
        <div className="logo">
          <span className="logo-icon">🎤</span>
          <span className="logo-text">VocalTrack</span>
        </div>
        <div className="nav-links">
          <a href="#features">Fonctionnalités</a>
          <a href="#how-it-works">Comment ça marche</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-buttons">
          {isLoggedIn ? (
            <>
              <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Tableau de bord</button>
              <button className="btn btn-logout" onClick={() => { localStorage.removeItem('token'); window.location.href = '/'; }}>Déconnexion</button>
            </>
          ) : (
            <>
              <button className="btn btn-secondary" onClick={() => navigate('/login')}>Se connecter</button>
              <button className="btn btn-primary" onClick={() => navigate('/register')}>S'inscrire</button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Transformez la parole en texte</h1>
          <p>Plateforme de reconnaissance vocale performante et intuitive</p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-large" onClick={() => navigate('/register')}>Démarrer gratuitement</button>
            <button className="btn btn-outline btn-large">Voir la démo</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="wave-visualization">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Fonctionnalités principales</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎙️</div>
            <h3>Transcription rapide</h3>
            <p>Transcrivez vos audios en quelques secondes avec une précision exceptionnelle</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Détection de langue</h3>
            <p>Reconnait automatiquement plus de 50 langues</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Sécurisé et privé</h3>
            <p>Vos données sont chiffrées et protégées</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analyse avancée</h3>
            <p>Obtenez des statistiques détaillées sur vos transcriptions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📥</div>
            <h3>Export flexible</h3>
            <p>Exportez en PDF, DOCX, TXT et bien d'autres formats</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Performance</h3>
            <p>Infrastructure optimisée pour une vitesse maximale</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="how-it-works">
        <h2>Comment ça marche</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Téléversez un audio</h3>
            <p>Importez votre fichier audio ou enregistrez directement</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Laissez-nous traiter</h3>
            <p>Notre système génère la transcription automatiquement</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Corrigez et exportez</h3>
            <p>Affinez le texte et exportez au format de votre choix</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 VocalTrack. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default LandingPage;