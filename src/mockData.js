// Mock data with localStorage persistence
const getStoredUsers = () => {
  const stored = localStorage.getItem('mockUsers');
  return stored ? JSON.parse(stored) : [
    { id: 1, email: 'admin@example.com', password: 'admin' },
    { id: 2, email: 'user@example.com', password: 'user' }
  ];
};

const saveUsers = (users) => {
  localStorage.setItem('mockUsers', JSON.stringify(users));
};

const getStoredTranscriptions = () => {
  const stored = localStorage.getItem('mockTranscriptions');
  return stored ? JSON.parse(stored) : [
    { id: 1, title: 'Transcription 1', text: 'Ceci est un exemple de transcription.', confidence: 95, date: '2023-10-01' },
    { id: 2, title: 'Transcription 2', text: 'Une autre transcription exemple.', confidence: 87, date: '2023-10-02' }
  ];
};

const saveTranscriptions = (transcriptions) => {
  localStorage.setItem('mockTranscriptions', JSON.stringify(transcriptions));
};

const getStoredHistory = () => {
  const stored = localStorage.getItem('mockHistory');
  return stored ? JSON.parse(stored) : [
    { id: 1, title: 'Transcription 1', date: '2023-10-01' },
    { id: 2, title: 'Transcription 2', date: '2023-10-02' }
  ];
};

const saveHistory = (history) => {
  localStorage.setItem('mockHistory', JSON.stringify(history));
};

export const mockStats = {
  total: 150,
  activeUsers: 25
};

// Simulate API calls
export const mockAPI = {
  register: async (email, password) => {
    const users = getStoredUsers();
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Utilisateur déjà existant');
    }
    // Add new user
    const newUser = { id: users.length + 1, email, password };
    users.push(newUser);
    saveUsers(users);
    return { message: 'Inscription réussie' };
  },

  login: async (email, password) => {
    const users = getStoredUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Identifiants incorrects');
    }
    return { token: 'mock-jwt-token-' + user.id };
  },

  getTranscriptions: async () => {
    return getStoredTranscriptions();
  },

  getTranscription: async (id) => {
    const transcriptions = getStoredTranscriptions();
    const transcription = transcriptions.find(t => t.id === parseInt(id));
    if (!transcription) {
      throw new Error('Transcription non trouvée');
    }
    return transcription;
  },

  updateTranscription: async (id, text) => {
    const transcriptions = getStoredTranscriptions();
    const transcription = transcriptions.find(t => t.id === parseInt(id));
    if (!transcription) {
      throw new Error('Transcription non trouvée');
    }
    transcription.text = text;
    saveTranscriptions(transcriptions);
    return { message: 'Transcription mise à jour' };
  },

  uploadAudio: async (file) => {
    const transcriptions = getStoredTranscriptions();
    const history = getStoredHistory();
    // Simulate upload
    const newTranscription = {
      id: transcriptions.length + 1,
      title: `Transcription ${transcriptions.length + 1}`,
      text: 'Transcription générée automatiquement.',
      confidence: Math.floor(Math.random() * 20) + 80,
      date: new Date().toISOString().split('T')[0]
    };
    transcriptions.push(newTranscription);
    history.push({ id: newTranscription.id, title: newTranscription.title, date: newTranscription.date });
    saveTranscriptions(transcriptions);
    saveHistory(history);
    return { id: newTranscription.id };
  },

  getHistory: async () => {
    return getStoredHistory();
  },

  getUsers: async () => {
    return getStoredUsers();
  },

  getStats: async () => {
    return mockStats;
  }
};