const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("arduino", {
    checkConnection: () => ipcRenderer.invoke("check-connection"),
    onStatusChange: (callback) => ipcRenderer.on('arduino-status', (event, isConnected) => callback(isConnected))
});