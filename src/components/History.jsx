import React, { useEffect, useState } from 'react';
import { mockAPI } from '../mockData';

const History = () => {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await mockAPI.getHistory();
        setHistory(data);
      } catch (error) {
        alert('Erreur lors du chargement de l\'historique');
      }
    };
    fetchHistory();
  }, []);

  const filteredHistory = history.filter(h => 
    h.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2 className="card-title">📋 Historique des transcriptions</h2>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Toutes les transcriptions</h3>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Rechercher..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{maxWidth: '300px'}}
          />
        </div>

        {filteredHistory.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Langue</th>
                <th>Date</th>
                <th>État</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map(h => (
                <tr key={h.id}>
                  <td><strong>{h.title}</strong></td>
                  <td>Français</td>
                  <td>{h.date}</td>
                  <td><span style={{background: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px'}}>Terminée</span></td>
                  <td>
                    <a href={`/transcription/${h.id}`} className="btn btn-primary" style={{padding: '6px 12px'}}>
                      Voir
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucune transcription trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default History;