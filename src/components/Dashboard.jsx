import React, { useEffect, useState } from 'react';
import { mockAPI } from '../mockData';

const Dashboard = () => {
  const [transcriptions, setTranscriptions] = useState([]);
  const [stats] = useState({ total: 23, avgDuration: '12.4 h', accuracy: '98%' });

  useEffect(() => {
    const fetchTranscriptions = async () => {
      try {
        const data = await mockAPI.getTranscriptions();
        setTranscriptions(data.slice(0, 5));
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTranscriptions();
  }, []);

  return (
    <div>
      <h2 className="card-title">Tableau de bord</h2>
      
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Transcriptions totales</div>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-card green">
          <div className="stat-label">Durée moyenne</div>
          <div className="stat-value">{stats.avgDuration}</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-label">Précision moyenne</div>
          <div className="stat-value">{stats.accuracy}</div>
        </div>
      </div>

      {/* Recent Transcriptions */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Transcriptions récentes</h3>
          <a href="/upload" className="btn btn-primary">+ Nouveau</a>
        </div>
        {transcriptions.length > 0 ? (
          <ul className="list">
            {transcriptions.map(t => (
              <li key={t.id} className="list-item">
                <div>
                  <a href={`/transcription/${t.id}`}>{t.title || `Transcription ${t.id}`}</a>
                  <p style={{fontSize: '12px', color: '#999', margin: '5px 0 0 0'}}>{t.date}</p>
                </div>
                <span style={{background: '#e8f4f8', padding: '4px 8px', borderRadius: '4px'}}>{t.confidence}%</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune transcription pour le moment. <a href="/upload">Commencez maintenant</a></p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;