import {app, BrowserWindow} from 'electron'
import path from 'path'
import { isDev } from '../utils/util.js'

app.on('ready',()=>{
    const mainWindow = new BrowserWindow({
        width:1400,
        height:750,
        minWidth:1000,
        minHeight:600,
        autoHideMenuBar:true
    })

    if(isDev()){
        mainWindow.loadURL('http://localhost:5123')
    } else{
        mainWindow.loadFile(path.join(app.getAppPath(),"/dist-react/index.html"))      
    }
})