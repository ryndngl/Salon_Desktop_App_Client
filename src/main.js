import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import started from "electron-squirrel-startup";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// IPC handlers para sa login functionality
ipcMain.handle('login', async (event, credentials) => {
  console.log('Login attempt received:', credentials);
  
  // I-implement mo dito yung authentication logic mo
  // Example:
  try {
    // Validate credentials
    const { username, password, rememberMe } = credentials;
    
    if (username === 'admin' && password === 'admin123') { // Example validation
      console.log('Login successful');
      
      // Store remember me preference if needed
      if (rememberMe) {
        // Save to electron-store or similar
      }
      
      return { success: true, message: 'Login successful' };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Login failed' };
  }
});

// Window navigation handler
ipcMain.handle('navigate-to-dashboard', async () => {
  // Load dashboard after successful login
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
    if (process.env.NODE_ENV === "development") {
      window.loadURL(`http://localhost:5173/src/pages/dashboard/index.html`);
    } else {
      window.loadFile(path.join(__dirname, 'dist/dashboard.html'));
    }
  }
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