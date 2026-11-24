const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Gestion de la fenêtre
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  maximizeWindow: () => ipcRenderer.send('window-maximize'),
  closeWindow: () => ipcRenderer.send('window-close'),

  // Authentification Microsoft
  loginMicrosoft: () => ipcRenderer.invoke('auth-microsoft-login'),
  logout: () => ipcRenderer.invoke('auth-logout'),
  getUserProfile: () => ipcRenderer.invoke('auth-get-user'),

  // Paramètres & Config
  getSettings: () => ipcRenderer.invoke('settings-get'),
  saveSettings: (settings) => ipcRenderer.invoke('settings-save', settings),
  openGameDir: () => ipcRenderer.send('open-game-dir'),

  // Statut du serveur
  checkServerStatus: (host, port) => ipcRenderer.invoke('server-ping', { host, port }),

  // Synchronisation et Lancement
  launchGame: (options) => ipcRenderer.invoke('game-launch', options),
  
  // Événements reçus du process principal
  onSyncProgress: (callback) => {
    ipcRenderer.on('sync-progress', (_event, data) => callback(data));
  },
  onGameStatus: (callback) => {
    ipcRenderer.on('game-status', (_event, status) => callback(status));
  }
});
