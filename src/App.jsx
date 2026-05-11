import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UploadAudio from './components/UploadAudio';
import Transcription from './components/Transcription';
import History from './components/History';
import Admin from './components/Admin';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <AppContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </Router>
  );
}

function AppContent({ sidebarOpen, setSidebarOpen }) {
  const isLoggedIn = !!localStorage.getItem('token');
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/'].includes(location.pathname);

  if (!isLoggedIn && isAuthPage) {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <div className="App"><LandingPage /></div>;
  }

  return (
    <div className="App app-layout">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="main-content">
        <TopBar setSidebarOpen={setSidebarOpen} />
        <div className="container">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadAudio />} />
            <Route path="/transcription/:id" element={<Transcription />} />
            <Route path="/history" element={<History />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: '📊', label: 'Tableau de bord', path: '/dashboard' },
    { icon: '📤', label: 'Nouveau traitement', path: '/upload' },
    { icon: '📝', label: 'Transcriptions', path: '/history' },
    { icon: '📋', label: 'Historique', path: '/history' },
    { icon: '⚙️', label: 'Paramètres', path: '#' },
    { icon: '👤', label: 'Admin', path: '/admin' }
  ];

  const handleNavigation = (path) => {
    if (path !== '#') {
      navigate(path);
      setSidebarOpen(false);
    }
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <span>🎤</span> VocalTrack
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li 
            key={index}
            className={`sidebar-menu-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path)}
            style={{ cursor: item.path !== '#' ? 'pointer' : 'default' }}
          >
            <span>{item.icon}</span> {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TopBar({ setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="top-bar">
      <h2 style={{ margin: 0 }}>Bienvenue, Jean Dupont 👋</h2>
      <div className="user-info">
        <div className="user-avatar">JD</div>
        <button className="btn btn-logout" onClick={handleLogout}>
          🚪 Déconnexion
        </button>
      </div>
    </div>
  );
}

export default App;