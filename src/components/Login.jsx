import React, { useState } from 'react';
import { mockAPI } from '../mockData';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await mockAPI.login(email, password);
      localStorage.setItem('token', response.token);
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>Se connecter</h1>
          <p>Bienvenue sur VocalTrack</p>
        </div>
        {error && <div className="alert alert-error">❌ {error}</div>}
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
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Se connecter</button>
        </form>
        <p className="auth-footer">
          Pas encore inscrit? <a href="/register">Créer un compte</a>
        </p>
      </div>
    </div>
  );
};

export default Login;