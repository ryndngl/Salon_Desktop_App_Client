// MAIN.JS - Fixed version with NO ICON
import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import started from "electron-squirrel-startup";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your server configuration
const SERVER_URL = "https://salon-app-server.onrender.com";

// Store mainWindow reference globally
let mainWindow;

if (started) app.quit();

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "",
    icon: null,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      devTools: false,
    },
  });

  // Remove application menu completely
  Menu.setApplicationMenu(null);

  if (process.env.NODE_ENV === "development") {
    // Development: Gumagamit ng Vite dev server
    mainWindow.loadURL(`http://localhost:5173`);
  } else {
    // PRODUCTION FIX: Kailangan nating gamitin ang tamang folder structure ng Electron Forge + Vite.
    // Ang index.html ay nasa loob ng renderer folder na may pangalang 'main_window'
    const rendererPath = path.join(
      __dirname,
      "../renderer/main_window/index.html"
    );

    mainWindow
      .loadFile(rendererPath)
      .catch((err) => console.error("Failed to load index.html:", err));
  }

  return mainWindow;
};

// Focus window handler to fix login input issue
ipcMain.handle("focus-window", () => {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
    mainWindow.moveTop();

    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    if (process.platform === "win32") {
      mainWindow.blur();
      setTimeout(() => {
        mainWindow.focus();
      }, 50);
    }

    mainWindow.webContents.focus();
  }
});

// ✅ UPDATED: IPC handler for login - NOW SUPPORTS BOTH ADMIN AND STAFF
ipcMain.handle("login", async (event, credentials) => {
  try {
    const fetch = (await import("node-fetch")).default;

    const role = credentials.role || "admin";
    const endpoint =
      role === "staff"
        ? `${SERVER_URL}/api/staff/sign-in`
        : `${SERVER_URL}/api/auth/admin/sign-in`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.error("❌ Server connection error:", error);

    if (error.code === "ECONNREFUSED" || error.message.includes("fetch")) {
      return {
        success: false,
        isSuccess: false,
        message:
          "Cannot connect to server. Make sure the server is running on port https://salon-app-server.onrender.com.",
      };
    }

    return {
      success: false,
      isSuccess: false,
      message: `Connection error: ${error.message}`,
    };
  }
});

// Test server connection handler
ipcMain.handle("test-connection", async () => {
  try {
    const fetch = (await import("node-fetch")).default;

    const response = await fetch(`${SERVER_URL}/api/health`, {
      method: "GET",
      timeout: 10000,
    });

    if (response.ok) {
      return { success: true, message: "Server connected" };
    } else {
      return { success: false, message: "Server error" };
    }
  } catch (error) {
    console.error("❌ Server connection test failed:", error);
    return {
      success: false,
      message: "Server unreachable. Check if server is running on port https://salon-app-server.onrender.com.",
    };
  }
});

// Window navigation handler
ipcMain.handle("navigate-to-dashboard", async () => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
    if (process.env.NODE_ENV === "development") {
      window.loadURL(`http://localhost:5173/dashboard`);
    } else {
      // PRODUCTION FIX: Use the file path and append the hash for routing
      const rendererPath = path.join(
        __dirname,
        "../renderer/main_window/index.html"
      );
      window.loadFile(rendererPath, { hash: "dashboard" });
    }
  }
});

// Optional: Get app version
ipcMain.handle("get-app-version", () => {
  return app.getVersion();
});

// Optional: Window controls
ipcMain.handle("minimize-window", () => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) window.minimize();
});

ipcMain.handle("maximize-window", () => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }
  }
});

ipcMain.handle("close-window", () => {
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
