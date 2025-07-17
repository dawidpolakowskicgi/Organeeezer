const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  loadItems: () => ipcRenderer.invoke('load-items'),
  saveItems: (items) => ipcRenderer.send('save-items', items),
  closeWindow: () => ipcRenderer.send('close-window'),
  minimizeWindow: () => ipcRenderer.send('minimize-window')
});