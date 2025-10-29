// PRELOAD.JS - Updated with connection test and focus window
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
      console.error('❌ Login IPC error:', error);
      return { 
        success: false, 
        message: 'Communication error between app and server' 
      };
    }
  },

  // Test server connection
  testConnection: async () => {
    try {
      const result = await ipcRenderer.invoke('test-connection');
      return result;
    } catch (error) {
      console.error('❌ Connection test error:', error);
      return { 
        success: false, 
        message: 'Failed to test server connection' 
      };
    }
  },

  // ADD THIS - Focus window function
  focusWindow: () => {
    return ipcRenderer.invoke('focus-window');
  },

  // Navigation functions
  navigateToDashboard: () => {
    return ipcRenderer.invoke('navigate-to-dashboard');
  },

  // System info
  getVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
});

