import React, { useEffect, useState } from 'react';
import { mockAPI } from '../mockData';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await mockAPI.getUsers();
        const statsData = await mockAPI.getStats();
        setUsers(usersData);
        setStats(statsData);
      } catch (error) {
        alert('Erreur lors du chargement des données admin');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="card-title">⚙️ Administration</h2>

      <div className="stats-grid">
        <div className="stat-card orange">
          <div className="stat-label">Utilisateurs total</div>
          <div className="stat-value">{users.length}</div>
        </div>
        <div className="stat-card green">
          <div className="stat-label">Transcriptions traitées</div>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Utilisateurs actifs</div>
          <div className="stat-value">{stats.activeUsers}</div>
        </div>
      </div>

      <div className="card">
        <h3>Gestion des utilisateurs</h3>
        {users.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.email}</td>
                  <td><span style={{background: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px'}}>Actif</span></td>
                  <td>
                    <button className="btn btn-secondary" style={{padding: '6px 12px'}}>✏️ Éditer</button>
                    <button className="btn btn-danger" style={{padding: '6px 12px', marginLeft: '5px'}}>🗑️ Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun utilisateur trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;