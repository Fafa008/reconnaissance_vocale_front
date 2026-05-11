import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockAPI } from '../mockData';

const Transcription = () => {
  const { id } = useParams();
  const [transcription, setTranscription] = useState({ text: '', confidence: 0, title: '', language: 'Français' });
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTranscription = async () => {
      try {
        const data = await mockAPI.getTranscription(id);
        setTranscription(data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchTranscription();
  }, [id]);

  const handleEdit = async () => {
    try {
      await mockAPI.updateTranscription(id, transcription.text);
      setSuccess('✅ Transcription mise à jour avec succès');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleExport = (format = 'txt') => {
    const content = transcription.text;
    const element = document.createElement('a');
    let filename = 'transcription.' + format;
    
    if (format === 'txt') {
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    } else if (format === 'docx') {
      element.setAttribute('href', 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8,' + encodeURIComponent(content));
    }
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      <h2 className="card-title">📝 Résultat de la transcription</h2>
      {success && <div className="alert alert-success">{success}</div>}
      
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">{transcription.title}</h3>
            <p style={{color: '#999', fontSize: '12px', margin: '5px 0 0 0'}}>{transcription.language}</p>
          </div>
          <span className="btn" style={{background: '#e8f4f8', color: '#007bff'}}>
            Score de confiance: {transcription.confidence}%
          </span>
        </div>

        <div style={{marginBottom: '20px'}}>
          <label className="form-label">Texte transcrit</label>
          {isEditing ? (
            <textarea 
              className="form-control" 
              value={transcription.text} 
              onChange={(e) => setTranscription({...transcription, text: e.target.value})}
            />
          ) : (
            <div style={{background: '#f8f9fa', padding: '15px', borderRadius: '8px', minHeight: '200px', lineHeight: '1.6'}}>
              {transcription.text}
            </div>
          )}
        </div>

        <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
          {!isEditing ? (
            <>
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                ✏️ Corriger
              </button>
              <button className="btn btn-secondary" onClick={() => handleExport('txt')}>
                💾 Exporter TXT
              </button>
              <button className="btn btn-secondary" onClick={() => handleExport('docx')}>
                📄 Exporter DOCX
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-success" onClick={handleEdit}>
                ✅ Enregistrer
              </button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                ❌ Annuler
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transcription;