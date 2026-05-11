import React, { useState } from 'react';
import { mockAPI } from '../mockData';
import './Auth.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      await mockAPI.register(email, password);
      setSuccess('Inscription réussie! Redirection...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>Créer un compte</h1>
          <p>Rejoignez VocalTrack</p>
        </div>
        {error && <div className="alert alert-error">❌ {error}</div>}
        {success && <div className="alert alert-success">✅ {success}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Adresse email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="example@mail.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirmer le mot de passe</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>S'inscrire</button>
        </form>
        <p className="auth-footer">
          Déjà inscrit? <a href="/login">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default Register;