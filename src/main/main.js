// MAIN.JS - Fixed version with server connection
import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import started from "electron-squirrel-startup";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your server configuration
const SERVER_URL = 'http://localhost:5000'; // Your server port

if (started) app.quit();

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL(`http://localhost:5173`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'))
      .catch(err => console.error("Failed to load index.html:", err));
  }

  return mainWindow;
};

// IPC handler for login - FIXED to connect to your server
ipcMain.handle('login', async (event, credentials) => {
  console.log('🔄 Login attempt received:', credentials);
  console.log('🌐 Connecting to server:', `${SERVER_URL}/api/auth/login`);
  
  try {
    // Import fetch dynamically (for Node.js)
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch(`${SERVER_URL}/api/auth/admin/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Login successful:', result);
      return result;
    } else {
      console.log('❌ Login failed:', result);
      return result;
    }
    
  } catch (error) {
    console.error('❌ Server connection error:', error);
    
    // Check if it's a connection error
    if (error.code === 'ECONNREFUSED' || error.message.includes('fetch')) {
      return {
        success: false,
        message: 'Cannot connect to server. Make sure the server is running on port 5000.'
      };
    }
    
    return {
      success: false,
      message: `Connection error: ${error.message}`
    };
  }
});

// Test server connection handler
ipcMain.handle('test-connection', async () => {
  try {
    console.log('🔍 Testing server connection...');
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch(`${SERVER_URL}/api/health`, {
      method: 'GET',
      timeout: 5000
    });
    
    if (response.ok) {
      console.log('✅ Server is reachable');
      return { success: true, message: 'Server connected' };
    } else {
      console.log('⚠️ Server responded but with error status');
      return { success: false, message: 'Server error' };
    }
    
  } catch (error) {
    console.error('❌ Server connection test failed:', error);
    return {
      success: false,
      message: 'Server unreachable. Check if server is running on port 5000.'
    };
  }
});

// Window navigation handler
ipcMain.handle('navigate-to-dashboard', async () => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
    if (process.env.NODE_ENV === "development") {
      // Navigate to dashboard route in your React app
      window.loadURL(`http://localhost:5173/dashboard`);
    } else {
      window.loadFile(path.join(__dirname, 'dist/index.html'), { hash: 'dashboard' });
    }
  }
});

// Optional: Get app version
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

// Optional: Window controls
ipcMain.handle('minimize-window', () => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) window.minimize();
});

ipcMain.handle('maximize-window', () => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }
  }
});

ipcMain.handle('close-window', () => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) window.close();
});

app.whenReady().then(() => {
  createWindow();
  
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});