const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("arduino", {
  checkConnection: () => ipcRenderer.invoke("check-connection")
});