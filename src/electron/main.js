import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { isDev } from '../utils/util.js'
import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'
import { usb } from 'usb'

let port = null
let mainWindow = null

async function connectArduino() {
    const ports = await SerialPort.list()
    const arduino = ports.find(p =>
        p.manufacturer?.toLowerCase().includes("arduino") ||
        p.manufacturer?.toLowerCase().includes("ftdi") ||
        p.vendorId === "2341" ||
        p.vendorId === "1A86" ||
        p.vendorId === "10C4" ||
        p.vendorId === "0403"
    )

    if (!arduino) return false

    try {
        port = new SerialPort({ path: arduino.path, baudRate: 9600 })

        const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))

        parser.on('data', (line) => {
            console.log('Arduino:', line)

            try {
                const data = JSON.parse(line)
                mainWindow.webContents.send('arduino-data', data)
            } catch {
                console.log(line)
            }
        })

        port.on('error', (err) => console.error('SerialPort error:', err))
        return true
    } catch (err) {
        port = null
        return false
    }
}

app.on('ready', async () => {
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 750,
        minWidth: 1000,
        minHeight: 650,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(app.getAppPath(), "src/electron/preload.js"),
            contextIsolation: true,
        }
    })

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123')
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"))
    }

    // conecta ao iniciar
    await connectArduino()

    usb.on('attach', async () => {
        const isConnected = await connectArduino()
        mainWindow.webContents.send('arduino-status', isConnected)
    })

    usb.on('detach', async () => {
        if (port?.isOpen) await new Promise(resolve => port.close(resolve))
        port = null
        const isConnected = await connectArduino()
        mainWindow.webContents.send('arduino-status', isConnected)
    })
})

ipcMain.handle('check-connection', async () => {
    try {
        if (port?.isOpen) return true
        return await connectArduino()
    } catch (error) {
        console.error('Connection check failed:', error)
        return false
    }
})

ipcMain.handle('arduino-send', async (_, command) => {
    if (!port || !port.isOpen) {
        throw new Error('Arduino não conectado')
    }
    return new Promise((resolve, reject) => {
        port.write(command + '\n', (err) => {
            if (err) reject(err)
            else resolve(true)
        })
    })
})