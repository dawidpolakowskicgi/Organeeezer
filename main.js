const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const DATA_PATH = path.join(__dirname, 'items.json');

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    useContentSize: true,
    frame: false,
    transparent: true,
    resizable: true,
    vibrancy: 'ultra-dark',
    icon: path.join(__dirname, 'build/icons/organeeezer_icon_256x256.png'), // ← Your custom icon
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true
    }
  });

  win.setBounds({ x: 100, y: 100, width: 500, height: 600 });
  win.loadFile('index.html');
  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.handle('load-items', () => {
  const items = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  return items;
});

ipcMain.on('save-items', (event, items) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(items, null, 2), 'utf-8');
});

ipcMain.on('close-window', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.close();
});

ipcMain.on('minimize-window', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.minimize();
});

