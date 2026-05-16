const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("arduino", {
    checkConnection: () => ipcRenderer.invoke("check-connection"),
    onStatusChange: (callback) => ipcRenderer.on('arduino-status', (event, isConnected) => callback(isConnected)),
    offStatusChange: () => ipcRenderer.removeAllListeners('arduino-status'),
    sendCommand: (command) => ipcRenderer.invoke("arduino-send", command),
    onData: (callback) => ipcRenderer.on('arduino-data', (_, data) => callback(data)), // ← adicionar
    offData: () => ipcRenderer.removeAllListeners('arduino-data'),  
});