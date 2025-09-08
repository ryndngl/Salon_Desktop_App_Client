// PRELOAD.JS - Updated with connection test
import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Login function
  login: async (credentials) => {
    try {
      console.log('📤 Sending login request:', credentials);
      const result = await ipcRenderer.invoke('login', credentials);
      console.log('📥 Login response received:', result);
      
      // If login successful, navigate to dashboard
      if (result.success) {
        console.log('🚀 Navigating to dashboard...');
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
      console.log('🔍 Testing server connection...');
      const result = await ipcRenderer.invoke('test-connection');
      console.log('📊 Connection test result:', result);
      return result;
    } catch (error) {
      console.error('❌ Connection test error:', error);
      return { 
        success: false, 
        message: 'Failed to test server connection' 
      };
    }
  },

  // Navigation functions
  navigateToDashboard: () => {
    console.log('🏠 Navigating to dashboard...');
    return ipcRenderer.invoke('navigate-to-dashboard');
  },

  // System info
  getVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
});

// Log when preload is loaded
console.log('🔧 Preload script loaded - electronAPI exposed to renderer');
console.log('🔌 Available methods:', Object.keys(window.electronAPI || {}));