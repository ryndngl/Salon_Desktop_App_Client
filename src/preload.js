import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Login function
  login: async (credentials) => {
    try {
      const result = await ipcRenderer.invoke('login', credentials);
      
      // If login successful, navigate to dashboard
      if (result.success) {
        await ipcRenderer.invoke('navigate-to-dashboard');
      }
      
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Connection error' };
    }
  },

  // Navigation functions
  navigateToDashboard: () => ipcRenderer.invoke('navigate-to-dashboard'),

  // System info (optional)
  getVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // Window controls (optional)
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
});