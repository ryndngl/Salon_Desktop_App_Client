// MAIN.JS - Fixed version with ROLE-BASED login support
import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import started from "electron-squirrel-startup";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your server configuration
const SERVER_URL = 'http://localhost:5000'; // Your server port

// Store mainWindow reference globally
let mainWindow;

if (started) app.quit();

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,  // Hide menu bar
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      devTools: false,  // Disable dev tools completely
    },
  });

  // Remove application menu completely
  Menu.setApplicationMenu(null);

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL(`http://localhost:5173`);
    // Remove this line to disable dev tools in development
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'))
      .catch(err => console.error("Failed to load index.html:", err));
  }

  return mainWindow;
};

// Focus window handler to fix login input issue
ipcMain.handle('focus-window', () => {
  if (mainWindow) {
    // Multiple focus strategies
    mainWindow.show();
    mainWindow.focus();
    mainWindow.moveTop();
    
    // Force restore if minimized
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    
    // On Windows, sometimes need to blur and refocus
    if (process.platform === 'win32') {
      mainWindow.blur();
      setTimeout(() => {
        mainWindow.focus();
      }, 50);
    }
    
    // Force webContents focus
    mainWindow.webContents.focus();
  }
});

// ✅ UPDATED: IPC handler for login - NOW SUPPORTS BOTH ADMIN AND STAFF
ipcMain.handle('login', async (event, credentials) => {
  try {
    // Import fetch dynamically (for Node.js)
    const fetch = (await import('node-fetch')).default;
    
    // ✅ Determine endpoint based on role
    const role = credentials.role || 'admin'; // Default to admin if not specified
    const endpoint = role === 'staff' 
      ? `${SERVER_URL}/api/staff/sign-in`
      : `${SERVER_URL}/api/auth/admin/sign-in`;
  
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      return result;
    } else {
      console.log(`❌ ${role} login failed:`, result);
      return result;
    }
    
  } catch (error) {
    console.error('❌ Server connection error:', error);
    
    // Check if it's a connection error
    if (error.code === 'ECONNREFUSED' || error.message.includes('fetch')) {
      return {
        success: false,
        isSuccess: false,
        message: 'Cannot connect to server. Make sure the server is running on port 5000.'
      };
    }
    
    return {
      success: false,
      isSuccess: false,
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