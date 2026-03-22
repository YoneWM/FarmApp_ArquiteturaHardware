import {app, BrowserWindow, ipcMain} from 'electron'
import path from 'path'
import { isDev } from '../utils/util.js'
import { SerialPort } from 'serialport'
import { usb } from 'usb'

async function checkArduino() {
    const ports = await SerialPort.list()
    const arduino = ports.find(port =>
    port.manufacturer?.toLowerCase().includes("arduino") ||
    port.manufacturer?.toLowerCase().includes("ftdi") ||
    port.vendorId === "2341" ||
    port.vendorId === "1A86" ||
    port.vendorId === "10C4" ||
    port.vendorId === "0403"
    )

    // console.log(ports);

    // console.log(arduino);
  return !!arduino
}

app.on('ready',()=>{
    const mainWindow = new BrowserWindow({
        width:1400,
        height:750,
        minWidth:1000,
        minHeight:650,
        autoHideMenuBar:true,
        webPreferences: {
        preload: path.join(app.getAppPath(), "src/electron/preload.js"), // 👈 adiciona isso
        contextIsolation: true,
        }    
    })

    if(isDev()){
        mainWindow.loadURL('http://localhost:5123')
    } else{
        mainWindow.loadFile(path.join(app.getAppPath(),"/dist-react/index.html"))      
    }

    usb.on('attach', async () => {
    const isConnected = await checkArduino()
    mainWindow.webContents.send('arduino-status', isConnected)
    })

    usb.on('detach', async () => {
        const isConnected = await checkArduino()
        mainWindow.webContents.send('arduino-status', isConnected)
    })
})

ipcMain.handle("check-connection", async () => {
    try {
    return await checkArduino();
    } catch (error) {
    console.error("Connection check failed:", error)
    return false
    }
})