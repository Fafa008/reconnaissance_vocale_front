import React, { useState } from 'react';
import { mockAPI } from '../mockData';

const UploadAudio = () => {
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleFileUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const result = await mockAPI.uploadAudio(file);
      setSuccess('Audio téléversé et transcrit avec succès!');
      setFile(null);
      setTimeout(() => {
        window.location.href = `/transcription/${result.id}`;
      }, 1500);
    } catch (error) {
      alert('Erreur lors du téléversement');
    }
    setLoading(false);
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();
      setRecording(true);
    }).catch(err => alert('Accès au microphone refusé'));
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      mediaRecorder.ondataavailable = (e) => {
        setFile(new Blob([e.data], { type: 'audio/wav' }));
      };
    }
  };

  return (
    <div>
      <h2 className="card-title">📤 Nouveau traitement</h2>
      {success && <div className="alert alert-success">✅ {success}</div>}
      
      <div className="card">
        <h3>Téléverser un fichier audio</h3>
        <div className="upload-area">
          <div className="upload-icon">📁</div>
          <p>Glissez-déposez votre fichier ici ou cliquez pour sélectionner</p>
          <input 
            type="file" 
            accept="audio/*" 
            onChange={(e) => setFile(e.target.files[0])} 
            style={{display: 'none'}}
            id="fileInput"
          />
          <label htmlFor="fileInput" className="btn btn-primary">Sélectionner un fichier</label>
        </div>
        {file && (
          <div style={{marginTop: '20px'}}>
            <p><strong>Fichier sélectionné:</strong> {file.name}</p>
            <button className="btn btn-success" onClick={handleFileUpload} disabled={loading}>
              {loading ? '⏳ Traitement en cours...' : '✓ Téléverser et transcrire'}
            </button>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Enregistrer en direct</h3>
        <p>Enregistrez votre voix directement depuis votre microphone</p>
        <div style={{textAlign: 'center', margin: '20px 0'}}>
          {!recording ? (
            <button className="btn btn-primary btn-large" onClick={startRecording}>
              🎤 Commencer l'enregistrement
            </button>
          ) : (
            <>
              <p style={{color: '#dc3545', fontWeight: 'bold'}}>⏴ Enregistrement en cours...</p>
              <button className="btn btn-danger btn-large" onClick={stopRecording}>
                ⏹ Arrêter l'enregistrement
              </button>
            </>
          )}
        </div>
        {file && !recording && (
          <button className="btn btn-success" onClick={handleFileUpload} disabled={loading}>
            {loading ? '⏳ Traitement en cours...' : '✓ Transcrire l\'enregistrement'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadAudio;